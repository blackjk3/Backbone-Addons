/*!
 * backbone.stagemanger.js v0.1
 * Copyright 2012, Jason Kadrmas (@itooamaneatguy)
 */

Backbone.Stage = (function(Backbone, _) {

	var StageManager = Backbone.Model.extend({
		
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
			
		},

		resize: function(w, h) {

			this.width = Math.floor(w);
			this.height = Math.floor(h);
			this.halfWidth = Math.floor(this.width/2);
			this.halfHeight = Math.floor(this.height/2);
		},

		calcWidth: function(ratio) {
			if (Modernizr.touch) {
				return Math.floor(this.width * ratio);
			} else {
				return Math.floor(this.height * ratio);
			}
		},
		
		calcHeight: function(ratio) {
			return Math.floor(this.height * ratio);
		}

	});

	return new StageManager();
})(this.Backbone, this._);