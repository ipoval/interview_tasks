var EventTarget = function() {
  Object.defineProperty(this, '__listeners', {
    value: {}
  });
};
Object.defineProperties(EventTarget.prototype, {
  addEvent: {
    value: function(eventType, listener) {
      if (typeof this.__listeners[eventType] === 'undefined') {
        this.__listeners[eventType] = [];
      }
      this.__listeners[eventType].push(listener);
    },
    enumerable: true
  },
  removeEvent: {
    value: function(eventType, listener) {
      var listeners = this.__listener[eventType];
      if (typeof listeners === 'undefined') { return; }
      for (var i = 0, len = listeners.length; i < len; i++) {
        if (listeners[i] == listener) {
          listeners.splice(i, 1);
          break;
        }
      }
    },
    enumerable: true
  },
  __fire: {
    value: function(eventObj) {
      if (typeof eventObj.type === 'undefined') { throw new Error('event object needs type'); }
      if (typeof eventObj.target === 'undefined') {throw new Error('event object needs target'); }
      var listeners = this.__listeners[eventObj.type];
      if (typeof listeners === 'undefined') { return; }
      for (var i = 0, len = listeners.length; i < len; i++) {
        listeners[i].call(this, eventObj);
      }
    }
  }
});

var oojs = (function(oojs) {
  var ToolbarItem = function(itemElement) {
    EventTarget.call(this);

    Object.defineProperty(this, '__el', { /* define pseudo-private property */
      value: itemElement
    });
  };

  ToolbarItem.prototype = Object.create(EventTarget.prototype, {
    toggleActiveState: {
      value: function() { this.activated = !this.activated; },
      enumerable: true
    },
    enabled: {
      get: function() { return !this.__el.classList.contains("disabled"); },
      set: function(val) {
        var currentValue = this.enabled;
        if (currentValue == val) { return; }

        if (val) { this.__el.classList.remove("disabled"); }
        else { this.__el.classList.add("disabled"); }

        this.__fire({ type: "enabledchanged", value: val });
      }
    },
    activated: {
      get: function() { return this.__el.classList.contains("active"); },
      set: function(val) {
        var currentValue = this.activated;
        if (currentValue == val) { return; }

        if (val) { this.el.classList.add("active"); }
        else { this.el.classList.remove("active"); }

        this.__fire({ type: "activatedchanged", value: val });
      }
    }
  });

  var createToolbarItems = function(itemElements) {
    return Array.prototype.map.call(itemElements, function(el, idx, array) {
      return new ToolbarItem(el);
    });
  };

  var Toolbar = function(toolbarElement) {
    EventTarget.call(this);
    var items = toolbarElement.querySelectorAll(".toolbar-item");

    Object.defineProperties(this , {
      __el: { value: toolbarElement },
      items: {
        value: createToolbarItems(items),
        enumerable : true
      }
    });
  };

  Toolbar.prototype = Object.create(EventTarget.prototype, {
    add: {
      value: function(options) {
        var span = document.createElement("span");
        span.className = "toolbar-item";
        this.__el.appendChild(span);
        var item = new ToolbarItem(span);
        this.items.push(item);

        this.__fire({ type: 'itemadded', target: this, item: item });
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
  * var toolbar = oojs.createToolbar("myToolbar");
  * toolbar.addEvent('itemadded', function(evt) { alert(evt.type); });
  * toolbar.add();
  * toolbar.appendTo(document.body);
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
