---
title: Packaging
---

The recommended installation method for Sana is Ubuntu packages. These packages should be built using the "dpkg" command-line program, which is available on Ubuntu and Debian and has been ported to numerous other distributions.

Please note that the Sana development team does not use all available features of Debian/Ubuntu packaging. In particular, we separate compiling our code from the packaging process, and end-user configuration is handled in a shell script rather than debconf. This workflow gives us good flexibility.

Adaptations from SVN Repository
===============================

Versioning
----------

Use the exact version number of software from the Sana SVN repository. Append a revision number, "r\#," to this version number to indicate revisions to the package that do not reflect major changes to the actual software.

File Placement
--------------

Include the MDS under /opt/sana. Place OpenMRS modules in /opt/sana/modules/openmrs. Place sanashell in /usr/bin.

Pre-Package Layout
==================

Before building a package, you should organize all necessary files into a single directory. The naming convention for this directory is sana-\#.\#.\#-r\#. Within this directory, there must be another directory named DEBIAN (case sensitive). The DEBIAN directory contains packaging information and other metadata. Other subdirectories should mirror paths from the root of an Ubuntu Linux filesystem. For example, a recent version of Sana has the following layout:

    [arisna@devbox debian]$ ls -l sana-1.0.0-r5/*
    sana-1.0.0-r5/DEBIAN:
    total 44
    -rw-r--r-- 1 arisna arisna   568 Jul  1 08:07 control
    -rw-r--r-- 1 arisna arisna 31545 Jun 23 14:33 copyright
    -rwxr-xr-x 1 arisna arisna  1623 Jun 26 01:05 postinst
    -rwxr-xr-x 1 arisna arisna   166 Jun 23 14:56 prerm

    sana-1.0.0-r5/etc:
    total 0
    drwxr-xr-x 3 arisna arisna 28 Jun 23 14:16 apache2

    sana-1.0.0-r5/opt:
    total 0
    drwxr-xr-x 6 arisna arisna 146 Jun 25 03:10 moca

    sana-1.0.0-r5/usr:
    total 0
    drwxr-xr-x 2 arisna arisna 22 Jun 26 07:09 bin
    drwxr-xr-x 3 arisna arisna 16 Jun 23 14:37 share

The DEBIAN Directory
--------------------

This directory contains several files used by the Aptitude package manager for installation, upgrading, and removal.

### The control File

This file contains a number of fields delimited by colons and newlines. Of particular importance is the "Depends" field, which pulls in a list of requisite packages for the operation of Sana. An example follows.

    Package:  sana
    Version:  1.0.0-r5
    Section:  net
    Priority:  optional
    Architecture:  all
    Essential:  no
    Depends:  openmrs, python-django, python-django-piston, python-django-requestlog, python-mysqldb, python-cjson, apache2, libapache2-mod-python, mysql-server, sun-java6-jre
    Replaces:  sana-mds, sana-openmrs-modules
    Installed-Size:  2500
    Maintainer:  John Blakeney <XXXX@mit.edu>
    Homepage:  http://www.sanamobile.org
    Description:  Telemedicine platform built on OpenMRS.  This is the server
        software only.  Android client software should be obtained separately.

### Installation Scripts

Scripts named "preinst," "postinst," "prerm," and "postrm" can be used to run shell commands during installation and removal. Sana currently uses "postinst" and "prerm" scripts only. They print messages, manage server daemons, and modify configuration files for other software as needed. These scripts must be marked executable with the "chmod" command.

### The copyright File

This file contains license and copyright information about Sana. If you add software with different licenses and/or copyright holders, modify this file accordingly. Ensure that licenses are compatible before combining software.

Other Directories
-----------------

Place all other files into directories as if the "sana-\#.\#.\#-r\#" directory were the root of a filesystem. For example, the copyright file should be copied to sana-\#.\#.\#-r\#/usr/share/doc/sana. When Sana is installed on an Ubuntu system, this file will be placed into /usr/share/doc.

Building Packages
=================

When all files are organized correctly, run the following command in the parent directory of sana-\#.\#.\#-r\#:

    dpkg -b sana-#.#.#-r#/ sana-#.#.#-r#.deb

Replace the \#'s with the correct numbers, of course. The version number must match what is included in the control file.

Copying Files to Repository
===========================

On www.sanamobile.org, all .deb files go in /var/www/packages/ubuntu. You can transfer the files using FileZilla or other SFTP clients, or even build the packages on the server and then copy them to the server folder. Please note that only the core development team has write access on sanamobile.org.

Building a Package Index
========================

When package version numbers are incremented, the package index file included in the repository must be updated. Package managers fetch this file and use it to check for the availability of new packages and updates. Run the following command in the directory /var/www/packages/ubuntu:

    dpkg-scanpackages . | gzip -9c > sana/Packages.gz

This places the index file into the subdirectory "sana," which is what package managers will expect.