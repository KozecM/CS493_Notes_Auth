<template>
  <div class="Page">
    <div class="email">
      <h2>Email: {{email}}</h2>
    </div>
    <div class="signOut">
      <button id="signout" v-on:click="signOut">Sign Out</button>
    </div>
    <div class="notes">
      <button id="note" v-on:click="notes">Notes</button>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
  import firebase from "firebase";

  export default {
    data() {
      return{
        email: '',
        uid: ''
      };
    },

    methods: {
      signOut: function () {
        firebase.auth().signOut()
        .then(() => {
          this.$router.push('/');
        });
      },
      notes: function () {
        this.$router.push('/notes/' + this.uid)
      }  
    },

    mounted: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if(user){
          this.uid = user.uid;
          this.email = user.email;
        }else{
          this.$router.push('/');
        }
      })
    }
  };
/*eslint -enable*/
</script>

<style scoped>

h3 {
  color: darkgreen;
}

</style>