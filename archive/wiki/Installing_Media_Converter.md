---
title: Installing Media Converter
---

Install FFMPEG media converter
------------------------------

<http://linux.justinhartman.com/FFmpeg,_FFmpeg-PHP,_Lame,_Libogg,_Libvorbis,_FLVtool2,_Mplayer,_Mencoder,_AMR_Installation> Use FFMPEG stable version (not from trunk) Use FFMPEG PHP from website (Tar version not Rar version) ./configure --enable-nonfree --enable-libmp3lame --enable-libvorbis --enable-libamr-nb --enable-libamr-wb --enable-gpl --enable-shared --enable-swscale set environment variable Lot of people are facing error on loading shared libraries libavdevice.so.52, solution to the same is: export LD_LIBRARY_PATH=/usr/local/lib/ set in bash rc permanently

First download all the tar gz files.

##### Audio Codecs

1.  Download all these codecs into 1 folder.
2.  LAME MP3 Codec: <http://sourceforge.net/projects/lame/files/lame/>
3.  AMR Audio: <http://www.penguin.cz/~utx/amr#download>
    1.  Download BOTH of these
    2.  AMR-NB: amrnb-7.0.0.2.tar.bz2
    3.  AMR-WB: amrwb-7.0.0.3.tar.bz2

4.  XVID Audio: <http://www.xvid.org/Downloads.15.0.html>
    1.  Example
    2.  We used the version for Debian Linux <http://git.debian-maintainers.org/?p=unofficial/xvidcore.git;a=summary>
    3.  Then we clicked on "snapshot"

5.  FFMPEG-PHP: <http://sourceforge.net/projects/ffmpeg-php/files/>
    1.  Don't get the rar version, get the tbz2 version

#### Installing LAME MP3 Encoder

1.  Go to the folder where you downloaded all these files
2.  If you haven't already untarred the folder, do
    1.  tar zxvf <lametarfile name> (i.e. tar zxvf lame-3.98.4.tar.gz)

3.  chmod 777 <lamefolder name> -R (i.e. chmod 777 lame-3.98.4 -R)
4.  cd <lamefolder name> (i.e. cd lame-3.98.4)
5.  ./configure
6.  make
7.  sudo make install

#### Installing AMR Codec

1.  sudo apt-get install patch
2.  Repeat these steps twice for AMR-NB and then for AMR-WB
3.  If you haven't already untarred the folder, do
    1.  tar zxvf <amrTarFile name> (or you can use the archive manager in Linux)

4.  chmod 777 <amrFolder name> -R (i.e. chmod 777 amrnb-7.0.0.2 -R)
5.  cd <amrFolder name> (i.e. cd amrnb-7.0.0.2)
6.  ./configure
7.  make
8.  sudo make install
9.  Repeat for the other AMR folder

#### Installing Xvid Codec

1.  If you haven't already untarred the folder, do
    1.  tar zxvf <xvidTarFile name> (i.e. tar zxvf xvidcore-96495761fcb95502070c2ed11d67f1bbacad7dab.tar.gz)

2.  chmod 777 <xvidfolder name> -R (i.e. chmod 777 xvidcore -R)
3.  cd <xvidfolder name> (i.e. cd xvidcore)
4.  cd build/generic
5.  ./configure
6.  make
7.  sudo make install

#### Installing FFMPEG-PHP

1.  sudo apt-get install php5-dev
2.  (May need to restart computer after this last step)
3.  If you haven't already untarred the folder, do
    1.  tar zxvf <ffmpegPHPtarFile name>

4.  cd <ffmpegPHPfolder name>
5.  phpize
6.  ./configure
7.  make
8.  sudo make install

##### Reference

Installing FFMPEG on Linux <http://www.hiteshagrawal.com/ffmpeg/installing-ffmpeg-easily-on-linux>