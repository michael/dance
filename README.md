Dance.js
========

[Dance.js](http://github.com/michael/dance) is a simple data-driven
visualization framework. It's basically a flavor of
[Backbone.js](http://documentcloud.github.com/backbone/), but enriched
with some of the ideas of the very popular
[D3.js](http://mbostock.github.com/d3/) visualization framework.

A Dance.js dance involves several Performers (aka views or
visualizations) who are performing on screen. Users of Backbone.js might
already be familiar with the API, as it's pretty much the same as for
`Backbone.View`. Dance.js comes with its own data manipulation
framework, [Data.js](http://substance.io/michael/data-js) which
functions as a replacement for `Backbone.Model`.

Download and Installation
=========================

There's no official release yet.

Checkout the Source Code on [Github](http://github.com/michael/data).
Dance.js depends on [Data.js](http://substance.io/michael/data-js) and
[Underscore.js](http://documentcloud.github.com/underscore), make sure
to have included a recent version of each.

Dance.Performer
===============

In order to have a good dance, you need at least one experienced
`Dance.Performer`. Okay, performers as individuals are all different.
Some might be unbeatable in dancing the classic waltz (speaking of
classical HTML Views), while others shine when it comes to modern
artistic dancing (aka data visualizations).

    var Barchart = Backbone.View.extend({

      events: {
        "click .bar":          "open",
      },

      render: function() {
        ...
      }

    });

Please use the [Backbone.js API
docs](http://documentcloud.github.com/backbone/#View).

Dance.Instructor
================

If your dance performance involves many performers, it's most likely
that you need a `Dance.Instructor`, coordinating your dance.

    var Instructor = Dance.Instructor.extend({
      routes: {
        "methodology":              "methodology",          // #methodology
        "power_consumption/:state": "powerConsumption",     // #power_consumption/dc
      },

      bars: function() {
        ...
      },

      search: function(state) {
        ...
      }
    });

Once you have setup your instructor you are ready to perform that dance.

    window.instructor = new Instructor({});
    Dance.perform(); // Starts responding to routes

Enter / Exit / Update
---------------------

Much like in the spirit of D3.js, you can specify transformations, based
on data-changes. Application developers may consider three different
cases here: The updating nodes to modify, the entering nodes to add, and
the exiting nodes to remove. An example implementation for an animated
Barchart could look like this:

    var Barchart = Dance.Performer.extend({
      collections: {
        "items": {
          enter: function(items) {
            items.each(function(item) {
              var bar = $('<div class="bar" id="'+item.html_id+'"></div>')
                    .css('left', item.pos.x)
                    .css('bottom', 0)
                    .css('width', item.pos.dx)
                    .css('height', item.pos.dy)
                    .appendTo($('#canvas'));
            });
          },
      
          update: function(items) {
            items.each(function(item) {
             $('#'+item.html_id)
               .css('left', item.pos.x)
               .css('width', item.pos.dx)
               .css('height', item.pos.dy)
            });
          },
      
          exit: function(items) {
            items.each(function(i, key) { $('#'+key).remove(); });
          }
        }
      },
      
      ...
    }

You can specify transformations for an arbitrary number of collections
your visualization is using.

First-time dances
=================

There are a couple of first-time dances to start with. Check them out.

-   [The Barchart Dance](http://bl.ocks.org/2172216)

![The Barchart
Dance](http://substance-assets.s3.amazonaws.com/68/6ae5ed1421157b81058d88f4c88f9c/bars.png)