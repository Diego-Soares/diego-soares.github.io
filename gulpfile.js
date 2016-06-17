var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var notify = require("gulp-notify");
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var stylus = require('gulp-stylus');

gulp.task('one', function () {
  return gulp.src('/src/styl/style.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./css/build'));
});

gulp.task('styles', function() {
  // Stuff here
  return gulp.src('build/css/style.css')
    .pipe(plumber())
    .pipe(cleanCSS({compatibility: 'ie9'}))
	.pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
  	.pipe(notify({
			message: 'Styles task complete'
		}));
});

gulp.task('images', function() {
	return gulp.src(['assets/images/*'])
		.pipe(imagemin({
			optimizationLevel: 3,
      		progressive: true,
      		interlaced: true
		}))
		.pipe(gulp.dest('build/images'))
		.pipe(notify({
      		message: 'Images task complete'
    	}));
});

gulp.task('scripts', function(){
	return gulp.src('assets/scripts/**/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('build/scripts'))
})

gulp.task('fonts', function() {
  	return gulp.src(['assets/fonts/**/*'])
    .pipe(gulp.dest('build/fonts'))
    .pipe(notify({
      message: 'Fonts task complete'
    }));
})

gulp.task('watch', function(){
	gulp.watch('assets/scss/**/*', ['stylus']);
	gulp.watch('assets/scss/**/*', ['styles']);
	gulp.watch('assets/images/*', ['images']);
	gulp.watch('assets/fonts/*', ['fonts']);
	gulp.watch('assets/scripts/**/*', ['scripts']);
});

gulp.task('default', function() {
	gulp.start('watch');
});