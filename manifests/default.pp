Exec {
  path => ["/usr/bin", "/usr/local/bin"],
}

exec { "apt-get-update":
  command => "apt-get update",
}

Exec["apt-get-update"] -> Package <| |>

# Module willdurand/nodejs
include nodejs
