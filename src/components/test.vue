<script setup>
  import { onMounted,ref, render } from "vue";
  import '@tensorflow/tfjs-core'
  import '@tensorflow/tfjs-backend-webgl'
  import '@mediapipe/selfie_segmentation'
  import * as bodySegmentation from '@tensorflow-models/body-segmentation'
  let moveRef=ref('')
  moveRef.value = movie_mp4
  let imgRefMask =ref('')
  let segmenterObj=null

  const initFn=async()=>{
    const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
    const segmenterConfig = {
  runtime: 'mediapipe', // or 'tfjs'
  solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation',
  modelType: 'general'
  }
   segmenterObj = await bodySegmentation.createSegmenter(model, segmenterConfig);
  videpToCanvas()
  } 

  const videpToCanvas =()=>{
    let videoIdObj = document.getElementById('videoId')
    let canvasIdObj = document.getElementById('canvasId')
    var canvasIdObjCtx = canvasIdObj.getContext('2d');
    render()
    function render(){
      if(videoIdObj.readyState === videoIdObj.HAVE_ENOUGH_DATA){
        canvasIdObjCtx.drawImage(videoIdObj,0,0,448,400)
        const imageData = canvasIdObjCtx.getImageData(0,0,448,400);
        // console.log(imageData)
        segmenterFn(imageData)
      }
      requestAnimationFrame(render);
    }
  }

  const segmenterFn=async(imageData)=>{
const people = await segmenterObj.segmentPeople(imageData);
console.log(people)
// Convert the segmentation into a mask to darken the background.
const foregroundColor = {r: 0, g: 0, b: 0, a: 0};
const backgroundColor = {r: 0, g: 0, b: 0, a: 255};
const bgMask = await bodySegmentation.toBinaryMask(people, foregroundColor, backgroundColor,false,0.3);
console.log(bgMask)
const canvas2 = document.createElement('canvas');
const context2 =canvas2.getContext('2d')
canvas2.width=448
canvas2.height=440
context2.putImageData(bgMask,0,0)
const imgBase64 = canvas2.toDataURL("image/png")
imgRefMask.value=imgBase64
let maskImgIds=document.getElementById('maskImgId')
maskImgIds.style=`-webkit-mask-image: url(${imgBase64});-webkit-mask-size: 448px;440px;`
}
onMounted(()=>{
  let videoIdObj = document.getElementById('videoId')
  videoIdObj.addEventListener('play',()=>{
    console.log('开始播放')
    initFn()
  })
})
</script>
<template>
    <img :src="imgRefMask" alt="">
    <canvas id="canvasId" width="448" height="440"></canvas>
    <div class="pr">
        <div id="maskImgId">
            <div class="fontTxt" style="left: 100px;top: 60px;">哈哈哈哈哈哈</div>
            <div class="fontTxt" style="left: 100px;top: 130px;">哈哈哈哈哈哈</div>
            <div class="fontTxt" style="left: 100px;top: 200px;">哈哈哈哈哈哈</div>
            <div class="fontTxt" style="left: 100px;top: 280px;">哈哈哈哈哈哈</div>
            <div class="fontTxt" style="left: 100px;top: 330px;">哈哈哈哈哈哈</div>
        </div> 
        
         <img class="maskImg" :src="imgRefMask" alt="">
        <video id="videoId" width="448" height="440" controls :src="moveRef"></video>
    </div>
  
</template>
<style scoped>
body{
    background: red;
}
div.pr{
    position: relative;
    width: 448px;
    height: 440px;
}
img.maskImg{
    width: 448px;
    height: 440px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    opacity: .7;
}
#maskImgId{
    width: 448px;
    height: 440px;
    position: absolute;
    top: 0;
    left: 0;
}
p{
    margin: 0;
    padding: 0;
    font-size: 22px;
}
.fontTxt{
    position: absolute;
    font-size: 20px;
}
</style>