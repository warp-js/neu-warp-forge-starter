const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('neutralino:run:browser' , shell.task('cd packages/warp && neu run -- --mode=browser'));
gulp.task('neutralino:run:window' , shell.task('cd packages/warp && neu run -- --mode=window --neu-dev-auto-reload=false'));

gulp.task('neutralino:build' , shell.task('cd packages/warp && neu build'));

gulp.task('neutralino:package:macos' , shell.task('cd packages/warp && ./build-mac.sh'));
gulp.task('neutralino:package:linux' , shell.task('cd packages/warp && ./build-linux.sh'));
gulp.task('neutralino:package:win' , shell.task('cd packages/warp && ./build-win.sh'));

gulp.task('neutralino:package' , gulp.parallel('neutralino:package:macos' , 'neutralino:package:linux' , 'neutralino:package:win'));

gulp.task('package' , gulp.parallel('neutralino:build' , 'neutralino:package'))

gulp.task('dev' , gulp.series( 'neutralino:run:browser' ));
gulp.task('start' , gulp.series( 'neutralino:run:window' ));

gulp.task('default' , gulp.series('start') );