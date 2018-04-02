var stageWidth = 800;
var stageHeight = 800;

var center = [-38.73, 222.82, -69.34];

var widthScaler = 0.9;
var heightScaler = 1;

var tipPosition;

function haveIntersection(r1, r2) {
  return !(r2.x > r1.x + r1.width || r2.x + r2.width < r1.x || r2.y > r1.y + r1.height || r2.y + r2.height < r1.y);
}

function buildBoxes() {
  var rectbg1 = new Konva.Rect({
    x: 50,
    y: 50,
    width: 200,
    height: 200,
    name: "box 1",
    fill: "grey",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 4
  });
  var rect1 = new Konva.Rect({
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    name: "box 1",
    fill: "green",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 4
  });
  var rectbg2 = new Konva.Rect({
    x: 300,
    y: 50,
    width: 200,
    height: 200,
    name: "box 2",
    fill: "grey",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 4
  });
  var rect2 = new Konva.Rect({
    x: 350,
    y: 100,
    width: 100,
    height: 100,
    name: "box 2",
    fill: "green",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 4
  });
  var rectbg3 = new Konva.Rect({
    x: 550,
    y: 50,
    width: 200,
    height: 200,
    name: "box 3",
    fill: "grey",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 4
  });
  var rect3 = new Konva.Rect({
    x: 600,
    y: 100,
    width: 100,
    height: 100,
    name: "box 3",
    fill: "green",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 4
  });
  var rectbg4 = new Konva.Rect({
    x: 50,
    y: 300,
    width: 200,
    height: 200,
    name: "box 4",
    fill: "grey",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 4
  });
  var rect4 = new Konva.Rect({
    x: 100,
    y: 350,
    width: 100,
    height: 100,
    name: "box 4",
    fill: "green",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 4
  });
  var rectbg5 = new Konva.Rect({
    x: 300,
    y: 300,
    width: 200,
    height: 200,
    name: "box 4",
    fill: "grey",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 4
  });
  var rect5 = new Konva.Rect({
    x: 350,
    y: 350,
    width: 100,
    height: 100,
    name: "box 5",
    fill: "green",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 4
  });
  var rectbg6 = new Konva.Rect({
    x: 550,
    y: 300,
    width: 200,
    height: 200,
    name: "box 6",
    fill: "green",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 4
  });
  var rect6 = new Konva.Rect({
    x: 600,
    y: 350,
    width: 100,
    height: 100,
    name: "box 6",
    fill: "green",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 4
  });
  var rectbg7 = new Konva.Rect({
    x: 50,
    y: 550,
    width: 200,
    height: 200,
    name: "box 7",
    fill: "green",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 4
  });
  var rect7 = new Konva.Rect({
    x: 100,
    y: 600,
    width: 100,
    height: 100,
    name: "box 7",
    fill: "green",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 4
  });
  var rectbg8 = new Konva.Rect({
    x: 300,
    y: 550,
    width: 200,
    height: 200,
    name: "box 9",
    fill: "green",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 4
  });
  var rect8 = new Konva.Rect({
    x: 350,
    y: 600,
    width: 100,
    height: 100,
    name: "box 8",
    fill: "green",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 4
  });
  var rectbg9 = new Konva.Rect({
    x: 550,
    y: 550,
    width: 200,
    height: 200,
    name: "box 9",
    fill: "green",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 4
  });
  var rect9 = new Konva.Rect({
    x: 600,
    y: 600,
    width: 100,
    height: 100,
    name: "box 9",
    fill: "green",
    stroke: "black",
    opacity: 0.4,
    strokeWidth: 4
  });
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
  opacity: 0.4,
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
    layer.children.each(box => {
      boundingBox = box.getClientRect();
      if (haveIntersection(tipBoundingBox, boundingBox) && pos[2] < 1) {
        // console.log("Intersecting with", box.name());
        box.fill("red");
        box.opacity(1);
        box.scaleX(1.2);
        box.scaleY(1.2);
      } else {
        box.fill("green");
        box.opacity(0.2);
        box.scaleX(1);
        box.scaleY(1);
      }
    });
  },
  [layer, overlayLayer, tipLayer]
);

stage.add(layer);
stage.add(bgLayer);
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
