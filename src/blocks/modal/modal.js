import Modal from 'modal-vanilla';

export default function(){

	document.querySelector('[data-toggle="modal"]').addEventListener('click', function(e){
		e.preventDefault();

		let target = this.getAttribute('data-target');

		let ty = new Modal({
			el: document.getElementById(target)
		}).show();	

		ty.on('show', function(){
			console.log('shown');
		});

		ty.on('hide', function(){
			console.log('hide');
		});

	});	
}