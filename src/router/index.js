import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Projects from '../views/Projects.vue';
import Contact from '../views/Contact.vue';
import Mandelbrot from '../views/Mandelbrot.vue';

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
    path: '/mandelbrot',
    name: 'Mandelbrot',
    component: Mandelbrot,
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
