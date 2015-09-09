---
title: Configuring Sana Dispatch Server to use FFmpeg
---

Introduction
------------

This document outlines the steps required to integrate FFmpeg with the Sana Dispatch Server. FFmpeg support is being included in MDS to allow for converting certain media files into formats which are reviewable in the Openmrs Sana flash media viewer. The installation instructions provided here support for decoding video and audio files recorded on Android handsets into flv and mp3 formats, respectively. This feature is available for versions 1.1 of the platform and higher.

Requirements
------------

-   A working ffmpeg installation with support for mp3 encoding and AMR NB encoding.
-   The server code which includes ffmpeg support.
-   Client with video and audio support-requires version 1.1 or higher.
-   OpenMRS installation with the following modules:
    -   Sana module ver. 1.1 or higher
    -   MediaViewer ver. 1.1 or higher

FFmpeg Installation
-------------------

If ffmpeg is currently installed, you can test whether you have the required encoding and decoding support by typing:

`ffmpeg -formats | grep -e libopencore_amrnb -e libmp3lame`

If you do not see both of the following two lines, you will need to uninstall ffmpeg and follow the build intructions below.

`  EA    libmp3lame      libmp3lame MP3 (MPEG audio layer 3)`
`DEA    libopencore_amrnb OpenCORE Adaptive Multi-Rate (AMR) Narrow-Band`

You will need to enter the following line which will remove any installed ffmpeg packages:

`sudo apt-get remove libavcodec52 libavdevice52  libavfilter0   libavformat52  libavutil49   libpostproc51  libswscale0  ffmpeg`

**Build Instructions** The following commands will build and install ffmpeg with the necessary codec support. There is a not insignificant amount of software that is required for the process. Depending on what packages are already installed, you may need to download upwards of 300 MB worth of software. This includes development tools as well as required libraries. Also, compiling ffmpeg has been known to take 30 minutes or longer depending on the hardware.

`export VERSION="0.5.1"`
`sudo apt-get install libopencore-amrnb0 libopencore-amrnb-dev libmp3lame0 libmp3lame-dev dpkg-dev`
`apt-get source ffmpeg`
`sudo apt-get build-dep ffmpeg`
`dpkg-source -x "ffmpeg_$VERSION-1ubuntu1.dsc"`
`cd "ffmpeg-$VERSION"`
`DEB_BUILD_OPTIONS="--enable-libmp3lame --enable-libopencore-amrnb" fakeroot debian/rules binary`
`cd ../`
`sudo dpkg -i "libavutil49_$VERSION-*.deb"`
`sudo dpkg -i "libavcodec52_$VERSION-*.deb"`
`sudo dpkg -i "libavformat52_$VERSION-*.deb"`
`sudo dpkg -i "libavdevice52_$VERSION-*.deb"`
`sudo dpkg -i "libavfilter0_$VERSION-*.deb"`
`sudo dpkg -i "libpostproc51_$VERSION-*.deb"`
`sudo dpkg -i "libswscale0_$VERSION-*.deb"`
`sudo dpkg -i "ffmpeg_$VERSION-*.deb"`

Note: The order of package installation is important.

The above instructions are also available as as a single shell script [install_ffmpeg](http://sana-dev.mit.edu/util/install_ffmpeg?hl=en). To use the script, download and then run:

`chmod 755 install_ffmpeg`
`sudo install_ffmpeg`

This script was designed to work with ffmpeg-0.5.1 source package available from the Ubuntu repository. You may need to modify the VERSION variable in the script.

Installing with an existing MDS instance and updating the database
------------------------------------------------------------------

Depending on whether MDS was already installed and if you would like to preserve database entries. Instructions for those cases are outlined below.

##### Installing onto a machine with MDS already installed, discarding any database entries

You will need to drop the current mds database and then recreate as follows:

`mysql -u $USERNAME -p`
`drop database $MDS_DATABASE;`
`create database $MDS_DATABASE;`
`exit;`

Next, checkout the code from svn using the command above[1](http://www.sanamobile.org/development/index.php?title=Configuring_Sana_Dispatch_Server_to_use_FFmpeg#Getting_the_server_code). Copy the code to the /opt/sana directory. Note: You can preserve your settings.py file and apache configuration from the original installation. Finally, run

`sudo /opt/sana/manage.py syncdb`

##### Preserving database information from a previous MDS installation

The ffmpeg branch adds several fields to the model used for storing binary resources. Simply running *' manage.py syncdb*' will not accurately update the database. Instead you will need to do manually add the necessary columns by performing the following:

`sudo /opt/sana/manage.py dbshell`
`ALTER TABLE mrs_binaryresource ADD ( convert_before_upload tinyint(1) NOT NULL, conversion_complete tinyint(1) NOT NULL);`
`exit;`

Next, checkout the code from svn using the command above[2](http://www.sanamobile.org/development/index.php?title=Configuring_Sana_Dispatch_Server_to_use_FFmpeg#Getting_the_server_code). Copy the code to the /opt/sana directory. Note: You will need to update your settings.py file and apache configuration from the original installation although most settings can be copied over **//TODO Update complete instructions on this**. Finally, run

`sudo /opt/sana/manage.py syncdb`