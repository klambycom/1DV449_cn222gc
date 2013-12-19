{-# LANGUAGE OverloadedStrings, ScopedTypeVariables, FlexibleInstances, UndecidableInstances #-}

import SverigesRadio
import Data.Aeson (encode, ToJSON)

import Control.Applicative ((<$>), optional)
import Data.Maybe (fromMaybe)
import Data.Text (Text)
import Happstack.Lite
import Text.Blaze.Html5 (Html, (!), a, form, input, p, toHtml, label, dataAttribute)
import Text.Blaze.Html5.Attributes (action, enctype, href, name, size, type_, value, src, rel)
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
routes = msum [ dir "json"  $ json
              , dir "files" $ fileServing
              , nullDir >> homePage
              , pageNotFound
              ]

fileServing :: ServerPart Response
fileServing = serveDirectory DisableBrowsing [] "./public"

template :: Text -> Html -> Response
template title body = toResponse $
  H.docTypeHtml $ do
    H.head $ do
      H.title (toHtml title)
      H.link ! rel "stylesheet" ! type_ "text/css" ! href "files/page.css"
    H.body $ do
      body

pageNotFound :: ServerPart Response
pageNotFound = notFound $ template "Page Not Found" $ do
  H.h1 "Page Not Found"
  H.p "It's not here."
  H.p $ a ! href "/" $ "Front page"

homePage :: ServerPart Response
homePage = ok $ template "Home page" $ do
  H.div ! A.id "categories" $ do
    H.ul $ do
      H.li $ a ! href "#" ! dataAttribute "category" "0" $ "Vägtrafik"
      H.li $ a ! href "#" ! dataAttribute "category" "1" $ "Kollektivtrafik"
      H.li $ a ! href "#" ! dataAttribute "category" "2" $ "Planerad störning"
      H.li $ a ! href "#" ! dataAttribute "category" "3" $ "Övrigt"
  H.div ! A.id "map-canvas" $ ""
  H.script ! src "files/javascript.js" $ ""
  --H.h1 "Home page"
  --H.p "More is comming"

json :: ServerPart Response
json = do
  t <- liftIO $ traffic [OptionPage 1 100]
  case t of
    Just sr -> ok $ toResponse $ sr
    Nothing -> internalServerError $ toResponse $ ("No data found" :: String)

main :: IO ()
main = serve config routes
