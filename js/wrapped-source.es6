/* jshint esversion: 6 */

// feature source that wraps a purescript feature source,
// making it compatible with BD

import { FeatureSourceBase
       } from "./sourceadapters.js";


import * as R from "ramda";

export { wrapSource };


function wrapSource(externalFetch) {
    const wrappedSource = new FeatureSourceBase();

    wrappedSource.fetch = R.uncurryN(7, externalFetch);

    const r = wrappedSource.fetch("3", 0, 10000000, 0.1, null, null, (x) => {console.log("got an " + x);})();


    return wrappedSource;
}
