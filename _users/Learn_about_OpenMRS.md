---
title: Learn about OpenMRS
---

Data Model
----------

An explanation of the database tables is found in the OpenMRS data model image. Click on the image to zoom in and pan around. <http://openmrs.org/images/5/59/Openmrs_data_model_1.10.png?format=raw>
 Start by scrolling to the very left and seeing the “Patient” group of tables, then “’Person/Relationship” tables, “Groups/Workflows” tables, “Encounter” tables, “Observation tables,” “Concept” tables, “Form” tables, “Order” tables, and etc…
 The official documentation on the data model is found here. Click on each domain for more information. <http://openmrs.org/wiki/OpenMRS_Data_Model_Documentation>

Source Code
-----------

1.  To get the openmrs source code for version 1.5, repeat the steps on checking out code from a repository (See [Download Source Code](/Download_Source_Code "wikilink")) to check out the code from the OpenMRS SVN repository
2.  Create new repository location
     Location: <http://svn.openmrs.org/openmrs/branches/1.5.x>

Documentation
-------------

The API and documentation for OpenMRS can be found here: <http://resources.openmrs.org/doc/>

Modules
-------

Creating your own module <http://openmrs.org/wiki/Creating_Your_First_OpenMRS_Module>

If you want other OpenMRS modules (like the ID Card module or Form Entry module) you can get them from the OpenMRS repository located at: <http://svn.openmrs.org/openmrs-modules>

#### ID Cards

Once the ID module has been installed in your instance of OpenMRS, you can print ID cards. We added the "OpenMRS Card New/Empty (Front)" template to our openmrs server. Click here to [print new ID cards](http://moca.media.mit.edu:8080/openmrs-demo/module/idcards/printEmptyIdcards.form)

1.  Edit Template:
    1.  Administration Tab \> ID Cards \> Manage Templates \> Select “OpenMRS Card New/Empty (Front)” or “OpenMRS Card New/Empty (Back)”
    2.  You can change the icon by editing the following code in the Xslt section: url('{\$baseURL}/moduleResources/idcards/card_logo_01.png'). Just add the image you want to the web/module/resources dir.

2.  Print Cards (no name, just ID numbers – intended for use in Philippines where the ID cards will be batch printed first and then assigned to a patient in real time):
    1.  Administration Tab \> ID Cards \> Print New ID Cards
        1.  Choose Number of ID cards to print
        2.  Select template “OpenMRS Card New/Empty (Front)”
        3.  This will print the front of all the ID cards
        4.  Repeat except select the template for “OpenMRS Card New/Empty (Back)”

If you don't like the layout/look of the card, you can ask the openmrs people for more templates (they should already have many in use) since it would be a lot easier than writing your own xsl.