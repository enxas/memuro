<template>
  <div v-bind="attrs">
    <img :src="icon" alt="Site icon" v-if="icon" />
  </div>
</template>

<script setup>
import { computed, useAttrs } from 'vue'
import youtubeIcon from '@/assets/youtube_icon.svg'
import redditIcon from '@/assets/reddit_icon.svg'

const attrs = useAttrs()

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})

const getHostname = (url) => {
  try {
    return new URL(url).hostname.split('.').slice(-2, -1)[0]
  } catch {
    return ''
  }
}

const icon = computed(() => {
  const hostname = getHostname(props.url)

  if (hostname.includes('youtube')) {
    return youtubeIcon
  } else if (hostname.includes('reddit')) {
    return redditIcon
  }
  return null
})
</script>
