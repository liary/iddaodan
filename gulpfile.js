var gulp = require('gulp');

var less = require('gulp-less');

var path = require('path');

// gulp.task('less', function () {
//   return gulp.src('./static/less/*.less')
//     .pipe(less(
//         {
//             paths: [ path.join(__dirname, 'less', 'includes') ]
//         }
//     ))
//     .pipe(gulp.dest('./static/css'));
// });

// gulp.task('testWatch', function(){
//     console.log('dd')
//     gulp.watch('./static/less/**/*.less', ['less']);
// });

var sass = require('gulp-sass');
var rename = require('gulp-rename');

gulp.task('css', function() {
    gulp.src('./static/sass/*.scss').pipe(sass({
        outputStyle : 'compressed'
    }).on('error', sass.logError)).pipe(rename(function(path) {
        path.basename += '.min';
    })).pipe(gulp.dest('./static/css/'));
    gulp.src('./static/sass/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('./static/css/'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./static/**/*.scss', ['css']);
});
gulp.task('default', ['sass:watch']);
