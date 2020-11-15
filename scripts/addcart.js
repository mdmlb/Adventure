const db = firebase.firestore();
const bagRef = db.collection('bag');
var storageRef = firebase.storage().ref();

const productsBagList = document.querySelector('.purchases__container');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Chart

function renderBagProducts(list) {
  productsBagList.innerHTML = '';
  list.forEach(function (elem, i) {
    console.log(elem.nameProduct);
    const newBagProduct = document.createElement('section');
    newBagProduct.classList.add('purchases__item');

    newBagProduct.innerHTML = `
            <div class="purchases__imageC">
                <img src="" alt="" class="purchases__image">
            </div>
            <div class="purchases__info">
                <p class="purchases__name">${elem.nameProduct}</p>
                <p class="purchases__price"><strong>Price:</strong> $${elem.price}</p>
                <p class="purchases__remove">Remove</p>
            </div>
            `;

    //Mostrar imagen
    storageRef.child(elem.image).getDownloadURL().then(function (url) {
      var img = newBagProduct.querySelector('img');
      img.src = url;
    }).catch(function (error) {
      // Handle any errors
    });

    //Delete
    /*
    const deleteButton = newBagProduct.querySelector('.purchases__remove');
    deleteButton.addEventListener('click', function () {
      bagRef.doc(userInfo.uid).delete().then(function () {
        console.log("Document successfully deleted!");
        getBagProducts();
      })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    });*/

    productsBagList.appendChild(newBagProduct);
  });
}

let bagList = [];
function getBagProducts() {
  bagRef.doc(userInfo.uid)
    .get()
    .then((doc) => {
      bagList = [];
      if (doc.exists) {
        doc.data().products.forEach(function (item) {
          bagList.push(item);
        });
      }

      renderBagProducts(bagList);
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CHECKOUT

/*
const checkRef = db.collection('orders');

const formCheck = document.querySelector('.checkout__pay');
const checkBtn = document.querySelector('.checkBtn');

checkList = [];
let arrayOrders;
formCheck.addEventListener('submit', function(event){
    event.preventDefault();

    const newOrder = {
        cardType: formCheck.cardType.value,
        cardNumber: Number(formCheck.number.value),
        fullName: formCheck.fullName.value,
        idNumber: formCheck.idNumber.value,
        address: formCheck.address.value,
      };


      checkList2 = {
        ordersInfo: newOrder,
        orders: arrayOrders,
      }

      //arrayOrders.push();
      checkRef.add(checkList2).then().catch(function (error) {
        console.error("Error adding document: ", error);
      });
})

function getBag() {
    checkRef
      .doc(userInfo.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          checkList = doc.data().orders;
        }
      }).catch(function (error) {
        console.log("hola: ", error);
      });
  }

function getOrder(){
    bagRef.doc(userInfo.uid).get().then((doc) => {
        if(doc.exists){
            doc.data().products.forEach (function (item) {
                arrayOrders=doc.data();//console.log(doc.data().products);
            });
        }
      });
}
*/
