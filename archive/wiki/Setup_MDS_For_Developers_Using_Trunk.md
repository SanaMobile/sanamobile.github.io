---
title: Manual MDS Installation
---

These instructions are for Moca developers using the trunk code of the MDS (not intended for Moca implementers using MDS release 1.0 - see [Setup Servers](/Setup_Servers "wikilink") for those instructions).

Install Moca Dispatch Server (MDS)
----------------------------------

The procedure from the Moca client application on the Android phone is put into JSON format and then sent to the Moca Dispatch server (MDS) in chunks. The MDS then waits for all the chunks to arrive and assembles them together into a patient encounter with the patient ID, description of the visit, and etc.. Then the MDS logs into OpenMRS and creates a new patient if the patient ID doesn't already exist in the medical record system. Then the MDS will create a new encounter (patient visit) for that patient ID, uploading the images/audio/video files as complex observations and the each text question/answer pair as an observation.

Step by step guide for installing the MDS on Ubuntu 9.10

##### Install Software

Execute the following in a terminal window:

1.  cd
2.  sudo apt-get install python-mysqldb python-cjson apache2 libapache2-mod-python mysql-server subversion unzip
3.  wget <http://www.djangoproject.com/download/1.0.2/tarball/>
4.  tar zxf Django-1.0.2-final.tar.gz
5.  cd Django-1.0.2-final
6.  sudo python setup.py install
7.  cd
8.  Download Code
    1.  If you're developing on Moca, execute: svn checkout <https://moca.googlecode.com/svn/servers/mds/branches/release-1.0.x> ./mds
    2.  If you're just installing the MDS, download the Moca-MDS zip or tar.gz file from Google Code: the <http://code.google.com/p/moca/downloads/list>
        1.  tar zxf Moca-MDS-1.0.tar.gz \*\*\*OR\*\*\* unzip Moca-MDS-1.0.zip
        2.  mv Moca-MDS-1.0 mds

9.  sudo mv mds/moca /opt/moca/
10. cd /opt/moca
11. sudo mv settings.py.tmpl settings.py

##### Create MySQL database for MDS

1.  Open another terminal window and login to your MySQL database to create another database named “mds”
    1.  mysql –u root –p
    2.  <enter your own password>
    3.  show databases;
    4.  create database mds;
    5.  show databases;

##### Setup settings file

1.  Back in the original terminal window, edit settings.py
    1.  sudo nano settings.py
    2.  Example settings:
        1.  DATABASE_ENGINE = 'mysql'
        2.  DATABASE_NAME = 'mds'
        3.  DATABASE_USER = 'root'
        4.  DATABASE_PASSWORD = '<put in your MySQL password from above>'
        5.  DATABASE_HOST = ''
        6.  DATABASE_PORT = ''
        7.  MEDIA_URL = '/mds/media'
        8.  MEDIA_ROOT = '/opt/moca/media'
        9.  ADMIN_MEDIA_PREFIX = '/mds/media/admin'
        10. OPENMRS_SERVER_URL='<http://><IPaddress>:8080/openmrs/'
             Remember the trailing slash!

    3.  Set template settings to enable logging

        TEMPLATE_DIRS = (


        '/opt/moca/templates',

        )

2.  ./manage.py syncdb
3.  You may create a login account (for accessing the Django admin interface)

##### Run MDS on Django Development Server

At this point, you have configured the MDS so that it should work with your database. To verify that it works you can use the Django development server with these instructions. <B>WARNING:</b> Using the development server is not suitable for deployment purposes.

1.  Back to the terminal window in the moca mds folder where the settings.py file resides
2.  ./manage.py runserver 0.0.0.0:<port number> (e.g. ./manage.py runserver 0.0.0.0:8000)
3.  ./manage.py runserver <public IP address>:<port number>

Make a test request to <http://localhost:8000> -- you should see a 'Mocamobile MDS Online' message.

##### View Error Logs and Admin Interface

1.  Will be able to view logs: <http://><IP address>:<Port number>/log/ (i.e. <http://moca.media.mit.edu/mds-demo/log/>
2.  Now you have the development interface running on the specified port (8000). You should be able to open a web browser and go to <http://localhost:8000/admin> to get the MDS admin interface. Click on request logs to see the django debug/error messages.

##### Configure Apache to serve the MDS

1.  sudo nano /etc/apache2/sites-enabled/000-default
    1.  Add a handler for the /mds location. Insert this <Location> block somewhere inside the <VirtualHost> block.

        <Location "/mds">


        SetHandler python-program

        PythonHandler django.core.handlers.modpython

        PythonDebug On

        SetEnv DJANGO_SETTINGS_MODULE moca.settings

        PythonPath "['/opt/moca'] + sys.path"

        PythonInterpreter mds

        PythonOption django.root /mds

        </Location>

        <Location "/mds/media">


        SetHandler none

        </Location>

2.  sudo ln -s /opt/moca /var/www/
3.  sudo ln -s /usr/local/lib/python2.6/dist-packages/django/contrib/admin/media /opt/moca/media/admin
     <b>If you're using Python 2.5, replace python2.6 in this path with python2.5</b>
4.  sudo apache2ctl restart

You should now be able to verify that the MDS is running on Apache by navigating with a browser to: <http://localhost/mds/> You should see the same 'Mocamobile MDS Online' message that was shown before in the Development Server step, except now the MDS is being served by Apache, which is more suitable for production purposes.

##### Make sure OpenMRS on public IP address

1.  sudo nano /etc/tomcat6/server.xml
2.  Add address tag with the IP address
    1.  <Connector port="8080" protocol="HTTP/1.1"<br /> address="0.0.0.0"
         connectionTimeout="20000"
         redirectPort="8443" /\>

3.  sudo /etc/init.d/tomcat6 restart

##### Test request to verify MDS / OpenMRS Connection

To verify that the MDS and OpenMRS are successfully connected, you can use this test request to have the MDS connect to the OpenMRS and verify the credentials provided. Make sure to replace <your OpenMRS admin password> with the password for the OpenMRS admin account. The MDS should respond with a JSON file -- if you open it up, it should have information about whether the request succeeded.

1.  You can check that it works by <http://><ipaddress>/json/validate/credentials/?username=admin&password=<your OpenMRS admin password>

##### Reference

Installing the MDS by RJ Ryan

<http://dagny.mit.edu/trac/moca/wiki/MDSInstall>