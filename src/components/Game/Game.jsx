import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import './Game.css'

export default function Game (props) {
    const [board, setBoard] = useState([])
    const tiles = [
        {key: '11', value: '11'},
        {key: '12', value: '12'},
        {key: '13', value: '13'},
        {key: '14', value: '14'},
        
        {key: '21', value: '21'},
        {key: '22', value: '22'},
        {key: '23', value: '23'},
        {key: '24', value: '24'},

        {key: '31', value: '31'},
        {key: '32', value: '32'},
        {key: '33', value: '33'},
        {key: '34', value: '34'},

        {key: '41', value: '41'},
        {key: '42', value: '42'},
        {key: '43', value: '43'},
        {key: '44', value: '44'},
    ]

    return (
        <div className="container">
            {tiles.map(tile => (
                <div key={tile.key} className="tile">
                    <Typography>{tile.value}</Typography>
                </div>
            ))}
        </div>
    )
}