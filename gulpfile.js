// Require Gulp and related Gulp plugins
var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var imageresize = require('gulp-image-resize');
var imagemin = require('gulp-imagemin');
var inline = require('gulp-inline');
var minifycss = require('gulp-minify-css');
var minifyhtml = require('gulp-minify-html');
var replace = require('gulp-replace');
var util = require('gulp-util');
var smoosher = require('gulp-smoosher');
var del = require('del');

// Clean the build folder
gulp.task('cleanbuild', function(cb) {
    del(['./build/**'], cb);
});

//Move the views directory to the build folder. No action is taken on these
//files since optimization for page speed is not required.
gulp.task('moveviews',['cleanbuild'], function () {
    return gulp.src('src/views/**')
        .pipe(gulp.dest('build/views'))
});

gulp.task('movefont',['moveviews'], function(){
    return gulp.src('src/css/*.ttf')
        .pipe(gulp.dest('build/css'))
});
//Minify css files
gulp.task('cssminify',['movefont'] , function(){
    return gulp.src('src/css/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('build/css'));
});

//uglify Javascript
gulp.task('uglify',['cssminify'], function(){
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

// Resize and compress the images
gulp.task('mainimages',['uglify'], function(){
    return gulp.src('src/img/**')
        .pipe(imagemin({
            otimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('build/img'));
});

// resize and compress the pizzeria image because it is waaay to big
gulp.task('pizzeriaimage',['mainimages'], function () {
    return gulp.src('src/views/images/pizzeria.jpg')
        .pipe(imageresize({
            width: 100
        }))
        .pipe(imagemin({
            otimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('build/img'));
});

// Inline css and javascript into index.html and minify
gulp.task('html',['pizzeriaimage'], function(){
    return gulp.src('src/*.html')
        .pipe(smoosher({
            base: 'build'
        }))
        .pipe(minifyhtml())
        .pipe(gulp.dest('build'));
});

// Remove the js folder and styles.css because they are both inlined into 
// index.html
gulp.task('cleantemp', function () {
    return gulp.src()
});

gulp.task('build',function() {
    gulp.start('html');
});