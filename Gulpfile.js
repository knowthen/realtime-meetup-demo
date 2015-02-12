'use strict';
let gulp = require('gulp');

gulp.task('vendor', function(){
  return gulp.src(['./bower_components/**'])
    .pipe(gulp.dest('./public/vendor'));
})

gulp.task('default', ['vendor'], function() {
  // place code for your default task here
});