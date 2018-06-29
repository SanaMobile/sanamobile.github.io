---
layout: default
title: Manual Installation
label: Manual Install
collection: users
---
# Server Guide-Manual Installation
This file contains instructions for installing a new instance.

## Operating System 
Ubuntu 14.04 LTS is officially supported.

## OS Packages and configuration
Everything as root(sudo):
1.  Meta Packages. Use ```tasksel``` for meta packages. This will 
    install a number of required packages and their dependencies. In
    the ```tasksel```
       (Select Lamp Stack and Tomcat and press Enter)
2.  Individual packages Use the Advanced Package Tool to install the 
    required packages.

        apt-get install                 \
            git                         \
            libapache2-mod-wsgi         \
            libapache2-mod-jk           \
            python-cjson                \
            python-django               \
            python-django-piston        \
            python-django-extra-views   \
            python-mysqldb              \
            python-libxml2              \
            python-lxml                 \
            python-django-extensions    \
            python-imaging              \
            sqlite3                     \
            javascript-common           \
            libjs-jquery-ui             \
            libjs-jquery-timepicker

3.  Directories. Create /opt/sana if it does not exist. This will be 
    the document root where the mds urls and files get served from.
    * mkdir -p /opt/sana/sana.mds/cache
    * mkdir -p /opt/sana/sana.mds/cache/static
    * mkdir -p /opt/sana/sana.mds/cache/media

4.  Database. Create the mds database and set up access.Use your own credentials 
    instead of ```****``` below.
    *  Open a MySQL prompt.

          mysql -u root -p
          CREATE DATABASE mds;
          CREATE USER 'mds'@'localhost' IDENTIFIED BY '****';
          GRANT ALL ON mds.* TO 'mds'@'localhost';
          exit;

## MDS Installation
1.  MDS source code

      mkdir ~/git
      cd ~/git
      git clone https://github.com/SanaMobile/sana.mds.git
    
2.  Link or copy the mds source into the sana directories

        ln -s /home/<user>/git/sana.mds/src/mds /opt/sana/sana.mds/mds
        cp -r /home/<user>/git/sana.mds/src/mds /opt/sana/sana.mds
        cp /home/<user>/git/sana.mds/src/manage.py /opt/sana/sana.mds  
    
    Note: Linking is preferable to keep any files cached at runtime out of the source directories.
    
3.  MDS set up. 
    * Install and set up the mds code
    
        cp /opt/sana/sana.mds/mds/settings.py.tmpl /opt/sana/sana.mds/mds/settings.py
        cp /opt/sana/sana.mds/mds/local_settings.py.tmpl /opt/sana/sana.mds/mds/local_settings.py
    
    * Adjust any values in settings.py to match the local system. Should 
      just be the database config.


          cd /opt/sana/sana.mds
          python manage.py syncdb
          python manage.py collectstatic
    
    * Link the contents of /opt/sana/sana.mds/mds/ to your apache document root. The default for 
      Ubuntu is `/var/www/html`, e.g.
        
          ln -sf /opt/sana/sana.mds/mds /var/www/html/mds

4. Directory Permissions. Update directory permissions for the mds files
    
      chown -R www-data:www-data /opt/sana/sana.mds

5.  Apache configuration for MDS
    * Set mds environment variables

       echo 'export MDS_DIR=/opt/sana/sana.mds' >> /etc/apache2/envvars
    
    * Copy the mds.conf file from the source into the apache 
      `conf-available` directory and enable.

        cp /home/<user>/git/sana.mds/include/mds/apache2/conf-available/* \
            /etc/apache2/conf-available

    * Add option to follow symlinks for the server root directive in 
      your apache config, example:
        
        <Directory /var/www/html>
            Options FollowSymLinks
            Require all granted
        </Directory>
        
    * Enable mds conf

        a2enconf mds

    * Enable wsgi module

        a2enmod wsgi
        
6. Set up encryption. (https://help.ubuntu.com/14.04/serverguide/certificates-and-security.html)
    This is not absolutely required for development servers. The 
    following is a quick start for generating your own certificate.
    
    * Create your own certificate and key

       openssl genrsa -des3 -out server.key 1024
       openssl rsa -in server.key -out server.key.insecure
       openssl req -new -key server.key -out server.csr
       openssl x509 -req -days 365 -in server.csr -signkey server.key.insecure -out server.crt
       
      You will be prompted for some information. Type in country, state, city,
      org, common name. You can skip challenge password and company name)

    * Copy the cert and key

       cp server.crt /etc/ssl/certs
       cp server.key /etc/ssl/private
       
7.  Restart Apache and check connection:

      service apache2 restart

    You should now be able to access:

        http://<hostname>/mds/
        https://<hostname>/mds/

## OpenMRS Installation
Ignore the following steps if running MDS in standalone mode.

1.  Configure Tomcat. 
    * Verify that the following line is in your /etc/tomcat7/server.xml file, uncomment if necessary.
    
           <Connector port="8009" URIEncoding="UTF-8" enableLookups="false" protocol="AJP/1.3" />
       
    A sample server.xml is available in the mds includes directory.
    Create OpenMRS installation directory
    
        mkdir /usr/share/tomcat7/.OpenMRS
        chown tomcat7:tomcat7 /usr/share/tomcat7/.OpenMRS
       
    e. Restart tomcat.
           service tomcat7 restart
2.  Enable apache modules and and openmrs conf
    
        a2enmod jk
        a2enmod proxy
        a2enmod proxy_http
        a2enmod proxy_ajp
        a2enconf openmrs
        
       Note: Step (b) will provide access to OpenMRS through http://<hostname>/openmrs

    c. 

2.  OpenMRS Install-1.9.7 release
    * Download

        http://openmrs.org/download/

    * Follow installation instructions:

        https://wiki.openmrs.org/display/docs/Installing+OpenMRS

3.  Add Modules through browser(OpenMRS Administration --> Manage Modules)
    * Webservices.REST
       Go to the module settings page in the Admin and set the
       "Webservices REST Uri Prefix" to http://<ip-address>[:port]/openmrs/
    * HTMLFormEntry
    * LogManager
    * Sana module - get the latest beta version
        http://demo.sana.csail.mit.edu/downloads/openmrs/

4.  Configure OpenMRS for Sana
    See the instructions at [OpenMRS Configuration]({{ site.baseurl }}/users/server_guide/#openmrs_configuration) 
