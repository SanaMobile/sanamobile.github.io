---
layout: page
title: Installation
permalink: /users/installation/
---
# Quick Installation Guide

## Overview

This page and linked documents describe installation, configuration, and
usage of the Sana platform for end users. A complete system will require
installation of the Mobile Client and server components.

### Mobile Requirements 
These are the general requirements for running the Sana mobile app.

1. One or more Android based smartphones with Android version 2.1 or 
later.
2. Internet access for smartphone(s) - WiFi or cellular data plan
3. Ubuntu 14.04LTS server with a 1 GHz or faster processor and at 
least 1 GB ram.

Additional details on any prerequisites are provided in the sections 
below

### Mobile Client
There are two basic methods for installing the mobile client on an 
Android based phone. Both require the following:

1. Android based device with Android version 2.1 or later</li>
2. Device configured to allow installation of applications from unknown 
sources. This option is available by navigating to 
**Settings → Application. **

#### Recommended Method
This method only requires the mobile device you wish to install the 
application on and an internet connection, either mobile or WiFi.

1. Open a web browser on the mobile device.
2. Enter the url of a copy of the mobile application. For example:

        http://demo.sana.csail.mit.edu/downloads/android/sana-current.apk```

    You should be provided the url by an adminstrator or others who provide 
    support for your deployment if you are not a developer and did not 
    compile the client directly.

    Note: If you have difficulty installing using this method and are 
    certain the url to the application is correct, you may want to consider
    using an alternative browser. The 
    [Dolphin](https://play.google.com/store/apps/details?id=mobi.mgeek.TunnyBrowser)
    web browser available through the Google Play store is free of charge 
    and known to work well when using this installation method.

#### Alternative Method
This method will require connecting the device to a PC with a USB cord
and possibly an internet connection.

1. Download or copy the application to your PC.
2. Connect the mobile device to the PC using a USB cord.
3. Copy the application to your mobile device.
4. Open a file browser on the mobile device and locate the copied file.
5. Press on the .apk file and you will be prompted to install.

### Server Components
This section details installation of the server side components using 
the Ubuntu 14.04 LTS packages provided by Sana. The Sana packages will 
install any prerequisite software on the server. Sana does not provide
support for installation of server components on other linux
distributions. If you are interested in doing so, please consult the 
[Manual Install]() page for a complete list of prerequisites and 
instructions.

#### Package Installation procedure

1. Log in to a terminal on your server
2. Add the Sana package repository to the list of sources using

        sudoedit /etc/apt/sources

    and insert the following line

        deb http://demo.sana.csail.mit.edu/packages/ubuntu/ sana/

3. Install the Sana packages with

        sudo apt-get install sana-mds

3. Follow the prompts to configure the Sana middlware, MDS
4. Open a web browser to your host-e.g. ```https://localhost/openmrs```
to initialize and configure OpenMRS.

#### Troubleshooting

## Packages
The server side components are available as complete, configured Ubuntu
14.04 LTS virtual machine images. We recommend using Virtual Box for 
general testing and demonstration purposes. For deployment, kvm or any 
similar vm manager available on your host is recommended. 
Alternatively, it is possible to install the vm image directly to a hard
drive and not require running the image as a guest os. 

...More details coming soon

## Available Deployment Packages
...Coming Soon

