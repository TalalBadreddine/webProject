<?php

require '../../../../extension/makeConnection.php';

$sql = "SELECT * FROM `University`";

$result = $conn->query($sql);

$jsonData = array();

if($result->num_rows > 0 ){

    while($row = mysqli_fetch_assoc($result)){
        array_push($jsonData, $row);
    }

}else{

    echo "error while getting university for DB ";
}
echo json_encode($jsonData);

$conn->close();
?>