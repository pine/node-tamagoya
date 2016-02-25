const gulp = require('gulp');
const xo = require('gulp-xo');
const ava = require('gulp-ava');

gulp.task('check', ['lint', 'test']);

gulp.task('lint', () =>
  gulp.src(['*.js', 'lib/**/*.js', 'bin/*'])
    .pipe(xo())
);

gulp.task('test', () =>
  gulp.src('test/**/*_test.js')
    .pipe(ava())
);
