<template>
  <div class="view_note">
    <div class="back">
      <button id="back" v-on:click="back">Back to Notes</button>
    </div>
    <br />
    <div v-if="!editVal">
      <div class="edit_delete">
        <button id="edit" v-on:click="change">Edit</button>
        <button id="remove" v-on:click="remove">Remove</button>
      </div>
     
      <div class="title">
        <h2>Title: {{title}}</h2>
      </div>
      <div class="description">
        <h2>Description</h2>
        <h3>{{description}}</h3>
      </div>
    </div>
    <div v-else>
      <input type="text" v-model="title">
      <input type="text" v-model="description">
      <button id="save" v-on:click="save">Save</button>
    </div>
    <br />
    <div class="add_pic">
      <input type="file" multiple @change="onFileChosen">
    </div>
    <div v-if="imagesData!= null">
      <button id="upload" v-on:click="onUpload">Upload</button>
    </div>
    <div v-for=""
  </div>
</template>

<script>
/*eslint-disable*/
import * as firebase from 'firebase'
import {db} from '../firebase';

export default {
  data () {
    return{
      uid: '',
      id: '',
      title: '',
      description: '',
      imagesData: null,
      pictures: null,
      uploadValue: 0,
      editVal: false
    }  
  },

  methods: {
    onFileChosen(event) {
      this.uploadValue=0;
      this.pictures =null;
      this.imagesData = event.target.files;
    },
    onUpload() {
      this.pictures=null;

      this.imagesData.forEach(image => {
        const ref = firebase.storage().ref('images/'+ this.uid + '/' + this.id + `/${image.name}`).put(image);
        ref.on(`state_changed`, snapshot => {
          this.uploadValue= (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        },
        ()=>{this.uploadValue=100;
          ref.snapshot.ref.getDownloadURL().then((url) => {
            this.pictures.push = url;
          });
        });
      });

      this.imagesData = null;
    },
    remove: function() {
      db.collection('users').doc(this.uid).collection('notes').doc(this.id).delete() ;
      this.$router.push({name: "Notes"});
    },
    change: function() {
      this.editVal = true;
    },
    save: function() {
      db.collection('users').doc(this.uid).collection('notes').doc(this.id).set({
        title: this.title, 
        description: this.description})
      .then((this.editVal = false))
    },
    back: function() {
      this.$router.push({path:'/notes/' + this.uid})
    }
  },
  mounted: function () {
     firebase.auth().onAuthStateChanged((user) => {
      if(user){
        db.collection('users').doc(user.uid).collection('notes').doc(this.$route.params.id).get()
        .then(snapshot => {
          this.uid = user.uid;
          this.id = snapshot.id;
          this.title = snapshot.data().title;
          this.description = snapshot.data().description;
        });
        
      }
     });
  }
}
/*eslint-enable*/
</script>

<style scoped>
  button {
    border: 4px solid gray;
    padding: 6px 19px;
    margin:0 5px 5px 0;
    border-radius: 10px;
    color:black;
    text-align: center;
    font-size: 20pt;
    background-color: slategray
  }
</style>