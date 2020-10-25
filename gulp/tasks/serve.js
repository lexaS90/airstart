module.exports = function serve() {
	$.browserSync.init({
			open: true,
			server: $.path.dist.distPath
	});
	$.browserSync.watch([
	], $.browserSync.reload);
}