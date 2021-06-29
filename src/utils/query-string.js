/* eslint-disable */
// https://github.com/MithrilJS/mithril.js/blob/next/querystring/build.js
export function build(object) {
  if (toString(object) !== "[object Object]") return "";

  var args = [];
  for (var key in object) {
    destructure(key, object[key]);
  }
  return args.join("&");

  function destructure(key, value) {
    if (Array.isArray(value)) {
      for (var i = 0; i < value.length; i++) {
        destructure(key + "[" + i + "]", value[i]);
      }
    } else if (toString(value) === "[object Object]") {
      for (var i in value) {
        destructure(key + "[" + i + "]", value[i]);
      }
    } else
      args.push(
        encodeURIComponent(key) +
          (value != null && value !== "" ? "=" + encodeURIComponent(value) : "")
      );
  }
}

function toString(obj) {
  return Object.prototype.toString.call(obj);
}
