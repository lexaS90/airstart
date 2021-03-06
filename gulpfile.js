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
		nunjucks: require('gulp-nunjucks'),
		svgSprite: require('gulp-svg-sprite')
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
$.path.watch = {};
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
	$.path.src.srcPath + $.path.src.blocksDirName + '/**/*.js'
];

/**
 * Настройка путей для изображений
 */
$.path.src.image[0] = $.path.src.srcPath + $.path.src.image[0];
$.path.src.image.push("!" + $.path.src.image[0].slice(0, -6) + "svgIcons/*.svg");
$.path.dist.image = $.path.dist.distPath + $.path.dist.image;
$.path.watch.image = [
	$.path.src.image[0]
];
$.path.watch.image.push("!" + $.path.src.image[0].slice(0, -6) + "svgIcons/*.svg");

/**
 * Настройка путей для шрифтов
 */
$.path.src.font[0] = $.path.src.srcPath + $.path.src.font[0];
$.path.src.font.push("!" + $.path.src.font[0].slice(0, -6) + "src/*.*");
$.path.dist.font = $.path.dist.distPath + $.path.dist.font;
$.path.watch.font = [
	$.path.src.font[0],
];
$.path.watch.font.push("!" + $.path.src.font[0].slice(0, -6) + "src/*.*");

/**
 * Подключение тасков
 */

const taskPaths = {
	'serve': './gulp/tasks/serve',
	'watch': './gulp/tasks/watch',
	'clean': './gulp/tasks/clean',
	'scss': './gulp/tasks/scss',
	'script': './gulp/tasks/script',
	'image_min': './gulp/tasks/image_min',
	'webp': './gulp/tasks/webp',
	'njk': './gulp/tasks/njk',
	'ttf2woff': './gulp/tasks/ttf2woff',
	'ttf2woff2': './gulp/tasks/ttf2woff2',
	'otf2ttf': './gulp/tasks/otf2ttf',
	'font': './gulp/tasks/font',
	'svgsprite': './gulp/tasks/svgsprite',
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
 * Генерация шрифтов
 */
exports.fonts_generate = tasks['fonts_generate'] = $.gulp.series(tasks['otf2ttf'], $.gulp.parallel(tasks['ttf2woff'], tasks['ttf2woff2']));


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
		tasks['svgsprite'],
	),
	$.gulp.parallel(
			tasks['scss'],
			tasks['njk'],
			tasks['script'],
			tasks['image'],
			tasks['font'],
	), 
	$.gulp.parallel(
		tasks['serve'],
		tasks['watch']
	)
);