! function () {
    function t(e, n, r) {
        function i(a, s) {
            if (!n[a]) {
                if (!e[a]) {
                    var l = "function" == typeof require && require;
                    if (!s && l) return l(a, true);
                    if (o) return o(a, true);
                    var u = new Error("Cannot find module '" + a + "'");
                    u.code = "MODULE_NOT_FOUND";
                    throw u;
                }
                var c = n[a] = {
                    exports: {}
                };
                e[a][0].call(c.exports, function (t) {
                    return i(e[a][1][t] || t);
                }, c, c.exports, t, e, n, r);
            }
            return n[a].exports;
        }
        for (var o = "function" == typeof require && require, a = 0; a < r.length; a++) i(r[a]);
        return i;
    }
    return t;
}()({
    1: [function (t, e, n) {
        var r, i, o, a, s, l, u = [].indexOf || function (t) {
            for (var e = 0, n = this.length; e < n; e++)
                if (e in this && this[e] === t) return e;
            return -1
        };
        i = t("vue"), a = t("animations.coffee"), r = t("velocity-animate"), o = t("lodash"), s = t("shared-state.coffee"), l = t("sliderBackground.coffee"), new i({
            el: ".options",
            data: {
                options: {
                    Normal: 5,
                    Alt: 24,
                    Control: 1,
                    Mapping: "arrows",
                    disableHover: false,
                    disableBlueArrow: false
                },
                license: s.license,
                mixpanel: s.mixpanel,
                keyboard: false,
                UI: {
                    showPayment: false,
                    proFeaturesCover: false,
                    info: {
                        disableHover: false,
                        disableBlueArrow: false
                    },
                    lightbox: {
                        blueArrow: false
                    }
                }
            },
            watch: {
                options: {
                    handler: function (t) {
                        return browser.storage.local.set(t)
                    },
                    deep: true
                }
            },
            created: function () {
                return browser.storage.local.get(this.options, function (t) {
                    return function (e) {
                        return t.options = e
                    }
                }(this)), browser.storage.sync.get({
                    verified: false
                }, function (t) {
                    return function (e) {
                        return t.verified = e.verified
                    }
                }(this))
            },
            ready: function () {
                return browser.storage.onChanged.addListener(function (t, e) {
                    if (u.call(t, "verified") >= 0) return this.verified = t.verified.newValue
                })
            },
            methods: {
                sliderBackground: l,
                scrollToPay: function () {
                    return this.license.verified ? this.UI.proFeaturesCover = false : (this.UI.proFeaturesCover = true, (window.innerHeight - document.querySelector("#module-license").offsetHeight) / 2, r({
                        elements: document.querySelector("#module-license"),
                        properties: "scroll",
                        options: {
                            delay: 500,
                            duration: 1e3,
                            offset: -100,
                            easing: "easeInOutQuad"
                        }
                    }), this.mixpanelTrack("Pay: Scroll To Pay"))
                },
                mixpanelTrack: function (t, e) {
                    var n, r;
                    return null == e && (e = {}), n = t + JSON.stringify(e), !this.mixpanel.tracked[n] && (r = o.merge(e, {
                        "Usage: Notification Count": this.mixpanel.notificationCount,
                        "Usage: Scroll Count": this.mixpanel.scrollCount
                    }), mixpanel.track(t, r), this.mixpanel.tracked[n] = true)
                }
            },
            transitions: {
                slideFade: a.slideFade,
                reveal: a.reveal
            },
            filters: {
                speedTranslation: function (t) {
                    switch (false) {
                        case !(t <= 5):
                            return "(good for reading)";
                        case !(t >= 15):
                            return "(better for skiming)";
                        default:
                            return ""
                    }
                },
                translationOpacity: function (t) {
                    var e, n, r;
                    switch (false) {
                        case !(t <= 5):
                            return n = 1, e = 5, r = e - n, 1 - (t - n) / r;
                        case !(t >= 15):
                            return n = 15, e = 30, r = e - n, (t - n) / r;
                        default:
                            return 0
                    }
                }
            }
        }), t("license/license.coffee")
    }, {
        "animations.coffee": 2,
        "license/license.coffee": 3,
        lodash: 9,
        "shared-state.coffee": 5,
        "sliderBackground.coffee": 6,
        "velocity-animate": 10,
        vue: 81
    }],
    2: [function (t, e, n) {
        var r, i;
        r = t("jquery"), i = t("velocity-animate"), t("velocity-animate/velocity.ui"), e.exports.slideFade = {
            enter: function (t, e) {
                return i(t, "transition.fadeIn", {
                        animateParentHeight: true,
                        duration: 1e3,
                        complete: e
                    }),
                    function () {
                        return i(t, "stop")
                    }
            },
            leave: function (t, e) {
                return i(t, "transition.fadeOut", {
                        animateParentHeight: true,
                        duration: 750,
                        complete: e
                    }),
                    function () {
                        return i(t, "stop")
                    }
            }
        }, e.exports.reveal = {
            enter: function (t, e) {
                return i(t, "slideDown", {
                        duration: 1500
                    }), i(t, "fadeIn", {
                        duration: 2e3,
                        queue: false
                    }), i(t, "scroll", {
                        duration: 1500,
                        queue: false
                    }),
                    function () {
                        return i(t, "stop")
                    }
            },
            leave: function (t, e) {
                return i(t, "slideUp", {
                        duration: 1500
                    }),
                    function () {
                        return i(t, "stop")
                    }
            }
        }, e.exports.mutate = function (t, e) {
            var n;
            return n = r(e).parent(), i({
                e: n,
                p: {
                    height: r(e).outerHeight()
                },
                o: {
                    duration: 700,
                    complete: function () {
                        return n.css("height", "")
                    }
                }
            }), i.RunSequence([{
                e: r(t),
                p: "fadeOut",
                o: {
                    duration: 500
                }
            }, {
                e: r(e),
                p: "fadeIn",
                o: {
                    duration: 500
                }
            }])
        }
    }, {
        jquery: 8,
        "velocity-animate": 10,
        "velocity-animate/velocity.ui": 11
    }],
    3: [function (t, e, n) {
        var r, i, o, a, s, l, u, c, f;
        l = function (t, e) {
            return setTimeout(e, t)
        }, r = t("jquery"), a = t("lodash"), o = t("vue"), o.use(t("validator.js")), t("velocity-animate"), t("velocity-animate/velocity.ui"), s = t("animations.coffee"), u = t("shared-state.coffee"), f = t("license/license.html"), c = t("sliderBackground.coffee"), i = "https://smoothkeyscroll.herokuapp.com", new o({
            el: "#module-license",
            template: f,
            data: {
                split: 90,
                custom: "",
                minimum: 300,
                license: u.license,
                priceSelector: "",
                payform: {
                    variation: "90-29-10",
                    prices: {
                        one: 9900,
                        two: 2900,
                        three: 1900
                    },
                    variations: {
                        "99-29-19": {
                            one: 9900,
                            two: 2900,
                            three: 1900
                        },
                        "50-30-10": {
                            one: 5e3,
                            two: 3e3,
                            three: 1e3
                        },
                        "25-10-5": {
                            one: 2500,
                            two: 1e3,
                            three: 500
                        },
                        "29-19-9": {
                            one: 2900,
                            two: 1900,
                            three: 900
                        },
                        "fixed-3": 300,
                        "fixed-5": 500,
                        "fixed-10": 1e3,
                        "fixed-2.99": 299,
                        "fixed-4.99": 499,
                        "fixed-9.99": 999
                    }
                },
                UI: {
                    charityInfo: false,
                    loading: false,
                    verificationFailed: false,
                    verificationResult: "",
                    verifyingLicense: false,
                    paying: false,
                    paymentError: false,
                    paymentMessage: ""
                },
                mixpanel: u.mixpanel
            },
            created: function () {
                return browser.storage.local.get("payformVariation", function (t) {
                    return function (e) {
                        var n;
                        return t.payform.variations[e.payformVariation] ? (t.payform.prices = t.payform.variations[e.payformVariation], t.payform.variation = e.payformVariation) : (n = a.sample(a.keys(t.payform.variations)), t.payform.variation = n, t.payform.prices = t.payform.variations[n], browser.storage.local.set({
                            payformVariation: n
                        }))
                    }
                }(this)), browser.storage.sync.get(this.license, function (t) {
                    return function (e) {
                        var n, r, i;
                        r = [];
                        for (n in e) i = e[n], r.push(t.license[n] = i);
                        return r
                    }
                }(this)), browser.storage.sync.get({
                    notificationCount: -1,
                    scrollCount: -1
                }, function (t) {
                    return function (e) {
                        return t.mixpanel.notificationCount = e.notificationCount, t.mixpanel.scrollCount = e.scrollCount
                    }
                }(this)), window.addEventListener("load", function (t) {
                    return function () {
                        return browser.storage.sync.get("mixpanel_id", function (e) {
                            if (t.mixpanel.id = e.mixpanel_id || mixpanel.get_distinct_id(), browser.storage.sync.set({
                                    mixpanel_id: t.mixpanel.id
                                }), mixpanel.register({
                                    "Mixpanel: User ID": t.mixpanel.id
                                }), t.mixpanelTrack("License Loaded"), browser.runtime.setUninstallURL(i + "/uninstalled?id=" + t.mixpanel.id), "?notification" === window.location.search) return t.mixpanelTrack("Notification Clicked"), window.history.replaceState("sks", "Smooth Key Scroll - Options", "/options.html" + window.location.hash)
                        })
                    }
                }(this))
            },
            ready: function () {
                if ("#license" === window.location.hash && !this.license.verified) return this.mutate("#section-pay-what-you-want", "#section-verify-license")
            },
            watch: {
                license: {
                    handler: function (t) {
                        return browser.storage.sync.set(t)
                    },
                    deep: true
                }
            },
            computed: {
                total: function () {
                    var t;
                    return this.custom, "custom" === this.priceSelector ? t = this.getCustom() || this.totalCache : (t = this.priceSelector, "undefined" != typeof override_price_tooltip && null !== override_price_tooltip && override_price_tooltip.hide()), this.totalCache = t, t
                },
                house: function () {
                    return Math.round(this.split * this.total / 100)
                },
                charity: function () {
                    return this.total - this.house
                },
                percentageHouse: {
                    get: function () {
                        return this.split
                    },
                    set: function (t) {
                        return this.split = t
                    }
                },
                percentageCharity: {
                    get: function () {
                        return 100 - this.split
                    },
                    set: function (t) {
                        return this.split = 100 - t
                    }
                },
                paypalCustom: function () {
                    return JSON.stringify({
                        email: this.license.email,
                        payform: this.payform.variation,
                        mixpanel_id: this.mixpanel.id
                    })
                },
                isPaymentFixed: function () {
                    return Boolean(~this.payform.variation.indexOf("fixed"))
                }
            },
            filters: {
                currency: {
                    read: function (t) {
                        return this.cents2dollars(t)
                    },
                    write: function (t, e) {
                        return this.dollars2cents(parseFloat(t))
                    }
                },
                number: {
                    read: function (t) {
                        return t
                    },
                    write: function (t, e) {
                        return t.replace(",", ".").replace(/[^\d.]/g, "")
                    }
                },
                integer: function (t) {
                    return Math.round(t)
                },
                removeTrailingZeros: function (t) {
                    return +t
                }
            },
            methods: {
                mixpanelTrack: function (t, e) {
                    return null == e && (e = {}), !this.mixpanel.tracked[t] && (e = a.merge(e, {
                        "Pay: What You Want": !this.isPaymentFixed,
                        "Pay: Variation": this.payform.variation,
                        "Pay: Price Selector": this.priceSelector,
                        "Pay: Total": this.cents2dollars(this.total),
                        "Pay: Split": this.split,
                        "Pay: Email": this.license.email,
                        "Usage: Notification Count": this.mixpanel.notificationCount,
                        "Usage: Scroll Count": this.mixpanel.scrollCount
                    }), mixpanel.track(t, e), this.mixpanel.tracked[t] = true)
                },
                emptyCustom: function () {
                    return this.custom = ""
                },
                sliderBackground: c,
                getCustom: function () {
                    var t;
                    return "" !== this.custom && !isNaN(this.custom) && (t = this.dollars2cents(this.custom), t < this.minimum ? this.minimum : t)
                },
                dollars2cents: function (t) {
                    return Math.round(100 * t)
                },
                cents2dollars: function (t) {
                    return (t / 100).toFixed(2)
                },
                pay: function (t) {
                    return this.mixpanelTrack("Payment Button Pressed", {
                        "Pay: Method": t
                    }), this.$valid("paymentDetails") && (this[t](), mixpanel.people.set({
                        $email: this.license.email
                    }), mixpanel.identify(this.mixpanel.id)), r(".invalid").addClass("touched")
                },
                paypal: function () {
                    return document.querySelector("#paypalForm").submit()
                },
                creditcard: function () {
                    return this.paypal()
                },
                bitcoin: function () {
                    var t;
                    return this.UI.paymentError = false, this.UI.paying = "bitcoin", t = this.isPaymentFixed ? {
                        smoothkeyscroll: this.cents2dollars(this.payform.prices),
                        email: this.license.email,
                        payform: this.payform.variation,
                        mixpanel_id: this.mixpanel.id
                    } : {
                        smoothkeyscroll: this.cents2dollars(this.house),
                        charity: this.cents2dollars(this.charity),
                        email: this.license.email,
                        payform: this.payform.variation,
                        mixpanel_id: this.mixpanel.id
                    }, r.post(i + "/coinbase", t).done(function (t) {
                        return function (e) {
                            var n;
                            return t.UI.paying = false, n = "https://coinbase.com/checkouts/" + e, window.open(n, "_blank")
                        }
                    }(this)).fail(function (t) {
                        return function (e, n, r) {
                            return e.responseText && e.responseText.indexOf("<") ? t.UI.paymentMessage = e.responseText : t.UI.paymentMessage = t.statusMessage(e.status), t.UI.paymentError = true, t.UI.paying = false
                        }
                    }(this))
                },
                verifyLicense: function () {
                    return this.UI.verifyingLicense = true, this.UI.verificationFailed = false, r.post(i + "/license/verify", this.license).done(function (t) {
                        return function (e) {
                            return "Valid" === e ? (t.mutate("#section-verify-license", "#section-certificate"), l(2e3, function () {
                                return t.license.verified = true, t.UI.verifyingLicense = false
                            })) : (t.UI.verifyingLicense = false, t.UI.verificationResult = e, t.UI.verificationFailed = true)
                        }
                    }(this)).fail(function (t) {
                        return function (e) {
                            return t.UI.verificationResult = t.statusMessage(e.status), t.UI.verifyingLicense = false, t.UI.verificationFailed = true
                        }
                    }(this))
                },
                statusMessage: function (t) {
                    switch (t) {
                        case 0:
                        case 404:
                            return "The server could not be reached. Make sure you are connected to the internet. If the problem persists try again later or contact support.";
                        case 502:
                            return "An error (502) ocurred when contacting the server. If the problem persists please contact Smooth Key Scroll using the email address at the bottom of the page.";
                        default:
                            return "An error (" + t + ") ocurred when contacting the server. If the problem persists please contact \tsupport@smoothkeyscroll.com"
                    }
                },
                mutate: s.mutate,
                pickRandomProperty: function (t) {
                    var e, n, r, i, o;
                    for (e = 0, n = 0, r = t.length; n < r; n++) i = t[n], Math.random() < 1 / ++e && (o = i);
                    return o
                }
            },
            transitions: {
                slideFade: s.slideFade
            }
        })
    }, {
        "animations.coffee": 2,
        jquery: 8,
        "license/license.html": 4,
        lodash: 9,
        "shared-state.coffee": 5,
        "sliderBackground.coffee": 6,
        "validator.js": 7,
        "velocity-animate": 10,
        "velocity-animate/velocity.ui": 11,
        vue: 81
    }],
    4: [function (t, e, n) {
        e.exports = '<div>\n<hr class="license separator">\n<section id="section-pay-what-you-wantLicense" @mouseenter="mixpanelTrack(\'License Hovered\')">\n\t<div v-show="!license.verified">\n\t\t<div id="section-pay-what-you-want" >\n\t\t\t<div v-show="!isPaymentFixed">\n\t\t\t\t<h1 class="icon-heart big title">Pay What You Want</h1>\n\t\t\t\t<p>\n\t\t\t\t\t\x3c!-- Smooth Key Scroll is pay-what-you-want-software. <br> --\x3e\n\t\t\t\t\t\x3c!-- Your contribution will keep development alive and help increase smoothness even more. --\x3e\n\t\t\t\t\tSupport the development of Smooth Key Scroll and unlock extra features. A personal license will be delivered to your email, and you will be able to scroll without interruptions.\n\t\t\t\t</p>\n\t\t\t\t<ol class="pay-steps">\n\t\t\t\t\t<li class="step" id="stepOne" @click="mixpanelTrack(\'Price Selected\')">\n\t\t\t\t\t\t<h2>1. Name a fair price (in USD)</h2>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<input type="radio" class="overriden radio input" name="price" id="price1" v-model="priceSelector" value="{{payform.prices.one}}">\n\t\t\t\t\t\t\t\t<label class="fake radio ui" for="price1" v-text="payform.prices.one | currency | integer" @click="emptyCustom"></label>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<input type="radio" class="overriden radio input" name="price" id="price2" v-model="priceSelector" value="{{payform.prices.two}}" checked>\n\t\t\t\t\t\t\t\t<label class="fake radio ui" for="price2" v-text="payform.prices.two | currency | integer" @click="emptyCustom"></label>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<input type="radio" class="overriden radio input" name="price" id="price3" v-model="priceSelector" value="{{payform.prices.three}}">\n\t\t\t\t\t\t\t\t<label class="fake radio ui" for="price3" v-text="payform.prices.three | currency | integer" @click="emptyCustom"></label>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<input type="radio" class="overriden radio input" name="price" id="override" v-model="priceSelector" value="custom">\n\t\t\t\t\t\t\t\t<label class="fake radio ui" for="override">Custom</label>\n\t\t\t\t\t\t\t\t<span v-show="priceSelector == \'custom\'" transition>\n\t\t\t\t\t\t\t<input type="text" id="override-price" size="6" v-model="custom | number" placeholder="35" v-valid:numeric v-valid:min="3" v-valid:group="paymentDetails" @change="mixpanelTrack(\'Price Customized\')">\n\t\t\t\t\t\t\t<span class="info-more info-custom" v-show="validator.custom.invalid" transition="delayed-fade">${{cents2dollars(minimum)}} minimum (for beer)</span>\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li class="step" id="stepTwo">\n\t\t\t\t\t\t<h2>2. Split up your contribution</h2>\n\t\t\t\t\t\t<label class="slider-label"> Developers </label>\n\t\t\t\t\t\t<input id="house-slider" class="slider" type="range" step="1" max="100" v-model="percentageHouse" :style="{background:sliderBackground(percentageHouse, 100)}" title="Developer Percentage" @change="mixpanelTrack(\'Split Customized\')"><span id="house-split" v-text="percentageHouse"></span>%\n\t\t\t\t\t\t<br>\n\t\t\t\t\t\t<label id="show-info" class="slider-label icon-triangle" @click="UI.charityInfo = !UI.charityInfo" :class="{open: UI.charityInfo}">Charity</label>\n\t\t\t\t\t\t<input id="charity-slider" class="slider" type="range" step="1" max="100" v-model="percentageCharity" :style="{background:sliderBackground(percentageCharity, 100)}" title="Charity Percentage" @change="mixpanelTrack(\'Split Customized\')"><span id="charity-split" v-text="percentageCharity"></span>%\n\t\t\t\t\t\t<div class="animation-wrapper">\n\t\t\t\t\t\t\t<ul class="info-more" v-show="UI.charityInfo" transition="slideFade">\n\t\t\t\t\t\t\t\tThe charity amount will be evenly divided between these nonprofits:\n\t\t\t\t\t\t\t\t<li>– The <a target="_blank" href="https://www.eff.org/">EFF</a> defends fundamental rights in the digital world. </li>\n\t\t\t\t\t\t\t\t<li>– The <a target="_blank" href="https://www.torproject.org/">Tor Project</a> protects users privacy agains survailance on the Internet. </li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li class="step" id="stepThree">\n\t\t\t\t\t\t<h2>3. Order your license</h2>\n\t\t\t\t\t\t<div class="pay-buttons">\n\t\t\t\t\t\t\t<input type="text" class="pay-email" placeholder="Email (to receive the license)" v-model="license.email" v-valid:required v-valid:email v-valid:group="paymentDetails" @change="mixpanelTrack(\'Email Set\')">\n\t\t\t\t\t\t\t<button class="button button-pay paypal paypal-real" id="paypalButton" @click="pay(\'paypal\')" :disabled="UI.paying">\n\t\t\t\t\t\t\t\t<span class="content button-spinner" v-show="UI.paying == \'paypal\'"></span>\n\t\t\t\t\t\t\t\t<span class="content" v-show="UI.paying != \'paypal\'">PayPal</span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t<button class="button button-pay bitcoin" id="bitcoinButton" @click="pay(\'bitcoin\')" :disabled="UI.paying">\n\t\t\t\t\t\t\t\t<span class="content button-spinner" v-show="UI.paying == \'bitcoin\'"></span>\n\t\t\t\t\t\t\t\t<span class="content" v-show="UI.paying != \'bitcoin\'">Bitcoin</span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\x3c!-- <button class="button googlewallet" id="googlewalletButton" @click="pay(\'googlewallet\')"><span class="content icon" :class="loading: UI.loading==\'googlewallet\'"></span><span class="content">Google Wallet</span></button> --\x3e\n\t\t\t\t\t\t\x3c!-- <button class="button creditcard" id="creditcardButton" @click="pay(\'creditcard\')"><span class="content icon" :class="loading: UI.loading==\'creditcard\'"></span><span class="content">Credit Card</span></button> --\x3e\n\t\t\t\t\t\t<div class="animation-wrapper">\n\t\t\t\t\t\t\t<div class="info-more" v-show="UI.paymentError" v-text="UI.paymentMessage" transition="slideFade"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>\n\t\t\t\t</ol>\n\t\t\t</div>\n\t\t\t<div v-show="isPaymentFixed">\n\t\t\t\t<h1 class="icon-heart big title">Upgrade to Premium</h1>\n\t\t\t\t<div class="pay-form">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\x3c!-- Smooth Key Scroll is pay-what-you-want-software. <br> --\x3e\n\t\t\t\t\t\t\x3c!-- Your contribution will keep development alive and help increase smoothness even more. --\x3e\n\t\t\t\t\t\tSupport the development of Smooth Key Scroll and unlock extra features for just {{payform.prices | currency | removeTrailingZeros}} USD. A personal license will be delivered to your email, and you will be able to scroll without interruptions.\n\t\t\t\t\t</p>\n\t\t\t\t\t\x3c!-- <button class="button googlewallet" id="googlewalletButton" @click="pay(\'googlewallet\')"><span class="content icon" :class="loading: UI.loading==\'googlewallet\'"></span><span class="content">Google Wallet</span></button> --\x3e\n\t\t\t\t\t\x3c!-- <button class="button creditcard" id="creditcardButton" @click="pay(\'creditcard\')"><span class="content icon" :class="loading: UI.loading==\'creditcard\'"></span><span class="content">Credit Card</span></button> --\x3e\n\t\t\t\t\t<div class="pay-buttons">\n\t\t\t\t\t\t<input type="text" class="pay-email" placeholder="Email (to receive the license)" v-model="license.email" v-valid:required v-valid:email v-valid:group="paymentDetails" @change="mixpanelTrack(\'Email Set\')">\n\t\t\t\t\t\t<button class="button button-pay paypal paypal-real" id="paypalButton" @click="pay(\'paypal\')" :disabled="UI.paying">\n\t\t\t\t\t\t\t<span class="content button-spinner" v-show="UI.paying == \'paypal\'"></span>\n\t\t\t\t\t\t\t<span class="content" v-show="UI.paying != \'paypal\'">PayPal</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<button class="button button-pay bitcoin" id="bitcoinButton" @click="pay(\'bitcoin\')" :disabled="UI.paying">\n\t\t\t\t\t\t\t<span class="content button-spinner" v-show="UI.paying == \'bitcoin\'"></span>\n\t\t\t\t\t\t\t<span class="content" v-show="UI.paying != \'bitcoin\'">Bitcoin</span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="animation-wrapper">\n\t\t\t\t\t\t<div class="info-more" v-show="UI.paymentError" v-text="UI.paymentMessage" transition="slideFade"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="right">\n\t\t\t\t<a href="#license" id="show-license" @click="mutate(\'#section-pay-what-you-want\', \'#section-verify-license\')">Already have a license?</a>\n\t\t\t</div>\n\t\t\t<form id="paypalForm" action="https://www.paypal.com/cgi-bin/webscr?pageState=billing" method="post" target="_blank">\n\t\t\t\t<input type="hidden" name="cmd" value="_cart">\n\t\t\t\t<input type="hidden" name="upload" value="1">\n\t\t\t\t<input type="hidden" name="business" value="S77UX6HX9CFCA">\n\t\t\t\t<div v-if="!isPaymentFixed">\n\t\t\t\t\t<input type="hidden" name="item_name_1" value="Smooth Key Scroll License">\n\t\t\t\t\t<input type="hidden" name="amount_1" v-model="house | currency">\n\t\t\t\t\t<input type="hidden" name="item_name_2" value="Charity">\n\t\t\t\t\t<input type="hidden" name="amount_2" v-model="charity | currency">\n\t\t\t\t</div>\n\t\t\t\t<div v-if="isPaymentFixed">\n\t\t\t\t\t<input type="hidden" name="item_name_1" value="Smooth Key Scroll License">\n\t\t\t\t\t<input type="hidden" name="amount_1" v-model="payform.prices | currency">\n\t\t\t\t</div>\n\t\t\t\t<input type="hidden" name="pageState" value="billing">\n\t\t\t\t<input type="hidden" name="no_shipping" value="1">\n\t\t\t\t<input type="hidden" name="custom" v-model="paypalCustom">\n\t\t\t\t<input type="hidden" name="email" v-model="license.email">\n\t\t\t\t<input type="hidden" name="notify_url" value="https://smoothkeyscroll.herokuapp.com/paypal/confirm">\n\t\t\t\t<input type="hidden" name="return" value="browser-extension://gphmhpfbknciemgfnfhjapilmcaecljh/options.html#license">\n\t\t\t\t<input type="hidden" name="no_note" value="1">\n\t\t\t\t<input type="hidden" name="paymentaction" value="sale">\n\t\t\t</form>\n\t\t</div>\n\t\t<div id="section-verify-license">\n\t\t\t<h1>Enter your license</h1>\n\t\t\t<div>\n\t\t\t\t<span class="license-data" id="license-data">\n\t\t\t\t<div>\n\t\t\t\t\t<input type="text" id="license-email" class="license-textbox" placeholder="Email" v-model="license.email" v-valid:required v-valid:email :disabled="UI.verifyingLicense" lazy>\n\t\t\t\t</div>\n\t\t\t\t<div>\n\t\t\t\t\t<input type="text" id="license-key" class="license-textbox" placeholder="License Key" v-model="license.key" v-valid:required :disabled="UI.verifyingLicense" lazy>\n\t\t\t\t</div>\n\t\t\t</span>\n\t\t\t\t<button id="verifyLicense" class="button button-verify" @click="verifyLicense" :disabled="UI.verifyingLicense">\n\t\t\t\t\t<span class="content button-spinner" v-show="UI.verifyingLicense"></span>\n\t\t\t\t\t<span class="content" v-show="!UI.verifyingLicense">Submit</span>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t<div class="animation-wrapper">\n\t\t\t\t<div class="info-more" v-show="UI.verificationFailed" v-text="UI.verificationResult" transition="slideFade"></div>\n\t\t\t</div>\n\t\t\t<div class="right">\n\t\t\t\t<a href="#pay-what-you-want" id="show-pay" @click="mutate(\'#section-verify-license\',\'#section-pay-what-you-want\')">Don\'t have a license yet?</a>\n\t\t\t</div>\n\t\t</div>\n\t\t\x3c!-- <div class="info-more" v-show="UI.verificationResult == \'valid\'" transition="slideFade">License validated. Thank you!</div> --\x3e\n\t</div>\n\t<div id="section-certificate" class="certificate" v-show="license.verified">\n\t\t<div class="certificate-head">\n\t\t\tLicense Certificate\n\t\t</div>\n\t\t<div class="certificate-body">\n\t\t\t\x3c!-- <div class="certificate-left"> --\x3e\n\t\t\t<div class="certificate-section">\n\t\t\t\t<h1 class="certificate-title">Email</h1>\n\t\t\t\t<p class="certificate-detail" v-text="license.email"></p>\n\t\t\t</div>\n\t\t\t<div class="certificate-section">\n\t\t\t\t<h1 class="certificate-title">Key</h1>\n\t\t\t\t<p class="certificate-detail" v-text="license.key"></p>\n\t\t\t</div>\n\t\t\t<span class="stamp animated zoomIn"></span>\n\t\t\t\x3c!-- </div> --\x3e\n\t\t\t\x3c!-- <div class="certificate-right"></div> --\x3e\n\t\t</div>\n\t\t<b class="certificate-corner certificate-corner-top-left"></b>\n\t\t<b class="certificate-corner certificate-corner-top-right"></b>\n\t\t<b class="certificate-corner certificate-corner-bottom-left"></b>\n\t\t<b class="certificate-corner certificate-corner-bottom-right"></b>\n\t</div>\n</section>\n</div>\n'
    }, {}],
    5: [function (t, e, n) {
        e.exports.license = {
            email: "",
            key: "",
            verified: false
        }, e.exports.mixpanel = {
            tracked: {},
            id: "",
            notificationCount: -1,
            scrollCount: -1
        }
    }, {}],
    6: [function (t, e, n) {
        e.exports = function (t, e) {
            var n;
            return "-webkit-gradient(linear, left top, right top, color-stop(" + (n = t / e) + ", rgb(156, 207, 224)), color-stop(" + n + ", #ddd))"
        }
    }, {}],
    7: [function (t, e, n) {
        ! function () {
            var t = function (t, e) {
                var n = t.util;
                n.validators = {
                    required: function (t) {
                        return "boolean" == typeof t ? t : !(null == t || 0 == t.length)
                    },
                    numeric: function (t) {
                        return /^-?(?:0$0(?=\d*\.)|[1-9]|0)\d*(\.\d+)?$/.test(t)
                    },
                    integer: function (t) {
                        return /^(-?[1-9]\d*|0)$/.test(t)
                    },
                    digits: function (t) {
                        return /^[\d() \.\:\-\+#]+$/.test(t)
                    },
                    alpha: function (t) {
                        return /^[a-zA-Z]+$/.test(t)
                    },
                    alphaNum: function (t) {
                        return !/\W/.test(t)
                    },
                    email: function (t) {
                        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t)
                    },
                    url: function (t) {
                        return /^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i.test(t)
                    },
                    minLength: function (t, e) {
                        return t && t.length && t.length >= +e
                    },
                    maxLength: function (t, e) {
                        return t && t.length && t.length <= +e
                    },
                    length: function (t) {
                        return t && t.length == +arg
                    },
                    min: function (t, e) {
                        return t >= +e
                    },
                    max: function (t, e) {
                        return t <= +e
                    },
                    pattern: function (t, e) {
                        var n = e.match(new RegExp("^/(.*?)/([gimy]*)$"));
                        return new RegExp(n[1], n[2]).test(t)
                    }
                };
                var r = function (t, e, n) {
                    function r(t) {
                        for (var e in t) t.hasOwnProperty(e) && ("object" != typeof t[e] || t[e]._validate ? (!n || t[e]._validate.group && n == t[e]._validate.group) && i.push(t[e]) : r(t[e]))
                    }
                    var i = [];
                    return r(e, n), "valid" == t ? i.every(function (t) {
                        return t.valid
                    }) : "modified" == t ? i.some(function (t) {
                        return t.modified
                    }) : void 0
                };
                t.directive("valid", {
                    priority: 801,
                    bind: function () {
                        var e, i = this.el.getAttribute(t.config.prefix + "model"),
                            o = this.vm;
                        i ? i = i.split("|")[0].trim() : (i = this.el.getAttribute("model"), this.el.removeAttribute("model")), o.$valid || (o.$valid = function (t) {
                            return o.$emit("validate"), o.$broadcast("validate"), r("valid", o.validator, t)
                        }, o.$modified = function (t) {
                            return r("modified", o.validator, t)
                        }), i && (this._model = i, o.$get("validator") || this.vm.$set("validator", {}), i = i.replace(/\$index/, this.vm.$index), i = i.replace(/\$value/, this.vm.$value), i = i.replace(/\$key/, this.vm.$key), o.$get("validator." + i) || o.$set("validator." + i, {
                            _validate: {},
                            valid: true,
                            modified: false,
                            touched: false,
                            invalid: false
                        }), this._onValidate = o.$on("validate", function () {
                            this.validate(i)
                        }.bind(this)), this._onBlur = function () {
                            this.el.classList.add("touched"), o.$set("validator." + i + ".touched", true)
                        }.bind(this), n.on(this.el, "blur", this._onBlur), t.nextTick(function () {
                            e = this.vm.$get(i), this._onChange = o.$watch(i, function (t) {
                                o.$set("validator." + i + ".modified", t !== e), this.validate(i)
                            }.bind(this), true)
                        }.bind(this)), o.$set("validator." + i + "._validate." + (this.arg || this.expression), this.expression), "group" != this.arg && o.$set("validator." + i + "." + (this.arg || this.expression), false))
                    },
                    validate: function (t) {
                        var e = this.vm,
                            r = e.$get(t),
                            i = this.vm.$get("validator." + t + "._validate"),
                            o = true;
                        this.el.classList.contains("skip-validation") || Object.keys(i).forEach(function (i) {
                            if ("group" != i) {
                                if (!n.validators[i]) throw new Error("missing validator for " + i);
                                var a = e.$get("validator." + t + "._validate." + i),
                                    s = "required" != i && (null == r || 0 == r.length) || n.validators[i].call(this, r, a);
                                e.$set("validator." + t + "." + i, s), o && !s && (o = false)
                            }
                        }.bind(this)), e.$set("validator." + t + ".valid", o), e.$set("validator." + t + ".invalid", e.$get("validator." + t + ".modified") && !o), this.el.classList.remove("valid"), this.el.classList.remove("invalid"), o ? this.el.classList.add("valid") : this.el.classList.add("invalid")
                    },
                    unbind: function () {
                        this.vm.$get("validator." + this._model) && this.vm.$delete("validator." + this._model), this._onValidate && "function" == typeof this._onValidate && this._onValidate()
                    }
                })
            };
            "object" == typeof n ? e.exports = t : "function" == typeof define && define.amd ? define([], function () {
                return t
            }) : window.Vue && Vue.use(t)
        }()
    }, {}],
    8: [function (t, e, n) {
        ! function (t, n) {
            "use strict";
            "object" == typeof e && "object" == typeof e.exports ? e.exports = t.document ? n(t, true) : function (t) {
                if (!t.document) throw new Error("jQuery requires a window with a document");
                return n(t)
            } : n(t)
        }("undefined" != typeof window ? window : this, function (t, e) {
            "use strict";

            function n(t, e, n) {
                e = e || at;
                var r, i = e.createElement("script");
                if (i.text = t, n)
                    for (r in xt) n[r] && (i[r] = n[r]);
                e.head.appendChild(i).parentNode.removeChild(i)
            }

            function r(t) {
                return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? pt[ht.call(t)] || "object" : typeof t
            }

            function i(t) {
                var e = !!t && "length" in t && t.length,
                    n = r(t);
                return !yt(t) && !bt(t) && ("array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
            }

            function o(t, e) {
                return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
            }

            function a(t, e, n) {
                return yt(e) ? _t.grep(t, function (t, r) {
                    return !!e.call(t, r, t) !== n
                }) : e.nodeType ? _t.grep(t, function (t) {
                    return t === e !== n
                }) : "string" != typeof e ? _t.grep(t, function (t) {
                    return ft.call(e, t) > -1 !== n
                }) : _t.filter(e, t, n)
            }

            function s(t, e) {
                for (;
                    (t = t[e]) && 1 !== t.nodeType;);
                return t
            }

            function l(t) {
                var e = {};
                return _t.each(t.match(jt) || [], function (t, n) {
                    e[n] = true
                }), e
            }

            function u(t) {
                return t
            }

            function c(t) {
                throw t
            }

            function f(t, e, n, r) {
                var i;
                try {
                    t && yt(i = t.promise) ? i.call(t).done(e).fail(n) : t && yt(i = t.then) ? i.call(t, e, n) : e.apply(void 0, [t].slice(r))
                } catch (t) {
                    n.apply(void 0, [t])
                }
            }

            function p() {
                at.removeEventListener("DOMContentLoaded", p), t.removeEventListener("load", p), _t.ready()
            }

            function h(t, e) {
                return e.toUpperCase()
            }

            function d(t) {
                return t.replace(Ft, "ms-").replace(Lt, h)
            }

            function v() {
                this.expando = _t.expando + v.uid++
            }

            function g(t) {
                return "true" === t || "false" !== t && ("null" === t ? null : t === +t + "" ? +t : Ht.test(t) ? JSON.parse(t) : t)
            }

            function m(t, e, n) {
                var r;
                if (void 0 === n && 1 === t.nodeType)
                    if (r = "data-" + e.replace(Mt, "-$&").toLowerCase(), "string" == typeof (n = t.getAttribute(r))) {
                        try {
                            n = g(n)
                        } catch (t) {}
                        qt.set(t, e, n)
                    } else n = void 0;
                return n
            }

            function y(t, e, n, r) {
                var i, o, a = 20,
                    s = r ? function () {
                        return r.cur()
                    } : function () {
                        return _t.css(t, e, "")
                    },
                    l = s(),
                    u = n && n[3] || (_t.cssNumber[e] ? "" : "px"),
                    c = (_t.cssNumber[e] || "px" !== u && +l) && Ut.exec(_t.css(t, e));
                if (c && c[3] !== u) {
                    for (l /= 2, u = u || c[3], c = +l || 1; a--;) _t.style(t, e, c + u), (1 - o) * (1 - (o = s() / l || .5)) <= 0 && (a = 0), c /= o;
                    c *= 2, _t.style(t, e, c + u), n = n || []
                }
                return n && (c = +c || +l || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = u, r.start = c, r.end = i)), i
            }

            function b(t) {
                var e, n = t.ownerDocument,
                    r = t.nodeName,
                    i = zt[r];
                return i || (e = n.body.appendChild(n.createElement(r)), i = _t.css(e, "display"), e.parentNode.removeChild(e), "none" === i && (i = "block"), zt[r] = i, i)
            }

            function x(t, e) {
                for (var n, r, i = [], o = 0, a = t.length; o < a; o++) r = t[o], r.style && (n = r.style.display, e ? ("none" === n && (i[o] = Vt.get(r, "display") || null, i[o] || (r.style.display = "")), "" === r.style.display && Xt(r) && (i[o] = b(r))) : "none" !== n && (i[o] = "none", Vt.set(r, "display", n)));
                for (o = 0; o < a; o++) null != i[o] && (t[o].style.display = i[o]);
                return t
            }

            function _(t, e) {
                var n;
                return n = void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e || "*") : void 0 !== t.querySelectorAll ? t.querySelectorAll(e || "*") : [], void 0 === e || e && o(t, e) ? _t.merge([t], n) : n
            }

            function w(t, e) {
                for (var n = 0, r = t.length; n < r; n++) Vt.set(t[n], "globalEval", !e || Vt.get(e[n], "globalEval"))
            }

            function C(t, e, n, i, o) {
                for (var a, s, l, u, c, f, p = e.createDocumentFragment(), h = [], d = 0, v = t.length; d < v; d++)
                    if ((a = t[d]) || 0 === a)
                        if ("object" === r(a)) _t.merge(h, a.nodeType ? [a] : a);
                        else if (Jt.test(a)) {
                    for (s = s || p.appendChild(e.createElement("div")), l = (Qt.exec(a) || ["", ""])[1].toLowerCase(), u = Kt[l] || Kt._default, s.innerHTML = u[1] + _t.htmlPrefilter(a) + u[2], f = u[0]; f--;) s = s.lastChild;
                    _t.merge(h, s.childNodes), s = p.firstChild, s.textContent = ""
                } else h.push(e.createTextNode(a));
                for (p.textContent = "", d = 0; a = h[d++];)
                    if (i && _t.inArray(a, i) > -1) o && o.push(a);
                    else if (c = _t.contains(a.ownerDocument, a), s = _(p.appendChild(a), "script"), c && w(s), n)
                    for (f = 0; a = s[f++];) Gt.test(a.type || "") && n.push(a);
                return p
            }

            function k() {
                return true
            }

            function A() {
                return false
            }

            function T() {
                try {
                    return at.activeElement
                } catch (t) {}
            }

            function S(t, e, n, r, i, o) {
                var a, s;
                if ("object" == typeof e) {
                    "string" != typeof n && (r = r || n, n = void 0);
                    for (s in e) S(t, s, n, r, e[s], o);
                    return t
                }
                if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), false === i) i = A;
                else if (!i) return t;
                return 1 === o && (a = i, i = function (t) {
                    return _t().off(t), a.apply(this, arguments)
                }, i.guid = a.guid || (a.guid = _t.guid++)), t.each(function () {
                    _t.event.add(this, e, i, r, n)
                })
            }

            function $(t, e) {
                return o(t, "table") && o(11 !== e.nodeType ? e : e.firstChild, "tr") ? _t(t).children("tbody")[0] || t : t
            }

            function O(t) {
                return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
            }

            function P(t) {
                return "true/" === (t.type || "").slice(0, 5) ? t.type = t.type.slice(5) : t.removeAttribute("type"), t
            }

            function E(t, e) {
                var n, r, i, o, a, s, l, u;
                if (1 === e.nodeType) {
                    if (Vt.hasData(t) && (o = Vt.access(t), a = Vt.set(e, o), u = o.events)) {
                        delete a.handle, a.events = {};
                        for (i in u)
                            for (n = 0, r = u[i].length; n < r; n++) _t.event.add(e, i, u[i][n])
                    }
                    qt.hasData(t) && (s = qt.access(t), l = _t.extend({}, s), qt.set(e, l))
                }
            }

            function j(t, e) {
                var n = e.nodeName.toLowerCase();
                "input" === n && Zt.test(t.type) ? e.checked = t.checked : "input" !== n && "textarea" !== n || (e.defaultValue = t.defaultValue)
            }

            function D(t, e, r, i) {
                e = ut.apply([], e);
                var o, a, s, l, u, c, f = 0,
                    p = t.length,
                    h = p - 1,
                    d = e[0],
                    v = yt(d);
                if (v || p > 1 && "string" == typeof d && !mt.checkClone && ae.test(d)) return t.each(function (n) {
                    var o = t.eq(n);
                    v && (e[0] = d.call(this, n, o.html())), D(o, e, r, i)
                });
                if (p && (o = C(e, t[0].ownerDocument, false, t, i), a = o.firstChild, 1 === o.childNodes.length && (o = a), a || i)) {
                    for (s = _t.map(_(o, "script"), O), l = s.length; f < p; f++) u = o, f !== h && (u = _t.clone(u, true, true), l && _t.merge(s, _(u, "script"))), r.call(t[f], u, f);
                    if (l)
                        for (c = s[s.length - 1].ownerDocument, _t.map(s, P), f = 0; f < l; f++) u = s[f], Gt.test(u.type || "") && !Vt.access(u, "globalEval") && _t.contains(c, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? _t._evalUrl && _t._evalUrl(u.src) : n(u.textContent.replace(se, ""), c, u))
                }
                return t
            }

            function N(t, e, n) {
                for (var r, i = e ? _t.filter(e, t) : t, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || _t.cleanData(_(r)), r.parentNode && (n && _t.contains(r.ownerDocument, r) && w(_(r, "script")), r.parentNode.removeChild(r));
                return t
            }

            function I(t, e, n) {
                var r, i, o, a, s = t.style;
                return n = n || ue(t), n && (a = n.getPropertyValue(e) || n[e], "" !== a || _t.contains(t.ownerDocument, t) || (a = _t.style(t, e)), !mt.pixelBoxStyles() && le.test(a) && ce.test(e) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), void 0 !== a ? a + "" : a
            }

            function F(t, e) {
                return {
                    get: function () {
                        return t() ? void delete this.get : (this.get = e).apply(this, arguments)
                    }
                }
            }

            function L(t) {
                if (t in ge) return t;
                for (var e = t[0].toUpperCase() + t.slice(1), n = ve.length; n--;)
                    if ((t = ve[n] + e) in ge) return t
            }

            function R(t) {
                var e = _t.cssProps[t];
                return e || (e = _t.cssProps[t] = L(t) || t), e
            }

            function V(t, e, n) {
                var r = Ut.exec(e);
                return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : e
            }

            function q(t, e, n, r, i, o) {
                var a = "width" === e ? 1 : 0,
                    s = 0,
                    l = 0;
                if (n === (r ? "border" : "content")) return 0;
                for (; a < 4; a += 2) "margin" === n && (l += _t.css(t, n + Wt[a], true, i)), r ? ("content" === n && (l -= _t.css(t, "padding" + Wt[a], true, i)), "margin" !== n && (l -= _t.css(t, "border" + Wt[a] + "Width", true, i))) : (l += _t.css(t, "padding" + Wt[a], true, i), "padding" !== n ? l += _t.css(t, "border" + Wt[a] + "Width", true, i) : s += _t.css(t, "border" + Wt[a] + "Width", true, i));
                return !r && o >= 0 && (l += Math.max(0, Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - o - l - s - .5))), l
            }

            function H(t, e, n) {
                var r = ue(t),
                    i = I(t, e, r),
                    o = "border-box" === _t.css(t, "boxSizing", false, r),
                    a = o;
                if (le.test(i)) {
                    if (!n) return i;
                    i = "auto"
                }
                return a = a && (mt.boxSizingReliable() || i === t.style[e]), ("auto" === i || !parseFloat(i) && "inline" === _t.css(t, "display", false, r)) && (i = t["offset" + e[0].toUpperCase() + e.slice(1)], a = true), (i = parseFloat(i) || 0) + q(t, e, n || (o ? "border" : "content"), a, r, i) + "px"
            }

            function M(t, e, n, r, i) {
                return new M.prototype.init(t, e, n, r, i)
            }

            function B() {
                ye && (false === at.hidden && t.requestAnimationFrame ? t.requestAnimationFrame(B) : t.setTimeout(B, _t.fx.interval), _t.fx.tick())
            }

            function U() {
                return t.setTimeout(function () {
                    me = void 0
                }), me = Date.now()
            }

            function W(t, e) {
                var n, r = 0,
                    i = {
                        height: t
                    };
                for (e = e ? 1 : 0; r < 4; r += 2 - e) n = Wt[r], i["margin" + n] = i["padding" + n] = t;
                return e && (i.opacity = i.width = t), i
            }

            function X(t, e, n) {
                for (var r, i = (Z.tweeners[e] || []).concat(Z.tweeners["*"]), o = 0, a = i.length; o < a; o++)
                    if (r = i[o].call(n, e, t)) return r
            }

            function Y(t, e, n) {
                var r, i, o, a, s, l, u, c, f = "width" in e || "height" in e,
                    p = this,
                    h = {},
                    d = t.style,
                    v = t.nodeType && Xt(t),
                    g = Vt.get(t, "fxshow");
                n.queue || (a = _t._queueHooks(t, "fx"), null == a.unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function () {
                    a.unqueued || s()
                }), a.unqueued++, p.always(function () {
                    p.always(function () {
                        a.unqueued--, _t.queue(t, "fx").length || a.empty.fire()
                    })
                }));
                for (r in e)
                    if (i = e[r], be.test(i)) {
                        if (delete e[r], o = o || "toggle" === i, i === (v ? "hide" : "show")) {
                            if ("show" !== i || !g || void 0 === g[r]) continue;
                            v = true
                        }
                        h[r] = g && g[r] || _t.style(t, r)
                    }
                if ((l = !_t.isEmptyObject(e)) || !_t.isEmptyObject(h)) {
                    f && 1 === t.nodeType && (n.overflow = [d.overflow, d.overflowX, d.overflowY], u = g && g.display, null == u && (u = Vt.get(t, "display")), c = _t.css(t, "display"), "none" === c && (u ? c = u : (x([t], true), u = t.style.display || u, c = _t.css(t, "display"), x([t]))), ("inline" === c || "inline-block" === c && null != u) && "none" === _t.css(t, "float") && (l || (p.done(function () {
                        d.display = u
                    }), null == u && (c = d.display, u = "none" === c ? "" : c)), d.display = "inline-block")), n.overflow && (d.overflow = "hidden", p.always(function () {
                        d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
                    })), l = false;
                    for (r in h) l || (g ? "hidden" in g && (v = g.hidden) : g = Vt.access(t, "fxshow", {
                        display: u
                    }), o && (g.hidden = !v), v && x([t], true), p.done(function () {
                        v || x([t]), Vt.remove(t, "fxshow");
                        for (r in h) _t.style(t, r, h[r])
                    })), l = X(v ? g[r] : 0, r, p), r in g || (g[r] = l.start, v && (l.end = l.start, l.start = 0))
                }
            }

            function z(t, e) {
                var n, r, i, o, a;
                for (n in t)
                    if (r = d(n), i = e[r], o = t[n], Array.isArray(o) && (i = o[1], o = t[n] = o[0]), n !== r && (t[r] = o, delete t[n]), (a = _t.cssHooks[r]) && "expand" in a) {
                        o = a.expand(o), delete t[r];
                        for (n in o) n in t || (t[n] = o[n], e[n] = i)
                    } else e[r] = i
            }

            function Z(t, e, n) {
                var r, i, o = 0,
                    a = Z.prefilters.length,
                    s = _t.Deferred().always(function () {
                        delete l.elem
                    }),
                    l = function () {
                        if (i) return false;
                        for (var e = me || U(), n = Math.max(0, u.startTime + u.duration - e), r = n / u.duration || 0, o = 1 - r, a = 0, l = u.tweens.length; a < l; a++) u.tweens[a].run(o);
                        return s.notifyWith(t, [u, o, n]), o < 1 && l ? n : (l || s.notifyWith(t, [u, 1, 0]), s.resolveWith(t, [u]), false)
                    },
                    u = s.promise({
                        elem: t,
                        props: _t.extend({}, e),
                        opts: _t.extend(true, {
                            specialEasing: {},
                            easing: _t.easing._default
                        }, n),
                        originalProperties: e,
                        originalOptions: n,
                        startTime: me || U(),
                        duration: n.duration,
                        tweens: [],
                        createTween: function (e, n) {
                            var r = _t.Tween(t, u.opts, e, n, u.opts.specialEasing[e] || u.opts.easing);
                            return u.tweens.push(r), r
                        },
                        stop: function (e) {
                            var n = 0,
                                r = e ? u.tweens.length : 0;
                            if (i) return this;
                            for (i = true; n < r; n++) u.tweens[n].run(1);
                            return e ? (s.notifyWith(t, [u, 1, 0]), s.resolveWith(t, [u, e])) : s.rejectWith(t, [u, e]), this
                        }
                    }),
                    c = u.props;
                for (z(c, u.opts.specialEasing); o < a; o++)
                    if (r = Z.prefilters[o].call(u, t, c, u.opts)) return yt(r.stop) && (_t._queueHooks(u.elem, u.opts.queue).stop = r.stop.bind(r)), r;
                return _t.map(c, X, u), yt(u.opts.start) && u.opts.start.call(t, u), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always), _t.fx.timer(_t.extend(l, {
                    elem: t,
                    anim: u,
                    queue: u.opts.queue
                })), u
            }

            function Q(t) {
                return (t.match(jt) || []).join(" ")
            }

            function G(t) {
                return t.getAttribute && t.getAttribute("class") || ""
            }

            function K(t) {
                return Array.isArray(t) ? t : "string" == typeof t ? t.match(jt) || [] : []
            }

            function J(t, e, n, i) {
                var o;
                if (Array.isArray(e)) _t.each(e, function (e, r) {
                    n || Ee.test(t) ? i(t, r) : J(t + "[" + ("object" == typeof r && null != r ? e : "") + "]", r, n, i)
                });
                else if (n || "object" !== r(e)) i(t, e);
                else
                    for (o in e) J(t + "[" + o + "]", e[o], n, i)
            }

            function tt(t) {
                return function (e, n) {
                    "string" != typeof e && (n = e, e = "*");
                    var r, i = 0,
                        o = e.toLowerCase().match(jt) || [];
                    if (yt(n))
                        for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (t[r] = t[r] || []).unshift(n)) : (t[r] = t[r] || []).push(n)
                }
            }

            function et(t, e, n, r) {
                function i(s) {
                    var l;
                    return o[s] = true, _t.each(t[s] || [], function (t, s) {
                        var u = s(e, n, r);
                        return "string" != typeof u || a || o[u] ? a ? !(l = u) : void 0 : (e.dataTypes.unshift(u), i(u), false)
                    }), l
                }
                var o = {},
                    a = t === Be;
                return i(e.dataTypes[0]) || !o["*"] && i("*")
            }

            function nt(t, e) {
                var n, r, i = _t.ajaxSettings.flatOptions || {};
                for (n in e) void 0 !== e[n] && ((i[n] ? t : r || (r = {}))[n] = e[n]);
                return r && _t.extend(true, t, r), t
            }

            function rt(t, e, n) {
                for (var r, i, o, a, s = t.contents, l = t.dataTypes;
                    "*" === l[0];) l.shift(), void 0 === r && (r = t.mimeType || e.getResponseHeader("Content-Type"));
                if (r)
                    for (i in s)
                        if (s[i] && s[i].test(r)) {
                            l.unshift(i);
                            break
                        }
                if (l[0] in n) o = l[0];
                else {
                    for (i in n) {
                        if (!l[0] || t.converters[i + " " + l[0]]) {
                            o = i;
                            break
                        }
                        a || (a = i)
                    }
                    o = o || a
                }
                if (o) return o !== l[0] && l.unshift(o), n[o]
            }

            function it(t, e, n, r) {
                var i, o, a, s, l, u = {},
                    c = t.dataTypes.slice();
                if (c[1])
                    for (a in t.converters) u[a.toLowerCase()] = t.converters[a];
                for (o = c.shift(); o;)
                    if (t.responseFields[o] && (n[t.responseFields[o]] = e), !l && r && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = o, o = c.shift())
                        if ("*" === o) o = l;
                        else if ("*" !== l && l !== o) {
                    if (!(a = u[l + " " + o] || u["* " + o]))
                        for (i in u)
                            if (s = i.split(" "), s[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                                true === a ? a = u[i] : true !== u[i] && (o = s[0], c.unshift(s[1]));
                                break
                            }
                    if (true !== a)
                        if (a && t.throws) e = a(e);
                        else try {
                            e = a(e)
                        } catch (t) {
                            return {
                                state: "parsererror",
                                error: a ? t : "No conversion from " + l + " to " + o
                            }
                        }
                }
                return {
                    state: "success",
                    data: e
                }
            }
            var ot = [],
                at = t.document,
                st = Object.getPrototypeOf,
                lt = ot.slice,
                ut = ot.concat,
                ct = ot.push,
                ft = ot.indexOf,
                pt = {},
                ht = pt.toString,
                dt = pt.hasOwnProperty,
                vt = dt.toString,
                gt = vt.call(Object),
                mt = {},
                yt = function (t) {
                    return "function" == typeof t && "number" != typeof t.nodeType
                },
                bt = function (t) {
                    return null != t && t === t.window
                },
                xt = {
                    type: true,
                    src: true,
                    noModule: true
                },
                _t = function (t, e) {
                    return new _t.fn.init(t, e)
                },
                wt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            _t.fn = _t.prototype = {
                jquery: "3.3.1",
                constructor: _t,
                length: 0,
                toArray: function () {
                    return lt.call(this)
                },
                get: function (t) {
                    return null == t ? lt.call(this) : t < 0 ? this[t + this.length] : this[t]
                },
                pushStack: function (t) {
                    var e = _t.merge(this.constructor(), t);
                    return e.prevObject = this, e
                },
                each: function (t) {
                    return _t.each(this, t)
                },
                map: function (t) {
                    return this.pushStack(_t.map(this, function (e, n) {
                        return t.call(e, n, e)
                    }))
                },
                slice: function () {
                    return this.pushStack(lt.apply(this, arguments))
                },
                first: function () {
                    return this.eq(0)
                },
                last: function () {
                    return this.eq(-1)
                },
                eq: function (t) {
                    var e = this.length,
                        n = +t + (t < 0 ? e : 0);
                    return this.pushStack(n >= 0 && n < e ? [this[n]] : [])
                },
                end: function () {
                    return this.prevObject || this.constructor()
                },
                push: ct,
                sort: ot.sort,
                splice: ot.splice
            }, _t.extend = _t.fn.extend = function () {
                var t, e, n, r, i, o, a = arguments[0] || {},
                    s = 1,
                    l = arguments.length,
                    u = false;
                for ("boolean" == typeof a && (u = a, a = arguments[s] || {}, s++), "object" == typeof a || yt(a) || (a = {}), s === l && (a = this, s--); s < l; s++)
                    if (null != (t = arguments[s]))
                        for (e in t) n = a[e], r = t[e], a !== r && (u && r && (_t.isPlainObject(r) || (i = Array.isArray(r))) ? (i ? (i = false, o = n && Array.isArray(n) ? n : []) : o = n && _t.isPlainObject(n) ? n : {}, a[e] = _t.extend(u, o, r)) : void 0 !== r && (a[e] = r));
                return a
            }, _t.extend({
                expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""),
                isReady: true,
                error: function (t) {
                    throw new Error(t)
                },
                noop: function () {},
                isPlainObject: function (t) {
                    var e, n;
                    return !(!t || "[object Object]" !== ht.call(t)) && (!(e = st(t)) || "function" == typeof (n = dt.call(e, "constructor") && e.constructor) && vt.call(n) === gt)
                },
                isEmptyObject: function (t) {
                    var e;
                    for (e in t) return false;
                    return true
                },
                globalEval: function (t) {
                    n(t)
                },
                each: function (t, e) {
                    var n, r = 0;
                    if (i(t))
                        for (n = t.length; r < n && false !== e.call(t[r], r, t[r]); r++);
                    else
                        for (r in t)
                            if (false === e.call(t[r], r, t[r])) break;
                    return t
                },
                trim: function (t) {
                    return null == t ? "" : (t + "").replace(wt, "")
                },
                makeArray: function (t, e) {
                    var n = e || [];
                    return null != t && (i(Object(t)) ? _t.merge(n, "string" == typeof t ? [t] : t) : ct.call(n, t)), n
                },
                inArray: function (t, e, n) {
                    return null == e ? -1 : ft.call(e, t, n)
                },
                merge: function (t, e) {
                    for (var n = +e.length, r = 0, i = t.length; r < n; r++) t[i++] = e[r];
                    return t.length = i, t
                },
                grep: function (t, e, n) {
                    for (var r = [], i = 0, o = t.length, a = !n; i < o; i++) !e(t[i], i) !== a && r.push(t[i]);
                    return r
                },
                map: function (t, e, n) {
                    var r, o, a = 0,
                        s = [];
                    if (i(t))
                        for (r = t.length; a < r; a++) null != (o = e(t[a], a, n)) && s.push(o);
                    else
                        for (a in t) null != (o = e(t[a], a, n)) && s.push(o);
                    return ut.apply([], s)
                },
                guid: 1,
                support: mt
            }), "function" == typeof Symbol && (_t.fn[Symbol.iterator] = ot[Symbol.iterator]), _t.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (t, e) {
                pt["[object " + e + "]"] = e.toLowerCase()
            });
            var Ct = function (t) {
                function e(t, e, n, r) {
                    var i, o, a, s, l, c, p, h = e && e.ownerDocument,
                        d = e ? e.nodeType : 9;
                    if (n = n || [], "string" != typeof t || !t || 1 !== d && 9 !== d && 11 !== d) return n;
                    if (!r && ((e ? e.ownerDocument || e : V) !== E && P(e), e = e || E, D)) {
                        if (11 !== d && (l = vt.exec(t)))
                            if (i = l[1]) {
                                if (9 === d) {
                                    if (!(a = e.getElementById(i))) return n;
                                    if (a.id === i) return n.push(a), n
                                } else if (h && (a = h.getElementById(i)) && L(e, a) && a.id === i) return n.push(a), n
                            } else {
                                if (l[2]) return Q.apply(n, e.getElementsByTagName(t)), n;
                                if ((i = l[3]) && x.getElementsByClassName && e.getElementsByClassName) return Q.apply(n, e.getElementsByClassName(i)), n
                            }
                        if (x.qsa && !U[t + " "] && (!N || !N.test(t))) {
                            if (1 !== d) h = e, p = t;
                            else if ("object" !== e.nodeName.toLowerCase()) {
                                for ((s = e.getAttribute("id")) ? s = s.replace(bt, xt) : e.setAttribute("id", s = R), c = k(t), o = c.length; o--;) c[o] = "#" + s + " " + f(c[o]);
                                p = c.join(","), h = gt.test(t) && u(e.parentNode) || e
                            }
                            if (p) try {
                                return Q.apply(n, h.querySelectorAll(p)), n
                            } catch (t) {} finally {
                                s === R && e.removeAttribute("id")
                            }
                        }
                    }
                    return T(t.replace(ot, "$1"), e, n, r)
                }

                function n() {
                    function t(n, r) {
                        return e.push(n + " ") > _.cacheLength && delete t[e.shift()], t[n + " "] = r
                    }
                    var e = [];
                    return t
                }

                function r(t) {
                    return t[R] = true, t
                }

                function i(t) {
                    var e = E.createElement("fieldset");
                    try {
                        return !!t(e)
                    } catch (t) {
                        return false
                    } finally {
                        e.parentNode && e.parentNode.removeChild(e), e = null
                    }
                }

                function o(t, e) {
                    for (var n = t.split("|"), r = n.length; r--;) _.attrHandle[n[r]] = e
                }

                function a(t, e) {
                    var n = e && t,
                        r = n && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex;
                    if (r) return r;
                    if (n)
                        for (; n = n.nextSibling;)
                            if (n === e) return -1;
                    return t ? 1 : -1
                }

                function s(t) {
                    return function (e) {
                        return "form" in e ? e.parentNode && false === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && wt(e) === t : e.disabled === t : "label" in e && e.disabled === t
                    }
                }

                function l(t) {
                    return r(function (e) {
                        return e = +e, r(function (n, r) {
                            for (var i, o = t([], n.length, e), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                        })
                    })
                }

                function u(t) {
                    return t && void 0 !== t.getElementsByTagName && t
                }

                function c() {}

                function f(t) {
                    for (var e = 0, n = t.length, r = ""; e < n; e++) r += t[e].value;
                    return r
                }

                function p(t, e, n) {
                    var r = e.dir,
                        i = e.next,
                        o = i || r,
                        a = n && "parentNode" === o,
                        s = H++;
                    return e.first ? function (e, n, i) {
                        for (; e = e[r];)
                            if (1 === e.nodeType || a) return t(e, n, i);
                        return false
                    } : function (e, n, l) {
                        var u, c, f, p = [q, s];
                        if (l) {
                            for (; e = e[r];)
                                if ((1 === e.nodeType || a) && t(e, n, l)) return true
                        } else
                            for (; e = e[r];)
                                if (1 === e.nodeType || a)
                                    if (f = e[R] || (e[R] = {}), c = f[e.uniqueID] || (f[e.uniqueID] = {}), i && i === e.nodeName.toLowerCase()) e = e[r] || e;
                                    else {
                                        if ((u = c[o]) && u[0] === q && u[1] === s) return p[2] = u[2];
                                        if (c[o] = p, p[2] = t(e, n, l)) return true
                                    } return false
                    }
                }

                function h(t) {
                    return t.length > 1 ? function (e, n, r) {
                        for (var i = t.length; i--;)
                            if (!t[i](e, n, r)) return false;
                        return true
                    } : t[0]
                }

                function d(t, n, r) {
                    for (var i = 0, o = n.length; i < o; i++) e(t, n[i], r);
                    return r
                }

                function v(t, e, n, r, i) {
                    for (var o, a = [], s = 0, l = t.length, u = null != e; s < l; s++)(o = t[s]) && (n && !n(o, r, i) || (a.push(o), u && e.push(s)));
                    return a
                }

                function g(t, e, n, i, o, a) {
                    return i && !i[R] && (i = g(i)), o && !o[R] && (o = g(o, a)), r(function (r, a, s, l) {
                        var u, c, f, p = [],
                            h = [],
                            g = a.length,
                            m = r || d(e || "*", s.nodeType ? [s] : s, []),
                            y = !t || !r && e ? m : v(m, p, t, s, l),
                            b = n ? o || (r ? t : g || i) ? [] : a : y;
                        if (n && n(y, b, s, l), i)
                            for (u = v(b, h), i(u, [], s, l), c = u.length; c--;)(f = u[c]) && (b[h[c]] = !(y[h[c]] = f));
                        if (r) {
                            if (o || t) {
                                if (o) {
                                    for (u = [], c = b.length; c--;)(f = b[c]) && u.push(y[c] = f);
                                    o(null, b = [], u, l)
                                }
                                for (c = b.length; c--;)(f = b[c]) && (u = o ? K(r, f) : p[c]) > -1 && (r[u] = !(a[u] = f))
                            }
                        } else b = v(b === a ? b.splice(g, b.length) : b), o ? o(null, a, b, l) : Q.apply(a, b)
                    })
                }

                function m(t) {
                    for (var e, n, r, i = t.length, o = _.relative[t[0].type], a = o || _.relative[" "], s = o ? 1 : 0, l = p(function (t) {
                            return t === e
                        }, a, true), u = p(function (t) {
                            return K(e, t) > -1
                        }, a, true), c = [function (t, n, r) {
                            var i = !o && (r || n !== S) || ((e = n).nodeType ? l(t, n, r) : u(t, n, r));
                            return e = null, i
                        }]; s < i; s++)
                        if (n = _.relative[t[s].type]) c = [p(h(c), n)];
                        else {
                            if (n = _.filter[t[s].type].apply(null, t[s].matches), n[R]) {
                                for (r = ++s; r < i && !_.relative[t[r].type]; r++);
                                return g(s > 1 && h(c), s > 1 && f(t.slice(0, s - 1).concat({
                                    value: " " === t[s - 2].type ? "*" : ""
                                })).replace(ot, "$1"), n, s < r && m(t.slice(s, r)), r < i && m(t = t.slice(r)), r < i && f(t))
                            }
                            c.push(n)
                        }
                    return h(c)
                }

                function y(t, n) {
                    var i = n.length > 0,
                        o = t.length > 0,
                        a = function (r, a, s, l, u) {
                            var c, f, p, h = 0,
                                d = "0",
                                g = r && [],
                                m = [],
                                y = S,
                                b = r || o && _.find.TAG("*", u),
                                x = q += null == y ? 1 : Math.random() || .1,
                                w = b.length;
                            for (u && (S = a === E || a || u); d !== w && null != (c = b[d]); d++) {
                                if (o && c) {
                                    for (f = 0, a || c.ownerDocument === E || (P(c), s = !D); p = t[f++];)
                                        if (p(c, a || E, s)) {
                                            l.push(c);
                                            break
                                        }
                                    u && (q = x)
                                }
                                i && ((c = !p && c) && h--, r && g.push(c))
                            }
                            if (h += d, i && d !== h) {
                                for (f = 0; p = n[f++];) p(g, m, a, s);
                                if (r) {
                                    if (h > 0)
                                        for (; d--;) g[d] || m[d] || (m[d] = z.call(l));
                                    m = v(m)
                                }
                                Q.apply(l, m), u && !r && m.length > 0 && h + n.length > 1 && e.uniqueSort(l)
                            }
                            return u && (q = x, S = y), g
                        };
                    return i ? r(a) : a
                }
                var b, x, _, w, C, k, A, T, S, $, O, P, E, j, D, N, I, F, L, R = "sizzle" + 1 * new Date,
                    V = t.document,
                    q = 0,
                    H = 0,
                    M = n(),
                    B = n(),
                    U = n(),
                    W = function (t, e) {
                        return t === e && (O = true), 0
                    },
                    X = {}.hasOwnProperty,
                    Y = [],
                    z = Y.pop,
                    Z = Y.push,
                    Q = Y.push,
                    G = Y.slice,
                    K = function (t, e) {
                        for (var n = 0, r = t.length; n < r; n++)
                            if (t[n] === e) return n;
                        return -1
                    },
                    J = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    tt = "[\\x20\\t\\r\\n\\f]",
                    et = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
                    nt = "\\[" + tt + "*(" + et + ")(?:" + tt + "*([*^$|!~]?=)" + tt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + et + "))|)" + tt + "*\\]",
                    rt = ":(" + et + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + nt + ")*)|.*)\\)|)",
                    it = new RegExp(tt + "+", "g"),
                    ot = new RegExp("^" + tt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + tt + "+$", "g"),
                    at = new RegExp("^" + tt + "*," + tt + "*"),
                    st = new RegExp("^" + tt + "*([>+~]|" + tt + ")" + tt + "*"),
                    lt = new RegExp("=" + tt + "*([^\\]'\"]*?)" + tt + "*\\]", "g"),
                    ut = new RegExp(rt),
                    ct = new RegExp("^" + et + "$"),
                    ft = {
                        ID: new RegExp("^#(" + et + ")"),
                        CLASS: new RegExp("^\\.(" + et + ")"),
                        TAG: new RegExp("^(" + et + "|[*])"),
                        ATTR: new RegExp("^" + nt),
                        PSEUDO: new RegExp("^" + rt),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + tt + "*(even|odd|(([+-]|)(\\d*)n|)" + tt + "*(?:([+-]|)" + tt + "*(\\d+)|))" + tt + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + J + ")$", "i"),
                        needsContext: new RegExp("^" + tt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + tt + "*((?:-\\d)?\\d*)" + tt + "*\\)|)(?=[^-]|$)", "i")
                    },
                    pt = /^(?:input|select|textarea|button)$/i,
                    ht = /^h\d$/i,
                    dt = /^[^{]+\{\s*\[native \w/,
                    vt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    gt = /[+~]/,
                    mt = new RegExp("\\\\([\\da-f]{1,6}" + tt + "?|(" + tt + ")|.)", "ig"),
                    yt = function (t, e, n) {
                        var r = "0x" + e - 65536;
                        return r !== r || n ? e : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
                    },
                    bt = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                    xt = function (t, e) {
                        return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
                    },
                    _t = function () {
                        P()
                    },
                    wt = p(function (t) {
                        return true === t.disabled && ("form" in t || "label" in t)
                    }, {
                        dir: "parentNode",
                        next: "legend"
                    });
                try {
                    Q.apply(Y = G.call(V.childNodes), V.childNodes), Y[V.childNodes.length].nodeType
                } catch (t) {
                    Q = {
                        apply: Y.length ? function (t, e) {
                            Z.apply(t, G.call(e))
                        } : function (t, e) {
                            for (var n = t.length, r = 0; t[n++] = e[r++];);
                            t.length = n - 1
                        }
                    }
                }
                x = e.support = {}, C = e.isXML = function (t) {
                    var e = t && (t.ownerDocument || t).documentElement;
                    return !!e && "HTML" !== e.nodeName
                }, P = e.setDocument = function (t) {
                    var e, n, r = t ? t.ownerDocument || t : V;
                    return r !== E && 9 === r.nodeType && r.documentElement ? (E = r, j = E.documentElement, D = !C(E), V !== E && (n = E.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", _t, false) : n.attachEvent && n.attachEvent("onunload", _t)), x.attributes = i(function (t) {
                        return t.className = "i", !t.getAttribute("className")
                    }), x.getElementsByTagName = i(function (t) {
                        return t.appendChild(E.createComment("")), !t.getElementsByTagName("*").length
                    }), x.getElementsByClassName = dt.test(E.getElementsByClassName), x.getById = i(function (t) {
                        return j.appendChild(t).id = R, !E.getElementsByName || !E.getElementsByName(R).length
                    }), x.getById ? (_.filter.ID = function (t) {
                        var e = t.replace(mt, yt);
                        return function (t) {
                            return t.getAttribute("id") === e
                        }
                    }, _.find.ID = function (t, e) {
                        if (void 0 !== e.getElementById && D) {
                            var n = e.getElementById(t);
                            return n ? [n] : []
                        }
                    }) : (_.filter.ID = function (t) {
                        var e = t.replace(mt, yt);
                        return function (t) {
                            var n = void 0 !== t.getAttributeNode && t.getAttributeNode("id");
                            return n && n.value === e
                        }
                    }, _.find.ID = function (t, e) {
                        if (void 0 !== e.getElementById && D) {
                            var n, r, i, o = e.getElementById(t);
                            if (o) {
                                if ((n = o.getAttributeNode("id")) && n.value === t) return [o];
                                for (i = e.getElementsByName(t), r = 0; o = i[r++];)
                                    if ((n = o.getAttributeNode("id")) && n.value === t) return [o]
                            }
                            return []
                        }
                    }), _.find.TAG = x.getElementsByTagName ? function (t, e) {
                        return void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t) : x.qsa ? e.querySelectorAll(t) : void 0
                    } : function (t, e) {
                        var n, r = [],
                            i = 0,
                            o = e.getElementsByTagName(t);
                        if ("*" === t) {
                            for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                            return r
                        }
                        return o
                    }, _.find.CLASS = x.getElementsByClassName && function (t, e) {
                        if (void 0 !== e.getElementsByClassName && D) return e.getElementsByClassName(t)
                    }, I = [], N = [], (x.qsa = dt.test(E.querySelectorAll)) && (i(function (t) {
                        j.appendChild(t).innerHTML = "<a id='" + R + "'></a><select id='" + R + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && N.push("[*^$]=" + tt + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || N.push("\\[" + tt + "*(?:value|" + J + ")"), t.querySelectorAll("[id~=" + R + "-]").length || N.push("~="), t.querySelectorAll(":checked").length || N.push(":checked"), t.querySelectorAll("a#" + R + "+*").length || N.push(".#.+[+~]")
                    }), i(function (t) {
                        t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                        var e = E.createElement("input");
                        e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && N.push("name" + tt + "*[*^$|!~]?="), 2 !== t.querySelectorAll(":enabled").length && N.push(":enabled", ":disabled"), j.appendChild(t).disabled = true, 2 !== t.querySelectorAll(":disabled").length && N.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), N.push(",.*:")
                    })), (x.matchesSelector = dt.test(F = j.matches || j.webkitMatchesSelector || j.mozMatchesSelector || j.oMatchesSelector || j.msMatchesSelector)) && i(function (t) {
                        x.disconnectedMatch = F.call(t, "*"), F.call(t, "[s!='']:x"), I.push("!=", rt)
                    }), N = N.length && new RegExp(N.join("|")), I = I.length && new RegExp(I.join("|")), e = dt.test(j.compareDocumentPosition), L = e || dt.test(j.contains) ? function (t, e) {
                        var n = 9 === t.nodeType ? t.documentElement : t,
                            r = e && e.parentNode;
                        return t === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(r)))
                    } : function (t, e) {
                        if (e)
                            for (; e = e.parentNode;)
                                if (e === t) return true;
                        return false
                    }, W = e ? function (t, e) {
                        if (t === e) return O = true, 0;
                        var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                        return n || (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & n || !x.sortDetached && e.compareDocumentPosition(t) === n ? t === E || t.ownerDocument === V && L(V, t) ? -1 : e === E || e.ownerDocument === V && L(V, e) ? 1 : $ ? K($, t) - K($, e) : 0 : 4 & n ? -1 : 1)
                    } : function (t, e) {
                        if (t === e) return O = true, 0;
                        var n, r = 0,
                            i = t.parentNode,
                            o = e.parentNode,
                            s = [t],
                            l = [e];
                        if (!i || !o) return t === E ? -1 : e === E ? 1 : i ? -1 : o ? 1 : $ ? K($, t) - K($, e) : 0;
                        if (i === o) return a(t, e);
                        for (n = t; n = n.parentNode;) s.unshift(n);
                        for (n = e; n = n.parentNode;) l.unshift(n);
                        for (; s[r] === l[r];) r++;
                        return r ? a(s[r], l[r]) : s[r] === V ? -1 : l[r] === V ? 1 : 0
                    }, E) : E
                }, e.matches = function (t, n) {
                    return e(t, null, null, n)
                }, e.matchesSelector = function (t, n) {
                    if ((t.ownerDocument || t) !== E && P(t), n = n.replace(lt, "='$1']"), x.matchesSelector && D && !U[n + " "] && (!I || !I.test(n)) && (!N || !N.test(n))) try {
                        var r = F.call(t, n);
                        if (r || x.disconnectedMatch || t.document && 11 !== t.document.nodeType) return r
                    } catch (t) {}
                    return e(n, E, null, [t]).length > 0
                }, e.contains = function (t, e) {
                    return (t.ownerDocument || t) !== E && P(t), L(t, e)
                }, e.attr = function (t, e) {
                    (t.ownerDocument || t) !== E && P(t);
                    var n = _.attrHandle[e.toLowerCase()],
                        r = n && X.call(_.attrHandle, e.toLowerCase()) ? n(t, e, !D) : void 0;
                    return void 0 !== r ? r : x.attributes || !D ? t.getAttribute(e) : (r = t.getAttributeNode(e)) && r.specified ? r.value : null
                }, e.escape = function (t) {
                    return (t + "").replace(bt, xt)
                }, e.error = function (t) {
                    throw new Error("Syntax error, unrecognized expression: " + t)
                }, e.uniqueSort = function (t) {
                    var e, n = [],
                        r = 0,
                        i = 0;
                    if (O = !x.detectDuplicates, $ = !x.sortStable && t.slice(0), t.sort(W), O) {
                        for (; e = t[i++];) e === t[i] && (r = n.push(i));
                        for (; r--;) t.splice(n[r], 1)
                    }
                    return $ = null, t
                }, w = e.getText = function (t) {
                    var e, n = "",
                        r = 0,
                        i = t.nodeType;
                    if (i) {
                        if (1 === i || 9 === i || 11 === i) {
                            if ("string" == typeof t.textContent) return t.textContent;
                            for (t = t.firstChild; t; t = t.nextSibling) n += w(t)
                        } else if (3 === i || 4 === i) return t.nodeValue
                    } else
                        for (; e = t[r++];) n += w(e);
                    return n
                }, _ = e.selectors = {
                    cacheLength: 50,
                    createPseudo: r,
                    match: ft,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: true
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: true
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function (t) {
                            return t[1] = t[1].replace(mt, yt), t[3] = (t[3] || t[4] || t[5] || "").replace(mt, yt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                        },
                        CHILD: function (t) {
                            return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                        },
                        PSEUDO: function (t) {
                            var e, n = !t[6] && t[2];
                            return ft.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && ut.test(n) && (e = k(n, true)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function (t) {
                            var e = t.replace(mt, yt).toLowerCase();
                            return "*" === t ? function () {
                                return true
                            } : function (t) {
                                return t.nodeName && t.nodeName.toLowerCase() === e
                            }
                        },
                        CLASS: function (t) {
                            var e = M[t + " "];
                            return e || (e = new RegExp("(^|" + tt + ")" + t + "(" + tt + "|$)")) && M(t, function (t) {
                                return e.test("string" == typeof t.className && t.className || void 0 !== t.getAttribute && t.getAttribute("class") || "")
                            })
                        },
                        ATTR: function (t, n, r) {
                            return function (i) {
                                var o = e.attr(i, t);
                                return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(it, " ") + " ").indexOf(r) > -1 : "|=" === n && (o === r || o.slice(0, r.length + 1) === r + "-"))
                            }
                        },
                        CHILD: function (t, e, n, r, i) {
                            var o = "nth" !== t.slice(0, 3),
                                a = "last" !== t.slice(-4),
                                s = "of-type" === e;
                            return 1 === r && 0 === i ? function (t) {
                                return !!t.parentNode
                            } : function (e, n, l) {
                                var u, c, f, p, h, d, v = o !== a ? "nextSibling" : "previousSibling",
                                    g = e.parentNode,
                                    m = s && e.nodeName.toLowerCase(),
                                    y = !l && !s,
                                    b = false;
                                if (g) {
                                    if (o) {
                                        for (; v;) {
                                            for (p = e; p = p[v];)
                                                if (s ? p.nodeName.toLowerCase() === m : 1 === p.nodeType) return false;
                                            d = v = "only" === t && !d && "nextSibling"
                                        }
                                        return true
                                    }
                                    if (d = [a ? g.firstChild : g.lastChild], a && y) {
                                        for (p = g, f = p[R] || (p[R] = {}), c = f[p.uniqueID] || (f[p.uniqueID] = {}), u = c[t] || [], h = u[0] === q && u[1], b = h && u[2], p = h && g.childNodes[h]; p = ++h && p && p[v] || (b = h = 0) || d.pop();)
                                            if (1 === p.nodeType && ++b && p === e) {
                                                c[t] = [q, h, b];
                                                break
                                            }
                                    } else if (y && (p = e, f = p[R] || (p[R] = {}), c = f[p.uniqueID] || (f[p.uniqueID] = {}), u = c[t] || [], h = u[0] === q && u[1], b = h), false === b)
                                        for (;
                                            (p = ++h && p && p[v] || (b = h = 0) || d.pop()) && ((s ? p.nodeName.toLowerCase() !== m : 1 !== p.nodeType) || !++b || (y && (f = p[R] || (p[R] = {}), c = f[p.uniqueID] || (f[p.uniqueID] = {}), c[t] = [q, b]), p !== e)););
                                    return (b -= i) === r || b % r == 0 && b / r >= 0
                                }
                            }
                        },
                        PSEUDO: function (t, n) {
                            var i, o = _.pseudos[t] || _.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                            return o[R] ? o(n) : o.length > 1 ? (i = [t, t, "", n], _.setFilters.hasOwnProperty(t.toLowerCase()) ? r(function (t, e) {
                                for (var r, i = o(t, n), a = i.length; a--;) r = K(t, i[a]), t[r] = !(e[r] = i[a])
                            }) : function (t) {
                                return o(t, 0, i)
                            }) : o
                        }
                    },
                    pseudos: {
                        not: r(function (t) {
                            var e = [],
                                n = [],
                                i = A(t.replace(ot, "$1"));
                            return i[R] ? r(function (t, e, n, r) {
                                for (var o, a = i(t, null, r, []), s = t.length; s--;)(o = a[s]) && (t[s] = !(e[s] = o))
                            }) : function (t, r, o) {
                                return e[0] = t, i(e, null, o, n), e[0] = null, !n.pop()
                            }
                        }),
                        has: r(function (t) {
                            return function (n) {
                                return e(t, n).length > 0
                            }
                        }),
                        contains: r(function (t) {
                            return t = t.replace(mt, yt),
                                function (e) {
                                    return (e.textContent || e.innerText || w(e)).indexOf(t) > -1
                                }
                        }),
                        lang: r(function (t) {
                            return ct.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(mt, yt).toLowerCase(),
                                function (e) {
                                    var n;
                                    do {
                                        if (n = D ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (n = n.toLowerCase()) === t || 0 === n.indexOf(t + "-")
                                    } while ((e = e.parentNode) && 1 === e.nodeType);
                                    return false
                                }
                        }),
                        target: function (e) {
                            var n = t.location && t.location.hash;
                            return n && n.slice(1) === e.id
                        },
                        root: function (t) {
                            return t === j
                        },
                        focus: function (t) {
                            return t === E.activeElement && (!E.hasFocus || E.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                        },
                        enabled: s(false),
                        disabled: s(true),
                        checked: function (t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && !!t.checked || "option" === e && !!t.selected
                        },
                        selected: function (t) {
                            return t.parentNode && t.parentNode.selectedIndex, true === t.selected
                        },
                        empty: function (t) {
                            for (t = t.firstChild; t; t = t.nextSibling)
                                if (t.nodeType < 6) return false;
                            return true
                        },
                        parent: function (t) {
                            return !_.pseudos.empty(t)
                        },
                        header: function (t) {
                            return ht.test(t.nodeName)
                        },
                        input: function (t) {
                            return pt.test(t.nodeName)
                        },
                        button: function (t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && "button" === t.type || "button" === e
                        },
                        text: function (t) {
                            var e;
                            return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                        },
                        first: l(function () {
                            return [0]
                        }),
                        last: l(function (t, e) {
                            return [e - 1]
                        }),
                        eq: l(function (t, e, n) {
                            return [n < 0 ? n + e : n]
                        }),
                        even: l(function (t, e) {
                            for (var n = 0; n < e; n += 2) t.push(n);
                            return t
                        }),
                        odd: l(function (t, e) {
                            for (var n = 1; n < e; n += 2) t.push(n);
                            return t
                        }),
                        lt: l(function (t, e, n) {
                            for (var r = n < 0 ? n + e : n; --r >= 0;) t.push(r);
                            return t
                        }),
                        gt: l(function (t, e, n) {
                            for (var r = n < 0 ? n + e : n; ++r < e;) t.push(r);
                            return t
                        })
                    }
                }, _.pseudos.nth = _.pseudos.eq;
                for (b in {
                        radio: true,
                        checkbox: true,
                        file: true,
                        password: true,
                        image: true
                    }) _.pseudos[b] = function (t) {
                    return function (e) {
                        return "input" === e.nodeName.toLowerCase() && e.type === t
                    }
                }(b);
                for (b in {
                        submit: true,
                        reset: true
                    }) _.pseudos[b] = function (t) {
                    return function (e) {
                        var n = e.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && e.type === t
                    }
                }(b);
                return c.prototype = _.filters = _.pseudos, _.setFilters = new c, k = e.tokenize = function (t, n) {
                    var r, i, o, a, s, l, u, c = B[t + " "];
                    if (c) return n ? 0 : c.slice(0);
                    for (s = t, l = [], u = _.preFilter; s;) {
                        r && !(i = at.exec(s)) || (i && (s = s.slice(i[0].length) || s), l.push(o = [])), r = false, (i = st.exec(s)) && (r = i.shift(), o.push({
                            value: r,
                            type: i[0].replace(ot, " ")
                        }), s = s.slice(r.length));
                        for (a in _.filter) !(i = ft[a].exec(s)) || u[a] && !(i = u[a](i)) || (r = i.shift(), o.push({
                            value: r,
                            type: a,
                            matches: i
                        }), s = s.slice(r.length));
                        if (!r) break
                    }
                    return n ? s.length : s ? e.error(t) : B(t, l).slice(0)
                }, A = e.compile = function (t, e) {
                    var n, r = [],
                        i = [],
                        o = U[t + " "];
                    if (!o) {
                        for (e || (e = k(t)), n = e.length; n--;) o = m(e[n]), o[R] ? r.push(o) : i.push(o);
                        o = U(t, y(i, r)), o.selector = t
                    }
                    return o
                }, T = e.select = function (t, e, n, r) {
                    var i, o, a, s, l, c = "function" == typeof t && t,
                        p = !r && k(t = c.selector || t);
                    if (n = n || [], 1 === p.length) {
                        if (o = p[0] = p[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && 9 === e.nodeType && D && _.relative[o[1].type]) {
                            if (!(e = (_.find.ID(a.matches[0].replace(mt, yt), e) || [])[0])) return n;
                            c && (e = e.parentNode), t = t.slice(o.shift().value.length)
                        }
                        for (i = ft.needsContext.test(t) ? 0 : o.length; i-- && (a = o[i], !_.relative[s = a.type]);)
                            if ((l = _.find[s]) && (r = l(a.matches[0].replace(mt, yt), gt.test(o[0].type) && u(e.parentNode) || e))) {
                                if (o.splice(i, 1), !(t = r.length && f(o))) return Q.apply(n, r), n;
                                break
                            }
                    }
                    return (c || A(t, p))(r, e, !D, n, !e || gt.test(t) && u(e.parentNode) || e), n
                }, x.sortStable = R.split("").sort(W).join("") === R, x.detectDuplicates = !!O, P(), x.sortDetached = i(function (t) {
                    return 1 & t.compareDocumentPosition(E.createElement("fieldset"))
                }), i(function (t) {
                    return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
                }) || o("type|href|height|width", function (t, e, n) {
                    if (!n) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
                }), x.attributes && i(function (t) {
                    return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
                }) || o("value", function (t, e, n) {
                    if (!n && "input" === t.nodeName.toLowerCase()) return t.defaultValue
                }), i(function (t) {
                    return null == t.getAttribute("disabled")
                }) || o(J, function (t, e, n) {
                    var r;
                    if (!n) return true === t[e] ? e.toLowerCase() : (r = t.getAttributeNode(e)) && r.specified ? r.value : null
                }), e
            }(t);
            _t.find = Ct, _t.expr = Ct.selectors, _t.expr[":"] = _t.expr.pseudos, _t.uniqueSort = _t.unique = Ct.uniqueSort, _t.text = Ct.getText, _t.isXMLDoc = Ct.isXML, _t.contains = Ct.contains, _t.escapeSelector = Ct.escape;
            var kt = function (t, e, n) {
                    for (var r = [], i = void 0 !== n;
                        (t = t[e]) && 9 !== t.nodeType;)
                        if (1 === t.nodeType) {
                            if (i && _t(t).is(n)) break;
                            r.push(t)
                        }
                    return r
                },
                At = function (t, e) {
                    for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
                    return n
                },
                Tt = _t.expr.match.needsContext,
                St = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
            _t.filter = function (t, e, n) {
                var r = e[0];
                return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === r.nodeType ? _t.find.matchesSelector(r, t) ? [r] : [] : _t.find.matches(t, _t.grep(e, function (t) {
                    return 1 === t.nodeType
                }))
            }, _t.fn.extend({
                find: function (t) {
                    var e, n, r = this.length,
                        i = this;
                    if ("string" != typeof t) return this.pushStack(_t(t).filter(function () {
                        for (e = 0; e < r; e++)
                            if (_t.contains(i[e], this)) return true
                    }));
                    for (n = this.pushStack([]), e = 0; e < r; e++) _t.find(t, i[e], n);
                    return r > 1 ? _t.uniqueSort(n) : n
                },
                filter: function (t) {
                    return this.pushStack(a(this, t || [], false))
                },
                not: function (t) {
                    return this.pushStack(a(this, t || [], true))
                },
                is: function (t) {
                    return !!a(this, "string" == typeof t && Tt.test(t) ? _t(t) : t || [], false).length
                }
            });
            var $t, Ot = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
            (_t.fn.init = function (t, e, n) {
                var r, i;
                if (!t) return this;
                if (n = n || $t, "string" == typeof t) {
                    if (!(r = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : Ot.exec(t)) || !r[1] && e) return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
                    if (r[1]) {
                        if (e = e instanceof _t ? e[0] : e, _t.merge(this, _t.parseHTML(r[1], e && e.nodeType ? e.ownerDocument || e : at, true)),
                            St.test(r[1]) && _t.isPlainObject(e))
                            for (r in e) yt(this[r]) ? this[r](e[r]) : this.attr(r, e[r]);
                        return this
                    }
                    return i = at.getElementById(r[2]), i && (this[0] = i, this.length = 1), this
                }
                return t.nodeType ? (this[0] = t, this.length = 1, this) : yt(t) ? void 0 !== n.ready ? n.ready(t) : t(_t) : _t.makeArray(t, this)
            }).prototype = _t.fn, $t = _t(at);
            var Pt = /^(?:parents|prev(?:Until|All))/,
                Et = {
                    children: true,
                    contents: true,
                    next: true,
                    prev: true
                };
            _t.fn.extend({
                has: function (t) {
                    var e = _t(t, this),
                        n = e.length;
                    return this.filter(function () {
                        for (var t = 0; t < n; t++)
                            if (_t.contains(this, e[t])) return true
                    })
                },
                closest: function (t, e) {
                    var n, r = 0,
                        i = this.length,
                        o = [],
                        a = "string" != typeof t && _t(t);
                    if (!Tt.test(t))
                        for (; r < i; r++)
                            for (n = this[r]; n && n !== e; n = n.parentNode)
                                if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && _t.find.matchesSelector(n, t))) {
                                    o.push(n);
                                    break
                                }
                    return this.pushStack(o.length > 1 ? _t.uniqueSort(o) : o)
                },
                index: function (t) {
                    return t ? "string" == typeof t ? ft.call(_t(t), this[0]) : ft.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                },
                add: function (t, e) {
                    return this.pushStack(_t.uniqueSort(_t.merge(this.get(), _t(t, e))))
                },
                addBack: function (t) {
                    return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
                }
            }), _t.each({
                parent: function (t) {
                    var e = t.parentNode;
                    return e && 11 !== e.nodeType ? e : null
                },
                parents: function (t) {
                    return kt(t, "parentNode")
                },
                parentsUntil: function (t, e, n) {
                    return kt(t, "parentNode", n)
                },
                next: function (t) {
                    return s(t, "nextSibling")
                },
                prev: function (t) {
                    return s(t, "previousSibling")
                },
                nextAll: function (t) {
                    return kt(t, "nextSibling")
                },
                prevAll: function (t) {
                    return kt(t, "previousSibling")
                },
                nextUntil: function (t, e, n) {
                    return kt(t, "nextSibling", n)
                },
                prevUntil: function (t, e, n) {
                    return kt(t, "previousSibling", n)
                },
                siblings: function (t) {
                    return At((t.parentNode || {}).firstChild, t)
                },
                children: function (t) {
                    return At(t.firstChild)
                },
                contents: function (t) {
                    return o(t, "iframe") ? t.contentDocument : (o(t, "template") && (t = t.content || t), _t.merge([], t.childNodes))
                }
            }, function (t, e) {
                _t.fn[t] = function (n, r) {
                    var i = _t.map(this, e, n);
                    return "Until" !== t.slice(-5) && (r = n), r && "string" == typeof r && (i = _t.filter(r, i)), this.length > 1 && (Et[t] || _t.uniqueSort(i), Pt.test(t) && i.reverse()), this.pushStack(i)
                }
            });
            var jt = /[^\x20\t\r\n\f]+/g;
            _t.Callbacks = function (t) {
                t = "string" == typeof t ? l(t) : _t.extend({}, t);
                var e, n, i, o, a = [],
                    s = [],
                    u = -1,
                    c = function () {
                        for (o = o || t.once, i = e = true; s.length; u = -1)
                            for (n = s.shift(); ++u < a.length;) false === a[u].apply(n[0], n[1]) && t.stopOnFalse && (u = a.length, n = false);
                        t.memory || (n = false), e = false, o && (a = n ? [] : "")
                    },
                    f = {
                        add: function () {
                            return a && (n && !e && (u = a.length - 1, s.push(n)), function e(n) {
                                _t.each(n, function (n, i) {
                                    yt(i) ? t.unique && f.has(i) || a.push(i) : i && i.length && "string" !== r(i) && e(i)
                                })
                            }(arguments), n && !e && c()), this
                        },
                        remove: function () {
                            return _t.each(arguments, function (t, e) {
                                for (var n;
                                    (n = _t.inArray(e, a, n)) > -1;) a.splice(n, 1), n <= u && u--
                            }), this
                        },
                        has: function (t) {
                            return t ? _t.inArray(t, a) > -1 : a.length > 0
                        },
                        empty: function () {
                            return a && (a = []), this
                        },
                        disable: function () {
                            return o = s = [], a = n = "", this
                        },
                        disabled: function () {
                            return !a
                        },
                        lock: function () {
                            return o = s = [], n || e || (a = n = ""), this
                        },
                        locked: function () {
                            return !!o
                        },
                        fireWith: function (t, n) {
                            return o || (n = n || [], n = [t, n.slice ? n.slice() : n], s.push(n), e || c()), this
                        },
                        fire: function () {
                            return f.fireWith(this, arguments), this
                        },
                        fired: function () {
                            return !!i
                        }
                    };
                return f
            }, _t.extend({
                Deferred: function (e) {
                    var n = [
                            ["notify", "progress", _t.Callbacks("memory"), _t.Callbacks("memory"), 2],
                            ["resolve", "done", _t.Callbacks("once memory"), _t.Callbacks("once memory"), 0, "resolved"],
                            ["reject", "fail", _t.Callbacks("once memory"), _t.Callbacks("once memory"), 1, "rejected"]
                        ],
                        r = "pending",
                        i = {
                            state: function () {
                                return r
                            },
                            always: function () {
                                return o.done(arguments).fail(arguments), this
                            },
                            catch: function (t) {
                                return i.then(null, t)
                            },
                            pipe: function () {
                                var t = arguments;
                                return _t.Deferred(function (e) {
                                    _t.each(n, function (n, r) {
                                        var i = yt(t[r[4]]) && t[r[4]];
                                        o[r[1]](function () {
                                            var t = i && i.apply(this, arguments);
                                            t && yt(t.promise) ? t.promise().progress(e.notify).done(e.resolve).fail(e.reject) : e[r[0] + "With"](this, i ? [t] : arguments)
                                        })
                                    }), t = null
                                }).promise()
                            },
                            then: function (e, r, i) {
                                function o(e, n, r, i) {
                                    return function () {
                                        var s = this,
                                            l = arguments,
                                            f = function () {
                                                var t, f;
                                                if (!(e < a)) {
                                                    if ((t = r.apply(s, l)) === n.promise()) throw new TypeError("Thenable self-resolution");
                                                    f = t && ("object" == typeof t || "function" == typeof t) && t.then, yt(f) ? i ? f.call(t, o(a, n, u, i), o(a, n, c, i)) : (a++, f.call(t, o(a, n, u, i), o(a, n, c, i), o(a, n, u, n.notifyWith))) : (r !== u && (s = void 0, l = [t]), (i || n.resolveWith)(s, l))
                                                }
                                            },
                                            p = i ? f : function () {
                                                try {
                                                    f()
                                                } catch (t) {
                                                    _t.Deferred.exceptionHook && _t.Deferred.exceptionHook(t, p.stackTrace), e + 1 >= a && (r !== c && (s = void 0, l = [t]), n.rejectWith(s, l))
                                                }
                                            };
                                        e ? p() : (_t.Deferred.getStackHook && (p.stackTrace = _t.Deferred.getStackHook()), t.setTimeout(p))
                                    }
                                }
                                var a = 0;
                                return _t.Deferred(function (t) {
                                    n[0][3].add(o(0, t, yt(i) ? i : u, t.notifyWith)), n[1][3].add(o(0, t, yt(e) ? e : u)), n[2][3].add(o(0, t, yt(r) ? r : c))
                                }).promise()
                            },
                            promise: function (t) {
                                return null != t ? _t.extend(t, i) : i
                            }
                        },
                        o = {};
                    return _t.each(n, function (t, e) {
                        var a = e[2],
                            s = e[5];
                        i[e[1]] = a.add, s && a.add(function () {
                            r = s
                        }, n[3 - t][2].disable, n[3 - t][3].disable, n[0][2].lock, n[0][3].lock), a.add(e[3].fire), o[e[0]] = function () {
                            return o[e[0] + "With"](this === o ? void 0 : this, arguments), this
                        }, o[e[0] + "With"] = a.fireWith
                    }), i.promise(o), e && e.call(o, o), o
                },
                when: function (t) {
                    var e = arguments.length,
                        n = e,
                        r = Array(n),
                        i = lt.call(arguments),
                        o = _t.Deferred(),
                        a = function (t) {
                            return function (n) {
                                r[t] = this, i[t] = arguments.length > 1 ? lt.call(arguments) : n, --e || o.resolveWith(r, i)
                            }
                        };
                    if (e <= 1 && (f(t, o.done(a(n)).resolve, o.reject, !e), "pending" === o.state() || yt(i[n] && i[n].then))) return o.then();
                    for (; n--;) f(i[n], a(n), o.reject);
                    return o.promise()
                }
            });
            var Dt = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
            _t.Deferred.exceptionHook = function (e, n) {
                t.console && t.console.warn && e && Dt.test(e.name) && t.console.warn("jQuery.Deferred exception: " + e.message, e.stack, n)
            }, _t.readyException = function (e) {
                t.setTimeout(function () {
                    throw e
                })
            };
            var Nt = _t.Deferred();
            _t.fn.ready = function (t) {
                return Nt.then(t).catch(function (t) {
                    _t.readyException(t)
                }), this
            }, _t.extend({
                isReady: false,
                readyWait: 1,
                ready: function (t) {
                    (true === t ? --_t.readyWait : _t.isReady) || (_t.isReady = true, true !== t && --_t.readyWait > 0 || Nt.resolveWith(at, [_t]))
                }
            }), _t.ready.then = Nt.then, "complete" === at.readyState || "loading" !== at.readyState && !at.documentElement.doScroll ? t.setTimeout(_t.ready) : (at.addEventListener("DOMContentLoaded", p), t.addEventListener("load", p));
            var It = function (t, e, n, i, o, a, s) {
                    var l = 0,
                        u = t.length,
                        c = null == n;
                    if ("object" === r(n)) {
                        o = true;
                        for (l in n) It(t, e, l, n[l], true, a, s)
                    } else if (void 0 !== i && (o = true, yt(i) || (s = true), c && (s ? (e.call(t, i), e = null) : (c = e, e = function (t, e, n) {
                            return c.call(_t(t), n)
                        })), e))
                        for (; l < u; l++) e(t[l], n, s ? i : i.call(t[l], l, e(t[l], n)));
                    return o ? t : c ? e.call(t) : u ? e(t[0], n) : a
                },
                Ft = /^-ms-/,
                Lt = /-([a-z])/g,
                Rt = function (t) {
                    return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
                };
            v.uid = 1, v.prototype = {
                cache: function (t) {
                    var e = t[this.expando];
                    return e || (e = {}, Rt(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, {
                        value: e,
                        configurable: true
                    }))), e
                },
                set: function (t, e, n) {
                    var r, i = this.cache(t);
                    if ("string" == typeof e) i[d(e)] = n;
                    else
                        for (r in e) i[d(r)] = e[r];
                    return i
                },
                get: function (t, e) {
                    return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][d(e)]
                },
                access: function (t, e, n) {
                    return void 0 === e || e && "string" == typeof e && void 0 === n ? this.get(t, e) : (this.set(t, e, n), void 0 !== n ? n : e)
                },
                remove: function (t, e) {
                    var n, r = t[this.expando];
                    if (void 0 !== r) {
                        if (void 0 !== e) {
                            Array.isArray(e) ? e = e.map(d) : (e = d(e), e = e in r ? [e] : e.match(jt) || []), n = e.length;
                            for (; n--;) delete r[e[n]]
                        }(void 0 === e || _t.isEmptyObject(r)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando])
                    }
                },
                hasData: function (t) {
                    var e = t[this.expando];
                    return void 0 !== e && !_t.isEmptyObject(e)
                }
            };
            var Vt = new v,
                qt = new v,
                Ht = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
                Mt = /[A-Z]/g;
            _t.extend({
                hasData: function (t) {
                    return qt.hasData(t) || Vt.hasData(t)
                },
                data: function (t, e, n) {
                    return qt.access(t, e, n)
                },
                removeData: function (t, e) {
                    qt.remove(t, e)
                },
                _data: function (t, e, n) {
                    return Vt.access(t, e, n)
                },
                _removeData: function (t, e) {
                    Vt.remove(t, e)
                }
            }), _t.fn.extend({
                data: function (t, e) {
                    var n, r, i, o = this[0],
                        a = o && o.attributes;
                    if (void 0 === t) {
                        if (this.length && (i = qt.get(o), 1 === o.nodeType && !Vt.get(o, "hasDataAttrs"))) {
                            for (n = a.length; n--;) a[n] && (r = a[n].name, 0 === r.indexOf("data-") && (r = d(r.slice(5)), m(o, r, i[r])));
                            Vt.set(o, "hasDataAttrs", true)
                        }
                        return i
                    }
                    return "object" == typeof t ? this.each(function () {
                        qt.set(this, t)
                    }) : It(this, function (e) {
                        var n;
                        if (o && void 0 === e) {
                            if (void 0 !== (n = qt.get(o, t))) return n;
                            if (void 0 !== (n = m(o, t))) return n
                        } else this.each(function () {
                            qt.set(this, t, e)
                        })
                    }, null, e, arguments.length > 1, null, true)
                },
                removeData: function (t) {
                    return this.each(function () {
                        qt.remove(this, t)
                    })
                }
            }), _t.extend({
                queue: function (t, e, n) {
                    var r;
                    if (t) return e = (e || "fx") + "queue", r = Vt.get(t, e), n && (!r || Array.isArray(n) ? r = Vt.access(t, e, _t.makeArray(n)) : r.push(n)), r || []
                },
                dequeue: function (t, e) {
                    e = e || "fx";
                    var n = _t.queue(t, e),
                        r = n.length,
                        i = n.shift(),
                        o = _t._queueHooks(t, e),
                        a = function () {
                            _t.dequeue(t, e)
                        };
                    "inprogress" === i && (i = n.shift(), r--), i && ("fx" === e && n.unshift("inprogress"), delete o.stop, i.call(t, a, o)), !r && o && o.empty.fire()
                },
                _queueHooks: function (t, e) {
                    var n = e + "queueHooks";
                    return Vt.get(t, n) || Vt.access(t, n, {
                        empty: _t.Callbacks("once memory").add(function () {
                            Vt.remove(t, [e + "queue", n])
                        })
                    })
                }
            }), _t.fn.extend({
                queue: function (t, e) {
                    var n = 2;
                    return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? _t.queue(this[0], t) : void 0 === e ? this : this.each(function () {
                        var n = _t.queue(this, t, e);
                        _t._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && _t.dequeue(this, t)
                    })
                },
                dequeue: function (t) {
                    return this.each(function () {
                        _t.dequeue(this, t)
                    })
                },
                clearQueue: function (t) {
                    return this.queue(t || "fx", [])
                },
                promise: function (t, e) {
                    var n, r = 1,
                        i = _t.Deferred(),
                        o = this,
                        a = this.length,
                        s = function () {
                            --r || i.resolveWith(o, [o])
                        };
                    for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; a--;)(n = Vt.get(o[a], t + "queueHooks")) && n.empty && (r++, n.empty.add(s));
                    return s(), i.promise(e)
                }
            });
            var Bt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
                Ut = new RegExp("^(?:([+-])=|)(" + Bt + ")([a-z%]*)$", "i"),
                Wt = ["Top", "Right", "Bottom", "Left"],
                Xt = function (t, e) {
                    return t = e || t, "none" === t.style.display || "" === t.style.display && _t.contains(t.ownerDocument, t) && "none" === _t.css(t, "display")
                },
                Yt = function (t, e, n, r) {
                    var i, o, a = {};
                    for (o in e) a[o] = t.style[o], t.style[o] = e[o];
                    i = n.apply(t, r || []);
                    for (o in e) t.style[o] = a[o];
                    return i
                },
                zt = {};
            _t.fn.extend({
                show: function () {
                    return x(this, true)
                },
                hide: function () {
                    return x(this)
                },
                toggle: function (t) {
                    return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function () {
                        Xt(this) ? _t(this).show() : _t(this).hide()
                    })
                }
            });
            var Zt = /^(?:checkbox|radio)$/i,
                Qt = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
                Gt = /^$|^module$|\/(?:java|ecma)script/i,
                Kt = {
                    option: [1, "<select multiple='multiple'>", "</select>"],
                    thead: [1, "<table>", "</table>"],
                    col: [2, "<table><colgroup>", "</colgroup></table>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                    _default: [0, "", ""]
                };
            Kt.optgroup = Kt.option, Kt.tbody = Kt.tfoot = Kt.colgroup = Kt.caption = Kt.thead, Kt.th = Kt.td;
            var Jt = /<|&#?\w+;/;
            ! function () {
                var t = at.createDocumentFragment(),
                    e = t.appendChild(at.createElement("div")),
                    n = at.createElement("input");
                n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), e.appendChild(n), mt.checkClone = e.cloneNode(true).cloneNode(true).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", mt.noCloneChecked = !!e.cloneNode(true).lastChild.defaultValue
            }();
            var te = at.documentElement,
                ee = /^key/,
                ne = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
                re = /^([^.]*)(?:\.(.+)|)/;
            _t.event = {
                global: {},
                add: function (t, e, n, r, i) {
                    var o, a, s, l, u, c, f, p, h, d, v, g = Vt.get(t);
                    if (g)
                        for (n.handler && (o = n, n = o.handler, i = o.selector), i && _t.find.matchesSelector(te, i), n.guid || (n.guid = _t.guid++), (l = g.events) || (l = g.events = {}), (a = g.handle) || (a = g.handle = function (e) {
                                return void 0 !== _t && _t.event.triggered !== e.type ? _t.event.dispatch.apply(t, arguments) : void 0
                            }), e = (e || "").match(jt) || [""], u = e.length; u--;) s = re.exec(e[u]) || [], h = v = s[1], d = (s[2] || "").split(".").sort(), h && (f = _t.event.special[h] || {}, h = (i ? f.delegateType : f.bindType) || h, f = _t.event.special[h] || {}, c = _t.extend({
                            type: h,
                            origType: v,
                            data: r,
                            handler: n,
                            guid: n.guid,
                            selector: i,
                            needsContext: i && _t.expr.match.needsContext.test(i),
                            namespace: d.join(".")
                        }, o), (p = l[h]) || (p = l[h] = [], p.delegateCount = 0, f.setup && false !== f.setup.call(t, r, d, a) || t.addEventListener && t.addEventListener(h, a)), f.add && (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), _t.event.global[h] = true)
                },
                remove: function (t, e, n, r, i) {
                    var o, a, s, l, u, c, f, p, h, d, v, g = Vt.hasData(t) && Vt.get(t);
                    if (g && (l = g.events)) {
                        for (e = (e || "").match(jt) || [""], u = e.length; u--;)
                            if (s = re.exec(e[u]) || [], h = v = s[1], d = (s[2] || "").split(".").sort(), h) {
                                for (f = _t.event.special[h] || {}, h = (r ? f.delegateType : f.bindType) || h, p = l[h] || [], s = s[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = p.length; o--;) c = p[o], !i && v !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(t, c));
                                a && !p.length && (f.teardown && false !== f.teardown.call(t, d, g.handle) || _t.removeEvent(t, h, g.handle), delete l[h])
                            } else
                                for (h in l) _t.event.remove(t, h + e[u], n, r, true);
                        _t.isEmptyObject(l) && Vt.remove(t, "handle events")
                    }
                },
                dispatch: function (t) {
                    var e, n, r, i, o, a, s = _t.event.fix(t),
                        l = new Array(arguments.length),
                        u = (Vt.get(this, "events") || {})[s.type] || [],
                        c = _t.event.special[s.type] || {};
                    for (l[0] = s, e = 1; e < arguments.length; e++) l[e] = arguments[e];
                    if (s.delegateTarget = this, !c.preDispatch || false !== c.preDispatch.call(this, s)) {
                        for (a = _t.event.handlers.call(this, s, u), e = 0;
                            (i = a[e++]) && !s.isPropagationStopped();)
                            for (s.currentTarget = i.elem, n = 0;
                                (o = i.handlers[n++]) && !s.isImmediatePropagationStopped();) s.rnamespace && !s.rnamespace.test(o.namespace) || (s.handleObj = o, s.data = o.data, void 0 !== (r = ((_t.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, l)) && false === (s.result = r) && (s.preventDefault(), s.stopPropagation()));
                        return c.postDispatch && c.postDispatch.call(this, s), s.result
                    }
                },
                handlers: function (t, e) {
                    var n, r, i, o, a, s = [],
                        l = e.delegateCount,
                        u = t.target;
                    if (l && u.nodeType && !("click" === t.type && t.button >= 1))
                        for (; u !== this; u = u.parentNode || this)
                            if (1 === u.nodeType && ("click" !== t.type || true !== u.disabled)) {
                                for (o = [], a = {}, n = 0; n < l; n++) r = e[n], i = r.selector + " ", void 0 === a[i] && (a[i] = r.needsContext ? _t(i, this).index(u) > -1 : _t.find(i, this, null, [u]).length), a[i] && o.push(r);
                                o.length && s.push({
                                    elem: u,
                                    handlers: o
                                })
                            }
                    return u = this, l < e.length && s.push({
                        elem: u,
                        handlers: e.slice(l)
                    }), s
                },
                addProp: function (t, e) {
                    Object.defineProperty(_t.Event.prototype, t, {
                        enumerable: true,
                        configurable: true,
                        get: yt(e) ? function () {
                            if (this.originalEvent) return e(this.originalEvent)
                        } : function () {
                            if (this.originalEvent) return this.originalEvent[t]
                        },
                        set: function (e) {
                            Object.defineProperty(this, t, {
                                enumerable: true,
                                configurable: true,
                                writable: true,
                                value: e
                            })
                        }
                    })
                },
                fix: function (t) {
                    return t[_t.expando] ? t : new _t.Event(t)
                },
                special: {
                    load: {
                        noBubble: true
                    },
                    focus: {
                        trigger: function () {
                            if (this !== T() && this.focus) return this.focus(), false
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function () {
                            if (this === T() && this.blur) return this.blur(), false
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function () {
                            if ("checkbox" === this.type && this.click && o(this, "input")) return this.click(), false
                        },
                        _default: function (t) {
                            return o(t.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function (t) {
                            void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                        }
                    }
                }
            }, _t.removeEvent = function (t, e, n) {
                t.removeEventListener && t.removeEventListener(e, n)
            }, _t.Event = function (t, e) {
                if (!(this instanceof _t.Event)) return new _t.Event(t, e);
                t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && false === t.returnValue ? k : A, this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target, this.currentTarget = t.currentTarget, this.relatedTarget = t.relatedTarget) : this.type = t, e && _t.extend(this, e), this.timeStamp = t && t.timeStamp || Date.now(), this[_t.expando] = true
            }, _t.Event.prototype = {
                constructor: _t.Event,
                isDefaultPrevented: A,
                isPropagationStopped: A,
                isImmediatePropagationStopped: A,
                isSimulated: false,
                preventDefault: function () {
                    var t = this.originalEvent;
                    this.isDefaultPrevented = k, t && !this.isSimulated && t.preventDefault()
                },
                stopPropagation: function () {
                    var t = this.originalEvent;
                    this.isPropagationStopped = k, t && !this.isSimulated && t.stopPropagation()
                },
                stopImmediatePropagation: function () {
                    var t = this.originalEvent;
                    this.isImmediatePropagationStopped = k, t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation()
                }
            }, _t.each({
                altKey: true,
                bubbles: true,
                cancelable: true,
                changedTouches: true,
                ctrlKey: true,
                detail: true,
                eventPhase: true,
                metaKey: true,
                pageX: true,
                pageY: true,
                shiftKey: true,
                view: true,
                char: true,
                charCode: true,
                key: true,
                keyCode: true,
                button: true,
                buttons: true,
                clientX: true,
                clientY: true,
                offsetX: true,
                offsetY: true,
                pointerId: true,
                pointerType: true,
                screenX: true,
                screenY: true,
                targetTouches: true,
                toElement: true,
                touches: true,
                which: function (t) {
                    var e = t.button;
                    return null == t.which && ee.test(t.type) ? null != t.charCode ? t.charCode : t.keyCode : !t.which && void 0 !== e && ne.test(t.type) ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : t.which
                }
            }, _t.event.addProp), _t.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout"
            }, function (t, e) {
                _t.event.special[t] = {
                    delegateType: e,
                    bindType: e,
                    handle: function (t) {
                        var n, r = this,
                            i = t.relatedTarget,
                            o = t.handleObj;
                        return i && (i === r || _t.contains(r, i)) || (t.type = o.origType, n = o.handler.apply(this, arguments), t.type = e), n
                    }
                }
            }), _t.fn.extend({
                on: function (t, e, n, r) {
                    return S(this, t, e, n, r)
                },
                one: function (t, e, n, r) {
                    return S(this, t, e, n, r, 1)
                },
                off: function (t, e, n) {
                    var r, i;
                    if (t && t.preventDefault && t.handleObj) return r = t.handleObj, _t(t.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
                    if ("object" == typeof t) {
                        for (i in t) this.off(i, e, t[i]);
                        return this
                    }
                    return false !== e && "function" != typeof e || (n = e, e = void 0), false === n && (n = A), this.each(function () {
                        _t.event.remove(this, t, n, e)
                    })
                }
            });
            var ie = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
                oe = /<script|<style|<link/i,
                ae = /checked\s*(?:[^=]|=\s*.checked.)/i,
                se = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
            _t.extend({
                htmlPrefilter: function (t) {
                    return t.replace(ie, "<$1></$2>")
                },
                clone: function (t, e, n) {
                    var r, i, o, a, s = t.cloneNode(true),
                        l = _t.contains(t.ownerDocument, t);
                    if (!(mt.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || _t.isXMLDoc(t)))
                        for (a = _(s), o = _(t), r = 0, i = o.length; r < i; r++) j(o[r], a[r]);
                    if (e)
                        if (n)
                            for (o = o || _(t), a = a || _(s), r = 0, i = o.length; r < i; r++) E(o[r], a[r]);
                        else E(t, s);
                    return a = _(s, "script"), a.length > 0 && w(a, !l && _(t, "script")), s
                },
                cleanData: function (t) {
                    for (var e, n, r, i = _t.event.special, o = 0; void 0 !== (n = t[o]); o++)
                        if (Rt(n)) {
                            if (e = n[Vt.expando]) {
                                if (e.events)
                                    for (r in e.events) i[r] ? _t.event.remove(n, r) : _t.removeEvent(n, r, e.handle);
                                n[Vt.expando] = void 0
                            }
                            n[qt.expando] && (n[qt.expando] = void 0)
                        }
                }
            }), _t.fn.extend({
                detach: function (t) {
                    return N(this, t, true)
                },
                remove: function (t) {
                    return N(this, t)
                },
                text: function (t) {
                    return It(this, function (t) {
                        return void 0 === t ? _t.text(this) : this.empty().each(function () {
                            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t)
                        })
                    }, null, t, arguments.length)
                },
                append: function () {
                    return D(this, arguments, function (t) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            $(this, t).appendChild(t)
                        }
                    })
                },
                prepend: function () {
                    return D(this, arguments, function (t) {
                        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                            var e = $(this, t);
                            e.insertBefore(t, e.firstChild)
                        }
                    })
                },
                before: function () {
                    return D(this, arguments, function (t) {
                        this.parentNode && this.parentNode.insertBefore(t, this)
                    })
                },
                after: function () {
                    return D(this, arguments, function (t) {
                        this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                    })
                },
                empty: function () {
                    for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (_t.cleanData(_(t, false)), t.textContent = "");
                    return this
                },
                clone: function (t, e) {
                    return t = null != t && t, e = null == e ? t : e, this.map(function () {
                        return _t.clone(this, t, e)
                    })
                },
                html: function (t) {
                    return It(this, function (t) {
                        var e = this[0] || {},
                            n = 0,
                            r = this.length;
                        if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                        if ("string" == typeof t && !oe.test(t) && !Kt[(Qt.exec(t) || ["", ""])[1].toLowerCase()]) {
                            t = _t.htmlPrefilter(t);
                            try {
                                for (; n < r; n++) e = this[n] || {}, 1 === e.nodeType && (_t.cleanData(_(e, false)), e.innerHTML = t);
                                e = 0
                            } catch (t) {}
                        }
                        e && this.empty().append(t)
                    }, null, t, arguments.length)
                },
                replaceWith: function () {
                    var t = [];
                    return D(this, arguments, function (e) {
                        var n = this.parentNode;
                        _t.inArray(this, t) < 0 && (_t.cleanData(_(this)), n && n.replaceChild(e, this))
                    }, t)
                }
            }), _t.each({
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith"
            }, function (t, e) {
                _t.fn[t] = function (t) {
                    for (var n, r = [], i = _t(t), o = i.length - 1, a = 0; a <= o; a++) n = a === o ? this : this.clone(true), _t(i[a])[e](n), ct.apply(r, n.get());
                    return this.pushStack(r)
                }
            });
            var le = new RegExp("^(" + Bt + ")(?!px)[a-z%]+$", "i"),
                ue = function (e) {
                    var n = e.ownerDocument.defaultView;
                    return n && n.opener || (n = t), n.getComputedStyle(e)
                },
                ce = new RegExp(Wt.join("|"), "i");
            ! function () {
                function e() {
                    if (u) {
                        l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", u.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", te.appendChild(l).appendChild(u);
                        var e = t.getComputedStyle(u);
                        r = "1%" !== e.top, s = 12 === n(e.marginLeft), u.style.right = "60%", a = 36 === n(e.right), i = 36 === n(e.width), u.style.position = "absolute", o = 36 === u.offsetWidth || "absolute", te.removeChild(l), u = null
                    }
                }

                function n(t) {
                    return Math.round(parseFloat(t))
                }
                var r, i, o, a, s, l = at.createElement("div"),
                    u = at.createElement("div");
                u.style && (u.style.backgroundClip = "content-box", u.cloneNode(true).style.backgroundClip = "", mt.clearCloneStyle = "content-box" === u.style.backgroundClip, _t.extend(mt, {
                    boxSizingReliable: function () {
                        return e(), i
                    },
                    pixelBoxStyles: function () {
                        return e(), a
                    },
                    pixelPosition: function () {
                        return e(), r
                    },
                    reliableMarginLeft: function () {
                        return e(), s
                    },
                    scrollboxSize: function () {
                        return e(), o
                    }
                }))
            }();
            var fe = /^(none|table(?!-c[ea]).+)/,
                pe = /^--/,
                he = {
                    position: "absolute",
                    visibility: "hidden",
                    display: "block"
                },
                de = {
                    letterSpacing: "0",
                    fontWeight: "400"
                },
                ve = ["Webkit", "Moz", "ms"],
                ge = at.createElement("div").style;
            _t.extend({
                cssHooks: {
                    opacity: {
                        get: function (t, e) {
                            if (e) {
                                var n = I(t, "opacity");
                                return "" === n ? "1" : n
                            }
                        }
                    }
                },
                cssNumber: {
                    animationIterationCount: true,
                    columnCount: true,
                    fillOpacity: true,
                    flexGrow: true,
                    flexShrink: true,
                    fontWeight: true,
                    lineHeight: true,
                    opacity: true,
                    order: true,
                    orphans: true,
                    widows: true,
                    zIndex: true,
                    zoom: true
                },
                cssProps: {},
                style: function (t, e, n, r) {
                    if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                        var i, o, a, s = d(e),
                            l = pe.test(e),
                            u = t.style;
                        if (l || (e = R(s)), a = _t.cssHooks[e] || _t.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(t, false, r)) ? i : u[e];
                        o = typeof n, "string" === o && (i = Ut.exec(n)) && i[1] && (n = y(t, e, i), o = "number"), null != n && n === n && ("number" === o && (n += i && i[3] || (_t.cssNumber[s] ? "" : "px")), mt.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (u[e] = "inherit"), a && "set" in a && void 0 === (n = a.set(t, n, r)) || (l ? u.setProperty(e, n) : u[e] = n))
                    }
                },
                css: function (t, e, n, r) {
                    var i, o, a, s = d(e);
                    return pe.test(e) || (e = R(s)), a = _t.cssHooks[e] || _t.cssHooks[s], a && "get" in a && (i = a.get(t, true, n)), void 0 === i && (i = I(t, e, r)), "normal" === i && e in de && (i = de[e]), "" === n || n ? (o = parseFloat(i), true === n || isFinite(o) ? o || 0 : i) : i
                }
            }), _t.each(["height", "width"], function (t, e) {
                _t.cssHooks[e] = {
                    get: function (t, n, r) {
                        if (n) return !fe.test(_t.css(t, "display")) || t.getClientRects().length && t.getBoundingClientRect().width ? H(t, e, r) : Yt(t, he, function () {
                            return H(t, e, r)
                        })
                    },
                    set: function (t, n, r) {
                        var i, o = ue(t),
                            a = "border-box" === _t.css(t, "boxSizing", false, o),
                            s = r && q(t, e, r, a, o);
                        return a && mt.scrollboxSize() === o.position && (s -= Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - parseFloat(o[e]) - q(t, e, "border", false, o) - .5)), s && (i = Ut.exec(n)) && "px" !== (i[3] || "px") && (t.style[e] = n, n = _t.css(t, e)), V(t, n, s)
                    }
                }
            }), _t.cssHooks.marginLeft = F(mt.reliableMarginLeft, function (t, e) {
                if (e) return (parseFloat(I(t, "marginLeft")) || t.getBoundingClientRect().left - Yt(t, {
                    marginLeft: 0
                }, function () {
                    return t.getBoundingClientRect().left
                })) + "px"
            }), _t.each({
                margin: "",
                padding: "",
                border: "Width"
            }, function (t, e) {
                _t.cssHooks[t + e] = {
                    expand: function (n) {
                        for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) i[t + Wt[r] + e] = o[r] || o[r - 2] || o[0];
                        return i
                    }
                }, "margin" !== t && (_t.cssHooks[t + e].set = V)
            }), _t.fn.extend({
                css: function (t, e) {
                    return It(this, function (t, e, n) {
                        var r, i, o = {},
                            a = 0;
                        if (Array.isArray(e)) {
                            for (r = ue(t), i = e.length; a < i; a++) o[e[a]] = _t.css(t, e[a], false, r);
                            return o
                        }
                        return void 0 !== n ? _t.style(t, e, n) : _t.css(t, e)
                    }, t, e, arguments.length > 1)
                }
            }), _t.Tween = M, M.prototype = {
                constructor: M,
                init: function (t, e, n, r, i, o) {
                    this.elem = t, this.prop = n, this.easing = i || _t.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = r, this.unit = o || (_t.cssNumber[n] ? "" : "px")
                },
                cur: function () {
                    var t = M.propHooks[this.prop];
                    return t && t.get ? t.get(this) : M.propHooks._default.get(this)
                },
                run: function (t) {
                    var e, n = M.propHooks[this.prop];
                    return this.options.duration ? this.pos = e = _t.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : M.propHooks._default.set(this), this
                }
            }, M.prototype.init.prototype = M.prototype, M.propHooks = {
                _default: {
                    get: function (t) {
                        var e;
                        return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = _t.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0)
                    },
                    set: function (t) {
                        _t.fx.step[t.prop] ? _t.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[_t.cssProps[t.prop]] && !_t.cssHooks[t.prop] ? t.elem[t.prop] = t.now : _t.style(t.elem, t.prop, t.now + t.unit)
                    }
                }
            }, M.propHooks.scrollTop = M.propHooks.scrollLeft = {
                set: function (t) {
                    t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
                }
            }, _t.easing = {
                linear: function (t) {
                    return t
                },
                swing: function (t) {
                    return .5 - Math.cos(t * Math.PI) / 2
                },
                _default: "swing"
            }, _t.fx = M.prototype.init, _t.fx.step = {};
            var me, ye, be = /^(?:toggle|show|hide)$/,
                xe = /queueHooks$/;
            _t.Animation = _t.extend(Z, {
                    tweeners: {
                        "*": [function (t, e) {
                            var n = this.createTween(t, e);
                            return y(n.elem, t, Ut.exec(e), n), n
                        }]
                    },
                    tweener: function (t, e) {
                        yt(t) ? (e = t, t = ["*"]) : t = t.match(jt);
                        for (var n, r = 0, i = t.length; r < i; r++) n = t[r], Z.tweeners[n] = Z.tweeners[n] || [], Z.tweeners[n].unshift(e)
                    },
                    prefilters: [Y],
                    prefilter: function (t, e) {
                        e ? Z.prefilters.unshift(t) : Z.prefilters.push(t)
                    }
                }), _t.speed = function (t, e, n) {
                    var r = t && "object" == typeof t ? _t.extend({}, t) : {
                        complete: n || !n && e || yt(t) && t,
                        duration: t,
                        easing: n && e || e && !yt(e) && e
                    };
                    return _t.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in _t.fx.speeds ? r.duration = _t.fx.speeds[r.duration] : r.duration = _t.fx.speeds._default), null != r.queue && true !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
                        yt(r.old) && r.old.call(this), r.queue && _t.dequeue(this, r.queue)
                    }, r
                }, _t.fn.extend({
                    fadeTo: function (t, e, n, r) {
                        return this.filter(Xt).css("opacity", 0).show().end().animate({
                            opacity: e
                        }, t, n, r)
                    },
                    animate: function (t, e, n, r) {
                        var i = _t.isEmptyObject(t),
                            o = _t.speed(e, n, r),
                            a = function () {
                                var e = Z(this, _t.extend({}, t), o);
                                (i || Vt.get(this, "finish")) && e.stop(true)
                            };
                        return a.finish = a, i || false === o.queue ? this.each(a) : this.queue(o.queue, a)
                    },
                    stop: function (t, e, n) {
                        var r = function (t) {
                            var e = t.stop;
                            delete t.stop, e(n)
                        };
                        return "string" != typeof t && (n = e, e = t, t = void 0), e && false !== t && this.queue(t || "fx", []), this.each(function () {
                            var e = true,
                                i = null != t && t + "queueHooks",
                                o = _t.timers,
                                a = Vt.get(this);
                            if (i) a[i] && a[i].stop && r(a[i]);
                            else
                                for (i in a) a[i] && a[i].stop && xe.test(i) && r(a[i]);
                            for (i = o.length; i--;) o[i].elem !== this || null != t && o[i].queue !== t || (o[i].anim.stop(n), e = false, o.splice(i, 1));
                            !e && n || _t.dequeue(this, t)
                        })
                    },
                    finish: function (t) {
                        return false !== t && (t = t || "fx"), this.each(function () {
                            var e, n = Vt.get(this),
                                r = n[t + "queue"],
                                i = n[t + "queueHooks"],
                                o = _t.timers,
                                a = r ? r.length : 0;
                            for (n.finish = true, _t.queue(this, t, []), i && i.stop && i.stop.call(this, true), e = o.length; e--;) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(true), o.splice(e, 1));
                            for (e = 0; e < a; e++) r[e] && r[e].finish && r[e].finish.call(this);
                            delete n.finish
                        })
                    }
                }), _t.each(["toggle", "show", "hide"], function (t, e) {
                    var n = _t.fn[e];
                    _t.fn[e] = function (t, r, i) {
                        return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(W(e, true), t, r, i)
                    }
                }), _t.each({
                    slideDown: W("show"),
                    slideUp: W("hide"),
                    slideToggle: W("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                }, function (t, e) {
                    _t.fn[t] = function (t, n, r) {
                        return this.animate(e, t, n, r)
                    }
                }), _t.timers = [], _t.fx.tick = function () {
                    var t, e = 0,
                        n = _t.timers;
                    for (me = Date.now(); e < n.length; e++)(t = n[e])() || n[e] !== t || n.splice(e--, 1);
                    n.length || _t.fx.stop(), me = void 0
                }, _t.fx.timer = function (t) {
                    _t.timers.push(t), _t.fx.start()
                }, _t.fx.interval = 13, _t.fx.start = function () {
                    ye || (ye = true, B())
                }, _t.fx.stop = function () {
                    ye = null
                }, _t.fx.speeds = {
                    slow: 600,
                    fast: 200,
                    _default: 400
                }, _t.fn.delay = function (e, n) {
                    return e = _t.fx ? _t.fx.speeds[e] || e : e, n = n || "fx", this.queue(n, function (n, r) {
                        var i = t.setTimeout(n, e);
                        r.stop = function () {
                            t.clearTimeout(i)
                        }
                    })
                },
                function () {
                    var t = at.createElement("input"),
                        e = at.createElement("select"),
                        n = e.appendChild(at.createElement("option"));
                    t.type = "checkbox", mt.checkOn = "" !== t.value, mt.optSelected = n.selected, t = at.createElement("input"), t.value = "t", t.type = "radio", mt.radioValue = "t" === t.value
                }();
            var _e, we = _t.expr.attrHandle;
            _t.fn.extend({
                attr: function (t, e) {
                    return It(this, _t.attr, t, e, arguments.length > 1)
                },
                removeAttr: function (t) {
                    return this.each(function () {
                        _t.removeAttr(this, t)
                    })
                }
            }), _t.extend({
                attr: function (t, e, n) {
                    var r, i, o = t.nodeType;
                    if (3 !== o && 8 !== o && 2 !== o) return void 0 === t.getAttribute ? _t.prop(t, e, n) : (1 === o && _t.isXMLDoc(t) || (i = _t.attrHooks[e.toLowerCase()] || (_t.expr.match.bool.test(e) ? _e : void 0)), void 0 !== n ? null === n ? void _t.removeAttr(t, e) : i && "set" in i && void 0 !== (r = i.set(t, n, e)) ? r : (t.setAttribute(e, n + ""), n) : i && "get" in i && null !== (r = i.get(t, e)) ? r : (r = _t.find.attr(t, e), null == r ? void 0 : r))
                },
                attrHooks: {
                    type: {
                        set: function (t, e) {
                            if (!mt.radioValue && "radio" === e && o(t, "input")) {
                                var n = t.value;
                                return t.setAttribute("type", e), n && (t.value = n), e
                            }
                        }
                    }
                },
                removeAttr: function (t, e) {
                    var n, r = 0,
                        i = e && e.match(jt);
                    if (i && 1 === t.nodeType)
                        for (; n = i[r++];) t.removeAttribute(n)
                }
            }), _e = {
                set: function (t, e, n) {
                    return false === e ? _t.removeAttr(t, n) : t.setAttribute(n, n), n
                }
            }, _t.each(_t.expr.match.bool.source.match(/\w+/g), function (t, e) {
                var n = we[e] || _t.find.attr;
                we[e] = function (t, e, r) {
                    var i, o, a = e.toLowerCase();
                    return r || (o = we[a], we[a] = i, i = null != n(t, e, r) ? a : null, we[a] = o), i
                }
            });
            var Ce = /^(?:input|select|textarea|button)$/i,
                ke = /^(?:a|area)$/i;
            _t.fn.extend({
                prop: function (t, e) {
                    return It(this, _t.prop, t, e, arguments.length > 1)
                },
                removeProp: function (t) {
                    return this.each(function () {
                        delete this[_t.propFix[t] || t]
                    })
                }
            }), _t.extend({
                prop: function (t, e, n) {
                    var r, i, o = t.nodeType;
                    if (3 !== o && 8 !== o && 2 !== o) return 1 === o && _t.isXMLDoc(t) || (e = _t.propFix[e] || e, i = _t.propHooks[e]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(t, n, e)) ? r : t[e] = n : i && "get" in i && null !== (r = i.get(t, e)) ? r : t[e]
                },
                propHooks: {
                    tabIndex: {
                        get: function (t) {
                            var e = _t.find.attr(t, "tabindex");
                            return e ? parseInt(e, 10) : Ce.test(t.nodeName) || ke.test(t.nodeName) && t.href ? 0 : -1
                        }
                    }
                },
                propFix: {
                    for: "htmlFor",
                    class: "className"
                }
            }), mt.optSelected || (_t.propHooks.selected = {
                get: function (t) {
                    var e = t.parentNode;
                    return e && e.parentNode && e.parentNode.selectedIndex, null
                },
                set: function (t) {
                    var e = t.parentNode;
                    e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
                }
            }), _t.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
                _t.propFix[this.toLowerCase()] = this
            }), _t.fn.extend({
                addClass: function (t) {
                    var e, n, r, i, o, a, s, l = 0;
                    if (yt(t)) return this.each(function (e) {
                        _t(this).addClass(t.call(this, e, G(this)))
                    });
                    if (e = K(t), e.length)
                        for (; n = this[l++];)
                            if (i = G(n), r = 1 === n.nodeType && " " + Q(i) + " ") {
                                for (a = 0; o = e[a++];) r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                                s = Q(r), i !== s && n.setAttribute("class", s)
                            }
                    return this
                },
                removeClass: function (t) {
                    var e, n, r, i, o, a, s, l = 0;
                    if (yt(t)) return this.each(function (e) {
                        _t(this).removeClass(t.call(this, e, G(this)))
                    });
                    if (!arguments.length) return this.attr("class", "");
                    if (e = K(t), e.length)
                        for (; n = this[l++];)
                            if (i = G(n), r = 1 === n.nodeType && " " + Q(i) + " ") {
                                for (a = 0; o = e[a++];)
                                    for (; r.indexOf(" " + o + " ") > -1;) r = r.replace(" " + o + " ", " ");
                                s = Q(r), i !== s && n.setAttribute("class", s)
                            }
                    return this
                },
                toggleClass: function (t, e) {
                    var n = typeof t,
                        r = "string" === n || Array.isArray(t);
                    return "boolean" == typeof e && r ? e ? this.addClass(t) : this.removeClass(t) : yt(t) ? this.each(function (n) {
                        _t(this).toggleClass(t.call(this, n, G(this), e), e)
                    }) : this.each(function () {
                        var e, i, o, a;
                        if (r)
                            for (i = 0, o = _t(this), a = K(t); e = a[i++];) o.hasClass(e) ? o.removeClass(e) : o.addClass(e);
                        else void 0 !== t && "boolean" !== n || (e = G(this), e && Vt.set(this, "__className__", e),
                            this.setAttribute && this.setAttribute("class", e || false === t ? "" : Vt.get(this, "__className__") || ""))
                    })
                },
                hasClass: function (t) {
                    var e, n, r = 0;
                    for (e = " " + t + " "; n = this[r++];)
                        if (1 === n.nodeType && (" " + Q(G(n)) + " ").indexOf(e) > -1) return true;
                    return false
                }
            });
            var Ae = /\r/g;
            _t.fn.extend({
                val: function (t) {
                    var e, n, r, i = this[0]; {
                        if (arguments.length) return r = yt(t), this.each(function (n) {
                            var i;
                            1 === this.nodeType && (i = r ? t.call(this, n, _t(this).val()) : t, null == i ? i = "" : "number" == typeof i ? i += "" : Array.isArray(i) && (i = _t.map(i, function (t) {
                                return null == t ? "" : t + ""
                            })), (e = _t.valHooks[this.type] || _t.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, i, "value") || (this.value = i))
                        });
                        if (i) return (e = _t.valHooks[i.type] || _t.valHooks[i.nodeName.toLowerCase()]) && "get" in e && void 0 !== (n = e.get(i, "value")) ? n : (n = i.value, "string" == typeof n ? n.replace(Ae, "") : null == n ? "" : n)
                    }
                }
            }), _t.extend({
                valHooks: {
                    option: {
                        get: function (t) {
                            var e = _t.find.attr(t, "value");
                            return null != e ? e : Q(_t.text(t))
                        }
                    },
                    select: {
                        get: function (t) {
                            var e, n, r, i = t.options,
                                a = t.selectedIndex,
                                s = "select-one" === t.type,
                                l = s ? null : [],
                                u = s ? a + 1 : i.length;
                            for (r = a < 0 ? u : s ? a : 0; r < u; r++)
                                if (n = i[r], (n.selected || r === a) && !n.disabled && (!n.parentNode.disabled || !o(n.parentNode, "optgroup"))) {
                                    if (e = _t(n).val(), s) return e;
                                    l.push(e)
                                }
                            return l
                        },
                        set: function (t, e) {
                            for (var n, r, i = t.options, o = _t.makeArray(e), a = i.length; a--;) r = i[a], (r.selected = _t.inArray(_t.valHooks.option.get(r), o) > -1) && (n = true);
                            return n || (t.selectedIndex = -1), o
                        }
                    }
                }
            }), _t.each(["radio", "checkbox"], function () {
                _t.valHooks[this] = {
                    set: function (t, e) {
                        if (Array.isArray(e)) return t.checked = _t.inArray(_t(t).val(), e) > -1
                    }
                }, mt.checkOn || (_t.valHooks[this].get = function (t) {
                    return null === t.getAttribute("value") ? "on" : t.value
                })
            }), mt.focusin = "onfocusin" in t;
            var Te = /^(?:focusinfocus|focusoutblur)$/,
                Se = function (t) {
                    t.stopPropagation()
                };
            _t.extend(_t.event, {
                trigger: function (e, n, r, i) {
                    var o, a, s, l, u, c, f, p, h = [r || at],
                        d = dt.call(e, "type") ? e.type : e,
                        v = dt.call(e, "namespace") ? e.namespace.split(".") : [];
                    if (a = p = s = r = r || at, 3 !== r.nodeType && 8 !== r.nodeType && !Te.test(d + _t.event.triggered) && (d.indexOf(".") > -1 && (v = d.split("."), d = v.shift(), v.sort()), u = d.indexOf(":") < 0 && "on" + d, e = e[_t.expando] ? e : new _t.Event(d, "object" == typeof e && e), e.isTrigger = i ? 2 : 3, e.namespace = v.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = r), n = null == n ? [e] : _t.makeArray(n, [e]), f = _t.event.special[d] || {}, i || !f.trigger || false !== f.trigger.apply(r, n))) {
                        if (!i && !f.noBubble && !bt(r)) {
                            for (l = f.delegateType || d, Te.test(l + d) || (a = a.parentNode); a; a = a.parentNode) h.push(a), s = a;
                            s === (r.ownerDocument || at) && h.push(s.defaultView || s.parentWindow || t)
                        }
                        for (o = 0;
                            (a = h[o++]) && !e.isPropagationStopped();) p = a, e.type = o > 1 ? l : f.bindType || d, c = (Vt.get(a, "events") || {})[e.type] && Vt.get(a, "handle"), c && c.apply(a, n), (c = u && a[u]) && c.apply && Rt(a) && (e.result = c.apply(a, n), false === e.result && e.preventDefault());
                        return e.type = d, i || e.isDefaultPrevented() || f._default && false !== f._default.apply(h.pop(), n) || !Rt(r) || u && yt(r[d]) && !bt(r) && (s = r[u], s && (r[u] = null), _t.event.triggered = d, e.isPropagationStopped() && p.addEventListener(d, Se), r[d](), e.isPropagationStopped() && p.removeEventListener(d, Se), _t.event.triggered = void 0, s && (r[u] = s)), e.result
                    }
                },
                simulate: function (t, e, n) {
                    var r = _t.extend(new _t.Event, n, {
                        type: t,
                        isSimulated: true
                    });
                    _t.event.trigger(r, null, e)
                }
            }), _t.fn.extend({
                trigger: function (t, e) {
                    return this.each(function () {
                        _t.event.trigger(t, e, this)
                    })
                },
                triggerHandler: function (t, e) {
                    var n = this[0];
                    if (n) return _t.event.trigger(t, e, n, true)
                }
            }), mt.focusin || _t.each({
                focus: "focusin",
                blur: "focusout"
            }, function (t, e) {
                var n = function (t) {
                    _t.event.simulate(e, t.target, _t.event.fix(t))
                };
                _t.event.special[e] = {
                    setup: function () {
                        var r = this.ownerDocument || this,
                            i = Vt.access(r, e);
                        i || r.addEventListener(t, n, true), Vt.access(r, e, (i || 0) + 1)
                    },
                    teardown: function () {
                        var r = this.ownerDocument || this,
                            i = Vt.access(r, e) - 1;
                        i ? Vt.access(r, e, i) : (r.removeEventListener(t, n, true), Vt.remove(r, e))
                    }
                }
            });
            var $e = t.location,
                Oe = Date.now(),
                Pe = /\?/;
            _t.parseXML = function (e) {
                var n;
                if (!e || "string" != typeof e) return null;
                try {
                    n = (new t.DOMParser).parseFromString(e, "text/xml")
                } catch (t) {
                    n = void 0
                }
                return n && !n.getElementsByTagName("parsererror").length || _t.error("Invalid XML: " + e), n
            };
            var Ee = /\[\]$/,
                je = /\r?\n/g,
                De = /^(?:submit|button|image|reset|file)$/i,
                Ne = /^(?:input|select|textarea|keygen)/i;
            _t.param = function (t, e) {
                var n, r = [],
                    i = function (t, e) {
                        var n = yt(e) ? e() : e;
                        r[r.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == n ? "" : n)
                    };
                if (Array.isArray(t) || t.jquery && !_t.isPlainObject(t)) _t.each(t, function () {
                    i(this.name, this.value)
                });
                else
                    for (n in t) J(n, t[n], e, i);
                return r.join("&")
            }, _t.fn.extend({
                serialize: function () {
                    return _t.param(this.serializeArray())
                },
                serializeArray: function () {
                    return this.map(function () {
                        var t = _t.prop(this, "elements");
                        return t ? _t.makeArray(t) : this
                    }).filter(function () {
                        var t = this.type;
                        return this.name && !_t(this).is(":disabled") && Ne.test(this.nodeName) && !De.test(t) && (this.checked || !Zt.test(t))
                    }).map(function (t, e) {
                        var n = _t(this).val();
                        return null == n ? null : Array.isArray(n) ? _t.map(n, function (t) {
                            return {
                                name: e.name,
                                value: t.replace(je, "\r\n")
                            }
                        }) : {
                            name: e.name,
                            value: n.replace(je, "\r\n")
                        }
                    }).get()
                }
            });
            var Ie = /%20/g,
                Fe = /#.*$/,
                Le = /([?&])_=[^&]*/,
                Re = /^(.*?):[ \t]*([^\r\n]*)$/gm,
                Ve = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
                qe = /^(?:GET|HEAD)$/,
                He = /^\/\//,
                Me = {},
                Be = {},
                Ue = "*/".concat("*"),
                We = at.createElement("a");
            We.href = $e.href, _t.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: $e.href,
                    type: "GET",
                    isLocal: Ve.test($e.protocol),
                    global: true,
                    processData: true,
                    async: true,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": Ue,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /\bxml\b/,
                        html: /\bhtml/,
                        json: /\bjson\b/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": true,
                        "text json": JSON.parse,
                        "text xml": _t.parseXML
                    },
                    flatOptions: {
                        url: true,
                        context: true
                    }
                },
                ajaxSetup: function (t, e) {
                    return e ? nt(nt(t, _t.ajaxSettings), e) : nt(_t.ajaxSettings, t)
                },
                ajaxPrefilter: tt(Me),
                ajaxTransport: tt(Be),
                ajax: function (e, n) {
                    function r(e, n, r, s) {
                        var u, p, h, x, _, w = n;
                        c || (c = true, l && t.clearTimeout(l), i = void 0, a = s || "", C.readyState = e > 0 ? 4 : 0, u = e >= 200 && e < 300 || 304 === e, r && (x = rt(d, C, r)), x = it(d, x, C, u), u ? (d.ifModified && (_ = C.getResponseHeader("Last-Modified"), _ && (_t.lastModified[o] = _), (_ = C.getResponseHeader("etag")) && (_t.etag[o] = _)), 204 === e || "HEAD" === d.type ? w = "nocontent" : 304 === e ? w = "notmodified" : (w = x.state, p = x.data, h = x.error, u = !h)) : (h = w, !e && w || (w = "error", e < 0 && (e = 0))), C.status = e, C.statusText = (n || w) + "", u ? m.resolveWith(v, [p, w, C]) : m.rejectWith(v, [C, w, h]), C.statusCode(b), b = void 0, f && g.trigger(u ? "ajaxSuccess" : "ajaxError", [C, d, u ? p : h]), y.fireWith(v, [C, w]), f && (g.trigger("ajaxComplete", [C, d]), --_t.active || _t.event.trigger("ajaxStop")))
                    }
                    "object" == typeof e && (n = e, e = void 0), n = n || {};
                    var i, o, a, s, l, u, c, f, p, h, d = _t.ajaxSetup({}, n),
                        v = d.context || d,
                        g = d.context && (v.nodeType || v.jquery) ? _t(v) : _t.event,
                        m = _t.Deferred(),
                        y = _t.Callbacks("once memory"),
                        b = d.statusCode || {},
                        x = {},
                        _ = {},
                        w = "canceled",
                        C = {
                            readyState: 0,
                            getResponseHeader: function (t) {
                                var e;
                                if (c) {
                                    if (!s)
                                        for (s = {}; e = Re.exec(a);) s[e[1].toLowerCase()] = e[2];
                                    e = s[t.toLowerCase()]
                                }
                                return null == e ? null : e
                            },
                            getAllResponseHeaders: function () {
                                return c ? a : null
                            },
                            setRequestHeader: function (t, e) {
                                return null == c && (t = _[t.toLowerCase()] = _[t.toLowerCase()] || t, x[t] = e), this
                            },
                            overrideMimeType: function (t) {
                                return null == c && (d.mimeType = t), this
                            },
                            statusCode: function (t) {
                                var e;
                                if (t)
                                    if (c) C.always(t[C.status]);
                                    else
                                        for (e in t) b[e] = [b[e], t[e]];
                                return this
                            },
                            abort: function (t) {
                                var e = t || w;
                                return i && i.abort(e), r(0, e), this
                            }
                        };
                    if (m.promise(C), d.url = ((e || d.url || $e.href) + "").replace(He, $e.protocol + "//"), d.type = n.method || n.type || d.method || d.type, d.dataTypes = (d.dataType || "*").toLowerCase().match(jt) || [""], null == d.crossDomain) {
                        u = at.createElement("a");
                        try {
                            u.href = d.url, u.href = u.href, d.crossDomain = We.protocol + "//" + We.host != u.protocol + "//" + u.host
                        } catch (t) {
                            d.crossDomain = true
                        }
                    }
                    if (d.data && d.processData && "string" != typeof d.data && (d.data = _t.param(d.data, d.traditional)), et(Me, d, n, C), c) return C;
                    f = _t.event && d.global, f && 0 == _t.active++ && _t.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !qe.test(d.type), o = d.url.replace(Fe, ""), d.hasContent ? d.data && d.processData && 0 === (d.contentType || "").indexOf("application/x-www-form-urlencoded") && (d.data = d.data.replace(Ie, "+")) : (h = d.url.slice(o.length), d.data && (d.processData || "string" == typeof d.data) && (o += (Pe.test(o) ? "&" : "?") + d.data, delete d.data), false === d.cache && (o = o.replace(Le, "$1"), h = (Pe.test(o) ? "&" : "?") + "_=" + Oe++ + h), d.url = o + h), d.ifModified && (_t.lastModified[o] && C.setRequestHeader("If-Modified-Since", _t.lastModified[o]), _t.etag[o] && C.setRequestHeader("If-None-Match", _t.etag[o])), (d.data && d.hasContent && false !== d.contentType || n.contentType) && C.setRequestHeader("Content-Type", d.contentType), C.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Ue + "; q=0.01" : "") : d.accepts["*"]);
                    for (p in d.headers) C.setRequestHeader(p, d.headers[p]);
                    if (d.beforeSend && (false === d.beforeSend.call(v, C, d) || c)) return C.abort();
                    if (w = "abort", y.add(d.complete), C.done(d.success), C.fail(d.error), i = et(Be, d, n, C)) {
                        if (C.readyState = 1, f && g.trigger("ajaxSend", [C, d]), c) return C;
                        d.async && d.timeout > 0 && (l = t.setTimeout(function () {
                            C.abort("timeout")
                        }, d.timeout));
                        try {
                            c = false, i.send(x, r)
                        } catch (t) {
                            if (c) throw t;
                            r(-1, t)
                        }
                    } else r(-1, "No Transport");
                    return C
                },
                getJSON: function (t, e, n) {
                    return _t.get(t, e, n, "json")
                },
                getScript: function (t, e) {
                    return _t.get(t, void 0, e, "script")
                }
            }), _t.each(["get", "post"], function (t, e) {
                _t[e] = function (t, n, r, i) {
                    return yt(n) && (i = i || r, r = n, n = void 0), _t.ajax(_t.extend({
                        url: t,
                        type: e,
                        dataType: i,
                        data: n,
                        success: r
                    }, _t.isPlainObject(t) && t))
                }
            }), _t._evalUrl = function (t) {
                return _t.ajax({
                    url: t,
                    type: "GET",
                    dataType: "script",
                    cache: true,
                    async: false,
                    global: false,
                    throws: true
                })
            }, _t.fn.extend({
                wrapAll: function (t) {
                    var e;
                    return this[0] && (yt(t) && (t = t.call(this[0])), e = _t(t, this[0].ownerDocument).eq(0).clone(true), this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
                        for (var t = this; t.firstElementChild;) t = t.firstElementChild;
                        return t
                    }).append(this)), this
                },
                wrapInner: function (t) {
                    return yt(t) ? this.each(function (e) {
                        _t(this).wrapInner(t.call(this, e))
                    }) : this.each(function () {
                        var e = _t(this),
                            n = e.contents();
                        n.length ? n.wrapAll(t) : e.append(t)
                    })
                },
                wrap: function (t) {
                    var e = yt(t);
                    return this.each(function (n) {
                        _t(this).wrapAll(e ? t.call(this, n) : t)
                    })
                },
                unwrap: function (t) {
                    return this.parent(t).not("body").each(function () {
                        _t(this).replaceWith(this.childNodes)
                    }), this
                }
            }), _t.expr.pseudos.hidden = function (t) {
                return !_t.expr.pseudos.visible(t)
            }, _t.expr.pseudos.visible = function (t) {
                return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length)
            }, _t.ajaxSettings.xhr = function () {
                try {
                    return new t.XMLHttpRequest
                } catch (t) {}
            };
            var Xe = {
                    0: 200,
                    1223: 204
                },
                Ye = _t.ajaxSettings.xhr();
            mt.cors = !!Ye && "withCredentials" in Ye, mt.ajax = Ye = !!Ye, _t.ajaxTransport(function (e) {
                var n, r;
                if (mt.cors || Ye && !e.crossDomain) return {
                    send: function (i, o) {
                        var a, s = e.xhr();
                        if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                            for (a in e.xhrFields) s[a] = e.xhrFields[a];
                        e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                        for (a in i) s.setRequestHeader(a, i[a]);
                        n = function (t) {
                            return function () {
                                n && (n = r = s.onload = s.onerror = s.onabort = s.ontimeout = s.onreadystatechange = null, "abort" === t ? s.abort() : "error" === t ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Xe[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {
                                    binary: s.response
                                } : {
                                    text: s.responseText
                                }, s.getAllResponseHeaders()))
                            }
                        }, s.onload = n(), r = s.onerror = s.ontimeout = n("error"), void 0 !== s.onabort ? s.onabort = r : s.onreadystatechange = function () {
                            4 === s.readyState && t.setTimeout(function () {
                                n && r()
                            })
                        }, n = n("abort");
                        try {
                            s.send(e.hasContent && e.data || null)
                        } catch (t) {
                            if (n) throw t
                        }
                    },
                    abort: function () {
                        n && n()
                    }
                }
            }), _t.ajaxPrefilter(function (t) {
                t.crossDomain && (t.contents.script = false)
            }), _t.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /\b(?:java|ecma)script\b/
                },
                converters: {
                    "text script": function (t) {
                        return _t.globalEval(t), t
                    }
                }
            }), _t.ajaxPrefilter("script", function (t) {
                void 0 === t.cache && (t.cache = false), t.crossDomain && (t.type = "GET")
            }), _t.ajaxTransport("script", function (t) {
                if (t.crossDomain) {
                    var e, n;
                    return {
                        send: function (r, i) {
                            e = _t("<script>").prop({
                                charset: t.scriptCharset,
                                src: t.url
                            }).on("load error", n = function (t) {
                                e.remove(), n = null, t && i("error" === t.type ? 404 : 200, t.type)
                            }), at.head.appendChild(e[0])
                        },
                        abort: function () {
                            n && n()
                        }
                    }
                }
            });
            var ze = [],
                Ze = /(=)\?(?=&|$)|\?\?/;
            _t.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function () {
                    var t = ze.pop() || _t.expando + "_" + Oe++;
                    return this[t] = true, t
                }
            }), _t.ajaxPrefilter("json jsonp", function (e, n, r) {
                var i, o, a, s = false !== e.jsonp && (Ze.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Ze.test(e.data) && "data");
                if (s || "jsonp" === e.dataTypes[0]) return i = e.jsonpCallback = yt(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(Ze, "$1" + i) : false !== e.jsonp && (e.url += (Pe.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function () {
                    return a || _t.error(i + " was not called"), a[0]
                }, e.dataTypes[0] = "json", o = t[i], t[i] = function () {
                    a = arguments
                }, r.always(function () {
                    void 0 === o ? _t(t).removeProp(i) : t[i] = o, e[i] && (e.jsonpCallback = n.jsonpCallback, ze.push(i)), a && yt(o) && o(a[0]), a = o = void 0
                }), "script"
            }), mt.createHTMLDocument = function () {
                var t = at.implementation.createHTMLDocument("").body;
                return t.innerHTML = "<form></form><form></form>", 2 === t.childNodes.length
            }(), _t.parseHTML = function (t, e, n) {
                if ("string" != typeof t) return [];
                "boolean" == typeof e && (n = e, e = false);
                var r, i, o;
                return e || (mt.createHTMLDocument ? (e = at.implementation.createHTMLDocument(""), r = e.createElement("base"), r.href = at.location.href, e.head.appendChild(r)) : e = at), i = St.exec(t), o = !n && [], i ? [e.createElement(i[1])] : (i = C([t], e, o), o && o.length && _t(o).remove(), _t.merge([], i.childNodes))
            }, _t.fn.load = function (t, e, n) {
                var r, i, o, a = this,
                    s = t.indexOf(" ");
                return s > -1 && (r = Q(t.slice(s)), t = t.slice(0, s)), yt(e) ? (n = e, e = void 0) : e && "object" == typeof e && (i = "POST"), a.length > 0 && _t.ajax({
                    url: t,
                    type: i || "GET",
                    dataType: "html",
                    data: e
                }).done(function (t) {
                    o = arguments, a.html(r ? _t("<div>").append(_t.parseHTML(t)).find(r) : t)
                }).always(n && function (t, e) {
                    a.each(function () {
                        n.apply(this, o || [t.responseText, e, t])
                    })
                }), this
            }, _t.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) {
                _t.fn[e] = function (t) {
                    return this.on(e, t)
                }
            }), _t.expr.pseudos.animated = function (t) {
                return _t.grep(_t.timers, function (e) {
                    return t === e.elem
                }).length
            }, _t.offset = {
                setOffset: function (t, e, n) {
                    var r, i, o, a, s, l, u, c = _t.css(t, "position"),
                        f = _t(t),
                        p = {};
                    "static" === c && (t.style.position = "relative"), s = f.offset(), o = _t.css(t, "top"), l = _t.css(t, "left"), u = ("absolute" === c || "fixed" === c) && (o + l).indexOf("auto") > -1, u ? (r = f.position(), a = r.top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(l) || 0), yt(e) && (e = e.call(t, n, _t.extend({}, s))), null != e.top && (p.top = e.top - s.top + a), null != e.left && (p.left = e.left - s.left + i), "using" in e ? e.using.call(t, p) : f.css(p)
                }
            }, _t.fn.extend({
                offset: function (t) {
                    if (arguments.length) return void 0 === t ? this : this.each(function (e) {
                        _t.offset.setOffset(this, t, e)
                    });
                    var e, n, r = this[0];
                    if (r) return r.getClientRects().length ? (e = r.getBoundingClientRect(), n = r.ownerDocument.defaultView, {
                        top: e.top + n.pageYOffset,
                        left: e.left + n.pageXOffset
                    }) : {
                        top: 0,
                        left: 0
                    }
                },
                position: function () {
                    if (this[0]) {
                        var t, e, n, r = this[0],
                            i = {
                                top: 0,
                                left: 0
                            };
                        if ("fixed" === _t.css(r, "position")) e = r.getBoundingClientRect();
                        else {
                            for (e = this.offset(), n = r.ownerDocument, t = r.offsetParent || n.documentElement; t && (t === n.body || t === n.documentElement) && "static" === _t.css(t, "position");) t = t.parentNode;
                            t && t !== r && 1 === t.nodeType && (i = _t(t).offset(), i.top += _t.css(t, "borderTopWidth", true), i.left += _t.css(t, "borderLeftWidth", true))
                        }
                        return {
                            top: e.top - i.top - _t.css(r, "marginTop", true),
                            left: e.left - i.left - _t.css(r, "marginLeft", true)
                        }
                    }
                },
                offsetParent: function () {
                    return this.map(function () {
                        for (var t = this.offsetParent; t && "static" === _t.css(t, "position");) t = t.offsetParent;
                        return t || te
                    })
                }
            }), _t.each({
                scrollLeft: "pageXOffset",
                scrollTop: "pageYOffset"
            }, function (t, e) {
                var n = "pageYOffset" === e;
                _t.fn[t] = function (r) {
                    return It(this, function (t, r, i) {
                        var o;
                        if (bt(t) ? o = t : 9 === t.nodeType && (o = t.defaultView), void 0 === i) return o ? o[e] : t[r];
                        o ? o.scrollTo(n ? o.pageXOffset : i, n ? i : o.pageYOffset) : t[r] = i
                    }, t, r, arguments.length)
                }
            }), _t.each(["top", "left"], function (t, e) {
                _t.cssHooks[e] = F(mt.pixelPosition, function (t, n) {
                    if (n) return n = I(t, e), le.test(n) ? _t(t).position()[e] + "px" : n
                })
            }), _t.each({
                Height: "height",
                Width: "width"
            }, function (t, e) {
                _t.each({
                    padding: "inner" + t,
                    content: e,
                    "": "outer" + t
                }, function (n, r) {
                    _t.fn[r] = function (i, o) {
                        var a = arguments.length && (n || "boolean" != typeof i),
                            s = n || (true === i || true === o ? "margin" : "border");
                        return It(this, function (e, n, i) {
                            var o;
                            return bt(e) ? 0 === r.indexOf("outer") ? e["inner" + t] : e.document.documentElement["client" + t] : 9 === e.nodeType ? (o = e.documentElement, Math.max(e.body["scroll" + t], o["scroll" + t], e.body["offset" + t], o["offset" + t], o["client" + t])) : void 0 === i ? _t.css(e, n, s) : _t.style(e, n, i, s)
                        }, e, a ? i : void 0, a)
                    }
                })
            }), _t.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (t, e) {
                _t.fn[e] = function (t, n) {
                    return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
                }
            }), _t.fn.extend({
                hover: function (t, e) {
                    return this.mouseenter(t).mouseleave(e || t)
                }
            }), _t.fn.extend({
                bind: function (t, e, n) {
                    return this.on(t, null, e, n)
                },
                unbind: function (t, e) {
                    return this.off(t, null, e)
                },
                delegate: function (t, e, n, r) {
                    return this.on(e, t, n, r)
                },
                undelegate: function (t, e, n) {
                    return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
                }
            }), _t.proxy = function (t, e) {
                var n, r, i;
                if ("string" == typeof e && (n = t[e], e = t, t = n), yt(t)) return r = lt.call(arguments, 2), i = function () {
                    return t.apply(e || this, r.concat(lt.call(arguments)))
                }, i.guid = t.guid = t.guid || _t.guid++, i
            }, _t.holdReady = function (t) {
                t ? _t.readyWait++ : _t.ready(true)
            }, _t.isArray = Array.isArray, _t.parseJSON = JSON.parse, _t.nodeName = o, _t.isFunction = yt, _t.isWindow = bt, _t.camelCase = d, _t.type = r, _t.now = Date.now, _t.isNumeric = function (t) {
                var e = _t.type(t);
                return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t))
            }, "function" == typeof define && define.amd && define("jquery", [], function () {
                return _t
            });
            var Qe = t.jQuery,
                Ge = t.$;
            return _t.noConflict = function (e) {
                return t.$ === _t && (t.$ = Ge), e && t.jQuery === _t && (t.jQuery = Qe), _t
            }, e || (t.jQuery = t.$ = _t), _t
        })
    }, {}],
    9: [function (t, e, n) {
        (function (t) {
            (function () {
                function r(t, e) {
                    if (t !== e) {
                        var n = null === t,
                            r = t === A,
                            i = t === t,
                            o = null === e,
                            a = e === A,
                            s = e === e;
                        if (t > e && !o || !i || n && !a && s || r && s) return 1;
                        if (t < e && !n || !s || o && !r && i || a && i) return -1
                    }
                    return 0
                }

                function i(t, e, n) {
                    for (var r = t.length, i = n ? r : -1; n ? i-- : ++i < r;)
                        if (e(t[i], i, t)) return i;
                    return -1
                }

                function o(t, e, n) {
                    if (e !== e) return g(t, n);
                    for (var r = n - 1, i = t.length; ++r < i;)
                        if (t[r] === e) return r;
                    return -1
                }

                function a(t) {
                    return "function" == typeof t || false
                }

                function s(t) {
                    return null == t ? "" : t + ""
                }

                function l(t, e) {
                    for (var n = -1, r = t.length; ++n < r && e.indexOf(t.charAt(n)) > -1;);
                    return n
                }

                function u(t, e) {
                    for (var n = t.length; n-- && e.indexOf(t.charAt(n)) > -1;);
                    return n
                }

                function c(t, e) {
                    return r(t.criteria, e.criteria) || t.index - e.index
                }

                function f(t, e, n) {
                    for (var i = -1, o = t.criteria, a = e.criteria, s = o.length, l = n.length; ++i < s;) {
                        var u = r(o[i], a[i]);
                        if (u) {
                            if (i >= l) return u;
                            var c = n[i];
                            return u * ("asc" === c || true === c ? 1 : -1)
                        }
                    }
                    return t.index - e.index
                }

                function p(t) {
                    return Ht[t]
                }

                function h(t) {
                    return Mt[t]
                }

                function d(t, e, n) {
                    return e ? t = Wt[t] : n && (t = Xt[t]), "\\" + t
                }

                function v(t) {
                    return "\\" + Xt[t]
                }

                function g(t, e, n) {
                    for (var r = t.length, i = e + (n ? 0 : -1); n ? i-- : ++i < r;) {
                        var o = t[i];
                        if (o !== o) return i
                    }
                    return -1
                }

                function m(t) {
                    return !!t && "object" == typeof t
                }

                function y(t) {
                    return t <= 160 && t >= 9 && t <= 13 || 32 == t || 160 == t || 5760 == t || 6158 == t || t >= 8192 && (t <= 8202 || 8232 == t || 8233 == t || 8239 == t || 8287 == t || 12288 == t || 65279 == t)
                }

                function b(t, e) {
                    for (var n = -1, r = t.length, i = -1, o = []; ++n < r;) t[n] === e && (t[n] = U, o[++i] = n);
                    return o
                }

                function x(t, e) {
                    for (var n, r = -1, i = t.length, o = -1, a = []; ++r < i;) {
                        var s = t[r],
                            l = e ? e(s, r, t) : s;
                        r && n === l || (n = l, a[++o] = s)
                    }
                    return a
                }

                function _(t) {
                    for (var e = -1, n = t.length; ++e < n && y(t.charCodeAt(e)););
                    return e
                }

                function w(t) {
                    for (var e = t.length; e-- && y(t.charCodeAt(e)););
                    return e
                }

                function C(t) {
                    return Bt[t]
                }

                function k(t) {
                    function e(t) {
                        if (m(t) && !Os(t) && !(t instanceof Ht)) {
                            if (t instanceof y) return t;
                            if (ea.call(t, "__chain__") && ea.call(t, "__wrapped__")) return hr(t)
                        }
                        return new y(t)
                    }

                    function n() {}

                    function y(t, e, n) {
                        this.__wrapped__ = t, this.__actions__ = n || [], this.__chain__ = !!e
                    }

                    function Ht(t) {
                        this.__wrapped__ = t, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = $a, this.__views__ = []
                    }

                    function Mt() {
                        var t = new Ht(this.__wrapped__);
                        return t.__actions__ = ne(this.__actions__), t.__dir__ = this.__dir__, t.__filtered__ = this.__filtered__, t.__iteratees__ = ne(this.__iteratees__), t.__takeCount__ = this.__takeCount__, t.__views__ = ne(this.__views__), t
                    }

                    function Bt() {
                        if (this.__filtered__) {
                            var t = new Ht(this);
                            t.__dir__ = -1, t.__filtered__ = true
                        } else t = this.clone(), t.__dir__ *= -1;
                        return t
                    }

                    function Ut() {
                        var t = this.__wrapped__.value(),
                            e = this.__dir__,
                            n = Os(t),
                            r = e < 0,
                            i = n ? t.length : 0,
                            o = Xn(0, i, this.__views__),
                            a = o.start,
                            s = o.end,
                            l = s - a,
                            u = r ? s : a - 1,
                            c = this.__iteratees__,
                            f = c.length,
                            p = 0,
                            h = Ca(l, this.__takeCount__);
                        if (!n || i < q || i == l && h == l) return nn(r && n ? t.reverse() : t, this.__actions__);
                        var d = [];
                        t: for (; l-- && p < h;) {
                            u += e;
                            for (var v = -1, g = t[u]; ++v < f;) {
                                var m = c[v],
                                    y = m.iteratee,
                                    b = m.type,
                                    x = y(g);
                                if (b == M) g = x;
                                else if (!x) {
                                    if (b == H) continue t;
                                    break t
                                }
                            }
                            d[p++] = g
                        }
                        return d
                    }

                    function Wt() {
                        this.__data__ = {}
                    }

                    function Xt(t) {
                        return this.has(t) && delete this.__data__[t]
                    }

                    function Yt(t) {
                        return "__proto__" == t ? A : this.__data__[t]
                    }

                    function zt(t) {
                        return "__proto__" != t && ea.call(this.__data__, t)
                    }

                    function Zt(t, e) {
                        return "__proto__" != t && (this.__data__[t] = e), this
                    }

                    function Qt(t) {
                        var e = t ? t.length : 0;
                        for (this.data = {
                                hash: ma(null),
                                set: new fa
                            }; e--;) this.push(t[e])
                    }

                    function Gt(t, e) {
                        var n = t.data;
                        return ("string" == typeof e || Ni(e) ? n.set.has(e) : n.hash[e]) ? 0 : -1
                    }

                    function Kt(t) {
                        var e = this.data;
                        "string" == typeof t || Ni(t) ? e.set.add(t) : e.hash[t] = true
                    }

                    function ee(t, e) {
                        for (var n = -1, r = t.length, i = -1, o = e.length, a = Ho(r + o); ++n < r;) a[n] = t[n];
                        for (; ++i < o;) a[n++] = e[i];
                        return a
                    }

                    function ne(t, e) {
                        var n = -1,
                            r = t.length;
                        for (e || (e = Ho(r)); ++n < r;) e[n] = t[n];
                        return e
                    }

                    function re(t, e) {
                        for (var n = -1, r = t.length; ++n < r && false !== e(t[n], n, t););
                        return t
                    }

                    function ie(t, e) {
                        for (var n = t.length; n-- && false !== e(t[n], n, t););
                        return t
                    }

                    function oe(t, e) {
                        for (var n = -1, r = t.length; ++n < r;)
                            if (!e(t[n], n, t)) return false;
                        return true
                    }

                    function ae(t, e, n, r) {
                        for (var i = -1, o = t.length, a = r, s = a; ++i < o;) {
                            var l = t[i],
                                u = +e(l);
                            n(u, a) && (a = u, s = l)
                        }
                        return s
                    }

                    function se(t, e) {
                        for (var n = -1, r = t.length, i = -1, o = []; ++n < r;) {
                            var a = t[n];
                            e(a, n, t) && (o[++i] = a)
                        }
                        return o
                    }

                    function le(t, e) {
                        for (var n = -1, r = t.length, i = Ho(r); ++n < r;) i[n] = e(t[n], n, t);
                        return i
                    }

                    function ue(t, e) {
                        for (var n = -1, r = e.length, i = t.length; ++n < r;) t[i + n] = e[n];
                        return t
                    }

                    function ce(t, e, n, r) {
                        var i = -1,
                            o = t.length;
                        for (r && o && (n = t[++i]); ++i < o;) n = e(n, t[i], i, t);
                        return n
                    }

                    function fe(t, e, n, r) {
                        var i = t.length;
                        for (r && i && (n = t[--i]); i--;) n = e(n, t[i], i, t);
                        return n
                    }

                    function pe(t, e) {
                        for (var n = -1, r = t.length; ++n < r;)
                            if (e(t[n], n, t)) return true;
                        return false
                    }

                    function he(t, e) {
                        for (var n = t.length, r = 0; n--;) r += +e(t[n]) || 0;
                        return r
                    }

                    function de(t, e) {
                        return t === A ? e : t
                    }

                    function ve(t, e, n, r) {
                        return t !== A && ea.call(r, n) ? t : e
                    }

                    function ge(t, e, n) {
                        for (var r = -1, i = qs(e), o = i.length; ++r < o;) {
                            var a = i[r],
                                s = t[a],
                                l = n(s, e[a], a, t, e);
                            (l === l ? l === s : s !== s) && (s !== A || a in t) || (t[a] = l)
                        }
                        return t
                    }

                    function me(t, e) {
                        return null == e ? t : be(e, qs(e), t)
                    }

                    function ye(t, e) {
                        for (var n = -1, r = null == t, i = !r && Gn(t), o = i ? t.length : 0, a = e.length, s = Ho(a); ++n < a;) {
                            var l = e[n];
                            s[n] = i ? Kn(l, o) ? t[l] : A : r ? A : t[l]
                        }
                        return s
                    }

                    function be(t, e, n) {
                        n || (n = {});
                        for (var r = -1, i = e.length; ++r < i;) {
                            var o = e[r];
                            n[o] = t[o]
                        }
                        return n
                    }

                    function xe(t, e, n) {
                        var r = typeof t;
                        return "function" == r ? e === A ? t : an(t, e, n) : null == t ? $o : "object" == r ? Ve(t) : e === A ? No(t) : qe(t, e)
                    }

                    function _e(t, e, n, r, i, o, a) {
                        var s;
                        if (n && (s = i ? n(t, r, i) : n(t)), s !== A) return s;
                        if (!Ni(t)) return t;
                        var l = Os(t);
                        if (l) {
                            if (s = Yn(t), !e) return ne(t, s)
                        } else {
                            var u = ra.call(t),
                                c = u == Q;
                            if (u != K && u != W && (!c || i)) return qt[u] ? Zn(t, u, e) : i ? t : {};
                            if (s = zn(c ? {} : t), !e) return me(s, t)
                        }
                        o || (o = []), a || (a = []);
                        for (var f = o.length; f--;)
                            if (o[f] == t) return a[f];
                        return o.push(t), a.push(s), (l ? re : Ee)(t, function (r, i) {
                            s[i] = _e(r, e, n, i, t, o, a)
                        }), s
                    }

                    function we(t, e, n) {
                        if ("function" != typeof t) throw new Qo(B);
                        return pa(function () {
                            t.apply(A, n)
                        }, e)
                    }

                    function Ce(t, e) {
                        var n = t ? t.length : 0,
                            r = [];
                        if (!n) return r;
                        var i = -1,
                            a = Bn(),
                            s = a == o,
                            l = s && e.length >= q ? vn(e) : null,
                            u = e.length;
                        l && (a = Gt, s = false, e = l);
                        t: for (; ++i < n;) {
                            var c = t[i];
                            if (s && c === c) {
                                for (var f = u; f--;)
                                    if (e[f] === c) continue t;
                                r.push(c)
                            } else a(e, c, 0) < 0 && r.push(c)
                        }
                        return r
                    }

                    function ke(t, e) {
                        var n = true;
                        return Fa(t, function (t, r, i) {
                            return n = !!e(t, r, i)
                        }), n
                    }

                    function Ae(t, e, n, r) {
                        var i = r,
                            o = i;
                        return Fa(t, function (t, a, s) {
                            var l = +e(t, a, s);
                            (n(l, i) || l === r && l === o) && (i = l, o = t)
                        }), o
                    }

                    function Te(t, e, n, r) {
                        var i = t.length;
                        for (n = null == n ? 0 : +n || 0, n < 0 && (n = -n > i ? 0 : i + n), r = r === A || r > i ? i : +r || 0, r < 0 && (r += i), i = n > r ? 0 : r >>> 0, n >>>= 0; n < i;) t[n++] = e;
                        return t
                    }

                    function Se(t, e) {
                        var n = [];
                        return Fa(t, function (t, r, i) {
                            e(t, r, i) && n.push(t)
                        }), n
                    }

                    function $e(t, e, n, r) {
                        var i;
                        return n(t, function (t, n, o) {
                            if (e(t, n, o)) return i = r ? n : t, false
                        }), i
                    }

                    function Oe(t, e, n, r) {
                        r || (r = []);
                        for (var i = -1, o = t.length; ++i < o;) {
                            var a = t[i];
                            m(a) && Gn(a) && (n || Os(a) || Ai(a)) ? e ? Oe(a, e, n, r) : ue(r, a) : n || (r[r.length] = a)
                        }
                        return r
                    }

                    function Pe(t, e) {
                        return Ra(t, e, to)
                    }

                    function Ee(t, e) {
                        return Ra(t, e, qs)
                    }

                    function je(t, e) {
                        return Va(t, e, qs)
                    }

                    function De(t, e) {
                        for (var n = -1, r = e.length, i = -1, o = []; ++n < r;) {
                            var a = e[n];
                            Di(t[a]) && (o[++i] = a)
                        }
                        return o
                    }

                    function Ne(t, e, n) {
                        if (null != t) {
                            n !== A && n in fr(t) && (e = [n]);
                            for (var r = 0, i = e.length; null != t && r < i;) t = t[e[r++]];
                            return r && r == i ? t : A
                        }
                    }

                    function Ie(t, e, n, r, i, o) {
                        return t === e || (null == t || null == e || !Ni(t) && !m(e) ? t !== t && e !== e : Fe(t, e, Ie, n, r, i, o))
                    }

                    function Fe(t, e, n, r, i, o, a) {
                        var s = Os(t),
                            l = Os(e),
                            u = X,
                            c = X;
                        s || (u = ra.call(t), u == W ? u = K : u != K && (s = Bi(t))), l || (c = ra.call(e), c == W ? c = K : c != K && (l = Bi(e)));
                        var f = u == K,
                            p = c == K,
                            h = u == c;
                        if (h && !s && !f) return Vn(t, e, u);
                        if (!i) {
                            var d = f && ea.call(t, "__wrapped__"),
                                v = p && ea.call(e, "__wrapped__");
                            if (d || v) return n(d ? t.value() : t, v ? e.value() : e, r, i, o, a)
                        }
                        if (!h) return false;
                        o || (o = []), a || (a = []);
                        for (var g = o.length; g--;)
                            if (o[g] == t) return a[g] == e;
                        o.push(t), a.push(e);
                        var m = (s ? Rn : qn)(t, e, n, r, i, o, a);
                        return o.pop(), a.pop(), m
                    }

                    function Le(t, e, n) {
                        var r = e.length,
                            i = r,
                            o = !n;
                        if (null == t) return !i;
                        for (t = fr(t); r--;) {
                            var a = e[r];
                            if (o && a[2] ? a[1] !== t[a[0]] : !(a[0] in t)) return false
                        }
                        for (; ++r < i;) {
                            a = e[r];
                            var s = a[0],
                                l = t[s],
                                u = a[1];
                            if (o && a[2]) {
                                if (l === A && !(s in t)) return false
                            } else {
                                var c = n ? n(l, u, s) : A;
                                if (!(c === A ? Ie(u, l, n, true) : c)) return false
                            }
                        }
                        return true
                    }

                    function Re(t, e) {
                        var n = -1,
                            r = Gn(t) ? Ho(t.length) : [];
                        return Fa(t, function (t, i, o) {
                            r[++n] = e(t, i, o)
                        }), r
                    }

                    function Ve(t) {
                        var e = Un(t);
                        if (1 == e.length && e[0][2]) {
                            var n = e[0][0],
                                r = e[0][1];
                            return function (t) {
                                return null != t && (t[n] === r && (r !== A || n in fr(t)))
                            }
                        }
                        return function (t) {
                            return Le(t, e)
                        }
                    }

                    function qe(t, e) {
                        var n = Os(t),
                            r = tr(t) && rr(e),
                            i = t + "";
                        return t = pr(t),
                            function (o) {
                                if (null == o) return false;
                                var a = i;
                                if (o = fr(o), (n || !r) && !(a in o)) {
                                    if (null == (o = 1 == t.length ? o : Ne(o, ze(t, 0, -1)))) return false;
                                    a = Tr(t), o = fr(o)
                                }
                                return o[a] === e ? e !== A || a in o : Ie(e, o[a], A, true)
                            }
                    }

                    function He(t, e, n, r, i) {
                        if (!Ni(t)) return t;
                        var o = Gn(e) && (Os(e) || Bi(e)),
                            a = o ? A : qs(e);
                        return re(a || e, function (s, l) {
                            if (a && (l = s, s = e[l]), m(s)) r || (r = []), i || (i = []), Me(t, e, l, He, n, r, i);
                            else {
                                var u = t[l],
                                    c = n ? n(u, s, l, t, e) : A,
                                    f = c === A;
                                f && (c = s), c === A && (!o || l in t) || !f && (c === c ? c === u : u !== u) || (t[l] = c)
                            }
                        }), t
                    }

                    function Me(t, e, n, r, i, o, a) {
                        for (var s = o.length, l = e[n]; s--;)
                            if (o[s] == l) return void(t[n] = a[s]);
                        var u = t[n],
                            c = i ? i(u, l, n, t, e) : A,
                            f = c === A;
                        f && (c = l, Gn(l) && (Os(l) || Bi(l)) ? c = Os(u) ? u : Gn(u) ? ne(u) : [] : qi(l) || Ai(l) ? c = Ai(u) ? zi(u) : qi(u) ? u : {} : f = false), o.push(l), a.push(c), f ? t[n] = r(c, l, i, o, a) : (c === c ? c !== u : u === u) && (t[n] = c)
                    }

                    function Be(t) {
                        return function (e) {
                            return null == e ? A : e[t]
                        }
                    }

                    function Ue(t) {
                        var e = t + "";
                        return t = pr(t),
                            function (n) {
                                return Ne(n, t, e)
                            }
                    }

                    function We(t, e) {
                        for (var n = t ? e.length : 0; n--;) {
                            var r = e[n];
                            if (r != i && Kn(r)) {
                                var i = r;
                                ha.call(t, r, 1)
                            }
                        }
                        return t
                    }

                    function Xe(t, e) {
                        return t + ya(Ta() * (e - t + 1))
                    }

                    function Ye(t, e, n, r, i) {
                        return i(t, function (t, i, o) {
                            n = r ? (r = false, t) : e(n, t, i, o)
                        }), n
                    }

                    function ze(t, e, n) {
                        var r = -1,
                            i = t.length;
                        e = null == e ? 0 : +e || 0, e < 0 && (e = -e > i ? 0 : i + e), n = n === A || n > i ? i : +n || 0, n < 0 && (n += i), i = e > n ? 0 : n - e >>> 0, e >>>= 0;
                        for (var o = Ho(i); ++r < i;) o[r] = t[r + e];
                        return o
                    }

                    function Ze(t, e) {
                        var n;
                        return Fa(t, function (t, r, i) {
                            return !(n = e(t, r, i))
                        }), !!n
                    }

                    function Qe(t, e) {
                        var n = t.length;
                        for (t.sort(e); n--;) t[n] = t[n].value;
                        return t
                    }

                    function Ge(t, e, n) {
                        var r = Hn(),
                            i = -1;
                        return e = le(e, function (t) {
                            return r(t)
                        }), Qe(Re(t, function (t) {
                            return {
                                criteria: le(e, function (e) {
                                    return e(t)
                                }),
                                index: ++i,
                                value: t
                            }
                        }), function (t, e) {
                            return f(t, e, n)
                        })
                    }

                    function Ke(t, e) {
                        var n = 0;
                        return Fa(t, function (t, r, i) {
                            n += +e(t, r, i) || 0
                        }), n
                    }

                    function Je(t, e) {
                        var n = -1,
                            r = Bn(),
                            i = t.length,
                            a = r == o,
                            s = a && i >= q,
                            l = s ? vn() : null,
                            u = [];
                        l ? (r = Gt, a = false) : (s = false, l = e ? [] : u);
                        t: for (; ++n < i;) {
                            var c = t[n],
                                f = e ? e(c, n, t) : c;
                            if (a && c === c) {
                                for (var p = l.length; p--;)
                                    if (l[p] === f) continue t;
                                e && l.push(f), u.push(c)
                            } else r(l, f, 0) < 0 && ((e || s) && l.push(f), u.push(c))
                        }
                        return u
                    }

                    function tn(t, e) {
                        for (var n = -1, r = e.length, i = Ho(r); ++n < r;) i[n] = t[e[n]];
                        return i
                    }

                    function en(t, e, n, r) {
                        for (var i = t.length, o = r ? i : -1;
                            (r ? o-- : ++o < i) && e(t[o], o, t););
                        return n ? ze(t, r ? 0 : o, r ? o + 1 : i) : ze(t, r ? o + 1 : 0, r ? i : o)
                    }

                    function nn(t, e) {
                        var n = t;
                        n instanceof Ht && (n = n.value());
                        for (var r = -1, i = e.length; ++r < i;) {
                            var o = e[r];
                            n = o.func.apply(o.thisArg, ue([n], o.args))
                        }
                        return n
                    }

                    function rn(t, e, n) {
                        var r = 0,
                            i = t ? t.length : r;
                        if ("number" == typeof e && e === e && i <= Ea) {
                            for (; r < i;) {
                                var o = r + i >>> 1,
                                    a = t[o];
                                (n ? a <= e : a < e) && null !== a ? r = o + 1 : i = o
                            }
                            return i
                        }
                        return on(t, e, $o, n)
                    }

                    function on(t, e, n, r) {
                        e = n(e);
                        for (var i = 0, o = t ? t.length : 0, a = e !== e, s = null === e, l = e === A; i < o;) {
                            var u = ya((i + o) / 2),
                                c = n(t[u]),
                                f = c !== A,
                                p = c === c;
                            if (a) var h = p || r;
                            else h = s ? p && f && (r || null != c) : l ? p && (r || f) : null != c && (r ? c <= e : c < e);
                            h ? i = u + 1 : o = u
                        }
                        return Ca(o, Pa)
                    }

                    function an(t, e, n) {
                        if ("function" != typeof t) return $o;
                        if (e === A) return t;
                        switch (n) {
                            case 1:
                                return function (n) {
                                    return t.call(e, n)
                                };
                            case 3:
                                return function (n, r, i) {
                                    return t.call(e, n, r, i)
                                };
                            case 4:
                                return function (n, r, i, o) {
                                    return t.call(e, n, r, i, o)
                                };
                            case 5:
                                return function (n, r, i, o, a) {
                                    return t.call(e, n, r, i, o, a)
                                }
                        }
                        return function () {
                            return t.apply(e, arguments)
                        }
                    }

                    function sn(t) {
                        var e = new aa(t.byteLength);
                        return new da(e).set(new da(t)), e
                    }

                    function ln(t, e, n) {
                        for (var r = n.length, i = -1, o = wa(t.length - r, 0), a = -1, s = e.length, l = Ho(s + o); ++a < s;) l[a] = e[a];
                        for (; ++i < r;) l[n[i]] = t[i];
                        for (; o--;) l[a++] = t[i++];
                        return l
                    }

                    function un(t, e, n) {
                        for (var r = -1, i = n.length, o = -1, a = wa(t.length - i, 0), s = -1, l = e.length, u = Ho(a + l); ++o < a;) u[o] = t[o];
                        for (var c = o; ++s < l;) u[c + s] = e[s];
                        for (; ++r < i;) u[c + n[r]] = t[o++];
                        return u
                    }

                    function cn(t, e) {
                        return function (n, r, i) {
                            var o = e ? e() : {};
                            if (r = Hn(r, i, 3), Os(n))
                                for (var a = -1, s = n.length; ++a < s;) {
                                    var l = n[a];
                                    t(o, l, r(l, a, n), n)
                                } else Fa(n, function (e, n, i) {
                                    t(o, e, r(e, n, i), i)
                                });
                            return o
                        }
                    }

                    function fn(t) {
                        return mi(function (e, n) {
                            var r = -1,
                                i = null == e ? 0 : n.length,
                                o = i > 2 ? n[i - 2] : A,
                                a = i > 2 ? n[2] : A,
                                s = i > 1 ? n[i - 1] : A;
                            for ("function" == typeof o ? (o = an(o, s, 5), i -= 2) : (o = "function" == typeof s ? s : A, i -= o ? 1 : 0), a && Jn(n[0], n[1], a) && (o = i < 3 ? A : o, i = 1); ++r < i;) {
                                var l = n[r];
                                l && t(e, l, o)
                            }
                            return e
                        })
                    }

                    function pn(t, e) {
                        return function (n, r) {
                            var i = n ? Ma(n) : 0;
                            if (!nr(i)) return t(n, r);
                            for (var o = e ? i : -1, a = fr(n);
                                (e ? o-- : ++o < i) && false !== r(a[o], o, a););
                            return n
                        }
                    }

                    function hn(t) {
                        return function (e, n, r) {
                            for (var i = fr(e), o = r(e), a = o.length, s = t ? a : -1; t ? s-- : ++s < a;) {
                                var l = o[s];
                                if (false === n(i[l], l, i)) break
                            }
                            return e
                        }
                    }

                    function dn(t, e) {
                        function n() {
                            return (this && this !== Jt && this instanceof n ? r : t).apply(e, arguments)
                        }
                        var r = mn(t);
                        return n
                    }

                    function vn(t) {
                        return ma && fa ? new Qt(t) : null
                    }

                    function gn(t) {
                        return function (e) {
                            for (var n = -1, r = Ao(co(e)), i = r.length, o = ""; ++n < i;) o = t(o, r[n], n);
                            return o
                        }
                    }

                    function mn(t) {
                        return function () {
                            var e = arguments;
                            switch (e.length) {
                                case 0:
                                    return new t;
                                case 1:
                                    return new t(e[0]);
                                case 2:
                                    return new t(e[0], e[1]);
                                case 3:
                                    return new t(e[0], e[1], e[2]);
                                case 4:
                                    return new t(e[0], e[1], e[2], e[3]);
                                case 5:
                                    return new t(e[0], e[1], e[2], e[3], e[4]);
                                case 6:
                                    return new t(e[0], e[1], e[2], e[3], e[4], e[5]);
                                case 7:
                                    return new t(e[0], e[1], e[2], e[3], e[4], e[5], e[6])
                            }
                            var n = Ia(t.prototype),
                                r = t.apply(n, e);
                            return Ni(r) ? r : n
                        }
                    }

                    function yn(t) {
                        function e(n, r, i) {
                            i && Jn(n, r, i) && (r = A);
                            var o = Ln(n, t, A, A, A, A, A, r);
                            return o.placeholder = e.placeholder, o
                        }
                        return e
                    }

                    function bn(t, e) {
                        return mi(function (n) {
                            var r = n[0];
                            return null == r ? r : (n.push(e), t.apply(A, n))
                        })
                    }

                    function xn(t, e) {
                        return function (n, r, i) {
                            if (i && Jn(n, r, i) && (r = A), r = Hn(r, i, 3), 1 == r.length) {
                                n = Os(n) ? n : cr(n);
                                var o = ae(n, r, t, e);
                                if (!n.length || o !== e) return o
                            }
                            return Ae(n, r, t, e)
                        }
                    }

                    function _n(t, e) {
                        return function (n, r, o) {
                            if (r = Hn(r, o, 3), Os(n)) {
                                var a = i(n, r, e);
                                return a > -1 ? n[a] : A
                            }
                            return $e(n, r, t)
                        }
                    }

                    function wn(t) {
                        return function (e, n, r) {
                            return e && e.length ? (n = Hn(n, r, 3), i(e, n, t)) : -1
                        }
                    }

                    function Cn(t) {
                        return function (e, n, r) {
                            return n = Hn(n, r, 3), $e(e, n, t, true)
                        }
                    }

                    function kn(t) {
                        return function () {
                            for (var e, n = arguments.length, r = t ? n : -1, i = 0, o = Ho(n); t ? r-- : ++r < n;) {
                                var a = o[i++] = arguments[r];
                                if ("function" != typeof a) throw new Qo(B);
                                !e && y.prototype.thru && "wrapper" == Mn(a) && (e = new y([], true))
                            }
                            for (r = e ? -1 : n; ++r < n;) {
                                a = o[r];
                                var s = Mn(a),
                                    l = "wrapper" == s ? Ha(a) : A;
                                e = l && er(l[0]) && l[1] == (N | P | j | I) && !l[4].length && 1 == l[9] ? e[Mn(l[0])].apply(e, l[3]) : 1 == a.length && er(a) ? e[s]() : e.thru(a)
                            }
                            return function () {
                                var t = arguments,
                                    r = t[0];
                                if (e && 1 == t.length && Os(r) && r.length >= q) return e.plant(r).value();
                                for (var i = 0, a = n ? o[i].apply(this, t) : r; ++i < n;) a = o[i].call(this, a);
                                return a
                            }
                        }
                    }

                    function An(t, e) {
                        return function (n, r, i) {
                            return "function" == typeof r && i === A && Os(n) ? t(n, r) : e(n, an(r, i, 3))
                        }
                    }

                    function Tn(t) {
                        return function (e, n, r) {
                            return "function" == typeof n && r === A || (n = an(n, r, 3)), t(e, n, to)
                        }
                    }

                    function Sn(t) {
                        return function (e, n, r) {
                            return "function" == typeof n && r === A || (n = an(n, r, 3)), t(e, n)
                        }
                    }

                    function $n(t) {
                        return function (e, n, r) {
                            var i = {};
                            return n = Hn(n, r, 3), Ee(e, function (e, r, o) {
                                var a = n(e, r, o);
                                r = t ? a : r, e = t ? e : a, i[r] = e
                            }), i
                        }
                    }

                    function On(t) {
                        return function (e, n, r) {
                            return e = s(e), (t ? e : "") + Dn(e, n, r) + (t ? "" : e)
                        }
                    }

                    function Pn(t) {
                        var e = mi(function (n, r) {
                            var i = b(r, e.placeholder);
                            return Ln(n, t, A, r, i)
                        });
                        return e
                    }

                    function En(t, e) {
                        return function (n, r, i, o) {
                            var a = arguments.length < 3;
                            return "function" == typeof r && o === A && Os(n) ? t(n, r, i, a) : Ye(n, Hn(r, o, 4), i, a, e)
                        }
                    }

                    function jn(t, e, n, r, i, o, a, s, l, u) {
                        function c() {
                            for (var y = arguments.length, x = y, _ = Ho(y); x--;) _[x] = arguments[x];
                            if (r && (_ = ln(_, r, i)), o && (_ = un(_, o, a)), d || g) {
                                var w = c.placeholder,
                                    C = b(_, w);
                                if ((y -= C.length) < u) {
                                    var k = s ? ne(s) : A,
                                        T = wa(u - y, 0),
                                        O = d ? C : A,
                                        P = d ? A : C,
                                        E = d ? _ : A,
                                        N = d ? A : _;
                                    e |= d ? j : D, e &= ~(d ? D : j), v || (e &= ~(S | $));
                                    var I = [t, e, n, E, O, N, P, k, l, T],
                                        F = jn.apply(A, I);
                                    return er(t) && Ba(F, I), F.placeholder = w, F
                                }
                            }
                            var L = p ? n : this,
                                R = h ? L[t] : t;
                            return s && (_ = lr(_, s)), f && l < _.length && (_.length = l), this && this !== Jt && this instanceof c && (R = m || mn(t)), R.apply(L, _)
                        }
                        var f = e & N,
                            p = e & S,
                            h = e & $,
                            d = e & P,
                            v = e & O,
                            g = e & E,
                            m = h ? A : mn(t);
                        return c
                    }

                    function Dn(t, e, n) {
                        var r = t.length;
                        if (e = +e, r >= e || !xa(e)) return "";
                        var i = e - r;
                        return n = null == n ? " " : n + "", mo(n, ga(i / n.length)).slice(0, i)
                    }

                    function Nn(t, e, n, r) {
                        function i() {
                            for (var e = -1, s = arguments.length, l = -1, u = r.length, c = Ho(u + s); ++l < u;) c[l] = r[l];
                            for (; s--;) c[l++] = arguments[++e];
                            return (this && this !== Jt && this instanceof i ? a : t).apply(o ? n : this, c)
                        }
                        var o = e & S,
                            a = mn(t);
                        return i
                    }

                    function In(t) {
                        var e = Wo[t];
                        return function (t, n) {
                            return n = n === A ? 0 : +n || 0, n ? (n = ua(10, n), e(t * n) / n) : e(t)
                        }
                    }

                    function Fn(t) {
                        return function (e, n, r, i) {
                            var o = Hn(r);
                            return null == r && o === xe ? rn(e, n, t) : on(e, n, o(r, i, 1), t)
                        }
                    }

                    function Ln(t, e, n, r, i, o, a, s) {
                        var l = e & $;
                        if (!l && "function" != typeof t) throw new Qo(B);
                        var u = r ? r.length : 0;
                        if (u || (e &= ~(j | D), r = i = A), u -= i ? i.length : 0, e & D) {
                            var c = r,
                                f = i;
                            r = i = A
                        }
                        var p = l ? A : Ha(t),
                            h = [t, e, n, r, i, c, f, o, a, s];
                        if (p && (ir(h, p), e = h[1], s = h[9]), h[9] = null == s ? l ? 0 : t.length : wa(s - u, 0) || 0, e == S) var d = dn(h[0], h[2]);
                        else d = e != j && e != (S | j) || h[4].length ? jn.apply(A, h) : Nn.apply(A, h);
                        return (p ? qa : Ba)(d, h)
                    }

                    function Rn(t, e, n, r, i, o, a) {
                        var s = -1,
                            l = t.length,
                            u = e.length;
                        if (l != u && !(i && u > l)) return false;
                        for (; ++s < l;) {
                            var c = t[s],
                                f = e[s],
                                p = r ? r(i ? f : c, i ? c : f, s) : A;
                            if (p !== A) {
                                if (p) continue;
                                return false
                            }
                            if (i) {
                                if (!pe(e, function (t) {
                                        return c === t || n(c, t, r, i, o, a)
                                    })) return false
                            } else if (c !== f && !n(c, f, r, i, o, a)) return false
                        }
                        return true
                    }

                    function Vn(t, e, n) {
                        switch (n) {
                            case Y:
                            case z:
                                return +t == +e;
                            case Z:
                                return t.name == e.name && t.message == e.message;
                            case G:
                                return t != +t ? e != +e : t == +e;
                            case J:
                            case tt:
                                return t == e + ""
                        }
                        return false
                    }

                    function qn(t, e, n, r, i, o, a) {
                        var s = qs(t),
                            l = s.length;
                        if (l != qs(e).length && !i) return false;
                        for (var u = l; u--;) {
                            var c = s[u];
                            if (!(i ? c in e : ea.call(e, c))) return false
                        }
                        for (var f = i; ++u < l;) {
                            c = s[u];
                            var p = t[c],
                                h = e[c],
                                d = r ? r(i ? h : p, i ? p : h, c) : A;
                            if (!(d === A ? n(p, h, r, i, o, a) : d)) return false;
                            f || (f = "constructor" == c)
                        }
                        if (!f) {
                            var v = t.constructor,
                                g = e.constructor;
                            if (v != g && "constructor" in t && "constructor" in e && !("function" == typeof v && v instanceof v && "function" == typeof g && g instanceof g)) return false
                        }
                        return true
                    }

                    function Hn(t, n, r) {
                        var i = e.callback || To;
                        return i = i === To ? xe : i, r ? i(t, n, r) : i
                    }

                    function Mn(t) {
                        for (var e = t.name, n = Na[e], r = n ? n.length : 0; r--;) {
                            var i = n[r],
                                o = i.func;
                            if (null == o || o == t) return i.name
                        }
                        return e
                    }

                    function Bn(t, n, r) {
                        var i = e.indexOf || kr;
                        return i = i === kr ? o : i, t ? i(t, n, r) : i
                    }

                    function Un(t) {
                        for (var e = eo(t), n = e.length; n--;) e[n][2] = rr(e[n][1]);
                        return e
                    }

                    function Wn(t, e) {
                        var n = null == t ? A : t[e];
                        return Li(n) ? n : A
                    }

                    function Xn(t, e, n) {
                        for (var r = -1, i = n.length; ++r < i;) {
                            var o = n[r],
                                a = o.size;
                            switch (o.type) {
                                case "drop":
                                    t += a;
                                    break;
                                case "dropRight":
                                    e -= a;
                                    break;
                                case "take":
                                    e = Ca(e, t + a);
                                    break;
                                case "takeRight":
                                    t = wa(t, e - a)
                            }
                        }
                        return {
                            start: t,
                            end: e
                        }
                    }

                    function Yn(t) {
                        var e = t.length,
                            n = new t.constructor(e);
                        return e && "string" == typeof t[0] && ea.call(t, "index") && (n.index = t.index, n.input = t.input), n
                    }

                    function zn(t) {
                        var e = t.constructor;
                        return "function" == typeof e && e instanceof e || (e = Yo), new e
                    }

                    function Zn(t, e, n) {
                        var r = t.constructor;
                        switch (e) {
                            case et:
                                return sn(t);
                            case Y:
                            case z:
                                return new r(+t);
                            case nt:
                            case rt:
                            case it:
                            case ot:
                            case at:
                            case st:
                            case lt:
                            case ut:
                            case ct:
                                var i = t.buffer;
                                return new r(n ? sn(i) : i, t.byteOffset, t.length);
                            case G:
                            case tt:
                                return new r(t);
                            case J:
                                var o = new r(t.source, Ot.exec(t));
                                o.lastIndex = t.lastIndex
                        }
                        return o
                    }

                    function Qn(t, e, n) {
                        null == t || tr(e, t) || (e = pr(e), t = 1 == e.length ? t : Ne(t, ze(e, 0, -1)), e = Tr(e));
                        var r = null == t ? t : t[e];
                        return null == r ? A : r.apply(t, n)
                    }

                    function Gn(t) {
                        return null != t && nr(Ma(t))
                    }

                    function Kn(t, e) {
                        return t = "number" == typeof t || jt.test(t) ? +t : -1, e = null == e ? ja : e, t > -1 && t % 1 == 0 && t < e
                    }

                    function Jn(t, e, n) {
                        if (!Ni(n)) return false;
                        var r = typeof e;
                        if ("number" == r ? Gn(n) && Kn(e, n.length) : "string" == r && e in n) {
                            var i = n[e];
                            return t === t ? t === i : i !== i
                        }
                        return false
                    }

                    function tr(t, e) {
                        var n = typeof t;
                        return !!("string" == n && wt.test(t) || "number" == n) || !Os(t) && (!_t.test(t) || null != e && t in fr(e))
                    }

                    function er(t) {
                        var n = Mn(t);
                        if (!(n in Ht.prototype)) return false;
                        var r = e[n];
                        if (t === r) return true;
                        var i = Ha(r);
                        return !!i && t === i[0]
                    }

                    function nr(t) {
                        return "number" == typeof t && t > -1 && t % 1 == 0 && t <= ja
                    }

                    function rr(t) {
                        return t === t && !Ni(t)
                    }

                    function ir(t, e) {
                        var n = t[1],
                            r = e[1],
                            i = n | r,
                            o = i < N,
                            a = r == N && n == P || r == N && n == I && t[7].length <= e[8] || r == (N | I) && n == P;
                        if (!o && !a) return t;
                        r & S && (t[2] = e[2], i |= n & S ? 0 : O);
                        var s = e[3];
                        if (s) {
                            var l = t[3];
                            t[3] = l ? ln(l, s, e[4]) : ne(s), t[4] = l ? b(t[3], U) : ne(e[4])
                        }
                        return s = e[5], s && (l = t[5], t[5] = l ? un(l, s, e[6]) : ne(s), t[6] = l ? b(t[5], U) : ne(e[6])), s = e[7], s && (t[7] = ne(s)), r & N && (t[8] = null == t[8] ? e[8] : Ca(t[8], e[8])), null == t[9] && (t[9] = e[9]), t[0] = e[0], t[1] = i, t
                    }

                    function or(t, e) {
                        return t === A ? e : Ps(t, e, or)
                    }

                    function ar(t, e) {
                        t = fr(t);
                        for (var n = -1, r = e.length, i = {}; ++n < r;) {
                            var o = e[n];
                            o in t && (i[o] = t[o])
                        }
                        return i
                    }

                    function sr(t, e) {
                        var n = {};
                        return Pe(t, function (t, r, i) {
                            e(t, r, i) && (n[r] = t)
                        }), n
                    }

                    function lr(t, e) {
                        for (var n = t.length, r = Ca(e.length, n), i = ne(t); r--;) {
                            var o = e[r];
                            t[r] = Kn(o, n) ? i[o] : A
                        }
                        return t
                    }

                    function ur(t) {
                        for (var e = to(t), n = e.length, r = n && t.length, i = !!r && nr(r) && (Os(t) || Ai(t)), o = -1, a = []; ++o < n;) {
                            var s = e[o];
                            (i && Kn(s, r) || ea.call(t, s)) && a.push(s)
                        }
                        return a
                    }

                    function cr(t) {
                        return null == t ? [] : Gn(t) ? Ni(t) ? t : Yo(t) : oo(t)
                    }

                    function fr(t) {
                        return Ni(t) ? t : Yo(t)
                    }

                    function pr(t) {
                        if (Os(t)) return t;
                        var e = [];
                        return s(t).replace(Ct, function (t, n, r, i) {
                            e.push(r ? i.replace(St, "$1") : n || t)
                        }), e
                    }

                    function hr(t) {
                        return t instanceof Ht ? t.clone() : new y(t.__wrapped__, t.__chain__, ne(t.__actions__))
                    }

                    function dr(t, e, n) {
                        e = (n ? Jn(t, e, n) : null == e) ? 1 : wa(ya(e) || 1, 1);
                        for (var r = 0, i = t ? t.length : 0, o = -1, a = Ho(ga(i / e)); r < i;) a[++o] = ze(t, r, r += e);
                        return a
                    }

                    function vr(t) {
                        for (var e = -1, n = t ? t.length : 0, r = -1, i = []; ++e < n;) {
                            var o = t[e];
                            o && (i[++r] = o)
                        }
                        return i
                    }

                    function gr(t, e, n) {
                        return (t ? t.length : 0) ? ((n ? Jn(t, e, n) : null == e) && (e = 1), ze(t, e < 0 ? 0 : e)) : []
                    }

                    function mr(t, e, n) {
                        var r = t ? t.length : 0;
                        return r ? ((n ? Jn(t, e, n) : null == e) && (e = 1), e = r - (+e || 0), ze(t, 0, e < 0 ? 0 : e)) : []
                    }

                    function yr(t, e, n) {
                        return t && t.length ? en(t, Hn(e, n, 3), true, true) : []
                    }

                    function br(t, e, n) {
                        return t && t.length ? en(t, Hn(e, n, 3), true) : []
                    }

                    function xr(t, e, n, r) {
                        var i = t ? t.length : 0;
                        return i ? (n && "number" != typeof n && Jn(t, e, n) && (n = 0, r = i), Te(t, e, n, r)) : []
                    }

                    function _r(t) {
                        return t ? t[0] : A
                    }

                    function wr(t, e, n) {
                        var r = t ? t.length : 0;
                        return n && Jn(t, e, n) && (e = false), r ? Oe(t, e) : []
                    }

                    function Cr(t) {
                        return (t ? t.length : 0) ? Oe(t, true) : []
                    }

                    function kr(t, e, n) {
                        var r = t ? t.length : 0;
                        if (!r) return -1;
                        if ("number" == typeof n) n = n < 0 ? wa(r + n, 0) : n;
                        else if (n) {
                            var i = rn(t, e);
                            return i < r && (e === e ? e === t[i] : t[i] !== t[i]) ? i : -1
                        }
                        return o(t, e, n || 0)
                    }

                    function Ar(t) {
                        return mr(t, 1)
                    }

                    function Tr(t) {
                        var e = t ? t.length : 0;
                        return e ? t[e - 1] : A
                    }

                    function Sr(t, e, n) {
                        var r = t ? t.length : 0;
                        if (!r) return -1;
                        var i = r;
                        if ("number" == typeof n) i = (n < 0 ? wa(r + n, 0) : Ca(n || 0, r - 1)) + 1;
                        else if (n) {
                            i = rn(t, e, true) - 1;
                            var o = t[i];
                            return (e === e ? e === o : o !== o) ? i : -1
                        }
                        if (e !== e) return g(t, i, true);
                        for (; i--;)
                            if (t[i] === e) return i;
                        return -1
                    }

                    function $r() {
                        var t = arguments,
                            e = t[0];
                        if (!e || !e.length) return e;
                        for (var n = 0, r = Bn(), i = t.length; ++n < i;)
                            for (var o = 0, a = t[n];
                                (o = r(e, a, o)) > -1;) ha.call(e, o, 1);
                        return e
                    }

                    function Or(t, e, n) {
                        var r = [];
                        if (!t || !t.length) return r;
                        var i = -1,
                            o = [],
                            a = t.length;
                        for (e = Hn(e, n, 3); ++i < a;) {
                            var s = t[i];
                            e(s, i, t) && (r.push(s), o.push(i))
                        }
                        return We(t, o), r
                    }

                    function Pr(t) {
                        return gr(t, 1)
                    }

                    function Er(t, e, n) {
                        var r = t ? t.length : 0;
                        return r ? (n && "number" != typeof n && Jn(t, e, n) && (e = 0, n = r), ze(t, e, n)) : []
                    }

                    function jr(t, e, n) {
                        return (t ? t.length : 0) ? ((n ? Jn(t, e, n) : null == e) && (e = 1), ze(t, 0, e < 0 ? 0 : e)) : []
                    }

                    function Dr(t, e, n) {
                        var r = t ? t.length : 0;
                        return r ? ((n ? Jn(t, e, n) : null == e) && (e = 1), e = r - (+e || 0), ze(t, e < 0 ? 0 : e)) : []
                    }

                    function Nr(t, e, n) {
                        return t && t.length ? en(t, Hn(e, n, 3), false, true) : []
                    }

                    function Ir(t, e, n) {
                        return t && t.length ? en(t, Hn(e, n, 3)) : []
                    }

                    function Fr(t, e, n, r) {
                        if (!(t ? t.length : 0)) return [];
                        null != e && "boolean" != typeof e && (r = n, n = Jn(t, e, r) ? A : e, e = false);
                        var i = Hn();
                        return null == n && i === xe || (n = i(n, r, 3)), e && Bn() == o ? x(t, n) : Je(t, n)
                    }

                    function Lr(t) {
                        if (!t || !t.length) return [];
                        var e = -1,
                            n = 0;
                        t = se(t, function (t) {
                            if (Gn(t)) return n = wa(t.length, n), true
                        });
                        for (var r = Ho(n); ++e < n;) r[e] = le(t, Be(e));
                        return r
                    }

                    function Rr(t, e, n) {
                        if (!(t ? t.length : 0)) return [];
                        var r = Lr(t);
                        return null == e ? r : (e = an(e, n, 4), le(r, function (t) {
                            return ce(t, e, A, true)
                        }))
                    }

                    function Vr() {
                        for (var t = -1, e = arguments.length; ++t < e;) {
                            var n = arguments[t];
                            if (Gn(n)) var r = r ? ue(Ce(r, n), Ce(n, r)) : n
                        }
                        return r ? Je(r) : []
                    }

                    function qr(t, e) {
                        var n = -1,
                            r = t ? t.length : 0,
                            i = {};
                        for (!r || e || Os(t[0]) || (e = []); ++n < r;) {
                            var o = t[n];
                            e ? i[o] = e[n] : o && (i[o[0]] = o[1])
                        }
                        return i
                    }

                    function Hr(t) {
                        var n = e(t);
                        return n.__chain__ = true, n
                    }

                    function Mr(t, e, n) {
                        return e.call(n, t), t
                    }

                    function Br(t, e, n) {
                        return e.call(n, t)
                    }

                    function Ur() {
                        return Hr(this)
                    }

                    function Wr() {
                        return new y(this.value(), this.__chain__)
                    }

                    function Xr(t) {
                        for (var e, r = this; r instanceof n;) {
                            var i = hr(r);
                            e ? o.__wrapped__ = i : e = i;
                            var o = i;
                            r = r.__wrapped__
                        }
                        return o.__wrapped__ = t, e
                    }

                    function Yr() {
                        var t = this.__wrapped__,
                            e = function (t) {
                                return n && n.__dir__ < 0 ? t : t.reverse()
                            };
                        if (t instanceof Ht) {
                            var n = t;
                            return this.__actions__.length && (n = new Ht(this)), n = n.reverse(), n.__actions__.push({
                                func: Br,
                                args: [e],
                                thisArg: A
                            }), new y(n, this.__chain__)
                        }
                        return this.thru(e)
                    }

                    function zr() {
                        return this.value() + ""
                    }

                    function Zr() {
                        return nn(this.__wrapped__, this.__actions__)
                    }

                    function Qr(t, e, n) {
                        var r = Os(t) ? oe : ke;
                        return n && Jn(t, e, n) && (e = A), "function" == typeof e && n === A || (e = Hn(e, n, 3)), r(t, e)
                    }

                    function Gr(t, e, n) {
                        var r = Os(t) ? se : Se;
                        return e = Hn(e, n, 3), r(t, e)
                    }

                    function Kr(t, e) {
                        return is(t, Ve(e))
                    }

                    function Jr(t, e, n, r) {
                        var i = t ? Ma(t) : 0;
                        return nr(i) || (t = oo(t), i = t.length), n = "number" != typeof n || r && Jn(e, n, r) ? 0 : n < 0 ? wa(i + n, 0) : n || 0, "string" == typeof t || !Os(t) && Mi(t) ? n <= i && t.indexOf(e, n) > -1 : !!i && Bn(t, e, n) > -1
                    }

                    function ti(t, e, n) {
                        var r = Os(t) ? le : Re;
                        return e = Hn(e, n, 3), r(t, e)
                    }

                    function ei(t, e) {
                        return ti(t, No(e))
                    }

                    function ni(t, e, n) {
                        var r = Os(t) ? se : Se;
                        return e = Hn(e, n, 3), r(t, function (t, n, r) {
                            return !e(t, n, r)
                        })
                    }

                    function ri(t, e, n) {
                        if (n ? Jn(t, e, n) : null == e) {
                            t = cr(t);
                            var r = t.length;
                            return r > 0 ? t[Xe(0, r - 1)] : A
                        }
                        var i = -1,
                            o = Yi(t),
                            r = o.length,
                            a = r - 1;
                        for (e = Ca(e < 0 ? 0 : +e || 0, r); ++i < e;) {
                            var s = Xe(i, a),
                                l = o[s];
                            o[s] = o[i], o[i] = l
                        }
                        return o.length = e, o
                    }

                    function ii(t) {
                        return ri(t, $a)
                    }

                    function oi(t) {
                        var e = t ? Ma(t) : 0;
                        return nr(e) ? e : qs(t).length
                    }

                    function ai(t, e, n) {
                        var r = Os(t) ? pe : Ze;
                        return n && Jn(t, e, n) && (e = A), "function" == typeof e && n === A || (e = Hn(e, n, 3)), r(t, e)
                    }

                    function si(t, e, n) {
                        if (null == t) return [];
                        n && Jn(t, e, n) && (e = A);
                        var r = -1;
                        return e = Hn(e, n, 3), Qe(Re(t, function (t, n, i) {
                            return {
                                criteria: e(t, n, i),
                                index: ++r,
                                value: t
                            }
                        }), c)
                    }

                    function li(t, e, n, r) {
                        return null == t ? [] : (r && Jn(e, n, r) && (n = A), Os(e) || (e = null == e ? [] : [e]), Os(n) || (n = null == n ? [] : [n]), Ge(t, e, n))
                    }

                    function ui(t, e) {
                        return Gr(t, Ve(e))
                    }

                    function ci(t, e) {
                        if ("function" != typeof e) {
                            if ("function" != typeof t) throw new Qo(B);
                            var n = t;
                            t = e, e = n
                        }
                        return t = xa(t = +t) ? t : 0,
                            function () {
                                if (--t < 1) return e.apply(this, arguments)
                            }
                    }

                    function fi(t, e, n) {
                        return n && Jn(t, e, n) && (e = A), e = t && null == e ? t.length : wa(+e || 0, 0), Ln(t, N, A, A, A, A, e)
                    }

                    function pi(t, e) {
                        var n;
                        if ("function" != typeof e) {
                            if ("function" != typeof t) throw new Qo(B);
                            var r = t;
                            t = e, e = r
                        }
                        return function () {
                            return --t > 0 && (n = e.apply(this, arguments)), t <= 1 && (e = A), n
                        }
                    }

                    function hi(t, e, n) {
                        function r() {
                            h && sa(h), u && sa(u), v = 0, u = h = d = A
                        }

                        function i(e, n) {
                            n && sa(n), u = h = d = A, e && (v = vs(), c = t.apply(p, l), h || u || (l = p = A))
                        }

                        function o() {
                            var t = e - (vs() - f);
                            t <= 0 || t > e ? i(d, u) : h = pa(o, t)
                        }

                        function a() {
                            i(m, h)
                        }

                        function s() {
                            if (l = arguments, f = vs(), p = this, d = m && (h || !y), false === g) var n = y && !h;
                            else {
                                u || y || (v = f);
                                var r = g - (f - v),
                                    i = r <= 0 || r > g;
                                i ? (u && (u = sa(u)), v = f, c = t.apply(p, l)) : u || (u = pa(a, r))
                            }
                            return i && h ? h = sa(h) : h || e === g || (h = pa(o, e)), n && (i = true, c = t.apply(p, l)), !i || h || u || (l = p = A), c
                        }
                        var l, u, c, f, p, h, d, v = 0,
                            g = false,
                            m = true;
                        if ("function" != typeof t) throw new Qo(B);
                        if (e = e < 0 ? 0 : +e || 0, true === n) {
                            var y = true;
                            m = false
                        } else Ni(n) && (y = !!n.leading, g = "maxWait" in n && wa(+n.maxWait || 0, e), m = "trailing" in n ? !!n.trailing : m);
                        return s.cancel = r, s
                    }

                    function di(t, e) {
                        if ("function" != typeof t || e && "function" != typeof e) throw new Qo(B);
                        var n = function () {
                            var r = arguments,
                                i = e ? e.apply(this, r) : r[0],
                                o = n.cache;
                            if (o.has(i)) return o.get(i);
                            var a = t.apply(this, r);
                            return n.cache = o.set(i, a), a
                        };
                        return n.cache = new di.Cache, n
                    }

                    function vi(t) {
                        if ("function" != typeof t) throw new Qo(B);
                        return function () {
                            return !t.apply(this, arguments)
                        }
                    }

                    function gi(t) {
                        return pi(2, t)
                    }

                    function mi(t, e) {
                        if ("function" != typeof t) throw new Qo(B);
                        return e = wa(e === A ? t.length - 1 : +e || 0, 0),
                            function () {
                                for (var n = arguments, r = -1, i = wa(n.length - e, 0), o = Ho(i); ++r < i;) o[r] = n[e + r];
                                switch (e) {
                                    case 0:
                                        return t.call(this, o);
                                    case 1:
                                        return t.call(this, n[0], o);
                                    case 2:
                                        return t.call(this, n[0], n[1], o)
                                }
                                var a = Ho(e + 1);
                                for (r = -1; ++r < e;) a[r] = n[r];
                                return a[e] = o, t.apply(this, a)
                            }
                    }

                    function yi(t) {
                        if ("function" != typeof t) throw new Qo(B);
                        return function (e) {
                            return t.apply(this, e)
                        }
                    }

                    function bi(t, e, n) {
                        var r = true,
                            i = true;
                        if ("function" != typeof t) throw new Qo(B);
                        return false === n ? r = false : Ni(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), hi(t, e, {
                            leading: r,
                            maxWait: +e,
                            trailing: i
                        })
                    }

                    function xi(t, e) {
                        return e = null == e ? $o : e, Ln(e, j, A, [t], [])
                    }

                    function _i(t, e, n, r) {
                        return e && "boolean" != typeof e && Jn(t, e, n) ? e = false : "function" == typeof e && (r = n, n = e, e = false), "function" == typeof n ? _e(t, e, an(n, r, 1)) : _e(t, e)
                    }

                    function wi(t, e, n) {
                        return "function" == typeof e ? _e(t, true, an(e, n, 1)) : _e(t, true)
                    }

                    function Ci(t, e) {
                        return t > e
                    }

                    function ki(t, e) {
                        return t >= e
                    }

                    function Ai(t) {
                        return m(t) && Gn(t) && ea.call(t, "callee") && !ca.call(t, "callee")
                    }

                    function Ti(t) {
                        return true === t || false === t || m(t) && ra.call(t) == Y
                    }

                    function Si(t) {
                        return m(t) && ra.call(t) == z
                    }

                    function $i(t) {
                        return !!t && 1 === t.nodeType && m(t) && !qi(t)
                    }

                    function Oi(t) {
                        return null == t || (Gn(t) && (Os(t) || Mi(t) || Ai(t) || m(t) && Di(t.splice)) ? !t.length : !qs(t).length)
                    }

                    function Pi(t, e, n, r) {
                        n = "function" == typeof n ? an(n, r, 3) : A;
                        var i = n ? n(t, e) : A;
                        return i === A ? Ie(t, e, n) : !!i
                    }

                    function Ei(t) {
                        return m(t) && "string" == typeof t.message && ra.call(t) == Z
                    }

                    function ji(t) {
                        return "number" == typeof t && xa(t)
                    }

                    function Di(t) {
                        return Ni(t) && ra.call(t) == Q
                    }

                    function Ni(t) {
                        var e = typeof t;
                        return !!t && ("object" == e || "function" == e)
                    }

                    function Ii(t, e, n, r) {
                        return n = "function" == typeof n ? an(n, r, 3) : A, Le(t, Un(e), n)
                    }

                    function Fi(t) {
                        return Vi(t) && t != +t
                    }

                    function Li(t) {
                        return null != t && (Di(t) ? oa.test(ta.call(t)) : m(t) && Et.test(t))
                    }

                    function Ri(t) {
                        return null === t
                    }

                    function Vi(t) {
                        return "number" == typeof t || m(t) && ra.call(t) == G
                    }

                    function qi(t) {
                        var e;
                        if (!m(t) || ra.call(t) != K || Ai(t) || !ea.call(t, "constructor") && "function" == typeof (e = t.constructor) && !(e instanceof e)) return false;
                        var n;
                        return Pe(t, function (t, e) {
                            n = e
                        }), n === A || ea.call(t, n)
                    }

                    function Hi(t) {
                        return Ni(t) && ra.call(t) == J
                    }

                    function Mi(t) {
                        return "string" == typeof t || m(t) && ra.call(t) == tt
                    }

                    function Bi(t) {
                        return m(t) && nr(t.length) && !!Vt[ra.call(t)]
                    }

                    function Ui(t) {
                        return t === A
                    }

                    function Wi(t, e) {
                        return t < e
                    }

                    function Xi(t, e) {
                        return t <= e
                    }

                    function Yi(t) {
                        var e = t ? Ma(t) : 0;
                        return nr(e) ? e ? ne(t) : [] : oo(t)
                    }

                    function zi(t) {
                        return be(t, to(t))
                    }

                    function Zi(t, e, n) {
                        var r = Ia(t);
                        return n && Jn(t, e, n) && (e = A), e ? me(r, e) : r
                    }

                    function Qi(t) {
                        return De(t, to(t))
                    }

                    function Gi(t, e, n) {
                        var r = null == t ? A : Ne(t, pr(e), e + "");
                        return r === A ? n : r
                    }

                    function Ki(t, e) {
                        if (null == t) return false;
                        var n = ea.call(t, e);
                        if (!n && !tr(e)) {
                            if (e = pr(e), null == (t = 1 == e.length ? t : Ne(t, ze(e, 0, -1)))) return false;
                            e = Tr(e), n = ea.call(t, e)
                        }
                        return n || nr(t.length) && Kn(e, t.length) && (Os(t) || Ai(t))
                    }

                    function Ji(t, e, n) {
                        n && Jn(t, e, n) && (e = A);
                        for (var r = -1, i = qs(t), o = i.length, a = {}; ++r < o;) {
                            var s = i[r],
                                l = t[s];
                            e ? ea.call(a, l) ? a[l].push(s) : a[l] = [s] : a[l] = s
                        }
                        return a
                    }

                    function to(t) {
                        if (null == t) return [];
                        Ni(t) || (t = Yo(t));
                        var e = t.length;
                        e = e && nr(e) && (Os(t) || Ai(t)) && e || 0;
                        for (var n = t.constructor, r = -1, i = "function" == typeof n && n.prototype === t, o = Ho(e), a = e > 0; ++r < e;) o[r] = r + "";
                        for (var s in t) a && Kn(s, e) || "constructor" == s && (i || !ea.call(t, s)) || o.push(s);
                        return o
                    }

                    function eo(t) {
                        t = fr(t);
                        for (var e = -1, n = qs(t), r = n.length, i = Ho(r); ++e < r;) {
                            var o = n[e];
                            i[e] = [o, t[o]]
                        }
                        return i
                    }

                    function no(t, e, n) {
                        var r = null == t ? A : t[e];
                        return r === A && (null == t || tr(e, t) || (e = pr(e), t = 1 == e.length ? t : Ne(t, ze(e, 0, -1)), r = null == t ? A : t[Tr(e)]), r = r === A ? n : r), Di(r) ? r.call(t) : r
                    }

                    function ro(t, e, n) {
                        if (null == t) return t;
                        var r = e + "";
                        e = null != t[r] || tr(e, t) ? [r] : pr(e);
                        for (var i = -1, o = e.length, a = o - 1, s = t; null != s && ++i < o;) {
                            var l = e[i];
                            Ni(s) && (i == a ? s[l] = n : null == s[l] && (s[l] = Kn(e[i + 1]) ? [] : {})), s = s[l]
                        }
                        return t
                    }

                    function io(t, e, n, r) {
                        var i = Os(t) || Bi(t);
                        if (e = Hn(e, r, 4), null == n)
                            if (i || Ni(t)) {
                                var o = t.constructor;
                                n = i ? Os(t) ? new o : [] : Ia(Di(o) ? o.prototype : A)
                            } else n = {};
                        return (i ? re : Ee)(t, function (t, r, i) {
                            return e(n, t, r, i)
                        }), n
                    }

                    function oo(t) {
                        return tn(t, qs(t))
                    }

                    function ao(t) {
                        return tn(t, to(t))
                    }

                    function so(t, e, n) {
                        return e = +e || 0, n === A ? (n = e, e = 0) : n = +n || 0, t >= Ca(e, n) && t < wa(e, n)
                    }

                    function lo(t, e, n) {
                        n && Jn(t, e, n) && (e = n = A);
                        var r = null == t,
                            i = null == e;
                        if (null == n && (i && "boolean" == typeof t ? (n = t, t = 1) : "boolean" == typeof e && (n = e, i = true)), r && i && (e = 1, i = false), t = +t || 0, i ? (e = t, t = 0) : e = +e || 0, n || t % 1 || e % 1) {
                            var o = Ta();
                            return Ca(t + o * (e - t + la("1e-" + ((o + "").length - 1))), e)
                        }
                        return Xe(t, e)
                    }

                    function uo(t) {
                        return (t = s(t)) && t.charAt(0).toUpperCase() + t.slice(1)
                    }

                    function co(t) {
                        return (t = s(t)) && t.replace(Dt, p).replace(Tt, "")
                    }

                    function fo(t, e, n) {
                        t = s(t), e += "";
                        var r = t.length;
                        return n = n === A ? r : Ca(n < 0 ? 0 : +n || 0, r), (n -= e.length) >= 0 && t.indexOf(e, n) == n
                    }

                    function po(t) {
                        return t = s(t), t && mt.test(t) ? t.replace(vt, h) : t
                    }

                    function ho(t) {
                        return t = s(t), t && At.test(t) ? t.replace(kt, d) : t || "(?:)"
                    }

                    function vo(t, e, n) {
                        t = s(t), e = +e;
                        var r = t.length;
                        if (r >= e || !xa(e)) return t;
                        var i = (e - r) / 2,
                            o = ya(i);
                        return n = Dn("", ga(i), n), n.slice(0, o) + t + n
                    }

                    function go(t, e, n) {
                        return (n ? Jn(t, e, n) : null == e) ? e = 0 : e && (e = +e), t = xo(t), Aa(t, e || (Pt.test(t) ? 16 : 10))
                    }

                    function mo(t, e) {
                        var n = "";
                        if (t = s(t), (e = +e) < 1 || !t || !xa(e)) return n;
                        do {
                            e % 2 && (n += t), e = ya(e / 2), t += t
                        } while (e);
                        return n
                    }

                    function yo(t, e, n) {
                        return t = s(t), n = null == n ? 0 : Ca(n < 0 ? 0 : +n || 0, t.length), t.lastIndexOf(e, n) == n
                    }

                    function bo(t, n, r) {
                        var i = e.templateSettings;
                        r && Jn(t, n, r) && (n = r = A), t = s(t), n = ge(me({}, r || n), i, ve);
                        var o, a, l = ge(me({}, n.imports), i.imports, ve),
                            u = qs(l),
                            c = tn(l, u),
                            f = 0,
                            p = n.interpolate || Nt,
                            h = "__p += '",
                            d = zo((n.escape || Nt).source + "|" + p.source + "|" + (p === xt ? $t : Nt).source + "|" + (n.evaluate || Nt).source + "|$", "g"),
                            g = "//# sourceURL=" + ("sourceURL" in n ? n.sourceURL : "lodash.templateSources[" + ++Rt + "]") + "\n";
                        t.replace(d, function (e, n, r, i, s, l) {
                            return r || (r = i), h += t.slice(f, l).replace(It, v), n && (o = true, h += "' +\n__e(" + n + ") +\n'"), s && (a = true, h += "';\n" + s + ";\n__p += '"), r && (h += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"), f = l + e.length, e
                        }), h += "';\n";
                        var m = n.variable;
                        m || (h = "with (obj) {\n" + h + "\n}\n"), h = (a ? h.replace(ft, "") : h).replace(pt, "$1").replace(ht, "$1;"), h = "function(" + (m || "obj") + ") {\n" + (m ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (o ? ", __e = _.escape" : "") + (a ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + h + "return __p\n}";
                        var y = Gs(function () {
                            return Uo(u, g + "return " + h).apply(A, c)
                        });
                        if (y.source = h, Ei(y)) throw y;
                        return y
                    }

                    function xo(t, e, n) {
                        var r = t;
                        return (t = s(t)) ? (n ? Jn(r, e, n) : null == e) ? t.slice(_(t), w(t) + 1) : (e += "", t.slice(l(t, e), u(t, e) + 1)) : t
                    }

                    function _o(t, e, n) {
                        var r = t;
                        return t = s(t), t ? (n ? Jn(r, e, n) : null == e) ? t.slice(_(t)) : t.slice(l(t, e + "")) : t
                    }

                    function wo(t, e, n) {
                        var r = t;
                        return t = s(t), t ? (n ? Jn(r, e, n) : null == e) ? t.slice(0, w(t) + 1) : t.slice(0, u(t, e + "") + 1) : t
                    }

                    function Co(t, e, n) {
                        n && Jn(t, e, n) && (e = A);
                        var r = F,
                            i = L;
                        if (null != e)
                            if (Ni(e)) {
                                var o = "separator" in e ? e.separator : o;
                                r = "length" in e ? +e.length || 0 : r, i = "omission" in e ? s(e.omission) : i
                            } else r = +e || 0;
                        if (t = s(t), r >= t.length) return t;
                        var a = r - i.length;
                        if (a < 1) return i;
                        var l = t.slice(0, a);
                        if (null == o) return l + i;
                        if (Hi(o)) {
                            if (t.slice(a).search(o)) {
                                var u, c, f = t.slice(0, a);
                                for (o.global || (o = zo(o.source, (Ot.exec(o) || "") + "g")), o.lastIndex = 0; u = o.exec(f);) c = u.index;
                                l = l.slice(0, null == c ? a : c)
                            }
                        } else if (t.indexOf(o, a) != a) {
                            var p = l.lastIndexOf(o);
                            p > -1 && (l = l.slice(0, p))
                        }
                        return l + i
                    }

                    function ko(t) {
                        return t = s(t), t && gt.test(t) ? t.replace(dt, C) : t
                    }

                    function Ao(t, e, n) {
                        return n && Jn(t, e, n) && (e = A), t = s(t), t.match(e || Ft) || []
                    }

                    function To(t, e, n) {
                        return n && Jn(t, e, n) && (e = A), m(t) ? Oo(t) : xe(t, e)
                    }

                    function So(t) {
                        return function () {
                            return t
                        }
                    }

                    function $o(t) {
                        return t
                    }

                    function Oo(t) {
                        return Ve(_e(t, true))
                    }

                    function Po(t, e) {
                        return qe(t, _e(e, true))
                    }

                    function Eo(t, e, n) {
                        if (null == n) {
                            var r = Ni(e),
                                i = r ? qs(e) : A,
                                o = i && i.length ? De(e, i) : A;
                            (o ? o.length : r) || (o = false, n = e, e = t, t = this)
                        }
                        o || (o = De(e, qs(e)));
                        var a = true,
                            s = -1,
                            l = Di(t),
                            u = o.length;
                        false === n ? a = false : Ni(n) && "chain" in n && (a = n.chain);
                        for (; ++s < u;) {
                            var c = o[s],
                                f = e[c];
                            t[c] = f, l && (t.prototype[c] = function (e) {
                                return function () {
                                    var n = this.__chain__;
                                    if (a || n) {
                                        var r = t(this.__wrapped__);
                                        return (r.__actions__ = ne(this.__actions__)).push({
                                            func: e,
                                            args: arguments,
                                            thisArg: t
                                        }), r.__chain__ = n, r
                                    }
                                    return e.apply(t, ue([this.value()], arguments))
                                }
                            }(f))
                        }
                        return t
                    }

                    function jo() {
                        return Jt._ = ia, this
                    }

                    function Do() {}

                    function No(t) {
                        return tr(t) ? Be(t) : Ue(t)
                    }

                    function Io(t) {
                        return function (e) {
                            return Ne(t, pr(e), e + "")
                        }
                    }

                    function Fo(t, e, n) {
                        n && Jn(t, e, n) && (e = n = A), t = +t || 0, n = null == n ? 1 : +n || 0, null == e ? (e = t, t = 0) : e = +e || 0;
                        for (var r = -1, i = wa(ga((e - t) / (n || 1)), 0), o = Ho(i); ++r < i;) o[r] = t, t += n;
                        return o
                    }

                    function Lo(t, e, n) {
                        if ((t = ya(t)) < 1 || !xa(t)) return [];
                        var r = -1,
                            i = Ho(Ca(t, Oa));
                        for (e = an(e, n, 1); ++r < t;) r < Oa ? i[r] = e(r) : e(r);
                        return i
                    }

                    function Ro(t) {
                        var e = ++na;
                        return s(t) + e
                    }

                    function Vo(t, e) {
                        return (+t || 0) + (+e || 0)
                    }

                    function qo(t, e, n) {
                        return n && Jn(t, e, n) && (e = A), e = Hn(e, n, 3), 1 == e.length ? he(Os(t) ? t : cr(t), e) : Ke(t, e)
                    }
                    t = t ? te.defaults(Jt.Object(), t, te.pick(Jt, Lt)) : Jt;
                    var Ho = t.Array,
                        Mo = t.Date,
                        Bo = t.Error,
                        Uo = t.Function,
                        Wo = t.Math,
                        Xo = t.Number,
                        Yo = t.Object,
                        zo = t.RegExp,
                        Zo = t.String,
                        Qo = t.TypeError,
                        Go = Ho.prototype,
                        Ko = Yo.prototype,
                        Jo = Zo.prototype,
                        ta = Uo.prototype.toString,
                        ea = Ko.hasOwnProperty,
                        na = 0,
                        ra = Ko.toString,
                        ia = Jt._,
                        oa = zo("^" + ta.call(ea).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
                        aa = t.ArrayBuffer,
                        sa = t.clearTimeout,
                        la = t.parseFloat,
                        ua = Wo.pow,
                        ca = Ko.propertyIsEnumerable,
                        fa = Wn(t, "Set"),
                        pa = t.setTimeout,
                        ha = Go.splice,
                        da = t.Uint8Array,
                        va = Wn(t, "WeakMap"),
                        ga = Wo.ceil,
                        ma = Wn(Yo, "create"),
                        ya = Wo.floor,
                        ba = Wn(Ho, "isArray"),
                        xa = t.isFinite,
                        _a = Wn(Yo, "keys"),
                        wa = Wo.max,
                        Ca = Wo.min,
                        ka = Wn(Mo, "now"),
                        Aa = t.parseInt,
                        Ta = Wo.random,
                        Sa = Xo.NEGATIVE_INFINITY,
                        $a = Xo.POSITIVE_INFINITY,
                        Oa = 4294967295,
                        Pa = Oa - 1,
                        Ea = Oa >>> 1,
                        ja = 9007199254740991,
                        Da = va && new va,
                        Na = {};
                    e.support = {};
                    e.templateSettings = {
                        escape: yt,
                        evaluate: bt,
                        interpolate: xt,
                        variable: "",
                        imports: {
                            _: e
                        }
                    };
                    var Ia = function () {
                            function t() {}
                            return function (e) {
                                if (Ni(e)) {
                                    t.prototype = e;
                                    var n = new t;
                                    t.prototype = A
                                }
                                return n || {}
                            }
                        }(),
                        Fa = pn(Ee),
                        La = pn(je, true),
                        Ra = hn(),
                        Va = hn(true),
                        qa = Da ? function (t, e) {
                            return Da.set(t, e), t
                        } : $o,
                        Ha = Da ? function (t) {
                            return Da.get(t)
                        } : Do,
                        Ma = Be("length"),
                        Ba = function () {
                            var t = 0,
                                e = 0;
                            return function (n, r) {
                                var i = vs(),
                                    o = V - (i - e);
                                if (e = i, o > 0) {
                                    if (++t >= R) return n
                                } else t = 0;
                                return qa(n, r)
                            }
                        }(),
                        Ua = mi(function (t, e) {
                            return m(t) && Gn(t) ? Ce(t, Oe(e, false, true)) : []
                        }),
                        Wa = wn(),
                        Xa = wn(true),
                        Ya = mi(function (t) {
                            for (var e = t.length, n = e, r = Ho(f), i = Bn(), a = i == o, s = []; n--;) {
                                var l = t[n] = Gn(l = t[n]) ? l : [];
                                r[n] = a && l.length >= 120 ? vn(n && l) : null
                            }
                            var u = t[0],
                                c = -1,
                                f = u ? u.length : 0,
                                p = r[0];
                            t: for (; ++c < f;)
                                if (l = u[c], (p ? Gt(p, l) : i(s, l, 0)) < 0) {
                                    for (var n = e; --n;) {
                                        var h = r[n];
                                        if ((h ? Gt(h, l) : i(t[n], l, 0)) < 0) continue t
                                    }
                                    p && p.push(l), s.push(l)
                                }
                            return s
                        }),
                        za = mi(function (t, e) {
                            e = Oe(e);
                            var n = ye(t, e);
                            return We(t, e.sort(r)), n
                        }),
                        Za = Fn(),
                        Qa = Fn(true),
                        Ga = mi(function (t) {
                            return Je(Oe(t, false, true))
                        }),
                        Ka = mi(function (t, e) {
                            return Gn(t) ? Ce(t, e) : []
                        }),
                        Ja = mi(Lr),
                        ts = mi(function (t) {
                            var e = t.length,
                                n = e > 2 ? t[e - 2] : A,
                                r = e > 1 ? t[e - 1] : A;
                            return e > 2 && "function" == typeof n ? e -= 2 : (n = e > 1 && "function" == typeof r ? (--e, r) : A, r = A), t.length = e, Rr(t, n, r)
                        }),
                        es = mi(function (t) {
                            return t = Oe(t), this.thru(function (e) {
                                return ee(Os(e) ? e : [fr(e)], t)
                            })
                        }),
                        ns = mi(function (t, e) {
                            return ye(t, Oe(e))
                        }),
                        rs = cn(function (t, e, n) {
                            ea.call(t, n) ? ++t[n] : t[n] = 1
                        }),
                        is = _n(Fa),
                        os = _n(La, true),
                        as = An(re, Fa),
                        ss = An(ie, La),
                        ls = cn(function (t, e, n) {
                            ea.call(t, n) ? t[n].push(e) : t[n] = [e]
                        }),
                        us = cn(function (t, e, n) {
                            t[n] = e
                        }),
                        cs = mi(function (t, e, n) {
                            var r = -1,
                                i = "function" == typeof e,
                                o = tr(e),
                                a = Gn(t) ? Ho(t.length) : [];
                            return Fa(t, function (t) {
                                var s = i ? e : o && null != t ? t[e] : A;
                                a[++r] = s ? s.apply(t, n) : Qn(t, e, n)
                            }), a
                        }),
                        fs = cn(function (t, e, n) {
                            t[n ? 0 : 1].push(e)
                        }, function () {
                            return [
                                [],
                                []
                            ]
                        }),
                        ps = En(ce, Fa),
                        hs = En(fe, La),
                        ds = mi(function (t, e) {
                            if (null == t) return [];
                            var n = e[2];
                            return n && Jn(e[0], e[1], n) && (e.length = 1), Ge(t, Oe(e), [])
                        }),
                        vs = ka || function () {
                            return (new Mo).getTime()
                        },
                        gs = mi(function (t, e, n) {
                            var r = S;
                            if (n.length) {
                                var i = b(n, gs.placeholder);
                                r |= j
                            }
                            return Ln(t, r, e, n, i)
                        }),
                        ms = mi(function (t, e) {
                            e = e.length ? Oe(e) : Qi(t);
                            for (var n = -1, r = e.length; ++n < r;) {
                                var i = e[n];
                                t[i] = Ln(t[i], S, t)
                            }
                            return t
                        }),
                        ys = mi(function (t, e, n) {
                            var r = S | $;
                            if (n.length) {
                                var i = b(n, ys.placeholder);
                                r |= j
                            }
                            return Ln(e, r, t, n, i)
                        }),
                        bs = yn(P),
                        xs = yn(E),
                        _s = mi(function (t, e) {
                            return we(t, 1, e)
                        }),
                        ws = mi(function (t, e, n) {
                            return we(t, e, n)
                        }),
                        Cs = kn(),
                        ks = kn(true),
                        As = mi(function (t, e) {
                            if (e = Oe(e), "function" != typeof t || !oe(e, a)) throw new Qo(B);
                            var n = e.length;
                            return mi(function (r) {
                                for (var i = Ca(r.length, n); i--;) r[i] = e[i](r[i]);
                                return t.apply(this, r)
                            })
                        }),
                        Ts = Pn(j),
                        Ss = Pn(D),
                        $s = mi(function (t, e) {
                            return Ln(t, I, A, A, A, Oe(e))
                        }),
                        Os = ba || function (t) {
                            return m(t) && nr(t.length) && ra.call(t) == X
                        },
                        Ps = fn(He),
                        Es = fn(function (t, e, n) {
                            return n ? ge(t, e, n) : me(t, e)
                        }),
                        js = bn(Es, de),
                        Ds = bn(Ps, or),
                        Ns = Cn(Ee),
                        Is = Cn(je),
                        Fs = Tn(Ra),
                        Ls = Tn(Va),
                        Rs = Sn(Ee),
                        Vs = Sn(je),
                        qs = _a ? function (t) {
                            var e = null == t ? A : t.constructor;
                            return "function" == typeof e && e.prototype === t || "function" != typeof t && Gn(t) ? ur(t) : Ni(t) ? _a(t) : []
                        } : ur,
                        Hs = $n(true),
                        Ms = $n(),
                        Bs = mi(function (t, e) {
                            if (null == t) return {};
                            if ("function" != typeof e[0]) {
                                var e = le(Oe(e), Zo);
                                return ar(t, Ce(to(t), e))
                            }
                            var n = an(e[0], e[1], 3);
                            return sr(t, function (t, e, r) {
                                return !n(t, e, r)
                            })
                        }),
                        Us = mi(function (t, e) {
                            return null == t ? {} : "function" == typeof e[0] ? sr(t, an(e[0], e[1], 3)) : ar(t, Oe(e))
                        }),
                        Ws = gn(function (t, e, n) {
                            return e = e.toLowerCase(), t + (n ? e.charAt(0).toUpperCase() + e.slice(1) : e)
                        }),
                        Xs = gn(function (t, e, n) {
                            return t + (n ? "-" : "") + e.toLowerCase()
                        }),
                        Ys = On(),
                        zs = On(true),
                        Zs = gn(function (t, e, n) {
                            return t + (n ? "_" : "") + e.toLowerCase()
                        }),
                        Qs = gn(function (t, e, n) {
                            return t + (n ? " " : "") + (e.charAt(0).toUpperCase() + e.slice(1))
                        }),
                        Gs = mi(function (t, e) {
                            try {
                                return t.apply(A, e)
                            } catch (t) {
                                return Ei(t) ? t : new Bo(t)
                            }
                        }),
                        Ks = mi(function (t, e) {
                            return function (n) {
                                return Qn(n, t, e)
                            }
                        }),
                        Js = mi(function (t, e) {
                            return function (n) {
                                return Qn(t, n, e)
                            }
                        }),
                        tl = In("ceil"),
                        el = In("floor"),
                        nl = xn(Ci, Sa),
                        rl = xn(Wi, $a),
                        il = In("round");
                    return e.prototype = n.prototype, y.prototype = Ia(n.prototype), y.prototype.constructor = y, Ht.prototype = Ia(n.prototype), Ht.prototype.constructor = Ht, Wt.prototype.delete = Xt, Wt.prototype.get = Yt, Wt.prototype.has = zt, Wt.prototype.set = Zt, Qt.prototype.push = Kt, di.Cache = Wt, e.after = ci, e.ary = fi, e.assign = Es, e.at = ns, e.before = pi, e.bind = gs, e.bindAll = ms, e.bindKey = ys, e.callback = To, e.chain = Hr, e.chunk = dr, e.compact = vr, e.constant = So, e.countBy = rs, e.create = Zi, e.curry = bs, e.curryRight = xs, e.debounce = hi, e.defaults = js, e.defaultsDeep = Ds, e.defer = _s, e.delay = ws, e.difference = Ua, e.drop = gr, e.dropRight = mr, e.dropRightWhile = yr, e.dropWhile = br, e.fill = xr, e.filter = Gr, e.flatten = wr, e.flattenDeep = Cr, e.flow = Cs, e.flowRight = ks, e.forEach = as, e.forEachRight = ss, e.forIn = Fs, e.forInRight = Ls, e.forOwn = Rs, e.forOwnRight = Vs, e.functions = Qi, e.groupBy = ls, e.indexBy = us, e.initial = Ar, e.intersection = Ya, e.invert = Ji, e.invoke = cs, e.keys = qs, e.keysIn = to, e.map = ti, e.mapKeys = Hs, e.mapValues = Ms, e.matches = Oo, e.matchesProperty = Po, e.memoize = di, e.merge = Ps, e.method = Ks, e.methodOf = Js, e.mixin = Eo, e.modArgs = As, e.negate = vi, e.omit = Bs, e.once = gi, e.pairs = eo, e.partial = Ts, e.partialRight = Ss, e.partition = fs, e.pick = Us, e.pluck = ei, e.property = No, e.propertyOf = Io, e.pull = $r, e.pullAt = za, e.range = Fo, e.rearg = $s, e.reject = ni, e.remove = Or, e.rest = Pr, e.restParam = mi, e.set = ro, e.shuffle = ii, e.slice = Er, e.sortBy = si, e.sortByAll = ds, e.sortByOrder = li, e.spread = yi, e.take = jr, e.takeRight = Dr, e.takeRightWhile = Nr, e.takeWhile = Ir, e.tap = Mr, e.throttle = bi, e.thru = Br, e.times = Lo, e.toArray = Yi, e.toPlainObject = zi, e.transform = io, e.union = Ga, e.uniq = Fr, e.unzip = Lr, e.unzipWith = Rr, e.values = oo, e.valuesIn = ao, e.where = ui, e.without = Ka, e.wrap = xi, e.xor = Vr, e.zip = Ja, e.zipObject = qr, e.zipWith = ts, e.backflow = ks, e.collect = ti, e.compose = ks, e.each = as, e.eachRight = ss, e.extend = Es, e.iteratee = To, e.methods = Qi, e.object = qr, e.select = Gr, e.tail = Pr, e.unique = Fr, Eo(e, e), e.add = Vo, e.attempt = Gs, e.camelCase = Ws, e.capitalize = uo, e.ceil = tl, e.clone = _i, e.cloneDeep = wi, e.deburr = co, e.endsWith = fo, e.escape = po, e.escapeRegExp = ho, e.every = Qr, e.find = is, e.findIndex = Wa, e.findKey = Ns, e.findLast = os, e.findLastIndex = Xa, e.findLastKey = Is, e.findWhere = Kr, e.first = _r, e.floor = el, e.get = Gi, e.gt = Ci, e.gte = ki, e.has = Ki, e.identity = $o, e.includes = Jr, e.indexOf = kr, e.inRange = so, e.isArguments = Ai, e.isArray = Os, e.isBoolean = Ti, e.isDate = Si, e.isElement = $i, e.isEmpty = Oi, e.isEqual = Pi, e.isError = Ei, e.isFinite = ji, e.isFunction = Di, e.isMatch = Ii, e.isNaN = Fi, e.isNative = Li, e.isNull = Ri, e.isNumber = Vi, e.isObject = Ni, e.isPlainObject = qi, e.isRegExp = Hi, e.isString = Mi, e.isTypedArray = Bi, e.isUndefined = Ui, e.kebabCase = Xs, e.last = Tr, e.lastIndexOf = Sr, e.lt = Wi, e.lte = Xi, e.max = nl, e.min = rl, e.noConflict = jo, e.noop = Do, e.now = vs, e.pad = vo, e.padLeft = Ys, e.padRight = zs, e.parseInt = go, e.random = lo, e.reduce = ps, e.reduceRight = hs, e.repeat = mo, e.result = no, e.round = il, e.runInContext = k, e.size = oi, e.snakeCase = Zs, e.some = ai, e.sortedIndex = Za, e.sortedLastIndex = Qa, e.startCase = Qs, e.startsWith = yo, e.sum = qo, e.template = bo, e.trim = xo, e.trimLeft = _o, e.trimRight = wo, e.trunc = Co, e.unescape = ko, e.uniqueId = Ro, e.words = Ao, e.all = Qr, e.any = ai, e.contains = Jr, e.eq = Pi, e.detect = is, e.foldl = ps, e.foldr = hs, e.head = _r, e.include = Jr, e.inject = ps, Eo(e, function () {
                            var t = {};
                            return Ee(e, function (n, r) {
                                e.prototype[r] || (t[r] = n)
                            }), t
                        }(), false), e.sample = ri, e.prototype.sample = function (t) {
                            return this.__chain__ || null != t ? this.thru(function (e) {
                                return ri(e, t)
                            }) : ri(this.value())
                        }, e.VERSION = T, re(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function (t) {
                            e[t].placeholder = e
                        }), re(["drop", "take"], function (t, e) {
                            Ht.prototype[t] = function (n) {
                                var r = this.__filtered__;
                                if (r && !e) return new Ht(this);
                                n = null == n ? 1 : wa(ya(n) || 0, 0);
                                var i = this.clone();
                                return r ? i.__takeCount__ = Ca(i.__takeCount__, n) : i.__views__.push({
                                    size: n,
                                    type: t + (i.__dir__ < 0 ? "Right" : "")
                                }), i
                            }, Ht.prototype[t + "Right"] = function (e) {
                                return this.reverse()[t](e).reverse()
                            }
                        }), re(["filter", "map", "takeWhile"], function (t, e) {
                            var n = e + 1,
                                r = n != M;
                            Ht.prototype[t] = function (t, e) {
                                var i = this.clone();
                                return i.__iteratees__.push({
                                    iteratee: Hn(t, e, 1),
                                    type: n
                                }), i.__filtered__ = i.__filtered__ || r, i
                            }
                        }), re(["first", "last"], function (t, e) {
                            var n = "take" + (e ? "Right" : "");
                            Ht.prototype[t] = function () {
                                return this[n](1).value()[0]
                            }
                        }), re(["initial", "rest"], function (t, e) {
                            var n = "drop" + (e ? "" : "Right");
                            Ht.prototype[t] = function () {
                                return this.__filtered__ ? new Ht(this) : this[n](1)
                            }
                        }), re(["pluck", "where"], function (t, e) {
                            var n = e ? "filter" : "map",
                                r = e ? Ve : No;
                            Ht.prototype[t] = function (t) {
                                return this[n](r(t))
                            }
                        }), Ht.prototype.compact = function () {
                            return this.filter($o)
                        }, Ht.prototype.reject = function (t, e) {
                            return t = Hn(t, e, 1), this.filter(function (e) {
                                return !t(e)
                            })
                        }, Ht.prototype.slice = function (t, e) {
                            t = null == t ? 0 : +t || 0;
                            var n = this;
                            return n.__filtered__ && (t > 0 || e < 0) ? new Ht(n) : (t < 0 ? n = n.takeRight(-t) : t && (n = n.drop(t)), e !== A && (e = +e || 0, n = e < 0 ? n.dropRight(-e) : n.take(e - t)), n)
                        }, Ht.prototype.takeRightWhile = function (t, e) {
                            return this.reverse().takeWhile(t, e).reverse()
                        },
                        Ht.prototype.toArray = function () {
                            return this.take($a)
                        }, Ee(Ht.prototype, function (t, n) {
                            var r = /^(?:filter|map|reject)|While$/.test(n),
                                i = /^(?:first|last)$/.test(n),
                                o = e[i ? "take" + ("last" == n ? "Right" : "") : n];
                            o && (e.prototype[n] = function () {
                                var e = i ? [1] : arguments,
                                    n = this.__chain__,
                                    a = this.__wrapped__,
                                    s = !!this.__actions__.length,
                                    l = a instanceof Ht,
                                    u = e[0],
                                    c = l || Os(a);
                                c && r && "function" == typeof u && 1 != u.length && (l = c = false);
                                var f = function (t) {
                                        return i && n ? o(t, 1)[0] : o.apply(A, ue([t], e))
                                    },
                                    p = {
                                        func: Br,
                                        args: [f],
                                        thisArg: A
                                    },
                                    h = l && !s;
                                if (i && !n) return h ? (a = a.clone(), a.__actions__.push(p), t.call(a)) : o.call(A, this.value())[0];
                                if (!i && c) {
                                    a = h ? a : new Ht(this);
                                    var d = t.apply(a, e);
                                    return d.__actions__.push(p), new y(d, n)
                                }
                                return this.thru(f)
                            })
                        }), re(["join", "pop", "push", "replace", "shift", "sort", "splice", "split", "unshift"], function (t) {
                            var n = (/^(?:replace|split)$/.test(t) ? Jo : Go)[t],
                                r = /^(?:push|sort|unshift)$/.test(t) ? "tap" : "thru",
                                i = /^(?:join|pop|replace|shift)$/.test(t);
                            e.prototype[t] = function () {
                                var t = arguments;
                                return i && !this.__chain__ ? n.apply(this.value(), t) : this[r](function (e) {
                                    return n.apply(e, t)
                                })
                            }
                        }), Ee(Ht.prototype, function (t, n) {
                            var r = e[n];
                            if (r) {
                                var i = r.name;
                                (Na[i] || (Na[i] = [])).push({
                                    name: n,
                                    func: r
                                })
                            }
                        }), Na[jn(A, $).name] = [{
                            name: "wrapper",
                            func: A
                        }], Ht.prototype.clone = Mt, Ht.prototype.reverse = Bt, Ht.prototype.value = Ut, e.prototype.chain = Ur, e.prototype.commit = Wr, e.prototype.concat = es, e.prototype.plant = Xr, e.prototype.reverse = Yr, e.prototype.toString = zr, e.prototype.run = e.prototype.toJSON = e.prototype.valueOf = e.prototype.value = Zr, e.prototype.collect = e.prototype.map, e.prototype.head = e.prototype.first, e.prototype.select = e.prototype.filter, e.prototype.tail = e.prototype.rest, e
                }
                var A, T = "3.10.1",
                    S = 1,
                    $ = 2,
                    O = 4,
                    P = 8,
                    E = 16,
                    j = 32,
                    D = 64,
                    N = 128,
                    I = 256,
                    F = 30,
                    L = "...",
                    R = 150,
                    V = 16,
                    q = 200,
                    H = 1,
                    M = 2,
                    B = "Expected a function",
                    U = "__lodash_placeholder__",
                    W = "[object Arguments]",
                    X = "[object Array]",
                    Y = "[object Boolean]",
                    z = "[object Date]",
                    Z = "[object Error]",
                    Q = "[object Function]",
                    G = "[object Number]",
                    K = "[object Object]",
                    J = "[object RegExp]",
                    tt = "[object String]",
                    et = "[object ArrayBuffer]",
                    nt = "[object Float32Array]",
                    rt = "[object Float64Array]",
                    it = "[object Int8Array]",
                    ot = "[object Int16Array]",
                    at = "[object Int32Array]",
                    st = "[object Uint8Array]",
                    lt = "[object Uint8ClampedArray]",
                    ut = "[object Uint16Array]",
                    ct = "[object Uint32Array]",
                    ft = /\b__p \+= '';/g,
                    pt = /\b(__p \+=) '' \+/g,
                    ht = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
                    dt = /&(?:amp|lt|gt|quot|#39|#96);/g,
                    vt = /[&<>"'`]/g,
                    gt = RegExp(dt.source),
                    mt = RegExp(vt.source),
                    yt = /<%-([\s\S]+?)%>/g,
                    bt = /<%([\s\S]+?)%>/g,
                    xt = /<%=([\s\S]+?)%>/g,
                    _t = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
                    wt = /^\w*$/,
                    Ct = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,
                    kt = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
                    At = RegExp(kt.source),
                    Tt = /[\u0300-\u036f\ufe20-\ufe23]/g,
                    St = /\\(\\)?/g,
                    $t = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
                    Ot = /\w*$/,
                    Pt = /^0[xX]/,
                    Et = /^\[object .+?Constructor\]$/,
                    jt = /^\d+$/,
                    Dt = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,
                    Nt = /($^)/,
                    It = /['\n\r\u2028\u2029\\]/g,
                    Ft = function () {
                        var t = "[A-Z\\xc0-\\xd6\\xd8-\\xde]",
                            e = "[a-z\\xdf-\\xf6\\xf8-\\xff]+";
                        return RegExp(t + "+(?=" + t + e + ")|" + t + "?" + e + "|" + t + "+|[0-9]+", "g")
                    }(),
                    Lt = ["Array", "ArrayBuffer", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Math", "Number", "Object", "RegExp", "Set", "String", "_", "clearTimeout", "isFinite", "parseFloat", "parseInt", "setTimeout", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap"],
                    Rt = -1,
                    Vt = {};
                Vt[nt] = Vt[rt] = Vt[it] = Vt[ot] = Vt[at] = Vt[st] = Vt[lt] = Vt[ut] = Vt[ct] = true, Vt[W] = Vt[X] = Vt[et] = Vt[Y] = Vt[z] = Vt[Z] = Vt[Q] = Vt["[object Map]"] = Vt[G] = Vt[K] = Vt[J] = Vt["[object Set]"] = Vt[tt] = Vt["[object WeakMap]"] = false;
                var qt = {};
                qt[W] = qt[X] = qt[et] = qt[Y] = qt[z] = qt[nt] = qt[rt] = qt[it] = qt[ot] = qt[at] = qt[G] = qt[K] = qt[J] = qt[tt] = qt[st] = qt[lt] = qt[ut] = qt[ct] = true, qt[Z] = qt[Q] = qt["[object Map]"] = qt["[object Set]"] = qt["[object WeakMap]"] = false;
                var Ht = {
                        "À": "A",
                        "Á": "A",
                        "Â": "A",
                        "Ã": "A",
                        "Ä": "A",
                        "Å": "A",
                        "à": "a",
                        "á": "a",
                        "â": "a",
                        "ã": "a",
                        "ä": "a",
                        "å": "a",
                        "Ç": "C",
                        "ç": "c",
                        "Ð": "D",
                        "ð": "d",
                        "È": "E",
                        "É": "E",
                        "Ê": "E",
                        "Ë": "E",
                        "è": "e",
                        "é": "e",
                        "ê": "e",
                        "ë": "e",
                        "Ì": "I",
                        "Í": "I",
                        "Î": "I",
                        "Ï": "I",
                        "ì": "i",
                        "í": "i",
                        "î": "i",
                        "ï": "i",
                        "Ñ": "N",
                        "ñ": "n",
                        "Ò": "O",
                        "Ó": "O",
                        "Ô": "O",
                        "Õ": "O",
                        "Ö": "O",
                        "Ø": "O",
                        "ò": "o",
                        "ó": "o",
                        "ô": "o",
                        "õ": "o",
                        "ö": "o",
                        "ø": "o",
                        "Ù": "U",
                        "Ú": "U",
                        "Û": "U",
                        "Ü": "U",
                        "ù": "u",
                        "ú": "u",
                        "û": "u",
                        "ü": "u",
                        "Ý": "Y",
                        "ý": "y",
                        "ÿ": "y",
                        "Æ": "Ae",
                        "æ": "ae",
                        "Þ": "Th",
                        "þ": "th",
                        "ß": "ss"
                    },
                    Mt = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#39;",
                        "`": "&#96;"
                    },
                    Bt = {
                        "&amp;": "&",
                        "&lt;": "<",
                        "&gt;": ">",
                        "&quot;": '"',
                        "&#39;": "'",
                        "&#96;": "`"
                    },
                    Ut = {
                        function: true,
                        object: true
                    },
                    Wt = {
                        0: "x30",
                        1: "x31",
                        2: "x32",
                        3: "x33",
                        4: "x34",
                        5: "x35",
                        6: "x36",
                        7: "x37",
                        8: "x38",
                        9: "x39",
                        A: "x41",
                        B: "x42",
                        C: "x43",
                        D: "x44",
                        E: "x45",
                        F: "x46",
                        a: "x61",
                        b: "x62",
                        c: "x63",
                        d: "x64",
                        e: "x65",
                        f: "x66",
                        n: "x6e",
                        r: "x72",
                        t: "x74",
                        u: "x75",
                        v: "x76",
                        x: "x78"
                    },
                    Xt = {
                        "\\": "\\",
                        "'": "'",
                        "\n": "n",
                        "\r": "r",
                        "\u2028": "u2028",
                        "\u2029": "u2029"
                    },
                    Yt = Ut[typeof n] && n && !n.nodeType && n,
                    zt = Ut[typeof e] && e && !e.nodeType && e,
                    Zt = Yt && zt && "object" == typeof t && t && t.Object && t,
                    Qt = Ut[typeof self] && self && self.Object && self,
                    Gt = Ut[typeof window] && window && window.Object && window,
                    Kt = zt && zt.exports === Yt && Yt,
                    Jt = Zt || Gt !== (this && this.window) && Gt || Qt || this,
                    te = k();
                "function" == typeof define && "object" == typeof define.amd && define.amd ? (Jt._ = te, define(function () {
                    return te
                })) : Yt && zt ? Kt ? (zt.exports = te)._ = te : Yt._ = te : Jt._ = te
            }).call(this)
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    10: [function (t, e, n) {
        ! function (t) {
            "use strict";

            function e(t) {
                var e = t.length,
                    r = n.type(t);
                return "function" !== r && !n.isWindow(t) && (!(1 !== t.nodeType || !e) || ("array" === r || 0 === e || "number" == typeof e && e > 0 && e - 1 in t))
            }
            if (!t.jQuery) {
                var n = function (t, e) {
                    return new n.fn.init(t, e)
                };
                n.isWindow = function (t) {
                    return t && t === t.window
                }, n.type = function (t) {
                    return t ? "object" == typeof t || "function" == typeof t ? i[a.call(t)] || "object" : typeof t : t + ""
                }, n.isArray = Array.isArray || function (t) {
                    return "array" === n.type(t)
                }, n.isPlainObject = function (t) {
                    var e;
                    if (!t || "object" !== n.type(t) || t.nodeType || n.isWindow(t)) return false;
                    try {
                        if (t.constructor && !o.call(t, "constructor") && !o.call(t.constructor.prototype, "isPrototypeOf")) return false
                    } catch (t) {
                        return false
                    }
                    for (e in t);
                    return void 0 === e || o.call(t, e)
                }, n.each = function (t, n, r) {
                    var i = 0,
                        o = t.length,
                        a = e(t);
                    if (r) {
                        if (a)
                            for (; i < o && false !== n.apply(t[i], r); i++);
                        else
                            for (i in t)
                                if (t.hasOwnProperty(i) && false === n.apply(t[i], r)) break
                    } else if (a)
                        for (; i < o && false !== n.call(t[i], i, t[i]); i++);
                    else
                        for (i in t)
                            if (t.hasOwnProperty(i) && false === n.call(t[i], i, t[i])) break;
                    return t
                }, n.data = function (t, e, i) {
                    if (void 0 === i) {
                        var o = t[n.expando],
                            a = o && r[o];
                        if (void 0 === e) return a;
                        if (a && e in a) return a[e]
                    } else if (void 0 !== e) {
                        var s = t[n.expando] || (t[n.expando] = ++n.uuid);
                        return r[s] = r[s] || {}, r[s][e] = i, i
                    }
                }, n.removeData = function (t, e) {
                    var i = t[n.expando],
                        o = i && r[i];
                    o && (e ? n.each(e, function (t, e) {
                        delete o[e]
                    }) : delete r[i])
                }, n.extend = function () {
                    var t, e, r, i, o, a, s = arguments[0] || {},
                        l = 1,
                        u = arguments.length,
                        c = false;
                    for ("boolean" == typeof s && (c = s, s = arguments[l] || {}, l++), "object" != typeof s && "function" !== n.type(s) && (s = {}), l === u && (s = this, l--); l < u; l++)
                        if (o = arguments[l])
                            for (i in o) o.hasOwnProperty(i) && (t = s[i], r = o[i], s !== r && (c && r && (n.isPlainObject(r) || (e = n.isArray(r))) ? (e ? (e = false, a = t && n.isArray(t) ? t : []) : a = t && n.isPlainObject(t) ? t : {}, s[i] = n.extend(c, a, r)) : void 0 !== r && (s[i] = r)));
                    return s
                }, n.queue = function (t, r, i) {
                    if (t) {
                        r = (r || "fx") + "queue";
                        var o = n.data(t, r);
                        return i ? (!o || n.isArray(i) ? o = n.data(t, r, function (t, n) {
                            var r = n || [];
                            return t && (e(Object(t)) ? function (t, e) {
                                for (var n = +e.length, r = 0, i = t.length; r < n;) t[i++] = e[r++];
                                if (n !== n)
                                    for (; void 0 !== e[r];) t[i++] = e[r++];
                                t.length = i
                            }(r, "string" == typeof t ? [t] : t) : [].push.call(r, t)), r
                        }(i)) : o.push(i), o) : o || []
                    }
                }, n.dequeue = function (t, e) {
                    n.each(t.nodeType ? [t] : t, function (t, r) {
                        e = e || "fx";
                        var i = n.queue(r, e),
                            o = i.shift();
                        "inprogress" === o && (o = i.shift()), o && ("fx" === e && i.unshift("inprogress"), o.call(r, function () {
                            n.dequeue(r, e)
                        }))
                    })
                }, n.fn = n.prototype = {
                    init: function (t) {
                        if (t.nodeType) return this[0] = t, this;
                        throw new Error("Not a DOM node.")
                    },
                    offset: function () {
                        var e = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : {
                            top: 0,
                            left: 0
                        };
                        return {
                            top: e.top + (t.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                            left: e.left + (t.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
                        }
                    },
                    position: function () {
                        var t = this[0],
                            e = function (t) {
                                for (var e = t.offsetParent; e && "html" !== e.nodeName.toLowerCase() && e.style && "static" === e.style.position.toLowerCase();) e = e.offsetParent;
                                return e || document
                            }(t),
                            r = this.offset(),
                            i = /^(?:body|html)$/i.test(e.nodeName) ? {
                                top: 0,
                                left: 0
                            } : n(e).offset();
                        return r.top -= parseFloat(t.style.marginTop) || 0, r.left -= parseFloat(t.style.marginLeft) || 0, e.style && (i.top += parseFloat(e.style.borderTopWidth) || 0, i.left += parseFloat(e.style.borderLeftWidth) || 0), {
                            top: r.top - i.top,
                            left: r.left - i.left
                        }
                    }
                };
                var r = {};
                n.expando = "velocity" + (new Date).getTime(), n.uuid = 0;
                for (var i = {}, o = i.hasOwnProperty, a = i.toString, s = "Boolean Number String Function Array Date RegExp Object Error".split(" "), l = 0; l < s.length; l++) i["[object " + s[l] + "]"] = s[l].toLowerCase();
                n.fn.init.prototype = n.fn, t.Velocity = {
                    Utilities: n
                }
            }
        }(window),
        function (t) {
            "use strict";
            "object" == typeof e && "object" == typeof e.exports ? e.exports = t() : "function" == typeof define && define.amd ? define(t) : t()
        }(function () {
            "use strict";
            return function (t, e, n, r) {
                function i(t) {
                    for (var e = -1, n = t ? t.length : 0, r = []; ++e < n;) {
                        var i = t[e];
                        i && r.push(i)
                    }
                    return r
                }

                function o(t) {
                    return x.isWrapped(t) ? t = y.call(t) : x.isNode(t) && (t = [t]), t
                }

                function a(t) {
                    var e = d.data(t, "velocity");
                    return null === e ? r : e
                }

                function s(t, e) {
                    var n = a(t);
                    n && n.delayTimer && !n.delayPaused && (n.delayRemaining = n.delay - e + n.delayBegin, n.delayPaused = true, clearTimeout(n.delayTimer.setTimeout))
                }

                function l(t, e) {
                    var n = a(t);
                    n && n.delayTimer && n.delayPaused && (n.delayPaused = false, n.delayTimer.setTimeout = setTimeout(n.delayTimer.next, n.delayRemaining))
                }

                function u(t) {
                    return function (e) {
                        return Math.round(e * t) * (1 / t)
                    }
                }

                function c(t, n, r, i) {
                    function o(t, e) {
                        return 1 - 3 * e + 3 * t
                    }

                    function a(t, e) {
                        return 3 * e - 6 * t
                    }

                    function s(t) {
                        return 3 * t
                    }

                    function l(t, e, n) {
                        return ((o(e, n) * t + a(e, n)) * t + s(e)) * t
                    }

                    function u(t, e, n) {
                        return 3 * o(e, n) * t * t + 2 * a(e, n) * t + s(e)
                    }

                    function c(e, n) {
                        for (var i = 0; i < v; ++i) {
                            var o = u(n, t, r);
                            if (0 === o) return n;
                            n -= (l(n, t, r) - e) / o
                        }
                        return n
                    }

                    function f() {
                        for (var e = 0; e < b; ++e) C[e] = l(e * x, t, r)
                    }

                    function p(e, n, i) {
                        var o, a, s = 0;
                        do {
                            a = n + (i - n) / 2, o = l(a, t, r) - e, o > 0 ? i = a : n = a
                        } while (Math.abs(o) > m && ++s < y);
                        return a
                    }

                    function h(e) {
                        for (var n = 0, i = 1, o = b - 1; i !== o && C[i] <= e; ++i) n += x;
                        --i;
                        var a = (e - C[i]) / (C[i + 1] - C[i]),
                            s = n + a * x,
                            l = u(s, t, r);
                        return l >= g ? c(e, s) : 0 === l ? s : p(e, n, n + x)
                    }

                    function d() {
                        k = true, t === n && r === i || f()
                    }
                    var v = 4,
                        g = .001,
                        m = 1e-7,
                        y = 10,
                        b = 11,
                        x = 1 / (b - 1),
                        _ = "Float32Array" in e;
                    if (4 !== arguments.length) return false;
                    for (var w = 0; w < 4; ++w)
                        if ("number" != typeof arguments[w] || isNaN(arguments[w]) || !isFinite(arguments[w])) return false;
                    t = Math.min(t, 1), r = Math.min(r, 1), t = Math.max(t, 0), r = Math.max(r, 0);
                    var C = _ ? new Float32Array(b) : new Array(b),
                        k = false,
                        A = function (e) {
                            return k || d(), t === n && r === i ? e : 0 === e ? 0 : 1 === e ? 1 : l(h(e), n, i)
                        };
                    A.getControlPoints = function () {
                        return [{
                            x: t,
                            y: n
                        }, {
                            x: r,
                            y: i
                        }]
                    };
                    var T = "generateBezier(" + [t, n, r, i] + ")";
                    return A.toString = function () {
                        return T
                    }, A
                }

                function f(t, e) {
                    var n = t;
                    return x.isString(t) ? k.Easings[t] || (n = false) : n = x.isArray(t) && 1 === t.length ? u.apply(null, t) : x.isArray(t) && 2 === t.length ? A.apply(null, t.concat([e])) : !(!x.isArray(t) || 4 !== t.length) && c.apply(null, t), false === n && (n = k.Easings[k.defaults.easing] ? k.defaults.easing : C), n
                }

                function p(t) {
                    if (t) {
                        var e = k.timestamp && true !== t ? t : m.now(),
                            n = k.State.calls.length;
                        n > 1e4 && (k.State.calls = i(k.State.calls), n = k.State.calls.length);
                        for (var o = 0; o < n; o++)
                            if (k.State.calls[o]) {
                                var s = k.State.calls[o],
                                    l = s[0],
                                    u = s[2],
                                    c = s[3],
                                    f = !c,
                                    g = null,
                                    y = s[5],
                                    b = s[6];
                                if (c || (c = k.State.calls[o][3] = e - 16), y) {
                                    if (true !== y.resume) continue;
                                    c = s[3] = Math.round(e - b - 16), s[5] = null
                                }
                                b = s[6] = e - c;
                                for (var _ = Math.min(b / u.duration, 1), w = 0, C = l.length; w < C; w++) {
                                    var A = l[w],
                                        S = A.element;
                                    if (a(S)) {
                                        var O = false;
                                        if (u.display !== r && null !== u.display && "none" !== u.display) {
                                            if ("flex" === u.display) {
                                                var P = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];
                                                d.each(P, function (t, e) {
                                                    T.setPropertyValue(S, "display", e)
                                                })
                                            }
                                            T.setPropertyValue(S, "display", u.display)
                                        }
                                        u.visibility !== r && "hidden" !== u.visibility && T.setPropertyValue(S, "visibility", u.visibility);
                                        for (var E in A)
                                            if (A.hasOwnProperty(E) && "element" !== E) {
                                                var j, D = A[E],
                                                    N = x.isString(D.easing) ? k.Easings[D.easing] : D.easing;
                                                if (x.isString(D.pattern)) {
                                                    var I = 1 === _ ? function (t, e, n) {
                                                        var r = D.endValue[e];
                                                        return n ? Math.round(r) : r
                                                    } : function (t, e, n) {
                                                        var r = D.startValue[e],
                                                            i = D.endValue[e] - r,
                                                            o = r + i * N(_, u, i);
                                                        return n ? Math.round(o) : o
                                                    };
                                                    j = D.pattern.replace(/{(\d+)(!)?}/g, I)
                                                } else if (1 === _) j = D.endValue;
                                                else {
                                                    var F = D.endValue - D.startValue;
                                                    j = D.startValue + F * N(_, u, F)
                                                }
                                                if (!f && j === D.currentValue) continue;
                                                if (D.currentValue = j, "tween" === E) g = j;
                                                else {
                                                    var L;
                                                    if (T.Hooks.registered[E]) {
                                                        L = T.Hooks.getRoot(E);
                                                        var R = a(S).rootPropertyValueCache[L];
                                                        R && (D.rootPropertyValue = R)
                                                    }
                                                    var V = T.setPropertyValue(S, E, D.currentValue + (v < 9 && 0 === parseFloat(j) ? "" : D.unitType), D.rootPropertyValue, D.scrollData);
                                                    T.Hooks.registered[E] && (T.Normalizations.registered[L] ? a(S).rootPropertyValueCache[L] = T.Normalizations.registered[L]("extract", null, V[1]) : a(S).rootPropertyValueCache[L] = V[1]), "transform" === V[0] && (O = true)
                                                }
                                            }
                                        u.mobileHA && a(S).transformCache.translate3d === r && (a(S).transformCache.translate3d = "(0px, 0px, 0px)", O = true), O && T.flushTransformCache(S)
                                    }
                                }
                                u.display !== r && "none" !== u.display && (k.State.calls[o][2].display = false), u.visibility !== r && "hidden" !== u.visibility && (k.State.calls[o][2].visibility = false), u.progress && u.progress.call(s[1], s[1], _, Math.max(0, c + u.duration - e), c, g), 1 === _ && h(o)
                            }
                    }
                    k.State.isTicking && $(p)
                }

                function h(t, e) {
                    if (!k.State.calls[t]) return false;
                    for (var n = k.State.calls[t][0], i = k.State.calls[t][1], o = k.State.calls[t][2], s = k.State.calls[t][4], l = false, u = 0, c = n.length; u < c; u++) {
                        var f = n[u].element;
                        e || o.loop || ("none" === o.display && T.setPropertyValue(f, "display", o.display), "hidden" === o.visibility && T.setPropertyValue(f, "visibility", o.visibility));
                        var p = a(f);
                        if (true !== o.loop && (d.queue(f)[1] === r || !/\.velocityQueueEntryFlag/i.test(d.queue(f)[1])) && p) {
                            p.isAnimating = false, p.rootPropertyValueCache = {};
                            var h = false;
                            d.each(T.Lists.transforms3D, function (t, e) {
                                var n = /^scale/.test(e) ? 1 : 0,
                                    i = p.transformCache[e];
                                p.transformCache[e] !== r && new RegExp("^\\(" + n + "[^.]").test(i) && (h = true, delete p.transformCache[e])
                            }), o.mobileHA && (h = true, delete p.transformCache.translate3d), h && T.flushTransformCache(f), T.Values.removeClass(f, "velocity-animating")
                        }
                        if (!e && o.complete && !o.loop && u === c - 1) try {
                            o.complete.call(i, i)
                        } catch (t) {
                            setTimeout(function () {
                                throw t
                            }, 1)
                        }
                        s && true !== o.loop && s(i), p && true === o.loop && !e && (d.each(p.tweensContainer, function (t, e) {
                            if (/^rotate/.test(t) && (parseFloat(e.startValue) - parseFloat(e.endValue)) % 360 == 0) {
                                var n = e.startValue;
                                e.startValue = e.endValue, e.endValue = n
                            }
                            /^backgroundPosition/i.test(t) && 100 === parseFloat(e.endValue) && "%" === e.unitType && (e.endValue = 0, e.startValue = 100)
                        }), k(f, "reverse", {
                            loop: true,
                            delay: o.delay
                        })), false !== o.queue && d.dequeue(f, o.queue)
                    }
                    k.State.calls[t] = false;
                    for (var v = 0, g = k.State.calls.length; v < g; v++)
                        if (false !== k.State.calls[v]) {
                            l = true;
                            break
                        } false === l && (k.State.isTicking = false, delete k.State.calls, k.State.calls = [])
                }
                var d, v = function () {
                        if (n.documentMode) return n.documentMode;
                        for (var t = 7; t > 4; t--) {
                            var e = n.createElement("div");
                            if (e.innerHTML = "\x3c!--[if IE " + t + "]><span></span><![endif]--\x3e", e.getElementsByTagName("span").length) return e = null, t
                        }
                        return r
                    }(),
                    g = function () {
                        var t = 0;
                        return e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || function (e) {
                            var n, r = (new Date).getTime();
                            return n = Math.max(0, 16 - (r - t)), t = r + n, setTimeout(function () {
                                e(r + n)
                            }, n)
                        }
                    }(),
                    m = function () {
                        var t = e.performance || {};
                        if ("function" != typeof t.now) {
                            var n = t.timing && t.timing.navigationStart ? t.timing.navigationStart : (new Date).getTime();
                            t.now = function () {
                                return (new Date).getTime() - n
                            }
                        }
                        return t
                    }(),
                    y = function () {
                        var t = Array.prototype.slice;
                        try {
                            return t.call(n.documentElement), t
                        } catch (e) {
                            return function (e, n) {
                                var r = this.length;
                                if ("number" != typeof e && (e = 0), "number" != typeof n && (n = r), this.slice) return t.call(this, e, n);
                                var i, o = [],
                                    a = e >= 0 ? e : Math.max(0, r + e),
                                    s = n < 0 ? r + n : Math.min(n, r),
                                    l = s - a;
                                if (l > 0)
                                    if (o = new Array(l), this.charAt)
                                        for (i = 0; i < l; i++) o[i] = this.charAt(a + i);
                                    else
                                        for (i = 0; i < l; i++) o[i] = this[a + i];
                                return o
                            }
                        }
                    }(),
                    b = function () {
                        return Array.prototype.includes ? function (t, e) {
                            return t.includes(e)
                        } : Array.prototype.indexOf ? function (t, e) {
                            return t.indexOf(e) >= 0
                        } : function (t, e) {
                            for (var n = 0; n < t.length; n++)
                                if (t[n] === e) return true;
                            return false
                        }
                    },
                    x = {
                        isNumber: function (t) {
                            return "number" == typeof t
                        },
                        isString: function (t) {
                            return "string" == typeof t
                        },
                        isArray: Array.isArray || function (t) {
                            return "[object Array]" === Object.prototype.toString.call(t)
                        },
                        isFunction: function (t) {
                            return "[object Function]" === Object.prototype.toString.call(t)
                        },
                        isNode: function (t) {
                            return t && t.nodeType
                        },
                        isWrapped: function (t) {
                            return t && t !== e && x.isNumber(t.length) && !x.isString(t) && !x.isFunction(t) && !x.isNode(t) && (0 === t.length || x.isNode(t[0]))
                        },
                        isSVG: function (t) {
                            return e.SVGElement && t instanceof e.SVGElement
                        },
                        isEmptyObject: function (t) {
                            for (var e in t)
                                if (t.hasOwnProperty(e)) return false;
                            return true
                        }
                    },
                    _ = false;
                if (t.fn && t.fn.jquery ? (d = t, _ = true) : d = e.Velocity.Utilities, v <= 8 && !_) throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
                if (v <= 7) return void(jQuery.fn.velocity = jQuery.fn.animate);
                var w = 400,
                    C = "swing",
                    k = {
                        State: {
                            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e.navigator.userAgent),
                            isAndroid: /Android/i.test(e.navigator.userAgent),
                            isGingerbread: /Android 2\.3\.[3-7]/i.test(e.navigator.userAgent),
                            isbrowser: e.browser,
                            isFirefox: /Firefox/i.test(e.navigator.userAgent),
                            prefixElement: n.createElement("div"),
                            prefixMatches: {},
                            scrollAnchor: null,
                            scrollPropertyLeft: null,
                            scrollPropertyTop: null,
                            isTicking: false,
                            calls: [],
                            delayedElements: {
                                count: 0
                            }
                        },
                        CSS: {},
                        Utilities: d,
                        Redirects: {},
                        Easings: {},
                        Promise: e.Promise,
                        defaults: {
                            queue: "",
                            duration: w,
                            easing: C,
                            begin: r,
                            complete: r,
                            progress: r,
                            display: r,
                            visibility: r,
                            loop: false,
                            delay: false,
                            mobileHA: true,
                            _cacheValues: true,
                            promiseRejectEmpty: true
                        },
                        init: function (t) {
                            d.data(t, "velocity", {
                                isSVG: x.isSVG(t),
                                isAnimating: false,
                                computedStyle: null,
                                tweensContainer: null,
                                rootPropertyValueCache: {},
                                transformCache: {}
                            })
                        },
                        hook: null,
                        mock: false,
                        version: {
                            major: 1,
                            minor: 5,
                            patch: 1
                        },
                        debug: false,
                        timestamp: true,
                        pauseAll: function (t) {
                            var e = (new Date).getTime();
                            d.each(k.State.calls, function (e, n) {
                                if (n) {
                                    if (t !== r && (n[2].queue !== t || false === n[2].queue)) return true;
                                    n[5] = {
                                        resume: false
                                    }
                                }
                            }), d.each(k.State.delayedElements, function (t, n) {
                                n && s(n, e)
                            })
                        },
                        resumeAll: function (t) {
                            var e = (new Date).getTime();
                            d.each(k.State.calls, function (e, n) {
                                if (n) {
                                    if (t !== r && (n[2].queue !== t || false === n[2].queue)) return true;
                                    n[5] && (n[5].resume = true)
                                }
                            }), d.each(k.State.delayedElements, function (t, n) {
                                n && l(n, e)
                            })
                        }
                    };
                e.pageYOffset !== r ? (k.State.scrollAnchor = e, k.State.scrollPropertyLeft = "pageXOffset", k.State.scrollPropertyTop = "pageYOffset") : (k.State.scrollAnchor = n.documentElement || n.body.parentNode || n.body, k.State.scrollPropertyLeft = "scrollLeft", k.State.scrollPropertyTop = "scrollTop");
                var A = function () {
                    function t(t) {
                        return -t.tension * t.x - t.friction * t.v
                    }

                    function e(e, n, r) {
                        var i = {
                            x: e.x + r.dx * n,
                            v: e.v + r.dv * n,
                            tension: e.tension,
                            friction: e.friction
                        };
                        return {
                            dx: i.v,
                            dv: t(i)
                        }
                    }

                    function n(n, r) {
                        var i = {
                                dx: n.v,
                                dv: t(n)
                            },
                            o = e(n, .5 * r, i),
                            a = e(n, .5 * r, o),
                            s = e(n, r, a),
                            l = 1 / 6 * (i.dx + 2 * (o.dx + a.dx) + s.dx),
                            u = 1 / 6 * (i.dv + 2 * (o.dv + a.dv) + s.dv);
                        return n.x = n.x + l * r, n.v = n.v + u * r, n
                    }
                    return function t(e, r, i) {
                        var o, a, s, l = {
                                x: -1,
                                v: 0,
                                tension: null,
                                friction: null
                            },
                            u = [0],
                            c = 0;
                        for (e = parseFloat(e) || 500, r = parseFloat(r) || 20, i = i || null, l.tension = e, l.friction = r, o = null !== i, o ? (c = t(e, r), a = c / i * .016) : a = .016;;)
                            if (s = n(s || l, a), u.push(1 + s.x), c += 16, !(Math.abs(s.x) > 1e-4 && Math.abs(s.v) > 1e-4)) break;
                        return o ? function (t) {
                            return u[t * (u.length - 1) | 0]
                        } : c
                    }
                }();
                k.Easings = {
                    linear: function (t) {
                        return t
                    },
                    swing: function (t) {
                        return .5 - Math.cos(t * Math.PI) / 2
                    },
                    spring: function (t) {
                        return 1 - Math.cos(4.5 * t * Math.PI) * Math.exp(6 * -t)
                    }
                }, d.each([
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
                ], function (t, e) {
                    k.Easings[e[0]] = c.apply(null, e[1])
                });
                var T = k.CSS = {
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
                        register: function () {
                            for (var t = 0; t < T.Lists.colors.length; t++) {
                                var e = "color" === T.Lists.colors[t] ? "0 0 0 1" : "255 255 255 1";
                                T.Hooks.templates[T.Lists.colors[t]] = ["Red Green Blue Alpha", e]
                            }
                            var n, r, i;
                            if (v)
                                for (n in T.Hooks.templates)
                                    if (T.Hooks.templates.hasOwnProperty(n)) {
                                        r = T.Hooks.templates[n], i = r[0].split(" ");
                                        var o = r[1].match(T.RegEx.valueSplit);
                                        "Color" === i[0] && (i.push(i.shift()), o.push(o.shift()), T.Hooks.templates[n] = [i.join(" "), o.join(" ")])
                                    }
                            for (n in T.Hooks.templates)
                                if (T.Hooks.templates.hasOwnProperty(n)) {
                                    r = T.Hooks.templates[n], i = r[0].split(" ");
                                    for (var a in i)
                                        if (i.hasOwnProperty(a)) {
                                            var s = n + i[a],
                                                l = a;
                                            T.Hooks.registered[s] = [n, l]
                                        }
                                }
                        },
                        getRoot: function (t) {
                            var e = T.Hooks.registered[t];
                            return e ? e[0] : t
                        },
                        getUnit: function (t, e) {
                            var n = (t.substr(e || 0, 5).match(/^[a-z%]+/) || [])[0] || "";
                            return n && b(T.Lists.units, n) ? n : ""
                        },
                        fixColors: function (t) {
                            return t.replace(/(rgba?\(\s*)?(\b[a-z]+\b)/g, function (t, e, n) {
                                return T.Lists.colorNames.hasOwnProperty(n) ? (e || "rgba(") + T.Lists.colorNames[n] + (e ? "" : ",1)") : e + n
                            })
                        },
                        cleanRootPropertyValue: function (t, e) {
                            return T.RegEx.valueUnwrap.test(e) && (e = e.match(T.RegEx.valueUnwrap)[1]), T.Values.isCSSNullValue(e) && (e = T.Hooks.templates[t][1]), e
                        },
                        extractValue: function (t, e) {
                            var n = T.Hooks.registered[t];
                            if (n) {
                                var r = n[0],
                                    i = n[1];
                                return e = T.Hooks.cleanRootPropertyValue(r, e), e.toString().match(T.RegEx.valueSplit)[i]
                            }
                            return e
                        },
                        injectValue: function (t, e, n) {
                            var r = T.Hooks.registered[t];
                            if (r) {
                                var i, o = r[0],
                                    a = r[1];
                                return n = T.Hooks.cleanRootPropertyValue(o, n), i = n.toString().match(T.RegEx.valueSplit), i[a] = e, i.join(" ")
                            }
                            return n
                        }
                    },
                    Normalizations: {
                        registered: {
                            clip: function (t, e, n) {
                                switch (t) {
                                    case "name":
                                        return "clip";
                                    case "extract":
                                        var r;
                                        return T.RegEx.wrappedValueAlreadyExtracted.test(n) ? r = n : (r = n.toString().match(T.RegEx.valueUnwrap), r = r ? r[1].replace(/,(\s+)?/g, " ") : n), r;
                                    case "inject":
                                        return "rect(" + n + ")"
                                }
                            },
                            blur: function (t, e, n) {
                                switch (t) {
                                    case "name":
                                        return k.State.isFirefox ? "filter" : "-webkit-filter";
                                    case "extract":
                                        var r = parseFloat(n);
                                        if (!r && 0 !== r) {
                                            var i = n.toString().match(/blur\(([0-9]+[A-z]+)\)/i);
                                            r = i ? i[1] : 0
                                        }
                                        return r;
                                    case "inject":
                                        return parseFloat(n) ? "blur(" + n + ")" : "none"
                                }
                            },
                            opacity: function (t, e, n) {
                                if (v <= 8) switch (t) {
                                    case "name":
                                        return "filter";
                                    case "extract":
                                        var r = n.toString().match(/alpha\(opacity=(.*)\)/i);
                                        return n = r ? r[1] / 100 : 1;
                                    case "inject":
                                        return e.style.zoom = 1, parseFloat(n) >= 1 ? "" : "alpha(opacity=" + parseInt(100 * parseFloat(n), 10) + ")"
                                } else switch (t) {
                                    case "name":
                                        return "opacity";
                                    case "extract":
                                    case "inject":
                                        return n
                                }
                            }
                        },
                        register: function () {
                            function t(t, e, n) {
                                if ("border-box" === T.getPropertyValue(e, "boxSizing").toString().toLowerCase() === (n || false)) {
                                    var r, i, o = 0,
                                        a = "width" === t ? ["Left", "Right"] : ["Top", "Bottom"],
                                        s = ["padding" + a[0], "padding" + a[1], "border" + a[0] + "Width", "border" + a[1] + "Width"];
                                    for (r = 0; r < s.length; r++) i = parseFloat(T.getPropertyValue(e, s[r])), isNaN(i) || (o += i);
                                    return n ? -o : o
                                }
                                return 0
                            }

                            function e(e, n) {
                                return function (r, i, o) {
                                    switch (r) {
                                        case "name":
                                            return e;
                                        case "extract":
                                            return parseFloat(o) + t(e, i, n);
                                        case "inject":
                                            return parseFloat(o) - t(e, i, n) + "px"
                                    }
                                }
                            }
                            v && !(v > 9) || k.State.isGingerbread || (T.Lists.transformsBase = T.Lists.transformsBase.concat(T.Lists.transforms3D));
                            for (var n = 0; n < T.Lists.transformsBase.length; n++) ! function () {
                                var t = T.Lists.transformsBase[n];
                                T.Normalizations.registered[t] = function (e, n, i) {
                                    switch (e) {
                                        case "name":
                                            return "transform";
                                        case "extract":
                                            return a(n) === r || a(n).transformCache[t] === r ? /^scale/i.test(t) ? 1 : 0 : a(n).transformCache[t].replace(/[()]/g, "");
                                        case "inject":
                                            var o = false;
                                            switch (t.substr(0, t.length - 1)) {
                                                case "translate":
                                                    o = !/(%|px|em|rem|vw|vh|\d)$/i.test(i);
                                                    break;
                                                case "scal":
                                                case "scale":
                                                    k.State.isAndroid && a(n).transformCache[t] === r && i < 1 && (i = 1), o = !/(\d)$/i.test(i);
                                                    break;
                                                case "skew":
                                                case "rotate":
                                                    o = !/(deg|\d)$/i.test(i)
                                            }
                                            return o || (a(n).transformCache[t] = "(" + i + ")"), a(n).transformCache[t]
                                    }
                                }
                            }();
                            for (var i = 0; i < T.Lists.colors.length; i++) ! function () {
                                var t = T.Lists.colors[i];
                                T.Normalizations.registered[t] = function (e, n, i) {
                                    switch (e) {
                                        case "name":
                                            return t;
                                        case "extract":
                                            var o;
                                            if (T.RegEx.wrappedValueAlreadyExtracted.test(i)) o = i;
                                            else {
                                                var a, s = {
                                                    black: "rgb(0, 0, 0)",
                                                    blue: "rgb(0, 0, 255)",
                                                    gray: "rgb(128, 128, 128)",
                                                    green: "rgb(0, 128, 0)",
                                                    red: "rgb(255, 0, 0)",
                                                    white: "rgb(255, 255, 255)"
                                                };
                                                /^[A-z]+$/i.test(i) ? a = s[i] !== r ? s[i] : s.black : T.RegEx.isHex.test(i) ? a = "rgb(" + T.Values.hexToRgb(i).join(" ") + ")" : /^rgba?\(/i.test(i) || (a = s.black), o = (a || i).toString().match(T.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ")
                                            }
                                            return (!v || v > 8) && 3 === o.split(" ").length && (o += " 1"), o;
                                        case "inject":
                                            return /^rgb/.test(i) ? i : (v <= 8 ? 4 === i.split(" ").length && (i = i.split(/\s+/).slice(0, 3).join(" ")) : 3 === i.split(" ").length && (i += " 1"), (v <= 8 ? "rgb" : "rgba") + "(" + i.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")")
                                    }
                                }
                            }();
                            T.Normalizations.registered.innerWidth = e("width", true), T.Normalizations.registered.innerHeight = e("height", true), T.Normalizations.registered.outerWidth = e("width"), T.Normalizations.registered.outerHeight = e("height")
                        }
                    },
                    Names: {
                        camelCase: function (t) {
                            return t.replace(/-(\w)/g, function (t, e) {
                                return e.toUpperCase()
                            })
                        },
                        SVGAttribute: function (t) {
                            var e = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
                            return (v || k.State.isAndroid && !k.State.isbrowser) && (e += "|transform"), new RegExp("^(" + e + ")$", "i").test(t)
                        },
                        prefixCheck: function (t) {
                            if (k.State.prefixMatches[t]) return [k.State.prefixMatches[t], true];
                            for (var e = ["", "Webkit", "Moz", "ms", "O"], n = 0, r = e.length; n < r; n++) {
                                var i;
                                if (i = 0 === n ? t : e[n] + t.replace(/^\w/, function (t) {
                                        return t.toUpperCase()
                                    }), x.isString(k.State.prefixElement.style[i])) return k.State.prefixMatches[t] = i, [i, true]
                            }
                            return [t, false]
                        }
                    },
                    Values: {
                        hexToRgb: function (t) {
                            var e, n = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                                r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
                            return t = t.replace(n, function (t, e, n, r) {
                                return e + e + n + n + r + r
                            }), e = r.exec(t), e ? [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)] : [0, 0, 0]
                        },
                        isCSSNullValue: function (t) {
                            return !t || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(t)
                        },
                        getUnitType: function (t) {
                            return /^(rotate|skew)/i.test(t) ? "deg" : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(t) ? "" : "px"
                        },
                        getDisplayType: function (t) {
                            var e = t && t.tagName.toString().toLowerCase();
                            return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(e) ? "inline" : /^(li)$/i.test(e) ? "list-item" : /^(tr)$/i.test(e) ? "table-row" : /^(table)$/i.test(e) ? "table" : /^(tbody)$/i.test(e) ? "table-row-group" : "block"
                        },
                        addClass: function (t, e) {
                            if (t)
                                if (t.classList) t.classList.add(e);
                                else if (x.isString(t.className)) t.className += (t.className.length ? " " : "") + e;
                            else {
                                var n = t.getAttribute(v <= 7 ? "className" : "class") || "";
                                t.setAttribute("class", n + (n ? " " : "") + e)
                            }
                        },
                        removeClass: function (t, e) {
                            if (t)
                                if (t.classList) t.classList.remove(e);
                                else if (x.isString(t.className)) t.className = t.className.toString().replace(new RegExp("(^|\\s)" + e.split(" ").join("|") + "(\\s|$)", "gi"), " ");
                            else {
                                var n = t.getAttribute(v <= 7 ? "className" : "class") || "";
                                t.setAttribute("class", n.replace(new RegExp("(^|s)" + e.split(" ").join("|") + "(s|$)", "gi"), " "))
                            }
                        }
                    },
                    getPropertyValue: function (t, n, i, o) {
                        function s(t, n) {
                            var i = 0;
                            if (v <= 8) i = d.css(t, n);
                            else {
                                var l = false;
                                /^(width|height)$/.test(n) && 0 === T.getPropertyValue(t, "display") && (l = true, T.setPropertyValue(t, "display", T.Values.getDisplayType(t)));
                                var u = function () {
                                    l && T.setPropertyValue(t, "display", "none")
                                };
                                if (!o) {
                                    if ("height" === n && "border-box" !== T.getPropertyValue(t, "boxSizing").toString().toLowerCase()) {
                                        var c = t.offsetHeight - (parseFloat(T.getPropertyValue(t, "borderTopWidth")) || 0) - (parseFloat(T.getPropertyValue(t, "borderBottomWidth")) || 0) - (parseFloat(T.getPropertyValue(t, "paddingTop")) || 0) - (parseFloat(T.getPropertyValue(t, "paddingBottom")) || 0);
                                        return u(), c
                                    }
                                    if ("width" === n && "border-box" !== T.getPropertyValue(t, "boxSizing").toString().toLowerCase()) {
                                        var f = t.offsetWidth - (parseFloat(T.getPropertyValue(t, "borderLeftWidth")) || 0) - (parseFloat(T.getPropertyValue(t, "borderRightWidth")) || 0) - (parseFloat(T.getPropertyValue(t, "paddingLeft")) || 0) - (parseFloat(T.getPropertyValue(t, "paddingRight")) || 0);
                                        return u(), f
                                    }
                                }
                                var p;
                                p = a(t) === r ? e.getComputedStyle(t, null) : a(t).computedStyle ? a(t).computedStyle : a(t).computedStyle = e.getComputedStyle(t, null), "borderColor" === n && (n = "borderTopColor"), i = 9 === v && "filter" === n ? p.getPropertyValue(n) : p[n], "" !== i && null !== i || (i = t.style[n]), u()
                            }
                            if ("auto" === i && /^(top|right|bottom|left)$/i.test(n)) {
                                var h = s(t, "position");
                                ("fixed" === h || "absolute" === h && /top|left/i.test(n)) && (i = d(t).position()[n] + "px")
                            }
                            return i
                        }
                        var l;
                        if (T.Hooks.registered[n]) {
                            var u = n,
                                c = T.Hooks.getRoot(u);
                            i === r && (i = T.getPropertyValue(t, T.Names.prefixCheck(c)[0])), T.Normalizations.registered[c] && (i = T.Normalizations.registered[c]("extract", t, i)), l = T.Hooks.extractValue(u, i)
                        } else if (T.Normalizations.registered[n]) {
                            var f, p;
                            f = T.Normalizations.registered[n]("name", t), "transform" !== f && (p = s(t, T.Names.prefixCheck(f)[0]), T.Values.isCSSNullValue(p) && T.Hooks.templates[n] && (p = T.Hooks.templates[n][1])), l = T.Normalizations.registered[n]("extract", t, p)
                        }
                        if (!/^[\d-]/.test(l)) {
                            var h = a(t);
                            if (h && h.isSVG && T.Names.SVGAttribute(n))
                                if (/^(height|width)$/i.test(n)) try {
                                    l = t.getBBox()[n]
                                } catch (t) {
                                    l = 0
                                } else l = t.getAttribute(n);
                                else l = s(t, T.Names.prefixCheck(n)[0])
                        }
                        return T.Values.isCSSNullValue(l) && (l = 0), k.debug >= 2 && console.log("Get " + n + ": " + l), l
                    },
                    setPropertyValue: function (t, n, r, i, o) {
                        var s = n;
                        if ("scroll" === n) o.container ? o.container["scroll" + o.direction] = r : "Left" === o.direction ? e.scrollTo(r, o.alternateValue) : e.scrollTo(o.alternateValue, r);
                        else if (T.Normalizations.registered[n] && "transform" === T.Normalizations.registered[n]("name", t)) T.Normalizations.registered[n]("inject", t, r), s = "transform", r = a(t).transformCache[n];
                        else {
                            if (T.Hooks.registered[n]) {
                                var l = n,
                                    u = T.Hooks.getRoot(n);
                                i = i || T.getPropertyValue(t, u), r = T.Hooks.injectValue(l, r, i), n = u
                            }
                            if (T.Normalizations.registered[n] && (r = T.Normalizations.registered[n]("inject", t, r), n = T.Normalizations.registered[n]("name", t)), s = T.Names.prefixCheck(n)[0], v <= 8) try {
                                t.style[s] = r
                            } catch (t) {
                                k.debug && console.log("Browser does not support [" + r + "] for [" + s + "]")
                            } else {
                                var c = a(t);
                                c && c.isSVG && T.Names.SVGAttribute(n) ? t.setAttribute(n, r) : t.style[s] = r
                            }
                            k.debug >= 2 && console.log("Set " + n + " (" + s + "): " + r)
                        }
                        return [s, r]
                    },
                    flushTransformCache: function (t) {
                        var e = "",
                            n = a(t);
                        if ((v || k.State.isAndroid && !k.State.isbrowser) && n && n.isSVG) {
                            var r = function (e) {
                                    return parseFloat(T.getPropertyValue(t, e))
                                },
                                i = {
                                    translate: [r("translateX"), r("translateY")],
                                    skewX: [r("skewX")],
                                    skewY: [r("skewY")],
                                    scale: 1 !== r("scale") ? [r("scale"), r("scale")] : [r("scaleX"), r("scaleY")],
                                    rotate: [r("rotateZ"), 0, 0]
                                };
                            d.each(a(t).transformCache, function (t) {
                                /^translate/i.test(t) ? t = "translate" : /^scale/i.test(t) ? t = "scale" : /^rotate/i.test(t) && (t = "rotate"), i[t] && (e += t + "(" + i[t].join(" ") + ") ", delete i[t])
                            })
                        } else {
                            var o, s;
                            d.each(a(t).transformCache, function (n) {
                                if (o = a(t).transformCache[n], "transformPerspective" === n) return s = o, true;
                                9 === v && "rotateZ" === n && (n = "rotate"), e += n + o + " "
                            }), s && (e = "perspective" + s + " " + e)
                        }
                        T.setPropertyValue(t, "transform", e)
                    }
                };
                T.Hooks.register(), T.Normalizations.register(), k.hook = function (t, e, n) {
                    var i;
                    return t = o(t), d.each(t, function (t, o) {
                        if (a(o) === r && k.init(o), n === r) i === r && (i = T.getPropertyValue(o, e));
                        else {
                            var s = T.setPropertyValue(o, e, n);
                            "transform" === s[0] && k.CSS.flushTransformCache(o), i = s
                        }
                    }), i
                };
                var S = function () {
                    function t() {
                        return c ? A.promise || null : v
                    }

                    function i(t, i) {
                        function o(o) {
                            var c, h;
                            if (l.begin && 0 === O) try {
                                l.begin.call(m, m)
                            } catch (t) {
                                setTimeout(function () {
                                    throw t
                                }, 1)
                            }
                            if ("scroll" === j) {
                                var v, g, w, C = /^x$/i.test(l.axis) ? "Left" : "Top",
                                    S = parseFloat(l.offset) || 0;
                                l.container ? x.isWrapped(l.container) || x.isNode(l.container) ? (l.container = l.container[0] || l.container, v = l.container["scroll" + C], w = v + d(t).position()[C.toLowerCase()] + S) : l.container = null : (v = k.State.scrollAnchor[k.State["scrollProperty" + C]], g = k.State.scrollAnchor[k.State["scrollProperty" + ("Left" === C ? "Top" : "Left")]], w = d(t).offset()[C.toLowerCase()] + S), u = {
                                    scroll: {
                                        rootPropertyValue: false,
                                        startValue: v,
                                        currentValue: v,
                                        endValue: w,
                                        unitType: "",
                                        easing: l.easing,
                                        scrollData: {
                                            container: l.container,
                                            direction: C,
                                            alternateValue: g
                                        }
                                    },
                                    element: t
                                }, k.debug && console.log("tweensContainer (scroll): ", u.scroll, t)
                            } else if ("reverse" === j) {
                                if (!(c = a(t))) return;
                                if (!c.tweensContainer) return void d.dequeue(t, l.queue);
                                "none" === c.opts.display && (c.opts.display = "auto"), "hidden" === c.opts.visibility && (c.opts.visibility = "visible"), c.opts.loop = false, c.opts.begin = null, c.opts.complete = null, _.easing || delete l.easing, _.duration || delete l.duration, l = d.extend({}, c.opts, l), h = d.extend(true, {}, c ? c.tweensContainer : null);
                                for (var P in h)
                                    if (h.hasOwnProperty(P) && "element" !== P) {
                                        var E = h[P].startValue;
                                        h[P].startValue = h[P].currentValue = h[P].endValue, h[P].endValue = E, x.isEmptyObject(_) || (h[P].easing = l.easing), k.debug && console.log("reverse tweensContainer (" + P + "): " + JSON.stringify(h[P]), t)
                                    }
                                u = h
                            } else if ("start" === j) {
                                c = a(t), c && c.tweensContainer && true === c.isAnimating && (h = c.tweensContainer);
                                var D = function (i, o) {
                                    var a, f = T.Hooks.getRoot(i),
                                        p = false,
                                        v = o[0],
                                        g = o[1],
                                        m = o[2];
                                    if (!(c && c.isSVG || "tween" === f || false !== T.Names.prefixCheck(f)[1] || T.Normalizations.registered[f] !== r)) return void(k.debug && console.log("Skipping [" + f + "] due to a lack of browser support."));
                                    (l.display !== r && null !== l.display && "none" !== l.display || l.visibility !== r && "hidden" !== l.visibility) && /opacity|filter/.test(i) && !m && 0 !== v && (m = 0), l._cacheValues && h && h[i] ? (m === r && (m = h[i].endValue + h[i].unitType), p = c.rootPropertyValueCache[f]) : T.Hooks.registered[i] ? m === r ? (p = T.getPropertyValue(t, f), m = T.getPropertyValue(t, i, p)) : p = T.Hooks.templates[f][1] : m === r && (m = T.getPropertyValue(t, i));
                                    var y, b, _, w = false,
                                        C = function (t, e) {
                                            var n, r;
                                            return r = (e || "0").toString().toLowerCase().replace(/[%A-z]+$/, function (t) {
                                                return n = t, ""
                                            }), n || (n = T.Values.getUnitType(t)), [r, n]
                                        };
                                    if (m !== v && x.isString(m) && x.isString(v)) {
                                        a = "";
                                        var A = 0,
                                            S = 0,
                                            $ = [],
                                            O = [],
                                            P = 0,
                                            E = 0,
                                            j = 0;
                                        for (m = T.Hooks.fixColors(m), v = T.Hooks.fixColors(v); A < m.length && S < v.length;) {
                                            var D = m[A],
                                                N = v[S];
                                            if (/[\d\.-]/.test(D) && /[\d\.-]/.test(N)) {
                                                for (var I = D, F = N, L = ".", V = "."; ++A < m.length;) {
                                                    if ((D = m[A]) === L) L = "..";
                                                    else if (!/\d/.test(D)) break;
                                                    I += D
                                                }
                                                for (; ++S < v.length;) {
                                                    if ((N = v[S]) === V) V = "..";
                                                    else if (!/\d/.test(N)) break;
                                                    F += N
                                                }
                                                var q = T.Hooks.getUnit(m, A),
                                                    H = T.Hooks.getUnit(v, S);
                                                if (A += q.length, S += H.length, q === H) I === F ? a += I + q : (a += "{" + $.length + (E ? "!" : "") + "}" + q, $.push(parseFloat(I)), O.push(parseFloat(F)));
                                                else {
                                                    var M = parseFloat(I),
                                                        B = parseFloat(F);
                                                    a += (P < 5 ? "calc" : "") + "(" + (M ? "{" + $.length + (E ? "!" : "") + "}" : "0") + q + " + " + (B ? "{" + ($.length + (M ? 1 : 0)) + (E ? "!" : "") + "}" : "0") + H + ")", M && ($.push(M), O.push(0)), B && ($.push(0), O.push(B))
                                                }
                                            } else {
                                                if (D !== N) {
                                                    P = 0;
                                                    break
                                                }
                                                a += D, A++, S++, 0 === P && "c" === D || 1 === P && "a" === D || 2 === P && "l" === D || 3 === P && "c" === D || P >= 4 && "(" === D ? P++ : (P && P < 5 || P >= 4 && ")" === D && --P < 5) && (P = 0), 0 === E && "r" === D || 1 === E && "g" === D || 2 === E && "b" === D || 3 === E && "a" === D || E >= 3 && "(" === D ? (3 === E && "a" === D && (j = 1), E++) : j && "," === D ? ++j > 3 && (E = j = 0) : (j && E < (j ? 5 : 4) || E >= (j ? 4 : 3) && ")" === D && --E < (j ? 5 : 4)) && (E = j = 0)
                                            }
                                        }
                                        A === m.length && S === v.length || (k.debug && console.error('Trying to pattern match mis-matched strings ["' + v + '", "' + m + '"]'), a = r), a && ($.length ? (k.debug && console.log('Pattern found "' + a + '" -> ', $, O, "[" + m + "," + v + "]"), m = $, v = O, b = _ = "") : a = r)
                                    }
                                    a || (y = C(i, m), m = y[0], _ = y[1], y = C(i, v), v = y[0].replace(/^([+-\/*])=/, function (t, e) {
                                        return w = e, ""
                                    }), b = y[1], m = parseFloat(m) || 0, v = parseFloat(v) || 0, "%" === b && (/^(fontSize|lineHeight)$/.test(i) ? (v /= 100, b = "em") : /^scale/.test(i) ? (v /= 100, b = "") : /(Red|Green|Blue)$/i.test(i) && (v = v / 100 * 255, b = "")));
                                    if (/[\/*]/.test(w)) b = _;
                                    else if (_ !== b && 0 !== m)
                                        if (0 === v) b = _;
                                        else {
                                            s = s || function () {
                                                var r = {
                                                        myParent: t.parentNode || n.body,
                                                        position: T.getPropertyValue(t, "position"),
                                                        fontSize: T.getPropertyValue(t, "fontSize")
                                                    },
                                                    i = r.position === R.lastPosition && r.myParent === R.lastParent,
                                                    o = r.fontSize === R.lastFontSize;
                                                R.lastParent = r.myParent, R.lastPosition = r.position, R.lastFontSize = r.fontSize;
                                                var a = {};
                                                if (o && i) a.emToPx = R.lastEmToPx, a.percentToPxWidth = R.lastPercentToPxWidth, a.percentToPxHeight = R.lastPercentToPxHeight;
                                                else {
                                                    var s = c && c.isSVG ? n.createElementNS("http://www.w3.org/2000/svg", "rect") : n.createElement("div");
                                                    k.init(s), r.myParent.appendChild(s), d.each(["overflow", "overflowX", "overflowY"], function (t, e) {
                                                        k.CSS.setPropertyValue(s, e, "hidden")
                                                    }), k.CSS.setPropertyValue(s, "position", r.position), k.CSS.setPropertyValue(s, "fontSize", r.fontSize), k.CSS.setPropertyValue(s, "boxSizing", "content-box"), d.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function (t, e) {
                                                        k.CSS.setPropertyValue(s, e, "100%")
                                                    }), k.CSS.setPropertyValue(s, "paddingLeft", "100em"), a.percentToPxWidth = R.lastPercentToPxWidth = (parseFloat(T.getPropertyValue(s, "width", null, true)) || 1) / 100, a.percentToPxHeight = R.lastPercentToPxHeight = (parseFloat(T.getPropertyValue(s, "height", null, true)) || 1) / 100, a.emToPx = R.lastEmToPx = (parseFloat(T.getPropertyValue(s, "paddingLeft")) || 1) / 100, r.myParent.removeChild(s)
                                                }
                                                return null === R.remToPx && (R.remToPx = parseFloat(T.getPropertyValue(n.body, "fontSize")) || 16), null === R.vwToPx && (R.vwToPx = parseFloat(e.innerWidth) / 100, R.vhToPx = parseFloat(e.innerHeight) / 100), a.remToPx = R.remToPx, a.vwToPx = R.vwToPx, a.vhToPx = R.vhToPx, k.debug >= 1 && console.log("Unit ratios: " + JSON.stringify(a), t), a
                                            }();
                                            var U = /margin|padding|left|right|width|text|word|letter/i.test(i) || /X$/.test(i) || "x" === i ? "x" : "y";
                                            switch (_) {
                                                case "%":
                                                    m *= "x" === U ? s.percentToPxWidth : s.percentToPxHeight;
                                                    break;
                                                case "px":
                                                    break;
                                                default:
                                                    m *= s[_ + "ToPx"]
                                            }
                                            switch (b) {
                                                case "%":
                                                    m *= 1 / ("x" === U ? s.percentToPxWidth : s.percentToPxHeight);
                                                    break;
                                                case "px":
                                                    break;
                                                default:
                                                    m *= 1 / s[b + "ToPx"]
                                            }
                                        }
                                    switch (w) {
                                        case "+":
                                            v = m + v;
                                            break;
                                        case "-":
                                            v = m - v;
                                            break;
                                        case "*":
                                            v *= m;
                                            break;
                                        case "/":
                                            v = m / v
                                    }
                                    u[i] = {
                                        rootPropertyValue: p,
                                        startValue: m,
                                        currentValue: m,
                                        endValue: v,
                                        unitType: b,
                                        easing: g
                                    }, a && (u[i].pattern = a), k.debug && console.log("tweensContainer (" + i + "): " + JSON.stringify(u[i]), t)
                                };
                                for (var N in y)
                                    if (y.hasOwnProperty(N)) {
                                        var I = T.Names.camelCase(N),
                                            F = function (e, n) {
                                                var r, o, a;
                                                return x.isFunction(e) && (e = e.call(t, i, $)), x.isArray(e) ? (r = e[0], !x.isArray(e[1]) && /^[\d-]/.test(e[1]) || x.isFunction(e[1]) || T.RegEx.isHex.test(e[1]) ? a = e[1] : x.isString(e[1]) && !T.RegEx.isHex.test(e[1]) && k.Easings[e[1]] || x.isArray(e[1]) ? (o = n ? e[1] : f(e[1], l.duration), a = e[2]) : a = e[1] || e[2]) : r = e, n || (o = o || l.easing), x.isFunction(r) && (r = r.call(t, i, $)), x.isFunction(a) && (a = a.call(t, i, $)), [r || 0, o, a]
                                            }(y[N]);
                                        if (b(T.Lists.colors, I)) {
                                            var L = F[0],
                                                q = F[1],
                                                H = F[2];
                                            if (T.RegEx.isHex.test(L)) {
                                                for (var M = ["Red", "Green", "Blue"], B = T.Values.hexToRgb(L), U = H ? T.Values.hexToRgb(H) : r, W = 0; W < M.length; W++) {
                                                    var X = [B[W]];
                                                    q && X.push(q), U !== r && X.push(U[W]), D(I + M[W], X)
                                                }
                                                continue
                                            }
                                        }
                                        D(I, F)
                                    }
                                u.element = t
                            }
                            u.element && (T.Values.addClass(t, "velocity-animating"), V.push(u), c = a(t), c && ("" === l.queue && (c.tweensContainer = u, c.opts = l), c.isAnimating = true), O === $ - 1 ? (k.State.calls.push([V, m, l, null, A.resolver, null, 0]), false === k.State.isTicking && (k.State.isTicking = true, p())) : O++)
                        }
                        var s, l = d.extend({}, k.defaults, _),
                            u = {};
                        switch (a(t) === r && k.init(t), parseFloat(l.delay) && false !== l.queue && d.queue(t, l.queue, function (e, n) {
                            if (true === n) return true;
                            k.velocityQueueEntryFlag = true;
                            var r = k.State.delayedElements.count++;
                            k.State.delayedElements[r] = t;
                            var i = function (t) {
                                return function () {
                                    k.State.delayedElements[t] = false, e()
                                }
                            }(r);
                            a(t).delayBegin = (new Date).getTime(), a(t).delay = parseFloat(l.delay), a(t).delayTimer = {
                                setTimeout: setTimeout(e, parseFloat(l.delay)),
                                next: i
                            }
                        }), l.duration.toString().toLowerCase()) {
                            case "fast":
                                l.duration = 200;
                                break;
                            case "normal":
                                l.duration = w;
                                break;
                            case "slow":
                                l.duration = 600;
                                break;
                            default:
                                l.duration = parseFloat(l.duration) || 1
                        }
                        if (false !== k.mock && (true === k.mock ? l.duration = l.delay = 1 : (l.duration *= parseFloat(k.mock) || 1, l.delay *= parseFloat(k.mock) || 1)), l.easing = f(l.easing, l.duration), l.begin && !x.isFunction(l.begin) && (l.begin = null), l.progress && !x.isFunction(l.progress) && (l.progress = null), l.complete && !x.isFunction(l.complete) && (l.complete = null), l.display !== r && null !== l.display && (l.display = l.display.toString().toLowerCase(), "auto" === l.display && (l.display = k.CSS.Values.getDisplayType(t))), l.visibility !== r && null !== l.visibility && (l.visibility = l.visibility.toString().toLowerCase()), l.mobileHA = l.mobileHA && k.State.isMobile && !k.State.isGingerbread, false === l.queue)
                            if (l.delay) {
                                var c = k.State.delayedElements.count++;
                                k.State.delayedElements[c] = t;
                                var h = function (t) {
                                    return function () {
                                        k.State.delayedElements[t] = false, o()
                                    }
                                }(c);
                                a(t).delayBegin = (new Date).getTime(), a(t).delay = parseFloat(l.delay), a(t).delayTimer = {
                                    setTimeout: setTimeout(o, parseFloat(l.delay)),
                                    next: h
                                }
                            } else o();
                        else d.queue(t, l.queue, function (t, e) {
                            if (true === e) return A.promise && A.resolver(m), true;
                            k.velocityQueueEntryFlag = true, o(t)
                        });
                        "" !== l.queue && "fx" !== l.queue || "inprogress" === d.queue(t)[0] || d.dequeue(t)
                    }
                    var u, c, v, g, m, y, _, C = arguments[0] && (arguments[0].p || d.isPlainObject(arguments[0].properties) && !arguments[0].properties.names || x.isString(arguments[0].properties));
                    x.isWrapped(this) ? (c = false, g = 0, m = this, v = this) : (c = true, g = 1, m = C ? arguments[0].elements || arguments[0].e : arguments[0]);
                    var A = {
                        promise: null,
                        resolver: null,
                        rejecter: null
                    };
                    if (c && k.Promise && (A.promise = new k.Promise(function (t, e) {
                            A.resolver = t, A.rejecter = e
                        })), C ? (y = arguments[0].properties || arguments[0].p, _ = arguments[0].options || arguments[0].o) : (y = arguments[g], _ = arguments[g + 1]), !(m = o(m))) return void(A.promise && (y && _ && false === _.promiseRejectEmpty ? A.resolver() : A.rejecter()));
                    var $ = m.length,
                        O = 0;
                    if (!/^(stop|finish|finishAll|pause|resume)$/i.test(y) && !d.isPlainObject(_)) {
                        var P = g + 1;
                        _ = {};
                        for (var E = P; E < arguments.length; E++) x.isArray(arguments[E]) || !/^(fast|normal|slow)$/i.test(arguments[E]) && !/^\d/.test(arguments[E]) ? x.isString(arguments[E]) || x.isArray(arguments[E]) ? _.easing = arguments[E] : x.isFunction(arguments[E]) && (_.complete = arguments[E]) : _.duration = arguments[E]
                    }
                    var j;
                    switch (y) {
                        case "scroll":
                            j = "scroll";
                            break;
                        case "reverse":
                            j = "reverse";
                            break;
                        case "pause":
                            var D = (new Date).getTime();
                            return d.each(m, function (t, e) {
                                s(e, D)
                            }), d.each(k.State.calls, function (t, e) {
                                var n = false;
                                e && d.each(e[1], function (t, i) {
                                    var o = _ === r ? "" : _;
                                    return true !== o && e[2].queue !== o && (_ !== r || false !== e[2].queue) || (d.each(m, function (t, r) {
                                        if (r === i) return e[5] = {
                                            resume: false
                                        }, n = true, false
                                    }), !n && void 0)
                                })
                            }), t();
                        case "resume":
                            return d.each(m, function (t, e) {
                                l(e, D)
                            }), d.each(k.State.calls, function (t, e) {
                                var n = false;
                                e && d.each(e[1], function (t, i) {
                                    var o = _ === r ? "" : _;
                                    return true !== o && e[2].queue !== o && (_ !== r || false !== e[2].queue) || (!e[5] || (d.each(m, function (t, r) {
                                        if (r === i) return e[5].resume = true, n = true, false
                                    }), !n && void 0))
                                })
                            }), t();
                        case "finish":
                        case "finishAll":
                        case "stop":
                            d.each(m, function (t, e) {
                                a(e) && a(e).delayTimer && (clearTimeout(a(e).delayTimer.setTimeout), a(e).delayTimer.next && a(e).delayTimer.next(), delete a(e).delayTimer), "finishAll" !== y || true !== _ && !x.isString(_) || (d.each(d.queue(e, x.isString(_) ? _ : ""), function (t, e) {
                                    x.isFunction(e) && e()
                                }), d.queue(e, x.isString(_) ? _ : "", []))
                            });
                            var N = [];
                            return d.each(k.State.calls, function (t, e) {
                                e && d.each(e[1], function (n, i) {
                                    var o = _ === r ? "" : _;
                                    if (true !== o && e[2].queue !== o && (_ !== r || false !== e[2].queue)) return true;
                                    d.each(m, function (n, r) {
                                        if (r === i)
                                            if ((true === _ || x.isString(_)) && (d.each(d.queue(r, x.isString(_) ? _ : ""), function (t, e) {
                                                    x.isFunction(e) && e(null, true)
                                                }), d.queue(r, x.isString(_) ? _ : "", [])), "stop" === y) {
                                                var s = a(r);
                                                s && s.tweensContainer && false !== o && d.each(s.tweensContainer, function (t, e) {
                                                    e.endValue = e.currentValue
                                                }), N.push(t)
                                            } else "finish" !== y && "finishAll" !== y || (e[2].duration = 1)
                                    })
                                })
                            }), "stop" === y && (d.each(N, function (t, e) {
                                h(e, true)
                            }), A.promise && A.resolver(m)), t();
                        default:
                            if (!d.isPlainObject(y) || x.isEmptyObject(y)) {
                                if (x.isString(y) && k.Redirects[y]) {
                                    u = d.extend({}, _);
                                    var I = u.duration,
                                        F = u.delay || 0;
                                    return true === u.backwards && (m = d.extend(true, [], m).reverse()), d.each(m, function (t, e) {
                                        parseFloat(u.stagger) ? u.delay = F + parseFloat(u.stagger) * t : x.isFunction(u.stagger) && (u.delay = F + u.stagger.call(e, t, $)), u.drag && (u.duration = parseFloat(I) || (/^(callout|transition)/.test(y) ? 1e3 : w), u.duration = Math.max(u.duration * (u.backwards ? 1 - t / $ : (t + 1) / $), .75 * u.duration, 200)), k.Redirects[y].call(e, e, u || {}, t, $, m, A.promise ? A : r)
                                    }), t()
                                }
                                var L = "Velocity: First argument (" + y + ") was not a property map, a known action, or a registered redirect. Aborting.";
                                return A.promise ? A.rejecter(new Error(L)) : e.console && console.log(L), t()
                            }
                            j = "start"
                    }
                    var R = {
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
                        V = [];
                    d.each(m, function (t, e) {
                        x.isNode(e) && i(e, t)
                    }), u = d.extend({}, k.defaults, _), u.loop = parseInt(u.loop, 10);
                    var q = 2 * u.loop - 1;
                    if (u.loop)
                        for (var H = 0; H < q; H++) {
                            var M = {
                                delay: u.delay,
                                progress: u.progress
                            };
                            H === q - 1 && (M.display = u.display, M.visibility = u.visibility, M.complete = u.complete), S(m, "reverse", M)
                        }
                    return t()
                };
                k = d.extend(S, k), k.animate = S;
                var $ = e.requestAnimationFrame || g;
                if (!k.State.isMobile && n.hidden !== r) {
                    var O = function () {
                        n.hidden ? ($ = function (t) {
                            return setTimeout(function () {
                                t(true)
                            }, 16)
                        }, p()) : $ = e.requestAnimationFrame || g
                    };
                    O(), n.addEventListener("visibilitychange", O)
                }
                return t.Velocity = k, t !== e && (t.fn.velocity = S, t.fn.velocity.defaults = k.defaults), d.each(["Down", "Up"], function (t, e) {
                    k.Redirects["slide" + e] = function (t, n, i, o, a, s) {
                        var l = d.extend({}, n),
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
                        l.display === r && (l.display = "Down" === e ? "inline" === k.CSS.Values.getDisplayType(t) ? "inline-block" : "block" : "none"), l.begin = function () {
                            0 === i && u && u.call(a, a);
                            for (var n in p)
                                if (p.hasOwnProperty(n)) {
                                    f[n] = t.style[n];
                                    var r = T.getPropertyValue(t, n);
                                    p[n] = "Down" === e ? [r, 0] : [0, r]
                                }
                            f.overflow = t.style.overflow, t.style.overflow = "hidden"
                        }, l.complete = function () {
                            for (var e in f) f.hasOwnProperty(e) && (t.style[e] = f[e]);
                            i === o - 1 && (c && c.call(a, a), s && s.resolver(a))
                        }, k(t, p, l)
                    }
                }), d.each(["In", "Out"], function (t, e) {
                    k.Redirects["fade" + e] = function (t, n, i, o, a, s) {
                        var l = d.extend({}, n),
                            u = l.complete,
                            c = {
                                opacity: "In" === e ? 1 : 0
                            };
                        0 !== i && (l.begin = null), l.complete = i !== o - 1 ? null : function () {
                            u && u.call(a, a), s && s.resolver(a)
                        }, l.display === r && (l.display = "In" === e ? "auto" : "none"), k(this, c, l)
                    }
                }), k
            }(window.jQuery || window.Zepto || window, window, window ? window.document : void 0)
        })
    }, {}],
    11: [function (t, e, n) {
        ! function (r) {
            "use strict";
            "function" == typeof t && "object" == typeof n ? e.exports = r() : "function" == typeof define && define.amd ? define(["velocity"], r) : r()
        }(function () {
            "use strict";
            return function (t, e, n, r) {
                var i = t.Velocity;
                if (!i || !i.Utilities) return void(e.console && console.log("Velocity UI Pack: Velocity must be loaded first. Aborting."));
                var o = i.Utilities,
                    a = i.version,
                    s = {
                        major: 1,
                        minor: 1,
                        patch: 0
                    };
                if (function (t, e) {
                        var n = [];
                        return !(!t || !e) && (o.each([t, e], function (t, e) {
                            var r = [];
                            o.each(e, function (t, e) {
                                for (; e.toString().length < 5;) e = "0" + e;
                                r.push(e)
                            }), n.push(r.join(""))
                        }), parseFloat(n[0]) > parseFloat(n[1]))
                    }(s, a)) {
                    var l = "Velocity UI Pack: You need to update Velocity (velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity.";
                    throw alert(l), new Error(l)
                }
                i.RegisterEffect = i.RegisterUI = function (t, e) {
                    function n(t, e, n, r) {
                        var a, s = 0;
                        o.each(t.nodeType ? [t] : t, function (t, e) {
                            r && (n += t * r), a = e.parentNode;
                            var l = ["height", "paddingTop", "paddingBottom", "marginTop", "marginBottom"];
                            "border-box" === i.CSS.getPropertyValue(e, "boxSizing").toString().toLowerCase() && (l = ["height"]), o.each(l, function (t, n) {
                                s += parseFloat(i.CSS.getPropertyValue(e, n))
                            })
                        }), i.animate(a, {
                            height: ("In" === e ? "+" : "-") + "=" + s
                        }, {
                            queue: false,
                            easing: "ease-in-out",
                            duration: n * ("In" === e ? .6 : 1)
                        })
                    }
                    return i.Redirects[t] = function (r, a, s, l, u, c, f) {
                        var p = s === l - 1,
                            h = 0;
                        f = f || e.loop, "function" == typeof e.defaultDuration ? e.defaultDuration = e.defaultDuration.call(u, u) : e.defaultDuration = parseFloat(e.defaultDuration);
                        for (var d = 0; d < e.calls.length; d++) "number" == typeof (b = e.calls[d][1]) && (h += b);
                        var v = h >= 1 ? 0 : e.calls.length ? (1 - h) / e.calls.length : 1;
                        for (d = 0; d < e.calls.length; d++) {
                            var g = e.calls[d],
                                m = g[0],
                                y = 1e3,
                                b = g[1],
                                x = g[2] || {},
                                _ = {};
                            if (void 0 !== a.duration ? y = a.duration : void 0 !== e.defaultDuration && (y = e.defaultDuration), _.duration = y * ("number" == typeof b ? b : v), _.queue = a.queue || "", _.easing = x.easing || "ease", _.delay = parseFloat(x.delay) || 0, _.loop = !e.loop && x.loop, _._cacheValues = x._cacheValues || true, 0 === d) {
                                if (_.delay += parseFloat(a.delay) || 0, 0 === s && (_.begin = function () {
                                        a.begin && a.begin.call(u, u);
                                        var e = t.match(/(In|Out)$/);
                                        e && "In" === e[0] && void 0 !== m.opacity && o.each(u.nodeType ? [u] : u, function (t, e) {
                                            i.CSS.setPropertyValue(e, "opacity", 0)
                                        }), a.animateParentHeight && e && n(u, e[0], y + _.delay, a.stagger)
                                    }), null !== a.display)
                                    if (void 0 !== a.display && "none" !== a.display) _.display = a.display;
                                    else if (/In$/.test(t)) {
                                    var w = i.CSS.Values.getDisplayType(r);
                                    _.display = "inline" === w ? "inline-block" : w
                                }
                                a.visibility && "hidden" !== a.visibility && (_.visibility = a.visibility)
                            }
                            if (d === e.calls.length - 1) {
                                var C = function () {
                                    void 0 !== a.display && "none" !== a.display || !/Out$/.test(t) || o.each(u.nodeType ? [u] : u, function (t, e) {
                                        i.CSS.setPropertyValue(e, "display", "none")
                                    }), a.complete && a.complete.call(u, u), c && c.resolver(u || r)
                                };
                                _.complete = function () {
                                    if (f && i.Redirects[t](r, a, s, l, u, c, true === f || Math.max(0, f - 1)), e.reset) {
                                        for (var n in e.reset)
                                            if (e.reset.hasOwnProperty(n)) {
                                                var o = e.reset[n];
                                                void 0 !== i.CSS.Hooks.registered[n] || "string" != typeof o && "number" != typeof o || (e.reset[n] = [e.reset[n], e.reset[n]])
                                            }
                                        var h = {
                                            duration: 0,
                                            queue: false
                                        };
                                        p && (h.complete = C), i.animate(r, e.reset, h)
                                    } else p && C()
                                }, "hidden" === a.visibility && (_.visibility = a.visibility)
                            }
                            i.animate(r, m, _)
                        }
                    }, i
                }, i.RegisterEffect.packagedEffects = {
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
                for (var u in i.RegisterEffect.packagedEffects) i.RegisterEffect.packagedEffects.hasOwnProperty(u) && i.RegisterEffect(u, i.RegisterEffect.packagedEffects[u]);
                i.RunSequence = function (t) {
                    var e = o.extend(true, [], t);
                    e.length > 1 && (o.each(e.reverse(), function (t, n) {
                        var r = e[t + 1];
                        if (r) {
                            var a = n.o || n.options,
                                s = r.o || r.options,
                                l = a && false === a.sequenceQueue ? "begin" : "complete",
                                u = s && s[l],
                                c = {};
                            c[l] = function () {
                                var t = r.e || r.elements,
                                    e = t.nodeType ? [t] : t;
                                u && u.call(e, e), i(n)
                            }, r.o ? r.o = o.extend({}, s, c) : r.options = o.extend({}, s, c)
                        }
                    }), e.reverse()), i(e[0])
                }
            }(window.jQuery || window.Zepto || window, window, window && window.document)
        })
    }, {}],
    12: [function (t, e, n) {
        var r = t("../util");
        n.$addChild = function (t, e) {
            e = e || r.Vue, t = t || {};
            var n, i = this,
                o = t._context || i;
            if (void 0 !== t.inherit ? t.inherit : e.options.inherit) {
                var a = o._childCtors;
                if (!(n = a[e.cid])) {
                    var s = e.options.name,
                        l = s ? r.classify(s) : "VueComponent";
                    n = new Function("return function " + l + " (options) {this.constructor = " + l + ";this._init(options) }")(), n.options = e.options, n.linker = e.linker, n.prototype = o, a[e.cid] = n
                }
            } else n = e;
            return t._parent = i, t._root = i.$root, new n(t)
        }
    }, {
        "../util": 78
    }],
    13: [function (t, e, n) {
        function r(t) {
            return JSON.parse(JSON.stringify(t))
        }
        var i = t("../watcher"),
            o = t("../parsers/path"),
            a = t("../parsers/text"),
            s = t("../parsers/directive"),
            l = t("../parsers/expression"),
            u = /[^|]\|[^|]/;
        n.$get = function (t, e) {
            var n = l.parse(t);
            if (n) {
                if (e && !l.isSimplePath(t)) {
                    var r = this;
                    return function () {
                        n.get.call(r, r)
                    }
                }
                try {
                    return n.get.call(this, this)
                } catch (t) {}
            }
        }, n.$set = function (t, e) {
            var n = l.parse(t, true);
            n && n.set && n.set.call(this, this, e)
        }, n.$add = function (t, e) {
            this._data.$set(t, e)
        }, n.$delete = function (t) {
            this._data.$delete(t)
        }, n.$watch = function (t, e, n) {
            var r, o = this;
            "string" == typeof t && (r = s.parse(t)[0], t = r.expression);
            var a = new i(o, t, e, {
                deep: n && n.deep,
                filters: r && r.filters
            });
            return n && n.immediate && e.call(o, a.value),
                function () {
                    a.teardown()
                }
        }, n.$eval = function (t, e) {
            if (u.test(t)) {
                var n = s.parse(t)[0],
                    r = this.$get(n.expression, e);
                return n.filters ? this._applyFilters(r, null, n.filters) : r
            }
            return this.$get(t, e)
        }, n.$interpolate = function (t) {
            var e = a.parse(t),
                n = this;
            return e ? 1 === e.length ? n.$eval(e[0].value) + "" : e.map(function (t) {
                return t.tag ? n.$eval(t.value) : t.value
            }).join("") : t
        }, n.$log = function (t) {
            var e = t ? o.get(this._data, t) : this._data;
            if (e && (e = r(e)), !t)
                for (var n in this.$options.computed) e[n] = r(this[n]);
            console.log(e)
        }
    }, {
        "../parsers/directive": 66,
        "../parsers/expression": 67,
        "../parsers/path": 68,
        "../parsers/text": 70,
        "../util": 78,
        "../watcher": 82
    }],
    14: [function (t, e, n) {
        function r(t, e, n, r, a, s) {
            e = o(e);
            var l = !u.inDoc(e),
                c = false === r || l ? a : s,
                f = !l && !t._isAttached && !u.inDoc(t.$el);
            return t._isFragment ? i(t, e, c, n) : c(t.$el, e, t, n), f && t._callHook("attached"), t
        }

        function i(t, e, n, r) {
            for (var i, o = t._fragmentStart, a = t._fragmentEnd; i !== a;) i = o.nextSibling, n(o, e, t), o = i;
            n(a, e, t, r)
        }

        function o(t) {
            return "string" == typeof t ? document.querySelector(t) : t
        }

        function a(t, e, n, r) {
            e.appendChild(t), r && r()
        }

        function s(t, e, n, r) {
            u.before(t, e), r && r()
        }

        function l(t, e, n) {
            u.remove(t), n && n()
        }
        var u = t("../util"),
            c = t("../transition");
        n.$nextTick = function (t) {
            u.nextTick(t, this)
        }, n.$appendTo = function (t, e, n) {
            return r(this, t, e, n, a, c.append)
        }, n.$prependTo = function (t, e, n) {
            return t = o(t), t.hasChildNodes() ? this.$before(t.firstChild, e, n) : this.$appendTo(t, e, n), this
        }, n.$before = function (t, e, n) {
            return r(this, t, e, n, s, c.before)
        }, n.$after = function (t, e, n) {
            return t = o(t), t.nextSibling ? this.$before(t.nextSibling, e, n) : this.$appendTo(t.parentNode, e, n), this
        }, n.$remove = function (t, e) {
            if (!this.$el.parentNode) return t && t();
            var n = this._isAttached && u.inDoc(this.$el);
            n || (e = false);
            var r, o = this,
                s = function () {
                    n && o._callHook("detached"), t && t()
                };
            return this._isFragment && !this._blockFragment.hasChildNodes() ? (r = false === e ? a : c.removeThenAppend, i(this, this._blockFragment, r, s)) : (r = false === e ? l : c.remove)(this.$el, this, s), this
        }
    }, {
        "../transition": 71,
        "../util": 78
    }],
    15: [function (t, e, n) {
        function r(t, e, n) {
            var r = t.$parent;
            if (r && n && !o.test(e))
                for (; r;) r._eventsCount[e] = (r._eventsCount[e] || 0) + n, r = r.$parent
        }
        var i = t("../util");
        n.$on = function (t, e) {
            return (this._events[t] || (this._events[t] = [])).push(e), r(this, t, 1), this
        }, n.$once = function (t, e) {
            function n() {
                r.$off(t, n), e.apply(this, arguments)
            }
            var r = this;
            return n.fn = e, this.$on(t, n), this
        }, n.$off = function (t, e) {
            var n;
            if (!arguments.length) {
                if (this.$parent)
                    for (t in this._events)(n = this._events[t]) && r(this, t, -n.length);
                return this._events = {}, this
            }
            if (!(n = this._events[t])) return this;
            if (1 === arguments.length) return r(this, t, -n.length), this._events[t] = null, this;
            for (var i, o = n.length; o--;)
                if ((i = n[o]) === e || i.fn === e) {
                    r(this, t, -1), n.splice(o, 1);
                    break
                }
            return this
        }, n.$emit = function (t) {
            this._shouldPropagate = false;
            var e = this._events[t];
            if (e) {
                e = e.length > 1 ? i.toArray(e) : e;
                for (var n = i.toArray(arguments, 1), r = 0, o = e.length; r < o; r++) {
                    var a = e[r].apply(this, n);
                    true === a && (this._shouldPropagate = true)
                }
            }
            return this
        }, n.$broadcast = function (t) {
            if (this._eventsCount[t]) {
                for (var e = this.$children, n = 0, r = e.length; n < r; n++) {
                    var i = e[n];
                    i.$emit.apply(i, arguments), i._shouldPropagate && i.$broadcast.apply(i, arguments)
                }
                return this
            }
        }, n.$dispatch = function () {
            this.$emit.apply(this, arguments);
            for (var t = this.$parent; t;) t.$emit.apply(t, arguments), t = t._shouldPropagate ? t.$parent : null;
            return this
        };
        var o = /^hook:/
    }, {
        "../util": 78
    }],
    16: [function (t, e, n) {
        function r(t) {
            return new Function("return function " + i.classify(t) + " (options) { this._init(options) }")()
        }
        var i = t("../util"),
            o = t("../config");
        n.util = i, n.config = o, n.nextTick = i.nextTick, n.compiler = t("../compiler"), n.FragmentFactory = t("../fragment/factory"), n.parsers = {
            path: t("../parsers/path"),
            text: t("../parsers/text"),
            template: t("../parsers/template"),
            directive: t("../parsers/directive"),
            expression: t("../parsers/expression")
        }, n.cid = 0;
        var a = 1;
        n.extend = function (t) {
            t = t || {};
            var e = this,
                n = t.name || e.options.name,
                s = r(n || "VueComponent");
            return s.prototype = Object.create(e.prototype), s.prototype.constructor = s, s.cid = a++, s.options = i.mergeOptions(e.options, t), s.super = e, s.extend = e.extend, o._assetTypes.forEach(function (t) {
                s[t] = e[t]
            }), n && (s.options.components[n] = s), s
        }, n.use = function (t) {
            if (!t.installed) {
                var e = i.toArray(arguments, 1);
                return e.unshift(this), "function" == typeof t.install ? t.install.apply(t, e) : t.apply(null, e), t.installed = true, this
            }
        }, n.mixin = function (t) {
            var e = i.Vue;
            e.options = i.mergeOptions(e.options, t)
        }, o._assetTypes.forEach(function (t) {
            n[t] = function (e, n) {
                if (!n) return this.options[t + "s"][e];
                "component" === t && i.isPlainObject(n) && (n.name = e, n = i.Vue.extend(n)), this.options[t + "s"][e] = n
            }
        })
    }, {
        "../compiler": 22,
        "../config": 24,
        "../fragment/factory": 54,
        "../parsers/directive": 66,
        "../parsers/expression": 67,
        "../parsers/path": 68,
        "../parsers/template": 69,
        "../parsers/text": 70,
        "../util": 78
    }],
    17: [function (t, e, n) {
        function r() {
            this._isAttached = true, this._isReady = true, this._callHook("ready")
        }
        var i = t("../util"),
            o = t("../compiler");
        n.$mount = function (t) {
            if (!this._isCompiled) return t = i.query(t), t || (t = document.createElement("div")), this._compile(t), this._isCompiled = true, this._callHook("compiled"), this._initDOMHooks(), i.inDoc(this.$el) ? (this._callHook("attached"), r.call(this)) : this.$once("hook:attached", r), this
        }, n.$destroy = function (t, e) {
            this._destroy(t, e)
        }, n.$compile = function (t, e, n, r) {
            return o.compile(t, this.$options, true)(this, t, e, n, r)
        }
    }, {
        "../compiler": 22,
        "../util": 78
    }],
    18: [function (t, e, n) {
        function r() {
            s = [], l = [], u = {}, c = {}, f = p = false
        }

        function i() {
            o(s), p = true, o(l), r()
        }

        function o(t) {
            for (var e = 0; e < t.length; e++) {
                var n = t[e],
                    r = n.id;
                u[r] = null, n.run()
            }
        }
        var a = t("./util"),
            s = (t("./config"), []),
            l = [],
            u = {},
            c = {},
            f = false,
            p = false;
        n.push = function (t) {
            var e = t.id;
            if (null == u[e]) {
                if (p && !t.user) return void t.run();
                var n = t.user ? l : s;
                u[e] = n.length, n.push(t), f || (f = true, a.nextTick(i))
            }
        }
    }, {
        "./config": 24,
        "./util": 78
    }],
    19: [function (t, e, n) {
        function r(t) {
            this.size = 0, this.limit = t, this.head = this.tail = void 0, this._keymap = Object.create(null)
        }
        var i = r.prototype;
        i.put = function (t, e) {
            var n = {
                key: t,
                value: e
            };
            if (this._keymap[t] = n, this.tail ? (this.tail.newer = n, n.older = this.tail) : this.head = n, this.tail = n, this.size === this.limit) return this.shift();
            this.size++
        }, i.shift = function () {
            var t = this.head;
            return t && (this.head = this.head.newer, this.head.older = void 0, t.newer = t.older = void 0, this._keymap[t.key] = void 0), t
        }, i.get = function (t, e) {
            var n = this._keymap[t];
            if (void 0 !== n) return n === this.tail ? e ? n : n.value : (n.newer && (n === this.head && (this.head = n.newer), n.newer.older = n.older), n.older && (n.older.newer = n.newer), n.newer = void 0, n.older = this.tail, this.tail && (this.tail.newer = n), this.tail = n, e ? n : n.value)
        }, e.exports = r
    }, {}],
    20: [function (t, e, n) {
        function r(t) {
            return function (e, n) {
                e._props = {};
                for (var r, a, s, c, f = t.length; f--;)
                    if (r = t[f], a = r.path, e._props[a] = r, s = r.options, null === r.raw) o.initProp(e, r, i(e, s));
                    else if (r.dynamic) e._context && (r.mode === u.ONE_TIME ? (c = (n || e._context).$get(r.parentPath), o.initProp(e, r, c)) : e._bindDir("prop", null, r, l, null, n));
                else {
                    var p = r.raw;
                    c = s.type === Boolean && "" === p || (p.trim() ? o.toBoolean(o.toNumber(p)) : p), o.initProp(e, r, c)
                }
            }
        }

        function i(t, e) {
            if (!e.hasOwnProperty("default")) return e.type !== Boolean && void 0;
            var n = e.default;
            return o.isObject(n), "function" == typeof n && e.type !== Function ? n.call(t) : n
        }
        var o = t("../util"),
            a = t("../parsers/directive-new"),
            s = t("../parsers/text"),
            l = t("../directives/prop"),
            u = t("../config")._propBindingModes,
            c = t("../parsers/path").identRE,
            f = /^data-/,
            p = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/,
            h = /^\s?(true|false|[\d\.]+|'[^']*'|"[^"]*")\s?$/;
        e.exports = function (t, e) {
            for (var n, i, l, d, v, g, m, y, b, x = [], _ = e.length; _--;)
                if (n = e[_], i = n.name, v = o.camelize(i.replace(f, "")), c.test(v)) {
                    if (l = o.hyphenate(i), d = t.getAttribute(l), null === d && null !== (d = t.getAttribute("data-" + l)) && (l = "data-" + l), g = {
                            name: i,
                            raw: d,
                            path: v,
                            options: n,
                            mode: u.ONE_WAY
                        }, null !== d) {
                        t.removeAttribute(l);
                        var w = s.parse(d);
                        w && (g.dynamic = true, g.parentPath = s.tokensToExp(w), y = 1 === w.length, m = h.test(g.parentPath), m || y && w[0].oneTime ? g.mode = u.ONE_TIME : !m && y && w[0].twoWay && p.test(g.parentPath) && (g.mode = u.TWO_WAY))
                    } else null === (d = o.getBindAttr(t, l)) && (null !== (d = o.getBindAttr(t, l + ".sync")) ? g.mode = u.TWO_WAY : null !== (d = o.getBindAttr(t, l + ".once")) && (g.mode = u.ONE_TIME)), g.raw = d, null !== d && (g.bindSyntax = true, b = a.parse(d), d = b.expression, g.filters = b.filters, h.test(d) ? g.mode = u.ONE_TIME : g.dynamic = true), g.parentPath = d;
                    null === d && n && n.required, x.push(g)
                }
            return r(x)
        }
    }, {
        "../config": 24,
        "../directives/prop": 42,
        "../parsers/directive-new": 65,
        "../parsers/path": 68,
        "../parsers/text": 70,
        "../util": 78
    }],
    21: [function (t, e, n) {
        function r(t, e) {
            var n = e._directives.length;
            t();
            var r = e._directives.slice(n);
            r.sort(i);
            for (var o = 0, a = r.length; o < a; o++) r[o]._bind();
            return r
        }

        function i(t, e) {
            return t = t._def.priority || 0, e = e._def.priority || 0, t > e ? -1 : t === e ? 0 : 1
        }

        function o(t, e, n, r) {
            return function (i) {
                a(t, e, i), n && r && a(n, r)
            }
        }

        function a(t, e, n) {
            for (var r = e.length; r--;) e[r]._teardown(), n || t._directives.$remove(e[r])
        }

        function s(t, e) {
            var n = t.nodeType;
            return 1 === n && "SCRIPT" !== t.tagName ? l(t, e) : 3 === n && k.interpolate && t.data.trim() ? u(t, e) : null
        }

        function l(t, e) {
            if ("TEXTAREA" === t.tagName) {
                var n = A.parse(t.value);
                n && (t.setAttribute(":value", A.tokensToExp(n)), t.value = "")
            }
            var r, i = t.hasAttributes();
            return i && (r = g(t, e)), r || (r = d(t, e)), r || (r = v(t, e, i)), !r && i && (r = b(t.attributes, e)), r
        }

        function u(t, e) {
            var n = A.parse(t.data);
            if (!n) return null;
            for (var r, i, o = document.createDocumentFragment(), a = 0, s = n.length; a < s; a++) i = n[a], r = i.tag ? c(i, e) : document.createTextNode(i.value), o.appendChild(r);
            return f(n, o)
        }

        function c(t, e) {
            function n(n) {
                t.type = n, t.def = O(e, "directives", n), t.descriptor = T.parse(t.value)[0]
            }
            var r;
            return t.oneTime ? r = document.createTextNode(t.value) : t.html ? (r = document.createComment("v-html"), n("html")) : (r = document.createTextNode(" "), n("text")), r
        }

        function f(t, e) {
            return function (n, r, i, o) {
                for (var a, s, l, u = e.cloneNode(true), c = w.toArray(u.childNodes), f = 0, p = t.length; f < p; f++) a = t[f], s = a.value, a.tag && (l = c[f], a.oneTime ? (s = (o || n).$eval(s), a.html ? w.replace(l, $.parse(s, true)) : l.data = s) : n._bindDir(a.type, l, a.descriptor, a.def, i, o));
                w.replace(r, u)
            }
        }

        function p(t, e) {
            for (var n, r, i, o = [], a = 0, l = t.length; a < l; a++) i = t[a], n = s(i, e), r = n && n.terminal || "SCRIPT" === i.tagName || !i.hasChildNodes() ? null : p(i.childNodes, e), o.push(n, r);
            return o.length ? h(o) : null
        }

        function h(t) {
            return function (e, n, r, i, o) {
                for (var a, s, l, u = 0, c = 0, f = t.length; u < f; c++) {
                    a = n[c], s = t[u++], l = t[u++];
                    var p = w.toArray(a.childNodes);
                    s && s(e, a, r, i, o), l && l(e, p, r, i, o)
                }
            }
        }

        function d(t, e) {
            var n = t.tagName.toLowerCase();
            if (!w.commonTagRE.test(n)) {
                var r = O(e, "elementDirectives", n);
                return r ? y(t, n, "", e, r) : void 0
            }
        }

        function v(t, e, n) {
            var r = w.checkComponent(t, e, n);
            if (r) {
                var i = function (t, e, n, i, o) {
                    t._bindDir("component", e, {
                        expression: r
                    }, P, n, i, o)
                };
                return i.terminal = true, i
            }
        }

        function g(t, e) {
            if (null !== w.attr(t, "pre")) return m;
            if (t.hasAttribute(k.prefix + "else")) {
                var n = t.previousElementSibling;
                if (n && n.hasAttribute(k.prefix + "if")) return m
            }
            for (var r, i, o = 0, a = I.length; o < a; o++)
                if (i = I[o], r = t.getAttribute(k.prefix + i)) return y(t, i, r, e)
        }

        function m() {}

        function y(t, e, n, r, i) {
            var o = T.parse(n)[0];
            i = i || r.directives[e];
            var a = function (t, n, r, a, s) {
                t._bindDir(e, n, o, i, r, a, s)
            };
            return a.terminal = true, a
        }

        function b(t, e) {
            for (var n, r, i, o, a, s, l, u, c = t.length, f = []; c--;)
                if (n = t[c], r = n.name, i = n.value, "transition" === r || ":transition" === r || r === k.prefix + "bind:transition") f.push({
                    name: "transition",
                    arg: E.test(r),
                    descriptors: [S.parse(i)],
                    def: e.directives.transition
                });
                else if (j.test(r)) f.push({
                name: "on",
                arg: r.replace(j, ""),
                descriptors: [S.parse(i)],
                def: e.directives.on
            });
            else if (E.test(r)) {
                var p = r.replace(E, "");
                "style" === p || "class" === p ? (a = p, u = void 0) : (a = "attr", u = p), f.push({
                    name: a,
                    arg: u,
                    descriptors: [S.parse(i)],
                    def: e.directives[a]
                })
            } else if (0 === r.indexOf(k.prefix)) {
                if (N.test(r) ? (l = true, r = r.replace(N, "")) : l = false, u = (u = r.match(D)) && u[1], "else" === (a = r.slice(k.prefix.length).replace(D, ""))) continue;
                s = O(e, "directives", a), s && f.push({
                    name: a,
                    descriptors: T.parse(i),
                    def: s,
                    arg: u,
                    literal: l
                })
            } else k.interpolate && (o = _(r, i, e)) && f.push(o);
            if (f.length) return x(f)
        }

        function x(t) {
            return function (e, n, r, i, o) {
                for (var a, s, l, u = t.length; u--;)
                    if (a = t[u], a._link) a._link(e, n, i);
                    else
                        for (l = a.descriptors.length, s = 0; s < l; s++) e._bindDir(a.name, n, a.descriptors[s], a.def, r, i, o, a.arg, a.literal)
            }
        }

        function _(t, e, n) {
            var r = A.parse(e),
                i = "class" === t;
            if (r) {
                for (var o = i ? "class" : "attr", a = n.directives[o], s = r.length, l = true; s--;) {
                    var u = r[s];
                    u.tag && !u.oneTime ? l = false : u.tag
                }
                var c;
                return c = l ? function (n, r, i) {
                    r.setAttribute(t, (i || n).$interpolate(e))
                } : function (n, s, l) {
                    var u = A.tokensToExp(r, l || n),
                        c = k.silent;
                    k.silent = true;
                    var f = i ? T.parse(u)[0] : T.parse(t + ":" + u)[0];
                    k.silent = c, i && (f._rawClass = e), n._bindDir(o, s, f, a, void 0, l)
                }, {
                    def: a,
                    _link: c
                }
            }
        }
        var w = t("../util"),
            C = t("./compile-props"),
            k = t("../config"),
            A = t("../parsers/text"),
            T = t("../parsers/directive"),
            S = t("../parsers/directive-new"),
            $ = t("../parsers/template"),
            O = w.resolveAsset,
            P = t("../directives/component"),
            E = /^:|^v-bind:/,
            j = /^@/,
            D = /:(.*)$/,
            N = /\.literal$/,
            I = ["repeat", "for", "if"];
        n.compile = function (t, e, n) {
            var i = n || !e._asComponent ? s(t, e) : null,
                a = i && i.terminal || "SCRIPT" === t.tagName || !t.hasChildNodes() ? null : p(t.childNodes, e);
            return function (t, e, n, s, l) {
                var u = w.toArray(e.childNodes),
                    c = r(function () {
                        i && i(t, e, n, s, l), a && a(t, u, n, s, l)
                    }, t);
                return o(t, c)
            }
        }, n.compileAndLinkProps = function (t, e, n, i) {
            var a = C(e, n),
                s = r(function () {
                    a(t, i)
                }, t);
            return o(t, s)
        }, n.compileRoot = function (t, e) {
            var n, i, a = e._containerAttrs,
                s = e._replacerAttrs;
            return 11 !== t.nodeType && (e._asComponent ? (a && (n = b(a, e)), s && (i = b(s, e))) : i = b(t.attributes, e)),
                function (t, e, a) {
                    var s, l = t._context;
                    l && n && (s = r(function () {
                        n(l, e, null, a)
                    }, l));
                    var u = r(function () {
                        i && i(t, e)
                    }, t);
                    return o(t, u, l, s)
                }
        }, m.terminal = true
    }, {
        "../config": 24,
        "../directives/component": 30,
        "../parsers/directive": 66,
        "../parsers/directive-new": 65,
        "../parsers/template": 69,
        "../parsers/text": 70,
        "../util": 78,
        "./compile-props": 20
    }],
    22: [function (t, e, n) {
        var r = t("../util");
        r.extend(n, t("./compile")), r.extend(n, t("./transclude"))
    }, {
        "../util": 78,
        "./compile": 21,
        "./transclude": 23
    }],
    23: [function (t, e, n) {
        function r(t, e) {
            var n = e.template,
                r = u.parse(n, true);
            if (r) {
                var l = r.firstChild,
                    c = l.tagName && l.tagName.toLowerCase();
                return e.replace ? (document.body, r.childNodes.length > 1 || 1 !== l.nodeType || s.resolveAsset(e, "components", c) || s.resolveAsset(e, "elementDirectives", c) || a(l) ? r : (e._replacerAttrs = i(l), o(t, l), l)) : (t.appendChild(r), t)
            }
        }

        function i(t) {
            if (1 === t.nodeType && t.hasAttributes()) return s.toArray(t.attributes)
        }

        function o(t, e) {
            for (var n, r, i = t.attributes, o = i.length; o--;) n = i[o].name, r = i[o].value, e.hasAttribute(n) || c.test(n) ? "class" === n && (r = e.getAttribute(n) + " " + r, e.setAttribute(n, r)) : e.setAttribute(n, r)
        }

        function a(t) {
            return t.hasAttributes() && (t.hasAttribute("is") || t.hasAttribute(":is") || t.hasAttribute(l.prefix + "bind:is") || t.hasAttribute(l.prefix + "component") || t.hasAttribute(l.prefix + "repeat") || t.hasAttribute(l.prefix + "for") || t.hasAttribute(l.prefix + "if"))
        }
        var s = t("../util"),
            l = t("../config"),
            u = t("../parsers/template"),
            c = /[#@\*\$\.]/;
        n.transclude = function (t, e) {
            return e && (e._containerAttrs = i(t)), s.isTemplate(t) && (t = u.parse(t)), e && (e._asComponent && !e.template && (e.template = "<slot></slot>"), e.template && (e._content = s.extractContent(t), t = r(t, e))), t instanceof DocumentFragment && (s.prepend(s.createAnchor("v-start", true), t), t.appendChild(s.createAnchor("v-end", true))), t
        }
    }, {
        "../config": 24,
        "../parsers/template": 69,
        "../util": 78
    }],
    24: [function (t, e, n) {
        e.exports = {
            debug: false,
            strict: false,
            silent: false,
            proto: true,
            interpolate: true,
            async: true,
            warnExpressionErrors: true,
            _delimitersChanged: true,
            _assetTypes: ["component", "directive", "elementDirective", "filter", "transition", "partial"],
            _propBindingModes: {
                ONE_WAY: 0,
                TWO_WAY: 1,
                ONE_TIME: 2
            },
            _maxUpdateCount: 100
        };
        var r = "v-";
        Object.defineProperty(e.exports, "prefix", {
            get: function () {
                return r
            },
            set: function (t) {
                r = t
            }
        });
        var i = ["{{", "}}"],
            o = ["{{{", "}}}"],
            a = t("./parsers/text");
        Object.defineProperty(e.exports, "delimiters", {
            get: function () {
                return i
            },
            set: function (t) {
                i = t;
                var e = t[0].charAt(0) + t[0],
                    n = t[1] + t[1].slice(-1);
                o = [e, n], a.compileRegex()
            }
        }), Object.defineProperty(e.exports, "unsafeDelimiters", {
            get: function () {
                return o
            },
            set: function (t) {
                o = t, a.compileRegex()
            }
        })
    }, {
        "./parsers/text": 70,
        "./util": 78
    }],
    25: [function (t, e, n) {}, {
        "./util": 78
    }],
    26: [function (t, e, n) {
        function r() {}

        function i(t, e, n, r, i, o, a, s, l, u) {
            this.name = t, this.el = e, this.vm = n, this.expression = r.expression, this.arg = l || r.arg, this.filters = r.filters, this._def = i, this._descriptor = r, this._locked = false, this._bound = false, this._listeners = null, this._host = o, this._scope = a, this._frag = s, this._literal = u
        }

        function o(t, e) {
            var n = ":" + e;
            t.hasAttribute(n) && t.removeAttribute(n), n = s.prefix + "bind:" + e, t.hasAttribute(n) && t.removeAttribute(n)
        }
        var a = t("./util"),
            s = t("./config"),
            l = t("./watcher"),
            u = t("./parsers/text"),
            c = t("./parsers/expression");
        i.prototype._bind = function () {
            var t = this._def,
                e = this.name;
            if (("cloak" !== e || this.vm._isCompiled) && this.el && this.el.removeAttribute && (this.el.removeAttribute(s.prefix + this.name), "attr" === e ? o(this.el, this.arg) : "class" === e || "style" === e ? o(this.el, e) : "on" === e ? this.el.removeAttribute("on-" + this.arg) : "transition" === e ? this.arg ? o(this.el, e) : this.el.removeAttribute(e) : "el" === e && this.el.removeAttribute("$$." + this.expression)), "function" == typeof t ? this.update = t : a.extend(this, t), this._watcherExp = this.expression, this._checkDynamicLiteral(), this.bind && this.bind(), this._literal) this.update && this.update(this.expression);
            else if (this._watcherExp && (this.update || this.twoWay) && (!this.isLiteral || this._isDynamicLiteral) && !this._checkStatement()) {
                var n = this;
                this.update ? this._update = function (t, e) {
                    n._locked || n.update(t, e)
                } : this._update = r;
                var i = this._preProcess ? a.bind(this._preProcess, this) : null,
                    u = this._watcher = new l(this.vm, this._watcherExp, this._update, {
                        filters: this.filters,
                        twoWay: this.twoWay,
                        deep: this.deep,
                        preProcess: i,
                        scope: this._scope
                    });
                this.afterBind ? this.afterBind() : null != this._initValue ? u.set(this._initValue) : this.update && this.update(u.value)
            }
            this._bound = true
        }, i.prototype._checkDynamicLiteral = function () {
            var t = this.expression;
            if (t && this.isLiteral) {
                var e = u.parse(t);
                if (e) {
                    var n = u.tokensToExp(e);
                    this.expression = this.vm.$get(n), this._watcherExp = n, this._isDynamicLiteral = true
                }
            }
        }, i.prototype._checkStatement = function () {
            var t = this.expression;
            if (t && this.acceptStatement && !c.isSimplePath(t)) {
                var e = c.parse(t).get,
                    n = this._scope || this.vm,
                    r = function () {
                        e.call(n, n)
                    };
                return this.filters && (r = this.vm._applyFilters(r, null, this.filters)), this.update(r), true
            }
        }, i.prototype.param = function (t) {
            var e = this.el.getAttribute(t);
            return null != e && (this.el.removeAttribute(t), e = (this._scope || this.vm).$interpolate(e)), e
        }, i.prototype.set = function (t) {
            this.twoWay && this._withLock(function () {
                this._watcher.set(t)
            })
        }, i.prototype._withLock = function (t) {
            var e = this;
            e._locked = true, t.call(e), a.nextTick(function () {
                e._locked = false
            })
        }, i.prototype.on = function (t, e) {
            a.on(this.el, t, e), (this._listeners || (this._listeners = [])).push([t, e])
        }, i.prototype._teardown = function () {
            if (this._bound) {
                this._bound = false, this.unbind && this.unbind(), this._watcher && this._watcher.teardown();
                var t = this._listeners;
                if (t)
                    for (var e = 0; e < t.length; e++) a.off(this.el, t[e][0], t[e][1]);
                this.vm = this.el = this._watcher = this._listeners = null
            }
        }, e.exports = i
    }, {
        "./config": 24,
        "./parsers/expression": 67,
        "./parsers/text": 70,
        "./util": 78,
        "./watcher": 82
    }],
    27: [function (t, e, n) {
        var r = (t("../util"), /^xlink:/),
            i = {
                value: 1,
                checked: 1,
                selected: 1
            },
            o = {
                value: "_value",
                "true-value": "_trueValue",
                "false-value": "_falseValue"
            };
        e.exports = {
            priority: 850,
            update: function (t) {
                if (this.arg) {
                    this.setAttr(this.arg, t)
                } else "object" == typeof t && this.objectHandler(t)
            },
            objectHandler: function (t) {
                var e, n, r = this.cache || (this.cache = {});
                for (e in r) e in t || (this.setAttr(e, null), delete r[e]);
                for (e in t)(n = t[e]) !== r[e] && (r[e] = n, this.setAttr(e, n))
            },
            setAttr: function (t, e) {
                i[t] && t in this.el ? (this.valueRemoved || (this.el.removeAttribute(t), this.valueRemoved = true), this.el[t] = e) : null != e && false !== e ? r.test(t) ? this.el.setAttributeNS("http://www.w3.org/1999/xlink", t, e) : this.el.setAttribute(t, e) : this.el.removeAttribute(t);
                var n = o[t];
                if (n) {
                    this.el[n] = e;
                    var a = this.el.__v_model;
                    a && a.listener()
                }
            }
        }
    }, {
        "../util": 78
    }],
    28: [function (t, e, n) {
        function r(t) {
            for (var e = {}, n = t.trim().split(/\s+/), r = n.length; r--;) e[n[r]] = true;
            return e
        }

        function i(t, e) {
            return o.isArray(t) ? t.indexOf(e) > -1 : t.hasOwnProperty(e)
        }
        var o = t("../util"),
            a = o.addClass,
            s = o.removeClass;
        e.exports = {
            bind: function () {
                var t = this._descriptor._rawClass;
                t && (this.prevKeys = t.trim().split(/\s+/))
            },
            update: function (t) {
                this.arg ? t ? a(this.el, this.arg) : s(this.el, this.arg) : t && "string" == typeof t ? this.handleObject(r(t)) : o.isPlainObject(t) ? this.handleObject(t) : o.isArray(t) ? this.handleArray(t) : this.cleanup()
            },
            handleObject: function (t) {
                this.cleanup(t);
                for (var e = this.prevKeys = Object.keys(t), n = 0, r = e.length; n < r; n++) {
                    var i = e[n];
                    t[i] ? a(this.el, i) : s(this.el, i)
                }
            },
            handleArray: function (t) {
                this.cleanup(t);
                for (var e = 0, n = t.length; e < n; e++) t[e] && a(this.el, t[e]);
                this.prevKeys = t
            },
            cleanup: function (t) {
                if (this.prevKeys)
                    for (var e = this.prevKeys.length; e--;) {
                        var n = this.prevKeys[e];
                        t && i(t, n) || s(this.el, n)
                    }
            }
        }
    }, {
        "../util": 78
    }],
    29: [function (t, e, n) {
        var r = t("../config");
        e.exports = {
            bind: function () {
                var t = this.el;
                this.vm.$once("hook:compiled", function () {
                    t.removeAttribute(r.prefix + "cloak")
                })
            }
        }
    }, {
        "../config": 24
    }],
    30: [function (t, e, n) {
        var r = t("../util"),
            i = t("../config"),
            o = t("../parsers/template");
        e.exports = {
            isLiteral: true,
            priority: 1500,
            bind: function () {
                if (!this.el.__vue__) {
                    this.keepAlive = null != this.param("keep-alive"), this.waitForEvent = this.param("wait-for");
                    var t = this.param(i.prefix + "ref");
                    this.ref = t || r.findRef(this.el);
                    var e = (this._scope || this.vm).$;
                    this.ref && !e.hasOwnProperty(this.ref) && r.defineReactive(e, this.ref, null), this.keepAlive && (this.cache = {}), null !== this.param("inline-template") && (this.inlineTemplate = r.extractContent(this.el, true)), this.pendingComponentCb = this.Component = null, this.pendingRemovals = 0, this.pendingRemovalCb = null, this._isDynamicLiteral ? (this.anchor = r.createAnchor("v-component"), r.replace(this.el, this.anchor), this.transMode = this.param("transition-mode")) : this.resolveComponent(this.expression, r.bind(this.initStatic, this))
                }
            },
            initStatic: function () {
                function t() {
                    (a || this).$before(n), r.remove(n)
                }
                var e, n = this.el,
                    i = this.waitForEvent,
                    o = this.Component.options.activate;
                i && (e = {
                    created: function () {
                        this.$once(i, t)
                    }
                });
                var a = this.childVM = this.build(e);
                this.waitForEvent || (o ? o.call(a, t) : (a.$before(n), r.remove(n)))
            },
            update: function (t) {
                this.setComponent(t)
            },
            setComponent: function (t, e) {
                this.invalidatePending(), t ? this.resolveComponent(t, r.bind(function () {
                    function t() {
                        r.waitingFor = null, r.transition(s || this, e)
                    }
                    this.unbuild(true);
                    var n, r = this,
                        i = this.waitForEvent,
                        o = this.Component.options.activate;
                    i && (n = {
                        created: function () {
                            this.$once(i, t)
                        }
                    });
                    var a = this.getCached(),
                        s = this.build(n);
                    !i && !o || a ? this.transition(s, e) : (this.waitingFor = s, o && o.call(s, t))
                }, this)) : (this.unbuild(true), this.remove(this.childVM, e), this.childVM = null)
            },
            resolveComponent: function (t, e) {
                var n = this;
                this.pendingComponentCb = r.cancellable(function (t) {
                    n.Component = t, e()
                }), this.vm._resolveComponent(t, this.pendingComponentCb)
            },
            invalidatePending: function () {
                this.pendingComponentCb && (this.pendingComponentCb.cancel(), this.pendingComponentCb = null)
            },
            build: function (t) {
                var e = this.getCached();
                if (e) return e;
                if (this.Component) {
                    var n = {
                        el: o.clone(this.el),
                        template: this.inlineTemplate,
                        _linkerCachable: !this.inlineTemplate,
                        _ref: this.ref,
                        _asComponent: true,
                        _isRouterView: this._isRouterView,
                        _context: this.vm,
                        _scope: this._scope,
                        _frag: this._frag
                    };
                    t && r.extend(n, t);
                    var i = this._host || this.vm,
                        a = i.$addChild(n, this.Component);
                    return this.keepAlive && (this.cache[this.Component.cid] = a), a
                }
            },
            getCached: function () {
                return this.keepAlive && this.cache[this.Component.cid]
            },
            unbuild: function (t) {
                this.waitingFor && (this.waitingFor.$destroy(), this.waitingFor = null);
                var e = this.childVM;
                e && !this.keepAlive && e.$destroy(false, t)
            },
            remove: function (t, e) {
                var n = this.keepAlive;
                if (t) {
                    this.pendingRemovals++, this.pendingRemovalCb = e;
                    var r = this;
                    t.$remove(function () {
                        r.pendingRemovals--, n || t._cleanup(), !r.pendingRemovals && r.pendingRemovalCb && (r.pendingRemovalCb(), r.pendingRemovalCb = null)
                    })
                } else e && e()
            },
            transition: function (t, e) {
                var n = this,
                    r = this.childVM;
                switch (this.childVM = t, n.transMode) {
                    case "in-out":
                        t.$before(n.anchor, function () {
                            n.remove(r, e)
                        });
                        break;
                    case "out-in":
                        n.remove(r, function () {
                            t.$before(n.anchor, e)
                        });
                        break;
                    default:
                        n.remove(r), t.$before(n.anchor, e)
                }
            },
            unbind: function () {
                if (this.invalidatePending(), this.unbuild(), this.cache) {
                    for (var t in this.cache) this.cache[t].$destroy();
                    this.cache = null
                }
            }
        }
    }, {
        "../config": 24,
        "../parsers/template": 69,
        "../util": 78
    }],
    31: [function (t, e, n) {
        var r = t("../util");
        e.exports = {
            isLiteral: true,
            priority: 1500,
            bind: function () {
                var t = this.arg ? r.camelize(this.arg) : this.expression;
                this._isDynamicLiteral || this.update(t)
            },
            update: function (t) {
                this.id && this.unbind(), this.id = t;
                var e = (this._scope || this.vm).$$;
                e.hasOwnProperty(t) ? e[t] = this.el : r.defineReactive(e, t, this.el)
            },
            unbind: function () {
                var t = (this._scope || this.vm).$$;
                t[this.id] === this.el && (t[this.id] = null)
            }
        }
    }, {
        "../util": 78
    }],
    32: [function (t, e, n) {
        function r(t, e, n) {
            var r = t.node.previousSibling;
            if (r) {
                for (t = r.__vfrag__; !(t && t.forId === n && t.inserted || r === e);) {
                    if (!(r = r.previousSibling)) return;
                    t = r.__vfrag__
                }
                return t
            }
        }

        function i(t) {
            return t.node.__vue__ || t.node.nextSibling.__vue__
        }

        function o(t) {
            for (var e = -1, n = new Array(t); ++e < t;) n[e] = e;
            return n
        }
        var a = t("../util"),
            s = t("../config"),
            l = t("../fragment/factory"),
            u = a.isObject,
            c = 0;
        e.exports = {
            priority: 2e3,
            bind: function () {
                this.alias = this.arg;
                var t = this.expression.match(/(.*) in (.*)/);
                if (t && (this.alias = t[1], this._watcherExp = t[2]), this.alias) {
                    this.id = "__v-for__" + ++c;
                    var e = this.el.tagName;
                    this.isOption = ("OPTION" === e || "OPTGROUP" === e) && "SELECT" === this.el.parentNode.tagName, this.start = a.createAnchor("v-for-start"), this.end = a.createAnchor("v-for-end"), a.replace(this.el, this.end), a.before(this.start, this.end), this.idKey = this.param("track-by");
                    var n = this.param(s.prefix + "ref");
                    this.ref = n || a.findRef(this.el);
                    var r = +this.param("stagger");
                    this.enterStagger = +this.param("enter-stagger") || r, this.leaveStagger = +this.param("leave-stagger") || r, this.cache = Object.create(null), this.factory = new l(this.vm, this.el)
                }
            },
            update: function (t) {
                this.diff(t), this.updateRef(), this.updateModel()
            },
            diff: function (t) {
                var e, n, i, o, s, l, c, f = this.idKey,
                    p = this.converted,
                    h = this.frags,
                    d = this.frags = new Array(t.length),
                    v = this.alias,
                    g = this.start,
                    m = this.end,
                    y = a.inDoc(g),
                    b = !h;
                for (e = 0, n = t.length; e < n; e++) o = t[e], s = p ? o.$key : null, l = p ? o.$value : o, c = !u(l), i = !b && this.getCachedFrag(l, e, s), i ? (i.reused = true, i.scope.$index = e, s && (i.scope.$key = s), (f || p || c) && (i.scope[v] = l)) : i = this.create(l, v, e, s), d[e] = i, b && i.before(m);
                if (!b) {
                    var x = 0,
                        _ = h.length - d.length;
                    for (e = 0, n = h.length; e < n; e++) i = h[e], i.reused || (this.deleteCachedFrag(i), i.destroy(), this.remove(i, x++, _, y));
                    var w, C, k = 0;
                    for (e = 0, n = d.length; e < n; e++) i = d[e], w = d[e - 1], C = w ? w.staggerCb ? w.staggerAnchor : w.end || w.node : g, i.reused && !i.staggerCb ? r(i, g, this.id) !== w && this.move(i, C) : this.insert(i, k++, C, y), i.reused = false
                }
            },
            create: function (t, e, n, r) {
                var i = this._host,
                    o = this._scope || this.vm,
                    s = Object.create(o);
                s.$ = {}, s.$parent = o, s.$forContext = this, a.defineReactive(s, e, t), a.defineReactive(s, "$index", n), r ? a.defineReactive(s, "$key", r) : s.$key && a.define(s, "$key", null);
                var l = this.factory.create(i, s, this._frag);
                return l.forId = this.id, this.cacheFrag(t, l, n, r), l
            },
            updateRef: function () {
                var t = this.ref;
                if (t) {
                    var e, n = (this._scope || this.vm).$;
                    this.converted ? (e = {}, this.frags.forEach(function (t) {
                        e[t.scope.$key] = i(t)
                    })) : e = this.frags.map(i), n.hasOwnProperty(t) ? n[t] = e : a.defineReactive(n, t, e)
                }
            },
            updateModel: function () {
                if (this.isOption) {
                    var t = this.start.parentNode,
                        e = t && t.__v_model;
                    e && e.forceUpdate()
                }
            },
            insert: function (t, e, n, r) {
                t.staggerCb && (t.staggerCb.cancel(), t.staggerCb = null);
                var i = this.getStagger(t, e, null, "enter");
                if (r && i) {
                    var o = t.staggerAnchor;
                    o || (o = t.staggerAnchor = a.createAnchor("stagger-anchor"), o.__vfrag__ = t), a.after(o, n);
                    var s = t.staggerCb = a.cancellable(function () {
                        t.staggerCb = null, t.before(o), a.remove(o)
                    });
                    setTimeout(s, i)
                } else t.before(n.nextSibling)
            },
            remove: function (t, e, n, r) {
                if (t.staggerCb) return t.staggerCb.cancel(), void(t.staggerCb = null);
                var i = this.getStagger(t, e, n, "leave");
                if (r && i) {
                    var o = t.staggerCb = a.cancellable(function () {
                        t.staggerCb = null, t.remove()
                    });
                    setTimeout(o, i)
                } else t.remove()
            },
            move: function (t, e) {
                t.before(e.nextSibling, false)
            },
            cacheFrag: function (t, e, n, r) {
                var i, o = this.idKey,
                    s = this.cache,
                    l = !u(t);
                r || o || l ? (i = o ? "$index" === o ? n : t[o] : r || n, s[i] || (s[i] = e)) : (i = this.id, t.hasOwnProperty(i) ? null === t[i] && (t[i] = e) : a.define(t, i, e)), e.raw = t
            },
            getCachedFrag: function (t, e, n) {
                var r = this.idKey,
                    i = !u(t);
                if (n || r || i) {
                    var o = r ? "$index" === r ? e : t[r] : n || e;
                    return this.cache[o]
                }
                return t[this.id]
            },
            deleteCachedFrag: function (t) {
                var e = t.raw,
                    n = this.idKey,
                    r = t.scope,
                    i = r.$index,
                    o = r.hasOwnProperty("$key") && r.$key,
                    a = !u(e);
                if (n || o || a) {
                    var s = n ? "$index" === n ? i : e[n] : o || i;
                    this.cache[s] = null
                } else e[this.id] = null, t.raw = null
            },
            getStagger: function (t, e, n, r) {
                r += "Stagger";
                var i = t.node.__v_trans,
                    o = i && i.hooks,
                    a = o && (o[r] || o.stagger);
                return a ? a.call(t, e, n) : e * this[r]
            },
            _preProcess: function (t) {
                this.rawValue = t;
                var e = this.rawType = typeof t;
                if (a.isPlainObject(t)) {
                    for (var n, r = Object.keys(t), i = r.length, s = new Array(i); i--;) n = r[i], s[i] = {
                        $key: n,
                        $value: t[n]
                    };
                    return this.converted = true, s
                }
                return this.converted = false, "number" === e ? t = o(t) : "string" === e && (t = a.toArray(t)), t || []
            },
            unbind: function () {
                if (this.ref && ((this._scope || this.vm).$[this.ref] = null), this.frags)
                    for (var t, e = this.frags.length; e--;) t = this.frags[e], this.deleteCachedFrag(t), t.destroy()
            }
        }
    }, {
        "../config": 24,
        "../fragment/factory": 54,
        "../util": 78
    }],
    33: [function (t, e, n) {
        var r = t("../util"),
            i = t("../parsers/template");
        e.exports = {
            bind: function () {
                8 === this.el.nodeType && (this.nodes = [], this.anchor = r.createAnchor("v-html"), r.replace(this.el, this.anchor))
            },
            update: function (t) {
                t = r.toString(t), this.nodes ? this.swap(t) : this.el.innerHTML = t
            },
            swap: function (t) {
                for (var e = this.nodes.length; e--;) r.remove(this.nodes[e]);
                var n = i.parse(t, true, true);
                this.nodes = r.toArray(n.childNodes), r.before(n, this.anchor)
            }
        }
    }, {
        "../parsers/template": 69,
        "../util": 78
    }],
    34: [function (t, e, n) {
        var r = t("../util"),
            i = t("../fragment/factory");
        e.exports = {
            priority: 2e3,
            bind: function () {
                var t = this.el;
                if (t.__vue__) this.invalid = true;
                else {
                    var e = t.nextElementSibling;
                    e && null !== r.attr(e, "else") && (r.remove(e), this.elseFactory = new i(this.vm, e)), this.anchor = r.createAnchor("v-if"), r.replace(t, this.anchor), this.factory = new i(this.vm, t)
                }
            },
            update: function (t) {
                this.invalid || (t ? this.frag || this.insert() : this.remove())
            },
            insert: function () {
                this.elseFrag && (this.elseFrag.remove(), this.elseFrag.destroy(), this.elseFrag = null), this.frag = this.factory.create(this._host, this._scope, this._frag), this.frag.before(this.anchor)
            },
            remove: function () {
                this.frag && (this.frag.remove(), this.frag.destroy(), this.frag = null), this.elseFactory && (this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag), this.elseFrag.before(this.anchor))
            },
            unbind: function () {
                this.frag && this.frag.destroy()
            }
        }
    }, {
        "../fragment/factory": 54,
        "../util": 78
    }],
    35: [function (t, e, n) {
        n.text = t("./text"), n.html = t("./html"), n.attr = t("./attr"), n.show = t("./show"), n.class = t("./class"), n.el = t("./el"), n.ref = t("./ref"), n.cloak = t("./cloak"), n.style = t("./style"), n.transition = t("./transition"), n.on = t("./on"), n.model = t("./model"), n.repeat = t("./repeat"), n.for = t("./for"), n.if = t("./if"), n._component = t("./component"), n._prop = t("./prop"), n.bind = n.attr
    }, {
        "./attr": 27,
        "./class": 28,
        "./cloak": 29,
        "./component": 30,
        "./el": 31,
        "./for": 32,
        "./html": 33,
        "./if": 34,
        "./model": 37,
        "./on": 41,
        "./prop": 42,
        "./ref": 43,
        "./repeat": 44,
        "./show": 45,
        "./style": 46,
        "./text": 47,
        "./transition": 48
    }],
    36: [function (t, e, n) {
        var r = t("../../util");
        e.exports = {
            bind: function () {
                function t() {
                    var t = n.checked;
                    return t && n.hasOwnProperty("_trueValue") ? n._trueValue : !t && n.hasOwnProperty("_falseValue") ? n._falseValue : (t && null !== i && (t = s.$eval(i)), t || null === o || (t = s.$eval(o)), t)
                }
                var e = this,
                    n = this.el,
                    i = this.param("true-exp"),
                    o = this.param("false-exp"),
                    a = null != this.param("number"),
                    s = this._scope || this.vm;
                this.getValue = function () {
                    return n.hasOwnProperty("_value") ? n._value : a ? r.toNumber(n.value) : n.value
                }, this.matchValue = function (t) {
                    return n.hasOwnProperty("_trueValue") ? r.looseEqual(t, n._trueValue) : null !== i ? r.looseEqual(t, s.$eval(i)) : !!t
                }, this.listener = function () {
                    var i = e._watcher.value;
                    if (r.isArray(i)) {
                        var o = e.getValue();
                        n.checked ? r.indexOf(i, o) < 0 && i.push(o) : i.$remove(o)
                    } else e.set(t())
                }, this.on("change", this.listener), n.checked && (this.afterBind = this.listener)
            },
            update: function (t) {
                var e = this.el;
                r.isArray(t) ? e.checked = r.indexOf(t, this.getValue()) > -1 : e.checked = this.matchValue(t)
            }
        }
    }, {
        "../../util": 78
    }],
    37: [function (t, e, n) {
        var r = t("../../util"),
            i = {
                text: t("./text"),
                radio: t("./radio"),
                select: t("./select"),
                checkbox: t("./checkbox")
            };
        e.exports = {
            priority: 800,
            twoWay: true,
            handlers: i,
            bind: function () {
                this.checkFilters(), this.hasRead && this.hasWrite;
                var t, e = this.el,
                    n = e.tagName;
                if ("INPUT" === n) t = i[e.type] || i.text;
                else if ("SELECT" === n) t = i.select;
                else {
                    if ("TEXTAREA" !== n) return;
                    t = i.text
                }
                e.__v_model = this, t.bind.call(this), this.update = t.update, this._unbind = t.unbind
            },
            checkFilters: function () {
                var t = this.filters;
                if (t)
                    for (var e = t.length; e--;) {
                        var n = r.resolveAsset(this.vm.$options, "filters", t[e].name);
                        ("function" == typeof n || n.read) && (this.hasRead = true), n.write && (this.hasWrite = true)
                    }
            },
            unbind: function () {
                this.el.__v_model = null, this._unbind && this._unbind()
            }
        }
    }, {
        "../../util": 78,
        "./checkbox": 36,
        "./radio": 38,
        "./select": 39,
        "./text": 40
    }],
    38: [function (t, e, n) {
        var r = t("../../util");
        e.exports = {
            bind: function () {
                var t = this,
                    e = this.el,
                    n = null != this.param("number"),
                    i = this.param("exp"),
                    o = this._scope || this.vm;
                this.getValue = function () {
                    if (e.hasOwnProperty("_value")) return e._value;
                    var t = e.value;
                    return n ? t = r.toNumber(t) : null !== i && (t = o.$eval(i)), t
                }, this.listener = function () {
                    t.set(t.getValue())
                }, this.on("change", this.listener), e.checked && (this._initValue = this.getValue())
            },
            update: function (t) {
                this.el.checked = r.looseEqual(t, this.getValue())
            }
        }
    }, {
        "../../util": 78
    }],
    39: [function (t, e, n) {
        function r(t) {
            function e(t) {
                if (l.isArray(t)) {
                    for (var e = r.options.length; e--;) {
                        var a = r.options[e];
                        if (a !== o) {
                            var s = a.parentNode;
                            s === r ? s.removeChild(a) : (r.removeChild(s), e = r.options.length)
                        }
                    }
                    i(r, t), n.forceUpdate()
                }
            }
            var n = this,
                r = n.el,
                o = n.defaultOption = n.el.options[0],
                a = c.parse(t)[0];
            this.optionWatcher = new u(this.vm, a.expression, e, {
                deep: true,
                filters: a.filters
            }), e(this.optionWatcher.value)
        }

        function i(t, e) {
            for (var n, r, o = 0, a = e.length; o < a; o++) n = e[o], n.options ? (r = document.createElement("optgroup"), r.label = n.label, i(r, n.options)) : (r = document.createElement("option"), "string" == typeof n || "number" == typeof n ? r.text = r.value = n : (null == n.value || l.isObject(n.value) || (r.value = n.value), r._value = n.value, r.text = n.text || "", n.disabled && (r.disabled = true))), t.appendChild(r)
        }

        function o() {
            for (var t, e = this.el.options, n = 0, r = e.length; n < r; n++) e[n].hasAttribute("selected") && (this.multiple ? (t || (t = [])).push(e[n].value) : t = e[n].value);
            void 0 !== t && (this._initValue = this.number ? l.toNumber(t) : t)
        }

        function a(t, e) {
            for (var n, r, i = e ? [] : null, o = 0, a = t.options.length; o < a; o++)
                if (n = t.options[o], n.selected) {
                    if (r = n.hasOwnProperty("_value") ? n._value : n.value, !e) return r;
                    i.push(r)
                }
            return i
        }

        function s(t, e) {
            for (var n = t.length; n--;)
                if (l.looseEqual(t[n], e)) return n;
            return -1
        }
        var l = t("../../util"),
            u = t("../../watcher"),
            c = t("../../parsers/directive");
        e.exports = {
            bind: function () {
                var t = this,
                    e = this.el;
                this.forceUpdate = function () {
                    t._watcher && t.update(t._watcher.get())
                };
                var n = this.param("options");
                n && r.call(this, n), this.number = null != this.param("number"), this.multiple = e.hasAttribute("multiple"), this.listener = function () {
                    var n = a(e, t.multiple);
                    n = t.number ? l.isArray(n) ? n.map(l.toNumber) : l.toNumber(n) : n, t.set(n)
                }, this.on("change", this.listener), o.call(this), this.vm.$on("hook:attached", this.forceUpdate)
            },
            update: function (t) {
                var e = this.el;
                if (e.selectedIndex = -1, null == t) return void(this.defaultOption && (this.defaultOption.selected = true));
                for (var n, r, i = this.multiple && l.isArray(t), o = e.options, a = o.length; a--;) n = o[a], r = n.hasOwnProperty("_value") ? n._value : n.value, n.selected = i ? s(t, r) > -1 : l.looseEqual(t, r)
            },
            unbind: function () {
                this.vm.$off("hook:attached", this.forceUpdate), this.optionWatcher && this.optionWatcher.teardown()
            }
        }
    }, {
        "../../parsers/directive": 66,
        "../../util": 78,
        "../../watcher": 82
    }],
    40: [function (t, e, n) {
        var r = t("../../util");
        e.exports = {
            bind: function () {
                var t = this,
                    e = this.el,
                    n = "range" === e.type,
                    i = null != this.param("lazy"),
                    o = null != this.param("number"),
                    a = parseInt(this.param("debounce"), 10),
                    s = false;
                r.isAndroid || n || (this.on("compositionstart", function () {
                    s = true
                }), this.on("compositionend", function () {
                    s = false, i || t.listener()
                })), this.focused = false, n || (this.on("focus", function () {
                    t.focused = true
                }), this.on("blur", function () {
                    t.focused = false, t.listener()
                })), this.listener = function () {
                    if (!s) {
                        var i = o || n ? r.toNumber(e.value) : e.value;
                        t.set(i), r.nextTick(function () {
                            t._bound && !t.focused && t.update(t._watcher.value)
                        })
                    }
                }, a && (this.listener = r.debounce(this.listener, a)), this.hasjQuery = "function" == typeof jQuery, this.hasjQuery ? (jQuery(e).on("change", this.listener), i || jQuery(e).on("input", this.listener)) : (this.on("change", this.listener), i || this.on("input", this.listener)), !i && r.isIE9 && (this.on("cut", function () {
                    r.nextTick(t.listener)
                }), this.on("keyup", function (e) {
                    46 !== e.keyCode && 8 !== e.keyCode || t.listener()
                })), (e.hasAttribute("value") || "TEXTAREA" === e.tagName && e.value.trim()) && (this._initValue = o ? r.toNumber(e.value) : e.value)
            },
            update: function (t) {
                this.el.value = r.toString(t)
            },
            unbind: function () {
                var t = this.el;
                this.hasjQuery && (jQuery(t).off("change", this.listener), jQuery(t).off("input", this.listener))
            }
        }
    }, {
        "../../util": 78
    }],
    41: [function (t, e, n) {
        function r(t) {
            return function (e) {
                return e.stopPropagation(), t.call(this, e)
            }
        }

        function i(t) {
            return function (e) {
                return e.preventDefault(), t.call(this, e)
            }
        }
        var o = t("../util"),
            a = t("../filters").key,
            s = /\.stop\b/,
            l = /\.prevent\b/;
        e.exports = {
            acceptStatement: true,
            priority: 700,
            bind: function () {
                var t = this.arg;
                s.test(t) && (this.stop = true, t = t.replace(s, "")), l.test(t) && (this.prevent = true, t = t.replace(l, ""));
                var e = t.indexOf(".");
                if (e > -1 ? (this.arg = t.slice(0, e), this.key = t.slice(e + 1)) : this.arg = t, "IFRAME" === this.el.tagName && "load" !== this.arg) {
                    var n = this;
                    this.iframeBind = function () {
                        o.on(n.el.contentWindow, n.arg, n.handler)
                    }, this.on("load", this.iframeBind)
                }
            },
            update: function (t) {
                if ("function" == typeof t) {
                    this.stop && (t = r(t)), this.prevent && (t = i(t)), this.key && (t = a(t, this.key)), this.reset();
                    var e = this._scope || this.vm;
                    this.handler = function (n) {
                        e.$event = n;
                        var r = t(n);
                        return e.$event = null, r
                    }, this.iframeBind ? this.iframeBind() : o.on(this.el, this.arg, this.handler)
                }
            },
            reset: function () {
                var t = this.iframeBind ? this.el.contentWindow : this.el;
                this.handler && o.off(t, this.arg, this.handler)
            },
            unbind: function () {
                this.reset()
            }
        }
    }, {
        "../filters": 53,
        "../util": 78
    }],
    42: [function (t, e, n) {
        var r = t("../util"),
            i = t("../watcher"),
            o = t("../config")._propBindingModes;
        e.exports = {
            bind: function () {
                var t = this.vm,
                    e = t._context,
                    n = this._descriptor,
                    a = n.path,
                    s = n.parentPath,
                    l = n.mode === o.TWO_WAY,
                    u = this.parentWatcher = new i(e, s, function (e) {
                        r.assertProp(n, e) && (t[a] = e)
                    }, {
                        twoWay: l,
                        filters: n.filters,
                        scope: this._scope
                    }),
                    c = u.value;
                if ("$data" === a ? t._data = c : r.initProp(t, n, c), l) {
                    var f = this;
                    t.$once("hook:created", function () {
                        f.childWatcher = new i(t, a, function (t) {
                            u.set(t)
                        })
                    })
                }
            },
            unbind: function () {
                this.parentWatcher.teardown(), this.childWatcher && this.childWatcher.teardown()
            }
        }
    }, {
        "../config": 24,
        "../util": 78,
        "../watcher": 82
    }],
    43: [function (t, e, n) {
        t("../util");
        e.exports = {
            isLiteral: true,
            bind: function () {
                if (this.el.__vue__) {
                    var t = this.arg || this.expression;
                    (this.vm._scope || this.vm._context).$[t] = this.vm
                }
            },
            unbind: function () {
                var t = this.expression,
                    e = this.vm._scope || this.vm._context;
                e.$[t] === this.vm && (e.$[t] = null)
            }
        }
    }, {
        "../util": 78
    }],
    44: [function (t, e, n) {
        function r(t, e, n) {
            var r = t.$el.previousSibling;
            if (r) {
                for (;
                    (!r.__vue__ || r.__vue__.$options._repeatId !== n) && r !== e;) r = r.previousSibling;
                return r.__vue__
            }
        }

        function i(t) {
            for (var e = -1, n = new Array(t); ++e < t;) n[e] = e;
            return n
        }

        function o(t) {
            for (var e = {}, n = 0, r = t.length; n < r; n++) e[t[n].$key] = t[n];
            return e
        }

        function a(t) {
            var e = typeof t;
            return null == t || "string" === e || "number" === e || "boolean" === e
        }
        var s = t("../util"),
            l = t("../config"),
            u = s.isObject,
            c = s.isPlainObject,
            f = t("../parsers/text"),
            p = t("../parsers/expression"),
            h = t("../parsers/template"),
            d = t("../compiler"),
            v = 0;
        e.exports = {
            bind: function () {
                var t = this.expression.match(/(.*) in (.*)/);
                t && (this.arg = t[1], this._watcherExp = t[2]), this.id = "__v_repeat_" + ++v, this.start = s.createAnchor("v-repeat-start"), this.end = s.createAnchor("v-repeat-end"), s.replace(this.el, this.end), s.before(this.start, this.end), this.template = s.isTemplate(this.el) ? h.parse(this.el, true) : this.el, this.idKey = this.param("track-by");
                var e = +this.param("stagger");
                this.enterStagger = +this.param("enter-stagger") || e, this.leaveStagger = +this.param("leave-stagger") || e, this.refId = this.param(l.prefix + "ref"), this.elID = this.param(l.prefix + "el"), this.refId = this.refId || s.findRef(this.el), this.checkIf(), this.checkComponent(), this.cache = Object.create(null)
            },
            checkIf: function () {
                s.attr(this.el, "if")
            },
            checkComponent: function () {
                this.componentState = 0;
                var t = this.vm.$options,
                    e = s.checkComponent(this.el, t, this.el.hasAttributes());
                if (e) {
                    this.Component = null, this.asComponent = true, null !== this.param("inline-template") && (this.inlineTemplate = s.extractContent(this.el, true));
                    var n = f.parse(e);
                    if (n) {
                        var r = f.tokensToExp(n);
                        this.componentGetter = p.parse(r).get
                    } else this.componentId = e, this.pendingData = null
                } else {
                    this.Component = s.Vue, this.inline = true, this.template = d.transclude(this.template);
                    var i = s.extend({}, t);
                    i._asComponent = false, this._linkFn = d.compile(this.template, i)
                }
            },
            resolveComponent: function () {
                this.componentState = 1, this.vm._resolveComponent(this.componentId, s.bind(function (t) {
                    3 !== this.componentState && (this.Component = t, this.componentState = 2, this.realUpdate(this.pendingData), this.pendingData = null)
                }, this))
            },
            resolveDynamicComponent: function (t, e) {
                var n, r = Object.create(this.vm);
                for (n in t) s.define(r, n, t[n]);
                for (n in e) s.define(r, n, e[n]);
                var i = this.componentGetter.call(r, r),
                    o = s.resolveAsset(this.vm.$options, "components", i);
                return o.options ? o : s.Vue
            },
            update: function (t) {
                if (this.componentId) {
                    var e = this.componentState;
                    0 === e ? (this.pendingData = t, this.resolveComponent()) : 1 === e ? this.pendingData = t : 2 === e && this.realUpdate(t)
                } else this.realUpdate(t)
            },
            realUpdate: function (t) {
                this.vms = this.diff(t, this.vms), this.refId && (this.vm.$[this.refId] = this.converted ? o(this.vms) : this.vms), this.elID && (this.vm.$$[this.elID] = this.vms.map(function (t) {
                    return t.$el
                }))
            },
            diff: function (t, e) {
                var n, i, o, a, l, c, f = this.idKey,
                    p = this.converted,
                    h = this.start,
                    d = this.end,
                    v = s.inDoc(h),
                    g = this.arg,
                    m = !e,
                    y = new Array(t.length);
                for (a = 0, l = t.length; a < l; a++) n = t[a], i = p ? n.$value : n, c = !u(i), o = !m && this.getVm(i, a, p ? n.$key : null), o ? (o._reused = true, o.$index = a, (f || p || c) && (g ? o[g] = i : s.isPlainObject(i) ? o.$data = i : o.$value = i)) : (o = this.build(n, a, true), o._reused = false), y[a] = o, m && o.$before(d);
                if (m) return y;
                var b = 0,
                    x = e.length - y.length;
                for (a = 0, l = e.length; a < l; a++) o = e[a], o._reused || (this.uncacheVm(o), o.$destroy(false, true), this.remove(o, b++, x, v));
                var _, w, C = 0;
                for (a = 0, l = y.length; a < l; a++) o = y[a], _ = y[a - 1], w = _ ? _._staggerCb ? _._staggerAnchor : _._fragmentEnd || _.$el : h, o._reused && !o._staggerCb ? r(o, h, this.id) !== _ && this.move(o, w) : this.insert(o, C++, w, v), o._reused = false;
                return y
            },
            build: function (t, e, n) {
                var r = {
                    $index: e
                };
                this.converted && (r.$key = t.$key);
                var i = this.converted ? t.$value : t,
                    o = this.arg;
                o ? (t = {}, t[o] = i) : c(i) ? t = i : (t = {}, r.$value = i);
                var l = this.Component || this.resolveDynamicComponent(t, r),
                    u = this._host || this.vm,
                    f = u.$addChild({
                        el: h.clone(this.template),
                        data: t,
                        inherit: this.inline,
                        template: this.inlineTemplate,
                        _meta: r,
                        _repeat: this.inline,
                        _asComponent: this.asComponent,
                        _linkerCachable: !this.inlineTemplate && l !== s.Vue,
                        _linkFn: this._linkFn,
                        _repeatId: this.id,
                        _context: this.vm,
                        _frag: this._frag
                    }, l);
                n && this.cacheVm(i, f, e, this.converted ? r.$key : null);
                var p = this;
                return "object" === this.rawType && a(i) && f.$watch(o || "$value", function (t) {
                    p.filters, p._withLock(function () {
                        p.converted ? p.rawValue[f.$key] = t : p.rawValue.$set(f.$index, t)
                    })
                }), f
            },
            unbind: function () {
                if (this.componentState = 3, this.refId && (this.vm.$[this.refId] = null), this.vms)
                    for (var t, e = this.vms.length; e--;) t = this.vms[e], this.uncacheVm(t), t.$destroy()
            },
            cacheVm: function (t, e, n, r) {
                var i, o = this.idKey,
                    a = this.cache,
                    l = !u(t);
                r || o || l ? (i = o ? "$index" === o ? n : t[o] : r || n, a[i] || (a[i] = e)) : (i = this.id, t.hasOwnProperty(i) ? null === t[i] && (t[i] = e) : s.define(t, i, e)), e._raw = t
            },
            getVm: function (t, e, n) {
                var r = this.idKey,
                    i = !u(t);
                if (n || r || i) {
                    var o = r ? "$index" === r ? e : t[r] : n || e;
                    return this.cache[o]
                }
                return t[this.id]
            },
            uncacheVm: function (t) {
                var e = t._raw,
                    n = this.idKey,
                    r = t.$index,
                    i = t.hasOwnProperty("$key") && t.$key,
                    o = !u(e);
                if (n || i || o) {
                    var a = n ? "$index" === n ? r : e[n] : i || r;
                    this.cache[a] = null
                } else e[this.id] = null, t._raw = null
            },
            insert: function (t, e, n, r) {
                t._staggerCb && (t._staggerCb.cancel(), t._staggerCb = null);
                var i = this.getStagger(t, e, null, "enter");
                if (r && i) {
                    var o = t._staggerAnchor;
                    o || (o = t._staggerAnchor = s.createAnchor("stagger-anchor"), o.__vue__ = t), s.after(o, n);
                    var a = t._staggerCb = s.cancellable(function () {
                        t._staggerCb = null, t.$before(o), s.remove(o)
                    });
                    setTimeout(a, i)
                } else t.$after(n)
            },
            move: function (t, e) {
                t.$after(e, null, false)
            },
            remove: function (t, e, n, r) {
                function i() {
                    t.$remove(function () {
                        t._cleanup()
                    })
                }
                if (t._staggerCb) return t._staggerCb.cancel(), void(t._staggerCb = null);
                var o = this.getStagger(t, e, n, "leave");
                if (r && o) {
                    var a = t._staggerCb = s.cancellable(function () {
                        t._staggerCb = null, i()
                    });
                    setTimeout(a, o)
                } else i()
            },
            getStagger: function (t, e, n, r) {
                r += "Stagger";
                var i = t.$el.__v_trans,
                    o = i && i.hooks,
                    a = o && (o[r] || o.stagger);
                return a ? a.call(t, e, n) : e * this[r]
            },
            _preProcess: function (t) {
                this.rawValue = t;
                var e = this.rawType = typeof t;
                if (c(t)) {
                    for (var n, r = Object.keys(t), o = r.length, a = new Array(o); o--;) n = r[o], a[o] = {
                        $key: n,
                        $value: t[n]
                    };
                    return this.converted = true, a
                }
                return this.converted = false, "number" === e ? t = i(t) : "string" === e && (t = s.toArray(t)), t || []
            }
        }
    }, {
        "../compiler": 22,
        "../config": 24,
        "../parsers/expression": 67,
        "../parsers/template": 69,
        "../parsers/text": 70,
        "../util": 78
    }],
    45: [function (t, e, n) {
        var r = t("../util"),
            i = t("../transition");
        e.exports = {
            bind: function () {
                var t = this.el.nextElementSibling;
                t && null !== r.attr(t, "else") && (this.elseEl = t)
            },
            update: function (t) {
                var e = this.el;
                i.apply(e, t ? 1 : -1, function () {
                    e.style.display = t ? "" : "none"
                }, this.vm);
                var n = this.elseEl;
                n && i.apply(n, t ? -1 : 1, function () {
                    n.style.display = t ? "none" : ""
                }, this.vm)
            }
        }
    }, {
        "../transition": 71,
        "../util": 78
    }],
    46: [function (t, e, n) {
        function r(t) {
            if (f[t]) return f[t];
            var e = i(t);
            return f[t] = f[e] = e, e
        }

        function i(t) {
            t = t.replace(u, "$1-$2").toLowerCase();
            var e = o.camelize(t),
                n = e.charAt(0).toUpperCase() + e.slice(1);
            if (c || (c = document.createElement("div")), e in c.style) return t;
            for (var r = a.length; r--;)
                if (s[r] + n in c.style) return a[r] + t
        }
        var o = t("../util"),
            a = ["-webkit-", "-moz-", "-ms-"],
            s = ["Webkit", "Moz", "ms"],
            l = /!important;?$/,
            u = /([a-z])([A-Z])/g,
            c = null,
            f = {};
        e.exports = {
            deep: true,
            update: function (t) {
                this.arg ? this.setProp(this.arg, t) : "string" == typeof t ? this.el.style.cssText = t : o.isArray(t) ? this.objectHandler(t.reduce(o.extend, {})) : this.objectHandler(t)
            },
            objectHandler: function (t) {
                var e, n, r = this.cache || (this.cache = {});
                for (e in r) e in t || (this.setProp(e, null), delete r[e]);
                for (e in t)(n = t[e]) !== r[e] && (r[e] = n, this.setProp(e, n))
            },
            setProp: function (t, e) {
                if (t = r(t))
                    if (null != e && (e += ""), e) {
                        var n = l.test(e) ? "important" : "";
                        n && (e = e.replace(l, "").trim()), this.el.style.setProperty(t, e, n)
                    } else this.el.style.removeProperty(t)
            }
        }
    }, {
        "../util": 78
    }],
    47: [function (t, e, n) {
        var r = t("../util");
        e.exports = {
            bind: function () {
                this.attr = 3 === this.el.nodeType ? "data" : "textContent"
            },
            update: function (t) {
                this.el[this.attr] = r.toString(t)
            }
        }
    }, {
        "../util": 78
    }],
    48: [function (t, e, n) {
        var r = t("../util"),
            i = t("../transition/transition");
        e.exports = {
            priority: 1e3,
            isLiteral: true,
            bind: function () {
                this._isDynamicLiteral || this.arg ? this.arg && (this._isDynamicLiteral = true) : this.update(this.expression)
            },
            update: function (t, e) {
                var n = this.el,
                    o = r.resolveAsset(this.vm.$options, "transitions", t);
                t = t || "v", n.__v_trans = new i(n, t, o, this.el.__vue__ || this.vm), e && r.removeClass(n, e + "-transition"), r.addClass(n, t + "-transition")
            }
        }
    }, {
        "../transition/transition": 73,
        "../util": 78
    }],
    49: [function (t, e, n) {
        n.slot = n.content = t("./slot"), n.partial = t("./partial")
    }, {
        "./partial": 50,
        "./slot": 51
    }],
    50: [function (t, e, n) {
        var r = t("../util"),
            i = t("../parsers/text"),
            o = t("../fragment/factory"),
            a = t("../directives/if"),
            s = t("../watcher");
        e.exports = {
            priority: 1750,
            bind: function () {
                var t = this.el;
                this.anchor = r.createAnchor("v-partial"), r.replace(t, this.anchor);
                var e = t.getAttribute("name");
                if (null != e) {
                    var n = i.parse(e);
                    n ? this.setupDynamic(i.tokensToExp(n)) : this.insert(e)
                } else(e = r.getBindAttr(t, "name")) && this.setupDynamic(e)
            },
            setupDynamic: function (t) {
                var e = this,
                    n = function (t) {
                        a.remove.call(e), t && e.insert(t)
                    };
                this.nameWatcher = new s(this.vm, t, n, {
                    scope: this._scope
                }), n(this.nameWatcher.value)
            },
            insert: function (t) {
                var e = r.resolveAsset(this.vm.$options, "partials", t);
                e && (this.factory = new o(this.vm, e), a.insert.call(this))
            },
            unbind: function () {
                this.frag && this.frag.destroy(), this.nameWatcher && this.nameWatcher.teardown()
            }
        }
    }, {
        "../directives/if": 34,
        "../fragment/factory": 54,
        "../parsers/text": 70,
        "../util": 78,
        "../watcher": 82
    }],
    51: [function (t, e, n) {
        function r(t, e, n) {
            function r(t) {
                !o.isTemplate(t) || i(t, "if") || i(t, "for") || i(t, "repeat") || (t = s.parse(t)), t = s.clone(t), a.appendChild(t)
            }
            for (var a = document.createDocumentFragment(), l = 0, u = t.length; l < u; l++) {
                var c = t[l];
                n && !c.__v_selected ? r(c) : n || c.parentNode !== e || (c.__v_selected = true, r(c))
            }
            return a
        }

        function i(t, e) {
            return t.hasAttribute(a.prefix + e)
        }
        var o = t("../util"),
            a = t("../config"),
            s = t("../parsers/template");
        e.exports = {
            priority: 1750,
            bind: function () {
                this.isSlot = "SLOT" === this.el.tagName;
                for (var t = this.vm, e = t; e.$options._repeat;) e = e.$parent;
                var n, i = e.$options._content;
                if (!i) return void this.fallback();
                var o = e._context,
                    a = this.isSlot ? this.param("name") : this.param("select");
                if (a) {
                    this.isSlot && (a = '[slot="' + a + '"]');
                    var s = i.querySelectorAll(a);
                    s.length ? (n = r(s, i), n.hasChildNodes() ? this.compile(n, o, t) : this.fallback()) : this.fallback()
                } else {
                    var l = this,
                        u = function () {
                            l.compile(r(i.childNodes, i, true), o, t)
                        };
                    e._isCompiled ? u() : e.$once("hook:compiled", u)
                }
            },
            fallback: function () {
                this.compile(o.extractContent(this.el, true), this.vm)
            },
            compile: function (t, e, n) {
                if (t && e) {
                    var r = n ? n._scope : this._scope;
                    this.unlink = e.$compile(t, n, r, this._frag)
                }
                t ? o.replace(this.el, t) : o.remove(this.el)
            },
            unbind: function () {
                this.unlink && this.unlink()
            }
        }
    }, {
        "../config": 24,
        "../parsers/template": 69,
        "../util": 78
    }],
    52: [function (t, e, n) {
        function r(t, e) {
            var n;
            if (i.isPlainObject(t)) {
                var o = Object.keys(t);
                for (n = o.length; n--;)
                    if (r(t[o[n]], e)) return true
            } else if (i.isArray(t)) {
                for (n = t.length; n--;)
                    if (r(t[n], e)) return true
            } else if (null != t) return t.toString().toLowerCase().indexOf(e) > -1
        }
        var i = t("../util"),
            o = t("../parsers/path");
        n.filterBy = function (t, e, n) {
            if (null == e) return t;
            if ("function" == typeof e) return t.filter(e);
            e = ("" + e).toLowerCase();
            var a = "in" === n ? 3 : 2,
                s = i.toArray(arguments, a).reduce(function (t, e) {
                    return t.concat(e)
                }, []);
            return t.filter(function (t) {
                return s.length ? s.some(function (n) {
                    return r(o.get(t, n), e)
                }) : r(t, e)
            })
        }, n.orderBy = function (t, e, n) {
            if (!e) return t;
            var r = 1;
            return arguments.length > 2 && (r = "-1" === n ? -1 : n ? -1 : 1), t.slice().sort(function (t, n) {
                return "$key" !== e && (i.isObject(t) && "$value" in t && (t = t.$value), i.isObject(n) && "$value" in n && (n = n.$value)), t = i.isObject(t) ? o.get(t, e) : t, n = i.isObject(n) ? o.get(n, e) : n, t === n ? 0 : t > n ? r : -r
            })
        }
    }, {
        "../parsers/path": 68,
        "../util": 78
    }],
    53: [function (t, e, n) {
        var r = t("../util");
        n.json = {
            read: function (t, e) {
                return "string" == typeof t ? t : JSON.stringify(t, null, Number(e) || 2)
            },
            write: function (t) {
                try {
                    return JSON.parse(t)
                } catch (e) {
                    return t
                }
            }
        }, n.capitalize = function (t) {
            return t || 0 === t ? (t = t.toString(), t.charAt(0).toUpperCase() + t.slice(1)) : ""
        }, n.uppercase = function (t) {
            return t || 0 === t ? t.toString().toUpperCase() : ""
        }, n.lowercase = function (t) {
            return t || 0 === t ? t.toString().toLowerCase() : ""
        };
        var i = /(\d{3})(?=\d)/g;
        n.currency = function (t, e) {
            if (t = parseFloat(t), !isFinite(t) || !t && 0 !== t) return "";
            e = null != e ? e : "$";
            var n = Math.abs(t).toFixed(2),
                r = n.slice(0, -3),
                o = r.length % 3,
                a = o > 0 ? r.slice(0, o) + (r.length > 3 ? "," : "") : "",
                s = n.slice(-3);
            return e + (t < 0 ? "-" : "") + a + r.slice(o).replace(i, "$1,") + s
        }, n.pluralize = function (t) {
            var e = r.toArray(arguments, 1);
            return e.length > 1 ? e[t % 10 - 1] || e[e.length - 1] : e[0] + (1 === t ? "" : "s")
        };
        var o = {
            esc: 27,
            tab: 9,
            enter: 13,
            space: 32,
            delete: 46,
            up: 38,
            left: 37,
            right: 39,
            down: 40
        };
        n.key = function (t, e) {
            if (t) {
                var n = o[e];
                return n || (n = parseInt(e, 10)),
                    function (e) {
                        if (e.keyCode === n) return t.call(this, e)
                    }
            }
        }, n.key.keyCodes = o, n.debounce = function (t, e) {
            if (t) return e || (e = 300), r.debounce(t, e)
        }, r.extend(n, t("./array-filters"))
    }, {
        "../util": 78,
        "./array-filters": 52
    }],
    54: [function (t, e, n) {
        function r(t, e) {
            this.vm = t;
            var n, r = "string" == typeof e;
            r || i.isTemplate(e) ? n = a.parse(e, true) : (n = document.createDocumentFragment(), n.appendChild(e)), this.template = n;
            var s, l = t.constructor.cid;
            if (l > 0) {
                var c = l + (r ? e : e.outerHTML);
                s = u.get(c), s || (s = o.compile(n, t.$options, true), u.put(c, s))
            } else s = o.compile(n, t.$options, true);
            this.linker = s
        }
        var i = t("../util"),
            o = t("../compiler"),
            a = t("../parsers/template"),
            s = t("./fragment"),
            l = t("../cache"),
            u = new l(5e3);
        r.prototype.create = function (t, e, n) {
            var r = a.clone(this.template);
            return new s(this.linker, this.vm, r, t, e, n)
        }, e.exports = r
    }, {
        "../cache": 19,
        "../compiler": 22,
        "../parsers/template": 69,
        "../util": 78,
        "./fragment": 55
    }],
    55: [function (t, e, n) {
        function r(t, e, n, r, l, u) {
            this.children = [], this.childFrags = [], this.vm = e, this.scope = l, this.inserted = false, this.parentFrag = u, u && u.childFrags.push(this), this.unlink = t(e, n, r, l, this), (this.single = 1 === n.childNodes.length) ? (this.node = n.childNodes[0], this.before = i, this.remove = o) : (this.node = c.createAnchor("fragment-start"), this.end = c.createAnchor("fragment-end"), this.nodes = c.toArray(n.childNodes), this.before = a, this.remove = s), this.node.__vfrag__ = this
        }

        function i(t, e) {
            (false !== e ? f.before : c.before)(this.node, t, this.vm), this.inserted = true, c.inDoc(this.node) && this.callHook(l)
        }

        function o() {
            var t = c.inDoc(this.node);
            f.remove(this.node, this.vm), this.inserted = false, t && this.callHook(u)
        }

        function a(t, e) {
            c.before(this.node, t);
            for (var n = this.nodes, r = this.vm, i = false !== e ? f.before : c.before, o = 0, a = n.length; o < a; o++) i(n[o], t, r);
            c.before(this.end, t), this.inserted = true, c.inDoc(this.node) && this.callHook(l)
        }

        function s() {
            for (var t, e = c.inDoc(this.node), n = this.node.parentNode, r = this.node.nextSibling, i = this.nodes = [], o = this.vm; r !== this.end;) i.push(r), t = r.nextSibling, f.remove(r, o), r = t;
            n.removeChild(this.node), n.removeChild(this.end), this.inserted = false, e && this.callHook(u)
        }

        function l(t) {
            t._isAttached || t._callHook("attached")
        }

        function u(t) {
            t._isAttached && t._callHook("detached")
        }
        var c = t("../util"),
            f = t("../transition");
        r.prototype.callHook = function (t) {
            var e, n;
            for (e = 0, n = this.children.length; e < n; e++) t(this.children[e]);
            for (e = 0, n = this.childFrags.length; e < n; e++) this.childFrags[e].callHook(t)
        }, r.prototype.destroy = function () {
            this.parentFrag && this.parentFrag.childFrags.$remove(this), this.unlink()
        }, e.exports = r
    }, {
        "../transition": 71,
        "../util": 78
    }],
    56: [function (t, e, n) {
        function r(t, e) {
            for (var n, r, i = e.attributes, o = 0, a = i.length; o < a; o++) n = i[o].name, p.test(n) && (n = n.replace(p, ""), r = (t._scope || t._context).$eval(i[o].value, true), t.$on(n.replace(p), r))
        }

        function i(t, e, n) {
            if (n) {
                var r, i, a, s;
                for (i in n)
                    if (r = n[i], c.isArray(r))
                        for (a = 0, s = r.length; a < s; a++) o(t, e, i, r[a]);
                    else o(t, e, i, r)
            }
        }

        function o(t, e, n, r, i) {
            var a = typeof r;
            if ("function" === a) t[e](n, r, i);
            else if ("string" === a) {
                var s = t.$options.methods,
                    l = s && s[r];
                l && t[e](n, l, i)
            } else r && "object" === a && o(t, e, n, r.handler, r)
        }

        function a() {
            this._isAttached || (this._isAttached = true, this.$children.forEach(s))
        }

        function s(t) {
            !t._isAttached && f(t.$el) && t._callHook("attached")
        }

        function l() {
            this._isAttached && (this._isAttached = false, this.$children.forEach(u))
        }

        function u(t) {
            t._isAttached && !f(t.$el) && t._callHook("detached")
        }
        var c = t("../util"),
            f = c.inDoc,
            p = /^v-on:|^@/;
        n._initEvents = function () {
            var t = this.$options;
            t._asComponent && r(this, t.el), i(this, "$on", t.events), i(this, "$watch", t.watch)
        }, n._initDOMHooks = function () {
            this.$on("hook:attached", a), this.$on("hook:detached", l)
        }, n._callHook = function (t) {
            var e = this.$options[t];
            if (e)
                for (var n = 0, r = e.length; n < r; n++) e[n].call(this);
            this.$emit("hook:" + t)
        }
    }, {
        "../util": 78
    }],
    57: [function (t, e, n) {
        var r = t("../util").mergeOptions;
        n._init = function (t) {
            t = t || {}, this.$el = null, this.$parent = t._parent, this.$root = t._root || this, this.$children = [], this.$ = {}, this.$$ = {}, this._watchers = [], this._directives = [], this._childCtors = {}, this._isVue = true, this._events = {}, this._eventsCount = {}, this._shouldPropagate = false, this._isFragment = false, this._fragmentStart = this._fragmentEnd = null, this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = false, this._unlinkFn = null, this._context = t._context || t._parent, this._scope = t._scope, t._ref && ((this._scope || this._context).$[t._ref] = this), this._frag = t._frag, this._frag && this._frag.children.push(this), this.$parent && this.$parent.$children.push(this), this._reused = false, this._staggerOp = null, t = this.$options = r(this.constructor.options, t, this), this._data = {}, this._initState(), this._initEvents(), this._callHook("created"), t.el && this.$mount(t.el)
        }
    }, {
        "../util": 78
    }],
    58: [function (t, e, n) {
        var r = t("../util"),
            i = t("../directive"),
            o = t("../compiler");
        n._compile = function (t) {
            var e = this.$options;
            if (e._linkFn) this._initElement(t), this._unlinkFn = e._linkFn(this, t);
            else {
                var n = t;
                t = o.transclude(t, e), this._initElement(t);
                var i, a = o.compileRoot(t, e),
                    s = this.constructor;
                e._linkerCachable && ((i = s.linker) || (i = s.linker = o.compile(t, e)));
                var l = a(this, t, this._scope),
                    u = i ? i(this, t) : o.compile(t, e)(this, t);
                this._unlinkFn = function () {
                    l(), u(true)
                }, e.replace && r.replace(n, t)
            }
            return t
        }, n._initElement = function (t) {
            t instanceof DocumentFragment ? (this._isFragment = true, this.$el = this._fragmentStart = t.firstChild, this._fragmentEnd = t.lastChild, 3 === this._fragmentStart.nodeType && (this._fragmentStart.data = this._fragmentEnd.data = ""), this._blockFragment = t) : this.$el = t, this.$el.__vue__ = this, this._callHook("beforeCompile")
        }, n._bindDir = function (t, e, n, r, o, a, s, l, u) {
            this._directives.push(new i(t, e, this, n, r, o, a, s, l, u))
        }, n._destroy = function (t, e) {
            if (!this._isBeingDestroyed) {
                this._callHook("beforeDestroy"), this._isBeingDestroyed = true;
                var n, r = this.$parent;
                for (r && !r._isBeingDestroyed && r.$children.$remove(this), this._frag && this._frag.children.$remove(this), n = this.$children.length; n--;) this.$children[n].$destroy();
                for (this._propsUnlinkFn && this._propsUnlinkFn(), this._unlinkFn && this._unlinkFn(), n = this._watchers.length; n--;) this._watchers[n].teardown();
                var i = this.$options._ref;
                if (i) {
                    var o = this._scope || this._context;
                    o.$[i] === this && (o.$[i] = null)
                }
                this.$el && (this.$el.__vue__ = null);
                var a = this;
                t && this.$el ? this.$remove(function () {
                    a._cleanup()
                }) : e || this._cleanup()
            }
        }, n._cleanup = function () {
            this._data.__ob__ && this._data.__ob__.removeVm(this), this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null, this._isDestroyed = true, this._callHook("destroyed"), this.$off()
        }
    }, {
        "../compiler": 22,
        "../directive": 26,
        "../util": 78
    }],
    59: [function (t, e, n) {
        var r = t("../util");
        n._applyFilters = function (t, e, n, i) {
            var o, a, s, l, u, c, f, p, h;
            for (c = 0, f = n.length; c < f; c++)
                if (o = n[c], (a = r.resolveAsset(this.$options, "filters", o.name)) && "function" == typeof (a = i ? a.write : a.read || a)) {
                    if (s = i ? [t, e] : [t], u = i ? 2 : 1, o.args)
                        for (p = 0, h = o.args.length; p < h; p++) l = o.args[p], s[p + u] = l.dynamic ? this.$get(l.value) : l.value;
                    t = a.apply(this, s)
                }
            return t
        }, n._resolveComponent = function (t, e) {
            var n = r.resolveAsset(this.$options, "components", t);
            if (n)
                if (n.options) e(n);
                else if (n.resolved) e(n.resolved);
            else if (n.requested) n.pendingCallbacks.push(e);
            else {
                n.requested = true;
                var i = n.pendingCallbacks = [e];
                n(function (t) {
                    r.isPlainObject(t) && (t = r.Vue.extend(t)), n.resolved = t;
                    for (var e = 0, o = i.length; e < o; e++) i[e](t)
                }, function (t) {})
            }
        }
    }, {
        "../util": 78
    }],
    60: [function (t, e, n) {
        function r() {}

        function i(t, e) {
            var n = new u(e, t, null, {
                lazy: true
            });
            return function () {
                return n.dirty && n.evaluate(), l.target && n.depend(), n.value
            }
        }
        var o = t("../util"),
            a = t("../compiler"),
            s = t("../observer"),
            l = t("../observer/dep"),
            u = t("../watcher");
        n._initState = function () {
            this._initProps(), this._initMeta(), this._initMethods(), this._initData(), this._initComputed()
        }, n._initProps = function () {
            var t = this.$options,
                e = t.el,
                n = t.props;
            e = t.el = o.query(e), this._propsUnlinkFn = e && 1 === e.nodeType && n ? a.compileAndLinkProps(this, e, n, this._scope) : null
        }, n._initData = function () {
            var t = this._data,
                e = this.$options.data,
                n = e && e();
            if (n) {
                this._data = n;
                for (var r in t) null === this._props[r].raw && n.hasOwnProperty(r) || n.$set(r, t[r])
            }
            var i, a, l = this._data,
                u = Object.keys(l);
            for (i = u.length; i--;) a = u[i], o.isReserved(a) || this._proxy(a);
            s.create(l, this)
        }, n._setData = function (t) {
            t = t || {};
            var e = this._data;
            this._data = t;
            var n, r, i, a = this.$options.props;
            if (a)
                for (i = a.length; i--;) "$data" === (r = a[i].name) || t.hasOwnProperty(r) || t.$set(r, e[r]);
            for (n = Object.keys(e), i = n.length; i--;) r = n[i], o.isReserved(r) || r in t || this._unproxy(r);
            for (n = Object.keys(t), i = n.length; i--;) r = n[i], this.hasOwnProperty(r) || o.isReserved(r) || this._proxy(r);
            e.__ob__.removeVm(this), s.create(t, this), this._digest()
        }, n._proxy = function (t) {
            var e = this;
            Object.defineProperty(e, t, {
                configurable: true,
                enumerable: true,
                get: function () {
                    return e._data[t]
                },
                set: function (n) {
                    e._data[t] = n
                }
            })
        }, n._unproxy = function (t) {
            delete this[t]
        }, n._digest = function () {
            for (var t = this._watchers.length; t--;) this._watchers[t].update(true);
            var e = this.$children;
            for (t = e.length; t--;) {
                var n = e[t];
                n.$options.inherit && n._digest()
            }
        }, n._initComputed = function () {
            var t = this.$options.computed;
            if (t)
                for (var e in t) {
                    var n = t[e],
                        a = {
                            enumerable: true,
                            configurable: true
                        };
                    "function" == typeof n ? (a.get = i(n, this), a.set = r) : (a.get = n.get ? false !== n.cache ? i(n.get, this) : o.bind(n.get, this) : r, a.set = n.set ? o.bind(n.set, this) : r), Object.defineProperty(this, e, a)
                }
        }, n._initMethods = function () {
            var t = this.$options.methods;
            if (t)
                for (var e in t) this[e] = o.bind(t[e], this)
        }, n._initMeta = function () {
            var t = this.$options._meta;
            if (t)
                for (var e in t) o.defineReactive(this, e, t[e])
        }
    }, {
        "../compiler": 22,
        "../observer": 63,
        "../observer/dep": 62,
        "../util": 78,
        "../watcher": 82
    }],
    61: [function (t, e, n) {
        var r = t("../util"),
            i = Array.prototype,
            o = Object.create(i);
        ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(function (t) {
            var e = i[t];
            r.define(o, t, function () {
                for (var n = arguments.length, r = new Array(n); n--;) r[n] = arguments[n];
                var i, o, a = e.apply(this, r),
                    s = this.__ob__;
                switch (t) {
                    case "push":
                    case "unshift":
                        i = r;
                        break;
                    case "splice":
                        i = r.slice(2), o = a;
                        break;
                    case "pop":
                    case "shift":
                        o = [a]
                }
                return i && s.observeArray(i), o && s.unobserveArray(o), s.notify(), a
            })
        }), r.define(i, "$set", function (t, e) {
            return t >= this.length && (this.length = t + 1), this.splice(t, 1, e)[0]
        }), r.define(i, "$remove", function (t) {
            if (this.length) {
                var e = r.indexOf(this, t);
                return e > -1 ? this.splice(e, 1) : void 0
            }
        }), e.exports = o
    }, {
        "../util": 78
    }],
    62: [function (t, e, n) {
        function r() {
            this.id = o++, this.subs = []
        }
        var i = t("../util"),
            o = 0;
        r.target = null, r.prototype.addSub = function (t) {
            this.subs.push(t)
        }, r.prototype.removeSub = function (t) {
            this.subs.$remove(t)
        }, r.prototype.depend = function () {
            r.target.addDep(this)
        }, r.prototype.notify = function () {
            for (var t = i.toArray(this.subs), e = 0, n = t.length; e < n; e++) t[e].update()
        }, e.exports = r
    }, {
        "../util": 78
    }],
    63: [function (t, e, n) {
        function r(t) {
            if (this.value = t, this.dep = new u, s.define(t, "__ob__", this), s.isArray(t)) {
                (l.proto && s.hasProto ? i : o)(t, c, f), this.observeArray(t)
            } else this.walk(t)
        }

        function i(t, e) {
            t.__proto__ = e
        }

        function o(t, e, n) {
            for (var r, i = n.length; i--;) r = n[i], s.define(t, r, e[r])
        }

        function a(t, e, n) {
            var i = new u,
                o = r.create(n);
            Object.defineProperty(t, e, {
                enumerable: true,
                configurable: true,
                get: function () {
                    return u.target && (i.depend(), o && o.dep.depend()), n
                },
                set: function (t) {
                    t !== n && (n = t, o = r.create(t), i.notify())
                }
            })
        }
        var s = t("../util"),
            l = t("../config"),
            u = t("./dep"),
            c = t("./array"),
            f = Object.getOwnPropertyNames(c);
        t("./object"), r.create = function (t, e) {
            if (t && "object" == typeof t) {
                var n;
                return t.hasOwnProperty("__ob__") && t.__ob__ instanceof r ? n = t.__ob__ : !s.isArray(t) && !s.isPlainObject(t) || Object.isFrozen(t) || t._isVue || (n = new r(t)), n && e && n.addVm(e), n
            }
        }, r.prototype.walk = function (t) {
            for (var e = Object.keys(t), n = e.length; n--;) this.convert(e[n], t[e[n]])
        }, r.prototype.observeArray = function (t) {
            for (var e = t.length; e--;) {
                var n = r.create(t[e]);
                n && (n.parents || (n.parents = [])).push(this)
            }
        }, r.prototype.unobserveArray = function (t) {
            for (var e = t.length; e--;) {
                var n = t[e] && t[e].__ob__;
                n && n.parents.$remove(this)
            }
        }, r.prototype.notify = function () {
            this.dep.notify();
            var t = this.parents;
            if (t)
                for (var e = t.length; e--;) t[e].notify()
        }, r.prototype.convert = function (t, e) {
            a(this.value, t, e)
        }, r.prototype.addVm = function (t) {
            (this.vms || (this.vms = [])).push(t)
        }, r.prototype.removeVm = function (t) {
            this.vms.$remove(t)
        }, s.defineReactive = a, e.exports = r
    }, {
        "../config": 24,
        "../util": 78,
        "./array": 61,
        "./dep": 62,
        "./object": 64
    }],
    64: [function (t, e, n) {
        var r = t("../util"),
            i = Object.prototype;
        r.define(i, "$add", function (t, e) {
            o(this, t, e)
        });
        var o = n.add = function (t, e, n) {
            if (!t.hasOwnProperty(e)) {
                if (t._isVue) return void o(t._data, e, n);
                var r = t.__ob__;
                if (!r) return void(t[e] = n);
                if (r.convert(e, n), r.notify(), r.vms)
                    for (var i = r.vms.length; i--;) {
                        var a = r.vms[i];
                        a._proxy(e), a._digest()
                    }
            }
        };
        r.define(i, "$set", function (t, e) {
            o(this, t, e), this[t] = e
        }), r.define(i, "$delete", function (t) {
            if (this.hasOwnProperty(t)) {
                delete this[t];
                var e = this.__ob__;
                if (e && (e.notify(), e.vms))
                    for (var n = e.vms.length; n--;) {
                        var r = e.vms[n];
                        r._unproxy(t), r._digest()
                    }
            }
        })
    }, {
        "../util": 78
    }],
    65: [function (t, e, n) {
        function r() {
            var t, e = o.slice(c, l).trim();
            if (e) {
                t = {};
                var n = e.match(b);
                t.name = n[0], n.length > 1 && (t.args = n.slice(1).map(i))
            }
            t && (a.filters = a.filters || []).push(t), c = l + 1
        }

        function i(t) {
            var e = x.test(t) ? t : g.stripQuotes(t),
                n = false === e;
            return {
                value: n ? t : e,
                dynamic: n
            }
        }
        var o, a, s, l, u, c, f, p, h, d, v, g = t("../util"),
            m = t("../cache"),
            y = new m(1e3),
            b = /[^\s'"]+|'[^']*'|"[^"]*"/g,
            x = /^in$|^-?\d+/;
        n.parse = function (t) {
            var e = y.get(t);
            if (e) return e;
            for (o = t, f = p = false, h = d = v = 0, c = 0, a = {}, l = 0, u = o.length; l < u; l++)
                if (s = o.charCodeAt(l), f) 39 === s && (f = !f);
                else if (p) 34 === s && (p = !p);
            else if (124 === s && 124 !== o.charCodeAt(l + 1) && 124 !== o.charCodeAt(l - 1)) null == a.expression ? (c = l + 1, a.expression = o.slice(0, l).trim()) : r();
            else switch (s) {
                case 34:
                    p = true;
                    break;
                case 39:
                    f = true;
                    break;
                case 40:
                    v++;
                    break;
                case 41:
                    v--;
                    break;
                case 91:
                    d++;
                    break;
                case 93:
                    d--;
                    break;
                case 123:
                    h++;
                    break;
                case 125:
                    h--
            }
            return null == a.expression ? a.expression = o.slice(0, l).trim() : 0 !== c && r(), y.put(t, a), a
        }
    }, {
        "../cache": 19,
        "../util": 78
    }],
    66: [function (t, e, n) {
        function r() {
            y.raw = a.slice(v, l).trim(), void 0 === y.expression ? y.expression = a.slice(g, l).trim() : b !== v && i(), (0 === l || y.expression) && m.push(y)
        }

        function i() {
            var t, e = a.slice(b, l).trim();
            if (e) {
                t = {};
                var n = e.match(A);
                t.name = n[0], n.length > 1 && (t.args = n.slice(1).map(o))
            }
            t && (y.filters = y.filters || []).push(t), b = l + 1
        }

        function o(t) {
            var e = T.test(t) ? t : _.stripQuotes(t),
                n = false === e;
            return {
                value: n ? t : e,
                dynamic: n
            }
        }
        var a, s, l, u, c, f, p, h, d, v, g, m, y, b, x, _ = t("../util"),
            w = t("../cache"),
            C = new w(1e3),
            k = /^[^\{\?]+$|^'[^']*'$|^"[^"]*"$/,
            A = /[^\s'"]+|'[^']*'|"[^"]*"/g,
            T = /^in$|^-?\d+/;
        n.parse = function (t) {
            var e = C.get(t);
            if (e) return e;
            for (a = t, c = f = false, p = h = d = v = g = 0, b = 0, m = [], y = {}, x = null, l = 0, u = a.length; l < u; l++)
                if (s = a.charCodeAt(l), c) 39 === s && (c = !c);
                else if (f) 34 === s && (f = !f);
            else if (44 !== s || d || p || h)
                if (58 !== s || y.expression || y.arg)
                    if (124 === s && 124 !== a.charCodeAt(l + 1) && 124 !== a.charCodeAt(l - 1)) void 0 === y.expression ? (b = l + 1, y.expression = a.slice(g, l).trim()) : i();
                    else switch (s) {
                        case 34:
                            f = true;
                            break;
                        case 39:
                            c = true;
                            break;
                        case 40:
                            d++;
                            break;
                        case 41:
                            d--;
                            break;
                        case 91:
                            h++;
                            break;
                        case 93:
                            h--;
                            break;
                        case 123:
                            p++;
                            break;
                        case 125:
                            p--
                    } else x = a.slice(v, l).trim(), k.test(x) && (g = l + 1, y.arg = _.stripQuotes(x) || x);
            else r(), y = {}, v = g = b = l + 1;
            return 0 !== l && v === l || r(), C.put(t, m), m
        }
    }, {
        "../cache": 19,
        "../util": 78
    }],
    67: [function (t, e, n) {
        function r(t, e) {
            var n = A.length;
            return A[n] = e ? t.replace(b, "\\n") : t, '"' + n + '"'
        }

        function i(t) {
            var e = t.charAt(0),
                n = t.slice(1);
            return v.test(n) ? t : (n = n.indexOf('"') > -1 ? n.replace(_, o) : n, e + "scope." + n)
        }

        function o(t, e) {
            return A[e]
        }

        function a(t, e) {
            m.test(t), A.length = 0;
            var n = t.replace(x, r).replace(y, "");
            n = (" " + n).replace(C, i).replace(_, o);
            var a = l(n);
            if (a) return {
                get: a,
                body: n,
                set: e ? u(n) : null
            }
        }

        function s(t) {
            var e, n;
            return t.indexOf("[") < 0 ? (n = t.split("."), n.raw = t, e = f.compileGetter(n)) : (n = f.parse(t), e = n.get), {
                get: e,
                set: function (t, e) {
                    f.set(t, n, e)
                }
            }
        }

        function l(t) {
            try {
                return new Function("scope", "return " + t + ";")
            } catch (t) {}
        }

        function u(t) {
            try {
                return new Function("scope", "value", t + "=value;")
            } catch (t) {}
        }

        function c(t) {
            t.set || (t.set = u(t.body))
        }
        var f = (t("../util"), t("./path")),
            p = t("../cache"),
            h = new p(1e3),
            d = "Math,Date,this,true,false,null,undefined,Infinity,NaN,isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,parseInt,parseFloat",
            v = new RegExp("^(" + d.replace(/,/g, "\\b|") + "\\b)"),
            g = "break,case,class,catch,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,let,return,super,switch,throw,try,var,while,with,yield,enum,await,implements,package,proctected,static,interface,private,public",
            m = new RegExp("^(" + g.replace(/,/g, "\\b|") + "\\b)"),
            y = /\s/g,
            b = /\n/g,
            x = /[\{,]\s*[\w\$_]+\s*:|('[^']*'|"[^"]*")|new |typeof |void /g,
            _ = /"(\d+)"/g,
            w = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/,
            C = /[^\w$\.]([A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\])*)/g,
            k = /^(true|false)$/,
            A = [];
        n.parse = function (t, e) {
            t = t.trim();
            var r = h.get(t);
            if (r) return e && c(r), r;
            var i = n.isSimplePath(t) ? s(t) : a(t, e);
            return h.put(t, i), i
        }, n.isSimplePath = function (t) {
            return w.test(t) && !k.test(t) && "Math." !== t.slice(0, 5)
        }
    }, {
        "../cache": 19,
        "../util": 78,
        "./path": 68
    }],
    68: [function (t, e, n) {
        function r(t) {
            if (void 0 === t) return "eof";
            var e = t.charCodeAt(0);
            switch (e) {
                case 91:
                case 93:
                case 46:
                case 34:
                case 39:
                case 48:
                    return t;
                case 95:
                case 36:
                    return "ident";
                case 32:
                case 9:
                case 10:
                case 13:
                case 160:
                case 65279:
                case 8232:
                case 8233:
                    return "ws"
            }
            return e >= 97 && e <= 122 || e >= 65 && e <= 90 ? "ident" : e >= 49 && e <= 57 ? "number" : "else"
        }

        function i(t) {
            var e, n, i, o, a, s, l, u = [],
                c = -1,
                b = h,
                x = [];
            for (x[p] = function () {
                    void 0 !== i && (u.push(i), i = void 0)
                }, x[f] = function () {
                    void 0 === i ? i = n : i += n
                }; null != b;)
                if (c++, "\\" !== (e = t[c]) || ! function () {
                        var e = t[c + 1];
                        if (b === d && "'" === e || b === v && '"' === e) return c++, n = e, x[f](), true
                    }()) {
                    if (o = r(e), l = y[b], (a = l[o] || l.else || m) === m) return;
                    if (b = a[0], s = x[a[1]], s && (n = a[2], n = void 0 === n ? e : "*" === n ? n + e : n, s()), b === g) return u.raw = t, u
                }
        }

        function o(t) {
            return c.test(t) ? "." + t : +t == t >>> 0 ? "[" + t + "]" : "*" === t.charAt(0) ? "[o" + o(t.slice(1)) + "]" : '["' + t.replace(/"/g, '\\"') + '"]'
        }
        var a = t("../util"),
            s = t("../observer/object").add,
            l = t("../cache"),
            u = new l(1e3),
            c = n.identRE = /^[$_a-zA-Z]+[\w$]*$/,
            f = 0,
            p = 1,
            h = 0,
            d = 7,
            v = 8,
            g = 11,
            m = 12,
            y = [];
        y[h] = {
            ws: [h],
            ident: [3, f],
            "[": [4],
            eof: [g]
        }, y[1] = {
            ws: [1],
            ".": [2],
            "[": [4],
            eof: [g]
        }, y[2] = {
            ws: [2],
            ident: [3, f]
        }, y[3] = {
            ident: [3, f],
            0: [3, f],
            number: [3, f],
            ws: [1, p],
            ".": [2, p],
            "[": [4, p],
            eof: [g, p]
        }, y[4] = {
            ws: [4],
            0: [5, f],
            number: [6, f],
            "'": [d, f, ""],
            '"': [v, f, ""],
            ident: [9, f, "*"]
        }, y[5] = {
            ws: [10, p],
            "]": [1, p]
        }, y[6] = {
            0: [6, f],
            number: [6, f],
            ws: [10],
            "]": [1, p]
        }, y[d] = {
            "'": [10],
            eof: m,
            else: [d, f]
        }, y[v] = {
            '"': [10],
            eof: m,
            else: [v, f]
        }, y[9] = {
            ident: [9, f],
            0: [9, f],
            number: [9, f],
            ws: [10],
            "]": [1, p]
        }, y[10] = {
            ws: [10],
            "]": [1, p]
        }, n.compileGetter = function (t) {
            var e = "return o" + t.map(o).join("");
            return new Function("o", e)
        }, n.parse = function (t) {
            var e = u.get(t);
            return e || (e = i(t)) && (e.get = n.compileGetter(e), u.put(t, e)), e
        }, n.get = function (t, e) {
            if (e = n.parse(e)) return e.get(t)
        };
        n.set = function (t, e, r) {
            var i = t;
            if ("string" == typeof e && (e = n.parse(e)), !e || !a.isObject(t)) return false;
            for (var o, l, u = 0, c = e.length; u < c; u++) o = t, l = e[u], "*" === l.charAt(0) && (l = i[l.slice(1)]), u < c - 1 ? (t = t[l], a.isObject(t) || (t = {}, s(o, l, t))) : a.isArray(t) ? t.$set(l, r) : l in t ? t[l] = r : s(t, l, r);
            return true
        }
    }, {
        "../cache": 19,
        "../observer/object": 64,
        "../util": 78
    }],
    69: [function (t, e, n) {
        function r(t) {
            return a.isTemplate(t) && t.content instanceof DocumentFragment
        }

        function i(t) {
            var e = l.get(t);
            if (e) return e;
            var n = document.createDocumentFragment(),
                r = t.match(f),
                i = p.test(t);
            if (r || i) {
                var o = r && r[1],
                    a = c[o] || c._default,
                    s = a[0],
                    u = a[1],
                    h = a[2],
                    d = document.createElement("div");
                for (d.innerHTML = u + t.trim() + h; s--;) d = d.lastChild;
                for (var v; v = d.firstChild;) n.appendChild(v)
            } else n.appendChild(document.createTextNode(t));
            return l.put(t, n), n
        }

        function o(t) {
            if (r(t)) return a.trimNode(t.content), t.content;
            if ("SCRIPT" === t.tagName) return i(t.textContent);
            for (var e, o = n.clone(t), s = document.createDocumentFragment(); e = o.firstChild;) s.appendChild(e);
            return a.trimNode(s), s
        }
        var a = t("../util"),
            s = t("../cache"),
            l = new s(1e3),
            u = new s(1e3),
            c = {
                _default: [0, "", ""],
                legend: [1, "<fieldset>", "</fieldset>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"]
            };
        c.td = c.th = [3, "<table><tbody><tr>", "</tr></tbody></table>"], c.option = c.optgroup = [1, '<select multiple="multiple">', "</select>"], c.thead = c.tbody = c.colgroup = c.caption = c.tfoot = [1, "<table>", "</table>"], c.g = c.defs = c.symbol = c.use = c.image = c.text = c.circle = c.ellipse = c.line = c.path = c.polygon = c.polyline = c.rect = [1, '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events"version="1.1">', "</svg>"];
        var f = /<([\w:]+)/,
            p = /&\w+;|&#\d+;|&#x[\dA-F]+;/,
            h = function () {
                if (a.inBrowser) {
                    var t = document.createElement("div");
                    return t.innerHTML = "<template>1</template>", !t.cloneNode(true).firstChild.innerHTML
                }
                return false
            }(),
            d = function () {
                if (a.inBrowser) {
                    var t = document.createElement("textarea");
                    return t.placeholder = "t", "t" === t.cloneNode(true).value
                }
                return false
            }();
        n.clone = function (t) {
            if (!t.querySelectorAll) return t.cloneNode();
            var e, i, o, a = t.cloneNode(true);
            if (h) {
                var s = a;
                if (r(t) && (t = t.content, s = a.content), i = t.querySelectorAll("template"), i.length)
                    for (o = s.querySelectorAll("template"), e = o.length; e--;) o[e].parentNode.replaceChild(n.clone(i[e]), o[e])
            }
            if (d)
                if ("TEXTAREA" === t.tagName) a.value = t.value;
                else if (i = t.querySelectorAll("textarea"), i.length)
                for (o = a.querySelectorAll("textarea"), e = o.length; e--;) o[e].value = i[e].value;
            return a
        }, n.parse = function (t, e, r) {
            var s, l;
            return t instanceof DocumentFragment ? (a.trimNode(t), e ? n.clone(t) : t) : ("string" == typeof t ? r || "#" !== t.charAt(0) ? l = i(t) : (l = u.get(t)) || (s = document.getElementById(t.slice(1))) && (l = o(s), u.put(t, l)) : t.nodeType && (l = o(t)), l && e ? n.clone(l) : l)
        }
    }, {
        "../cache": 19,
        "../util": 78
    }],
    70: [function (t, e, n) {
        function r(t) {
            return t.replace(p, "\\$&")
        }

        function i(t, e, n) {
            return t.tag ? e && t.oneTime ? '"' + e.$eval(t.value) + '"' : o(t.value, n) : '"' + t.value + '"'
        }

        function o(t, e) {
            if (h.test(t)) {
                var n = f.parse(t)[0];
                return n.filters ? "this._applyFilters(" + n.expression + ",null," + JSON.stringify(n.filters) + ",false)" : "(" + t + ")"
            }
            return e ? t : "(" + t + ")"
        }
        var a, s, l, u = t("../cache"),
            c = t("../config"),
            f = t("./directive"),
            p = /[-.*+?^${}()|[\]\/\\]/g;
        n.compileRegex = function () {
            var t = r(c.delimiters[0]),
                e = r(c.delimiters[1]),
                n = r(c.unsafeDelimiters[0]),
                i = r(c.unsafeDelimiters[1]);
            s = new RegExp(n + "(.+?)" + i + "|" + t + "(.+?)" + e, "g"), l = new RegExp("^" + n + ".*" + i + "$"), a = new u(1e3)
        }, n.parse = function (t) {
            a || n.compileRegex();
            var e = a.get(t);
            if (e) return e;
            if (t = t.replace(/\n/g, ""), !s.test(t)) return null;
            for (var r, i, o, u, c, f, p, h = [], d = s.lastIndex = 0; r = s.exec(t);) i = r.index, i > d && h.push({
                value: t.slice(d, i)
            }), o = l.test(r[0]), u = o ? r[1] : r[2], c = u.charCodeAt(0), f = 42 === c, p = 38 === c || 64 === c, u = f || p ? u.slice(1) : u, h.push({
                tag: true,
                value: u.trim(),
                html: o,
                oneTime: f,
                twoWay: p
            }), d = i + r[0].length;
            return d < t.length && h.push({
                value: t.slice(d)
            }), a.put(t, h), h
        }, n.tokensToExp = function (t, e) {
            return t.length > 1 ? t.map(function (t) {
                return i(t, e)
            }).join("+") : i(t[0], e, true)
        };
        var h = /[^|]\|[^|]/
    }, {
        "../cache": 19,
        "../config": 24,
        "./directive": 66
    }],
    71: [function (t, e, n) {
        var r = t("../util");
        n.append = function (t, e, n, r) {
            i(t, 1, function () {
                e.appendChild(t)
            }, n, r)
        }, n.before = function (t, e, n, o) {
            i(t, 1, function () {
                r.before(t, e)
            }, n, o)
        }, n.remove = function (t, e, n) {
            i(t, -1, function () {
                r.remove(t)
            }, e, n)
        }, n.removeThenAppend = function (t, e, n, r) {
            i(t, -1, function () {
                e.appendChild(t)
            }, n, r)
        };
        var i = n.apply = function (t, e, n, i, o) {
            var a = t.__v_trans;
            if (!a || !a.hooks && !r.transitionEndEvent || !i._isCompiled || i.$parent && !i.$parent._isCompiled) return n(), void(o && o());
            a[e > 0 ? "enter" : "leave"](n, o)
        }
    }, {
        "../util": 78
    }],
    72: [function (t, e, n) {
        function r() {
            for (var t = document.documentElement.offsetHeight, e = 0; e < o.length; e++) o[e]();
            return o = [], a = false, t
        }
        var i = t("../util"),
            o = [],
            a = false;
        n.push = function (t) {
            o.push(t), a || (a = true, i.nextTick(r))
        }
    }, {
        "../util": 78
    }],
    73: [function (t, e, n) {
        function r(t, e, n, r) {
            this.id = e, this.el = t, this.enterClass = e + "-enter", this.leaveClass = e + "-leave", this.hooks = n, this.vm = r, this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null, this.justEntered = false, this.entered = this.left = false, this.typeCache = {};
            var i = this;
            ["enterNextTick", "enterDone", "leaveNextTick", "leaveDone"].forEach(function (t) {
                i[t] = o.bind(i[t], i)
            })
        }

        function i(t) {
            return "none" === t.style.display || "hidden" === t.style.visibility || t.hidden
        }
        var o = t("../util"),
            a = t("./queue"),
            s = o.addClass,
            l = o.removeClass,
            u = o.transitionEndEvent,
            c = o.animationEndEvent,
            f = o.transitionProp + "Duration",
            p = o.animationProp + "Duration",
            h = r.prototype;
        h.enter = function (t, e) {
            this.cancelPending(), this.callHook("beforeEnter"), this.cb = e, s(this.el, this.enterClass), t(), this.entered = false, this.callHookWithCb("enter"), this.entered || (this.cancel = this.hooks && this.hooks.enterCancelled, a.push(this.enterNextTick))
        }, h.enterNextTick = function () {
            this.justEntered = true, o.nextTick(function () {
                this.justEntered = false
            }, this);
            var t = this.enterDone,
                e = this.getCssTransitionType(this.enterClass);
            this.pendingJsCb ? 1 === e && l(this.el, this.enterClass) : 1 === e ? (l(this.el, this.enterClass), this.setupCssCb(u, t)) : 2 === e ? this.setupCssCb(c, t) : t()
        }, h.enterDone = function () {
            this.entered = true, this.cancel = this.pendingJsCb = null, l(this.el, this.enterClass), this.callHook("afterEnter"), this.cb && this.cb()
        }, h.leave = function (t, e) {
            this.cancelPending(), this.callHook("beforeLeave"), this.op = t, this.cb = e, s(this.el, this.leaveClass), this.left = false, this.callHookWithCb("leave"), this.left || (this.cancel = this.hooks && this.hooks.leaveCancelled, this.op && !this.pendingJsCb && (this.justEntered ? this.leaveDone() : a.push(this.leaveNextTick)))
        }, h.leaveNextTick = function () {
            var t = this.getCssTransitionType(this.leaveClass);
            if (t) {
                var e = 1 === t ? u : c;
                this.setupCssCb(e, this.leaveDone)
            } else this.leaveDone()
        }, h.leaveDone = function () {
            this.left = true, this.cancel = this.pendingJsCb = null, this.op(), l(this.el, this.leaveClass), this.callHook("afterLeave"), this.cb && this.cb(), this.op = null
        }, h.cancelPending = function () {
            this.op = this.cb = null;
            var t = false;
            this.pendingCssCb && (t = true, o.off(this.el, this.pendingCssEvent, this.pendingCssCb), this.pendingCssEvent = this.pendingCssCb = null), this.pendingJsCb && (t = true, this.pendingJsCb.cancel(), this.pendingJsCb = null), t && (l(this.el, this.enterClass), l(this.el, this.leaveClass)), this.cancel && (this.cancel.call(this.vm, this.el), this.cancel = null)
        }, h.callHook = function (t) {
            this.hooks && this.hooks[t] && this.hooks[t].call(this.vm, this.el)
        }, h.callHookWithCb = function (t) {
            var e = this.hooks && this.hooks[t];
            e && (e.length > 1 && (this.pendingJsCb = o.cancellable(this[t + "Done"])), e.call(this.vm, this.el, this.pendingJsCb))
        }, h.getCssTransitionType = function (t) {
            if (!(!u || document.hidden || this.hooks && false === this.hooks.css || i(this.el))) {
                var e = this.typeCache[t];
                if (e) return e;
                var n = this.el.style,
                    r = window.getComputedStyle(this.el),
                    o = n[f] || r[f];
                if (o && "0s" !== o) e = 1;
                else {
                    var a = n[p] || r[p];
                    a && "0s" !== a && (e = 2)
                }
                return e && (this.typeCache[t] = e), e
            }
        }, h.setupCssCb = function (t, e) {
            this.pendingCssEvent = t;
            var n = this,
                r = this.el,
                i = this.pendingCssCb = function (a) {
                    a.target === r && (o.off(r, t, i), n.pendingCssEvent = n.pendingCssCb = null, !n.pendingJsCb && e && e())
                };
            o.on(r, t, i)
        }, e.exports = r
    }, {
        "../util": 78,
        "./queue": 72
    }],
    74: [function (t, e, n) {
        function r(t) {
            var e;
            return (e = i.attr(t, "component")) ? e : (e = t.getAttribute("is"), null != e ? t.removeAttribute("is") : null != (e = i.getBindAttr(t, "is")) && (e = "{{" + e + "}}"), e)
        }
        var i = t("./index");
        n.commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/, n.checkComponent = function (t, e, o) {
            var a = t.tagName.toLowerCase();
            if (n.commonTagRE.test(a) || "component" === a) {
                if (o) return r(t)
            } else {
                if (i.resolveAsset(e, "components", a)) return a;
                var s = o && r(t);
                if (s) return s
            }
        }, n.initProp = function (t, e, r) {
            if (n.assertProp(e, r)) {
                var o = e.path;
                o in t ? i.define(t, o, r, true) : t[o] = r, t._data[o] = r
            }
        }, n.assertProp = function (t, e) {
            if (null === t.raw && !t.required) return true;
            var n, r = t.options,
                o = r.type,
                a = true;
            if (o && (o === String ? (n = "string", a = typeof e === n) : o === Number ? (n = "number", a = "number" == typeof e) : o === Boolean ? (n = "boolean", a = "boolean" == typeof e) : o === Function ? (n = "function", a = "function" == typeof e) : o === Object ? (n = "object", a = i.isPlainObject(e)) : o === Array ? (n = "array", a = i.isArray(e)) : a = e instanceof o), !a) return false;
            var s = r.validator;
            return !(s && !s.call(null, e))
        }
    }, {
        "./index": 78
    }],
    75: [function (t, e, n) {}, {
        "../config": 24,
        "../deprecations": 25
    }],
    76: [function (t, e, n) {
        function r(t, e) {
            e && 3 === e.nodeType && !e.data.trim() && t.removeChild(e)
        }
        var i = t("./index"),
            o = t("../config");
        n.query = function (t) {
            if ("string" == typeof t) {
                t = document.querySelector(t)
            }
            return t
        }, n.inDoc = function (t) {
            var e = document.documentElement,
                n = t && t.parentNode;
            return e === t || e === n || !(!n || 1 !== n.nodeType || !e.contains(n))
        }, n.attr = function (t, e) {
            e = o.prefix + e;
            var n = t.getAttribute(e);
            return null !== n && t.removeAttribute(e), n
        }, n.getBindAttr = function (t, e) {
            var n = ":" + e,
                r = t.getAttribute(n);
            return null === r && (n = o.prefix + "bind:" + e, r = t.getAttribute(n)), null !== r && t.removeAttribute(n), r
        };
        var a = /^v-ref:/;
        n.findRef = function (t) {
            if (t.hasAttributes())
                for (var e = t.attributes, n = 0, r = e.length; n < r; n++) {
                    var o = e[n].name;
                    if (a.test(o)) return t.removeAttribute(o), i.camelize(o.replace(a, ""))
                }
        }, n.before = function (t, e) {
            e.parentNode.insertBefore(t, e)
        }, n.after = function (t, e) {
            e.nextSibling ? n.before(t, e.nextSibling) : e.parentNode.appendChild(t)
        }, n.remove = function (t) {
            t.parentNode.removeChild(t)
        }, n.prepend = function (t, e) {
            e.firstChild ? n.before(t, e.firstChild) : e.appendChild(t)
        }, n.replace = function (t, e) {
            var n = t.parentNode;
            n && n.replaceChild(e, t)
        }, n.on = function (t, e, n) {
            t.addEventListener(e, n)
        }, n.off = function (t, e, n) {
            t.removeEventListener(e, n)
        }, n.addClass = function (t, e) {
            if (t.classList) t.classList.add(e);
            else {
                var n = " " + (t.getAttribute("class") || "") + " ";
                n.indexOf(" " + e + " ") < 0 && t.setAttribute("class", (n + e).trim())
            }
        }, n.removeClass = function (t, e) {
            if (t.classList) t.classList.remove(e);
            else {
                for (var n = " " + (t.getAttribute("class") || "") + " ", r = " " + e + " "; n.indexOf(r) >= 0;) n = n.replace(r, " ");
                t.setAttribute("class", n.trim())
            }
            t.className || t.removeAttribute("class")
        }, n.extractContent = function (t, e) {
            var r, i;
            if (n.isTemplate(t) && t.content instanceof DocumentFragment && (t = t.content), t.hasChildNodes())
                for (n.trimNode(t), i = e ? document.createDocumentFragment() : document.createElement("div"); r = t.firstChild;) i.appendChild(r);
            return i
        }, n.trimNode = function (t) {
            r(t, t.firstChild), r(t, t.lastChild)
        }, n.isTemplate = function (t) {
            return t.tagName && "template" === t.tagName.toLowerCase()
        }, n.createAnchor = function (t, e) {
            return o.debug ? document.createComment(t) : document.createTextNode(e ? " " : "")
        }
    }, {
        "../config": 24,
        "./index": 78
    }],
    77: [function (t, e, n) {
        n.hasProto = "__proto__" in {};
        var r = n.inBrowser = "undefined" != typeof window && "[object Object]" !== Object.prototype.toString.call(window);
        if (n.isIE9 = r && navigator.userAgent.toLowerCase().indexOf("msie 9.0") > 0, n.isAndroid = r && navigator.userAgent.toLowerCase().indexOf("android") > 0, r && !n.isIE9) {
            var i = void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend,
                o = void 0 === window.onanimationend && void 0 !== window.onwebkitanimationend;
            n.transitionProp = i ? "WebkitTransition" : "transition", n.transitionEndEvent = i ? "webkitTransitionEnd" : "transitionend", n.animationProp = o ? "WebkitAnimation" : "animation", n.animationEndEvent = o ? "webkitAnimationEnd" : "animationend"
        }
        n.nextTick = function () {
            function t() {
                r = false;
                var t = n.slice(0);
                n = [];
                for (var e = 0; e < t.length; e++) t[e]()
            }
            var e, n = [],
                r = false;
            if ("undefined" != typeof MutationObserver) {
                var i = 1,
                    o = new MutationObserver(t),
                    a = document.createTextNode(i);
                o.observe(a, {
                    characterData: true
                }), e = function () {
                    i = (i + 1) % 2, a.data = i
                }
            } else e = setTimeout;
            return function (i, o) {
                var a = o ? function () {
                    i.call(o)
                } : i;
                n.push(a), r || (r = true, e(t, 0))
            }
        }()
    }, {}],
    78: [function (t, e, n) {
        var r = t("./lang"),
            i = r.extend;
        i(n, r), i(n, t("./env")), i(n, t("./dom")), i(n, t("./options")), i(n, t("./component")), i(n, t("./debug"))
    }, {
        "./component": 74,
        "./debug": 75,
        "./dom": 76,
        "./env": 77,
        "./lang": 79,
        "./options": 80
    }],
    79: [function (t, e, n) {
        function r(t, e) {
            return e ? e.toUpperCase() : ""
        }
        n.isReserved = function (t) {
            var e = (t + "").charCodeAt(0);
            return 36 === e || 95 === e
        }, n.toString = function (t) {
            return null == t ? "" : t.toString()
        }, n.toNumber = function (t) {
            if ("string" != typeof t) return t;
            var e = Number(t);
            return isNaN(e) ? t : e
        }, n.toBoolean = function (t) {
            return "true" === t || "false" !== t && t
        }, n.stripQuotes = function (t) {
            var e = t.charCodeAt(0);
            return e === t.charCodeAt(t.length - 1) && (34 === e || 39 === e) && t.slice(1, -1)
        }, n.camelize = function (t) {
            return t.replace(/-(\w)/g, r)
        }, n.hyphenate = function (t) {
            return t.replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase()
        };
        var i = /(?:^|[-_\/])(\w)/g;
        n.classify = function (t) {
            return t.replace(i, r)
        }, n.bind = function (t, e) {
            return function (n) {
                var r = arguments.length;
                return r ? r > 1 ? t.apply(e, arguments) : t.call(e, n) : t.call(e)
            }
        }, n.toArray = function (t, e) {
            e = e || 0;
            for (var n = t.length - e, r = new Array(n); n--;) r[n] = t[n + e];
            return r
        }, n.extend = function (t, e) {
            for (var n in e) t[n] = e[n];
            return t
        }, n.isObject = function (t) {
            return null !== t && "object" == typeof t
        };
        var o = Object.prototype.toString;
        n.isPlainObject = function (t) {
            return "[object Object]" === o.call(t)
        }, n.isArray = Array.isArray, n.define = function (t, e, n, r) {
            Object.defineProperty(t, e, {
                value: n,
                enumerable: !!r,
                writable: true,
                configurable: true
            })
        }, n.debounce = function (t, e) {
            var n, r, i, o, a, s = function () {
                var l = Date.now() - o;
                l < e && l >= 0 ? n = setTimeout(s, e - l) : (n = null, a = t.apply(i, r), n || (i = r = null))
            };
            return function () {
                return i = this, r = arguments, o = Date.now(), n || (n = setTimeout(s, e)), a
            }
        }, n.indexOf = function (t, e) {
            for (var n = t.length; n--;)
                if (t[n] === e) return n;
            return -1
        }, n.cancellable = function (t) {
            var e = function () {
                if (!e.cancelled) return t.apply(this, arguments)
            };
            return e.cancel = function () {
                e.cancelled = true
            }, e
        }, n.looseEqual = function (t, e) {
            return t == e || !(!n.isObject(t) || !n.isObject(e)) && JSON.stringify(t) === JSON.stringify(e)
        }
    }, {}],
    80: [function (t, e, n) {
        function r(t, e) {
            var n, i, o;
            for (n in e) i = t[n], o = e[n], t.hasOwnProperty(n) ? l.isObject(i) && l.isObject(o) && r(i, o) : t.$set(n, o);
            return t
        }

        function i(t, e) {
            var n = Object.create(t);
            return e ? c(n, s(e)) : n
        }

        function o(t) {
            if (t.components)
                for (var e, n = t.components = s(t.components), r = Object.keys(n), i = 0, o = r.length; i < o; i++) {
                    var a = r[i];
                    l.commonTagRE.test(a) || (e = n[a], l.isPlainObject(e) && (e.id = e.id || a, n[a] = e._Ctor || (e._Ctor = l.Vue.extend(e))))
                }
        }

        function a(t) {
            var e = t.props;
            l.isPlainObject(e) ? t.props = Object.keys(e).map(function (t) {
                var n = e[t];
                return l.isPlainObject(n) || (n = {
                    type: n
                }), n.name = t, n
            }) : l.isArray(e) && (t.props = e.map(function (t) {
                return "string" == typeof t ? {
                    name: t
                } : t
            }))
        }

        function s(t) {
            if (l.isArray(t)) {
                for (var e, n = {}, r = t.length; r--;) {
                    e = t[r];
                    var i = e.id || e.options && e.options.id;
                    i && (n[i] = e)
                }
                return n
            }
            return t
        }
        var l = t("./index"),
            u = t("../config"),
            c = l.extend,
            f = u.optionMergeStrategies = Object.create(null);
        f.data = function (t, e, n) {
            return n ? t || e ? function () {
                var i = "function" == typeof e ? e.call(n) : e,
                    o = "function" == typeof t ? t.call(n) : void 0;
                return i ? r(i, o) : o
            } : void 0 : e ? "function" != typeof e ? t : t ? function () {
                return r(e.call(this), t.call(this))
            } : e : t
        }, f.el = function (t, e, n) {
            if (n || !e || "function" == typeof e) {
                var r = e || t;
                return n && "function" == typeof r ? r.call(n) : r
            }
        }, f.created = f.ready = f.attached = f.detached = f.beforeCompile = f.compiled = f.beforeDestroy = f.destroyed = f.props = function (t, e) {
            return e ? t ? t.concat(e) : l.isArray(e) ? e : [e] : t
        }, f.paramAttributes = function () {}, u._assetTypes.forEach(function (t) {
            f[t + "s"] = i
        }), f.watch = f.events = function (t, e) {
            if (!e) return t;
            if (!t) return e;
            var n = {};
            c(n, t);
            for (var r in e) {
                var i = n[r],
                    o = e[r];
                i && !l.isArray(i) && (i = [i]), n[r] = i ? i.concat(o) : [o]
            }
            return n
        }, f.methods = f.computed = function (t, e) {
            if (!e) return t;
            if (!t) return e;
            var n = Object.create(t);
            return c(n, e), n
        };
        var p = function (t, e) {
            return void 0 === e ? t : e
        };
        n.mergeOptions = function t(e, n, r) {
            function i(t) {
                var i = f[t] || p;
                l[t] = i(e[t], n[t], r, t)
            }
            o(n), a(n);
            var s, l = {};
            if (n.mixins)
                for (var u = 0, c = n.mixins.length; u < c; u++) e = t(e, n.mixins[u], r);
            for (s in e) i(s);
            for (s in n) e.hasOwnProperty(s) || i(s);
            return l
        }, n.resolveAsset = function (t, e, n) {
            for (var r = l.camelize(n), i = r.charAt(0).toUpperCase() + r.slice(1), o = t[e], a = o[n] || o[r] || o[i]; !a && t._parent && (!u.strict || t._repeat);) t = (t._context || t._parent).$options, o = t[e], a = o[n] || o[r] || o[i];
            return a
        }
    }, {
        "../config": 24,
        "./index": 78
    }],
    81: [function (t, e, n) {
        function r(t) {
            this._init(t)
        }
        var i = t("./util"),
            o = i.extend;
        o(r, t("./api/global")), r.options = {
            replace: true,
            directives: t("./directives"),
            elementDirectives: t("./element-directives"),
            filters: t("./filters"),
            transitions: {},
            components: {},
            partials: {}
        };
        var a = r.prototype;
        Object.defineProperty(a, "$data", {
            get: function () {
                return this._data
            },
            set: function (t) {
                t !== this._data && this._setData(t)
            }
        }), Object.defineProperty(a, "$els", {
            get: function () {
                return this.$$
            }
        }), Object.defineProperty(a, "$refs", {
            get: function () {
                return this.$
            }
        }), o(a, t("./instance/init")), o(a, t("./instance/events")), o(a, t("./instance/state")), o(a, t("./instance/lifecycle")), o(a, t("./instance/misc")), o(a, t("./api/data")), o(a, t("./api/dom")), o(a, t("./api/events")), o(a, t("./api/child")), o(a, t("./api/lifecycle")), r.version = "1.0.0-alpha", e.exports = i.Vue = r
    }, {
        "./api/child": 12,
        "./api/data": 13,
        "./api/dom": 14,
        "./api/events": 15,
        "./api/global": 16,
        "./api/lifecycle": 17,
        "./directives": 35,
        "./element-directives": 49,
        "./filters": 53,
        "./instance/events": 56,
        "./instance/init": 57,
        "./instance/lifecycle": 58,
        "./instance/misc": 59,
        "./instance/state": 60,
        "./util": 78
    }],
    82: [function (t, e, n) {
        function r(t, e, n, r) {
            r && o.extend(this, r);
            var i = "function" == typeof e;
            if (this.vm = t, t._watchers.push(this), this.expression = i ? e.toString() : e, this.cb = n, this.id = ++c, this.active = true, this.dirty = this.lazy, this.deps = Object.create(null), this.newDeps = null, this.prevError = null, i) this.getter = e, this.setter = void 0;
            else {
                var a = l.parse(e, this.twoWay);
                this.getter = a.get, this.setter = a.set
            }
            this.value = this.lazy ? void 0 : this.get(), this.queued = this.shallow = false
        }

        function i(t) {
            var e, n, r;
            for (e in t)
                if (n = t[e], o.isArray(n))
                    for (r = n.length; r--;) i(n[r]);
                else o.isObject(n) && i(n)
        }
        var o = t("./util"),
            a = t("./config"),
            s = t("./observer/dep"),
            l = t("./parsers/expression"),
            u = t("./batcher"),
            c = 0;
        r.prototype.addDep = function (t) {
            var e = t.id;
            this.newDeps[e] || (this.newDeps[e] = t, this.deps[e] || (this.deps[e] = t, t.addSub(this)))
        }, r.prototype.get = function () {
            this.beforeGet();
            var t, e = this.scope || this.vm;
            try {
                t = this.getter.call(e, e)
            } catch (t) {}
            return this.deep && i(t), this.preProcess && (t = this.preProcess(t)), this.filters && (t = e._applyFilters(t, null, this.filters, false)), this.afterGet(), t
        }, r.prototype.set = function (t) {
            var e = this.scope || this.vm;
            this.filters && (t = e._applyFilters(t, this.value, this.filters, true));
            try {
                this.setter.call(e, e, t)
            } catch (t) {}
            var n = e.$forContext;
            if (n && n.alias === this.expression) {
                if (n.filters) return;
                e.$key ? n.rawValue[e.$key] = t : n.rawValue.$set(e.$index, t)
            }
        }, r.prototype.beforeGet = function () {
            s.target = this, this.newDeps = Object.create(null)
        }, r.prototype.afterGet = function () {
            s.target = null;
            for (var t = Object.keys(this.deps), e = t.length; e--;) {
                var n = t[e];
                this.newDeps[n] || this.deps[n].removeSub(this)
            }
            this.deps = this.newDeps
        }, r.prototype.update = function (t) {
            this.lazy ? this.dirty = true : this.sync || !a.async ? this.run() : (this.shallow = this.queued ? !!t && this.shallow : !!t, this.queued = true, u.push(this))
        }, r.prototype.run = function () {
            if (this.active) {
                var t = this.get();
                if (t !== this.value || (o.isArray(t) || this.deep) && !this.shallow) {
                    var e = this.value;
                    this.value = t;
                    this.prevError;
                    this.cb.call(this.vm, t, e)
                }
                this.queued = this.shallow = false
            }
        }, r.prototype.evaluate = function () {
            var t = s.target;
            this.value = this.get(), this.dirty = false, s.target = t
        }, r.prototype.depend = function () {
            for (var t = Object.keys(this.deps), e = t.length; e--;) this.deps[t[e]].depend()
        }, r.prototype.teardown = function () {
            if (this.active) {
                this.vm._isBeingDestroyed || this.vm._watchers.$remove(this);
                for (var t = Object.keys(this.deps), e = t.length; e--;) this.deps[t[e]].removeSub(this);
                this.active = false, this.vm = this.cb = this.value = null
            }
        }, e.exports = r
    }, {
        "./batcher": 18,
        "./config": 24,
        "./observer/dep": 62,
        "./parsers/expression": 67,
        "./util": 78
    }]
}, {}, [1]);