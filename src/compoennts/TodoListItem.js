import React from 'react'
import { MIN_LEVEL, MAX_LEVEL, LEVEL_COLOR_MAPPER } from '../constants/index.js'

export default props => {
  const {
    index,
    onClickItemDel,
    onIncrementItemLevel,
    onDoneChange,
    info: { text, level, done }
  } = props

  const color = LEVEL_COLOR_MAPPER(done ? -1 : level)

  const incrementItemLevel = value => {
    const targetLevel = level + value
    if (targetLevel >= MIN_LEVEL && targetLevel <= MAX_LEVEL)
      onIncrementItemLevel(index, value) // to parent
  }

  const doneChange = () => onDoneChange(index, !done)

  return (
    <li style={{ textDecoration: done ? 'line-through' : 'none' }}>
      <button onClick={() => onClickItemDel(index)}>DEL</button>
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
      <input type="checkbox" checked={done} onChange={doneChange} />
    </li>
  )
}
