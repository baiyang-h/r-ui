import Home from '@/views/home'
import Form from '@/views/form'
import Search from '@/views/search'
import Table from '@/views/table'
import Modal from '@/views/modal'

export default [
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/form',
        name: 'Form',
        component: Form
    },
    {
        path: 'search',
        name: 'Search',
        component: Search
    },
    {
        path: '/table',
        name: 'Table',
        component: Table
    },
    {
        path: '/modal',
        name: 'Modal',
        component: Modal
    },
]
