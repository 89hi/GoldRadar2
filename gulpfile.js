var gulp = require('gulp');

var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var plumber = require('gulp-plumber')
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var less = require('gulp-less');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var webpack = require('gulp-webpack');
var vue = require('vue-loader');
var jade = require('gulp-jade');
var browserSync = require('browser-sync').create();
var gulpSequence = require('gulp-sequence');
var reload = browserSync.reload;
var md5 = require('gulp-md5-plus');
var del = require('del');
var open = require('gulp-open');



var env = process.env.NODE_ENV || "development";
var config = {
  app: "GoldRadar",
  src: "src",
  test:"test",
  dist: "build",
  env: env,
  tmp: ".tmp",
  liveloadPort: 9999
};

gulp.task('open', function() {
  var options = {
    app: 'google-chrome',
    uri: "http://192.168.26.211:" + config.liveloadPort
  };
  return gulp.src("")
    .pipe(open(options));
});
// clear
gulp.task('clean', function(){
  // gulp.src('./build/**/*')
  //     .pipe(clean({force: true}));
  var dir = [config.dist];
  var options = {dot: true};
  return del(dir, options);
});
// copy libs
gulp.task('copylibs', function () {
  gulp.src([
      'lib/**/*',
      'fonts/**/*',
      'img/**',
      'styles/**'
    ], {
      cwd: config.src,
      dot: true,
      base: config.src
    })
    .pipe(gulp.dest('build/'));
});

gulp.task('browserSync', function() {
  var options = {
    port: config.liveloadPort,
    files:['src/**/*.js','src/**/*.jade','src/**/*.less','src/vue/**/*.vue'],
    server: {
      baseDir: [config.dist]
    }

  }
  browserSync.init(options);
});

gulp.task('jade', function() {
  var src = config.src + "/**/*.jade";
  var dest = config.src;
  return gulp.src(src)
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(dest));
});
//
gulp.task('vue', function() {
  gulp.src('src/app.js')
      // .pipe(babel({
      //   presets: ['es2015']
      // })) 
      .pipe(webpack({
        output: {
          filename: 'main.js'
        },
        module: {
          loaders: [
            { test: /\.vue$/,  loader: 'vue'},
            { test: /\.jade$/, loader: 'jade'},
            { test: /\.js/, loader: 'babel'}
          ]
        },
        babel: {
          presets: ['es2015','stage-0']
          // plugins: ['transform-runtime']
        }
      }))
      .pipe(gulp.dest('build/vue'))
      .pipe(reload({stream: true}));
});

// gulp.task('md5:js', function (done) {
//     gulp.src(config.dist+'/vue/*.js')
//         .pipe(md5(10, config.dist+'/*.html'))
//         .pipe(gulp.dest(config.dist+'/vue'))
//         .on('end', done);
// });

// 压缩html
gulp.task('minhtml', function () {
  gulp.src('./src/*.html')
      .pipe(minifyHTML({comments:false,spare:false,quotes:true}))
      .pipe(gulp.dest('build/'));
});

// less 解析
gulp.task('less', function () {
  gulp.src(['./src/styles/*.less'])
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('build/styles'))
      .pipe(reload({stream: true}));
});

gulp.task('css',function(){
  gulp.src(['./src/styles/*.css'])
      .pipe(gulp.dest('build/styles'))
      .pipe(reload({stream: true}));
});


gulp.task('lib',function(){
  gulp.src(['./src/lib/*.js'])
      .pipe(gulp.dest('build/lib'))
      .pipe(reload({stream: true}));
});
// es6 解析
// gulp.task('babel', function () {
//   gulp.src('./vue/**/*.js')
//       .pipe(sourcemaps.init())
//       .pipe(babel({
//         presets: ['es2015']
//       }))
//       .pipe(gulp.dest('./vue'))
//       .pipe(reload({stream: true}));
// });

// less解析
gulp.task('lessAndMini', function () {
  gulp.src('./src/styles/*.less')
      .pipe(less())
      .pipe(minifyCss())
      .pipe(gulp.dest('build/styles'));
});



// es6 解析
gulp.task('babelAndMini', function () {
  gulp.src('./src/scripts/*.js')
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(uglify())
      .pipe(gulp.dest('build/scripts'));
});
// 启动服务器
gulp.task('connect', function () {
  connect.server({
    root: './build',
    port: 3000,
    livereload: true
  });
});

// gulp.task('vue:watch',['vue'],reload)
// gulp.task('babel:watch',['babel'],reload)
// gulp.task('less:watch',['less'],reload)
// 监听文件变化
gulp.task('watch', function () {
  // gulp.watch(['./src/*.jade'], gulpSequence('jade'));
  // gulp.watch(['./src/vue/**/*.js'], ['babel']);
  gulp.watch(['./src/lib/*.js'], ['lib']);
  gulp.watch(['./src/styles/*.css'], ['css']);
  gulp.watch(['./src/styles/*.less'], ['less']);
  gulp.watch(['./src/vue/**/*.vue','./src/app.js','./src/vue/**/*.js'], ['vue']);
})

gulp.task('default', gulpSequence('clean', 'copylibs', 'vue', 'minhtml', 'lessAndMini', 'babelAndMini'));

gulp.task('dev', gulpSequence('clean', 'copylibs', 'vue','jade', 'minhtml', 'less', 'browserSync', 'watch','open'));
