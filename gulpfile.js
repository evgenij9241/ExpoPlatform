var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
gulp.task('sass', function() {
    gulp.src(['src/scss/style.scss'])
        .pipe(plumber())
        .pipe(sass({ errLogToConsole: true }))
        .pipe(gulp.dest('css'));
});
gulp.task('default', function() {
    gulp.start('sass');
    gulp.watch('src/scss/**', function(event) {
        gulp.start('sass');
    })
});;