<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 'On');

require_once '../vendor/restler.php';
require_once '../vendor/j4mie/idiorm/idiorm.php';
require_once 'db.php';

use Luracast\Restler\Restler;
use Luracast\Restler\Defaults;
Defaults::$cacheDirectory = __DIR__.'/../cache';
Defaults::$crossOriginResourceSharing = true;
Defaults::$accessControlAllowOrigin = '*';
Defaults::$accessControlAllowMethods = 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD';

$r = new Restler();
$r->setOverridingFormats('HtmlFormat','UploadFormat','JsonFormat');
$r->addAPIClass('Say');
$r->addAPIClass('Products');
$r->addAPIClass('Customers');
$r->addAPIClass('Dockets');
$r->addAPIClass('Shifts');

$r->handle();