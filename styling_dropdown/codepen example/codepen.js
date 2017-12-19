(function(){
	var customSelects = document.querySelectorAll(".custom-dropdown__select");
	for(var i=0; i<customSelects.length; i++){
		if (customSelects[i].hasAttribute("disabled")){
			customSelects[i].parentNode.className += " custom-dropdown--disabled";
		}
	}	
})()

// Read the full article here
// http://red-team-design.com/making-html-dropdowns-not-suck
