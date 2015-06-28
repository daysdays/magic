var gulp         = require('gulp'),
    sass         = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    minifycss    = require("gulp-minify-css"),
    uglify       = require("gulp-uglify"),
    rename       = require("gulp-rename"),
    webpack      = require("gulp-webpack"),
    hash         = require("gulp-hash"),
    del          = require("del");

gulp.task("dev-magic-css", function() {
    del("dist/magic-*.css");

    return gulp.src("src/core/main.scss")
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename("magic.css"))
        .pipe(gulp.dest("dist/"))
        .pipe(minifycss())
        .pipe(rename("magic.min.css"))
        .pipe(gulp.dest("dist/"))
        .pipe(rename("magic.css"))
        .pipe(hash({hashLength: 5}))
        .pipe(rename({extname: ".min.css"}))
        .pipe(gulp.dest("dist/"))
})

gulp.task("dev-magic-js", function() {
    var LIB_MINJS = __dirname + "/src/lib/minjs/",
        DIR_CORE  = __dirname + "/src/core/";

    del("dist/magic-*.js");

    return gulp.src(DIR_CORE + "main.js")
        .pipe(webpack({
                entry: DIR_CORE + "main.js",
                output: {
                    filename: "magic.js"
                },
                resolve: {
                    alias: {
                        util:  LIB_MINJS + "util.js",
                        query: LIB_MINJS + "selector.js",
                        director: LIB_MINJS + "director.js",
                        domready: LIB_MINJS + "ondomready.js",
                        extend:   LIB_MINJS + "extend.js",
                        promise:  LIB_MINJS + "promise.js",
                        jsonp  :  LIB_MINJS + "jsonp.js",
                    }
                },
                module: {
                    loaders: [
                        { test: /\.html$/, loader: "html" },
                        { test: /\.scss$/, loader: "style!css!sass!autoprefixer" }
                    ]
                }
            }))
        .pipe(gulp.dest("dist/"))
        .pipe(uglify())
        .pipe(rename("magic.min.js"))
        .pipe(gulp.dest("dist/"))
        .pipe(rename("magic.js"))
        .pipe(hash({hashLength: 5}))
        .pipe(rename({extname: ".min.js"}))
        .pipe(gulp.dest("dist/"))
})

gulp.task("clean", function() {
    del("dist/magic*");
})