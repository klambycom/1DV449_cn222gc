<?php

namespace controller;

require_once("vendor/Views/Twig.php");

$app = new \Slim\Slim(array(
  'view' => new \Slim\Views\Twig()
));

$app->config(array(
  'templates.path' => 'view'
));

$app->get('/', function () use ($app) {
  $dal = new \model\ProducerDAL();
  $producers = $dal->all();

  $app->render('home.html', array('producers' => $producers));
});

$app->get('/skrapa', function () {
  $dal = new \model\ProducerDAL();
  $lps = new \model\LocalProducersScraper();

  foreach ($lps->getProducers() as $producer) {
    $dal->add($producer);
  }
  
  header("Location: /lab01/");
  die();
});

$app->get('/setup', function () {
  $dal = new \model\ProducerDAL();
  $dal->setup();
});

$app->run();

