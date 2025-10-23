import { createFileRoute } from '@tanstack/react-router'
import { queryDb } from '@livestore/livestore'
import { useStore } from '@livestore/react'

import { tables, events } from '../../livestore/schema.ts'
import { useState } from 'react'

const todos$ = queryDb(tables.todos.select(), { label: 'todos' })


export const Route = createFileRoute('/todos/')({
  component: RouteComponent,
})

function RouteComponent() {

  const { store } = useStore()
  const allTodos = store.useQuery(todos$) 
  console.log('allTodos', allTodos)

  const [newTodoText, setNewTodoText] = useState('')

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow border border-gray-100">
      <h1 className="text-2xl font-semibold mb-4 text-gray-900 text-center tracking-tight">TODOs</h1>
      <input
        className="w-full px-4 py-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
        placeholder="What needs to be done?"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            store.commit(
              events.addTodo({ id: crypto.randomUUID(), name: newTodoText }),
            )
            setNewTodoText('')
          }
        }}
      />
      <ul className="space-y-2">
        {allTodos.map((todo) => (
          <li
            key={todo.id}
            className="px-4 py-2 rounded bg-slate-50 text-gray-800 border border-gray-200"
          >
            {todo.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
