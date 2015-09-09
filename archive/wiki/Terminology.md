---
title: Terminology
---

Precise terminology helps the Sana Development team communicate efficiently. Please adhere to the following set of definitions when writing code for Sana and when asking for support.

A **Procedure** is a set of questions intended to guide a Provider through the task of administering care to a Patient. It is represented using XML, XForms, or another structured document format, may be distributed through a Mobile Dispatch Server, and is stored on Client devices. A Procedure is analogous to a blank paper form with no patient information written on it.

An **Encounter** is a set of responses to the questions posed by a Procedure. It applies to a particular Patient at a particular time and can be sent between a Client and an Electronic Medical Records System through a Mobile Dispatch Server. An Encounter is analogous to a completed paper form containing Protected Health Information. The deprecated term "Saved Procedure" was previously used to mean "Encounter." Please avoid this term in new code.