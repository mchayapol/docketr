# Docketr
This software was developed for The One Petroleum.
# Software Requireemnt
* WAMP Stack (Bitnami) / XAMPP
* NodeJS for npm
* PHP Composer

# Installation
At root directory,
~~~
bower install
~~~
Required `npm`

In rest directory,
~~~
composer update
~~~

# IMPORTANT
- *restler.php* is required to be in vendor/
autoload.php doesn't work correct for some reason it doesn't load restler.php.
But the error message render as if REST works (very deceptive)
(4 hours spent on this issue.)

- Do not upgrade restler to the newer version. No time to test and don't waste it.

- Should upgrade from bower to other manager.