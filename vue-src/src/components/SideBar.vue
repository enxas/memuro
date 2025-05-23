<template>
  <aside class="w-64 bg-gray-100 overflow-y-auto h-full p-4">
    <Draggable
      v-model="internalItems"
      item-key="id"
      ghost-class="bg-blue-100"
      handle=".handle"
      tag="div"
      @end="onDragEnd"
    >
      <template #item="{ element }">
        <RouterLink :to="{ name: 'home' }" class="mb-2 flex items-center gap-2">
          <div class="handle cursor-move text-gray-400">≡</div>
          <button
            @click="dbStore.selectedWorkspaceId = element.id"
            class="text-left w-full px-2 py-1 rounded hover:bg-gray-200 cursor-pointer"
          >
            {{ element.name }} <span class="text-xs">({{ element.bookmarksCount }})</span>
          </button>
        </RouterLink>
      </template>
    </Draggable>
    <RouterLink
      :to="{ name: 'workspacesCreate' }"
      class="text-blue-700 hover:text-blue-400 text-sm mt-6 block"
    >
      Create Workspace
    </RouterLink>
  </aside>
</template>

<script setup>
import { ref, watch, toRaw } from 'vue'
import Draggable from 'vuedraggable'
import { useDatabaseStore } from '@/stores/databaseStore'

const dbStore = useDatabaseStore()

const internalItems = ref([])

watch(
  () => dbStore.workspaces,
  (newItems) => {
    // Convert proxies to plain objects to avoid reactivity issues
    internalItems.value = newItems.map((item) => toRaw(item))
  },
  { immediate: true },
)

async function onDragEnd() {
  const orderedWorkspaces = internalItems.value.map((item) => item.id).reverse()
  await dbStore.updateWorkspaceOrder(orderedWorkspaces)
}
</script>
