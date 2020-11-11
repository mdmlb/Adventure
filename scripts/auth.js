const auth = document.querySelector('.universalHeader__profileLink');
const authindex = document.querySelector('.header__profileLink');
const bag = document.querySelector('.universalHeader__shopLink');
const bagindex = document.querySelector('.header__shopLinksTwo');
const authSignout = document.querySelector('.profileSingOut');
const authSingoutAdmin = document.querySelector('.profileSingOut__admin');
const authBurger = document.querySelector('.burguermenu__profile');
name = document.querySelector('.profileUser__name');

var userInfo;

firebase.auth().onAuthStateChanged(function(user) {

  if(user) {

    auth.addEventListener('click', function(event){
      window.location.pathname.includes('/profile.html');
      //window.location.href = '../profile.html';
    });

    authindex.addEventListener('click', function(event){
      window.location.pathname.includes('/profile.html');
      //window.location.href = '../profile.html';
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
        if(data.admin) {
          const showAdmin = document.querySelectorAll('.showAdmin');
          const hideAdmin = document.querySelectorAll('.hideAdmin');
          
          showAdmin.forEach(function (elem) {
              elem.classList.remove('hidden');
          })

          hideAdmin.forEach(function (elem) {
            elem.classList.add('hidden');
        })
         
        }
      }
    });

  } else {
    
    //console.log("hola")

    if(auth){
      auth.addEventListener('click', function(event){
        window.location.href = '../login.html';
      });

      authBurger.addEventListener('click', function(event){
        window.location.href = '../login.html';
      });
    }

    if(authindex){
      authindex.addEventListener('click', function(event){
        window.location.href = '../login.html';
        //window.location.pathname.includes('/login.html');
      });

      bagindex.addEventListener('click', function(event){
        window.location.href = '../login.html';
      });
    }

        
}
});

// Sign Out

//USER
if(authSignout){
  authSignout.addEventListener('click', function(event) {
  event.preventDefault();
  firebase.auth().signOut();
  console.log("out");
  window.location.href = "../index.html";
  });
}


//ADMIN
if (authSingoutAdmin) {
  authSingoutAdmin.addEventListener('click', function(event) {
    event.preventDefault();
    firebase.auth().signOut();
    console.log("out");
    window.location.href = "../index.html";
  });
}
