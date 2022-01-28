// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Shape Generation Function - Ethan O'Neal 2021
function generatePaper(width, height, devIndex, devStrength) {



  //defines where on the rectangle edge we tear, should be slight constraints, but can really be whereever
  //currently we're just spacing the points evenly
  let tearOffsetX = randomInteger(width / 6, width / 2);

  //defines how far into the rectangle we tear, should not be severe
  let tearOffsetY = 2;

  let tearSlope = randomInteger(1, 3)



  let corners = [
    "M 0 0",
    " L " + width + " 0",
    " L " + width + " " + height,
    " L " + "0 " + height
  ];





  //start at origin
  let path = corners[0];



  //only allow 1 tear
  let upperTears = 0;
  let deviation;
  for (let i = 0; i < devIndex; i++) {

    deviation = randomInteger(1, devStrength)
    //roll for tear
    //if true, tear
    //move to upper right corner

    if (randomInteger(0, 1) && !upperTears && (i < (devIndex - 1)) && (i > 0)) {
      //corners[1] = " L " + width + ", " + tearOffsetY;



      path +=
        " L " +
        (width * ((i + 1) / devIndex)) +
        " " + deviation +
        " L " + (width * ((i + 1) / devIndex)) + " " +
        tearOffsetY / (tearSlope * 1.65);
      upperTears++;

      if (i == devIndex - 1) {
        path += " L " + width + " " +
          tearOffsetY / (tearSlope * 1.65);
      }


    } else {




      path +=
        " L " + (width * ((i + 1) / devIndex)) + " " + deviation +
        " L " + (width * ((i + 1) / devIndex)) + " " + deviation;

      if (i == devIndex - 1) {
        path += " L " + width + " " +
          deviation;
      }

    }


  }

  //deviation on all 4 sides can feel a little aggressive, randomly add to vertical edges

  let jaggedEdgeR = randomInteger(0, 1);


  if (jaggedEdgeR) {

    let rightTears = 0;

    for (let i = 0; i < devIndex; i++) {

      deviation = randomInteger(1, devStrength)
      //roll for tear
      //if true, tear
      //move to upper right corner

      if (randomInteger(0, 1) && !rightTears && (i < (devIndex - 1)) && (i > 0)) {
        //corners[1] = " L " + width + ", " + tearOffsetY;



        path +=
          " L " +
          width +
          " " + (height * ((i + 1) / devIndex)) +
          " L " + (width - (tearOffsetY / (tearSlope * 1.65))) + " " + (height * ((i + 1) / devIndex))
          ;
        rightTears++;

        //move to corner
        if (i == devIndex - 1) {
          path += " L " + tearOffsetY / (tearSlope * 1.65) + " " +
            height;
        }


      } else {




        path +=
          " L " + (width - deviation) + " " + (height * ((i + 1) / devIndex)) +
          " L " + (width - deviation) + " " + (height * ((i + 1) / devIndex));

        if (i == devIndex - 1) {
          path += " L " + (width - deviation) + " " +
            height;
        }

      }


    }



  } else {

    //move to bottom right corner
    path += corners[2];

  }






  let lowerTears = 0;
  //roll for tear 2
  //if tear 2, tear
  //move to bottom left corner
  for (let i = 0; i < devIndex; i++) {

    deviation = randomInteger(1, devStrength)

    if (randomInteger(0, 1) && !lowerTears && (i < (devIndex - 1)) && (i > 0)) {
      // corners[3] = " L " + "0, " + (height - tearOffsetY);

      path +=
        " L " +
        (width - (width * ((i + 1) / devIndex))) +
        " " +
        (height - deviation) +
        " L " + (width - (width * ((i + 1) / devIndex))) + " " +
        (height - (tearOffsetY / (tearSlope * 1.65)));

      lowerTears++;

      if (i == devIndex - 1) {
        path += " L " + 0 + " " +
          (height - (tearOffsetY / (tearSlope * 1.65)));
      }

    } else {
      path +=
        " L " + (width - (width * ((i + 1) / devIndex))) + " " +
        (height - deviation) +
        " L " + (width - (width * ((i + 1) / devIndex))) + " " + (height - deviation);

      if (i == devIndex - 1) {
        path += " L " + 0 + " " +
          (height - deviation);
      }

    }

  }
  // path += corners[3];



  let jaggedEdgeL = randomInteger(0, 1);


  if (jaggedEdgeL) {

    let leftTears = 0;

    for (let i = 0; i < devIndex; i++) {

      deviation = randomInteger(1, devStrength)
      //roll for tear
      //if true, tear
      //move to upper right corner

      if (randomInteger(0, 1) && !leftTears && (i < (devIndex - 1)) && (i > 0)) {
        //corners[1] = " L " + width + ", " + tearOffsetY;



        path +=
          " L " +
          0 +
          " " + (height - (height * ((i + 1) / devIndex))) +
          " L " + (0 + (tearOffsetY / (tearSlope * 1.65))) + " " + (height - (height * ((i + 1) / devIndex)))
          ;
        leftTears++;

        //move to corner
        if (i == devIndex - 1) {
          //complete path
          path += " Z";
        }


      } else {


        let leftEdgeDeviationCheck = i < (devIndex - 1);

        //keep corners clean
        if (leftEdgeDeviationCheck) {
          path +=
            " L " + (0 + deviation) + " " + (height - (height * ((i + 1) / devIndex))) +
            " L " + (0 + deviation) + " " + (height - (height * ((i + 1) / devIndex)));
        } else {
          path +=
            " L " + 0 + " " + (height - (height * ((i + 1) / devIndex))) +
            " L " + 0 + " " + (height - (height * ((i + 1) / devIndex)));
        }





        if (i == devIndex - 1) {
          //complete path
          path += " Z";
        }

      }


    }



  } else {

    //complete path
    path += " Z";

  }








  return path;

}

//Random Color Function - Ethan O'Neal 2020
function getRGB() {

  let x = randomInteger(0, 1280)
  let y = randomInteger(0, 2071)
  let msg = x % y;

  let generated = {
    r: ((msg * x) % 254) / 254,
    g: ((msg * y) % 254) / 254,
    b: ((msg) % 254) / 254,
  };





  return generated;
}

figma.showUI(__html__, {
  width: 300,
  height: 400,
});

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  if (msg.type === 'create-paper') {

    if (msg.batchSize === 'single') {

      const node: SceneNode = figma.createVector();
      let paperPath = generatePaper(msg.width, msg.height, msg.deviation, msg.deviationStrength);
      let paperColor = getRGB();


      console.log(paperPath)
      paperPath = paperPath.replace(/\s\s+/g, ' ');
      console.log(paperPath);


      node.vectorPaths = [{
        windingRule: 'NONZERO',
        data: paperPath,
      }]


      node.fills = [{ type: 'SOLID', color: paperColor }];
      node.strokes = [{ type: 'SOLID', color: paperColor }];
      node.strokeAlign = "INSIDE";


      node.x = figma.viewport.center.x - node.width / 2
      node.y = figma.viewport.center.y - node.height / 2

    } else {

      const nodes: SceneNode[] = [];


      for (let i = 0; i < msg.count; i++) {
        const node: SceneNode = figma.createVector();
        let paperPath = generatePaper(msg.width, msg.height, msg.deviation, msg.deviationStrength);
        let paperColor = getRGB();


        console.log(paperPath)
        paperPath = paperPath.replace(/\s\s+/g, ' ');
        console.log(paperPath);


        node.vectorPaths = [{
          windingRule: 'NONZERO',
          data: paperPath,
        }]


        node.fills = [{ type: 'SOLID', color: paperColor }];
        node.strokes = [{ type: 'SOLID', color: paperColor }];
        node.strokeAlign = "INSIDE";
        figma.currentPage.appendChild(node);
        nodes.push(node);
      }
      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);


    }


  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.

  if (msg.type === 'cancel') {
    figma.closePlugin();
  }
  //
};
