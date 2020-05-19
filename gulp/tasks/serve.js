module.exports = function() {
    $.gulp.task('serve', function() {
        $.browserSync.init({
            open: true,
            server: $.path.dist.distPath
        });
        $.browserSync.watch([
        ], $.browserSync.reload);
    });
};