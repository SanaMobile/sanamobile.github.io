---
title: Manual Server Installation
---

<font color=red>ATTENTION!</font> Please post any questions to: [<https://groups.google.com/forum/?hl=en>\#!forum/sana-users Sana users group.]

We recommend using [Debian Packages](/Installation "wikilink") to install the server software. If you need to perform a manual installation, please use the steps outlined below.

Setup Linux Environment
-----------------------

The full server platform requires a linux environment. Ubuntu is the only distribution officially supported but others should work as well for those more comfortable working in with them.

;

Dedicated physical host or virtual machine running Ubuntu Linux 14.04 LTS. For running on a VM, any virtual machine manager capable of running Ubuntu, such as VMWare or VirtualBox should work. Please consult documentation for your VM manager if you have any questions about installation.

;

### OS and Virtual Machine Manager References

#### Ubuntu

1.  [Ubuntu Installation](https://help.ubuntu.com/14.04/installation-guide/index.html)

#### VMWare

-   [VMWare Workstation Installation Guide](http://pubs.vmware.com/guestnotes/wwhelp/wwhimpl/js/html/wwhelp.htm)
-   [VM Tools Installation](https://help.ubuntu.com/community/VMware/Workstation)

#### VirtualBox

-   [Documentation](https://www.virtualbox.org/wiki/Documentation)
-   [Download](https://www.virtualbox.org/wiki/Downloads)

#### Required Ubuntu Packages

The simplest method for installing the required software is to do the following on the Ubuntu OS

##### General Server Software

Open Terminal window and execute these commands, in bold, as root user. This will install the Apache and Tomcat web servers and MySQL database.

1.  **sudo tasksel**
    1.  Select LAMP Server and Tomcat
    2.  Enter root MySQL password when prompted.

**Note 1:** Using the **tasksel** is not necessary if installing Ubuntu Server. **Note 2:** Using the **tasksel** command installs a number of dependencies which are required by the LAMP and Tomcat selection. If you want to manually install everything using **apt-get** and skip using the **tasksel** entirely, you will need to consult the the Apache, MySQL, and Tomcat packages for a full list of their requirements-see this link for details[Ubuntu Package Search](http://packages.ubuntu.com/).

##### Additional Server Software Requirements(Using **apt-get**)

1.  **sudo apt-get install libapache2-mod-wsgi**
2.  **sudo apt-get install libapache2-mod-jk**
3.  **sudo apt-get install python-django**
4.  **sudo apt-get install python-django-piston**
5.  **sudo apt-get install python-mysqldb**
6.  **sudo apt-get install python-cjson**
7.  **sudo apt-get install python-libxml2**
8.  **sudo apt-get install python-lxml**
9.  **sudo apt-get install sqlite3**

##### Setup and Configure Tomcat

1.  Edit Tomcat Configuration files
    1.  **sudo nano /etc/tomcat6/tomcat-users.xml**
        (Or use your favorite editor to make the file appear as shown below. Make sure to uncomment this part of the file.)
        <tomcat-users>
            <role rolename="admin"/>
            <role rolename="manager"/>
            <role rolename="tomcat"/>
            <user username="test" password="test" roles = "admin,manager,tomcat"/>
        </tomcat-users>
    2.  **sudo nano /etc/default/tomcat6**
        (Turn off tomcat security flag in "/etc/init.d/tomcat6" file. Uncomment the following line and set value to no.)
        TOMCAT6_SECURITY=no
    3.  **sudo nano /etc/tomcat6/policy.d/03catalina.policy**
        (Add the following lines to the policy file.)
        grant codeBase "file:\${catalina.home}/openmrs/-" {
            permission java.security.AllPermission;
        };
    4.  **sudo mkdir /usr/share/tomcat6/.OpenMRS**
        (Fix application data directory)
    5.  **sudo chown -R tomcat6:tomcat6 /usr/share/tomcat6/.OpenMRS**
        (Note the space between root and /usr)
    6.  **sudo service tomcat6 restart**
        Check that it works by going to <http://localhost:8080/>
        The webpage should say “It works!”

2.  Click on the link to '''manager webapp” or go to <http://localhost:8080/manager/html>
    Username: test
    Password: test (from tomcat users xml file)

OpenMRS
-------

### Download and install OpenMRS Web app

1.  Download OpenMRS Version 1.9.7 WAR file from website
    <http://openmrs.org/download>
2.  Open the Tomcat manager page listed below and scroll down to “WAR file to deploy.”
    <http://localhost:8080/manager/html>
3.  Browse and find the WAR file you just downloaded and deploy it. “/openmrs” should now show up in the list of applications.

### Initial Setup Wizard for OpenMRS

1.  Click the “/openmrs” link to start the OpenMRS setup wizard.
2.  For Do you have an OpenMRS DB installed, select “No” call it “openmrs” and set the password to be the MySQL root password you created earlier.
3.  For page 2, select "Yes" you want the demo data loaded in. Then select “Yes” and enter the username “root” and the MySQL root password.
4.  Use the default values and continue.
5.  When selecting a password for the login page of OpenMRS, the password has to contain uppercase characters and a number.
6.  Use the default values and continue.
7.  Click Finish. Let it install which will take about 10 minutes and then it will automatically redirect you to the OpenMRS login page. (Note: even if the browser page says Done or the page says Error - get Service Context is null, it should be fine. If you wait a couple more minutes, it should still continue making progress.)
8.  Troubleshooting: If the initial setup wizard doesn't work, you might have to start again. Check whether the openmrs database is already created:
    1.  mysql -u root -p
    2.  show databases;
    3.  If openmrs shows up, then drop database by doing the following command
    4.  drop database openmrs;
    5.  Go back to initial setup page and start again

9.  Login to OpenMRS with the admin user and password created above. Leave this window open for upcoming steps.
10. If this doesn't work the first time, try again, but this time on page 1, say "Yes" the database called "openmrs" is already created and go through and try again making sure that you enter "root" and the root password for MySQL.

### Load in Required Sana modules for OpenMRS

1.  Download Modules
    1.  [Sana Module](http://demo.sana.csail.mit.edu/downloads/openmrs/sana.encounterqueue-module-current.omod)

2.  Install The modules
    1.  Login to OpenMRS \> Administration \> Manage Modules \> Click on "Add or Upgrade"
    2.  Install from Module Repository WebServices.REST module
    3.  Install from Module Repository HTMLFormEntry module
    4.  Install from Module Repository LogManager module
    5.  **Add Module** select "Choose File" and select the .omod file you just downloaded.

### Additional OpenMRS Configuration for Sana

Execute all the steps to [setup OpenMRS for Sana](/OpenMRS_Configuration "wikilink") (creating new concepts, setting up roles and privileges, setting global properties, etc..).

#### Additional OpenMRS References

Installing An OpenMRS Server on Linux <http://openmrs.org/wiki/Installing_An_OpenMRS_Server_On_Linux>

OpenMRS Step-by-Step Installation for Implementers <http://openmrs.org/wiki/Step-by-Step_Installation_for_Implementers>

Mobile Dispatch Server (MDS)
----------------------------

The procedure from the Sana client application on the Android phone is put into JSON format and then sent to the Mobile Dispatch server (MDS) in chunks. The MDS then waits for all the chunks to arrive and assembles them together into a patient encounter with the patient ID, description of the visit, and etc.. Then the MDS logs into OpenMRS and creates a new patient if the patient ID doesn't already exist in the medical record system. Then the MDS will create a new encounter (patient visit) for that patient ID, uploading the images/audio/video files as complex observations and the each text question/answer pair as an observation.

### Download and Install Current MDS Release

1.  Download the [MDS current release](http://demo.sana.csail.mit.edu/downloads/mds-current.zip)

Execute the following in a terminal window:

1.  Extract the archive **unzip mds-current.zip**
2.  Follow the installation instructions in either the INSTALL or UPGRADE files.

### Create MySQL database for MDS

From a command prompt:

1.  **mysql –u root –p** (enter root password when prompted)
2.  **create database mds;**
3.  **create user 'mds'@'localhost' identified by '<enter mds password>';**
4.  **GRANT ALL ON mds.\* TO 'mds'@'localhost';**

##### Configure MDS (Update settings file)

1.  cd /opt/sana
2.  sudo mv settings.py.tmpl settings.py
3.  sudo nano settings.py
    Example settings:
    1.  DATABASE_ENGINE = 'mysql'
    2.  DATABASE_NAME = 'mds'
    3.  DATABASE_USER = 'mds'
    4.  DATABASE_PASSWORD = '<put in your mds password from above>'
    5.  DATABASE_HOST = ''
    6.  DATABASE_PORT = ''
    7.  MEDIA_URL = '/mds/media'
    8.  MEDIA_ROOT = '/opt/sana/media'
    9.  ADMIN_MEDIA_PREFIX = '/mds/media/admin'
    10. OPENMRS_SERVER_URL='<http://><IPaddress>:8080/openmrs/'
         (Remember the trailing slash!)

        TEMPLATE_DIRS = (
        '/opt/sana/templates',
        )

4.  **./manage.py syncdb** Will create the mds databasetables
5.  You may create a login account (for accessing the Django admin interface)

##### Configure Apache to serve the MDS

1.  sudo nano /etc/apache2/sites-enabled/000-default
    1.  Add a handler for the /mds location. Insert this <Location> block somewhere inside the <VirtualHost> block.

        <Location "/mds">


        SetHandler python-program

        PythonHandler django.core.handlers.modpython

        PythonDebug On

        SetEnv DJANGO_SETTINGS_MODULE sana.settings

        PythonPath "['/opt'] + sys.path"

        PythonInterpreter mds

        PythonOption django.root /mds

        </Location>

        <Location "/mds/media">


        SetHandler none

        </Location>

2.  sudo ln -s /opt/sana /var/www/
3.  sudo ln -s /usr/local/lib/python2.6/dist-packages/django/contrib/admin/media /opt/sana/media/admin
     (or sudo ln -s /usr/lib/pymodules/python2.6/django/contrib/admin/media/ /opt/sana/media/admin)
     <b>If you're using Python 2.5, replace python2.6 in this path with python2.5</b>
4.  sudo apache2ctl restart

You should now be able to verify that the MDS is running on Apache by navigating with a browser to: <http://localhost/mds/> You should see the same 'Sanamobile MDS Online' message that was shown before in the Development Server step, except now the MDS is being served by Apache, which is more suitable for production purposes.

##### Make sure OpenMRS on public IP address

1.  sudo nano /etc/tomcat6/server.xml
2.  Add address tag with the IP address
    1.  <Connector port="8080" protocol="HTTP/1.1"<br /> address="0.0.0.0"
         connectionTimeout="20000"
         redirectPort="8443" /\>

3.  sudo /etc/init.d/tomcat6 restart

##### Test request to verify MDS / OpenMRS Connection

To verify that the MDS and OpenMRS are successfully connected, you can use this test request to have the MDS connect to the OpenMRS and verify the credentials provided. Make sure to replace <your OpenMRS admin password> with the password for the OpenMRS admin account. The MDS should respond with a JSON file -- if you open it up, it should have information about whether the request succeeded.

1.  You can check that it works by <http://><ipaddress>/mds/json/validate/credentials/?username=admin&password=<your OpenMRS admin password>

##### Setup SMS Messaging with the MDS

1.  Make sure you have an SMS gateway hooked up to your MDS. You can get a clickatell account for sending SMS messages by applying here: <http://www.clickatell.com/login.php>
    1.  Sign up for a Clickatell Central API account
    2.  Buy SMS credits
    3.  Setup a "moca mds" HTTP connection, which should give you a numerical API ID, which you need to enter below in the settings.py file

2.  In the MDS settings.py file, you'll need to fill in the appropriate values here according to your registered account:
    1.  CLICKATELL_URI = "<http://api.clickatell.com/http/sendmsg>?%s"
    2.  CLICKATELL_USER = ''
    3.  CLICKATELL_PASSWORD = ''
    4.  CLICKATELL_API = ''

3.  Make sure you have a SIM card in your phone, and in the Moca phone app settings page, the Phone Number field should be the phone number of the phone you're using. When you upload a case to Moca, it should show up in the Queue with contact \# being the phone number of the phone.
    1.  Make sure the phone number is entered properly with the country code found here: <http://www.clickatell.com/products/test_gateway.php>
    2.  Example, a US phone number that is 617-234-3928 would be entered in the phone as 16172343928 because the US country code is 1.

