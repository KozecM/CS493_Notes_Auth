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
      <input type="file" multiple @change="onFileChosen" ref="file" class="inputfile"> 
      <button @click="$refs.file.click()" >Choose Files</button>
    </div>
    <div v-if="imagesData!= null">
      <button id="upload" v-on:click="onUpload">Upload</button>
    </div>
    <ul :style="gridStyle" class="image-list">
      <li v-for="(picture) in pictures" v-bind:key="picture.id" class="image-item">
        <img class="image" :src="picture.data().url">
      </li>
    </ul>
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
      pictures: [],
      uploadValue: 0,
      numberOCols: 2,
      editVal: false,
      images:null
    }  
  },
  computed: {
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.numberOCols}, minmax(200px, 1fr))`
      }
    },
  },
  methods: {
    onFileChosen(event) {
      this.uploadValue=0;
      this.imagesData = event.target.files;
    },
    onUpload() {

      this.imagesData.forEach(image => {
        var storRef = firebase.storage().ref('images/'+ this.uid + '/' + this.id + `/${image.name}`);

        var task = storRef.put(image);
        console.log("url" + task.snapshot.downloadURL);

        task.on('state_changed',
          snapshot => {

            var percent = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
            this.uploadValue = percent;
          },
          function error(err) {
            console.log(err);
          },
          ()=>{this.uploadValue =100;
            task.snapshot.ref.getDownloadURL().then((url) => {
              db.collection('users').doc(this.uid)
                .collection('notes').doc(this.id)
                .collection('imageUrls').add({
                url: url
              }).then(snapshot => {
                this.pictures.push(snapshot);
              }); 
            })

          }
        ); 
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

       db.collection('users').doc(user.uid)
        .collection('notes').doc(this.$route.params.id)
        .collection('imageUrls').get()
        .then(snapshot => {
          snapshot.docs.forEach(element => {
            console.log("element" + element.data().url);
            this.pictures.push(element);
          });
        });
       
     }
    });
    
  }
}
/*eslint-enable*/
</script>

<style scoped>
  .image-list {
    display: grid;
    grid-gap: 1em;
  }
  .image-item {
    padding: 20px;
  }
  img {
    max-width: 400px;
    max-height: 200px
  }

  .inputfile{
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    
  }
</style>