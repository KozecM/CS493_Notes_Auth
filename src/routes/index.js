import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import Notes from '../components/Notes.vue'
import ViewNote from '../components/ViewNote.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/notes/:uid',
        name: 'Notes',
        component: Notes
    },
    {
        path: '/notes/:uid/viewnote/:id',
        name: 'viewNote',
        component: ViewNote,
    }
]
});

export default router