<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 'On');

require_once '../vendor/restler.php';
require_once 'db.php';

use Luracast\Restler\Restler;
use Luracast\Restler\Defaults;

// Setup CORS https://github.com/Luracast/Restler/issues/254
Defaults::$cacheDirectory = __DIR__.'/../cache';
Defaults::$crossOriginResourceSharing = true;
Defaults::$accessControlAllowOrigin = '*';
Defaults::$accessControlAllowMethods = 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD';

$r = new Restler();
$r->setOverridingFormats('HtmlFormat','UploadFormat','JsonFormat');
$r->addAPIClass('Products');
$r->addAPIClass('Customers');
$r->handle();
