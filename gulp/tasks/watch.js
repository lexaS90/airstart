module.exports = function watch(){
	$.gulp.watch($.path.watch.html, $.gulp.series($.tasks.njk));
	$.gulp.watch($.path.watch.style, $.gulp.series($.tasks.scss));
	$.gulp.watch($.path.watch.script, $.gulp.series($.tasks.script));
	$.gulp.watch($.path.watch.image, $.gulp.series($.tasks.image));
	$.gulp.watch($.path.watch.font, $.gulp.series($.tasks.font));
	$.gulp.watch($.path.src.image[0].slice(0, -6) + "svgIcons/*.svg", $.gulp.series($.tasks.svgsprite));
}