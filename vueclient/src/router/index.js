import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

//import ActivityLog from '@/components/ActivityLog'
import About from '@/components/About'
import ActivityGraph from '@/components/ActivityGraph/ActivityGraph'

import Login from '../views/Login'
import Register from '../views/Register'
import Profile from '../views/Profile'
import ChangePwd from '../views/ChangePwd'
import WorkoutSheet from '../views/WorkoutSheet'
import DietSheet from '../views/DietSheet'
import ActivityLog from '../views/ActivityLog'
import MyFriendsAndShare from '../views/MyFriendsAndShare'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/changePwd',
      name: 'ChangePwd',
      component: ChangePwd
    },
    {
      path: '/workout',
      name: 'WorkoutSheet',
      component: WorkoutSheet
    },
    {
      path: '/diet',
      name: 'DietSheet',
      component: DietSheet
    },
    {
      path: '/activityLog',
      name: 'ActivityLog',
      component: ActivityLog
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
       path: '/activityGraph',
       name: 'ActivityGraph',
       component: ActivityGraph
     },
     {
      path: '/friends',
      name: 'MyFriendsAndShare',
      component: MyFriendsAndShare
    }
  ]
})
