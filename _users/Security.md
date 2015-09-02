---
title: Security
---

Below is a list of recommendations and issues to consider, in order to ensure the security of your implementation of Sana and maintain confidentiality and integrity of patient data.

Phone Security
--------------

#### Screen Locking Pattern

To prevent unauthorized individuals from being able to upload false patient data to OpenMRS, it is strongly recommended to enable the pattern screen unlock option on the Android phone (the feature is off by default). With this feature, if there is no interaction with the phone after several minutes, the screen will automatically lock until the correct user enters their secret pattern in.

1.  Go to Home \> Menu \> Settings
2.  Select "Security & Location"
3.  Select "Set Unlock Pattern"
4.  Follow on-screen instructions to draw an unlock pattern.
5.  Back on the "Security & Location" menu, select "Require pattern"
6.  Feel free to change the two settings directly beneath that
    1.  Unselect "Use visible pattern" (to prevent others visibly seeing your unlock pattern)
    2.  Select "Use tactile feedback" (to make it easier to know if you are entering in the right pattern)

#### Preventative Measures Against Mobile Threats

Using cell phones can introduce a whole host of vulnerabilities including mobile specific or Internet viruses, so to take cautionary measures, the healthcare worker should not use the phone for unnecessary web browsing or other uses aside from telemedicine. The healthcare worker should have their own phone for personal calls and uses. Another option to look into is anti-virus software for the phone.

#### Preventing Theft

Because these Android phones are expensive (on the order of hundreds of dollars), be cautious about protecting the devices from theft. Lock them in a secure place after use and do not leave them out in public view.

Keep an inventory of phones so you know which healthcare workers have which phone (note down the serial number of the phone and when they received it), so that each worker is responsible and liable for their phone.

Computer Security
-----------------

#### Screen Timeout Password

Ensure that the computer has the password-protected time-out functionality turned on.

#### Email Encryption

Sana has the ability to notify healthcare providers by email about new cases and the resulting diagnoses. Ideally there shouldn't be any personal health information being transmitted using email because it isn't secure and doesn't allow for organized tracking of patient's health over long periods of time. If email is necessary for notification purposes, then be sure to turn on the SSL encryption setting on.

1.  For example, in Gmail:
    1.  Go to top right corner and click "Settings"
    2.  Under "General Settings" \> "Browser Connection, select "Always use https"

SSL Encryption System Configuration Settings
--------------------------------------------

### Requirements

1.  Apache version 2.2 or higher installed
2.  Tomcat version 6.0 or higher.

### Installation

On an Ubuntu system execute:

` sudo apt-get install apache2.2-common apache2-utils tomcat6`

Sever Configuration
-------------------

Prior to configuring your Apache and Tomcat servers, you will need to either create your own self-signed certificate (only for testing purposes, not advised for deployments) or get one signed by a trusted certificate authority.

Instructions for generating your own self-signed certificate

Generate the keys, enter a pass phrase when prompted

` openssl genrsa -des3 -out server.key 1024`
` openssl rsa -in server.key -out server.key.insecure`

**Warning:** "You can also run your secure service without a passphrase. This is convenient because you will not need to enter the passphrase every time you start your secure service. But it is highly insecure and a compromise of the key means a compromise of the server as well" [Ubuntu server guide.](https://help.ubuntu.com/12.04/serverguide/certificates-and-security.html)

Use one of the following depending on which key you would like to use:

` openssl req -new -key server.key -out server.csr`
` openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt`
`       **OR**`
` openssl x509 -req -days 365 -in server.csr -signkey server.key.insecure -out server.crt`

You will be prompted for some information.

1.  Type in country, state, city, org, common name
2.  Skip challenge password and company name

Finally, copy your key and certificate to the ssl configuration directories

`sudo cp server.crt /etc/ssl/certs`
`sudo cp server.key /etc/ssl/private`

### Apache Configuration

**Important!** SSL encryption requires version 1.1 or higher of the Android client. Requires the AJP connector which is available as part of the **libapache2-mod-jk** package. Additional proxy mods should be installed by default.

Create a new site file:


**sudo touch /etc/apache2/sites/available/sana-ssl**

open the file and copy the sample configuration below:


**sudo nano /etc/apache2/sites-available/sana-ssl**

Apache site configuration for Sana using mod_ssl:

` ##############################################################################`
` # Sample SSL config file for Sana`
` # version: 1.1`
` # Author: Sana Development`
` ##############################################################################`
` `<IfModule mod_ssl.c>
`   `<VirtualHost *:443>
`       # Replace with local admin email`
`       ServerAdmin webmaster@localhost`
`       # Uncomment and replace $HOST with domain name if registered`
`       #ServerName $HOST`
`       DocumentRoot /var/www`
`       SSLEngine on`
`       SSLOptions +StrictRequire`
`       SSLCertificateFile    /etc/ssl/certs/server.crt`
`       SSLCertificateKeyFile /etc/ssl/private/server.key`
`       `<Directory />
`               Options FollowSymLinks`
`               AllowOverride None`
`       `</Directory>
`       `<Directory /var/www/>
`               Options Indexes FollowSymLinks MultiViews`
`               AllowOverride None`
`               Order allow,deny`
`               allow from all`
`       `</Directory>
`       ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/`
`       `<Directory "/usr/lib/cgi-bin">
`               AllowOverride None`
`               Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch`
`               Order allow,deny`
`               Allow from all`
`       `</Directory>
`       # Logging`
`       ErrorLog /var/log/apache2/error.log`
`       CustomLog /var/log/apache2/ssl_access.log combined`
`       # Possible values include: debug, info, notice, warn, error, crit,`
`       # alert, emerg.`
`       LogLevel warn`
`       # mDS Section`
`       `<Location "/mds">
`           SetHandler python-program`
`           PythonHandler django.core.handlers.modpython`
`           # Use moca.settings for 1.0.x releases of mds`
`           SetEnv DJANGO_SETTINGS_MODULE sana.settings`
`           PythonPath "['/opt']+sys.path"`
`           PythonInterpreter mds`
`           PythonOption django.root /mds`
`           # Uncomment the following two lines when debugging mDS`
`           #PythonDebug On`
`           #PythonAutoReload On`
`       `</Location>
`       # Should be the same as the MEDIA_URL in settings.py`
`       `<Location "/mds/media">
`           SetHandler none`
`       `</Location>
`       # Proxy Section - required when Apache is forwarding to Tomcat`
`       ProxyRequests Off`
`       ProxyPreserveHost On`
`       ProxyStaus Off`
`       # Use proxy to restrict the need for a port in the URL`
`       # Replace localhost if tomcat is not running locally`
`       ProxyPass /openmrs ajp://localhost:8009/openmrs`
`       ProxyPassReverse /openmrs ajp://localhost:8009/openmrs`
`   `</VirtualHost>
` `</IfModule>

After the file is in the **/etc/apache2/sites-available** directory, perform the following:

` `**`a2enmod` `proxy`**
` `**`a2enmod` `proxy_http`**
` `**`a2enmod` `proxy_ajp`**
` `**`sudo` `a2enmod` `ssl`**
` `**`sudo` `a2ensite` `sana-ssl`**
` `**`sudo` `service` `apache2` `restart`**

### Tomcat Configuration

We will use Apache to handle the SSL encryption and merely forward unencrypted as the requests are forwarded by Apache to Tomcat. We will also allow the local mds to send requests directly to OpenMRS unencrypted through port 8080. You will need to edit your **/etc/tomcat6/server.xml** file to have the following connectors:

`   `<Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
`   `
`   `<Connector port="8443" protocol="HTTP/1.1" maxThreads="150"/>
`   `
`   `<Connector port="8009" protocol="AJP/1.3" redirectPort="8443" />

Lastly, restart Tomcat:

` sudo service tomcat6 restart`

### Firewall Configuration

The simplest mechanism for configuring the firewall on the recommended Ubuntu system is to use the **ufw** tool. The following commands will block all non local traffic except to the secure ports:

` sudo ufw enable`
` sudo ufw allow 443`
` sudo ufw allow proto tcp from 192.168.0.0/24 to any port 8081`

*Note* You will need to **allow** any other ports used by other services you will be running. For more information, consult the [firewall](https://help.ubuntu.com/12.04/serverguide/C/firewall.html#firewall-ufw) portion of the Ubuntu server guide.

### Testing the Connection

Finally, open a browser and test that the following can be reached.

` `[`https://$HOST/mds/`](https://$HOST/mds/)
` `[`https://$HOST/openmrs/`](https://$HOST/openmrs/)

*Note:* If you used a self signed certificate you will likely get a warning.

### Client Compatibility and Configuration

For the Android client app to be compatible with these server changes, download the 1.1 version of the application and select **Secure Transmission** from **Menu --\> Settings --\> Sana Network**

[<File:client_settings.png>](/File:client_settings.png "wikilink") [<File:network_settings.png>](/File:network_settings.png "wikilink")

#### Resources

HTTPS Configuration on Apache Server <https://help.ubuntu.com/12.04/serverguide/C/httpd.html>

Certificates <https://help.ubuntu.com/12.04/serverguide/C/certificates-and-security.html>

Firewall <https://help.ubuntu.com/12.04/serverguide/C/firewall.html#firewall-ufw> firewall

Setting up Tomcat on HTTPS using Apache <http://www.ctrip.ufl.edu/howto-install-mod_proxy_http-apache2-tomcat6-debian-lenny>

Password-Protection of MDS
--------------------------

1.  htpasswd -c .htpasswd username (where username is substituted for your username)
2.  Go to the **mds/media** folder that you want to password protect. For standard installations this will exist as **/opt/sana/media** on the file system.
    1.  Create a password file
    2.  sudo nano .htaccess
    3.  Copy this into that file and replace valid-user with your username and replace the full path to the .htpasswd file

`      AuthUserFile /full/path/to/.htpasswd`
`      AuthType Basic`
`      AuthName "MediaFolder"`
`      Require username`

1.  (Optional) Add more users
    1.  htpasswd .htpasswd username2

2.  sudo apache2ctl graceful

##### Resources

Password Protecting Your Pages with Htaccess <http://www.elated.com/articles/password-protecting-your-pages-with-htaccess/>

Authentication
--------------

#### Healthcare Worker Authentication

As mentioned above, we need a mechanism for authenticating the healthcare worker, so that false information is not uploaded to the Sana queue and wasting the time of specialists reviewing the cases. If an adversary got their hands on a phone and uploaded many, many cases, they could launch a Denial of Service attack such that other healthcare workers and patients who actually need medical expertise would not be able to receive it in a timely manner.

Currently Android phones do not have support for fingerprint recognition or other biometrics (except for handwritten signatures on the touchscreen), but you can look into other methods of authentication such as existing stand-alone biometric authentication devices, smart cards, voice recognition software, and etc...

#### Patient Authentication

It is crucial to be able to link a patient with the right electronic health record. For a difficult case, a specialist may scan through the history of a patient in the medical record system to look for indications to help in diagnosis. Hence, we never want to upload data for a patient into the record of another patient.

Unfortunately, there is a high error rate for healthcare providers typing in patient medical record numbers incorrectly into a computer. In addition, with a small keyboard on the phone, a person is more likely to hit the wrong key unknowingly and the number of data entry errors will increase. Hence, we strongly recommend the use of the barcode reader that has been integrated into Sana for patient authentication (instead of simply manually typing in the patient's ID number).

There should be a systematic method for issuing ID card to patients with these medical record numbers. With an organized system, we can ensure that no two patients have the same ID number (otherwise their records would be mixed when data is uploaded). We recommend building off the ID card module (http://www.sanamobile.org/development/index.php?title=Learn_about_OpenMRS\#ID_Cards) already available in OpenMRS and customizing it to fit your workflow.

#### Specialist Authentication

Since the specialist will be making the diagnosis for the patient, it is very important that this person is identified properly. Because they will be interacting with Sana through the OpenMRS interface, they should at the minimum have their own username/password. (In case you're interested, passwords in OpenMRS are not stored in plaintext, the hash of the password is stored instead for security reasons. Passwords in OpenMRS are also required to be a certain length, with upper and lowercase letters and symbols, so the password should be difficult to guess. As a pointer, do not use words that appear in the dictionary for your password). The OpenMRS admin account should not be given out to doctors. The admin account has the ability to create/delete users, change their passwords, etc... so this is not something that the medical specialists should have access to.

If you have time and resources available, you can consider integrating biometrics or other types of authentication to OpenMRS for access to the Sana queue of patient cases (i.e. requiring fingerprint for system entry, a retina scan, or barcode scanning). Sana currently does not have support for these features yet, but if you do make these changes, we welcome you to share these changes as our other partners could also make use of this.

Physical Security
-----------------

It is important to take measures to create a physically secure environment for the hardware devices involved in the telemedicine system. Physical security means protecting the site from natural disasters, theft, intrusion, accidents, and vandalism (NCES). The most sophisticated infrastructure could be put in place to protect the data but if the server is physically easily available to outside hackers, then there isn’t much protection because the system is as strong as its “weakest” component. To start off, the server should be located in a place that is locked away in a data center or location where it cannot be tampered with. Depending on how critical the data is and the financial resources available, one may also consider installing locks, window bars, security cameras, alarms, and having security guards to protect the server.

In Sana, because the specialist is no longer tied to a specific location, we can’t be sure about what environment the specialist will be located in. He could be answering referral inquiries in a very public place such as on a public transit vehicle or in his own home with family members walking around. To prevent over-the-shoulder attacks, it can also be recommended that the specialist has a computer screen cover. Alternatively, a security policy could be enforced that restricts the location of the review process to the hospital computer or home office.

Physical security can be designed by first doing a risk assessment of the perimeter where telemedicine transactions will be performed. Then steps should be taken to address each of those physical threats. Examples include storing away laptops or other expensive equipment, shredding confidential documents no longer needed, labeling equipment as belonging to the organization, and separating general equipment from those with sensitive information. There should also be a protocol to follow in case an emergency does happen (i.e. fire or intruder).

Assessment of Site-Specific Potential Security Weaknesses
---------------------------------------------------------

The clinical application that Sana will be used in will involve a slightly different workflow at each site. Hence, it is important to do a site-specific assessment of the workflow to identify potential loopholes for adversaries to access and tamper with the patient data. Then appropriate security procedures can be put in place to address those issues.

Training
--------

It's appropriate to hold training sessions to teach users to be conscious of the patient data privacy laws local to your country and how they can perform safe practices to ensure the system is secure.

Internal Audits of the Security Procedure
-----------------------------------------

Like any policy, it is useless unless enforced. Hence, random audits should be performed to check that the system is properly secured according to the policy and protocol decided upon. Monitoring and evaluating the actual practices of the healthcare workers and specialists involved can provide useful insight into what improvements or changes to the policy are needed, and will be a continual feedback loop. Through quality assurance, we can gain confidence that the patients are receiving the same standard of care as in face-to-face consultations.

References
----------

-   For more information on HIPAA Security Rule, visit the U.S. Department of Health and Human Services website: <http://www.hhs.gov/ocr/privacy/hipaa/administrative/securityrule/index.html>
