import React, { Component } from 'react'
import { css, cx } from 'emotion'
import { DEFAULT_LEVEL } from '../constants/index.js'

import TodoListItem from './TodoListItem'

const styles = css({
  // color: 'red'
})

export default class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      todoList: [
        { text: 'foo', level: DEFAULT_LEVEL },
        { text: 'bar', level: DEFAULT_LEVEL },
        { text: 'hello', level: DEFAULT_LEVEL },
        { text: 'world1', level: DEFAULT_LEVEL },
        { text: 'world2', level: DEFAULT_LEVEL },
        { text: 'world3', level: DEFAULT_LEVEL },
        { text: 'world4', level: DEFAULT_LEVEL },
        { text: 'world5', level: DEFAULT_LEVEL },
        { text: 'world6', level: DEFAULT_LEVEL },
        { text: 'world7', level: DEFAULT_LEVEL }
      ]
    }
  }

  sortTodoListByLevel = (list) => {
    list.sort((b, a) => a.level - b.level)
    return list
  }

  onChangeInput = event => {
    const input = event.target.value
    this.setState({ input })
  }

  onClickAdd = () => {
    const { input, todoList } = this.state
    if (input.length >= 3) {
      todoList.push({ text: input, level: DEFAULT_LEVEL })
      this.setState({
        input: '',
        todoList: this.sortTodoListByLevel(todoList)
      })
    } else {
      alert('至少3个字符')
    }
  }

  onClickItemDel = index => {
    const { todoList } = this.state
    todoList.splice(index, 1)
    this.setState({ todoList })
  }

  onIncrementItemLevel = (index, value) => {
    const { todoList } = this.state
    todoList[index].level += value
    this.setState({ todoList: this.sortTodoListByLevel(todoList) })
  }

  render() {
    const { todoList, input } = this.state
    const totalCount = todoList.length
    return (
      <div className={cx(styles)}>
        <input value={input} onChange={this.onChangeInput} />
        <button onClick={this.onClickAdd}>ADD</button>
        <p>total: {totalCount}</p>
        <ul>
          {todoList.map((item, index) => (
            <TodoListItem
              info={item}
              key={index}
              index={index}
              onClickItemDel={this.onClickItemDel}
              onIncrementItemLevel={this.onIncrementItemLevel}
            />
          ))}
        </ul>
      </div>
    )
  }
}
