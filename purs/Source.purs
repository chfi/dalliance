module Source where

import Data.Function.Uncurried (Fn4, runFn4)
import Data.Foreign

-- exports.registerFactory = SourceAdapters.registerSourceAdapterFactory;
-- exports.featureSourceBase = SourceAdapters.FeatureSourceBase;

-- exports.dasFeature = DAS.DASFeature;

-- foreign import registerFactory :: Foreign
-- foreign import registerFactory :: forall a. String -> (a -> Foreign)
-- foreign import featureSourceBase :: Foreign

foreign import dasFeature :: Fn4 Number Number String Number Foreign

dasFeature' = runFn4 dasFeature


newFeature :: Number -> Foreign
newFeature score = dasFeature' 2.0 4.0 "chrTest" score
