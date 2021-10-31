! function() {
    function e(t, r, a) {
        function n(o, s) {
            if (!r[o]) {
                if (!t[o]) {
                    var l = "function" == typeof require && require;
                    if (!s && l) return l(o, !0);
                    if (i) return i(o, !0);
                    var u = new Error("Cannot find module '" + o + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var c = r[o] = {
                    exports: {}
                };
                t[o][0].call(c.exports, function(e) {
                    return n(t[o][1][e] || e)
                }, c, c.exports, e, t, r, a)
            }
            return r[o].exports
        }
        for (var i = "function" == typeof require && require, o = 0; o < a.length; o++) n(a[o]);
        return n
    }
    return e
}()({
    1: [function(e, t, r) {
        var a;
        a = e("velocity-animate"), e("velocity-animate/velocity.ui"), document.addEventListener("DOMContentLoaded", function(e) {
            var t, r, n, i, o, s, l, u, c, f, p, d, g;
            return u = document.querySelectorAll(".chiclet.down.arrow.key"), c = document.querySelectorAll(".chiclet.left.arrow.key"), p = document.querySelectorAll(".chiclet.up.arrow.key"), f = document.querySelectorAll(".chiclet.right.arrow.key"), d = [{
                e: u,
                p: {
                    opacity: 0
                },
                o: {
                    duration: 700,
                    delay: 1e3
                }
            }, {
                e: p,
                p: {
                    opacity: 1
                },
                o: {
                    duration: 700,
                    sequenceQueue: !1
                }
            }, {
                e: p,
                p: {
                    opacity: 0
                },
                o: {
                    duration: 700,
                    delay: 1e3
                }
            }, {
                e: c,
                p: {
                    opacity: 1
                },
                o: {
                    duration: 700,
                    sequenceQueue: !1
                }
            }, {
                e: c,
                p: {
                    opacity: 0
                },
                o: {
                    duration: 700,
                    delay: 1e3
                }
            }, {
                e: f,
                p: {
                    opacity: 1
                },
                o: {
                    duration: 700,
                    sequenceQueue: !1
                }
            }, {
                e: f,
                p: {
                    opacity: 0
                },
                o: {
                    duration: 700,
                    delay: 1e3
                }
            }, {
                e: u,
                p: {
                    opacity: 1
                },
                o: {
                    duration: 700,
                    sequenceQueue: !1
                }
            }], a.RunSequence(d), setInterval(function() {
                return a.RunSequence(d)
            }, 8e3), t = document.querySelector(".cog.one"), r = document.querySelector(".cog.two"), n = document.querySelector(".cog.three"), i = document.querySelector(".cog.four"), o = document.querySelector(".cog.five"), s = document.querySelector(".cog.six"), document.querySelector(".section.hero > .container"), l = document.querySelector(".hero.parallax"), g = function() {
                var e, a, u;
                return window.requestAnimationFrame(g), u = Math.max(window.pageYOffset, 0), e = Math.round(.1 * u), t.style.transform = "rotate(-" + e + "deg)", r.style.transform = "rotate(" + e + "deg)", n.style.transform = "rotate(" + e + "deg)", i.style.transform = "rotate(" + e + "deg)", o.style.transform = "rotate(-" + e + "deg)", s.style.transform = "rotate(-" + e + "deg)", a = Math.round(.44 * -u), l.style.transform = "translate3d(0," + a + "px,0)"
            }, window.requestAnimationFrame(g)
        }), window.addEventListener("load", function(e) {
            var t, r;
            return mixpanel.people.set({
                $created: new Date
            }), t = mixpanel.get_distinct_id(), mixpanel.track("Welcome Page Displayed", {
                "Mixpanel: User ID": t
            }), "undefined" != typeof browser && null !== browser && null != (r = browser.runtime) && "function" == typeof r.setUninstallURL ? r.setUninstallURL("https://smoothkeyscroll.herokuapp.com/uninstalled?id=" + t) : void 0
        })
    }, {
        "velocity-animate": 2,
        "velocity-animate/velocity.ui": 3
    }],
    2: [function(e, t, r) {
        ! function(e) {
            "use strict";

            function t(e) {
                var t = e.length,
                    a = r.type(e);
                return "function" !== a && !r.isWindow(e) && (!(1 !== e.nodeType || !t) || ("array" === a || 0 === t || "number" == typeof t && t > 0 && t - 1 in e))
            }
            if (!e.jQuery) {
                var r = function(e, t) {
                    return new r.fn.init(e, t)
                };
                r.isWindow = function(e) {
                    return e && e === e.window
                }, r.type = function(e) {
                    return e ? "object" == typeof e || "function" == typeof e ? n[o.call(e)] || "object" : typeof e : e + ""
                }, r.isArray = Array.isArray || function(e) {
                    return "array" === r.type(e)
                }, r.isPlainObject = function(e) {
                    var t;
                    if (!e || "object" !== r.type(e) || e.nodeType || r.isWindow(e)) return !1;
                    try {
                        if (e.constructor && !i.call(e, "constructor") && !i.call(e.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (e) {
                        return !1
                    }
                    for (t in e);
                    return void 0 === t || i.call(e, t)
                }, r.each = function(e, r, a) {
                    var n = 0,
                        i = e.length,
                        o = t(e);
                    if (a) {
                        if (o)
                            for (; n < i && !1 !== r.apply(e[n], a); n++);
                        else
                            for (n in e)
                                if (e.hasOwnProperty(n) && !1 === r.apply(e[n], a)) break
                    } else if (o)
                        for (; n < i && !1 !== r.call(e[n], n, e[n]); n++);
                    else
                        for (n in e)
                            if (e.hasOwnProperty(n) && !1 === r.call(e[n], n, e[n])) break;
                    return e
                }, r.data = function(e, t, n) {
                    if (void 0 === n) {
                        var i = e[r.expando],
                            o = i && a[i];
                        if (void 0 === t) return o;
                        if (o && t in o) return o[t]
                    } else if (void 0 !== t) {
                        var s = e[r.expando] || (e[r.expando] = ++r.uuid);
                        return a[s] = a[s] || {}, a[s][t] = n, n
                    }
                }, r.removeData = function(e, t) {
                    var n = e[r.expando],
                        i = n && a[n];
                    i && (t ? r.each(t, function(e, t) {
                        delete i[t]
                    }) : delete a[n])
                }, r.extend = function() {
                    var e, t, a, n, i, o, s = arguments[0] || {},
                        l = 1,
                        u = arguments.length,
                        c = !1;
                    for ("boolean" == typeof s && (c = s, s = arguments[l] || {}, l++), "object" != typeof s && "function" !== r.type(s) && (s = {}), l === u && (s = this, l--); l < u; l++)
                        if (i = arguments[l])
                            for (n in i) i.hasOwnProperty(n) && (e = s[n], a = i[n], s !== a && (c && a && (r.isPlainObject(a) || (t = r.isArray(a))) ? (t ? (t = !1, o = e && r.isArray(e) ? e : []) : o = e && r.isPlainObject(e) ? e : {}, s[n] = r.extend(c, o, a)) : void 0 !== a && (s[n] = a)));
                    return s
                }, r.queue = function(e, a, n) {
                    if (e) {
                        a = (a || "fx") + "queue";
                        var i = r.data(e, a);
                        return n ? (!i || r.isArray(n) ? i = r.data(e, a, function(e, r) {
                            var a = r || [];
                            return e && (t(Object(e)) ? function(e, t) {
                                for (var r = +t.length, a = 0, n = e.length; a < r;) e[n++] = t[a++];
                                if (r !== r)
                                    for (; void 0 !== t[a];) e[n++] = t[a++];
                                e.length = n
                            }(a, "string" == typeof e ? [e] : e) : [].push.call(a, e)), a
                        }(n)) : i.push(n), i) : i || []
                    }
                }, r.dequeue = function(e, t) {
                    r.each(e.nodeType ? [e] : e, function(e, a) {
                        t = t || "fx";
                        var n = r.queue(a, t),
                            i = n.shift();
                        "inprogress" === i && (i = n.shift()), i && ("fx" === t && n.unshift("inprogress"), i.call(a, function() {
                            r.dequeue(a, t)
                        }))
                    })
                }, r.fn = r.prototype = {
                    init: function(e) {
                        if (e.nodeType) return this[0] = e, this;
                        throw new Error("Not a DOM node.")
                    },
                    offset: function() {
                        var t = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
                            top: 0,
                            left: 0
                        };
                        return {
                            top: t.top + (e.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                            left: t.left + (e.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                        }
                    },
                    position: function() {
                        var e = this[0],
                            t = function(e) {
                                for (var t = e.offsetParent; t && "html" !== t.nodeName.toLowerCase() && t.style && "static" === t.style.position.toLowerCase();) t = t.offsetParent;
                                return t || document
                            }(e),
                            a = this.offset(),
                            n = /^(?:body|html)$/i.test(t.nodeName) ? {
                                top: 0,
                                left: 0
                            } : r(t).offset();
                        return a.top -= parseFloat(e.style.marginTop) || 0, a.left -= parseFloat(e.style.marginLeft) || 0, t.style && (n.top += parseFloat(t.style.borderTopWidth) || 0, n.left += parseFloat(t.style.borderLeftWidth) || 0), {
                            top: a.top - n.top,
                            left: a.left - n.left
                        }
                    }
                };
                var a = {};
                r.expando = "velocity" + (new Date).getTime(), r.uuid = 0;
                for (var n = {}, i = n.hasOwnProperty, o = n.toString, s = "Boolean Number String Function Array Date RegExp Object Error".split(" "), l = 0; l < s.length; l++) n["[object " + s[l] + "]"] = s[l].toLowerCase();
                r.fn.init.prototype = r.fn, e.Velocity = {
                    Utilities: r
                }
            }
        }(window),
        function(e) {
            "use strict";
            "object" == typeof t && "object" == typeof t.exports ? t.exports = e() : "function" == typeof define && define.amd ? define(e) : e()
        }(function() {
            "use strict";
            return function(e, t, r, a) {
                function n(e) {
                    for (var t = -1, r = e ? e.length : 0, a = []; ++t < r;) {
                        var n = e[t];
                        n && a.push(n)
                    }
                    return a
                }

                function i(e) {
                    return w.isWrapped(e) ? e = v.call(e) : w.isNode(e) && (e = [e]), e
                }

                function o(e) {
                    var t = g.data(e, "velocity");
                    return null === t ? a : t
                }

                function s(e, t) {
                    var r = o(e);
                    r && r.delayTimer && !r.delayPaused && (r.delayRemaining = r.delay - t + r.delayBegin, r.delayPaused = !0, clearTimeout(r.delayTimer.setTimeout))
                }

                function l(e, t) {
                    var r = o(e);
                    r && r.delayTimer && r.delayPaused && (r.delayPaused = !1, r.delayTimer.setTimeout = setTimeout(r.delayTimer.next, r.delayRemaining))
                }

                function u(e) {
                    return function(t) {
                        return Math.round(t * e) * (1 / e)
                    }
                }

                function c(e, r, a, n) {
                    function i(e, t) {
                        return 1 - 3 * t + 3 * e
                    }

                    function o(e, t) {
                        return 3 * t - 6 * e
                    }

                    function s(e) {
                        return 3 * e
                    }

                    function l(e, t, r) {
                        return ((i(t, r) * e + o(t, r)) * e + s(t)) * e
                    }

                    function u(e, t, r) {
                        return 3 * i(t, r) * e * e + 2 * o(t, r) * e + s(t)
                    }

                    function c(t, r) {
                        for (var n = 0; n < m; ++n) {
                            var i = u(r, e, a);
                            if (0 === i) return r;
                            r -= (l(r, e, a) - t) / i
                        }
                        return r
                    }

                    function f() {
                        for (var t = 0; t < b; ++t) P[t] = l(t * w, e, a)
                    }

                    function p(t, r, n) {
                        var i, o, s = 0;
                        do {
                            o = r + (n - r) / 2, i = l(o, e, a) - t, i > 0 ? n = o : r = o
                        } while (Math.abs(i) > h && ++s < v);
                        return o
                    }

                    function d(t) {
                        for (var r = 0, n = 1, i = b - 1; n !== i && P[n] <= t; ++n) r += w;
                        --n;
                        var o = (t - P[n]) / (P[n + 1] - P[n]),
                            s = r + o * w,
                            l = u(s, e, a);
                        return l >= y ? c(t, s) : 0 === l ? s : p(t, r, r + w)
                    }

                    function g() {
                        k = !0, e === r && a === n || f()
                    }
                    var m = 4,
                        y = .001,
                        h = 1e-7,
                        v = 10,
                        b = 11,
                        w = 1 / (b - 1),
                        x = "Float32Array" in t;
                    if (4 !== arguments.length) return !1;
                    for (var S = 0; S < 4; ++S)
                        if ("number" != typeof arguments[S] || isNaN(arguments[S]) || !isFinite(arguments[S])) return !1;
                    e = Math.min(e, 1), a = Math.min(a, 1), e = Math.max(e, 0), a = Math.max(a, 0);
                    var P = x ? new Float32Array(b) : new Array(b),
                        k = !1,
                        O = function(t) {
                            return k || g(), e === r && a === n ? t : 0 === t ? 0 : 1 === t ? 1 : l(d(t), r, n)
                        };
                    O.getControlPoints = function() {
                        return [{
                            x: e,
                            y: r
                        }, {
                            x: a,
                            y: n
                        }]
                    };
                    var V = "generateBezier(" + [e, r, a, n] + ")";
                    return O.toString = function() {
                        return V
                    }, O
                }

                function f(e, t) {
                    var r = e;
                    return w.isString(e) ? k.Easings[e] || (r = !1) : r = w.isArray(e) && 1 === e.length ? u.apply(null, e) : w.isArray(e) && 2 === e.length ? O.apply(null, e.concat([t])) : !(!w.isArray(e) || 4 !== e.length) && c.apply(null, e), !1 === r && (r = k.Easings[k.defaults.easing] ? k.defaults.easing : P), r
                }

                function p(e) {
                    if (e) {
                        var t = k.timestamp && !0 !== e ? e : h.now(),
                            r = k.State.calls.length;
                        r > 1e4 && (k.State.calls = n(k.State.calls), r = k.State.calls.length);
                        for (var i = 0; i < r; i++)
                            if (k.State.calls[i]) {
                                var s = k.State.calls[i],
                                    l = s[0],
                                    u = s[2],
                                    c = s[3],
                                    f = !c,
                                    y = null,
                                    v = s[5],
                                    b = s[6];
                                if (c || (c = k.State.calls[i][3] = t - 16), v) {
                                    if (!0 !== v.resume) continue;
                                    c = s[3] = Math.round(t - b - 16), s[5] = null
                                }
                                b = s[6] = t - c;
                                for (var x = Math.min(b / u.duration, 1), S = 0, P = l.length; S < P; S++) {
                                    var O = l[S],
                                        T = O.element;
                                    if (o(T)) {
                                        var X = !1;
                                        if (u.display !== a && null !== u.display && "none" !== u.display) {
                                            if ("flex" === u.display) {
                                                var Y = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                                g.each(Y, function(e, t) {
                                                    V.setPropertyValue(T, "display", t)
                                                })
                                            }
                                            V.setPropertyValue(T, "display", u.display)
                                        }
                                        u.visibility !== a && "hidden" !== u.visibility && V.setPropertyValue(T, "visibility", u.visibility);
                                        for (var D in O)
                                            if (O.hasOwnProperty(D) && "element" !== D) {
                                                var A, F = O[D],
                                                    E = w.isString(F.easing) ? k.Easings[F.easing] : F.easing;
                                                if (w.isString(F.pattern)) {
                                                    var q = 1 === x ? function(e, t, r) {
                                                        var a = F.endValue[t];
                                                        return r ? Math.round(a) : a
                                                    } : function(e, t, r) {
                                                        var a = F.startValue[t],
                                                            n = F.endValue[t] - a,
                                                            i = a + n * E(x, u, n);
                                                        return r ? Math.round(i) : i
                                                    };
                                                    A = F.pattern.replace(/{(\d+)(!)?}/g, q)
                                                } else if (1 === x) A = F.endValue;
                                                else {
                                                    var I = F.endValue - F.startValue;
                                                    A = F.startValue + I * E(x, u, I)
                                                }
                                                if (!f && A === F.currentValue) continue;
                                                if (F.currentValue = A, "tween" === D) y = A;
                                                else {
                                                    var R;
                                                    if (V.Hooks.registered[D]) {
                                                        R = V.Hooks.getRoot(D);
                                                        var N = o(T).rootPropertyValueCache[R];
                                                        N && (F.rootPropertyValue = N)
                                                    }
                                                    var L = V.setPropertyValue(T, D, F.currentValue + (m < 9 && 0 === parseFloat(A) ? "" : F.unitType), F.rootPropertyValue, F.scrollData);
                                                    V.Hooks.registered[D] && (V.Normalizations.registered[R] ? o(T).rootPropertyValueCache[R] = V.Normalizations.registered[R]("extract", null, L[1]) : o(T).rootPropertyValueCache[R] = L[1]), "transform" === L[0] && (X = !0)
                                                }
                                            }
                                        u.mobileHA && o(T).transformCache.translate3d === a && (o(T).transformCache.translate3d = "(0px, 0px, 0px)", X = !0), X && V.flushTransformCache(T)
                                    }
                                }
                                u.display !== a && "none" !== u.display && (k.State.calls[i][2].display = !1), u.visibility !== a && "hidden" !== u.visibility && (k.State.calls[i][2].visibility = !1), u.progress && u.progress.call(s[1], s[1], x, Math.max(0, c + u.duration - t), c, y), 1 === x && d(i)
                            }
                    }
                    k.State.isTicking && C(p)
                }

                function d(e, t) {
                    if (!k.State.calls[e]) return !1;
                    for (var r = k.State.calls[e][0], n = k.State.calls[e][1], i = k.State.calls[e][2], s = k.State.calls[e][4], l = !1, u = 0, c = r.length; u < c; u++) {
                        var f = r[u].element;
                        t || i.loop || ("none" === i.display && V.setPropertyValue(f, "display", i.display), "hidden" === i.visibility && V.setPropertyValue(f, "visibility", i.visibility));
                        var p = o(f);
                        if (!0 !== i.loop && (g.queue(f)[1] === a || !/\.velocityQueueEntryFlag/i.test(g.queue(f)[1])) && p) {
                            p.isAnimating = !1, p.rootPropertyValueCache = {};
                            var d = !1;
                            g.each(V.Lists.transforms3D, function(e, t) {
                                var r = /^scale/.test(t) ? 1 : 0,
                                    n = p.transformCache[t];
                                p.transformCache[t] !== a && new RegExp("^\\(" + r + "[^.]").test(n) && (d = !0, delete p.transformCache[t])
                            }), i.mobileHA && (d = !0, delete p.transformCache.translate3d), d && V.flushTransformCache(f), V.Values.removeClass(f, "velocity-animating")
                        }
                        if (!t && i.complete && !i.loop && u === c - 1) try {
                            i.complete.call(n, n)
                        } catch (e) {
                            setTimeout(function() {
                                throw e
                            }, 1)
                        }
                        s && !0 !== i.loop && s(n), p && !0 === i.loop && !t && (g.each(p.tweensContainer, function(e, t) {
                            if (/^rotate/.test(e) && (parseFloat(t.startValue) - parseFloat(t.endValue)) % 360 == 0) {
                                var r = t.startValue;
                                t.startValue = t.endValue, t.endValue = r
                            }
                            /^backgroundPosition/.test(e) && 100 === parseFloat(t.endValue) && "%" === t.unitType && (t.endValue = 0, t.startValue = 100)
                        }), k(f, "reverse", {
                            loop: !0,
                            delay: i.delay
                        })), !1 !== i.queue && g.dequeue(f, i.queue)
                    }
                    k.State.calls[e] = !1;
                    for (var m = 0, y = k.State.calls.length; m < y; m++)
                        if (!1 !== k.State.calls[m]) {
                            l = !0;
                            break
                        }!1 === l && (k.State.isTicking = !1, delete k.State.calls, k.State.calls = [])
                }
                var g, m = function() {
                        if (r.documentMode) return r.documentMode;
                        for (var e = 7; e > 4; e--) {
                            var t = r.createElement("div");
                            if (t.innerHTML = "\x3c!--[if IE " + e + "]><span></span><![endif]--\x3e", t.getElementsByTagName("span").length) return t = null, e
                        }
                        return a
                    }(),
                    y = function() {
                        var e = 0;
                        return t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || function(t) {
                            var r, a = (new Date).getTime();
                            return r = Math.max(0, 16 - (a - e)), e = a + r, setTimeout(function() {
                                t(a + r)
                            }, r)
                        }
                    }(),
                    h = function() {
                        var e = t.performance || {};
                        if ("function" != typeof e.now) {
                            var r = e.timing && e.timing.navigationStart ? e.timing.navigationStart : (new Date).getTime();
                            e.now = function() {
                                return (new Date).getTime() - r
                            }
                        }
                        return e
                    }(),
                    v = function() {
                        var e = Array.prototype.slice;
                        try {
                            return e.call(r.documentElement), e
                        } catch (t) {
                            return function(t, r) {
                                var a = this.length;
                                if ("number" != typeof t && (t = 0), "number" != typeof r && (r = a), this.slice) return e.call(this, t, r);
                                var n, i = [],
                                    o = t >= 0 ? t : Math.max(0, a + t),
                                    s = r < 0 ? a + r : Math.min(r, a),
                                    l = s - o;
                                if (l > 0)
                                    if (i = new Array(l), this.charAt)
                                        for (n = 0; n < l; n++) i[n] = this.charAt(o + n);
                                    else
                                        for (n = 0; n < l; n++) i[n] = this[o + n];
                                return i
                            }
                        }
                    }(),
                    b = function() {
                        return Array.prototype.includes ? function(e, t) {
                            return e.includes(t)
                        } : Array.prototype.indexOf ? function(e, t) {
                            return e.indexOf(t) >= 0
                        } : function(e, t) {
                            for (var r = 0; r < e.length; r++)
                                if (e[r] === t) return !0;
                            return !1
                        }
                    },
                    w = {
                        isNumber: function(e) {
                            return "number" == typeof e
                        },
                        isString: function(e) {
                            return "string" == typeof e
                        },
                        isArray: Array.isArray || function(e) {
                            return "[object Array]" === Object.prototype.toString.call(e)
                        },
                        isFunction: function(e) {
                            return "[object Function]" === Object.prototype.toString.call(e)
                        },
                        isNode: function(e) {
                            return e && e.nodeType
                        },
                        isWrapped: function(e) {
                            return e && e !== t && w.isNumber(e.length) && !w.isString(e) && !w.isFunction(e) && !w.isNode(e) && (0 === e.length || w.isNode(e[0]))
                        },
                        isSVG: function(e) {
                            return t.SVGElement && e instanceof t.SVGElement
                        },
                        isEmptyObject: function(e) {
                            for (var t in e)
                                if (e.hasOwnProperty(t)) return !1;
                            return !0
                        }
                    },
                    x = !1;
                if (e.fn && e.fn.jquery ? (g = e, x = !0) : g = t.Velocity.Utilities, m <= 8 && !x) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
                if (m <= 7) return void(jQuery.fn.velocity = jQuery.fn.animate);
                var S = 400,
                    P = "swing",
                    k = {
                        State: {
                            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t.navigator.userAgent),
                            isAndroid: /Android/i.test(t.navigator.userAgent),
                            isGingerbread: /Android 2\.3\.[3-7]/i.test(t.navigator.userAgent),
                            isbrowser: t.browser,
                            isFirefox: /Firefox/i.test(t.navigator.userAgent),
                            prefixElement: r.createElement("div"),
                            prefixMatches: {},
                            scrollAnchor: null,
                            scrollPropertyLeft: null,
                            scrollPropertyTop: null,
                            isTicking: !1,
                            calls: [],
                            delayedElements: {
                                count: 0
                            }
                        },
                        CSS: {},
                        Utilities: g,
                        Redirects: {},
                        Easings: {},
                        Promise: t.Promise,
                        defaults: {
                            queue: "",
                            duration: S,
                            easing: P,
                            begin: a,
                            complete: a,
                            progress: a,
                            display: a,
                            visibility: a,
                            loop: !1,
                            delay: !1,
                            mobileHA: !0,
                            _cacheValues: !0,
                            promiseRejectEmpty: !0
                        },
                        init: function(e) {
                            g.data(e, "velocity", {
                                isSVG: w.isSVG(e),
                                isAnimating: !1,
                                computedStyle: null,
                                tweensContainer: null,
                                rootPropertyValueCache: {},
                                transformCache: {}
                            })
                        },
                        hook: null,
                        mock: !1,
                        version: {
                            major: 1,
                            minor: 5,
                            patch: 1
                        },
                        debug: !1,
                        timestamp: !0,
                        pauseAll: function(e) {
                            var t = (new Date).getTime();
                            g.each(k.State.calls, function(t, r) {
                                if (r) {
                                    if (e !== a && (r[2].queue !== e || !1 === r[2].queue)) return !0;
                                    r[5] = {
                                        resume: !1
                                    }
                                }
                            }), g.each(k.State.delayedElements, function(e, r) {
                                r && s(r, t)
                            })
                        },
                        resumeAll: function(e) {
                            var t = (new Date).getTime();
                            g.each(k.State.calls, function(t, r) {
                                if (r) {
                                    if (e !== a && (r[2].queue !== e || !1 === r[2].queue)) return !0;
                                    r[5] && (r[5].resume = !0)
                                }
                            }), g.each(k.State.delayedElements, function(e, r) {
                                r && l(r, t)
                            })
                        }
                    };
                t.pageYOffset !== a ? (k.State.scrollAnchor = t, k.State.scrollPropertyLeft = "pageXOffset", k.State.scrollPropertyTop = "pageYOffset") : (k.State.scrollAnchor = r.documentElement || r.body.parentNode || r.body, k.State.scrollPropertyLeft = "scrollLeft", k.State.scrollPropertyTop = "scrollTop");
                var O = function() {
                    function e(e) {
                        return -e.tension * e.x - e.friction * e.v
                    }

                    function t(t, r, a) {
                        var n = {
                            x: t.x + a.dx * r,
                            v: t.v + a.dv * r,
                            tension: t.tension,
                            friction: t.friction
                        };
                        return {
                            dx: n.v,
                            dv: e(n)
                        }
                    }

                    function r(r, a) {
                        var n = {
                                dx: r.v,
                                dv: e(r)
                            },
                            i = t(r, .5 * a, n),
                            o = t(r, .5 * a, i),
                            s = t(r, a, o),
                            l = 1 / 6 * (n.dx + 2 * (i.dx + o.dx) + s.dx),
                            u = 1 / 6 * (n.dv + 2 * (i.dv + o.dv) + s.dv);
                        return r.x = r.x + l * a, r.v = r.v + u * a, r
                    }
                    return function e(t, a, n) {
                        var i, o, s, l = {
                                x: -1,
                                v: 0,
                                tension: null,
                                friction: null
                            },
                            u = [0],
                            c = 0;
                        for (t = parseFloat(t) || 500, a = parseFloat(a) || 20, n = n || null, l.tension = t, l.friction = a, i = null !== n, i ? (c = e(t, a), o = c / n * .016) : o = .016;;)
                            if (s = r(s || l, o), u.push(1 + s.x), c += 16, !(Math.abs(s.x) > 1e-4 && Math.abs(s.v) > 1e-4)) break;
                        return i ? function(e) {
                            return u[e * (u.length - 1) | 0]
                        } : c
                    }
                }();
                k.Easings = {
                    linear: function(e) {
                        return e
                    },
                    swing: function(e) {
                        return .5 - Math.cos(e * Math.PI) / 2
                    },
                    spring: function(e) {
                        return 1 - Math.cos(4.5 * e * Math.PI) * Math.exp(6 * -e)
                    }
                }, g.each([
                    ["ease", [.25, .1, .25, 1]],
                    ["ease-in", [.42, 0, 1, 1]],
                    ["ease-out", [0, 0, .58, 1]],
                    ["ease-in-out", [.42, 0, .58, 1]],
                    ["easeInSine", [.47, 0, .745, .715]],
                    ["easeOutSine", [.39, .575, .565, 1]],
                    ["easeInOutSine", [.445, .05, .55, .95]],
                    ["easeInQuad", [.55, .085, .68, .53]],
                    ["easeOutQuad", [.25, .46, .45, .94]],
                    ["easeInOutQuad", [.455, .03, .515, .955]],
                    ["easeInCubic", [.55, .055, .675, .19]],
                    ["easeOutCubic", [.215, .61, .355, 1]],
                    ["easeInOutCubic", [.645, .045, .355, 1]],
                    ["easeInQuart", [.895, .03, .685, .22]],
                    ["easeOutQuart", [.165, .84, .44, 1]],
                    ["easeInOutQuart", [.77, 0, .175, 1]],
                    ["easeInQuint", [.755, .05, .855, .06]],
                    ["easeOutQuint", [.23, 1, .32, 1]],
                    ["easeInOutQuint", [.86, 0, .07, 1]],
                    ["easeInExpo", [.95, .05, .795, .035]],
                    ["easeOutExpo", [.19, 1, .22, 1]],
                    ["easeInOutExpo", [1, 0, 0, 1]],
                    ["easeInCirc", [.6, .04, .98, .335]],
                    ["easeOutCirc", [.075, .82, .165, 1]],
                    ["easeInOutCirc", [.785, .135, .15, .86]]
                ], function(e, t) {
                    k.Easings[t[0]] = c.apply(null, t[1])
                });
                var V = k.CSS = {
                    RegEx: {
                        isHex: /^#([A-f\d]{3}){1,2}$/i,
                        valueUnwrap: /^[A-z]+\((.*)\)$/i,
                        wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
                        valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi
                    },
                    Lists: {
                        colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
                        transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
                        transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"],
                        units: ["%", "em", "ex", "ch", "rem", "vw", "vh", "vmin", "vmax", "cm", "mm", "Q", "in", "pc", "pt", "px", "deg", "grad", "rad", "turn", "s", "ms"],
                        colorNames: {
                            aliceblue: "240,248,255",
                            antiquewhite: "250,235,215",
                            aquamarine: "127,255,212",
                            aqua: "0,255,255",
                            azure: "240,255,255",
                            beige: "245,245,220",
                            bisque: "255,228,196",
                            black: "0,0,0",
                            blanchedalmond: "255,235,205",
                            blueviolet: "138,43,226",
                            blue: "0,0,255",
                            brown: "165,42,42",
                            burlywood: "222,184,135",
                            cadetblue: "95,158,160",
                            chartreuse: "127,255,0",
                            chocolate: "210,105,30",
                            coral: "255,127,80",
                            cornflowerblue: "100,149,237",
                            cornsilk: "255,248,220",
                            crimson: "220,20,60",
                            cyan: "0,255,255",
                            darkblue: "0,0,139",
                            darkcyan: "0,139,139",
                            darkgoldenrod: "184,134,11",
                            darkgray: "169,169,169",
                            darkgrey: "169,169,169",
                            darkgreen: "0,100,0",
                            darkkhaki: "189,183,107",
                            darkmagenta: "139,0,139",
                            darkolivegreen: "85,107,47",
                            darkorange: "255,140,0",
                            darkorchid: "153,50,204",
                            darkred: "139,0,0",
                            darksalmon: "233,150,122",
                            darkseagreen: "143,188,143",
                            darkslateblue: "72,61,139",
                            darkslategray: "47,79,79",
                            darkturquoise: "0,206,209",
                            darkviolet: "148,0,211",
                            deeppink: "255,20,147",
                            deepskyblue: "0,191,255",
                            dimgray: "105,105,105",
                            dimgrey: "105,105,105",
                            dodgerblue: "30,144,255",
                            firebrick: "178,34,34",
                            floralwhite: "255,250,240",
                            forestgreen: "34,139,34",
                            fuchsia: "255,0,255",
                            gainsboro: "220,220,220",
                            ghostwhite: "248,248,255",
                            gold: "255,215,0",
                            goldenrod: "218,165,32",
                            gray: "128,128,128",
                            grey: "128,128,128",
                            greenyellow: "173,255,47",
                            green: "0,128,0",
                            honeydew: "240,255,240",
                            hotpink: "255,105,180",
                            indianred: "205,92,92",
                            indigo: "75,0,130",
                            ivory: "255,255,240",
                            khaki: "240,230,140",
                            lavenderblush: "255,240,245",
                            lavender: "230,230,250",
                            lawngreen: "124,252,0",
                            lemonchiffon: "255,250,205",
                            lightblue: "173,216,230",
                            lightcoral: "240,128,128",
                            lightcyan: "224,255,255",
                            lightgoldenrodyellow: "250,250,210",
                            lightgray: "211,211,211",
                            lightgrey: "211,211,211",
                            lightgreen: "144,238,144",
                            lightpink: "255,182,193",
                            lightsalmon: "255,160,122",
                            lightseagreen: "32,178,170",
                            lightskyblue: "135,206,250",
                            lightslategray: "119,136,153",
                            lightsteelblue: "176,196,222",
                            lightyellow: "255,255,224",
                            limegreen: "50,205,50",
                            lime: "0,255,0",
                            linen: "250,240,230",
                            magenta: "255,0,255",
                            maroon: "128,0,0",
                            mediumaquamarine: "102,205,170",
                            mediumblue: "0,0,205",
                            mediumorchid: "186,85,211",
                            mediumpurple: "147,112,219",
                            mediumseagreen: "60,179,113",
                            mediumslateblue: "123,104,238",
                            mediumspringgreen: "0,250,154",
                            mediumturquoise: "72,209,204",
                            mediumvioletred: "199,21,133",
                            midnightblue: "25,25,112",
                            mintcream: "245,255,250",
                            mistyrose: "255,228,225",
                            moccasin: "255,228,181",
                            navajowhite: "255,222,173",
                            navy: "0,0,128",
                            oldlace: "253,245,230",
                            olivedrab: "107,142,35",
                            olive: "128,128,0",
                            orangered: "255,69,0",
                            orange: "255,165,0",
                            orchid: "218,112,214",
                            palegoldenrod: "238,232,170",
                            palegreen: "152,251,152",
                            paleturquoise: "175,238,238",
                            palevioletred: "219,112,147",
                            papayawhip: "255,239,213",
                            peachpuff: "255,218,185",
                            peru: "205,133,63",
                            pink: "255,192,203",
                            plum: "221,160,221",
                            powderblue: "176,224,230",
                            purple: "128,0,128",
                            red: "255,0,0",
                            rosybrown: "188,143,143",
                            royalblue: "65,105,225",
                            saddlebrown: "139,69,19",
                            salmon: "250,128,114",
                            sandybrown: "244,164,96",
                            seagreen: "46,139,87",
                            seashell: "255,245,238",
                            sienna: "160,82,45",
                            silver: "192,192,192",
                            skyblue: "135,206,235",
                            slateblue: "106,90,205",
                            slategray: "112,128,144",
                            snow: "255,250,250",
                            springgreen: "0,255,127",
                            steelblue: "70,130,180",
                            tan: "210,180,140",
                            teal: "0,128,128",
                            thistle: "216,191,216",
                            tomato: "255,99,71",
                            turquoise: "64,224,208",
                            violet: "238,130,238",
                            wheat: "245,222,179",
                            whitesmoke: "245,245,245",
                            white: "255,255,255",
                            yellowgreen: "154,205,50",
                            yellow: "255,255,0"
                        }
                    },
                    Hooks: {
                        templates: {
                            textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
                            boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
                            clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
                            backgroundPosition: ["X Y", "0% 0%"],
                            transformOrigin: ["X Y Z", "50% 50% 0px"],
                            perspectiveOrigin: ["X Y", "50% 50%"]
                        },
                        registered: {},
                        register: function() {
                            for (var e = 0; e < V.Lists.colors.length; e++) {
                                var t = "color" === V.Lists.colors[e] ? "0 0 0 1" : "255 255 255 1";
                                V.Hooks.templates[V.Lists.colors[e]] = ["Red Green Blue Alpha", t]
                            }
                            var r, a, n;
                            if (m)
                                for (r in V.Hooks.templates)
                                    if (V.Hooks.templates.hasOwnProperty(r)) {
                                        a = V.Hooks.templates[r], n = a[0].split(" ");
                                        var i = a[1].match(V.RegEx.valueSplit);
                                        "Color" === n[0] && (n.push(n.shift()), i.push(i.shift()), V.Hooks.templates[r] = [n.join(" "), i.join(" ")])
                                    }
                            for (r in V.Hooks.templates)
                                if (V.Hooks.templates.hasOwnProperty(r)) {
                                    a = V.Hooks.templates[r], n = a[0].split(" ");
                                    for (var o in n)
                                        if (n.hasOwnProperty(o)) {
                                            var s = r + n[o],
                                                l = o;
                                            V.Hooks.registered[s] = [r, l]
                                        }
                                }
                        },
                        getRoot: function(e) {
                            var t = V.Hooks.registered[e];
                            return t ? t[0] : e
                        },
                        getUnit: function(e, t) {
                            var r = (e.substr(t || 0, 5).match(/^[a-z%]+/) || [])[0] || "";
                            return r && b(V.Lists.units, r) ? r : ""
                        },
                        fixColors: function(e) {
                            return e.replace(/(rgba?\(\s*)?(\b[a-z]+\b)/g, function(e, t, r) {
                                return V.Lists.colorNames.hasOwnProperty(r) ? (t || "rgba(") + V.Lists.colorNames[r] + (t ? "" : ",1)") : t + r
                            })
                        },
                        cleanRootPropertyValue: function(e, t) {
                            return V.RegEx.valueUnwrap.test(t) && (t = t.match(V.RegEx.valueUnwrap)[1]), V.Values.isCSSNullValue(t) && (t = V.Hooks.templates[e][1]), t
                        },
                        extractValue: function(e, t) {
                            var r = V.Hooks.registered[e];
                            if (r) {
                                var a = r[0],
                                    n = r[1];
                                return t = V.Hooks.cleanRootPropertyValue(a, t), t.toString().match(V.RegEx.valueSplit)[n]
                            }
                            return t
                        },
                        injectValue: function(e, t, r) {
                            var a = V.Hooks.registered[e];
                            if (a) {
                                var n, i = a[0],
                                    o = a[1];
                                return r = V.Hooks.cleanRootPropertyValue(i, r), n = r.toString().match(V.RegEx.valueSplit), n[o] = t, n.join(" ")
                            }
                            return r
                        }
                    },
                    Normalizations: {
                        registered: {
                            clip: function(e, t, r) {
                                switch (e) {
                                    case "name":
                                        return "clip";
                                    case "extract":
                                        var a;
                                        return V.RegEx.wrappedValueAlreadyExtracted.test(r) ? a = r : (a = r.toString().match(V.RegEx.valueUnwrap), a = a ? a[1].replace(/,(\s+)?/g, " ") : r), a;
                                    case "inject":
                                        return "rect(" + r + ")"
                                }
                            },
                            blur: function(e, t, r) {
                                switch (e) {
                                    case "name":
                                        return k.State.isFirefox ? "filter" : "-webkit-filter";
                                    case "extract":
                                        var a = parseFloat(r);
                                        if (!a && 0 !== a) {
                                            var n = r.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                            a = n ? n[1] : 0
                                        }
                                        return a;
                                    case "inject":
                                        return parseFloat(r) ? "blur(" + r + ")" : "none"
                                }
                            },
                            opacity: function(e, t, r) {
                                if (m <= 8) switch (e) {
                                    case "name":
                                        return "filter";
                                    case "extract":
                                        var a = r.toString().match(/alpha\(opacity=(.*)\)/i);
                                        return r = a ? a[1] / 100 : 1;
                                    case "inject":
                                        return t.style.zoom = 1, parseFloat(r) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(r), 10) + ")"
                                } else switch (e) {
                                    case "name":
                                        return "opacity";
                                    case "extract":
                                    case "inject":
                                        return r
                                }
                            }
                        },
                        register: function() {
                            function e(e, t, r) {
                                if ("border-box" === V.getPropertyValue(t, "boxSizing").toString().toLowerCase() === (r || !1)) {
                                    var a, n, i = 0,
                                        o = "width" === e ? ["Left", "Right"] : ["Top", "Bottom"],
                                        s = ["padding" + o[0], "padding" + o[1], "border" + o[0] + "Width", "border" + o[1] + "Width"];
                                    for (a = 0; a < s.length; a++) n = parseFloat(V.getPropertyValue(t, s[a])), isNaN(n) || (i += n);
                                    return r ? -i : i
                                }
                                return 0
                            }

                            function t(t, r) {
                                return function(a, n, i) {
                                    switch (a) {
                                        case "name":
                                            return t;
                                        case "extract":
                                            return parseFloat(i) + e(t, n, r);
                                        case "inject":
                                            return parseFloat(i) - e(t, n, r) + "px"
                                    }
                                }
                            }
                            m && !(m > 9) || k.State.isGingerbread || (V.Lists.transformsBase = V.Lists.transformsBase.concat(V.Lists.transforms3D));
                            for (var r = 0; r < V.Lists.transformsBase.length; r++) ! function() {
                                var e = V.Lists.transformsBase[r];
                                V.Normalizations.registered[e] = function(t, r, n) {
                                    switch (t) {
                                        case "name":
                                            return "transform";
                                        case "extract":
                                            return o(r) === a || o(r).transformCache[e] === a ? /^scale/i.test(e) ? 1 : 0 : o(r).transformCache[e].replace(/[()]/g, "");
                                        case "inject":
                                            var i = !1;
                                            switch (e.substr(0, e.length - 1)) {
                                                case "translate":
                                                    i = !/(%|px|em|rem|vw|vh|\d)$/i.test(n);
                                                    break;
                                                case "scal":
                                                case "scale":
                                                    k.State.isAndroid && o(r).transformCache[e] === a && n < 1 && (n = 1), i = !/(\d)$/i.test(n);
                                                    break;
                                                case "skew":
                                                case "rotate":
                                                    i = !/(deg|\d)$/i.test(n)
                                            }
                                            return i || (o(r).transformCache[e] = "(" + n + ")"), o(r).transformCache[e]
                                    }
                                }
                            }();
                            for (var n = 0; n < V.Lists.colors.length; n++) ! function() {
                                var e = V.Lists.colors[n];
                                V.Normalizations.registered[e] = function(t, r, n) {
                                    switch (t) {
                                        case "name":
                                            return e;
                                        case "extract":
                                            var i;
                                            if (V.RegEx.wrappedValueAlreadyExtracted.test(n)) i = n;
                                            else {
                                                var o, s = {
                                                    black: "rgb(0, 0, 0)",
                                                    blue: "rgb(0, 0, 255)",
                                                    gray: "rgb(128, 128, 128)",
                                                    green: "rgb(0, 128, 0)",
                                                    red: "rgb(255, 0, 0)",
                                                    white: "rgb(255, 255, 255)"
                                                };
                                                /^[A-z]+$/i.test(n) ? o = s[n] !== a ? s[n] : s.black : V.RegEx.isHex.test(n) ? o = "rgb(" + V.Values.hexToRgb(n).join(" ") + ")" : /^rgba?\(/i.test(n) || (o = s.black), i = (o || n).toString().match(V.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                            }
                                            return (!m || m > 8) && 3 === i.split(" ").length && (i += " 1"), i;
                                        case "inject":
                                            return /^rgb/.test(n) ? n : (m <= 8 ? 4 === n.split(" ").length && (n = n.split(/\s+/).slice(0, 3).join(" ")) : 3 === n.split(" ").length && (n += " 1"), (m <= 8 ? "rgb" : "rgba") + "(" + n.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")")
                                    }
                                }
                            }();
                            V.Normalizations.registered.innerWidth = t("width", !0), V.Normalizations.registered.innerHeight = t("height", !0), V.Normalizations.registered.outerWidth = t("width"), V.Normalizations.registered.outerHeight = t("height")
                        }
                    },
                    Names: {
                        camelCase: function(e) {
                            return e.replace(/-(\w)/g, function(e, t) {
                                return t.toUpperCase()
                            })
                        },
                        SVGAttribute: function(e) {
                            var t = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                            return (m || k.State.isAndroid && !k.State.isbrowser) && (t += "|transform"), new RegExp("^(" + t + ")$", "i").test(e)
                        },
                        prefixCheck: function(e) {
                            if (k.State.prefixMatches[e]) return [k.State.prefixMatches[e], !0];
                            for (var t = ["", "Webkit", "Moz", "ms", "O"], r = 0, a = t.length; r < a; r++) {
                                var n;
                                if (n = 0 === r ? e : t[r] + e.replace(/^\w/, function(e) {
                                        return e.toUpperCase()
                                    }), w.isString(k.State.prefixElement.style[n])) return k.State.prefixMatches[e] = n, [n, !0]
                            }
                            return [e, !1]
                        }
                    },
                    Values: {
                        hexToRgb: function(e) {
                            var t, r = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                                a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                            return e = e.replace(r, function(e, t, r, a) {
                                return t + t + r + r + a + a
                            }), t = a.exec(e), t ? [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)] : [0, 0, 0]
                        },
                        isCSSNullValue: function(e) {
                            return !e || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)
                        },
                        getUnitType: function(e) {
                            return /^(rotate|skew)/i.test(e) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e) ? "" : "px"
                        },
                        getDisplayType: function(e) {
                            var t = e && e.tagName.toString().toLowerCase();
                            return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t) ? "inline" : /^(li)$/i.test(t) ? "list-item" : /^(tr)$/i.test(t) ? "table-row" : /^(table)$/i.test(t) ? "table" : /^(tbody)$/i.test(t) ? "table-row-group" : "block"
                        },
                        addClass: function(e, t) {
                            if (e)
                                if (e.classList) e.classList.add(t);
                                else if (w.isString(e.className)) e.className += (e.className.length ? " " : "") + t;
                            else {
                                var r = e.getAttribute(m <= 7 ? "className" : "class") || "";
                                e.setAttribute("class", r + (r ? " " : "") + t)
                            }
                        },
                        removeClass: function(e, t) {
                            if (e)
                                if (e.classList) e.classList.remove(t);
                                else if (w.isString(e.className)) e.className = e.className.toString().replace(new RegExp("(^|\\s)" + t.split(" ").join("|") + "(\\s|$)", "gi"), " ");
                            else {
                                var r = e.getAttribute(m <= 7 ? "className" : "class") || "";
                                e.setAttribute("class", r.replace(new RegExp("(^|s)" + t.split(" ").join("|") + "(s|$)", "gi"), " "))
                            }
                        }
                    },
                    getPropertyValue: function(e, r, n, i) {
                        function s(e, r) {
                            var n = 0;
                            if (m <= 8) n = g.css(e, r);
                            else {
                                var l = !1;
                                /^(width|height)$/.test(r) && 0 === V.getPropertyValue(e, "display") && (l = !0, V.setPropertyValue(e, "display", V.Values.getDisplayType(e)));
                                var u = function() {
                                    l && V.setPropertyValue(e, "display", "none")
                                };
                                if (!i) {
                                    if ("height" === r && "border-box" !== V.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                        var c = e.offsetHeight - (parseFloat(V.getPropertyValue(e, "borderTopWidth")) || 0) - (parseFloat(V.getPropertyValue(e, "borderBottomWidth")) || 0) - (parseFloat(V.getPropertyValue(e, "paddingTop")) || 0) - (parseFloat(V.getPropertyValue(e, "paddingBottom")) || 0);
                                        return u(), c
                                    }
                                    if ("width" === r && "border-box" !== V.getPropertyValue(e, "boxSizing").toString().toLowerCase()) {
                                        var f = e.offsetWidth - (parseFloat(V.getPropertyValue(e, "borderLeftWidth")) || 0) - (parseFloat(V.getPropertyValue(e, "borderRightWidth")) || 0) - (parseFloat(V.getPropertyValue(e, "paddingLeft")) || 0) - (parseFloat(V.getPropertyValue(e, "paddingRight")) || 0);
                                        return u(), f
                                    }
                                }
                                var p;
                                p = o(e) === a ? t.getComputedStyle(e, null) : o(e).computedStyle ? o(e).computedStyle : o(e).computedStyle = t.getComputedStyle(e, null), "borderColor" === r && (r = "borderTopColor"), n = 9 === m && "filter" === r ? p.getPropertyValue(r) : p[r], "" !== n && null !== n || (n = e.style[r]), u()
                            }
                            if ("auto" === n && /^(top|right|bottom|left)$/i.test(r)) {
                                var d = s(e, "position");
                                ("fixed" === d || "absolute" === d && /top|left/i.test(r)) && (n = g(e).position()[r] + "px")
                            }
                            return n
                        }
                        var l;
                        if (V.Hooks.registered[r]) {
                            var u = r,
                                c = V.Hooks.getRoot(u);
                            n === a && (n = V.getPropertyValue(e, V.Names.prefixCheck(c)[0])), V.Normalizations.registered[c] && (n = V.Normalizations.registered[c]("extract", e, n)), l = V.Hooks.extractValue(u, n)
                        } else if (V.Normalizations.registered[r]) {
                            var f, p;
                            f = V.Normalizations.registered[r]("name", e), "transform" !== f && (p = s(e, V.Names.prefixCheck(f)[0]), V.Values.isCSSNullValue(p) && V.Hooks.templates[r] && (p = V.Hooks.templates[r][1])), l = V.Normalizations.registered[r]("extract", e, p)
                        }
                        if (!/^[\d-]/.test(l)) {
                            var d = o(e);
                            if (d && d.isSVG && V.Names.SVGAttribute(r))
                                if (/^(height|width)$/i.test(r)) try {
                                    l = e.getBBox()[r]
                                } catch (e) {
                                    l = 0
                                } else l = e.getAttribute(r);
                                else l = s(e, V.Names.prefixCheck(r)[0])
                        }
                        return V.Values.isCSSNullValue(l) && (l = 0), k.debug >= 2 && console.log("Get " + r + ": " + l), l
                    },
                    setPropertyValue: function(e, r, a, n, i) {
                        var s = r;
                        if ("scroll" === r) i.container ? i.container["scroll" + i.direction] = a : "Left" === i.direction ? t.scrollTo(a, i.alternateValue) : t.scrollTo(i.alternateValue, a);
                        else if (V.Normalizations.registered[r] && "transform" === V.Normalizations.registered[r]("name", e)) V.Normalizations.registered[r]("inject", e, a), s = "transform", a = o(e).transformCache[r];
                        else {
                            if (V.Hooks.registered[r]) {
                                var l = r,
                                    u = V.Hooks.getRoot(r);
                                n = n || V.getPropertyValue(e, u), a = V.Hooks.injectValue(l, a, n), r = u
                            }
                            if (V.Normalizations.registered[r] && (a = V.Normalizations.registered[r]("inject", e, a), r = V.Normalizations.registered[r]("name", e)), s = V.Names.prefixCheck(r)[0], m <= 8) try {
                                e.style[s] = a
                            } catch (e) {
                                k.debug && console.log("Browser does not support [" + a + "] for [" + s + "]")
                            } else {
                                var c = o(e);
                                c && c.isSVG && V.Names.SVGAttribute(r) ? e.setAttribute(r, a) : e.style[s] = a
                            }
                            k.debug >= 2 && console.log("Set " + r + " (" + s + "): " + a)
                        }
                        return [s, a]
                    },
                    flushTransformCache: function(e) {
                        var t = "",
                            r = o(e);
                        if ((m || k.State.isAndroid && !k.State.isbrowser) && r && r.isSVG) {
                            var a = function(t) {
                                    return parseFloat(V.getPropertyValue(e, t))
                                },
                                n = {
                                    translate: [a("translateX"), a("translateY")],
                                    skewX: [a("skewX")],
                                    skewY: [a("skewY")],
                                    scale: 1 !== a("scale") ? [a("scale"), a("scale")] : [a("scaleX"), a("scaleY")],
                                    rotate: [a("rotateZ"), 0, 0]
                                };
                            g.each(o(e).transformCache, function(e) {
                                /^translate/i.test(e) ? e = "translate" : /^scale/i.test(e) ? e = "scale" : /^rotate/i.test(e) && (e = "rotate"), n[e] && (t += e + "(" + n[e].join(" ") + ") ", delete n[e])
                            })
                        } else {
                            var i, s;
                            g.each(o(e).transformCache, function(r) {
                                if (i = o(e).transformCache[r], "transformPerspective" === r) return s = i, !0;
                                9 === m && "rotateZ" === r && (r = "rotate"), t += r + i + " "
                            }), s && (t = "perspective" + s + " " + t)
                        }
                        V.setPropertyValue(e, "transform", t)
                    }
                };
                V.Hooks.register(), V.Normalizations.register(), k.hook = function(e, t, r) {
                    var n;
                    return e = i(e), g.each(e, function(e, i) {
                        if (o(i) === a && k.init(i), r === a) n === a && (n = V.getPropertyValue(i, t));
                        else {
                            var s = V.setPropertyValue(i, t, r);
                            "transform" === s[0] && k.CSS.flushTransformCache(i), n = s
                        }
                    }), n
                };
                var T = function() {
                    function e() {
                        return c ? O.promise || null : m
                    }

                    function n(e, n) {
                        function i(i) {
                            var c, d;
                            if (l.begin && 0 === X) try {
                                l.begin.call(h, h)
                            } catch (e) {
                                setTimeout(function() {
                                    throw e
                                }, 1)
                            }
                            if ("scroll" === A) {
                                var m, y, S, P = /^x$/i.test(l.axis) ? "Left" : "Top",
                                    T = parseFloat(l.offset) || 0;
                                l.container ? w.isWrapped(l.container) || w.isNode(l.container) ? (l.container = l.container[0] || l.container, m = l.container["scroll" + P], S = m + g(e).position()[P.toLowerCase()] + T) : l.container = null : (m = k.State.scrollAnchor[k.State["scrollProperty" + P]], y = k.State.scrollAnchor[k.State["scrollProperty" + ("Left" === P ? "Top" : "Left")]], S = g(e).offset()[P.toLowerCase()] + T), u = {
                                    scroll: {
                                        rootPropertyValue: !1,
                                        startValue: m,
                                        currentValue: m,
                                        endValue: S,
                                        unitType: "",
                                        easing: l.easing,
                                        scrollData: {
                                            container: l.container,
                                            direction: P,
                                            alternateValue: y
                                        }
                                    },
                                    element: e
                                }, k.debug && console.log("tweensContainer (scroll): ", u.scroll, e)
                            } else if ("reverse" === A) {
                                if (!(c = o(e))) return;
                                if (!c.tweensContainer) return void g.dequeue(e, l.queue);
                                "none" === c.opts.display && (c.opts.display = "auto"), "hidden" === c.opts.visibility && (c.opts.visibility = "visible"), c.opts.loop = !1, c.opts.begin = null, c.opts.complete = null, x.easing || delete l.easing, x.duration || delete l.duration, l = g.extend({}, c.opts, l), d = g.extend(!0, {}, c ? c.tweensContainer : null);
                                for (var Y in d)
                                    if (d.hasOwnProperty(Y) && "element" !== Y) {
                                        var D = d[Y].startValue;
                                        d[Y].startValue = d[Y].currentValue = d[Y].endValue, d[Y].endValue = D, w.isEmptyObject(x) || (d[Y].easing = l.easing), k.debug && console.log("reverse tweensContainer (" + Y + "): " + JSON.stringify(d[Y]), e)
                                    }
                                u = d
                            } else if ("start" === A) {
                                c = o(e), c && c.tweensContainer && !0 === c.isAnimating && (d = c.tweensContainer);
                                var F = function(n, i) {
                                    var o, f = V.Hooks.getRoot(n),
                                        p = !1,
                                        m = i[0],
                                        y = i[1],
                                        h = i[2];
                                    if (!(c && c.isSVG || "tween" === f || !1 !== V.Names.prefixCheck(f)[1] || V.Normalizations.registered[f] !== a)) return void(k.debug && console.log("Skipping [" + f + "] due to a lack of browser support."));
                                    (l.display !== a && null !== l.display && "none" !== l.display || l.visibility !== a && "hidden" !== l.visibility) && /opacity|filter/.test(n) && !h && 0 !== m && (h = 0), l._cacheValues && d && d[n] ? (h === a && (h = d[n].endValue + d[n].unitType), p = c.rootPropertyValueCache[f]) : V.Hooks.registered[n] ? h === a ? (p = V.getPropertyValue(e, f), h = V.getPropertyValue(e, n, p)) : p = V.Hooks.templates[f][1] : h === a && (h = V.getPropertyValue(e, n));
                                    var v, b, x, S = !1,
                                        P = function(e, t) {
                                            var r, a;
                                            return a = (t || "0").toString().toLowerCase().replace(/[%A-z]+$/, function(e) {
                                                return r = e, ""
                                            }), r || (r = V.Values.getUnitType(e)), [a, r]
                                        };
                                    if (h !== m && w.isString(h) && w.isString(m)) {
                                        o = "";
                                        var O = 0,
                                            T = 0,
                                            C = [],
                                            X = [],
                                            Y = 0,
                                            D = 0,
                                            A = 0;
                                        for (h = V.Hooks.fixColors(h), m = V.Hooks.fixColors(m); O < h.length && T < m.length;) {
                                            var F = h[O],
                                                E = m[T];
                                            if (/[\d\.-]/.test(F) && /[\d\.-]/.test(E)) {
                                                for (var q = F, I = E, R = ".", L = "."; ++O < h.length;) {
                                                    if ((F = h[O]) === R) R = "..";
                                                    else if (!/\d/.test(F)) break;
                                                    q += F
                                                }
                                                for (; ++T < m.length;) {
                                                    if ((E = m[T]) === L) L = "..";
                                                    else if (!/\d/.test(E)) break;
                                                    I += E
                                                }
                                                var H = V.Hooks.getUnit(h, O),
                                                    j = V.Hooks.getUnit(m, T);
                                                if (O += H.length, T += j.length, H === j) q === I ? o += q + H : (o += "{" + C.length + (D ? "!" : "") + "}" + H, C.push(parseFloat(q)), X.push(parseFloat(I)));
                                                else {
                                                    var z = parseFloat(q),
                                                        B = parseFloat(I);
                                                    o += (Y < 5 ? "calc" : "") + "(" + (z ? "{" + C.length + (D ? "!" : "") + "}" : "0") + H + " + " + (B ? "{" + (C.length + (z ? 1 : 0)) + (D ? "!" : "") + "}" : "0") + j + ")", z && (C.push(z), X.push(0)), B && (C.push(0), X.push(B))
                                                }
                                            } else {
                                                if (F !== E) {
                                                    Y = 0;
                                                    break
                                                }
                                                o += F, O++, T++, 0 === Y && "c" === F || 1 === Y && "a" === F || 2 === Y && "l" === F || 3 === Y && "c" === F || Y >= 4 && "(" === F ? Y++ : (Y && Y < 5 || Y >= 4 && ")" === F && --Y < 5) && (Y = 0), 0 === D && "r" === F || 1 === D && "g" === F || 2 === D && "b" === F || 3 === D && "a" === F || D >= 3 && "(" === F ? (3 === D && "a" === F && (A = 1), D++) : A && "," === F ? ++A > 3 && (D = A = 0) : (A && D < (A ? 5 : 4) || D >= (A ? 4 : 3) && ")" === F && --D < (A ? 5 : 4)) && (D = A = 0)
                                            }
                                        }
                                        O === h.length && T === m.length || (k.debug && console.error('Trying to pattern match mis-matched strings ["' + m + '", "' + h + '"]'), o = a), o && (C.length ? (k.debug && console.log('Pattern found "' + o + '" -> ', C, X, "[" + h + "," + m + "]"), h = C, m = X, b = x = "") : o = a)
                                    }
                                    o || (v = P(n, h), h = v[0], x = v[1], v = P(n, m), m = v[0].replace(/^([+-\/*])=/, function(e, t) {
                                        return S = t, ""
                                    }), b = v[1], h = parseFloat(h) || 0, m = parseFloat(m) || 0, "%" === b && (/^(fontSize|lineHeight)$/.test(n) ? (m /= 100, b = "em") : /^scale/.test(n) ? (m /= 100, b = "") : /(Red|Green|Blue)$/i.test(n) && (m = m / 100 * 255, b = "")));
                                    if (/[\/*]/.test(S)) b = x;
                                    else if (x !== b && 0 !== h)
                                        if (0 === m) b = x;
                                        else {
                                            s = s || function() {
                                                var a = {
                                                        myParent: e.parentNode || r.body,
                                                        position: V.getPropertyValue(e, "position"),
                                                        fontSize: V.getPropertyValue(e, "fontSize")
                                                    },
                                                    n = a.position === N.lastPosition && a.myParent === N.lastParent,
                                                    i = a.fontSize === N.lastFontSize;
                                                N.lastParent = a.myParent, N.lastPosition = a.position, N.lastFontSize = a.fontSize;
                                                var o = {};
                                                if (i && n) o.emToPx = N.lastEmToPx, o.percentToPxWidth = N.lastPercentToPxWidth, o.percentToPxHeight = N.lastPercentToPxHeight;
                                                else {
                                                    var s = c && c.isSVG ? r.createElementNS("http://www.w3.org/2000/svg", "rect") : r.createElement("div");
                                                    k.init(s), a.myParent.appendChild(s), g.each(["overflow", "overflowX", "overflowY"], function(e, t) {
                                                        k.CSS.setPropertyValue(s, t, "hidden")
                                                    }), k.CSS.setPropertyValue(s, "position", a.position), k.CSS.setPropertyValue(s, "fontSize", a.fontSize), k.CSS.setPropertyValue(s, "boxSizing", "content-box"), g.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(e, t) {
                                                        k.CSS.setPropertyValue(s, t, "100%")
                                                    }), k.CSS.setPropertyValue(s, "paddingLeft", "100em"), o.percentToPxWidth = N.lastPercentToPxWidth = (parseFloat(V.getPropertyValue(s, "width", null, !0)) || 1) / 100, o.percentToPxHeight = N.lastPercentToPxHeight = (parseFloat(V.getPropertyValue(s, "height", null, !0)) || 1) / 100, o.emToPx = N.lastEmToPx = (parseFloat(V.getPropertyValue(s, "paddingLeft")) || 1) / 100, a.myParent.removeChild(s)
                                                }
                                                return null === N.remToPx && (N.remToPx = parseFloat(V.getPropertyValue(r.body, "fontSize")) || 16), null === N.vwToPx && (N.vwToPx = parseFloat(t.innerWidth) / 100, N.vhToPx = parseFloat(t.innerHeight) / 100), o.remToPx = N.remToPx, o.vwToPx = N.vwToPx, o.vhToPx = N.vhToPx, k.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(o), e), o
                                            }();
                                            var M = /margin|padding|left|right|width|text|word|letter/i.test(n) || /X$/.test(n) || "x" === n ? "x" : "y";
                                            switch (x) {
                                                case "%":
                                                    h *= "x" === M ? s.percentToPxWidth : s.percentToPxHeight;
                                                    break;
                                                case "px":
                                                    break;
                                                default:
                                                    h *= s[x + "ToPx"]
                                            }
                                            switch (b) {
                                                case "%":
                                                    h *= 1 / ("x" === M ? s.percentToPxWidth : s.percentToPxHeight);
                                                    break;
                                                case "px":
                                                    break;
                                                default:
                                                    h *= 1 / s[b + "ToPx"]
                                            }
                                        }
                                    switch (S) {
                                        case "+":
                                            m = h + m;
                                            break;
                                        case "-":
                                            m = h - m;
                                            break;
                                        case "*":
                                            m *= h;
                                            break;
                                        case "/":
                                            m = h / m
                                    }
                                    u[n] = {
                                        rootPropertyValue: p,
                                        startValue: h,
                                        currentValue: h,
                                        endValue: m,
                                        unitType: b,
                                        easing: y
                                    }, o && (u[n].pattern = o), k.debug && console.log("tweensContainer (" + n + "): " + JSON.stringify(u[n]), e)
                                };
                                for (var E in v)
                                    if (v.hasOwnProperty(E)) {
                                        var q = V.Names.camelCase(E),
                                            I = function(t, r) {
                                                var a, i, o;
                                                return w.isFunction(t) && (t = t.call(e, n, C)), w.isArray(t) ? (a = t[0], !w.isArray(t[1]) && /^[\d-]/.test(t[1]) || w.isFunction(t[1]) || V.RegEx.isHex.test(t[1]) ? o = t[1] : w.isString(t[1]) && !V.RegEx.isHex.test(t[1]) && k.Easings[t[1]] || w.isArray(t[1]) ? (i = r ? t[1] : f(t[1], l.duration), o = t[2]) : o = t[1] || t[2]) : a = t, r || (i = i || l.easing), w.isFunction(a) && (a = a.call(e, n, C)), w.isFunction(o) && (o = o.call(e, n, C)), [a || 0, i, o]
                                            }(v[E]);
                                        if (b(V.Lists.colors, q)) {
                                            var R = I[0],
                                                H = I[1],
                                                j = I[2];
                                            if (V.RegEx.isHex.test(R)) {
                                                for (var z = ["Red", "Green", "Blue"], B = V.Values.hexToRgb(R), M = j ? V.Values.hexToRgb(j) : a, Z = 0; Z < z.length; Z++) {
                                                    var U = [B[Z]];
                                                    H && U.push(H), M !== a && U.push(M[Z]), F(q + z[Z], U)
                                                }
                                                continue
                                            }
                                        }
                                        F(q, I)
                                    }
                                u.element = e
                            }
                            u.element && (V.Values.addClass(e, "velocity-animating"), L.push(u), c = o(e), c && ("" === l.queue && (c.tweensContainer = u, c.opts = l), c.isAnimating = !0), X === C - 1 ? (k.State.calls.push([L, h, l, null, O.resolver, null, 0]), !1 === k.State.isTicking && (k.State.isTicking = !0, p())) : X++)
                        }
                        var s, l = g.extend({}, k.defaults, x),
                            u = {};
                        switch (o(e) === a && k.init(e), parseFloat(l.delay) && !1 !== l.queue && g.queue(e, l.queue, function(t, r) {
                            if (!0 === r) return !0;
                            k.velocityQueueEntryFlag = !0;
                            var a = k.State.delayedElements.count++;
                            k.State.delayedElements[a] = e;
                            var n = function(e) {
                                return function() {
                                    k.State.delayedElements[e] = !1, t()
                                }
                            }(a);
                            o(e).delayBegin = (new Date).getTime(), o(e).delay = parseFloat(l.delay), o(e).delayTimer = {
                                setTimeout: setTimeout(t, parseFloat(l.delay)),
                                next: n
                            }
                        }), l.duration.toString().toLowerCase()) {
                            case "fast":
                                l.duration = 200;
                                break;
                            case "normal":
                                l.duration = S;
                                break;
                            case "slow":
                                l.duration = 600;
                                break;
                            default:
                                l.duration = parseFloat(l.duration) || 1
                        }
                        if (!1 !== k.mock && (!0 === k.mock ? l.duration = l.delay = 1 : (l.duration *= parseFloat(k.mock) || 1, l.delay *= parseFloat(k.mock) || 1)), l.easing = f(l.easing, l.duration), l.begin && !w.isFunction(l.begin) && (l.begin = null), l.progress && !w.isFunction(l.progress) && (l.progress = null), l.complete && !w.isFunction(l.complete) && (l.complete = null), l.display !== a && null !== l.display && (l.display = l.display.toString().toLowerCase(), "auto" === l.display && (l.display = k.CSS.Values.getDisplayType(e))), l.visibility !== a && null !== l.visibility && (l.visibility = l.visibility.toString().toLowerCase()), l.mobileHA = l.mobileHA && k.State.isMobile && !k.State.isGingerbread, !1 === l.queue)
                            if (l.delay) {
                                var c = k.State.delayedElements.count++;
                                k.State.delayedElements[c] = e;
                                var d = function(e) {
                                    return function() {
                                        k.State.delayedElements[e] = !1, i()
                                    }
                                }(c);
                                o(e).delayBegin = (new Date).getTime(), o(e).delay = parseFloat(l.delay), o(e).delayTimer = {
                                    setTimeout: setTimeout(i, parseFloat(l.delay)),
                                    next: d
                                }
                            } else i();
                        else g.queue(e, l.queue, function(e, t) {
                            if (!0 === t) return O.promise && O.resolver(h), !0;
                            k.velocityQueueEntryFlag = !0, i(e)
                        });
                        "" !== l.queue && "fx" !== l.queue || "inprogress" === g.queue(e)[0] || g.dequeue(e)
                    }
                    var u, c, m, y, h, v, x, P = arguments[0] && (arguments[0].p || g.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || w.isString(arguments[0].properties));
                    w.isWrapped(this) ? (c = !1, y = 0, h = this, m = this) : (c = !0, y = 1, h = P ? arguments[0].elements || arguments[0].e : arguments[0]);
                    var O = {
                        promise: null,
                        resolver: null,
                        rejecter: null
                    };
                    if (c && k.Promise && (O.promise = new k.Promise(function(e, t) {
                            O.resolver = e, O.rejecter = t
                        })), P ? (v = arguments[0].properties || arguments[0].p, x = arguments[0].options || arguments[0].o) : (v = arguments[y], x = arguments[y + 1]), !(h = i(h))) return void(O.promise && (v && x && !1 === x.promiseRejectEmpty ? O.resolver() : O.rejecter()));
                    var C = h.length,
                        X = 0;
                    if (!/^(stop|finish|finishAll|pause|resume)$/i.test(v) && !g.isPlainObject(x)) {
                        var Y = y + 1;
                        x = {};
                        for (var D = Y; D < arguments.length; D++) w.isArray(arguments[D]) || !/^(fast|normal|slow)$/i.test(arguments[D]) && !/^\d/.test(arguments[D]) ? w.isString(arguments[D]) || w.isArray(arguments[D]) ? x.easing = arguments[D] : w.isFunction(arguments[D]) && (x.complete = arguments[D]) : x.duration = arguments[D]
                    }
                    var A;
                    switch (v) {
                        case "scroll":
                            A = "scroll";
                            break;
                        case "reverse":
                            A = "reverse";
                            break;
                        case "pause":
                            var F = (new Date).getTime();
                            return g.each(h, function(e, t) {
                                s(t, F)
                            }), g.each(k.State.calls, function(e, t) {
                                var r = !1;
                                t && g.each(t[1], function(e, n) {
                                    var i = x === a ? "" : x;
                                    return !0 !== i && t[2].queue !== i && (x !== a || !1 !== t[2].queue) || (g.each(h, function(e, a) {
                                        if (a === n) return t[5] = {
                                            resume: !1
                                        }, r = !0, !1
                                    }), !r && void 0)
                                })
                            }), e();
                        case "resume":
                            return g.each(h, function(e, t) {
                                l(t, F)
                            }), g.each(k.State.calls, function(e, t) {
                                var r = !1;
                                t && g.each(t[1], function(e, n) {
                                    var i = x === a ? "" : x;
                                    return !0 !== i && t[2].queue !== i && (x !== a || !1 !== t[2].queue) || (!t[5] || (g.each(h, function(e, a) {
                                        if (a === n) return t[5].resume = !0, r = !0, !1
                                    }), !r && void 0))
                                })
                            }), e();
                        case "finish":
                        case "finishAll":
                        case "stop":
                            g.each(h, function(e, t) {
                                o(t) && o(t).delayTimer && (clearTimeout(o(t).delayTimer.setTimeout), o(t).delayTimer.next && o(t).delayTimer.next(), delete o(t).delayTimer), "finishAll" !== v || !0 !== x && !w.isString(x) || (g.each(g.queue(t, w.isString(x) ? x : ""), function(e, t) {
                                    w.isFunction(t) && t()
                                }), g.queue(t, w.isString(x) ? x : "", []))
                            });
                            var E = [];
                            return g.each(k.State.calls, function(e, t) {
                                t && g.each(t[1], function(r, n) {
                                    var i = x === a ? "" : x;
                                    if (!0 !== i && t[2].queue !== i && (x !== a || !1 !== t[2].queue)) return !0;
                                    g.each(h, function(r, a) {
                                        if (a === n)
                                            if ((!0 === x || w.isString(x)) && (g.each(g.queue(a, w.isString(x) ? x : ""), function(e, t) {
                                                    w.isFunction(t) && t(null, !0)
                                                }), g.queue(a, w.isString(x) ? x : "", [])), "stop" === v) {
                                                var s = o(a);
                                                s && s.tweensContainer && !1 !== i && g.each(s.tweensContainer, function(e, t) {
                                                    t.endValue = t.currentValue
                                                }), E.push(e)
                                            } else "finish" !== v && "finishAll" !== v || (t[2].duration = 1)
                                    })
                                })
                            }), "stop" === v && (g.each(E, function(e, t) {
                                d(t, !0)
                            }), O.promise && O.resolver(h)), e();
                        default:
                            if (!g.isPlainObject(v) || w.isEmptyObject(v)) {
                                if (w.isString(v) && k.Redirects[v]) {
                                    u = g.extend({}, x);
                                    var q = u.duration,
                                        I = u.delay || 0;
                                    return !0 === u.backwards && (h = g.extend(!0, [], h).reverse()), g.each(h, function(e, t) {
                                        parseFloat(u.stagger) ? u.delay = I + parseFloat(u.stagger) * e : w.isFunction(u.stagger) && (u.delay = I + u.stagger.call(t, e, C)), u.drag && (u.duration = parseFloat(q) || (/^(callout|transition)/.test(v) ? 1e3 : S), u.duration = Math.max(u.duration * (u.backwards ? 1 - e / C : (e + 1) / C), .75 * u.duration, 200)), k.Redirects[v].call(t, t, u || {}, e, C, h, O.promise ? O : a)
                                    }), e()
                                }
                                var R = "Velocity: First argument (" + v + ") was not a property map, a known action, or a registered redirect. Aborting.";
                                return O.promise ? O.rejecter(new Error(R)) : t.console && console.log(R), e()
                            }
                            A = "start"
                    }
                    var N = {
                            lastParent: null,
                            lastPosition: null,
                            lastFontSize: null,
                            lastPercentToPxWidth: null,
                            lastPercentToPxHeight: null,
                            lastEmToPx: null,
                            remToPx: null,
                            vwToPx: null,
                            vhToPx: null
                        },
                        L = [];
                    g.each(h, function(e, t) {
                        w.isNode(t) && n(t, e)
                    }), u = g.extend({}, k.defaults, x), u.loop = parseInt(u.loop, 10);
                    var H = 2 * u.loop - 1;
                    if (u.loop)
                        for (var j = 0; j < H; j++) {
                            var z = {
                                delay: u.delay,
                                progress: u.progress
                            };
                            j === H - 1 && (z.display = u.display, z.visibility = u.visibility, z.complete = u.complete), T(h, "reverse", z)
                        }
                    return e()
                };
                k = g.extend(T, k), k.animate = T;
                var C = t.requestAnimationFrame || y;
                if (!k.State.isMobile && r.hidden !== a) {
                    var X = function() {
                        r.hidden ? (C = function(e) {
                            return setTimeout(function() {
                                e(!0)
                            }, 16)
                        }, p()) : C = t.requestAnimationFrame || y
                    };
                    X(), r.addEventListener("visibilitychange", X)
                }
                return e.Velocity = k, e !== t && (e.fn.velocity = T, e.fn.velocity.defaults = k.defaults), g.each(["Down", "Up"], function(e, t) {
                    k.Redirects["slide" + t] = function(e, r, n, i, o, s) {
                        var l = g.extend({}, r),
                            u = l.begin,
                            c = l.complete,
                            f = {},
                            p = {
                                height: "",
                                marginTop: "",
                                marginBottom: "",
                                paddingTop: "",
                                paddingBottom: ""
                            };
                        l.display === a && (l.display = "Down" === t ? "inline" === k.CSS.Values.getDisplayType(e) ? "inline-block" : "block" : "none"), l.begin = function() {
                            0 === n && u && u.call(o, o);
                            for (var r in p)
                                if (p.hasOwnProperty(r)) {
                                    f[r] = e.style[r];
                                    var a = V.getPropertyValue(e, r);
                                    p[r] = "Down" === t ? [a, 0] : [0, a]
                                }
                            f.overflow = e.style.overflow, e.style.overflow = "hidden"
                        }, l.complete = function() {
                            for (var t in f) f.hasOwnProperty(t) && (e.style[t] = f[t]);
                            n === i - 1 && (c && c.call(o, o), s && s.resolver(o))
                        }, k(e, p, l)
                    }
                }), g.each(["In", "Out"], function(e, t) {
                    k.Redirects["fade" + t] = function(e, r, n, i, o, s) {
                        var l = g.extend({}, r),
                            u = l.complete,
                            c = {
                                opacity: "In" === t ? 1 : 0
                            };
                        0 !== n && (l.begin = null), l.complete = n !== i - 1 ? null : function() {
                            u && u.call(o, o), s && s.resolver(o)
                        }, l.display === a && (l.display = "In" === t ? "auto" : "none"), k(this, c, l)
                    }
                }), k
            }(window.jQuery || window.Zepto || window, window, window ? window.document : void 0)
        })
    }, {}],
    3: [function(e, t, r) {
        ! function(a) {
            "use strict";
            "function" == typeof e && "object" == typeof r ? t.exports = a() : "function" == typeof define && define.amd ? define(["velocity"], a) : a()
        }(function() {
            "use strict";
            return function(e, t, r, a) {
                var n = e.Velocity;
                if (!n || !n.Utilities) return void(t.console && console.log("Velocity UI Pack: Velocity must be loaded first. Aborting."));
                var i = n.Utilities,
                    o = n.version,
                    s = {
                        major: 1,
                        minor: 1,
                        patch: 0
                    };
                if (function(e, t) {
                        var r = [];
                        return !(!e || !t) && (i.each([e, t], function(e, t) {
                            var a = [];
                            i.each(t, function(e, t) {
                                for (; t.toString().length < 5;) t = "0" + t;
                                a.push(t)
                            }), r.push(a.join(""))
                        }), parseFloat(r[0]) > parseFloat(r[1]))
                    }(s, o)) {
                    var l = "Velocity UI Pack: You need to update Velocity (velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";
                    throw alert(l), new Error(l)
                }
                n.RegisterEffect = n.RegisterUI = function(e, t) {
                    function r(e, t, r, a) {
                        var o, s = 0;
                        i.each(e.nodeType ? [e] : e, function(e, t) {
                            a && (r += e * a), o = t.parentNode;
                            var l = ["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom"];
                            "border-box" === n.CSS.getPropertyValue(t, "boxSizing").toString().toLowerCase() && (l = ["height"]), i.each(l, function(e, r) {
                                s += parseFloat(n.CSS.getPropertyValue(t, r))
                            })
                        }), n.animate(o, {
                            height: ("In" === t ? "+" : "-") + "=" + s
                        }, {
                            queue: !1,
                            easing: "ease-in-out",
                            duration: r * ("In" === t ? .6 : 1)
                        })
                    }
                    return n.Redirects[e] = function(a, o, s, l, u, c, f) {
                        var p = s === l - 1,
                            d = 0;
                        f = f || t.loop, "function" == typeof t.defaultDuration ? t.defaultDuration = t.defaultDuration.call(u, u) : t.defaultDuration = parseFloat(t.defaultDuration);
                        for (var g = 0; g < t.calls.length; g++) "number" == typeof(b = t.calls[g][1]) && (d += b);
                        var m = d >= 1 ? 0 : t.calls.length ? (1 - d) / t.calls.length : 1;
                        for (g = 0; g < t.calls.length; g++) {
                            var y = t.calls[g],
                                h = y[0],
                                v = 1e3,
                                b = y[1],
                                w = y[2] || {},
                                x = {};
                            if (void 0 !== o.duration ? v = o.duration : void 0 !== t.defaultDuration && (v = t.defaultDuration), x.duration = v * ("number" == typeof b ? b : m), x.queue = o.queue || "", x.easing = w.easing || "ease", x.delay = parseFloat(w.delay) || 0, x.loop = !t.loop && w.loop, x._cacheValues = w._cacheValues || !0, 0 === g) {
                                if (x.delay += parseFloat(o.delay) || 0, 0 === s && (x.begin = function() {
                                        o.begin && o.begin.call(u, u);
                                        var t = e.match(/(In|Out)$/);
                                        t && "In" === t[0] && void 0 !== h.opacity && i.each(u.nodeType ? [u] : u, function(e, t) {
                                            n.CSS.setPropertyValue(t, "opacity", 0)
                                        }), o.animateParentHeight && t && r(u, t[0], v + x.delay, o.stagger)
                                    }), null !== o.display)
                                    if (void 0 !== o.display && "none" !== o.display) x.display = o.display;
                                    else if (/In$/.test(e)) {
                                    var S = n.CSS.Values.getDisplayType(a);
                                    x.display = "inline" === S ? "inline-block" : S
                                }
                                o.visibility && "hidden" !== o.visibility && (x.visibility = o.visibility)
                            }
                            if (g === t.calls.length - 1) {
                                var P = function() {
                                    void 0 !== o.display && "none" !== o.display || !/Out$/.test(e) || i.each(u.nodeType ? [u] : u, function(e, t) {
                                        n.CSS.setPropertyValue(t, "display", "none")
                                    }), o.complete && o.complete.call(u, u), c && c.resolver(u || a)
                                };
                                x.complete = function() {
                                    if (f && n.Redirects[e](a, o, s, l, u, c, !0 === f || Math.max(0, f - 1)), t.reset) {
                                        for (var r in t.reset)
                                            if (t.reset.hasOwnProperty(r)) {
                                                var i = t.reset[r];
                                                void 0 !== n.CSS.Hooks.registered[r] || "string" != typeof i && "number" != typeof i || (t.reset[r] = [t.reset[r], t.reset[r]])
                                            }
                                        var d = {
                                            duration: 0,
                                            queue: !1
                                        };
                                        p && (d.complete = P), n.animate(a, t.reset, d)
                                    } else p && P()
                                }, "hidden" === o.visibility && (x.visibility = o.visibility)
                            }
                            n.animate(a, h, x)
                        }
                    }, n
                }, n.RegisterEffect.packagedEffects = {
                    "callout.bounce": {
                        defaultDuration: 550,
                        calls: [
                            [{
                                translateY: -30
                            }, .25],
                            [{
                                translateY: 0
                            }, .125],
                            [{
                                translateY: -15
                            }, .125],
                            [{
                                translateY: 0
                            }, .25]
                        ]
                    },
                    "callout.shake": {
                        defaultDuration: 800,
                        calls: [
                            [{
                                translateX: -11
                            }],
                            [{
                                translateX: 11
                            }],
                            [{
                                translateX: -11
                            }],
                            [{
                                translateX: 11
                            }],
                            [{
                                translateX: -11
                            }],
                            [{
                                translateX: 11
                            }],
                            [{
                                translateX: -11
                            }],
                            [{
                                translateX: 0
                            }]
                        ]
                    },
                    "callout.flash": {
                        defaultDuration: 1100,
                        calls: [
                            [{
                                opacity: [0, "easeInOutQuad", 1]
                            }],
                            [{
                                opacity: [1, "easeInOutQuad"]
                            }],
                            [{
                                opacity: [0, "easeInOutQuad"]
                            }],
                            [{
                                opacity: [1, "easeInOutQuad"]
                            }]
                        ]
                    },
                    "callout.pulse": {
                        defaultDuration: 825,
                        calls: [
                            [{
                                scaleX: 1.1,
                                scaleY: 1.1
                            }, .5, {
                                easing: "easeInExpo"
                            }],
                            [{
                                scaleX: 1,
                                scaleY: 1
                            }, .5]
                        ]
                    },
                    "callout.swing": {
                        defaultDuration: 950,
                        calls: [
                            [{
                                rotateZ: 15
                            }],
                            [{
                                rotateZ: -10
                            }],
                            [{
                                rotateZ: 5
                            }],
                            [{
                                rotateZ: -5
                            }],
                            [{
                                rotateZ: 0
                            }]
                        ]
                    },
                    "callout.tada": {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                scaleX: .9,
                                scaleY: .9,
                                rotateZ: -3
                            }, .1],
                            [{
                                scaleX: 1.1,
                                scaleY: 1.1,
                                rotateZ: 3
                            }, .1],
                            [{
                                scaleX: 1.1,
                                scaleY: 1.1,
                                rotateZ: -3
                            }, .1],
                            ["reverse", .125],
                            ["reverse", .125],
                            ["reverse", .125],
                            ["reverse", .125],
                            ["reverse", .125],
                            [{
                                scaleX: 1,
                                scaleY: 1,
                                rotateZ: 0
                            }, .2]
                        ]
                    },
                    "transition.fadeIn": {
                        defaultDuration: 500,
                        calls: [
                            [{
                                opacity: [1, 0]
                            }]
                        ]
                    },
                    "transition.fadeOut": {
                        defaultDuration: 500,
                        calls: [
                            [{
                                opacity: [0, 1]
                            }]
                        ]
                    },
                    "transition.flipXIn": {
                        defaultDuration: 700,
                        calls: [
                            [{
                                opacity: [1, 0],
                                transformPerspective: [800, 800],
                                rotateY: [0, -55]
                            }]
                        ],
                        reset: {
                            transformPerspective: 0
                        }
                    },
                    "transition.flipXOut": {
                        defaultDuration: 700,
                        calls: [
                            [{
                                opacity: [0, 1],
                                transformPerspective: [800, 800],
                                rotateY: 55
                            }]
                        ],
                        reset: {
                            transformPerspective: 0,
                            rotateY: 0
                        }
                    },
                    "transition.flipYIn": {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: [1, 0],
                                transformPerspective: [800, 800],
                                rotateX: [0, -45]
                            }]
                        ],
                        reset: {
                            transformPerspective: 0
                        }
                    },
                    "transition.flipYOut": {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: [0, 1],
                                transformPerspective: [800, 800],
                                rotateX: 25
                            }]
                        ],
                        reset: {
                            transformPerspective: 0,
                            rotateX: 0
                        }
                    },
                    "transition.flipBounceXIn": {
                        defaultDuration: 900,
                        calls: [
                            [{
                                opacity: [.725, 0],
                                transformPerspective: [400, 400],
                                rotateY: [-10, 90]
                            }, .5],
                            [{
                                opacity: .8,
                                rotateY: 10
                            }, .25],
                            [{
                                opacity: 1,
                                rotateY: 0
                            }, .25]
                        ],
                        reset: {
                            transformPerspective: 0
                        }
                    },
                    "transition.flipBounceXOut": {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: [.9, 1],
                                transformPerspective: [400, 400],
                                rotateY: -10
                            }],
                            [{
                                opacity: 0,
                                rotateY: 90
                            }]
                        ],
                        reset: {
                            transformPerspective: 0,
                            rotateY: 0
                        }
                    },
                    "transition.flipBounceYIn": {
                        defaultDuration: 850,
                        calls: [
                            [{
                                opacity: [.725, 0],
                                transformPerspective: [400, 400],
                                rotateX: [-10, 90]
                            }, .5],
                            [{
                                opacity: .8,
                                rotateX: 10
                            }, .25],
                            [{
                                opacity: 1,
                                rotateX: 0
                            }, .25]
                        ],
                        reset: {
                            transformPerspective: 0
                        }
                    },
                    "transition.flipBounceYOut": {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: [.9, 1],
                                transformPerspective: [400, 400],
                                rotateX: -15
                            }],
                            [{
                                opacity: 0,
                                rotateX: 90
                            }]
                        ],
                        reset: {
                            transformPerspective: 0,
                            rotateX: 0
                        }
                    },
                    "transition.swoopIn": {
                        defaultDuration: 850,
                        calls: [
                            [{
                                opacity: [1, 0],
                                transformOriginX: ["100%", "50%"],
                                transformOriginY: ["100%", "100%"],
                                scaleX: [1, 0],
                                scaleY: [1, 0],
                                translateX: [0, -700],
                                translateZ: 0
                            }]
                        ],
                        reset: {
                            transformOriginX: "50%",
                            transformOriginY: "50%"
                        }
                    },
                    "transition.swoopOut": {
                        defaultDuration: 850,
                        calls: [
                            [{
                                opacity: [0, 1],
                                transformOriginX: ["50%", "100%"],
                                transformOriginY: ["100%", "100%"],
                                scaleX: 0,
                                scaleY: 0,
                                translateX: -700,
                                translateZ: 0
                            }]
                        ],
                        reset: {
                            transformOriginX: "50%",
                            transformOriginY: "50%",
                            scaleX: 1,
                            scaleY: 1,
                            translateX: 0
                        }
                    },
                    "transition.whirlIn": {
                        defaultDuration: 850,
                        calls: [
                            [{
                                opacity: [1, 0],
                                transformOriginX: ["50%", "50%"],
                                transformOriginY: ["50%", "50%"],
                                scaleX: [1, 0],
                                scaleY: [1, 0],
                                rotateY: [0, 160]
                            }, 1, {
                                easing: "easeInOutSine"
                            }]
                        ]
                    },
                    "transition.whirlOut": {
                        defaultDuration: 750,
                        calls: [
                            [{
                                opacity: [0, "easeInOutQuint", 1],
                                transformOriginX: ["50%", "50%"],
                                transformOriginY: ["50%", "50%"],
                                scaleX: 0,
                                scaleY: 0,
                                rotateY: 160
                            }, 1, {
                                easing: "swing"
                            }]
                        ],
                        reset: {
                            scaleX: 1,
                            scaleY: 1,
                            rotateY: 0
                        }
                    },
                    "transition.shrinkIn": {
                        defaultDuration: 750,
                        calls: [
                            [{
                                opacity: [1, 0],
                                transformOriginX: ["50%", "50%"],
                                transformOriginY: ["50%", "50%"],
                                scaleX: [1, 1.5],
                                scaleY: [1, 1.5],
                                translateZ: 0
                            }]
                        ]
                    },
                    "transition.shrinkOut": {
                        defaultDuration: 600,
                        calls: [
                            [{
                                opacity: [0, 1],
                                transformOriginX: ["50%", "50%"],
                                transformOriginY: ["50%", "50%"],
                                scaleX: 1.3,
                                scaleY: 1.3,
                                translateZ: 0
                            }]
                        ],
                        reset: {
                            scaleX: 1,
                            scaleY: 1
                        }
                    },
                    "transition.expandIn": {
                        defaultDuration: 700,
                        calls: [
                            [{
                                opacity: [1, 0],
                                transformOriginX: ["50%", "50%"],
                                transformOriginY: ["50%", "50%"],
                                scaleX: [1, .625],
                                scaleY: [1, .625],
                                translateZ: 0
                            }]
                        ]
                    },
                    "transition.expandOut": {
                        defaultDuration: 700,
                        calls: [
                            [{
                                opacity: [0, 1],
                                transformOriginX: ["50%", "50%"],
                                transformOriginY: ["50%", "50%"],
                                scaleX: .5,
                                scaleY: .5,
                                translateZ: 0
                            }]
                        ],
                        reset: {
                            scaleX: 1,
                            scaleY: 1
                        }
                    },
                    "transition.bounceIn": {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: [1, 0],
                                scaleX: [1.05, .3],
                                scaleY: [1.05, .3]
                            }, .35],
                            [{
                                scaleX: .9,
                                scaleY: .9,
                                translateZ: 0
                            }, .2],
                            [{
                                scaleX: 1,
                                scaleY: 1
                            }, .45]
                        ]
                    },
                    "transition.bounceOut": {
                        defaultDuration: 800,
                        calls: [
                            [{
                                scaleX: .95,
                                scaleY: .95
                            }, .35],
                            [{
                                scaleX: 1.1,
                                scaleY: 1.1,
                                translateZ: 0
                            }, .35],
                            [{
                                opacity: [0, 1],
                                scaleX: .3,
                                scaleY: .3
                            }, .3]
                        ],
                        reset: {
                            scaleX: 1,
                            scaleY: 1
                        }
                    },
                    "transition.bounceUpIn": {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateY: [-30, 1e3]
                            }, .6, {
                                easing: "easeOutCirc"
                            }],
                            [{
                                translateY: 10
                            }, .2],
                            [{
                                translateY: 0
                            }, .2]
                        ]
                    },
                    "transition.bounceUpOut": {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                translateY: 20
                            }, .2],
                            [{
                                opacity: [0, "easeInCirc", 1],
                                translateY: -1e3
                            }, .8]
                        ],
                        reset: {
                            translateY: 0
                        }
                    },
                    "transition.bounceDownIn": {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateY: [30, -1e3]
                            }, .6, {
                                easing: "easeOutCirc"
                            }],
                            [{
                                translateY: -10
                            }, .2],
                            [{
                                translateY: 0
                            }, .2]
                        ]
                    },
                    "transition.bounceDownOut": {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                translateY: -20
                            }, .2],
                            [{
                                opacity: [0, "easeInCirc", 1],
                                translateY: 1e3
                            }, .8]
                        ],
                        reset: {
                            translateY: 0
                        }
                    },
                    "transition.bounceLeftIn": {
                        defaultDuration: 750,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateX: [30, -1250]
                            }, .6, {
                                easing: "easeOutCirc"
                            }],
                            [{
                                translateX: -10
                            }, .2],
                            [{
                                translateX: 0
                            }, .2]
                        ]
                    },
                    "transition.bounceLeftOut": {
                        defaultDuration: 750,
                        calls: [
                            [{
                                translateX: 30
                            }, .2],
                            [{
                                opacity: [0, "easeInCirc", 1],
                                translateX: -1250
                            }, .8]
                        ],
                        reset: {
                            translateX: 0
                        }
                    },
                    "transition.bounceRightIn": {
                        defaultDuration: 750,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateX: [-30, 1250]
                            }, .6, {
                                easing: "easeOutCirc"
                            }],
                            [{
                                translateX: 10
                            }, .2],
                            [{
                                translateX: 0
                            }, .2]
                        ]
                    },
                    "transition.bounceRightOut": {
                        defaultDuration: 750,
                        calls: [
                            [{
                                translateX: -30
                            }, .2],
                            [{
                                opacity: [0, "easeInCirc", 1],
                                translateX: 1250
                            }, .8]
                        ],
                        reset: {
                            translateX: 0
                        }
                    },
                    "transition.slideUpIn": {
                        defaultDuration: 900,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateY: [0, 20],
                                translateZ: 0
                            }]
                        ]
                    },
                    "transition.slideUpOut": {
                        defaultDuration: 900,
                        calls: [
                            [{
                                opacity: [0, 1],
                                translateY: -20,
                                translateZ: 0
                            }]
                        ],
                        reset: {
                            translateY: 0
                        }
                    },
                    "transition.slideDownIn": {
                        defaultDuration: 900,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateY: [0, -20],
                                translateZ: 0
                            }]
                        ]
                    },
                    "transition.slideDownOut": {
                        defaultDuration: 900,
                        calls: [
                            [{
                                opacity: [0, 1],
                                translateY: 20,
                                translateZ: 0
                            }]
                        ],
                        reset: {
                            translateY: 0
                        }
                    },
                    "transition.slideLeftIn": {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateX: [0, -20],
                                translateZ: 0
                            }]
                        ]
                    },
                    "transition.slideLeftOut": {
                        defaultDuration: 1050,
                        calls: [
                            [{
                                opacity: [0, 1],
                                translateX: -20,
                                translateZ: 0
                            }]
                        ],
                        reset: {
                            translateX: 0
                        }
                    },
                    "transition.slideRightIn": {
                        defaultDuration: 1e3,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateX: [0, 20],
                                translateZ: 0
                            }]
                        ]
                    },
                    "transition.slideRightOut": {
                        defaultDuration: 1050,
                        calls: [
                            [{
                                opacity: [0, 1],
                                translateX: 20,
                                translateZ: 0
                            }]
                        ],
                        reset: {
                            translateX: 0
                        }
                    },
                    "transition.slideUpBigIn": {
                        defaultDuration: 850,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateY: [0, 75],
                                translateZ: 0
                            }]
                        ]
                    },
                    "transition.slideUpBigOut": {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: [0, 1],
                                translateY: -75,
                                translateZ: 0
                            }]
                        ],
                        reset: {
                            translateY: 0
                        }
                    },
                    "transition.slideDownBigIn": {
                        defaultDuration: 850,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateY: [0, -75],
                                translateZ: 0
                            }]
                        ]
                    },
                    "transition.slideDownBigOut": {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: [0, 1],
                                translateY: 75,
                                translateZ: 0
                            }]
                        ],
                        reset: {
                            translateY: 0
                        }
                    },
                    "transition.slideLeftBigIn": {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateX: [0, -75],
                                translateZ: 0
                            }]
                        ]
                    },
                    "transition.slideLeftBigOut": {
                        defaultDuration: 750,
                        calls: [
                            [{
                                opacity: [0, 1],
                                translateX: -75,
                                translateZ: 0
                            }]
                        ],
                        reset: {
                            translateX: 0
                        }
                    },
                    "transition.slideRightBigIn": {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: [1, 0],
                                translateX: [0, 75],
                                translateZ: 0
                            }]
                        ]
                    },
                    "transition.slideRightBigOut": {
                        defaultDuration: 750,
                        calls: [
                            [{
                                opacity: [0, 1],
                                translateX: 75,
                                translateZ: 0
                            }]
                        ],
                        reset: {
                            translateX: 0
                        }
                    },
                    "transition.perspectiveUpIn": {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: [1, 0],
                                transformPerspective: [800, 800],
                                transformOriginX: [0, 0],
                                transformOriginY: ["100%", "100%"],
                                rotateX: [0, -180]
                            }]
                        ],
                        reset: {
                            transformPerspective: 0,
                            transformOriginX: "50%",
                            transformOriginY: "50%"
                        }
                    },
                    "transition.perspectiveUpOut": {
                        defaultDuration: 850,
                        calls: [
                            [{
                                opacity: [0, 1],
                                transformPerspective: [800, 800],
                                transformOriginX: [0, 0],
                                transformOriginY: ["100%", "100%"],
                                rotateX: -180
                            }]
                        ],
                        reset: {
                            transformPerspective: 0,
                            transformOriginX: "50%",
                            transformOriginY: "50%",
                            rotateX: 0
                        }
                    },
                    "transition.perspectiveDownIn": {
                        defaultDuration: 800,
                        calls: [
                            [{
                                opacity: [1, 0],
                                transformPerspective: [800, 800],
                                transformOriginX: [0, 0],
                                transformOriginY: [0, 0],
                                rotateX: [0, 180]
                            }]
                        ],
                        reset: {
                            transformPerspective: 0,
                            transformOriginX: "50%",
                            transformOriginY: "50%"
                        }
                    },
                    "transition.perspectiveDownOut": {
                        defaultDuration: 850,
                        calls: [
                            [{
                                opacity: [0, 1],
                                transformPerspective: [800, 800],
                                transformOriginX: [0, 0],
                                transformOriginY: [0, 0],
                                rotateX: 180
                            }]
                        ],
                        reset: {
                            transformPerspective: 0,
                            transformOriginX: "50%",
                            transformOriginY: "50%",
                            rotateX: 0
                        }
                    },
                    "transition.perspectiveLeftIn": {
                        defaultDuration: 950,
                        calls: [
                            [{
                                opacity: [1, 0],
                                transformPerspective: [2e3, 2e3],
                                transformOriginX: [0, 0],
                                transformOriginY: [0, 0],
                                rotateY: [0, -180]
                            }]
                        ],
                        reset: {
                            transformPerspective: 0,
                            transformOriginX: "50%",
                            transformOriginY: "50%"
                        }
                    },
                    "transition.perspectiveLeftOut": {
                        defaultDuration: 950,
                        calls: [
                            [{
                                opacity: [0, 1],
                                transformPerspective: [2e3, 2e3],
                                transformOriginX: [0, 0],
                                transformOriginY: [0, 0],
                                rotateY: -180
                            }]
                        ],
                        reset: {
                            transformPerspective: 0,
                            transformOriginX: "50%",
                            transformOriginY: "50%",
                            rotateY: 0
                        }
                    },
                    "transition.perspectiveRightIn": {
                        defaultDuration: 950,
                        calls: [
                            [{
                                opacity: [1, 0],
                                transformPerspective: [2e3, 2e3],
                                transformOriginX: ["100%", "100%"],
                                transformOriginY: [0, 0],
                                rotateY: [0, 180]
                            }]
                        ],
                        reset: {
                            transformPerspective: 0,
                            transformOriginX: "50%",
                            transformOriginY: "50%"
                        }
                    },
                    "transition.perspectiveRightOut": {
                        defaultDuration: 950,
                        calls: [
                            [{
                                opacity: [0, 1],
                                transformPerspective: [2e3, 2e3],
                                transformOriginX: ["100%", "100%"],
                                transformOriginY: [0, 0],
                                rotateY: 180
                            }]
                        ],
                        reset: {
                            transformPerspective: 0,
                            transformOriginX: "50%",
                            transformOriginY: "50%",
                            rotateY: 0
                        }
                    }
                };
                for (var u in n.RegisterEffect.packagedEffects) n.RegisterEffect.packagedEffects.hasOwnProperty(u) && n.RegisterEffect(u, n.RegisterEffect.packagedEffects[u]);
                n.RunSequence = function(e) {
                    var t = i.extend(!0, [], e);
                    t.length > 1 && (i.each(t.reverse(), function(e, r) {
                        var a = t[e + 1];
                        if (a) {
                            var o = r.o || r.options,
                                s = a.o || a.options,
                                l = o && !1 === o.sequenceQueue ? "begin" : "complete",
                                u = s && s[l],
                                c = {};
                            c[l] = function() {
                                var e = a.e || a.elements,
                                    t = e.nodeType ? [e] : e;
                                u && u.call(t, t), n(r)
                            }, a.o ? a.o = i.extend({}, s, c) : a.options = i.extend({}, s, c)
                        }
                    }), t.reverse()), n(t[0])
                }
            }(window.jQuery || window.Zepto || window, window, window && window.document)
        })
    }, {}]
}, {}, [1]);