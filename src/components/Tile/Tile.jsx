import React, { useState } from 'react'
import { Typography } from '@mui/material';
import './Tile.css'

export default function Tile({value, prevId, id}) {

const getClasses = () => {
  let color = (value===null) ? '0' : value

  if (value === null || (prevId.length===0 && value===null)) return `color-${color}`
  if (value!==null && prevId.length === 0) return `color-${color} anim-appear`

  let direction = ''
  let amount = ''
  let deltaY = id[0] - prevId[0]
  let deltaX = id[1] - prevId[1]

  if (deltaX > 0) {
    direction = 'right'
    amount = `${id[1] - prevId[1]}`

  } else if (deltaX < 0) {
    direction = 'left'
    amount = `${prevId[1] - id[1]}`
  }

  if (deltaY > 0) {
    direction = 'down'
    amount = `${id[0] - prevId[0]}`

  } else if (deltaY < 0) {
    direction = 'up'
    amount = `${prevId[0] - id[0]}`

  }

  return `color-${color} anim-moved slide-${direction} slide-${amount}`
  }


  const getSize = () => {
    let size = 3

    switch(value) {
      case 8:
        size = 3.5
        break;
      case 16:
        size = 4
        break;
      case 32:
        size = 5
        break;
      case 64:
        size = 6
        break;
      case 128:
        size = 7
        break;
      case 256: 
        size = 7.5
        break;
      case 512:
        size = 8
        break;
      case 1024:
        size = 10
        break;
      case 2048:
        size = 12
        break;
      default:
        size = 3
        break
    }

    return `${size}rem`
  }


  return (
    <div className='tile color-0'>
      <div 
      className={`tile ${getClasses()}`}>
        <Typography
          fontWeight={'bold'}
          fontFamily={"fantasy"}
          fontSize={`${getSize()}`}>
            {value}
        </Typography>
      </div>

    </div>
  )
}