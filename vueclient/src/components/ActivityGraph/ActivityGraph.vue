<template>
<div>
    <div class="ActivityGraphWrapper">
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">Activity data</h3>
          </div>
          <div class="box-body">
            <div class="row">
              <div class="col-md-8">
                <line-chart></line-chart>
              </div>
              <div class="col-md-4">
                <p>Data points</p>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form v-on:submit.prevent="saveActivity">
                    <h1 class="h3 mb-3 font-weight-normal">Please Enter Your Activity Details</h1>
                    <div class="form-group">
                      <label for="activity">Running</label>
                      <input type="number" v-model="user.disance" v-validate="'required'" class="form-control" name="disance" placeholder="Enter how much distance in meters" :class="{ 'is-invalid': submitted && errors.has('disance') }">
                      <div v-if="submitted && errors.has('disance')" class="invalid-feedback">{{ errors.first('disance') }}</div>
                    </div>
                    <div class="form-group">
                      <input type="date" v-model="user.day" v-validate="'required|min: 6'" class="form-control" name="day" placeholder="Enter Day" :class="{ 'is-invalid': submitted && errors.has('day') }">
                      <div v-if="submitted && errors.has('day')" class="invalid-feedback">{{ errors.first('day') }}</div>
                    </div>
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Save</button>
                </form>
            </div>
        </div>
    </div>    
      
</div>
</template>
<script>
  import axios from 'axios'
  import LineChart from './LineChart'
  export default {
     data () {
     return {
          user:{
                disance: '',
                day: '', 
                email : ''               
              },
          submitted: false
     }
    },
    components: {
      'line-chart': LineChart
    },
    methods: {
      saveActivity(e){
           const email = localStorage.getItem('email');  
           this.$validator.validate().then(valid => {                
                      if (valid) {                                                       
                                  const url = this.$BASE_URL+'activity/addActivities';
                                  const body = {email: localStorage.getItem('email'),  
                                                activity_day: this.user.day, 
                                                disance: this.user.disance
                                                };
                                  const headers= {"content-type": "application/json"}                      
                                 
                                  axios.post(url, body, headers).then(res => {
                                        if(res.data){
                                            this.$toaster.success('Activity added successfully')
                                        }else{
                                          this.$toaster.error('Failed to add Activity')
                                        }                                        
                                  }).catch(err => {                                      
                                        this.$toaster.error('There is some error try again'+err)
                                  })                                  
                      }else{
                        this.$toaster.error('Form validation Failed');
                      }                      
              });   


      }
    }
  }
</script>