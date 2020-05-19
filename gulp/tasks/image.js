module.exports = function () {
	$.gulp.task('image-min', function() {
		return $.gulp.src($.path.src.image)
		.pipe($.gp.newer($.path.dist.image))
		.pipe($.gp.imagemin({      
				progressive: true,
				interlaced: true,
				svgoPlugins: [{removeViewBox: false}],
				use: [$.pngquant()]
		}))
		.pipe($.gulp.dest($.path.dist.image))
		//.on('end', $.browserSync.reload);
	});

	$.gulp.task('webp', function() {
		return $.gulp.src($.path.dist.image + '**/*.{png,jpg,jpeg}')
			.pipe($.gp.webp())
			.pipe($.gulp.dest($.path.dist.image))
	});

	$.gulp.task('image', $.gulp.series('image-min', 'webp', (done) => {$.browserSync.reload(); done();}));
};