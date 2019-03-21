
/**
 * @ author  Mark Dhruba Sikder
 * @ ID: 26529548 
 */



// defining global variables
var line: Elem;
var start_point: [String][] = [];
var end_point: [String][] = [];
var rect: Elem;
var rect2: Elem;
var circle: Elem;
var ellipse: Elem;
var star: Elem;

//--------------------------------------------------------------------------------------------------------------------------------------//

/**
 * This functions make task is to drag the rectangle drawn in the 
 * diagrameditor. It takes 0 parameters. The svg points to the diagrameditor 
 * where the rectangle is situated. 
 * @param None
 */
function drag_rectangle() {
  const svg = document.getElementById("diagrameditor");     // getting the diagrameditor id

  const mousemove = Observable.fromEvent<MouseEvent>(svg, 'mousemove'),   // mouse events 
    mouseup = Observable.fromEvent<MouseEvent>(svg, 'mouseup');


  // when we click the rectangle the event starts listening to our actions. 
  rect.observe<MouseEvent>('mousedown')
    .map(({ clientX, clientY }) => ({
      xOffset: Number(rect.attr('x')) - clientX,    // creates the x and y offsets
      yOffset: Number(rect.attr('y')) - clientY
    }))
    .flatMap(({ xOffset, yOffset }) =>
      mousemove
        .takeUntil(mouseup)                        // records till the click is done.  
        .map(({ clientX, clientY }) => ({
          x: clientX + xOffset,                    // sets the new x and y by using the offsets 
          y: clientY + yOffset
        })))
    .subscribe(({ x, y }) => {
      rect.attr('x', x)
        .attr('y', y)
      connector(rect, 'x', 'y')                      // calls the line function for connection if line starts drawing
    });



}

// --------------------------------------------------------------------------------------------------------------------------- // 


/**
 * This function builds a rectangle and resizes it to any shape. This function also
 * calls the rotate function for rotating the object. 
 * @param none
 */
function resize_rectangle() {
  const svg = document.getElementById("diagrameditor2");                   //gets the diagrameditor2 id
  // building the rectangle in the diagrameditor2 canvas
  rect2 = new Elem(svg, 'rect')
    .attr('x', 300).attr('y', 200)         // attributes
    .attr('width', 120).attr('height', 80)
    .attr('fill', 'blueviolet')
    .attr('stroke', 'black')
    .attr('stroke-width', 3);

  // if the user wants to rotate the rectangle 45 degrees. 
  if (svg == document.getElementById("rotate45")) {
    rotate_rectangle45(svg);
  }

   // else just continue with the resizing
  else {

    const complete = rect2.observe<MouseEvent>('mousedown')                    // when the mouse is clicked
      .map(e => ({ event: e, svgBounds: svg.getBoundingClientRect() }))
      .map(({ event, svgBounds, }) => (
        {
          svgBounds: svgBounds,
          e: event,
        }
      ))
      .subscribe(({ svgBounds, e, }) => {
        const x0 = e.clientX - svgBounds.left,
          y0 = e.clientY - svgBounds.top;
        Observable.fromEvent<MouseEvent>(svg, 'mousemove')         // observes the mouse event
          .takeUntil(Observable.fromEvent(svg, 'mouseup'))
          .map(({ clientX, clientY }) => ({
            x0, y0,
            x1: clientX,
            y1: clientY
          }))
          .subscribe(({ x0, y0, x1, y1 }) => {
            rect2.attr('x', 300)
              .attr('y', 200)
              .attr('width', Math.abs(300 - x1))              // changing the width according to what i am pulling the mouse.
              .attr('height', Math.abs(200 - y1))             // changing the height according to what i am pulling the mouse.  
              .attr('fill', 'blueviolet')
              .attr('stroke', 'black')
              .attr('stroke-width', 3);
          }
          );
      });

    return complete;
  }
}

//--------------------------------------------------------------------------------------------------------------------------------//

/**
 * This function rotates the rectangle 45 degrees
 * @param svg the rectangle
 */
function rotate_rectangle45(svg: HTMLElement) {
  rect2.attr('transform', 'rotate(45)')      // transforming the rectangle to 45 degrees
    .attr('x', 400).attr('y', -100);
}


// --------------------------------------------------------------------------------------------------------------------------------// 


/**
 * This functions task is to drag the ellipse drawn in the 
 * diagrameditor. It takes 0 parameters. The svg points to the diagrameditor 
 * where the ellipse is situated. 
 * @param none
 */
function drag_ellipse() {
  const svg = document.getElementById("diagrameditor");                // getting the diagrameditor id
  const mousemove = Observable.fromEvent<MouseEvent>(svg, 'mousemove'),  // mouse events
    mouseup = Observable.fromEvent<MouseEvent>(svg, 'mouseup');

  ellipse.observe<MouseEvent>('mousedown')                          // when we click the ellipse the event starts listening
    .map(({ clientX, clientY }) => ({
      xOffset: Number(ellipse.attr('cx')) - clientX,               // x and y offsets
      yOffset: Number(ellipse.attr('cy')) - clientY
    }))
    .flatMap(({ xOffset, yOffset }) =>
      mousemove
        .takeUntil(mouseup)                                       // records till the click is done. 
        .map(({ clientX, clientY }) => ({
          x: clientX + xOffset,                                   // the new offsets
          y: clientY + yOffset
        })))
    .subscribe(({ x, y }) => {                                    // storing the new ellipse attributes
      ellipse.attr('cx', x)
        .attr('cy', y)
      connector(ellipse, 'cx', 'cy')                                 // calling the function to connect
    });

}
// -------------------------------------------------------------------------------------------------------------------------------------//

/**
 * This function helps to resize the ellipse to any size. 
 * @param none
 */

function resize_ellipse() {
  const svg = document.getElementById("diagrameditor2");                   //gets the id
  const ellipse2 = new Elem(svg, 'ellipse')
    .attr('cx', 500).attr('cy', 300).attr('rx', 60).attr('ry', 40)
    .attr('fill', 'yellowgreen').attr('stroke', 'black')
    .attr('stroke-width', 3);

  // when the mouse is clicked on the ellipse  
  const complete = ellipse2.observe<MouseEvent>('mousedown')
    .map(e => ({ event: e, svgBounds: svg.getBoundingClientRect() }))
    .map(({ event, svgBounds, }) => (
      {
        svgBounds: svgBounds,
        e: event,
      }
    ))
    .subscribe(({ svgBounds, e, }) => {
      const x0 = e.clientX - svgBounds.left,
        y0 = e.clientY - svgBounds.top;
      Observable.fromEvent<MouseEvent>(svg, 'mousemove')              // observes the mouse event
        .takeUntil(Observable.fromEvent(svg, 'mouseup'))
        .map(({ clientX, clientY }) => ({
          x0, y0,
          x1: clientX,
          y1: clientY
        }))
        .subscribe(({ x0, y0, x1, y1 }) => {
          ellipse2.attr('cx', 500)
            .attr('cy', 300)
            .attr('rx', Math.abs(500 - x1))                               // changing the ellipse size
            .attr('ry', Math.abs(300 - y1))                                 
            .attr('fill', 'yellowgreen').attr('stroke', 'black')
            .attr('stroke-width', 3);
        }
        );
    });

  return complete;
  
}

// -------------------------------------------------------------------------------------------------------------------------------------//



/**
 * This functions task is to drag the ellipcirclese drawn in the 
 * diagrameditor. It takes 0 parameters. The svg points to the diagrameditor 
 * where the circle is situated.
 * @param none 
 */
function drag_circle() {
  const svg = document.getElementById("diagrameditor");                     // getting the diagrameditor id

  // when we click the ellipse the event starts listening
  const mousemove = Observable.fromEvent<MouseEvent>(svg, 'mousemove'),
    mouseup = Observable.fromEvent<MouseEvent>(svg, 'mouseup');

  circle.observe<MouseEvent>('mousedown')                                 // when we click the ellipse the event starts listening
    .map(({ clientX, clientY }) => ({
      xOffset: Number(circle.attr('cx')) - clientX,                      // setting  the x and y offsets
      yOffset: Number(circle.attr('cy')) - clientY
    }))
    .flatMap(({ xOffset, yOffset }) =>
      mousemove
        .takeUntil(mouseup)                                           // records till the click is done.   
        .map(({ clientX, clientY }) => ({
          x: clientX + xOffset,                                       // the new offsets
          y: clientY + yOffset
        })))
    .subscribe(({ x, y }) => {
      circle.attr('cx', x)                                            // storing the new circle attributes
        .attr('cy', y)
      connector(circle, 'cx', 'cy')                                       // calling the connector function
    });

}

//-----------------------------------------------------------------------------------//

/**
 * This function resizes the circle. 
 * @param none
 */
function resize_circle() {
  const svg = document.getElementById("diagrameditor2");                   //gets the id
  // building the circle 
  const circle2 = new Elem(svg, 'circle')
    .attr('cx', 500).attr('cy', 300).attr('r', 60)
    .attr('fill', 'orange').attr('stroke', 'black')
    .attr('stroke-width', 3);

  // when the circle is clicked
  const complete = circle2.observe<MouseEvent>('mousedown')
    .map(e => ({ event: e, svgBounds: svg.getBoundingClientRect() }))
    .map(({ event, svgBounds, }) => (
      {
        svgBounds: svgBounds,
        e: event,
      }
    ))
    .subscribe(({ svgBounds, e, }) => {
      const x0 = e.clientX - svgBounds.left,
        y0 = e.clientY - svgBounds.top;
      Observable.fromEvent<MouseEvent>(svg, 'mousemove')              // observes the mouse event
        .takeUntil(Observable.fromEvent(svg, 'mouseup'))
        .map(({ clientX, clientY }) => ({
          x0, y0,
          x1: clientX,
          y1: clientY
        }))
        .subscribe(({ x0, y0, x1 }) => {
          circle2.attr('cx', 500)
            .attr('cy', 300)
            .attr('r', Math.abs(300 - x1))                              // changing the radius. This will automatically 
                                                                        // change the width and height
            .attr('fill', 'orange').attr('stroke', 'black')
            .attr('stroke-width', 3);
        }
        );
    });

  return complete;
}

// -------------------------------------------------------//
/**
 * This function is to draw the line from any point in the canvas. 
 * It can be a random line or a line from shape. It takes 0 parameters. 
 * The line is drawn using a double click.  
 * @param none
 */
function drawLineObservable() {

  const svg = document.getElementById("diagrameditor");           // getting the diagrameditor id
  svg.addEventListener('dblclick', e => {                         // on double click start drawing the line
    const
      svgRect = svg.getBoundingClientRect(),
      x0 = e.clientX - svgRect.left,                             
      y0 = e.clientY - svgRect.top;

    line = new Elem(svg, 'line')                                 // lines initial co-ordinates
      .attr('x1', '0')
      .attr('y1', '0')
      .attr('x2', '0')
      .attr('y2', '0')
      .attr('style', "stroke:black;stroke-width:2");            // colour of the line

    /**
     *  This function is the listener function which activates according to the mouse actions.
     * double click hits the event that a line is going to be drawn. 
     * @param e The listener event
     */
    function moveListener(e: MouseEvent) {
      const x1 = e.clientX - svgRect.left,                             
        y1 = e.clientY - svgRect.top,
        left = Math.min(x0, x1),
        top = Math.min(y0, y1),
        width = Math.abs(x0 - x1),
        height = Math.abs(y0 - y1);
      line.attr('x1', String(x0))                 // storing the end points of the line
        .attr('y1', String(y0))
        .attr('x2', String(x1))
        .attr('y2', String(y1))
        .attr('style', "stroke:black;stroke-width:2");
    }

    /**
     * This function is the listener which stops th events after the double click is down and
     * the click is removed after drawing the line. 
     */
    function upListener() {                            
      svg.removeEventListener('mousemove', moveListener);
      svg.removeEventListener('mouseup', upListener);
    }

    // this is the event listener
    svg.addEventListener('mouseup', upListener);
    svg.addEventListener('mousemove', moveListener);
  });
}

// ------------------------------------------------------------------------------------------------------------------ //

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * This function connects two shapes with a line and dragging the shapes keeps the line fixed with the shapes. 
 * @param shape The shapes drawn
 * @param x     The string representing which shape it is
 * @param y     The string representing which shape it is
 */
function connector(shape: Elem, x: string, y: string) {

  // the string x represents the shape. In this case it is a rect. It stores the line points. 
  if (x == 'x') {
    line
      
      .attr('x1', shape.attr(x))                    // x1 line point
      .attr('y1', shape.attr(y))                    // y1 line point
      .attr('x2', line.attr('x2'))                  // x2 line point
      .attr('y2', line.attr('y2'))                  // y2 line point
      .attr('style', "stroke:black;stroke-width:2")
    start_point = []
    start_point.push([shape.attr(x), shape.attr(y)])     // storing the initial point of the line 
    end_point.push([line.attr('x2'), line.attr('y2')])  // storing the end point


  }

  // the string x represents the shape. In this case it is a circle. It stores the line points. 
  else if (x == 'cx') {
    line
      .attr('x1', line.attr('x1'))                 // x1 line point
      .attr('y1', line.attr('y1'))                 // y1 line point
      .attr('x2', shape.attr(x))                   // x2 line point
      .attr('y2', shape.attr(y))                   // y2 line point
      .attr('style', "stroke:black;stroke-width:2")
    start_point.push([line.attr('x2'), line.attr('y2')])    // storing the end point

  }
  // for connecting circle with ellipse
  else {
    line
      .attr('x1', shape.attr(x))                  // x1 line point
      .attr('y1', shape.attr(y))                  // y1 line point
      .attr('x2', line.attr('x1'))                // x2 line point
      .attr('y2', line.attr('y1'))                // y2 line point
      .attr('style', "stroke:black;stroke-width:2")
    
    start_point.push([line.attr('x2'), line.attr('y2')])      // storing the end points
  

  }

}
// ------------------------------------------------------------------------------------------------------------------------------//

if (typeof window != 'undefined')
  window.onload = () => {

    drawLineObservable();   // calling the draw line function

    const svg = document.getElementById("diagrameditor"),
      mousemove = Observable.fromEvent<MouseEvent>(svg, 'mousemove'),
      mouseup = Observable.fromEvent<MouseEvent>(svg, 'mouseup');
    // making the rectangle
    rect = new Elem(svg, 'rect')
      .attr('x', 35).attr('y', 50)
      .attr('width', 120).attr('height', 80)
      .attr('fill', 'red')
      .attr('stroke', 'black')
      .attr('stroke-width', 3);
      

    // making the circle
    circle = new Elem(svg, 'circle')
      .attr('cx', 95).attr('cy', 250).attr('r', 60)
      .attr('fill', 'blue').attr('stroke', 'black')
      .attr('stroke-width', 3);

    // making an ellipse
    ellipse = new Elem(svg, 'ellipse')
      .attr('cx', 95).attr('cy', 420).attr('rx', 60).attr('ry', 40)
      .attr('fill', 'green').attr('stroke', 'black')
      .attr('stroke-width', 3);

  }