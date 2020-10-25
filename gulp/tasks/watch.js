module.exports = function watch(){
	$.gulp.watch($.path.watch.html, $.gulp.series($.tasks.njk));
	$.gulp.watch($.path.watch.style, $.gulp.series($.tasks.scss));
	$.gulp.watch($.path.watch.script, $.gulp.series($.tasks.script));
	$.gulp.watch($.path.watch.image, $.gulp.series($.tasks.image));
	
	// $.gulp.watch($.path.watch.font, $.gulp.series('font'));
}

// module.exports = function() {
//     $.gulp.task('watch', function() {
//         $.gulp.watch($.path.watch.html, $.gulp.series('pugFast'));
//         $.gulp.watch($.path.watch.style, $.gulp.series('scss'));
// 				$.gulp.watch($.path.watch.script, $.gulp.series('script'));
// 				$.gulp.watch($.path.watch.image, $.gulp.series('image'));
// 				$.gulp.watch($.path.watch.font, $.gulp.series('font'));
//     });
// };