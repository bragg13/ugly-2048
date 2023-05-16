import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import './Game.css'
import Tile from "../Tile/Tile";

export default function Game(props) {
    const [board, setBoard] = useState([])
    const [emptyTiles, setEmptyTiles] = useState([])
    const [gameStarted, setGameStarted] = useState(false)

    useEffect(() => {
        // initialise board
        let g = [[], [], [], []];
        let emptyTiles = [];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                g[i].push({
                    id: `${i}${j}`,
                    value: null
                })
                emptyTiles.push(`${i}${j}`)
            }
        }

        setBoard(g)
        setEmptyTiles(emptyTiles)

        // push two random tiles

        // set game started
        setGameStarted(true)
    }, [])

    useEffect(() => {
        const keyPressHandler = (e) => {
            if (!gameStarted) {
                return;
            }
            switch (e.keyCode) {
                case 37:
                    console.log('left')
                    slideLeft()
                    break;
                case 38:
                    console.log('right')
                    pushRandomToGrid();
                    break;
                case 39:
                    console.log(board)
                    console.log('right')
                    break;
                case 40:
                    console.log('down')
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
        let index = Math.floor(Math.random() * emptyTiles.length);
        let tileId = emptyTiles[index]

        // remove element from empty tiles
        setEmptyTiles(curr => curr.filter(_tile => _tile !== tileId))

        return tileId
    }

    const pushRandomToGrid = () => {
        let tile = getEmptyTile()
        let newArr = board.map(row => row.map(cell => {
            return (cell['id'] === tile)
                ? { ...cell, value: 2 }
                : cell
        }))
        setBoard(newArr)
    }

    const slideLeft = () => {
        let newBoard = []
        for (let row = 0; row < 4; row++) {
            console.log(`[row ${row}`)

            // remove tiles with value zero
            let compactedRow = board[row].filter(el => el.value !== null)

            // the row needs no computation - skip it
            if (compactedRow.length === 0) {
                console.log('length 0 - no computation needed')
                // fill with null and push the row
                for (let col = 0; col < 4; col++) {
                    compactedRow.push({
                        id: `${row}${col}`,
                        value: null
                    })
                }
                newBoard.push(compactedRow)
                continue
            }

            // the row has only one value - make it the leftmost
            if (compactedRow.length === 1) {
                console.log('length 1 - make it the leftmost')

                // this got shifted but doesnt get its id updated like the others
                compactedRow[0].id = `${row}0`

                // fill with null and push the row
                for (let col = 1; col <= 3; col++) {
                    compactedRow.push({
                        id: `${row}${col}`,
                        value: null
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
                        console.log('computation done, one more el in the array')

                        // wont be summable, wont iterate there, just switch places
                        compactedRow[col].value = compactedRow[col + 1].value
                        compactedRow[col].id = `${row}${col}`

                        compactedRow[col+1].value = null
                        compactedRow[col+1].id = `${row}${col+1}`

                        // current value got updated
                        curVal = compactedRow[col].value
                    }

                    // case 2 - there are two more elements in the array
                    else {
                        console.log('computation done, two more el in the array')
                        
                        // shift the two left values back and set the last one to null 
                        compactedRow[col].value = compactedRow[col + 1].value
                        compactedRow[col].id = `${row}${col}`

                        compactedRow[col+1].value = compactedRow[col + 2].value
                        compactedRow[col+1].id = `${row}${col+1}`

                        compactedRow[col+2].value = null
                        compactedRow[col+2].id = `${row}${col+2}`

                        // current value got updated
                        curVal = compactedRow[col].value
                    }
                }

                let adjVal = compactedRow[col + 1].value

                // if we can sum the two values
                if (curVal === adjVal) {
                    console.log('added!')
                    compactedRow[col].value *= 2
                    compactedRow[col].id = `${row}${col}`

                    compactedRow[col+1].value = null
                    compactedRow[col+1].id = `${row}${col+1}`

                }
            }

            // not considering the full length so need to add one
            col += 1

            // fill with null and push the row
            console.log(`col is ${col}`)
            for (col; col < 4; col++) {
                compactedRow.push({
                    id: `${row}${col}`,
                    value: null
                })
            }
            newBoard.push(compactedRow)
            continue
        }

        console.log(newBoard)
        setBoard(newBoard)
    }


    return (
        <div className="container">
            {board.flat().map(tile => (
                <Tile
                    key={tile.id}
                    id={tile.id}
                    value={tile.value}
                />
            ))}
        </div>
    )
}