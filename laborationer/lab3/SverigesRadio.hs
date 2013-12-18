{-# LANGUAGE OverloadedStrings, DeriveGeneric #-}

module SverigesRadio (traffic, SROption (..)) where

import Data.Aeson
import Control.Applicative
import Control.Monad
import qualified Data.ByteString.Lazy as B
import Network.HTTP.Conduit (simpleHttp)
import GHC.Generics
import qualified Data.HashMap.Strict as H

data SverigesRadio = SverigesRadio { messages :: [Message]
                                   , page     :: Int
                                   , size     :: Int
                                   , total    :: Int
                                   , pages    :: Int
                                   } deriving (Show, Generic)

instance FromJSON SverigesRadio where
  parseJSON (Object v) = SverigesRadio <$> v .: "messages"
                                       <*> ((v .: "pagination") >>= (.: "page"))
                                       <*> ((v .: "pagination") >>= (.: "size"))
                                       <*> ((v .: "pagination") >>= (.: "totalhits"))
                                       <*> ((v .: "pagination") >>= (.: "totalpages"))
  parseJSON _ = mzero

instance ToJSON SverigesRadio

data Message = Message { category      :: Int
                       , createddate   :: String
                       , description   :: String
                       , exactlocation :: String
                       , id            :: Int
                       , latitude      :: Double
                       , longitude     :: Double
                       , priority      :: Int
                       , subcategory   :: String
                       , title         :: String
                       } deriving (Show, Generic)

instance FromJSON Message
instance ToJSON Message

data DescAsc = Desc | Asc

type Page = Int
type Size = Int

data SROption = OptionPage Page Size
              | OptionSort String DescAsc

instance Show SROption where
  show (OptionPage page size) = "&page=" ++ show page ++ "&size=" ++ show size

url :: [SROption] -> String
url xs = "http://api.sr.se/api/v2/traffic/messages?format=json&pagination=true" ++ parameters xs
  where parameters []     = ""
        parameters (x:xs) = show x ++ parameters xs

traffic :: [SROption] -> IO (Either String SverigesRadio)
traffic options = eitherDecode <$> (simpleHttp $ url options)
