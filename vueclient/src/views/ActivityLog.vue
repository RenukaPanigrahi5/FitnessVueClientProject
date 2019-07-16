<template>
<div>
    <div>        
       <div>
        <chartjs-doughnut v-bind:labels="labels"
        v-bind:datasets="datasets" v-bind:option="option">
        ></chartjs-doughnut>
    </div>
        <div class="shareWith">
            <p>Share with friends through Facebook and googleplus</p>
        <ShareFacebook url="http://localhost:8082/fitnessapp/activity/addActivitiyLog"/>    
        <ShareGooglePlus url="http://localhost:8082/fitnessapp/activity/addActivitiyLog"/>    
    </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form v-on:submit.prevent="saveActivityLog">
                   
                    <div class="form-group">
                        <label for="activityLog">Select Activity</label>
                        <select name="activityLog" id="activityLog"  v-validate="'required'" v-model="user.activityLog" class="form-control" :class="{ 'is-invalid': submitted && errors.has('activityLog') }">               
                            <option value="ChestWorkout">ChestWorkout</option>
                            <option value="LegsWorkout">LegsWorkout</option>
                            <option value="TricepsWorkout">TricepsWorkout</option>
                            <option value="ChestWorkout">BackWorkout</option>
                            <option value="LegsWorkout">ShouldersWorkout</option>
                            <option value="TricepsWorkout">BicepsWorkout</option>
                            <option value="TricepsWorkout">Cardio</option>
                        </select>  
                     </div>
                      <div class="form-group">
                            <input type="number" v-model="user.duration" v-validate="'required'" class="form-control" name="duration" placeholder="Enter duration in [hours]" :class="{ 'is-invalid': submitted && errors.has('duration') }">
                            <div v-if="submitted && errors.has('duration')" class="invalid-feedback">{{ errors.first('duration') }}</div>
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
import router from '../router'
import EventBus from '../components/EventBus'
import { ShareFacebook,  ShareGooglePlus } from 'vue-share-social'


export default {    
    data: function() {
        return {
            labels: [],
            
            datasets: [
                {   
                  
                  data: [],
                  backgroundColor: ["Red", "Yellow", "Purple","Green", "Indigo", "Blue", "Voilet"]
                }
            ],
            option: {
                title: {
                    display: true,
                    position: "bottom",
                    text: "Workouts"
                }
            },
            user:{                
                activityLog: '', 
                duration : ''               
              },
              submitted: false
        };
    },
    created: async function(){
        const url = this.$BASE_URL+'activity/getActivityLogInfo?email='+localStorage.getItem('email');
        const headers= {"content-type": "application/json"}  
        await axios.get(url, headers).then(res => {
            console.log('fullName from API ');
            if(res.data){
                this.labels = res.data.labels;
                this.data = res.data.activityData;     
                console.log("res.data.labels-- "+res.data.labels);
                console.log("res.data.activityData -- "+ res.data.activityData);                 
            }
        }).catch(err => {
            this.$toaster.error('not able to fetch data from server.'+err)
        })
    },
    methods: {
      saveActivityLog(e){
          this.submitted = true;
           const email = localStorage.getItem('email');  
           this.$validator.validate().then(valid => {                
                      if (valid) {                                                       
                                  const url = this.$BASE_URL+'activity/addActivitiyLog';
                                  const body = {email: localStorage.getItem('email'),  
                                                activity_name: this.user.activityLog, 
                                                duration: this.user.duration
                                                };
                                  const headers= {"content-type": "application/json"}                      
                                 
                                  axios.post(url, body, headers).then(res => {
                                        if(res.data){
                                            this.$toaster.success('Activity log added successfully')
                                        }else{
                                          this.$toaster.error('Failed to add Activity Log')
                                        }                                        
                                  }).catch(err => {                                      
                                        this.$toaster.error('There is some error try again'+err)
                                  })                                  
                      }else{
                        this.$toaster.error('Form validation Failed');
                      }                      
              });   


      }
    },
    components: {
        ShareFacebook,
        ShareGooglePlus
    }
};
</script>
<style>
div.shareWith{
 width: 500px;
 margin: auto;
 align-items: center;
 border: 3px solid #73ad73;
}
</style>