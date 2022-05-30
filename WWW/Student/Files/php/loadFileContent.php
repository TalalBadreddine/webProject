<?php
$currentID = $_POST['currentCourseID'];

$path = '../../../../../../webProjectFiles/Courses/'.$currentID;

// $files = scandir($path);
$files = array_diff(scandir($path), array('.', '..','.DS_Store'));

echo json_encode($files);
?>