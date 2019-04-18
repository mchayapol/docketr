<?php
use Luracast\Restler\RestException;

class Products {

    function __construct()
    {
    }


	// List all products
    function index()
    {
				$products = array();
				$products = ORM::forTable('docketr_product')->findArray();
				return $products;
    }

    function get($id)
    {
		$product = ORM::forTable('product')->findOne($id);
		return $product->asArray();
    }

	// Allow pre-flight
	function options() {
		return; 
	}
	
    function post($request_data = NULL)
    {
		$products = $request_data['products'];
		foreach($products as $p) {
			$product = ORM::forTable('docketr_product')->findOne($p['id']);
			$product->set($p);
			$product->save();			
		}
		return $products;		
    }
}

