import PubSub from 'pubsub-js';

export default class Burger{
	constructor(el) {
		if(!el) return;

		this.burger = el;
		this.burgerBtn = this.burger.querySelector('[data-role="burger"]');
		

		this._changeActive(this.burgerBtn);
	}

	/**
	 * Change status
	 */
	_changeActive(burgerBtn) {
		let th = this;
		
		burgerBtn.addEventListener('click', function(e){
			th.toggle();
		});
	}

	/**
	 * Custom events
	 */
	_sendEvent(el) {
		let th = this;

		PubSub.publish('toggleBurger', {
			'target': el.dataset.target,
			'isActive': th.burger.classList.contains('active')
		});
	}

	/**
	 * Open
	 */
	open(){
		if(this.isActive()) return;

		this.burger.classList.add('active');

		this._sendEvent(this.burgerBtn);
	}

	/**
	 * Close
	 */
	close(){
		if(!this.isActive()) return;

		this.burger.classList.remove('active');

		this._sendEvent(this.burgerBtn);
	}

	/**
	 * Toggle
	 */
	toggle(){
		this.burger.classList.toggle('active');

		this._sendEvent(this.burgerBtn);
	}

	isActive(){
		return this.burger.classList.contains('active');
	}
}