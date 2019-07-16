<template>
    <nav class="navbar navbar-expand-lg navbar-blue bg-dark rounded">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1" aria-controls="navbar1"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-md-center" id="navbar1">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li v-if="auth==''" class="nav-item">
                    <router-link class="nav-link" to="/login">Login</router-link>
                </li>
                <li v-if="auth==''" class="nav-item">
                    <router-link class="nav-link" to="/register">Register</router-link>
                </li>
                <li v-if="auth=='loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/profile">Profile</router-link>
                </li>
                <li v-if="auth=='loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/diet">User Diet</router-link>
                </li>
                <li v-if="auth=='loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/workout">User Workout</router-link>
                </li>
                <li v-if="auth=='loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/activityGraph">ActivityGraph</router-link>
                </li>
                 <li v-if="auth=='loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/activityLog">ActivityLog</router-link>
                </li> 
                <li v-if="auth=='loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/friends">My Friends List</router-link>
                </li>
                 <li v-if="auth=='loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/changePwd">Change Password</router-link>
                </li>                               
                <li v-if="auth=='loggedin'" class="nav-item">
                    <router-link class="nav-link" to="/about">About</router-link>
                    <li v-if="auth=='loggedin'" class="nav-item">
                    <a class="nav-link" href="" v-on:click="logout">Logout</a>
                </li>                
            </ul>
        </div>
    </nav>
</template>

<script>
import EventBus from './EventBus'

EventBus.$on('logged-in', test => {
  console.log(test)
})

export default {
  data () {
    return {
      auth: '',
      user: ''
    }
  },

  methods: {
    logout () {
      localStorage.removeItem('usertoken')
      localStorage.removeItem('userDetails')
      localStorage.removeItem('email')
    }
  },

  mounted () {
    EventBus.$on('logged-in', status => {
      this.auth = status
    })
  }
}
</script>
