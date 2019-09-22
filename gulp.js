var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create();

var sassFiles = 'css/scss/**/*.scss',
    cssFolder = 'css/',
    jsFiles = 'js/*.js',
    jsFolder = 'js/min';

//BrowserSync configuration
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "http://localhost/namewebsite/",
        port: 3000
    });
});

//Compile scss files
gulp.task('styles', function(done){
    return gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(cleanCss({compatibility: 'ie10'}))
        .pipe(gulp.dest(cssFolder))
        .pipe(notify({message: 'sass compiled successfully'}))
        .pipe(browserSync.stream());
});

//Minification javascript
gulp.task('minify-js', function () {
    return gulp.src(jsFiles)
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
        proxy: "http://localhost/newplatform/",
        port: 3000
    });
    gulp.watch(sassFiles, gulp.series('styles'));
    gulp.watch(jsFiles, gulp.series('minify-js'));
});
