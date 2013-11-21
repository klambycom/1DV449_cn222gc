<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once("model/Producer.php");
require_once("model/Scraper.php");
require_once("model/LocalProducersScraper.php");
require_once("model/ProducerDAL.php");

require_once("vendor/Slim/Slim.php");
\Slim\Slim::registerAutoloader();

require_once("controller/Application.php");
