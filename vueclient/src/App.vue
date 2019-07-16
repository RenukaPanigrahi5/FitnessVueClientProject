<template>
  <div id="app">
    <navbar> </navbar>
    <router-view />
    
  </div>
</template>

<script>
import Vue from 'vue'
import facebookLogin from 'facebook-login-vuejs';
import Navbar from './components/Navbar';
import vSelect from 'vue-select';


export default {
  name: 'App',
  components: {
     facebookLogin, 
     'Navbar': Navbar,
    'vSelect': 'vue-select'
  }
  }
</script>
<style>
.fitnessDiv {
            background-color: #0c145e;
            border: 0in;            
}
</style>

