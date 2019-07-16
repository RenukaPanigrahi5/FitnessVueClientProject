<template>
<div>
    <br>
    <br>
    <br>
  <div class="friendsDev">
    <v-toolbar flat color="white">
      <v-toolbar-title>My Friends List</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="1000px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Friend</v-btn>
        </template>
        <v-card> 
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text class="">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Friend name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.email" label="Friend Email"></v-text-field>
                </v-flex>               
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="friends"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td >{{ props.item.email }}</td>     
        <td class="justify-center layout px-0">
          
          <v-icon
            small
            @click="deleteItem(props.item)"
           >
            delete
          </v-icon>
        </td>
      </template>      
    </v-data-table>
  </div>
    <br><br><br>
    <div class="shareWith">
        <p>Share this app with your friends through </p>
        <facebook :url="url" scale="3"></facebook>            
        <whats-app :url="url" title="Hello" scale="3"></whats-app>            
        <email :url="url" subject="Hello" scale="3"></email>
    </div>
  </div>  
</template>
<script>
import {
  Facebook,  
  WhatsApp,
  Email
} from "vue-socialmedia-share";
import axios from 'axios'
export default {
    data: () => ({
      url: this.$BASE_URL,
      dialog: false,
      headers: [
        {
          text: 'Friends Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Email', value: 'email' },      
        { text: 'Remove Friend', value: 'name', sortable: false }
      ],
      friends: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      }
    }),

    computed: {
      formTitle () {
        return  'New Friend'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
                    const url = this.$BASE_URL+'users/listAllFriends';                    
                    const headers= {"content-type": "application/json"}    
                    axios.get(url, headers).then(res => {  
                        if(res){                 
                            this.friends =  res.data.friends;                         
                           console.log(res.data.friends);
                        }else {
                            this.$toaster.error('Password updatation Failed')
                        }                                        
                    }).catch(err => {
                            this.$toaster.error('Password updatation Failed', {timeout: 20000} + err)                                       
                    })
      },     

      deleteItem (item) {
                    alert(item.email)
                    const url = this.$BASE_URL+'users/deleteFriend?email='+item.email;                    
                    const headers= {"content-type": "application/json"} 
                    confirm('Are you sure you want to delete this friend?');   
                    axios.delete(url, headers).then(res => {  
                        if(res){ 
                            const index = this.friends.indexOf(item)
                            this.friends.splice(index, 1)
                        }else {
                            this.$toaster.error('removing friend Failed')
                        }                                        
                    }).catch(err => {
                            this.$toaster.error('removing friend Failed Due to server error', {timeout: 20000} + err)                                       
                    })
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.friends[this.editedIndex], this.editedItem)
        } else {
            const url = this.$BASE_URL+'users/addNewFriend';                    
                const headers= {"content-type": "application/json"} 
                const body = {name: this.editedItem.name,
                             email: this.editedItem.email}
                axios.post(url, body, headers).then(res => {  
                    if(res){ 
                        this.friends.push(this.editedItem)
                        this.$toaster.error('successfully add new friend')
                    }else {
                        this.$toaster.error('adding new friend Failed')
                    }                                        
                }).catch(err => {
                        this.$toaster.error('adding Friend Failed Due to Server Error', {timeout: 20000} + err)                                       
                })  
        }
        this.close()
      }
    },
    components: {
        Facebook,        
        WhatsApp,
        Email
  }
  }
</script>

<style>
div.friendsDev{
 width: 750px;
 margin: auto;
 border: 3px solid #73ad73;
}
div.shareWith{
 width: 500px;
 margin: auto;
 align-items: center;
 border: 3px solid #73ad73;
}
</style>