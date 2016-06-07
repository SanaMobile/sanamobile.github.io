---
layout: default
title: Sever Guide
label: server Guide
collection: users
---
# Server Guide

## Installation
This section details installation of the server side components using 
the Ubuntu 14.04 LTS packages provided by Sana. The Sana packages will 
install any prerequisite software on the server. Sana does not provide
support for installation of server components on other linux
distributions. If you are interested in doing so, please consult the 
[Manual Install]({{ site.baseurl }}/users/manual_install/) page for a 
complete list of prerequisites and instructions.

### Package Installation procedure

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
 
