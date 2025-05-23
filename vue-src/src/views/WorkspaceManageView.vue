<template>
  <div class="flex h-screen">
    <SideBar />
    <div class="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <div class="flex justify-between">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">{{ actionText }} Workspace</h2>
        <RouterLink :to="{ name: 'home' }" class="text-blue-700 hover:text-blue-400">
          &larr; Back
        </RouterLink>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="workspaceName" class="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            id="workspaceName"
            v-model="form.workspaceName"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter workspace name"
          />
        </div>

        <div class="flex space-x-2">
          <button
            v-if="isEditing"
            @click="handleDelete"
            type="submit"
            class="w-1/6 bg-red-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Delete
          </button>
          <button
            type="submit"
            class="w-5/6 bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            :class="{ 'w-5/6': isEditing, 'w-6/6': !isEditing }"
          >
            {{ actionText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useDatabaseStore } from '@/stores/databaseStore'
import { useRoute, useRouter } from 'vue-router'
import SideBar from '@/components/SideBar.vue'

const dbStore = useDatabaseStore()
const isEditing = ref(false)
const route = useRoute()
const router = useRouter()

const form = reactive({
  workspaceName: '',
})

async function fetchItem(id) {
  const workspace = dbStore.getWorkspaceById(Number(id))

  return { workspaceName: workspace.name }
}

const actionText = computed(() => (isEditing.value ? 'Update' : 'Create'))

// Initialize form
onMounted(async () => {
  if (route.params.id) {
    isEditing.value = true
    form.id = Number(route.params.id)
    const data = await fetchItem(route.params.id)
    Object.assign(form, data)
  }
})

const handleSubmit = async () => {
  if (isEditing.value) {
    await updateItem()
  } else {
    await createItem()
  }
}

const handleDelete = async () => {
  await dbStore.deleteWorkspace(form.id)

  router.push({ name: 'home' })
}

const updateItem = async () => {
  await dbStore.updateWorkspace(form)

  router.push({ name: 'home' })

  dbStore.selectedWorkspaceId = Number(route.params.id)
}

const createItem = async () => {
  const workspaceId = await dbStore.addWorkspace(form.workspaceName)

  router.push({ name: 'home' })

  dbStore.selectedWorkspaceId = workspaceId
}
</script>
