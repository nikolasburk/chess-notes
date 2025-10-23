// Import the default TanStack Start server entry
import { default as tanstackServerEntry } from '@tanstack/react-start/server-entry'

// Import your Durable Object
import { TodosDurableObject } from './durable-objects/TodosDurableObject'
import { SyncBackendDO } from './cf-sync-worker'

// Export the TanStack Start server entry as the default export
export default tanstackServerEntry

// Export your Durable Objects so Cloudflare Workers can find it
export { TodosDurableObject, SyncBackendDO  }