module.exports = function clean(){
	return $.del([
		'dist'
	]);
}