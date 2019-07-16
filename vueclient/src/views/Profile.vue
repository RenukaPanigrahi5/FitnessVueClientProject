<template>
    <div class="container" style="align-center">
        <div class="jumbotron mt-5 profileDiv">
            <div class="col-sm-8 mx-auto">
                <h1 class="text-center">PROFILE</h1>
            </div>
            <table class="table col-md-6 mx-auto  text-center">
                <tbody>
                    <tbody>
                    <tr>
                        <td>Full Name</td>
                        <td>{{this.userDetails.fullName}}</td>
					</tr>
                    <tr>
                        <td>User Name</td>
                        <td>{{this.userDetails.username}}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{{this.userDetails.email}}</td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td>{{this.userDetails.height}}</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>{{this.userDetails.weight}}</td>
                    </tr>
                    <tr>
                        <td>Age</td>
                        <td>{{this.userDetails.age}}</td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>{{this.userDetails.gender}}</td>
					</tr>
                    <tr>
                        <td>Address</td>
                        <td>{{this.userDetails.address}}</td>
                    </tr>                    
                </tbody>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  data () {    
    const user = localStorage.getItem('userDetails');
    if (localStorage.getItem('userDetails')) {
        this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    }

    console.log("localstorage.user in profile "+ this.userDetails.fullName);
    return {      
      
    }
  }
}
</script>

<style>
.profileDiv {
            background-color: #c6b9e9;
            height:700px;
            width:750px;
            align-content: center;
            border: 0in;            
}
</style>
