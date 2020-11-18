const db = firebase.firestore();
const productsRef = db.collection('products');
const storageRef = firebase.storage().ref();

const productsList = document.querySelector('.productlist');

let selectedItem = null;

let productsCart = [];
const imagesPath = [];

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
      <p class="product__noti hidden showAddedProduct">Product added</p>
      <button class="button__userAdd">Add to cart</button>
      
    `;

    console.log(elem);
    if (elem.storageImages) {
      elem.storageImages.forEach(function (imageRef) {
        storageRef.child(elem.storageImages[0]).getDownloadURL().then(function (url) {
          var img = newProduct.querySelector('.product__img');
          img.src = url;
        }).catch(function (error) {
        });
      })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //ADD TO CART

    const addBtn = newProduct.querySelector('.button__userAdd');
    const noti = newProduct.querySelector('.product__noti');
    const location = document.querySelector('.location');

    function carList(pList) {

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
          if (doc.exists && doc.data().products != undefined) {
            productsCart = doc.data().products;
            shopCart2 = doc.data().products;
            carList(productsCart);
          } else if (doc.exists && doc.data().products != undefined) {
            carList(productsCart);
          } else if (!doc.exists) {
            carList(productsCart);
          }
        }).catch(function (error) {
          console.log("hola: ", error);
        });
    }

    addBtn.addEventListener('click', function (event) {

      event.preventDefault();

      getCart();

      if (userInfo.uid) {
        location.classList.add("location--show");

        setTimeout(function () {
          location.classList.remove("location--show");
        }, 1500);
      }

      if (userInfo.uid) {
        noti.classList.remove("hidden");

        setTimeout(function () {
          noti.classList.add("hidden");
        }, 2500);

      }

    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // EDIT
    const editactive = newProduct.querySelector('.product__edit');
    const edit = document.querySelector('.edit');
    const exit = document.querySelector('.editItem__exit');

    //ACTION TO EDIT
    const editBtn = document.querySelector('.editItem');

    const images = document.querySelectorAll('.editItem__input');

    images.forEach(function (group, index) {
      group.addEventListener('change', function () {

        var newImageRef = storageRef.child(`products/${Math.floor(Math.random() * 999999999)}.jpg`);

        var file = group.files[0];

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
        }

        newImageRef.put(file).then(function (snapshot) {
          console.log(snapshot)
          console.log('Uploaded a blob or file!');
          imagesPath[index] = snapshot.metadata.fullPath;
        });
      });
    });

    //TO SHOW THE MODAL
    editactive.addEventListener('click', function () {
      dark.classList.add("dark--active");
      edit.classList.add("edit--show");
      console.log("hola");

      editBtn.title.value = elem.title;
      editBtn.price.value = elem.price;
      editBtn.description.value = elem.description;
      editBtn.brand.value = elem.brand;
      editBtn.type.value = elem.type;
      selectedItem = elem;

      editBtn.addEventListener('submit', function (event) {
        event.preventDefault();

        const newProduct = {
          title: editBtn.title.value,
          price: Number(editBtn.price.value),
          description: editBtn.description.value,
          brand: editBtn.brand.value,
          type: editBtn.type.value,
          option: editBtn.option.value,
          storageImages: imagesPath,
        };

        function handleThen(docRef) {
          getProducts();
          editBtn.title.value = '';
          editBtn.price.value = '';
          editBtn.description.value = '';
          editBtn.brand.value = '';
          editBtn.type.value = '';
          selectedItem = null;
        }

        function handleCatch(error) {
          console.error("Error adding document: ", error);
        }

        productsRef
          .doc(selectedItem.id)
          .set(newProduct)
          .then(handleThen)
          .catch(handleCatch);

      });


    });


    dark.addEventListener('click', function () {
      if (dark.classList.contains("dark--active") && edit.classList.contains("edit--show")) {
        dark.classList.remove("dark--active");
        edit.classList.remove("edit--show")
      }

    });

    if (edit) {
      exit.addEventListener('click', function () {
        if (dark.classList.contains("dark--active") && edit.classList.contains("edit--show")) {
          dark.classList.remove("dark--active");
          edit.classList.remove("edit--show")
        }
      });
   
    

    }
 

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //DELETE  
  const deleteBtn = newProduct.querySelector('.product__delete');
  deleteBtn.addEventListener('click', function () {
    if (userInfo.admin) {
      productsRef
        .doc(elem.id)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
          getProducts();
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        });
    }
  });

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
          //console.log(doc.id, " => ", doc.data());
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
          //console.log(doc.id, " => ", doc.data());
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

if (filterForm) {
  filterForm.addEventListener('input', function () {

    let copy = objectsList.slice();

    const order = filterForm.sort.value;

    //ORDER
    switch (order) {
      case 'brand_asc':
        copy.sort(function (a, b) {
          return a.brand.localeCompare(b.brand);
        });
        break;
      case 'price_asc':
        copy.sort(function (a, b) {
          return b.price - a.price;
        });
        break;
      case 'price_desc':
        copy.sort(function (a, b) {
          return a.price - b.price;
        });
        break;
    }

    const nameFilter = filterForm.name.value;

    const typeFilter = filterForm.type.value;

    //FILTER

    if (typeFilter != '') {
      copy = copy.filter(function (elem) {
        if (elem.type == typeFilter) {
          return true;
        }
        return false;
      });
    }


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

}


