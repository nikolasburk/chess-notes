import { DurableObject } from "cloudflare:workers";

export class TodosDurableObject extends DurableObject<Env> {

  private todos: Array<{ id: number, name: string }> = []

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env)
    ctx.blockConcurrencyWhile(async () => {
      await this.initializeTodos()
    })
  }

  private async initializeTodos() {
    // Load existing todos from storage
    const stored = await this.ctx.storage.get('todos') as Array<{ id: number, name: string }>
    if (stored && stored.length > 0) {
      this.todos = stored as Array<{ id: number, name: string }>
    } else {
      // Initialize with default todos
      this.todos = [
        { id: 1, name: 'Get groceries' },
        { id: 2, name: 'Buy a new phone' },
      ]
      await this.ctx.storage.put('todos', this.todos)
    }
  }

  async getTodos(): Promise<Array<{ id: number, name: string }>> {
    return this.todos
  }

  async addTodo(name: string): Promise<void> {
    this.todos.push({ id: this.todos.length + 1, name })
    await this.ctx.storage.put('todos', this.todos)
  }

  async fetch(request: Request): Promise<Response> {

    const method = request.method

    switch (method) {
      case 'GET':
        return new Response(JSON.stringify(this.todos), {
          headers: { 'Content-Type': 'application/json' }
        })

      case 'POST':
        const body = await request.json() as { name: string } 
        this.todos.push({ id: this.todos.length + 1, name: body.name })
        await this.ctx.storage.put('todos', this.todos)
        return new Response(JSON.stringify(this.todos), {
          headers: { 'Content-Type': 'application/json' }
        })

      default:
        return new Response('Method not allowed', { status: 405 })
    }
  }


}

// export default {

//   async fetch(request: Request, env: Env): Promise<Response> {

//     const method = request.method

//     const stub = env.TODOS_DO.getByName("todos");

//     switch (method) {
//       case 'GET':
//         return new Response(JSON.stringify(this.todos), {
//           headers: { 'Content-Type': 'application/json' }
//         })

//       case 'POST':
//         const body = await request.json() as { name: string } 
//         this.todos.push({ id: this.todos.length + 1, name: body.name })
//         await this.ctx.storage.put('todos', this.todos)
//         return new Response(JSON.stringify(this.todos), {
//           headers: { 'Content-Type': 'application/json' }
//         })

//       default:
//         return new Response('Method not allowed', { status: 405 })
//     }
//   }
// }