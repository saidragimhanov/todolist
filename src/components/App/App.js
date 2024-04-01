import { useState } from 'react'
import './App.css'
import Form from '../Form/Form'
import { Counter } from '../counter/counter'
import axios from 'axios'
function App() {
  const [todos, setTodos] = useState([])
  const [allTodos, setAllTodos] = useState(0)
  const [allComplete, setAllComplete] = useState(0)
  const [error, setError] = useState(null)
  const putTodo = (value) => {
    if (value) {
      setTodos([...todos, { id: Date.now(), text: value, done: false }])
      setAllTodos(allTodos + 1)
      setError(null)
    } else {
      setError('введи текст даун')
    }
  }
  async function fetchPosts() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    setTodos(response.data)
  }
  const toggleTodo = (data) => {
    console.log(data)
    setTodos(
      todos.map((todo) => {
        if (todo.id !== data.id) return todo
        return {
          ...todo,
          done: !todo.done,
        }
      }),
    )

    if (!data.done) {
      setAllComplete(allComplete + 1)
    } else setAllComplete(allComplete - 1)
  }
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    setAllTodos(allTodos - 1)
  }
  const clearTodo = () => {
    setTodos([])
    setAllTodos(0)
    setAllComplete(0)
  }
  const handleChangeError = (value) => {
    setError(null)
  }
  return (
    <div className="wrapper">
      <button className="serverButt" onClick={fetchPosts}>
        get post
      </button>
      <Counter />
      <div className="container">
        <h1 className="title">ToDoList</h1>
        <span className="error">{error}</span>
        <Form putTodo={putTodo} handleChangeError={handleChangeError} />
        <ul className="todos">
          {todos.map((todo) => {
            return (
              <li
                className={todo.done ? 'todo done' : 'todo'}
                key={todos.id}
                onClick={() => toggleTodo(todo)}
              >
                {todo.text}
                <img
                  src="./delete.png"
                  alt="delete"
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeTodo(todo.id)
                  }}
                />
              </li>
            )
          })}
          <div className="info">
            <span>All todos:{allTodos}</span>
            <span>Complete:{allComplete}</span>
          </div>
          <button className="btn" onClick={clearTodo}>
            ClearALL
          </button>
        </ul>
      </div>
    </div>
  )
}

export default App
