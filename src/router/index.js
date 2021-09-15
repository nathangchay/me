import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Projects from '../views/Projects.vue'
import Contact from '../views/Contact.vue'
import OsuTeamCompare from '../views/OsuTeamCompare.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/projects/osuteamcompare',
    name: 'osu! Team Compare',
    component: OsuTeamCompare,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
