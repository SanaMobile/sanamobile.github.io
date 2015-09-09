---
title: Developer Guide
label: Developer Guide
---
# Developer Guide
This document contains information for getting started with developing
the components of the Sana platform. Additional information on confguring
the components when installed can be found in the [User Guide](/users/)

## Source Code
Code for all Sana developed components of the platform are available on the
[Sana Github](https://github.com/SanaMobile) site. Please see links below
additional details on building specific components.

- [Android Mobile Client](#android-mobile-client)
- [MDS](#mds)
- [OpenMRS Module](#openmrs-module)

### Contributing
Sana is an open source platform and community contributions are highly
encouraged and appreciated. If you are interested in contributing to the
source code, please follow the instructions below:

  1. Create a Github account if you do not have one.
  2. Create a fork of the repository you will be working on.
  3. Edit, test, commit, and push your changes to the fork your created
  4. Submit a pull request to the Sana repository.

After submitting your pull request, members of the Sana development team will
review your changes and merge any that are appropriate for the official
repository.

For more information on working with git and GitHub, please consult the
following references.

  * [Official Git Documentation](http://git-scm.com/doc)
  * [Pro Git Book](http://git-scm.com/book)
  * [Git Tutorials](http://git-scm.com/doc/ext)
  * [GitHub: Fork a Repo](https://help.github.com/articles/fork-a-repo/)
  * [GitHub: Using pull requests](https://help.github.com/articles/using-pull-requests/)

### License
All Sana software products are available under a new BSD open-source license
to increase availability and encourage community contribution. Please see the
[License](/license/) page for thefull text.

## Android Mobile Client
The source code for the Sana Android mobile client is a gradle based project
intended to be built using Android Studio. Android studio has a number of
features that developers should find useful when working with Android based
projects.

### System Requirements

  * [Android Studio](http://developer.android.com/sdk/index.html) Additional prerequisites are required for installing Android Studio. Please see the [System Requirements](http://developer.android.com/sdk/index.html#Requirements) for Android Studio for your platform
  * The Android support libraries available for installation through the SDK manager.
  * Emulator or Hardware device connected via USB with API level 7 or higher.
Notes: If you do not have a hardware device available, additional instructions
for creating an emulator are available on the Android Developer Site's
[Managing Virtual
Devices](http://developer.android.com/tools/devices/index.html) page. Hint: If
your workstation includes an Intel processor with hardware virtualization
support and you are developing on Windows, you will find the emulator runs
significantly faster if you also install the  [**Intel Hardware Accelerated
Execution Manager **](http://developer.android.com/tools/devices/emulator.html
#accel-vm) available through the SDK manager.

### Source Code
Source code for the Android based mobile client is available by cloning the
sana.mobile repository. ` git clone
https://github.com/SanaMobile/sana.mobile.git ` We highly recommend creating a
Github account and forking the repository in lieu of directly cloning the
repository so that any changes that you may make may be more easily
contributed to the platform via a pull request.

### Import, Build, and Run instructions
The recommended method for building the code is to use Android Studio. The
following steps should allow you to obtain, build, and run the code with
minimal difficulty.

  1. Open Android studio.
  2. Import project from Version control.
  
        [![Android Studio](http://sana.mit.edu/mobile/wp-content/uploads/sites/3/2015/01/android_studio-300x226.png)](http://sana.mit.edu/mobile/wp-content/uploads/sites/3/2015/01/android_studio.png)
  3. Enter either the url for the official Sana repository listed above 
      or a fork under your own account if you created one.
 
        [![VCS](http://sana.mit.edu/mobile/wp-content/uploads/sites/3/2015/01/as_vcs-300x226.png)](http://sana.mit.edu/mobile/wp-content/uploads/sites/3/2015/01/as_vcs.png) [![Github Import](http://sana.mit.edu/mobile/wp-content/uploads/sites/3/2015/01/as_github-300x76.png)](http://sana.mit.edu/mobile/wp-content/uploads/sites/3/2015/01/as_github.png)
  4. Select the defaults presented on the import page.
  5. When the gradle project has finished importing and building, select
      the app module and press run.
  6. When the app starts you will be presented with an authentication 
      screen. The resources in the source code includes a flag that
      loads a set of default credentials which will successfully 
      authenticate against the Sana demo server.

For additional details on working with Android Studio, including testing and
debugging, please consult the
[Workflow](http://developer.android.com/tools/workflow/index.html) page on the
Android Developer site.

### **Code Structure**

The gradle based project is split into three distinct modules.

  1. **api** - A pure java library that includes the POJO's, network 
      functions, and utilities for processing data.
  2. **api-android** - Android implementation and wrappers around the pure Java api
  3. **app** - The code and resources for the Android based application.

Visually you should see something similar to the following when looking at the
project in Android Studio. 

[![Project](http://sana.mit.edu/mobile/wp-content/uploads/sites/3/2015/01/as_project-300x246.png)](http://sana.mit.edu/mobile/wp-content/uploads/sites/3/2015/01/as_project.png) 

The motivation for splitting the project into the three discrete modules
was to allow developers who may be interested wished to implement an 
alternate frontend, develop a client on another platform, or otherwise 
may find some portion of the libraries useful to do so more easily. The
following sections contain additional details and features of each
project that should assist developers working with the code.

### api Module
The **api** module provides a pure Java library that contains the POJO's that
correlate with the data model used by the client, basic network code for
communicating with the Sana middleware, and a number of utility functions.

### api-android Module
The **api-android **module contains source code for non-application classes
and interface to work with the Sana mobile code including communication with
MDS.

### app Module
The ** app **module contains the source code for the front end visual
components and classes specific to the application.

### Additional Information
Please consult the pages below for additional topics related to the mobile
client.

- [Plugin Architecture](./plugins/)
- [Custom Procedures](/users/procedures/)

## MDS
MDS, or mobile dispatch server, is the Sana developed middleware layer
designed to act as an intermediary between the Sana mobile client  and an EMR
or other backend. The stock MDS source code also includes a lightweight web
interface as an alternative backend for storing and accessing data through a
web browser. The alternative backend, or standalone MDS, is not intended to be
a replacement for a full EMR.

### System Requirements
  1. Linux Host - We recommend and support [Ubuntu 14.04 LTS](http://www.ubuntu.com/download/server). All additional requirements below are available for installation using the package manager. Additional details for installing manually on an Ubuntu host are available in the doc directory of the source.
  2. [Git](http://git-scm.com/downloads)
  3. [Python 2.7](https://www.python.org/download/releases/2.7/)
  4. [PILPython Imaging Library](https://pypi.python.org/pypi/PIL)
  5. [Django 1.6](https://www.djangoproject.com/download/)
  6. [django-piston 0.2.3](https://pypi.python.org/pypi/django-piston/0.2.3)
  7. [Django Extensions](https://pypi.python.org/pypi/django-extensions)
  8. [python-lxml](http://lxml.de/)
  9. [python-libxml2](https://pypi.python.org/pypi/libxml2-python)
  10. [python cjson](https://pypi.python.org/pypi/python-cjson/1.1.0)
  11. [python-mysql](https://pypi.python.org/pypi/MySQL-python/1.2.5) and/or other python database connector-e.g. [python-sqlite3](https://docs.python.org/2/library/sqlite3.html)

### Source Code
Source code for MDS is available on
[GitHub](https://github.com/SanaMobile/sana.mds).

  git clone https://github.com/SanaMobile/sana.mds.git

### Running
Use the standard Django admin functions to run the app as a server, [django-
admin.py](https://docs.djangoproject.com/en/1.6/ref/django-admin/). For
production use, we recommend running MDS on Apache or other server. Sample
Apache conf files are included in the source.  Please consult the Django
documentation for more information.

### Additional Information

  * [REST API](/developers/mds/rest_api/)
  * [API Docs](/developers/mds/api/)


## OpenMRS Module
The Sana OpenMRS Encounter queue module is designed to create the storage,
management, and visual interface which will allow clinicians to see patient
visits that are pending review.

[API Docs](/openmrs/api/)

### Build Instructions

#### System Requirements

  1. Linux based host - We recommend and support
      [Ubuntu 14.04 LTS](http://www.ubuntu.com/download/server).
  2. [MDS](/mds/)
  3. [Git](http://git-scm.org/downloads)
  4. [Eclipse Java EE Edition](https://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/junosr2)
  5. Eclipse Maven Plugin - [M2E](http://eclipse.org/m2e/)
  6. [Apache Tomcat](http://tomcat.apache.org/download-60.cgi) Server
  7. OpenMRS, installed and configured as per the [User Guide](/server_guide/)

#### Source Code

Source code is available on the Sana
[GitHub](https://github.com/SanaMobile/sana.openmrs) repository.

  git clone https://github.com/SanaMobile/sana.openmrs.git

#### Building and Running

Import the project into Eclipse using the Maven plugins "Import from SCM"
function using the Github url above. Run the project as maven clean install
Install Apache Tomcat and OpenMRS on your linux based hostDeploy to your
OpenMRS installation using the Administration --> Manage Modules page.

#### Additional Information

  1. [OpenMRS API](http://resources.openmrs.org/doc-1.9/) docs
  2. [Sana Encounter Queue API](http://demo.sana.csail.mit.edu/docs/openmrs) docs
