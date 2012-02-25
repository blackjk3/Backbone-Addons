/*!
 * backbone.scene.js v0.1
 * Copyright 2012, Jason Kadrmas (@itooamaneatguy)
 */

(function(Backbone, _) {

	Backbone.Scene = Backbone.View.extend({});

	_.extend(Backbone.Scene.prototype, {
		
		children: {},
		transition: null,

		// Can be overridden by extended class.
		initialize: function() {},

		// Can be overridden by extended class.
		show: function() {
			this.el.show();
			return this;
		},

		// Can be overridden by extended class.
		hide: function() {
			this.el.hide();
			return this;
		},

		renderTemplate: function(template, data, container) {
			var compiledTemplate = _.template( template, data );
	
			this.el = $(this.el).html(compiledTemplate);
			container.append( this.el );
		},

		addView: function(key, child) {
			this.children[key] = child;
		},

		removeView: function(key) {
			this.children[key].remove();
			delete this.children[key];
		},

		removeAll: function() {
			children = null;
		},

		get: function(key) {
			return this.children[key];
		},

		destroy: function() {

			this.remove();
			this.unbind();
			this.removeAll();
		}
	});

})(this.Backbone, this._);