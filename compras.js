console.log("Dani_Fer");

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
	ContarCartNumbers();
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

function onLoadtotalCost(){
	let cartCost = localStorage.getItem('totalCost');
	
	if(cartCost){
		document.querySelector('.CostoTotalCarrito span').textContent = cartCost;
	}
}

function totalCost(product){
	let cartCost = localStorage.getItem('totalCost');
	
	if(cartCost != null){
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalCost", cartCost + product.price)
	} else{
		localStorage.setItem("totalCost", product.price);
    }
	onLoadtotalCost();
}

function ContarCartNumbers(){
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	
	let TodosPorductos = Object.values(cartItems);
	
	var sum = 0;
	for (let i=0; i < TodosPorductos.length; i++){
		sum += TodosPorductos[i].inCart
	}
	 
	localStorage.setItem("cartNumbers", JSON.stringify(sum));
	document.querySelector('.DFLA span').textContent = sum;
}

function CostoTotalDefinitivo(){
	
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	
	let TodosPorductos = Object.values(cartItems);
	
	var sumCost = 0;
	for (let i=0; i < TodosPorductos.length; i++){
		sumCost += TodosPorductos[i].inCart * TodosPorductos[i].price
	}
	localStorage.setItem("totalCost",sumCost);
	onLoadtotalCost();
}

function Remove(elemento_eliminar){	
    console.log(elemento_eliminar) /*El elemento que le di click en el boton de eliminar (X)*/
	
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	
	delete cartItems[elemento_eliminar];
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	
	ContarCartNumbers();
	CostoTotalDefinitivo();
	displayCart();
};

function agregarUno(elemento_agregarUno){	
    /*console.log(elemento_agregarUno) /*El elemento que le di click en el boton de agregarUno (+)*/
	
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	
	/*console.log(cartItems[elemento_agregarUno]);*/
	
	cartItems[elemento_agregarUno].inCart += 1;
	
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	
	ContarCartNumbers();
	CostoTotalDefinitivo();
	displayCart();
};

function QuitarUno(elemento_QuitarUno){	
    /*console.log(elemento_QuitarUno) /*El elemento que le di click en el boton de agregarUno (+)*/
	
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	
	cartItems[elemento_QuitarUno].inCart -= 1;

	valor7 = cartItems[elemento_QuitarUno].inCart
	if (valor7+1 <= 1) {
		cartItems[elemento_QuitarUno].inCart = 1;
	} else {
		cartItems[elemento_QuitarUno].inCart = cartItems[elemento_QuitarUno].inCart;
	}	
	
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	
	ContarCartNumbers();
	CostoTotalDefinitivo();
	displayCart();
};

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
<table width="800" cellspacing="0" cellpadding="0" style="border-bottom:1pt solid black;">
  <tr>
     <div class="product">
         <th><button class="btn-cancelar" data-tag="${item.tag}" onClick="Remove(this.dataset.tag)">X</button></th> 
         <th><img src="./images/${item.tag}.jpg" width="80"></th>
	 </div>
     <div class="namee">
	    <th> <span>${item.name}</span></th>
     </div>
	 <div class="price"><th>$${item.price}</th></div>
	     <th>
             <button class="btn-minus" data-tag="${item.tag}" onClick="QuitarUno(this.dataset.tag)">-</button>
	     </th>
	 <th>
	     <div class="quantity">
		   	 <span>${item.inCart}</span> 
		 </div>
	 </th>
	 <th>
         <button class="btn-plus" data-tag="${item.tag}" onClick="agregarUno(this.dataset.tag)">+</button>
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
		<table width="800" cellspacing="0" cellpadding="0" style="border-top:1pt solid black;">
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

/*function Recibo() {
  var text = document.getElementById("demo1");
  if (text.style.display === "none") {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}*/

function wpp(wppl){
	
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	
	if(cartItems == null){
		wppl.setAttribute('href','https://wa.me/573173832520?text=Hola%2C%20Licores%20Modelo%2E')
	} else{
	let cartCost = localStorage.getItem('totalCost');	
	let TodosPorductos = Object.values(cartItems);
	let productoswpp = "";
	
	for (let i=0; i < TodosPorductos.length; i++){
		productoswpp += TodosPorductos[i].inCart+"%20de%20"+TodosPorductos[i].name.replace(/\s/g, '%20')+"%0D%0A";
	}
	
	/*console.log(productoswpp)*/
	
	wppl.setAttribute('href', 'https://wa.me/573173832520?text=Hola%2C%20me%20gustar%C3%ADa%20ordenar%3A%0D%0A%0A'+productoswpp+'%0AEl%20costo%20total%20de%20la%20compra%20es%20%24'+cartCost+'%20COP'+'%0D%0A%0AMi%20direcci%c3%b3n%20es%3A');
	}
}

onLoadCartNumbers();
onLoadtotalCost();
displayCart();

