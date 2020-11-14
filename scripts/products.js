const db = firebase.firestore();
const productsRef = db.collection('products');
const storageRef = firebase.storage().ref();

const productsList = document.querySelector('.productlist');
const dark = document.querySelector('.dark');

let selectedItem = null;

let productsCart = [];
const cartRef = db.collection('bag');

// Print products
function renderProducts(list) {
  productsList.innerHTML = '';
  list.forEach(function (elem) {
    const newProduct = document.createElement('article');
    newProduct.classList.add('product--admin');

    const url = `products.html?${elem.id}-${elem.title}`;
    newProduct.setAttribute('href', url);

    newProduct.innerHTML = `
    <div class="product__cont">
      <img class="product__edit hidden showAdmin" src="./resources/edit.png" alt="">
      <img class="product__delete hidden showAdmin" src="./resources/delete.png" alt="">
    </div>
      <a href="${url}" class="product__a">
        <img class="product__img" src="${elem.img}" alt="">
        <h1 class="product__title">${elem.title}</h1>        
        <p class="product__price">$${elem.price}</p>
      </a>
      <button class="button__userAdd">Add to cart</button>
    `;

    console.log(elem);
    if (elem.storageImages) {
      elem.storageImages.forEach(function (imageRef) {
        storageRef.child(elem.storageImages[0]).getDownloadURL().then(function (url) {
          // Or inserted into an <img> element:
          var img = newProduct.querySelector('.product__img');
          img.src = url;
          console.log(url);
        }).catch(function (error) {
          // Handle any errors
        });
      })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const addBtn = newProduct.querySelector('.button__userAdd');

    function carList(productsListProducts) {

      let productsCart = productsListProducts;

      if (userInfo) {
        const shopCart = {
          title: elem.title,
          brand: elem.brand,
          type: elem.type,
          price: Number(elem.price),
          storageImages: elem.storageImages[0]
        };

        productsCart.push(shopCart);

        shopCart2 = {
          products: productsCart
        }

        cartRef
          .doc(userInfo.uid)
          .set(shopCart2)
          .catch(function (error) {
            console.log(error)
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

    addBtn.addEventListener('click', function (event) {

      event.preventDefault();

      getCart();

    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // EDIT
    const editactive = newProduct.querySelector('.product__edit');
    const edit = document.querySelector('.edit');
    const exit = document.querySelector('.editItem__exit');

    //TO SHOW THE MODAL
    editactive.addEventListener('click', function () {
      dark.classList.add("dark--active");
      edit.classList.add("edit--show");
      console.log("hola");
    });


    dark.addEventListener('click', function () {
      if (dark.classList.contains("dark--active") && edit.classList.contains("edit--show")) {
        dark.classList.remove("dark--active");
        edit.classList.remove("edit--show")
      }

    });

    exit.addEventListener('click', function () {
      if (dark.classList.contains("dark--active") && edit.classList.contains("edit--show")) {
        dark.classList.remove("dark--active");
        edit.classList.remove("edit--show")
      }

    });

    //ACTION TO EDIT
    //const editBtn = newProduct.querySelector('.product__edit');
    const editBtn = document.querySelector('.editItem');

    editBtn.addEventListener('click', function () {
      editBtn.title.value = elem.title;
      editBtn.price.value = elem.price;
      editBtn.description.value = elem.description;
      editBtn.brand.value = elem.brand;
      editBtn.type.value = elem.type;
      selectedItem = elem;
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //DELETE  
    const deleteBtn = newProduct.querySelector('.product__delete');
    const delet = document.querySelector('.delete');
    const yes = document.querySelector('.deleteItem__yes');
    const nodelete = document.querySelector('.deleteItem__no');

    deleteBtn.addEventListener('click', function () {
      dark.classList.add("dark--active");
      delet.classList.add("delete--show");
      console.log("hola");
    });

    dark.addEventListener('click', function () {
      if (dark.classList.contains("dark--active") && delet.classList.contains("delete--show")) {
        console.log("dio click")
        dark.classList.remove("dark--active");
        delet.classList.remove("delete--show")
      }
    });

    console.log(nodelete);
    nodelete.addEventListener('click', function () {
      //console.log("no");
    });

    console.log(yes);
    //ACTION TO DELETE
    yes.addEventListener('click', function () {
      console.log("yes");

      productsRef // referencia de la colección
        .doc(elem.id) // referencia de un documento específico en esa colección
        .delete() // elimine el documento asociado a esa referencia
        .then(function () {
          // debería entrar si todo sale bien
          console.log("Document successfully deleted!");
          getProducts(); // traiga los productos cuando estemos seguros de que ya eliminó el que le dijimos
        })
        .catch(function (error) {
          // debería entrar si ocurre algún error
          console.error("Error removing document: ", error);
        });
    });


    console.log(userInfo);
    if (userInfo && userInfo.admin) {
      deleteBtn.classList.remove('hidden');
      editactive.classList.remove('hidden');
    }

    productsList.appendChild(newProduct);
  });
}

let objectsList = [];

//Data
function getProducts() {
  //console.log(window.location.pathname)

  //PRODUCTS TO CAMERA
  if (window.location.pathname.includes('/cameras.html')) {
    productsRef.where("option", "==", "camera")
      .get()
      .then(function (querySnapshot) {
        objectsList = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          const obj = doc.data();
          obj.id = doc.id;
          objectsList.push(obj);
          //console.log(`${doc.id} => ${doc.data()}`);
        });
        renderProducts(objectsList);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  } else if (window.location.pathname.includes('/accessories.html')) {

    //PRODUCTS TO ACCESSORIES
    productsRef.where("option", "==", "accessories")
      .get()
      .then(function (querySnapshot) {
        objectsList = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          const obj = doc.data();
          obj.id = doc.id;
          objectsList.push(obj);
          //console.log(`${doc.id} => ${doc.data()}`);
        });
        renderProducts(objectsList);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

  }
}

//the render is initialized
getProducts();


//filter and orders
const filterForm = document.querySelector('.filterform');

filterForm.addEventListener('change', function () {

  let copy = objectsList.slice();

  const order = filterForm.sort.value;

  //ORDER
  switch (order) {
    case 'brand_asc':
      copy.sort(function (a, b) {
        return a.brand - b.brand;
      });
      break;
    case 'price_asc':
      copy.sort(function (a, b) {
        return a.price - b.price;
      });
      break;
    case 'price_desc':
      copy.sort(function (a, b) {
        return b.price - a.price;
      });
      break;
  }

  const nameFilter = filterForm.name.value;

  //FILTER
  if (nameFilter != '') {
    copy = copy.filter(function (elem) {
      if (elem.title.toLowerCase().includes(nameFilter)) {
        return true;
      }
      return false;
    });
  }
  renderProducts(copy);
});

