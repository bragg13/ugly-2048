import { useEffect, useRef, useState } from "react";
import './Game.css'
import { useThrottledCallback } from "use-debounce";
import Tile from "../Tile/Tile";

export default function Game({ handleScore, gameStatus, updateGameStatus }) {
    const [board, setBoard] = useState([])
    const calcBoard = useRef(null)
    const emptyTiles = useRef([])
    const [moved, setMoved] = useState(false)

    // const [gameStatus, setGameStatus] = useState('start')
    const [isLoading, setLoading] = useState(false)


    const resetGame = () => {
        setLoading(true)

        // initialise board
        let g = [[], [], [], []];
        let _emptyTiles = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                g[i].push({
                    value: null,
                    // prevValue: null,
                    id: [i, j],
                    prevId: []
                })
                _emptyTiles.push(`${i}${j}`)
            }
        }

        setBoard(g)
        emptyTiles.current = _emptyTiles
        calcBoard.current = g

        // set game started
        setLoading(false)
        pushRandomToGrid()
        pushRandomToGrid()
        setBoard(calcBoard.current)
    }

    // preparing the game
    useEffect(() => {
        if (gameStatus === 'starting') {
            resetGame()
            updateGameStatus('playing')
        } else if (gameStatus === 'gameOver') {
            console.log('GAME OVER')
        }
    }, [gameStatus])

    // check for winning or losing conditions
    // this gets triggered after slideLeft()/Right()/...
    useEffect(() => {
        if (gameStatus === 'playing') {
            // check if there was an actual movement
            let emptyTilesBackup = [...emptyTiles.current]
            updateEmptyTiles()

            // console.log(emptyTilesBackup.join('') !== emptyTiles.current.join(''))

            if (emptyTilesBackup.join('') !== emptyTiles.current.join('')) {
                console.log('movement')
                // if there was, we can spawn a new tile
                pushRandomToGrid()
                setBoard(calcBoard.current)

            } else {
                if (moved) {        // would be tooo slow if put in the first if
                    console.log('no movement')
                    // se non ci sono tile liberi, gameover
                    if (emptyTiles.current.length === 0) {
                        updateGameStatus('gameOver')
                    }
                }
            }

            console.log(calcBoard.current)
            setMoved(false)
        }

    }, [moved])


    const handleKeyDown = (e) => {
        // disables page scrolling with keyboard arrows
        e.preventDefault();

        switch (e.code) {
            case "ArrowLeft":
                slideLeft();
                setMoved(true)
                break;
            case "ArrowRight":
                slideRight();
                setMoved(true)
                break;
            case "ArrowUp":
                slideUp();
                setMoved(true)
                break;
            case "ArrowDown":
                slideDown();
                setMoved(true)
                break;
        }
    };

    // protects the reducer from being flooded with events.
    const throttledHandleKeyDown = useThrottledCallback(
        handleKeyDown,
        200,
        { leading: true, trailing: false }
    );

    useEffect(() => {
        window.addEventListener("keydown", throttledHandleKeyDown);

        return () => {
            window.removeEventListener("keydown", throttledHandleKeyDown);
        };
    });

    const getEmptyTile = () => {
        let index = Math.floor(Math.random() * emptyTiles.current.length);
        let tileId = emptyTiles.current[index]

        // remove element from empty tiles
        let filtered = emptyTiles.current.filter(_tile => _tile !== tileId)
        emptyTiles.current = filtered

        return { tileI: tileId[0], tileJ: tileId[1] }
    }

    const pushRandomToGrid = () => {
        let { tileI, tileJ } = getEmptyTile()
        let newArr = [[], [], [], []]
        let newValue = (Math.random() <= 0.7) ? 2 : 4

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let obj

                if (i == tileI && j == tileJ) {
                    obj = {
                        id: [i, j],
                        prevId: [],
                        // // merged: [],
                        value: newValue,
                    }
                    newArr[i].push(obj)

                } else {
                    newArr[i].push({
                        ...calcBoard.current[i][j],
                    })
                }
            }
        }
        calcBoard.current = newArr
    }

    const move = () => {
        let newBoard = []

        for (let row = 0; row < 4; row++) {
            // console.log(`[row ${row}`)

            // remove tiles with value zero
            let compactedRow = calcBoard.current[row].filter(el => el.value !== null)

            // the row needs no computation - skip it
            if (compactedRow.length === 0) {
                // console.log('length 0 - no computation needed')
                // fill with null and push the row
                for (let col = 0; col < 4; col++) {
                    // console.log(calcBoard.current[row][col])
                    compactedRow.push({
                        value: null,
                        // merged: [],
                        id: [row, col],
                        prevId: []
                    })

                }
                newBoard.push(compactedRow)
                continue
            }

            // the row has only one value - make it the leftmost
            if (compactedRow.length === 1) {
                // console.log('length 1 - make it the leftmost')

                // fill with null and push the row
                for (let col = 1; col <= 3; col++) {
                    compactedRow.push({
                        value: null,
                        id: [row, col],
                        // merged: [],
                        prevId: []
                    })

                }
                newBoard.push(compactedRow)
                continue
            }

            // the row has more than one value - compute the sums
            let col
            for (col = 0; col < compactedRow.length - 1; col++) {  // length-1 because doesnt make sense to check if I can sum smth to the last element
                let curVal = compactedRow[col].value

                if (curVal === null) {
                    // cannot be the last element in the array because of the cycle limit
                    // case 1 - there is one more element in the array
                    if (col + 1 === compactedRow.length - 1) {
                        // console.log('computation done, one more el in the array')

                        // wont be summable, wont iterate there, just switch places
                        // compactedRow[col].prevValue = compactedRow[col].value
                        compactedRow[col].value = compactedRow[col + 1].value
                        compactedRow[col + 1].value = null
                        // compactedRow[col + 1].prevId = null     // dovrebbe essere inutile perche quando instanzio un nuovo blocco gli do prevId null di base

                        // current value got updated
                        curVal = compactedRow[col].value
                    }

                    // case 2 - there are two more elements in the array
                    else {
                        // console.log('computation done, two more el in the array')

                        // shift the two left values back and set the last one to null 
                        compactedRow[col].value = compactedRow[col + 1].value
                        compactedRow[col + 1].value = compactedRow[col + 2].value
                        compactedRow[col + 2].value = null

                        // current value got updated
                        curVal = compactedRow[col].value
                    }
                }

                let adjVal = compactedRow[col + 1].value

                // if we can sum the two values
                if (curVal === adjVal) {
                    // console.log('added!')
                    compactedRow[col].value = curVal + adjVal
                    compactedRow[col].merged = [row, col + 1]
                    compactedRow[col + 1].value = null
                    handleScore(compactedRow[col].value)
                }
            }

            // not considering the full length so need to add one
            col += 1

            // fill with null and push the row
            // console.log(`col is ${col}`)
            for (col; col < 4; col++) {
                compactedRow.push({
                    value: null,
                    // merged: [],
                    id: [row, col],
                    prevId: []
                })

            }
            newBoard.push(compactedRow)
            continue
        }
        calcBoard.current = newBoard
        console.log(calcBoard.current)

    }

    const updateEmptyTiles = () => {
        let newEmptyTiles = []

        calcBoard.current.map(
            (row, rowI) => row.map(
                (col, colI) => {
                    // update empty tiles
                    if (calcBoard.current[rowI][colI].value === null) {
                        newEmptyTiles.push(`${rowI}${colI}`)
                    }

                    // update IDs
                    let obj = {
                        ...calcBoard.current[rowI][colI],
                        prevId: calcBoard.current[rowI][colI].id,
                        id: [rowI, colI]
                    }
                    console.log(obj)
                    calcBoard.current[rowI][colI] = obj

                    // calcBoard.current[rowI][colI].prevId = calcBoard.current[rowI][colI].id
                    // calcBoard.current[rowI][colI].id = [rowI, colI]
                }
            )
        )

        emptyTiles.current = newEmptyTiles
        // console.log(calcBoard.current)
    }

    const slideLeft = () => {
        calcBoard.current = board;
        move()
        // setBoard(calcBoard.current)
    }

    const slideDown = () => {
        calcBoard.current = board
        transposeBoard()
        reverseBoard()
        move()
        reverseBoard()
        transposeBoard()
        // setBoard(calcBoard.current)
    }

    const slideUp = () => {
        calcBoard.current = board
        transposeBoard()
        move()
        transposeBoard()
        // setBoard(calcBoard.current)
    }

    const slideRight = async () => {
        calcBoard.current = board
        reverseBoard()
        move()
        reverseBoard()
        // setBoard(calcBoard.current)
    }

    const reverseBoard = () => {
        let newBoard = calcBoard.current.map(row => [...row].reverse());
        calcBoard.current = newBoard
    }

    const transposeBoard = () => {
        let newBoard = calcBoard.current[0]
            .map((_, colIndex) =>
                calcBoard.current.map(row =>
                    row[colIndex]));
        calcBoard.current = newBoard
    }

    return (
        <>
            <div className="container">
                {isLoading
                    ?
                    <h1>Loading...</h1>
                    :
                    <>
                        {board.flat().map(tile => (
                            <Tile
                                key={crypto.randomUUID()}
                                value={tile.value}
                                id={tile.id}
                                prevId={tile.prevId}
                            />
                        ))}
                    </>
                }
            </div>
        </>
    )
}


// quando muovo devo anche settare value a null e prevValue alla prevValue
// perche ora come ora
// quando muovo e sposto dei blocchi, i blocchi null che sostituisco devono avere id/prevId a null, TUTTO A NULL