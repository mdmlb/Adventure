const db = firebase.firestore();
const productsRef = db.collection('products');
const storageRef = firebase.storage().ref();

const productsList = document.querySelector('.productlist');

let selectedItem = null;

// Print products
function renderProducts (list) {
  productsList.innerHTML = '';
  list.forEach(function (elem) {
    const newProduct = document.createElement('article');
    newProduct.classList.add('product--admin');

    const url = `products.html?${elem.id}-${elem.title}`;
    newProduct.setAttribute('href', url);

    newProduct.innerHTML = `
    <div class="product__cont">
      <img class="product__edit" src="./resources/edit.png" alt="">
      <img class="product__delete" src="./resources/delete.png" alt="">
    </div>
      <a href="${url}">
        <img class="product__img" src="${elem.img}" alt="">
        <h1 class="product__title">${elem.title}</h1>        
        <p class="product__price">$${elem.price}</p>
      </a>
      <button class="button__userAdd">Add to cart</button>
    `;

    //image
    if(elem.storageImgs) {
      elem.storageImgs.forEach(function(imageRef) {
        storageRef.child(imageRef).getDownloadURL().then(function(url) {
          // Or inserted into an <img> element:
          var img = newProduct.querySelector('img');
          img.src = url;
        }).catch(function(error) {
          // Handle any errors
        });
      })
    }


    productsList.appendChild(newProduct);
  });
}

//Data
function getProducts(){
  productsRef
  .get()
  .then((querySnapshot) => {
    const objects = [];
    querySnapshot.forEach((doc) => {
        const obj = doc.data();
        obj.id = doc.id;
        objects.push(obj);
        console.log(`${doc.id} => ${doc.data()}`);
    });
    renderProducts(objects);
  });
}

//the render is initialized
getProducts();

/*if(obj.option.value == Camera){
  camera.html.renderProducts(objects);
}else{
  camera.html.renderProducts(objects);
}*/
