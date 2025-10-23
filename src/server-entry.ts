// Import the default TanStack Start server entry
import { default as tanstackServerEntry } from '@tanstack/react-start/server-entry'

// Import your Durable Object
import { TodosDurableObject } from './durable-objects/TodosDurableObject'

// Export the TanStack Start server entry as the default export
export default tanstackServerEntry

// Export your Durable Object so Cloudflare Workers can find it
export { TodosDurableObject }