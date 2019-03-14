import React, { Component } from 'react';
import Layout from './compoennts/Layout'
import TodoList from './compoennts/TodoList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <TodoList />
        </Layout>
      </div>
    );
  }
}

export default App;
