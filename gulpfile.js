const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const nodemon = require('nodemon');
const source = require('vinyl-source-stream');

const vendorCss = ['../node_modules/bootstrap/dist/css/*.min.css', '../node_modules/bootstrap-material-design/dist/css/*.min.css'];
const vendorJs = ['../node_modules/bootstrap/dist/js/*.min.js', '../node_modules/bootstrap-material-design/dist/js/*.min.js', '../node_modules/jquery/dist/*.min.js'];

gulp.task('default', ['copy-vendor-css', 'copy-vendor-js', 'compile-react', 'nodemon', 'watch']);

gulp.task('nodemon', function(){
  return nodemon({
    script: './server/server.js',
    ext: 'js',
    watch: ['./server/']
  }).on('start', function(){
    console.log('node server started!');
  }).on('restart', function(){
    console.log('node server restarted!');
  });
});

gulp.task('copy-vendor-css', function(){
  return gulp.src(vendorCss)
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('copy-vendor-js', function(){
  return gulp.src(vendorJs)
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('compile-react', function(){
  return browserify({
    entries: './react/app.jsx',
    extensions: ['.jsx'],
    debug: true
  }).transform('babelify', {
    presets: ['es2015', 'react']
  }).bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./public'));
});

gulp.task('watch', function(){
  return gulp.watch('./react/**/*.jsx', ['compile-react']);
});
