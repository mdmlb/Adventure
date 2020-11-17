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

        document.querySelector('.contTotal__cTotal').innerHTML = `${totalVal.price}`;
      }
    });

    //DELETE

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
const dark = document.querySelector('.dark');
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
    dark.classList.remove("dark--active");
    pay.classList.remove("pay--show")
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

