<?php
use Luracast\Restler\RestException;

class Customers {

    function __construct()
    {
    }

	// List all customers
    function index()
    {
		try {
            $customers = array();
            $customers = ORM::forTable('docketr_customer')->findArray();
			return $customers;
		} catch(PDOException $e) {
			throw new RestException(501, 'MySQL: ' . $e->getMessage());
		}			
    }

    function get($id)
    {
		$customer = ORM::forTable('docketr_customer')->findOne($id);
		return $customer->asArray();
    }

	// Allow pre-flight
	function options($id = NULL) {
		return; 
	}

	// New
    function post($request_data = NULL)
    {
		//return $request_data;
		$customer = ORM::forTable('docketr_customer')->create();
		$customer->set($request_data);
		if (true === $customer->save()) {
			return $customer;
		} else {
			throw new RestException(501, 'MySQL: ' . $e->getMessage());
		}
			
    }
	
	// Update
	function put($id, $request_data) {
		$customer = ORM::forTable('docketr_customer')->findOne($id);
		$customer->set($request_data);
		if (true === $customer->save()) {
			return $customer;
		} else {
			throw new RestException(501, 'MySQL: ' . $e->getMessage());
		}
	}
	
	function delete($id)
    {
		try {
			$customer = ORM::forTable('docketr_customer')->findOne($id);
			return $customer->delete();
		} catch(PDOException $e) {
			throw new RestException(501, 'MySQL: ' . $e->getMessage());
		}	
    }
}

