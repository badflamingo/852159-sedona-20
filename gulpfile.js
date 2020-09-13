const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const sync = require("browser-sync").create();
const del = require("del");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");

const clean = () => {
  return del("build");
};

const html = () => {
  return gulp.src("source/*.html",
  {
    base: "source"
  })
  .pipe(gulp.dest("build"));
};

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico"
  ],
  {
    base: "source"
  })
  .pipe(gulp.dest("build"));
}

// Styles0

const styles = () => {
  return gulp.src("source/less/style.less")
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(less())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(csso())
  .pipe(rename("styles.min.css"))
  .pipe(sourcemap.write("."))
  .pipe(gulp.dest("build/css"))
  .pipe(sync.stream());
}


// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}


// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}


const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
};

const webpx = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(webp({quality:90}))
  .pipe(gulp.dest("build/img"))
}

const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
  .pipe(svgstore())
  pipe(rename("sprite.svg"))
  pipe(gulp.dest("source/img"))
}

const build = gulp.series(clean, copy, styles, sprite, html);
const start = gulp.series(build, server, watcher);

exports.server = server;
exports.webp = webpx;
exports.sprite = sprite;
exports.copy = copy;
exports.styles = styles;
exports.clean = clean;
exports.hmtl = html;

exports.build = build;
exports.start = start;
exports.default = start;
