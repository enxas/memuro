import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import WorkspaceManageView from '@/views/WorkspaceManageView.vue'
import BookmarkManageView from '@/views/BookmarkManageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/workspaces',
      name: 'workspacesCreate',
      component: WorkspaceManageView,
    },
    {
      path: '/workspaces/:id',
      name: 'workspacesUpdate',
      component: WorkspaceManageView,
    },
    {
      path: '/bookmarks/new',
      name: 'bookmarksCreate',
      component: BookmarkManageView,
    },
    {
      path: '/bookmarks/:id',
      name: 'bookmarksUpdate',
      component: BookmarkManageView,
    },
  ],
})

export default router
