---
title: Plugins
label: Plugins
collection: developers
---
# Plugin Architecture
One of the purposes of the mobile client is to act as a pluggable Point of
Care(POC) device capable of data collection from nearly any hardware device
integrated, or connected to, the mobile device . As such, one of the goals of
future versions of the the Android based mobile client is to provide a library
as well as base applications which 3rd party developers may use to develop
applications which can interact with a wide range of the sensors and
connectivity options considered recommended for Android based devices.
Examples include, but are not limited to, USB, bluetooth, accelerometer,
gyroscope, sound port, etc. The library and base applications would interact
through the Sana plugin architecture which allows external applications to be
launched, along with some control of the application, during the execution of
decision support algorithms which provide the prompts utilized by community
health workers. Furthermore, the types of devices which may be connected range
from proprietary to any number of commodity devices.

## Data Type Compatibility

Data types collected by the device fall into one of two categories, (1)
character sequences and (2) files. The mimetype of the data is therefore
specified as either text/plain or that of the file as appropriate.

## Plugin Library

The easiest way to create a plugin application is to develop an application
that includes the [Sana Android Plugin
Library](https://github.com/SanaMobile/sana.plugin-library-android) as a
dependency in Android Studio and include the appropriate information in a
**Procedure** document as outlined in the **Procedure Interface Syntax
**outlined below. Please see the Sana Android Plugin Library
[wiki](https://github.com/SanaMobile/sana.plugin-library-android/wiki) for
additional information on using the library. Further details on how to
manually create an application that will work as a plugin are detailed on this
page.

# Procedure Interface Syntax

Access to 3rd party applications is provided through either the PLUGIN or
PLUGIN_TEXT elements. These elements include support for _action _and
_mimeType_ attributes which are utilized for determining which application to
launch, type of data collected, and control parameters which will be passed to
the 3rd party app. The basic syntax is as follows:

    
       <Element type="PLUGIN" id="_id_value_"
           concept="_concept_name_"
           question="_question_value_"
           action="_action_value[;params]_"
           mimeType="_mimeType_value_"/>
    

or

    
       <Element type="ENTRY_PLUGIN" id="_id_value_"
           concept="_concept_name_"
           question="_question_value_"
           action="_action_value[;params]_"
           mimeType="text/plain"/>
    

The _params_ in the action attribute are optional. More information on the
action attribute and control parameters is provided below.

## Action Attribute Conventions

The naming convention for the _action_value_ above is to use the external
application package name appended with the _concept_name_. The _action_value_,
along with _mimeType_value_, should be included in an IntentFilter for an
Activity within the external application manifest.

    
       <activity android:name="_.SomeActivity_">
           <intent-filter>
               <action android:name="_action_value_"/>
               <data android:mimeType="_mimeType_value_"/>
               <category android:name="android.intent.category.DEFAULT"/>
           </intent-filter>
       </activity>
    

The _action_value_ format would then be:
    
       _application.package.concept_name_
    
The _concept_name_ in the procedure XML should be capitalized and any spaces
replaced with underscores.

## Control Parameters

Additional control parameters may be included in the procedure markup by
appending a set of one or more, semi-colon separated, key/value pairs to the
action attribute as follows:

    
       <Element type="PLUGIN" id="_id_value_"
           concept="_concept_name_"
           question="_question_value_"
           action="_action_value;key1=value1;key2=value2;..._"
           mimeType="_mimeType_value_"/>
    

The control parameters represented by the key/value pairs will be included in
the Intent the Sana app passes to startActivityForResult() as String extras.
It is the responsibility of the external application to parse the String
extras into any numeric or other data formats.

## Capturing and Returning Data

How data is returned is similar for both PLUGIN and ENTRY_PLUGIN elements.
There are a few differences described as follows. For PLUGIN elements, the
captured data **MUST** be written to the Sana ContentProvider using an
OutputStream accessed using the data Uri included in the launch Intent:

    
       OutputStream os = null;
       try{
           os = getContentResolver().openOutputStream(getIntent().getData());
           ... do something here
       } finally {
           if (os != null) os.close();
       }
    

The responsibility for closing the stream, as well as any buffering or other
access techniques, is the responsibility of the plugin app. When the Activity
is finished, a successful result **MUST** return a data Intent with the data
Uri and mimetype equal to those of the launch Intent.

    
       Uri uri = getIntent().getData(); 
       String type = getIntent().getType();
       Intent data = new Intent();
       data.setDataAndType(uri, type);
       setResult(RESULT_OK,data);
       finish();
    

For an ENTRY_PLUGIN element, the resulting character sequence is attached to
the result data Intent as a fragment. When the Activity is finished, a
successful result **MUST** return a data Intent with the data Uri and mimetype
equal to those of the launch Intent.

    
       Uri uri = getIntent().getData();
       uri = uri.buildUpon().fragment(**result**).build();
       String type = getIntent().getType();
       Intent data = new Intent();
       data.setDataAndType(uri, type);
       setResult(RESULT_OK,data);
       finish();
    

The instructions above assume the **result** is the value that needs to be
returned.

## Data Visualization

External applications must also provide the means to view, in a meaningful
fashion, any data collected. For simple character sequence data, which
requires no processing, utilization of the PLUGIN_TEXT elements of a procedure
will display the text to the end-user. For character sequences which require
processing for meaningful visualization and all other data types, the 3rd
party application **MUST** provide the tools for visualization of such data on
the mobile client.

## Accessing a View Activity

The Sana application assumes that the plugin app contains an Activity which
declares an IntentFilter with an action value equal to the action attribute
used in the procedure XML appended with **_VIEW**.

    
       <activity android:name="_.SomeViewActivity_">
           <intent-filter>
               <action android:name="_action_value__VIEW"/>
               <data android:mimeType="_mimeType_value_"/>
               <category android:name="android.intent.category.DEFAULT"/>
           </intent-filter>
       </activity>
    

The view Activity can then access the data using an InputStream using the data
Uri included in the launch Intent:

    
       InputStream is = null;
       try{
           is = getContentResolver().openInputStream(getIntent().getData());
           ... do something here
       } finally {
           if (is != null) is.close();
       }
    

The responsibility for closing the stream, as well as any buffering or other
access techniques, is the responsibility of the plugin app.

