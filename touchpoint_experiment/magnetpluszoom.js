var stageWidth = 800;
var stageHeight = 800;

var center = [-38.73, 222.82, -69.34];

var widthScaler = 1.3;
var heightScaler = 1.3;

var tipPosition;

var interactionBoxOpacity = 0;

// mapping from the name of the interaction box to the movement box.
var boxInteractionMapping = {};
function haveIntersection(r1, r2) {
  return !(r2.x > r1.x + r1.width || r2.x + r2.width < r1.x || r2.y > r1.y + r1.height || r2.y + r2.height < r1.y);
}

function getQuadrant(pointer, box) {
  // 1 - Top Left
  // 2 - Top Right
  // 3 - Bottom Left
  // 4 - Bottom Right

  boxX = box.x + box.width / 2;
  boxY = box.y + box.height / 2;
  if (pointer.x < boxX && pointer.y < boxY) {
    return 1;
  }

  if (pointer.x >= boxX && pointer.y < boxY) {
    return 2;
  }
  if (pointer.x < boxX && pointer.y > boxY) {
    return 3;
  }

  if (pointer.x > boxX && pointer.y > boxY) {
    return 4;
  }

  return 0;
}

function buildBoxes() {
  var rectbg1 = new Konva.Rect({
    x: 50,
    y: 50,
    width: 200,
    height: 200,
    name: "boxBG1",
    fill: "grey",
    stroke: "black",
    opacity: interactionBoxOpacity,
    strokeWidth: 4
  });
  var rect1 = new Konva.Rect({
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    name: "box1",
    fill: "green",
    stroke: "black",
    opacity: 1,
    strokeWidth: 4
  });

  boxInteractionMapping["boxBG1"] = rect1;
  var rectbg2 = new Konva.Rect({
    x: 300,
    y: 50,
    width: 200,
    height: 200,
    name: "boxBG2",
    fill: "grey",
    stroke: "black",
    opacity: interactionBoxOpacity,
    strokeWidth: 4
  });
  var rect2 = new Konva.Rect({
    x: 350,
    y: 100,
    width: 100,
    height: 100,
    name: "box2",
    fill: "green",
    stroke: "black",
    opacity: 1,
    strokeWidth: 4
  });

  boxInteractionMapping["boxBG2"] = rect2;

  var rectbg3 = new Konva.Rect({
    x: 550,
    y: 50,
    width: 200,
    height: 200,
    name: "boxBG3",
    fill: "grey",
    stroke: "black",
    opacity: interactionBoxOpacity,
    strokeWidth: 4
  });
  var rect3 = new Konva.Rect({
    x: 600,
    y: 100,
    width: 100,
    height: 100,
    name: "box3",
    fill: "green",
    stroke: "black",
    opacity: 1,
    strokeWidth: 4
  });

  boxInteractionMapping["boxBG3"] = rect3;

  var rectbg4 = new Konva.Rect({
    x: 50,
    y: 300,
    width: 200,
    height: 200,
    name: "boxBG4",
    fill: "grey",
    stroke: "black",
    opacity: interactionBoxOpacity,
    strokeWidth: 4
  });
  var rect4 = new Konva.Rect({
    x: 100,
    y: 350,
    width: 100,
    height: 100,
    name: "box4",
    fill: "green",
    stroke: "black",
    opacity: 1,
    strokeWidth: 4
  });

  boxInteractionMapping["boxBG4"] = rect4;

  var rectbg5 = new Konva.Rect({
    x: 300,
    y: 300,
    width: 200,
    height: 200,
    name: "boxBG5",
    fill: "grey",
    stroke: "black",
    opacity: interactionBoxOpacity,
    strokeWidth: 4
  });
  var rect5 = new Konva.Rect({
    x: 350,
    y: 350,
    width: 100,
    height: 100,
    name: "box5",
    fill: "green",
    stroke: "black",
    opacity: 1,
    strokeWidth: 4
  });

  boxInteractionMapping["boxBG5"] = rect5;

  var rectbg6 = new Konva.Rect({
    x: 550,
    y: 300,
    width: 200,
    height: 200,
    name: "boxBG6",
    fill: "grey",
    stroke: "black",
    opacity: interactionBoxOpacity,
    strokeWidth: 4
  });
  var rect6 = new Konva.Rect({
    x: 600,
    y: 350,
    width: 100,
    height: 100,
    name: "box6",
    fill: "green",
    stroke: "black",
    opacity: 1,
    strokeWidth: 4
  });

  boxInteractionMapping["boxBG6"] = rect6;

  var rectbg7 = new Konva.Rect({
    x: 50,
    y: 550,
    width: 200,
    height: 200,
    name: "boxBG7",
    fill: "grey",
    stroke: "black",
    opacity: interactionBoxOpacity,
    strokeWidth: 4
  });
  var rect7 = new Konva.Rect({
    x: 100,
    y: 600,
    width: 100,
    height: 100,
    name: "box7",
    fill: "green",
    stroke: "black",
    opacity: 1,
    strokeWidth: 4
  });

  boxInteractionMapping["boxBG7"] = rect7;

  var rectbg8 = new Konva.Rect({
    x: 300,
    y: 550,
    width: 200,
    height: 200,
    name: "boxBG8",
    fill: "grey",
    stroke: "black",
    opacity: interactionBoxOpacity,
    strokeWidth: 4
  });
  var rect8 = new Konva.Rect({
    x: 350,
    y: 600,
    width: 100,
    height: 100,
    name: "box8",
    fill: "green",
    stroke: "black",
    opacity: 1,
    strokeWidth: 4
  });

  boxInteractionMapping["boxBG8"] = rect8;

  var rectbg9 = new Konva.Rect({
    x: 550,
    y: 550,
    width: 200,
    height: 200,
    name: "boxBG9",
    fill: "grey",
    stroke: "black",
    opacity: interactionBoxOpacity,
    strokeWidth: 4
  });
  var rect9 = new Konva.Rect({
    x: 600,
    y: 600,
    width: 100,
    height: 100,
    name: "box9",
    fill: "green",
    stroke: "black",
    opacity: 1,
    strokeWidth: 4
  });
  boxInteractionMapping["boxBG9"] = rect9;

  // add the shape to the layer
  bgLayer.add(rectbg1);
  layer.add(rect1);
  bgLayer.add(rectbg2);
  layer.add(rect2);
  bgLayer.add(rectbg3);
  layer.add(rect3);
  bgLayer.add(rectbg4);
  layer.add(rect4);
  bgLayer.add(rectbg5);
  layer.add(rect5);
  bgLayer.add(rectbg6);
  layer.add(rect6);
  bgLayer.add(rectbg7);
  layer.add(rect7);
  bgLayer.add(rectbg8);
  layer.add(rect8);
  bgLayer.add(rectbg9);
  layer.add(rect9);
}

var stage = new Konva.Stage({
  container: "container",
  width: stageWidth,
  height: stageHeight
});

var layer = new Konva.Layer();
var bgLayer = new Konva.Layer();

buildBoxes();

var leap = new Leap.Controller();
leap.connect();

var tipLayer = new Konva.Layer();

var tip = new Konva.Circle({
  x: 0,
  y: 0,
  radius: 10,
  fill: "red",
  stroke: "black",
  opacity: 1,
  strokeWidth: 2,
  opacity: 0.3,
  visible: true
});

// calibrators = [[400, 300], [400, 0], [400, 600], [0, 300], [800, 300]];
calibrators = [[stageWidth / 2, stageHeight / 2]];

for (const coord of calibrators) {
  var centerer = new Konva.Circle({
    x: coord[0],
    y: coord[1],
    radius: 10,
    fill: "blue",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 2,
    opacity: 0.3,
    visible: true
  });
  tipLayer.add(centerer);
}

tipLayer.add(tip);

var overlay = new Konva.Text({ text: "Overlay", width: 100, height: 200, x: 690, y: 10 });
overlayLayer = new Konva.Layer();
overlayLayer.add(overlay);
var anim = new Konva.Animation(
  function(frame) {
    var time = frame.time,
      timeDiff = frame.timeDiff,
      frameRate = frame.frameRate;

    // update finger tip display with data from latest frame
    var tipPointer = 0;
    var leapFrame = leap.frame();
    if (leapFrame.valid) {
      var iBox = leapFrame.interactionBox;

      if (leapFrame.hands.length > 0) {
        // var pointable = leapFrame.pointables[p];
        var pointable = leapFrame.hands[0].indexFinger;
        tipPosition = pointable.tipPosition;
        iBox.center = center;
        // iBox.width = boxWidth;
        // iBox.height = boxHeight;
        var pos = iBox.normalizePoint(tipPosition, true);

        // custom scaling for the point.

        posWRTCenter = [pos[0] - 0.5, pos[1] - 0.5];
        posWRTCenter = [posWRTCenter[0] * widthScaler, posWRTCenter[1] * heightScaler];
        posWRTCenter = [posWRTCenter[0] + 0.5, posWRTCenter[1] + 0.5];
        // console.log(`Box ${iBox.width}, ${iBox.height}`);
        // console.log(pointable.tipPosition);

        overlay.text(`FPS : ${Math.floor(frameRate)}, coords: ${pos[2]}`);

        tip.setX(posWRTCenter[0] * stageWidth);
        tip.setY(stageHeight - posWRTCenter[1] * stageHeight);
      }
    }

    // check collisions
    tipBoundingBox = tip.getClientRect();
    bgLayer.children.each(box => {
      boundingBox = box.getClientRect();

      if (haveIntersection(tipBoundingBox, boundingBox)) {
        // console.log("Intersecting with", box.name());
        // console.log("tip", tipBoundingBox.x, tipBoundingBox.y);
        // console.log("box", boundingBox.x, boundingBox.y);
        // console.log(getQuadrant(tipBoundingBox, boundingBox));
        var quadrant = getQuadrant(tipBoundingBox, boundingBox);
        interactionBox = boxInteractionMapping[box.name()];

        switch (quadrant) {
          case 1:
            interactionBox.x(boundingBox.x);
            interactionBox.y(boundingBox.y);

            break;
          case 2:
            interactionBox.x(boundingBox.x + boundingBox.width / 2);
            interactionBox.y(boundingBox.y);
            break;
          case 3:
            interactionBox.x(boundingBox.x);
            interactionBox.y(boundingBox.y + boundingBox.height / 2);
            break;
          case 4:
            interactionBox.x(boundingBox.x + boundingBox.width / 2);
            interactionBox.y(boundingBox.y + boundingBox.height / 2);
            break;
        }
        interactionBox.scaleX(1.3);
        interactionBox.scaleY(1.3);
        interactionBox.fill("red");
        interactionBox.opacity(1);
      } else {
        interactionBox = boxInteractionMapping[box.name()];
        interactionBox.x(boundingBox.x + boundingBox.width / 4);
        interactionBox.y(boundingBox.y + boundingBox.height / 4);

        interactionBox.fill("green");
        interactionBox.opacity(0.8);
        interactionBox.scaleX(1);
        interactionBox.scaleY(1);
      }
    });
  },
  [layer, overlayLayer, tipLayer]
);

stage.add(bgLayer);
stage.add(layer);
stage.add(tipLayer);
stage.add(overlayLayer);
anim.start();

document.onkeypress = function(oPEvt) {
  var oEvent = oPEvt || window.event,
    nChr = oEvent.charCode;
  if (nChr == 99) {
    center = tipPosition;
    console.log("Center set to ", tipPosition);
  }
};
