---
title: Overview
permalink: /Overview/
---

Sana, formerly known as Moca, is a reliable tool that allows health workers to transmit any medical file, whether text notes, audio, photo, video or even information rich x-rays and ultrasound images through a cell phone 1) to a central server for archiving and incorporation into an electronic medical record, and 2) to a remote specialist for real-time decision support. When strong cellular connectivity is not available, Sana solves the problem using packetization, synchronization and multi-modal transfer. Sana integrates with OpenMRS, an open-source electronic medical records system used in developing countries to facilitate longitudinal care and patient tracking. The platform enables collaborative quality assessment among partner organizations, which will be crucial in setting the standards for telemedicine technology and medical care in resource-poor settings.

Sana is highly customizable, allowing clinicians to create their own workflows for common procedures. These workflows can be dynamically loaded onto phones running Sana. The front-end for data and media capture is accessible through a fully-programmable interface. The back-end provides an intuitive user interface for management of medical media. Sana was built for integration with OpenMRS, but can be quickly ported to other commonly used medical record systems. This system design allows for maximum modularity and interoperation.
 [600px](/Image:Workflow.png "wikilink")
Figure 1. Example of a Sana workflow: Surgery follow-up

Procedures are step-by-step workflows, and are at the core of Sana. In most scenarios, a procedure is a set of pages that have questions or prompts. For instance, a page might prompt a user to take a picture or record audio. Other pages in a procedure might ask the user to enter text, check boxes or record video from a connected medical device.
 [600px](/Image:Phoneworkflow.png "wikilink")
Figure 2. The flow of a procedure in the Sana Android application.

Using the Sana application, health workers run a procedure and collect patient data on the phone. Sana then uploads the information to OpenMRS for doctor review. After reviewing the case, doctors notify health workers by sending diagnosis and treatment recommendations to the Sana application. Clinicians have the ability to build unique procedures for health care workers and organizations.
 [600px](/Image:Openmrsworkflow.png "wikilink")
Figure 3. Receiving an SMS (text message) diagnosis from a medical expert on the healthcare worker’s phone.

The complete Sana system consists of at least one (and in most instances several) phones and a web-connected server. The server runs both the medical records system of choice, such as OpenMRS, and the Sana Dispatch Server (MDS). The MDS runs on the server that is responsible for communication to and from phones registered in the system. It takes care of receiving data via the lower-level synchronization and packetization that the Sana-enabled phones perform. Using our custom MDS plug-in, Sana is fully-compatible with OpenMRS.

We did not build in the functionality to upload a procedure directly from the phone to OpenMRS because we wanted a layer of abstraction. Then when we port to other phones like Windows Mobile or Symbian, the phones just need to interface with the MDS. Conversely, we also want to be able to switch in and out different medical record system back-ends. The MDS could potentially send data to a PACS system or any other medical record system.
 [600px](/Image:Dispatch.png "wikilink")
Figure 4. End-to-end system from the phones to the MDS to the OpenMRS medical record system.

A key challenge facing remote diagnostic platforms that utilize cellular networks in developing nations is the lack of adequate connectivity. Sana employs three strategies to ensure reliable, low-cost data transfers:

1.  **Packetization:** Some acquired data are extremely large, such as video and high-resolution images, which require an inordinate amount of time to upload over GPRS. Oftentimes, half-complete transfers are interrupted and fail mid-upload due to poor service, and all data is lost on the receiving end. Using packetization algorithms, Sana uploads large files in smaller chunks so that little bandwidth is wasted in the case of a dropped connection.
2.  **Synchronization:** When a procedure is completed, the medical data is stored in a local, on-phone database. At this point, the procedure can be rerun for the next patient. A background service in Sana is constantly listening for cellular service. As soon as service is available, all completed procedures in the database are uploaded to the server.
3.  **Multi-modal transfers:** Sana has the ability to transfer data over a number of common interfaces, including GPRS, WiFi, SMS and USB tether. The different interfaces are used for specific purposes. Images and audio are relayed via GPRS, WiFi or USB tether, while text can be optionally sent via SMS. This is particularly useful if the phone is outside the coverage area, since the cellular network operator will automatically store and forward the SMS as soon as the phone reenters the service area.

We have extended OpenMRS to have a queue of pending diagnoses in addition to allowing data such as images to be tagged to a patient record.
 [600px](/Image:Queue.png "wikilink")
Figure 5. Sana queue of pending patient cases in OpenMRS.
 [600px](/Image:Viewer.png "wikilink")
Figure 6. View images, audio, and video files in the Sana Media Viewer embedded in OpenMRS.