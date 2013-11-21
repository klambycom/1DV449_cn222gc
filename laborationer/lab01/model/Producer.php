<?php

namespace model;

class Producer {
  private $id;
  private $name;
  private $url;
  private $location;
  private $timestamp;
  private $counter;

  public function __construct($id, $name, $url, $location, $timestamp = "", $counter = "") {
    $this->id = $id;
    $this->name = $name;
    $this->url = $url;
    $this->location = $location;
    $this->timestamp = $timestamp;
    $this->counter = $counter;
  }

  public function getId() {
    return $this->id;
  }

  public function getName() {
    return $this->name;
  }

  public function getUrl() {
    return $this->url;
  }

  public function getLocation() {
    return $this->location;
  }

  public function getTimestamp() {
    return $this->timestamp;
  }

  public function getCounter() {
    return $this->counter;
  }
}

class ProducerNotFound extends Producer {
  public function __construct($id) {
    parent::__construct($id, "", "", "");
  }
}
