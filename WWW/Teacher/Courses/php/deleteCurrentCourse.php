<?php

require '../../../extension/makeConnection.php';

session_start();

$currentCourseId = $_SESSION['currentCourseID'];

$sql = "DELETE  FROM `ManageMajorAndCourses` WHERE `CourseId` = $currentCourseId ";

if ($conn->query($sql) === TRUE) {

    $sql = "DELETE  FROM `ManageStudentAndCourses` WHERE `CourseID` = '$currentCourseId'";

    if($conn->query($sql) == TRUE){

        $sql = "DELETE  FROM `ManageTeachersAndCourses` WHERE `CourseId` = '$currentCourseId'";

        if($conn->query($sql) == TRUE){

            $sql = "DELETE  FROM `Course` WHERE `CourseID` = '$currentCourseId'";

            if($conn->query($sql) == TRUE){

                if (file_exists('../../../../../../webProjectFiles/Courses/'.$currentCourseId.'/')) {
                    rmdir('../../../../../../webProjectFiles/Courses/'.$currentCourseId.'/');
                }
                echo "success";
            }
        }
    }

}else{

echo "error".$conn->error;

}


?>