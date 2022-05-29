<?php

require '../../../extension/makeConnection.php';

session_start();

$_SESSION['currentID'] = $_POST['courseId'];
$teacherCourses = $_SESSION['teacherCourses'];

// for($x = 0 ; $x < count($teacherCourses) ; $x++){
//     if($teacherCourses[$x][])
// }

echo json_encode($_SESSION);
?>