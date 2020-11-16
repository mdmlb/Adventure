let productsCart = [];
const db = firebase.firestore();
const cartRef = db.collection('bag');
var storageRef = firebase.storage().ref();

window.addEventListener('load', function () {

  const parts = location.search.split('-');
  const uid = parts[0].replace('?', '');
  const productsRef = db.collection('products');

  productsRef.doc(uid).get().then(function (snapshot) {

    const product = snapshot.data();
    const img1 = document.querySelector('.thumbs__img1');
    const img2 = document.querySelector('.thumbs__img2');
    const img3 = document.querySelector('.thumbs__img3');
    const pimage = document.querySelector('.contImage__image');
    const thumbs = document.querySelectorAll('.thumbs__imgcont');

    console.log(product);

    if (product.storageImages && product.storageImages.length > 0) {
      storageRef.child(product.storageImages[0]).getDownloadURL().then(function (url) {
        img1.src = url;
        pimage.src = url;
      }).catch(function (error) {
        console.log("hola: ", error);
      });

      storageRef.child(product.storageImages[1]).getDownloadURL().then(function (url) {
        img2.src = url;
      }).catch(function (error) {
        console.log("hola: ", error);
      });

      storageRef.child(product.storageImages[2]).getDownloadURL().then(function (url) {
        img3.src = url;
      }).catch(function (error) {
        console.log("hola: ", error);
      });
    }

    function galleryHandle(event) {
      const src = event.target.getAttribute('src');
      pimage.setAttribute('src', src);
    }

    thumbs.forEach(function (elem, index) {
      elem.addEventListener('click', galleryHandle);
    });

    document.querySelector('.descrip__type').innerText = product.brand;
    document.querySelector('.descrip__name').innerText = product.title;
    document.querySelector('.descrip__price').innerText = '$' + product.price;
    document.querySelector('.descrip__p').innerText = product.description;

    const addBtn = document.querySelector('.button__userAddDetail');
    addBtn.addEventListener('click', function () {
      getCart();
    });

    function carList(pList) {

      console.log(pList);

      let productsCart = pList;

      if (userInfo) {
        const shopCart = {
          title: product.title,
          brand: product.brand,
          type: product.type,
          price: Number(product.price),
          storageImages: product.storageImages[0]
        };

        productsCart.push(shopCart);

        shopCart2 = {
          products: productsCart
        }

        cartRef
          .doc(userInfo.uid)
          .set(shopCart2)
          .catch(function (error) {
            console.log("hola: ", error)
          });
      }

    }


    function getCart() {
      cartRef
        .doc(userInfo.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            productsCart = doc.data().products;
            shopCart2 = doc.data().products;
            carList(productsCart);
          }
        }).catch(function (error) {
          console.log("hola: ", error);
        });
    }

  })


});