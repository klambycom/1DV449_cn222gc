<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

class Producer {
  public function __construct($id, $name, $url, $location) {
  }
}

class Scraper {
  private $cookieFile;

  public function __construct($cookieFile) {
    $this->cookieFile = $cookieFile;
  }

  public function get($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_COOKIEFILE, $this->cookieFile);

    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

    $data = curl_exec($ch);
    curl_close($ch);

    return $data;
  }

  public function post($url, $post_data) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);

    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

    curl_setopt($ch, CURLOPT_COOKIEJAR, $this->cookieFile);

    $data = curl_exec($ch);
    curl_close($ch);

    return $data;
  }
}

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

      $dom = new DomDocument();

      if ($dom->loadHTML($html)) {
        $xpath = new DOMXPath($dom);

        // Name
        $name = $xpath->query('//h1')->item(0);

        // Id
        $ids = array();
        preg_match("/\d+/", $url, $ids);
        $id = $ids[0];

        $result[] = $name->nodeValue . " --> " . $id;
      }
    }

    return $result;
  }

  private function getProducersLinks() {
    $result = $this->post("{$this->baseUrl}/check.php", array(
      "username" => "admin",
      "password" => "admin"
    ));

    $dom = new DomDocument();
    if ($dom->loadHTML($result)) {
      $xpath = new DOMXPath($dom);
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

$lps = new LocalProducersScraper();
var_dump($lps->getProducers());

/*
$s = new Scraper(dirname(__FILE__) . "/kaka.txt");

$resultat = $s->post("http://vhost3.lnu.se:20080/~1dv449/scrape/check.php", array(
  "username" => "admin",
  "password" => "admin"
));

$dom = new DomDocument();
if ($dom->loadHTML($resultat)) {
  $xpath = new DOMXPath($dom);
  $items = $xpath->query('//a[@target = "_blank"]');

  foreach ($items as $a) {
    echo $a->nodeValue . " --> " . $a->getAttribute("href") . "<br>";
    var_dump($s->get("http://vhost3.lnu.se:20080/~1dv449/scrape/secure/" . $a->getAttribute("href")));
  }
} else {
  die("Fel");
}
 */
