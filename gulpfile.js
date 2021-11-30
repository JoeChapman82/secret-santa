
const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const uglify = require('gulp-uglify-es').default;
const pump = require('pump');

const gulpConfig = {
    paths: {
        scss: `${__dirname}/dev/scss/**/*.scss`,
        scssDest: `${__dirname}/app/assets/css`,
        js: `${__dirname}/dev/scripts/**/*.js`,
        jsDest: `${__dirname}/app/assets/scripts`,
        nunjucks: `${__dirname}/app/views/**/*.njk`,
        key: `${__dirname}/dev/certs/server.key`,
        cert: `${__dirname}/dev/certs/server.crt`
    }
};

function compileSass() {
    try {
        return gulp.src(gulpConfig.paths.scss)
            .pipe(sass({
                outputStyle: 'compressed'
            })
                .on('error', sass.logError))
            .pipe(gulp.dest(gulpConfig.paths.scssDest))
            .pipe(browserSync.reload({
                stream: true
            }));
    }
    catch(error) {
        console.log(error);
    }
}

function minifyJs() {
    return gulp.src(gulpConfig.paths.js)
        .pipe(uglify())
        .pipe(gulp.dest(gulpConfig.paths.jsDest));
}


// function minifyJs(cb) {
//     pump([
//         gulp.src(gulpConfig.paths.js),
//         uglify(),
//         gulp.dest(gulpConfig.paths.jsDest)
//     ], cb)
//         .pipe(browserSync.reload({
//             stream: true
//         }));
// }

function nunjucks() {
    browserSync.reload();
}

function initBrowserSync() {
    browserSync.init({
        proxy: 'https://localhost:4000',
        port: 4001,
        reloadDelay: 1000,
        ghostMode: {
            clicks: false,
            forms: false,
            scroll: false
        },
        https: {
            key: gulpConfig.paths.key,
            cert: gulpConfig.paths.cert
        },
        open: false
    });
}

function serverTask() {
    nodemon({
        script: 'index.js',
        ext: 'js'
    }).on('quit', function() {
        process.exit(0);
    });
}

// watch all scss and js files, run required tasks, refresh browser
function watch() {
    gulp.watch(gulpConfig.paths.scss, {interval: 1000, mode: 'poll'}, compileSass);
    gulp.watch(gulpConfig.paths.js, {interval: 1000, mode: 'poll'}, minifyJs);
    gulp.watch(gulpConfig.paths.nunjucks, {interval: 1000, mode: 'poll'}, nunjucks);
}

gulp.task('default', gulp.parallel(watch, compileSass, minifyJs, serverTask, initBrowserSync));

// gulp.task('default', gulp.parallel(watch, compileSass, minifyJs, server, initBrowserSync));
