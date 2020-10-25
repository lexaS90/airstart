module.exports = function scss(){
	return $.gulp.src($.path.src.style)
		.pipe(getMod() == 'dev' ? $.gp.sourcemaps.init() : $.gp.util.noop())
		.pipe($.gp.sassGlob())
		.pipe($.gp.sass())
		.on('error', $.gp.notify.onError({
				title: 'Style'
		}))
		.pipe(getMod() == 'prod' ? $.gp.autoprefixer() : $.gp.util.noop())
		.pipe(getMod() == 'prod' ? $.gcmq() : $.gp.util.noop())
		.pipe(getMod() == 'dev' ? $.gp.sourcemaps.write() : $.gp.util.noop())
		.pipe(getMod() == 'prod' ? $.gulp.dest($.path.dist.style) : $.gp.util.noop())
		.pipe(getMod() == 'prod' ? $.gp.csso() : $.gp.util.noop())	
		.pipe($.gp.rename({ suffix: '.min' }))
		.pipe($.gulp.dest($.path.dist.style))
		.pipe($.browserSync.reload({stream: true}))
}