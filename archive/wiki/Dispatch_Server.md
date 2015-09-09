---
title: Dispatch Server
---

Version 2.0 of the dispatch server, or mds, will introduce the updated data model and a consistent RESTful interface for accessing it.

REST API
========

The Piston library is integrated and provides basic CRUD methods for accessing each of the data model objects.

Message dispatching mechanism
=============================

Support for one or more network accessible backends will be included as well running as a stand alone record store. Tasks for each backend will be stored as a list of callbacks within the handler for each model which will be executed upon receipt of a request. Sending to each backend will be implemented as a simple mapping of the Sana data model into, and out of, the data model for each. By default, support for OpenMRS will be included.

* * * * *

Back to [Version 2.0](/Version_2.0 "wikilink") overview.