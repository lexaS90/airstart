var Inputmask = require('inputmask');

function inputMask(){
	let phoneSelectors = document.querySelectorAll('[data-role="phone"]');

	let im = new Inputmask({
		placeholder: '+7(___) ___-____',
		//'alias': 'datetime',
		//inputFormat: "HH:MM",
		mask: "+7(999) 999-9999",
	});

	for(var i=0; i < phoneSelectors.length; i++){
		im.mask(phoneSelectors[i]);
		phoneSelectors[i].setAttribute('data-pristine-phone', 'data-pristine-phone');
	}
}

export default inputMask;