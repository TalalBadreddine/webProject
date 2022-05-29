<?php

require '../../../extension/makeConnection.php';

session_start();

$_SESSION['currentCourseID'] = $_POST['courseId'];
$teacherCourses = $_SESSION['teacherCourses'];

// for($x = 0 ; $x < count($teacherCourses) ; $x++){
//     if($teacherCourses[$x][])
// }

echo json_encode($_SESSION);
?>