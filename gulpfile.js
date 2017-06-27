var gulp        = require('gulp'),
	gUtil       = require('gulp-util'),
    concat      = require('gulp-concat'),
	connect     = require('gulp-connect'),
	minify_html = require('gulp-minify-html'),
	minify_css  = require('gulp-minify-css'),
    minify_json = require('gulp-jsonminify'),
	sass        = require('gulp-sass'),
    gulpif      = require('gulp-if'),
    uglify      = require('gulp-uglify');
var tempSources = require('./templates'),
    jsSource    = require('./scripts'),
	cscSource   = require('./css'),
    jsonSources = require('./json'),
    env,
    output_dir;


env = process.env.NODE_ENV || "development";

// define environment
if (env === "development")
{
    output_dir = "builds/development/";
}
else
{
    output_dir = "builds/production/";
}



// js
gulp.task(
	
	'js',
	
	function ()
	{
		gulp.src(jsSource)
			.pipe(concat('script.js'))
            .pipe(gulpif(env === "production", uglify()))
			.pipe(gulp.dest('./' + output_dir + 'js'))
            .on('error', gUtil.log)
			.pipe(connect.reload());
	}
	
);


// html
gulp.task(

	'html',
	
	function ()
	{
		gulp.src("./builds/development/index.html")
            .pipe(gulpif(env === "production", gulp.dest('./' + output_dir)))
            .on('error', gUtil.log)
			.pipe(connect.reload());
	}

);


// html templates
gulp.task(

	'html_templates',
	
	function ()
	{
		gulp.src(tempSources, {base: './builds/development/'})
            .pipe(gulpif(env === "production", minify_html()))
            .pipe(gulpif(env === "production", gulp.dest('./' + output_dir)))
            .on('error', gUtil.log)
			.pipe(connect.reload());
	}

);


// css
gulp.task(

	'css',
	
	function ()
	{
		gulp.src(cscSource)
			.pipe(concat('master.css'))
			.pipe(sass())
            .pipe(gulpif(env === "production", minify_css()))
			.pipe(gulp.dest('./' + output_dir + 'css'))
            .on('error', gUtil.log)
			.pipe(connect.reload());
	}

);


// json
gulp.task(

	'json',
	
	function ()
	{
		gulp.src(jsonSources, {base: 'builds/development/'})
            .pipe(gulpif(env === "production", minify_json()))
            .pipe(gulpif(env === "production", gulp.dest('./' + output_dir)))
            .on('error', gUtil.log)
			.pipe(connect.reload());
    }

);


// WATCH TASK
// updates files in development as we edit them
gulp.task(

	'watch',
	
	function ()
	{
		gulp.watch(jsSource, ['js']);
		gulp.watch("builds/development/index.html", ['html']);
		gulp.watch(tempSources, ['html_templates']);
		gulp.watch(jsonSources, ['json']);
		gulp.watch(cscSource, ['css']);
	}

);


// Server
gulp.task(

	'connect',
	
	function ()
	{
		connect.server(
			{
				root: output_dir,
				livereload: true
			}
		);
	}

);


// DEFAULT TASK
gulp.task(

	'default',
	
	[
		'html',
        'html_templates',
		'css',
		'js',
        'json',
		'connect',
		'watch'
	]

);