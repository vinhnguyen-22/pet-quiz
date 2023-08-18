'use strict';
import { KTUtil } from './util.js';

var KTPasswordMeter = function (element) {
  var the = this;
  if (!element) {
    return;
  }
  var _construct = function () {
    if (KTUtil.data(element).has('password-meter') === true) {
      the = KTUtil.data(element).get('password-meter');
    } else {
      _init();
    }
  };

  var _init = function () {
    the.element = element;
    the.inputElement = the.element.querySelector('input[type]');
    the.visibilityElement = the.element.querySelector('[data-kt-password-meter-control="visibility"]');
    _handlers();
  };

  var _handlers = function () {
    if (the.visibilityElement) {
      the.visibilityElement.addEventListener('click', function () {
        _visibility();
      });
    }
  };
  var _visibility = function () {
    var visibleIcon = the.visibilityElement.querySelector('i:not(.d-none), .svg-icon:not(.d-none)');
    var hiddenIcon = the.visibilityElement.querySelector('i.d-none, .svg-icon.d-none');

    if (the.inputElement.getAttribute('type').toLowerCase() === 'password') {
      the.inputElement.setAttribute('type', 'text');
    } else {
      the.inputElement.setAttribute('type', 'password');
    }
    visibleIcon.classList.add('d-none');
    hiddenIcon.classList.remove('d-none');
    the.inputElement.focus();
  };

  var _destroy = function () {
    KTUtil.data(the.element).remove('password-meter');
  };

  _construct();

  the.destroy = function () {
    return _destroy();
  };
};

KTPasswordMeter.createInstances = function (selector = '[data-kt-password-meter]') {
  var elements = document.body.querySelectorAll(selector);
  if (elements && elements.length > 0) {
    for (var i = 0, len = elements.length; i < len; i++) {
      new KTPasswordMeter(elements[i]);
    }
  }
};

KTPasswordMeter.init = function () {
  KTPasswordMeter.createInstances();
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = KTPasswordMeter;
}

export default KTPasswordMeter;
