import React from 'react';
import { Todo } from '../types/todo';

type TodoItemProps = {
    todo: Todo
    deleteTodo: (
        id: number
    ) => void
    toggleTodo: (
        id: number
    ) => void
}

const TodoItem = ({
    todo, 
    deleteTodo,
    toggleTodo
}: TodoItemProps) => {
    return (
        <div style={{
            display: 'flex',
            gap: '15px',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px'
        }}>
            <input className='input-checkbox'
             type="checkbox" 
             checked={
                todo.completed
              }
              onChange={() => 
                toggleTodo(todo.id)
              }
             />
             <p style={{
                textDecoration: todo.completed ? 'line-through': 'none',
                opacity: todo.completed ? 0.5 : 1,
                padding: '0 30px'
             }}>
                {todo.text}
             </p>
             <button onClick={() => 
                deleteTodo(todo.id)
             }>
                Delete
             </button>
        </div>
    )
}
export default TodoItem;