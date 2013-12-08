<?php
require_once("get.php");
require_once("add.php");
require_once("sec.php");
sec_session_start();

/*
* It's here all the ajax calls goes
*/ 
if(isset($_GET['function'])) {
	
	if($_GET['function'] == 'logout') {
		logout();
    } elseif($_GET['function'] == 'add') {
       
	  $name =    htmlspecialchars($_GET["name"]);
		$message = htmlspecialchars($_GET["message"]);
		$pid =     htmlspecialchars($_GET["pid"]);
		
		addToDB($name, $message, $pid);
		echo "Det gick fint! Ladda inte om sidan du borde se ditt meddelande om ett par sekunder!";
    }
    elseif($_GET['function'] == 'producers') {
    	$pid = $_GET["pid"];
   		echo(json_encode(getProducer($pid)));
    }
    elseif($_GET['function'] == 'getIdsOfMessages') {
       	$pid = $_GET["pid"];
   	   	echo(json_encode(getMessageIdForProducer($pid)));
    }  
    elseif($_GET['function'] == 'getMessage') {
       	$serial = $_GET["serial"];
   	   	echo(json_encode(getMessage($serial)));
    }  
}
