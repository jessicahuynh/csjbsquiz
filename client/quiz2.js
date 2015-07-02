// hack to display 0,0 as the position when page is first loaded
Session.setDefault("cursorPos",{"x":0,"y":0});

Template.quiz2.helpers({
	cursorPos:function() {
		return Session.get("cursorPos");
	}
});

/* MODEL */
theModel = (function() {
	function DrawingCursor(x,y,c) {
		this.x = x;
		this.y = y;
		this.c = c;
	}
	
	function Drawing() {
		this.running = false;
		this.cursor = new DrawingCursor(-10,-10,"#000000"); // (-10,-10) so that the cursor doesn't display when you first click and drag to draw
	}

	theModel = new Drawing();
	return theModel;
}())

/* VIEW */

function fillCanvas() {
	var drawContext = drawCanvas.getContext("2d");
	drawContext.fillStyle = "#eeee00";
	drawContext.fillRect(0,0,drawCanvas.width,drawCanvas.height);
}

function draw() {
	var drawContext = drawCanvas.getContext("2d");
	drawContext.fillStyle = theModel.cursor.c;
	drawContext.fillRect(theModel.cursor.x,theModel.cursor.y,10,10);
}

theView = {draw:draw,fillCanvas:fillCanvas};

/* CONTROLLER */
Template.quiz2.rendered = function() {	
	theView.fillCanvas();
			
	drawCanvas.addEventListener('mousedown',function(e) {
		theModel.running = true;
		theGameLoop.run();
	});
	
	drawCanvas.addEventListener('mouseup',function(e) {
		theModel.running = false;
	});

	drawCanvas.addEventListener('mousemove',
		function (e) {
			if (theModel.running) {
				theModel.cursor.x = drawCanvas.width * (e.pageX - drawCanvas.offsetLeft) / drawCanvas.width;
				theModel.cursor.y = drawCanvas.height * (e.pageY - drawCanvas.offsetTop) / drawCanvas.height;
				Session.set("cursorPos",theModel.cursor);
			}
		});
}

Template.quiz2.events({
	'click #erase':function(event) {
		var drawContext = drawCanvas.getContext("2d");
		drawContext.clearRect(0,0,drawCanvas.width,drawCanvas.height);
		
		// move the cursor off the canvas so it doesn't show
		theModel.cursor.x = -10;
		theModel.cursor.y = -10;
		
		theView.fillCanvas();
	}
});

/* GAME LOOP */
function run() {
	theView.draw();
	window.requestAnimationFrame(run);
}

theGameLoop = {run:run};