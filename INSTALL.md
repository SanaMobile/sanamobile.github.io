# Install Instructions for build Environment

Instructions for replicating Github pages environment

## Installation
1. Install Ubuntu Packages or ruby 2.0.
```
ruby2.0
ruby2.0-dev
```
2. Important** Ubuntu 14.04LTS installs ruby1.9 as a dependency for 
ruby2.0. You must edit links in /usr/bin to 2.0 versions.
```
ln -sf /usr/bin/ruby2.0 /usr/bin/ruby
ln -sf /usr/bin/gem2.0 /usr/bin/gem
```
For other linux distrobutions or environments you must install ruby 2.
3. Gems.
```ruby
gem install bundler
```
4. Create Gemfile in your repository and add. *Note:* If cloned from 
repo this file will exist already.
```
source 'https://rubygems.org'
gem 'github-pages'
```

5. Run.
```
bundle install
```

### Install Reference.
[Using Jekyll with Pages](https://help.github.com/articles/using-jekyll-with-pages/)

[Install Jekyll2 on Ubuntu 14.04](http://michaelchelen.net/81fa/install-jekyll-2-ubuntu-14-04/)

## Serving the pages
