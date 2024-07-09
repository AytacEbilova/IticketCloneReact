'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createElement = exports.PDFRenderer = undefined;

var _ReactFiberReconciler = require('react-dom/lib/ReactFiberReconciler');

var _ReactFiberReconciler2 = _interopRequireDefault(_ReactFiberReconciler);

var _emptyObject = require('fbjs/lib/emptyObject');

var _emptyObject2 = _interopRequireDefault(_emptyObject);

var _elements = require('./elements');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PDFRenderer = (0, _ReactFiberReconciler2.default)({
  getRootHostContext: function getRootHostContext() {
    return _emptyObject2.default;
  },
  getChildHostContext: function getChildHostContext() {
    return _emptyObject2.default;
  },
  prepareForCommit: function prepareForCommit() {
    // noop
  },
  resetAfterCommit: function resetAfterCommit() {
    // noop
  },
  createInstance: function createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    return (0, _elements.createElement)(type, props, rootContainerInstance);
  },
  appendInitialChild: function appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.document = child;
    }
  },
  finalizeInitialChildren: function finalizeInitialChildren(testElement, type, props, rootContainerInstance) {
    return false;
  },
  prepareUpdate: function prepareUpdate(testElement, type, oldProps, newProps, hostContext) {
    return true;
  },
  commitUpdate: function commitUpdate(instance, type, oldProps, newProps, rootContainerInstance, internalInstanceHandle) {
    // noop
  },
  commitMount: function commitMount(instance, type, newProps, rootContainerInstance, internalInstanceHandle) {
    // noop
  },
  shouldSetTextContent: function shouldSetTextContent(props) {
    return false;
  },
  resetTextContent: function resetTextContent(testElement) {
    // noop
  },
  createTextInstance: function createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
    return text;
  },
  commitTextUpdate: function commitTextUpdate(textInstance, oldText, newText) {
    textInstance.chidren = newText;
  },
  appendChild: function appendChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
    } else {
      parentInstance.document = child;
    }
  },
  insertBefore: function insertBefore(parentInstance, child, beforeChild) {
    // noob
  },
  removeChild: function removeChild(parentInstance, child) {
    parentInstance.removeChild(child);
  },
  scheduleAnimationCallback: function scheduleAnimationCallback(fn) {
    setTimeout(fn);
  },
  scheduleDeferredCallback: function scheduleDeferredCallback(fn) {
    setTimeout(fn, 0, { timeRemaining: Infinity });
  },


  useSyncScheduling: true,

  getPublicInstance: function getPublicInstance(inst) {
    return inst;
  }
});

exports.PDFRenderer = PDFRenderer;
exports.createElement = _elements.createElement;