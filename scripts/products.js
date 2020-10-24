var firebaseConfig = {
    apiKey: "AIzaSyAHmqT78LFZ0o_kPE0LfXlKaGHFpRrtpn0",
    authDomain: "adventure-ca0cd.firebaseapp.com",
    databaseURL: "https://adventure-ca0cd.firebaseio.com",
    projectId: "adventure-ca0cd",
    storageBucket: "adventure-ca0cd.appspot.com",
    messagingSenderId: "430832887706",
    appId: "1:430832887706:web:ad9e5b300f9036b5a0fc23",
    measurementId: "G-FFWCFJDTLE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//LOGIN

//SIGNUP






    //ADMIN
//EDIT
const dark = document.querySelector('.dark');
const editactive = document.querySelector('.product__edit');
const edit = document.querySelector('.edit');
const exit = document.querySelector('.editItem__exit');

editactive.addEventListener('click', function() {
    dark.classList.add("dark--active");
    edit.classList.add("edit--show");
    console.log("hola");
});

dark.addEventListener('click', function(){
  if(dark.classList.contains("dark--active") && edit.classList.contains("edit--show")){ 
    dark.classList.remove("dark--active"); 
    edit.classList.remove("edit--show")
  }
  
});

exit.addEventListener('click', function(){
  if(dark.classList.contains("dark--active") && edit.classList.contains("edit--show")){ 
    dark.classList.remove("dark--active"); 
    edit.classList.remove("edit--show")
  }
  
});

//DELETE
const deleteactive = document.querySelector('.product__delete');
const delet = document.querySelector('.delete');
const yes = document.querySelector('.deleteItem__yes');
const nodelete = document.querySelector('.deleteItem__no');


deleteactive.addEventListener('click', function() {
    dark.classList.add("dark--active");
    delet.classList.add("delete--show");
    console.log("hola");
});

dark.addEventListener('click', function(){
  if(dark.classList.contains("dark--active") && edit.classList.contains("delete--show")){ 
    dark.classList.remove("dark--active"); 
    delet.classList.remove("delete--show")
  }
  
});

nodelete.addEventListener('click', function(){
  console.log("no");
});