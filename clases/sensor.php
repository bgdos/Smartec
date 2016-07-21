<?php
    require_once('/../connection/connection.php');
    class Station extends Connection
    {
        /** attributes **/
        private $id, $description, $status;
        
        /** functions **/
        public function setId($value) { $this->id = $value;}
        public function getId() { return $this->id; }
        public function setDescription($value) { $this->description = $value; }
        public function getDescription() { return $this->description; }
        public function setStatus($value){ $this->status = $value; }
        public function getStatus() { return $this->status; }
        
        /** constructor **/
        public function __construct()
        {
            // validate arguments
            $num = func_num_args();
            $argumments = func_get_args();
            // create an empty object
            if ($num == 0)
            {
                $this->id = 0;
                $this->description = '';
                $this->status = '';
            }
            // 1 values received
            if ($num == 1)
            {
                // pass the value to the id
                $id = $argumments[0];
                // create the instruction
                $instruction = 'SELECT descripcion, estado FROM sensores WHERE id = ?';
                // open the connection
                parent::openConnection();
                // create the command
                $command = parent::$connection->prepare($instruction);
                // parameters
                $command->bind_param('i', $id);   
                // execute command
                $command->execute();
                // link the results to local values
                $command->bind_result($description, $status);
                // read data
                $found = $command->fetch();
                // close command
                mysqli_stmt_close($command);
                // close the connection
                parent::closeConnection();
                if ($found)
                {
                    $this->id = $id;
                    $this->description = $description;
                    $this->ip = $status;
                }
                else
                {
                    $this->id = 0;
                    $this->description = '';
                    $this->status = '';
                }
            }
            
        }
    }

?>