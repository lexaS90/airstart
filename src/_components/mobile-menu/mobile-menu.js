import Mmenu from 'mmenu-js';
import PubSub from 'pubsub-js';
import Burger from '../burger/burger.js';

let burger = new Burger(document.querySelector('#menuToggle'));

export default class MobileMenu{
	constructor(){
		
		this.option = {
			"extensions": [
					"position-front",
					"theme-dark"
			 ],
			 hooks: {
						"close:before": () => {
								burger.close();
						}
				},
				navbar:{
					add: false
				},
		};

		this.config = {                
			offCanvas: {
				page: {
						selector: "#pageWrapper"
				},

			}
		};
		
		this.menu;
		this.api;		
		
		document.addEventListener("DOMContentLoaded", () => {	
			 this.init();
			 this.burgerSubscribe();
		});
	}

	init(){
		this.menu = new Mmenu( "#mobileMenu", this.option, this.config);
		this.api = this.menu.API;
	}

	burgerSubscribe(){
		let th = this;
		PubSub.subscribe('toggleBurger', function(msg, data){
			if(data.target != '#mobileMenu') return;

			if(data.isActive){
				th.api.open();
			}
			else{
				th.api.close();
			}			
		});
	}
}