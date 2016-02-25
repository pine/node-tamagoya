const gulp = require('gulp');
const xo = require('gulp-xo');

gulp.task('check', ['lint', 'test']);

gulp.task('lint', () =>
  gulp.src(['*.js', 'lib/**/*.js', 'bin/*'])
    .pipe(xo())
);

gulp.task('test', []);
