var gulp         = require('gulp')
,   less         = require('gulp-less')
,   watch        = require('gulp-watch')
,   uglify       = require('gulp-uglify')
,   rename       = require('gulp-rename')
,   plumber      = require('gulp-plumber')
,   sourcemaps   = require('gulp-sourcemaps')
,   minifyCss    = require('gulp-minify-css')
,   autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['watch']);

gulp.task('watch', function() {
    watch('js/*.js', function() {
        return gulp.src('js/*.js')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(rename(function(path) {
                path.basename += ".min";
                path.extname = ".js"
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/js'));
    });

    watch('less/*.less', function() {
        return gulp.src('less/main.less')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(autoprefixer())
            .pipe(minifyCss({keepSpecialComments: 0}))
            .pipe(rename(function(path) {
                path.basename += ".min";
                path.extname = ".css"
            }))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/css'));
    });
});
