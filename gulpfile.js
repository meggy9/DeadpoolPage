'use strict';

var gulp = require('gulp');
var gp = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var cssunit = require('gulp-css-unit');
var jsmin = require('gulp-jsmin');


gulp.task('serve', function() {
    browserSync.init({
        server: "./build"
    });
});

gulp.task('jsmin', function () {
	return gulp.src('source/js/*.js')
        .pipe(jsmin())
        .pipe(gulp.dest('build/js'));
})

gulp.task('clean', function () {
    return gulp.src('build', {read: false, allowEmpty: true})
        .pipe(gp.clean());
});


gulp.task('pug', function () {
	return gulp.src('source/pug/pages/*.pug')
	.pipe(gp.pug({
		pretty: true
	}))
	.pipe(gulp.dest('build'))
	.on('end', browserSync.reload);
});


gulp.task('sass', function(){
	return gulp.src('source/style/*.scss')
	.pipe(gp.sourcemaps.init())
	.pipe(gp.sass())
	.on('error', gp.notify.onError({
		title: 'Style'
	}))
	.pipe(gp.autoprefixer({
		browsers: [
			'last 3 version',
			'> 1%',
			'ie 8',
			'ie 9',
			'Opera 12.1'
		]
	}))
	.pipe(gp.csso())
	
	.pipe(gp.sourcemaps.write())
	.pipe(gulp.dest('build/css'))
	.on('end', browserSync.reload);
});


gulp.task('cssunit', function(){
	return gulp.src('build/css/main.css')
	.pipe(cssunit({
            type     :    'px-to-rem',
            rootSize :    16
        }))
	.pipe(gulp.dest('build/css'));
});


gulp.task('watch', function(){
	gulp.watch('source/pug/**/*.pug', gulp.series('pug'));
	gulp.watch('source/style/**/*.*', gulp.series('sass'));
	gulp.watch('source/js/*.js', gulp.series('jsmin'))
});

gulp.task('default', gulp.series( gulp.parallel('pug', 'sass', 'jsmin'), 'cssunit', gulp.parallel('watch', 'serve')));