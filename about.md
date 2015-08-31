---
layout: page
title: About
permalink: /about/
---

This is the Sana documentation site. Source code for the site is available at
[github.com/SanaMobile/sanamobile.github.io](https://github.com/SanaMobile/sanamobile.github.io)

## Install Instructions for build Environment

Instructions for replicating Github pages environment

### Installation

Install ruby 2.0.0 and install bundler as a gem.

    gem install bundler

Create Gemfile in your repository and add. *Note:* If cloned from 
repo this file will exist already.

    source 'https://rubygems.org'
    gem 'github-pages'

Install gems using bundle. Run. 

    bundle install

If all goes well you should be able to serve the files on your localhost
with:

```
jekyll serve --watch --config _config-local.yml
```

Using the ```--watch``` directive will allow editing and immediately 
viewing changes without restarting the server. The changes will appear
within a few seconds or can be seen by refreshing the page.

The ```_config.yml``` file is used by Github pages when deployed.

### Ubuntu Installation Notes
Install the following packages.

```
ruby2.0
ruby2.0-dev
```

Ubuntu 14.04LTS installs ruby1.9 as a dependency for ruby2.0. You 
must edit links in /usr/bin to 2.0 versions.

```
ln -sf /usr/bin/ruby2.0 /usr/bin/ruby
ln -sf /usr/bin/gem2.0 /usr/bin/gem
```

### Install Reference.
[Using Jekyll with Pages](https://help.github.com/articles/using-jekyll-with-pages/)

[Install Jekyll2 on Ubuntu 14.04](http://michaelchelen.net/81fa/install-jekyll-2-ubuntu-14-04/)
