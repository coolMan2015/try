var gulp = require("gulp");

var browserify = require("browserify");
var source = require("vinyl-source-stream");
// var reactify = require("reactify");

//*****  sass  ***********************************
var sass = require("gulp-sass");

var rubySass = require("gulp-ruby-sass");
var sourcemaps = require('gulp-sourcemaps');
//************************************************




// 项目js路径配置文件
var BuouEntry = require("./BuouMallRaise.config.js");
// console.log(BuouEntry);
// 输出目录
var ENV = require("./conf/dev.env.js"),
	dist = ENV.dist;


// ************************************************************

// 设置当前生成文件
var currentJs = BuouEntry.customDetails;
// ************************************************************



////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 编译js
//
//
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//gulp主动设置的命令
gulp.task("browserify",function(){
	//通过browserify管理依赖
	browserify({
		//入口点,app.jsx
		entries : currentJs[0]
		//利用reactify工具将jsx转换为js
		// transform : [reactify]
	})
	//转换为gulp能识别的流
	.bundle()
	//合并输出为app.js
	.pipe(source(currentJs[1]))
	//输出到当前文件夹中
	.pipe(gulp.dest(dist + '/static/js/app'));
 });


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 编译sass
//
//
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
var sassSrc = './Buoumall_v2.0/sass/pages/profileEdit.scss',
	sassDst = dist+'/static/web/css';
gulp.task('sass', function(){
	return gulp.src(sassSrc)
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write())
	// .pipe(sass({sourceComments: 'map'}).on('error', sass.logError))
	.pipe(gulp.dest(sassDst));
});

gulp.task('sass-reset', function(){
	return gulp.src('.//Buoumall_v2.0/sass/base/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(sassDst));
});

gulp.task('rubySass', () =>
    rubySass(sassSrc, { 
            precision: 6,
            stopOnError: true,
            cacheLocation: './tmp',
            style:'expanded',
            loadPath: [ 'library', '../../shared-components' ]
        })
        .on('error', rubySass.logError)
        .pipe(gulp.dest(sassDst))
);

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 编译jade
//
//
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
var jade = require("gulp-jade"),
	htmlSrc = './BuouMall_v2.0/views/resources/UserCenter/profileEdit.jade',
	htmlDst = dist+'/front/template/UserCenter';
gulp.task('jade', function(){
	return gulp.src(htmlSrc)
	.pipe(jade({
		pretty: true,

	}))
	.on('error', function(err) {
	  console.log('Jade Error!', err.message);
	  this.end();
	})
	.pipe(gulp.dest(htmlDst));
});

// 监测js修改
gulp.task("watch", function(){
	// 监测文件修改
	gulp.watch('./BuouMall_v2.0/js/**/*.js',['browserify']);

	// 监测sass
	// gulp.watch(sassSrc, ['sass']);

	// 监测sass --使用rubySass
	gulp.watch(sassSrc, ['rubySass']);

	// 监测jade
	// run jade
	gulp.watch(htmlSrc, ['jade']);
});


 //gulp默认命令
 gulp.task("default",["watch"]);
 // gulp.task("default",["watch"]);
 // gulp.task("default",["sass-reset", "sass", "watch"]);




