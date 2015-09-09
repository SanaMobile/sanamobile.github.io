---
title: Roadmap
permalink: /Roadmap/
---

**-- This roadmap is currently being revised and will be updated soon --**

; **Sana Development**

;

Code repository move
====================

Remove last vestiges of the Moca name and move all source code to the git based [Sana Googlecode](http://code.google.com/p/sana/) repository. Old code will be preserved on the SVN site for future reference.

Stable Release 2.0
==================

Make a full release with new features in Android Client, MDS, and OpenMRS modules. Test all of the pieces together, package, and release. Call this Sana 2.0.

MDS
---

1.  Modularize backend integration structure as a Web service client lib.
2.  Implement REST API using Piston.
3.  Implement updated data model.
4.  Bidirectional support for data model.
5.  Ability to run as simple, stand-alone, backend.

OpenMRS Module Improvements
---------------------------

1.  Single unified queue and viewer module.
2.  Support for OpenMRS 1.9. This means Mavenizing the module.
3.  Incremental support for REST interface provided by OpenMRS Webservices.REST module API.(This will likely be longer term for complete support.)

Android client
--------------

1.  Update the data model including changing to the new naming conventions.
2.  Move to Fragment based UI including ActionBarSherlock integration.
3.  Modularize client project into library and application.
4.  Update the XML support.
5.  Update the network libraries.
6.  Increased bi-directional data flow.
7.  Encounter scheduling and updating.
8.  Plugin API

Unit Testing
------------

We need to start introducing proper unit testing to the greatest extent possible. Since much of this needs to be backported in, the process should start with the most fundamental features and then slowly introduce to the full source code.

Longer term goals
=================

Remote Client Management
------------------------

Design an administrative console, probably as part of the MDS, which will allow implementers to track the GPS locations of phones. Also allow lost or stolen phones to have system privileges disabled and for sensitive data to be wiped on receipt of a secure remote signal. Implement corresponding changes to the client.

Application independent client library
--------------------------------------

The basic idea will be to have the base client functionality, network and data structures, available as a client library that can be used by 3rd party applications independent of the official Sana client application. This must be refactored into Android and non-Android libraries. Some parts of this will be introduced in version 2.0 but full implementation should be considered a longer term project.