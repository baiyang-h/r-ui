import Home from '@/views/home'
import Form from '@/views/form'
import Search from '@/views/search'
import Table from '@/views/table'
import Modal from '@/views/modal'
import FormDesigner from "@/views/form-designer";

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
    {
        path: '/form-designer',
        name: 'FormDesigner',
        component: FormDesigner
    },
]
