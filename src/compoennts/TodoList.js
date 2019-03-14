import React, { Component } from 'react'
import { css, cx } from 'emotion'

const DEFAULT_LEVEL = 0
const MIN_LEVEL = 0
const MAX_LEVEL = 4
const LEVEL_COLOR_MAPPER = (level) => ['blue', 'green', '#FF9800', 'pink', 'red'][level]

const styles = css({
  // color: 'red'
})

class TodoListItem extends Component {
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

export default class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      todoList: [
        { text: 'foo', level: DEFAULT_LEVEL },
        { text: 'bar', level: DEFAULT_LEVEL },
        { text: 'hello', level: DEFAULT_LEVEL },
        { text: 'world', level: DEFAULT_LEVEL }
      ]
    }
  }

  sortTodoListByLevel = () => {
    const { todoList } = this.state
    this.setState({
      todoList: (todoList.sort((b, a) => a.level - b.level), todoList)
    })
  }

  onChangeInput = event => {
    const input = event.target.value
    this.setState({ input })
  }

  onClickAdd = () => {
    const { input, todoList } = this.state
    if (input.length >= 3) {
      // * list.push(item) better than [...list, item]
      this.setState({
        input: '',
        todoList: (todoList.push({ text: input, level: DEFAULT_LEVEL }),
        todoList)
      })
      this.sortTodoListByLevel()
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
    this.setState({ todoList })
    this.sortTodoListByLevel()
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
