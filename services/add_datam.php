<?php
    // Connect to MySQL
    include("dbconnect.php");
    // Prepare the SQL statement
    $SQL = "INSERT INTO smartec.movimiento (sensor_id) VALUES (2)";     
    // Execute SQL statement
    mysql_query($SQL);
	
	
	 $result = mysql_query("SELECT nombre, email FROM usuarios");
	 $num_rows = mysql_num_rows($result);
	 $registro=0;
	 $to ="";
	 
	 if($num_rows == 1)
	 {
		 $row = mysql_fetch_row($result);
		 $to = $row[0].'<'.$row[1].'>';
		 
	 }
	 else
	 {
		 
		 while( $row = mysql_fetch_array($result) )
    {
		 $to .= $row["nombre"].'<'.$row["email"].'>,';
		
		 /*
		if($registro ==0)
		{
			$to = $row["nombre"].'<'.$row["email"].'>,';
			$registro = $registro + 1;
		}
       else if($registro = $num_rows)
	   {
		   $to .= $row["nombre"].'<'.$row["email"].'>';
		   
	   }
	   
	   else
	   {
		   $to .= $row["nombre"].'<'.$row["email"].'>,';
	   }
	
      */
    }
$to=substr($to,0, -1);
echo $to;
	}
//echo $to;
    // Go to the review_data.php (optional)
    //header("Location: review_datam.php");
	mail($to, "Intruder detected", "There was an intruder");
?>


