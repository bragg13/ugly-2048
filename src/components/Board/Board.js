import { useState, useEffect } from "react";

export default function useBoard() {
    const [emptyTiles, setEmptyTiles] = useState([])

    useEffect(() => {
        let g = [ [], [], [], [] ];
        let emptyTiles = [];

        for(let i=0;i<4;i++){
            for(let j=0;j<4;j++){
                g[i].push({
                    id: `${i}${j}`,
                    value: null
                })
                emptyTiles.push(`${i}${j}`)
            }
        }

        setGrid(g)
        setEmptyTiles(emptyTiles)
        console.log(g)
    }, [])
    
    // returns a Tile {id, value}
    const getTile = (id) => {
        let row = id[0]
        let col = id[1]

        return grid[row][col]
    }

    const setTile = (id, value) => {
        let newArr = grid.map(row => row.map(cell => {
            return (cell['id']===id) 
                ? {...cell, value: value}
                : cell 
        }))
        console.log(newArr)

        setGrid(newArr)
    }

    const getEmptyTile = () => {
        let index = Math.floor(Math.random()*emptyTiles.length);
        let tileId = emptyTiles[index]

        // remove element from empty tiles
        setEmptyTiles(curr => curr.filter(_tile => _tile!==tileId))
    
        return getTile(tileId)
    }

    const pushRandomToGrid = () => {
        let tile = getEmptyTile()
        setTile(tile['id'], 2)
    }



    return [pushRandomToGrid, grid]
}