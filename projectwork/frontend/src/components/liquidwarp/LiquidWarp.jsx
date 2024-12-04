import { useEffect, useState, useRef } from "react";
import * as THREE from 'three';
import * as NODES from 'three/examples/jsm/nodes/Nodes';

import WebGPURenderer from "three/examples/jsm/renderers/webgpu/WebGPURenderer.js";

import { scream as holograph } from "./scream.js";

// const module = await import(
//   "https://cdn.jsdelivr.net/npm/tsl-textures@0.6.0/src/scream.js"
// );

// const holograph = module.scream;

const LiquidWarp = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !holograph || typeof holograph !== "function") return;

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight);
    camera.position.set(0, 0, 3);

    const renderer = new WebGPURenderer({ antialias: true });
    if (!renderer) return;
    renderer.setSize(innerWidth, innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    window.addEventListener("resize", () => {
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    });

    const holoParams = {
      scale: 1,
      variety: 1,
      color: new THREE.Color(0, 1, 1),
      background: new THREE.Color(0, 0, 0),
      seed: NODES.uniform(0),
    };

    const colorNode = holograph(holoParams);

    var holoPlate = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      new NODES.MeshPhysicalNodeMaterial({
        side: THREE.DoubleSide,
        colorNode: colorNode
      })
    );
    scene.add(holoPlate);
    function animationLoop(t) {
      holoParams.seed.value = 100 * Math.sin(t / 1500000);
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animationLoop);

    return () => {
      renderer.setAnimationLoop(null); // Stop the animation loop

      // Dispose of materials and geometries in the scene
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      // Dispose the renderer
      try{
        renderer.dispose(); //FIXME
      }
      catch(e){}
      

      // Remove the renderer DOM element
      if (renderer.domElement) {
        containerRef.current?.removeChild(renderer.domElement);
      }

    };
  }, []); // Depend on holograph to ensure it's loaded

  return <div ref={containerRef} style={{ width: "100vw", height: "50vh", overflow:"hidden"}} />;
};

export default LiquidWarp;