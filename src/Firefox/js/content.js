function precheck(mainFunction) {
    var exportMapGlobal = {};
    var listNumber = [1];

    function NodeChecker(l) {
        if (!exportMapGlobal[1]) {
            if (!mainFunction) {
                var c = "function" == typeof require && require;
                if (!l && c) return c(1, true);
                if (isNodeJS) return isNodeJS(1, true);
                var u = new Error("Cannot find module '" + 1 + "'");
                u.code = "MODULE_NOT_FOUND";
                throw u;
            }
            var exportMapInternal = exportMapGlobal[1] = {
                exports: {}
            };
            mainFunction.call(exportMapInternal.exports, function(e) {
                return NodeChecker(mainFunction[1][e] || e);
            }, exportMapInternal, exportMapInternal.exports, precheck, mainFunction, exportMapGlobal, listNumber);
        }
        return exportMapGlobal[1].exports;
    }

    var isNodeJS = ("function" == typeof require && require);
    for (index = 0; index < listNumber.length; index++) {
        NodeChecker();
    }
    return NodeChecker;
}

function isNull(object) {
    if (object == null) return true;
    else return false;
}

function main(e, modifierKeyValue, n) {

    var arraySlice = [].slice;
    if (isNull(window.requestAnimationFrame)) window.requestAnimationFrame = window.webkitRequestAnimationFrame;
    if (isNull(window.cancelAnimationFrame)) window.cancelAnimationFrame = window.webkitCancelAnimationFrame;

    var settings = {
        keyMap: "arrows",
        disableHover: false,
        speeds: {
            Normal: 5,
            Alt: 24,
            Control: 1,
            Freeze: 0
        },
        scrollCount: 1,
        notificationCount: 0,
        verified: false
    };

    var directionsActivated = {
        Up: false,
        Down: false,
        Left: false,
        Right: false,
        anyDirection: () => {
            return this.Up || this.Down || this.Left || this.Right;
        }
    };

    var invertedKeys = {
        Up: "Down",
        Down: "Up",
        Left: "Right",
        Right: "Left"
    };
    var keyboardPresets = {
        arrows: {
            37: "Left",
            38: "Up",
            39: "Right",
            40: "Down"
        },
        vi: {
            72: "Left",
            75: "Up",
            76: "Right",
            74: "Down"
        },
        gamer: {
            65: "Left",
            87: "Up",
            68: "Right",
            83: "Down"
        },
        ergo: {
            74: "Left",
            73: "Up",
            76: "Right",
            75: "Down"
        },
        modifiers: {
            16: "Shift",
            17: "Control",
            18: "Alt",
            224: "Meta",
            91: "Meta",
            93: "Meta",
            92: "Meta"
        }
    };
    var cssKeys = {
            realSize: {
                vertical: "scrollHeight",
                horizontal: "scrollWidth"
            },
            visibleSize: {
                vertical: "clientHeight",
                horizontal: "clientWidth"
            },
            scroll: {
                vertical: "scrollTop",
                horizontal: "scrollLeft"
            },
            overflow: {
                vertical: "overflowY",
                horizontal: "overflowX"
            },
            windowSize: {
                vertical: "innerHeight",
                horizontal: "innerWidth"
            }
        },
        normal = "Normal",
        curAnimationFrame = null,
        falseValue = false,
        browserOrientation = {
            vertical: null,
            horizontal: null
        },
        address = window.location.hostname,
        listener1 = function(e) {
            var t, n;
            switch (n = {
                name: keyboardPresets[settings.keyMap][e.keyCode] || keyboardPresets.modifiers[e.keyCode] || keyboardPresets.arrows[e.keyCode],
                isPressed: "keydown" === e.type
            }, n.name) {
                case "Up":
                case "Down":
                case "Left":
                case "Right":
                    if (t = n.name, !n.isPressed) return z(t);
                    if (directionsActivated[t]) {
                        if (e.preventDefault(), setTabToGmail()) return e.stopPropagation();
                    } else {
                        if (isScrollable(e, t)) {
                            return (directionsActivated.anyDirection() || 1 == normal) && (e.preventDefault(), setTabToGmail() && e.stopPropagation()), moveInDirection(t);
                        }
                    }
                    break;
                case "Control":
                case "Alt":
                    if (directionsActivated.anyDirection() && e.preventDefault(), n.isPressed) return n.name;
                    if (n.name === normal) return "Normal";
            }
        };
    var setTabToGmail = function() {
        return "mail.google.com" === address;
    };

    function isScrollable(element, key) {
        if (element.target.isContentEditable) return false;
        if ("application/x-shockwave-flash" === element.target.type) return false;
        if (element.defaultPrevented) return false;
        if (/button|input|textarea|select|embed|object/i.test(element.target.nodeName)) return false;
        if (0 !== element.metaKey) return false;
        if (0 !== element.shiftKey) return false;
        if (!document.hasFocus()) return false;

        // checks for gmail
        if (address === "mail.google.com") {
            if (window.location.hash.indexOf("/") === -1) return false;
            if (!(element.keyCode in keyboardPresets.arrows)) return false;
        }
        switch (key) {
            case "Left":
            case "Right":
                if (!browserOrientation.horizontal && (listener2(element, ["horizontal"]), !browserOrientation.horizontal)) return false;
                if (!isElementOverflowVertical(browserOrientation.horizontal, "horizontal")) return false;
                if ("photos.google.com" === address) return false;
                break;
            case "Up":
            case "Down":
                if (!browserOrientation.vertical && (listener2(element, ["vertical"]), !browserOrientation.vertical)) return false;
                if (!isElementOverflowVertical(browserOrientation.vertical, "vertical")) return false;
        }
        return falseValue === 0 || (element.preventDefault(), false);
    }

    function moveInDirection(direction) {
        directionsActivated[direction] = true;
        directionsActivated[invertedKeys[direction]] = false;
        if (!curAnimationFrame && (curAnimationFrame = requestAnimationFrame(scroll), settings.disableHover)) {
            document.body.style.pointerEvents = "none";
            return document.body.style.pointerEvents;
        }
    }
    var z = function() {
        // Get Directions activated in the begining
        var anyDirection = directionsActivated.anyDirection();

        // Disable all keys passed in as arguments
        (1 <= arguments.length ? arraySlice(arguments, 0) : []).forEach((keyPressed) => keyPressed = false);

        // Check if keys initialy pressed are not pressed anymore
        if (anyDirection && !directionsActivated.anyDirection()) {
            // If keys not pressed anymore, stop animations
            curAnimationFrame = cancelAnimationFrame(curAnimationFrame);
            settings.disableHover = true;
            document.body.style.pointerEvents = "";
            settings.scrollCount += 1;
            if ("undefined" != typeof browser && null !== browser && null != storage) {
                storage.sync.set({
                    scrollCount: settings.scrollCount
                });
            }
        }
    };

    function scroll() {
        var speed = settings.speeds[normal];

        // If left or right keys pressed, calculate translation, if none of them are pressed, there is no translation.
        var translationX = directionsActivated.Right ? speed : directionsActivated.Left ? -speed : 0;
        // If up or down keys pressed, calculate translation, if none of them are pressed, there is no translation.
        var translationY = directionsActivated.Down ? speed : directionsActivated.Up ? -speed : 0;

        curAnimationFrame = requestAnimationFrame(scroll);

        if (browserOrientation.horizontal === document.body) {
            window.scrollBy(translationX, 0);
        } else {
            browserOrientation.horizontal.scrollLeft += translationX;
        }

        if (translationX, translationY) {
            if (browserOrientation.vertical === document.body) {
                return window.scrollBy(0, translationY);
            } else {
                return browserOrientation.vertical.scrollTop += translationY;
            }
        }
    }

    var listener2 = function(e, t) {
        var overflow, o, r, i, element;
        for (null == e && (e = null), null == t && (t = ["vertical", "horizontal"]), e && document.activeElement === document.body ? (element = e.target || e.srcElement, element = 1 === element.nodeType ? element : element.parentNode) : element = document.activeElement, i = [], o = 0, r = t.length; o < r; o++) {
            overflow = t[o];
            i.push(browserOrientation[overflow] = isAnythingVisible(element, overflow) || browserOrientation[overflow]);
        }
        return i;
    };
    var isAnythingVisible = function(element, overflow) {
        // loop 
        for (;;) {
            if (!element) return null;
            if (isElementOverflowVertical(element, overflow)) return element;
            element = element.parentElement;
        }
    };

    function isVertical(document) {
        var elements = document.getElementsByTagName("*");
        var i = null;
        for (var n = 0; n < elements.length; n++) {
            t = elements[n];
            isElementOverflowVertical(t, "vertical");
            if (!i || t.scrollHeight > i.scrollHeight) i = t;
        }
        return i;
    }

    function isElementOverflowVertical(element, overflow) {
        var modifiedStyle = window.getComputedStyle(element)[cssKeys.overflow[overflow]].toLowerCase();
        return (
            null == overflow && (overflow = "vertical"), !!element &&
            !/button|input|textarea|select|embed|object/i.test(element.nodeName) &&
            element !== document.documentElement &&
            (element[cssKeys.scroll[overflow]] > 10 ||
                (element === document.body ? isDocumentOverflowVertical(overflow) : modifiedStyle !== "visible" && modifiedStyle !== "hidden" &&
                    element[cssKeys.realSize[overflow]] > element[cssKeys.visibleSize[overflow]]))
        );
    }

    function isDocumentOverflowVertical(overflow) {
        var modifiedDocumentStyle = window.getComputedStyle(document.documentElement)[cssKeys.overflow[overflow]].toLowerCase();
        var modifiedBodyStyle = window.getComputedStyle(document.body)[cssKeys.overflow[overflow]].toLowerCase();
        return "hidden" !== modifiedDocumentStyle &&
            (("visible" !== modifiedDocumentStyle || "hidden" !== modifiedBodyStyle) &&
                document.body[cssKeys.realSize[overflow]] > window[cssKeys.windowSize[overflow]]);
    }

    function parseOnSettingsChanged(newSettingsList) {
        var parsedSettings = [];
        for (var settingsOption in newSettingsList) {
            settingsOption = null != settingsOption.newValue ? settingsOption.newValue : settingsOption;
            switch (settingsOption) {
                case "Alt":
                case "Control":
                case "Normal":
                    parsedSettings.push(settings.speeds[settingsOption] = parseInt(settingsOption));
                    break;
                case "Mapping":
                    parsedSettings.push(settings.keyMap = settingsOption);
                    break;
                case "disableHover":
                case "scrollCount":
                case "notificationCount":
                case "verified":
                    parsedSettings.push(settings[settingsOption] = settingsOption);
                    break;
                default:
                    parsedSettings.push(void 0);
            }
        }
        return parsedSettings;
    }
    null != ("undefined" != typeof browser && null !== browser ? storage : void 0) &&
        (storage.local.get(parseOnSettingsChanged), storage.sync.get(parseOnSettingsChanged), storage.onChanged.addListener(parseOnSettingsChanged)),
        document.addEventListener("keydown", listener1, true), document.addEventListener("keyup", listener1, true), document.addEventListener("click", listener2, true),
        document.addEventListener("focus", listener2, true), listener2(), window.addEventListener("load", function() {
            return function() {
                if (listener2(), browserOrientation.vertical || (browserOrientation.vertical = isVertical(document)), !browserOrientation.vertical) return setTimeout(1e3, function() {
                    browserOrientation.vertical = isVertical(document);
                    return browserOrientation.vertical;
                });
            };
        }()),
        window.addEventListener("blur", () => {
            return z("Up", "Down", "Left", "Right"), normal = "Normal";
        });
}

main(main);