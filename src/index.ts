import * as ko from 'knockout';
require('knockout.validation');

import CaptchaComponent from './components/CaptchaComponent';

import captchaBinding from './bindings/captcha';

ko.components.register('captcha-demo', CaptchaComponent);

ko.bindingHandlers.captcha = captchaBinding;
class AppViewModel {  

  constructor() {
  }
}

ko.validation.init({
  errorElementClass: 'is-invalid',
  errorMessageClass: 'invalid-feedback',
  decorateInputElement: true
});

// Bind Knockout to the "app" element in "webpack-template/index.html"
ko.applyBindings(new AppViewModel(), document.getElementById('app'));