let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeshopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listcard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
  body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
  body.classList.remove('active');
});

let products = [
  {
    id: 1,
    name: 'FRAPPUCCINO DE MORANGO',
    image: '1.PNG',
    price:  15
  },
  {
    id: 2,
    name: 'FRAPPUCCINO DE UNICÓRNIO',
    image: '6.PNG',
    price: 12
  },
  {
    id: 3,
    name: 'FRAPPUCCINO DE CHÁ VERDE',
    image: '3.PNG',
    price:  8
  },
  {
    id: 4,
    name: 'FRAPPUCINO DE BRIGADEIRO',
    image: '9.PNG',
    price: 18
  },
  {
    id: 5,
    name: 'FRAPPUCCINO TENOR',
    image: '5.PNG',
    price: 15
  },
  {
    id: 6,
    name: 'PUMPKIN SPICE LATTE',
    image: '2.PNG',
    price: 10
  },
];


let listCards  = [];
function formatPrice(price) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');
    newDiv.innerHTML = `
      <img src="starbucks/${value.image}">
      <div class="title">${value.name}</div>
      <div class="price">${formatPrice(value.price)}</div>
      <button onclick="addToCard(${key})">Adicionar na sacola</button>`;
    list.appendChild(newDiv);
  });
}


initApp();
function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
    listCards[key].price = products[key].price;
  } else {
    listCards[key].quantity++;
    listCards[key].price = listCards[key].quantity * products[key].price;
  }
  reloadCard();
  
  if (Object.keys(listCards).length > 0) {
    document.querySelector('.card').classList.add('active');
  }
}

function confirmarPedido() {
  alert("Pedido confirmado!");


  document.getElementById("pedidos").classList.add("hidden");

  
  document.getElementsByClassName("total")[0].classList.remove("hidden");
}

function reloadCard() {
  listCard.innerHTML = '';
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    if (value != null) {
      totalPrice += value.price;
      count += value.quantity;
      let newDiv = document.createElement('li');
      newDiv.innerHTML = `
        <div><img src="starbucks/${value.image}"/></div>
        <div>${value.name}</div>
        <div>${formatPrice(value.price)}</div>
        <div>
          <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
          <div class="count">${value.quantity}</div>
          <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
        </div>`;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = formatPrice(totalPrice);
  quantity.innerText = count;
}

function changeQuantity(key, quantity){
  if(quantity == 0){
      delete listCards[key];
  }else{
      listCards[key].quantity = quantity;
      listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
}
