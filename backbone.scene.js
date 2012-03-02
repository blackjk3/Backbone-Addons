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

		/*
			Renders an underscore template and appends it to a container.
			@method : renderTemplate
			@param : template : underscore template
			@param : data : the data to combine with the template
			@param : container : container to append generated template to
		*/

		renderTemplate: function(template, data, container) {
			this.el = $(this.el).html( this.compileTemplate( template, data ) );
			container.append( this.el );
		},

		/*
			Compiles an underscore template and returns the generated html.
			@method : compileTemplate
			@param : template : underscore template
			@param : data : the data to combine with the template
		*/

		compileTemplate: function(template, data) {
			var compiledTemplate = _.template( template, data );
			return compiledTemplate;
		},

		/*
			Adds a view to our scene object.
			@method : addView
			@param : key : unique key for the added view
			@param : child : actual view to add
		*/

		addView: function(key, child) {
			this.children[key] = child;
		},

		/*
			Removes a view from our scene object.
			@method : removeView
			@param : key : unique key for the view to remove
		*/
		
		removeView: function(key) {
			this.children[key].remove();
			delete this.children[key];
		},

		/*
			Removes all views from scene
			@method : removeAll
		*/

		removeAll: function() {
			children = null;
		},

		/*
			Gets a view based on the key
			@method : get
			@param : key : unique key for the view to retrieve
		*/

		get: function(key) {
			return this.children[key];
		},

		/*
			Destroys a scene
			@method : destroy
		*/

		destroy: function() {

			this.remove();
			this.unbind();
			this.removeAll();
		}
	});

})(this.Backbone, this._);