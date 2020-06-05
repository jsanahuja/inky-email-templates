const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const inlineCss = require('gulp-inline-css');
const gap = require('gulp-append-prepend');
const htmlmin = require('gulp-html-minifier-terser');
const inky = require('inky');

const before_template = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <style>` + fs.readFileSync(path.resolve(__dirname + '/node_modules/foundation-emails/dist/foundation-emails.min.css'), 'utf8') + `</style>
</head>
<body>`;
const after_template = `</body>
</html>`;

gulp.task('copy-examples', function () {
    return gulp.src('./node_modules/foundation-emails/templates/*.html')
        .pipe(gulp.dest('./foundation-examples/src'))
});

gulp.task('build-examples', gulp.series('copy-examples', function () {
    return gulp.src('./foundation-examples/src/*.html')
        .pipe(gap.prependText(before_template))
        .pipe(gap.appendText(after_template))
        .pipe(inky())
        .pipe(inlineCss())
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest('./foundation-examples/build'));
}));

gulp.task('dev', function () {
    return gulp.src('src/*.html')
        .pipe(gap.prependText(before_template))
        .pipe(gap.appendText(after_template))
        .pipe(inky())
        .pipe(gulp.dest('build/'));
});

// gulp.task('build', function () {
//     return gulp.src('src/*.html')
//         .pipe(gap.prependText(before_template))
//         .pipe(gap.appendText(after_template))
//         .pipe(inky())
//         .pipe(inlineCss())
//         .pipe(htmlmin({
//             collapseWhitespace: true,
//             minifyCSS: true
//         }))
//         .pipe(gulp.dest('build/'));
// });
