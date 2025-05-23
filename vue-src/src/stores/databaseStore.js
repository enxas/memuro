import { computed, ref, toRaw } from 'vue'
import { defineStore } from 'pinia'
import NativeApi from '@/lib/native'

export const useDatabaseStore = defineStore('database', () => {
  const database = ref({
    workspaces: [],
    bookmarks: [],
  })

  const selectedWorkspaceId = ref(0)

  const getBookmarksByWorkspaceId = (workspaceId) =>
    database.value.bookmarks.filter((b) => b.workspaceId === workspaceId)

  const selectedWorkspaceBookmarks = computed(() =>
    [...database.value.bookmarks]
      .filter((b) => b.workspaceId === selectedWorkspaceId.value)
      .sort((a, b) => b.order - a.order),
  )

  const selectedWorkspaceName = computed(
    () => database.value.workspaces.find((b) => b.id === selectedWorkspaceId.value).name,
  )

  const getWorkspaceById = (workspaceId) =>
    database.value.workspaces.find((b) => b.id === workspaceId)

  const getBookmarkById = (bookmarkId) => database.value.bookmarks.find((b) => b.id === bookmarkId)

  const workspaces = computed(() =>
    database.value.workspaces
      .sort((a, b) => b.order - a.order)
      .map((ws) => ({
        ...ws,
        bookmarksCount: getBookmarksByWorkspaceId(ws.id).length,
      })),
  )

  const setDatabase = (newDatabase) => (database.value = newDatabase)

  const getDatabase = () => toRaw(database.value)

  const updateWorkspaceOrder = async (orderedWorkspaces) => {
    database.value.workspaces = orderedWorkspaces.map((id, index) => ({
      ...database.value.workspaces.find((ws) => ws.id === id),
      order: index,
    }))

    await NativeApi.flushDatabase()
  }

  const selectTopWorkspace = () => {
    if (database.value.workspaces.length > 0) {
      selectedWorkspaceId.value = workspaces.value[0].id
    } else {
      selectedWorkspaceId.value = 0
    }
  }

  const deleteWorkspace = async (workspaceId) => {
    database.value.workspaces = database.value.workspaces.filter((ws) => ws.id !== workspaceId)
    database.value.bookmarks = database.value.bookmarks.filter(
      (bk) => bk.workspaceId !== workspaceId,
    )

    selectTopWorkspace()

    await NativeApi.flushDatabase()
  }

  const deleteBookmark = async (bookmarkId) => {
    database.value.bookmarks = database.value.bookmarks.filter((bk) => bk.id !== bookmarkId)

    await NativeApi.flushDatabase()
  }

  const updateWorkspace = async (formData) => {
    const workspace = database.value.workspaces.find((ws) => ws.id === formData.id)

    workspace.name = formData.workspaceName

    await NativeApi.flushDatabase()
  }

  const updateBookmark = async (formData) => {
    const bookmark = database.value.bookmarks.find((bk) => bk.id === formData.id)

    bookmark.url = formData.url
    bookmark.title = formData.title

    await NativeApi.flushDatabase()
  }

  const addWorkspace = async (name) => {
    const id = Math.floor(Date.now() / 1000)

    const newWorkspace = {
      id: id,
      order: database.value.workspaces.length,
      name: name,
    }

    database.value.workspaces = [...database.value.workspaces, newWorkspace]

    await NativeApi.flushDatabase()

    return id
  }

  const addBookmark = async (workspaceId, url, title) => {
    const newBookmark = {
      id: Math.floor(Date.now() / 1000),
      workspaceId: workspaceId,
      order: database.value.bookmarks.length,
      url: url,
      title: title,
    }

    database.value.bookmarks = [...database.value.bookmarks, newBookmark]

    await NativeApi.flushDatabase()
  }

  const transferBookmarks = async (transferData) => {
    for (let i = 0; i < database.value.bookmarks.length; i++) {
      const bookmark = database.value.bookmarks[i]

      if (transferData.value.bookmarks.includes(bookmark.id)) {
        bookmark.workspaceId = transferData.value.workspace
      }
    }

    await NativeApi.flushDatabase()
  }

  return {
    workspaces,
    selectedWorkspaceName,
    selectedWorkspaceId,
    selectedWorkspaceBookmarks,
    selectTopWorkspace,
    getBookmarkById,
    transferBookmarks,
    deleteBookmark,
    updateBookmark,
    setDatabase,
    getDatabase,
    updateWorkspaceOrder,
    getWorkspaceById,
    deleteWorkspace,
    updateWorkspace,
    addWorkspace,
    addBookmark,
  }
})
