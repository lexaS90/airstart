module.exports = function njk() {
	return $.gulp.src($.path.src.html)
		.pipe($.nunjucks.compile(
			{name: 'Sindre'},
			{
				filters: {
					'webp': src => src.substr(0, src.lastIndexOf('.')) + '.webp'
				}
			},
			
		))
		.pipe($.gulp.dest($.path.dist.html))
		.on('end', $.browserSync.reload);
}