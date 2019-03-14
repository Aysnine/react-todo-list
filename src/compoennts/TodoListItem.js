import React, { Component } from 'react'

import {
  MIN_LEVEL,
  MAX_LEVEL,
  LEVEL_COLOR_MAPPER,
} from '../constants/index.js'

export default class TodoListItem extends Component {
  incrementItemLevel = value => {
    const {
      index,
      onIncrementItemLevel,
      info: { level }
    } = this.props
    const targetLevel = level + value
    if (targetLevel >= MIN_LEVEL && targetLevel <= MAX_LEVEL)
      onIncrementItemLevel(index, value) // to parent
  }

  render() {
    const {
      index,
      info: { text, level },
      onClickItemDel
    } = this.props
    return (
      <li>
        <button
          onClick={() => {
            this.incrementItemLevel(-1)
          }}
        >
          -
        </button>
        <span style={{ color: LEVEL_COLOR_MAPPER(level) }}> {level} </span>
        <button
          onClick={() => {
            this.incrementItemLevel(1)
          }}
        >
          +
        </button>
        <span style={{ color: LEVEL_COLOR_MAPPER(level) }}> {text} </span>
        <button onClick={() => onClickItemDel(index)}>DEL</button>
      </li>
    )
  }
}
