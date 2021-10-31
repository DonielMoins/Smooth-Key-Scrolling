! function() {
    function r(e, n, t) {
        function u(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (o) return o(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    a.code = "MODULE_NOT_FOUND";
                    throw a;
                }
                var l = n[i] = {
                    exports: {}
                };
                e[i][0].call(l.exports, function(r) {
                    return u(e[i][1][r] || r);
                }, l, l.exports, r, e, n, t);
            }
            return n[i].exports;
        }
        for (var o = "function" == typeof require && require, i = 0; i < t.length; i++) u(t[i]);
        return u;
    }
    return r;
}()({
    1: [function(r, e, n) {
        var t, u, o, i;
        o = function(r, e) {
            return setInterval(e, r);
        }, t = 4, u = document.querySelector("#counter"), i = o(1e3, function() {
            return --t < 0 ? (clearInterval(i), u.innerText = "") : u.innerText = "- " + t;
        });
    }, {}]
}, {}, [1]);