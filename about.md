---
layout: page
title: About
permalink: /about/
---
# Github Pages Developement Environment
This page contains instructions for setting up the development environment
for this Github pagesSource code for the Sana documentation site

## Source Code
Clone the repository

    git clone https://github.com/SanaMobile/sanamobile.github.io

## Build Environment

1. Install ruby 2.0.0 and install bundler as a gem.

        gem install bundler

2. Create Gemfile in your repository and add. *Note:* If cloned from 
repo this file will exist already.
        
        source 'https://rubygems.org'
        gem 'github-pages'

3. Install gems using bundle. Run. 

        bundle install

4. Serve Pages Locally. You should now be able to serve the files on 
your localhost. Open a terminal and from the top level directory of the 
repositroy run:

        jekyll serve --watch --config _config-local.yml --host 0.0.0.0

    The pages should be accessible using any IP address assigned to the
    host.
    
    Using the ```watch``` directive will allow editing and immediately 
    viewing changes without restarting the server. The changes will 
    appear within a few seconds or can be seen by refreshing the page.

    The ```_config.yml``` file is used by Github pages when deployed.

## Ubuntu Installation Notes
Install the following packages.
    
    ruby2.0
    ruby2.0-dev
    
Ubuntu 14.04LTS installs ruby1.9 as a dependency for ruby2.0 with the 
result being that the ruby and gem links in /usr/bin must be updated to
the 2.0 versions.

    ln -sf /usr/bin/ruby2.0 /usr/bin/ruby
    ln -sf /usr/bin/gem2.0 /usr/bin/gem


## Reference.
[Using Jekyll with Pages](https://help.github.com/articles/using-jekyll-with-pages/)

[Jekyll](http://jekyllrb.com/)

[Install Jekyll2 on Ubuntu 14.04](http://michaelchelen.net/81fa/install-jekyll-2-ubuntu-14-04/)
