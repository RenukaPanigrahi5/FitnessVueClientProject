import axios from 'axios'
import {Line} from 'vue-chartjs';

export default {
    extends: Line,
    data() {
       return {
          datacollection: {
             //Data to be represented on x-axis
             labels: [],
             datasets: [{
                label: 'Running in meters',
                backgroundColor: '#f87979',
                pointBackgroundColor: 'white',
                borderWidth: 1,
                pointBorderColor: '#249EBF',
                //Data to be represented on y-axis
                data: []
             }]
          },
          //Chart.js options that controls the appearance of the chart
          options: {
             scales: {
                yAxes: [{
                   ticks: {
                      beginAtZero: true
                   },
                   gridLines: {
                      display: true
                   }
                }],
                xAxes: [{
                   gridLines: {
                      display: false
                   }
                }]
             },
             legend: {
                display: true
             },
             responsive: true,
             maintainAspectRatio: false
          }
       }
    },
    beforeMount: async function(){
          if (localStorage.getItem('userDetails')) {
              this.userDetailsFromLocalStorage = JSON.parse(localStorage.getItem('userDetails'));
          }
          
          const email = this.userDetailsFromLocalStorage.email;      
          
          const url = this.$BASE_URL+'activity/getActivityInfo?email='+email;
          const headers= {"content-type": "application/json"}  
          await axios.get(url, headers).then(res => {
              if(res.data){                
                        this.data = res.data.activityData;
                        this.labels = res.data.labels;         
              }
          }).catch(err => {
              this.$toaster.error('not able to fetch data from server.'+err)
          })          
   },
   mounted: async function() {
       //renderChart function renders the chart with the datacollection and options object.
       this.renderChart(this.datacollection, this.options)
    }
 }
 