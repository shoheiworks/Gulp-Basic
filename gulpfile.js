var gulp = require('gulp');
//Plugin
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

gulp.task('server' ,function(){
    browserSync({
        // proxy: ''
        //XAMP Wordpress
        server: {
            baseDir: "./docs"
        }
    });
    gulp.watch('docs/css/style.scss', ['sass']);
    gulp.watch('docs/css/style.css', ['bs-reload']);
    gulp.watch('docs/*.html', ['bs-reload']);
});

gulp.task('sass', function () {
    gulp.src('docs/css/style.scss')
        .pipe(sass({outputStyle:'compressed',errLogToConsole: true}))
        //outputStyle : nested > compressed : don't use : 'expanded' and 'compact'
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('docs/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('docs/css')) //min.css
});

//ブラウザリロード
gulp.task('bs-reload', function () {
    browserSync.reload();
});
  
gulp.task('default', ['server']);

