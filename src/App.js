import React, { useRef,useEffect} from 'react';
import { Route} from 'react-router-dom'
import { TweenMax, Power3} from 'gsap'
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About'
// import uuid from 'uuid';
import axios from 'axios';

import './App.css';

class App extends React.Component {
  state = {
    todos:[]
  }
  componentDidMount(){
    // Using axios instead of Fetch for pulling data from API

    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({todos: res.data}))
  }
  //Toggle Completed
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if(todo.id === id){
          todo.completed = !todo.completed
        }
        return todo;
      })
    })
  }

  //Delete Todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}))

  }

  //Add Todo

  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos',{
      title,
      completed: false
    })
    .then(res =>this.setState({todos: [...this.state.todos, res.data]}))

  }

  render() {

  return (

      <div className="App">
        <div className='container'>
        < Header />
        <Route exact path='/' render ={props => (
          <React.Fragment>
          <AddTodo addTodo={this.addTodo}/>
          <Todos todos = {this.state.todos}
          markComplete={this.markComplete}
          delTodo={this.delTodo}/>

          </React.Fragment>
        )} />
        <Route path='/about' component={About} />
        </div>
    </div>
    )
  }
}


export default App;
