//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-bootstrap/ui-bootstrap.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/lodash/lodash.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'app.js',
      'constants/*.js',
      'components/search/*.module.js',
      'components/**/*.module.js',
      'main/*.module.js',
      'main/**/*.js',
      'services/*.module.js',
      'services/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: [
      'Chrome'
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
