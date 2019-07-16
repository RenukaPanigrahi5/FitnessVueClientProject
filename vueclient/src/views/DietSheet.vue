<template>
    <div class="container" style="align-center">
        <div class="jumbotron mt-5 profileDiv">
            <div class="col-sm-8 mx-auto">
                <h3 class="text-center"> Diet details as per your BMI</h3>
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
                                    <td>DietCategory</td>
                                    <td>{{this.dietCategory}}</td>
                                </tr>                                    
                        </tbody>
                    </tbody>
                </table>
            </div>
        
            <div>               
                <div>
                    <v-tabs  v-model="active" color="blue"  dark slider-color="yellow" >
                        <v-tab v-for="dietSheet in this.dietSheets"  :key="dietSheet" ripple >
                             {{ dietSheet.dietTime }}
                        </v-tab>                        
                        <v-tab-item v-for="dietSheet in this.dietSheets"  :key="dietSheet" ripple>                            
                            <v-card flat>
                                <v-card-text>                                      
                                                <li v-for="subDietSheet in dietSheet.dietInDetails">
                                                     {{ subDietSheet.name }}
                                                </li>                                            
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>                   
                </div>             
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
                dietSheets: [],
                active: null,
                text: '',
                dietCategory: ''
            }      
 },
 created(){
    //const user = localStorage.getItem('userDetails');
        if (localStorage.getItem('userDetails')) {
            this.userDetailsFromLocalStorage = JSON.parse(localStorage.getItem('userDetails'));
        }
        
       // const workoutCategory = "OverWeightMale";        
       
        this.dietCategory = this.calculateBMI();        
        
        const url = this.$BASE_URL+'dietSheet/getDietByCategory?dietCategory='+this.dietCategory;
        const headers= {"content-type": "application/json"}  
        axios.get(url, headers).then(res => {
           if(res.data.dietSheets){
                    this.dietSheets = res.data.dietSheets;             
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
</style>
