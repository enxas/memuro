<template>
  <main class="w-full mx-auto p-6 bg-white rounded-lg shadow-md overflow-auto">
    <div v-if="dbStore.selectedWorkspaceId === 0">No Workspace Selected</div>
    <div v-else>
      <div class="flex justify-between border-b border-gray-400">
        <h2 class="text-2xl font-bold mb-3 text-gray-800">
          {{ dbStore.selectedWorkspaceName }} Bookmarks
        </h2>
        <RouterLink
          :to="{ name: 'workspacesUpdate', params: { id: dbStore.selectedWorkspaceId } }"
          class="text-blue-700 hover:text-blue-400 text-sm"
        >
          Edit Workspace
        </RouterLink>
      </div>
      <div
        v-for="workspaceBookmark in dbStore.selectedWorkspaceBookmarks"
        :key="workspaceBookmark.id"
        class="flex justify-between hover:bg-gray-100 px-2 my-1"
      >
        <div class="flex space-x-2 items-center">
          <BookmarkIcon :url="workspaceBookmark.url" class="w-5 h-5" />
          <input
            v-if="isTransferBookmarksMode"
            type="checkbox"
            :value="workspaceBookmark.id"
            v-model="workspaceSwap.bookmarks"
          />
          <a
            v-if="isBrowser"
            :href="workspaceBookmark.url"
            class="hover:underline hover:text-blue-800 cursor-pointer"
            >{{ workspaceBookmark.title }}</a
          >
          <span
            v-else
            @click="os.open(workspaceBookmark.url)"
            class="hover:underline hover:text-blue-800 cursor-pointer"
            >{{ workspaceBookmark.title }}</span
          >
        </div>

        <RouterLink
          :to="{ name: 'bookmarksUpdate', params: { id: workspaceBookmark.id } }"
          class="text-blue-700 hover:text-blue-400 text-sm"
        >
          Edit
        </RouterLink>
      </div>
      <div class="flex mt-6 space-x-2 items-center">
        <RouterLink
          :to="{ name: 'bookmarksCreate', query: { workspace: dbStore.selectedWorkspaceId } }"
          class="text-blue-700 hover:text-blue-400 text-sm"
        >
          Add Bookmark
        </RouterLink>
        <span>|</span>
        <span
          @click="toggleTransferBookmarks"
          class="text-blue-700 hover:text-blue-400 text-sm cursor-pointer"
          >Transfer Bookmarks</span
        >
      </div>

      <div v-if="isTransferBookmarksMode" class="pt-4 space-x-4">
        <select class="outline px-1 py-1 rounded" v-model="workspaceSwap.workspace">
          <option disabled value="0">Select Workspace</option>
          <option v-for="workspace in otherWorkspaces" :key="workspace.id" :value="workspace.id">
            {{ workspace.name }}
          </option>
        </select>

        <button
          @click="transferBookmarks"
          class="bg-blue-600 cursor-pointer text-white py-1 px-2 rounded-md hover:bg-blue-700"
        >
          Transfer Selected Bookmarks
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useDatabaseStore } from '@/stores/databaseStore'
import { isBrowser } from '@/lib/env'
import { os } from '@neutralinojs/lib'
import BookmarkIcon from '@/components/BookmarkIcon.vue'

const dbStore = useDatabaseStore()

const defaultWorkspaceSwap = {
  bookmarks: [],
  workspace: 0,
}

const workspaceSwap = ref(defaultWorkspaceSwap)

const isTransferBookmarksMode = ref(false)

const otherWorkspaces = computed(() =>
  dbStore.workspaces.filter((workspace) => workspace.id !== dbStore.selectedWorkspaceId),
)

const transferBookmarks = () => {
  if (workspaceSwap.value.bookmarks.length === 0) {
    alert('Select Bookmarks')
    return
  }

  if (workspaceSwap.value.workspace === 0) {
    alert('Select Workspace')
    return
  }

  dbStore.transferBookmarks(workspaceSwap)

  workspaceSwap.value = { ...defaultWorkspaceSwap }
}

const toggleTransferBookmarks = () => {
  isTransferBookmarksMode.value = !isTransferBookmarksMode.value

  workspaceSwap.value = { ...defaultWorkspaceSwap }
}
</script>
