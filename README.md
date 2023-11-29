MultiQR
=========

Service for use on the [TAG Neuron(R)](https://lab.tagroot.io/Documentation/Index.md), that allows for encoding of 
multi-source and multi-purpose QR-codes.

## Installable Package

The MultiQR service has been made into a package that can be downloaded and installed on any 
[TAG Neuron](https://lab.tagroot.io/Documentation/Index.md). To create a package, that can be distributed or installed, you begin by creating 
a *manifest file*. This repository contains a manifest file called `MultiQR.manifest`. It defines the content files included in the package. 
You then use the `Waher.Utility.Install` and `Waher.Utility.Sign` command-line tools in the [IoT Gateway](https://github.com/PeterWaher/IoTGateway) 
repository, to create a package file and cryptographically sign it for secure distribution across the Neuron network.

The MultiQR service is published as a package on TAG Neurons. If your Neuron is connected to this network, you can install the
package using the following information:

| Package information                                                                                                              ||
|:-----------------|:---------------------------------------------------------------------------------------------------------------|
| Package          | `TAG.MultiQR.package`                                                                                          |
| Installation key | `lOUZEY8IYlvFlZG/5w/cmlpUi+wf5AT/6bLFxeOBLLnkGb9JIalJX4DnrYlq+ptx1Q0IFMq72BKAad7686eccaa8c34bc092e2026b2619f3` |
| More Information |                                                                                                                |

## Solution File

A Visual Studio solution file, with references to the files and folders of this repository, is available: `MultiQR.sln`.

## Main Page

The main page of the MultiQR service is `/MultiQR.md`.
