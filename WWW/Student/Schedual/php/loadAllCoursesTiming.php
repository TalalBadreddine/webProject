<?php

require '../../../extension/makeConnection.php';

session_start();
echo json_encode($_SESSION['coursesData']);

?>