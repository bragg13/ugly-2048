import React, { useState } from 'react'
import { Typography } from '@mui/material';
import './Tile.css'

export default function Tile({id, value}) {

  const [initialValue, setInitialValue] = useState(value);
  const [position, setPosition] = useState(id);

  return (
    <div className="tile">
      <Typography>{value}</Typography>
    </div>
  )
}