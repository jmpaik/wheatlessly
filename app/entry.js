'use strict';

require('./scss/main.scss');

const path = require('path');
const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const uiRouter = require('angular-ui-router');
// const uiBootstrap = require('angular-ui-bootstrap');
const ngFileUpload = require('ng-file-upload');
const ngAnimate = require('angular-animate');

// const app = angular.module('wheatlessly', [uiRouter, ngFileUpload, ngAnimate, uiBootstrap]);
const app = angular.module('wheatlessly', [uiRouter, ngFileUpload, ngAnimate]);

let context = require.context('./config/', true, /\.js$/);
context.keys().forEach( path => {
  wheatlessly.config(context(path));
});

context = require.context('./view/', true, /\.js$/);
context.keys().forEach( key => {
  let name = pascalcase(path.basename(key, '.js'));
  app.controller(name, context(key));
});

context = require.context('./service/', true, /\.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  app.service(name, context(key));
});

context = require.context('./service/', true, /\.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  wheatlessly.service(name, module);
});

// context = require.context('./directive/', true, /\.js$/);
// context.keys().forEach( key => {
//   let name = camelcase(path.basename(key, '.js'));
//   app.directive(name, context(key));
// });

// context = require.context('./filter/', true, /\.js$/);
// context.keys().forEach( key => {
//   let name = camelcase(path.basename(key, '.js'));
//   app.filter(name, context(key));
// });
