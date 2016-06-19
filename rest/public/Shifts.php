<?php
use Luracast\Restler\RestException;

class Shifts {

    function __construct()
    {
    }

	// List all products
    function index()
    {
		try {
            $products = array();
            $products = ORM::forTable('docketr_shift')->findArray();
			return $products;
		} catch(PDOException $e) {
			throw new RestException(501, 'MySQL: ' . $e->getMessage());
		}
    }

    function get($id)
    {
		$shift = ORM::forTable('docketr_shift')->findOne($id);
		return $shift->asArray();
    }

	// Allow pre-flight
	function options() {
		return;
	}
	
	function getLast()
	{
		$lastId = ORM::forTable('docketr_shift')->max('id');
		$shift = ORM::forTable('docketr_shift')->findOne($lastId);
		if (!$shift) {
			throw new ResException(404, 'No last shift found '.$lastId);
		}
		return $shift->asArray();
	}

	// summarise and start new shift
	function getNew($request_data = NULL) {
		$shift = ORM::forTable('docketr_shift')->create();
		$lastDocketId = (new Dockets)->get();
		$shift->start_docket_id = $lastDocketId;
		if (true === $shift->save()) {
			$shift = ORM::forTable('docketr_shift')->findOne($shift->id);
			return $shift->asArray();
		} else {
			throw new RestException(501, 'MySQL: ' . $e->getMessage());
		}
	}

    function getAdd($amount)
    {
		$lastId = ORM::forTable('docketr_shift')->max('id');
		$shift = ORM::forTable('docketr_shift')->findOne($lastId);
		if (!$shift) {
			throw new RestException(404,'No shift found'.$lastId);
		}
		$shift->count++;
		$shift->amount = $shift->amount + $amount;
		$shift->save();
		return $shift->asArray();
    }
}

