module.exports = function pug() {
	return $.gulp.src($.path.src.html)
		.pipe($.gp.pug({ pretty: true }))
		.on('error', $.gp.notify.onError({
				title: 'Pug'
		}))
		//.pipe($.webpHTML())
		.pipe($.gulp.dest($.path.dist.html))
		.on('end', $.browserSync.reload);
}

// module.exports = function () {
//     $.gulp.task('pug', function () {
// 		return $.gulp.src($.path.src.html)
// 	  	.pipe($.gp.pug({ pretty: true }))
// 	  	.on('error', $.gp.notify.onError({
//           title: 'Pug'
// 			}))
// 		  .pipe($.gulp.dest($.path.dist.html))
// 		  .on('end', $.browserSync.reload);
// 	});

// 	// $.gulp.task('pugFast', function () {
// 	// 	return $.gulp.src($.path.src.html, { since: $.gulp.lastRun('pug')})
// 	//   	.pipe($.gp.pug({ pretty: true }))
// 	//   	.on('error', $.gp.notify.onError({
//   //         title: 'Pug'
// 	// 		}))
// 	// 	  .pipe($.gulp.dest($.path.dist.html))
// 	// 	  .on('end', $.browserSync.reload);
// 	// });
// }