<?php
use Luracast\Restler\RestException;

class Dockets {
	private $filepath = "docketid.dat";
	
	// Get current id
	function get()
	{
		$id = 0;
		$myfile = fopen($this->filepath, "r");
		fscanf($myfile,"%d",$id) or die('Unable to open file');
		fclose($myfile);			
		return $id;
	}
	
	// Get next id
    function getNextId()
    {
		$id = 1;
		$myfile = fopen($this->filepath, "r");
		if ($myfile) {
			fscanf($myfile,"%d",$id);
			$id = ($id)?$id+1:1;
			fclose($myfile);			
		
			$myfile = fopen($this->filepath, "w") or die("Unable to write file!");
			fwrite($myfile, $id);
			fclose($myfile);
		}
		
		return $id;
    }
}
