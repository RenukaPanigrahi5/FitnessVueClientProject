<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form v-on:submit.prevent="login">
                    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <div class="form-group">
                      <input type="email" v-model="user.email" v-validate="'required'" class="form-control" name="email" placeholder="Enter Email" :class="{ 'is-invalid': submitted && errors.has('email') }">
                      <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
                    </div>
                    <div class="form-group">
                      <input type="password" v-model="user.password" v-validate="'required|min: 6'" class="form-control" name="password" placeholder="Enter Password" :class="{ 'is-invalid': submitted && errors.has('password') }">
                      <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
                    </div>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">
                      <i class="fa fa-sign-in"></i>Sign in</button>
                      </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import EventBus from '../components/EventBus'

export default {
  data () {
     return {
          user:{
                password: '',
                email: ''                
              },
          submitted: false
    }
  },

  methods: {
    login (e) {
              this.submitted = true;
              this.$validator.validate().then(valid => {                
                      if (valid) {                                                       
                                  const url = this.$BASE_URL+'users/authenticate';
                                  const body = this.user;
                                  const headers= {"content-type": "application/json"}                      
                                  console.log("in inside login "+body.email + body.password)
                                  axios.post(url, body, headers).then(res => {
                                        if(res.data.id_token){
                                            this.$toaster.success('Login successful.')
                                            const parsedUser = JSON.stringify(res.data.user);
                                            localStorage.setItem('usertoken', res.data.id_token)
                                            localStorage.setItem('userDetails', parsedUser)
                                            localStorage.setItem('email', res.data.user.email)                                            
                                            router.push({ name: 'Profile' })
                                            this.emitMethod()
                                        }else{
                                          
                                         this.$toaster.error('Wrong Password')
                                        }                                        
                                  }).catch(err => {                                      
                                        this.$toaster.error('There is some error try again'+err)
                                  })                                  
                      }else{
                        console.log("Form validation Failed");
                      }                      
              });                
    },    
    emitMethod () {
      EventBus.$emit('logged-in', 'loggedin')
    }
  }
}
</script>
