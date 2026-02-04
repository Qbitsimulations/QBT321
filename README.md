# Qbit Simulations - A321EC - A321neo
![qbitwide](https://user-images.githubusercontent.com/65448292/132729866-9bc231cf-0a8a-4dfb-9d06-b55742f15a48.png)
[![Discord](https://img.shields.io/discord/698720578055700650?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2&style=rounded-square)](https://discord.gg/B2NHWMHsJz)

Welcome to the Qbit Simulations A321EC, this is a public Airbus A321 reskin of the FlyByWire A321NX (FBW A32NX), intending to have an alternative to the payware versions available for Microsoft Flight Simulator. 
**Important note**
This project has the aim to explore the FBW ecosystem, as such once they officially announce a Airbus A321 or similar the project will be imediatelly abandoned.
### A321neo

 ```
 Model       A321-253NY
 Engine      CFM LEAP 1A32
 APU         APS3200
 FMS         Honeywell Release H3
 FWC Std.    H2F9C
 RA          Honeywell ALA-52B
 TAWS        Honeywell EGPWS
 ACAS        Honeywell TPA-100B
 ATC         Honeywell TRA-100B
 MMR         Honeywell iMMR
 WXR         Honeywell RDR-4000
 ```
The present aircraft setup is either being simulated or targeted. It's important to keep in mind that this setup could be altered in the future and that it's not a true one to one recreation of the aircraft.


## How to build
Make sure docker are isntalled. Prefferably with WSL2 backend.

#### 1. First, run following command on powershell. This will install the A32NX docker images and node modules.

For powershell:
```shell
.\scripts\dev-env\run.cmd ./scripts/setup.sh
```
For Git Bash/Linux:
```shell
./scripts/dev-env/run.sh ./scripts/setup.sh
```
#### 2. As next step we will copy the original source files and copy-over our source files.

For powershell:
```shell
.\scripts\dev-env\run.cmd ./scripts/copy.sh
```
For Git Bash/Linux:
```shell
./scripts/dev-env/run.sh ./scripts/copy.sh
```

#### 3. Build all A32NX module by running following command on powershell.

For powershell:
```shell
.\scripts\dev-env\run.cmd ./scripts/build.sh
```
For Git Bash/Linux:
```shell
./scripts/dev-env/run.sh ./scripts/build.sh
```

#### 4. The package is now ready to use. Copy the folder "qbit-aircraft-a321-251" to your CommunityPackage folder in MSFS.

#### (Optional) If you want to use the MSFS Dev Tools you can run the following command (after build completed) to copy the files to the PackageSources.

For powershell:
```shell
.\scripts\dev-env\run.cmd ./scripts/package.sh
```
For Git Bash/Linux:
```shell
./scripts/dev-env/run.sh ./scripts/package.sh
```


## Open source
Open Source Projects contributing to the realisation of this MSFS A321-200 Neo :

Systems, Cockpit, Cockpit texture, Sound: FlyByWire - https://github.com/flybywiresim


## License Information

This repository and its contents are dual-licensed, with a unique set of terms applied to the original textual-form source code and the artistic assets, respectively.

### GNU General Public License version 3 (GNU GPLv3)

The original textual-form source code in this repository is licensed under the GNU General Public License version 3 (GNU GPLv3). Compiled artifacts generated from this source code also fall under the GNU GPLv3 license.

A copy of the GNU GPLv3 can be found in the LICENSE file in this repository or [online](https://www.gnu.org/licenses/gpl-3.0.html).

### Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC 4.0)

The artistic assets within this repository, including models and textures, are licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC 4.0).

You can view the full text of the CC BY-NC 4.0 license [here](https://creativecommons.org/licenses/by-nc-sa/4.0/).

### Game Content Usage Rules

The FlyByWire Simulations A32NX, and the Qbit Simulations A321EC were all created under Microsoft's "Game Content Usage Rules" using assets from Microsoft Flight Simulator 2020. They are neither endorsed by nor affiliated with Microsoft.

### Disclaimer

We are not affiliated, associated, authorized, endorsed by, or in any way officially connected with the Airbus brand, or any of its subsidiaries or its affiliates.

### Overall

Content within distribution packages built from the sources in this repository are licensed as follows:

- Original source code or compiled artifacts from Qbit Simulations: GNU GPLv3.
- Original 3D assets from Qbit Simulations: CC BY-NC 4.0.
- Assets covered by the "Game Content Usage Rules": Under the license granted by those rules.

Please respect these licenses and attributions when using content from this repository.