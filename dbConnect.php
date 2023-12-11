<?php
    header("Access-Control-Allow-Origin: *");  // Allow cross-origin requests
    $host = "localhost";  // Database host
    $dbname = "dca";      // Database name
    $username = "reyvic"; // Database username
    $password = "12345";  // Database password

    try {
        // Create a PDO (PHP Data Objects) connection to the database
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  // Set error handling mode

        // Clear expired authentication records
        $sql = "UPDATE forgotpass SET token = NULL, tokenTime=NULL, authCode=NULL WHERE tokenTime < (NOW() - INTERVAL 3 minute)";
        $stmt = $pdo->query($sql);
        $stmt->execute();  // Execute the SQL query
    } catch (PDOException $error) {
        // Handle any errors or exceptions (You may want to log the error details)
        echo $error->getMessage();
    }
?>
