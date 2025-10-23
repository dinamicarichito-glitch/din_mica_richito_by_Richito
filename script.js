var confetti = (function() {
'use strict';

var T = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t
}
: function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
}
;
function k(t, e) {
    if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function")
}
var I = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1,
            n.configurable = !0,
            "value"in n && (n.writable = !0),
            Object.defineProperty(t, n.key, n)
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i),
        n && t(e, n),
        e
    }
}();
function E(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = i,
    t
}
function S(t) {
    return t.reduce((function(t, e) {
        return t.concat(e)
    }
    ), [])
}
var P = function() {
    var t = ("undefined" == typeof window ? "undefined" : T(window)) !== "undefined" ? window : "undefined" == typeof self ? "undefined" : T(self) !== "undefined" ? self : {}
      , e = !!(t.Worker && t.Blob && t.URL && t.Promise)
      , i = function() {
        var t = 0;
        function e(i, n) {
            k(this, e),
            this.id = t++,
            this.worker = i,
            this.options = n
        }
        return I(e, [{
            key: "eval",
            value: function(t) {
                var e = this;
                return new Promise((function(i, n) {
                    var o = function(t) {
                        e.worker.removeEventListener("message", o),
                        e.worker.removeEventListener("error", r),
                        t.data.id === e.id && (t.data.error ? n(t.data.error) : i(t.data.result))
                    }
                      , r = function(t) {
                        e.worker.removeEventListener("message", o),
                        e.worker.removeEventListener("error", r),
                        n(t)
                    };
                    e.worker.addEventListener("message", o),
                    e.worker.addEventListener("error", r),
                    e.worker.postMessage({
                        eval: t,
                        options: e.options,
                        id: e.id
                    })
                }
                ))
            }
        }]),
        i
    }()
      , n = S(["var __fettis = {};", "var __fettiMessages = {};", "var __fettiHandlers = {};", "var __fettiRunning = {};", 'var __main = (function() { return this; })();', "var fetti = (function () {", "  'use strict';", "", "  var DEFAULTS = {", "    particleCount: 50,", "    angle: 90,", "    spread: 45,", "    startVelocity: 45,", "    decay: 0.9,", "    gravity: 1,", "    ticks: 200,", "    x: 0.5,", "    y: 0.5,", "    shapes: ['square', 'circle'],", "    zIndex: 100,", "    colors: [", "      '#26ccff',", "      '#a25afd',", "      '#ff5e7e',", "      '#88ff5a',", "      '#fcff42',", "      '#ffa62d',", "      '#ff36ff'", "    ],", '    // probably should be true, but backward-compat.', "    disableForReducedMotion: false", "  };", "", "  function toDecimal(str) {", "    return parseInt(str, 16);", "  }", "", "  function hexToRgb(str) {", "    var val = String(str).replace(/[^0-9a-f]/gi, '');", "", "    if (val.length < 6) {", "        val = val[0]+val[0]+val[1]+val[1]+val[2]+val[2];", "    }", "", "    return {", "      r: toDecimal(val.substring(0, 2)),", "      g: toDecimal(val.substring(2, 4)),", "      b: toDecimal(val.substring(4, 6))", "    };", "  }", "", "  function getCanvas(zIndex) {", "    var canvas = document.createElement('canvas');", "", "    canvas.style.position = 'fixed';", "    canvas.style.top = '0px';", "    canvas.style.left = '0px';", "    canvas.style.pointerEvents = 'none';", "    canvas.style.zIndex = zIndex;", "", "    return canvas;", "  }", "", "  function isFunction(obj) {", "    return typeof obj === 'function';", "  }", "", "  function isNum(val) {", "    return typeof val === 'number';", "  }", "", "  function isPlainObject(obj) {", "    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);", "  }", "", "  function randomInt(min, max) {", "    // [min, max]", "    return Math.floor(Math.random() * (max - min + 1)) + min;", "  }", "", "  function randomItem(arr) {", "    return arr[randomInt(0, arr.length - 1)];", "  }", "", "  function conformed(obj) {", "    var result = Object.assign({}, DEFAULTS, obj);", "    var colors = result.colors.map(hexToRgb);", "", "    result.x = isNum(result.x) ? result.x : 0.5;", "    result.y = isNum(result.y) ? result.y : 0.5;", "    result.angle = isNum(result.angle) ? result.angle : 90;", "    result.spread = isNum(result.spread) ? result.spread : 45;", "    result.startVelocity = isNum(result.startVelocity) ? result.startVelocity : 45;", "    result.decay = isNum(result.decay) ? result.decay : 0.9;", "    result.gravity = isNum(result.gravity) ? result.gravity : 1;", "    result.particleCount = isNum(result.particleCount) ? result.particleCount : 50;", "    result.ticks = isNum(result.ticks) ? result.ticks : 200;", "    result.zIndex = isNum(result.zIndex) ? result.zIndex : 100;", "    result.disableForReducedMotion = typeof result.disableForReducedMotion === 'boolean' ? result.disableForReducedMotion : false;", "", "    result.colors = colors;", "", "    return result;", "  }", "", "  function getOrigin(options) {", "    var origin = {", "      x: options.x,", "      y: options.y", "    };", "", "    if (options.origin) {", "      if (isNum(options.origin.x)) {", "        origin.x = options.origin.x;", "      }", "      if (isNum(options.origin.y)) {", "        origin.y = options.origin.y;", "      }", "    }", "", "    return origin;", "  }", "", "  function fire(options, fetti) {", "    var canvas = fetti.canvas;", "    var animationTimer = null;", "    var particleCount = options.particleCount;", "    var angle = options.angle;", "    var spread = options.spread;", "    var startVelocity = options.startVelocity;", "    var decay = options.decay;", "    var gravity = options.gravity;", "    var colors = options.colors;", "    var ticks = options.ticks;", "    var shapes = options.shapes;", "", "    var internalTick;", "    var particles = [];", "    var promise = new Promise(function (resolve, reject) {", "      internalTick = resolve;", "    });", "", "    var reducedMotion = (", "      typeof window !== 'undefined' &&", "      window.matchMedia &&", "      window.matchMedia('(prefers-reduced-motion)').matches", "    );", "", "    var isWorker = !__main.document;", "    var parent;", "    var canvasContext;", "", "    if (isWorker) {", "      parent = {};", "    } else {", "      parent = {", "        width: window.innerWidth,", "        height: window.innerHeight", "      };", "      canvasContext = canvas.getContext('2d');", "    }", "", "    function updict() {", "      if (isWorker) {", "        return;", "      }", "", "      canvas.width = parent.width;", "      canvas.height = parent.height;", "    }", "", "    function reproject(origin, rect) {", "      if (isWorker) {", "        return origin;", "      }", "", "      return {", "        x: origin.x * rect.width,", "        y: origin.y * rect.height", "      };", "    }", "", "    var origin = reproject(getOrigin(options), parent);", "", "    (function frame() {", "      if (isWorker) {", "        if (!__fettiRunning[fetti.id]) {", "          return;", "        }", "      } else {", "        if (!canvas.parentNode) {", "          return;", "        }", "", "        canvasContext.clearRect(0, 0, parent.width, parent.height);", "      }", "", "      particles.forEach(function (particle) {", "        particle.update();", "        if (isWorker) {", "          particle.message();", "        } else {", "          particle.draw(canvasContext);", "        }", "      });", "", "      if (particles.every(function (particle) { return particle.done; })) {", "        if (animationTimer) {", "          clearTimeout(animationTimer);", "          animationTimer = null;", "        }", "", "        if (isWorker) {", "          if (__fettiRunning[fetti.id]) {", "            __fettiMessages[fetti.id] = {", "              type: 'done'", "            };", "            __fettiRunning[fetti.id] = false;", "          }", "        } else {", "          canvas.parentNode.removeChild(canvas);", "        }", "", "        internalTick();", "        return;", "      }", "", "      animationTimer = setTimeout(frame, 16);", "    }());", "", "    if (reducedMotion && options.disableForReducedMotion) {", "      internalTick();", "      return promise;", "    }", "", "    var i = particleCount;", "    while (i--) {", "      particles.push(", "        (function () {", "          var particle = {};", "          var radAngle = (angle * (Math.PI / 180));", "          var radSpread = (spread * (Math.PI / 180));", "", "          particle.x = origin.x;", "          particle.y = origin.y;", "          particle.wobble = Math.random() * 10;", "          particle.velocity = (startVelocity * 0.5) + (Math.random() * startVelocity);", "          particle.angle2D = -radAngle + ((0.5 * radSpread) - (Math.random() * radSpread));", "          particle.tiltAngle = Math.random() * Math.PI;", "          particle.color = randomItem(colors);", "          particle.shape = randomItem(shapes);", "          particle.tick = 0;", "          particle.totalTicks = ticks;", "", "          particle.update = function () {", "            particle.x += Math.cos(particle.angle2D) * particle.velocity;", "            particle.y += Math.sin(particle.angle2D) * particle.velocity + gravity;", "            particle.velocity *= decay;", "            particle.tiltAngle += 0.1;", "", "            particle.tick++;", "          };", "", "          particle.done = function () {", "            return (particle.tick >= particle.totalTicks);", "          };", "", "          if (isWorker) {", "            particle.message = function () {", "              __fettiMessages[fetti.id] = {", "                type: 'frame',", "                frame: {", "                  x: particle.x,", "                  y: particle.y,", "                  color: particle.color,", "                  shape: particle.shape,", "                  angle2D: particle.angle2D,", "                  tiltAngle: particle.tiltAngle", "                }", "              };", "            };", "          } else {", "            particle.draw = function (canvasContext) {", "              var x1 = particle.x + (6 * Math.cos(particle.tiltAngle));", "              var y1 = particle.y + (6 * Math.sin(particle.tiltAngle));", "", "              canvasContext.fillStyle = 'rgba(' + particle.color.r + ', ' + particle.color.g + ', ' + particle.color.b + ', ' + (1 - particle.tick / particle.totalTicks) + ')';", "              canvasContext.beginPath();", "", "              if (particle.shape === 'circle') {", "                canvasContext.ellipse(", "                  particle.x,", "                  particle.y,", "                  Math.abs(x1 - particle.x),", "                  Math.abs(y1 - particle.y),", "                  Math.PI / 10,", "                  0,", "                  2 * Math.PI", "                );", "              } else {", "                // better confetti...", "                // http://stackoverflow.com/a/29327653/1869821", "                canvasContext.moveTo(Math.floor(particle.x), Math.floor(particle.y));", "                canvasContext.lineTo(Math.floor(x1), Math.floor(particle.y));", "                canvasContext.lineTo(Math.floor(x1), Math.floor(y1));", "                canvasContext.lineTo(Math.floor(particle.x), Math.floor(y1));", "              }", "", "              canvasContext.closePath();", "              canvasContext.fill();", "            };", "          }", "", "          return particle;", "        }())", "      );", "    }", "", "    updict();", "", "    return promise;", "  }", "", "  function confetti(options) {", "    var fetti = {", "      id: Math.round(Math.random() * 10000),", "      canvas: null", "    };", "", "    if (__main.document) {", "      fetti.canvas = getCanvas(options.zIndex);", "      document.body.appendChild(fetti.canvas);", "    }", "", "    __fettis[fetti.id] = fetti;", "", "    return fire(conformed(options), fetti);", "  }", "", "  confetti.reset = function () {", "    for (var id in __fettis) {", "      var fetti = __fettis[id];", "      if (fetti.canvas && fetti.canvas.parentNode) {", "        fetti.canvas.parentNode.removeChild(fetti.canvas);", "      }", "    }", "", "    __fettis = {};", "  };", "", "  return confetti;", "}());", "", "self.onmessage = function(e) {", "  var id = e.data.id;", "", "  if (e.data.options) {", "    __fettiRunning[id] = true;", "    fetti(e.data.options).then(function() {", "      if (__fettiHandlers[id]) {", "        __fettiHandlers[id]();", "        delete __fettiHandlers[id];", "      }", "    });", "    return;", "  }", "", "  if (e.data.eval) {", "    var result;", "    var error;", "", "    try {", "      result = eval(e.data.eval);", "    } catch (e) {", "      error = e.toString();", "    }", "", "    self.postMessage({", "      id: id,", "      result: result,", "      error: error", "    });", "    return;", "  }", "", "  if (e.data.command === 'frame') {", "    var res = __fettiMessages[id];", "    __fettiMessages[id] = null;", "    self.postMessage({", "      id: id,", "      result: res", "    });", "    return;", "  }", "", "  if (e.data.command === 'done') {", "    var promise = new Promise(function (resolve) {", "      __fettiHandlers[id] = resolve;", "    });", "", "    promise.then(function () {", "      self.postMessage({", "        id: id,", "        result: true", "      });", "    });", "    return;", "  }", "};", ""])
      , o = function() {
        try {
            return new i(new Worker(URL.createObjectURL(new Blob([n],{
                type: "text/javascript"
            }))),{})
        } catch (t) {
            return null
        }
    }();
    return function() {
        for (var t = arguments.length, n = Array(t), r = 0; r < t; r++)
            n[r] = arguments[r];
        if (!e)
            return Promise.resolve(null);
        if (!o) {
            var a = "function" == typeof __fetti_create_worker ? __fetti_create_worker() : null;
            if (!a)
                return Promise.resolve(null);
            var s = new i(a,{});
            o = function() {
                return s
            }()
        }
        var l = o
          , u = n[0]
          , d = n.slice(1)
          , c = isFunction(u) ? "(".concat(u, ")(").concat(JSON.stringify(d, (function(e, i) {
            return isFunction(i) ? i.toString() : i
        }
        )), ")") : T(u) === "object" ? "JSON.parse('".concat(JSON.stringify(u), "')") : u;
        return l.eval(c)
    }
}();
function B(t, e) {
    if (null == t)
        return {};
    var i, n, o = {}, r = Object.keys(t);
    for (n = 0; n < r.length; n++)
        i = r[n],
        e.indexOf(i) >= 0 || (o[i] = t[i]);
    return o
}
function L(t, e) {
    var i = t.canvas
      , n = B(t, ["canvas"]);
    i && i.remove(),
    P("confetti.reset"),
    e && e(n)
}
var M = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.js"
  , R = {
    particleCount: 50,
    angle: 90,
    spread: 45,
    startVelocity: 45,
    decay: .9,
    gravity: 1,
    ticks: 200,
    x: .5,
    y: .5,
    shapes: ["square", "circle"],
    zIndex: 100,
    colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
    disableForReducedMotion: !1,
    useWorker: !0,
    resize: !0,
    canvas: null
}
  , N = null
  , O = null;
function q(t) {
    var e = Object.assign({}, R, t)
      , i = e.useWorker && P
      , n = i ? P : Promise.resolve(window.confetti);
    return n.then((function(t) {
        if (!t) {
            var n = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.js"
              , o = "Cannot load confetti from " + n;
            return "undefined" != typeof console && console.warn(o),
            null
        }
        function r(i, n) {
            var o = B(Object.assign({}, e, i), ["useWorker", "resize"])
              , r = n ? n.canvas : a(e);
            return (o.canvas = r) && (o.origin || (o.origin = {
                x: o.x,
                y: o.y
            })),
            t(o)
        }
        function a(t) {
            if (!N || L(N, (function(t) {
                return !t.resize
            }
            ))) {
                var i = function(t) {
                    var e = t.canvas
                      , i = B(t, ["canvas"]);
                    e || (e = document.createElement("canvas")),
                    N = {
                        canvas: e,
                        options: i
                    },
                    function(t) {
                        t.canvas.style.position = "fixed",
                        t.canvas.style.top = "0px",
                        t.canvas.style.left = "0px",
                        t.canvas.style.pointerEvents = "none",
                        t.canvas.style.zIndex = t.options.zIndex,
                        document.body.appendChild(t.canvas),
                        t.options.resize && window.addEventListener("resize", (function() {
                            N && (N.canvas.width = window.innerWidth,
                            N.canvas.height = window.innerHeight)
                        }
                        ))
                    }(N)
                }(t);
                N.canvas.width = window.innerWidth,
                N.canvas.height = window.innerHeight
            }
            return N.canvas
        }
        return r.reset = function() {
            P && P("confetti.reset"),
            N && (window.removeEventListener("resize", (function() {
                N.canvas.width = window.innerWidth,
                N.canvas.height = window.innerHeight
            }
            )),
            L(N),
            N = null)
        }
        ,
        r
    }
    ))
}
function A(t) {
    var e, i;
    return O || (O = q(E({
        useWorker: !0,
        resize: !0
    }, "particleCount", (e = (t || R).particleCount,
    i = Math.floor(e / 2),
    Math.floor(Math.random() * (e - i + 1)) + i)))),
    O
}
function U(t, e) {
    return A(e).then((function(i) {
        i(Object.assign({}, R, e, {
            angle: 270,
            spread: 360,
            origin: {
                x: 0,
                y: t
            }
        }))
    }
    ))
}
var V = ["particleCount", "angle", "spread", "startVelocity", "decay", "gravity", "ticks", "x", "y", "shapes", "zIndex", "colors", "disableForReducedMotion", "useWorker", "resize", "canvas", "origin"]
  , G = {};
function F(t) {
    var e = t.getBoundingClientRect()
      , i = e.left + e.width / 2
      , n = e.top + e.height / 2;
    return {
        origin: {
            x: i / window.innerWidth,
            y: n / window.innerHeight
        }
    }
}
function W() {
    for (var t = arguments.length, e = Array(t), i = 0; i < t; i++)
        e[i] = arguments[i];
    var n = e.length
      , o = e[0]
      , r = n > 1 ? e[1] : {}
      , a = A(r)
      , s = Array.isArray(o) ? o : [o];
    return s.forEach((function(t) {
        return function(t, e) {
            return A(e).then((function(i) {
                i(Object.assign({}, R, e, F(t)))
            }
            ))
        }(t, r)
    }
    )),
    a
}
function J(t, e) {
    var i = e || {}
      , n = i.particleRatio
      , o = i.spread;
    return o = o || R.spread,
    n = n || R.particleCount / 100,
    A(i).then((function(e) {
        var r;
        e((r = {
            spread: o
        },
        E(r, "particleCount", Math.floor(t * n)),
        E(r, "origin", {
            x: Math.random(),
            y: Math.random() - .2
        }),
        r))
    }
    ))
}
function K(t) {
    return A(t).then((function(e) {
        function i() {
            return Math.random() < .2 ? J(3, t) : Math.random() < .35 ? function(t) {
                return A(t).then((function(e) {
                    var i;
                    e((i = {
                        particleCount: 1,
                        startVelocity: 0,
                        ticks: 300,
                        spread: 360,
                        colors: ["#ff0000"]
                    },
                    E(i, "shapes", ["circle"]),
                    E(i, "gravity", .25),
                    E(i, "origin", {
                        x: Math.random(),
                        y: Math.random() * (1 / .7) - 1 / .7 / 2
                    }),
                    i))
                }
                ))
            }(t) : Math.random() < .5 ? function(t) {
                var e = t.angle
                  , i = t.spread;
                return e = void 0 === e ? 90 : e,
                i = void 0 === i ? 45 : i,
                Promise.all([U(Math.random(), t), U(Math.random(), t)]).then((function() {
                    var n = Object.assign({}, t, {
                        angle: e,
                        spread: i
                    });
                    return A(t).then((function(t) {
                        return t(n)
                    }
                    ))
                }
                ))
            }(t) : function(t) {
                return A(t).then((function(e) {
                    e(Object.assign({
                        angle: 90,
                        spread: 180,
                        particleCount: 15,
                        startVelocity: 20
                    }, t, {
                        origin: {
                            x: .5,
                            y: 1
                        }
                    }))
                }
                ))
            }(t)
        }
        var n, o, r, a, s = (n = t || {},
        o = n.duration,
        r = void 0 === o ? 3e3 : o,
        a = n.end,
        new Promise((function(t) {
            a ? a.then(t) : setTimeout(t, r)
        }
        )));
        s.then((function() {
            e.reset()
        }
        ));
        for (var l = 0; l < 20; ++l)
            setTimeout(i, 500 * l)
    }
    ))
}
var Q = {
    create: q
};
return Object.defineProperty(Q, "__esModule", {
    value: !0
}),
Q.default = q,
"undefined" != typeof module && (module.exports = q,
module.exports.create = q,
module.exports.default = q),
q.create = q,
q.reset = function() {
    A().then((function(t) {
        t.reset()
    }
    ))
}
,
q.shape = W,
q.shapes = {
    circle: function(t) {
        var e = Object.assign({}, t);
        return e.shapes = ["circle"],
        W(e)
    },
    square: function(t) {
        var e = Object.assign({}, t);
        return e.shapes = ["square"],
        W(e)
    },
    star: function(t) {
        var e = Object.assign({}, t);
        return e.shapes = ["star"],
        W(e)
    },
    stars: function(t) {
        var e = Object.assign({
            particleCount: 20,
            angle: 90,
            spread: 180,
            startVelocity: 25,
            decay: .92,
            gravity: .5,
            ticks: 200
        }, t);
        return e.shapes = ["star"],
        W(e)
    }
},
q.schoolpride = function(t) {
    return A(t).then((function(e) {
        function i() {
            var i = 2 * Math.random() - 1;
            e(Object.assign({}, t, {
                origin: {
                    x: .5 + i,
                    y: Math.random()
                }
            }))
        }
        var n = setInterval(i, 250);
        setTimeout((function() {
            return clearInterval(n)
        }
        ), 5e3)
    }
    ))
}
,
q.snow = function(t) {
    return A(t).then((function(e) {
        var i = 2 * Math.PI / 200
          , n = 0;
        (function o() {
            var r = n * i;
            e(Object.assign({}, t, {
                particleCount: 1,
                startVelocity: 0,
                ticks: 200 + 100 * Math.random(),
                origin: {
                    x: Math.cos(r) * Math.random() + .5,
                    y: Math.sin(r) * Math.random() - .05
                },
                colors: ["#ffffff"]
            })),
            n = (n + 1) % 200,
            setTimeout(o, 200 * Math.random())
        }
        )()
    }
    ))
}
,
q.fireworks = K,
q
})();

document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards-container');
    const clearButton = document.getElementById('clear-button');
    const undoButton = document.getElementById('undo-button');
    const pancitosDisplay = document.getElementById('pancitos-display');
    const prizeContainer = document.getElementById('prize-container');
    const statusMessage = document.getElementById('status-message');
    
    // New main buttons
    const saveButton = document.getElementById('save-button');
    const settingsButton = document.getElementById('settings-button');
    const historyButton = document.getElementById('history-button');
    const resetDayButton = document.getElementById('reset-day-button');

    // Modal elements
    const customModal = document.getElementById('custom-modal');
    const modalMessage = document.getElementById('modal-message');
    const modalButtons = document.getElementById('modal-buttons');

    // Player Management Modal elements
    const managePlayersButton = document.getElementById('manage-players-button');
    const playerManagementModal = document.getElementById('player-management-modal');
    const closePlayerModalButton = document.getElementById('close-player-modal-button');
    const playerBalancesList = document.getElementById('player-balances-list');
    const paymentHistoryList = document.getElementById('payment-history-list');
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Settings Modal elements
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsModalButton = document.getElementById('close-settings-modal-button');
    const applySettingsButton = document.getElementById('apply-settings-button');
    const configColsInput = document.getElementById('config-cols');
    const configRowsInput = document.getElementById('config-rows');
    const configPancitosInput = document.getElementById('config-pancitos');
    const configPrizesInput = document.getElementById('config-prizes');
    const resetColorsButton = document.getElementById('reset-colors-button');
    
    // Header config elements
    const headerTitleElement = document.getElementById('header-title');
    const headerLogoElement = document.getElementById('header-logo');
    const configTitleInput = document.getElementById('config-title');
    const changeLogoButton = document.getElementById('change-logo-button');
    const configLogoUploadInput = document.getElementById('config-logo-upload');
    
    // New settings modal color elements
    const titleColorDisplay = document.getElementById('title-color-display');
    const cardColorDisplay = document.getElementById('card-color-display');
    const prizeBgColorDisplay = document.getElementById('prize-bg-color-display');
    const prizeTextColorDisplay = document.getElementById('prize-text-color-display');
    const colorPickerPopup = document.getElementById('color-picker-popup');

    // Settings preview elements
    const previewTitle = document.getElementById('preview-title');
    const previewLogo = document.getElementById('preview-logo');
    const previewPrizesContainer = document.getElementById('preview-prizes-container');
    const previewCardsContainer = document.getElementById('preview-cards-container');

    // History Modal elements
    const historyModal = document.getElementById('history-modal');
    const closeHistoryModalButton = document.getElementById('close-history-modal-button');
    const historyContent = document.getElementById('history-content');
    const historyNavigation = document.getElementById('history-navigation');
    const historyPrevButton = document.getElementById('history-prev-button');
    const historyNextButton = document.getElementById('history-next-button');
    const historyPageIndicator = document.getElementById('history-page-indicator');
    const autocompleteContainer = document.getElementById('autocomplete-suggestions');
    const dinamicaSummaryContainer = document.getElementById('dinamica-summary');
    const accumulatedProfitDisplay = document.getElementById('accumulated-profit-display');

    // Profit modal
    const profitDetailsButton = document.getElementById('profit-details-button');
    const profitDetailsModal = document.getElementById('profit-details-modal');
    const closeProfitModalButton = document.getElementById('close-profit-modal-button');
    const profitDetailsContent = document.getElementById('profit-details-content');
    const profitTotalDisplay = document.getElementById('profit-total');

    // Unit config popup elements
    const configUnitButton = document.getElementById('config-unit-button');
    const unitConfigPopup = document.getElementById('unit-config-popup');
    const unitInput = document.getElementById('unit-input');
    const saveUnitButton = document.getElementById('save-unit-button');
    const cancelUnitButton = document.getElementById('cancel-unit-button');

    let NUM_CARDS = 12; // Default, will be loaded from state
    const MAX_CLICKS = 5;
    const MIN_AUTOCOMPLETE_CHARS = 2;

    // --- Sort state for player management ---
    let sortKey = 'name';
    let sortDirection = 'asc';

    // --- Color Palette for Duplicate Names ---
    // A palette of visually distinct, reasonably contrasted pastel colors.
    const COLOR_PALETTE = [
        '#a8d8ea', '#e5d1e2', '#f4b9b2', '#fcf3b0', '#c8e6b2',
        '#b3d9e3', '#eac4d5', '#f7a8a0', '#fff9a3', '#b3d89c'
    ];
    let colorMap = {};
    let nextColorIndex = 0;

    // --- User-configurable Color Palette ---
    const STANDARD_COLORS = ['#C00000', '#FF0000', '#FFC000', '#FFFF00', '#92D050', '#00B050', '#00B0F0', '#0070C0', '#002060', '#7030A0'];
    const THEME_COLORS = [
        // Greys (White to Black)
        ['#FFFFFF', '#F2F2F2', '#D9D9D9', '#BFBFBF', '#A6A6A6', '#808080'],
        // Greys (Black to Light)
        ['#000000', '#7F7F7F', '#595959', '#3F3F3F', '#262626', '#0D0D0D'],
        // Blues
        ['#EEECE1', '#DDD9C3', '#C4BD97', '#938953', '#494429', '#1D1B10'],
        // Blues 2
        ['#DEEBF6', '#BDD7EE', '#9CC2E5', '#5B9BD5', '#2E75B5', '#1F4E78'],
        // Oranges
        ['#FBE5D5', '#F7CBAC', '#F4B083', '#F09559', '#ED7D31', '#C55A11'],
        // Greys 3
        ['#EDEDED', '#DBDBDB', '#C9C9C9', '#B7B7B7', '#A5A5A5', '#7B7B7B'],
        // Blues 3
        ['#D9E2F2', '#B4C6E7', '#8EAADB', '#4472C4', '#203864', '#1F3864'],
        // Greens
        ['#E2EFD9', '#C5E0B3', '#A8D08D', '#70AD47', '#538135', '#385623'],
        // Purples
        ['#E4DFEC', '#D0CEE2', '#B4A7D6', '#8E7CC3', '#5E499D', '#3F316D'],
        // Cyans
        ['#DEEAF6', '#B9D4E9', '#93BFDD', '#5482A8', '#334E64', '#223443']
    ];

    const TEXT_COLORS = [
        '#000000', '#78281F', '#935116', '#186A3B', '#1B4F72', '#4A235A', 
        '#FFFFFF', '#E74C3C', '#F39C12', '#2ECC71', '#3498DB', '#8E44AD'
    ];

    let selectedCardColor = null;
    let selectedPrizeBgColor = null;
    let selectedPrizeTextColor = null;
    let selectedTitleColor = null;

    const DEFAULT_COLORS = {
        title: 'rgb(233, 113, 50)',
        card: 'rgb(242, 206, 239)',
        prizeBg: 'rgb(0, 32, 96)',
        prizeText: 'rgb(255, 255, 255)'
    };

    // Function to generate a color using HSL for when the palette runs out.
    function generateHslColor(step, totalSteps) {
        const hue = (step * (360 / totalSteps)) % 360;
        return `hsl(${hue}, 80%, 85%)`; // Light saturation and lightness for pastel look
    }
    
    // Gets a unique color for a given name.
    function getColorForName(name) {
        const normalizedName = name.trim().toLowerCase();
        if (!colorMap[normalizedName]) {
            if (nextColorIndex < COLOR_PALETTE.length) {
                colorMap[normalizedName] = COLOR_PALETTE[nextColorIndex];
                nextColorIndex++;
            } else {
                // Generate a new color if palette is exhausted
                colorMap[normalizedName] = generateHslColor(Object.keys(colorMap).length, 10);
            }
        }
        return colorMap[normalizedName];
    }
    
    function resetColorMap() {
        colorMap = {};
        nextColorIndex = 0;
    }

    // --- Web Audio API Sound Setup ---
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const soundBuffers = {};
    let soundsLoaded = false;

    async function loadAllSounds() {
        if (soundsLoaded) return;
        await Promise.all([
            loadSound('win', 'win.mp3'),
            loadSound('lock', 'lock.mp3'),
            loadSound('clear', 'clear.mp3'),
            loadSound('click', 'click.mp3')
        ]);
        soundsLoaded = true;
    }

    async function loadSound(name, url) {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            soundBuffers[name] = audioBuffer;
        } catch (error) {
            console.error(`Error loading sound: ${name}`, error);
        }
    }

    function playSound(name, volume = 1.0) {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        if (soundBuffers[name]) {
            const source = audioContext.createBufferSource();
            source.buffer = soundBuffers[name];

            const gainNode = audioContext.createGain();
            gainNode.gain.setValueAtTime(volume, audioContext.currentTime);

            source.connect(gainNode);
            gainNode.connect(audioContext.destination);
            source.start(0);
        }
    }

    // --- Custom Modal Logic ---
    function showModal(message, buttons) {
        return new Promise(resolve => {
            modalMessage.innerHTML = message; // Use innerHTML to allow for line breaks
            modalButtons.innerHTML = '';

            buttons.forEach(buttonInfo => {
                const button = document.createElement('button');
                button.textContent = buttonInfo.text;
                button.className = buttonInfo.class;
                button.addEventListener('click', () => {
                    customModal.style.display = 'none';
                    resolve(buttonInfo.value);
                });
                modalButtons.appendChild(button);
            });

            customModal.style.display = 'flex';
        });
    }

    async function customAlert(message) {
        await showModal(message, [
            { text: 'OK', class: 'modal-button primary', value: true }
        ]);
    }

    async function customConfirm(message) {
        return await showModal(message, [
            { text: 'Cancelar', class: 'modal-button secondary', value: false },
            { text: 'Confirmar', class: 'modal-button primary', value: true }
        ]);
    }
    // --- End of Modal Logic ---

    const prizeTiers = {
        12: [25, 10, 10, 5],
        16: {
            5: [30, 15, 10, 10],
            10: [50, 30, 20, 20, 15]
        }
    };

    let appState = {};
    let playersData = {};
    let payoutHistory = [];
    let arePlayersLocked = false;
    let dinamicaNumber = 1;
    let accumulatedProfit = 0;
    let gameHistory = [];
    let currentHistoryIndex = 0;
    let gameUnit = 'panes'; // Default unit
    let headerConfig = {
        title: 'Dinámica Richito',
        logo: 'logo.png', // Default logo
        titleColor: DEFAULT_COLORS.title
    };

    function saveState() {
        localStorage.setItem('dinamicaRichitoState', JSON.stringify(appState));
    }

    function savePlayersData() {
        localStorage.setItem('dinamicaRichitoPlayers', JSON.stringify(playersData));
        localStorage.setItem('dinamicaRichitoPayouts', JSON.stringify(payoutHistory));
    }

    function saveGameMeta() {
        const meta = {
            dinamicaNumber,
            accumulatedProfit,
            headerConfig,
            gameUnit // Save the unit
        };
        localStorage.setItem('dinamicaRichitoMeta', JSON.stringify(meta));
    }

    function saveGameHistory() {
        localStorage.setItem('dinamicaRichitoGameHistory', JSON.stringify(gameHistory));
    }
    
    function loadGameHistory() {
        const savedHistory = localStorage.getItem('dinamicaRichitoGameHistory');
        if (savedHistory) {
            gameHistory = JSON.parse(savedHistory);
        } else {
            // Migration from old single-game history
            const oldGame = localStorage.getItem('dinamicaRichitoLastGame');
            if (oldGame) {
                gameHistory = [JSON.parse(oldGame)];
                localStorage.removeItem('dinamicaRichitoLastGame'); // Remove old key
                saveGameHistory();
            } else {
                gameHistory = [];
            }
        }
    }

    function loadPlayersData() {
        const savedPlayers = localStorage.getItem('dinamicaRichitoPlayers');
        const savedPayouts = localStorage.getItem('dinamicaRichitoPayouts');
        if (savedPlayers) {
            playersData = JSON.parse(savedPlayers);
        }
        if (savedPayouts) {
            payoutHistory = JSON.parse(savedPayouts);
        }
    }

    function loadGameMeta() {
        const savedMeta = localStorage.getItem('dinamicaRichitoMeta');
        if (savedMeta) {
            const meta = JSON.parse(savedMeta);
            dinamicaNumber = meta.dinamicaNumber || 1;
            accumulatedProfit = meta.accumulatedProfit || 0;
            gameUnit = meta.gameUnit || 'panes'; // Load the unit
            if (meta.headerConfig) {
                headerConfig = meta.headerConfig;
                // Add default for titleColor if missing from older saved data
                if (!headerConfig.titleColor) {
                    headerConfig.titleColor = DEFAULT_COLORS.title;
                }
            }
        } else {
            // Migration from old key
            const savedNumber = localStorage.getItem('dinamicaRichitoNumber');
            dinamicaNumber = savedNumber ? parseInt(savedNumber, 10) : 1;
            accumulatedProfit = 0;
            localStorage.removeItem('dinamicaRichitoNumber');
        }
    }

    function updateHeaderUI() {
        headerTitleElement.childNodes[0].nodeValue = `${headerConfig.title} `;
        headerLogoElement.src = headerConfig.logo;
        document.documentElement.style.setProperty('--header-title-color', headerConfig.titleColor);
    }

    function updateDinamicaNumberUI() {
        const numberEl = document.getElementById('dinamica-number');
        if(numberEl) {
            numberEl.textContent = `#${dinamicaNumber}`;
        }
        updateHeaderUI(); // Also update header when number changes
    }

    function loadState() {
        const savedState = localStorage.getItem('dinamicaRichitoState');
        if (savedState) {
            const loaded = JSON.parse(savedState);
            
            // If numCards is not present, default to 12.
            if (!loaded.numCards) {
                loaded.numCards = 12;
                 // If migrating from an old state, create a fresh one for 12 cards
                return getInitialState(12);
            }
            NUM_CARDS = loaded.numCards; // Update global constant from loaded state
            if (!loaded.columns) { // Add columns if they don't exist
                loaded.columns = Math.ceil(Math.sqrt(loaded.numCards));
            }

            // Migration for older states without 'locked' property
            loaded.cards.forEach(card => {
                if (card.locked === undefined) {
                    card.locked = false;
                }
            });
             // Migration for clickHistory
            if (!loaded.clickHistory) {
                loaded.clickHistory = [];
            }
            if (NUM_CARDS === 16 && loaded.pancitosMode16 === undefined) {
                loaded.pancitosMode16 = 5;
            }
            if (!loaded.prizes) {
                loaded.prizes = prizeTiers[12];
            }
            if (loaded.cost === undefined) {
                loaded.cost = 5;
            }
            if (loaded.cardColor === undefined) {
                loaded.cardColor = DEFAULT_COLORS.card;
            }
            if (loaded.prizeColor === undefined) {
                loaded.prizeColor = DEFAULT_COLORS.prizeBg;
            }
            if (loaded.prizeTextColor === undefined) {
                loaded.prizeTextColor = DEFAULT_COLORS.prizeText;
            }
            loaded.cards.forEach(card => {
                if(card.paymentFromBalance === undefined) {
                    card.paymentFromBalance = 0;
                }
            });
            return loaded;
        }
        return getInitialState(12); // Default to 12 cards on first load
    }

    function getInitialState(numCards, cost = 5, prizes = prizeTiers[12], cols) {
        NUM_CARDS = numCards;
        const state = {
            numCards: numCards,
            cost: cost,
            prizes: prizes,
            columns: cols || Math.ceil(Math.sqrt(numCards)),
            cardColor: appState.cardColor || DEFAULT_COLORS.card, // Persist colors
            prizeColor: appState.prizeColor || DEFAULT_COLORS.prizeBg,
            prizeTextColor: appState.prizeTextColor || DEFAULT_COLORS.prizeText,
            winners: [],
            clickHistory: [],
            cards: Array.from({ length: NUM_CARDS }, (_, i) => ({
                id: i + 1,
                name: '',
                clicks: 0,
                won: false,
                winOrder: null,
                prizeWon: null,
                locked: false,
                paymentFromBalance: 0
            }))
        };
        arePlayersLocked = false; // Reset lock state
        resetColorMap(); // Reset colors for the new game
        return state;
    }

    function updateGameSettings() {
        const pancitosValueEl = document.getElementById('pancitos-value');
        pancitosValueEl.textContent = appState.cost || 5;
        pancitosDisplay.classList.remove('interactive'); // De-activate click since settings are in modal now
        // Update unit text on main display
        const pancitosTextEl = pancitosDisplay.querySelector('p');
        if (pancitosTextEl) {
            pancitosTextEl.textContent = gameUnit;
        }
        return appState.prizes || [];
    }

    function updateDinamicaSummary() {
        // This function is deprecated. The summary is now in a modal.
    }

    function updateAccumulatedProfitUI() {
        // This function is deprecated. The total is now in a modal.
    }

    function applyColors() {
        document.documentElement.style.setProperty('--card-bg-color', appState.cardColor);
        document.documentElement.style.setProperty('--prize-bg-color', appState.prizeColor);
        document.documentElement.style.setProperty('--prize-text-color', appState.prizeTextColor);
    }

    function updatePrizesUI() {
        const currentPrizes = updateGameSettings();
        const valorClass = `valor-default`;

        // Reset container classes and content
        prizeContainer.className = 'prize-container';
        prizeContainer.innerHTML = '';

        if (currentPrizes.length > 5) {
            // Display as a single line for more than 5 prizes
            prizeContainer.classList.add('prize-line-display');
            prizeContainer.innerHTML = `<div class="prize-line">${currentPrizes.join(' - ')}</div>`;
        } else {
            // Display as individual boxes for 5 or fewer prizes
            if (currentPrizes.length > 0) {
                prizeContainer.classList.add(`prize-count-${currentPrizes.length}`);
            }
            prizeContainer.innerHTML = currentPrizes.map(prize =>
                `<div class="prize-box ${valorClass}">${prize} ${gameUnit}</div>`
            ).join('');
        }
        updateDinamicaNumberUI();
        // updateDinamicaSummary(); // Removed
    }

    function checkAllPlayersLocked() {
        const lockedCardsCount = appState.cards.filter(c => c.locked).length;
        const remaining = NUM_CARDS - lockedCardsCount;

        if (remaining > 0) {
            statusMessage.style.display = 'none';
            arePlayersLocked = false;
            cardsContainer.classList.remove('game-active');
        } else {
            if (!arePlayersLocked) { // Play sound only on the transition to all locked
                statusMessage.textContent = '¡Todos los goleadores están listos! ¡Que comience el juego!';
                statusMessage.style.display = 'block';
                setTimeout(() => {
                    statusMessage.style.display = 'none';
                }, 3000);
                playSound('win', 1.0);
            }
            arePlayersLocked = true;
            cardsContainer.classList.add('game-active');
        }
        // Show/hide undo button based on lock state and history
        undoButton.style.display = arePlayersLocked && appState.clickHistory.length > 0 ? 'inline-block' : 'none';
        saveButton.style.display = arePlayersLocked && appState.winners.length > 0 ? 'inline-block' : 'none';
    }

    function updateDuplicateNameHighlights() {
        const nameCounts = {};
        appState.cards.forEach(card => {
            if (card.name.trim() !== '' && !card.locked) {
                const normalizedName = card.name.trim().toLowerCase();
                nameCounts[normalizedName] = (nameCounts[normalizedName] || 0) + 1;
            }
        });
    
        const cards = document.querySelectorAll('.card');
        cards.forEach(cardElement => {
            const cardId = parseInt(cardElement.dataset.id, 10);
            const cardData = appState.cards.find(c => c.id === cardId);
    
            // Clear previous highlight style, but respect base color
            cardElement.style.backgroundColor = '';
            cardElement.style.borderColor = '';
    
            if (cardData && !cardData.locked && cardData.name.trim() !== '') {
                const normalizedName = cardData.name.trim().toLowerCase();
                if (nameCounts[normalizedName] > 1) {
                    const color = getColorForName(cardData.name);
                    cardElement.style.backgroundColor = color;
                    cardElement.style.borderColor = 'rgba(0,0,0,0.4)';
                }
            }
        });
    }

    function renderCards() {
        // Update grid layout based on number of cards
        const columns = appState.columns || Math.ceil(Math.sqrt(appState.numCards)); // A simple heuristic for columns
        cardsContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        
        cardsContainer.innerHTML = '';
        checkAllPlayersLocked(); // Check lock status before rendering
        const gameHasStarted = appState.clickHistory.length > 0;

        appState.cards.forEach(cardData => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.dataset.id = cardData.id;

            if (cardData.locked && !cardData.won) {
                cardElement.classList.add('locked-card-state');
            }

            let undoButtonHTML = '';
            if (cardData.locked && !cardData.won && !gameHasStarted) {
                undoButtonHTML = `<button class="undo-lock-button" title="Deshacer confirmación">↩</button>`;
            }
            
            if (cardData.won) {
                cardElement.classList.add('winner');
                cardElement.innerHTML = `
                    <div class="winner-layout">
                        <div class="winner-top">
                            <span class="card-id">${cardData.id}</span>
                            <span class="winner-badge">🏆 ${cardData.winOrder}° Puesto</span>
                        </div>
                        <div class="prize-won">${cardData.prizeWon} ${gameUnit}</div>
                        <div class="winner-player-name player-name locked-name">${cardData.name}</div>
                    </div>
                `;
            } else {
                const circlesHTML = Array.from({ length: MAX_CLICKS }, (_, i) =>
                    `<div class="circle ${i < cardData.clicks ? 'filled' : ''}"></div>`
                ).join('');

                cardElement.innerHTML = `
                    ${undoButtonHTML}
                    <div class="card-header">${cardData.id}</div>
                    <input type="text" class="player-name ${cardData.locked ? 'locked-name' : ''}" placeholder="................................" value="${cardData.name}" ${cardData.locked || cardData.won ? 'readonly' : ''} autocomplete="off">
                    <div class="circles-container">
                        ${circlesHTML}
                    </div>
                `;
            }

            cardsContainer.appendChild(cardElement);
        });
        updateDuplicateNameHighlights();
        addEventListeners();
    }

    async function handleCardClick(event) {
        if (!arePlayersLocked) {
            playSound('lock', 0.3);
            const lockedCardsCount = appState.cards.filter(c => c.locked).length;
            const remaining = NUM_CARDS - lockedCardsCount;
            if (remaining > 0) {
                 await customAlert(`Faltan ${remaining} goleadores por confirmar.<br>Presiona Enter en su caja de texto para confirmar.`);
            }
            return;
        }

        const cardElement = event.currentTarget;
        const cardId = parseInt(cardElement.dataset.id);
        const card = appState.cards.find(c => c.id === cardId);

        if (card.won || card.locked === false) return; // Prevent clicks on non-locked cards just in case

        const currentPrizes = appState.prizes;
        const maxWinners = currentPrizes.length;

        if (appState.winners.length >= maxWinners) {
            await customAlert(`Ya se han registrado los ${maxWinners} goleadores.`);
            return;
        }

        if (card.clicks < MAX_CLICKS) {
            card.clicks++;
            appState.clickHistory.push({ cardId: card.id }); // Log the click
            playSound('click', 0.3);

            // Re-render immediately after the first click to hide all undo buttons
            if (appState.clickHistory.length === 1) {
                renderCards();
            } else {
                 updateCardUI(cardElement, card);
            }

            if (card.clicks === MAX_CLICKS) {
                card.won = true;
                const winOrder = appState.winners.length + 1;
                const prize = currentPrizes[winOrder - 1];

                card.winOrder = winOrder;
                card.prizeWon = prize;
                appState.winners.push(card.id);

                const winnerName = card.name.trim() || `Goleador ${card.id}`;
                setTimeout(async () => {
                    const ordinalSuffix = { 1: 'er', 2: 'do', 3: 'er', 4: 'to', 5: 'to' }[winOrder] || '°';
                    await customAlert(`¡GOOOL! <strong>${winnerName}</strong> ha goleado.<br>¡Es el ${winOrder}${ordinalSuffix} goleador y se lleva <strong>${prize} ${gameUnit}</strong>!`);
                    launchConfetti();
                    playSound('win', 1.0);
                }, 100);

                renderCards(); // Re-render to show winner info and disable input
            }
            saveState();
            checkAllPlayersLocked(); // Update undo button visibility
        }
    }

    function handleNameInput(event) {
        const input = event.target;
        const cardElement = input.closest('.card');
        const cardId = parseInt(cardElement.dataset.id);
        const card = appState.cards.find(c => c.id === cardId);
        card.name = input.value;
        saveState();
        updateDuplicateNameHighlights();
        showAutocomplete(input); // Trigger autocomplete
    }

    async function handleNameKeydown(event) {
        const input = event.target;
        // Autocomplete navigation
        if (autocompleteContainer.style.display !== 'none') {
            const items = autocompleteContainer.querySelectorAll('.suggestion-item');
            if (items.length > 0) {
                let activeIndex = -1;
                items.forEach((item, index) => {
                    if (item.classList.contains('active')) {
                        activeIndex = index;
                    }
                });

                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    if (activeIndex < items.length - 1) {
                        if (activeIndex > -1) items[activeIndex].classList.remove('active');
                        items[activeIndex + 1].classList.add('active');
                    }
                } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    if (activeIndex > 0) {
                        items[activeIndex].classList.remove('active');
                        items[activeIndex - 1].classList.add('active');
                    }
                } else if (event.key === 'Enter') {
                    event.preventDefault();
                    if (activeIndex > -1) {
                        items[activeIndex].click();
                    } else {
                        hideAutocomplete();
                        lockPlayer(input); // Lock if enter is pressed with no selection
                    }
                    return; // Prevent default form submission behavior
                } else if (event.key === 'Escape') {
                    hideAutocomplete();
                    return;
                }
            }
        }

        // Default behavior: Lock player on Enter if autocomplete is not active
        if (event.key === 'Enter') {
            event.preventDefault();
            hideAutocomplete();
            lockPlayer(input);
        }
    }

    async function lockPlayer(input) {
        const cardElement = input.closest('.card');
        const cardId = parseInt(cardElement.dataset.id);
        const card = appState.cards.find(c => c.id === cardId);

        if (card.name.trim() === '') {
             await customAlert('Por favor, ingresa un nombre para el goleador antes de confirmar.');
             return;
        }
        
        const cost = appState.cost || 0;
        const normalizedName = card.name.trim().toLowerCase();
        const player = playersData[normalizedName];
        
        let participationConfirmed = false; // Default to false

        if (cost === 0) {
             participationConfirmed = true; // Free game
        } else if (!player || player.balance <= 0) {
            // New player or player with no balance. Assume external payment.
            participationConfirmed = true;
            card.paymentFromBalance = 0;
        } else if (player.balance >= cost) {
            // Player has enough balance
            const useBalance = await showModal(`<b>${card.name}</b> tiene ${player.balance} ${gameUnit}. ¿Usar ${cost} para participar?`, [
                { text: 'No', class: 'modal-button secondary', value: false },
                { text: 'Sí', class: 'modal-button primary', value: true }
            ]);
            if (useBalance) {
                playersData[normalizedName].balance -= cost;
                card.paymentFromBalance = cost;
                participationConfirmed = true;
            }
        } else { // player.balance < cost
            // Player has insufficient balance
            const needed = cost - player.balance;
            const confirmInsufficient = await showModal(
                `<b>${player.name}</b> solo tiene ${player.balance} ${gameUnit} (necesita ${cost}).<br>Le faltan ${needed} ${gameUnit}.<br><br><b>¿Confirmar participación y usar saldo parcial?</b>`,
                [
                    { text: 'No', class: 'modal-button secondary', value: false },
                    { text: 'Sí, confirmar', class: 'modal-button primary', value: true }
                ]
            );
            
            if (confirmInsufficient) {
                card.paymentFromBalance = playersData[normalizedName].balance; // Store amount paid
                playersData[normalizedName].balance = 0;
                participationConfirmed = true;
            }
        }

        if (participationConfirmed) {
            card.locked = true;
            if(player) savePlayersData(); // Save balance change if player existed
            playSound('click', 0.5); 
            saveState();
            renderCards(); 
        }
    }

    function updateCardUI(cardElement, cardData) {
        const circles = cardElement.querySelectorAll('.circle');
        circles.forEach((circle, index) => {
            if (index < cardData.clicks) {
                circle.classList.add('filled');
            } else {
                circle.classList.remove('filled');
            }
        });
    }

    function addEventListeners() {
        document.querySelectorAll('.card').forEach(card => {
            const cardData = appState.cards.find(c => c.id == card.dataset.id);
            if (!cardData.won) {
                card.addEventListener('click', handleCardClick);
            }
            const input = card.querySelector('.player-name');
            input.addEventListener('click', (e) => {
                if (!arePlayersLocked) {
                    e.stopPropagation();
                }
            });
            input.addEventListener('input', handleNameInput);
            input.addEventListener('keydown', handleNameKeydown);
            input.addEventListener('focus', () => showAutocomplete(input));
            input.addEventListener('blur', () => setTimeout(hideAutocomplete, 150)); // Delay to allow click

            const undoButton = card.querySelector('.undo-lock-button');
            if (undoButton) {
                undoButton.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent card click event
                    handleUndoLock(parseInt(card.dataset.id, 10));
                });
            }
        });
    }

    // --- Autocomplete Logic ---
    function showAutocomplete(inputElement) {
        if (arePlayersLocked) {
            hideAutocomplete();
            return;
        }
        const value = inputElement.value;
        if (value.length < MIN_AUTOCOMPLETE_CHARS) {
            hideAutocomplete();
            return;
        }

        const lowerCaseValue = value.toLowerCase();
        const currentCardId = parseInt(inputElement.closest('.card').dataset.id, 10);
        const suggestions = new Set();

        // 1. Get from existing players data (goleadores)
        Object.values(playersData).forEach(player => {
            if (player.name.toLowerCase().startsWith(lowerCaseValue)) {
                suggestions.add(player.name);
            }
        });

        // 2. Get from other cards in the current game
        appState.cards.forEach(card => {
            // Only suggest names from *other* cards
            if (card.id !== currentCardId && card.name.trim() !== '' && card.name.toLowerCase().startsWith(lowerCaseValue)) {
                suggestions.add(card.name.trim());
            }
        });

        const suggestionsArray = Array.from(suggestions).slice(0, 8); // Limit to 8 suggestions

        if (suggestionsArray.length === 0) {
            hideAutocomplete();
            return;
        }
        
        autocompleteContainer.innerHTML = '';
        suggestionsArray.forEach(suggestion => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.textContent = suggestion;
            item.addEventListener('mousedown', (e) => { // mousedown to fire before blur
                e.preventDefault();
                inputElement.value = suggestion;
                
                const cardElement = inputElement.closest('.card');
                const cardId = parseInt(cardElement.dataset.id);
                const card = appState.cards.find(c => c.id === cardId);
                card.name = suggestion;

                saveState();
                updateDuplicateNameHighlights();
                hideAutocomplete();
                inputElement.focus();
            });
            autocompleteContainer.appendChild(item);
        });

        // Position and show the container
        const inputRect = inputElement.getBoundingClientRect();
        autocompleteContainer.style.left = `${inputRect.left}px`;
        autocompleteContainer.style.top = `${inputRect.bottom}px`;
        autocompleteContainer.style.width = `${inputRect.width}px`;
        autocompleteContainer.style.display = 'block';
    }

    function hideAutocomplete() {
        autocompleteContainer.style.display = 'none';
        autocompleteContainer.innerHTML = '';
    }

    function launchConfetti() {
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 }
        });
    }

    async function clearAll() {
        const confirmation = await customConfirm('¿Finalizar dinámica?<br>Se limpiará el tablero. Los ganadores no guardados se perderán.');
        if (confirmation) {
            playSound('clear', 0.3);
            appState = getInitialState(appState.numCards, appState.cost, appState.prizes, appState.columns); // Reset with current settings
            saveState();
            updatePrizesUI(); // Also updates summary
            renderCards();
        }
    }
    
    function processWinners() {
        const gameWinners = {}; // { normalizedName: { name: 'Original Name', prize: X } }
        let winnersFound = false;

        appState.cards.forEach(card => {
            if (card.won && card.name.trim() !== '') {
                winnersFound = true;
                const name = card.name.trim();
                const normalizedName = name.toLowerCase();
                const prize = card.prizeWon;

                if (!gameWinners[normalizedName]) {
                    gameWinners[normalizedName] = { name: name, prize: 0 };
                }
                gameWinners[normalizedName].prize += prize;
            }
        });
        
        Object.keys(gameWinners).forEach(normalizedName => {
            const winner = gameWinners[normalizedName];
            if (!playersData[normalizedName]) {
                playersData[normalizedName] = { name: winner.name, balance: 0 };
            }
            playersData[normalizedName].balance += winner.prize;
            // Update name casing in case it changed
            playersData[normalizedName].name = winner.name;
        });
        
        if(Object.keys(gameWinners).length > 0) {
            savePlayersData();
        }

        return winnersFound;
    }

    async function handleSaveGame() {
        const winnersFound = appState.winners.length > 0;
        if (!winnersFound) {
            playSound('lock', 0.3);
            await customAlert('No hay ganadores en el tablero para guardar.');
            return;
        }

        const confirmation = await customConfirm('¿Guardar esta dinámica?<br>Se registrarán los ganadores y sus bolsas se actualizarán.');
        if (confirmation) {
            const stateToSave = JSON.parse(JSON.stringify(appState));
            stateToSave.dinamicaNumber = dinamicaNumber; // Stamp the dinamica number on the saved game
            
            // Calculate and add profit before resetting state
            const totalRecaudado = stateToSave.numCards * stateToSave.cost;
            const totalPremios = stateToSave.prizes.reduce((sum, p) => sum + p, 0);
            const ganancia = totalRecaudado - totalPremios;
            accumulatedProfit += ganancia;

            // Add to history
            gameHistory.unshift(stateToSave);
            if (gameHistory.length > 5) {
                gameHistory = gameHistory.slice(0, 5);
            }
            saveGameHistory();

            processWinners();

            // Increment dinamica number for the *next* game
            dinamicaNumber++;
            saveGameMeta();
            updateAccumulatedProfitUI();

            playSound('win', 0.8);
            await customAlert('¡Dinámica guardada y bolsas actualizadas!');
            
            // Optionally, clear the board after saving
            appState = getInitialState(appState.numCards, appState.cost, appState.prizes, appState.columns);
            saveState();
            updatePrizesUI(); // Also updates summary
            renderCards();
            updateHeaderUI();
            // updateAccumulatedProfitUI(); // No longer needed here

            playSound('clear', 0.8);
            await customAlert('¡Día reiniciado! Todos los registros han sido borrados.');
        }
    }

    function handleUndoLock(cardId) {
        const card = appState.cards.find(c => c.id === cardId);
        if (!card || !card.locked) return;

        const normalizedName = card.name.trim().toLowerCase();
        
        // Refund if payment was from balance
        if (card.paymentFromBalance > 0 && playersData[normalizedName]) {
            playersData[normalizedName].balance += card.paymentFromBalance;
            savePlayersData();
        }

        // Unlock the card and reset payment tracking
        card.locked = false;
        card.paymentFromBalance = 0;

        playSound('clear', 0.2);
        saveState();
        renderCards(); // Re-render to update UI
    }

    function handleUndo() {
        if (appState.clickHistory.length === 0) return;

        const lastClick = appState.clickHistory.pop();
        const cardToUndo = appState.cards.find(c => c.id === lastClick.cardId);

        if (cardToUndo && cardToUndo.clicks > 0) {
            const wasWinner = cardToUndo.won;
            const wasLastWinner = wasWinner && appState.winners[appState.winners.length - 1] === cardToUndo.id;

            // Decrement clicks first
            cardToUndo.clicks--;

            // If the card was a winner and it was the most recent one, revert its win status
            if (wasLastWinner) {
                cardToUndo.won = false;
                cardToUndo.winOrder = null;
                cardToUndo.prizeWon = null;
                appState.winners.pop(); // Remove from winners list
            }

            playSound('clear', 0.2);
            saveState();
            renderCards();
        }
    }

    // --- Player Management Logic ---
    function showPlayerManagement() {
        sortKey = 'name'; // Reset sort on open
        sortDirection = 'asc';
        renderPlayerBalances();
        renderPayoutHistory();
        playerManagementModal.style.display = 'flex';
    }

    function hidePlayerManagement() {
        playerManagementModal.style.display = 'none';
    }

    function renderPlayerBalances() {
        playerBalancesList.innerHTML = '';

        // Sorting Logic
        const sortedPlayers = Object.values(playersData)
            .filter(player => player.balance > 0)
            .sort((a, b) => {
                let valA, valB;

                if (sortKey === 'name') {
                    valA = a.name.toLowerCase();
                    valB = b.name.toLowerCase();
                } else { // 'balance'
                    valA = a.balance;
                    valB = b.balance;
                }

                if (valA < valB) {
                    return sortDirection === 'asc' ? -1 : 1;
                }
                if (valA > valB) {
                    return sortDirection === 'asc' ? 1 : -1;
                }
                return 0;
            });

        // Update header UI
        document.querySelectorAll('.sortable-header').forEach(header => {
            const arrow = header.querySelector('.sort-arrow');
            if (header.dataset.sort === sortKey) {
                header.classList.add('active');
                arrow.textContent = sortDirection === 'asc' ? '▲' : '▼';
            } else {
                header.classList.remove('active');
                arrow.textContent = '';
            }
        });

        if (sortedPlayers.length === 0) {
            playerBalancesList.innerHTML = '<p>Aún no hay goleadores con bolsa.</p>';
            return;
        }

        sortedPlayers.forEach(player => {
            const item = document.createElement('div');
            item.className = 'player-balance-item';
            item.innerHTML = `
                <span class="player-balance-item-name">${player.name}</span>
                <span class="player-balance-item-amount">${player.balance} ${gameUnit}</span>
                <button class="payout-button" data-name="${player.name}">Enviar Bolsa</button>
            `;
            playerBalancesList.appendChild(item);
        });

        document.querySelectorAll('.payout-button').forEach(button => {
            button.addEventListener('click', () => handlePayout(button.dataset.name));
        });
    }

    function renderPayoutHistory() {
        paymentHistoryList.innerHTML = '';
        if (payoutHistory.length === 0) {
            paymentHistoryList.innerHTML = '<li>No hay envíos registrados.</li>';
            return;
        }
        [...payoutHistory].reverse().forEach(payout => {
            const item = document.createElement('li');
            item.innerHTML = `[${payout.date}] <strong>${payout.name}</strong> recibió <strong>${payout.amount} ${gameUnit}</strong>.`;
            paymentHistoryList.appendChild(item);
        });
    }

    async function handlePayout(playerName) {
        const normalizedName = playerName.toLowerCase();
        const player = playersData[normalizedName];

        if (!player || player.balance <= 0) {
            await customAlert(`${playerName} no tiene bolsa para enviar.`);
            return;
        }

        const confirmation = await customConfirm(`¿Enviar <strong>${player.balance} ${gameUnit}</strong> a <strong>${player.name}</strong>?<br>Su bolsa se reiniciará a 0.`);
        if (confirmation) {
            const payoutRecord = {
                name: player.name,
                amount: player.balance,
                date: new Date().toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' })
            };
            payoutHistory.push(payoutRecord);
            
            // Remove player if their balance becomes 0
            delete playersData[normalizedName];
            
            savePlayersData();
            playSound('win', 0.8);
            renderPlayerBalances();
            renderPayoutHistory();
        }
    }

    // --- Settings Modal Logic ---
    function createColorSwatches(container, palette, selectedColor, onSelect) {
        container.innerHTML = '';
        palette.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = color;
            swatch.dataset.color = color;
            if (color === selectedColor) {
                swatch.classList.add('selected');
            }
            swatch.addEventListener('click', () => {
                const currentSelected = container.querySelector('.selected');
                if (currentSelected) {
                    currentSelected.classList.remove('selected');
                }
                swatch.classList.add('selected');
                onSelect(color);
            });
            container.appendChild(swatch);
        });
    }

    function showColorPicker(targetElement, onSelect, isTextColor = false) {
        colorPickerPopup.innerHTML = '';
        
        let selectedColor;
        switch (targetElement.id) {
            case 'card-color-display':
                selectedColor = selectedCardColor;
                break;
            case 'prize-bg-color-display':
                selectedColor = selectedPrizeBgColor;
                break;
            case 'prize-text-color-display':
                selectedColor = selectedPrizeTextColor;
                break;
            case 'title-color-display':
                selectedColor = selectedTitleColor;
                break;
        }
    
        const createSwatch = (color) => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            if (selectedColor && color.toLowerCase() === selectedColor.toLowerCase()) {
                swatch.classList.add('selected');
            }
            swatch.style.backgroundColor = color;
            swatch.title = color;
            swatch.addEventListener('click', () => {
                onSelect(color);
                colorPickerPopup.style.display = 'none';
            });
            return swatch;
        };

        if (isTextColor) {
            const section = document.createElement('div');
            section.className = 'color-picker-section text-colors';
            TEXT_COLORS.forEach(color => {
                const swatch = createSwatch(color);
                swatch.classList.add('text-color-swatch');
                section.appendChild(swatch);
            });
            colorPickerPopup.appendChild(section);
        } else {
            // Standard Colors Row
            const standardColorsContainer = document.createElement('div');
            standardColorsContainer.className = 'standard-colors';
            STANDARD_COLORS.forEach(color => {
                standardColorsContainer.appendChild(createSwatch(color));
            });
            colorPickerPopup.appendChild(standardColorsContainer);

            // Theme Colors Grid - Flattened for wrapping
            const themeColorsContainer = document.createElement('div');
            themeColorsContainer.className = 'color-picker-section';
            THEME_COLORS.flat().forEach(color => {
                themeColorsContainer.appendChild(createSwatch(color));
            });
            colorPickerPopup.appendChild(themeColorsContainer);
        }
    
        const rect = targetElement.getBoundingClientRect();
        const modalContent = settingsModal.querySelector('.modal-content-large');
        const modalRect = modalContent.getBoundingClientRect();
        
        // Position relative to the modal-content-large container
        colorPickerPopup.style.left = `${rect.left - modalRect.left}px`;
        colorPickerPopup.style.top = `${rect.top - modalRect.top + rect.height + 5}px`;
        colorPickerPopup.style.display = 'flex';
        
        // After displaying, check for overflow relative to modal content and adjust
        const popupRect = colorPickerPopup.getBoundingClientRect();
        if (popupRect.right > modalRect.right) {
            colorPickerPopup.style.left = 'auto';
            colorPickerPopup.style.right = '20px';
        }
        if (popupRect.bottom > modalRect.bottom) {
            // Position above the swatch if it overflows below
            const newTop = rect.top - modalRect.top - popupRect.height - 5;
            colorPickerPopup.style.top = `${newTop}px`;
        }
    }
    
    function hideColorPickerOnClickOutside(event) {
        if (colorPickerPopup.style.display === 'flex' && !colorPickerPopup.contains(event.target) && !event.target.classList.contains('color-swatch-display')) {
            colorPickerPopup.style.display = 'none';
        }
    }

    function showSettingsModal() {
        // Load current game settings into the modal inputs
        const cols = appState.columns || 3;
        const rows = appState.numCards > 0 ? Math.ceil(appState.numCards / cols) : 4;
        configColsInput.value = cols;
        configRowsInput.value = rows;
        configPancitosInput.value = appState.cost;
        configPrizesInput.value = appState.prizes.join(', ');
        
        // Load header config
        configTitleInput.value = headerConfig.title;

        // Init temp color selections
        selectedTitleColor = headerConfig.titleColor; // From headerConfig now
        selectedCardColor = appState.cardColor;
        selectedPrizeBgColor = appState.prizeColor;
        selectedPrizeTextColor = appState.prizeTextColor;

        // Update display swatches
        titleColorDisplay.style.backgroundColor = selectedTitleColor;
        cardColorDisplay.style.backgroundColor = selectedCardColor;
        prizeBgColorDisplay.style.backgroundColor = selectedPrizeBgColor;
        prizeTextColorDisplay.style.backgroundColor = selectedPrizeTextColor;

        // Add event listeners to update preview
        [configColsInput, configRowsInput, configPrizesInput, configTitleInput].forEach(el => {
            el.addEventListener('input', updateSettingsPreview);
        });

        updateSettingsPreview(); // Initial render
        settingsModal.style.display = 'flex';
    }

    function hideSettingsModal() {
        colorPickerPopup.style.display = 'none'; // Ensure popup is hidden when modal closes
        [configColsInput, configRowsInput, configPrizesInput, configTitleInput].forEach(el => {
            el.removeEventListener('input', updateSettingsPreview);
        });
        settingsModal.style.display = 'none';
    }

    function updateSettingsPreview() {
        // Header
        previewTitle.textContent = configTitleInput.value || 'Dinámica Richito';
        previewTitle.style.color = selectedTitleColor;
        previewLogo.src = headerConfig.logo;

        // Prizes
        const prizes = configPrizesInput.value.split(',').map(p => p.trim()).filter(p => p);
        previewPrizesContainer.innerHTML = '';
        previewPrizesContainer.className = 'prize-container prize-line-display';
        if (prizes.length > 0) {
            const line = document.createElement('div');
            line.className = 'prize-line';
            line.textContent = prizes.join(' - ');
            line.style.backgroundColor = selectedPrizeBgColor;
            line.style.color = selectedPrizeTextColor;
            previewPrizesContainer.appendChild(line);
        }
        
        // Cards
        const cols = parseInt(configColsInput.value, 10) || 3;
        const rows = parseInt(configRowsInput.value, 10) || 4;
        const numCards = cols * rows;
        previewCardsContainer.innerHTML = '';
        previewCardsContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        for (let i = 1; i <= numCards && i <= 30; i++) { // Limit preview to 30 cards
            const card = document.createElement('div');
            card.className = 'preview-card';
            card.textContent = i;
            card.style.backgroundColor = selectedCardColor;
            previewCardsContainer.appendChild(card);
        }
        
        // Auto-scaling logic
        const previewPanel = document.getElementById('settings-preview-panel');
        const previewContainer = previewPanel.querySelector('.preview-container');
        
        // Temporarily reset transform to measure natural size
        previewContainer.style.transform = 'scale(1)';

        const panelRect = previewPanel.getBoundingClientRect();
        // Use scrollWidth/scrollHeight to get the full unscaled size of the content
        const contentWidth = previewContainer.scrollWidth;
        const contentHeight = previewContainer.scrollHeight;

        // Calculate available space inside the panel, accounting for padding and the h4 title
        const h4 = previewPanel.querySelector('h4');
        const h4Style = window.getComputedStyle(h4);
        const panelStyle = window.getComputedStyle(previewPanel);
        
        const availableWidth = panelRect.width - (parseFloat(panelStyle.paddingLeft) + parseFloat(panelStyle.paddingRight));
        const availableHeight = panelRect.height - (h4.offsetHeight + parseFloat(h4Style.marginBottom) + parseFloat(panelStyle.paddingTop) + parseFloat(panelStyle.paddingBottom));
        
        if (contentWidth > 0 && contentHeight > 0) {
            const scaleX = availableWidth / contentWidth;
            const scaleY = availableHeight / contentHeight;
            const scale = Math.min(scaleX, scaleY, 1.5); // Use the smaller scale factor to fit both dimensions, cap max zoom at 150%
            
            previewContainer.style.transform = `scale(${scale})`;
        }
    }

    async function applySettings() {
        const cols = parseInt(configColsInput.value, 10);
        const rows = parseInt(configRowsInput.value, 10);
        const newNumCards = cols * rows;
        const newCost = parseInt(configPancitosInput.value, 10);
        const newPrizes = configPrizesInput.value.split(',').map(p => parseInt(p.trim(), 10)).filter(p => !isNaN(p) && p > 0);

        if (newNumCards <= 0 || newCost < 0 || newPrizes.length === 0) {
            await customAlert('Configuración inválida. Revisa los valores.');
            return;
        }

        const confirmation = await customConfirm('Aplicar esta configuración reiniciará la dinámica actual. ¿Continuar?');
        if (confirmation) {
            playSound('clear', 0.5);
            
            // Create a new state but persist the newly selected colors
            const baseState = getInitialState(newNumCards, newCost, newPrizes, cols);
            baseState.cardColor = selectedCardColor;
            baseState.prizeColor = selectedPrizeBgColor;
            baseState.prizeTextColor = selectedPrizeTextColor;
            appState = baseState;
            
            // Also apply and save the title color
            headerConfig.titleColor = selectedTitleColor;
            saveGameMeta();
            updateHeaderUI();

            saveState();
            applyColors();
            updatePrizesUI(); // Also updates summary
            renderCards();
            hideSettingsModal();
        }
    }

    function handleResetColors() {
        playSound('clear', 0.2);
        selectedTitleColor = DEFAULT_COLORS.title;
        selectedCardColor = DEFAULT_COLORS.card;
        selectedPrizeBgColor = DEFAULT_COLORS.prizeBg;
        selectedPrizeTextColor = DEFAULT_COLORS.prizeText;

        titleColorDisplay.style.backgroundColor = selectedTitleColor;
        cardColorDisplay.style.backgroundColor = selectedCardColor;
        prizeBgColorDisplay.style.backgroundColor = selectedPrizeBgColor;
        prizeTextColorDisplay.style.backgroundColor = selectedPrizeTextColor;
        
        updateSettingsPreview();
    }

    // --- History Modal Logic ---
    function renderHistoryForIndex(index) {
        if (!gameHistory || gameHistory.length === 0 || index < 0 || index >= gameHistory.length) {
            historyContent.innerHTML = '<p>No hay ninguna jugada anterior guardada.</p>';
            historyNavigation.style.display = 'none';
            return;
        }

        const game = gameHistory[index];
        const historyCardsContainer = document.createElement('div');
        historyCardsContainer.className = 'history-cards-container';
        
        const columns = game.columns || Math.ceil(Math.sqrt(game.numCards));
        historyCardsContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

        game.cards.forEach(cardData => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card history-card';
            if (cardData.won) {
                cardElement.classList.add('winner');
                cardElement.innerHTML = `
                    <div class="winner-layout">
                        <div class="winner-top">
                            <span class="card-id">${cardData.id}</span>
                            <span class="winner-badge">🏆 ${cardData.winOrder}°</span>
                        </div>
                        <div class="prize-won">${cardData.prizeWon} ${gameUnit.substring(0,1)}.</div>
                        <div class="winner-player-name player-name locked-name">${cardData.name}</div>
                    </div>`;
            } else {
                 cardElement.innerHTML = `
                    <div class="card-header">${cardData.id}</div>
                    <div class="player-name locked-name">${cardData.name || '-'}</div>`;
            }
            historyCardsContainer.appendChild(cardElement);
        });
        
        const title = document.querySelector('#history-modal h2');
        title.textContent = `Jugada Guardada (Dinámica #${game.dinamicaNumber || 'N/A'})`;

        historyContent.innerHTML = '';
        historyContent.appendChild(historyCardsContainer);

        // Update navigation
        historyPageIndicator.textContent = `${index + 1} / ${gameHistory.length}`;
        historyPrevButton.disabled = index === 0;
        historyNextButton.disabled = index === gameHistory.length - 1;
        historyNavigation.style.display = gameHistory.length > 1 ? 'flex' : 'none';
    }


    function showHistoryModal() {
        currentHistoryIndex = 0; // Reset to the latest game
        renderHistoryForIndex(currentHistoryIndex);
        historyModal.style.display = 'flex';
    }

    function hideHistoryModal() {
        historyModal.style.display = 'none';
    }

    // --- Profit Details Modal Logic ---
    function renderProfitDetails() {
        if (!gameHistory || gameHistory.length === 0) {
            profitDetailsContent.innerHTML = '<p>Aún no hay dinámicas guardadas para mostrar un resumen.</p>';
            profitTotalDisplay.innerHTML = '';
            return;
        }
    
        const aggregatedData = {};
    
        gameHistory.forEach(game => {
            const key = `${game.numCards}x${game.cost}`;
            if (!aggregatedData[key]) {
                aggregatedData[key] = {
                    numCards: game.numCards,
                    cost: game.cost,
                    count: 0,
                    totalCollected: 0,
                    totalPrizes: 0,
                };
            }
    
            const group = aggregatedData[key];
            const collected = game.numCards * game.cost;
            const prizes = game.prizes.reduce((sum, p) => sum + p, 0);
    
            group.count++;
            group.totalCollected += collected;
            group.totalPrizes += prizes;
        });
    
        profitDetailsContent.innerHTML = Object.values(aggregatedData).map(group => {
            const totalProfit = group.totalCollected - group.totalPrizes;
            return `
                <div class="profit-group">
                    <div class="profit-group-header">${group.numCards} cartillas × ${group.cost} ${gameUnit}</div>
                    <dl class="profit-group-details">
                        <dt>Jugadas realizadas:</dt><dd>${group.count}</dd>
                        <dt>Total recaudado:</dt><dd>${group.totalCollected}</dd>
                        <dt>Total premios:</dt><dd>${group.totalPrizes}</dd>
                        <dt>Ganancia:</dt><dd class="profit-value">${totalProfit}</dd>
                    </dl>
                </div>
            `;
        }).join('');

        profitTotalDisplay.innerHTML = `Ganancia Acumulada del Día: <span>${accumulatedProfit} ${gameUnit}</span>`;
    }

    function showProfitDetailsModal() {
        renderProfitDetails();
        profitDetailsModal.style.display = 'flex';
    }

    function hideProfitDetailsModal() {
        profitDetailsModal.style.display = 'none';
    }

    async function handleResetDay() {
        const confirmation = await customConfirm('¿Reiniciar el día?<br>Se borrarán <strong>TODAS</strong> las bolsas de goleadores, el historial de envíos y la última jugada guardada. Esta acción no se puede deshacer.');
        if (confirmation) {
            // Clear data variables
            playersData = {};
            payoutHistory = [];
            gameHistory = [];
            dinamicaNumber = 1;
            accumulatedProfit = 0;
            gameUnit = 'panes'; // Reset unit

            // Clear localStorage
            localStorage.removeItem('dinamicaRichitoPlayers');
            localStorage.removeItem('dinamicaRichitoPayouts');
            localStorage.removeItem('dinamicaRichitoGameHistory');
            localStorage.removeItem('dinamicaRichitoLastGame'); // Also clear old key just in case
            localStorage.removeItem('dinamicaRichitoMeta');
            localStorage.removeItem('dinamicaRichitoNumber'); // Also old key

            // Reset header config to default
            headerConfig = {
                title: 'Dinámica Richito',
                logo: 'logo.png',
                titleColor: DEFAULT_COLORS.title
            };

            // Optionally reset the current game board as well
            appState = getInitialState(appState.numCards, appState.cost, appState.prizes, appState.columns);
            saveState();
            updatePrizesUI(); // Also updates summary
            renderCards();
            updateHeaderUI();
            // updateAccumulatedProfitUI(); // No longer needed here

            playSound('clear', 0.8);
            await customAlert('¡Día reiniciado! Todos los registros han sido borrados.');
        }
    }

    // --- Event Listeners Setup ---
    
    // Main Buttons
    clearButton.addEventListener('click', clearAll);
    undoButton.addEventListener('click', handleUndo);
    managePlayersButton.addEventListener('click', showPlayerManagement);
    closePlayerModalButton.addEventListener('click', hidePlayerManagement);
    saveButton.addEventListener('click', handleSaveGame);
    resetDayButton.addEventListener('click', handleResetDay);
    profitDetailsButton.addEventListener('click', async () => {
        const confirmation = await showModal(
            '¿Estas seguro que deseas mostrar esta informacion privada?',
            [
                { text: 'Cancelar', class: 'modal-button secondary', value: false },
                { text: 'Ver detalle', class: 'modal-button primary', value: true }
            ]
        );
        if (confirmation) {
            showProfitDetailsModal();
        }
    });
    closeProfitModalButton.addEventListener('click', hideProfitDetailsModal);
    
    // Player Management Sorting Listeners
    document.querySelectorAll('.sortable-header').forEach(header => {
        header.addEventListener('click', () => {
            const newSortKey = header.dataset.sort;
            if (sortKey === newSortKey) {
                // Flip direction
                sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                // Change sort key
                sortKey = newSortKey;
                sortDirection = sortKey === 'balance' ? 'desc' : 'asc'; // Default balance to descending
            }
            renderPlayerBalances(); // Re-render the list with new sorting
        });
    });

    // Settings Modal Listeners
    settingsButton.addEventListener('click', showSettingsModal);
    closeSettingsModalButton.addEventListener('click', hideSettingsModal);
    applySettingsButton.addEventListener('click', applySettings);
    resetColorsButton.addEventListener('click', handleResetColors);

    // Unit Config Popup Listeners
    configUnitButton.addEventListener('click', () => {
        unitInput.value = gameUnit; // Load current unit into input
        unitConfigPopup.style.display = 'flex';
    });

    cancelUnitButton.addEventListener('click', () => {
        unitConfigPopup.style.display = 'none';
    });

    saveUnitButton.addEventListener('click', () => {
        const newUnit = unitInput.value.trim();
        if (newUnit) {
            gameUnit = newUnit;
            saveGameMeta();
            updatePrizesUI(); // Update main UI
            updateSettingsPreview(); // Update preview
            unitConfigPopup.style.display = 'none';
        }
    });

    // Header Config Listeners
    configTitleInput.addEventListener('input', () => {
        headerConfig.title = configTitleInput.value.trim() || 'Dinámica Richito';
        updateHeaderUI();
        saveGameMeta();
    });

    changeLogoButton.addEventListener('click', () => {
        configLogoUploadInput.click();
    });

    configLogoUploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                headerConfig.logo = e.target.result;
                // Update preview live
                previewLogo.src = headerConfig.logo;
                updateHeaderUI();
                saveGameMeta();
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Color Picker Listeners
    titleColorDisplay.addEventListener('click', (e) => {
        showColorPicker(e.target, (color) => {
            selectedTitleColor = color;
            titleColorDisplay.style.backgroundColor = color;
            updateSettingsPreview();
        });
    });

    cardColorDisplay.addEventListener('click', (e) => {
        showColorPicker(e.target, (color) => {
            selectedCardColor = color;
            cardColorDisplay.style.backgroundColor = color;
            updateSettingsPreview();
        });
    });

    prizeBgColorDisplay.addEventListener('click', (e) => {
        showColorPicker(e.target, (color) => {
            selectedPrizeBgColor = color;
            prizeBgColorDisplay.style.backgroundColor = color;
            updateSettingsPreview();
        });
    });

    prizeTextColorDisplay.addEventListener('click', (e) => {
        showColorPicker(e.target, (color) => {
            selectedPrizeTextColor = color;
            prizeTextColorDisplay.style.backgroundColor = color;
            updateSettingsPreview();
        }, true); // `true` indicates it's the text color picker
    });

    document.addEventListener('click', hideColorPickerOnClickOutside);

    // History Modal Listeners
    historyButton.addEventListener('click', showHistoryModal);
    closeHistoryModalButton.addEventListener('click', hideHistoryModal);
    historyPrevButton.addEventListener('click', () => {
        if (currentHistoryIndex > 0) {
            currentHistoryIndex--;
            renderHistoryForIndex(currentHistoryIndex);
        }
    });
    historyNextButton.addEventListener('click', () => {
        if (currentHistoryIndex < gameHistory.length - 1) {
            currentHistoryIndex++;
            renderHistoryForIndex(currentHistoryIndex);
        }
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
        });
    });

    // Initial load
    (async () => {
        await loadAllSounds();
        loadPlayersData();
        loadGameHistory();
        loadGameMeta();
        appState = loadState();
        applyColors();
        updatePrizesUI();
        updateHeaderUI();
        // updateAccumulatedProfitUI(); // Removed
        renderCards();
    })();
});