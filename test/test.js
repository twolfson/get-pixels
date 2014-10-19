"use strict"
var test = require("tape")

var fs   = require("fs")
var path = require("path")
var getPixels = typeof window === "undefined" ?
  require("../node-pixels.js") :
  require("../dom-pixels.js")

function test_image(t, img) {
  t.equals(img.shape[0], 16)
  t.equals(img.shape[1], 8)
  t.equals(img.get(0, 0, 0), 0)
  t.equals(img.get(0, 0, 1), 0)
  t.equals(img.get(0, 0, 2), 0)
  t.equals(img.get(1, 0, 0), 0xff)
  t.equals(img.get(1, 0, 1), 0)
  t.equals(img.get(1, 0, 2), 0)
  t.equals(img.get(2, 0, 0), 0xff)
  t.equals(img.get(2, 0, 1), 0xff)
  t.equals(img.get(2, 0, 2), 0)
  t.equals(img.get(3, 0, 0), 0xff)
  t.equals(img.get(3, 0, 1), 0)
  t.equals(img.get(3, 0, 2), 0xff)
  t.equals(img.get(0, 1, 0), 0)
  t.equals(img.get(0, 1, 1), 0xff)
  t.equals(img.get(0, 1, 2), 0)
  t.equals(img.get(1, 1, 0), 0)
  t.equals(img.get(1, 1, 1), 0xff)
  t.equals(img.get(1, 1, 2), 0xff)
  t.equals(img.get(0, 2, 0), 0)
  t.equals(img.get(0, 2, 1), 0)
  t.equals(img.get(0, 2, 2), 0xff)
console.warn('waat');
  for(var i=4; i<8; ++i) {
    for(var j=0; j<16; ++j) {
      t.equals(img.get(j, i, 0), 0xff)
      t.equals(img.get(j, i, 1), 0xff)
      t.equals(img.get(j, i, 2), 0xff)
    }
  }
}

var buffer = fs.readFileSync(__dirname + "/test_pattern.png", null);
test("get-pixels-buffer", function(t) {
  getPixels(buffer, "image/png", function(err, pixels) {
    if(err) {
      t.error(err, "failed to parse buffer")
      t.end()
      return
    }
    test_image(t, pixels)
    t.end()
  })
})
