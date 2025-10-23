import { Events, makeSchema, Schema, State } from '@livestore/livestore'

// You can model your state as SQLite tables (https://docs.livestore.dev/reference/state/sqlite-schema)
export const tables = {
  todos: State.SQLite.table({
    name: 'todos',
    columns: {
      id: State.SQLite.text({ primaryKey: true }),
      name: State.SQLite.text({ default: '' }),
    },
  }),
}

export const events = {
  addTodo: Events.synced({
    name: 'v1.addTodo',
    schema: Schema.Struct({ id: Schema.String, name: Schema.String }),
  }),
}

const materializers = State.SQLite.materializers(events, {
  'v1.addTodo': ({ id, name }) => tables.todos.insert({ id, name }),
})

const state = State.SQLite.makeState({ tables, materializers })
export const schema = makeSchema({ events, state })
