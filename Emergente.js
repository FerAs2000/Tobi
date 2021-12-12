let Mayor = localStorage.getItem('SoyMayor')

if (Mayor == null){
	console.log('ajam')
	overlay0.setAttribute("class", "overlay");
	
	function Si(){
	console.log("conectado")
	overlay0.setAttribute("class", "overlayh");
	overlay2.setAttribute("class", "overlay2");
	localStorage.setItem("SoyMayor", "si");
	console.log(Mayor)
	}
	
	function No(){
	console.log("conectado")
	overlay0.setAttribute("class", "overlayh");
	overlay2.setAttribute("class", "overlay2h");
	}
}