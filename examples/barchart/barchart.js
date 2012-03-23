(function(exports) {

// Barchart Visualization
// ------------

var Barchart = Dance.Performer.extend({

  transitions: {

    // New items
    // ------------

    enter: function(items) {
      items.each(function(item) {
        var bar = $('<div class="bar" id="'+item.html_id+'"></div>')
                     .css('left', item.pos.x)
                     .css('bottom', 0)
                     .css('width', item.pos.dx)
                     .css('height', item.pos.dy);
        $('#canvas').append(bar);
      });
    },

    // Existing items
    // ------------

    update: function(items) {
      items.each(function(item) {
        var cell = $('#'+item.html_id)
                     .css('left', item.pos.x)
                     .css('bottom', 0)
                     .css('width', item.pos.dx)
                     .css('height', item.pos.dy)
      });
    },

    // Items that no longer exist in the collection
    // ------------

    exit: function(items) {

    }
  },


  // Constructor
  // ------------

  initialize: function(options) {
    this.items = options.items.items();
    console.log(this.items);
  },

  // Run the barchart layouting algorithm
  // ------------

  layout: function(property) {
    this.items.each(function(item, key, index) {
      item.pos = {
        x: index*50,
        dx: 40,
        dy: item.get(property)
      };
    });
  },

  // Update visualization (new property selection)
  // ------------

  update: function(property) {
    this.layout(property);
    this.refresh();
  },

  render: function() {
    return this;
  }
});

exports.Barchart = Barchart;

})(window);