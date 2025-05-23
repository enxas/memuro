<template>
  <RouterView :key="$route.params.id" />
</template>

<script setup>
import { onMounted } from 'vue'
import NativeApi from '@/lib/native'
import { useDatabaseStore } from '@/stores/databaseStore'

const dbStore = useDatabaseStore()

onMounted(async () => {
  await NativeApi.loadDatabase()

  dbStore.selectTopWorkspace()
})
</script>
