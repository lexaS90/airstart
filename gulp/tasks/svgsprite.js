module.exports = function svgsprite() {	
	
	let config = {
    shape: {
        dimension: {
            maxWidth: 500,
            maxHeight: 500
        },
        spacing: {
            padding: 0
        },
        transform: [{
        	"svgo": {
        		"plugins": [
        			{ removeViewBox: false },
							{ removeUnusedNS: false },
							{ removeUselessStrokeAndFill: true },
							{ cleanupIDs: false },
							{ removeComments: true },
							{ removeEmptyAttrs: true },
							{ removeEmptyText: true },
							{ collapseGroups: true },
							{ removeAttrs: { attrs: '(fill|stroke|style)' } }
        		]
        	}
        }]
    },
    mode: {
        symbol: {
            dest : '.',
            sprite: 'sprite.svg'
        }
    }
	};

	return $.gulp.src($.path.src.image[0].slice(0, -6) + "svgIcons/*.svg")		
		.pipe($.svgSprite(config)).on('error', function(error){ console.log(error); })
		.pipe($.gulp.dest($.path.src.image[0].slice(0, -6) + "site"))
		.on('end', $.browserSync.reload);
}