const path = require('path')
const fs = require('fs')
const gulp = require('gulp')
const clean = require('gulp-clean')
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify-es').default
const htmlmin = require('gulp-htmlmin')
const jsonminify = require('gulp-jsonminify')

gulp.task('clean', () => {
	return gulp.src('dist', { read: false, allowEmpty: true })
		.pipe(clean())
})

gulp.task('copy', () => {
	return gulp.src('src/**/*', { allowEmpty: true })
		.pipe(gulp.dest('dist'))
})

gulp.task('cleanSCSS', () => {
	return gulp.src('dist/scss', { read: false, allowEmpty: true })
		.pipe(clean())
})

gulp.task('minifyCSS', () => {
	return gulp.src('dist/css/**/*.css', { allowEmpty: true })
		.pipe(cleanCSS())
		.pipe(gulp.dest('dist/css'))
})

gulp.task('uglifyJS', () => {
	return gulp.src('dist/js/**/*.js', { allowEmpty: true })
		.pipe(uglify({
			compress: { drop_console: true }
		}))
		.pipe(gulp.dest('dist/js'))
})

gulp.task('minifyHTML', () => {
	return gulp.src('dist/**/*.html', { allowEmpty: true })
		.pipe(htmlmin({ collapseWhitespace: true, }))
		.pipe(gulp.dest('dist'))
})

gulp.task('minifyManifest', () => {
	return gulp.src('dist/manifest.json', { allowEmpty: true })
		.pipe(jsonminify())
		.pipe(gulp.dest('dist'))
})

gulp.task('default', gulp.series(
	'clean',
	'copy',
	gulp.parallel(
		'cleanSCSS',
		'minifyCSS',
		'uglifyJS',
		'minifyHTML',
		'minifyManifest'
	)
))