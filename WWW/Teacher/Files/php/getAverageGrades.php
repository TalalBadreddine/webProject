<?php
require '../../../extension/makeConnection.php';

session_start();

$majorId = $_SESSION['teacherData']['MajorID'];
$courseId = $_SESSION['currentCourseFileID'];


$sql = "SELECT * FROM `Grades` WHERE `MajorId` = $majorId AND `CourseId` = $courseId ";

$allResults = array();

$result = $conn->query($sql);


if ($result->num_rows > 0) {
    while ($row = $result -> fetch_assoc()) {

        array_push($allResults, $row['Grade']);

    }
}else{
    echo $conn->error;
}

echo json_encode($allResults);
$conn->close();
?>