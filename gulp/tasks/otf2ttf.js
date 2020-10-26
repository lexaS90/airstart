module.exports = function otf2ttf(){
	return $.gulp.src($.path.src.font[0].slice(0, -6) + "src/*")
		.pipe($.gp.fonter({
			formats: ['ttf']
		}))
		.pipe($.gulp.dest($.path.src.font[0].slice(0, -6) + "src"));
}