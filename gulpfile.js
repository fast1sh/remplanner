const gulp = require('gulp')

const serve = require('./gulp/tasks/serve')
const styles = require('./gulp/tasks/styles')
const fonts = require('./gulp/tasks/fonts')
const imagemin = require('./gulp/tasks/imagemin')
const clean = require('./gulp/tasks/clean')
const html = require('./gulp/tasks/html')
const libs = require('./gulp/tasks/libs')
const script = require('./gulp/tasks/script')

function setMode(isProduction = false) {
  return cb => {
    process.env.NODE_ENV = isProduction ? 'production' : 'development'
    cb()
  }
}

const dev = gulp.parallel(html, styles, fonts, libs, script, imagemin)

const build = gulp.series(clean, dev)

module.exports.start = gulp.series(setMode(), build, serve)
module.exports.build = gulp.series(setMode(true), build)