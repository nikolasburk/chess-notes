import { makeDurableObject } from '@livestore/sync-cf/cf-worker'

export class SyncBackendDO extends makeDurableObject({
  onPush: async (message, context) => {
    console.log('onPush', message, context)
  },
  onPull: async (message, context) => {
    console.log('onPull', message, context)
  },

}) {}