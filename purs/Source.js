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

exports.dasFeature = R.uncurryN(4, function(min, max, segment, score) {
    var feature = new DAS.DASFeature();
    feature.min = min;
    feature.max = max;
    feature.segment = segment;
    feature.score = score;
    return feature;
});
