<script setup>
import { onMounted, ref, render } from "vue";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@mediapipe/selfie_segmentation";
import * as bodySegmentation from "@tensorflow-models/body-segmentation";
let imgRefMask = ref("");
let segmenterObj = null;
let isRunning = false;
let danmudata=null;
const initFn = async () => {
  isRunning = true;
  const model = bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation;
  const segmenterConfig = {
    runtime: "mediapipe", // or 'tfjs'
    solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation",
    modelType: "general",
  };
  segmenterObj = await bodySegmentation.createSegmenter(model, segmenterConfig);
  videpToCanvas();
  setTimeout(() => {
    isRunning = false;
  }, 5000); // 设置定时器，5000 毫秒后停止函数执行
};

const videpToCanvas = () => {
  let videoIdObj = document.getElementById("videoId");
  let rect = videoIdObj.getBoundingClientRect();
  let canvasIdObj = document.getElementById("canvasId");
  var canvasIdObjCtx = canvasIdObj.getContext("2d");
  render();
  function render() {
    if (videoIdObj.readyState === videoIdObj.HAVE_ENOUGH_DATA) {
      canvasIdObjCtx.drawImage(videoIdObj,0,-60, 1500, 820);
      const imageData = canvasIdObjCtx.getImageData(0,0, 1500, 820);
      segmenterFn(imageData,rect.left,rect.top);
    }
    requestAnimationFrame(render);
  }
};

const segmenterFn = async (imageData,x,y) => {
  const people = await segmenterObj.segmentPeople(imageData);
  console.log(people);
  // Convert the segmentation into a mask to darken the background.
  const foregroundColor = { r: 0, g: 0, b: 0, a: 0 };
  const backgroundColor = { r: 0, g: 0, b: 0, a: 255 };
  const bgMask = await bodySegmentation.toBinaryMask(
    people,
    foregroundColor,
    backgroundColor,
    false,
    0.1
  );
  const canvas2 = document.createElement("canvas");
  const context2 = canvas2.getContext("2d");
  canvas2.width = 1500;
  canvas2.height = 820;
  context2.putImageData(bgMask,x,y);
  const imgBase64 = canvas2.toDataURL("image/png");
  imgRefMask.value = imgBase64;
  let maskImgIds = document.getElementById("bulletmu");
  maskImgIds.style = `-webkit-mask-image: url(${imgBase64});-webkit-mask-size: 1500px;820px;`;
};
const randomColor = () => {
  var colorArr = [
    "pink",
    "red",
    "blue",
    "puper",
    "orange",
    "black",
    "DarkMagenta",
    "DoderBlue",
    "DeepSkyBlue",
    "CadetBlue",
    "DarkSlateGray",
    "Yellow",
    "Tomato",
    "	RosyBrown",
  ];
  var color = parseInt(Math.random() * colorArr.length);
  return colorArr[color];
};
const test = ()=>{
  for (var i = 0; i < 10; i++) {
    //评论产生的随机高度
    var pageH = parseInt(Math.random() * 600);
    //创建span元素（弹幕条）
    var newSpan = $("<span></span>");
    //获取用户输入的字符串
    var str = "666666666666666";
    //为新元素赋值
    newSpan.text(str);
    //每次发表后清空输入框
    $("#text").val("");
    //设置弹幕出现位置
    newSpan.css("left", "1400px");
    newSpan.css("top", pageH);
    //设置弹幕颜色
    newSpan.css("color", randomColor());
    //弹幕动画
    newSpan.animate({ left: -500 }, 10000, "linear", function () {
      $(this).remove();
    });
    //弹幕添加
    newSpan.appendTo("#bulletmu");
  }
};
const danmu = (danmudata) => {
  console.log("运行中")
  const video = document.getElementById("videoId");
  var currentTime = Math.ceil(video.currentTime);
  const videoName = $("#videoSelect").val();
  let currentdanmu = danmudata.filter((item, i ,arr)=>{
    return (item.time === currentTime&&item.video === videoName)
  })
  console.log(currentTime)
  for(var i =0 ;i< currentdanmu.length;i++)
  { 
  var str=currentdanmu[i].data
  //评论产生的随机高度
  var pageH = parseInt(Math.random() * 600);
  //创建span元素（弹幕条）
  var newSpan = $("<span></span>");
  //获取用户输入的字符
  //为新元素赋值
  newSpan.text(str);
  //每次发表后清空输入框
  $("#text").val("");
  //设置弹幕出现位置
  newSpan.css("left", "1200px");
  newSpan.css("top", pageH);
  //设置弹幕颜色
  newSpan.css("color", randomColor());
  //弹幕动画
  newSpan.animate({ left: -500 }, 10000, "linear", function () {
    $(this).remove();
  });
  //弹幕添加
  newSpan.appendTo("#bulletmu");
  }
};
onMounted(() => {
  axios.get('http://localhost:8888')
      .then(response => {
        console.log(response.data);
        danmudata=response.data;
      })
      .catch(error => {
        console.log(error)
      })
  let videoIdObj = document.getElementById("videoId");
  videoIdObj.addEventListener("play", () => {
    });
  setInterval(() => {  
    test()
    //danmu(danmudata)
      },1000)
});
function open1() {
  initFn();
}
function open2() {
    window.location.reload();
}
function open3() {
    const videoElement = document.getElementById("videoId");
// 更改视频源
		const videoName = $("#videoSelect").val();
    videoElement.src="src/video/"+videoName
}
</script>

<script>
import $ from "jquery";
import axios from "axios";
$(function () {
  $(document).on('click','#btn-dm',function (e) {
    e.preventDefault();
    e.stopPropagation();
    const video = document.getElementById("videoId");
    var currentTime = Math.ceil(video.currentTime);
    const videoName = $("#videoSelect").val();
    //评论产生的随机高度
    var pageH = parseInt(Math.random() * 600);
    //创建span元素（弹幕条）
    var newSpan = $("<span></span>");
    //获取用户输入的字符串
    var str = $("#text").val();
    //为新元素赋值
    newSpan.text(str);
    //每次发表后清空输入框
    $("#text").val("");
    //设置弹幕出现位置
    newSpan.css("left", "1200px");
    newSpan.css("top", pageH);
    //设置弹幕颜色
    newSpan.css("color", randomColor());
    //弹幕动画
    newSpan.animate({ left: -500 }, 10000, "linear", function () {
      $(this).remove();
    });
    //弹幕添加
    newSpan.appendTo("#bulletmu");
    const data = {
                video:videoName,
                time:currentTime,
                data:str
              }
    axios.post('http://localhost:8888',data,{
      headers: { 'content-type': 'application/json' }
      }
    )
  });

  function randomColor() {
    var colorArr = [
      "pink",
      "red",
      "blue",
      "puper",
      "orange",
      "black",
      "DarkMagenta",
      "DoderBlue",
      "DeepSkyBlue",
      "CadetBlue",
      "DarkSlateGray",
      "Yellow",
      "Tomato",
      "	RosyBrown",
    ];
    var color = parseInt(Math.random() * colorArr.length);
    return colorArr[color];
  }
});
</script>

<template>
  <head>
    <meta charset="utf-8" />
    <title>弹幕dome</title>
    <img :src="imgRefMask" alt="" />
    <canvas id="canvasId" width="1500" height="800"></canvas>
  </head>
  <body>
    <div class="bulletbox" id="bulletbox">
      <div class="bulletboxmin" id="bulletboxmin">
        <div class="bulletmu" id="bulletmu"></div>
        <div id="videoId-box" style="display: inline-block;">
          <video
            id="videoId"
            width="1500"
            height="820"
            controls
            src="../video/lx.mp4"
            class="videoId"
          ></video>
        </div>
        <!-- <div id="buttons">
          <button id="buttons">弹幕不遮挡</button>
        </div> -->
      </div>
      <div class="bulletbot">
        <div class="bulletbotmin">
          <button type="button" class="btn-list1" id="btn1" @click="open1">
            开启弹幕防遮挡
          </button>
          <button type="button" class="btn-list2" id="btn2" @click="open2">
            关闭弹幕防遮挡
          </button>
          <p>吐槽:</p>
          <input
            type="text"
            class="text"
            id="text"
            v-model="text"
            placeholder="火力已加满..."
          />
          <button type="button" class="btn" id="btn-dm">
            发布
          </button>
          <select id="videoSelect" class="select"> 
            <option value="lx.mp4">罗翔</option>
            <option value="lyh.mp4">罗永浩</option>
            <option value="kk.mp4">蔡徐坤</option>
          </select>
          <button type="button" class="btn-list3" id="btn3" @click="open3">
            选择视频
          </button>
        </div>
      </div>
    </div>
  </body>
</template>
<style>
#bulletboxmin {
    position: relative; /* 确保设置相对定位 */
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    width: 100%; /* 根据需要设置宽度，这里假设要充满整个父容器 */
    height: 100%; /* 同理，设置高度 */
  }

  #videoId-box {
    /* 如果需要的话，保留此样式以确保video的inline-block特性 */
    display: inline-block;
  }

  .videoId {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; /* 保持视频宽高比并适应容器大小 */
  }
</style>