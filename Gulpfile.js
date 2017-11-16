const gulp          = require('gulp'),
      sass          = require('gulp-sass'),
      concat        = require('gulp-concat');

let config = {};

config.scssDir      = './resources/assets/scss/';
config.scriptDir    = './resources/assets/js/';
config.bowerDir     = './resources/assets/components/';
config.outputDir    = './public/assets/';

gulp.task('sass', () => 
    
    gulp.src([config.scssDir + '*.scss'])
        .pipe(sass({ includePaths: [config.scssDir], outputStyle: 'expanded' }))
        .pipe(gulp.dest(config.outputDir + 'css'))
          
);

gulp.task('scripts', () =>
    
    gulp.src([
        config.bowerDir + 'jquery/dist/jquery.min.js',
        config.bowerDir + 'tether/dist/js/tether.min.js',
        config.bowerDir + 'bootstrap/dist/js/bootstrap.min.js',
        config.scriptDir + 'scripts.js'
    ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(config.outputDir + 'js'))
        
);

gulp.task('watch', ['sass', 'scripts'], () => {
  
    gulp.watch(config.scssDir + '*.scss', ['sass']).on('change', (e) => {
        
        console.log(`File ${e.path} was ${e.type}, running sass task...`);
        
    });
    
    gulp.watch(config.scriptDir + '*.js', ['scripts']).on('change', (e) => {
        
        console.log(`File ${e.path} was ${e.type}, running scripts task...`);
        
    });
          
});