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
      name: 'PANA FRANGO',
      image: 'va1.png',
      price: 29
    },
    {
      id: 2,
      name: 'SAINT NICOLAU',
      image: 'va2.png',
      price: 29
    },
    {
      id: 3,
      name: 'HELL BALROG',
      image: 'va3.png',
      price: 29
    },
    {
      id: 4,
      name: 'CHEESE BACON',
      image: 'va4.png',
      price: 29
    },
    {
      id: 5,
      name: 'LEGENDARY',
      image: 'va5.png',
      price: 32
    },
    {
      id: 6,
      name: 'MEDIEVO',
      image: 'va6.png',
      price: 34
    },
    {
      id: 7,
      name: 'SENHOR FEUDAL',
      image: 'va7.png',
      price: 34
    },
    {
      id: 8,
      name: 'DOUBLE BP',
      image: 'va8.png',
      price: 34
    },
    {
      id: 9,
      name: 'COMBO',
      image: 'va9.png',
      price: 48
    },
    {
      id: 10,
      name: 'ÁGUA MINERAL',
      image: 'va10.png',
      price: 3
    },
    {
      id: 11,
      name: 'COCA COLA ZERO',
      image: 'va11.png',
      price: 2
    },
    {
      id: 12,
      name: 'FANTA LARANJA',
      image: 'va13.png',
      price: 2
    },
    {
      id: 13,
      name: 'CERVEJA CORONA',
      image: 'va12.png',
      price: 6
    },
    {
      id: 14,
      name: 'CERVEJA HEINEKEN',
      image: 'va14.png',
      price: 4
    },
    {
      id: 15,
      name: 'CERVEJA BUDWEISER',
      image: 'va15.png',
      price: 4
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
      <img src="vassal/${value.image}">
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
        <div><img src="vassal/${value.image}"/></div>
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
