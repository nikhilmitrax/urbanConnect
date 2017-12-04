const stageDiv = document.getElementById("stage");
const vPlaneDelta = 50;
const stageScalingFactor = 1000;
const defInteractionBox = [[-25.5077, 301.73], [30.6594, 249.462]];
const stage = [[-25.5077, 301.73], [30.6594, 249.462]];
const maxInteractableDistance = 500;

var vPlaneZ = screenZ + vPlaneDelta;
var screenZ = -120;
var interactionBox = [[-45, 240], [40, 310]];
var calibrationLevel = -1;
var paused = false;
function minkowskiDistance(array1, array2, p=2, coefficient = [1,1,1]){

  let poweredDistance = 0;
  // console.log("coefficient", coefficient)
  for (let i=0; i<array1.length; i++){
    poweredDistance += coefficient[i] * Math.abs(Math.pow(array1[i], p)-Math.pow(array2[i],p))
  }
  // console.log("Arr1",array1)
  // console.log("Arr2", array2)
  const totalDistance = Math.pow(poweredDistance, 1/p).toPrecision(3)
  console.log("totalDistance", totalDistance)
  return totalDistance
}

//TODO : Move zoom to 3D
function transformBox(tipPos, box, scaleDelta, slack = 0) {

  var relativePosition = getRelativeNormalizedPosition(box);
  let finger = getNormalizedPointer(tipPos);
  const x = finger[0];
  const y = finger[1];
  const z = finger[2];


  // FOr XY locked only z based zooming
  const distanceFactor = ((z - vPlaneZ) / (screenZ - vPlaneZ))
  let zoomFactor = 1 + distanceFactor * scaleDelta;

  if (x > (relativePosition.right+slack) || x < (relativePosition.left-slack) || y < (relativePosition.top-slack) || y > (relativePosition.bottom+slack))
    zoomFactor = 1
  if (z > vPlaneZ)
    zoomFactor = 1;

  // const boxCenter = [(relativePosition.left + relativePosition.right)/2, (relativePosition.top + relativePosition.bottom)/2, screenZ]
  // const fingerDistance = minkowskiDistance(finger, boxCenter, p=2, coefficient=[1,1,1])
  
//   let zoomFactor = 1;
//   if (x > (relativePosition.right+slack) || x < (relativePosition.left-slack) || y < (relativePosition.top-slack) || y > (relativePosition.bottom+slack)){
//   if (fingerDistance < maxInteractableDistance){
//     // console.log("calc factors", fingerDistance, scaleDelta)
//     zoomFactor = 1+((maxInteractableDistance-fingerDistance)/maxInteractableDistance)*(scaleDelta)
//   }
// }
//   // console.log('pre zoom factor', zoomFactor)
  zoomFactor = isNaN(zoomFactor) ? 1 : zoomFactor.toPrecision(3);
  zoomFactor = (1 + scaleDelta < zoomFactor) ? (1 + scaleDelta) : zoomFactor;
  // console.log('zoom factor', zoomFactor)
  box.style.transform = `scale(${zoomFactor},${zoomFactor})`
}

function zoomBoxes(tipPos, scaleDelta = 0.5) {

  boxes = document.getElementsByClassName("interactable-zoom");
  Array.from(boxes).forEach(box => { transformBox(tipPos, box, scaleDelta) });
}

function getRelativeNormalizedPosition(box) {

  // normalized distance from top left
  const parentPos = stageDiv.getBoundingClientRect();
  const childrenPos = box.getBoundingClientRect();

  const stageHeight = parentPos.height;
  const stageWidth = parentPos.width;
  relativePos = {};
  relativePos.top = ((childrenPos.top - parentPos.top) / stageHeight) * stageScalingFactor,
    relativePos.right = ((childrenPos.right - parentPos.left) / stageWidth) * stageScalingFactor,
    relativePos.bottom = ((childrenPos.bottom - parentPos.top) / stageHeight) * stageScalingFactor,
    relativePos.left = ((childrenPos.left - parentPos.left) / stageWidth) * stageScalingFactor;
  return relativePos
}

function getNormalizedPointer(fingerPos) {
  let width = stage[1][0] - stage[0][0];
  let height = stage[0][1] - stage[1][1];

  let pointerX = fingerPos[0] - stage[0][0];
  let pointerY = stage[0][1] - fingerPos[1];
  return [(pointerX / width) * stageScalingFactor, (pointerY / height) * stageScalingFactor, (fingerPos[2])];
}

function calibrateStage(tipPos) {
  console.log('start calibration');
  if (calibrationLevel < 1) {
    calibrationLevel = 1;
    console.log('calibration level 1');
    stage[0][0] = tipPos[0];
    stage[0][1] = tipPos[1];
    console.log(interactionBox);
    screenZ = tipPos[2];
    vPlaneZ = screenZ + vPlaneDelta;
    return 0;
  } else if (calibrationLevel === 1) {
    console.log('calibration level 2');
    calibrationLevel = 0;
    stage[1][0] = tipPos[0];
    stage[1][1] = tipPos[1];
    screenZ = tipPos[2];
    vPlaneZ = screenZ + vPlaneDelta;
    console.log(interactionBox);
  }
  console.log(`Calibration Level ${calibrationLevel}`)
}

const debugBox = document.getElementById("debug-box");
const box1 = document.getElementById("box1");
function showDebugInfo(frame) {
  debugBox.innerHTML = "";
  const finger = frame.hands[0].indexFinger;
  debugBox.innerHTML += getNormalizedPointer(finger.tipPosition).map(val => Math.round(val));
  debugBox.innerHTML += '<br />';
  debugBox.innerHTML += finger.tipPosition.map(val => Math.round(val));
  debugBox.innerHTML += '<br />';
  // var rect = getRelativeNormalizedPosition(box1);
  // debugBox.innerHTML += `Box pos : ${Math.round(rect.top)}, ${Math.round(rect.right)}, ${Math.round(rect.bottom)}, ${Math.round(rect.left)}`;
  // debugBox.innerHTML += '<br />';

}

function togglePause(){
  paused = !paused;
}
Leap.loop(function (frame) {
  if (frame.hands.length > 0) {
    const finger = frame.hands[0].indexFinger;

    showDebugInfo(frame);
    if (calibrationLevel === 0 && paused===false) {
      zoomBoxes(finger.tipPosition, scaleDelta = 0.1);
    }
    document.onkeypress = function (oPEvt) {
      var oEvent = oPEvt || window.event, nChr = oEvent.charCode;
      if (nChr == 99) {
        calibrateStage(finger.tipPosition);
      }
      if (nChr == 112) {
        togglePause(finger.tipPosition);
      }
    }
  }
});
