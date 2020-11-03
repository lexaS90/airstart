import 'focus-visible';

import Burger from '../../_components/burger/burger.js';
new Burger(document.querySelector('#menuToggle'));

// import lazy from './_tools/lazy';
// lazy();

// import FormValid from './_tools/formValid';
// import InputMask from './_tools/inputMask';
// InputMask();

// let form = document.getElementById("call");

// let formValid = new FormValid(form, {}, true, 'ru');

// form.addEventListener('submit', function (e) {
	
// 	var valid = formValid.validate();

// 	if (!valid){
// 		e.preventDefault();
// 		console.log('Error');
// 	}
// 	else{
// 		console.log('Ok');
// 	}

// });


document.addEventListener('DOMContentLoaded', function() {
});

// import bootstrap from 'bootstrap';


// ----------------------------POPUP------------------------------------------

// import modal from "../../_components/modal/modal";
// modal();

const a = '25';

// --------------------------- Lazy -------------------------------------------

import LazyLoad from "vanilla-lazyload";

var lazyLoadInstance = new LazyLoad({
  // Your custom settings go here
});

// ---------------------------- Test webp ------------------------------------

function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
	callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	
	testWebP(function (support) {
	
	if (support == true) {
	document.querySelector('html').classList.add('webp');
	}else{
	document.querySelector('html').classList.add('no-webp');
	}
	});