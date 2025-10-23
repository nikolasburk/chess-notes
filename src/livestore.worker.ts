import { makeWorker } from '@livestore/adapter-web/worker'
import { makeWsSync } from '@livestore/sync-cf/client'

import { schema } from './livestore/schema.ts'

makeWorker({ 
  schema,
  sync: {
    backend: makeWsSync({
      url: location.origin + '/sync',
    })
  }
})