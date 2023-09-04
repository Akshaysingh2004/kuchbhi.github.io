

const products = [
{
    name: 'Earphone',
    image: './earphone.png',
    description: 'Earphones are a small piece of equipment which you wear over or inside your ears so that you can listen to music, the radio, or your phone without anyone else hearing. This is the best earphone.',
    price: 500,
},
{
    name: 'Mobile',
    image: './mobile.png',
    description: 'A mobile phone (or cellphone) is a portable telephone that can make and receive calls over a radio frequency link while the user is moving within a telephone service area. This is the best Mobile.',
    price: 12000,
},
{
    name: 'Television',
    image: './television.png',
    description: 'A television set (also known as a television receiver or televisor or simply a television, TV set, TV receiver or TV) is a machine with a screen or set of lenses. This is the best Television.',
    price: 20000,
},
{
    name: 'Shirt',
    image: './shirt.png',
    description: 'These t-shirts are a comfortable and durable alternative to standard cotton tees. It is designed to be worn all day by the man in demand. This classic design will keep you on the go with a gentle fabric for comfort all day.',
    price: 1000,
},
];

let cardContainer = document.getElementById('cardContainer');
let cartTableBody = document.getElementById('cartTableBody');
let cartItems = [];
let productCounts = {}; 

const card = products.map(product => `
<div class="col-md-6">
    <div class="card" style="width: 18rem;">
        <img src="${product.image}" alt="${product.name}">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-price">Price: Rs ${product.price}</p>
            <button class="btn btn-primary" onclick="addCart('${product.name}', ${product.price})">Add to Cart</button>
        </div>
    </div>
</div>
`);

cardContainer.querySelector('.row').innerHTML = card.join('');

function addCart(itemName, itemPrice) {
const newItem = cartItems.find(item => item.name === itemName);
if (newItem) {
    newItem.quantity++;
} else {
    cartItems.push({ name: itemName, quantity: 1, price: itemPrice });
}

productCounts[itemName] = 1;

updateCart();
CartItemCount();
}

function deleteCart(itemName) {
const confirmation = confirm(`Are you sure you want to remove ${itemName} from the cart?`);
if (confirmation) {
    cartItems = cartItems.filter(item => item.name !== itemName);

    productCounts[itemName] = 0;

    updateCart();
    CartItemCount();
}
}

function updateQuantity(itemName, newQuantity) {

}

function updateCart() {
const grandTotalElement = document.getElementById('grandTotal');
let grandTotal = 0;

cartTableBody.innerHTML = '';
cartItems.map(item => {
    const cartRow = document.createElement('tr');
    cartRow.innerHTML = `
        <td>${item.name}</td>
        <td>
            <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity('${item.name}', this.value)">
        </td>
        <td>Rs ${item.price}</td>
        <td>Rs ${item.price * item.quantity}</td>
        <td>
            <button class="btn btn-danger" onclick="deleteCart('${item.name}')">Delete</button>
        </td>
    `;

    cartTableBody.appendChild(cartRow);

    grandTotal += item.price * item.quantity;
});

grandTotalElement.textContent = `Grand Total: Rs ${grandTotal}`;
}

function CartItemCount() {
const cartItemCountBadge = document.getElementById('cartItemCountBadge');
const productNames = Object.keys(productCounts);
let itemCount = 0;

productNames.map(name => {
    itemCount += productCounts[name];
});

cartItemCountBadge.textContent = itemCount;
}

CartItemCount();

