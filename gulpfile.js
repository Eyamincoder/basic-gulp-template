var gulp = require('gulp');
    sass = require('gulp-sass');
    rename = require('gulp-rename');
    uglify = require('gulp-uglify');
    imagemin = require('gulp-imagemin');
    concat = require('gulp-concat');
    autoprefixer = require('gulp-autoprefixer');


// compile html
gulp.task('html', function() {
    gulp.src("app/*.html")
        .pipe(gulp.dest('dist/'))

})


// compile Sass

gulp.task('styles', function() {
    gulp.src(['app/sass/app.scss'])
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
         .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
})

// js compile with minification and concat
gulp.task('scripts', function() {
    gulp.src(['app/js/*.js'])
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('dist/js'))
})

// Image Opitimize
gulp.task('images', function() {
    return gulp.src('app/images/*')
        .pipe(imagemin({
            verbose: true,
            progressive: true,

        }))
        .pipe(gulp.dest( 'dist/images'));
});


// default task with css js images  html file wtachi
gulp.task('default', function() {
     gulp.run( 'html','styles','scripts','images');

    gulp.watch('app/*.html', function(event) {
        gulp.run('html');
    })

    gulp.watch('app/sass/*.scss', function(event) {
        gulp.run('styles');
    })

    gulp.watch('app/js/*.js', function(event) {
        gulp.run('scripts');
    })

     gulp.watch('app/images/*', function(event) {
         gulp.run('images');
     })

})
