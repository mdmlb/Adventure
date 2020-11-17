const auth = document.querySelector('.universalHeader__profileLink');
const authindex = document.querySelector('.header__profileLink');
const authSignout = document.querySelector('.profileSingOut');
const authSingoutAdmin = document.querySelector('.profileSingOut__admin');
const authBurgerProfile = document.querySelector('.burguermenu__profile');
const authBurgerBag = document.querySelector('.burguermenu__bag');
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

    }

    if (authBurgerProfile) {
      authBurgerProfile.addEventListener('click', function (event) {
        ////////////////////////////////////////////////////
        authBurgerProfile.href = 'profile.html';
      });
    }

    if (authBurgerBag) {
      authBurgerBag.addEventListener('click', function (event) {
        ////////////////////////////////////////////////////
        authBurgerBag.href = 'shop.html';
      });
    }

    const db = firebase.firestore();
    const usersRef = db.collection('users');

    usersRef.doc(user.uid).get().then(function (doc) {
      if (doc.exists) {

        const data = doc.data();
        userInfo = data;
        userInfo.uid = user.uid;

        if (window.getCartProducts) {
          getCartProducts();
        }

        if (window.getCart) {
          getCart();
        }

        if (window.getOrder) {
          getOrder();
        }

        name.innerText = userInfo.name;

        const showShop = document.querySelectorAll('.showShop');
        const hideShop = document.querySelectorAll('.hideShop');

        showShop.forEach(function (elem) {
          elem.classList.remove('hidden');
        })

        hideShop.forEach(function (elem) {
          elem.classList.add('hidden');
        })

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
    }

    if (authBurgerProfile) {
      authBurgerProfile.addEventListener('click', function (event) {
        ////////////////////////////////////////////////////
        authBurgerProfile.href = 'login.html';
      });
    }

    if (authindex) {

      //TO USER//PROFILE FROM INDEX
      authindex.addEventListener('click', function (event) {
        ////////////////////////////////////////////////////
        authindex.href = 'login.html';

      });
    }

    if (authBurgerBag) {
      authBurgerBag.addEventListener('click', function (event) {
        ////////////////////////////////////////////////////
        authBurgerBag.href = 'shop.html';
      });
    }



  }
});

// Sign Out

//USER
if (authSignout) {
  authSignout.addEventListener('click', function (event) {
    firebase.auth().signOut();
    console.log("out");

    ////////////////////////////////////////////////////
    window.location.href = 'index.html';
    //authSignout.href = "index.html";
  });
}


//ADMIN
if (authSingoutAdmin) {
  authSingoutAdmin.addEventListener('click', function (event) {
    event.preventDefault();
    firebase.auth().signOut();
    console.log("out");

    ////////////////////////////////////////////////////
    window.location.href = "index.html";
  });
}
