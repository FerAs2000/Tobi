console.log("dani");

carts = document.querySelectorAll('[id^=Prod]');

let products = [
{
	name: 'Club Colombia Roja',
	tag:  'ClubColombiaRoja',
	price: 2800,
	inCart: 0
},
{
	name: 'Club Colombia Dorada',
	tag:  'ClubColombiaDorada',
	price: 1000,
	inCart: 0
},
{
	name: 'Club Colombia Negra',
	tag:  'ClubColombiaNegra',
	price: 2000,
	inCart: 0
},
{
	name: 'Poker',
	tag:  'Poker',
	price: 3000,
	inCart: 0
},
{
	name: 'Pokeron',
	tag:  'Pokeron',
	price: 4800,
	inCart: 0
},
{
	name: 'Smirnoff Ice',
	tag:  'SmirnoffIce',
	price: 5800,
	inCart: 0
}
];

for (let i=0; i < carts.length; i++){
	carts[i].addEventListener('click', () =>{
		cartNumbers(products[i]);
		totalCost(products[i]);
	})
}

function onLoadCartNumbers(){
	let productNumbers = localStorage.getItem('cartNumbers')
	
	if(productNumbers){
		document.querySelector('.DFLA span').textContent = productNumbers;
	}
}

function cartNumbers(product){
	let productNumbers = localStorage.getItem('cartNumbers')
	productNumbers = parseInt(productNumbers);
	
	if(productNumbers){
	localStorage.setItem('cartNumbers', productNumbers + 1);
	document.querySelector('.DFLA span').textContent = productNumbers + 1;
	} else{
	localStorage.setItem('cartNumbers', 1);
	document.querySelector('.DFLA span').textContent = 1;
	}	
	
	setItems(product);
}

function setItems(product){
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	
	if(cartItems !=null){
		
		if(cartItems[product.tag] == undefined){
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].inCart += 1;
	} else{
	    product.inCart = 1;
	    cartItems = {
			[product.tag]: product
		}
	}
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
	let cartCost = localStorage.getItem('totalCost');
	
	if(cartCost != null){
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalCost", cartCost + product.price)
	} else{
		localStorage.setItem("totalCost", product.price);
	}
}

function displayCart(){
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector(".products");
	
	let cartCost = localStorage.getItem('totalCost');
	
	if(cartItems && productContainer){
		productContainer.innerHTML = '';
		Object.values(cartItems).map(item => {
		productContainer.innerHTML += `
<div class="row22">
<table width="750" cellspacing="0" cellpadding="0">
  <tr>
     <div class="product">
         <th><button class="btn-cancelar"  onClick="Add7(1)">X</button></th>
         <th><img src="./images/${item.tag}.jpg" width="80"></th>
	 </div>
     <div class="namee">
	    <th> <span>${item.name}</span></th>
     </div>
	 <div class="price"><th>$${item.price}</th></div>
	     <th>
             <button class="btn-minus" onClick="Add7(-1)">-</button>
	     </th>
	 <th>
	     <div class="quantity">
		   	 <span>${item.inCart}</span> 
		 </div>
	 </th>
	 <th>
         <button class="btn-plus"  onClick="Add7(1)">+</button>
	 </th>
	 <th>
         <div class="total">
		     $${item.inCart * item.price}
		 </div>
	 </th>
  </tr>
</table>
</div>
		`;
		});
		productContainer.innerHTML += `
		<table width="750" cellspacing="0" cellpadding="0">
		 <tr>
		    <th><span style="opacity:0;">.</span></th>
			<th><span style="opacity:0;">.</span></th>
			<th><span style="opacity:0;">.</span></th>
			<th><span style="opacity:0;">.</span></th>
			<th><span style="opacity:0;">.</span></th>
			<th><span style="opacity:0;">.</span></th>
		    <div class="basketTotalContainer">
			 <th>
			     <h4 class="BasketTotalTitle">
			         Total
			      </h4> 
			 </th>
			 <th>
			     <h4 class="basketTotal">
			         $${cartCost}
			     </h4>
			 </tr>
			</div>
		</table>
		`;
	}
}

onLoadCartNumbers();
displayCart();

