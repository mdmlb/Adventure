const db = firebase.firestore();
const usersRef = db.collection('users');

const register = document.querySelector('.formSign');
const btn = document.querySelector('.button');

register.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = register.name.value;
  const email = register.email.value;
  const password = register.password.value;
  const confirmpassword = register.confirmpassword.value;
  console.log(name)

  if (password == confirmpassword) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function (credentials) {

        const uid = credentials.user.uid;

        usersRef.doc(uid).set({
          name: name,
          email: email,
        })
          .then(function () {

            ////////////////////////////////////////////////////
            window.location.href = 'profile.html';
          });

      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error)
        console.log(errorMessage)
        console.log(errorCode)

        //register.querySelector('.form__error').classList.remove('hidden');
        // ...
      });

  } else {
    alert("Passwords don't match");
  }

});
