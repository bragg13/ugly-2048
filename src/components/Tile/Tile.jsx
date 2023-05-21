import React, { useState } from 'react'
import { Typography } from '@mui/material';
import './Tile.css'

export default function Tile({value, prevId, id}) {

const getClasses = () => {
  let color = (value===null) ? '0' : value

  if (value === null || (prevId.length===0 && value===null)) return `color-${color}`
  if (value!==null && prevId.length === 0) return `color-${color} anim-appear`

  // if (merged.length!==0) {
  //   prevId[0] = merged[0]
  //   prevId[1] = merged[1]
  // }
  
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

  return (
    <div className='tile color-0'>
      <div 
      className={`tile ${getClasses()}`}>
        <Typography
          fontWeight={'bold'}
          fontFamily={"fantasy"}
          fontSize={'2rem'}>
            {value}
        </Typography>
      </div>

    </div>
  )
}