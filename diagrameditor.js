var line;
var start_point = [];
var end_point = [];
var rect;
var rect2;
var circle;
var ellipse;
var star;
function drag_rectangle() {
    const svg = document.getElementById("diagrameditor");
    const mousemove = Observable.fromEvent(svg, 'mousemove'), mouseup = Observable.fromEvent(svg, 'mouseup');
    rect.observe('mousedown')
        .map(({ clientX, clientY }) => ({
        xOffset: Number(rect.attr('x')) - clientX,
        yOffset: Number(rect.attr('y')) - clientY
    }))
        .flatMap(({ xOffset, yOffset }) => mousemove
        .takeUntil(mouseup)
        .map(({ clientX, clientY }) => ({
        x: clientX + xOffset,
        y: clientY + yOffset
    })))
        .subscribe(({ x, y }) => {
        rect.attr('x', x)
            .attr('y', y);
        connector(rect, 'x', 'y');
    });
}
function resize_rectangle() {
    const svg = document.getElementById("diagrameditor2");
    rect2 = new Elem(svg, 'rect')
        .attr('x', 300).attr('y', 200)
        .attr('width', 120).attr('height', 80)
        .attr('fill', 'blueviolet')
        .attr('stroke', 'black')
        .attr('stroke-width', 3);
    if (svg == document.getElementById("rotate45")) {
        rotate_rectangle45(svg);
    }
    else {
        const complete = rect2.observe('mousedown')
            .map(e => ({ event: e, svgBounds: svg.getBoundingClientRect() }))
            .map(({ event, svgBounds, }) => ({
            svgBounds: svgBounds,
            e: event,
        }))
            .subscribe(({ svgBounds, e, }) => {
            const x0 = e.clientX - svgBounds.left, y0 = e.clientY - svgBounds.top;
            Observable.fromEvent(svg, 'mousemove')
                .takeUntil(Observable.fromEvent(svg, 'mouseup'))
                .map(({ clientX, clientY }) => ({
                x0, y0,
                x1: clientX,
                y1: clientY
            }))
                .subscribe(({ x0, y0, x1, y1 }) => {
                rect2.attr('x', 300)
                    .attr('y', 200)
                    .attr('width', Math.abs(300 - x1))
                    .attr('height', Math.abs(200 - y1))
                    .attr('fill', 'blueviolet')
                    .attr('stroke', 'black')
                    .attr('stroke-width', 3);
            });
        });
        return complete;
    }
}
function rotate_rectangle45(svg) {
    rect2.attr('transform', 'rotate(45)')
        .attr('x', 400).attr('y', -100);
}
function drag_ellipse() {
    const svg = document.getElementById("diagrameditor");
    const mousemove = Observable.fromEvent(svg, 'mousemove'), mouseup = Observable.fromEvent(svg, 'mouseup');
    ellipse.observe('mousedown')
        .map(({ clientX, clientY }) => ({
        xOffset: Number(ellipse.attr('cx')) - clientX,
        yOffset: Number(ellipse.attr('cy')) - clientY
    }))
        .flatMap(({ xOffset, yOffset }) => mousemove
        .takeUntil(mouseup)
        .map(({ clientX, clientY }) => ({
        x: clientX + xOffset,
        y: clientY + yOffset
    })))
        .subscribe(({ x, y }) => {
        ellipse.attr('cx', x)
            .attr('cy', y);
        connector(ellipse, 'cx', 'cy');
    });
}
function resize_ellipse() {
    const svg = document.getElementById("diagrameditor2");
    const ellipse2 = new Elem(svg, 'ellipse')
        .attr('cx', 500).attr('cy', 300).attr('rx', 60).attr('ry', 40)
        .attr('fill', 'yellowgreen').attr('stroke', 'black')
        .attr('stroke-width', 3);
    const complete = ellipse2.observe('mousedown')
        .map(e => ({ event: e, svgBounds: svg.getBoundingClientRect() }))
        .map(({ event, svgBounds, }) => ({
        svgBounds: svgBounds,
        e: event,
    }))
        .subscribe(({ svgBounds, e, }) => {
        const x0 = e.clientX - svgBounds.left, y0 = e.clientY - svgBounds.top;
        Observable.fromEvent(svg, 'mousemove')
            .takeUntil(Observable.fromEvent(svg, 'mouseup'))
            .map(({ clientX, clientY }) => ({
            x0, y0,
            x1: clientX,
            y1: clientY
        }))
            .subscribe(({ x0, y0, x1, y1 }) => {
            ellipse2.attr('cx', 500)
                .attr('cy', 300)
                .attr('rx', Math.abs(500 - x1))
                .attr('ry', Math.abs(300 - y1))
                .attr('fill', 'yellowgreen').attr('stroke', 'black')
                .attr('stroke-width', 3);
        });
    });
    return complete;
}
function drag_circle() {
    const svg = document.getElementById("diagrameditor");
    const mousemove = Observable.fromEvent(svg, 'mousemove'), mouseup = Observable.fromEvent(svg, 'mouseup');
    circle.observe('mousedown')
        .map(({ clientX, clientY }) => ({
        xOffset: Number(circle.attr('cx')) - clientX,
        yOffset: Number(circle.attr('cy')) - clientY
    }))
        .flatMap(({ xOffset, yOffset }) => mousemove
        .takeUntil(mouseup)
        .map(({ clientX, clientY }) => ({
        x: clientX + xOffset,
        y: clientY + yOffset
    })))
        .subscribe(({ x, y }) => {
        circle.attr('cx', x)
            .attr('cy', y);
        connector(circle, 'cx', 'cy');
    });
}
function resize_circle() {
    const svg = document.getElementById("diagrameditor2");
    const circle2 = new Elem(svg, 'circle')
        .attr('cx', 500).attr('cy', 300).attr('r', 60)
        .attr('fill', 'orange').attr('stroke', 'black')
        .attr('stroke-width', 3);
    const complete = circle2.observe('mousedown')
        .map(e => ({ event: e, svgBounds: svg.getBoundingClientRect() }))
        .map(({ event, svgBounds, }) => ({
        svgBounds: svgBounds,
        e: event,
    }))
        .subscribe(({ svgBounds, e, }) => {
        const x0 = e.clientX - svgBounds.left, y0 = e.clientY - svgBounds.top;
        Observable.fromEvent(svg, 'mousemove')
            .takeUntil(Observable.fromEvent(svg, 'mouseup'))
            .map(({ clientX, clientY }) => ({
            x0, y0,
            x1: clientX,
            y1: clientY
        }))
            .subscribe(({ x0, y0, x1 }) => {
            circle2.attr('cx', 500)
                .attr('cy', 300)
                .attr('r', Math.abs(300 - x1))
                .attr('fill', 'orange').attr('stroke', 'black')
                .attr('stroke-width', 3);
        });
    });
    return complete;
}
function drawLineObservable() {
    const svg = document.getElementById("diagrameditor");
    svg.addEventListener('dblclick', e => {
        const svgRect = svg.getBoundingClientRect(), x0 = e.clientX - svgRect.left, y0 = e.clientY - svgRect.top;
        line = new Elem(svg, 'line')
            .attr('x1', '0')
            .attr('y1', '0')
            .attr('x2', '0')
            .attr('y2', '0')
            .attr('style', "stroke:black;stroke-width:2");
        function moveListener(e) {
            const x1 = e.clientX - svgRect.left, y1 = e.clientY - svgRect.top, left = Math.min(x0, x1), top = Math.min(y0, y1), width = Math.abs(x0 - x1), height = Math.abs(y0 - y1);
            line.attr('x1', String(x0))
                .attr('y1', String(y0))
                .attr('x2', String(x1))
                .attr('y2', String(y1))
                .attr('style', "stroke:black;stroke-width:2");
        }
        function upListener() {
            svg.removeEventListener('mousemove', moveListener);
            svg.removeEventListener('mouseup', upListener);
        }
        svg.addEventListener('mouseup', upListener);
        svg.addEventListener('mousemove', moveListener);
    });
}
function connector(shape, x, y) {
    if (x == 'x') {
        line
            .attr('x1', shape.attr(x))
            .attr('y1', shape.attr(y))
            .attr('x2', line.attr('x2'))
            .attr('y2', line.attr('y2'))
            .attr('style', "stroke:black;stroke-width:2");
        start_point = [];
        start_point.push([shape.attr(x), shape.attr(y)]);
        end_point.push([line.attr('x2'), line.attr('y2')]);
    }
    else if (x == 'cx') {
        line
            .attr('x1', line.attr('x1'))
            .attr('y1', line.attr('y1'))
            .attr('x2', shape.attr(x))
            .attr('y2', shape.attr(y))
            .attr('style', "stroke:black;stroke-width:2");
        start_point.push([line.attr('x2'), line.attr('y2')]);
    }
    else {
        line
            .attr('x1', shape.attr(x))
            .attr('y1', shape.attr(y))
            .attr('x2', line.attr('x1'))
            .attr('y2', line.attr('y1'))
            .attr('style', "stroke:black;stroke-width:2");
        start_point.push([line.attr('x2'), line.attr('y2')]);
    }
}
if (typeof window != 'undefined')
    window.onload = () => {
        drawLineObservable();
        const svg = document.getElementById("diagrameditor"), mousemove = Observable.fromEvent(svg, 'mousemove'), mouseup = Observable.fromEvent(svg, 'mouseup');
        rect = new Elem(svg, 'rect')
            .attr('x', 35).attr('y', 50)
            .attr('width', 120).attr('height', 80)
            .attr('fill', 'red')
            .attr('stroke', 'black')
            .attr('stroke-width', 3);
        circle = new Elem(svg, 'circle')
            .attr('cx', 95).attr('cy', 250).attr('r', 60)
            .attr('fill', 'blue').attr('stroke', 'black')
            .attr('stroke-width', 3);
        ellipse = new Elem(svg, 'ellipse')
            .attr('cx', 95).attr('cy', 420).attr('rx', 60).attr('ry', 40)
            .attr('fill', 'green').attr('stroke', 'black')
            .attr('stroke-width', 3);
    };
//# sourceMappingURL=diagrameditor.js.map