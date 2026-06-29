import React, { useEffect, useState } from 'react';
import { FilterType, Todo } from './types/todo';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

const App = () => {

  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) as Todo[] : []
  })

  const [filter, setFilter] = useState<FilterType>('all')

  const activeCount = todos.filter(
    todo =>
      !todo.completed
  ).length

  const completedCount = todos.filter(
    todo =>
      todo.completed
  ).length

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed
    }
    if (filter === 'completed') {
      return todo.completed
    }
    return true
  })

  useEffect(() => {
    localStorage.setItem(
      'todos',
      JSON.stringify(todos)
    )
  }, [todos])

  const adTodo = (
    text: string
  ) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    }
    setTodos([
      ...todos,
      newTodo
    ])
  }

  const DeleteTodo = (
    id: number
  ) => {
    setTodos(
      todos.filter(
        todo =>
          todo.id !== id
      )
    )
  }

  const toggleTodo = (
    id: number
  ) => {
    setTodos(
      todos.map(
        todo =>
          todo.id === id
            ? {
              ...todo,
              completed: !todo.completed
            }
            :
            todo
      )
    )
  }

  const clearCompleted = () => {
    setTodos(
      todos.filter(
        todo =>
          !todo.completed
      )
    )
  }

  return (
    <div className='container'>
      <div className='stats'>
        <h1>Todo App</h1>
        <p>All: {todos.length}</p>
        <p>Active: {activeCount}</p>
        <p>Completed: {completedCount}</p>
      </div>
      <TodoForm
        addTodo={adTodo}
      />
      {filteredTodos.map(
        todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={DeleteTodo}
            toggleTodo={toggleTodo}
          />
        )
      )}
      <div className='filters'>
        <button
          onClick={() =>
            setFilter('all')
          }
        >
          All

        </button>

        <button onClick={() =>
          setFilter('active')
        }>
          Active
        </button>

        <button onClick={() =>
          setFilter('completed')

        }>
          Completed
        </button>
      </div>
      <button className='clear-btn' onClick={clearCompleted}>
        Clear Completed
      </button>
    </div>
  )
}
export default App; 