<template>
    <div class="container" style="align-center">
        <div class="jumbotron mt-5 profileDiv">
            <div class="col-sm-8 mx-auto">
                <h3 class="text-center">User Workout Details as per your BMI</h3>
            </div>
            <div>
                <table class="table col-md-6 mx-auto  text-center">
                    <tbody>
                        <tbody>
                                <tr>
                                    <td>Age</td>
                                    <td>{{this.userDetailsFromLocalStorage.age}}</td>
                                </tr>
                                <tr>
                                    <td>Height</td>
                                    <td>{{this.userDetailsFromLocalStorage.height}}</td>
                                </tr>
                                <tr>
                                    <td>Weight</td>
                                    <td>{{this.userDetailsFromLocalStorage.weight}}</td>
                                </tr>
                                <tr>
                                    <td>WorkoutCategory</td>
                                    <td>{{this.workoutCategory}}</td>
                                </tr>                                    
                        </tbody>
                    </tbody>
                </table>
            </div>
        
            <div>               
                <div>
                    <v-tabs  v-model="active" color="blue"  dark slider-color="yellow" >
                        <v-tab v-for="workout in this.workouts"  :key="workout" ripple >
                             {{ workout.workoutDay }}
                        </v-tab>                        
                        <v-tab-item v-for="workout in this.workouts"  :key="workout" ripple>                            
                            <v-card flat>
                                <v-card-text>Workout For: {{ workout.workoutName }} <br>
                                             Workout Type:  {{ workout.workoutType }} <br>                                             
                                                <li v-for="subWorkout in workout.workoutInDetails">
                                                    {{ subWorkout.name }}  --> noOfSets ::  {{ subWorkout.noOfSets }}
                                                </li>                                            
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>                   
                </div>             
            </div>
            
            <div id="serachWorkout">
                    <h1>Auto TextBox</h1>
                    <v-select :options="options" @search="onSearch"></v-select>                   
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import EventBus from '../components/EventBus'

export default {
  data: function() {    
        return{
                workouts: [],
                active: null,
                text: '',
                workoutCategory: '',
                options: []
            }      
 },
 created(){
    //const user = localStorage.getItem('userDetails');
        if (localStorage.getItem('userDetails')) {
            this.userDetailsFromLocalStorage = JSON.parse(localStorage.getItem('userDetails'));
        }
        
       // const workoutCategory = "OverWeightMale";
        
        const gender = this.userDetailsFromLocalStorage.gender;
        this.workoutCategory = this.calculateBMI()+gender;        
        
        const url = this.$BASE_URL+'workout/getWorkoutCategory?workoutCategory='+this.workoutCategory;
        
        const headers= {"content-type": "application/json"}  
        axios.get(url, headers).then(res => {
            
            if(res.data.workouts){
                    this.workouts = res.data.workouts;            
            }
        }).catch(err => {
            this.$toaster.error('not able to fetch data from server.'+err)
        })

 },
 methods: {
      next () {
        const active = parseInt(this.active)
        this.active = (active < 2 ? active + 1 : 0)
      },
      calculateBMI(){
          
        const user = localStorage.getItem('userDetails');
        if (localStorage.getItem('userDetails')) {
            this.userDetailsFromLocalStorage = JSON.parse(localStorage.getItem('userDetails'));
            const height =  this.userDetailsFromLocalStorage.height/100;     
            const weight =  this.userDetailsFromLocalStorage.weight;
            const BMI = weight/(height*height) 
            
            if (BMI < 18.5) {     
               return "UnderWeight"  
            }else if ( BMI >= 18.5 && BMI < 24.9) {
               return "Healthy"            
            } else if ( BMI >= 24.9 && BMI < 30) {
                return "OverWeight"  
            }else if ( BMI >=30) {
                return "Obesity" 
            }
        }        
      },
      onSearch(searchedText){
            const url = this.$BASE_URL+'workout/getAllworkoutsBySearchedText?searchedText='+searchedText;
        
            const headers= {"content-type": "application/json"}  
            axios.get(url, headers).then(res => {
                
                if(res.data.allWorkoutNames){
                        this.options = res.data.allWorkoutNames;            
                }
            }).catch(err => {
                this.$toaster.error('not able to fetch data from server.'+err)
            })
      }
    }

}
</script>

<style>
.profileDiv {
            background-color: lightblue;
            height:700px;
            width:700px;
            align-content: center;
            border: 0in;            
}

body {
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  text-rendering: optimizelegibility;
  -moz-osx-font-smoothing: grayscale;
  -moz-text-size-adjust: none;
}

h1,.muted {
  color: #2c3e5099;
}

h1 {
  font-size: 26px;
  font-weight: 600;
}

#serachWorkout {
  max-width: 30em;
  margin: 1em auto;
}

</style>
