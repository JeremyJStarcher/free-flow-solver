var gulp = require('gulp');
var path = require('path');
var args = require('yargs').argv;
var gulpConfig = require('./gulp.config')();

var notify = require("gulp-notify");
var $ = require('gulp-load-plugins')({
    lazy: true
});

function tattle(msg) {
    var nn = require('node-notifier');

    nn.notify({
        title: 'Error from BtC Builder',
        message: msg,
        //icon: path.join(__dirname, 'coulson.jpg'), // absolute path (not balloons)
        sound: true, // Only Notification Center or Windows Toasters
        wait: true // wait with callback until user action is taken on notification
    }, function(err, response) {
        // response is response from notification
    });
}

// Informational
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

gulp.task('vet', ['jshint', 'jscs'], function() {
});

gulp.task('jscs', function() {
    return gulp.src(gulpConfig.src)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
		.pipe($.jscs.reporter());
});

gulp.task('jshint', function() {
    return gulp.src(gulpConfig.src)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: false
        }))
        .pipe($.jshint.reporter('fail'));
});

// File Converstion Tasks

function runBabble() {
    log('Converting files to ES5');

    var config = {
        src: gulpConfig.src,
        dest: gulpConfig.dest,
        // Must be absolute or relative to source map
        sourceRoot: path.join(__dirname, gulpConfig.dest)
    };

    return gulp.src(config.src)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['es2015'],
        }))
        .on('error', (err) => {
            tattle('Build error under Babel');
            log(err);
        })
        .pipe($.sourcemaps.write('.', {
            sourceRoot: config.src
        }))
        .pipe(gulp.dest(config.dest));
}

gulp.task('babel', /*['clean-build'], */ function() {
    return runBabble();
});

gulp.task('sass', function () {
	var sass = $.sass
	var src = gulpConfig.srcDir + '/sass/**/*.scss';
	var exclude = '!' + gulpConfig.srcDir + '/sass/**/_*'
	var dest = gulpConfig.dest + '/css';
	console.log(src);
	console.log(exclude);
	console.log(dest);
	
  return gulp.src([src, exclude])
    .pipe(sass().on('error', sass.logError))
//    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sass({outputStyle: 'nested'}))
    .pipe(gulp.dest(dest));
});

// Full Build

gulp.task('build', ['babel'], function() {});

// Reformatting Tasks

gulp.task('format-js', function() {
    return gulp.src(gulpConfig.src)
        .pipe($.jsbeautifier({
            config: '.jsbeautifyrc',
            mode: 'VERIFY_AND_WRITE'
        }))
        .pipe(gulp.dest(gulpConfig.srcDir))
});

gulp.task('git-pre-js', function() {
    gulp.src('./src/foo.js', './src/bar.json')
        .pipe(prettify({
            config: '.jsbeautifyrc',
            mode: 'VERIFY_ONLY'
        }))
});

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
