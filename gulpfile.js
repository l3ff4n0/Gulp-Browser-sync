var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create();

var sassFiles = 'assets/css/scss/**/*.scss',
    cssFolder = 'assets/css/',
    jsFolder = 'assets/js';

//BrowserSync configuration
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "http://new-platform.local/",
        port: 3000
    });
});

//Compile scss files
gulp.task('styles', function(done){
    return gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(cleanCss({compatibility: 'ie10'}))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssFolder))
        .pipe(notify({message: 'sass compiled successfully'}))
        .pipe(browserSync.stream());
});

//Minification javascript
gulp.task('minify-js', function () {
    return gulp.src(['assets/js/*.js','!assets/js/*.min.js'])
        .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(jsFolder))
        .pipe(notify({message: 'js compiled successfully'}))
        .pipe(browserSync.stream());
});

//Default task
gulp.task('default', function(){
    browserSync.init({
        proxy: "http://new-platform.local/",
        port: 3000
    });
    gulp.watch(sassFiles, gulp.series('styles'));
    gulp.watch(['assets/js/*.js','!assets/js/*.min.js'], gulp.series('minify-js'));
});
