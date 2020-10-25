/**
 * Подключение файла настроек
 */
global.projectConfig = require('./projectConfig.json');

/**
 * Глобальные переменные
 */
global.$ = {
    path: projectConfig.path,
    gulp: require('gulp'),
    gp: require('gulp-load-plugins')(),
    browserSync: require('browser-sync').create(),
		gcmq: require('gulp-group-css-media-queries'),
		webpackStream: require('webpack-stream'),
		webpack: require('webpack'),
		pngquant: require('imagemin-pngquant'),
		del: require('del'),
		imageminJpegRecompress: require('imagemin-jpeg-recompress'),
		webpHTML: require('gulp-webp-html'),
		nunjucks: require('gulp-nunjucks')
}

/**
 * Режим работы
 */
global.getMod = function(){
    return $.gp.util.env.production ? 'prod' : 'dev';
}

/**
 * Настройка путей для html
 */
$.path.src.html[0] = $.path.src.srcPath + $.path.src.html[0];
$.path.dist.html = $.path.dist.distPath + $.path.dist.html;
$.path.src.html.push( "!" + $.path.src.html[0].slice(0, -6) + "_*.html" );
$.path.src.html.push( "!" + $.path.src.srcPath + "/assets" );
$.path.src.html.push( "!" + $.path.src.srcPath + "/_html" );
$.path.watch.html = [
    $.path.src.html[0],
    $.path.src.srcPath + $.path.src.blocksDirName + '/**/*.html'
];

/**
 * Настройка путей для css
 */
$.path.src.style[0] = $.path.src.srcPath + $.path.src.style[0];
$.path.dist.style = $.path.dist.distPath + $.path.dist.style;
$.path.watch.style = [
    $.path.src.style[0].replace( $.path.src.style[0].split('/').pop(), '**/*.scss' ),
    $.path.src.srcPath + $.path.src.blocksDirName + '/**/*.scss'
];

/**
 * Настройка путей для js
 */
$.path.src.script[0] = $.path.src.srcPath + $.path.src.script[0];
$.path.dist.script = $.path.dist.distPath + $.path.dist.script;
$.path.watch.script = [
	$.path.src.script[0].replace( $.path.src.script[0].split('/').pop(), '**/*.js' ),
];

/**
 * Настройка путей для изображений
 */
$.path.src.image[0] = $.path.src.srcPath + $.path.src.image[0];
$.path.dist.image = $.path.dist.distPath + $.path.dist.image;
$.path.watch.image = [
	$.path.src.image[0]
];

/**
 * Настройка путей для шрифтов
 */
$.path.src.font[0] = $.path.src.srcPath + $.path.src.font[0];
$.path.dist.font = $.path.dist.distPath + $.path.dist.font;
$.path.watch.font = [
	$.path.src.font[0]
];

/**
 * Подключение тасков
 */

const taskPaths = {
	//'pug': './gulp/tasks/pug',
	'serve': './gulp/tasks/serve',
	'watch': './gulp/tasks/watch',
	'clean': './gulp/tasks/clean',
	'scss': './gulp/tasks/scss',
	'script': './gulp/tasks/script',
	'image_min': './gulp/tasks/image_min',
	'webp': './gulp/tasks/webp',
	'njk': './gulp/tasks/njk'
}

const tasks = {};
for (let item in taskPaths) {
	tasks[item] = require(taskPaths[item]);
	exports[item] = tasks[item];
}

/**
 * Общий таск для изображений
 */

exports.image = tasks['image'] = $.gulp.series(tasks['image_min'], tasks['webp'], (done) => {$.browserSync.reload(); done();});

/**
 * Глобальный массив тасков
 */
global.$.tasks = tasks;

/**
 * Запуск тасков
 */

exports.default = $.gulp.series(

	$.gulp.parallel(
		tasks['clean'],
	),
	$.gulp.parallel(
			tasks['scss'],
			tasks['njk'],
			tasks['script'],
			tasks['image'],
			//'font'
	), 
	$.gulp.parallel(
		tasks['serve'],
		tasks['watch']
	)
);