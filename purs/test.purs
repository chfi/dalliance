module Test where

import Control.Monad.Eff
import Control.Monad.Eff.Console -- (log)
import Prelude

main :: forall t. Eff ( console :: CONSOLE | t ) Unit
main = hello "hello"

-- hello :: St
hello :: forall t. String -> Eff ( console :: CONSOLE | t ) Unit
hello s = log ("purescript says: " <> s)
