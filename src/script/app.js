import lazy from './_tools/lazy';
lazy();

import FormValid from './_tools/formValid';
import InputMask from './_tools/inputMask';
InputMask();

let form = document.getElementById("call");

let formValid = new FormValid(form, {}, true, 'ru');

form.addEventListener('submit', function (e) {
	
	var valid = formValid.validate();

	if (!valid){
		e.preventDefault();
		console.log('Error');
	}
	else{
		console.log('Ok');
	}

});

import Mp from '../blocks/magnific-popup/magnific-popup';
Mp();


document.addEventListener('DOMContentLoaded', function() {
});

// import bootstrap from 'bootstrap';


// ----------------------------POPUP------------------------------------------

import modal from "../blocks/modal/modal";
modal();