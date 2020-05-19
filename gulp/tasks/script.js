let webpackConf = {
	mode: getMod() == 'dev' ? 'development' : 'production',
	devtool: getMod() == 'dev' ? 'eval-source-map' : 'none',
	optimization: {
		minimize: false
	},
	output: {
		filename: 'app.js',
	},
	module: {
		rules: []
	}
}

if(getMod() == 'prod'){
	webpackConf.module.rules.push({
		test: /\.(js)$/,
		exclude: /(node_modules)/,
		loader: 'babel-loader'
	});
}

module.exports = function () {	
	$.gulp.task('script', function() {
			return $.gulp.src($.path.src.script)
			.pipe($.gp.plumber())	
			.pipe($.webpackStream(webpackConf, $.webpack))
				.on('error', $.gp.notify.onError(
          {
              title: 'Scripts',
          }
      	))
				.pipe(getMod() == 'prod' ? $.gulp.dest($.path.dist.script) : $.gp.util.noop())
				.pipe(getMod() == 'prod' ? $.gp.uglify() : $.gp.util.noop())
				.pipe($.gp.rename({ suffix: '.min' }))
				.pipe($.gulp.dest($.path.dist.script))
				.pipe($.browserSync.reload({stream: true}))
	});
}