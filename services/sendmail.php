<?php 
ini_set()
$message = 'hola mundo';
$email_to = 'Juan Salgado <juans-poly@outlook.com>'; // required
$email_from = 'juans@translead.com'; // required
$email_subject = 'New Intrusion Detected at: '. '10:20am'; // required
$email_message = '<html>
					<head>
						<style>
							body{
								background: #fff;
								font-family: "Arial", sans-serif; 
								color: #6d6d6d;
							}
							table, th, td, tr{
								border: solid 1pt #d1d1d1; 
								border-collapse: collapse;
							}
							th, td{
								padding: 5px;
							}
							table{
								text-align: left;
								background: #e0e0e0; 
							}
							table{
								text-align: center;
								border-top: solid #103988;
								margin: 10px;
							}
							thead{background: #3e5b7c; color: #fff;}
							span{font-size:10px;}
						</style>
					</head>
					<body>
						<p>Hello, please review the discrepancy and take the proper action:</p>
						<table>
							<thead>
								<tr>
									<th>Sap No.</th>
									<th>Description</th>
                                    <th>PO No.</th>
									<th>Packing Qty</th>
									<th>Actual Qty</th>
									<th>Discrepancy</th>
                                    <th>Subcontractor</th>
                                    <th>Packing No.</th>
								</tr>
							</thead>
							<tbody>'.
							$message
							.'</tbody>
						</table><br>
						Thank you.<br>
						<br><br><br>
						<center>
							<span>This mail was sent to you automatically by the Outsourcing Dashboard System<span><br>
							<img src="http://translead-dashboard.esy.es/images/logo.png"><br>
                            <span>Dashboard System was developed by Juan Salgado and Fausto Serrano for Hyundai Translead.<span><br>
						</center>
						</body>
					</html>'; // required
// create email headers
$headers = 'From: Smartec <juansalgado@outlook.com>\r\n'.
'Reply-To: '.$email_from."\r\n" .
'Content-type: text/html; charset=iso-8859-1 \r\n'.
'X-Mailer: PHP/' . phpversion();
$send = mail($email_to, $email_subject, $email_message, $headers);
if ($send)
	echo '{ "status" : 0, "message" : "Data saved successfully." }';
 ?>