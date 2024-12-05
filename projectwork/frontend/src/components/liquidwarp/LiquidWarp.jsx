import { useEffect, useRef } from "react";
import * as THREE from "three";
import * as NODES from "three/examples/jsm/nodes/Nodes";
import WebGPURenderer from "three/examples/jsm/renderers/webgpu/WebGPURenderer.js";
import { scream as holograph } from "./scream.js";

const LiquidWarp = ({ seed, color, background }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !holograph || typeof holograph !== "function") return;

    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight);
    camera.position.set(0, 0, 3);

    const renderer = new WebGPURenderer({ antialias: true })

    if (!renderer) {
      console.error("Renderer could not be initialized.");
      return;
    }

    renderer.setSize(innerWidth, innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const handleResize = () => {
      const innerWidth = window.innerWidth;
      const innerHeight = window.innerHeight;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };

    window.addEventListener("resize", handleResize);

    const holoParams = {
      scale: 1,
      variety: 1,
      color: color,
      background: background,
      seed: NODES.uniform(0),
    };

    const colorNode = holograph(holoParams);

    const holoPlate = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      new NODES.MeshPhysicalNodeMaterial({
        side: THREE.DoubleSide,
        colorNode: colorNode,
      })
    );

    scene.add(holoPlate);

    const animationLoop = (t) => {
      holoParams.seed.value = seed + 100 * Math.sin(t / 10000000);
      renderer.render(scene, camera);
    };
    
    renderer.setAnimationLoop(animationLoop);

    return async () => {
      console.log("Renderer _animation:", renderer._animation);
      window.removeEventListener("resize", handleResize);
      renderer.setAnimationLoop(null);
      if (renderer && renderer.dispose) {
        await renderer.setAnimationLoop(null);
        renderer.dispose();
      }

      if (renderer && renderer.domElement) {
        containerRef.current?.removeChild(renderer.domElement);
      }
    };
  }, [seed, color, background]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%", overflow: "hidden" }} />;
};

export default LiquidWarp;
