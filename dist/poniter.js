"use strict";(function(){"use strict";var poniter={};poniter.listen = function PoniterListener(element){var trackedPointerStates=new Map();var elementListeners={};function trackedPointerState(pointerId){var state=trackedPointerStates.get(pointerId);if(state){return state;}else {state = {down:false, captured:false, listeners:{}};trackedPointerStates.set(pointerId, state);return state;}}function eventProxy(evt, state){var proxy=Object.create(evt);proxy.down = state.down;if(state.down){proxy.downX = state.downX;proxy.downY = state.downY;}proxy.captured = state.captured;proxy.pon = function(evtName, cb){state.listeners[evtName] = cb;return proxy;};return proxy;}function fireProxyAtListener(name, evt, state){if(state.listeners[name]){state.listeners[name](eventProxy(evt, state));}else if(elementListeners[name]){elementListeners[name](eventProxy(evt, state));}}element.addEventListener("pointerenter", function(evt){var state=trackedPointerState(evt.pointerId);fireProxyAtListener("enter", evt, state);});element.addEventListener("pointerover", function(evt){var state=trackedPointerState(evt.pointerId);fireProxyAtListener("over", evt, state);});element.addEventListener("pointerdown", function(evt){var state=trackedPointerState(evt.pointerId);state.down = true;state.downX = evt.clientX;state.downY = evt.clientY;fireProxyAtListener("down", evt, state);});element.addEventListener("pointermove", function(evt){var state=trackedPointerState(evt.pointerId);fireProxyAtListener("move", evt, state);});element.addEventListener("pointerout", function(evt){var state=trackedPointerState(evt.pointerId);fireProxyAtListener("out", evt, state);});element.addEventListener("pointerup", function(evt){var state=trackedPointerState(evt.pointerId);state.down = false;fireProxyAtListener("up", evt, state);if(!state.captured)trackedPointerStates["delete"](evt.pointerId);});element.addEventListener("pointercancel", function(evt){var state=trackedPointerState(evt.pointerId);state.down = false;fireProxyAtListener("cancel", evt, state);if(!state.captured)trackedPointerStates["delete"](evt.pointerId);});element.addEventListener("gotpointercapture", function(evt){var state=trackedPointerState(evt.pointerId);state.captured = true;});element.addEventListener("lostpointercapture", function(evt){var state=trackedPointerStates.get(evt.pointerId);if(state){if(state.down)state.captured = false;else trackedPointerStates["delete"](evt.pointerId);}});element.addEventListener("pointerleave", function(evt){var state=trackedPointerState(evt.pointerId);fireProxyAtListener("leave", evt, state);if(!state.captured && !state.down)trackedPointerStates["delete"](evt.pointerId);});var listenObject={on:function(evtName, cb){elementListeners[evtName] = cb;return listenObject;}};return listenObject;};function clientPointToSVGPoint(pt, svg){return pt.matrixTransform(svg.getScreenCTM().inverse());}function eventToSVGPoint(evt, prefix){var svg=evt.target.ownerSVGElement;var pt=svg.createSVGPoint();if(prefix === "")prefix = {x:evt.x, y:evt.y};prefix = prefix || "client";pt.x = prefix.x?prefix.x:evt[prefix + "X"];pt.y = prefix.y?prefix.y:evt[prefix + "Y"];return clientPointToSVGPoint(pt, svg);}poniter.svgPoint = {fromClientPoint:clientPointToSVGPoint, fromEvent:eventToSVGPoint};if(typeof module != "undefined"){module.exports = poniter;}else {window.poniter = poniter;}})();

//# sourceMappingURL=poniter.js.map