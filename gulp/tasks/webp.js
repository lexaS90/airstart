module.exports = function webp(){
	return $.gulp.src($.path.dist.image + '**/*.{png,jpg,jpeg}')
		.pipe($.gp.webp())
		.pipe($.gulp.dest($.path.dist.image))
}