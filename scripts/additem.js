const db = firebase.firestore();
const productsRef = db.collection('products');
const storageRef = firebase.storage().ref();

const product = document.querySelector('.addItem');
const btnai = document.querySelector('.addItem__button');

let selectedItem = null;

const imagesPath = [];


product.addEventListener('submit', function (event) {
  event.preventDefault();

  const newProduct = {
    title: product.title.value,
    price: Number(product.price.value),
    description: product.description.value,
    brand: product.brand.value,
    type: product.type.value,
    option: product.option.value,
    img: product.image.value,
    storageImages: imagesPath,
  };

  db.collection("products").add(newProduct)
    .then(function (docRef) {
      //console.log("Dcoument written with ID: ", docRef.id);
      product.title.value = '';
      product.price.value = '';
      product.description.value = '';
      product.brand.value = '';
      product.type.value = '';
      product.option.value = '';
      //selectedItem = null;
    })
    .catch(function (error) {
      console.log("Error adding document: ", error);
    });

  //
});

const images = product.querySelectorAll('.addItem__input');

images.forEach(function (group, index) {
  group.addEventListener('change', function () {

    var newImageRef = storageRef.child(`products/${Math.floor(Math.random() * 999999999)}.jpg`);

    var file = group.files[0]; // use the Blob or File API

    var reader = new FileReader();
    reader.readAsDataURL(file); // convert to base64 string
    reader.onload = function (e) {
      //img.src = e.target.result;
    }

    newImageRef.put(file).then(function (snapshot) {
      console.log(snapshot)
      console.log('Uploaded a blob or file!');
      imagesPath[index] = snapshot.metadata.fullPath;
    });
  });
});

const modalAdd = document.querySelector('.modalAdd');
const productAddedBtn = document.querySelector('.productAdded__ok');
const ok = document.querySelector('.productAdded__ok');

btnai.addEventListener("click", function () {

  dark.classList.add("dark--active");
  modalAdd.classList.add("modalAdd--show");

});

dark.addEventListener('click', function () {
  if (dark.classList.contains("dark--active") && modalAdd.classList.contains("modalAdd--show")) {
    //console.log("dio click")
    dark.classList.remove("dark--active");
    modalAdd.classList.remove("modalAdd--show")
  }
});

//console.log(nodelete);
ok.addEventListener('click', function () {
  if (dark.classList.contains("dark--active") && modalAdd.classList.contains("modalAdd--show")) {
    dark.classList.remove("dark--active");
    modalAdd.classList.remove("modalAdd--show")
  }
});