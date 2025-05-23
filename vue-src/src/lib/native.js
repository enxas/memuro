import { os, filesystem } from '@neutralinojs/lib'
import { useDatabaseStore } from '@/stores/databaseStore'

const appName = 'Memuro'
const isNeutralino = typeof window !== 'undefined' && !!window.NL_PID

const NativeAPI = {
  async flushDatabase() {
    const dbStore = useDatabaseStore()

    if (isNeutralino) {
      const documentsDir = await os.getPath('documents')
      const filePath = `${documentsDir}/${appName}/data.json`

      await filesystem.writeFile(filePath, JSON.stringify(dbStore.getDatabase(), null, 2))
    } else {
      localStorage.setItem(appName, JSON.stringify(dbStore.getDatabase()))
    }
  },
  async loadDatabase() {
    const dbStore = useDatabaseStore()

    const defaultData = {
      schemaVersion: 1,
      workspaces: [],
      bookmarks: [],
    }

    if (isNeutralino) {
      // Get user’s Documents directory
      const documentsDir = await os.getPath('documents')

      const folderPath = `${documentsDir}/${appName}`
      const filePath = folderPath + '/data.json'

      try {
        await filesystem.getStats(folderPath)
      } catch (e) {
        if (e.code == 'NE_FS_NOPATHE') {
          // directory doesn't exist so create it
          await filesystem.createDirectory(folderPath)
        } else {
          throw e
        }
      }

      try {
        await filesystem.getStats(filePath)
      } catch (e) {
        if (e.code == 'NE_FS_NOPATHE') {
          // file doesn't exist so create it
          await filesystem.writeFile(filePath, JSON.stringify(defaultData, null, 2))
        } else {
          throw e
        }
      }

      const result = await filesystem.readFile(filePath)
      const parsed = JSON.parse(result)

      dbStore.setDatabase(parsed)
    } else {
      let database = localStorage.getItem(appName)

      if (database === null) {
        localStorage.setItem(appName, JSON.stringify(defaultData))
      }

      const userData = JSON.parse(localStorage.getItem(appName))
      dbStore.setDatabase(userData)
    }
  },
}

// dbStore.setDatabase({
// 	"schemaVersion": 1,
// 	"workspaces": [
// 		{
// 			"id": 1,
// 			"order": 3,
// 			"name": "Learning VueJS"
// 		},
// 	],
// 	"bookmarks": [
// 		{
// 			"workspaceId": 1,
// 			"order": 3,
// 			"title": "aaaaaaa",
// 			"url": "https://github.com/test"
// 		},
// 	]
// })

export default NativeAPI
