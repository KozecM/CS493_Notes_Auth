<template>
  <div class="notes_view">
    <div class="categories">
      <h3> Categories </h3>        
      <ul>
        <li v-for="(category) in categories"
        v-bind:key="category.id">
          <button id="category" v-on:click="choose(category.id)">{{category.data().title}}</button>
          <div class = "category_notes" v-if="currentCat == category.id">
            <h4> Notes </h4>
            <ul class="notes">
              <li v-for="(note) in notes"
              v-bind:key="note.id">
                <button id="note" v-on:click=" info(category.id, note.id)">{{note.data().title}}</button>
              </li>
            </ul>
            <div class="noteInputs" id="noteInputs">
              <input id="noteTitle" v-model="noteTitle" placeholder="Title">
              <input id="description" v-model="description" placeholder="Description">
            </div>
            <div class="add_note">
              <button id="note" v-on:click="addNote(category.id)">Add Note</button>
            </div>
          </div>
          <br/>
        </li>
      </ul>
    </div>
    <br />
    <input id="categoryTitle" v-model="categoryTitle" placeholder="Category">
    <br />
    <div class="add_category">
      <button id="addCategory" v-on:click="addCategory()">Add Category</button>
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
      categoryTitle: "",
      noteTitle: "",
      description: "",
      categories: [],
      notes: [],
      uid: '',
      currentCat: '',
    };
  },

  // firebase: {
  //   notes: notesRef
  // },

  methods: {
    addCategory: function() {
      
      db.collection('users').doc(this.uid)
        .collection('categories').add({
        title: this.categoryTitle
      })
      this.categoryTitle = "";
     
    },
    addNote(catId){
      
      db.collection('users').doc(this.uid)
        .collection('categories').doc(catId)
        .collection('notes').add({
          title: this.noteTitle,
          description: this.description
        })
        this.noteTitle = ""
        this.description = ""
    },
    choose(catId){
      this.currentCat = catId;
      this.getNotes(catId);
    },
    getNotes(catId){
      db.collection('users').doc(this.uid)
        .collection('categories').doc(catId)
        .collection('notes').onSnapshot( snapshot => {
          this.notes = [];
          snapshot.docs.forEach(element => {
            this.notes.push(element);
          });
        });
    },
    info(catId, noteId) {
      this.$router.push({path: '/notes/'+ this.uid + '/viewnote/' + catId + "/" + noteId})
    },
    back: function() {
      this.$router.push({name: 'Dashboard'})
    }
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.uid = user.uid;

        db.collection('users').doc(user.uid).collection('categories').onSnapshot( snapshot => {
          this.categories = [];
           snapshot.docs.forEach(element => { 
            this.categories.push(element);
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

  .category_notes {
    margin: auto;
    top: 50%;
    left: 50%;
    padding: .5cm;
    border-radius: 25px;
    background-color: darkolivegreen; 
  }

  #note {
  display: inline-block;
  border: 3px solid lightgreen;
  padding: 6px 19px;
  margin:0 5px 5px 0;
  border-radius: 2px;
  box-sizing: border-box;
  text-decoration: none;
  color:black;
  text-align: center;
  background-color: transparent;
  transition: all 0.3s;
}

#note:hover{
  color: darkgreen;
  background-color: lightgreen;
}

  ul {
    padding-inline-start: 0px;
  }
  li {
    display: block;
  }

  h4 {
    color: black;
  }
</style>