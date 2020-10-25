/**
 * https://github.com/sha256/Pristine
 * 
 * Example
	let form = document.getElementById("call");
	let formValid = new FormValid(form);
	form.addEventListener('submit', function (e){		
		var valid = formValid.validate();
		if (!valid){
			e.preventDefault();
			console.log('Error');
		}
		else{
			console.log('Ok');
		}
	});
 */

import Pristine from 'pristinejs';

let defaultConfig = {
	// class of the parent element where the error/success class is added
	classTo: 'form-group',
	errorClass: 'has-danger',
	successClass: 'has-success',
	// class of the parent element where error text element is appended
	errorTextParent: 'form-group',
	// type of element to create for the error text
	errorTextTag: 'div',
	// class of the error text element
	errorTextClass: 'invalid-feedback' 
};

class FormValid{
	constructor(form, config = {}, live = true, lang = 'ru', fn = function(){}){		
		this.form = form;
		this.config = config,
		this.live = live;
		this.pristine;
		this.lang = lang;	
		this.messages = {
			en: {
				required: "This field is required",
				email: "This field requires a valid e-mail address",
				number: "This field requires a number",
				url: "This field requires a valid website URL",
				tel: "This field requires a valid telephone number",
				maxlength: "This fields length must be < ${1}",
				minlength: "This fields length must be > ${1}",
				min: "Minimum value for this field is ${1}",
				max: "Maximum value for this field is ${1}",
				pattern: "Input must match the pattern ${1}"
			},
			ru: {
				required: "Поле не может быть пустым",
				email: "Укажите корректную почту",
				number: "Поле может быть только числом",
				minlength: "Поле не может быть меньше ${1}",
				maxlength: "Поле не может быть больше ${1}",
				phone: "Введите корректный телефон",
			}
		};

		fn.call(this);

		this.changeDefaultRules();

		this.pristine = new Pristine(form, Object.keys(config).length == 0 ? defaultConfig : config, live);
	}

	/**
	 * Change Default Rules
	 */
	changeDefaultRules(){
		let self = this;

		Pristine.addValidator('required', function (val) {
			return this.type === 'radio' || this.type === 'checkbox' ? groupedElemCount(this) : val !== undefined && val !== '';
		}, self.messages[self.lang].required, 99, true);

		Pristine.addValidator('email', function (val) {
			return !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
		}, self.messages[self.lang].email);

		Pristine.addValidator('number', function (val) {
			return !val || !isNaN(parseFloat(val));
		}, self.messages[self.lang].number, 2);

		Pristine.addValidator('minlength', function (val, length) {
			return !val || val.length >= parseInt(length);
		}, self.messages[self.lang].minlength);

		Pristine.addValidator('maxlength', function (val, length) {
			return !val || val.length <= parseInt(length);
		}, self.messages[self.lang].maxlength);

		Pristine.addValidator('phone', function (val) {
			return val.indexOf('_') < 0;
		}, self.messages[self.lang].phone);

	}

	/**
	 * Validate run
	 */
	validate(){
		return this.pristine.validate();
	}
}

export default FormValid;