//Required
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;


//Create js object to hold paths
var paths = {

    styles: {

        src: './sass/style.scss',
        dest: './css'

    },
    js: {

    	src: './scripts',
    	files: './scripts/*.js',
    	dest: ''


    }

}


// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});




//Process sass
gulp.task('sass', function () {

     gulp.src( paths.styles.src )
    .pipe( sass( {style: 'compressed'} ))
    .pipe(rename('style.min.css'))
    .pipe( gulp.dest( paths.styles.dest ))
    .pipe(reload({stream:true}));
    

});


//Create An array of scripts in order for Concat




//Uglify Js
gulp.task('compressjs', function() {

    return gulp.src('./js/script.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(rename('script.min.js'))
    .pipe(gulp.dest('./js/'))
    
    
});


gulp.task('default', ['sass', 'browser-sync'], function () {

    
    gulp.watch( paths.styles.src , ['sass'])
    gulp.watch( './js/script.js' , ['compressjs', browserSync.reload])

});




