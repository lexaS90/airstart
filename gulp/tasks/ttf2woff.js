module.exports = function ttf2woff(){
	return $.gulp.src($.path.src.font[0].slice(0, -6) + "src/*.ttf")
		.pipe($.gp.ttf2woff())
		.pipe($.gulp.dest("./src/assets/fonts"));
}