---
layout: post
title: "Déploiement d'un cluster Ceph sur Proxmox VE"
category: "Active"
tags: [Proxmox, Ceph, HA]
excerpt: "Comment j'ai mis en place un stockage distribué sur mon homelab pour assurer la haute disponibilité de mes machines virtuelles critiques."
---

## 1. Le contexte et le besoin

Afin de prévenir la panne matérielle d'un disque ou d'un nœud physique entier, j'ai décidé de tester la technologie **Ceph** nativement intégrée à Proxmox. L'objectif est d'avoir un stockage répliqué sur 3 nœuds minimum.

<div class="callout warning">
  <strong>Attention :</strong> Ceph nécessite un réseau réseau dédié (idéalement 10 Gbps) pour fonctionner correctement sans impacter le trafic des VMs.
</div>

## 2. Configuration réseau (VLAN)

La première étape consiste à isoler le trafic de réplication. Voici la configuration réseau appliquée sur les switchs Cisco :

```bash
Switch(config)# vlan 50
Switch(config-vlan)# name Ceph_Storage
Switch(config-vlan)# exit
Switch(config)# interface range GigabitEthernet 1/0/1 - 3
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 50
