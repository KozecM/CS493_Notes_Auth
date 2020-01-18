<template>
  <div class="notes_view">
    <div class="titles">
      <ul>
        <li v-for="(noteInfo) in notes"
        v-bind:key="noteInfo.id">
          <button id="info" v-on:click="info(noteInfo)">{{noteInfo.data().title}}</button>
          <br/>
        </li>
        
      </ul>
    </div>
    <div class="inputs" id="inputs">
        <input id="title" v-model="title" placeholder="Title">
        <input id="description" v-model="description" placeholder="Description">
    </div>
    <br />
    <div class="add_button">
      <button id="add" v-on:click="add">Add Note</button>
    </div>
    <div class= "back">
      <button id="back" v-on:click="back">Back</button>
    </div>        
  </div>
</template>

<script>
/*eslint-disable*/
import * as firebase from 'firebase'
import {db} from '../firebase';

export default {
  
  data() {
    return{
      title: "",
      description: "",
      notes: [],
      uid: '',
    };
  },

  // firebase: {
  //   notes: notesRef
  // },

  methods: {
    add: function() {

      var note = {
        
      }
      
      db.collection('users').doc(this.uid).collection('notes').add({
        title: this.title,
        description: this.description
      })
      this.title = "";
      this.description = "";
     
    },
    info(info) {
      this.$router.push({path: '/notes/'+ this.uid + '/viewnote/' + info.id})
    },
    back: function() {
      this.$router.push({name: 'Dashboard'})
    }
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.uid = user.uid;

        db.collection('users').doc(user.uid).collection('notes').onSnapshot( snapshot => {
          this.notes = [];
           snapshot.docs.forEach(element => { 
            this.notes.push(element);
           });
        });

      }else{
        this.$router.push('');
      }
    });
  }
}

/*eslint-enable*/
</script>

<style scoped>

  ul {
    padding-inline-start: 0px;
  }
  li {
    display: block;
  }
</style>