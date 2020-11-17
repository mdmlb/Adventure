const db = firebase.firestore();
const ordersRef = db.collection('orders');

const orders = document.querySelector('.ordersUser');
let counter =0;

function renderOrders(orderList) {
    counterId();

    orders.innerHTML = '';
    orderList.forEach(function (elem, i) {
        const newOrder = document.createElement('article');
        newOrder.classList.add('contOrder');

        newOrder.innerHTML = `
            <div class="productsOrdersInfo">
                <div class="productsOrdersInfo__cont">
                    <h3 class="productsOrdersInfo__id">Order made by:</h3>
                    <h3 class="productsOrdersInfo__name">${elem.name}</h3>
                    <h3 class="productsOrdersInfo__address">Addres: ${elem.address}</h3>
                    <h3 class="productsOrdersInfo__total">Total: ${elem.total}</h3>
                </div>
            </div>
         `;

        orders.appendChild(newOrder);
    });
}

function counterId() {
    counter++;
}

let listorder = [];
function getOrdersInfo() {
    ordersRef.get().then((querySnapshot) => {
        listorder = [];
        querySnapshot.forEach((doc) => {
            const obj = doc.data().ordersInfo;
            listorder.push(obj);
            console.log(`${doc.id} => ${doc.data().ordersInfo}`);
        });
        renderOrders(listorder);
    });
}

getOrdersInfo();