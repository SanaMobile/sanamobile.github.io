---
title: Upgrading
---

The Sana Ubuntu Packages are upgraded the same way as all other Ubuntu Packages. When the developers release an update into the repository, the new package information will reach your server the next time you run the following command:

    sudo aptitude update

This pulls in information about all available updates for your system. Apply all of these updates with this command:

    sudo aptitude full-upgrade

Alternatively, if you wish to skip upgrading the kernel and other core components, issue the following command:

    sudo aptitude safe-upgrade