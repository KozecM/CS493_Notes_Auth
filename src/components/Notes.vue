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

  li {
    display: block;
  }

  #info {
    border: 4px solid gray;
    padding: 6px 19px;
    margin:0 5px 5px 0;
    border-radius: 10px;
    color:black;
    text-align: center;
    font-size: 20pt;
    background-color: slategray
  }

  #inputs {
    position: relative;;
    left: 50%;
    -webkit-transform: translate(-50%, 0);
    border: 4px solid gray;
    padding: 10px;
    width:fit-content;
  }

  #add {
    border: 3px solid gray;
    padding: 6px 19px;
    margin:0 5px 5px 0;
    border-radius: 10px;
    color:black;
    text-align: center;
    font-size: 10pt;
    background-color: slategray
  }
</style>