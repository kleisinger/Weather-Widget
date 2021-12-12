const { src, dest, series, parallel } = require('gulp');

const defaultTask = () => {
  return src('src/*.html').pipe(dest('dist'));
};

const scripts = () => {
  return src('src/*.js').pipe(dest('dist'));
};

const styles = () => {
  return src('src/*.css').pipe(dest('dist'));
};



exports.default = defaultTask;
exports.build = series(defaultTask, scripts, styles);