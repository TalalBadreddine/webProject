<?php

require '../../../../extension/makeConnection.php';
require '../../../../extension/extensions.php';

session_start();

// echo "gege";

// var_dump($_FILES);

$fileId = uniqid();


$x=0;
foreach( $_FILES as $file ){

    saveDocAs('student', $file['tmp_name'], $_SESSION['fn'].$_SESSION['ln'], $fileId ,array_Keys($_FILES)[$x]);

    $x += 1;
}


?>