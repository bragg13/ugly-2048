import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import './Game.css'
import Tile from "../Tile/Tile";
import Header from "../Header/Header"

export default function Game(props) {
    const [board, setBoard] = useState([])
    const calcBoard = useRef(null)
    const emptyTiles = useRef([])
    const [gameOver, setGameOver] = useState(true)
    const [isLoading, setLoading] = useState(false)

    // preparing the game
    useEffect(() => {
        setLoading(true)

        // initialise board
        let g = [[], [], [], []];
        let _emptyTiles = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                g[i].push({
                    value: null
                })
                _emptyTiles.push(`${i}${j}`)
            }
        }

        setBoard(g)
        emptyTiles.current = _emptyTiles
        calcBoard.current = g

        // set game started
        setLoading(false)
        setGameOver(false)
        pushRandomToGrid()
        pushRandomToGrid()
        
    }, [])

    
    useEffect(() => {
        const keyPressHandler = (e) => {
            if (gameOver) {
                return;
            }

            switch (e.keyCode) {
                case 32:
                    console.log('space')
                    pushRandomToGrid()
                    break;

                case 37:
                    console.log('left')
                    slideLeft()
                    break;
                    
                    case 38:
                        console.log('up')
                    slideUp()
                    break;

                    case 39:
                        console.log('right')
                    slideRight();
                    break;
                    case 40:
                        console.log('down')
                    slideDown()
                    break;
                    default:
                        break;
                    }
                };
                document.addEventListener('keydown', keyPressHandler);
                return () => {
                    document.removeEventListener('keydown', keyPressHandler);
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
        let newValue = (Math.floor(Math.random() * 2)+1)*2 // random number either 2 and 4

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (i == tileI && j == tileJ) {
                    newArr[i].push({ value: newValue })
                } else {
                    newArr[i].push(calcBoard.current[i][j])
                }
            }
        }
        calcBoard.current = newArr
        setBoard(newArr)
    }

    const move = () => {
        let newBoard = []
        let newEmptyTiles = []
        // calcBoard.current = board     

        for (let row = 0; row < 4; row++) {
            // console.log(`[row ${row}`)

            // remove tiles with value zero
            let compactedRow = calcBoard.current[row].filter(el => el.value !== null)

            // the row needs no computation - skip it
            if (compactedRow.length === 0) {
                // console.log('length 0 - no computation needed')
                // fill with null and push the row
                for (let col = 0; col < 4; col++) {
                    compactedRow.push({
                        // id: `${row}${col}`,
                        value: null
                    })
                    newEmptyTiles.push(`${row}${col}`)

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
                        // id: `${row}${col}`,
                        value: null
                    })
                    newEmptyTiles.push(`${row}${col}`)

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
                        compactedRow[col].value = compactedRow[col + 1].value
                        compactedRow[col + 1].value = null

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
                    compactedRow[col].value *= 2
                    compactedRow[col + 1].value = null
                }
            }

            // not considering the full length so need to add one
            col += 1

            // fill with null and push the row
            // console.log(`col is ${col}`)
            for (col; col < 4; col++) {
                compactedRow.push({
                    value: null
                })
                newEmptyTiles.push(`${row}${col}`)

            }
            newBoard.push(compactedRow)
            continue
        }
        emptyTiles.current = newEmptyTiles
        calcBoard.current = newBoard

    }

    const slideLeft = () => {
        calcBoard.current = board;
        move()
        setBoard(calcBoard.current)
    }

    const slideDown = () => {
        calcBoard.current = board
        transposeBoard()
        reverseBoard()
        move()
        reverseBoard()
        transposeBoard()
        setBoard(calcBoard.current)
    }

    const slideUp = () => {
        calcBoard.current = board
        transposeBoard()
        move()
        transposeBoard()
        setBoard(calcBoard.current)
    }

    const slideRight = async () => {
        calcBoard.current = board
        reverseBoard()
        move()
        reverseBoard()
        setBoard(calcBoard.current)
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
                            />
                        ))}
                    </>
                }
            </div>
        </>
    )
}