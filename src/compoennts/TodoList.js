import React, { useState } from 'react'
import { css, cx } from 'emotion'
import { DEFAULT_LEVEL } from '../constants/index.js'

import TodoListItem from './TodoListItem'

const styles = css({
  // color: 'red'
})

const sortTodoListByLevel = list => list.sort((b, a) => a.level - b.level)

export default () => {
  const [input, setInput] = useState('')
  const [todoList, setTodoList] = useState([
    { text: 'foo', level: DEFAULT_LEVEL, done: true },
    { text: 'bar', level: DEFAULT_LEVEL, done: true },
    { text: 'hello', level: DEFAULT_LEVEL, done: false }
  ])

  const onChangeInput = event => setInput(event.target.value)

  const onClickAdd = () => {
    if (input.length >= 3) {
      setInput('')
      setTodoList(
        sortTodoListByLevel([
          ...todoList,
          { text: input, level: DEFAULT_LEVEL }
        ])
      )
    } else {
      alert('至少3个字符')
    }
  }

  const onClickItemDel = index => {
    setTodoList([...(todoList.splice(index, 1), todoList)])
  }

  const onIncrementItemLevel = (index, value) => {
    setTodoList(
      sortTodoListByLevel(
        todoList.map((item, itemIndex) => {
          if (itemIndex === index) item.level += value
          return item
        })
      )
    )
  }

  const onDoneChange = (index, value) => {
    setTodoList(
      todoList.map((item, itemIndex) => {
        if (itemIndex === index) item.done = value
        return item
      })
    )
  }

  return (
    <div className={cx(styles)}>
      <input value={input} onChange={onChangeInput} />
      <button onClick={onClickAdd}>ADD</button>
      <p>total: {todoList.length}</p>
      <ul>
        {todoList.map((item, index) => (
          <TodoListItem
            info={item}
            key={index}
            index={index}
            onClickItemDel={onClickItemDel}
            onIncrementItemLevel={onIncrementItemLevel}
            onDoneChange={onDoneChange}
          />
        ))}
      </ul>
    </div>
  )
}
