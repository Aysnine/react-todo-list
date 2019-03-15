import React from 'react'
import { MIN_LEVEL, MAX_LEVEL, LEVEL_COLOR_MAPPER } from '../constants/index.js'

export default props => {
  const {
    index,
    onClickItemDel,
    onIncrementItemLevel,
    info: { text, level }
  } = props

  const color = LEVEL_COLOR_MAPPER(level)

  const incrementItemLevel = value => {
    const targetLevel = level + value
    if (targetLevel >= MIN_LEVEL && targetLevel <= MAX_LEVEL)
      onIncrementItemLevel(index, value) // to parent
  }

  return (
    <li>
      <button
        onClick={() => {
          incrementItemLevel(-1)
        }}
      >
        -
      </button>
      <span style={{ color }}> {level} </span>
      <button
        onClick={() => {
          incrementItemLevel(1)
        }}
      >
        +
      </button>
      <span style={{ color }}> {text} </span>
      <button onClick={() => onClickItemDel(index)}>DEL</button>
    </li>
  )
}
