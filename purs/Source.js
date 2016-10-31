"use strict";

// var SourceAdapters = require('../../sourceadapters.js');
var DAS = require('../../das.js');

var R = require('ramda');

exports.registerFactory = function(name, sourceFunc) {
    // return name;
    return SourceAdapters.registerSourceAdapterFactory(name, sourceFunc);
};

//SourceAdapters.registerSourceAdapterFactory;
exports.featureSourceBase = function() {
    return SourceAdapters.FeatureSourceBase;
};

exports.dasFeature = R.curry(function(min, max, segment, score) {
    var feature = new DAS.DASFeature();
    feature.min = min;
    feature.max = max;
    feature.segment = segment;
    feature.score = score;
    return feature;
});

exports.createSource = R.curry(function(constructor, fetch) {
    var newSource = function(source) {
        FeatureSourceBase.call(this);
        constructor(source);
    };
    newSource.prototype = Object.create(FeatureSourceBase.prototype);
    newSource.prototype.constructor = newClass;
    newSource.prototype.fetch = R.uncurryN(7, fetch);
});
