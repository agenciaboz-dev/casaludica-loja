#!/bin/bash

ssh_profile="root@agencyboz"
user="lojas5330"
domain="lojas.casaludica.com.br"
subdomain="public_html"

path="/home/${domain}/${subdomain}"

yarn build
echo 'Uploading build to server'
scp -r build/* ${ssh_profile}:${path}
ssh ${ssh_profile} "chown -R ${user}:${user} ${path}/*"
