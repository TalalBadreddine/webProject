<?php
session_start();

$courses = $_SESSION['teacherCourses'];
$currentCourseName = $_POST['courseName'];

for($x = 0 ; $x < count($courses); $x++ ){

    if($courses[$x]['CourseName'] == $currentCourseName){
        $currentCourseData = $courses[$x];
        $path = '../../../../../../webProjectFiles/Courses/'.$currentCourseData["CourseID"];
        $_SESSION['currentCourseFileID'] = $currentCourseData["CourseID"];
        // $files = scandir($path);
        $files = array_diff(scandir($path), array('.', '..','.DS_Store'));

        echo json_encode($files);
        break;
    }
}
;

?>