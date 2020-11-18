const db = firebase.firestore();
const cartRef = db.collection('bag');
const storageRef = firebase.storage().ref();

const productscartList = document.querySelector('.contProducts__container2');
var totalVal;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CART

function renderCartProducts(list) {
  productscartList.innerHTML = '';
  list.forEach(function (elem, i) {
    const newCarProduct = document.createElement('section');
    newCarProduct.classList.add('contProducts__item');

    newCarProduct.innerHTML = `
      <div class="item1">
           <div class="contProducts__imgContainer">
              <img src="" alt="" class="contProducts__image">
          </div>
          <div class="contProducts__info">
              <p class="contProducts__name">${elem.title}</p>
              <p class="contProducts__brand">${elem.brand}</p>
              <p class="contProducts__type">${elem.type}</p>
          </div>
      </div>

      <div class="contProducts__info2">
          <p class="contProducts__remove">DELETE</p>
          <p class="contProducts__price">$${elem.price}</p>
      </div>
    `;

    //IMAGE
    storageRef.child(elem.storageImages).getDownloadURL().then(function (url) {
      var img = newCarProduct.querySelector('img');
      img.src = url;
    }).catch(function (error) {
    });

    //TOTAL
    cartRef.doc(userInfo.uid).get().then((doc) => {
      if (doc.exists) {
        totalVal = doc.data().products.reduce(function (previousValue, currentValue) {
          return {
            price: previousValue.price + currentValue.price,
          }
        });

        document.querySelector('.contTotal__cTotal').innerHTML = `$ ${totalVal.price}`;
      }
    });

    //DELETE
    const removeBtn = newCarProduct.querySelector('.contProducts__remove');
    
    function carListDelete(pList) {

      console.log(pList);

      let productsCart = pList;

      if (userInfo) {
        const shopCart = {
          title: elem.title,
          brand: elem.brand,
          type: elem.type,
          price: Number(elem.price),
          storageImages: elem.storageImages[0]
        };

        productsCart.splice(shopCart, 1);

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

    function getCartdelete() {
      cartRef
        .doc(userInfo.uid)
        .get()
        .then((doc) => {
          if (doc.exists && doc.data().products != undefined) {
            productsCart = doc.data().products;
            shopCart2 = doc.data().products;
            carListDelete(productsCart);
          } else if (doc.exists && doc.data().products != undefined) {
            carListDelete(productsCart);
          } else if (!doc.exists) {
            carListDelete(productsCart);
          }
        }).catch(function (error) {
          console.log("hola: ", error);
        });
    }

    removeBtn.addEventListener('click', function (event) {

      getCartdelete();

    });

    productscartList.appendChild(newCarProduct);
  });
}

let cartList = [];
function getCartProducts() {
  cartRef.doc(userInfo.uid)
    .get()
    .then((doc) => {
      cartList = [];
      if (doc.exists) {
        doc.data().products.forEach(function (item) {
          cartList.push(item);
        });
      }

      renderCartProducts(cartList);
    });
}

function getTotalProducts() {
  cartRef.doc(userInfo.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        NumberBag.innerHTML = doc.data().products.length;
      }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CHECKOUT

const orderRef = db.collection('orders');

const btnPay = document.querySelector('.contTwo__pay');
const pay = document.querySelector('.pay');
const form = document.querySelector('.payCart');
const exit = document.querySelector('.payCart__exit');

btnPay.addEventListener('click', function () {

  dark.classList.add("dark--active");
  pay.classList.add("pay--show");

  form.addEventListener('submit', function (event) {

    event.preventDefault();

    const newOrder = {
      card: Number(form.card.value),
      name: form.name.value,
      address: form.address.value,
      total: totalVal.price
    };


    orderList2 = {
      ordersInfo: newOrder,
      orders: productsOrders,
    }

    orderRef.add(orderList2).then().catch(function (error) {
      console.error("Error adding document: ", error);
    });


  })

});

orderList = [];
let productsOrders;

dark.addEventListener('click', function () {
  if (dark.classList.contains("dark--active") && pay.classList.contains("pay--show")) {
    dark.classList.remove("dark--active");
    pay.classList.remove("pay--show")
  }

});

exit.addEventListener('click', function () {
  if (dark.classList.contains("dark--active") && pay.classList.contains("pay--show")) {
    window.location.href = 'shop.html';
  }

});

function getOrder() {
  cartRef.doc(userInfo.uid).get().then((doc) => {
    if (doc.exists) {
      doc.data().products.forEach(function (item) {
        productsOrders = doc.data();
      });
    }
  }).catch(function (error) {
    console.log("hola: ", error);
  });
}


function deleteCart() {
  cartRef.doc(userInfo.uid).delete().then(function () {
    console.log("Document deleted")
  }).catch(function (error) {
    console.log(error);
  })
  
}

