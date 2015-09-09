---
layout: default
title: Data Model
label: Data Model
collection: developers
---
# Data Model
The diagram below presents a slightly abstracted view of the core.models 
in that the data types are not presented as the `django.db.models.fields.Field` classes. It is included as
such here in that the field labels are consistent with those exposed to the
mobile clients and accessible through the [REST API](./rest_api). Additional
`django.db.model.fields.Field`s for the models are included in the Python
implementation when deemed necessary.

[![Core data model](http://sana.mit.edu/mobile/wp-
content/uploads/sites/3/2015/04/core_model-
1024x470.png)](http://sana.mit.edu/mobile/wp-
content/uploads/sites/3/2015/04/core_model.png) 

## Core Model Objects

  * **Concept** Functional unit of meaning, or, a term which provides context.
  * **Device** The entity that is used to collect data - e.g. a mobile phone.
  * **Encounter** A collection of one or more observations obtained as the result of an Observer executing a Procedure about a subject-e.g. a patient visit.
  * **Instruction** A single step for collecting a unit of data or displaying information.
  * **Location** A label for where something of significance occurred.
  * **Observation** The smallest discrete unit of collected data. The collected data may be represented by a character sequence or more complex, file object.
  * **Observer** Who or what is collecting data-e.g. a community health worker.
  * **Procedure** The executable set of instructions for collecting data.
  * **Relationship** Declares a relationship between two concept instances
  * **RelationshipCategory** The nature of the relationship between two concept instances.
  * **Subject** Who or what data is collected about-e.g. a patient.

### Core Model Classes(Python Implementation)
* `mds.core.models.concept`
  * Concept
  * Relationship
  * RelationshipCategory
* `mds.core.models.device`
  * Device
* `mds.core.models.encounter`
  * Encounter
* `mds.core.models.instruction`
  * Instruction
* `mds.core.models.location`
  * Location
* `mds.core.models.observation`
  * Observation
* `mds.core.models.observer`
  * Observer
* `mds.core.models.procedure`
  * Procedure
* `mds.core.models.subject`
  * Subject
