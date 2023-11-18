#!/bin/bash

ssh_profile="root@agencyboz"
user="agenc5523"
domain="agencyboz.com"
subdomain="public_html"

path="/home/${domain}/${subdomain}"

yarn build
echo 'Uploading build to server'
scp -r build/* ${ssh_profile}:${path}
ssh ${ssh_profile} "chown -R ${user}:${user} ${path}/*"
