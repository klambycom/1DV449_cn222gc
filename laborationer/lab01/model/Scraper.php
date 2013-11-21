<?php

namespace model;

class Scraper {
  private $cookieFile;

  public function __construct($cookieFile) {
    $this->cookieFile = $cookieFile;
  }

  public function get($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_ENCODING, 'UTF-8');

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

    curl_setopt($ch, CURLOPT_ENCODING, 'UTF-8');

    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);

    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

    curl_setopt($ch, CURLOPT_COOKIEJAR, $this->cookieFile);

    $data = curl_exec($ch);
    curl_close($ch);

    return $data;
  }

  public function img($img, $id) {
    $url = "http://vhost3.lnu.se:20080/~1dv449/scrape/secure/{$img}";

    $pathArray = array();
    preg_match("/\.(\w*)$/", $img, $pathArray);
    $imgPath = "view/images/{$id}.{$pathArray[1]}";

    $ch = curl_init($url);
    $fp = fopen($imgPath, 'wb');
    curl_setopt($ch, CURLOPT_FILE, $fp);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_exec($ch);
    curl_close($ch);
    fclose($fp);
  }
}
