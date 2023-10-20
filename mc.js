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
    name: 'BIG TASTY BACON BARBECUE',
    image: '4.PNG',
    price: 39
  },
  {
    id: 2,
    name: 'TRIPLO BURGUER',
    image: '7.PNG',
    price: 24
  },
  {
    id: 3,
    name: 'MCFRITAS CHEDDAR BACON',
    image: '8.PNG',
    price: 15
  },
  {
    id: 4,
    name: 'MCOFERTA CHICKEN NUGGETS',
    image: '9.PNG',
    price: 33
  },
  {
    id: 5,
    name: 'BRABO MELT CRISPY',
    image: '1.PNG',
    price: 38
  },
  {
    id: 6,
    name: 'DUPLO QUARTERÃO',
    image: '2.PNG',
    price: 33
  },
  {
    id: 7,
    name: 'DUPLO CHEDDAR MCMELT',
    image: '3.PNG',
    price: 33
  },
  {
    id: 8,
    name: 'CHICKEN JR',
    image: '11.PNG',
    price: 9
  },
  {
    id: 9,
    name: 'BIG MAC',
    image: '12.PNG',
    price: 24
  },
  {
    id: 10,
    name: 'MCFRITAS GRANDE',
    image: '5.PNG',
    price: 13
  },
  {
    id: 11,
    name: 'MCFRITAS MÉDIA',
    image: '6.PNG',
    price: 11
  },
  {
    id: 12,
    name: 'MCFRITAS PEQUENA',
    image: '10.PNG',
    price: 9
  },
  {
    id: 13,
    name: 'MCSHAKE OVOMALTINE',
    image: '13.PNG',
    price: 13
  },
  {
    id: 14,
    name: 'MCSHAKE KOPENHAGEN',
    image: '14.PNG',
    price: 13
  },
  {
    id: 15,
    name: 'MCSHAKE MORANGO',
    image: '15.PNG',
    price: 13
  },
  {
    id: 16,
    name: 'COCA COLA ZERO',
    image: '16.PNG',
    price: 13
  },
  {
    id: 17,
    name: 'FANTA GUARANÁ',
    image: '17.PNG',
    price: 13
  },
  {
    id: 18,
    name: 'FANTA LARANJA',
    image: '18.PNG',
    price: 13
  },
  {
    id: 19,
    name: 'DEL VALLE UVA',
    image: '19.PNG',
    price: 13
  },
  {
    id: 20,
    name: 'DEL VALLE LARANJA',
    image: '20.PNG',
    price: 13
  },
  {
    id: 20,
    name: 'ÁGUA MINERAL',
    image: '21.PNG',
    price: 13
  },
];

let listCards = [];

function formatPrice(price) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');

    if (value.name && value.price) {
      // Create product elements
      let productImg = document.createElement('img');
      productImg.src = `mcdonald/${value.image}`;

      let productName = document.createElement('div');
      productName.classList.add('title');
      productName.innerText = value.name;

      let productPrice = document.createElement('div');
      productPrice.classList.add('price');
      productPrice.innerText = formatPrice(value.price);

      let addToCartBtn = document.createElement('button');
      addToCartBtn.innerText = 'Adicionar na sacola';
      addToCartBtn.addEventListener('click', () => {
        addToCard(key);
      });

      newDiv.appendChild(productImg);
      newDiv.appendChild(productName);
      newDiv.appendChild(productPrice);
      newDiv.appendChild(addToCartBtn);
    }

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
        <div><img src="mcdonald/${value.image}"/></div>
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

function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
}
