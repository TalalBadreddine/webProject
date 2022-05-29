<?php

session_start();

echo $_SESSION['currentCourseFileID'];
// for($x = 0 ; $x < count($courses); $x++ ){

//     if($courses[$x]['CourseName'] == $currentCourseName){
//         $currentCourseData = $courses[$x];
//         $path = '../../../../../../webProjectFiles/Courses/'.$currentCourseData["CourseID"];
//         // $files = scandir($path);
//         $files = array_diff(scandir($path), array('.', '..','.DS_Store'));

//         echo json_encode($files);
//         break;
//     }
// }

?>