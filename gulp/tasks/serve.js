
const gulp = require('gulp')

const imageMinify = require('./imagemin')
const styles = require('./styles')
const html = require('./html')
const script = require('./script')
const libs = require('./libs')

const server = require('browser-sync').create()

function readyReload(cb) {
  server.reload()
  cb()
}

module.exports = function serve(cb) {
  server.init({
    server: 'build',
    notify: false,
    open: true,
    cors: true
  })

  gulp.watch('src/img/*.{gif,png,jpg,svg,webp}', gulp.series(imageMinify, readyReload))
  gulp.watch('src/styles/**/*.scss', gulp.series(styles, cb => gulp.src('build/css').pipe(server.stream()).on('end', cb)))
  gulp.watch('src/js/**/*.js', gulp.series(script, readyReload))
  gulp.watch('src/libs/**', gulp.series(libs, readyReload))
  gulp.watch('src/*.html', gulp.series(html, readyReload))
  
  return cb()
}