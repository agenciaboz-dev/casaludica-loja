#!/bin/bash

user="casal104"
subdomain="public_subdomains/lojas.casaludica.com.br"
path="/home/${user}/${subdomain}"

yarn build
echo 'Uploading build to server'
scp -r -P 22022 build/* casaludica:${path}
ssh -p 22022 casaludica "chown -R ${user}:${user} ${path}/*"
