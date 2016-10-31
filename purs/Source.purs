module Source where

import Data.Array
import Data.Foreign
import Prelude

-- foreign import dasFeature :: Number -> Number -> String -> Number -> Foreign
type Constructor = Foreign

foreign import createSource :: Constructor -> (FetchFunction) -> Foreign
-- foreign import data Source :: *

type Chr = String

-- type FetchType = Chr -> Number -> Number -> Number -> Foreign -> Foreign -> (Foreign) -> Foreign

-- takes a source, a number of arguments, returns a
    -- fetch(chr, min, max, scale, types, pool, callback)
type FetchArgs = { chr :: Chr
                 , min :: Number
                 , max :: Number
                 , scale :: Number
                 , types :: Foreign
                 , pool :: Foreign
                 , callback :: Foreign
                 }

data Feature = Feature { min :: Number
                       , max :: Number
                       , segment :: Chr
                       , score :: Number
                       }

type FetchFunction = FetchArgs -> Array Feature


fetch :: FetchArgs -> Array Feature
fetch { chr, min, max, scale, types, pool, callback } =
  [Feature { min = 0, max = 2, segment = "test", score = 20 }]

-- data Source = Source String Renderer URI TierType

-- type Source' = { name :: String
--                , renderer :: Renderer
--                , uri :: URI
--                , tierType :: TierType
--                }


-- createSource2 :: Source' -> Foreign
-- createSource2 s = createSource (const unit)

-- newFeature :: Number -> Foreign
-- newFeature score = dasFeature 2.0 4.0 "chrTest" score
