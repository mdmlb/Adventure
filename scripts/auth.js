const auth = document.querySelector('.universalHeader__profileLink');
const authindex = document.querySelector('.header__profileLink');
const bag = document.querySelector('.universalHeader__shopLink');
const bagindex = document.querySelector('.header__shopLinksTwo');
const authSignout = document.querySelector('.profileSingOut');
const authSingoutAdmin = document.querySelector('.profileSingOut__admin');
const authBurger = document.querySelector('.burguermenu__profile');
name = document.querySelector('.profileUser__name');

var userInfo;

firebase.auth().onAuthStateChanged(function (user) {

  if (user) {

    if (auth) {
      auth.addEventListener('click', function (event) {
        ////////////////////////////////////////////////////
        auth.href = 'profile.html';
      });
    }

    if (authindex) {
      authindex.addEventListener('click', function (event) {
        ////////////////////////////////////////////////////
        authindex.href = 'profile.html';
      });

      //TO BAG FROM INDEX
      bagindex.addEventListener('click', function (event) {
        ////////////////////////////////////////////////////
        bagindex.href = 'shop.html';
      });
    }

    if (authBurger) {
      authBurger.addEventListener('click', function (event) {
        ////////////////////////////////////////////////////
        authBurger.href = 'shop.html';
      });
    }


    const db = firebase.firestore();
    const usersRef = db.collection('users');

    usersRef.doc(user.uid).get().then(function (doc) {
      if (doc.exists) {
        const data = doc.data();
        userInfo = data;
        userInfo.uid = user.uid;

        //ADMIN
        if (data.admin) {
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

    //PERSON HAVEN'T LOGIN


    if (auth) {


      //TO USER/PROFILE FROM ANYOTHER PART
      auth.addEventListener('click', function (event) {
        ////////////////////////////////////////////////////
        auth.href = 'login.html';
      });

      //TO BAG FROM ANYOTHER PART
      bag.addEventListener('click', function (event) {
        ////////////////////////////////////////////////////
        bag.href = 'shop.html';
      });
    }

    if (authBurger) {
      authBurger.addEventListener('click', function (event) {
        ////////////////////////////////////////////////////
        authBurger.href = 'login.html';
      });
    }


    if (authindex) {

      //TO USER//PROFILE FROM INDEX
      authindex.addEventListener('click', function (event) {
        ////////////////////////////////////////////////////
        authindex.href = 'login.html';

      });

      //TO BAG FROM INDEX
      bagindex.addEventListener('click', function (event) {
        ////////////////////////////////////////////////////
        bagindex.href = 'shop.html';
      });
    }


  }
});

// Sign Out

//USER
if (authSignout) {
  authSignout.addEventListener('click', function (event) {
    event.preventDefault();
    firebase.auth().signOut();
    console.log("out");

    ////////////////////////////////////////////////////
    authSignout.href = "index.html";
  });
}


//ADMIN
if (authSingoutAdmin) {
  authSingoutAdmin.addEventListener('click', function (event) {
    event.preventDefault();
    firebase.auth().signOut();
    console.log("out");

    ////////////////////////////////////////////////////
    authSingoutAdmin.href = "index.html";
  });
}
