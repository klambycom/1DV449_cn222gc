Exec {
  path => ["/usr/bin", "/usr/local/bin"],
}

exec { "apt-get-update":
  command => "apt-get update",
}

Exec["apt-get-update"] -> Package <| |>

# Module puppetlabs/apache
class { "apache":
  mpm_module    => "prefork",
  default_vhost => false,
}

include "apache::mod::php"

apache::vhost { "lab-site":
  port    => 80,
  docroot => "/vagrant",
}

package { "php5-xdebug":
  ensure  => installed,
  require => Class["apache::mod::php"],
}

/*
package { "php5-mcrypt":
  ensure  => installed,
  require => Class["apache::mod::php"],
}
*/

package { "php5-curl":
  ensure  => installed,
  require => Class["apache::mod::php"],
}

package { "php5-sqlite":
  ensure  => installed,
  require => Class["apache::mod::php"],
}

file { 'php-config':
  path    => '/etc/php5/apache2/php.ini',
  source  => '/vagrant/php.ini',
  require => Class["apache::mod::php"],
}

# Remove?
package { "sqlite3":
  ensure => installed,
}

# Module willdurand/nodejs
include nodejs
