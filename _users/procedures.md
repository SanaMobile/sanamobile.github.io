---
layout: default
title: Procedures
label: Procedures
---
## Overview

A Procedure is a translation of a medical decision tree into a machine
readable document which effectively control the appearance and flow of the
user interface presented to mobile users. The remainder of this reference
contains the complete XML document specification along with hints for authors.
For a table summarizing the **Procedure** schema, see the 
[Quick Reference](#quick-reference) at the bottom of this page.

## Procedure XML Specification

The Procedure document format is a simple XML based schema with a single root
Procedure node having one or more child Page nodes. The root Procedure node
also contains metadata about the Procedure itself such as the author, version,
and version represented as XML attributes. Input and display prompts are
represented as child Element nodes for each Page. Additional metadata
representing context, visual hints, constraints, and other information
relevant to the prompt as XML attributes. Each Page may also contain simple,
or compound, conditional statements that applies to any child Element nodes.
The document structure, without the full XML syntax, is illustrrated below

    
    Procedure ...metadata
        Page
            [Optional] 
                Conditional Statement ...simple or componund
            Element ...metadata
            [Optional]
              ... additional Element(s)
        [Optional]
            ...additional Page(s)
    

The full syntax for the specification-i.e. the XML node tags and attributes,
follows.

### Procedure
The Procedure tag marks the beginning of procedure.

<table class="content-table">
<tbody>
<tr style="background-color: #dddddd">
<td>Procedure</td>
<td colspan="4"></td>
</tr>
<tr>
<td></td>
<td>title</td>
<td>Yes</td>
<td>String</td>
<td>A descriptive name.</td>
</tr>
<tr>
<td></td>
<td>author</td>
<td>Yes</td>
<td>String</td>
<td>The author of the document.</td>
</tr>
<tr>
<td></td>
<td>uuid</td>
<td>Yes</td>
<td>String</td>
<td>The id of the document.</td>
</tr>
<tr>
<td></td>
<td>version</td>
<td>Yes</td>
<td>String</td>
<td>Distinguishes different versions of a protocol.</td>
</tr>
<tr style="background-color: #eeeeee">
<td>Allowed Child Nodes</td>
<td colspan="4">Page</td>
</tr>
</tbody>
</table>

### Page
A **Page** groups one or more **Element** objects along with optional
conditional logic. On the mobile client, all **Element** objects will be
displayed as a single screen. The inclusion of conditional logic will require
that the conditional evaluates to True for the **Page** to be visible. Marks a
set of one or more instructions which are viewed collectively on a single
page.

<table class="content-table">
<tbody>
<tr style="background-color: #dddddd">
<td>Page</td>
<td colspan="4"></td>
</tr>
<tr>
<td colspan="5">-- no attributes --</td>
</tr>
<tr style="background-color: #eeeeee">
<td>Allowed Child Nodes</td>
<td colspan="4">ShowIf, Element</td>
</tr>
</tbody>
</table>

### Conditional Logic - Show IF
The conditional logic available in the Sana Procedure mark up allows for the
introduction of branching logic as required by many decision trees. When
required, it must be included as the first child node for a Page within the
XML. Conditional statements that evaluate to False will prevent the Page from
being visible, or executed. The conditional statements apply to all
**Elements** on a page.

<table class="content-table">
<tbody>
<tr style="background-color: #dddddd">
<td>ShowIf</td>
<td colspan="4"></td>
</tr>
<tr>
<td>-- no attributes --</td>
</tr>
<tr style="background-color: #eeeeee">
<td>Allowed Child Nodes</td>
<td colspan="4">and, or, not, Criteria</td>
</tr>
</tbody>
</table>

### Criteria
An expression which will yield a logical truth value when evaluated.

<table class="content-table">
<tbody>
<tr style="background-color: #dddddd">
<td>Criteria</td>
<td colspan="4"></td>
</tr>
<tr>
<td></td>
<td>type</td>
<td>Yes</td>
<td>GREATER<br/>LESS<br/>EQUALS</td>
<td>The comparison operator to apply.</td>
</tr>
<tr>
<td></td>
<td>id</td>
<td>Yes</td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td>value</td>
<td>Yes</td>
<td>Numeric
or
String</td>
<td>The value to compare against.<strong>Note</strong> String comparisons are only meaningful for <strong>EQUALS</strong>.</td>
</tr>
<tr style="background-color: #eeeeee">
<td>Allowed Child Nodes</td>
<td colspan="4">-- NA --</td>
</tr>
</tbody>
</table>
    
Examples:

    <Criteria type="EQUALS" id="1" value="Yes"/>
    <Criteria type="LESS" id="1" value="1"/>
    <Criteria type="GREATER" id="1" value="1"/>
    

### and

Logical conjunction between any combination of two or more Criteria and
compound statements. All child nodes must evaluate to True for the statement
to be True.

<table class="content-table">
<tbody>
<tr style="background-color: #dddddd">
<td>and</td>
<td colspan="4"></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
<tr style="background-color: #eeeeee">
<td>Allowed Child Nodes</td>
<td colspan="4">and, or, not, Criteria</td>
</tr>
</tbody>
</table>

Example:

    <ShowIf>
      <and>
        <Criteria type="EQUALS" id="1" value="Yes"/>
        <Criteria type="EQUALS" id="2" value="No"/>
      </and>
    <ShowIf>
    

### or

Logical disjunction between any combination of two or more Criteria and
compound statements. At least one child node must evaluate to True for the
statement to be True.

<table class="content-table">
<tbody>
<tr style="background-color: #dddddd">
<td>or</td>
<td colspan="4"></td>
</tr>
<tr>
<td>-- no attributes --</td>
</tr>
<tr style="background-color: #eeeeee">
<td>Allowed Child Nodes</td>
<td colspan="4">and, or, not, Criteria</td>
</tr>
</tbody>
</table>

Example:
    
    <ShowIf>
      <or>
        <Criteria type="EQUALS" id="1" value="Yes"/>
        <Criteria type="EQUALS" id="2" value="No"/>
      </or>
    <ShowIf>
    

##### not

Logical negation of the result of a simple or compound Criteria.

<table class="content-table">
<tbody>
<tr style="background-color: #dddddd">
<td>not</td>
<td colspan="4"></td>
</tr>
<tr>
<td>-- no attributes --</td>
</tr>
<tr style="background-color: #eeeeee">
<td>Allowed Child Nodes</td>
<td colspan="4">and, or, not, Criteria</td>
</tr>
</tbody>
</table>

Example
    
    <ShowIf>
      <not>
        <Criteria type="EQUALS" id="1" value="Yes"/>
      </not>
    <ShowIf>
    

### Compound Statements

The conditional logic available in the **Procedure** scheme allows for nesting
a number of statements in order to significantly more complex logic. As is
visible in the individual The following conditional is provided to give some
idea of the complexity that can be achieved but is by no means the limit of
what can be constructed.

Example:
    
    <ShowIf>
      <and>
        <not>
          <Criteria .../>
        </not>
        <Criteria .../>
        <or>
          <Criteria .../>
          <Criteria .../>
        </or>
      ... etc.
      </and>
    </ShowIf>
    

### Element

The elements are the individual instructions which prompt the end user for
input or can be used to display information.

<table class="content-table" style="height: 392px" width="581">
<tbody>
<tr style="background-color: #dddddd">
<td>Element</td>
<td colspan="4"></td>
</tr>
<tr>
<td></td>
<td>id</td>
<td>String</td>
<td>Yes</td>
<td><strong>Must</strong> be unique within the page</td>
</tr>
<tr>
<td></td>
<td>type</td>
<td>Yes</td>
<td><a href="#date">DATE</a><br/>
<a href="#entry">ENTRY</a><br/>
<a href="#select">SELECT</a><br/>
<a href="#multi_select">MULTI_SELECT</a><br/>
<a href="#radio">RADIO</a><br/>
<a href="#picture">PICTURE</a><br/>
<a href="#plugin">PLUGIN</a><br/>
<a href="#plugin_entry">ENTRY_PLUGIN</a><br/>
</td>
<td>Controls the UI of the prompt presented to the user</td>
</tr>
<tr>
<td></td>
<td>concept</td>
<td>String</td>
<td>Yes</td>
<td><strong>MUST</strong> correspond to the definition on the server.</td>
</tr>
<tr>
<td></td>
<td>question</td>
<td>String</td>
<td>Yes</td>
<td>The text prompt that will be displayed to the user.</td>
</tr>
<tr>
<td></td>
<td>answer</td>
<td>String</td>
<td>No</td>
<td>The default value.</td>
</tr>
<tr>
<td></td>
<td>required</td>
<td><em>true</em> or <em>false</em></td>
<td>No</td>
<td>If <em>true</em>, input is required before the procedure will progress past a page containing the <strong>Element</strong><p /><strong>Default:</strong> <em>false</em></td>
</tr>
<tr>
<td></td>
<td>image</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>drawable</em> resource within the compiled application. Will be displayed to the user on the screen.</td>
</tr>
<tr>
<td></td>
<td>audio</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>raw</em> resource within the compiled application. Will be played when the <strong>Page</strong> containing the <strong>Element</strong> is displayed.</td>
</tr>
<tr>
<td></td>
<td>choices</td>
<td>String</td>
<td>Yes</td>
<td>The options presented to the user in the prompt. Applies to <strong>SELECT,MULTI_SELECT,RADIO</strong></td>
</tr>
<tr>
<td></td>
<td>action</td>
<td>String</td>
<td>Yes</td>
<td>A string which identifies which application to launch. Applies to <strong>PLUGIN,ENTRY_PLUGIN</strong></td>
</tr>
<tr>
<td></td>
<td>mimeType</td>
<td>String</td>
<td>Yes</td>
<td>The type of data collected. Applies to <strong>PLUGIN,ENTRY_PLUGIN</strong></td>
</tr>
<!-- End Element --><!-- Begin -->
<tr style="background-color: #dddddd">
<td></td>
<td colspan="4"></td>
</tr>
</tbody>
</table>

_[xml example]_

#### More on the type attribute

The following list gives a brief description of the elements available within
a Procedure. Additional details, screenshots, and sample mark-up for each are
provided. The value for the type attribute must be one of the element types
defined by the Sana application. As presented in the summary table above, the
core element types are:

  * [DATE](#date)
  * [ENTRY](#entry)
  * [SELECT](#select)
  * [MULTI_SELECT](#multi_select)
  * [RADIO](#radio)
  * [PICTURE](#picture)
  * [PLUGIN](#plugin)
  * [ENTRY_PLUGIN](#plugin_entry)

The following sections will present additional details on each of the allowed
values for the **type** attribute including additional optional attributes
that apply to an Element of that **type**.

### DATE

<table class="content-table">
<tbody>
<tr style="background-color: #dddddd">
<td>Element</td>
<td colspan="4"></td>
</tr>
<tr>
<td></td>
<td>id</td>
<td>String</td>
<td>Yes</td>
<td><strong>Must</strong> be unique within the page</td>
</tr>
<tr>
<td></td>
<td>type</td>
<td>Yes</td>
<td>DATE</td>
<td>Controls the UI of the prompt presented to the user</td>
</tr>
<tr>
<td></td>
<td>concept</td>
<td>String</td>
<td>Yes</td>
<td><strong>MUST</strong> correspond to the definition on the server.</td>
</tr>
<tr>
<td></td>
<td>question</td>
<td>String</td>
<td>Yes</td>
<td>The text prompt that will be displayed to the user.</td>
</tr>
<tr>
<td></td>
<td>answer</td>
<td>String</td>
<td>No</td>
<td>The default value.</td>
</tr>
<tr>
<td></td>
<td>required</td>
<td><em>true</em> or <em>false</em></td>
<td>No</td>
<td><strong>Default:</strong> <em>false</em></td>
</tr>
<tr>
<td></td>
<td>image</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>drawable</em> resource within the compiled application. Will be displayed to the user on the screen.</td>
</tr>
<tr>
<td></td>
<td>audio</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>raw</em> resource within the compiled application. Will be played when the <strong>Page</strong> containing the <strong>Element</strong> is displayed.</td>
</tr>
</tbody>
</table>

_[screen shot]_

Example
    
    <Element id="1"
    type="DATE"
    concept="DATE"
    question="Entry a date value"
    answer=""/>
    

### ENTRY

Presents a simple text box and collects text entered through the device
keyboard.

<table class="content-table">
<tbody>
<tr style="background-color: #dddddd">
<td>Element</td>
<td colspan="4"></td>
</tr>
<tr>
<td></td>
<td>id</td>
<td>String</td>
<td>Yes</td>
<td><strong>Must</strong> be unique within the page</td>
</tr>
<tr>
<td></td>
<td>type</td>
<td>Yes</td>
<td>ENTRY</td>
<td>Controls the UI of the prompt presented to the user</td>
</tr>
<tr>
<td></td>
<td>concept</td>
<td>String</td>
<td>Yes</td>
<td><strong>MUST</strong> correspond to the definition on the server.</td>
</tr>
<tr>
<td></td>
<td>question</td>
<td>String</td>
<td>Yes</td>
<td>The text prompt that will be displayed to the user.</td>
</tr>
<tr>
<td></td>
<td>answer</td>
<td>String</td>
<td>No</td>
<td>The default value.</td>
</tr>
<tr>
<td></td>
<td>required</td>
<td><em>true</em> or <em>false</em></td>
<td>No</td>
<td><strong>Default:</strong> <em>false</em></td>
</tr>
<tr>
<td></td>
<td>image</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>drawable</em> resource within the compiled application. Will be displayed to the user on the screen.</td>
</tr>
<tr>
<td></td>
<td>audio</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>raw</em> resource within the compiled application. Will be played when the <strong>Page</strong> containing the <strong>Element</strong> is displayed.</td>
</tr>
</tbody>
</table>

_[screen shot]_

Example:
    
    <Element id="2"
      type="ENTRY"
      concept="TEXT"
      question="Enter text"
      answer=""/>

### SELECT
Presents a dropdown box and collects a single-item from a list.

<table class="content-table">
<tbody>
<tr style="background-color: #dddddd">
<td>Element</td>
<td colspan="4"></td>
</tr>
<tr>
<td></td>
<td>id</td>
<td>String</td>
<td>Yes</td>
<td><strong>Must</strong> be unique within the page</td>
</tr>
<tr>
<td></td>
<td>type</td>
<td>Yes</td>
<td>SELECT</td>
<td>Controls the UI of the prompt presented to the user</td>
</tr>
<tr>
<td></td>
<td>concept</td>
<td>String</td>
<td>Yes</td>
<td><strong>MUST</strong> correspond to the definition on the server.</td>
</tr>
<tr>
<td></td>
<td>question</td>
<td>String</td>
<td>Yes</td>
<td>The text prompt that will be displayed to the user.</td>
</tr>
<tr>
<td></td>
<td>answer</td>
<td>String</td>
<td>No</td>
<td>The default value.</td>
</tr>
<tr>
<tr>
<td></td>
<td>required</td>
<td><em>true</em> or <em>false</em></td>
<td>No</td>
<td><strong>Default:</strong> <em>false</em></td>
</tr>
<td></td>
<td>image</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>drawable</em> resource within the compiled application. Will be displayed to the user on the screen.</td>
</tr>
<tr>
<td></td>
<td>audio</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>raw</em> resource within the compiled application. Will be played when the <strong>Page</strong> containing the <strong>Element</strong> is displayed.</td>
</tr>
<tr>
<td></td>
<td>choices</td>
<td>String</td>
<td>Yes</td>
<td>The options presented to the user in the prompt.</td>
</tr>
</tbody>
</table>

_[screen shot]_

Example:
    
    <Element id="3"
    type="SELECT"
    concept="TEXT"
    question="Select a single value"
    choices="1,2,3,4"
    answer=""/>
    

### MULTI_SELECT
Collects one or more items from a list as a set of checkboxes.

<table class="content-table">
<tbody>
<tr style="background-color: #dddddd">
<td>Element</td>
<td colspan="4"></td>
</tr>
<tr>
<td></td>
<td>id</td>
<td>String</td>
<td>Yes</td>
<td><strong>Must</strong> be unique within the page</td>
</tr>
<tr>
<td></td>
<td>type</td>
<td>Yes</td>
<td>MULTI_SELECT</td>
<td>Controls the UI of the prompt presented to the user</td>
</tr>
<tr>
<td></td>
<td>concept</td>
<td>String</td>
<td>Yes</td>
<td><strong>MUST</strong> correspond to the definition on the server.</td>
</tr>
<tr>
<td></td>
<td>question</td>
<td>String</td>
<td>Yes</td>
<td>The text prompt that will be displayed to the user.</td>
</tr>
<tr>
<td></td>
<td>answer</td>
<td>String</td>
<td>No</td>
<td>The default value.</td>
</tr>
<tr>
<td></td>
<td>required</td>
<td><em>true</em> or <em>false</em></td>
<td>No</td>
<td><strong>Default:</strong> <em>false</em></td>
</tr>
<tr>
<td></td>
<td>image</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>drawable</em> resource within the compiled application. Will be displayed to the user on the screen.</td>
</tr>
<tr>
<td></td>
<td>audio</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>raw</em> resource within the compiled application. Will be played when the <strong>Page</strong> containing the <strong>Element</strong> is displayed.</td>
</tr>
<tr>
<td></td>
<td>choices</td>
<td>String</td>
<td>Yes</td>
<td>The options presented to the user in the prompt.</td>
</tr>
</tbody>
</table>

_[screen shot]_

Example:

    <Element id="4"
    type="MULTI_SELECT"
    concept="MULTIVALUE TEXT"
    question="Select one or more values"
    choices="1,2,3,4"
    answer=""/>
    

### RADIO
Collects a single-item from a list as a set of radio buttons.

<table class="content-table">
<tbody>
<tr style="background-color: #dddddd">
<td>Element</td>
<td colspan="4"></td>
</tr>
<tr>
<td></td>
<td>id</td>
<td>String</td>
<td>Yes</td>
<td><strong>Must</strong> be unique within the page</td>
</tr>
<tr>
<td></td>
<td>type</td>
<td>Yes</td>
<td>RADIO</td>
<td>Controls the UI of the prompt presented to the user</td>
</tr>
<tr>
<td></td>
<td>concept</td>
<td>String</td>
<td>Yes</td>
<td><strong>MUST</strong> correspond to the definition on the server.</td>
</tr>
<tr>
<td></td>
<td>question</td>
<td>String</td>
<td>Yes</td>
<td>The text prompt that will be displayed to the user.</td>
</tr>
<tr>
<td></td>
<td>answer</td>
<td>String</td>
<td>No</td>
<td>The default value.</td>
</tr>
<tr>
<td></td>
<td>required</td>
<td><em>true</em> or <em>false</em></td>
<td>No</td>
<td><strong>Default:</strong> <em>false</em></td>
</tr>
<tr>
<td></td>
<td>image</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>drawable</em> resource within the compiled application. Will be displayed to the user on the screen.</td>
</tr>
<tr>
<td></td>
<td>audio</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>raw</em> resource within the compiled application. Will be played when the <strong>Page</strong> containing the <strong>Element</strong> is displayed.</td>
</tr>
<tr>
<td></td>
<td>choices</td>
<td>String</td>
<td>Yes</td>
<td>The options presented to the user in the prompt.</td>
</tr>
</tbody>
</table>

_[screen shot]_

Example:

    <Element id="5"
    type="RADIO"
    concept="TEXT"
    question="Select a single value"
    choices="1,2,3,4"
    answer="1"/>
    

### PICTURE
Collects one or more images using the device camera.

<table class="content-table">
<tbody>
<tr style="background-color: #dddddd">
<td>Element</td>
<td colspan="4"></td>
</tr>
<tr>
<td></td>
<td>id</td>
<td>String</td>
<td>Yes</td>
<td><strong>Must</strong> be unique within the page</td>
</tr>
<tr>
<td></td>
<td>type</td>
<td>Yes</td>
<td>PICTURE</td>
<td>Controls the UI of the prompt presented to the user</td>
</tr>
<tr>
<td></td>
<td>concept</td>
<td>String</td>
<td>Yes</td>
<td><strong>MUST</strong> correspond to the definition on the server.</td>
</tr>
<tr>
<td></td>
<td>question</td>
<td>String</td>
<td>Yes</td>
<td>The text prompt that will be displayed to the user.</td>
</tr>
<tr>
<td></td>
<td>answer</td>
<td>String</td>
<td>No</td>
<td>The default value. The <em>answer</em> attribute is meaningless for this <em>type</em></td>
</tr>
<tr>
<td></td>
<td>required</td>
<td><em>true</em> or <em>false</em></td>
<td>No</td>
<td><strong>Default:</strong> <em>false</em></td>
</tr>
<tr>
<td></td>
<td>image</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>drawable</em> resource within the compiled application. Will be displayed to the user on the screen.</td>
</tr>
<tr>
<td></td>
<td>audio</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>raw</em> resource within the compiled application. Will be played when the <strong>Page</strong> containing the <strong>Element</strong> is displayed.</td>
</tr>
</tbody>
</table>

_[screen shot]_

Example:
    
    <Element id="6"
    type="PICTURE"
    concept="IMAGE"
    question="Take a picture"
    answer=""/>
    

### PLUGIN
Will capture and return a file object through an external application.

<table class="content-table">
<tbody>
<tr style="background-color: #dddddd">
<td>Element</td>
<td colspan="4"></td>
</tr>
<tr>
<td></td>
<td>id</td>
<td>String</td>
<td>Yes</td>
<td><strong>Must</strong> be unique within the page</td>
</tr>
<tr>
<td></td>
<td>type</td>
<td>Yes</td>
<td>PLUGIN</td>
<td>Controls the UI of the prompt presented to the user</td>
</tr>
<tr>
<td></td>
<td>concept</td>
<td>String</td>
<td>Yes</td>
<td><strong>MUST</strong> correspond to the definition on the server.</td>
</tr>
<tr>
<td></td>
<td>question</td>
<td>String</td>
<td>Yes</td>
<td>The text prompt that will be displayed to the user.</td>
</tr>
<tr>
<td></td>
<td>answer</td>
<td>String</td>
<td>No</td>
<td>The default value. The <em>answer</em> attribute is meaningless for this <em>type</em></td>
</tr>
<tr>
<td></td>
<td>required</td>
<td><em>true</em> or <em>false</em></td>
<td>No</td>
<td><strong>Default:</strong> <em>false</em></td>
</tr>
<tr>
<td></td>
<td>image</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>drawable</em> resource within the compiled application. Will be displayed to the user on the screen.</td>
</tr>
<tr>
<td></td>
<td>audio</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>raw</em> resource within the compiled application. Will be played when the <strong>Page</strong> containing the <strong>Element</strong> is displayed.</td>
</tr>
<tr>
<td></td>
<td>action</td>
<td>String</td>
<td>Yes</td>
<td>A string which identifies which application to launch.</td>
</tr>
<tr>
<td></td>
<td>mimeType</td>
<td>String</td>
<td>Yes</td>
<td>The type of data collected.</td>
</tr>
</tbody>
</table>

[screen shot]()

Example:

    <Element type="PLUGIN" id="7"
      concept="FILE"
      question="Demonstrate capturing to a file"
      action="org.sana.plugin.CAPTURE_FILE"
      mimeType="application/xml"/>


### ENTRY_PLUGIN
Will capture and return an alphanumeric character sequence through an 
external application.

<table class="content-table">
<tbody>
<tr style="background-color: #dddddd">
<td>Element</td>
<td colspan="4"></td>
</tr>
<tr>
<td></td>
<td>id</td>
<td>String</td>
<td>Yes</td>
<td><strong>Must</strong> be unique within the page</td>
</tr>
<tr>
<td></td>
<td>type</td>
<td>Yes</td>
<td>ENTRY_PLUGIN</td>
<td>Controls the UI of the prompt presented to the user</td>
</tr>
<tr>
<td></td>
<td>concept</td>
<td>String</td>
<td>Yes</td>
<td><strong>MUST</strong> correspond to the definition on the server.</td>
</tr>
<tr>
<td></td>
<td>question</td>
<td>String</td>
<td>Yes</td>
<td>The text prompt that will be displayed to the user.</td>
</tr>
<tr>
<td></td>
<td>answer</td>
<td>String</td>
<td>No</td>
<td>The default value.</td>
</tr>
<tr>
<td></td>
<td>required</td>
<td><em>true</em> or <em>false</em></td>
<td>No</td>
<td><strong>Default:</strong> <em>false</em></td>
</tr>
<tr>
<td></td>
<td>image</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>drawable</em> resource within the compiled application. Will be displayed to the user on the screen.</td>
</tr>
<tr>
<td></td>
<td>audio</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>raw</em> resource within the compiled application. Will be played when the <strong>Page</strong> containing the <strong>Element</strong> is displayed.</td>
</tr>
<tr>
<td></td>
<td>action</td>
<td>String</td>
<td>Yes</td>
<td>A string which identifies which application to launch.</td>
</tr>
<tr>
<td></td>
<td>mimeType</td>
<td>String</td>
<td>No</td>
<td>The type of data collected. This <em>type</em> implies that the <em>mimeType</em> value is <em>text/plain</em>. Including a value will be meaningless since it will be overriden with <em>text/plain</em></td>
</tr>
</tbody>
</table>

_[screen shot]_

Example:
    
    <Element type="ENTRY_PLUGIN" id="8"
    concept="TEXT"
    question="Demonstrate plugin text capture"
    action="org.sana.plugin.CAPTURE_CHARS"
    mimeType="text/plain"/>
    
### Concepts-providing context

Sana requires each **Element** to have a a **concept** attribute which
provides the context for the data collection. Prior to execution, all concepts
used within a new **Procedure** must be defined on the server where the data
will ultimately be stored. If you would like to introduce new terms, please
consult your system administrator regarding local policies for doing so.

## Quick Reference

<table class="content-table">
<tbody>
<tr style="background-color: #cdcdcd">
<th>Tag</th>
<th>Attribute</th>
<th>Required</th>
<th>Format</th>
<th>Description</th>
</tr>
<tr style="background-color: #dddddd">
<td>Procedure</td>
<td colspan="4"></td>
</tr>
<tr>
<td></td>
<td>title</td>
<td>Yes</td>
<td>String</td>
<td>A descriptive name.</td>
</tr>
<tr>
<td></td>
<td>author</td>
<td>Yes</td>
<td>String</td>
<td>The author of the document.</td>
</tr>
<tr>
<td></td>
<td>uuid</td>
<td>Yes</td>
<td>String</td>
<td>The id of the document.</td>
</tr>
<tr>
<td></td>
<td>version</td>
<td>Yes</td>
<td>String</td>
<td>Distinguishes different versions of a protocol.</td>
</tr>
<tr style="background-color: #dddddd">
<td>Page</td>
<td colspan="4"></td>
</tr>
<tr>
<td colspan="5">-- no attributes --</td>
</tr>
<!-- Begin Conditionals -->
<tr style="background-color: #dddddd">
<td>ShowIf</td>
<td colspan="4"></td>
<tr>
<td colspan="5">-- no attributes --</td>
</tr>
<tr style="background-color: #dddddd">
<td>and</td>
<td colspan="4"></td>
</tr>
<tr>
<td colspan="5">-- no attributes --</td>
</tr>
<tr style="background-color: #dddddd">
<td>or</td>
<td colspan="4"></td>
</tr>
<tr>
<td colspan="5">-- no attributes --</td>
</tr>
<tr style="background-color: #dddddd">
<td>not</td>
<td colspan="4"></td>
</tr>
<tr>
<td colspan="5">-- no attributes --</td>
</tr>
<!-- End Conditionals --> <!-- Begin Criteria -->
<tr style="background-color: #dddddd">
<td>Criteria</td>
<td colspan="4"></td>
</tr>
<tr>
<td></td>
<td>type</td>
<td>Yes</td>
<td>GREATER<br/>LESS<br/>EQUALS</td>
<td>The comparison operator to apply.</td>
</tr>
<tr>
<td></td>
<td>id</td>
<td>Yes</td>
<td></td>
<td></td>
</tr>
<tr>
<td></td>
<td>value</td>
<td>Yes</td>
<td>Numeric
or
String</td>
<td>The value to compare against.<strong>Note</strong> String comparisons are only meaningful for <strong>EQUALS</strong>.</td>
</tr>
<!-- End Criteria --> <!-- Begin Element -->
<tr style="background-color: #dddddd">
<td>Element</td>
<td colspan="4"></td>
</tr>
<tr>
<td></td>
<td>id</td>
<td>String</td>
<td>Yes</td>
<td><strong>Must</strong> be unique within the page</td>
</tr>
<tr>
<td></td>
<td>type</td>
<td>DATE<br/>
ENTRY<br/>
SELECT<br/>
MULTI_SELECT<br/>
RADIO<br/>
PICTURE<br/>
PLUGIN<br/>
ENTRY_PLUGIN</td>
<td>Yes</td>
<td>Controls the UI of the prompt presented to the user</td>
</tr>
<tr>
<td></td>
<td>concept</td>
<td>String</td>
<td>Yes</td>
<td></td>
</tr>
<tr>
<td></td>
<td>question</td>
<td>String</td>
<td>Yes</td>
<td></td>
</tr>
<tr>
<td></td>
<td>answer</td>
<td>String</td>
<td>No</td>
<td></td>
</tr>
<tr>
<td></td>
<td>image</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>drawable</em> resource within the compiled application</td>
</tr>
<tr>
<td></td>
<td>audio</td>
<td>String</td>
<td>No</td>
<td>Name of a <em>raw</em> resource within the compiled application</td>
</tr>
<tr>
<td></td>
<td>choices</td>
<td>String</td>
<td>Yes</td>
<td>Applies to <strong>SELECT,MULTI_SELECT,RADIO</strong></td>
</tr>
<tr>
<td></td>
<td>action</td>
<td>String</td>
<td>Yes</td>
<td>Applies to <strong>PLUGIN,ENTRY_PLUGIN</strong></td>
</tr>
<tr>
<td></td>
<td>mimeType</td>
<td>String</td>
<td>Yes</td>
<td>Applies to <strong>PLUGIN,ENTRY_PLUGIN</strong></td>
</tr>
<!-- End Element --><!-- Begin -->
<tr style="background-color: #dddddd">
<td></td>
<td colspan="4"></td>
</tr>
<!-- End --></tbody>
</table>
