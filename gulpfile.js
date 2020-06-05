const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const inlineCss = require('gulp-inline-css');
const gap = require('gulp-append-prepend');
const htmlmin = require('gulp-html-minifier-terser');
const livereload = require('gulp-livereload');
const rename = require('gulp-rename');
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

gulp.task('build', function () {
    return gulp.src('src/*.html')
        .pipe(gap.prependText(before_template))
        .pipe(gap.appendText(after_template))
        .pipe(inky())
        .pipe(inlineCss())
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('dev-build', function () {
    console.log("Building...");
    return gulp.src('src/*.html')
        .pipe(gap.prependText(before_template))
        .pipe(gap.appendText(`<script src="../node_modules/livereload-js/dist/livereload.js?host=localhost"></script>`))
        .pipe(gap.appendText(after_template))
        .pipe(inky())
        .pipe(gulp.dest('build/'))
        .pipe(livereload());
});

gulp.task('dev', gulp.series('dev-build', function(){
    livereload.listen({ start: true });
    gulp.watch("src/*.html", gulp.series('dev-build'));
}));

function index(callback){
    const buildPath = path.join(__dirname, 'build');
    const examplesPath = path.join(__dirname, 'foundation-examples/build');

    var template = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <title>inky-email-templates</title>
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1 class="my-5"><a href="https://github.com/jsanahuja/inky-email-templates" target="_blank">inky-email-templates</a></h1>
    `;

    fs.readdir(buildPath, function (err, files) {
        if(files && files.length){
            template += "<h2>Builds</h2><ul>";
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                template += '<li><a href="build/' + file + '" target="_blank">' + file + '</a></li>';
            });
            template += "</ul>";
        }
        fs.readdir(examplesPath, function (err, files) {
            if(files && files.length){
                template += "<h2>Foundation-emails Examples</h2><ul>";
                files.forEach(function (file) {
                    // Do whatever you want to do with the file
                    template += '<li><a href="foundation-examples/build/' + file + '" target="_blank">' + file + '</a></li>';
                });
                template += "</ul>";
            }
            fs.writeFileSync("./index.html", template);
            callback();
        });
    });
};

exports.index = index;