<?php

namespace model;

class LocalProducersScraper extends Scraper {
  private $baseUrl;

  public function __construct() {
    $this->baseUrl = "http://vhost3.lnu.se:20080/~1dv449/scrape";
    parent::__construct(dirname(__FILE__) . "/kaka.txt");
  }

  public function getProducers() {
    $result = array();

    foreach ($this->getProducersLinks() as $url) {
      $html = $this->get("{$this->baseUrl}/secure/" . $url);
      $html = preg_replace("/\s\\\/", "", $html);

      $dom = new \DomDocument();

      if ($dom->loadHTML($html)) {
        $xpath = new \DOMXPath($dom);

        // Name
        $name = $xpath->query('//h1')->item(0);
        $name = $name->nodeValue;

        // Id
        $ids = array();
        preg_match("/\d+/", $url, $ids);
        $id = $ids[0];

        if ($name == 'Not Found') {
          $result[] = new ProducerNotFound($id);
          continue;
        }

        // Url
        $url = $xpath->query('//div[@class="container"]/div[@class="hero-unit"]/p/a')->item(0);
        if ($url == null || $url->getAttribute("href") == "#") {
          $url = "";
        } else {
          $url = $url->getAttribute("href");
        }

        // Location
        $location = $xpath->query('//span[@class="ort"]')->item(0);
        $location = preg_replace("/^Ort: /", "", $location->nodeValue);

        $result[] = new Producer($id, $name, $url, $location);
      }
    }

    return $result;
  }

  private function getProducersLinks() {
    $result = $this->post("{$this->baseUrl}/check.php", array(
      "username" => "admin",
      "password" => "admin"
    ));

    $dom = new \DomDocument();
    if ($dom->loadHTML($result)) {
      $xpath = new \DOMXPath($dom);
      $links = $xpath->query('//a[@target = "_blank"]');

      $urls = array();
      foreach ($links as $a) {
        $urls[] = $a->getAttribute("href");
      }
      return $urls;
    }

    throw new Exception();
  }
}
