<?php

function getComments($pid, $serial) {
  $db = new PDO("sqlite:../db.db");
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $stm = $db->prepare("SELECT * FROM messages WHERE pid = ? AND serial > ?");
  $stm->execute(array($pid, $serial));
  return $stm->fetchAll();
}

$result = getComments($_GET['pid'], $_GET['serial']);

session_write_close();

$counter = 0;

while($counter <= 15) {
  sleep(2);

  if (!empty($result)) {
    break;
  }

  $counter += 1;
}

if (!empty($result)) {
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($result);
}
