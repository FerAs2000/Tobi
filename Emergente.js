/*--- ---------------------------------------- --->
<!--- Autor: Daniela Fernanda Lopez Astorquiza --->
<!--- --- Copyright (c) 2021 Licores Modelo -- --->
<!--- ------ Popayan - Cauca - Colombia ------ --->
<!--- ---------------------------------------- --*/

let Mayor = localStorage.getItem('SoyMayor')

if (Mayor == null){
	overlay0.setAttribute("class", "overlay");
	
	function Si(){
	overlay0.setAttribute("class", "overlayh");
	overlay2.setAttribute("class", "overlay2");
	localStorage.setItem("SoyMayor", "si");
	}
	
	function No(){
	overlay0.setAttribute("class", "overlayh");
	overlay2.setAttribute("class", "overlay2h");
	}
}