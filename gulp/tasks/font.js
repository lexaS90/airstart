module.exports = function font() {
	return $.gulp.src($.path.src.font)		
		.pipe($.gulp.dest($.path.dist.font))
		.on('end', $.browserSync.reload);
};