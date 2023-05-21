import React, { useState } from 'react'
import { Typography } from '@mui/material';
import './Tile.css'

export default function Tile({value, prevId, id}) {

const getClasses = () => {
  let color = (value===null) ? '0' : value

  if (value === null || (prevId.length===0 && value===null)) return `color-${color}`
  if (value!==null && prevId.length === 0) return `color-${color} anim-appear`
  
  let moved = ''
  let deltaY = id[0] - prevId[0]
  let deltaX = id[1] - prevId[1]

  if (deltaX > 0) {
    moved = `anim-moved slide-right slide-${id[1] - prevId[1]}` // right
  } else if (deltaX < 0) {
    moved = `anim-moved slide-left slide-${prevId[1] - id[1]}`  // left
  }

  if (deltaY > 0) {
    moved = `anim-moved slide-down slide-${id[0] - prevId[0]}` // down
  } else if (deltaY < 0) {
    moved = `anim-moved slide-up slide-${prevId[0] - id[0]}`  // up
  }
  

  // if (spawned==='' && prevId[1] !== id[1]) {
  //   // moved along x - get direction
  //   if (prevId[1] < id[1]) {
  //     console.log(nCells)
  //   } else {
  //     // left
  //     let nCells = id[0]-prevId[0] 
  //     moved = `anim-moved-left-${nCells}`
  //   }

  // } 
  // else if (prevId[1] !== id[1]) {
  //   // moved along y - get direction

  // }
  
    return `color-${color} ${moved}`
  }

  return (
    <div 
    className={`tile ${getClasses()}`}>
      <Typography
        fontWeight={'bold'}
        fontFamily={"emoji"}
        letterSpacing={'2px'}
        fontSize={'1.5rem'}>
          {value}
      </Typography>
    </div>
  )
}