<?php

session_start();
require '../../../extension/makeConnection.php';

$currentCourseID = $_SESSION['currentCourseFileID'];
$currentExam = $_SESSION['currentExamData']['currentExam'];
$majorId = $_SESSION['teacherData']['MajorID'];

// echo $currentCourseID . $currentExam . $majorId;
$sql = "SELECT * FROM `Student` INNER JOIN `Grades` ON Student.StudentID = Grades.StudentId AND Grades.ExamNumber = '$currentExam' AND Grades.CourseId = '$currentCourseID'  ";

$arrayOfStudentAndGrades = array();

if ($result = $conn->query($sql)) {
    while ($row = $result -> fetch_row()) {
        $currentArr = array();
        $name = $row[2].' '. $row[3];
        array_push($currentArr, $name);

        $secondSql = "SELECT * FROM `Grades` WHERE `StudentID` = $row[0] AND `ExamNumber` = '$currentExam' ";

        if($resultSecond = $conn->query($secondSql)){
            $secondRow = $resultSecond->fetch_row();
            array_push($currentArr, $secondRow[2]);
            array_push($currentArr, $row[0]);
        }
        array_push($arrayOfStudentAndGrades, $currentArr);
        
    }
    $result -> free_result();
}

echo json_encode($arrayOfStudentAndGrades);

?>