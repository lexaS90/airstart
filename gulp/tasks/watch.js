module.exports = function() {
    $.gulp.task('watch', function() {
        $.gulp.watch($.path.watch.html, $.gulp.series('pugFast'));
        $.gulp.watch($.path.watch.style, $.gulp.series('scss'));
				$.gulp.watch($.path.watch.script, $.gulp.series('script'));
				$.gulp.watch($.path.watch.image, $.gulp.series('image'));
				$.gulp.watch($.path.watch.font, $.gulp.series('font'));
    });
};