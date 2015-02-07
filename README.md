# genarts
Simple Generative Arts with JavaScript

![Genarts Demo Screenshot](http://storage.spaces.puresolutions.com.vn/demo/genarts/screenshot.png)

### To build the library:
```
npm install
grunt
```

### Usage:
Please view the `examples/index.html` file for more details on setting up the canvas and handling different browser sizes. I personally prefer a fullscreen experience, but you might want to set things up the way you want. The `Genarts` library itself is used as shown below:
```
var genarts = new GenArts(ctx); // ctx is the HTML5 canvas context

/*
 * basic mode of the show: there will be 2 beams bouncing off the canvas borders until timeout
 */
genarts.basic(
	window.innerWidth/2,  // x coordinate of the point where you want the beams to start from
	window.innerHeight/2, // y coordinate of the point where you want the beams to start from
	Math.random()*20-10,  // original x velocity of the beam
	Math.random()*16-8    // original y velocity of the beam
);
```

and then you can press Fullscreen and enjoy a modest screen-saver :)
