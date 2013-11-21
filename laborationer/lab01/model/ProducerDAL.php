<?php

namespace model;

class ProducerDAL {
  private $pdo;

  public function __construct() {
    $this->pdo = new \PDO("mysql:host=localhost;dbname=database", "1dv408", "mypassword");
  }

  public function setup() {
    $query = $this->pdo->prepare("
      CREATE TABLE IF NOT EXISTS `Producers` (
        `id` int(11) NOT NULL,
        `name` varchar(100) COLLATE utf8_bin NOT NULL,
        `url` varchar(200) COLLATE utf8_bin NOT NULL,
        `location` varchar(50) COLLATE utf8_bin NOT NULL,
        `timestamp` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        `counter` int(11) NOT NULL DEFAULT 1,
        PRIMARY KEY (`id`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
      DELIMITER $$
      CREATE PROCEDURE addProducer(
        IN in_id INT,
        IN in_name VARCHAR(100),
        IN in_url VARCHAR(200),
        IN in_location VARCHAR(50)
      )
      BEGIN
        SET @recCount := (SELECT count(*) FROM `Producers` WHERE `id` = in_id);
        IF @recCount > 0 THEN
          UPDATE `Producers`
          SET `counter` = `counter` + 1,
              `name` = in_name,
              `url` = in_url,
              `location` = in_location
          WHERE `id` = in_id;
        ELSE 
          INSERT INTO  `Producers` (
            `id`,
            `name`,
            `url`,
            `location`
          ) VALUES (in_id,  in_name,  in_url,  in_location);
        END IF; 
      END $$
      DELIMITER ;
    ");
    $query->execute();
  }

  public function add(Producer $producer) {
    $stmt = $this->pdo->prepare("CALL addProducer(:id, :name, :url, :location)");
    $stmt->bindParam("id", $producer->getId());
    $stmt->bindParam("name", $producer->getName());
    $stmt->bindParam("url", $producer->getUrl());
    $stmt->bindParam("location", $producer->getLocation());
    $stmt->execute();
  }

  public function all() {
    $stmt = $this->pdo->prepare("SELECT
                                   `id`,
                                   `name`,
                                   `url`,
                                   `location`,
                                   `timestamp`,
                                   `counter`
                                 FROM `Producers`");
    $stmts->execute();
    $result = $stmts->fetchAll(\PDO::FETCH_FUNC, function ($id, $name, $url, $loc, $time, $c) {
      if ($name == "Not Found")
        return new ProducerNotFound($id);

      return new Producer($id, $name, $url, $loc, $time, $c);
    }
  }
}
