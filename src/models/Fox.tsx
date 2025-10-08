"use client";

import React, { useRef, useEffect, JSX } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type FoxProps = JSX.IntrinsicElements["group"] & {
  currentAnimation: string;
};

type FoxNodes = {
  GLTF_created_0_rootJoint?: THREE.Object3D;
  Object_7?: THREE.SkinnedMesh;
  Object_8?: THREE.SkinnedMesh;
  Object_9?: THREE.SkinnedMesh;
  Object_10?: THREE.SkinnedMesh;
  Object_11?: THREE.SkinnedMesh;
};

type FoxMaterials = {
  PaletteMaterial001?: THREE.Material;
};

type FoxGLTF = GLTF & {
  nodes: FoxNodes;
  materials: FoxMaterials;
  animations: THREE.AnimationClip[];
};

export default function Fox({ currentAnimation, ...props }: FoxProps) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/assets/3d/fox.glb"
  ) as unknown as FoxGLTF;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions) return;
    Object.values(actions).forEach((action) => action?.stop());
    if (actions[currentAnimation]) {
      actions[currentAnimation]?.play();
    }
  }, [actions, currentAnimation]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        {nodes.GLTF_created_0_rootJoint && (
          <primitive object={nodes.GLTF_created_0_rootJoint} />
        )}
        {nodes.Object_7 && (
          <skinnedMesh
            geometry={nodes.Object_7?.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Object_7?.skeleton}
          />
        )}
        {nodes.Object_8 && (
          <skinnedMesh
            geometry={nodes.Object_8?.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Object_8?.skeleton}
          />
        )}
        {nodes.Object_9 && (
          <skinnedMesh
            geometry={nodes.Object_9?.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Object_9?.skeleton}
          />
        )}
        {nodes.Object_10 && (
          <skinnedMesh
            geometry={nodes.Object_10?.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Object_10?.skeleton}
          />
        )}
        {nodes.Object_11 && (
          <skinnedMesh
            geometry={nodes.Object_11?.geometry}
            material={materials.PaletteMaterial001}
            skeleton={nodes.Object_11?.skeleton}
          />
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/assets/3d/fox.glb");
