---
title: Data Model
---

The data model is based on the following objects which represent the basic entities required for collecting data and providing context for the data collected.

1.  **Concept** Functional unit of meaning, or, a term which provides context.
2.  **Observer** Who or what is collecting data.
3.  **Instruction** A single step for collecting a unit of data or displaying information.
4.  **Procedure** A collection of one or more instructions.
5.  **Subject** Who or what data is collected about. For practical purposes, these are patients.
6.  **Observation** The smallest discrete unit of collected data.
7.  **Encounter** A collection of one or more observations obtained as the result of an Observer executing a Procedure about a subject.
8.  **EncounterTask** Procedures that are assigned to an observer to be executed.

Additional models.

1.  **Event** An occurrence of some significance that must be persisted.
2.  **Notification** A message that is sent between entities, typically between server and client.

The model is intended to be consistent across the mobile client and dispatch server and easily mapped into other external systems.

* * * * *

Back to [Version 2.0](/Version_2.0 "wikilink") overview.