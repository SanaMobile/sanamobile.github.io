---
title: Network Testing
permalink: /Network_Testing/
---

<font color=red>ATTENTION!</font> Content on this page is currently being updated in preparation for the 1.1 release of Sana. Please report any issues on the [<https://groups.google.com/forum/?hl=en>\#!forum/sana-users Sana users group.] Beta versions of the 1.1 release currently available on the [Sana Googlecode downloads](http://code.google.com/p/moca/downloads/list) page or through SVN.
Thanks,
Sana Development Team
October 13, 2011

Overview
========

This page holds instructions and resources for testing the network functionality of MDS and the Sana OpenMRS modules. It is intended to provide tools for basic functional testing as well as a simple model for testing the information flow from the mobile client through a subsequent review of the encounter by a remote clinician through the web interface. Configuration of the tests themselves should be minimal and primarily require setting the host, user name, and password values.

Terminology
===========

The following terminology is used in this document and/or in the [JMeter](http://jakarta.apache.org/jmeter/usermanual/index.html) documentation.

1.  **Test Plan** "A test plan describes a series of steps JMeter will execute when run. A complete test plan will consist of one or more Thread Groups, logic controllers, sample generating controllers, listeners, timers, assertions, and configuration elements." This is the top level grouping for the tests.
2.  **Thread Groups** Groups of elements which provide the threads which will send the network requests.
3.  **Sampler** Effectively, the individual http requests which expect a response.

Requirements:
=============

1.  **[JMeter](http://jakarta.apache.org/jmeter/)** A working copy of JMeter installed. Verified to work with 2.4 r961953 and the Ubuntu package available for ver. 10.04.
2.  **[Sana JMeter script](http://moca.googlecode.com/files/Sana_JMeter_1.1.jmx)** Simulates an encounter upload and review and save of the encounter in OpenMRS.
3.  **[Sana Test media](http://moca.googlecode.com/files/mds_test_media.zip)** Media files which should be used with the scripts.
4.  **Sana Server Software** Installation of all network components of the platform should have been completed according to instructions elsewhere on this wiki. The test scripts here have been tested with the upcoming 1.1 release of all components.

Please consult documentation for each component listed above for any additional prerequisites.

Installation
============

1.  **Sana.** components should be installed as per instructions elsewhere on this wiki.
2.  **JMeter.** Please consult installation instructions available in the [JMeter documentation.](http://jakarta.apache.org/jmeter/usermanual/get-started.html) Alternatively, you may want to consider using a package manager available in your system.
3.  **Sana test media.** The archive should be extracted and installed in your mds directories. The upcoming 1.1 version of mds will install into /opt/sana.
4.  **Script Installation.** When first started, JMeter should present a screen similar to the following with an empty test plan.

[<File:workbench.png>](/File:workbench.png "wikilink")

From the **JMeter** window menu, select:

`   `**`File` `-->` `Open`**

and then locate the **Sana_JMeter_1.1.jmx** listed in the requirements above in the file browser that opens and press **Open**.

For the rest of this tutorial, when configuration values in the screen shots or elsewhere, values such as **<Enter Value Here>** will appear.

Main Test Plan
==============

After completing the previous step you should see the following:

[<File:sana_jmx.png>](/File:sana_jmx.png "wikilink")

Required configuration values:

`   `**`host`**` The OpenMRS host name or IP address but do not add `[`http://`](http://)` in front.`
`   `**`port`**` Leave blank if using Apache to redirect to your Tomcat installation or set to 8080 to send directly to Tomcat`
`   `**`username`**` A valid OpenMRS user`
`   `**`password`**` A valid OpenMRS password for the previously specified user.`
`   `**`mds_host`**` The mds host name or IP address but do not add `[`http://`](http://)` in front. This will likely be the same as the value for `**`host`**` above.`
`   `**`mds_port`**` Leave blank if using Apache or set to 8000 if running mDS in stand-alone mode.`

Test Variables
==============

The variables declared in the following sections of the test plan, visible in the left pane of the window image above, should not require any modification:

`   `**`concept_names`**` The `**`concept`**` attribute values used for the encounters.`
`   `**`concept_desc_elem_question_vars`**` The `**`question`**` attribute values used for the encounters. `**`Note:`**` These must match the OpenMRS concept description fields for the concepts.`
`   `**`element_types`**` The `**`type`**` attribute values used for the encounters.`
`   `**`encounter_vars`**` The non-patient `**`answer`**` attribute values for the encounters.`
`   `**`patient_vars`**` The patient `**`answer`**` attribute values for the encounters.`
`   `**`openmrs_urls`**` The paths which get appended to requests sent directly to the OpenMRS server.`
`   `**`mds-1.x_urls`**` The paths which get appended to requests sent to mDS.`

Available Tests
===============

Before running any tests, please briefly review the following Thread Groups which provide the basis for testing your Sana installation. Once completed, continue to the section on running the tests whihc

OpenMRS Functional Tests
------------------------

The test plan provides non-exhaustive tests of the OpenMRS functions utilized by Sana.

[<File:omrs_functional_tests.png>](/File:omrs_functional_tests.png "wikilink")

The **omrs_functional_tests** thread group provides the following functional tests:

1.  **Authorization**. Simple login test.
2.  **Patient Creation.** Create a test patient with id of **1111111110** which can be retired once tests are complete.
3.  **List of all patients.** Checks the Sana modifications to the rest module which return a list of all patients.
4.  **Patient Query by ID.** Uses the REST module to perform a patient id query.
5.  **Sana Permissions.** Validates against the Sana module permissions check.
6.  **Text only encounter.** Uploads a text only encounter through the Sana module.
7.  **Encounters with one or more binaries.** Uploads encounters through the Sana module which include image files.

Sana mDS
--------

The functionality of the dispatch server is tested by sending requests to the urls which it recognizes.

[<File:mds-1.1_functional_tests.png>](/File:mds-1.1_functional_tests.png "wikilink")

The **mds_1.1_functional_tests** thread group provides the following functional tests:

1.  **Online check**. Sends a request to the top level mds path, typically *<http://hostname/mds>*.
2.  **Authorization**. Checks a user name and password indirectly against OpenMRS.
3.  **Patient Creation.** Create a test patient with id of **1111111111** which can be retired once tests are complete.
4.  **Patient Query by ID.** Perform a patient id query.
5.  **List of all patients.** Requests a list of all patients.
6.  **Encounters with one or more binaries.** Uploads encounters through the Sana module which include image files. These include sending the binaries in packetized chunks as well as in a single bulk upload, i.e. single packet.

Modeling Regular Use
====================

The test plan provides a fairly simple model which simulates regular use of the Sana platform from data collection on the mobile client through review by a specialist in the OpenMRS web interface. While JMeter provides numerous other configuration options which can be used to further refine this model, the two most important for most installations are the values for:

1.  **Number of Threads(users)** The number of users who will be concurrently sending requests to the system.
2.  **Loop Count** The number of iterations through the model.

It is highly recommended that both values be left at the default value until any functional issues have been resolved. Increasing these values will eventually cause problems on any system being tested as there is a finite limit to how many requests a system can service based on factors such as available memory, bandwidth, etc.

Mobile Client Upload Simulation
-------------------------------

Simulates an encounter upload and randomly selects between a text only encounter, an encounter with one image, an encounter with multiple images.

[<File:mds_mobile_client_group.png>](/File:mds_mobile_client_group.png "wikilink")

The model performs the following:

1.  **Credential Validation.** Simulates validation of the username and password from the client.
2.  **Query patient id.** Simulates the patient id check during an encounter.
3.  **Uploads an encounter.** Simulates a client upload by randomly selecting from encounters which contain text only, a single image, or multiple images.

Encounters with images send binary content as 20kb chunks all of which are included in the test media available on this page.

Simulating OpenMRS encounter queue view and encounter update
------------------------------------------------------------

Simulates a clinician opening the Sana queue through the web interface, selecting an encounter and viewing it, and then updating so that the encounter is removed from the queue.

[<File:omrs_queue_view_update.png>](/File:omrs_queue_view_update.png "wikilink")

The model performs the following:

1.  **Credential Validation.** Simulates clinician logging in to the system.
2.  **View items in the queue.** Simulates pressing the Sana button in the web interface.
3.  **View single encounter.** Simulates selecting a single item from the queue to review.
4.  **Update the encounter.** Simulates filling in information and pressing the **Send** button.
5.  **Encounter Dashboard view** Simulates the encounter view through the patient dashboard which follows the sens.
6.  **Encounter Save** Simulates the update which finally removes the item from the queue.

Running the tests
=================

Prior to running the tests, you should be able to **Enable/Disable** the various thread groups in the JMeter control window-all are disabled by default. To Run the tests, verify that only the tests you would like to run are enabled and then select from the menu:

`   `**`Run` `-->` `Start`**

To adequately test an installation, testing should be performed as follows:

1.  **Perform OpenMRS functional tests.** Enable the **omrs_functional_tests** Thread Group. Start the test. If no errors are observed, disable the group.
2.  **Perform mDS functional tests.** Enable the **mds-1.1_functional_tests** Thread Group. Start the test. If no errors are observed, disable the group.
3.  **Test regular use model.** Enable the **mds_mobile_client_group** and **omrs_reviewing_clinician_group** Thread Groups. If no errors are observed, you can begin increasing the values for **Number of Threads(users)** and **Loop Count** to begin testing the performance of your server under load if you would like.

Visualizing the Results
=======================

The sample script provides the following to visualize the test results:

`   `**`View` `Results` `Tree`**` Displays results of individual requests-very helpful for troubleshooting.`
`   `**`Aggregate` `Report`**` Displays aggregate performance for all requests by type.`

Typical results for the tests described in the previous section can be seen as individual request results or as aggregate reports as in the following section. **Note:** the images give a hint of some of the visualization options available through JMeter. Please consult the documentation for further details.

### Individual Results

The following three images display a visualization of individual request results in various formats.

[<File:omrs_functional_tests_results.png>](/File:omrs_functional_tests_results.png "wikilink")

*1. Successful results of OpenMRS testing showing a patient list as XML returned by OpenMRS*

[<File:mds_functional_tests_results.png>](/File:mds_functional_tests_results.png "wikilink")

*2. Successful results of mDS testing showing a patient list as text returned by mDS.*

[<File:model_results.png>](/File:model_results.png "wikilink")

*3. Successful results of model testing showing JSON text.*

### Aggregate Reports

The following images displays an aggregate report of model testing.

[<File:model_results_aggregate.png>](/File:model_results_aggregate.png "wikilink")

*1. Error free results of model testing client uploads and clinician review.*