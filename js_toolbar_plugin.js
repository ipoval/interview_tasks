var plgToolbar = (function(plgToolbar) {
  "use strict";

  var embraceToolbarItems = function() {
    var items = [];
    [].forEach.call(itemElements, function(el, idx, array) {
      var item = {
        toggleActiveState: function() { this.activated = !this.activated; }
      };

      Object.defineProperties(item, {
        el: { value: el },

        enabled: {
          get: function() {
            return !this.el.classList.contains("disabled");
          },
          set: function(value) {
            if(value) { this.el.classList.remove("disabled"); }
            else      { this.el.classList.add("disabled"); }
          }
        },

        activated: {
          get: function() {
            return this.el.classList.contains("active");
          },
          set: function(value) {
            if(value) { this.el.classList.add("active"); }
            else      { this.el.classList.remove("active"); }
          }
        }
      });

      items.push(item);
    });
    return items;
  };

  plgToolbar.createToolbar = function(elementId) {
    var element = document.getElementById(elementId);
    var items = element.querySelectorAll('.toolbar-item');

    return { items: embraceToolbarItems(items) };
  };

  return plgToolbar;
})(plgToolbar || {});
