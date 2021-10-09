import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Projects from '../views/Projects.vue'
import Contact from '../views/Contact.vue'
import OsuTeamCompare from '../views/OsuTeamCompare.vue';

const routes = [
  {
    path: '/me',
    name: 'Home',
    component: Home
  },
  {
    path: '/me/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/me/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/me/projects/osuteamcompare',
    name: 'osu! Team Compare',
    component: OsuTeamCompare,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
