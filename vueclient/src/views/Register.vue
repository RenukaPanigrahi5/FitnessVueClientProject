<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="register">
          <h1 class="h3 mb-3 font-weight-normal">Register</h1>
          <div class="form-group">
           <input type="text" v-model="user.fullName" v-validate="'required'" class="form-control" name="fullName" placeholder="Enter Full Name" :class="{ 'is-invalid': submitted && errors.has('fullName') }"></i>
            <div v-if="submitted && errors.has('fullName')" class="invalid-feedback">{{ errors.first('fullName') }}</div>
            </div>
          <div class="form-group">
            <input type="text" v-model="user.username" v-validate="'required'" class="form-control" name="username" placeholder="Enter User Name" :class="{ 'is-invalid': submitted && errors.has('username') }">
            <div v-if="submitted && errors.has('username')" class="invalid-feedback">{{ errors.first('username') }}</div>
          </div>          
          <div class="form-group">
            <input type="password" v-model="user.password" v-validate="'required|min: 6'" class="form-control" name="password" placeholder="Enter Password" :class="{ 'is-invalid': submitted && errors.has('password') }">
            <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
          </div>
          <div class="form-group">
            <input type="email" v-model="user.email" v-validate="'required'" class="form-control" name="email" placeholder="Enter Email" :class="{ 'is-invalid': submitted && errors.has('email') }">
            <div v-if="submitted && errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
          </div>
           <div class="form-group">
            <input type="number" v-model="user.height" v-validate="'required'" class="form-control" name="height" placeholder="Enter Height in [centi meters]" :class="{ 'is-invalid': submitted && errors.has('height') }">
            <div v-if="submitted && errors.has('height')" class="invalid-feedback">{{ errors.first('height') }}</div>
          </div>
          <div class="form-group">
            <input type="number" v-model="user.weight" v-validate="'required'" class="form-control" name="weight" placeholder="Enter Weight [KG]" :class="{ 'is-invalid': submitted && errors.has('weight') }">
            <div v-if="submitted && errors.has('weight')" class="invalid-feedback">{{ errors.first('weight') }}</div>
          </div>
          <div class="form-group">
            <input type="text" v-model="user.age" v-validate="'between:20,60'"  class="form-control" name="age" placeholder="Enter Age Between 20 to 60 years" :class="{ 'is-invalid': submitted && errors.has('age') }">
            <div v-if="submitted && errors.has('age')" class="invalid-feedback">{{ errors.first('age') }}</div>
          </div>
           <div class="form-group">
             <label for="gender">Select Gender</label>
             <select name="gender" id="gender"  v-validate="'required'" v-model="user.gender" placeholder="Enter Gender" class="form-control" :class="{ 'is-invalid': submitted && errors.has('gender') }">               
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
            </select>           
            <div v-if="submitted && errors.has('gender')" class="invalid-feedback">{{ errors.first('gender') }}</div>
          </div>
           <div class="form-group">
            <input type="text" v-model="user.address" v-validate="'required'" class="form-control" name="address" placeholder="Enter Address" :class="{ 'is-invalid': submitted && errors.has('address') }">
            <div v-if="submitted && errors.has('address')" class="invalid-feedback">{{ errors.first('address') }}</div>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            <i class="fa fa-registered"></i>Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  data () {
    return {
          user:{
                fullName: '',
                username: '',
                password: '',
                email: '',
                height: '',
                weight: '',
                gender: '',
                address: '',
                age: ''
              },
          submitted: false
    }
},

  methods: {
    register (e) {
      this.submitted = true;
      this.$validator.validate().then(valid => {
                if (valid) {
                    const url = this.$BASE_URL+'users/register';
                    const body = this.user;
                    const headers= {"content-type": "application/json"} 
                    axios.post(url, body, headers).then(res => {
                          if(res.data.id_token){
                                    localStorage.setItem('usertoken',res.data.id_token);
                                    this.$toaster.success('Registration Successful.')
                                    router.push({ name: 'Login' })
                          }else{
                              this.$toaster.error('Registration Failed.')                              
                            // router.push({ name: 'Error' }) push to error page
                          }
                      }).catch(err => {                       
                        this.$toaster.error('Registration Failed.', {timeout: 20000} + err)
                      })  
                  } else {
                     this.$toaster.error('validatin Failed!! ')       
                  }
      });      
    }
  }
}
</script>
