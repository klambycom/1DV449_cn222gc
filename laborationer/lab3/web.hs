{-# LANGUAGE OverloadedStrings, ScopedTypeVariables, FlexibleInstances, UndecidableInstances #-}

import SverigesRadio
import Data.Aeson (encode, ToJSON)

import Control.Applicative ((<$>), optional)
import Data.Maybe (fromMaybe)
import Data.Text (Text)
import Happstack.Lite
import Text.Blaze.Html5 (Html, (!), a, form, input, p, toHtml, label)
import Text.Blaze.Html5.Attributes (action, enctype, href, name, size, type_, value, src)
import qualified Text.Blaze.Html5 as H
import qualified Text.Blaze.Html5.Attributes as A
import Control.Monad.IO.Class (liftIO)
import qualified Data.ByteString.Char8 as B

instance (ToJSON a) => ToMessage a where
  toContentType _ = B.pack "application/json"
  toMessage       = encode

config :: Maybe ServerConfig
config = Just $ ServerConfig { port      = 8000
                             , ramQuota  = 1 * 10^6
                             , diskQuota = 20 * 10^6
                             , tmpDir    = "/tmp/"
                             }

routes :: ServerPart Response
routes = msum [ dir "json" $ json
              , nullDir >> homePage
              , pageNotFound
              ]

template :: Text -> Html -> Response
template title body = toResponse $
  H.docTypeHtml $ do
    H.head $ do
      H.title (toHtml title)
    H.body $ do
      body

pageNotFound :: ServerPart Response
pageNotFound = ok $ template "Page Not Found" $ do
  H.h1 "Page Not Found"
  H.p "It's not here."
  H.p $ a ! href "/" $ "Front page"

homePage :: ServerPart Response
homePage = ok $ template "Home page" $ do
  H.h1 "Home page"
  H.p "More is comming"
  H.script ! src "javascript.js" $ ""

json :: ServerPart Response
--json = undefined
json = do
  t <- liftIO $ traffic [OptionPage 1 10]
  case t of
    Just sr -> ok $ toResponse $ sr
    Nothing -> ok $ toResponse $ ("No data found" :: String)
    --Nothing -> setResponseCode 503 $ toResponse $ ("No data found")

main :: IO ()
main = serve config routes

{-
test :: B.ByteString
test = tempfn $ traffic [OptionPage 2 10]
  where tempfn (IO (Just ps)) = encode ps
        tempfn (IO (Nothing)) = "error"

main :: IO ()
main = print test
-}
{-
main = do
  d <- traffic [OptionPage 2 10]
  case d of
    Nothing -> putStrLn "error"
    Just ps -> print $ encode ps
-}
