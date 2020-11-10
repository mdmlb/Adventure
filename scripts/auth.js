const auth = document.querySelector('.universalHeader__profileLink');
const bag = document.querySelector('.universalHeader__shopLink');
const authSignout = document.querySelector('.profileSingOut');
const authSingoutAdmin = document.querySelector('.profileSingOut__admin');
const authBurger = document.querySelector('.burguermenu__profile');
name = document.querySelector('.profileUser__name');

var userInfo;

firebase.auth().onAuthStateChanged(function(user) {

  if(user) {

    auth.addEventListener('click', function(event){
      window.location.href = '../profile.html';
    });

    authBurger.addEventListener('click', function(event){
      window.location.href = '../profile.html';
    });

    const db = firebase.firestore();
    const usersRef = db.collection('users');

    usersRef.doc(user.uid).get().then(function (doc) {
      if(doc.exists) {
        const data = doc.data();
        userInfo = data;
        
        //ADMIN
        if(data.name == "admin") {
          //document.querySelector('.profileAdmin').classList.remove('hidden');
          const showAdmin = document.querySelectorAll('.profileAdmin');
          const hideUser = document.querySelectorAll('.profileUser');
          showAdmin.forEach(function (elem) {
              elem.classList.remove('hidden');
          })
          hideUser.forEach(function (elem) {
              elem.classList.add('hidden');
          })
          
        }

        // PROFILE USER
        if(data.name != "admin") {
          name.innerText = data.name;
          const showUser = document.querySelectorAll('.profileUser');
          const hideAdmin = document.querySelectorAll('.profileAdmin');
          showUser.forEach(function (elem) {
              elem.classList.remove('hidden');
          })
          hideAdmin.forEach(function (elem) {
              elem.classList.add('hidden');
          })
        }
      }
    });

  } else {
    
    console.log("hola")
    auth.addEventListener('click', function(event){
      window.location.href = '../login.html';
    });

    authBurger.addEventListener('click', function(event){
      window.location.href = '../login.html';
    });
}
});

// Sign Out

//USER
authSignout.addEventListener('click', function(event) {
  event.preventDefault();
  firebase.auth().signOut();
  console.log("out");
  window.location.href = "../index.html";
});

//ADMIN
authSingoutAdmin.addEventListener('click', function(event) {
  event.preventDefault();
  firebase.auth().signOut();
  console.log("out");
  window.location.href = "../index.html";
});