'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');

gulp.task('sw-precache', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'public';

  swPrecache.write(path.join(rootDir, 'sw.js'), {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,map}'],
    stripPrefix: rootDir,
    navigateFallback: '/',
    runtimeCaching: [{
      urlPattern: /\//,
      handler: 'cacheFirst',
      options: {
        cache: {
          maxAgeSeconds: 10,
          name: 'articles-cache'
        }
      }
    }, {
      urlPattern: /\/article/,
      handler: 'cacheFirst',
      options: {
        cache: {
          maxAgeSeconds: 10,
          name: 'articles-cache'
        }
      }
    }],
    verbose: true

  }, callback);
});
