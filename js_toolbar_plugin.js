var oojs = (function(oojs) {
  var ToolbarItem = function(itemElement) {
    Object.defineProperty(this, '__el', { /* define pseudo-private property */
      value: itemElement
    });
  };

  Object.defineProperties(ToolbarItem.prototype, {
    toggleActiveState: {
      value: function() { this.activated = !this.activated; },
      enumerable: true
    },
    enabled: {
      get: function() { return !this.__el.classList.contains("disabled"); },
      set: function(val) {
        if (val) { this.__el.classList.remove("disabled"); }
        else { this.__el.classList.add("disabled"); }
      }
    },
    activated: {
      get: function() { return this.__el.classList.contains("active"); },
      set: function(val) {
        if (val) { this.el.classList.add("active"); }
        else { this.el.classList.remove("active"); }
      }
    }
  });

  var createToolbarItems = function(itemElements) {
    return Array.prototype.map.call(itemElements, function(el, idx, array) {
      return new ToolbarItem(el);
    });
  };

  var Toolbar = function(toolbarElement) {
    var items = toolbarElement.querySelectorAll(".toolbar-item");

    Object.defineProperties(this , {
      __el: { value: toolbarElement },
      items: {
        value: createToolbarItems(items),
        enumerable : true
      }
    });
  };

  Object.defineProperties(Toolbar.prototype, {
    add: {
      value: function(options) {
        var span = document.createElement("span");
        span.className = "toolbar-item";
        this.__el.appendChild(span);
        var item = new ToolbarItem(span);
        this.items.push(item);
      },
      enumerable: true
    },
    remove: {
      value: function(idx) {
        var len = this.items.length;
        if (idx > len || idx < 0) { throw new Error("Index is out of range"); } 
        var item = this.items[idx];
        this.items.splice(idx, 1);
        this.__el.removeChild(item.__el);
        item = null;
      },
      enumerable: true
    },
    appendTo: {
      value: function(parentEl) { parentEl.appendChild(this.__el); },
      enumerable: true
    }
  });

  /*
  * entry point of the script - factory function
  * var toolbar = oojs.createToolbar('myToolbar');
  */
  oojs.createToolbar = function(elId) {
    var element = document.getElementById(elId);
    if (!element) {
      element = document.createElement("div");
      element.id = elId;
      element.className = "toolbar";
    }
    return new Toolbar(element);
  };

  return oojs;
}(oojs || {}));
