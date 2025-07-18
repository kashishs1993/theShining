import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';
import {loadAudio, loadGLTF, loadVideo} from "./libs/loader.js";

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {

    // initialize MindAR 
    const mindarThree = new MindARThree({
      container: document.body,
      imageTargetSrc: './shining.mind',
       uiScanning: "no",
      uiLoading: "no",
    });
    const {renderer, scene, camera} = mindarThree;

    //video
    const video = await loadVideo("./Shining2.mp4");
    const texture = new THREE.VideoTexture(video);
    
    const geometry = new THREE.PlaneGeometry(2 , 2.5);
    const material = new THREE.MeshBasicMaterial({map: texture});
    const plane = new THREE.Mesh(geometry, material);
    
    //anchor
    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    anchor.onTargetFound = () => {
      video.loop = true;
      video.play();
    }
    anchor.onTargetLost = () => {
      video.pause();
    }
    video.addEventListener( 'play', (loop) => {
    });


    // start AR
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  // start button
  const startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.addEventListener("click", start);
  document.body.appendChild(startButton);
  // start();
});
