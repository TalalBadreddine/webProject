<?php
require '../../../extension/makeConnection.php';

session_start();
$currentCourseId = $_POST['courseId'];
$studentId = $_SESSION['studentData']['StudentID'];
$majorId = $_SESSION['studentData']['MajorID'];
$courses = $_SESSION['coursesData'];

for($x = 0 ; $x < count($courses) ; $x++){
    if($courses[$x][0] == $currentCourseId){
        $nbOfExams = $courses[$x][4];
    }
}
$arrayOfGrades = array();

for($x = 1 ; $x < $nbOfExams + 1 ; $x++){
    
    $sql = "SELECT * FROM `Grades` WHERE `StudentID` = '$studentId' AND `CourseId` = '$currentCourseId' AND `ExamNumber` = '$x' AND `MajorId` = '$majorId' ";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
          array_push($arrayOfGrades, $row['Grade']);
        }
      } else {
        array_push($arrayOfGrades, 'not found');
      }
}
echo json_encode($arrayOfGrades);
$conn->close();
?>