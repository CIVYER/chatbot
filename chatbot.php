<?php
    header("Access-Control-Allow-Origin: *");  // Allow cross-origin requests
    include_once('./dbConnect.php');  // Include the database connection script

    $action = '';
    if(isset($_GET['action'])){
        $action = $_GET['action'];
    }
    $startTime = '';
    if(isset($_GET['startTime'])){
        $startTime = $_GET['startTime'];
    }
    $endTime = '';
    if(isset($_GET['endTime'])){
        $endTime = $_GET['endTime'];
    }
    $dept = '';
    if(isset($_GET['dept'])){
        $dept = $_GET['dept'];
    }


    if($action == 'getFreeRoom'){
        $sql='SELECT * FROM scheds WHERE startTime >= ? AND endTime <= ? AND occupied=? AND department=? LIMIT 1';
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$startTime, $endTime,'no', $dept]);

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach($result as $rows){
            extract($rows);
            if ($rows['department'] == "COLLEGE OF ENGINEERING AND ARCHITECTURE"){
                $rows['department'] = strtoupper('cea');
            }
            else if ($rows['department'] == "COLLEGE OF BUSINESS STUDIES"){
                $rows['department'] = strtoupper('cbs');
            }
            else if ($rows['department'] == "COLLEGE OF ARTS AND SCIENCES"){
                $rows['department'] = strtoupper('cas');
            }
            else if ($rows['department'] == "COLLEGE OF HOSPITALITY MANAGEMENT"){
                $rows['department'] = strtoupper('cht');
            }
            else if ($rows['department'] == "COLLEGE OF SOCIAL SCIENCES AND PHILOSOPHY"){
                $rows['department'] = strtoupper('css');
            }
            else if ($rows['department'] == "COLLEGE OF EDUCATION"){
                $rows['department'] = strtoupper('coe');
            }
            else if ($rows['department'] == "COLLEGE OF COMPUTING STUDIES"){
                $rows['department'] = strtoupper('ccs');
            }
            else if ($rows['department'] == "COLLEGE OF INDUSTRIAL TECHNOLOGY"){
                $rows['department'] = strtoupper('cit');
            }
            else if ($rows['department'] == "SENIOR HIGH SCHOOL: ACADEMIC TRACK"){
                $rows['department'] = strtoupper('sha');
            }
            else if ($rows['department'] == "SENIOR HIGH SCHOOL: TECHNICAL VOCATIONAL LIVELIHOOD TRACK"){
                $rows['department'] = strtoupper('sht');
            }
            echo    $department.",,,,,"
                    .$rows['department'].": ".$rows['roomNo'].",,,,,"
                    .$occupied
                    ;
        }
    }
?>