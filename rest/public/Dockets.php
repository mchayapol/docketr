<?php
use Luracast\Restler\RestException;

class Dockets {
	private $filepath = "docketid.dat";
	
	// Get current id
	function get()
	{
		try {
			$id = 0;
			$myfile = fopen($this->filepath, "r");
			fscanf($myfile,"%d",$id);
			fclose($myfile);			
			return $id;
		} catch(Exception $e) {
			throw new RestException($e);
		}
	}
	
	// Get next id
    function getNextId()
    {
		try {
			$id = 1;
			$myfile = fopen($this->filepath, "r");
			if ($myfile) {
				fscanf($myfile,"%d",$id);
				$id = ($id)?$id+1:1;
				fclose($myfile);			
			
				$myfile = fopen($this->filepath, "w");
				fwrite($myfile, $id);
				fclose($myfile);
			}
			
			return $id;
		} catch(Exception $e) {
			throw new RestException($e);
		}
    }
}
