import { useState } from 'react'

type TodoFormProps = {
    addTodo: (
        text: string
    ) => void
}

function TodoForm({ addTodo }: TodoFormProps) {

    const [text, setText] =
        useState<string>('')

    const handleSubmit = (
        e: React.FormEvent
    ) => {

        e.preventDefault()

        if (
            !text.trim()
        ) return

        addTodo(text)

        setText('')
    }

    return (

        <form
            onSubmit={
                handleSubmit
            }
        >

            <input
                type='text'
                placeholder='Add task...'
                className='addTask-input'
                value={text}
                onChange={(e) =>
                    setText(
                        e.target.value
                    )
                }
            />

            <button
                type='submit'
            >

                Add

            </button>
        </form>

    )

}

export default TodoForm