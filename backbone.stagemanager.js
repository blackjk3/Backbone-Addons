/*
 * backbone.stagemanger.js v0.1.1
 * Copyright 2012, Jason Kadrmas (@itooamaneatguy)
 * License: MIT
 */

Backbone.Stage = (function(Backbone, _) {

	var StageManager = Backbone.Model.extend({
		
		ORIENTATIONS: {
			PORTRAIT: 'portrait',
			LANDSCAPE: 'landscape'
		},

		vendors: {Webkit: 'webkit', Moz: '', O: 'o', ms: 'ms'},
		testEl: document.createElement('div'),
		prefix: '',

		initialize: function(w, h) {
			var width = w !== undefined ? h : window.innerWidth,
				height = h !== undefined ? h : window.innerHeight;

			this.currentScene = null;
			this.resize(width,height);

			if (Modernizr.touch) {
				this.clickEvent = 'touchstart';
				this.delayedClickEvent = 'touchend';
				this.moveEvent = 'touchmove';
				this.upEvent = 'touchend';
			} else {
				this.clickEvent = 'click';
				this.delayedClickEvent = 'click';
				this.moveEvent = 'mousemove';
				this.upEvent = 'click';
			}

			if(width > height) {
				this.orientation = this.ORIENTATIONS.PORTRAIT;
			} else {
				this.orientation = this.ORIENTATIONS.LANDSCAPE;
			}

			for( var key in this.vendors ) {

				if (this.testEl.style[this.vendors[key] + 'TransitionProperty'] !== undefined) {
					this.prefix = '-' + this.vendors[key] + '-';
					return false;
				}
			}

			this.testEl = null;
		},

		/*
			A method to resize the viewport values used by stage manager.
			@method : resize
			@param w : new width of viewport
			@param h : new height of viewport
		*/

		resize: function(w, h) {

			this.width = Math.floor(w);
			this.height = Math.floor(h);
			this.halfWidth = Math.floor(this.width/2);
			this.halfHeight = Math.floor(this.height/2);
		},

		/*
			A method to calculate a percentage value based on the current width of the viewport.
			@method : calcWidth
			@param ratio : percentage of width
		*/

		calcWidth: function(ratio) {
			if (this.orientation === this.ORIENTATIONS.LANDSCAPE) {
				return Math.floor(this.width * ratio);
			} else {
				return Math.floor(this.height * ratio);
			}
		},
		
		/*
			A method to calculate a percentage value based on the current height of the viewport.
			@method : calcHeight
			@param ratio : percentage of height
		*/

		calcHeight: function(ratio) {
			return Math.floor(this.height * ratio);
		},

		/*
			A layout method for positioning elements with percentages as values.
			@method : layout
			@param w : width (ratio)
			@param h : height (ratio)
			@param x : x position (ratio)
			@param y : y position (ratio)
			@param z : z position
			@param center : center item within x/y coordinates. Values include. h, v, both
		*/

		layout: function(args) {

			var w = this.calcWidth(args.w),
				h = args.h !== undefined ? this.calcWidth(args.h) : w,
				
				x = this.calcWidth(args.x),
				y = args.y !== undefined ? this.calcHeight(args.y) : x,
				z = args.z !== undefined ? args.z : false,

				returnObject = {
					width: w,
					height: h
				};

			// Check if object should be centered horizontally, vertically, or both.
			if(args.center !== undefined) {
				if(args.center === "h" || args.center === "both") {
					x -= Math.floor(w/2);
				}
				if(args.center === "v" || args.center === "both") {
					y -= Math.floor(h/2);
				}
			}

			// Add the translate object properties to our returnObject.
			// This object should be used with a "$.css()" method in jQuery or Zepto.
			// The point is that this stage manager is library agnostic and just passes
			// back the raw css property objects.
			
			_.extend(returnObject, this.translate(x, y, z));
			
			// Return our object containing css properties
			return returnObject;
		},

		/*
			A method to construct a CSS3 transform: translate(x,y)
			@method : translate
			@param x : x position
			@param y : y position
			@param z : z position
		*/

		translate: function(x, y, z) {

			var prefix = this.prefix + 'transform',
				translate, obj = {};

			if(Modernizr.csstransforms3d && z !== false) {
				translate = "translate3d(" + x + "px," + y + "px," + z + "px)";
			} else {
				translate = "translate(" + x + "px," + y + "px)";
			}
			
			obj[prefix] = translate;

			return obj;
		}

	});

	return new StageManager();
})(this.Backbone, this._);