/** 
* gulpfile.js
*
* Author: Trent Hogan
* 
* to use: 
*
* Make sure you have a package.json with all your dependencies
* Run: npm install to install all your dependencies
*
* Profit
*/

var gulp = require('gulp');
//Require gulp load plugins to load all other plugins for us.
    gulpLoadPlugins = require('gulp-load-plugins');
    plugins = gulpLoadPlugins({  scope: ['devDependencies'] });
    //Load preen which will strip excess files from bower packages for us
    preen = require('preen');
    //Include browser sync to live reload for you
    var browserSync = require('browser-sync');
    var reload      = browserSync.reload;



//Create js object to hold paths
var paths = {

    styles: {

        src: './less/style.less',
        directory: '/less',
        includes: './less/includes/*.less',
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


//Process less
gulp.task('less', function () {

     //Minified Css
     gulp.src( paths.styles.src )
    .pipe( plugins.less({
      paths: [ __dirname + paths.styles.directory ],
      compress: true
    }))
    .pipe( plugins.rename('style.css') )
    .pipe( gulp.dest( paths.styles.dest ) )
    .on('error', plugins.util.log)
    .pipe(reload({stream:true}));


});


//Uglify Js
gulp.task('compressjs', function() {

    return gulp.src('./js/script.js')
    .pipe( plugins.jshint() )
    .pipe( plugins.jshint.reporter('default') )
    .pipe( plugins.uglify() )
    .pipe( plugins.rename('script.min.js') )
    .pipe( gulp.dest('./js/') )
    
    
});

//Preen Bower files
gulp.task('preen', function(cb) {
  preen.preen({}, cb);
});


gulp.task('default', ['less', 'compressjs', 'browser-sync'], function () {

    
    gulp.watch( paths.styles.src , ['less'])
    gulp.watch( paths.styles.includes , ['less'])
    gulp.watch( './js/script.js' , ['compressjs', browserSync.reload])

});



