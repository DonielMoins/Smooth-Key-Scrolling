! function() {
    function e(r, n, t) {
        function o(u, a) {
            if (!n[u]) {
                if (!r[u]) {
                    var s = "function" == typeof require && require;
                    if (!a && s) return s(u, !0);
                    if (i) return i(u, !0);
                    var c = new Error("Cannot find module '" + u + "'");
                    c.code = "MODULE_NOT_FOUND";
                    throw c;
                }
                var l = n[u] = {
                    exports: {}
                };
                r[u][0].call(l.exports, function(e) {
                    return o(r[u][1][e] || e);
                }, l, l.exports, e, r, n, t);
            }
            return n[u].exports;
        }
        for (var i = "function" == typeof require && require, u = 0; u < t.length; u++) o(t[u]);
        return o;
    }
    return e;
}()({

    1: [function(e, r, n) {
        function addToPage(e) {
            var t = [];
            var r = 0;
            var n = e.length;
            for (var o; r < n; r++) {
                o = e[r];
                if (o.url.startsWith("about")) t.push(void 0);
                else t.push(tabs.executeScript(o.id, {
                    file: "js/content.js"
                }));
            }
            return t;
        }

        function addToWindow(e) {
            var n = e.length;
            var r = 0;
            var pages = [];
            for (var t = null; r < n; r++) {
                t = e[r];
                pages.push(browser.tabs.getAllInWindow(t.id).then(addToPage));
            }
            return pages;
        }
        var o = function(e) {
            if ("install" === e.reason) {
                browser.tabs.create({
                    url: "welcome.html"
                });
                mixpanel.track("Install");


                browser.windows.getAll(addToWindow);
                return;
            }
        };
        var t = function() {
            var e, r;
            return mixpanel.register({
                "Extension: Version": browser.app.getDetails().version
            }), e = {
                email: "",
                key: "",
                verified: !1
            }, browser.storage.sync.get(e, function(n) {
                var t, o;
                return e = n, e.email && e.key ? navigator.onLine ? (t = new FormData(), t.append("email", e.email), t.append("key", e.key), o = new XMLHttpRequest(), o.open("POST", "https://smoothkeyscroll.herokuapp.com/license/verify", !0), o.onerror = function() {
                    return r(!1);
                }, o.onload = function() {
                    return r("Valid" === o.responseText);
                }, o.send(t)) : void 0 : r(!1);
            }), r = function(r) {
                return e.verified = r, browser.storage.sync.set(e);
            };
        };
        browser.runtime.onInstalled.addListener(t);
        browser.runtime.onStartup.addListener(t);
        browser.runtime.onInstalled.addListener(o);
    }, {}]
}, {}, [1]);