! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Barba", [], t) : "object" == typeof exports ? exports.Barba = t() : e.Barba = t()
}(this, function() {
    return function(e) {
        function t(n) {
            if (i[n]) return i[n].exports;
            var r = i[n] = {
                exports: {},
                id: n,
                loaded: !1
            };
            return e[n].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
        }
        var i = {};
        return t.m = e, t.c = i, t.p = "", t(0)
    }([function(e, t, i) {
        "function" != typeof Promise && (window.Promise = i(1));
        var n = {
            version: "1.0.0",
            BaseTransition: i(5),
            BaseView: i(7),
            BaseCache: i(9),
            Dispatcher: i(8),
            HistoryManager: i(10),
            Pjax: i(11),
            Prefetch: i(14),
            Utils: i(6)
        };
        e.exports = n
    }, function(e, t, i) {
        (function(t) {
            ! function(i) {
                function n() {}

                function r(e, t) {
                    return function() {
                        e.apply(t, arguments)
                    }
                }

                function s(e) {
                    if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
                    if ("function" != typeof e) throw new TypeError("not a function");
                    this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], d(e, this)
                }

                function o(e, t) {
                    for (; 3 === e._state;) e = e._value;
                    return 0 === e._state ? void e._deferreds.push(t) : (e._handled = !0, void f(function() {
                        var i = 1 === e._state ? t.onFulfilled : t.onRejected;
                        if (null === i) return void(1 === e._state ? a : l)(t.promise, e._value);
                        var n;
                        try {
                            n = i(e._value)
                        } catch (r) {
                            return void l(t.promise, r)
                        }
                        a(t.promise, n)
                    }))
                }

                function a(e, t) {
                    try {
                        if (t === e) throw new TypeError("A promise cannot be resolved with itself.");
                        if (t && ("object" == typeof t || "function" == typeof t)) {
                            var i = t.then;
                            if (t instanceof s) return e._state = 3, e._value = t, void c(e);
                            if ("function" == typeof i) return void d(r(i, t), e)
                        }
                        e._state = 1, e._value = t, c(e)
                    } catch (n) {
                        l(e, n)
                    }
                }

                function l(e, t) {
                    e._state = 2, e._value = t, c(e)
                }

                function c(e) {
                    2 === e._state && 0 === e._deferreds.length && f(function() {
                        e._handled || p(e._value)
                    });
                    for (var t = 0, i = e._deferreds.length; t < i; t++) o(e, e._deferreds[t]);
                    e._deferreds = null
                }

                function u(e, t, i) {
                    this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = i
                }

                function d(e, t) {
                    var i = !1;
                    try {
                        e(function(e) {
                            i || (i = !0, a(t, e))
                        }, function(e) {
                            i || (i = !0, l(t, e))
                        })
                    } catch (n) {
                        if (i) return;
                        i = !0, l(t, n)
                    }
                }
                var h = setTimeout,
                    f = "function" == typeof t && t || function(e) {
                        h(e, 0)
                    },
                    p = function(e) {
                        "undefined" != typeof console && console
                    };
                s.prototype["catch"] = function(e) {
                    return this.then(null, e)
                }, s.prototype.then = function(e, t) {
                    var i = new this.constructor(n);
                    return o(this, new u(e, t, i)), i
                }, s.all = function(e) {
                    var t = Array.prototype.slice.call(e);
                    return new s(function(e, i) {
                        function n(s, o) {
                            try {
                                if (o && ("object" == typeof o || "function" == typeof o)) {
                                    var a = o.then;
                                    if ("function" == typeof a) return void a.call(o, function(e) {
                                        n(s, e)
                                    }, i)
                                }
                                t[s] = o, 0 === --r && e(t)
                            } catch (l) {
                                i(l)
                            }
                        }
                        if (0 === t.length) return e([]);
                        for (var r = t.length, s = 0; s < t.length; s++) n(s, t[s])
                    })
                }, s.resolve = function(e) {
                    return e && "object" == typeof e && e.constructor === s ? e : new s(function(t) {
                        t(e)
                    })
                }, s.reject = function(e) {
                    return new s(function(t, i) {
                        i(e)
                    })
                }, s.race = function(e) {
                    return new s(function(t, i) {
                        for (var n = 0, r = e.length; n < r; n++) e[n].then(t, i)
                    })
                }, s._setImmediateFn = function(e) {
                    f = e
                }, s._setUnhandledRejectionFn = function(e) {
                    p = e
                }, "undefined" != typeof e && e.exports ? e.exports = s : i.Promise || (i.Promise = s)
            }(this)
        }).call(t, i(2).setImmediate)
    }, function(e, t, i) {
        function n(e, t) {
            this._id = e, this._clearFn = t
        }
        var r = Function.prototype.apply;
        t.setTimeout = function() {
            return new n(r.call(setTimeout, window, arguments), clearTimeout)
        }, t.setInterval = function() {
            return new n(r.call(setInterval, window, arguments), clearInterval)
        }, t.clearTimeout = t.clearInterval = function(e) {
            e && e.close()
        }, n.prototype.unref = n.prototype.ref = function() {}, n.prototype.close = function() {
            this._clearFn.call(window, this._id)
        }, t.enroll = function(e, t) {
            clearTimeout(e._idleTimeoutId), e._idleTimeout = t
        }, t.unenroll = function(e) {
            clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
        }, t._unrefActive = t.active = function(e) {
            clearTimeout(e._idleTimeoutId);
            var t = e._idleTimeout;
            t >= 0 && (e._idleTimeoutId = setTimeout(function() {
                e._onTimeout && e._onTimeout()
            }, t))
        }, i(3), t.setImmediate = setImmediate, t.clearImmediate = clearImmediate
    }, function(e, t, i) {
        (function(e, t) {
            ! function(e, i) {
                "use strict";

                function n(e) {
                    "function" != typeof e && (e = new Function("" + e));
                    for (var t = new Array(arguments.length - 1), i = 0; i < t.length; i++) t[i] = arguments[i + 1];
                    var n = {
                        callback: e,
                        args: t
                    };
                    return m[p] = n, f(p), p++
                }

                function r(e) {
                    delete m[e]
                }

                function s(e) {
                    var t = e.callback,
                        n = e.args;
                    switch (n.length) {
                        case 0:
                            t();
                            break;
                        case 1:
                            t(n[0]);
                            break;
                        case 2:
                            t(n[0], n[1]);
                            break;
                        case 3:
                            t(n[0], n[1], n[2]);
                            break;
                        default:
                            t.apply(i, n)
                    }
                }

                function o(e) {
                    if (g) setTimeout(o, 0, e);
                    else {
                        var t = m[e];
                        if (t) {
                            g = !0;
                            try {
                                s(t)
                            } finally {
                                r(e), g = !1
                            }
                        }
                    }
                }

                function a() {
                    f = function(e) {
                        t.nextTick(function() {
                            o(e)
                        })
                    }
                }

                function l() {
                    if (e.postMessage && !e.importScripts) {
                        var t = !0,
                            i = e.onmessage;
                        return e.onmessage = function() {
                            t = !1
                        }, e.postMessage("", "*"), e.onmessage = i, t
                    }
                }

                function c() {
                    var t = "setImmediate$" + Math.random() + "$",
                        i = function(i) {
                            i.source === e && "string" == typeof i.data && 0 === i.data.indexOf(t) && o(+i.data.slice(t.length))
                        };
                    e.addEventListener ? e.addEventListener("message", i, !1) : e.attachEvent("onmessage", i), f = function(i) {
                        e.postMessage(t + i, "*")
                    }
                }

                function u() {
                    var e = new MessageChannel;
                    e.port1.onmessage = function(e) {
                        var t = e.data;
                        o(t)
                    }, f = function(t) {
                        e.port2.postMessage(t)
                    }
                }

                function d() {
                    var e = v.documentElement;
                    f = function(t) {
                        var i = v.createElement("script");
                        i.onreadystatechange = function() {
                            o(t), i.onreadystatechange = null, e.removeChild(i), i = null
                        }, e.appendChild(i)
                    }
                }

                function h() {
                    f = function(e) {
                        setTimeout(o, 0, e)
                    }
                }
                if (!e.setImmediate) {
                    var f, p = 1,
                        m = {},
                        g = !1,
                        v = e.document,
                        y = Object.getPrototypeOf && Object.getPrototypeOf(e);
                    y = y && y.setTimeout ? y : e, "[object process]" === {}.toString.call(e.process) ? a() : l() ? c() : e.MessageChannel ? u() : v && "onreadystatechange" in v.createElement("script") ? d() : h(), y.setImmediate = n, y.clearImmediate = r
                }
            }("undefined" == typeof self ? "undefined" == typeof e ? this : e : self)
        }).call(t, function() {
            return this
        }(), i(4))
    }, function(e, t) {
        function i() {
            throw new Error("setTimeout has not been defined")
        }

        function n() {
            throw new Error("clearTimeout has not been defined")
        }

        function r(e) {
            if (u === setTimeout) return setTimeout(e, 0);
            if ((u === i || !u) && setTimeout) return u = setTimeout, setTimeout(e, 0);
            try {
                return u(e, 0)
            } catch (t) {
                try {
                    return u.call(null, e, 0)
                } catch (t) {
                    return u.call(this, e, 0)
                }
            }
        }

        function s(e) {
            if (d === clearTimeout) return clearTimeout(e);
            if ((d === n || !d) && clearTimeout) return d = clearTimeout, clearTimeout(e);
            try {
                return d(e)
            } catch (t) {
                try {
                    return d.call(null, e)
                } catch (t) {
                    return d.call(this, e)
                }
            }
        }

        function o() {
            m && f && (m = !1, f.length ? p = f.concat(p) : g = -1, p.length && a())
        }

        function a() {
            if (!m) {
                var e = r(o);
                m = !0;
                for (var t = p.length; t;) {
                    for (f = p, p = []; ++g < t;) f && f[g].run();
                    g = -1, t = p.length
                }
                f = null, m = !1, s(e)
            }
        }

        function l(e, t) {
            this.fun = e, this.array = t
        }

        function c() {}
        var u, d, h = e.exports = {};
        ! function() {
            try {
                u = "function" == typeof setTimeout ? setTimeout : i
            } catch (e) {
                u = i
            }
            try {
                d = "function" == typeof clearTimeout ? clearTimeout : n
            } catch (e) {
                d = n
            }
        }();
        var f, p = [],
            m = !1,
            g = -1;
        h.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
            p.push(new l(e, t)), 1 !== p.length || m || r(a)
        }, l.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, h.title = "browser", h.browser = !0, h.env = {}, h.argv = [], h.version = "", h.versions = {}, h.on = c, h.addListener = c, h.once = c, h.off = c, h.removeListener = c, h.removeAllListeners = c, h.emit = c, h.prependListener = c, h.prependOnceListener = c, h.listeners = function(e) {
            return []
        }, h.binding = function(e) {
            throw new Error("process.binding is not supported")
        }, h.cwd = function() {
            return "/"
        }, h.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }, h.umask = function() {
            return 0
        }
    }, function(e, t, i) {
        var n = i(6),
            r = {
                oldContainer: void 0,
                newContainer: void 0,
                newContainerLoading: void 0,
                extend: function(e) {
                    return n.extend(this, e)
                },
                init: function(e, t) {
                    var i = this;
                    return this.oldContainer = e, this._newContainerPromise = t, this.deferred = n.deferred(), this.newContainerReady = n.deferred(), this.newContainerLoading = this.newContainerReady.promise, this.start(), this._newContainerPromise.then(function(e) {
                        i.newContainer = e, i.newContainerReady.resolve()
                    }), this.deferred.promise
                },
                done: function() {
                    this.oldContainer.parentNode.removeChild(this.oldContainer), this.newContainer.style.visibility = "visible", this.deferred.resolve()
                },
                start: function() {}
            };
        e.exports = r
    }, function(e, t) {
        var i = {
            getCurrentUrl: function() {
                return window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search
            },
            cleanLink: function(e) {
                return e.replace(/#.*/, "")
            },
            xhrTimeout: 5e3,
            xhr: function(e) {
                var t = this.deferred(),
                    i = new XMLHttpRequest;
                return i.onreadystatechange = function() {
                    if (4 === i.readyState) return 200 === i.status ? t.resolve(i.responseText) : t.reject(new Error("xhr: HTTP code is not 200"))
                }, i.ontimeout = function() {
                    return t.reject(new Error("xhr: Timeout exceeded"))
                }, i.open("GET", e), i.timeout = this.xhrTimeout, i.setRequestHeader("x-barba", "yes"), i.send(), t.promise
            },
            extend: function(e, t) {
                var i = Object.create(e);
                for (var n in t) t.hasOwnProperty(n) && (i[n] = t[n]);
                return i
            },
            deferred: function() {
                return new function() {
                    this.resolve = null, this.reject = null, this.promise = new Promise(function(e, t) {
                        this.resolve = e, this.reject = t
                    }.bind(this))
                }
            },
            getPort: function(e) {
                var t = "undefined" != typeof e ? e : window.location.port,
                    i = window.location.protocol;
                return "" != t ? parseInt(t) : "http:" === i ? 80 : "https:" === i ? 443 : void 0
            }
        };
        e.exports = i
    }, function(e, t, i) {
        var n = i(8),
            r = i(6),
            s = {
                namespace: null,
                extend: function(e) {
                    return r.extend(this, e)
                },
                init: function() {
                    var e = this;
                    n.on("initStateChange", function(t, i) {
                        i && i.namespace.indexOf(e.namespace) !== -1 && e.onLeave()
                    }), n.on("newPageReady", function(t, i, n) {
                        e.container = n, t.namespace.indexOf(e.namespace) !== -1 && e.onEnter()
                    }), n.on("transitionCompleted", function(t, i) {
                        t.namespace.indexOf(e.namespace) !== -1 && e.onEnterCompleted(), i && i.namespace.indexOf(e.namespace) !== -1 && e.onLeaveCompleted()
                    })
                },
                onEnter: function() {},
                onEnterCompleted: function() {},
                onLeave: function() {},
                onLeaveCompleted: function() {}
            };
        e.exports = s
    }, function(e, t) {
        var i = {
            events: {},
            on: function(e, t) {
                this.events[e] = this.events[e] || [], this.events[e].push(t)
            },
            off: function(e, t) {
                e in this.events != !1 && this.events[e].splice(this.events[e].indexOf(t), 1)
            },
            trigger: function(e) {
                if (e in this.events != !1)
                    for (var t = 0; t < this.events[e].length; t++) this.events[e][t].apply(this, Array.prototype.slice.call(arguments, 1))
            }
        };
        e.exports = i
    }, function(e, t, i) {
        var n = i(6),
            r = {
                data: {},
                extend: function(e) {
                    return n.extend(this, e)
                },
                set: function(e, t) {
                    this.data[e] = t
                },
                get: function(e) {
                    return this.data[e]
                },
                reset: function() {
                    this.data = {}
                }
            };
        e.exports = r
    }, function(e, t) {
        var i = {
            history: [],
            add: function(e, t) {
                t || (t = void 0), this.history.push({
                    url: e,
                    namespace: t
                })
            },
            currentStatus: function() {
                return this.history[this.history.length - 1]
            },
            prevStatus: function() {
                var e = this.history;
                return e.length < 2 ? null : e[e.length - 2]
            }
        };
        e.exports = i
    }, function(e, t, i) {
        var n = i(6),
            r = i(8),
            s = i(12),
            o = i(9),
            a = i(10),
            l = i(13),
            c = {
                Dom: l,
                History: a,
                Cache: o,
                cacheEnabled: !0,
                transitionProgress: !1,
                ignoreClassLink: "no-barba",
                start: function() {
                    this.init()
                },
                init: function() {
                    var e = this.Dom.getContainer(),
                        t = this.Dom.getWrapper();
                    t.setAttribute("aria-live", "polite"), this.History.add(this.getCurrentUrl(), this.Dom.getNamespace(e)), r.trigger("initStateChange", this.History.currentStatus()), r.trigger("newPageReady", this.History.currentStatus(), {}, e, this.Dom.currentHTML), r.trigger("transitionCompleted", this.History.currentStatus()), this.bindEvents()
                },
                bindEvents: function() {
                    document.addEventListener("click", this.onLinkClick.bind(this)), window.addEventListener("popstate", this.onStateChange.bind(this))
                },
                getCurrentUrl: function() {
                    return n.cleanLink(n.getCurrentUrl())
                },
                goTo: function(e, t) {
                    var t = t || this.setDefaultState();
                    window.history.pushState(t, null, e), this.onStateChange()
                },
                forceGoTo: function(e) {
                    window.location = e
                },
                load: function(e) {
                    var t, i = n.deferred(),
                        r = this;
                    return t = this.Cache.get(e), t || (t = n.xhr(e), this.Cache.set(e, t)), t.then(function(e) {
                        var t = r.Dom.parseResponse(e);
                        r.Dom.putContainer(t), r.cacheEnabled || r.Cache.reset(), i.resolve(t)
                    }, function() {
                        r.forceGoTo(e), i.reject()
                    }), i.promise
                },
                getHref: function(e) {
                    if (e) return e.getAttribute && "string" == typeof e.getAttribute("xlink:href") ? e.getAttribute("xlink:href") : "string" == typeof e.href ? e.href : void 0
                },
                onLinkClick: function(e) {
                    for (var t = e.target; t && !this.getHref(t);) t = t.parentNode;
                    if (this.preventCheck(e, t)) {
                        e.stopPropagation(), e.preventDefault(), r.trigger("linkClicked", t, e);
                        var i = this.getHref(t);
                        this.goTo(i)
                    }
                },
                preventCheck: function(e, t) {
                    if (!window.history.pushState) return !1;
                    var i = this.getHref(t);
                    return !(!t || !i) && (!(e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) && ((!t.target || "_blank" !== t.target) && (window.location.protocol === t.protocol && window.location.hostname === t.hostname && (n.getPort() === n.getPort(t.port) && (!(i.indexOf("#") > -1) && ((!t.getAttribute || "string" != typeof t.getAttribute("download")) && (n.cleanLink(i) != n.cleanLink(location.href) && !t.classList.contains(this.ignoreClassLink))))))))
                },
                getTransition: function() {
                    return s
                },
                setDefaultState: function() {
                    return {
                        type: this.Dom.wrapperDefaultId
                    }
                },
                onStateChange: function() {
                    var e = this.Dom.wrapperDefaultId;
                    window.history.state && (e = window.history.state.type ? window.history.state.type : this.Dom.wrapperDefaultId, window.history.replaceState(this.setDefaultState(), document.title)), this.Dom.wrapperId = document.getElementById(e) ? e : this.Dom.wrapperDefaultId, this.Dom.containerClass = this.Dom.wrapperId + "__container";
                    var t = this.getCurrentUrl();
                    if (this.transitionProgress && this.forceGoTo(t), this.History.currentStatus().url === t) return !1;
                    this.History.add(t);
                    var i = this.load(t),
                        n = Object.create(this.getTransition());
                    this.transitionProgress = !0, r.trigger("initStateChange", this.History.currentStatus(), this.History.prevStatus());
                    var s = n.init(this.Dom.getContainer(), i);
                    i.then(this.onNewContainerLoaded.bind(this)), s.then(this.onTransitionEnd.bind(this))
                },
                onNewContainerLoaded: function(e) {
                    var t = this.History.currentStatus();
                    t.namespace = this.Dom.getNamespace(e), r.trigger("newPageReady", this.History.currentStatus(), this.History.prevStatus(), e, this.Dom.currentHTML)
                },
                onTransitionEnd: function() {
                    this.transitionProgress = !1;
                    var e = this.History.currentStatus();
                    e.namespace && this.Dom.setHTMLClass(e.namespace), r.trigger("transitionCompleted", this.History.currentStatus(), this.History.prevStatus())
                }
            };
        e.exports = c
    }, function(e, t, i) {
        var n = i(5),
            r = n.extend({
                start: function() {
                    this.newContainerLoading.then(this.finish.bind(this))
                },
                finish: function() {
                    document.body.scrollTop = 0, this.done()
                }
            });
        e.exports = r
    }, function(e, t) {
        var i = {
            dataNamespace: "namespace",
            wrapperDefaultId: "barba-wrapper",
            wrapperId: "barba-wrapper",
            containerDefaultClass: "barba-wrapper",
            containerClass: "barba-container",
            currentHTML: document.documentElement.innerHTML,
            parseResponse: function(e) {
                this.currentHTML = e;
                var t = document.createElement("div");
                t.innerHTML = e;
                var i = t.querySelector("title");
                return i && (document.title = i.textContent), this.getContainer(t)
            },
            getWrapper: function() {
                var e = document.getElementById(this.wrapperId);
                if (!e) throw new Error("Barba.js: wrapper not found!");
                return e
            },
            getContainer: function(e) {
                if (e || (e = document.body), !e) throw new Error("Barba.js: DOM not ready!");
                var t = this.parseContainer(e);
                if (t && t.jquery && (t = t[0]), !t) throw new Error("Barba.js: no container found");
                return t
            },
            getNamespace: function(e) {
                return e || (e = document.querySelector("." + this.containerDefaultClass)), e && e.dataset ? e.dataset[this.dataNamespace] : e ? e.getAttribute("data-" + this.dataNamespace) : null
            },
            putContainer: function(e) {
                e.style.visibility = "hidden";
                var t = this.getWrapper();
                t.appendChild(e)
            },
            parseContainer: function(e) {
                return e.querySelector("." + this.containerClass)
            },
            setHTMLClass: function(e) {
                var t = "page-",
                    i = document.documentElement.className.split(" ").filter(function(e) {
                        var i = 0 === e.lastIndexOf(t, 0);
                        return !i
                    });
                e.split(" ").map(function(e) {
                    i.push(t + e)
                });
                document.documentElement.className = i.join(" ").trim()
            }
        };
        e.exports = i
    }, function(e, t, i) {
        var n = i(6),
            r = i(11),
            s = {
                ignoreClassLink: "no-barba-prefetch",
                init: function() {
                    return !!window.history.pushState && (document.body.addEventListener("mouseover", this.onLinkEnter.bind(this)), void document.body.addEventListener("touchstart", this.onLinkEnter.bind(this)))
                },
                onLinkEnter: function(e) {
                    for (var t = e.target; t && !r.getHref(t);) t = t.parentNode;
                    if (t && !t.classList.contains(this.ignoreClassLink)) {
                        var i = r.getHref(t);
                        if (r.preventCheck(e, t) && !r.Cache.get(i)) {
                            var s = n.xhr(i);
                            r.Cache.set(i, s)
                        }
                    }
                }
            };
        e.exports = s
    }])
}),
function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.BezierEasing = e()
    }
}(function() {
    return function e(t, i, n) {
        function r(o, a) {
            if (!i[o]) {
                if (!t[o]) {
                    var l = "function" == typeof require && require;
                    if (!a && l) return l(o, !0);
                    if (s) return s(o, !0);
                    var c = new Error("Cannot find module '" + o + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var u = i[o] = {
                    exports: {}
                };
                t[o][0].call(u.exports, function(e) {
                    var i = t[o][1][e];
                    return r(i ? i : e)
                }, u, u.exports, e, t, i, n)
            }
            return i[o].exports
        }
        for (var s = "function" == typeof require && require, o = 0; o < n.length; o++) r(n[o]);
        return r
    }({
        1: [function(e, t, i) {
            function n(e, t) {
                return 1 - 3 * t + 3 * e
            }

            function r(e, t) {
                return 3 * t - 6 * e
            }

            function s(e) {
                return 3 * e
            }

            function o(e, t, i) {
                return ((n(t, i) * e + r(t, i)) * e + s(t)) * e
            }

            function a(e, t, i) {
                return 3 * n(t, i) * e * e + 2 * r(t, i) * e + s(t)
            }

            function l(e, t, i, n, r) {
                var s, a, l = 0;
                do a = t + (i - t) / 2, s = o(a, n, r) - e, s > 0 ? i = a : t = a; while (Math.abs(s) > h && ++l < f);
                return a
            }

            function c(e, t, i, n) {
                for (var r = 0; r < u; ++r) {
                    var s = a(t, i, n);
                    if (0 === s) return t;
                    var l = o(t, i, n) - e;
                    t -= l / s
                }
                return t
            }
            var u = 4,
                d = .001,
                h = 1e-7,
                f = 10,
                p = 11,
                m = 1 / (p - 1),
                g = "function" == typeof Float32Array;
            t.exports = function(e, t, i, n) {
                function r(t) {
                    for (var n = 0, r = 1, o = p - 1; r !== o && s[r] <= t; ++r) n += m;
                    --r;
                    var u = (t - s[r]) / (s[r + 1] - s[r]),
                        h = n + u * m,
                        f = a(h, e, i);
                    return f >= d ? c(t, h, e, i) : 0 === f ? h : l(t, n, n + m, e, i)
                }
                if (!(0 <= e && e <= 1 && 0 <= i && i <= 1)) throw new Error("bezier x values must be in [0, 1] range");
                var s = g ? new Float32Array(p) : new Array(p);
                if (e !== t || i !== n)
                    for (var u = 0; u < p; ++u) s[u] = o(u * m, e, i);
                return function(s) {
                    return e === t && i === n ? s : 0 === s ? 0 : 1 === s ? 1 : o(r(s), t, n)
                }
            }
        }, {}]
    }, {}, [1])(1)
}), String.prototype.endsWith || (String.prototype.endsWith = function(e, t) {
        var i = this.toString();
        ("number" != typeof t || !isFinite(t) || Math.floor(t) !== t || t > i.length) && (t = i.length), t -= e.length;
        var n = i.lastIndexOf(e, t);
        return n !== -1 && n === t
    }),
    function(e, t) {
        "use strict";
        var i = "AxmTYklsjo190QW",
            n = "sans-serif",
            r = "serif",
            s = {
                tolerance: 2,
                delay: 100,
                glyphs: "",
                success: function() {},
                error: function() {},
                timeout: 5e3,
                weight: "400",
                style: "normal"
            },
            o = ["display:block", "position:absolute", "top:-999px", "left:-999px", "font-size:48px", "width:auto", "height:auto", "line-height:normal", "margin:0", "padding:0", "font-variant:normal", "white-space:nowrap"],
            a = '<div style="%s">' + i + "</div>",
            l = function() {
                this.fontFamily = "", this.appended = !1, this.serif = void 0, this.sansSerif = void 0, this.parent = void 0, this.options = {}
            };
        l.prototype.getMeasurements = function() {
            return {
                sansSerif: {
                    width: this.sansSerif.offsetWidth,
                    height: this.sansSerif.offsetHeight
                },
                serif: {
                    width: this.serif.offsetWidth,
                    height: this.serif.offsetHeight
                }
            }
        }, l.prototype.load = function() {
            function i(e) {
                return o.concat(["font-weight:" + g.weight, "font-style:" + g.style]).concat("font-family:" + e).join(";")
            }

            function s(e, t, i) {
                return Math.abs(e.width - t.offsetWidth) > i || Math.abs(e.height - t.offsetHeight) > i
            }

            function l() {
                return (new Date).getTime() - u.getTime() > g.timeout
            }
            var c, u = new Date,
                d = this,
                h = d.serif,
                f = d.sansSerif,
                p = d.parent,
                m = d.appended,
                g = d.options,
                v = g.reference,
                y = a.replace(/\%s/, i(n)),
                w = a.replace(/\%s/, i(r));
            p || (p = d.parent = t.createElement("div")), p.innerHTML = y + w, f = d.sansSerif = p.firstChild, h = d.serif = f.nextSibling, g.glyphs && (f.innerHTML += g.glyphs, h.innerHTML += g.glyphs),
                function _() {
                    v || (v = t.body), !m && v && (v.appendChild(p), m = d.appended = !0, c = d.getMeasurements(), f.style.fontFamily = d.fontFamily + ", " + n, h.style.fontFamily = d.fontFamily + ", " + r), m && c && (s(c.sansSerif, f, g.tolerance) || s(c.serif, h, g.tolerance)) ? g.success() : l() ? g.error() : !m && "requestAnimationFrame" in window ? e.requestAnimationFrame(_) : e.setTimeout(_, g.delay)
                }()
        }, l.prototype.cleanFamilyName = function(e) {
            return e.replace(/[\'\"]/g, "").toLowerCase()
        }, l.prototype.cleanWeight = function(e) {
            var t = {
                normal: "400",
                bold: "700"
            };
            return "" + (t[e] || e)
        }, l.prototype.checkFontFaces = function(i) {
            var n = this;
            t.fonts.forEach(function(t) {
                n.cleanFamilyName(t.family) === n.cleanFamilyName(n.fontFamily) && n.cleanWeight(t.weight) === n.cleanWeight(n.options.weight) && t.style === n.options.style && t.load().then(function() {
                    n.options.success(), e.clearTimeout(i)
                })
            })
        }, l.prototype.init = function(i, n) {
            var r;
            for (var o in s) n.hasOwnProperty(o) || (n[o] = s[o]);
            this.options = n, this.fontFamily = i, !n.glyphs && "fonts" in t ? (n.timeout && (r = e.setTimeout(function() {
                n.error()
            }, n.timeout)), this.checkFontFaces(r)) : this.load()
        };
        var c = function(e, t) {
            var i = new l;
            return i.init(e, t), i
        };
        e.FontFaceOnload = c
    }(this, this.document),
    function(e, t) {
        "use strict";
        var i = {},
            n = e.document,
            r = e.GreenSockGlobals = e.GreenSockGlobals || e;
        if (!r.TweenLite) {
            var s, o, a, l, c, u = function(e) {
                    var t, i = e.split("."),
                        n = r;
                    for (t = 0; t < i.length; t++) n[i[t]] = n = n[i[t]] || {};
                    return n
                },
                d = u("com.greensock"),
                h = 1e-10,
                f = function(e) {
                    var t, i = [],
                        n = e.length;
                    for (t = 0; t !== n; i.push(e[t++]));
                    return i
                },
                p = function() {},
                m = function() {
                    var e = Object.prototype.toString,
                        t = e.call([]);
                    return function(i) {
                        return null != i && (i instanceof Array || "object" == typeof i && !!i.push && e.call(i) === t)
                    }
                }(),
                g = {},
                v = function(n, s, o, a) {
                    this.sc = g[n] ? g[n].sc : [], g[n] = this, this.gsClass = null, this.func = o;
                    var l = [];
                    this.check = function(c) {
                        for (var d, h, f, p, m = s.length, y = m; --m > -1;)(d = g[s[m]] || new v(s[m], [])).gsClass ? (l[m] = d.gsClass, y--) : c && d.sc.push(this);
                        if (0 === y && o) {
                            if (h = ("com.greensock." + n).split("."), f = h.pop(), p = u(h.join("."))[f] = this.gsClass = o.apply(o, l), a)
                                if (r[f] = i[f] = p, "undefined" != typeof module && module.exports)
                                    if (n === t) {
                                        module.exports = i[t] = p;
                                        for (m in i) p[m] = i[m]
                                    } else i[t] && (i[t][f] = p);
                            else "function" == typeof define && define.amd && define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + n.split(".").pop(), [], function() {
                                return p
                            });
                            for (m = 0; m < this.sc.length; m++) this.sc[m].check()
                        }
                    }, this.check(!0)
                },
                y = e._gsDefine = function(e, t, i, n) {
                    return new v(e, t, i, n)
                },
                w = d._class = function(e, t, i) {
                    return t = t || function() {}, y(e, [], function() {
                        return t
                    }, i), t
                };
            y.globals = r;
            var _ = [0, 0, 1, 1],
                A = w("easing.Ease", function(e, t, i, n) {
                    this._func = e, this._type = i || 0, this._power = n || 0, this._params = t ? _.concat(t) : _
                }, !0),
                x = A.map = {},
                b = A.register = function(e, t, i, n) {
                    for (var r, s, o, a, l = t.split(","), c = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --c > -1;)
                        for (s = l[c], r = n ? w("easing." + s, null, !0) : d.easing[s] || {}, o = u.length; --o > -1;) a = u[o], x[s + "." + a] = x[a + s] = r[a] = e.getRatio ? e : e[a] || new e
                };
            for (a = A.prototype, a._calcEnd = !1, a.getRatio = function(e) {
                    if (this._func) return this._params[0] = e, this._func.apply(null, this._params);
                    var t = this._type,
                        i = this._power,
                        n = 1 === t ? 1 - e : 2 === t ? e : e < .5 ? 2 * e : 2 * (1 - e);
                    return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === t ? 1 - n : 2 === t ? n : e < .5 ? n / 2 : 1 - n / 2
                }, s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], o = s.length; --o > -1;) a = s[o] + ",Power" + o, b(new A(null, null, 1, o), a, "easeOut", !0), b(new A(null, null, 2, o), a, "easeIn" + (0 === o ? ",easeNone" : "")), b(new A(null, null, 3, o), a, "easeInOut");
            x.linear = d.easing.Linear.easeIn, x.swing = d.easing.Quad.easeInOut;
            var T = w("events.EventDispatcher", function(e) {
                this._listeners = {}, this._eventTarget = e || this
            });
            a = T.prototype, a.addEventListener = function(e, t, i, n, r) {
                r = r || 0;
                var s, o, a = this._listeners[e],
                    u = 0;
                for (this !== l || c || l.wake(), null == a && (this._listeners[e] = a = []), o = a.length; --o > -1;) s = a[o], s.c === t && s.s === i ? a.splice(o, 1) : 0 === u && s.pr < r && (u = o + 1);
                a.splice(u, 0, {
                    c: t,
                    s: i,
                    up: n,
                    pr: r
                })
            }, a.removeEventListener = function(e, t) {
                var i, n = this._listeners[e];
                if (n)
                    for (i = n.length; --i > -1;)
                        if (n[i].c === t) return void n.splice(i, 1)
            }, a.dispatchEvent = function(e) {
                var t, i, n, r = this._listeners[e];
                if (r)
                    for (t = r.length, t > 1 && (r = r.slice(0)), i = this._eventTarget; --t > -1;) n = r[t], n && (n.up ? n.c.call(n.s || i, {
                        type: e,
                        target: i
                    }) : n.c.call(n.s || i))
            };
            var S = e.requestAnimationFrame,
                E = e.cancelAnimationFrame,
                L = Date.now || function() {
                    return (new Date).getTime()
                },
                C = L();
            for (s = ["ms", "moz", "webkit", "o"], o = s.length; --o > -1 && !S;) S = e[s[o] + "RequestAnimationFrame"], E = e[s[o] + "CancelAnimationFrame"] || e[s[o] + "CancelRequestAnimationFrame"];
            w("Ticker", function(e, t) {
                var i, r, s, o, a, u = this,
                    d = L(),
                    f = !(t === !1 || !S) && "auto",
                    m = 500,
                    g = 33,
                    v = "tick",
                    y = function(e) {
                        var t, n, l = L() - C;
                        l > m && (d += l - g), C += l, u.time = (C - d) / 1e3, t = u.time - a, (!i || t > 0 || e === !0) && (u.frame++, a += t + (t >= o ? .004 : o - t), n = !0), e !== !0 && (s = r(y)), n && u.dispatchEvent(v)
                    };
                T.call(u), u.time = u.frame = 0, u.tick = function() {
                    y(!0)
                }, u.lagSmoothing = function(e, t) {
                    m = e || 1 / h, g = Math.min(t, m, 0)
                }, u.sleep = function() {
                    null != s && (f && E ? E(s) : clearTimeout(s), r = p, s = null, u === l && (c = !1))
                }, u.wake = function(e) {
                    null !== s ? u.sleep() : e ? d += -C + (C = L()) : u.frame > 10 && (C = L() - m + 5), r = 0 === i ? p : f && S ? S : function(e) {
                        return setTimeout(e, 1e3 * (a - u.time) + 1 | 0)
                    }, u === l && (c = !0), y(2)
                }, u.fps = function(e) {
                    return arguments.length ? (i = e, o = 1 / (i || 60), a = this.time + o, void u.wake()) : i
                }, u.useRAF = function(e) {
                    return arguments.length ? (u.sleep(), f = e, void u.fps(i)) : f
                }, u.fps(e), setTimeout(function() {
                    "auto" === f && u.frame < 5 && "hidden" !== n.visibilityState && u.useRAF(!1)
                }, 1500)
            }), a = d.Ticker.prototype = new d.events.EventDispatcher, a.constructor = d.Ticker;
            var k = w("core.Animation", function(e, t) {
                if (this.vars = t = t || {}, this._duration = this._totalDuration = e || 0, this._delay = Number(t.delay) || 0, this._timeScale = 1, this._active = t.immediateRender === !0, this.data = t.data, this._reversed = t.reversed === !0, V) {
                    c || l.wake();
                    var i = this.vars.useFrames ? Q : V;
                    i.add(this, i._time), this.vars.paused && this.paused(!0)
                }
            });
            l = k.ticker = new d.Ticker, a = k.prototype, a._dirty = a._gc = a._initted = a._paused = !1, a._totalTime = a._time = 0, a._rawPrevTime = -1, a._next = a._last = a._onUpdate = a._timeline = a.timeline = null, a._paused = !1;
            var P = function() {
                c && L() - C > 2e3 && "hidden" !== n.visibilityState && l.wake();
                var e = setTimeout(P, 2e3);
                e.unref && e.unref()
            };
            P(), a.play = function(e, t) {
                return null != e && this.seek(e, t), this.reversed(!1).paused(!1)
            }, a.pause = function(e, t) {
                return null != e && this.seek(e, t), this.paused(!0)
            }, a.resume = function(e, t) {
                return null != e && this.seek(e, t), this.paused(!1)
            }, a.seek = function(e, t) {
                return this.totalTime(Number(e), t !== !1)
            }, a.restart = function(e, t) {
                return this.reversed(!1).paused(!1).totalTime(e ? -this._delay : 0, t !== !1, !0)
            }, a.reverse = function(e, t) {
                return null != e && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1)
            }, a.render = function(e, t, i) {}, a.invalidate = function() {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, !this._gc && this.timeline || this._enabled(!0), this
            }, a.isActive = function() {
                var e, t = this._timeline,
                    i = this._startTime;
                return !t || !this._gc && !this._paused && t.isActive() && (e = t.rawTime(!0)) >= i && e < i + this.totalDuration() / this._timeScale - 1e-7
            }, a._enabled = function(e, t) {
                return c || l.wake(), this._gc = !e, this._active = this.isActive(), t !== !0 && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)), !1
            }, a._kill = function(e, t) {
                return this._enabled(!1, !1)
            }, a.kill = function(e, t) {
                return this._kill(e, t), this
            }, a._uncache = function(e) {
                for (var t = e ? this : this.timeline; t;) t._dirty = !0, t = t.timeline;
                return this
            }, a._swapSelfInParams = function(e) {
                for (var t = e.length, i = e.concat(); --t > -1;) "{self}" === e[t] && (i[t] = this);
                return i
            }, a._callback = function(e) {
                var t = this.vars,
                    i = t[e],
                    n = t[e + "Params"],
                    r = t[e + "Scope"] || t.callbackScope || this,
                    s = n ? n.length : 0;
                switch (s) {
                    case 0:
                        i.call(r);
                        break;
                    case 1:
                        i.call(r, n[0]);
                        break;
                    case 2:
                        i.call(r, n[0], n[1]);
                        break;
                    default:
                        i.apply(r, n)
                }
            }, a.eventCallback = function(e, t, i, n) {
                if ("on" === (e || "").substr(0, 2)) {
                    var r = this.vars;
                    if (1 === arguments.length) return r[e];
                    null == t ? delete r[e] : (r[e] = t, r[e + "Params"] = m(i) && i.join("").indexOf("{self}") !== -1 ? this._swapSelfInParams(i) : i, r[e + "Scope"] = n), "onUpdate" === e && (this._onUpdate = t)
                }
                return this
            }, a.delay = function(e) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay), this._delay = e, this) : this._delay
            }, a.duration = function(e) {
                return arguments.length ? (this._duration = this._totalDuration = e, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== e && this.totalTime(this._totalTime * (e / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, a.totalDuration = function(e) {
                return this._dirty = !1, arguments.length ? this.duration(e) : this._totalDuration
            }, a.time = function(e, t) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(e > this._duration ? this._duration : e, t)) : this._time
            }, a.totalTime = function(e, t, i) {
                if (c || l.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (e < 0 && !i && (e += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var n = this._totalDuration,
                            r = this._timeline;
                        if (e > n && !i && (e = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - e : e) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
                            for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                    }
                    this._gc && this._enabled(!0, !1), this._totalTime === e && 0 !== this._duration || (D.length && J(), this.render(e, t, !1), D.length && J())
                }
                return this
            }, a.progress = a.totalProgress = function(e, t) {
                var i = this.duration();
                return arguments.length ? this.totalTime(i * e, t) : i ? this._time / i : this.ratio
            }, a.startTime = function(e) {
                return arguments.length ? (e !== this._startTime && (this._startTime = e, this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)), this) : this._startTime
            }, a.endTime = function(e) {
                return this._startTime + (0 != e ? this.totalDuration() : this.duration()) / this._timeScale
            }, a.timeScale = function(e) {
                if (!arguments.length) return this._timeScale;
                if (e = e || h, this._timeline && this._timeline.smoothChildTiming) {
                    var t = this._pauseTime,
                        i = t || 0 === t ? t : this._timeline.totalTime();
                    this._startTime = i - (i - this._startTime) * this._timeScale / e
                }
                return this._timeScale = e, this._uncache(!1)
            }, a.reversed = function(e) {
                return arguments.length ? (e != this._reversed && (this._reversed = e, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, a.paused = function(e) {
                if (!arguments.length) return this._paused;
                var t, i, n = this._timeline;
                return e != this._paused && n && (c || e || l.wake(), t = n.rawTime(), i = t - this._pauseTime, !e && n.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = e ? t : null, this._paused = e, this._active = this.isActive(), !e && 0 !== i && this._initted && this.duration() && (t = n.smoothChildTiming ? this._totalTime : (t - this._startTime) / this._timeScale, this.render(t, t === this._totalTime, !0))), this._gc && !e && this._enabled(!0, !1), this
            };
            var H = w("core.SimpleTimeline", function(e) {
                k.call(this, 0, e), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            a = H.prototype = new k, a.constructor = H, a.kill()._gc = !1, a._first = a._last = a._recent = null, a._sortChildren = !1, a.add = a.insert = function(e, t, i, n) {
                var r, s;
                if (e._startTime = Number(t || 0) + e._delay, e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale), e.timeline && e.timeline._remove(e, !0), e.timeline = e._timeline = this, e._gc && e._enabled(!0, !0), r = this._last, this._sortChildren)
                    for (s = e._startTime; r && r._startTime > s;) r = r._prev;
                return r ? (e._next = r._next, r._next = e) : (e._next = this._first, this._first = e), e._next ? e._next._prev = e : this._last = e, e._prev = r, this._recent = e, this._timeline && this._uncache(!0), this
            }, a._remove = function(e, t) {
                return e.timeline === this && (t || e._enabled(!1, !0), e._prev ? e._prev._next = e._next : this._first === e && (this._first = e._next), e._next ? e._next._prev = e._prev : this._last === e && (this._last = e._prev), e._next = e._prev = e.timeline = null, e === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, a.render = function(e, t, i) {
                var n, r = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = e; r;) n = r._next, (r._active || e >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, i) : r.render((e - r._startTime) * r._timeScale, t, i)), r = n
            }, a.rawTime = function() {
                return c || l.wake(), this._totalTime
            };
            var z = w("TweenLite", function(t, i, n) {
                    if (k.call(this, i, n), this.render = z.prototype.render, null == t) throw "Cannot tween a null target.";
                    this.target = t = "string" != typeof t ? t : z.selector(t) || t;
                    var r, s, o, a = t.jquery || t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType),
                        l = this.vars.overwrite;
                    if (this._overwrite = l = null == l ? G[z.defaultOverwrite] : "number" == typeof l ? l >> 0 : G[l], (a || t instanceof Array || t.push && m(t)) && "number" != typeof t[0])
                        for (this._targets = o = f(t),
                            this._propLookup = [], this._siblings = [], r = 0; r < o.length; r++) s = o[r], s ? "string" != typeof s ? s.length && s !== e && s[0] && (s[0] === e || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(r--, 1), this._targets = o = o.concat(f(s))) : (this._siblings[r] = $(s, this, !1), 1 === l && this._siblings[r].length > 1 && ee(s, this, null, 1, this._siblings[r])) : (s = o[r--] = z.selector(s), "string" == typeof s && o.splice(r + 1, 1)) : o.splice(r--, 1);
                    else this._propLookup = {}, this._siblings = $(t, this, !1), 1 === l && this._siblings.length > 1 && ee(t, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -h, this.render(Math.min(0, -this._delay)))
                }, !0),
                O = function(t) {
                    return t && t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType)
                },
                M = function(e, t) {
                    var i, n = {};
                    for (i in e) X[i] || i in t && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!U[i] || U[i] && U[i]._autoCSS) || (n[i] = e[i], delete e[i]);
                    e.css = n
                };
            a = z.prototype = new k, a.constructor = z, a.kill()._gc = !1, a.ratio = 0, a._firstPT = a._targets = a._overwrittenProps = a._startAt = null, a._notifyPluginsOfEnabled = a._lazy = !1, z.version = "1.20.1", z.defaultEase = a._ease = new A(null, null, 1, 1), z.defaultOverwrite = "auto", z.ticker = l, z.autoSleep = 120, z.lagSmoothing = function(e, t) {
                l.lagSmoothing(e, t)
            }, z.selector = e.$ || e.jQuery || function(t) {
                var i = e.$ || e.jQuery;
                return i ? (z.selector = i, i(t)) : "undefined" == typeof n ? t : n.querySelectorAll ? n.querySelectorAll(t) : n.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
            };
            var D = [],
                F = {},
                I = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                B = /[\+-]=-?[\.\d]/,
                j = function(e) {
                    for (var t, i = this._firstPT, n = 1e-6; i;) t = i.blob ? 1 === e && this.end ? this.end : e ? this.join("") : this.start : i.c * e + i.s, i.m ? t = i.m(t, this._target || i.t) : t < n && t > -n && !i.blob && (t = 0), i.f ? i.fp ? i.t[i.p](i.fp, t) : i.t[i.p](t) : i.t[i.p] = t, i = i._next
                },
                q = function(e, t, i, n) {
                    var r, s, o, a, l, c, u, d = [],
                        h = 0,
                        f = "",
                        p = 0;
                    for (d.start = e, d.end = t, e = d[0] = e + "", t = d[1] = t + "", i && (i(d), e = d[0], t = d[1]), d.length = 0, r = e.match(I) || [], s = t.match(I) || [], n && (n._next = null, n.blob = 1, d._firstPT = d._applyPT = n), l = s.length, a = 0; a < l; a++) u = s[a], c = t.substr(h, t.indexOf(u, h) - h), f += c || !a ? c : ",", h += c.length, p ? p = (p + 1) % 5 : "rgba(" === c.substr(-5) && (p = 1), u === r[a] || r.length <= a ? f += u : (f && (d.push(f), f = ""), o = parseFloat(r[a]), d.push(o), d._firstPT = {
                        _next: d._firstPT,
                        t: d,
                        p: d.length - 1,
                        s: o,
                        c: ("=" === u.charAt(1) ? parseInt(u.charAt(0) + "1", 10) * parseFloat(u.substr(2)) : parseFloat(u) - o) || 0,
                        f: 0,
                        m: p && p < 4 ? Math.round : 0
                    }), h += u.length;
                    return f += t.substr(h), f && d.push(f), d.setRatio = j, B.test(t) && (d.end = 0), d
                },
                R = function(e, t, i, n, r, s, o, a, l) {
                    "function" == typeof n && (n = n(l || 0, e));
                    var c, u = typeof e[t],
                        d = "function" !== u ? "" : t.indexOf("set") || "function" != typeof e["get" + t.substr(3)] ? t : "get" + t.substr(3),
                        h = "get" !== i ? i : d ? o ? e[d](o) : e[d]() : e[t],
                        f = "string" == typeof n && "=" === n.charAt(1),
                        p = {
                            t: e,
                            p: t,
                            s: h,
                            f: "function" === u,
                            pg: 0,
                            n: r || t,
                            m: s ? "function" == typeof s ? s : Math.round : 0,
                            pr: 0,
                            c: f ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - h || 0
                        };
                    if (("number" != typeof h || "number" != typeof n && !f) && (o || isNaN(h) || !f && isNaN(n) || "boolean" == typeof h || "boolean" == typeof n ? (p.fp = o, c = q(h, f ? parseFloat(p.s) + p.c : n, a || z.defaultStringFilter, p), p = {
                            t: c,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 2,
                            pg: 0,
                            n: r || t,
                            pr: 0,
                            m: 0
                        }) : (p.s = parseFloat(h), f || (p.c = parseFloat(n) - p.s || 0))), p.c) return (p._next = this._firstPT) && (p._next._prev = p), this._firstPT = p, p
                },
                N = z._internals = {
                    isArray: m,
                    isSelector: O,
                    lazyTweens: D,
                    blobDif: q
                },
                U = z._plugins = {},
                W = N.tweenLookup = {},
                Y = 0,
                X = N.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                    stringFilter: 1,
                    id: 1,
                    yoyoEase: 1
                },
                G = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    "true": 1,
                    "false": 0
                },
                Q = k._rootFramesTimeline = new H,
                V = k._rootTimeline = new H,
                Z = 30,
                J = N.lazyRender = function() {
                    var e, t = D.length;
                    for (F = {}; --t > -1;) e = D[t], e && e._lazy !== !1 && (e.render(e._lazy[0], e._lazy[1], !0), e._lazy = !1);
                    D.length = 0
                };
            V._startTime = l.time, Q._startTime = l.frame, V._active = Q._active = !0, setTimeout(J, 1), k._updateRoot = z.render = function() {
                var e, t, i;
                if (D.length && J(), V.render((l.time - V._startTime) * V._timeScale, !1, !1), Q.render((l.frame - Q._startTime) * Q._timeScale, !1, !1), D.length && J(), l.frame >= Z) {
                    Z = l.frame + (parseInt(z.autoSleep, 10) || 120);
                    for (i in W) {
                        for (t = W[i].tweens, e = t.length; --e > -1;) t[e]._gc && t.splice(e, 1);
                        0 === t.length && delete W[i]
                    }
                    if (i = V._first, (!i || i._paused) && z.autoSleep && !Q._first && 1 === l._listeners.tick.length) {
                        for (; i && i._paused;) i = i._next;
                        i || l.sleep()
                    }
                }
            }, l.addEventListener("tick", k._updateRoot);
            var $ = function(e, t, i) {
                    var n, r, s = e._gsTweenID;
                    if (W[s || (e._gsTweenID = s = "t" + Y++)] || (W[s] = {
                            target: e,
                            tweens: []
                        }), t && (n = W[s].tweens, n[r = n.length] = t, i))
                        for (; --r > -1;) n[r] === t && n.splice(r, 1);
                    return W[s].tweens
                },
                K = function(e, t, i, n) {
                    var r, s, o = e.vars.onOverwrite;
                    return o && (r = o(e, t, i, n)), o = z.onOverwrite, o && (s = o(e, t, i, n)), r !== !1 && s !== !1
                },
                ee = function(e, t, i, n, r) {
                    var s, o, a, l;
                    if (1 === n || n >= 4) {
                        for (l = r.length, s = 0; s < l; s++)
                            if ((a = r[s]) !== t) a._gc || a._kill(null, e, t) && (o = !0);
                            else if (5 === n) break;
                        return o
                    }
                    var c, u = t._startTime + h,
                        d = [],
                        f = 0,
                        p = 0 === t._duration;
                    for (s = r.length; --s > -1;)(a = r[s]) === t || a._gc || a._paused || (a._timeline !== t._timeline ? (c = c || te(t, 0, p), 0 === te(a, c, p) && (d[f++] = a)) : a._startTime <= u && a._startTime + a.totalDuration() / a._timeScale > u && ((p || !a._initted) && u - a._startTime <= 2e-10 || (d[f++] = a)));
                    for (s = f; --s > -1;)
                        if (a = d[s], 2 === n && a._kill(i, e, t) && (o = !0), 2 !== n || !a._firstPT && a._initted) {
                            if (2 !== n && !K(a, t)) continue;
                            a._enabled(!1, !1) && (o = !0)
                        }
                    return o
                },
                te = function(e, t, i) {
                    for (var n = e._timeline, r = n._timeScale, s = e._startTime; n._timeline;) {
                        if (s += n._startTime, r *= n._timeScale, n._paused) return -100;
                        n = n._timeline
                    }
                    return s /= r, s > t ? s - t : i && s === t || !e._initted && s - t < 2 * h ? h : (s += e.totalDuration() / e._timeScale / r) > t + h ? 0 : s - t - h
                };
            a._init = function() {
                var e, t, i, n, r, s, o = this.vars,
                    a = this._overwrittenProps,
                    l = this._duration,
                    c = !!o.immediateRender,
                    u = o.ease;
                if (o.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
                    for (n in o.startAt) r[n] = o.startAt[n];
                    if (r.overwrite = !1, r.immediateRender = !0, r.lazy = c && o.lazy !== !1, r.startAt = r.delay = null, r.onUpdate = o.onUpdate, r.onUpdateScope = o.onUpdateScope || o.callbackScope || this, this._startAt = z.to(this.target, 0, r), c)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== l) return
                } else if (o.runBackwards && 0 !== l)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (c = !1), i = {};
                        for (n in o) X[n] && "autoCSS" !== n || (i[n] = o[n]);
                        if (i.overwrite = 0, i.data = "isFromStart", i.lazy = c && o.lazy !== !1, i.immediateRender = c, this._startAt = z.to(this.target, 0, i), c) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = u = u ? u instanceof A ? u : "function" == typeof u ? new A(u, o.easeParams) : x[u] || z.defaultEase : z.defaultEase, o.easeParams instanceof Array && u.config && (this._ease = u.config.apply(u, o.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (s = this._targets.length, e = 0; e < s; e++) this._initProps(this._targets[e], this._propLookup[e] = {}, this._siblings[e], a ? a[e] : null, e) && (t = !0);
                else t = this._initProps(this.target, this._propLookup, this._siblings, a, 0);
                if (t && z._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), o.runBackwards)
                    for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                this._onUpdate = o.onUpdate, this._initted = !0
            }, a._initProps = function(t, i, n, r, s) {
                var o, a, l, c, u, d;
                if (null == t) return !1;
                F[t._gsTweenID] && J(), this.vars.css || t.style && t !== e && t.nodeType && U.css && this.vars.autoCSS !== !1 && M(this.vars, t);
                for (o in this.vars)
                    if (d = this.vars[o], X[o]) d && (d instanceof Array || d.push && m(d)) && d.join("").indexOf("{self}") !== -1 && (this.vars[o] = d = this._swapSelfInParams(d, this));
                    else if (U[o] && (c = new U[o])._onInitTween(t, this.vars[o], this, s)) {
                    for (this._firstPT = u = {
                            _next: this._firstPT,
                            t: c,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: o,
                            pg: 1,
                            pr: c._priority,
                            m: 0
                        }, a = c._overwriteProps.length; --a > -1;) i[c._overwriteProps[a]] = this._firstPT;
                    (c._priority || c._onInitAllProps) && (l = !0), (c._onDisable || c._onEnable) && (this._notifyPluginsOfEnabled = !0), u._next && (u._next._prev = u)
                } else i[o] = R.call(this, t, o, "get", d, o, 0, null, this.vars.stringFilter, s);
                return r && this._kill(r, t) ? this._initProps(t, i, n, r, s) : this._overwrite > 1 && this._firstPT && n.length > 1 && ee(t, this, i, this._overwrite, n) ? (this._kill(i, t), this._initProps(t, i, n, r, s)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (F[t._gsTweenID] = !0), l)
            }, a.render = function(e, t, i) {
                var n, r, s, o, a = this._time,
                    l = this._duration,
                    c = this._rawPrevTime;
                if (e >= l - 1e-7 && e >= 0) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (e = 0), (c < 0 || e <= 0 && e >= -1e-7 || c === h && "isPause" !== this.data) && c !== e && (i = !0, c > h && (r = "onReverseComplete")), this._rawPrevTime = o = !t || e || c === e ? e : h);
                else if (e < 1e-7) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === l && c > 0) && (r = "onReverseComplete", n = this._reversed), e < 0 && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (c >= 0 && (c !== h || "isPause" !== this.data) && (i = !0), this._rawPrevTime = o = !t || e || c === e ? e : h)), (!this._initted || this._startAt && this._startAt.progress()) && (i = !0);
                else if (this._totalTime = this._time = e, this._easeType) {
                    var u = e / l,
                        d = this._easeType,
                        f = this._easePower;
                    (1 === d || 3 === d && u >= .5) && (u = 1 - u), 3 === d && (u *= 2), 1 === f ? u *= u : 2 === f ? u *= u * u : 3 === f ? u *= u * u * u : 4 === f && (u *= u * u * u * u), 1 === d ? this.ratio = 1 - u : 2 === d ? this.ratio = u : e / l < .5 ? this.ratio = u / 2 : this.ratio = 1 - u / 2
                } else this.ratio = this._ease.getRatio(e / l);
                if (this._time !== a || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, this._rawPrevTime = c, D.push(this), void(this._lazy = [e, t]);
                        this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== a && e >= 0 && (this._active = !0), 0 === a && (this._startAt && (e >= 0 ? this._startAt.render(e, t, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 === this._time && 0 !== l || t || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
                    this._onUpdate && (e < 0 && this._startAt && e !== -1e-4 && this._startAt.render(e, t, i), t || (this._time !== a || n || i) && this._callback("onUpdate")), r && (this._gc && !i || (e < 0 && this._startAt && !this._onUpdate && e !== -1e-4 && this._startAt.render(e, t, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[r] && this._callback(r), 0 === l && this._rawPrevTime === h && o !== h && (this._rawPrevTime = 0)))
                }
            }, a._kill = function(e, t, i) {
                if ("all" === e && (e = null), null == e && (null == t || t === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                t = "string" != typeof t ? t || this._targets || this.target : z.selector(t) || t;
                var n, r, s, o, a, l, c, u, d, h = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                if ((m(t) || O(t)) && "number" != typeof t[0])
                    for (n = t.length; --n > -1;) this._kill(e, t[n], i) && (l = !0);
                else {
                    if (this._targets) {
                        for (n = this._targets.length; --n > -1;)
                            if (t === this._targets[n]) {
                                a = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = e ? this._overwrittenProps[n] || {} : "all";
                                break
                            }
                    } else {
                        if (t !== this.target) return !1;
                        a = this._propLookup, r = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
                    }
                    if (a) {
                        if (c = e || a, u = e !== r && "all" !== r && e !== a && ("object" != typeof e || !e._tempKill), i && (z.onOverwrite || this.vars.onOverwrite)) {
                            for (s in c) a[s] && (d || (d = []), d.push(s));
                            if ((d || !e) && !K(this, i, t, d)) return !1
                        }
                        for (s in c)(o = a[s]) && (h && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s, l = !0), o.pg && o.t._kill(c) && (l = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete a[s]), u && (r[s] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return l
            }, a.invalidate = function() {
                return this._notifyPluginsOfEnabled && z._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], k.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -h, this.render(Math.min(0, -this._delay))), this
            }, a._enabled = function(e, t) {
                if (c || l.wake(), e && this._gc) {
                    var i, n = this._targets;
                    if (n)
                        for (i = n.length; --i > -1;) this._siblings[i] = $(n[i], this, !0);
                    else this._siblings = $(this.target, this, !0)
                }
                return k.prototype._enabled.call(this, e, t), !(!this._notifyPluginsOfEnabled || !this._firstPT) && z._onPluginEvent(e ? "_onEnable" : "_onDisable", this)
            }, z.to = function(e, t, i) {
                return new z(e, t, i)
            }, z.from = function(e, t, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new z(e, t, i)
            }, z.fromTo = function(e, t, i, n) {
                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new z(e, t, n)
            }, z.delayedCall = function(e, t, i, n, r) {
                return new z(t, 0, {
                    delay: e,
                    onComplete: t,
                    onCompleteParams: i,
                    callbackScope: n,
                    onReverseComplete: t,
                    onReverseCompleteParams: i,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: r,
                    overwrite: 0
                })
            }, z.set = function(e, t) {
                return new z(e, 0, t)
            }, z.getTweensOf = function(e, t) {
                if (null == e) return [];
                e = "string" != typeof e ? e : z.selector(e) || e;
                var i, n, r, s;
                if ((m(e) || O(e)) && "number" != typeof e[0]) {
                    for (i = e.length, n = []; --i > -1;) n = n.concat(z.getTweensOf(e[i], t));
                    for (i = n.length; --i > -1;)
                        for (s = n[i], r = i; --r > -1;) s === n[r] && n.splice(i, 1)
                } else if (e._gsTweenID)
                    for (n = $(e).concat(), i = n.length; --i > -1;)(n[i]._gc || t && !n[i].isActive()) && n.splice(i, 1);
                return n || []
            }, z.killTweensOf = z.killDelayedCallsTo = function(e, t, i) {
                "object" == typeof t && (i = t, t = !1);
                for (var n = z.getTweensOf(e, t), r = n.length; --r > -1;) n[r]._kill(i, e)
            };
            var ie = w("plugins.TweenPlugin", function(e, t) {
                this._overwriteProps = (e || "").split(","), this._propName = this._overwriteProps[0], this._priority = t || 0, this._super = ie.prototype
            }, !0);
            if (a = ie.prototype, ie.version = "1.19.0", ie.API = 2, a._firstPT = null, a._addTween = R, a.setRatio = j, a._kill = function(e) {
                    var t, i = this._overwriteProps,
                        n = this._firstPT;
                    if (null != e[this._propName]) this._overwriteProps = [];
                    else
                        for (t = i.length; --t > -1;) null != e[i[t]] && i.splice(t, 1);
                    for (; n;) null != e[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
                    return !1
                }, a._mod = a._roundProps = function(e) {
                    for (var t, i = this._firstPT; i;) t = e[this._propName] || null != i.n && e[i.n.split(this._propName + "_").join("")], t && "function" == typeof t && (2 === i.f ? i.t._applyPT.m = t : i.m = t), i = i._next
                }, z._onPluginEvent = function(e, t) {
                    var i, n, r, s, o, a = t._firstPT;
                    if ("_onInitAllProps" === e) {
                        for (; a;) {
                            for (o = a._next, n = r; n && n.pr > a.pr;) n = n._next;
                            (a._prev = n ? n._prev : s) ? a._prev._next = a: r = a, (a._next = n) ? n._prev = a : s = a, a = o
                        }
                        a = t._firstPT = r
                    }
                    for (; a;) a.pg && "function" == typeof a.t[e] && a.t[e]() && (i = !0), a = a._next;
                    return i
                }, ie.activate = function(e) {
                    for (var t = e.length; --t > -1;) e[t].API === ie.API && (U[(new e[t])._propName] = e[t]);
                    return !0
                }, y.plugin = function(e) {
                    if (!(e && e.propName && e.init && e.API)) throw "illegal plugin definition.";
                    var t, i = e.propName,
                        n = e.priority || 0,
                        r = e.overwriteProps,
                        s = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_mod",
                            mod: "_mod",
                            initAll: "_onInitAllProps"
                        },
                        o = w("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                            ie.call(this, i, n), this._overwriteProps = r || []
                        }, e.global === !0),
                        a = o.prototype = new ie(i);
                    a.constructor = o, o.API = e.API;
                    for (t in s) "function" == typeof e[t] && (a[s[t]] = e[t]);
                    return o.version = e.version, ie.activate([o]), o
                }, s = e._gsQueue) {
                for (o = 0; o < s.length; o++) s[o]();
                for (a in g) g[a].func || e.console.log("GSAP encountered missing dependency: " + a)
            }
            c = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(e, t) {
            var i, n, r, s, o = function() {
                    e.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = o.prototype.setRatio
                },
                a = _gsScope._gsDefine.globals,
                l = {},
                c = o.prototype = new e("css");
            c.constructor = o, o.version = "1.20.0", o.API = 2, o.defaultTransformPerspective = 0, o.defaultSkewType = "compensated", o.defaultSmoothOrigin = !0, c = "px", o.suffixMap = {
                top: c,
                right: c,
                bottom: c,
                left: c,
                width: c,
                height: c,
                fontSize: c,
                padding: c,
                margin: c,
                perspective: c,
                lineHeight: ""
            };
            var u, d, h, f, p, m, g, v, y = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
                w = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                _ = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                A = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                x = /(?:\d|\-|\+|=|#|\.)*/g,
                b = /opacity *= *([^)]*)/i,
                T = /opacity:([^;]*)/i,
                S = /alpha\(opacity *=.+?\)/i,
                E = /^(rgb|hsl)/,
                L = /([A-Z])/g,
                C = /-([a-z])/gi,
                k = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                P = function(e, t) {
                    return t.toUpperCase()
                },
                H = /(?:Left|Right|Width)/i,
                z = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                O = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                M = /,(?=[^\)]*(?:\(|$))/gi,
                D = /[\s,\(]/i,
                F = Math.PI / 180,
                I = 180 / Math.PI,
                B = {},
                j = {
                    style: {}
                },
                q = _gsScope.document || {
                    createElement: function() {
                        return j
                    }
                },
                R = function(e, t) {
                    return q.createElementNS ? q.createElementNS(t || "http://www.w3.org/1999/xhtml", e) : q.createElement(e)
                },
                N = R("div"),
                U = R("img"),
                W = o._internals = {
                    _specialProps: l
                },
                Y = (_gsScope.navigator || {}).userAgent || "",
                X = function() {
                    var e = Y.indexOf("Android"),
                        t = R("a");
                    return h = Y.indexOf("Safari") !== -1 && Y.indexOf("Chrome") === -1 && (e === -1 || parseFloat(Y.substr(e + 8, 2)) > 3), p = h && parseFloat(Y.substr(Y.indexOf("Version/") + 8, 2)) < 6, f = Y.indexOf("Firefox") !== -1, (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(Y) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(Y)) && (m = parseFloat(RegExp.$1)), !!t && (t.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(t.style.opacity))
                }(),
                G = function(e) {
                    return b.test("string" == typeof e ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                },
                Q = function(e) {
                    _gsScope.console
                },
                V = "",
                Z = "",
                J = function(e, t) {
                    t = t || N;
                    var i, n, r = t.style;
                    if (void 0 !== r[e]) return e;
                    for (e = e.charAt(0).toUpperCase() + e.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + e];);
                    return n >= 0 ? (Z = 3 === n ? "ms" : i[n], V = "-" + Z.toLowerCase() + "-", Z + e) : null
                },
                $ = q.defaultView ? q.defaultView.getComputedStyle : function() {},
                K = o.getStyle = function(e, t, i, n, r) {
                    var s;
                    return X || "opacity" !== t ? (!n && e.style[t] ? s = e.style[t] : (i = i || $(e)) ? s = i[t] || i.getPropertyValue(t) || i.getPropertyValue(t.replace(L, "-$1").toLowerCase()) : e.currentStyle && (s = e.currentStyle[t]), null == r || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : r) : G(e)
                },
                ee = W.convertToPixels = function(e, i, n, r, s) {
                    if ("px" === r || !r && "lineHeight" !== i) return n;
                    if ("auto" === r || !n) return 0;
                    var a, l, c, u = H.test(i),
                        d = e,
                        h = N.style,
                        f = n < 0,
                        p = 1 === n;
                    if (f && (n = -n), p && (n *= 100), "lineHeight" !== i || r)
                        if ("%" === r && i.indexOf("border") !== -1) a = n / 100 * (u ? e.clientWidth : e.clientHeight);
                        else {
                            if (h.cssText = "border:0 solid red;position:" + K(e, "position") + ";line-height:0;", "%" !== r && d.appendChild && "v" !== r.charAt(0) && "rem" !== r) h[u ? "borderLeftWidth" : "borderTopWidth"] = n + r;
                            else {
                                if (d = e.parentNode || q.body, K(d, "display").indexOf("flex") !== -1 && (h.position = "absolute"), l = d._gsCache, c = t.ticker.frame, l && u && l.time === c) return l.width * n / 100;
                                h[u ? "width" : "height"] = n + r
                            }
                            d.appendChild(N), a = parseFloat(N[u ? "offsetWidth" : "offsetHeight"]), d.removeChild(N), u && "%" === r && o.cacheWidths !== !1 && (l = d._gsCache = d._gsCache || {}, l.time = c, l.width = a / n * 100), 0 !== a || s || (a = ee(e, i, n, r, !0))
                        } else l = $(e).lineHeight, e.style.lineHeight = n, a = parseFloat($(e).lineHeight), e.style.lineHeight = l;
                    return p && (a /= 100), f ? -a : a
                },
                te = W.calculateOffset = function(e, t, i) {
                    if ("absolute" !== K(e, "position", i)) return 0;
                    var n = "left" === t ? "Left" : "Top",
                        r = K(e, "margin" + n, i);
                    return e["offset" + n] - (ee(e, t, parseFloat(r), r.replace(x, "")) || 0)
                },
                ie = function(e, t) {
                    var i, n, r, s = {};
                    if (t = t || $(e, null))
                        if (i = t.length)
                            for (; --i > -1;) r = t[i], r.indexOf("-transform") !== -1 && ke !== r || (s[r.replace(C, P)] = t.getPropertyValue(r));
                        else
                            for (i in t) i.indexOf("Transform") !== -1 && Ce !== i || (s[i] = t[i]);
                    else if (t = e.currentStyle || e.style)
                        for (i in t) "string" == typeof i && void 0 === s[i] && (s[i.replace(C, P)] = t[i]);
                    return X || (s.opacity = G(e)), n = Ue(e, t, !1), s.rotation = n.rotation, s.skewX = n.skewX, s.scaleX = n.scaleX, s.scaleY = n.scaleY, s.x = n.x, s.y = n.y, He && (s.z = n.z, s.rotationX = n.rotationX, s.rotationY = n.rotationY, s.scaleZ = n.scaleZ), s.filters && delete s.filters, s
                },
                ne = function(e, t, i, n, r) {
                    var s, o, a, l = {},
                        c = e.style;
                    for (o in i) "cssText" !== o && "length" !== o && isNaN(o) && (t[o] !== (s = i[o]) || r && r[o]) && o.indexOf("Origin") === -1 && ("number" != typeof s && "string" != typeof s || (l[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof t[o] || "" === t[o].replace(A, "") ? s : 0 : te(e, o), void 0 !== c[o] && (a = new ye(c, o, c[o], a))));
                    if (n)
                        for (o in n) "className" !== o && (l[o] = n[o]);
                    return {
                        difs: l,
                        firstMPT: a
                    }
                },
                re = {
                    width: ["Left", "Right"],
                    height: ["Top", "Bottom"]
                },
                se = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                oe = function(e, t, i) {
                    if ("svg" === (e.nodeName + "").toLowerCase()) return (i || $(e))[t] || 0;
                    if (e.getCTM && qe(e)) return e.getBBox()[t] || 0;
                    var n = parseFloat("width" === t ? e.offsetWidth : e.offsetHeight),
                        r = re[t],
                        s = r.length;
                    for (i = i || $(e, null); --s > -1;) n -= parseFloat(K(e, "padding" + r[s], i, !0)) || 0, n -= parseFloat(K(e, "border" + r[s] + "Width", i, !0)) || 0;
                    return n
                },
                ae = function(e, t) {
                    if ("contain" === e || "auto" === e || "auto auto" === e) return e + " ";
                    null != e && "" !== e || (e = "0 0");
                    var i, n = e.split(" "),
                        r = e.indexOf("left") !== -1 ? "0%" : e.indexOf("right") !== -1 ? "100%" : n[0],
                        s = e.indexOf("top") !== -1 ? "0%" : e.indexOf("bottom") !== -1 ? "100%" : n[1];
                    if (n.length > 3 && !t) {
                        for (n = e.split(", ").join(",").split(","), e = [], i = 0; i < n.length; i++) e.push(ae(n[i]));
                        return e.join(",")
                    }
                    return null == s ? s = "center" === r ? "50%" : "0" : "center" === s && (s = "50%"), ("center" === r || isNaN(parseFloat(r)) && (r + "").indexOf("=") === -1) && (r = "50%"), e = r + " " + s + (n.length > 2 ? " " + n[2] : ""), t && (t.oxp = r.indexOf("%") !== -1, t.oyp = s.indexOf("%") !== -1, t.oxr = "=" === r.charAt(1), t.oyr = "=" === s.charAt(1), t.ox = parseFloat(r.replace(A, "")), t.oy = parseFloat(s.replace(A, "")), t.v = e), t || e
                },
                le = function(e, t) {
                    return "function" == typeof e && (e = e(v, g)), "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t) || 0
                },
                ce = function(e, t) {
                    return "function" == typeof e && (e = e(v, g)), null == e ? t : "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) + t : parseFloat(e) || 0
                },
                ue = function(e, t, i, n) {
                    var r, s, o, a, l, c = 1e-6;
                    return "function" == typeof e && (e = e(v, g)), null == e ? a = t : "number" == typeof e ? a = e : (r = 360, s = e.split("_"), l = "=" === e.charAt(1), o = (l ? parseInt(e.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (e.indexOf("rad") === -1 ? 1 : I) - (l ? 0 : t), s.length && (n && (n[i] = t + o), e.indexOf("short") !== -1 && (o %= r, o !== o % (r / 2) && (o = o < 0 ? o + r : o - r)), e.indexOf("_cw") !== -1 && o < 0 ? o = (o + 9999999999 * r) % r - (o / r | 0) * r : e.indexOf("ccw") !== -1 && o > 0 && (o = (o - 9999999999 * r) % r - (o / r | 0) * r)), a = t + o), a < c && a > -c && (a = 0), a
                },
                de = {
                    aqua: [0, 255, 255],
                    lime: [0, 255, 0],
                    silver: [192, 192, 192],
                    black: [0, 0, 0],
                    maroon: [128, 0, 0],
                    teal: [0, 128, 128],
                    blue: [0, 0, 255],
                    navy: [0, 0, 128],
                    white: [255, 255, 255],
                    fuchsia: [255, 0, 255],
                    olive: [128, 128, 0],
                    yellow: [255, 255, 0],
                    orange: [255, 165, 0],
                    gray: [128, 128, 128],
                    purple: [128, 0, 128],
                    green: [0, 128, 0],
                    red: [255, 0, 0],
                    pink: [255, 192, 203],
                    cyan: [0, 255, 255],
                    transparent: [255, 255, 255, 0]
                },
                he = function(e, t, i) {
                    return e = e < 0 ? e + 1 : e > 1 ? e - 1 : e, 255 * (6 * e < 1 ? t + (i - t) * e * 6 : e < .5 ? i : 3 * e < 2 ? t + (i - t) * (2 / 3 - e) * 6 : t) + .5 | 0
                },
                fe = o.parseColor = function(e, t) {
                    var i, n, r, s, o, a, l, c, u, d, h;
                    if (e)
                        if ("number" == typeof e) i = [e >> 16, e >> 8 & 255, 255 & e];
                        else {
                            if ("," === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), de[e]) i = de[e];
                            else if ("#" === e.charAt(0)) 4 === e.length && (n = e.charAt(1), r = e.charAt(2), s = e.charAt(3), e = "#" + n + n + r + r + s + s), e = parseInt(e.substr(1), 16), i = [e >> 16, e >> 8 & 255, 255 & e];
                            else if ("hsl" === e.substr(0, 3))
                                if (i = h = e.match(y), t) {
                                    if (e.indexOf("=") !== -1) return e.match(w)
                                } else o = Number(i[0]) % 360 / 360, a = Number(i[1]) / 100, l = Number(i[2]) / 100, r = l <= .5 ? l * (a + 1) : l + a - l * a, n = 2 * l - r, i.length > 3 && (i[3] = Number(e[3])), i[0] = he(o + 1 / 3, n, r), i[1] = he(o, n, r), i[2] = he(o - 1 / 3, n, r);
                            else i = e.match(y) || de.transparent;
                            i[0] = Number(i[0]), i[1] = Number(i[1]), i[2] = Number(i[2]), i.length > 3 && (i[3] = Number(i[3]))
                        } else i = de.black;
                    return t && !h && (n = i[0] / 255, r = i[1] / 255, s = i[2] / 255, c = Math.max(n, r, s), u = Math.min(n, r, s), l = (c + u) / 2, c === u ? o = a = 0 : (d = c - u, a = l > .5 ? d / (2 - c - u) : d / (c + u), o = c === n ? (r - s) / d + (r < s ? 6 : 0) : c === r ? (s - n) / d + 2 : (n - r) / d + 4, o *= 60), i[0] = o + .5 | 0, i[1] = 100 * a + .5 | 0, i[2] = 100 * l + .5 | 0), i
                },
                pe = function(e, t) {
                    var i, n, r, s = e.match(me) || [],
                        o = 0,
                        a = "";
                    if (!s.length) return e;
                    for (i = 0; i < s.length; i++) n = s[i], r = e.substr(o, e.indexOf(n, o) - o), o += r.length + n.length, n = fe(n, t), 3 === n.length && n.push(1), a += r + (t ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";
                    return a + e.substr(o)
                },
                me = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
            for (c in de) me += "|" + c + "\\b";
            me = new RegExp(me + ")", "gi"), o.colorStringFilter = function(e) {
                var t, i = e[0] + " " + e[1];
                me.test(i) && (t = i.indexOf("hsl(") !== -1 || i.indexOf("hsla(") !== -1, e[0] = pe(e[0], t), e[1] = pe(e[1], t)), me.lastIndex = 0
            }, t.defaultStringFilter || (t.defaultStringFilter = o.colorStringFilter);
            var ge = function(e, t, i, n) {
                    if (null == e) return function(e) {
                        return e
                    };
                    var r, s = t ? (e.match(me) || [""])[0] : "",
                        o = e.split(s).join("").match(_) || [],
                        a = e.substr(0, e.indexOf(o[0])),
                        l = ")" === e.charAt(e.length - 1) ? ")" : "",
                        c = e.indexOf(" ") !== -1 ? " " : ",",
                        u = o.length,
                        d = u > 0 ? o[0].replace(y, "") : "";
                    return u ? r = t ? function(e) {
                        var t, h, f, p;
                        if ("number" == typeof e) e += d;
                        else if (n && M.test(e)) {
                            for (p = e.replace(M, "|").split("|"), f = 0; f < p.length; f++) p[f] = r(p[f]);
                            return p.join(",")
                        }
                        if (t = (e.match(me) || [s])[0], h = e.split(t).join("").match(_) || [], f = h.length, u > f--)
                            for (; ++f < u;) h[f] = i ? h[(f - 1) / 2 | 0] : o[f];
                        return a + h.join(c) + c + t + l + (e.indexOf("inset") !== -1 ? " inset" : "")
                    } : function(e) {
                        var t, s, h;
                        if ("number" == typeof e) e += d;
                        else if (n && M.test(e)) {
                            for (s = e.replace(M, "|").split("|"), h = 0; h < s.length; h++) s[h] = r(s[h]);
                            return s.join(",")
                        }
                        if (t = e.match(_) || [], h = t.length, u > h--)
                            for (; ++h < u;) t[h] = i ? t[(h - 1) / 2 | 0] : o[h];
                        return a + t.join(c) + l
                    } : function(e) {
                        return e
                    }
                },
                ve = function(e) {
                    return e = e.split(","),
                        function(t, i, n, r, s, o, a) {
                            var l, c = (i + "").split(" ");
                            for (a = {}, l = 0; l < 4; l++) a[e[l]] = c[l] = c[l] || c[(l - 1) / 2 >> 0];
                            return r.parse(t, a, s, o)
                        }
                },
                ye = (W._setPluginRatio = function(e) {
                    this.plugin.setRatio(e);
                    for (var t, i, n, r, s, o = this.data, a = o.proxy, l = o.firstMPT, c = 1e-6; l;) t = a[l.v], l.r ? t = Math.round(t) : t < c && t > -c && (t = 0), l.t[l.p] = t, l = l._next;
                    if (o.autoRotate && (o.autoRotate.rotation = o.mod ? o.mod(a.rotation, this.t) : a.rotation), 1 === e || 0 === e)
                        for (l = o.firstMPT, s = 1 === e ? "e" : "b"; l;) {
                            if (i = l.t, i.type) {
                                if (1 === i.type) {
                                    for (r = i.xs0 + i.s + i.xs1, n = 1; n < i.l; n++) r += i["xn" + n] + i["xs" + (n + 1)];
                                    i[s] = r
                                }
                            } else i[s] = i.s + i.xs0;
                            l = l._next
                        }
                }, function(e, t, i, n, r) {
                    this.t = e, this.p = t, this.v = i, this.r = r, n && (n._prev = this, this._next = n)
                }),
                we = (W._parseToProxy = function(e, t, i, n, r, s) {
                    var o, a, l, c, u, d = n,
                        h = {},
                        f = {},
                        p = i._transform,
                        m = B;
                    for (i._transform = null, B = t, n = u = i.parse(e, t, n, r), B = m, s && (i._transform = p, d && (d._prev = null, d._prev && (d._prev._next = null))); n && n !== d;) {
                        if (n.type <= 1 && (a = n.p, f[a] = n.s + n.c, h[a] = n.s, s || (c = new ye(n, "s", a, c, n.r), n.c = 0), 1 === n.type))
                            for (o = n.l; --o > 0;) l = "xn" + o, a = n.p + "_" + l, f[a] = n.data[l], h[a] = n[l], s || (c = new ye(n, l, a, c, n.rxp[l]));
                        n = n._next
                    }
                    return {
                        proxy: h,
                        end: f,
                        firstMPT: c,
                        pt: u
                    }
                }, W.CSSPropTween = function(e, t, n, r, o, a, l, c, u, d, h) {
                    this.t = e, this.p = t, this.s = n, this.c = r, this.n = l || t, e instanceof we || s.push(this.n), this.r = c, this.type = a || 0, u && (this.pr = u, i = !0), this.b = void 0 === d ? n : d, this.e = void 0 === h ? n + r : h, o && (this._next = o, o._prev = this)
                }),
                _e = function(e, t, i, n, r, s) {
                    var o = new we(e, t, i, n - i, r, (-1), s);
                    return o.b = i, o.e = o.xs0 = n, o
                },
                Ae = o.parseComplex = function(e, t, i, n, r, s, a, l, c, d) {
                    i = i || s || "", "function" == typeof n && (n = n(v, g)), a = new we(e, t, 0, 0, a, d ? 2 : 1, null, (!1), l, i, n), n += "", r && me.test(n + i) && (n = [i, n], o.colorStringFilter(n), i = n[0], n = n[1]);
                    var h, f, p, m, _, A, x, b, T, S, E, L, C, k = i.split(", ").join(",").split(" "),
                        P = n.split(", ").join(",").split(" "),
                        H = k.length,
                        z = u !== !1;
                    for (n.indexOf(",") === -1 && i.indexOf(",") === -1 || (k = k.join(" ").replace(M, ", ").split(" "), P = P.join(" ").replace(M, ", ").split(" "), H = k.length), H !== P.length && (k = (s || "").split(" "), H = k.length), a.plugin = c, a.setRatio = d, me.lastIndex = 0, h = 0; h < H; h++)
                        if (m = k[h], _ = P[h], b = parseFloat(m), b || 0 === b) a.appendXtra("", b, le(_, b), _.replace(w, ""), z && _.indexOf("px") !== -1, !0);
                        else if (r && me.test(m)) L = _.indexOf(")") + 1, L = ")" + (L ? _.substr(L) : ""), C = _.indexOf("hsl") !== -1 && X, S = _, m = fe(m, C), _ = fe(_, C), T = m.length + _.length > 6, T && !X && 0 === _[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(P[h]).join("transparent")) : (X || (T = !1), C ? a.appendXtra(S.substr(0, S.indexOf("hsl")) + (T ? "hsla(" : "hsl("), m[0], le(_[0], m[0]), ",", !1, !0).appendXtra("", m[1], le(_[1], m[1]), "%,", !1).appendXtra("", m[2], le(_[2], m[2]), T ? "%," : "%" + L, !1) : a.appendXtra(S.substr(0, S.indexOf("rgb")) + (T ? "rgba(" : "rgb("), m[0], _[0] - m[0], ",", !0, !0).appendXtra("", m[1], _[1] - m[1], ",", !0).appendXtra("", m[2], _[2] - m[2], T ? "," : L, !0), T && (m = m.length < 4 ? 1 : m[3], a.appendXtra("", m, (_.length < 4 ? 1 : _[3]) - m, L, !1))), me.lastIndex = 0;
                    else if (A = m.match(y)) {
                        if (x = _.match(w), !x || x.length !== A.length) return a;
                        for (p = 0, f = 0; f < A.length; f++) E = A[f], S = m.indexOf(E, p), a.appendXtra(m.substr(p, S - p), Number(E), le(x[f], E), "", z && "px" === m.substr(S + E.length, 2), 0 === f), p = S + E.length;
                        a["xs" + a.l] += m.substr(p)
                    } else a["xs" + a.l] += a.l || a["xs" + a.l] ? " " + _ : _;
                    if (n.indexOf("=") !== -1 && a.data) {
                        for (L = a.xs0 + a.data.s, h = 1; h < a.l; h++) L += a["xs" + h] + a.data["xn" + h];
                        a.e = L + a["xs" + h]
                    }
                    return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
                },
                xe = 9;
            for (c = we.prototype, c.l = c.pr = 0; --xe > 0;) c["xn" + xe] = 0, c["xs" + xe] = "";
            c.xs0 = "", c._next = c._prev = c.xfirst = c.data = c.plugin = c.setRatio = c.rxp = null, c.appendXtra = function(e, t, i, n, r, s) {
                var o = this,
                    a = o.l;
                return o["xs" + a] += s && (a || o["xs" + a]) ? " " + e : e || "", i || 0 === a || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = n || "", a > 0 ? (o.data["xn" + a] = t + i, o.rxp["xn" + a] = r, o["xn" + a] = t, o.plugin || (o.xfirst = new we(o, "xn" + a, t, i, o.xfirst || o, 0, o.n, r, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
                    s: t + i
                }, o.rxp = {}, o.s = t, o.c = i, o.r = r, o)) : (o["xs" + a] += t + (n || ""), o)
            };
            var be = function(e, t) {
                    t = t || {}, this.p = t.prefix ? J(e) || e : e, l[e] = l[this.p] = this, this.format = t.formatter || ge(t.defaultValue, t.color, t.collapsible, t.multi), t.parser && (this.parse = t.parser), this.clrs = t.color, this.multi = t.multi, this.keyword = t.keyword, this.dflt = t.defaultValue, this.pr = t.priority || 0
                },
                Te = W._registerComplexSpecialProp = function(e, t, i) {
                    "object" != typeof t && (t = {
                        parser: i
                    });
                    var n, r, s = e.split(","),
                        o = t.defaultValue;
                    for (i = i || [o], n = 0; n < s.length; n++) t.prefix = 0 === n && t.prefix, t.defaultValue = i[n] || o, r = new be(s[n], t)
                },
                Se = W._registerPluginProp = function(e) {
                    if (!l[e]) {
                        var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
                        Te(e, {
                            parser: function(e, i, n, r, s, o, c) {
                                var u = a.com.greensock.plugins[t];
                                return u ? (u._cssRegister(), l[n].parse(e, i, n, r, s, o, c)) : (Q("Error: " + t + " js file not loaded."), s)
                            }
                        })
                    }
                };
            c = be.prototype, c.parseComplex = function(e, t, i, n, r, s) {
                var o, a, l, c, u, d, h = this.keyword;
                if (this.multi && (M.test(i) || M.test(t) ? (a = t.replace(M, "|").split("|"), l = i.replace(M, "|").split("|")) : h && (a = [t], l = [i])), l) {
                    for (c = l.length > a.length ? l.length : a.length, o = 0; o < c; o++) t = a[o] = a[o] || this.dflt, i = l[o] = l[o] || this.dflt, h && (u = t.indexOf(h), d = i.indexOf(h), u !== d && (d === -1 ? a[o] = a[o].split(h).join("") : u === -1 && (a[o] += " " + h)));
                    t = a.join(", "), i = l.join(", ")
                }
                return Ae(e, this.p, t, i, this.clrs, this.dflt, n, this.pr, r, s)
            }, c.parse = function(e, t, i, n, s, o, a) {
                return this.parseComplex(e.style, this.format(K(e, this.p, r, !1, this.dflt)), this.format(t), s, o)
            }, o.registerSpecialProp = function(e, t, i) {
                Te(e, {
                    parser: function(e, n, r, s, o, a, l) {
                        var c = new we(e, r, 0, 0, o, 2, r, (!1), i);
                        return c.plugin = a, c.setRatio = t(e, n, s._tween, r), c
                    },
                    priority: i
                })
            }, o.useSVGTransformAttr = !0;
            var Ee, Le = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                Ce = J("transform"),
                ke = V + "transform",
                Pe = J("transformOrigin"),
                He = null !== J("perspective"),
                ze = W.Transform = function() {
                    this.perspective = parseFloat(o.defaultTransformPerspective) || 0, this.force3D = !(o.defaultForce3D === !1 || !He) && (o.defaultForce3D || "auto")
                },
                Oe = _gsScope.SVGElement,
                Me = function(e, t, i) {
                    var n, r = q.createElementNS("http://www.w3.org/2000/svg", e),
                        s = /([a-z])([A-Z])/g;
                    for (n in i) r.setAttributeNS(null, n.replace(s, "$1-$2").toLowerCase(), i[n]);
                    return t.appendChild(r), r
                },
                De = q.documentElement || {},
                Fe = function() {
                    var e, t, i, n = m || /Android/i.test(Y) && !_gsScope.chrome;
                    return q.createElementNS && !n && (e = Me("svg", De), t = Me("rect", e, {
                        width: 100,
                        height: 50,
                        x: 100
                    }), i = t.getBoundingClientRect().width, t.style[Pe] = "50% 50%", t.style[Ce] = "scaleX(0.5)", n = i === t.getBoundingClientRect().width && !(f && He), De.removeChild(e)), n
                }(),
                Ie = function(e, t, i, n, r, s) {
                    var a, l, c, u, d, h, f, p, m, g, v, y, w, _, A = e._gsTransform,
                        x = Ne(e, !0);
                    A && (w = A.xOrigin, _ = A.yOrigin), (!n || (a = n.split(" ")).length < 2) && (f = e.getBBox(), 0 === f.x && 0 === f.y && f.width + f.height === 0 && (f = {
                        x: parseFloat(e.hasAttribute("x") ? e.getAttribute("x") : e.hasAttribute("cx") ? e.getAttribute("cx") : 0) || 0,
                        y: parseFloat(e.hasAttribute("y") ? e.getAttribute("y") : e.hasAttribute("cy") ? e.getAttribute("cy") : 0) || 0,
                        width: 0,
                        height: 0
                    }), t = ae(t).split(" "), a = [(t[0].indexOf("%") !== -1 ? parseFloat(t[0]) / 100 * f.width : parseFloat(t[0])) + f.x, (t[1].indexOf("%") !== -1 ? parseFloat(t[1]) / 100 * f.height : parseFloat(t[1])) + f.y]), i.xOrigin = u = parseFloat(a[0]), i.yOrigin = d = parseFloat(a[1]), n && x !== Re && (h = x[0], f = x[1], p = x[2], m = x[3], g = x[4], v = x[5], y = h * m - f * p, y && (l = u * (m / y) + d * (-p / y) + (p * v - m * g) / y, c = u * (-f / y) + d * (h / y) - (h * v - f * g) / y, u = i.xOrigin = a[0] = l, d = i.yOrigin = a[1] = c)), A && (s && (i.xOffset = A.xOffset, i.yOffset = A.yOffset, A = i), r || r !== !1 && o.defaultSmoothOrigin !== !1 ? (l = u - w, c = d - _, A.xOffset += l * x[0] + c * x[2] - l, A.yOffset += l * x[1] + c * x[3] - c) : A.xOffset = A.yOffset = 0), s || e.setAttribute("data-svg-origin", a.join(" "))
                },
                Be = function(e) {
                    var t, i = R("svg", this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                        n = this.parentNode,
                        r = this.nextSibling,
                        s = this.style.cssText;
                    if (De.appendChild(i), i.appendChild(this), this.style.display = "block", e) try {
                        t = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = Be
                    } catch (o) {} else this._originalGetBBox && (t = this._originalGetBBox());
                    return r ? n.insertBefore(this, r) : n.appendChild(this), De.removeChild(i), this.style.cssText = s, t
                },
                je = function(e) {
                    try {
                        return e.getBBox()
                    } catch (t) {
                        return Be.call(e, !0)
                    }
                },
                qe = function(e) {
                    return !(!(Oe && e.getCTM && je(e)) || e.parentNode && !e.ownerSVGElement)
                },
                Re = [1, 0, 0, 1, 0, 0],
                Ne = function(e, t) {
                    var i, n, r, s, o, a, l = e._gsTransform || new ze,
                        c = 1e5,
                        u = e.style;
                    if (Ce ? n = K(e, ke, null, !0) : e.currentStyle && (n = e.currentStyle.filter.match(z), n = n && 4 === n.length ? [n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), l.x || 0, l.y || 0].join(",") : ""), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, !Ce || !(a = "none" === $(e).display) && e.parentNode || (a && (s = u.display, u.display = "block"), e.parentNode || (o = 1, De.appendChild(e)), n = K(e, ke, null, !0), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, s ? u.display = s : a && Ge(u, "display"), o && De.removeChild(e)), (l.svg || e.getCTM && qe(e)) && (i && (u[Ce] + "").indexOf("matrix") !== -1 && (n = u[Ce], i = 0), r = e.getAttribute("transform"), i && r && (r.indexOf("matrix") !== -1 ? (n = r, i = 0) : r.indexOf("translate") !== -1 && (n = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return Re;
                    for (r = (n || "").match(y) || [], xe = r.length; --xe > -1;) s = Number(r[xe]), r[xe] = (o = s - (s |= 0)) ? (o * c + (o < 0 ? -.5 : .5) | 0) / c + s : s;
                    return t && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
                },
                Ue = W.getTransform = function(e, i, n, r) {
                    if (e._gsTransform && n && !r) return e._gsTransform;
                    var s, a, l, c, u, d, h = n ? e._gsTransform || new ze : new ze,
                        f = h.scaleX < 0,
                        p = 2e-5,
                        m = 1e5,
                        g = He ? parseFloat(K(e, Pe, i, !1, "0 0 0").split(" ")[2]) || h.zOrigin || 0 : 0,
                        v = parseFloat(o.defaultTransformPerspective) || 0;
                    if (h.svg = !(!e.getCTM || !qe(e)), h.svg && (Ie(e, K(e, Pe, i, !1, "50% 50%") + "", h, e.getAttribute("data-svg-origin")), Ee = o.useSVGTransformAttr || Fe), s = Ne(e), s !== Re) {
                        if (16 === s.length) {
                            var y, w, _, A, x, b = s[0],
                                T = s[1],
                                S = s[2],
                                E = s[3],
                                L = s[4],
                                C = s[5],
                                k = s[6],
                                P = s[7],
                                H = s[8],
                                z = s[9],
                                O = s[10],
                                M = s[12],
                                D = s[13],
                                F = s[14],
                                B = s[11],
                                j = Math.atan2(k, O);
                            h.zOrigin && (F = -h.zOrigin, M = H * F - s[12], D = z * F - s[13], F = O * F + h.zOrigin - s[14]), h.rotationX = j * I, j && (A = Math.cos(-j), x = Math.sin(-j), y = L * A + H * x, w = C * A + z * x, _ = k * A + O * x, H = L * -x + H * A, z = C * -x + z * A, O = k * -x + O * A, B = P * -x + B * A, L = y, C = w, k = _), j = Math.atan2(-S, O), h.rotationY = j * I, j && (A = Math.cos(-j), x = Math.sin(-j), y = b * A - H * x, w = T * A - z * x, _ = S * A - O * x, z = T * x + z * A, O = S * x + O * A, B = E * x + B * A, b = y, T = w, S = _), j = Math.atan2(T, b), h.rotation = j * I, j && (A = Math.cos(j), x = Math.sin(j), y = b * A + T * x, w = L * A + C * x, _ = H * A + z * x, T = T * A - b * x, C = C * A - L * x, z = z * A - H * x, b = y, L = w, H = _), h.rotationX && Math.abs(h.rotationX) + Math.abs(h.rotation) > 359.9 && (h.rotationX = h.rotation = 0, h.rotationY = 180 - h.rotationY), j = Math.atan2(L, C), h.scaleX = (Math.sqrt(b * b + T * T + S * S) * m + .5 | 0) / m, h.scaleY = (Math.sqrt(C * C + k * k) * m + .5 | 0) / m, h.scaleZ = (Math.sqrt(H * H + z * z + O * O) * m + .5 | 0) / m, b /= h.scaleX, L /= h.scaleY, T /= h.scaleX, C /= h.scaleY, Math.abs(j) > p ? (h.skewX = j * I, L = 0, "simple" !== h.skewType && (h.scaleY *= 1 / Math.cos(j))) : h.skewX = 0, h.perspective = B ? 1 / (B < 0 ? -B : B) : 0, h.x = M, h.y = D, h.z = F, h.svg && (h.x -= h.xOrigin - (h.xOrigin * b - h.yOrigin * L), h.y -= h.yOrigin - (h.yOrigin * T - h.xOrigin * C))
                        } else if (!He || r || !s.length || h.x !== s[4] || h.y !== s[5] || !h.rotationX && !h.rotationY) {
                            var q = s.length >= 6,
                                R = q ? s[0] : 1,
                                N = s[1] || 0,
                                U = s[2] || 0,
                                W = q ? s[3] : 1;
                            h.x = s[4] || 0, h.y = s[5] || 0, l = Math.sqrt(R * R + N * N), c = Math.sqrt(W * W + U * U), u = R || N ? Math.atan2(N, R) * I : h.rotation || 0, d = U || W ? Math.atan2(U, W) * I + u : h.skewX || 0, h.scaleX = l, h.scaleY = c, h.rotation = u, h.skewX = d, He && (h.rotationX = h.rotationY = h.z = 0, h.perspective = v, h.scaleZ = 1), h.svg && (h.x -= h.xOrigin - (h.xOrigin * R + h.yOrigin * U), h.y -= h.yOrigin - (h.xOrigin * N + h.yOrigin * W))
                        }
                        Math.abs(h.skewX) > 90 && Math.abs(h.skewX) < 270 && (f ? (h.scaleX *= -1, h.skewX += h.rotation <= 0 ? 180 : -180, h.rotation += h.rotation <= 0 ? 180 : -180) : (h.scaleY *= -1, h.skewX += h.skewX <= 0 ? 180 : -180)), h.zOrigin = g;
                        for (a in h) h[a] < p && h[a] > -p && (h[a] = 0)
                    }
                    return n && (e._gsTransform = h, h.svg && (Ee && e.style[Ce] ? t.delayedCall(.001, function() {
                        Ge(e.style, Ce)
                    }) : !Ee && e.getAttribute("transform") && t.delayedCall(.001, function() {
                        e.removeAttribute("transform")
                    }))), h
                },
                We = function(e) {
                    var t, i, n = this.data,
                        r = -n.rotation * F,
                        s = r + n.skewX * F,
                        o = 1e5,
                        a = (Math.cos(r) * n.scaleX * o | 0) / o,
                        l = (Math.sin(r) * n.scaleX * o | 0) / o,
                        c = (Math.sin(s) * -n.scaleY * o | 0) / o,
                        u = (Math.cos(s) * n.scaleY * o | 0) / o,
                        d = this.t.style,
                        h = this.t.currentStyle;
                    if (h) {
                        i = l, l = -c, c = -i, t = h.filter, d.filter = "";
                        var f, p, g = this.t.offsetWidth,
                            v = this.t.offsetHeight,
                            y = "absolute" !== h.position,
                            w = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + c + ", M22=" + u,
                            _ = n.x + g * n.xPercent / 100,
                            A = n.y + v * n.yPercent / 100;
                        if (null != n.ox && (f = (n.oxp ? g * n.ox * .01 : n.ox) - g / 2, p = (n.oyp ? v * n.oy * .01 : n.oy) - v / 2, _ += f - (f * a + p * l), A += p - (f * c + p * u)), y ? (f = g / 2, p = v / 2, w += ", Dx=" + (f - (f * a + p * l) + _) + ", Dy=" + (p - (f * c + p * u) + A) + ")") : w += ", sizingMethod='auto expand')", t.indexOf("DXImageTransform.Microsoft.Matrix(") !== -1 ? d.filter = t.replace(O, w) : d.filter = w + " " + t, 0 !== e && 1 !== e || 1 === a && 0 === l && 0 === c && 1 === u && (y && w.indexOf("Dx=0, Dy=0") === -1 || b.test(t) && 100 !== parseFloat(RegExp.$1) || t.indexOf(t.indexOf("Alpha")) === -1 && d.removeAttribute("filter")), !y) {
                            var T, S, E, L = m < 8 ? 1 : -1;
                            for (f = n.ieOffsetX || 0, p = n.ieOffsetY || 0, n.ieOffsetX = Math.round((g - ((a < 0 ? -a : a) * g + (l < 0 ? -l : l) * v)) / 2 + _), n.ieOffsetY = Math.round((v - ((u < 0 ? -u : u) * v + (c < 0 ? -c : c) * g)) / 2 + A), xe = 0; xe < 4; xe++) S = se[xe], T = h[S], i = T.indexOf("px") !== -1 ? parseFloat(T) : ee(this.t, S, parseFloat(T), T.replace(x, "")) || 0, E = i !== n[S] ? xe < 2 ? -n.ieOffsetX : -n.ieOffsetY : xe < 2 ? f - n.ieOffsetX : p - n.ieOffsetY, d[S] = (n[S] = Math.round(i - E * (0 === xe || 2 === xe ? 1 : L))) + "px"
                        }
                    }
                },
                Ye = W.set3DTransformRatio = W.setTransformRatio = function(e) {
                    var t, i, n, r, s, o, a, l, c, u, d, h, p, m, g, v, y, w, _, A, x, b, T, S = this.data,
                        E = this.t.style,
                        L = S.rotation,
                        C = S.rotationX,
                        k = S.rotationY,
                        P = S.scaleX,
                        H = S.scaleY,
                        z = S.scaleZ,
                        O = S.x,
                        M = S.y,
                        D = S.z,
                        I = S.svg,
                        B = S.perspective,
                        j = S.force3D,
                        q = S.skewY,
                        R = S.skewX;
                    if (q && (R += q, L += q), ((1 === e || 0 === e) && "auto" === j && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !j) && !D && !B && !k && !C && 1 === z || Ee && I || !He) return void(L || R || I ? (L *= F, b = R * F, T = 1e5, i = Math.cos(L) * P, s = Math.sin(L) * P, n = Math.sin(L - b) * -H, o = Math.cos(L - b) * H, b && "simple" === S.skewType && (t = Math.tan(b - q * F), t = Math.sqrt(1 + t * t), n *= t, o *= t, q && (t = Math.tan(q * F), t = Math.sqrt(1 + t * t), i *= t, s *= t)), I && (O += S.xOrigin - (S.xOrigin * i + S.yOrigin * n) + S.xOffset, M += S.yOrigin - (S.xOrigin * s + S.yOrigin * o) + S.yOffset, Ee && (S.xPercent || S.yPercent) && (g = this.t.getBBox(), O += .01 * S.xPercent * g.width, M += .01 * S.yPercent * g.height), g = 1e-6, O < g && O > -g && (O = 0), M < g && M > -g && (M = 0)), _ = (i * T | 0) / T + "," + (s * T | 0) / T + "," + (n * T | 0) / T + "," + (o * T | 0) / T + "," + O + "," + M + ")", I && Ee ? this.t.setAttribute("transform", "matrix(" + _) : E[Ce] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + _) : E[Ce] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + P + ",0,0," + H + "," + O + "," + M + ")");
                    if (f && (g = 1e-4, P < g && P > -g && (P = z = 2e-5), H < g && H > -g && (H = z = 2e-5), !B || S.z || S.rotationX || S.rotationY || (B = 0)), L || R) L *= F, v = i = Math.cos(L), y = s = Math.sin(L), R && (L -= R * F, v = Math.cos(L), y = Math.sin(L), "simple" === S.skewType && (t = Math.tan((R - q) * F), t = Math.sqrt(1 + t * t), v *= t, y *= t, S.skewY && (t = Math.tan(q * F), t = Math.sqrt(1 + t * t), i *= t, s *= t))), n = -y, o = v;
                    else {
                        if (!(k || C || 1 !== z || B || I)) return void(E[Ce] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) translate3d(" : "translate3d(") + O + "px," + M + "px," + D + "px)" + (1 !== P || 1 !== H ? " scale(" + P + "," + H + ")" : ""));
                        i = o = 1, n = s = 0
                    }
                    u = 1, r = a = l = c = d = h = 0, p = B ? -1 / B : 0, m = S.zOrigin, g = 1e-6, A = ",", x = "0", L = k * F, L && (v = Math.cos(L), y = Math.sin(L), l = -y, d = p * -y, r = i * y, a = s * y, u = v, p *= v, i *= v, s *= v), L = C * F, L && (v = Math.cos(L), y = Math.sin(L), t = n * v + r * y, w = o * v + a * y, c = u * y, h = p * y, r = n * -y + r * v, a = o * -y + a * v, u *= v, p *= v, n = t, o = w), 1 !== z && (r *= z, a *= z, u *= z, p *= z), 1 !== H && (n *= H, o *= H, c *= H, h *= H), 1 !== P && (i *= P, s *= P, l *= P, d *= P), (m || I) && (m && (O += r * -m, M += a * -m, D += u * -m + m), I && (O += S.xOrigin - (S.xOrigin * i + S.yOrigin * n) + S.xOffset, M += S.yOrigin - (S.xOrigin * s + S.yOrigin * o) + S.yOffset), O < g && O > -g && (O = x), M < g && M > -g && (M = x), D < g && D > -g && (D = 0)), _ = S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix3d(" : "matrix3d(", _ += (i < g && i > -g ? x : i) + A + (s < g && s > -g ? x : s) + A + (l < g && l > -g ? x : l), _ += A + (d < g && d > -g ? x : d) + A + (n < g && n > -g ? x : n) + A + (o < g && o > -g ? x : o), C || k || 1 !== z ? (_ += A + (c < g && c > -g ? x : c) + A + (h < g && h > -g ? x : h) + A + (r < g && r > -g ? x : r), _ += A + (a < g && a > -g ? x : a) + A + (u < g && u > -g ? x : u) + A + (p < g && p > -g ? x : p) + A) : _ += ",0,0,0,0,1,0,", _ += O + A + M + A + D + A + (B ? 1 + -D / B : 1) + ")", E[Ce] = _
                };
            c = ze.prototype, c.x = c.y = c.z = c.skewX = c.skewY = c.rotation = c.rotationX = c.rotationY = c.zOrigin = c.xPercent = c.yPercent = c.xOffset = c.yOffset = 0, c.scaleX = c.scaleY = c.scaleZ = 1, Te("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                parser: function(e, t, i, n, s, a, l) {
                    if (n._lastParsedTransform === l) return s;
                    n._lastParsedTransform = l;
                    var c, u = l.scale && "function" == typeof l.scale ? l.scale : 0;
                    "function" == typeof l[i] && (c = l[i], l[i] = t), u && (l.scale = u(v, e));
                    var d, h, f, p, m, y, w, _, A, x = e._gsTransform,
                        b = e.style,
                        T = 1e-6,
                        S = Le.length,
                        E = l,
                        L = {},
                        C = "transformOrigin",
                        k = Ue(e, r, !0, E.parseTransform),
                        P = E.transform && ("function" == typeof E.transform ? E.transform(v, g) : E.transform);
                    if (k.skewType = E.skewType || k.skewType || o.defaultSkewType, n._transform = k, P && "string" == typeof P && Ce) h = N.style, h[Ce] = P, h.display = "block", h.position = "absolute", q.body.appendChild(N), d = Ue(N, null, !1), "simple" === k.skewType && (d.scaleY *= Math.cos(d.skewX * F)), k.svg && (y = k.xOrigin, w = k.yOrigin, d.x -= k.xOffset, d.y -= k.yOffset, (E.transformOrigin || E.svgOrigin) && (P = {}, Ie(e, ae(E.transformOrigin), P, E.svgOrigin, E.smoothOrigin, !0), y = P.xOrigin, w = P.yOrigin, d.x -= P.xOffset - k.xOffset, d.y -= P.yOffset - k.yOffset), (y || w) && (_ = Ne(N, !0), d.x -= y - (y * _[0] + w * _[2]), d.y -= w - (y * _[1] + w * _[3]))), q.body.removeChild(N), d.perspective || (d.perspective = k.perspective), null != E.xPercent && (d.xPercent = ce(E.xPercent, k.xPercent)), null != E.yPercent && (d.yPercent = ce(E.yPercent, k.yPercent));
                    else if ("object" == typeof E) {
                        if (d = {
                                scaleX: ce(null != E.scaleX ? E.scaleX : E.scale, k.scaleX),
                                scaleY: ce(null != E.scaleY ? E.scaleY : E.scale, k.scaleY),
                                scaleZ: ce(E.scaleZ, k.scaleZ),
                                x: ce(E.x, k.x),
                                y: ce(E.y, k.y),
                                z: ce(E.z, k.z),
                                xPercent: ce(E.xPercent, k.xPercent),
                                yPercent: ce(E.yPercent, k.yPercent),
                                perspective: ce(E.transformPerspective, k.perspective)
                            }, m = E.directionalRotation, null != m)
                            if ("object" == typeof m)
                                for (h in m) E[h] = m[h];
                            else E.rotation = m;
                            "string" == typeof E.x && E.x.indexOf("%") !== -1 && (d.x = 0, d.xPercent = ce(E.x, k.xPercent)), "string" == typeof E.y && E.y.indexOf("%") !== -1 && (d.y = 0, d.yPercent = ce(E.y, k.yPercent)), d.rotation = ue("rotation" in E ? E.rotation : "shortRotation" in E ? E.shortRotation + "_short" : "rotationZ" in E ? E.rotationZ : k.rotation, k.rotation, "rotation", L), He && (d.rotationX = ue("rotationX" in E ? E.rotationX : "shortRotationX" in E ? E.shortRotationX + "_short" : k.rotationX || 0, k.rotationX, "rotationX", L), d.rotationY = ue("rotationY" in E ? E.rotationY : "shortRotationY" in E ? E.shortRotationY + "_short" : k.rotationY || 0, k.rotationY, "rotationY", L)), d.skewX = ue(E.skewX, k.skewX), d.skewY = ue(E.skewY, k.skewY)
                    }
                    for (He && null != E.force3D && (k.force3D = E.force3D, p = !0), f = k.force3D || k.z || k.rotationX || k.rotationY || d.z || d.rotationX || d.rotationY || d.perspective, f || null == E.scale || (d.scaleZ = 1); --S > -1;) A = Le[S], P = d[A] - k[A], (P > T || P < -T || null != E[A] || null != B[A]) && (p = !0, s = new we(k, A, k[A], P, s), A in L && (s.e = L[A]), s.xs0 = 0, s.plugin = a, n._overwriteProps.push(s.n));
                    return P = E.transformOrigin, k.svg && (P || E.svgOrigin) && (y = k.xOffset, w = k.yOffset, Ie(e, ae(P), d, E.svgOrigin, E.smoothOrigin), s = _e(k, "xOrigin", (x ? k : d).xOrigin, d.xOrigin, s, C), s = _e(k, "yOrigin", (x ? k : d).yOrigin, d.yOrigin, s, C), y === k.xOffset && w === k.yOffset || (s = _e(k, "xOffset", x ? y : k.xOffset, k.xOffset, s, C), s = _e(k, "yOffset", x ? w : k.yOffset, k.yOffset, s, C)), P = "0px 0px"), (P || He && f && k.zOrigin) && (Ce ? (p = !0, A = Pe, P = (P || K(e, A, r, !1, "50% 50%")) + "", s = new we(b, A, 0, 0, s, (-1), C), s.b = b[A], s.plugin = a, He ? (h = k.zOrigin, P = P.split(" "), k.zOrigin = (P.length > 2 && (0 === h || "0px" !== P[2]) ? parseFloat(P[2]) : h) || 0, s.xs0 = s.e = P[0] + " " + (P[1] || "50%") + " 0px", s = new we(k, "zOrigin", 0, 0, s, (-1), s.n), s.b = h, s.xs0 = s.e = k.zOrigin) : s.xs0 = s.e = P) : ae(P + "", k)), p && (n._transformType = k.svg && Ee || !f && 3 !== this._transformType ? 2 : 3), c && (l[i] = c), u && (l.scale = u), s
                },
                prefix: !0
            }), Te("boxShadow", {
                defaultValue: "0px 0px 0px 0px #999",
                prefix: !0,
                color: !0,
                multi: !0,
                keyword: "inset"
            }), Te("borderRadius", {
                defaultValue: "0px",
                parser: function(e, t, i, s, o, a) {
                    t = this.format(t);
                    var l, c, u, d, h, f, p, m, g, v, y, w, _, A, x, b, T = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                        S = e.style;
                    for (g = parseFloat(e.offsetWidth), v = parseFloat(e.offsetHeight), l = t.split(" "), c = 0; c < T.length; c++) this.p.indexOf("border") && (T[c] = J(T[c])), h = d = K(e, T[c], r, !1, "0px"), h.indexOf(" ") !== -1 && (d = h.split(" "), h = d[0], d = d[1]), f = u = l[c], p = parseFloat(h), w = h.substr((p + "").length), _ = "=" === f.charAt(1), _ ? (m = parseInt(f.charAt(0) + "1", 10), f = f.substr(2), m *= parseFloat(f), y = f.substr((m + "").length - (m < 0 ? 1 : 0)) || "") : (m = parseFloat(f), y = f.substr((m + "").length)), "" === y && (y = n[i] || w), y !== w && (A = ee(e, "borderLeft", p, w), x = ee(e, "borderTop", p, w), "%" === y ? (h = A / g * 100 + "%", d = x / v * 100 + "%") : "em" === y ? (b = ee(e, "borderLeft", 1, "em"), h = A / b + "em", d = x / b + "em") : (h = A + "px", d = x + "px"), _ && (f = parseFloat(h) + m + y, u = parseFloat(d) + m + y)), o = Ae(S, T[c], h + " " + d, f + " " + u, !1, "0px", o);
                    return o
                },
                prefix: !0,
                formatter: ge("0px 0px 0px 0px", !1, !0)
            }), Te("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
                defaultValue: "0px",
                parser: function(e, t, i, n, s, o) {
                    return Ae(e.style, i, this.format(K(e, i, r, !1, "0px 0px")), this.format(t), !1, "0px", s)
                },
                prefix: !0,
                formatter: ge("0px 0px", !1, !0)
            }), Te("backgroundPosition", {
                defaultValue: "0 0",
                parser: function(e, t, i, n, s, o) {
                    var a, l, c, u, d, h, f = "background-position",
                        p = r || $(e, null),
                        g = this.format((p ? m ? p.getPropertyValue(f + "-x") + " " + p.getPropertyValue(f + "-y") : p.getPropertyValue(f) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
                        v = this.format(t);
                    if (g.indexOf("%") !== -1 != (v.indexOf("%") !== -1) && v.split(",").length < 2 && (h = K(e, "backgroundImage").replace(k, ""), h && "none" !== h)) {
                        for (a = g.split(" "), l = v.split(" "), U.setAttribute("src", h), c = 2; --c > -1;) g = a[c], u = g.indexOf("%") !== -1, u !== (l[c].indexOf("%") !== -1) && (d = 0 === c ? e.offsetWidth - U.width : e.offsetHeight - U.height, a[c] = u ? parseFloat(g) / 100 * d + "px" : parseFloat(g) / d * 100 + "%");
                        g = a.join(" ")
                    }
                    return this.parseComplex(e.style, g, v, s, o)
                },
                formatter: ae
            }), Te("backgroundSize", {
                defaultValue: "0 0",
                formatter: function(e) {
                    return e += "", ae(e.indexOf(" ") === -1 ? e + " " + e : e)
                }
            }), Te("perspective", {
                defaultValue: "0px",
                prefix: !0
            }), Te("perspectiveOrigin", {
                defaultValue: "50% 50%",
                prefix: !0
            }), Te("transformStyle", {
                prefix: !0
            }), Te("backfaceVisibility", {
                prefix: !0
            }), Te("userSelect", {
                prefix: !0
            }), Te("margin", {
                parser: ve("marginTop,marginRight,marginBottom,marginLeft")
            }), Te("padding", {
                parser: ve("paddingTop,paddingRight,paddingBottom,paddingLeft")
            }), Te("clip", {
                defaultValue: "rect(0px,0px,0px,0px)",
                parser: function(e, t, i, n, s, o) {
                    var a, l, c;
                    return m < 9 ? (l = e.currentStyle, c = m < 8 ? " " : ",", a = "rect(" + l.clipTop + c + l.clipRight + c + l.clipBottom + c + l.clipLeft + ")", t = this.format(t).split(",").join(c)) : (a = this.format(K(e, this.p, r, !1, this.dflt)), t = this.format(t)), this.parseComplex(e.style, a, t, s, o)
                }
            }), Te("textShadow", {
                defaultValue: "0px 0px 0px #999",
                color: !0,
                multi: !0
            }), Te("autoRound,strictUnits", {
                parser: function(e, t, i, n, r) {
                    return r
                }
            }), Te("border", {
                defaultValue: "0px solid #000",
                parser: function(e, t, i, n, s, o) {
                    var a = K(e, "borderTopWidth", r, !1, "0px"),
                        l = this.format(t).split(" "),
                        c = l[0].replace(x, "");
                    return "px" !== c && (a = parseFloat(a) / ee(e, "borderTopWidth", 1, c) + c), this.parseComplex(e.style, this.format(a + " " + K(e, "borderTopStyle", r, !1, "solid") + " " + K(e, "borderTopColor", r, !1, "#000")), l.join(" "), s, o)
                },
                color: !0,
                formatter: function(e) {
                    var t = e.split(" ");
                    return t[0] + " " + (t[1] || "solid") + " " + (e.match(me) || ["#000"])[0]
                }
            }), Te("borderWidth", {
                parser: ve("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
            }), Te("float,cssFloat,styleFloat", {
                parser: function(e, t, i, n, r, s) {
                    var o = e.style,
                        a = "cssFloat" in o ? "cssFloat" : "styleFloat";
                    return new we(o, a, 0, 0, r, (-1), i, (!1), 0, o[a], t)
                }
            });
            var Xe = function(e) {
                var t, i = this.t,
                    n = i.filter || K(this.data, "filter") || "",
                    r = this.s + this.c * e | 0;
                100 === r && (n.indexOf("atrix(") === -1 && n.indexOf("radient(") === -1 && n.indexOf("oader(") === -1 ? (i.removeAttribute("filter"), t = !K(this.data, "filter")) : (i.filter = n.replace(S, ""), t = !0)), t || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), n.indexOf("pacity") === -1 ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(b, "opacity=" + r))
            };
            Te("opacity,alpha,autoAlpha", {
                defaultValue: "1",
                parser: function(e, t, i, n, s, o) {
                    var a = parseFloat(K(e, "opacity", r, !1, "1")),
                        l = e.style,
                        c = "autoAlpha" === i;
                    return "string" == typeof t && "=" === t.charAt(1) && (t = ("-" === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) + a), c && 1 === a && "hidden" === K(e, "visibility", r) && 0 !== t && (a = 0), X ? s = new we(l, "opacity", a, t - a, s) : (s = new we(l, "opacity", 100 * a, 100 * (t - a), s), s.xn1 = c ? 1 : 0, l.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = e, s.plugin = o, s.setRatio = Xe), c && (s = new we(l, "visibility", 0, 0, s, (-1), null, (!1), 0, 0 !== a ? "inherit" : "hidden", 0 === t ? "hidden" : "inherit"), s.xs0 = "inherit", n._overwriteProps.push(s.n), n._overwriteProps.push(i)), s
                }
            });
            var Ge = function(e, t) {
                    t && (e.removeProperty ? ("ms" !== t.substr(0, 2) && "webkit" !== t.substr(0, 6) || (t = "-" + t), e.removeProperty(t.replace(L, "-$1").toLowerCase())) : e.removeAttribute(t))
                },
                Qe = function(e) {
                    if (this.t._gsClassPT = this, 1 === e || 0 === e) {
                        this.t.setAttribute("class", 0 === e ? this.b : this.e);
                        for (var t = this.data, i = this.t.style; t;) t.v ? i[t.p] = t.v : Ge(i, t.p), t = t._next;
                        1 === e && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                    } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                };
            Te("className", {
                parser: function(e, t, n, s, o, a, l) {
                    var c, u, d, h, f, p = e.getAttribute("class") || "",
                        m = e.style.cssText;
                    if (o = s._classNamePT = new we(e, n, 0, 0, o, 2), o.setRatio = Qe, o.pr = -11, i = !0, o.b = p, u = ie(e, r), d = e._gsClassPT) {
                        for (h = {}, f = d.data; f;) h[f.p] = 1, f = f._next;
                        d.setRatio(1)
                    }
                    return e._gsClassPT = o, o.e = "=" !== t.charAt(1) ? t : p.replace(new RegExp("(?:\\s|^)" + t.substr(2) + "(?![\\w-])"), "") + ("+" === t.charAt(0) ? " " + t.substr(2) : ""), e.setAttribute("class", o.e), c = ne(e, u, ie(e), l, h), e.setAttribute("class", p), o.data = c.firstMPT, e.style.cssText = m, o = o.xfirst = s.parse(e, c.difs, o, a)
                }
            });
            var Ve = function(e) {
                if ((1 === e || 0 === e) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                    var t, i, n, r, s, o = this.t.style,
                        a = l.transform.parse;
                    if ("all" === this.e) o.cssText = "", r = !0;
                    else
                        for (t = this.e.split(" ").join("").split(","), n = t.length; --n > -1;) i = t[n], l[i] && (l[i].parse === a ? r = !0 : i = "transformOrigin" === i ? Pe : l[i].p), Ge(o, i);
                    r && (Ge(o, Ce), s = this.t._gsTransform, s && (s.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
                }
            };
            for (Te("clearProps", {
                    parser: function(e, t, n, r, s) {
                        return s = new we(e, n, 0, 0, s, 2), s.setRatio = Ve, s.e = t, s.pr = -10, s.data = r._tween, i = !0, s
                    }
                }), c = "bezier,throwProps,physicsProps,physics2D".split(","), xe = c.length; xe--;) Se(c[xe]);
            c = o.prototype, c._firstPT = c._lastParsedTransform = c._transform = null, c._onInitTween = function(e, t, a, c) {
                if (!e.nodeType) return !1;
                this._target = g = e, this._tween = a, this._vars = t, v = c, u = t.autoRound, i = !1, n = t.suffixMap || o.suffixMap, r = $(e, ""), s = this._overwriteProps;
                var f, m, y, w, _, A, x, b, S, E = e.style;
                if (d && "" === E.zIndex && (f = K(e, "zIndex", r), "auto" !== f && "" !== f || this._addLazySet(E, "zIndex", 0)), "string" == typeof t && (w = E.cssText, f = ie(e, r), E.cssText = w + ";" + t, f = ne(e, f, ie(e)).difs, !X && T.test(t) && (f.opacity = parseFloat(RegExp.$1)), t = f, E.cssText = w), t.className ? this._firstPT = m = l.className.parse(e, t.className, "className", this, null, null, t) : this._firstPT = m = this.parse(e, t, null), this._transformType) {
                    for (S = 3 === this._transformType, Ce ? h && (d = !0, "" === E.zIndex && (x = K(e, "zIndex", r), "auto" !== x && "" !== x || this._addLazySet(E, "zIndex", 0)), p && this._addLazySet(E, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (S ? "visible" : "hidden"))) : E.zoom = 1, y = m; y && y._next;) y = y._next;
                    b = new we(e, "transform", 0, 0, null, 2), this._linkCSSP(b, null, y), b.setRatio = Ce ? Ye : We, b.data = this._transform || Ue(e, r, !0), b.tween = a, b.pr = -1, s.pop()
                }
                if (i) {
                    for (; m;) {
                        for (A = m._next, y = w; y && y.pr > m.pr;) y = y._next;
                        (m._prev = y ? y._prev : _) ? m._prev._next = m: w = m, (m._next = y) ? y._prev = m : _ = m, m = A
                    }
                    this._firstPT = w
                }
                return !0
            }, c.parse = function(e, t, i, s) {
                var o, a, c, d, h, f, p, m, y, w, _ = e.style;
                for (o in t) {
                    if (f = t[o], "function" == typeof f && (f = f(v, g)), a = l[o]) i = a.parse(e, f, o, this, i, s, t);
                    else {
                        if ("--" === o.substr(0, 2)) {
                            this._tween._propLookup[o] = this._addTween.call(this._tween, e.style, "setProperty", $(e).getPropertyValue(o) + "", f + "", o, !1, o);
                            continue
                        }
                        h = K(e, o, r) + "", y = "string" == typeof f, "color" === o || "fill" === o || "stroke" === o || o.indexOf("Color") !== -1 || y && E.test(f) ? (y || (f = fe(f), f = (f.length > 3 ? "rgba(" : "rgb(") + f.join(",") + ")"), i = Ae(_, o, h, f, !0, "transparent", i, 0, s)) : y && D.test(f) ? i = Ae(_, o, h, f, !0, null, i, 0, s) : (c = parseFloat(h), p = c || 0 === c ? h.substr((c + "").length) : "", "" !== h && "auto" !== h || ("width" === o || "height" === o ? (c = oe(e, o, r), p = "px") : "left" === o || "top" === o ? (c = te(e, o, r), p = "px") : (c = "opacity" !== o ? 0 : 1, p = "")), w = y && "=" === f.charAt(1), w ? (d = parseInt(f.charAt(0) + "1", 10), f = f.substr(2), d *= parseFloat(f), m = f.replace(x, "")) : (d = parseFloat(f), m = y ? f.replace(x, "") : ""), "" === m && (m = o in n ? n[o] : p), f = d || 0 === d ? (w ? d + c : d) + m : t[o], p !== m && ("" === m && "lineHeight" !== o || (d || 0 === d) && c && (c = ee(e, o, c, p), "%" === m ? (c /= ee(e, o, 100, "%") / 100, t.strictUnits !== !0 && (h = c + "%")) : "em" === m || "rem" === m || "vw" === m || "vh" === m ? c /= ee(e, o, 1, m) : "px" !== m && (d = ee(e, o, d, m), m = "px"), w && (d || 0 === d) && (f = d + c + m))), w && (d += c), !c && 0 !== c || !d && 0 !== d ? void 0 !== _[o] && (f || f + "" != "NaN" && null != f) ? (i = new we(_, o, d || c || 0, 0, i, (-1), o, (!1), 0, h, f), i.xs0 = "none" !== f || "display" !== o && o.indexOf("Style") === -1 ? f : h) : Q("invalid " + o + " tween value: " + t[o]) : (i = new we(_, o, c, d - c, i, 0, o, u !== !1 && ("px" === m || "zIndex" === o), 0, h, f), i.xs0 = m))
                    }
                    s && i && !i.plugin && (i.plugin = s)
                }
                return i
            }, c.setRatio = function(e) {
                var t, i, n, r = this._firstPT,
                    s = 1e-6;
                if (1 !== e || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                    if (e || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                        for (; r;) {
                            if (t = r.c * e + r.s, r.r ? t = Math.round(t) : t < s && t > -s && (t = 0), r.type)
                                if (1 === r.type)
                                    if (n = r.l, 2 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2;
                                    else if (3 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                            else if (4 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                            else if (5 === n) r.t[r.p] = r.xs0 + t + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                            else {
                                for (i = r.xs0 + t + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                r.t[r.p] = i
                            } else r.type === -1 ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(e);
                            else r.t[r.p] = t + r.xs0;
                            r = r._next
                        } else
                            for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(e), r = r._next;
                    else
                        for (; r;) {
                            if (2 !== r.type)
                                if (r.r && r.type !== -1)
                                    if (t = Math.round(r.s + r.c), r.type) {
                                        if (1 === r.type) {
                                            for (n = r.l, i = r.xs0 + t + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                            r.t[r.p] = i
                                        }
                                    } else r.t[r.p] = t + r.xs0;
                            else r.t[r.p] = r.e;
                            else r.setRatio(e);
                            r = r._next
                        }
            }, c._enableTransforms = function(e) {
                this._transform = this._transform || Ue(this._target, r, !0), this._transformType = this._transform.svg && Ee || !e && 3 !== this._transformType ? 2 : 3
            };
            var Ze = function(e) {
                this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
            };
            c._addLazySet = function(e, t, i) {
                var n = this._firstPT = new we(e, t, 0, 0, this._firstPT, 2);
                n.e = i, n.setRatio = Ze, n.data = this
            }, c._linkCSSP = function(e, t, i, n) {
                return e && (t && (t._prev = e), e._next && (e._next._prev = e._prev), e._prev ? e._prev._next = e._next : this._firstPT === e && (this._firstPT = e._next, n = !0), i ? i._next = e : n || null !== this._firstPT || (this._firstPT = e), e._next = t, e._prev = i), e
            }, c._mod = function(e) {
                for (var t = this._firstPT; t;) "function" == typeof e[t.p] && e[t.p] === Math.round && (t.r = 1), t = t._next
            }, c._kill = function(t) {
                var i, n, r, s = t;
                if (t.autoAlpha || t.alpha) {
                    s = {};
                    for (n in t) s[n] = t[n];
                    s.opacity = 1, s.autoAlpha && (s.visibility = 1)
                }
                for (t.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), i = this._firstPT; i;) i.plugin && i.plugin !== n && i.plugin._kill && (i.plugin._kill(t), n = i.plugin), i = i._next;
                return e.prototype._kill.call(this, s)
            };
            var Je = function(e, t, i) {
                var n, r, s, o;
                if (e.slice)
                    for (r = e.length; --r > -1;) Je(e[r], t, i);
                else
                    for (n = e.childNodes, r = n.length; --r > -1;) s = n[r], o = s.type, s.style && (t.push(ie(s)), i && i.push(s)), 1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || Je(s, t, i)
            };
            return o.cascadeTo = function(e, i, n) {
                var r, s, o, a, l = t.to(e, i, n),
                    c = [l],
                    u = [],
                    d = [],
                    h = [],
                    f = t._internals.reservedProps;
                for (e = l._targets || l.target, Je(e, u, h), l.render(i, !0, !0), Je(e, d), l.render(0, !0, !0), l._enabled(!0), r = h.length; --r > -1;)
                    if (s = ne(h[r], u[r], d[r]), s.firstMPT) {
                        s = s.difs;
                        for (o in n) f[o] && (s[o] = n[o]);
                        a = {};
                        for (o in s) a[o] = u[r][o];
                        c.push(t.fromTo(h[r], i, a, s))
                    }
                return c
            }, e.activate([o]), o
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(e) {
        "use strict";
        var t = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[e]
        };
        "undefined" != typeof module && module.exports ? (require("../TweenLite.js"), module.exports = t()) : "function" == typeof define && define.amd && define(["TweenLite"], t)
    }("CSSPlugin");
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        var e = (_gsScope.document || {}).documentElement,
            t = _gsScope,
            i = function(i, n) {
                var r = "x" === n ? "Width" : "Height",
                    s = "scroll" + r,
                    o = "client" + r,
                    a = document.body;
                return i === t || i === e || i === a ? Math.max(e[s], a[s]) - (t["inner" + r] || e[o] || a[o]) : i[s] - i["offset" + r]
            },
            n = function(e) {
                return "string" == typeof e && (e = TweenLite.selector(e)), e.length && e !== t && e[0] && e[0].style && !e.nodeType && (e = e[0]), e === t || e.nodeType && e.style ? e : null
            },
            r = function(i, n) {
                var r = "scroll" + ("x" === n ? "Left" : "Top");
                return i === t && (null != i.pageXOffset ? r = "page" + n.toUpperCase() + "Offset" : i = null != e[r] ? e : document.body),
                    function() {
                        return i[r]
                    }
            },
            s = function(i, s) {
                var o = n(i).getBoundingClientRect(),
                    a = !s || s === t || s === document.body,
                    l = (a ? e : s).getBoundingClientRect(),
                    c = {
                        x: o.left - l.left,
                        y: o.top - l.top
                    };
                return !a && s && (c.x += r(s, "x")(), c.y += r(s, "y")()), c
            },
            o = function(e, t, n) {
                var r = typeof e;
                return isNaN(e) ? "number" === r || "string" === r && "=" === e.charAt(1) ? e : "max" === e ? i(t, n) : Math.min(i(t, n), s(e, t)[n]) : parseFloat(e)
            },
            a = _gsScope._gsDefine.plugin({
                propName: "scrollTo",
                API: 2,
                global: !0,
                version: "1.9.0",
                init: function(e, i, n) {
                    return this._wdw = e === t, this._target = e, this._tween = n, "object" != typeof i ? (i = {
                        y: i
                    }, "string" == typeof i.y && "max" !== i.y && "=" !== i.y.charAt(1) && (i.x = i.y)) : i.nodeType && (i = {
                        y: i,
                        x: i
                    }), this.vars = i, this._autoKill = i.autoKill !== !1, this.getX = r(e, "x"), this.getY = r(e, "y"), this.x = this.xPrev = this.getX(), this.y = this.yPrev = this.getY(), null != i.x ? (this._addTween(this, "x", this.x, o(i.x, e, "x") - (i.offsetX || 0), "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : this.skipX = !0, null != i.y ? (this._addTween(this, "y", this.y, o(i.y, e, "y") - (i.offsetY || 0), "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : this.skipY = !0, !0
                },
                set: function(e) {
                    this._super.setRatio.call(this, e);
                    var n = this._wdw || !this.skipX ? this.getX() : this.xPrev,
                        r = this._wdw || !this.skipY ? this.getY() : this.yPrev,
                        s = r - this.yPrev,
                        o = n - this.xPrev,
                        l = a.autoKillThreshold;
                    this.x < 0 && (this.x = 0), this.y < 0 && (this.y = 0), this._autoKill && (!this.skipX && (o > l || o < -l) && n < i(this._target, "x") && (this.skipX = !0), !this.skipY && (s > l || s < -l) && r < i(this._target, "y") && (this.skipY = !0), this.skipX && this.skipY && (this._tween.kill(), this.vars.onAutoKill && this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))), this._wdw ? t.scrollTo(this.skipX ? n : this.x, this.skipY ? r : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)), this.xPrev = this.x, this.yPrev = this.y
                }
            }),
            l = a.prototype;
        a.max = i, a.getOffset = s, a.buildGetter = r, a.autoKillThreshold = 7, l._kill = function(e) {
            return e.scrollTo_x && (this.skipX = !0), e.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, e)
        }
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(e) {
        "use strict";
        var t = function() {
            return (_gsScope.GreenSockGlobals || _gsScope)[e]
        };
        "undefined" != typeof module && module.exports ? (require("../TweenLite.js"), module.exports = t()) : "function" == typeof define && define.amd && define(["TweenLite"], t)
    }("ScrollToPlugin"),
    function(e, t) {
        "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
            return t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("jquery")) : e.jQueryBridget = t(e, e.jQuery)
    }(window, function(e, t) {
        "use strict";

        function i(i, s, a) {
            function l(e, t, n) {
                var r, s = "$()." + i + '("' + t + '")';
                return e.each(function(e, l) {
                    var c = a.data(l, i);
                    if (!c) return void o(i + " not initialized. Cannot call methods, i.e. " + s);
                    var u = c[t];
                    if (!u || "_" == t.charAt(0)) return void o(s + " is not a valid method");
                    var d = u.apply(c, n);
                    r = void 0 === r ? d : r
                }), void 0 !== r ? r : e
            }

            function c(e, t) {
                e.each(function(e, n) {
                    var r = a.data(n, i);
                    r ? (r.option(t), r._init()) : (r = new s(n, t), a.data(n, i, r))
                })
            }
            a = a || t || e.jQuery, a && (s.prototype.option || (s.prototype.option = function(e) {
                a.isPlainObject(e) && (this.options = a.extend(!0, this.options, e))
            }), a.fn[i] = function(e) {
                if ("string" == typeof e) {
                    var t = r.call(arguments, 1);
                    return l(this, e, t)
                }
                return c(this, e), this
            }, n(a))
        }

        function n(e) {
            !e || e && e.bridget || (e.bridget = i)
        }
        var r = Array.prototype.slice,
            s = e.console,
            o = "undefined" == typeof s ? function() {} : function(e) {
                s.error(e)
            };
        return n(t || e.jQuery), i
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
    }("undefined" != typeof window ? window : this, function() {
        function e() {}
        var t = e.prototype;
        return t.on = function(e, t) {
            if (e && t) {
                var i = this._events = this._events || {},
                    n = i[e] = i[e] || [];
                return n.indexOf(t) == -1 && n.push(t), this
            }
        }, t.once = function(e, t) {
            if (e && t) {
                this.on(e, t);
                var i = this._onceEvents = this._onceEvents || {},
                    n = i[e] = i[e] || {};
                return n[t] = !0, this
            }
        }, t.off = function(e, t) {
            var i = this._events && this._events[e];
            if (i && i.length) {
                var n = i.indexOf(t);
                return n != -1 && i.splice(n, 1), this
            }
        }, t.emitEvent = function(e, t) {
            var i = this._events && this._events[e];
            if (i && i.length) {
                var n = 0,
                    r = i[n];
                t = t || [];
                for (var s = this._onceEvents && this._onceEvents[e]; r;) {
                    var o = s && s[r];
                    o && (this.off(e, r), delete s[r]), r.apply(this, t), n += o ? 0 : 1, r = i[n]
                }
                return this
            }
        }, e
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
            return t()
        }) : "object" == typeof module && module.exports ? module.exports = t() : e.getSize = t()
    }(window, function() {
        "use strict";

        function e(e) {
            var t = parseFloat(e),
                i = e.indexOf("%") == -1 && !isNaN(t);
            return i && t
        }

        function t() {}

        function i() {
            for (var e = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, t = 0; t < c; t++) {
                var i = l[t];
                e[i] = 0
            }
            return e
        }

        function n(e) {
            var t = getComputedStyle(e);
            return t || a("Style returned " + t + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), t
        }

        function r() {
            if (!u) {
                u = !0;
                var t = document.createElement("div");
                t.style.width = "200px", t.style.padding = "1px 2px 3px 4px",
                    t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style.boxSizing = "border-box";
                var i = document.body || document.documentElement;
                i.appendChild(t);
                var r = n(t);
                s.isBoxSizeOuter = o = 200 == e(r.width), i.removeChild(t)
            }
        }

        function s(t) {
            if (r(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                var s = n(t);
                if ("none" == s.display) return i();
                var a = {};
                a.width = t.offsetWidth, a.height = t.offsetHeight;
                for (var u = a.isBorderBox = "border-box" == s.boxSizing, d = 0; d < c; d++) {
                    var h = l[d],
                        f = s[h],
                        p = parseFloat(f);
                    a[h] = isNaN(p) ? 0 : p
                }
                var m = a.paddingLeft + a.paddingRight,
                    g = a.paddingTop + a.paddingBottom,
                    v = a.marginLeft + a.marginRight,
                    y = a.marginTop + a.marginBottom,
                    w = a.borderLeftWidth + a.borderRightWidth,
                    _ = a.borderTopWidth + a.borderBottomWidth,
                    A = u && o,
                    x = e(s.width);
                x !== !1 && (a.width = x + (A ? 0 : m + w));
                var b = e(s.height);
                return b !== !1 && (a.height = b + (A ? 0 : g + _)), a.innerWidth = a.width - (m + w), a.innerHeight = a.height - (g + _), a.outerWidth = a.width + v, a.outerHeight = a.height + y, a
            }
        }
        var o, a = "undefined" == typeof console ? t : function(e) {},
            l = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
            c = l.length,
            u = !1;
        return s
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", t) : "object" == typeof module && module.exports ? module.exports = t() : e.matchesSelector = t()
    }(window, function() {
        "use strict";
        var e = function() {
            var e = Element.prototype;
            if (e.matches) return "matches";
            if (e.matchesSelector) return "matchesSelector";
            for (var t = ["webkit", "moz", "ms", "o"], i = 0; i < t.length; i++) {
                var n = t[i],
                    r = n + "MatchesSelector";
                if (e[r]) return r
            }
        }();
        return function(t, i) {
            return t[e](i)
        }
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
            return t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("desandro-matches-selector")) : e.fizzyUIUtils = t(e, e.matchesSelector)
    }(window, function(e, t) {
        var i = {};
        i.extend = function(e, t) {
            for (var i in t) e[i] = t[i];
            return e
        }, i.modulo = function(e, t) {
            return (e % t + t) % t
        }, i.makeArray = function(e) {
            var t = [];
            if (Array.isArray(e)) t = e;
            else if (e && "number" == typeof e.length)
                for (var i = 0; i < e.length; i++) t.push(e[i]);
            else t.push(e);
            return t
        }, i.removeFrom = function(e, t) {
            var i = e.indexOf(t);
            i != -1 && e.splice(i, 1)
        }, i.getParent = function(e, i) {
            for (; e != document.body;)
                if (e = e.parentNode, t(e, i)) return e
        }, i.getQueryElement = function(e) {
            return "string" == typeof e ? document.querySelector(e) : e
        }, i.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, i.filterFindElements = function(e, n) {
            e = i.makeArray(e);
            var r = [];
            return e.forEach(function(e) {
                if (e instanceof HTMLElement) {
                    if (!n) return void r.push(e);
                    t(e, n) && r.push(e);
                    for (var i = e.querySelectorAll(n), s = 0; s < i.length; s++) r.push(i[s])
                }
            }), r
        }, i.debounceMethod = function(e, t, i) {
            var n = e.prototype[t],
                r = t + "Timeout";
            e.prototype[t] = function() {
                var e = this[r];
                e && clearTimeout(e);
                var t = arguments,
                    s = this;
                this[r] = setTimeout(function() {
                    n.apply(s, t), delete s[r]
                }, i || 100)
            }
        }, i.docReady = function(e) {
            var t = document.readyState;
            "complete" == t || "interactive" == t ? setTimeout(e) : document.addEventListener("DOMContentLoaded", e)
        }, i.toDashed = function(e) {
            return e.replace(/(.)([A-Z])/g, function(e, t, i) {
                return t + "-" + i
            }).toLowerCase()
        };
        var n = e.console;
        return i.htmlInit = function(t, r) {
            i.docReady(function() {
                var s = i.toDashed(r),
                    o = "data-" + s,
                    a = document.querySelectorAll("[" + o + "]"),
                    l = document.querySelectorAll(".js-" + s),
                    c = i.makeArray(a).concat(i.makeArray(l)),
                    u = o + "-options",
                    d = e.jQuery;
                c.forEach(function(e) {
                    var i, s = e.getAttribute(o) || e.getAttribute(u);
                    try {
                        i = s && JSON.parse(s)
                    } catch (a) {
                        return void(n && n.error("Error parsing " + o + " on " + e.className + ": " + a))
                    }
                    var l = new t(e, i);
                    d && d.data(e, r, l)
                })
            })
        }, i
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define("flickity/js/cell", ["get-size/get-size"], function(i) {
            return t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("get-size")) : (e.Flickity = e.Flickity || {}, e.Flickity.Cell = t(e, e.getSize))
    }(window, function(e, t) {
        function i(e, t) {
            this.element = e, this.parent = t, this.create()
        }
        var n = i.prototype;
        return n.create = function() {
            this.element.style.position = "absolute", this.x = 0, this.shift = 0
        }, n.destroy = function() {
            this.element.style.position = "";
            var e = this.parent.originSide;
            this.element.style[e] = ""
        }, n.getSize = function() {
            this.size = t(this.element)
        }, n.setPosition = function(e) {
            this.x = e, this.updateTarget(), this.renderPosition(e)
        }, n.updateTarget = n.setDefaultTarget = function() {
            var e = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
            this.target = this.x + this.size[e] + this.size.width * this.parent.cellAlign
        }, n.renderPosition = function(e) {
            var t = this.parent.originSide;
            this.element.style[t] = this.parent.getPositionValue(e)
        }, n.wrapShift = function(e) {
            this.shift = e, this.renderPosition(this.x + this.parent.slideableWidth * e)
        }, n.remove = function() {
            this.element.parentNode.removeChild(this.element)
        }, i
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define("flickity/js/slide", t) : "object" == typeof module && module.exports ? module.exports = t() : (e.Flickity = e.Flickity || {}, e.Flickity.Slide = t())
    }(window, function() {
        "use strict";

        function e(e) {
            this.parent = e, this.isOriginLeft = "left" == e.originSide, this.cells = [], this.outerWidth = 0, this.height = 0
        }
        var t = e.prototype;
        return t.addCell = function(e) {
            if (this.cells.push(e), this.outerWidth += e.size.outerWidth, this.height = Math.max(e.size.outerHeight, this.height), 1 == this.cells.length) {
                this.x = e.x;
                var t = this.isOriginLeft ? "marginLeft" : "marginRight";
                this.firstMargin = e.size[t]
            }
        }, t.updateTarget = function() {
            var e = this.isOriginLeft ? "marginRight" : "marginLeft",
                t = this.getLastCell(),
                i = t ? t.size[e] : 0,
                n = this.outerWidth - (this.firstMargin + i);
            this.target = this.x + this.firstMargin + n * this.parent.cellAlign
        }, t.getLastCell = function() {
            return this.cells[this.cells.length - 1]
        }, t.select = function() {
            this.changeSelectedClass("add")
        }, t.unselect = function() {
            this.changeSelectedClass("remove")
        }, t.changeSelectedClass = function(e) {
            this.cells.forEach(function(t) {
                t.element.classList[e]("is-selected")
            })
        }, t.getCellElements = function() {
            return this.cells.map(function(e) {
                return e.element
            })
        }, e
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function(i) {
            return t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("fizzy-ui-utils")) : (e.Flickity = e.Flickity || {}, e.Flickity.animatePrototype = t(e, e.fizzyUIUtils))
    }(window, function(e, t) {
        var i = e.requestAnimationFrame || e.webkitRequestAnimationFrame,
            n = 0;
        i || (i = function(e) {
            var t = (new Date).getTime(),
                i = Math.max(0, 16 - (t - n)),
                r = setTimeout(e, i);
            return n = t + i, r
        });
        var r = {};
        r.startAnimation = function() {
            this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate())
        }, r.animate = function() {
            this.applyDragForce(), this.applySelectedAttraction();
            var e = this.x;
            if (this.integratePhysics(), this.positionSlider(), this.settle(e), this.isAnimating) {
                var t = this;
                i(function() {
                    t.animate()
                })
            }
        };
        var s = function() {
            var e = document.documentElement.style;
            return "string" == typeof e.transform ? "transform" : "WebkitTransform"
        }();
        return r.positionSlider = function() {
            var e = this.x;
            this.options.wrapAround && this.cells.length > 1 && (e = t.modulo(e, this.slideableWidth), e -= this.slideableWidth, this.shiftWrapCells(e)), e += this.cursorPosition, e = this.options.rightToLeft && s ? -e : e;
            var i = this.getPositionValue(e);
            this.slider.style[s] = this.isAnimating ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")";
            var n = this.slides[0];
            if (n) {
                var r = -this.x - n.target,
                    o = r / this.slidesWidth;
                this.dispatchEvent("scroll", null, [o, r])
            }
        }, r.positionSliderAtSelected = function() {
            this.cells.length && (this.x = -this.selectedSlide.target, this.positionSlider())
        }, r.getPositionValue = function(e) {
            return this.options.percentPosition ? .01 * Math.round(e / this.size.innerWidth * 1e4) + "%" : Math.round(e) + "px"
        }, r.settle = function(e) {
            this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * e) || this.restingFrames++, this.restingFrames > 2 && (this.isAnimating = !1, delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle"))
        }, r.shiftWrapCells = function(e) {
            var t = this.cursorPosition + e;
            this._shiftCells(this.beforeShiftCells, t, -1);
            var i = this.size.innerWidth - (e + this.slideableWidth + this.cursorPosition);
            this._shiftCells(this.afterShiftCells, i, 1)
        }, r._shiftCells = function(e, t, i) {
            for (var n = 0; n < e.length; n++) {
                var r = e[n],
                    s = t > 0 ? i : 0;
                r.wrapShift(s), t -= r.size.outerWidth
            }
        }, r._unshiftCells = function(e) {
            if (e && e.length)
                for (var t = 0; t < e.length; t++) e[t].wrapShift(0)
        }, r.integratePhysics = function() {
            this.x += this.velocity, this.velocity *= this.getFrictionFactor()
        }, r.applyForce = function(e) {
            this.velocity += e
        }, r.getFrictionFactor = function() {
            return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
        }, r.getRestingPosition = function() {
            return this.x + this.velocity / (1 - this.getFrictionFactor())
        }, r.applyDragForce = function() {
            if (this.isPointerDown) {
                var e = this.dragX - this.x,
                    t = e - this.velocity;
                this.applyForce(t)
            }
        }, r.applySelectedAttraction = function() {
            if (!this.isPointerDown && !this.isFreeScrolling && this.cells.length) {
                var e = this.selectedSlide.target * -1 - this.x,
                    t = e * this.options.selectedAttraction;
                this.applyForce(t)
            }
        }, r
    }),
    function(e, t) {
        if ("function" == typeof define && define.amd) define("flickity/js/flickity", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./cell", "./slide", "./animate"], function(i, n, r, s, o, a) {
            return t(e, i, n, r, s, o, a)
        });
        else if ("object" == typeof module && module.exports) module.exports = t(e, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./cell"), require("./slide"), require("./animate"));
        else {
            var i = e.Flickity;
            e.Flickity = t(e, e.EvEmitter, e.getSize, e.fizzyUIUtils, i.Cell, i.Slide, i.animatePrototype)
        }
    }(window, function(e, t, i, n, r, s, o) {
        function a(e, t) {
            for (e = n.makeArray(e); e.length;) t.appendChild(e.shift())
        }

        function l(e, t) {
            var i = n.getQueryElement(e);
            if (!i) return void(d && d.error("Bad element for Flickity: " + (i || e)));
            if (this.element = i, this.element.flickityGUID) {
                var r = f[this.element.flickityGUID];
                return r.option(t), r
            }
            c && (this.$element = c(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(t), this._create()
        }
        var c = e.jQuery,
            u = e.getComputedStyle,
            d = e.console,
            h = 0,
            f = {};
        l.defaults = {
            accessibility: !0,
            cellAlign: "center",
            freeScrollFriction: .075,
            friction: .28,
            namespaceJQueryEvents: !0,
            percentPosition: !0,
            resize: !0,
            selectedAttraction: .025,
            setGallerySize: !0
        }, l.createMethods = [];
        var p = l.prototype;
        n.extend(p, t.prototype), p._create = function() {
            var t = this.guid = ++h;
            this.element.flickityGUID = t, f[t] = this, this.selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", this._createSlider(), (this.options.resize || this.options.watchCSS) && e.addEventListener("resize", this), l.createMethods.forEach(function(e) {
                this[e]()
            }, this), this.options.watchCSS ? this.watchCSS() : this.activate()
        }, p.option = function(e) {
            n.extend(this.options, e)
        }, p.activate = function() {
            if (!this.isActive) {
                this.isActive = !0, this.element.classList.add("flickity-enabled"), this.options.rightToLeft && this.element.classList.add("flickity-rtl"), this.getSize();
                var e = this._filterFindCellElements(this.element.children);
                a(e, this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, this.element.addEventListener("keydown", this)), this.emitEvent("activate");
                var t, i = this.options.initialIndex;
                t = this.isInitActivated ? this.selectedIndex : void 0 !== i && this.cells[i] ? i : 0, this.select(t, !1, !0), this.isInitActivated = !0
            }
        }, p._createSlider = function() {
            var e = document.createElement("div");
            e.className = "flickity-slider", e.style[this.originSide] = 0, this.slider = e
        }, p._filterFindCellElements = function(e) {
            return n.filterFindElements(e, this.options.cellSelector)
        }, p.reloadCells = function() {
            this.cells = this._makeCells(this.slider.children), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize()
        }, p._makeCells = function(e) {
            var t = this._filterFindCellElements(e),
                i = t.map(function(e) {
                    return new r(e, this)
                }, this);
            return i
        }, p.getLastCell = function() {
            return this.cells[this.cells.length - 1]
        }, p.getLastSlide = function() {
            return this.slides[this.slides.length - 1]
        }, p.positionCells = function() {
            this._sizeCells(this.cells), this._positionCells(0)
        }, p._positionCells = function(e) {
            e = e || 0, this.maxCellHeight = e ? this.maxCellHeight || 0 : 0;
            var t = 0;
            if (e > 0) {
                var i = this.cells[e - 1];
                t = i.x + i.size.outerWidth
            }
            for (var n = this.cells.length, r = e; r < n; r++) {
                var s = this.cells[r];
                s.setPosition(t), t += s.size.outerWidth, this.maxCellHeight = Math.max(s.size.outerHeight, this.maxCellHeight)
            }
            this.slideableWidth = t, this.updateSlides(), this._containSlides(), this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0
        }, p._sizeCells = function(e) {
            e.forEach(function(e) {
                e.getSize()
            })
        }, p.updateSlides = function() {
            if (this.slides = [], this.cells.length) {
                var e = new s(this);
                this.slides.push(e);
                var t = "left" == this.originSide,
                    i = t ? "marginRight" : "marginLeft",
                    n = this._getCanCellFit();
                this.cells.forEach(function(t, r) {
                    if (!e.cells.length) return void e.addCell(t);
                    var o = e.outerWidth - e.firstMargin + (t.size.outerWidth - t.size[i]);
                    n.call(this, r, o) ? e.addCell(t) : (e.updateTarget(), e = new s(this), this.slides.push(e), e.addCell(t))
                }, this), e.updateTarget(), this.updateSelectedSlide()
            }
        }, p._getCanCellFit = function() {
            var e = this.options.groupCells;
            if (!e) return function() {
                return !1
            };
            if ("number" == typeof e) {
                var t = parseInt(e, 10);
                return function(e) {
                    return e % t !== 0
                }
            }
            var i = "string" == typeof e && e.match(/^(\d+)%$/),
                n = i ? parseInt(i[1], 10) / 100 : 1;
            return function(e, t) {
                return t <= (this.size.innerWidth + 1) * n
            }
        }, p._init = p.reposition = function() {
            this.positionCells(), this.positionSliderAtSelected()
        }, p.getSize = function() {
            this.size = i(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign
        };
        var m = {
            center: {
                left: .5,
                right: .5
            },
            left: {
                left: 0,
                right: 1
            },
            right: {
                right: 0,
                left: 1
            }
        };
        return p.setCellAlign = function() {
            var e = m[this.options.cellAlign];
            this.cellAlign = e ? e[this.originSide] : this.options.cellAlign
        }, p.setGallerySize = function() {
            if (this.options.setGallerySize) {
                var e = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
                this.viewport.style.height = e + "px"
            }
        }, p._getWrapShiftCells = function() {
            if (this.options.wrapAround) {
                this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
                var e = this.cursorPosition,
                    t = this.cells.length - 1;
                this.beforeShiftCells = this._getGapCells(e, t, -1), e = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(e, 0, 1)
            }
        }, p._getGapCells = function(e, t, i) {
            for (var n = []; e > 0;) {
                var r = this.cells[t];
                if (!r) break;
                n.push(r), t += i, e -= r.size.outerWidth
            }
            return n
        }, p._containSlides = function() {
            if (this.options.contain && !this.options.wrapAround && this.cells.length) {
                var e = this.options.rightToLeft,
                    t = e ? "marginRight" : "marginLeft",
                    i = e ? "marginLeft" : "marginRight",
                    n = this.slideableWidth - this.getLastCell().size[i],
                    r = n < this.size.innerWidth,
                    s = this.cursorPosition + this.cells[0].size[t],
                    o = n - this.size.innerWidth * (1 - this.cellAlign);
                this.slides.forEach(function(e) {
                    r ? e.target = n * this.cellAlign : (e.target = Math.max(e.target, s), e.target = Math.min(e.target, o))
                }, this)
            }
        }, p.dispatchEvent = function(e, t, i) {
            var n = t ? [t].concat(i) : i;
            if (this.emitEvent(e, n), c && this.$element) {
                e += this.options.namespaceJQueryEvents ? ".flickity" : "";
                var r = e;
                if (t) {
                    var s = c.Event(t);
                    s.type = e, r = s
                }
                this.$element.trigger(r, i)
            }
        }, p.select = function(e, t, i) {
            this.isActive && (e = parseInt(e, 10), this._wrapSelect(e), (this.options.wrapAround || t) && (e = n.modulo(e, this.slides.length)), this.slides[e] && (this.selectedIndex = e, this.updateSelectedSlide(), i ? this.positionSliderAtSelected() : this.startAnimation(), this.options.adaptiveHeight && this.setGallerySize(), this.dispatchEvent("select"), this.dispatchEvent("cellSelect")))
        }, p._wrapSelect = function(e) {
            var t = this.slides.length,
                i = this.options.wrapAround && t > 1;
            if (!i) return e;
            var r = n.modulo(e, t),
                s = Math.abs(r - this.selectedIndex),
                o = Math.abs(r + t - this.selectedIndex),
                a = Math.abs(r - t - this.selectedIndex);
            !this.isDragSelect && o < s ? e += t : !this.isDragSelect && a < s && (e -= t), e < 0 ? this.x -= this.slideableWidth : e >= t && (this.x += this.slideableWidth)
        }, p.previous = function(e, t) {
            this.select(this.selectedIndex - 1, e, t)
        }, p.next = function(e, t) {
            this.select(this.selectedIndex + 1, e, t)
        }, p.updateSelectedSlide = function() {
            var e = this.slides[this.selectedIndex];
            e && (this.unselectSelectedSlide(), this.selectedSlide = e, e.select(), this.selectedCells = e.cells, this.selectedElements = e.getCellElements(), this.selectedCell = e.cells[0], this.selectedElement = this.selectedElements[0])
        }, p.unselectSelectedSlide = function() {
            this.selectedSlide && this.selectedSlide.unselect()
        }, p.selectCell = function(e, t, i) {
            var n;
            "number" == typeof e ? n = this.cells[e] : ("string" == typeof e && (e = this.element.querySelector(e)), n = this.getCell(e));
            for (var r = 0; n && r < this.slides.length; r++) {
                var s = this.slides[r],
                    o = s.cells.indexOf(n);
                if (o != -1) return void this.select(r, t, i)
            }
        }, p.getCell = function(e) {
            for (var t = 0; t < this.cells.length; t++) {
                var i = this.cells[t];
                if (i.element == e) return i
            }
        }, p.getCells = function(e) {
            e = n.makeArray(e);
            var t = [];
            return e.forEach(function(e) {
                var i = this.getCell(e);
                i && t.push(i)
            }, this), t
        }, p.getCellElements = function() {
            return this.cells.map(function(e) {
                return e.element
            })
        }, p.getParentCell = function(e) {
            var t = this.getCell(e);
            return t ? t : (e = n.getParent(e, ".flickity-slider > *"), this.getCell(e))
        }, p.getAdjacentCellElements = function(e, t) {
            if (!e) return this.selectedSlide.getCellElements();
            t = void 0 === t ? this.selectedIndex : t;
            var i = this.slides.length;
            if (1 + 2 * e >= i) return this.getCellElements();
            for (var r = [], s = t - e; s <= t + e; s++) {
                var o = this.options.wrapAround ? n.modulo(s, i) : s,
                    a = this.slides[o];
                a && (r = r.concat(a.getCellElements()))
            }
            return r
        }, p.uiChange = function() {
            this.emitEvent("uiChange")
        }, p.childUIPointerDown = function(e) {
            this.emitEvent("childUIPointerDown", [e])
        }, p.onresize = function() {
            this.watchCSS(), this.resize()
        }, n.debounceMethod(l, "onresize", 150), p.resize = function() {
            if (this.isActive) {
                this.getSize(), this.options.wrapAround && (this.x = n.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize");
                var e = this.selectedElements && this.selectedElements[0];
                this.selectCell(e, !1, !0)
            }
        }, p.watchCSS = function() {
            var e = this.options.watchCSS;
            if (e) {
                var t = u(this.element, ":after").content;
                t.indexOf("flickity") != -1 ? this.activate() : this.deactivate()
            }
        }, p.onkeydown = function(e) {
            if (this.options.accessibility && (!document.activeElement || document.activeElement == this.element))
                if (37 == e.keyCode) {
                    var t = this.options.rightToLeft ? "next" : "previous";
                    this.uiChange(), this[t]()
                } else if (39 == e.keyCode) {
                var i = this.options.rightToLeft ? "previous" : "next";
                this.uiChange(), this[i]()
            }
        }, p.deactivate = function() {
            this.isActive && (this.element.classList.remove("flickity-enabled"), this.element.classList.remove("flickity-rtl"), this.cells.forEach(function(e) {
                e.destroy()
            }), this.unselectSelectedSlide(), this.element.removeChild(this.viewport), a(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)), this.isActive = !1, this.emitEvent("deactivate"))
        }, p.destroy = function() {
            this.deactivate(), e.removeEventListener("resize", this), this.emitEvent("destroy"), c && this.$element && c.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete f[this.guid]
        }, n.extend(p, o), l.data = function(e) {
            e = n.getQueryElement(e);
            var t = e && e.flickityGUID;
            return t && f[t]
        }, n.htmlInit(l, "flickity"), c && c.bridget && c.bridget("flickity", l), l.Cell = r, l
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define("unipointer/unipointer", ["ev-emitter/ev-emitter"], function(i) {
            return t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.Unipointer = t(e, e.EvEmitter)
    }(window, function(e, t) {
        function i() {}

        function n() {}
        var r = n.prototype = Object.create(t.prototype);
        r.bindStartEvent = function(e) {
            this._bindStartEvent(e, !0)
        }, r.unbindStartEvent = function(e) {
            this._bindStartEvent(e, !1)
        }, r._bindStartEvent = function(t, i) {
            i = void 0 === i || !!i;
            var n = i ? "addEventListener" : "removeEventListener";
            e.navigator.pointerEnabled ? t[n]("pointerdown", this) : e.navigator.msPointerEnabled ? t[n]("MSPointerDown", this) : (t[n]("mousedown", this), t[n]("touchstart", this))
        }, r.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, r.getTouch = function(e) {
            for (var t = 0; t < e.length; t++) {
                var i = e[t];
                if (i.identifier == this.pointerIdentifier) return i
            }
        }, r.onmousedown = function(e) {
            var t = e.button;
            t && 0 !== t && 1 !== t || this._pointerDown(e, e)
        }, r.ontouchstart = function(e) {
            this._pointerDown(e, e.changedTouches[0])
        }, r.onMSPointerDown = r.onpointerdown = function(e) {
            this._pointerDown(e, e)
        }, r._pointerDown = function(e, t) {
            this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== t.pointerId ? t.pointerId : t.identifier, this.pointerDown(e, t))
        }, r.pointerDown = function(e, t) {
            this._bindPostStartEvents(e), this.emitEvent("pointerDown", [e, t])
        };
        var s = {
            mousedown: ["mousemove", "mouseup"],
            touchstart: ["touchmove", "touchend", "touchcancel"],
            pointerdown: ["pointermove", "pointerup", "pointercancel"],
            MSPointerDown: ["MSPointerMove", "MSPointerUp", "MSPointerCancel"]
        };
        return r._bindPostStartEvents = function(t) {
            if (t) {
                var i = s[t.type];
                i.forEach(function(t) {
                    e.addEventListener(t, this)
                }, this), this._boundPointerEvents = i
            }
        }, r._unbindPostStartEvents = function() {
            this._boundPointerEvents && (this._boundPointerEvents.forEach(function(t) {
                e.removeEventListener(t, this)
            }, this), delete this._boundPointerEvents)
        }, r.onmousemove = function(e) {
            this._pointerMove(e, e)
        }, r.onMSPointerMove = r.onpointermove = function(e) {
            e.pointerId == this.pointerIdentifier && this._pointerMove(e, e)
        }, r.ontouchmove = function(e) {
            var t = this.getTouch(e.changedTouches);
            t && this._pointerMove(e, t)
        }, r._pointerMove = function(e, t) {
            this.pointerMove(e, t)
        }, r.pointerMove = function(e, t) {
            this.emitEvent("pointerMove", [e, t])
        }, r.onmouseup = function(e) {
            this._pointerUp(e, e)
        }, r.onMSPointerUp = r.onpointerup = function(e) {
            e.pointerId == this.pointerIdentifier && this._pointerUp(e, e)
        }, r.ontouchend = function(e) {
            var t = this.getTouch(e.changedTouches);
            t && this._pointerUp(e, t)
        }, r._pointerUp = function(e, t) {
            this._pointerDone(), this.pointerUp(e, t)
        }, r.pointerUp = function(e, t) {
            this.emitEvent("pointerUp", [e, t])
        }, r._pointerDone = function() {
            this.isPointerDown = !1, delete this.pointerIdentifier, this._unbindPostStartEvents(), this.pointerDone()
        }, r.pointerDone = i, r.onMSPointerCancel = r.onpointercancel = function(e) {
            e.pointerId == this.pointerIdentifier && this._pointerCancel(e, e)
        }, r.ontouchcancel = function(e) {
            var t = this.getTouch(e.changedTouches);
            t && this._pointerCancel(e, t)
        }, r._pointerCancel = function(e, t) {
            this._pointerDone(), this.pointerCancel(e, t)
        }, r.pointerCancel = function(e, t) {
            this.emitEvent("pointerCancel", [e, t])
        }, n.getPointerPoint = function(e) {
            return {
                x: e.pageX,
                y: e.pageY
            }
        }, n
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define("unidragger/unidragger", ["unipointer/unipointer"], function(i) {
            return t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("unipointer")) : e.Unidragger = t(e, e.Unipointer)
    }(window, function(e, t) {
        function i() {}

        function n() {}
        var r = n.prototype = Object.create(t.prototype);
        r.bindHandles = function() {
            this._bindHandles(!0)
        }, r.unbindHandles = function() {
            this._bindHandles(!1)
        };
        var s = e.navigator;
        return r._bindHandles = function(e) {
            e = void 0 === e || !!e;
            var t;
            t = s.pointerEnabled ? function(t) {
                t.style.touchAction = e ? "none" : ""
            } : s.msPointerEnabled ? function(t) {
                t.style.msTouchAction = e ? "none" : ""
            } : i;
            for (var n = e ? "addEventListener" : "removeEventListener", r = 0; r < this.handles.length; r++) {
                var o = this.handles[r];
                this._bindStartEvent(o, e), t(o), o[n]("click", this)
            }
        }, r.pointerDown = function(e, t) {
            if ("INPUT" == e.target.nodeName && "range" == e.target.type) return this.isPointerDown = !1, void delete this.pointerIdentifier;
            this._dragPointerDown(e, t);
            var i = document.activeElement;
            i && i.blur && i.blur(), this._bindPostStartEvents(e), this.emitEvent("pointerDown", [e, t])
        }, r._dragPointerDown = function(e, i) {
            this.pointerDownPoint = t.getPointerPoint(i);
            var n = this.canPreventDefaultOnPointerDown(e, i);
            n && e.preventDefault()
        }, r.canPreventDefaultOnPointerDown = function(e) {
            return "SELECT" != e.target.nodeName
        }, r.pointerMove = function(e, t) {
            var i = this._dragPointerMove(e, t);
            this.emitEvent("pointerMove", [e, t, i]), this._dragMove(e, t, i)
        }, r._dragPointerMove = function(e, i) {
            var n = t.getPointerPoint(i),
                r = {
                    x: n.x - this.pointerDownPoint.x,
                    y: n.y - this.pointerDownPoint.y
                };
            return !this.isDragging && this.hasDragStarted(r) && this._dragStart(e, i), r
        }, r.hasDragStarted = function(e) {
            return Math.abs(e.x) > 3 || Math.abs(e.y) > 3
        }, r.pointerUp = function(e, t) {
            this.emitEvent("pointerUp", [e, t]), this._dragPointerUp(e, t)
        }, r._dragPointerUp = function(e, t) {
            this.isDragging ? this._dragEnd(e, t) : this._staticClick(e, t)
        }, r._dragStart = function(e, i) {
            this.isDragging = !0, this.dragStartPoint = t.getPointerPoint(i), this.isPreventingClicks = !0, this.dragStart(e, i)
        }, r.dragStart = function(e, t) {
            this.emitEvent("dragStart", [e, t])
        }, r._dragMove = function(e, t, i) {
            this.isDragging && this.dragMove(e, t, i)
        }, r.dragMove = function(e, t, i) {
            e.preventDefault(), this.emitEvent("dragMove", [e, t, i])
        }, r._dragEnd = function(e, t) {
            this.isDragging = !1, setTimeout(function() {
                delete this.isPreventingClicks
            }.bind(this)), this.dragEnd(e, t)
        }, r.dragEnd = function(e, t) {
            this.emitEvent("dragEnd", [e, t])
        }, r.onclick = function(e) {
            this.isPreventingClicks && e.preventDefault()
        }, r._staticClick = function(e, t) {
            if (!this.isIgnoringMouseUp || "mouseup" != e.type) {
                var i = e.target.nodeName;
                "INPUT" != i && "TEXTAREA" != i || e.target.focus(), this.staticClick(e, t), "mouseup" != e.type && (this.isIgnoringMouseUp = !0, setTimeout(function() {
                    delete this.isIgnoringMouseUp
                }.bind(this), 400))
            }
        }, r.staticClick = function(e, t) {
            this.emitEvent("staticClick", [e, t])
        }, n.getPointerPoint = t.getPointerPoint, n
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define("flickity/js/drag", ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"], function(i, n, r) {
            return t(e, i, n, r)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("./flickity"), require("unidragger"), require("fizzy-ui-utils")) : e.Flickity = t(e, e.Flickity, e.Unidragger, e.fizzyUIUtils)
    }(window, function(e, t, i, n) {
        function r() {
            return {
                x: e.pageXOffset,
                y: e.pageYOffset
            }
        }
        n.extend(t.defaults, {
            draggable: !0,
            dragThreshold: 3
        }), t.createMethods.push("_createDrag");
        var s = t.prototype;
        n.extend(s, i.prototype);
        var o = "createTouch" in document,
            a = !1;
        s._createDrag = function() {
            this.on("activate", this.bindDrag), this.on("uiChange", this._uiChangeDrag), this.on("childUIPointerDown", this._childUIPointerDownDrag), this.on("deactivate", this.unbindDrag), o && !a && (e.addEventListener("touchmove", function() {}), a = !0)
        }, s.bindDrag = function() {
            this.options.draggable && !this.isDragBound && (this.element.classList.add("is-draggable"), this.handles = [this.viewport], this.bindHandles(), this.isDragBound = !0)
        }, s.unbindDrag = function() {
            this.isDragBound && (this.element.classList.remove("is-draggable"), this.unbindHandles(), delete this.isDragBound)
        }, s._uiChangeDrag = function() {
            delete this.isFreeScrolling
        }, s._childUIPointerDownDrag = function(e) {
            e.preventDefault(), this.pointerDownFocus(e)
        };
        var l = {
                TEXTAREA: !0,
                INPUT: !0,
                OPTION: !0
            },
            c = {
                radio: !0,
                checkbox: !0,
                button: !0,
                submit: !0,
                image: !0,
                file: !0
            };
        s.pointerDown = function(t, i) {
            var n = l[t.target.nodeName] && !c[t.target.type];
            if (n) return this.isPointerDown = !1, void delete this.pointerIdentifier;
            this._dragPointerDown(t, i);
            var s = document.activeElement;
            s && s.blur && s != this.element && s != document.body && s.blur(), this.pointerDownFocus(t), this.dragX = this.x, this.viewport.classList.add("is-pointer-down"), this._bindPostStartEvents(t), this.pointerDownScroll = r(), e.addEventListener("scroll", this), this.dispatchEvent("pointerDown", t, [i])
        };
        var u = {
                touchstart: !0,
                MSPointerDown: !0
            },
            d = {
                INPUT: !0,
                SELECT: !0
            };
        return s.pointerDownFocus = function(t) {
            if (this.options.accessibility && !u[t.type] && !d[t.target.nodeName]) {
                var i = e.pageYOffset;
                this.element.focus(), e.pageYOffset != i && e.scrollTo(e.pageXOffset, i)
            }
        }, s.canPreventDefaultOnPointerDown = function(e) {
            var t = "touchstart" == e.type,
                i = e.target.nodeName;
            return !t && "SELECT" != i
        }, s.hasDragStarted = function(e) {
            return Math.abs(e.x) > this.options.dragThreshold
        }, s.pointerUp = function(e, t) {
            delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", e, [t]), this._dragPointerUp(e, t)
        }, s.pointerDone = function() {
            e.removeEventListener("scroll", this), delete this.pointerDownScroll
        }, s.dragStart = function(t, i) {
            this.dragStartPosition = this.x, this.startAnimation(), e.removeEventListener("scroll", this), this.dispatchEvent("dragStart", t, [i])
        }, s.pointerMove = function(e, t) {
            var i = this._dragPointerMove(e, t);
            this.dispatchEvent("pointerMove", e, [t, i]), this._dragMove(e, t, i)
        }, s.dragMove = function(e, t, i) {
            e.preventDefault(), this.previousDragX = this.dragX;
            var n = this.options.rightToLeft ? -1 : 1,
                r = this.dragStartPosition + i.x * n;
            if (!this.options.wrapAround && this.slides.length) {
                var s = Math.max(-this.slides[0].target, this.dragStartPosition);
                r = r > s ? .5 * (r + s) : r;
                var o = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                r = r < o ? .5 * (r + o) : r
            }
            this.dragX = r, this.dragMoveTime = new Date, this.dispatchEvent("dragMove", e, [t, i])
        }, s.dragEnd = function(e, t) {
            this.options.freeScroll && (this.isFreeScrolling = !0);
            var i = this.dragEndRestingSelect();
            if (this.options.freeScroll && !this.options.wrapAround) {
                var n = this.getRestingPosition();
                this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target
            } else this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
            delete this.previousDragX, this.isDragSelect = this.options.wrapAround, this.select(i), delete this.isDragSelect, this.dispatchEvent("dragEnd", e, [t])
        }, s.dragEndRestingSelect = function() {
            var e = this.getRestingPosition(),
                t = Math.abs(this.getSlideDistance(-e, this.selectedIndex)),
                i = this._getClosestResting(e, t, 1),
                n = this._getClosestResting(e, t, -1),
                r = i.distance < n.distance ? i.index : n.index;
            return r
        }, s._getClosestResting = function(e, t, i) {
            for (var n = this.selectedIndex, r = 1 / 0, s = this.options.contain && !this.options.wrapAround ? function(e, t) {
                    return e <= t
                } : function(e, t) {
                    return e < t
                }; s(t, r) && (n += i, r = t, t = this.getSlideDistance(-e, n), null !== t);) t = Math.abs(t);
            return {
                distance: r,
                index: n - i
            }
        }, s.getSlideDistance = function(e, t) {
            var i = this.slides.length,
                r = this.options.wrapAround && i > 1,
                s = r ? n.modulo(t, i) : t,
                o = this.slides[s];
            if (!o) return null;
            var a = r ? this.slideableWidth * Math.floor(t / i) : 0;
            return e - (o.target + a)
        }, s.dragEndBoostSelect = function() {
            if (void 0 === this.previousDragX || !this.dragMoveTime || new Date - this.dragMoveTime > 100) return 0;
            var e = this.getSlideDistance(-this.dragX, this.selectedIndex),
                t = this.previousDragX - this.dragX;
            return e > 0 && t > 0 ? 1 : e < 0 && t < 0 ? -1 : 0
        }, s.staticClick = function(e, t) {
            var i = this.getParentCell(e.target),
                n = i && i.element,
                r = i && this.cells.indexOf(i);
            this.dispatchEvent("staticClick", e, [t, n, r])
        }, s.onscroll = function() {
            var e = r(),
                t = this.pointerDownScroll.x - e.x,
                i = this.pointerDownScroll.y - e.y;
            (Math.abs(t) > 3 || Math.abs(i) > 3) && this._pointerDone()
        }, t
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define("tap-listener/tap-listener", ["unipointer/unipointer"], function(i) {
            return t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("unipointer")) : e.TapListener = t(e, e.Unipointer)
    }(window, function(e, t) {
        function i(e) {
            this.bindTap(e)
        }
        var n = i.prototype = Object.create(t.prototype);
        return n.bindTap = function(e) {
            e && (this.unbindTap(), this.tapElement = e, this._bindStartEvent(e, !0))
        }, n.unbindTap = function() {
            this.tapElement && (this._bindStartEvent(this.tapElement, !0), delete this.tapElement)
        }, n.pointerUp = function(i, n) {
            if (!this.isIgnoringMouseUp || "mouseup" != i.type) {
                var r = t.getPointerPoint(n),
                    s = this.tapElement.getBoundingClientRect(),
                    o = e.pageXOffset,
                    a = e.pageYOffset,
                    l = r.x >= s.left + o && r.x <= s.right + o && r.y >= s.top + a && r.y <= s.bottom + a;
                if (l && this.emitEvent("tap", [i, n]), "mouseup" != i.type) {
                    this.isIgnoringMouseUp = !0;
                    var c = this;
                    setTimeout(function() {
                        delete c.isIgnoringMouseUp
                    }, 400)
                }
            }
        }, n.destroy = function() {
            this.pointerDone(), this.unbindTap()
        }, i
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define("flickity/js/prev-next-button", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(i, n, r) {
            return t(e, i, n, r)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : t(e, e.Flickity, e.TapListener, e.fizzyUIUtils)
    }(window, function(e, t, i, n) {
        "use strict";

        function r(e, t) {
            this.direction = e, this.parent = t, this._create()
        }

        function s(e) {
            return "string" == typeof e ? e : "M " + e.x0 + ",50 L " + e.x1 + "," + (e.y1 + 50) + " L " + e.x2 + "," + (e.y2 + 50) + " L " + e.x3 + ",50  L " + e.x2 + "," + (50 - e.y2) + " L " + e.x1 + "," + (50 - e.y1) + " Z"
        }
        var o = "http://www.w3.org/2000/svg";
        r.prototype = new i, r.prototype._create = function() {
            this.isEnabled = !0, this.isPrevious = this.direction == -1;
            var e = this.parent.options.rightToLeft ? 1 : -1;
            this.isLeft = this.direction == e;
            var t = this.element = document.createElement("button");
            t.className = "flickity-prev-next-button", t.className += this.isPrevious ? " previous" : " next", t.setAttribute("type", "button"), this.disable(), t.setAttribute("aria-label", this.isPrevious ? "previous" : "next");
            var i = this.createSVG();
            t.appendChild(i), this.on("tap", this.onTap), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
        }, r.prototype.activate = function() {
            this.bindTap(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element)
        }, r.prototype.deactivate = function() {
            this.parent.element.removeChild(this.element), i.prototype.destroy.call(this), this.element.removeEventListener("click", this)
        }, r.prototype.createSVG = function() {
            var e = document.createElementNS(o, "svg");
            e.setAttribute("viewBox", "0 0 100 100");
            var t = document.createElementNS(o, "path"),
                i = s(this.parent.options.arrowShape);
            return t.setAttribute("d", i), t.setAttribute("class", "arrow"), this.isLeft || t.setAttribute("transform", "translate(100, 100) rotate(180) "), e.appendChild(t), e
        }, r.prototype.onTap = function() {
            if (this.isEnabled) {
                this.parent.uiChange();
                var e = this.isPrevious ? "previous" : "next";
                this.parent[e]()
            }
        }, r.prototype.handleEvent = n.handleEvent, r.prototype.onclick = function() {
            var e = document.activeElement;
            e && e == this.element && this.onTap()
        }, r.prototype.enable = function() {
            this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0)
        }, r.prototype.disable = function() {
            this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1)
        }, r.prototype.update = function() {
            var e = this.parent.slides;
            if (this.parent.options.wrapAround && e.length > 1) return void this.enable();
            var t = e.length ? e.length - 1 : 0,
                i = this.isPrevious ? 0 : t,
                n = this.parent.selectedIndex == i ? "disable" : "enable";
            this[n]()
        }, r.prototype.destroy = function() {
            this.deactivate()
        }, n.extend(t.defaults, {
            prevNextButtons: !0,
            arrowShape: {
                x0: 10,
                x1: 60,
                y1: 50,
                x2: 70,
                y2: 40,
                x3: 30
            }
        }), t.createMethods.push("_createPrevNextButtons");
        var a = t.prototype;
        return a._createPrevNextButtons = function() {
            this.options.prevNextButtons && (this.prevButton = new r((-1), this), this.nextButton = new r(1, this), this.on("activate", this.activatePrevNextButtons))
        }, a.activatePrevNextButtons = function() {
            this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons)
        }, a.deactivatePrevNextButtons = function() {
            this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons)
        }, t.PrevNextButton = r, t
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define("flickity/js/page-dots", ["./flickity", "tap-listener/tap-listener", "fizzy-ui-utils/utils"], function(i, n, r) {
            return t(e, i, n, r)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("./flickity"), require("tap-listener"), require("fizzy-ui-utils")) : t(e, e.Flickity, e.TapListener, e.fizzyUIUtils)
    }(window, function(e, t, i, n) {
        function r(e) {
            this.parent = e, this._create()
        }
        r.prototype = new i, r.prototype._create = function() {
            this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", this.dots = [], this.on("tap", this.onTap), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
        }, r.prototype.activate = function() {
            this.setDots(), this.bindTap(this.holder), this.parent.element.appendChild(this.holder)
        }, r.prototype.deactivate = function() {
            this.parent.element.removeChild(this.holder), i.prototype.destroy.call(this)
        }, r.prototype.setDots = function() {
            var e = this.parent.slides.length - this.dots.length;
            e > 0 ? this.addDots(e) : e < 0 && this.removeDots(-e)
        }, r.prototype.addDots = function(e) {
            for (var t = document.createDocumentFragment(), i = []; e;) {
                var n = document.createElement("li");
                n.className = "dot", t.appendChild(n), i.push(n), e--
            }
            this.holder.appendChild(t), this.dots = this.dots.concat(i)
        }, r.prototype.removeDots = function(e) {
            var t = this.dots.splice(this.dots.length - e, e);
            t.forEach(function(e) {
                this.holder.removeChild(e)
            }, this)
        }, r.prototype.updateSelected = function() {
            this.selectedDot && (this.selectedDot.className = "dot"), this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected")
        }, r.prototype.onTap = function(e) {
            var t = e.target;
            if ("LI" == t.nodeName) {
                this.parent.uiChange();
                var i = this.dots.indexOf(t);
                this.parent.select(i)
            }
        }, r.prototype.destroy = function() {
            this.deactivate()
        }, t.PageDots = r, n.extend(t.defaults, {
            pageDots: !0
        }), t.createMethods.push("_createPageDots");
        var s = t.prototype;
        return s._createPageDots = function() {
            this.options.pageDots && (this.pageDots = new r(this), this.on("activate", this.activatePageDots), this.on("select", this.updateSelectedPageDots), this.on("cellChange", this.updatePageDots), this.on("resize", this.updatePageDots), this.on("deactivate", this.deactivatePageDots))
        }, s.activatePageDots = function() {
            this.pageDots.activate()
        }, s.updateSelectedPageDots = function() {
            this.pageDots.updateSelected()
        }, s.updatePageDots = function() {
            this.pageDots.setDots()
        }, s.deactivatePageDots = function() {
            this.pageDots.deactivate()
        }, t.PageDots = r, t
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define("flickity/js/player", ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"], function(e, i, n) {
            return t(e, i, n)
        }) : "object" == typeof module && module.exports ? module.exports = t(require("ev-emitter"), require("fizzy-ui-utils"), require("./flickity")) : t(e.EvEmitter, e.fizzyUIUtils, e.Flickity)
    }(window, function(e, t, i) {
        function n(e) {
            this.parent = e, this.state = "stopped", s && (this.onVisibilityChange = function() {
                this.visibilityChange()
            }.bind(this), this.onVisibilityPlay = function() {
                this.visibilityPlay()
            }.bind(this))
        }
        var r, s;
        "hidden" in document ? (r = "hidden", s = "visibilitychange") : "webkitHidden" in document && (r = "webkitHidden", s = "webkitvisibilitychange"), n.prototype = Object.create(e.prototype), n.prototype.play = function() {
            if ("playing" != this.state) {
                var e = document[r];
                if (s && e) return void document.addEventListener(s, this.onVisibilityPlay);
                this.state = "playing", s && document.addEventListener(s, this.onVisibilityChange), this.tick()
            }
        }, n.prototype.tick = function() {
            if ("playing" == this.state) {
                var e = this.parent.options.autoPlay;
                e = "number" == typeof e ? e : 3e3;
                var t = this;
                this.clear(), this.timeout = setTimeout(function() {
                    t.parent.next(!0), t.tick()
                }, e)
            }
        }, n.prototype.stop = function() {
            this.state = "stopped", this.clear(), s && document.removeEventListener(s, this.onVisibilityChange)
        }, n.prototype.clear = function() {
            clearTimeout(this.timeout)
        }, n.prototype.pause = function() {
            "playing" == this.state && (this.state = "paused", this.clear())
        }, n.prototype.unpause = function() {
            "paused" == this.state && this.play()
        }, n.prototype.visibilityChange = function() {
            var e = document[r];
            this[e ? "pause" : "unpause"]()
        }, n.prototype.visibilityPlay = function() {
            this.play(), document.removeEventListener(s, this.onVisibilityPlay)
        }, t.extend(i.defaults, {
            pauseAutoPlayOnHover: !0
        }), i.createMethods.push("_createPlayer");
        var o = i.prototype;
        return o._createPlayer = function() {
            this.player = new n(this), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer)
        }, o.activatePlayer = function() {
            this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this))
        }, o.playPlayer = function() {
            this.player.play()
        }, o.stopPlayer = function() {
            this.player.stop()
        }, o.pausePlayer = function() {
            this.player.pause()
        }, o.unpausePlayer = function() {
            this.player.unpause()
        }, o.deactivatePlayer = function() {
            this.player.stop(), this.element.removeEventListener("mouseenter", this)
        }, o.onmouseenter = function() {
            this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this))
        }, o.onmouseleave = function() {
            this.player.unpause(), this.element.removeEventListener("mouseleave", this)
        }, i.Player = n, i
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define("flickity/js/add-remove-cell", ["./flickity", "fizzy-ui-utils/utils"], function(i, n) {
            return t(e, i, n)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("./flickity"), require("fizzy-ui-utils")) : t(e, e.Flickity, e.fizzyUIUtils)
    }(window, function(e, t, i) {
        function n(e) {
            var t = document.createDocumentFragment();
            return e.forEach(function(e) {
                t.appendChild(e.element)
            }), t
        }
        var r = t.prototype;
        return r.insert = function(e, t) {
            var i = this._makeCells(e);
            if (i && i.length) {
                var r = this.cells.length;
                t = void 0 === t ? r : t;
                var s = n(i),
                    o = t == r;
                if (o) this.slider.appendChild(s);
                else {
                    var a = this.cells[t].element;
                    this.slider.insertBefore(s, a)
                }
                if (0 === t) this.cells = i.concat(this.cells);
                else if (o) this.cells = this.cells.concat(i);
                else {
                    var l = this.cells.splice(t, r - t);
                    this.cells = this.cells.concat(i).concat(l)
                }
                this._sizeCells(i);
                var c = t > this.selectedIndex ? 0 : i.length;
                this._cellAddedRemoved(t, c)
            }
        }, r.append = function(e) {
            this.insert(e, this.cells.length)
        }, r.prepend = function(e) {
            this.insert(e, 0)
        }, r.remove = function(e) {
            var t, n, r = this.getCells(e),
                s = 0,
                o = r.length;
            for (t = 0; t < o; t++) {
                n = r[t];
                var a = this.cells.indexOf(n) < this.selectedIndex;
                s -= a ? 1 : 0
            }
            for (t = 0; t < o; t++) n = r[t], n.remove(), i.removeFrom(this.cells, n);
            r.length && this._cellAddedRemoved(0, s)
        }, r._cellAddedRemoved = function(e, t) {
            t = t || 0, this.selectedIndex += t, this.selectedIndex = Math.max(0, Math.min(this.slides.length - 1, this.selectedIndex)), this.cellChange(e, !0), this.emitEvent("cellAddedRemoved", [e, t])
        }, r.cellSizeChange = function(e) {
            var t = this.getCell(e);
            if (t) {
                t.getSize();
                var i = this.cells.indexOf(t);
                this.cellChange(i)
            }
        }, r.cellChange = function(e, t) {
            var i = this.slideableWidth;
            if (this._positionCells(e), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("cellChange", [e]), this.options.freeScroll) {
                var n = i - this.slideableWidth;
                this.x += n * this.cellAlign, this.positionSlider()
            } else t && this.positionSliderAtSelected(), this.select(this.selectedIndex)
        }, t
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define("flickity/js/lazyload", ["./flickity", "fizzy-ui-utils/utils"], function(i, n) {
            return t(e, i, n)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("./flickity"), require("fizzy-ui-utils")) : t(e, e.Flickity, e.fizzyUIUtils)
    }(window, function(e, t, i) {
        "use strict";

        function n(e) {
            if ("IMG" == e.nodeName && e.getAttribute("data-flickity-lazyload")) return [e];
            var t = e.querySelectorAll("img[data-flickity-lazyload]");
            return i.makeArray(t)
        }

        function r(e, t) {
            this.img = e, this.flickity = t, this.load()
        }
        t.createMethods.push("_createLazyload");
        var s = t.prototype;
        return s._createLazyload = function() {
            this.on("select", this.lazyLoad)
        }, s.lazyLoad = function() {
            var e = this.options.lazyLoad;
            if (e) {
                var t = "number" == typeof e ? e : 0,
                    i = this.getAdjacentCellElements(t),
                    s = [];
                i.forEach(function(e) {
                    var t = n(e);
                    s = s.concat(t)
                }), s.forEach(function(e) {
                    new r(e, this)
                }, this)
            }
        }, r.prototype.handleEvent = i.handleEvent, r.prototype.load = function() {
            this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.img.getAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload")
        }, r.prototype.onload = function(e) {
            this.complete(e, "flickity-lazyloaded")
        }, r.prototype.onerror = function(e) {
            this.complete(e, "flickity-lazyerror")
        }, r.prototype.complete = function(e, t) {
            this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
            var i = this.flickity.getParentCell(this.img),
                n = i && i.element;
            this.flickity.cellSizeChange(n), this.img.classList.add(t), this.flickity.dispatchEvent("lazyLoad", e, n)
        }, t.LazyLoader = r, t
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define("flickity/js/index", ["./flickity", "./drag", "./prev-next-button", "./page-dots", "./player", "./add-remove-cell", "./lazyload"], t) : "object" == typeof module && module.exports && (module.exports = t(require("./flickity"), require("./drag"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./add-remove-cell"), require("./lazyload")))
    }(window, function(e) {
        return e
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define("flickity-as-nav-for/as-nav-for", ["flickity/js/index", "fizzy-ui-utils/utils"], t) : "object" == typeof module && module.exports ? module.exports = t(require("flickity"), require("fizzy-ui-utils")) : e.Flickity = t(e.Flickity, e.fizzyUIUtils)
    }(window, function(e, t) {
        function i(e, t, i) {
            return (t - e) * i + e
        }
        e.createMethods.push("_createAsNavFor");
        var n = e.prototype;
        return n._createAsNavFor = function() {
            this.on("activate", this.activateAsNavFor), this.on("deactivate", this.deactivateAsNavFor), this.on("destroy", this.destroyAsNavFor);
            var e = this.options.asNavFor;
            if (e) {
                var t = this;
                setTimeout(function() {
                    t.setNavCompanion(e)
                })
            }
        }, n.setNavCompanion = function(i) {
            i = t.getQueryElement(i);
            var n = e.data(i);
            if (n && n != this) {
                this.navCompanion = n;
                var r = this;
                this.onNavCompanionSelect = function() {
                    r.navCompanionSelect()
                }, n.on("select", this.onNavCompanionSelect), this.on("staticClick", this.onNavStaticClick), this.navCompanionSelect(!0)
            }
        }, n.navCompanionSelect = function(e) {
            if (this.navCompanion) {
                var t = this.navCompanion.selectedCells[0],
                    n = this.navCompanion.cells.indexOf(t),
                    r = n + this.navCompanion.selectedCells.length - 1,
                    s = Math.floor(i(n, r, this.navCompanion.cellAlign));
                if (this.selectCell(s, !1, e), this.removeNavSelectedElements(), !(s >= this.cells.length)) {
                    var o = this.cells.slice(n, r + 1);
                    this.navSelectedElements = o.map(function(e) {
                        return e.element
                    }), this.changeNavSelectedClass("add")
                }
            }
        }, n.changeNavSelectedClass = function(e) {
            this.navSelectedElements.forEach(function(t) {
                t.classList[e]("is-nav-selected")
            })
        }, n.activateAsNavFor = function() {
            this.navCompanionSelect(!0)
        }, n.removeNavSelectedElements = function() {
            this.navSelectedElements && (this.changeNavSelectedClass("remove"), delete this.navSelectedElements)
        }, n.onNavStaticClick = function(e, t, i, n) {
            "number" == typeof n && this.navCompanion.selectCell(n)
        }, n.deactivateAsNavFor = function() {
            this.removeNavSelectedElements()
        }, n.destroyAsNavFor = function() {
            this.navCompanion && (this.navCompanion.off("select", this.onNavCompanionSelect), this.off("staticClick", this.onNavStaticClick), delete this.navCompanion)
        }, e
    }),
    function(e, t) {
        "use strict";
        "function" == typeof define && define.amd ? define("imagesloaded/imagesloaded", ["ev-emitter/ev-emitter"], function(i) {
            return t(e, i)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
    }(window, function(e, t) {
        function i(e, t) {
            for (var i in t) e[i] = t[i];
            return e
        }

        function n(e) {
            var t = [];
            if (Array.isArray(e)) t = e;
            else if ("number" == typeof e.length)
                for (var i = 0; i < e.length; i++) t.push(e[i]);
            else t.push(e);
            return t
        }

        function r(e, t, s) {
            return this instanceof r ? ("string" == typeof e && (e = document.querySelectorAll(e)), this.elements = n(e), this.options = i({}, this.options), "function" == typeof t ? s = t : i(this.options, t), s && this.on("always", s), this.getImages(), a && (this.jqDeferred = new a.Deferred), void setTimeout(function() {
                this.check()
            }.bind(this))) : new r(e, t, s)
        }

        function s(e) {
            this.img = e
        }

        function o(e, t) {
            this.url = e, this.element = t, this.img = new Image
        }
        var a = e.jQuery,
            l = e.console;
        r.prototype = Object.create(t.prototype), r.prototype.options = {}, r.prototype.getImages = function() {
            this.images = [], this.elements.forEach(this.addElementImages, this)
        }, r.prototype.addElementImages = function(e) {
            "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);
            var t = e.nodeType;
            if (t && c[t]) {
                for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                    var r = i[n];
                    this.addImage(r)
                }
                if ("string" == typeof this.options.background) {
                    var s = e.querySelectorAll(this.options.background);
                    for (n = 0; n < s.length; n++) {
                        var o = s[n];
                        this.addElementBackgroundImages(o)
                    }
                }
            }
        };
        var c = {
            1: !0,
            9: !0,
            11: !0
        };
        return r.prototype.addElementBackgroundImages = function(e) {
            var t = getComputedStyle(e);
            if (t)
                for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
                    var r = n && n[2];
                    r && this.addBackground(r, e), n = i.exec(t.backgroundImage)
                }
        }, r.prototype.addImage = function(e) {
            var t = new s(e);
            this.images.push(t)
        }, r.prototype.addBackground = function(e, t) {
            var i = new o(e, t);
            this.images.push(i)
        }, r.prototype.check = function() {
            function e(e, i, n) {
                setTimeout(function() {
                    t.progress(e, i, n)
                })
            }
            var t = this;
            return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(t) {
                t.once("progress", e), t.check()
            }) : void this.complete()
        }, r.prototype.progress = function(e, t, i) {
            this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && l && l.log("progress: " + i, e, t)
        }, r.prototype.complete = function() {
            var e = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
                var t = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[t](this)
            }
        }, s.prototype = Object.create(t.prototype), s.prototype.check = function() {
            var e = this.getIsImageComplete();
            return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
        }, s.prototype.getIsImageComplete = function() {
            return this.img.complete && void 0 !== this.img.naturalWidth
        }, s.prototype.confirm = function(e, t) {
            this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
        }, s.prototype.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, s.prototype.onload = function() {
            this.confirm(!0, "onload"), this.unbindEvents()
        }, s.prototype.onerror = function() {
            this.confirm(!1, "onerror"), this.unbindEvents()
        }, s.prototype.unbindEvents = function() {
            this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, o.prototype = Object.create(s.prototype), o.prototype.check = function() {
            this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
            var e = this.getIsImageComplete();
            e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
        }, o.prototype.unbindEvents = function() {
            this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, o.prototype.confirm = function(e, t) {
            this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
        }, r.makeJQueryPlugin = function(t) {
            t = t || e.jQuery, t && (a = t, a.fn.imagesLoaded = function(e, t) {
                var i = new r(this, e, t);
                return i.jqDeferred.promise(a(this))
            })
        }, r.makeJQueryPlugin(), r
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define(["flickity/js/index", "imagesloaded/imagesloaded"], function(i, n) {
            return t(e, i, n)
        }) : "object" == typeof module && module.exports ? module.exports = t(e, require("flickity"), require("imagesloaded")) : e.Flickity = t(e, e.Flickity, e.imagesLoaded)
    }(window, function(e, t, i) {
        "use strict";
        t.createMethods.push("_createImagesLoaded");
        var n = t.prototype;
        return n._createImagesLoaded = function() {
            this.on("activate", this.imagesLoaded)
        }, n.imagesLoaded = function() {
            function e(e, i) {
                var n = t.getParentCell(i.img);
                t.cellSizeChange(n && n.element), t.options.freeScroll || t.positionSliderAtSelected()
            }
            if (this.options.imagesLoaded) {
                var t = this;
                i(this.slider).on("progress", e)
            }
        }, t
    }),
    function(e) {
        var t = navigator.userAgent;
        e.HTMLPictureElement && /ecko/.test(t) && t.match(/rv\:(\d+)/) && RegExp.$1 < 45 && addEventListener("resize", function() {
            var t, i = document.createElement("source"),
                n = function(e) {
                    var t, n, r = e.parentNode;
                    "PICTURE" === r.nodeName.toUpperCase() ? (t = i.cloneNode(), r.insertBefore(t, r.firstElementChild), setTimeout(function() {
                        r.removeChild(t)
                    })) : (!e._pfLastSize || e.offsetWidth > e._pfLastSize) && (e._pfLastSize = e.offsetWidth, n = e.sizes, e.sizes += ",100vw", setTimeout(function() {
                        e.sizes = n
                    }))
                },
                r = function() {
                    var e, t = document.querySelectorAll("picture > img, img[srcset][sizes]");
                    for (e = 0; e < t.length; e++) n(t[e])
                },
                s = function() {
                    clearTimeout(t), t = setTimeout(r, 99)
                },
                o = e.matchMedia && matchMedia("(orientation: landscape)"),
                a = function() {
                    s(), o && o.addListener && o.addListener(s)
                };
            return i.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", /^[c|i]|d$/.test(document.readyState || "") ? a() : document.addEventListener("DOMContentLoaded", a), s
        }())
    }(window),
    function(e, t, i) {
        "use strict";

        function n(e) {
            return " " === e || "\t" === e || "\n" === e || "\f" === e || "\r" === e
        }

        function r(t, i) {
            var n = new e.Image;
            return n.onerror = function() {
                E[t] = !1, te()
            }, n.onload = function() {
                E[t] = 1 === n.width, te()
            }, n.src = i, "pending"
        }

        function s() {
            B = !1, R = e.devicePixelRatio, j = {}, q = {}, y.DPR = R || 1, N.width = Math.max(e.innerWidth || 0, S.clientWidth), N.height = Math.max(e.innerHeight || 0, S.clientHeight), N.vw = N.width / 100, N.vh = N.height / 100, v = [N.height, N.width, R].join("-"), N.em = y.getEmValue(), N.rem = N.em
        }

        function o(e, t, i, n) {
            var r, s, o, a;
            return "saveData" === L.algorithm ? e > 2.7 ? a = i + 1 : (s = t - i, r = Math.pow(e - .6, 1.5), o = s * r, n && (o += .1 * r), a = e + o) : a = i > 1 ? Math.sqrt(e * t) : e, a > i
        }

        function a(e) {
            var t, i = y.getSet(e),
                n = !1;
            "pending" !== i && (n = v, i && (t = y.setRes(i), y.applySetCandidate(t, e))), e[y.ns].evaled = n
        }

        function l(e, t) {
            return e.res - t.res
        }

        function c(e, t, i) {
            var n;
            return !i && t && (i = e[y.ns].sets, i = i && i[i.length - 1]), n = u(t, i), n && (t = y.makeUrl(t), e[y.ns].curSrc = t, e[y.ns].curCan = n, n.res || ee(n, n.set.sizes)), n
        }

        function u(e, t) {
            var i, n, r;
            if (e && t)
                for (r = y.parseSet(t), e = y.makeUrl(e), i = 0; i < r.length; i++)
                    if (e === y.makeUrl(r[i].url)) {
                        n = r[i];
                        break
                    }
            return n
        }

        function d(e, t) {
            var i, n, r, s, o = e.getElementsByTagName("source");
            for (i = 0, n = o.length; i < n; i++) r = o[i], r[y.ns] = !0, s = r.getAttribute("srcset"), s && t.push({
                srcset: s,
                media: r.getAttribute("media"),
                type: r.getAttribute("type"),
                sizes: r.getAttribute("sizes")
            })
        }

        function h(e, t) {
            function i(t) {
                var i, n = t.exec(e.substring(h));
                if (n) return i = n[0], h += i.length, i
            }

            function r() {
                var e, i, n, r, s, l, c, u, d, h = !1,
                    p = {};
                for (r = 0; r < a.length; r++) s = a[r], l = s[s.length - 1], c = s.substring(0, s.length - 1), u = parseInt(c, 10), d = parseFloat(c), V.test(c) && "w" === l ? ((e || i) && (h = !0), 0 === u ? h = !0 : e = u) : Z.test(c) && "x" === l ? ((e || i || n) && (h = !0), d < 0 ? h = !0 : i = d) : V.test(c) && "h" === l ? ((n || i) && (h = !0), 0 === u ? h = !0 : n = u) : h = !0;
                h || (p.url = o, e && (p.w = e), i && (p.d = i), n && (p.h = n), n || i || e || (p.d = 1), 1 === p.d && (t.has1x = !0), p.set = t, f.push(p))
            }

            function s() {
                for (i(Y), l = "", c = "in descriptor";;) {
                    if (u = e.charAt(h), "in descriptor" === c)
                        if (n(u)) l && (a.push(l), l = "", c = "after descriptor");
                        else {
                            if ("," === u) return h += 1, l && a.push(l), void r();
                            if ("(" === u) l += u, c = "in parens";
                            else {
                                if ("" === u) return l && a.push(l), void r();
                                l += u
                            }
                        } else if ("in parens" === c)
                        if (")" === u) l += u, c = "in descriptor";
                        else {
                            if ("" === u) return a.push(l), void r();
                            l += u
                        } else if ("after descriptor" === c)
                        if (n(u));
                        else {
                            if ("" === u) return void r();
                            c = "in descriptor", h -= 1
                        }
                    h += 1
                }
            }
            for (var o, a, l, c, u, d = e.length, h = 0, f = [];;) {
                if (i(X), h >= d) return f;
                o = i(G), a = [], "," === o.slice(-1) ? (o = o.replace(Q, ""), r()) : s()
            }
        }

        function f(e) {
            function t(e) {
                function t() {
                    s && (o.push(s), s = "")
                }

                function i() {
                    o[0] && (a.push(o), o = [])
                }
                for (var r, s = "", o = [], a = [], l = 0, c = 0, u = !1;;) {
                    if (r = e.charAt(c), "" === r) return t(), i(), a;
                    if (u) {
                        if ("*" === r && "/" === e[c + 1]) {
                            u = !1, c += 2, t();
                            continue
                        }
                        c += 1
                    } else {
                        if (n(r)) {
                            if (e.charAt(c - 1) && n(e.charAt(c - 1)) || !s) {
                                c += 1;
                                continue
                            }
                            if (0 === l) {
                                t(), c += 1;
                                continue
                            }
                            r = " "
                        } else if ("(" === r) l += 1;
                        else if (")" === r) l -= 1;
                        else {
                            if ("," === r) {
                                t(), i(), c += 1;
                                continue
                            }
                            if ("/" === r && "*" === e.charAt(c + 1)) {
                                u = !0, c += 2;
                                continue
                            }
                        }
                        s += r, c += 1
                    }
                }
            }

            function i(e) {
                return !!(u.test(e) && parseFloat(e) >= 0) || (!!d.test(e) || ("0" === e || "-0" === e || "+0" === e))
            }
            var r, s, o, a, l, c, u = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,
                d = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;
            for (s = t(e), o = s.length, r = 0; r < o; r++)
                if (a = s[r], l = a[a.length - 1], i(l)) {
                    if (c = l, a.pop(), 0 === a.length) return c;
                    if (a = a.join(" "), y.matchesMedia(a)) return c
                }
            return "100vw"
        }
        t.createElement("picture");
        var p, m, g, v, y = {},
            w = !1,
            _ = function() {},
            A = t.createElement("img"),
            x = A.getAttribute,
            b = A.setAttribute,
            T = A.removeAttribute,
            S = t.documentElement,
            E = {},
            L = {
                algorithm: ""
            },
            C = "data-pfsrc",
            k = C + "set",
            P = navigator.userAgent,
            H = /rident/.test(P) || /ecko/.test(P) && P.match(/rv\:(\d+)/) && RegExp.$1 > 35,
            z = "currentSrc",
            O = /\s+\+?\d+(e\d+)?w/,
            M = /(\([^)]+\))?\s*(.+)/,
            D = e.picturefillCFG,
            F = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",
            I = "font-size:100%!important;",
            B = !0,
            j = {},
            q = {},
            R = e.devicePixelRatio,
            N = {
                px: 1,
                "in": 96
            },
            U = t.createElement("a"),
            W = !1,
            Y = /^[ \t\n\r\u000c]+/,
            X = /^[, \t\n\r\u000c]+/,
            G = /^[^ \t\n\r\u000c]+/,
            Q = /[,]+$/,
            V = /^\d+$/,
            Z = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,
            J = function(e, t, i, n) {
                e.addEventListener ? e.addEventListener(t, i, n || !1) : e.attachEvent && e.attachEvent("on" + t, i)
            },
            $ = function(e) {
                var t = {};
                return function(i) {
                    return i in t || (t[i] = e(i)), t[i]
                }
            },
            K = function() {
                var e = /^([\d\.]+)(em|vw|px)$/,
                    t = function() {
                        for (var e = arguments, t = 0, i = e[0]; ++t in e;) i = i.replace(e[t], e[++t]);
                        return i
                    },
                    i = $(function(e) {
                        return "return " + t((e || "").toLowerCase(), /\band\b/g, "&&", /,/g, "||", /min-([a-z-\s]+):/g, "e.$1>=", /max-([a-z-\s]+):/g, "e.$1<=", /calc([^)]+)/g, "($1)", /(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)", /^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi, "") + ";"
                    });
                return function(t, n) {
                    var r;
                    if (!(t in j))
                        if (j[t] = !1, n && (r = t.match(e))) j[t] = r[1] * N[r[2]];
                        else try {
                            j[t] = new Function("e", i(t))(N)
                        } catch (s) {}
                        return j[t]
                }
            }(),
            ee = function(e, t) {
                return e.w ? (e.cWidth = y.calcListLength(t || "100vw"), e.res = e.w / e.cWidth) : e.res = e.d, e
            },
            te = function(e) {
                if (w) {
                    var i, n, r, s = e || {};
                    if (s.elements && 1 === s.elements.nodeType && ("IMG" === s.elements.nodeName.toUpperCase() ? s.elements = [s.elements] : (s.context = s.elements, s.elements = null)), i = s.elements || y.qsa(s.context || t, s.reevaluate || s.reselect ? y.sel : y.selShort), r = i.length) {
                        for (y.setupRun(s), W = !0, n = 0; n < r; n++) y.fillImg(i[n], s);
                        y.teardownRun(s)
                    }
                }
            };
        p = e.console && console.warn ? function(e) {} : _, z in A || (z = "src"), E["image/jpeg"] = !0, E["image/gif"] = !0, E["image/png"] = !0, E["image/svg+xml"] = t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"), y.ns = ("pf" + (new Date).getTime()).substr(0, 9), y.supSrcset = "srcset" in A, y.supSizes = "sizes" in A, y.supPicture = !!e.HTMLPictureElement, y.supSrcset && y.supPicture && !y.supSizes && ! function(e) {
            A.srcset = "data:,a", e.src = "data:,a", y.supSrcset = A.complete === e.complete, y.supPicture = y.supSrcset && y.supPicture
        }(t.createElement("img")), y.supSrcset && !y.supSizes ? ! function() {
            var e = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",
                i = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                n = t.createElement("img"),
                r = function() {
                    var e = n.width;
                    2 === e && (y.supSizes = !0), g = y.supSrcset && !y.supSizes, w = !0, setTimeout(te)
                };
            n.onload = r, n.onerror = r, n.setAttribute("sizes", "9px"), n.srcset = i + " 1w," + e + " 9w", n.src = i
        }() : w = !0, y.selShort = "picture>img,img[srcset]", y.sel = y.selShort, y.cfg = L, y.DPR = R || 1, y.u = N, y.types = E, y.setSize = _, y.makeUrl = $(function(e) {
            return U.href = e, U.href
        }), y.qsa = function(e, t) {
            return "querySelector" in e ? e.querySelectorAll(t) : []
        }, y.matchesMedia = function() {
            return e.matchMedia && (matchMedia("(min-width: 0.1em)") || {}).matches ? y.matchesMedia = function(e) {
                return !e || matchMedia(e).matches
            } : y.matchesMedia = y.mMQ, y.matchesMedia.apply(this, arguments)
        }, y.mMQ = function(e) {
            return !e || K(e)
        }, y.calcLength = function(e) {
            var t = K(e, !0) || !1;
            return t < 0 && (t = !1), t
        }, y.supportsType = function(e) {
            return !e || E[e]
        }, y.parseSize = $(function(e) {
            var t = (e || "").match(M);
            return {
                media: t && t[1],
                length: t && t[2]
            }
        }), y.parseSet = function(e) {
            return e.cands || (e.cands = h(e.srcset, e)), e.cands
        }, y.getEmValue = function() {
            var e;
            if (!m && (e = t.body)) {
                var i = t.createElement("div"),
                    n = S.style.cssText,
                    r = e.style.cssText;
                i.style.cssText = F, S.style.cssText = I, e.style.cssText = I, e.appendChild(i), m = i.offsetWidth, e.removeChild(i), m = parseFloat(m, 10), S.style.cssText = n, e.style.cssText = r
            }
            return m || 16
        }, y.calcListLength = function(e) {
            if (!(e in q) || L.uT) {
                var t = y.calcLength(f(e));
                q[e] = t ? t : N.width
            }
            return q[e]
        }, y.setRes = function(e) {
            var t;
            if (e) {
                t = y.parseSet(e);
                for (var i = 0, n = t.length; i < n; i++) ee(t[i], e.sizes)
            }
            return t
        }, y.setRes.res = ee, y.applySetCandidate = function(e, t) {
            if (e.length) {
                var i, n, r, s, a, u, d, h, f, p = t[y.ns],
                    m = y.DPR;
                if (u = p.curSrc || t[z], d = p.curCan || c(t, u, e[0].set), d && d.set === e[0].set && (f = H && !t.complete && d.res - .1 > m, f || (d.cached = !0, d.res >= m && (a = d))), !a)
                    for (e.sort(l), s = e.length, a = e[s - 1], n = 0; n < s; n++)
                        if (i = e[n], i.res >= m) {
                            r = n - 1, a = e[r] && (f || u !== y.makeUrl(i.url)) && o(e[r].res, i.res, m, e[r].cached) ? e[r] : i;
                            break
                        }
                a && (h = y.makeUrl(a.url), p.curSrc = h, p.curCan = a, h !== u && y.setSrc(t, a), y.setSize(t))
            }
        }, y.setSrc = function(e, t) {
            var i;
            e.src = t.url, "image/svg+xml" === t.set.type && (i = e.style.width, e.style.width = e.offsetWidth + 1 + "px", e.offsetWidth + 1 && (e.style.width = i))
        }, y.getSet = function(e) {
            var t, i, n, r = !1,
                s = e[y.ns].sets;
            for (t = 0; t < s.length && !r; t++)
                if (i = s[t], i.srcset && y.matchesMedia(i.media) && (n = y.supportsType(i.type))) {
                    "pending" === n && (i = n), r = i;
                    break
                }
            return r
        }, y.parseSets = function(e, t, n) {
            var r, s, o, a, l = t && "PICTURE" === t.nodeName.toUpperCase(),
                c = e[y.ns];
            (c.src === i || n.src) && (c.src = x.call(e, "src"), c.src ? b.call(e, C, c.src) : T.call(e, C)), (c.srcset === i || n.srcset || !y.supSrcset || e.srcset) && (r = x.call(e, "srcset"), c.srcset = r, a = !0), c.sets = [], l && (c.pic = !0, d(t, c.sets)), c.srcset ? (s = {
                srcset: c.srcset,
                sizes: x.call(e, "sizes")
            }, c.sets.push(s), o = (g || c.src) && O.test(c.srcset || ""), o || !c.src || u(c.src, s) || s.has1x || (s.srcset += ", " + c.src, s.cands.push({
                url: c.src,
                d: 1,
                set: s
            }))) : c.src && c.sets.push({
                srcset: c.src,
                sizes: null
            }), c.curCan = null, c.curSrc = i, c.supported = !(l || s && !y.supSrcset || o && !y.supSizes), a && y.supSrcset && !c.supported && (r ? (b.call(e, k, r), e.srcset = "") : T.call(e, k)), c.supported && !c.srcset && (!c.src && e.src || e.src !== y.makeUrl(c.src)) && (null === c.src ? e.removeAttribute("src") : e.src = c.src), c.parsed = !0
        }, y.fillImg = function(e, t) {
            var i, n = t.reselect || t.reevaluate;
            e[y.ns] || (e[y.ns] = {}), i = e[y.ns], (n || i.evaled !== v) && (i.parsed && !t.reevaluate || y.parseSets(e, e.parentNode, t), i.supported ? i.evaled = v : a(e))
        }, y.setupRun = function() {
            W && !B && R === e.devicePixelRatio || s()
        }, y.supPicture ? (te = _, y.fillImg = _) : ! function() {
            var i, n = e.attachEvent ? /d$|^c/ : /d$|^c|^i/,
                r = function() {
                    var e = t.readyState || "";
                    s = setTimeout(r, "loading" === e ? 200 : 999), t.body && (y.fillImgs(), i = i || n.test(e), i && clearTimeout(s))
                },
                s = setTimeout(r, t.body ? 9 : 99),
                o = function(e, t) {
                    var i, n, r = function() {
                        var s = new Date - n;
                        s < t ? i = setTimeout(r, t - s) : (i = null, e())
                    };
                    return function() {
                        n = new Date, i || (i = setTimeout(r, t))
                    }
                },
                a = S.clientHeight,
                l = function() {
                    B = Math.max(e.innerWidth || 0, S.clientWidth) !== N.width || S.clientHeight !== a, a = S.clientHeight, B && y.fillImgs()
                };
            J(e, "resize", o(l, 99)), J(t, "readystatechange", r)
        }(), y.picturefill = te, y.fillImgs = te, y.teardownRun = _, te._ = y, e.picturefillCFG = {
            pf: y,
            push: function(e) {
                var t = e.shift();
                "function" == typeof y[t] ? y[t].apply(y, e) : (L[t] = e[0], W && y.fillImgs({
                    reselect: !0
                }))
            }
        };
        for (; D && D.length;) e.picturefillCFG.push(D.shift());
        e.picturefill = te, "object" == typeof module && "object" == typeof module.exports ? module.exports = te : "function" == typeof define && define.amd && define("picturefill", function() {
            return te
        }), y.supPicture || (E["image/webp"] = r("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))
    }(window, document), ! function(e) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
        else if ("function" == typeof define && define.amd) define([], e);
        else {
            var t;
            t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.store = e()
        }
    }(function() {
        return function e(t, i, n) {
            function r(o, a) {
                if (!i[o]) {
                    if (!t[o]) {
                        var l = "function" == typeof require && require;
                        if (!a && l) return l(o, !0);
                        if (s) return s(o, !0);
                        var c = new Error("Cannot find module '" + o + "'");
                        throw c.code = "MODULE_NOT_FOUND", c
                    }
                    var u = i[o] = {
                        exports: {}
                    };
                    t[o][0].call(u.exports, function(e) {
                        var i = t[o][1][e];
                        return r(i ? i : e)
                    }, u, u.exports, e, t, i, n)
                }
                return i[o].exports
            }
            for (var s = "function" == typeof require && require, o = 0; o < n.length; o++) r(n[o]);
            return r
        }({
            1: [function(e, t, i) {
                "use strict";
                var n = e("../src/store-engine"),
                    r = [e("../storages/localStorage"), e("../storages/sessionStorage"), e("../storages/cookieStorage"), e("../storages/memoryStorage")],
                    s = [];
                t.exports = n.createStore(r, s)
            }, {
                "../src/store-engine": 2,
                "../storages/cookieStorage": 4,
                "../storages/localStorage": 5,
                "../storages/memoryStorage": 6,
                "../storages/sessionStorage": 7
            }],
            2: [function(e, t, i) {
                "use strict";

                function n() {
                    var e = "undefined" == typeof console ? null : console;
                    if (e) {
                        var t = e.warn ? e.warn : e.log;
                        t.apply(e, arguments)
                    }
                }

                function r(e, t, i) {
                    i || (i = ""), e && !d(e) && (e = [e]), t && !d(t) && (t = [t]);
                    var r = i ? "__storejs_" + i + "_" : "",
                        s = i ? new RegExp("^" + r) : null,
                        m = /^[a-zA-Z0-9_\-]*$/;
                    if (!m.test(i)) throw new Error("store.js namespaces can only have alphanumerics + underscores and dashes");
                    var g = {
                            _namespacePrefix: r,
                            _namespaceRegexp: s,
                            _testStorage: function(e) {
                                try {
                                    var t = "__storejs__test__";
                                    e.write(t, t);
                                    var i = e.read(t) === t;
                                    return e.remove(t), i
                                } catch (n) {
                                    return !1
                                }
                            },
                            _assignPluginFnProp: function(e, t) {
                                var i = this[t];
                                this[t] = function() {
                                    function t() {
                                        if (i) return l(arguments, function(e, t) {
                                            n[t] = e
                                        }), i.apply(r, n)
                                    }
                                    var n = o(arguments, 0),
                                        r = this,
                                        s = [t].concat(n);
                                    return e.apply(r, s)
                                }
                            },
                            _serialize: function(e) {
                                return JSON.stringify(e)
                            },
                            _deserialize: function(e, t) {
                                if (!e) return t;
                                var i = "";
                                try {
                                    i = JSON.parse(e)
                                } catch (n) {
                                    i = e
                                }
                                return void 0 !== i ? i : t
                            },
                            _addStorage: function(e) {
                                this.enabled || this._testStorage(e) && (this.storage = e, this.enabled = !0)
                            },
                            _addPlugin: function(e) {
                                var t = this;
                                if (d(e)) return void l(e, function(e) {
                                    t._addPlugin(e)
                                });
                                var i = a(this.plugins, function(t) {
                                    return e === t
                                });
                                if (!i) {
                                    if (this.plugins.push(e), !h(e)) throw new Error("Plugins must be function values that return objects");
                                    var n = e.call(this);
                                    if (!f(n)) throw new Error("Plugins must return an object of function properties");
                                    l(n, function(i, n) {
                                        if (!h(i)) throw new Error("Bad plugin property: " + n + " from plugin " + e.name + ". Plugins should only return functions.");
                                        t._assignPluginFnProp(i, n)
                                    })
                                }
                            },
                            addStorage: function(e) {
                                n("store.addStorage(storage) is deprecated. Use createStore([storages])"), this._addStorage(e)
                            }
                        },
                        v = u(g, p, {
                            plugins: []
                        });
                    return v.raw = {}, l(v, function(e, t) {
                        h(e) && (v.raw[t] = c(v, e))
                    }), l(e, function(e) {
                        v._addStorage(e)
                    }), l(t, function(e) {
                        v._addPlugin(e)
                    }), v
                }
                var s = e("./util"),
                    o = s.slice,
                    a = s.pluck,
                    l = s.each,
                    c = s.bind,
                    u = s.create,
                    d = s.isList,
                    h = s.isFunction,
                    f = s.isObject;
                t.exports = {
                    createStore: r
                };
                var p = {
                    version: "2.0.12",
                    enabled: !1,
                    get: function(e, t) {
                        var i = this.storage.read(this._namespacePrefix + e);
                        return this._deserialize(i, t)
                    },
                    set: function(e, t) {
                        return void 0 === t ? this.remove(e) : (this.storage.write(this._namespacePrefix + e, this._serialize(t)), t)
                    },
                    remove: function(e) {
                        this.storage.remove(this._namespacePrefix + e)
                    },
                    each: function(e) {
                        var t = this;
                        this.storage.each(function(i, n) {
                            e.call(t, t._deserialize(i), (n || "").replace(t._namespaceRegexp, ""))
                        })
                    },
                    clearAll: function() {
                        this.storage.clearAll()
                    },
                    hasNamespace: function(e) {
                        return this._namespacePrefix == "__storejs_" + e + "_"
                    },
                    createStore: function() {
                        return r.apply(this, arguments)
                    },
                    addPlugin: function(e) {
                        this._addPlugin(e)
                    },
                    namespace: function(e) {
                        return r(this.storage, this.plugins, e)
                    }
                }
            }, {
                "./util": 3
            }],
            3: [function(e, t, i) {
                (function(e) {
                    "use strict";

                    function i() {
                        return Object.assign ? Object.assign : function(e, t, i, n) {
                            for (var r = 1; r < arguments.length; r++) a(Object(arguments[r]), function(t, i) {
                                e[i] = t
                            });
                            return e
                        }
                    }

                    function n() {
                        if (Object.create) return function(e, t, i, n) {
                            var r = o(arguments, 1);
                            return f.apply(this, [Object.create(e)].concat(r))
                        };
                        var e = function() {};
                        return function(t, i, n, r) {
                            var s = o(arguments, 1);
                            return e.prototype = t, f.apply(this, [new e].concat(s))
                        }
                    }

                    function r() {
                        return String.prototype.trim ? function(e) {
                            return String.prototype.trim.call(e)
                        } : function(e) {
                            return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                        }
                    }

                    function s(e, t) {
                        return function() {
                            return t.apply(e, Array.prototype.slice.call(arguments, 0))
                        }
                    }

                    function o(e, t) {
                        return Array.prototype.slice.call(e, t || 0)
                    }

                    function a(e, t) {
                        c(e, function(e, i) {
                            return t(e, i), !1
                        })
                    }

                    function l(e, t) {
                        var i = u(e) ? [] : {};
                        return c(e, function(e, n) {
                            return i[n] = t(e, n), !1
                        }), i
                    }

                    function c(e, t) {
                        if (u(e)) {
                            for (var i = 0; i < e.length; i++)
                                if (t(e[i], i)) return e[i]
                        } else
                            for (var n in e)
                                if (e.hasOwnProperty(n) && t(e[n], n)) return e[n]
                    }

                    function u(e) {
                        return null != e && "function" != typeof e && "number" == typeof e.length
                    }

                    function d(e) {
                        return e && "[object Function]" === {}.toString.call(e)
                    }

                    function h(e) {
                        return e && "[object Object]" === {}.toString.call(e)
                    }
                    var f = i(),
                        p = n(),
                        m = r(),
                        g = "undefined" != typeof window ? window : e;
                    t.exports = {
                        assign: f,
                        create: p,
                        trim: m,
                        bind: s,
                        slice: o,
                        each: a,
                        map: l,
                        pluck: c,
                        isList: u,
                        isFunction: d,
                        isObject: h,
                        Global: g
                    }
                }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {}],
            4: [function(e, t, i) {
                "use strict";

                function n(e) {
                    if (!e || !l(e)) return null;
                    var t = "(?:^|.*;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*";
                    return unescape(h.cookie.replace(new RegExp(t), "$1"))
                }

                function r(e) {
                    for (var t = h.cookie.split(/; ?/g), i = t.length - 1; i >= 0; i--)
                        if (d(t[i])) {
                            var n = t[i].split("="),
                                r = unescape(n[0]),
                                s = unescape(n[1]);
                            e(s, r)
                        }
                }

                function s(e, t) {
                    e && (h.cookie = escape(e) + "=" + escape(t) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/")
                }

                function o(e) {
                    e && l(e) && (h.cookie = escape(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/")
                }

                function a() {
                    r(function(e, t) {
                        o(t)
                    })
                }

                function l(e) {
                    return new RegExp("(?:^|;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(h.cookie)
                }
                var c = e("../src/util"),
                    u = c.Global,
                    d = c.trim;
                t.exports = {
                    name: "cookieStorage",
                    read: n,
                    write: s,
                    each: r,
                    remove: o,
                    clearAll: a
                };
                var h = u.document
            }, {
                "../src/util": 3
            }],
            5: [function(e, t, i) {
                "use strict";

                function n() {
                    return u.localStorage
                }

                function r(e) {
                    return n().getItem(e)
                }

                function s(e, t) {
                    return n().setItem(e, t)
                }

                function o(e) {
                    for (var t = n().length - 1; t >= 0; t--) {
                        var i = n().key(t);
                        e(r(i), i)
                    }
                }

                function a(e) {
                    return n().removeItem(e)
                }

                function l() {
                    return n().clear()
                }
                var c = e("../src/util"),
                    u = c.Global;
                t.exports = {
                    name: "localStorage",
                    read: r,
                    write: s,
                    each: o,
                    remove: a,
                    clearAll: l
                }
            }, {
                "../src/util": 3
            }],
            6: [function(e, t, i) {
                "use strict";

                function n(e) {
                    return l[e]
                }

                function r(e, t) {
                    l[e] = t
                }

                function s(e) {
                    for (var t in l) l.hasOwnProperty(t) && e(l[t], t)
                }

                function o(e) {
                    delete l[e]
                }

                function a(e) {
                    l = {}
                }
                t.exports = {
                    name: "memoryStorage",
                    read: n,
                    write: r,
                    each: s,
                    remove: o,
                    clearAll: a
                };
                var l = {}
            }, {}],
            7: [function(e, t, i) {
                "use strict";

                function n() {
                    return u.sessionStorage
                }

                function r(e) {
                    return n().getItem(e)
                }

                function s(e, t) {
                    return n().setItem(e, t)
                }

                function o(e) {
                    for (var t = n().length - 1; t >= 0; t--) {
                        var i = n().key(t);
                        e(r(i), i)
                    }
                }

                function a(e) {
                    return n().removeItem(e)
                }

                function l() {
                    return n().clear()
                }
                var c = e("../src/util"),
                    u = c.Global;
                t.exports = {
                    name: "sessionStorage",
                    read: r,
                    write: s,
                    each: o,
                    remove: a,
                    clearAll: l
                }
            }, {
                "../src/util": 3
            }]
        }, {}, [1])(1)
    }),
    function() {
        "use strict";
        var root = this,
            timezoneJS = {};
        "function" == typeof define && define.amd ? define(function() {
            return timezoneJS
        }) : "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = timezoneJS), exports.timezoneJS = timezoneJS) : root.timezoneJS = timezoneJS, timezoneJS.VERSION = "0.4.13";
        for (var ajax_lib = root.$ || root.jQuery || root.Zepto, fleegix = root.fleegix, DAYS = timezoneJS.Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], MONTHS = timezoneJS.Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], SHORT_MONTHS = {}, SHORT_DAYS = {}, EXACT_DATE_TIME = {}, i = 0; i < MONTHS.length; i++) SHORT_MONTHS[MONTHS[i].substr(0, 3)] = i;
        for (i = 0; i < DAYS.length; i++) SHORT_DAYS[DAYS[i].substr(0, 3)] = i;
        var _arrIndexOf = Array.prototype.indexOf || function(e) {
                if (null === this) throw new TypeError;
                var t = Object(this),
                    i = t.length >>> 0;
                if (0 === i) return -1;
                var n = 0;
                if (arguments.length > 1 && (n = Number(arguments[1]), n != n ? n = 0 : 0 !== n && n !== 1 / 0 && n !== -(1 / 0) && (n = (n > 0 || -1) * Math.floor(Math.abs(n)))), n >= i) return -1;
                for (var r = n >= 0 ? n : Math.max(i - Math.abs(n), 0); r < i; r++)
                    if (r in t && t[r] === e) return r;
                return -1
            },
            _fixWidth = function(e, t) {
                if ("number" != typeof e) throw "not a number: " + e;
                var i = e > 1e3,
                    n = e.toString(),
                    r = n.length;
                if (i && r > t) return n.substr(r - t, r);
                for (n = [n]; r < t;) n.unshift("0"), r++;
                return n.join("")
            },
            _transport = function(e) {
                if (e) {
                    if (!e.url) throw new Error("URL must be specified");
                    if ("async" in e || (e.async = !0), "undefined" == typeof window && "function" == typeof require) {
                        var t = require("fs");
                        if (e.async) {
                            if ("function" != typeof e.success) return;
                            return e.error = e.error || console.error, t.readFile(e.url, "utf8", function(t, i) {
                                return t ? e.error(t) : e.success(i)
                            })
                        }
                        return t.readFileSync(e.url, "utf8")
                    }
                    if (!(fleegix && "undefined" != typeof fleegix.xhr || ajax_lib && "undefined" != typeof ajax_lib.ajax)) throw new Error("Please use the Fleegix.js XHR module, jQuery ajax, Zepto ajax, or define your own transport mechanism for downloading zone files.");
                    return e.async ? fleegix && fleegix.xhr ? fleegix.xhr.send({
                        url: e.url,
                        method: "get",
                        handleSuccess: e.success,
                        handleErr: e.error
                    }) : ajax_lib.ajax({
                        url: e.url,
                        dataType: "text",
                        method: "GET",
                        error: e.error,
                        success: e.success
                    }) : fleegix && fleegix.xhr ? fleegix.xhr.doReq({
                        url: e.url,
                        async: !1
                    }) : ajax_lib.ajax({
                        url: e.url,
                        async: !1,
                        dataType: "text"
                    }).responseText
                }
            };
        timezoneJS.Date = function() {
            if (this === timezoneJS) throw "timezoneJS.Date object must be constructed with 'new'";
            var e = Array.prototype.slice.apply(arguments),
                t = null,
                i = null,
                n = [],
                r = !1;
            "[object Array]" === Object.prototype.toString.call(e[0]) && (e = e[0]), "string" == typeof e[e.length - 1] && (r = Date.parse(e[e.length - 1].replace(/GMT[\+\-]\d+/, "")), (isNaN(r) || null === r) && (i = e.pop()));
            var s = !1;
            switch (e.length) {
                case 0:
                    t = new Date;
                    break;
                case 1:
                    t = new Date(e[0]), "string" == typeof e[0] && e[0].search(/[+-][0-9]{4}/) == -1 && e[0].search(/Z/) == -1 && e[0].search(/T/) == -1 && (s = !0);
                    break;
                case 2:
                    t = new Date(e[0], e[1]), s = !0;
                    break;
                default:
                    for (var o = 0; o < 7; o++) n[o] = e[o] || 0;
                    t = new Date(n[0], n[1], n[2], n[3], n[4], n[5], n[6]), s = !0
            }
            this._useCache = !1, this._tzInfo = {}, this._day = 0, this.year = 0, this.month = 0, this.date = 0, this.hours = 0, this.minutes = 0, this.seconds = 0, this.milliseconds = 0, this.timezone = i || null, s ? this.setFromDateObjProxy(t) : this.setFromTimeProxy(t.getTime(), i)
        }, timezoneJS.Date.prototype = {
            getDate: function() {
                return this.date
            },
            getDay: function() {
                return this._day
            },
            getFullYear: function() {
                return this.year
            },
            getMonth: function() {
                return this.month
            },
            getYear: function() {
                return this.year - 1900
            },
            getHours: function() {
                return this.hours
            },
            getMilliseconds: function() {
                return this.milliseconds
            },
            getMinutes: function() {
                return this.minutes
            },
            getSeconds: function() {
                return this.seconds
            },
            getUTCDate: function() {
                return this.getUTCDateProxy().getUTCDate()
            },
            getUTCDay: function() {
                return this.getUTCDateProxy().getUTCDay()
            },
            getUTCFullYear: function() {
                return this.getUTCDateProxy().getUTCFullYear()
            },
            getUTCHours: function() {
                return this.getUTCDateProxy().getUTCHours()
            },
            getUTCMilliseconds: function() {
                return this.getUTCDateProxy().getUTCMilliseconds()
            },
            getUTCMinutes: function() {
                return this.getUTCDateProxy().getUTCMinutes()
            },
            getUTCMonth: function() {
                return this.getUTCDateProxy().getUTCMonth()
            },
            getUTCSeconds: function() {
                return this.getUTCDateProxy().getUTCSeconds()
            },
            getTime: function() {
                return this._timeProxy + 60 * this.getTimezoneOffset() * 1e3
            },
            getTimezone: function() {
                return this.timezone
            },
            getTimezoneOffset: function() {
                return this.getTimezoneInfo().tzOffset
            },
            getTimezoneAbbreviation: function() {
                return this.getTimezoneInfo().tzAbbr
            },
            getTimezoneInfo: function() {
                if (this._useCache) return this._tzInfo;
                var e;
                return e = this.timezone ? "Etc/UTC" === this.timezone || "Etc/GMT" === this.timezone ? {
                    tzOffset: 0,
                    tzAbbr: "UTC"
                } : timezoneJS.timezone.getTzInfo(this._timeProxy, this.timezone) : {
                    tzOffset: this.getLocalOffset(),
                    tzAbbr: null
                }, this._tzInfo = e, this._useCache = !0, e
            },
            getUTCDateProxy: function() {
                var e = new Date(this._timeProxy);
                return e.setUTCMinutes(e.getUTCMinutes() + this.getTimezoneOffset()), e
            },
            setDate: function(e) {
                return this.setAttribute("date", e), this.getTime()
            },
            setFullYear: function(e, t, i) {
                return void 0 !== i && this.setAttribute("date", 1), this.setAttribute("year", e), void 0 !== t && this.setAttribute("month", t), void 0 !== i && this.setAttribute("date", i), this.getTime()
            },
            setMonth: function(e, t) {
                return this.setAttribute("month", e), void 0 !== t && this.setAttribute("date", t), this.getTime()
            },
            setYear: function(e) {
                return e = Number(e), 0 <= e && e <= 99 && (e += 1900), this.setUTCAttribute("year", e), this.getTime()
            },
            setHours: function(e, t, i, n) {
                return this.setAttribute("hours", e), void 0 !== t && this.setAttribute("minutes", t), void 0 !== i && this.setAttribute("seconds", i), void 0 !== n && this.setAttribute("milliseconds", n), this.getTime()
            },
            setMinutes: function(e, t, i) {
                return this.setAttribute("minutes", e), void 0 !== t && this.setAttribute("seconds", t), void 0 !== i && this.setAttribute("milliseconds", i), this.getTime()
            },
            setSeconds: function(e, t) {
                return this.setAttribute("seconds", e), void 0 !== t && this.setAttribute("milliseconds", t), this.getTime()
            },
            setMilliseconds: function(e) {
                return this.setAttribute("milliseconds", e), this.getTime()
            },
            setTime: function(e) {
                if (isNaN(e)) throw new Error("Units must be a number.");
                return this.setFromTimeProxy(e, this.timezone), this.getTime()
            },
            setUTCFullYear: function(e, t, i) {
                return void 0 !== i && this.setUTCAttribute("date", 1), this.setUTCAttribute("year", e), void 0 !== t && this.setUTCAttribute("month", t), void 0 !== i && this.setUTCAttribute("date", i), this.getTime()
            },
            setUTCMonth: function(e, t) {
                return this.setUTCAttribute("month", e), void 0 !== t && this.setUTCAttribute("date", t), this.getTime()
            },
            setUTCDate: function(e) {
                return this.setUTCAttribute("date", e), this.getTime()
            },
            setUTCHours: function(e, t, i, n) {
                return this.setUTCAttribute("hours", e), void 0 !== t && this.setUTCAttribute("minutes", t), void 0 !== i && this.setUTCAttribute("seconds", i), void 0 !== n && this.setUTCAttribute("milliseconds", n), this.getTime()
            },
            setUTCMinutes: function(e, t, i) {
                return this.setUTCAttribute("minutes", e), void 0 !== t && this.setUTCAttribute("seconds", t), void 0 !== i && this.setUTCAttribute("milliseconds", i), this.getTime()
            },
            setUTCSeconds: function(e, t) {
                return this.setUTCAttribute("seconds", e), void 0 !== t && this.setUTCAttribute("milliseconds", t), this.getTime()
            },
            setUTCMilliseconds: function(e) {
                return this.setUTCAttribute("milliseconds", e), this.getTime()
            },
            setFromDateObjProxy: function(e) {
                this.year = e.getFullYear(), this.month = e.getMonth(), this.date = e.getDate(), this.hours = e.getHours(), this.minutes = e.getMinutes(), this.seconds = e.getSeconds(), this.milliseconds = e.getMilliseconds(), this._day = e.getDay(), this._dateProxy = e, this._timeProxy = Date.UTC(this.year, this.month, this.date, this.hours, this.minutes, this.seconds, this.milliseconds), this._useCache = !1
            },
            setFromTimeProxy: function(e, t) {
                var i = new Date(e),
                    n = t ? timezoneJS.timezone.getTzInfo(e, t, !0).tzOffset : i.getTimezoneOffset();
                i.setTime(e + 6e4 * (i.getTimezoneOffset() - n)), this.setFromDateObjProxy(i)
            },
            setAttribute: function(e, t) {
                if (isNaN(t)) throw new Error("Units must be a number.");
                var i = this._dateProxy,
                    n = "year" === e ? "FullYear" : e.substr(0, 1).toUpperCase() + e.substr(1);
                i["set" + n](t), this.setFromDateObjProxy(i)
            },
            setUTCAttribute: function(e, t) {
                if (isNaN(t)) throw new Error("Units must be a number.");
                var i = "year" === e ? "FullYear" : e.substr(0, 1).toUpperCase() + e.substr(1),
                    n = this.getUTCDateProxy();
                n["setUTC" + i](t), n.setUTCMinutes(n.getUTCMinutes() - this.getTimezoneOffset()), this.setFromTimeProxy(n.getTime() + 6e4 * this.getTimezoneOffset(), this.timezone)
            },
            setTimezone: function(e) {
                var t = this.getTimezoneInfo().tzOffset;
                this.timezone = e, this._useCache = !1, this.setUTCMinutes(this.getUTCMinutes() - this.getTimezoneInfo().tzOffset + t)
            },
            removeTimezone: function() {
                this.timezone = null, this._useCache = !1
            },
            valueOf: function() {
                return this.getTime()
            },
            clone: function() {
                return this.timezone ? new timezoneJS.Date(this.getTime(), this.timezone) : new timezoneJS.Date(this.getTime())
            },
            toGMTString: function() {
                return this.toString("EEE, dd MMM yyyy HH:mm:ss Z", "Etc/GMT")
            },
            toLocaleString: function() {},
            toLocaleDateString: function() {},
            toLocaleTimeString: function() {},
            toSource: function() {},
            toISOString: function() {
                return this.toString("yyyy-MM-ddTHH:mm:ss.SSS", "Etc/UTC") + "Z"
            },
            toJSON: function() {
                return this.toISOString()
            },
            toDateString: function() {
                return this.toString("EEE MMM dd yyyy")
            },
            toTimeString: function() {
                return this.toString("H:mm k")
            },
            toString: function(e, t) {
                e || (e = "yyyy-MM-dd HH:mm:ss");
                var i = e,
                    n = t ? timezoneJS.timezone.getTzInfo(this.getTime(), t) : this.getTimezoneInfo(),
                    r = this;
                t && (r = this.clone(), r.setTimezone(t));
                var s = r.getHours();
                return i.replace(/a+/g, function() {
                    return "k"
                }).replace(/y+/g, function(e) {
                    return _fixWidth(r.getFullYear(), e.length)
                }).replace(/d+/g, function(e) {
                    return _fixWidth(r.getDate(), e.length)
                }).replace(/m+/g, function(e) {
                    return _fixWidth(r.getMinutes(), e.length)
                }).replace(/s+/g, function(e) {
                    return _fixWidth(r.getSeconds(), e.length)
                }).replace(/S+/g, function(e) {
                    return _fixWidth(r.getMilliseconds(), e.length)
                }).replace(/h+/g, function(e) {
                    return _fixWidth(s % 12 === 0 ? 12 : s % 12, e.length)
                }).replace(/M+/g, function(e) {
                    var t = r.getMonth(),
                        i = e.length;
                    return i > 3 ? timezoneJS.Months[t] : i > 2 ? timezoneJS.Months[t].substring(0, i) : _fixWidth(t + 1, i)
                }).replace(/k+/g, function() {
                    return s >= 12 ? (s > 12 && (s -= 12), "PM") : "AM"
                }).replace(/H+/g, function(e) {
                    return _fixWidth(s, e.length)
                }).replace(/E+/g, function(e) {
                    return DAYS[r.getDay()].substring(0, e.length)
                }).replace(/Z+/gi, function() {
                    return n.tzAbbr
                })
            },
            toUTCString: function() {
                return this.toGMTString()
            },
            civilToJulianDayNumber: function(e, t, i) {
                var n;
                t++, t > 12 && (n = parseInt(t / 12, 10), t %= 12, e += n), t <= 2 && (e -= 1, t += 12), n = Math.floor(e / 100);
                var r = 2 - n + Math.floor(n / 4),
                    s = Math.floor(365.25 * (e + 4716)) + Math.floor(30.6001 * (t + 1)) + i + r - 1524;
                return s
            },
            getLocalOffset: function() {
                return this._dateProxy.getTimezoneOffset()
            }
        }, timezoneJS.timezone = new function() {
            function invalidTZError(e) {
                throw new Error("Timezone '" + e + "' is either incorrect, or not loaded in the timezone registry.")
            }

            function builtInLoadZoneFile(e, t) {
                var i = _this.zoneFileBasePath + "/" + e;
                return t && t.async ? _this.transport({
                    async: !0,
                    url: i,
                    success: function(e) {
                        return _this.parseZones(e) && "function" == typeof t.callback && t.callback()
                    },
                    error: function() {
                        throw new Error("Error retrieving '" + i + "' zoneinfo files")
                    }
                }) : _this.parseZones(_this.transport({
                    url: i,
                    async: !1
                }))
            }

            function getRegionForTimezone(e) {
                var t, i, n = regionExceptions[e];
                if (n) return n;
                if (t = e.split("/")[0], i = regionMap[t]) return i;
                var r = _this.zones[e];
                return "string" == typeof r ? getRegionForTimezone(r) : _this.loadedZones.backward ? void invalidTZError(e) : (_this.loadZoneFile("backward"), getRegionForTimezone(e))
            }

            function parseTimeString(e) {
                var t = /(\d+)(?::0*(\d*))?(?::0*(\d*))?([wsugz])?$/,
                    i = e.match(t);
                return i[1] = parseInt(i[1], 10), i[2] = i[2] ? parseInt(i[2], 10) : 0, i[3] = i[3] ? parseInt(i[3], 10) : 0, i.slice(1, 5)
            }

            function processZone(e) {
                if (e[3]) {
                    var t = parseInt(e[3], 10),
                        i = 11,
                        n = 31;
                    e[4] && (i = SHORT_MONTHS[e[4].substr(0, 3)], n = parseInt(e[5], 10) || 1);
                    var r = e[6] ? parseTimeString(e[6]) : [0, 0, 0];
                    return [t, i, n, r[0], r[1], r[2]]
                }
            }

            function getZone(e, t) {
                for (var i = "number" == typeof e ? e : new Date(e).getTime(), n = t, r = _this.zones[n];
                    "string" == typeof r;) n = r, r = _this.zones[n];
                if (!r) {
                    if (!_this.loadedZones.backward) return _this.loadZoneFile("backward"), getZone(e, t);
                    invalidTZError(n)
                }
                if (0 === r.length) throw new Error("No Zone found for '" + t + "' on " + e);
                for (var s = r.length - 1; s >= 0; s--) {
                    var o = r[s];
                    if (o[3] && i > o[3]) break
                }
                return r[s + 1]
            }

            function getBasicOffset(e) {
                var t = parseTimeString(e),
                    i = "-" === e.charAt(0) ? -1 : 1;
                return t = i * (1e3 * (60 * (60 * t[0] + t[1]) + t[2])), t / 60 / 1e3
            }

            function getAdjustedOffset(e, t) {
                return -Math.ceil(t - e)
            }

            function getRule(e, t, i) {
                var n = "number" == typeof e ? new Date(e) : e,
                    r = t[1],
                    s = t[0],
                    o = r.match(/^([0-9]):([0-9][0-9])$/);
                if (o) return [-1e6, "max", "-", "Jan", 1, [0, 0, 0], 60 * parseInt(o[1], 10) + parseInt(o[2], 10), "-"];
                var a, l = function(e, t, i) {
                        var n = 0;
                        if ("u" === t || "g" === t || "z" === t) n = 0;
                        else if ("s" === t) n = s;
                        else {
                            if ("w" !== t && t) throw new Error("unknown type " + t);
                            n = getAdjustedOffset(s, i[6])
                        }
                        return n *= 6e4, new Date(e.getTime() + n)
                    },
                    c = function(e, t) {
                        var i, n = e[0],
                            r = e[1],
                            s = r[5];
                        if (EXACT_DATE_TIME[n] || (EXACT_DATE_TIME[n] = {}), EXACT_DATE_TIME[n][r]) i = EXACT_DATE_TIME[n][r];
                        else {
                            if (isNaN(r[4])) {
                                var o, a;
                                "last" === r[4].substr(0, 4) ? (i = new Date(Date.UTC(n, SHORT_MONTHS[r[3]] + 1, 1, s[0] - 24, s[1], s[2], 0)), o = SHORT_DAYS[r[4].substr(4, 3)], a = "<=") : (i = new Date(Date.UTC(n, SHORT_MONTHS[r[3]], r[4].substr(5), s[0], s[1], s[2], 0)), o = SHORT_DAYS[r[4].substr(0, 3)], a = r[4].substr(3, 2));
                                var c = i.getUTCDay();
                                ">=" === a ? i.setUTCDate(i.getUTCDate() + (o - c + (o < c ? 7 : 0))) : i.setUTCDate(i.getUTCDate() + (o - c - (o > c ? 7 : 0)))
                            } else i = new Date(Date.UTC(n, SHORT_MONTHS[r[3]], r[4], s[0], s[1], s[2], 0));
                            EXACT_DATE_TIME[n][r] = i
                        }
                        return t && (i = l(i, s[3], t)), i
                    },
                    u = function(e, t) {
                        for (var i = [], n = 0; t && n < t.length; n++) t[n][0] <= e && (t[n][1] >= e || t[n][0] === e && "only" === t[n][1] || "max" === t[n][1]) && i.push([e, t[n]]);
                        return i
                    },
                    d = function(e, t, n) {
                        var r, s;
                        return e instanceof Date ? n && (e = l(e, i ? "u" : "w", n)) : (r = e[0], s = e[1], e = !n && EXACT_DATE_TIME[r] && EXACT_DATE_TIME[r][s] ? EXACT_DATE_TIME[r][s] : c(e, n)), t instanceof Date ? n && (t = l(t, i ? "u" : "w", n)) : (r = t[0], s = t[1], t = !n && EXACT_DATE_TIME[r] && EXACT_DATE_TIME[r][s] ? EXACT_DATE_TIME[r][s] : c(t, n)), e = Number(e), t = Number(t), e - t
                    },
                    h = n.getUTCFullYear();
                a = u(h, _this.rules[r]), a.push(n), a.sort(d), _arrIndexOf.call(a, n) < 2 && (a = a.concat(u(h - 1, _this.rules[r])), a.sort(d));
                var f = _arrIndexOf.call(a, n);
                return f > 1 && d(n, a[f - 1], a[f - 2][1]) < 0 ? a[f - 2][1] : f > 0 && f < a.length - 1 && d(n, a[f + 1], a[f - 1][1]) > 0 ? a[f + 1][1] : 0 === f ? null : a[f - 1][1]
            }

            function getAbbreviation(e, t) {
                var i = e[2];
                if (i.indexOf("%s") > -1) {
                    var n;
                    return n = t ? "-" === t[7] ? "" : t[7] : "S", i.replace("%s", n)
                }
                return i.indexOf("/") > -1 ? i.split("/", 2)[t && t[6] ? 1 : 0] : i
            }
            var _this = this,
                regionMap = {
                    Etc: "etcetera",
                    EST: "northamerica",
                    MST: "northamerica",
                    HST: "northamerica",
                    EST5EDT: "northamerica",
                    CST6CDT: "northamerica",
                    MST7MDT: "northamerica",
                    PST8PDT: "northamerica",
                    America: ["northamerica", "southamerica"],
                    Pacific: "australasia",
                    Atlantic: "europe",
                    Africa: "africa",
                    Indian: "africa",
                    Antarctica: "antarctica",
                    Asia: "asia",
                    Australia: "australasia",
                    Europe: "europe",
                    WET: "europe",
                    CET: "europe",
                    MET: "europe",
                    EET: "europe"
                },
                regionExceptions = {
                    "Pacific/Honolulu": "northamerica",
                    "Atlantic/Bermuda": "northamerica",
                    "Atlantic/Cape_Verde": "africa",
                    "Atlantic/St_Helena": "africa",
                    "Indian/Kerguelen": "antarctica",
                    "Indian/Chagos": "asia",
                    "Indian/Maldives": "asia",
                    "Indian/Christmas": "australasia",
                    "Indian/Cocos": "australasia",
                    "America/Danmarkshavn": "europe",
                    "America/Scoresbysund": "europe",
                    "America/Godthab": "europe",
                    "America/Thule": "europe",
                    "Asia/Istanbul": "europe",
                    "Asia/Yekaterinburg": "europe",
                    "Asia/Omsk": "europe",
                    "Asia/Novosibirsk": "europe",
                    "Asia/Krasnoyarsk": "europe",
                    "Asia/Irkutsk": "europe",
                    "Asia/Yakutsk": "europe",
                    "Asia/Vladivostok": "europe",
                    "Asia/Sakhalin": "europe",
                    "Asia/Magadan": "europe",
                    "Asia/Kamchatka": "europe",
                    "Asia/Anadyr": "europe",
                    "Africa/Ceuta": "europe",
                    GMT: "etcetera",
                    "Europe/Nicosia": "asia"
                };
            this.zoneFileBasePath = null, this.zoneFiles = ["africa", "antarctica", "asia", "australasia", "backward", "etcetera", "europe", "northamerica", "pacificnew", "southamerica"], this.loadingSchemes = {
                PRELOAD_ALL: "preloadAll",
                LAZY_LOAD: "lazyLoad",
                MANUAL_LOAD: "manualLoad"
            }, this.getRegionForTimezone = getRegionForTimezone, this.loadingScheme = this.loadingSchemes.LAZY_LOAD, this.loadedZones = {}, this.zones = {}, this.rules = {}, this.init = function(e) {
                var t = {
                        async: !0
                    },
                    i = this.loadingScheme === this.loadingSchemes.PRELOAD_ALL ? this.zoneFiles : this.defaultZoneFile || "northamerica";
                for (var n in e) t[n] = e[n];
                return this.loadZoneFiles(i, t)
            }, this.loadZoneFiles = function(e, t) {
                var i, n = 0;
                if ("string" == typeof e) return this.loadZoneFile(e, t);
                t = t || {}, i = t.callback, t.callback = function() {
                    n++, n === e.length && "function" == typeof i && i()
                };
                for (var r = 0; r < e.length; r++) this.loadZoneFile(e[r], t)
            }, this.loadZoneFile = function(e, t) {
                if ("undefined" == typeof this.zoneFileBasePath) throw new Error("Please define a base path to your zone file directory -- timezoneJS.timezone.zoneFileBasePath.");
                if (!this.loadedZones[e]) return this.loadedZones[e] = !0, builtInLoadZoneFile(e, t)
            }, this.loadZoneJSONData = function(url, sync) {
                var processData = function(data) {
                    data = eval("(" + data + ")");
                    for (var z in data.zones) _this.zones[z] = data.zones[z];
                    for (var r in data.rules) _this.rules[r] = data.rules[r]
                };
                return sync ? processData(_this.transport({
                    url: url,
                    async: !1
                })) : _this.transport({
                    url: url,
                    success: processData
                })
            }, this.loadZoneDataFromObject = function(e) {
                if (e) {
                    for (var t in e.zones) _this.zones[t] = e.zones[t];
                    for (var i in e.rules) _this.rules[i] = e.rules[i]
                }
            }, this.getAllZones = function() {
                var e = [];
                for (var t in this.zones) e.push(t);
                return e.sort()
            }, this.parseZones = function(e) {
                if (!e) return !1;
                for (var t, i = e.split("\n"), n = [], r = "", s = null, o = null, a = 0; a < i.length; a++)
                    if (t = i[a], t.match(/^\s/) && (t = "Zone " + s + t), t = t.split("#")[0], t.length > 3) switch (n = t.split(/\s+/), r = n.shift()) {
                        case "Zone":
                            if (s = n.shift(), _this.zones[s] || (_this.zones[s] = []), n.length < 3) break;
                            n.splice(3, n.length, processZone(n)), n[3] && (n[3] = Date.UTC.apply(null, n[3])), n[0] = -getBasicOffset(n[0]), _this.zones[s].push(n);
                            break;
                        case "Rule":
                            o = n.shift(), _this.rules[o] || (_this.rules[o] = []), n[0] = parseInt(n[0], 10), n[1] = parseInt(n[1], 10) || n[1], n[5] = parseTimeString(n[5]), n[6] = getBasicOffset(n[6]), _this.rules[o].push(n);
                            break;
                        case "Link":
                            if (_this.zones[n[1]]) throw new Error("Error with Link " + n[1] + ". Cannot create link of a preexisted zone.");
                            isNaN(n[0]) ? _this.zones[n[1]] = n[0] : _this.zones[n[1]] = parseInt(n[0], 10)
                    }
                    return !0
            }, this.transport = _transport, this.getTzInfo = function(e, t, i) {
                if (this.loadingScheme === this.loadingSchemes.LAZY_LOAD) {
                    var n = getRegionForTimezone(t);
                    if (!n) throw new Error("Not a valid timezone ID.");
                    this.loadZoneFiles(n)
                }
                var r = getZone(e, t),
                    s = +r[0],
                    o = getRule(e, r, i);
                o && (s = getAdjustedOffset(s, o[6]));
                var a = getAbbreviation(r, o);
                return {
                    tzOffset: s,
                    tzAbbr: a
                }
            }
        }
    }.call("undefined" != typeof window ? window : this);
var A17 = window.A17 || {};
if (!A17.browserSpec || "html4" === A17.browserSpec) throw new Error("HTML4");
A17.Behaviors = {}, A17.Helpers = {}, A17.Functions = {}, A17.currentMediaQuery = "large", A17.activeBehaviors = {}, A17.Views = {}, A17.Transitions = {}, A17.latestClickElement = null, A17.bezier = BezierEasing(.59, .01, .28, 1), A17.headerHeight = 90, A17.debug = !1, A17.featuredList = "", A17.featuredWrapped = !1, A17.onReady = function() {
    var e = "no-pjax";
    Barba.Pjax.ignoreClassLink = e, Barba.Pjax.Dom.wrapperId = "pjax", Barba.Pjax.Dom.wrapperDefaultId = Barba.Pjax.Dom.wrapperId, Barba.Pjax.Dom.containerClass = "pjax__container", Barba.Pjax.Dom.containerDefaultClass = Barba.Pjax.Dom.containerClass, Barba.Pjax.cacheEnabled = !0, A17.currentMediaQuery = A17.Helpers.getCurrentMediaQuery(), A17.Helpers.manageBehaviors(), document.addEventListener("content:updated", function(e) {
        var t = e.data.el ? e.data.el : document.querySelector("." + Barba.Pjax.Dom.containerClass);
        t && "function" == typeof picturefill && picturefill({
            elements: t.querySelectorAll("picture > img[src], img[srcset][sizes]")
        })
    }), A17.Helpers.resized(), Barba.Dispatcher.on("linkClicked", function(e) {
        A17.latestClickElement = e, A17.Helpers.triggerCustomEvent(document, "page:leaving")
    }), A17.Helpers.manageTransitions(), Barba.Dispatcher.on("transitionCompleted", function(e) {
        if (Barba.HistoryManager.prevStatus()) {
            A17.Helpers.triggerCustomEvent(document, "page:changed");
            var t = document.querySelector("." + Barba.Pjax.Dom.containerClass);
            t && A17.Helpers.triggerCustomEvent(document, "page:updated"), A17.Helpers.cleanupHTMLClasses()
        }
        A17.Helpers.triggerCustomEvent(document, "page:loaded"), A17.latestClickElement = null
    }), document.querySelector("." + Barba.Pjax.Dom.containerClass) && Barba.Pjax.start(), A17.Helpers.fontObservers({
        name: "NeueHaas",
        variants: [{
            name: "NeueHaas",
            weight: "500"
        }]
    }), A17.Helpers.analytics()
}, document.addEventListener("DOMContentLoaded", function() {
    "object" == typeof Raven ? Raven.context(function() {
        A17.onReady()
    }) : A17.onReady()
}), "undefined" == typeof console && (window.console = {
    log: function() {}
}), A17.Functions.getCurrentPage = function(e) {
    var e = e || document.documentElement.className,
        t = !1,
        i = "page-",
        n = e.split(" ").filter(function(e) {
            return 0 === e.lastIndexOf(i, 0)
        });
    n.length ? (n = n.map(function(e) {
        return e.replace(i, "")
    }), t = n.join("").trim().split("--")) : t = e.trim().split("--");
    var r = t.map(function(e) {
        return e.replace(i, "")
    });
    return r.length ? r[r.length - 1] : r
}, A17.Functions.homeSliderNoTouch = function(e) {
    function t() {
        var e = _.querySelector("." + j);
        e && (e.classList.contains("homeSlider__slide--dark") ? w.classList.add(N) : w.classList.remove(N))
    }

    function i(e) {
        T.textContent = e + 1, TweenLite.to(E, .5, {
            rotation: 360,
            ease: new Ease(A17.bezier),
            clearProps: "all"
        })
    }

    function n(t) {
        t.target.blur(), t.currentTarget.blur(), u(), l(), e.focus()
    }

    function r(t) {
        t.target.blur(), t.currentTarget.blur(), u(), c(), e.focus()
    }

    function s(e) {
        H = e, _.querySelector(".is-selected").classList.remove("is-selected"), S.addEventListener("click", r, !1), b.addEventListener("click", n, !1), x.addEventListener("click", r, !1), document.addEventListener("keydown", a, !1), A17.Helpers.forEach(A, function(e, t) {
            var i = e.querySelector("[data-large-video]");
            i ? I.push(i) : I.push("")
        }), A.length < 3 ? (v(0), t(), o()) : m(0)
    }

    function o() {
        u(), _.removeEventListener("click", r, !1), S.removeEventListener("click", r, !1), b.removeEventListener("click", n, !1), x.removeEventListener("click", r, !1), document.removeEventListener("keydown", a)
    }

    function a(e) {
        37 === e.keyCode && l(), 39 === e.keyCode && c()
    }

    function l() {
        if (z) return !1;
        var e = 0;
        e = D > 0 ? D - 1 : F - 1, u(), M = "prev", m(e)
    }

    function c() {
        if (z) return !1;
        var e = 0;
        e = D < F - 1 ? D + 1 : 0, u(), M = "next", m(e)
    }

    function u() {
        clearTimeout(P), P = null
    }

    function d() {
        null === P && (t(), P = setTimeout(c, H))
    }

    function h(e, t) {
        var i = e.className.split(" ").filter(function(e) {
            return 0 !== e.lastIndexOf("is--", 0)
        });
        e.className = i.join(" ").trim() + " " + t
    }

    function f(e, t) {
        TweenLite.to(e, .5, {
            xPercent: t,
            ease: new Ease(A17.bezier)
        })
    }

    function p(e, t) {
        TweenLite.set(e, {
            xPercent: t
        })
    }

    function m(e) {
        return !z && void(O ? y(e) : g(e))
    }

    function g(e) {
        z = !0;
        var n = 500,
            r = e,
            s = e;
        D = e, r = r > 0 ? D - 1 : F - 1, s = s < F - 1 ? D + 1 : 0, _.classList.add(R), A17.Helpers.forEach(A, function(e, t) {
            t === r ? (h(e, B), "next" === M ? f(e, -100) : p(e, -100), L = e) : t === D ? (h(e, j), f(e, 0), C = e) : t === s ? (h(e, q), "prev" === M ? f(e, 100) : p(e, 100), k = e) : (h(e, ""), p(e, 0))
        }), setTimeout(function() {
            _.classList.remove(R), z = !1
        }, n), i(e), v(e), t(), L && (A17.Helpers.lazyloadPictureLikeFlickity(L.querySelector("img[data-flickity-lazyload]")), A17.Functions.homeSliderVideoLoad(L.querySelector("video.homeSlider__img"))), k && (A17.Helpers.lazyloadPictureLikeFlickity(k.querySelector("img[data-flickity-lazyload]")), A17.Functions.homeSliderVideoLoad(k.querySelector("video.homeSlider__img"))), A17.Helpers.triggerCustomEvent(document, "analytics:homepageslide"), null === P && d()
    }

    function v(e) {
        if (0 === I.length) return !1;
        for (var t = 0; t < I.length; t++) "" != I[t] && A17.Functions.homeSliderVideoPause(I[t]);
        if ("number" == typeof e) {
            if ("" === I[e]) return !1;
            A17.Functions.homeSliderVideoLoad(I[e])
        }
    }

    function y(e) {
        TweenLite.to(C, .3, {
            x: 0,
            onComplete: function() {
                O = !1, k && TweenLite.set(k, {
                    x: 0
                }), L && TweenLite.set(L, {
                    x: 0
                }), g(e)
            }
        })
    }
    var w = document.documentElement,
        _ = e.querySelector("[data-home-slider]"),
        A = _.querySelectorAll("article"),
        x = (e.querySelector("[data-home-next]"), e.querySelector("[data-home-prev]"), e.querySelector("[data-home-next-preview]")),
        b = e.querySelector("[data-home-prev-preview]"),
        T = e.querySelector("[data-home-current]"),
        S = e.querySelector("[data-home-navigator]"),
        E = e.querySelector("[data-home-slash]"),
        L = _.querySelector("article:last-child"),
        C = _.querySelector("article:first-child"),
        k = C.nextSibling,
        P = null,
        H = 0,
        z = !1,
        O = !1,
        M = "next",
        D = 0,
        F = A.length,
        I = [],
        B = "is--previous",
        j = "is--selected",
        q = "is--next",
        R = "is--sliding",
        N = "page-home--light";
    this.init = function(e) {
        s(e)
    }, this.destroy = function() {
        o()
    }, this.pause = function() {
        u()
    }, this.play = function() {
        d()
    }, this.select = function(e) {
        m(e)
    }
}, A17.Functions.homeSliderTouch = function(e) {
    function t() {
        var e = h.querySelector("." + _);
        e && (e.classList.contains("homeSlider__slide--dark") ? d.classList.add(A) : d.classList.remove(A))
    }

    function i(e) {
        p.textContent = e + 1, TweenLite.set(m, {
            rotation: 0
        }), TweenLite.to(m, .5, {
            rotation: 360,
            ease: new Ease(A17.bezier)
        })
    }

    function n(e) {
        for (var t = 0; t < v.length; t++) "" != v[t] && A17.Functions.homeSliderVideoPause(v[t]);
        if ("number" == typeof e) {
            if ("" === v[e]) return !1;
            A17.Functions.homeSliderVideoLoad(v[e])
        }
    }

    function r(e) {
        for (var t = 0; t < y.length; t++) "" != y[t] && (t === e ? Number.isNaN(Number(y[t].duration)) || y[t].paused && y[t].play() : y[t].pause())
    }

    function s() {
        g = new Flickity(h, {
            cellAlign: "left",
            percentPosition: !1,
            prevNextButtons: !1,
            pageDots: !1,
            contain: !0,
            draggable: !0,
            wrapAround: !0,
            autoPlay: w,
            setGallerySize: !1,
            dragThreshold: 15
        }), g.on("select", function() {
            if (!g) return !1;
            var e = g.selectedIndex;
            i(e), n(e), r(e), t(), A17.Helpers.triggerCustomEvent(document, "analytics:homepageslide")
        })
    }

    function o(e) {
        if (w = e, !f.length) return !1;
        A17.Helpers.forEach(f, function(e, t) {
            var i = e.querySelector("[data-large-video]");
            i ? v.push(i) : v.push("")
        }), A17.Helpers.forEach(f, function(e, t) {
            var i = e.querySelector("video.homeSlider__img");
            i ? y.push(i) : y.push("")
        }), t();
        var i = "is--selected",
            n = h.querySelector("." + i);
        n && n.classList.remove(i), f.length > 1 && s()
    }

    function a() {
        g && g.destroy()
    }

    function l() {
        g && g.pausePlayer()
    }

    function c() {
        g && g.unpausePlayer()
    }

    function u(e) {
        g && g.select(e, !1, !0)
    }
    var d = document.documentElement,
        h = e.querySelector("[data-home-slider]"),
        f = h.querySelectorAll("article"),
        p = e.querySelector("[data-home-current]"),
        m = e.querySelector("[data-home-slash]"),
        g = null,
        v = [],
        y = [],
        w = 9e3,
        _ = "is-selected",
        A = "page-home--light";
    this.init = function(e) {
        o(e)
    }, this.destroy = function() {
        a()
    }, this.pause = function() {
        l()
    }, this.play = function() {
        c()
    }, this.select = function(e) {
        u(e)
    }
}, A17.Functions.homeSliderVideoLoad = function(e) {
    function t(e, t) {
        e.setAttribute("src", e.getAttribute(t)), e.removeAttribute(t)
    }

    function i() {
        var e = this;
        e.paused && e.play(), e.classList.add("loaded"), e.removeEventListener("canplay", i, !1)
    }
    if (e)
        if (e.classList.contains("loaded")) Number.isNaN(Number(e.duration)) || e.paused && e.play();
        else {
            var n = e.querySelectorAll("[data-src], [data-flickity-lazyload]");
            n.length && A17.Helpers.forEach(n, function(e, i) {
                e.getAttribute("data-src") && t(e, "data-src"), e.getAttribute("data-flickity-lazyload") && t(e, "data-flickity-lazyload")
            }), e.readyState > 2 ? (e.paused && e.play(), e.classList.add("loaded")) : (e.addEventListener("canplay", i, !1), e.load())
        }
}, A17.Functions.homeSliderVideoPause = function(e) {
    e.classList.contains("loaded") && (Number.isNaN(Number(e.duration)) || e.pause())
}, A17.Functions.isHomepage = function() {
    return document.documentElement.className.search("page-home") != -1
}, A17.Functions.isPage = function(e, t) {
    return !!e.namespace && e.namespace.search(t) != -1
}, A17.Functions.manipulateFeaturedDOM = function(e) {
    function t() {
        for (var e = [], t = Math.round(c.length / 4), i = 0; i < t; i++) {
            var n = document.createDocumentFragment(),
                r = document.createElement("div");
            r.className = o;
            for (var s = 4 * i; s < 4 * i + 4; s++) c[s] && r.appendChild(c[s]);
            n.appendChild(r), e.push(n)
        }
        return e
    }

    function i() {
        function i() {
            return !(r > n.length - 2) && (s.appendChild(n[r]), s.appendChild(n[r + 1]), void(r += 2))
        }
        e.classList.remove(d);
        var n = t(),
            r = 0,
            s = document.createDocumentFragment();
        A17.Helpers.forEach(l, function(e, t) {
            s.appendChild(e), 0 === t && i(), t > 0 && t % 2 === 0 && i()
        }), e.innerHTML = "", e.appendChild(s), e.classList.add(d)
    }

    function n() {
        e.classList.remove(d), "" != A17.featuredList && (e.innerHTML = A17.featuredList), e.classList.add(d)
    }

    function r() {
        var t = A17.currentMediaQuery.indexOf("large") !== -1;
        t && A17.featuredWrapped === !1 ? (i(), A17.featuredWrapped = !0) : t === !1 && A17.featuredWrapped && (n(), A17.featuredWrapped = !1), A17.Helpers.lazyload(e)
    }

    function s() {
        return !e.classList.contains(u) && (e.classList.add(u), A17.featuredWrapped = !1, void("" === A17.featuredList && (A17.featuredList = e.innerHTML)))
    }
    var o = e.getAttribute("data-feature-wrapper"),
        a = e.querySelectorAll("article"),
        l = e.querySelectorAll(".workFeatureItem"),
        c = e.querySelectorAll(".workFeatureSmallItem");
    if (0 == a.length) return !1;
    var u = "js--initiated",
        d = "js--ready";
    s(), r()
}, A17.Functions.moveWorkFilter = function(e, t) {
    var i = "workFilter__btn--active",
        n = document.querySelector("[data-work-status]"),
        r = document.querySelectorAll(".workFilter__scroller"),
        s = e.getAttribute("data-work-filter");
    A17.Helpers.forEach(t, function(e) {
        e.getAttribute("data-work-filter") === s ? e.classList.add(i) : e.classList.remove(i)
    });
    var o = e.offsetWidth,
        a = e.offsetLeft,
        l = window.innerWidth;
    n.style.width = o + "px", n.style.transform = "translate3d(" + a + "px, 0, 0)", n.style.webkitTransform = "translate3d(" + a + "px, 0, 0)";
    var c = a > l / 2 ? Math.max(0, r[0].scrollWidth - l) : 0;
    TweenLite.to(r, .5, {
        scrollTo: {
            x: c,
            autoKill: !1
        }
    })
}, A17.Functions.showHeader = function() {
    var e = document.querySelector(".header");
    e.className = "header header--animated header--active"
}, A17.Functions.updateCurrentListing = function() {
    store.set("listing", {
        url: window.location.href
    })
}, A17.Helpers.ajaxRequest = function(e) {
    var t = e,
        i = new XMLHttpRequest,
        n = t.url;
    if (t.queryString = "", void 0 !== t.data) {
        if (!A17.Helpers.turnObjectToQueryString) throw new ReferenceError("Missing: A17.Helpers.turnObjectToQueryString");
        t.queryString = A17.Helpers.turnObjectToQueryString(t.data)
    }
    if ("POST" !== t.type && (n += n.indexOf("?") > 0 ? t.queryString.replace("?", "&") : t.queryString), i.open(t.type, n, !0), i.setRequestHeader("X-Requested-With", "XMLHttpRequest"), "POST" === t.type && i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), void 0 !== t.requestHeaders && t.requestHeaders.length > 0)
        for (var r = 0; r < t.requestHeaders.length; r++) {
            var s = t.requestHeaders[r].header,
                o = t.requestHeaders[r].value;
            void 0 !== s && void 0 !== o && i.setRequestHeader(s, o)
        }
    i.onload = function() {
        i.status >= 200 && i.status < 400 ? "function" === (typeof t.onSuccess).toLowerCase() && t.onSuccess.call(this, i.responseText, i.status) : "function" === (typeof t.onError).toLowerCase() && t.onError.call(this, i.responseText, i.status)
    }, i.onerror = function() {
        "function" === (typeof t.onError).toLowerCase() && t.onError.call(this, i.responseText, i.status)
    }, i.send("POST" === t.type ? t.queryString.replace("?", "") : "")
}, A17.Helpers.analytics = function() {
    return "undefined" != typeof ga && (Barba.Dispatcher.on("newPageReady", function(e, t, i, n) {
        Barba.HistoryManager.prevStatus() && (ga("set", "page", location.pathname), ga("send", "pageview"))
    }), document.addEventListener("analytics:homepagescrolled", function() {
        ga("send", "event", "Homepage", "scrolled", "Homepage scrolled")
    }), document.addEventListener("analytics:homepageslide", function() {
        ga("send", "event", "Homepage", "slide", "Homepage slide")
    }), document.addEventListener("analytics:loadmore", function() {
        ga("send", "event", "Load More", "click", "Load More pagination"), ga("set", "page", location.pathname), ga("send", "pageview")
    }), document.addEventListener("analytics:readstory", function() {
        ga("send", "event", "Case Study", "read the story", "Click Read the story in Case Study")
    }), void document.addEventListener("analytics:nextproject", function() {
        ga("send", "event", "Case Study", "next", "Click Next Case Study")
    }))
}, A17.Helpers.cleanupHTMLClasses = function() {
    var e = document.documentElement,
        t = "js--nav";
    e.classList.remove(t);
    var i = "ui-modal--active";
    e.classList.remove(i);
    var n = document.querySelector(".footer--hidden");
    n && n.classList.remove("footer--hidden")
}, A17.Helpers.cookieCreate = function(e, t, i) {
    var n = "";
    if (i) {
        var r = new Date;
        r.setTime(r.getTime() + 24 * i * 60 * 60 * 1e3), n = "; expires=" + r.toGMTString()
    }
    document.cookie = e + "=" + t + n + "; path=/"
}, A17.Helpers.cookieRead = function(e) {
    if (e) {
        for (var t = e + "=", i = document.cookie.split(";"), n = 0; n < i.length; n++) {
            for (var r = i[n];
                " " === r.charAt(0);) r = r.substring(1, r.length);
            if (0 === r.indexOf(t)) return r.substring(t.length, r.length)
        }
        return null
    }
    return null
}, A17.Helpers.fontObservers = function(e) {
    function t() {
        i++, i >= n && (document.documentElement.className += " js-" + e.name + "-loaded", A17.Helpers.cookieCreate(r, n, 1)), A17.Helpers.triggerCustomEvent(document, "font:loaded")
    }
    if ("object" !== (typeof e).toLowerCase()) return !1;
    var i = 0,
        n = e.variants.length,
        r = "A17_fonts_cookie_" + e.name,
        s = A17.Helpers.cookieRead(r) || "";
    if (s && s === n.toString()) i = s, t();
    else
        for (var o = 0; o < n; o++) FontFaceOnload(e.variants[o].name, {
            success: t,
            error: t,
            weight: e.variants[o].weight || "",
            timeout: 3e3
        })
}, A17.Helpers.forEach = function(e, t, i) {
    for (var n = 0; n < e.length; n++) t.call(i, e[n], n)
}, A17.Helpers.formToJson = function(e) {
    for (var t = {}, i = e.querySelectorAll("input, select, textarea"), n = 0; n < i.length; ++n) {
        var r = i[n],
            s = r.name,
            o = encodeURIComponent(r.value);
        s && (t[s] = o)
    }
    return t
}, A17.Helpers.getCurrentMediaQuery = function() {
    function e(e) {
        return e.replace(/'/gi, "").replace(/"/gi, "")
    }
    return window.opera ? e(window.getComputedStyle(document.body, ":after").getPropertyValue("content")) || "large" : window.getComputedStyle ? e(window.getComputedStyle(document.head, null).getPropertyValue("font-family")) || "large" : "large"
}, A17.Helpers.getElementTopOffset = function(e) {
    return e.getBoundingClientRect().top + window.pageYOffset
}, A17.Helpers.getWorkSectionTopOffset = function() {
    return 0
}, A17.Helpers.hideProgressBar = function() {
    document.documentElement.classList.remove("html--loading")
}, A17.Helpers.imagesLoaded = function(e, t) {
    function i() {
        n += 1, n === e.length && t()
    }
    for (var n = 0, r = 0; r < e.length; r++) {
        var s = e[r],
            o = new Image;
        o.onload = i, s.complete ? i() : o.src = s.src
    }
}, A17.Helpers.jsonToForm = function(e, t) {
    for (var i = t.querySelectorAll("input, select, textarea"), n = 0; n < i.length; ++n) {
        var r = i[n],
            s = r.name;
        e[s] && (r.value = decodeURIComponent(e[s]))
    }
}, A17.Helpers.jsonToQueryString = function(e, t) {
    return t = t || "?", t + Object.keys(e).map(function(t) {
        return encodeURIComponent(t) + "=" + encodeURIComponent(e[t])
    }).join("&")
}, A17.Helpers.lazyload = function(e) {
    function t(e) {
        var t = [];
        for (t = [], i = e.length; i;) t[--i] = e[i];
        return t
    }

    function n(e, t) {
        for (var i = e.concat(t), n = 0; n < i.length; ++n)
            for (var r = n + 1; r < i.length; ++r) i[n] === i[r] && i.splice(r--, 1);
        return i
    }

    function r(e) {
        e = "SOURCE" === e.tagName ? e.parentNode : e;
        var t = e.getBoundingClientRect();
        return (t.top >= 0 || t.bottom >= 0) && t.left >= 0 && t.top <= (window.innerHeight || document.documentElement.clientHeight)
    }

    function s() {
        var e = this;
        o(e)
    }

    function o(e) {
        e.removeEventListener("load", s, !1), e.removeEventListener("error", s, !1), c(e), a(e), "function" == typeof picturefill && picturefill({
            elements: [e]
        })
    }

    function a(e) {
        setTimeout(function() {
            e.parentElement.classList.add("js--lazyloaded")
        }, 250)
    }

    function l() {
        var e = this;
        e.paused && e.play(), a(e), e.removeEventListener("canplay", l, !1)
    }

    function c(e) {
        e.removeAttribute("data-src"), e.removeAttribute("data-srcset")
    }

    function u(e) {
        var t = e.getAttribute("data-srcset"),
            i = e.getAttribute("data-src");
        t && (e.srcset = t), i && (e.src = i)
    }

    function d(e) {
        return e.complete && void 0 !== e.naturalWidth
    }

    function h() {
        var e;
        if (void 0 !== typeof document.querySelectorAll && "addEventListener" in window && window.requestAnimationFrame && void 0 !== typeof document.body.getBoundingClientRect) {
            if (p === g) {
                for (m = v.length, e = 0; e < m; e++)
                    if (v[e] && void 0 === v[e].lazyloaded && r(v[e])) {
                        var t = v[e];
                        if (v[e] = void 0, t.lazyloaded = !0, "IMG" === t.tagName && (t.addEventListener("load", s, !1), t.addEventListener("error", s, !1)), u(t), "IMG" === t.tagName) {
                            var i = d(t);
                            i && o(t)
                        }
                        if ("SOURCE" === t.tagName && c(t), "VIDEO" === t.parentElement.tagName) {
                            var n = t.parentElement;
                            n.readyState > 2 ? (n.paused && n.play(), a(n)) : (n.addEventListener("canplay", l, !1), n.load())
                        }
                    }
                for (e = 0; e < m; e++) void 0 === v[e] && v.splice(e, 1);
                m = v.length, p = -1
            }
            m > 0 && (p++, window.requestAnimationFrame(h))
        } else
            for (e = 0; e < m; e++) u(v[e]), c(v[e])
    }

    function f(e) {
        e = e || document;
        var i = e.querySelectorAll("img[data-src], img[data-srcset], source[data-srcset], iframe[data-src], video > source[data-src]");
        v = n(v, t(i)), m = v.length, p = g, h()
    }
    var p, m, g = 10,
        v = [];
    f(e)
}, A17.Helpers.lazyloadPicture = function(e) {
    if (null === e) return !1;
    var t = "data-srcset",
        i = e.getAttribute(t);
    i && (e.setAttribute("srcset", i), e.removeAttribute(t));
    var n = e.parentElement.getElementsByTagName("source");
    n && A17.Helpers.forEach(n, function(i, n) {
        var r = i.getAttribute(t);
        r && (i.setAttribute("srcset", r), i.removeAttribute(t), picturefill && picturefill({
            elements: [e]
        }))
    })
}, A17.Helpers.lazyloadPictureLikeFlickity = function(e) {
    function t(e) {
        n("flickity-lazyloaded")
    }

    function i(e) {
        n("flickity-lazyerror")
    }

    function n(n) {
        e.removeEventListener("load", t), e.removeEventListener("error", i), e.classList.add(n), A17.Helpers.lazyloadPicture(e)
    }
    return null !== e && (e.addEventListener("load", t), e.addEventListener("error", i), e.src = e.getAttribute("data-flickity-lazyload"), void e.removeAttribute("data-flickity-lazyload"))
}, A17.Helpers.log = function(e, t, i) {
    if (!A17.debug) return !1;
    if ("undefined" != typeof t);
}, A17.Helpers.manageBehaviors = function(e) {
    function t(e) {
        void 0 === e && (e = document);
        for (var t = e.querySelectorAll("[data-behavior]"), i = -1; t[++i];) {
            var r = t[i];
            if (!r._A17BehaviorsActive)
                for (var s = r.getAttribute("data-behavior"), o = s.split(" "), a = 0, l = o.length; a < l; a++) {
                    var c = A17.Behaviors[o[a]];
                    if ("undefined" != typeof c) try {
                        r._A17BehaviorsActive = !0, A17.activeBehaviors[n] = {
                            el: r,
                            behavior: new c(r),
                            name: o[a]
                        };
                        try {
                            A17.activeBehaviors[n].behavior.init()
                        } catch (u) {}
                        n++
                    } catch (u) {}
                }
        }
    }

    function i() {
        for (var e in A17.activeBehaviors)
            if (A17.activeBehaviors.hasOwnProperty(e)) {
                var i = A17.activeBehaviors[e];
                if (!document.body.contains(i.el)) try {
                    i.behavior.destroy(), delete A17.activeBehaviors[e]
                } catch (n) {}
            }
        t()
    }
    var n = 0,
        r = e && e.pageUpdatedEventName ? e.pageUpdatedEventName : "page:updated";
    t(), document.addEventListener(r, i), document.addEventListener("content:updated", function() {
        t(event.data.el ? event.data.el : "")
    })
}, A17.Helpers.manageTransitions = function() {
    Barba.Pjax.getTransition = function() {
        return A17.Transitions.ShowNews.valid() ? A17.Transitions.ShowNews : A17.Transitions.SlideFilterResults.valid() ? A17.Transitions.SlideFilterResults : A17.Transitions.ShowFilterDetails.valid() ? A17.Transitions.ShowFilterDetails : A17.Transitions.ShowDiscipline.valid() ? A17.Transitions.ShowDiscipline : A17.Transitions.ReorderWorks.valid() ? A17.Transitions.ReorderWorks : A17.Transitions.ShowNextCaseStudy.valid() ? (A17.Helpers.triggerCustomEvent(document, "analytics:nextproject"), A17.Transitions.ShowNextCaseStudy) : A17.Transitions.ShowCaseStudy.valid() ? (A17.Helpers.triggerCustomEvent(document, "analytics:readstory"), A17.Transitions.ShowCaseStudy) : A17.Transitions.HideShow
    }
}, A17.Helpers.purgeProperties = function(e) {
    for (var t in e) e.hasOwnProperty(t) && delete e[t]
}, A17.Helpers.queryStringToObject = function(e) {
    e.indexOf("?") > -1 && (e = e.split("?")[1]);
    var t = e.split("&"),
        i = {};
    return t.forEach(function(e) {
        e = e.split("="), i[e[0]] = decodeURIComponent(e[1] || "")
    }), i
}, A17.Helpers.resized = function() {
    var e, t = !1;
    window.addEventListener("resize", function() {
        clearTimeout(e), e = setTimeout(function() {
            var e = A17.Helpers.getCurrentMediaQuery();
            A17.currentMediaQuery !== e && (A17.currentMediaQuery = e, t = !0), A17.Helpers.triggerCustomEvent(document, "resized"), t && A17.Helpers.triggerCustomEvent(document, "mediaQueryUpdated")
        }, 200)
    })
}, A17.Helpers.showProgressBar = function() {
    document.documentElement.classList.add("html--loading")
}, A17.Helpers.shuffle = function(e) {
    for (var t, i, n = e.slice(0), r = n.length; --r;) i = Math.floor(r * Math.random()), t = n[i], n[i] = n[r], n[r] = t;
    return n
}, A17.Helpers.shuffleSectors = function(e) {
    var t = "js--shuffled";
    if (e.classList.contains(t)) return !1;
    var i = e.querySelector("[data-sector-images]"),
        n = i.children,
        r = 0,
        s = document.createDocumentFragment();
    for (n = Array.prototype.slice.call(n), n = A17.Helpers.shuffle(n); r < n.length;) s.appendChild(n[r]), ++r;
    i.innerHTML = "", i.appendChild(s), e.classList.add(t)
}, A17.Helpers.triggerCustomEvent = function(e, t, i) {
    var n = document.createEvent("HTMLEvents");
    n.initEvent(t, !0, !0), n.data = i || {}, n.eventName = t, n.target = e, e.dispatchEvent(n)
}, A17.Helpers.turnObjectToQueryString = function(e) {
    var t = "",
        i = 0;
    if (Object.getOwnPropertyNames(e).length > 0) {
        t = "?";
        for (var n in e) e.hasOwnProperty(n) && (t += (i > 0 ? "&" : "") + n + "=" + encodeURIComponent(e[n]).replace(/[!'()]/g, "").replace(/\*/g, "%2A").replace(/%2B/gi, "+"), i++)
    }
    return t
}, A17.Behaviors.abcNavigation = function(e) {
    function t(e) {
        e.preventDefault();
        var t = e.target;
        return !t.classList.contains(s) && (A17.Helpers.forEach(r, function(e) {
            e.classList.remove(s)
        }), t.classList.add(s), Barba.Dispatcher.trigger("linkClicked", t, e), i(.5), void Barba.Pjax.goTo(t.href, {
            type: "pjaxWorks"
        }))
    }

    function i(t) {
        var i = e.querySelector(".js--active");
        if (i) {
            var n = i.offsetLeft > window.innerWidth / 2 ? Math.max(0, i.offsetLeft - window.innerWidth / 2) : 0;
            t ? TweenLite.to(e, t, {
                scrollTo: {
                    x: n
                },
                ease: new Ease(A17.bezier)
            }) : TweenLite.set(e, {
                scrollTo: {
                    x: n
                }
            })
        }
    }

    function n() {
        r && (A17.Helpers.forEach(r, function(e) {
            e.addEventListener("click", t, !1)
        }), i(0))
    }
    var r = e.getElementsByTagName("a"),
        s = "js--active";
    this.destroy = function() {
        A17.Helpers.forEach(r, function(e) {
            e.removeEventListener("click", t)
        }), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        n()
    }
}, A17.Behaviors.animateSectors = function(e) {
    function t() {
        var e = function() {
            l = null, r(window.pageYOffset)
        };
        clearTimeout(l), l = setTimeout(e, 500)
    }

    function i(e) {
        var t = A17.Helpers.getElementTopOffset(e);
        return t > window.pageYOffset && t + e.offsetHeight < window.pageYOffset + window.innerHeight
    }

    function n(e, t) {
        return Math.round(e + Math.random() * t)
    }

    function r(e) {
        A17.Helpers.forEach(d, function(e, t) {
            i(e) ? s(e, n(10, 2500)) : o(e)
        })
    }

    function s(e, t) {
        setTimeout(function() {
            i(e) && (e.classList.add(u), e.classList.remove(c), A17.Helpers.triggerCustomEvent(e, "loop:play"), setTimeout(function() {
                o(e)
            }, n(2e3, 5e3)))
        }, t)
    }

    function o(e) {
        e.classList.add(c), e.classList.remove(u)
    }

    function a() {
        return !!A17.touch && (document.addEventListener("page:loaded", t), void window.addEventListener("scroll", t))
    }
    var l, c = "js--paused",
        u = "js--playing",
        d = e.querySelectorAll(".sectorItem__link");
    this.destroy = function() {
        document.removeEventListener("page:loaded", t), window.removeEventListener("scroll", t), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        a()
    }
}, A17.Behaviors.backToTop = function(e) {
    function t(e) {
        e.currentTarget.blur(), TweenLite.to(window, .5, {
            scrollTo: {
                y: 0,
                autoKill: !1
            },
            ease: new Ease(A17.bezier)
        })
    }

    function i() {
        e.addEventListener("click", t)
    }
    this.destroy = function() {
        e.removeEventListener("click", t), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        i()
    }
}, A17.Behaviors.carousel = function(e) {
    function t(e) {
        c && (c.append(e), d = u.querySelectorAll("a"), A17.Helpers.forEach(d, function(e) {
            e.removeEventListener("click", r), e.addEventListener("click", r, !1)
        }), A17.Helpers.triggerCustomEvent(document, "content:populated"))
    }

    function i() {
        var e = c.selectedIndex,
            i = c.cells.length;
        return c.cells.length < g && (_ = !0), !(e < i - (4 + v)) && (!_ && (!w && ("" !== h && (w = !0, void A17.Helpers.ajaxRequest({
            url: h,
            type: "GET",
            data: {
                offset: i
            },
            requestHeaders: [{
                header: "Content-Type",
                value: "application/x-www-form-urlencoded; charset=UTF-8"
            }],
            onSuccess: function(e) {
                if (e) {
                    var i = document.createElement("div");
                    i.innerHTML = e;
                    var n = i.querySelectorAll(".workItem");
                    n.length > 0 ? t(n) : _ = !0, n.length < g && (_ = !0)
                } else _ = !0;
                w = !1
            },
            onError: function(e) {
                w = !1
            }
        })))))
    }

    function n() {
        if (c) {
            var e = c.selectedIndex,
                t = 0;
            A17.Helpers.forEach(m, function(e, i) {
                e.indexOf(A17.currentMediaQuery) !== -1 && (t = i)
            }), p && (e <= 0 ? p.classList.add(y) : p.classList.remove(y)), f && (e + 1 >= c.cells.length - t ? f.classList.add(y) : f.classList.remove(y))
        }
    }

    function r(e) {
        (new Date).getTime() - A < 100 && (e.stopPropagation(), e.preventDefault())
    }

    function s(e) {
        e.currentTarget.blur(), c && c.next()
    }

    function o(e) {
        e.currentTarget.blur(), c && c.previous()
    }

    function a() {
        c && c.select(0)
    }

    function l() {
        A17.touch && (x.draggable = !0), c = new Flickity(u, x), c.on("select", function() {
            return !!c && (i(), void n())
        }), c.on("dragEnd", function(e, t) {
            A = (new Date).getTime()
        }), n(), f.addEventListener("click", s), p.addEventListener("click", o), u.addEventListener("carousel:start", a), A17.Helpers.forEach(d, function(e) {
            e.addEventListener("click", r, !1)
        })
    }
    var c = null,
        u = e.querySelector("[data-carousel]"),
        d = u.querySelectorAll("a"),
        h = e.getAttribute("data-url"),
        f = e.querySelector("[data-next]"),
        p = e.querySelector("[data-previous]"),
        m = ["xsmall", "small", "medium", "large,xlarge"],
        g = 8,
        v = 2,
        y = "js--hidden",
        w = !1,
        _ = !1,
        A = (new Date).getTime(),
        x = {
            cellAlign: "left",
            percentPosition: !1,
            prevNextButtons: !1,
            pageDots: !1,
            contain: !0,
            wrapAround: !1,
            freeScroll: !0,
            dragThreshold: 15
        };
    this.destroy = function() {
        c && (c.destroy(), f.removeEventListener("click", s), p.removeEventListener("click", o), c = null), A17.Helpers.forEach(d, function(e) {
            e.removeEventListener("click", r)
        }), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        l()
    }
}, A17.Behaviors.displayTime = function(container) {
    function _update() {
        A17.Helpers.forEach(clocks, function(e, t) {
            var i = new Date,
                n = e.getAttribute("data-timezone"),
                r = new timezoneJS.Date(i, n);
            if ("en" === dateFormat) {
                var s = r.toString("hh k").toLowerCase();
                s = s.replace(" AM", "").replace(" PM", "").replace(" am", "").replace(" pm", "");
                var o = r.toString("mm k").toLowerCase()
            } else var s = r.toString("HH").toLowerCase(),
                o = r.toString("mm").toLowerCase();
            s != e.firstChild.textContent && (e.firstChild.textContent = s), o != e.lastChild.textContent && (e.lastChild.textContent = o)
        })
    }

    function _loaded() {
        _update(), timer = setInterval(_update, 3e3)
    }

    function _init() {
        clocks && A17.Helpers.ajaxRequest({
            url: "/dist/timezones/timezones.json",
            type: "GET",
            requestHeaders: [{
                header: "Content-Type",
                value: "application/x-www-form-urlencoded; charset=UTF-8"
            }],
            onSuccess: function(data) {
                data = eval("(" + data + ")");
                for (var z in data.zones) _tz.zones[z] = data.zones[z];
                for (var r in data.rules) _tz.rules[r] = data.rules[r];
                _loaded()
            },
            onError: function() {
                throw new Error("Error retrieving '" + url + "' zoneinfo files")
            }
        })
    }
    var clocks = container.querySelectorAll("[data-timezone]"),
        dateFormat = container.getAttribute("data-date-format"),
        timer = null,
        _tz = timezoneJS.timezone;
    _tz.loadingScheme = _tz.loadingSchemes.MANUAL_LOAD, this.destroy = function() {
        timer && (clearInterval(timer), timer = null), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        _init()
    }
}, A17.Behaviors.enlarge = function(e) {
    function t(e) {
        for (var t = 0, i = 0; i < A.length; i++)
            if (A[i].id === e) {
                t = i;
                break
            }
        return t
    }

    function i(e) {
        if (e.currentTarget.classList.contains("is--blocked")) return !1;
        var i = t(e.currentTarget.href);
        u(i)
    }

    function n(e) {
        27 === e.keyCode && E && p()
    }

    function r() {
        var e = C.innerHTML;
        e = e.replace(/{{title}}/g, D), M.innerHTML = e, z = document.getElementById("modalWork"), b || z.classList.add("modal--single"), F = z.querySelector("[data-modal-slider]"), I = z.querySelector("[data-modal-close]"), B = z.querySelector("[data-modal-previous]"), j = z.querySelector("[data-modal-next]"), q = z.querySelector("[data-modal-progress]"), R = z.querySelector("[data-modal-caption]")
    }

    function s() {
        var e = [{
                width: 666,
                image: "small_url"
            }, {
                width: 1333,
                image: "medium_url"
            }, {
                width: 2e3,
                image: "large_url"
            }],
            t = e[e.length - 1].image,
            i = e.filter(function(e) {
                return window.innerWidth < e.width
            });
        return i.length && (t = i[0].image), t
    }

    function o() {
        var e = "",
            t = s();
        A.forEach(function(i) {
            var n = (i[t], k.innerHTML),
                r = P.innerHTML;
            r = "video" === i.type ? "" : r.replace(/{{default_url}}/g, i.large_url), n = n.replace(/{{type}}/g, i.type), n = n.replace(/{{media}}/g, r), e += n
        }), F.innerHTML = e
    }

    function a(e) {
        if (N === e) return !1;
        N = e;
        var t = E.selectedCell.element,
            i = A[e],
            n = t.querySelector("[data-modal-frame]");
        if (d(), q.style.maxWidth = (e + 1) / E.cells.length * 100 + "%", R.innerHTML = i.caption ? i.caption : " ", "video" === i.type && setTimeout(function() {
                n.innerHTML = i.video, t.querySelector("iframe").addEventListener("load", function() {
                    t.querySelector("iframe").focus()
                })
            }, 100), hashIndex = i.id.indexOf("#"), hashIndex != -1) {
            var r = "#" + i.id.substring(hashIndex + 1);
            v(r)
        }
        l(e)
    }

    function l(e) {
        B && (e <= 0 ? B.classList.add(S) : B.classList.remove(S)), j && (e + 1 >= E.cells.length ? j.classList.add(S) : j.classList.remove(S))
    }

    function c() {
        return L.classList.contains(T)
    }

    function u(e) {
        return !c() && (x = window.pageYOffset, A17.Helpers.triggerCustomEvent(document, "top:deactivate"), A17.Helpers.triggerCustomEvent(document, "modal:show"), h(I), h(B), h(j), L.classList.add(T), A17.Helpers.triggerCustomEvent(document, "modal:updateState"), E ? E.select(e, !1, !0) : (U.initialIndex = e, b || (U.lazyLoad = 1, U.draggable = !1, U.accessibility = !1), E = new Flickity(F, U), E.on("select", function() {
            if (!E) return !1;
            if (c() === !1) return !1;
            var e = E.selectedIndex;
            a(e)
        })), document.addEventListener("keydown", n, !1), document.addEventListener("page:changed", p), E.resize(), b && F.focus(), void a(e))
    }

    function d() {
        if (!z) return !1;
        var e = z.querySelectorAll(".modalMedia__frame--video");
        A17.Helpers.forEach(e, function(e) {
            e.innerHTML = ""
        })
    }

    function h(e) {
        e && (e.disabled = !1)
    }

    function f(e) {
        e && (e.blur(), e.disabled = !0)
    }

    function p() {
        return c() !== !1 && (L.classList.remove(T), d(), f(I), f(B), f(j), document.removeEventListener("keydown", n), document.removeEventListener("page:changed", p), "" != window.location.hash && v(""), window.scrollTo(0, x), x = 0, N = -1, A17.Helpers.triggerCustomEvent(document, "top:activate"), A17.Helpers.triggerCustomEvent(document, "modal:hide"), void A17.Helpers.triggerCustomEvent(document, "modal:updateState"))
    }

    function m() {
        E && (E.previous(), F.focus())
    }

    function g() {
        E && (E.next(), F.focus())
    }

    function v(e) {
        if (!window.history) return !1;
        var t = window.location.pathname + window.location.search;
        "" !== e && (t += e), window.history.replaceState(null, null, t)
    }

    function y() {
        A17.Helpers.forEach(O, function(e, t) {
            var n = {},
                r = e.getAttribute("data-media-video"),
                s = e.getAttribute("data-media-width"),
                o = e.getAttribute("data-media-url").split(","),
                a = H.innerHTML;
            r && (a = a.replace(/{{player}}/g, r)), n.id = e.href, n.large_url = o[0], n.medium_url = o[1], n.small_url = o[2], n.width = s ? s : null, n.type = r ? "video" : "image", n.video = r ? a : "", n.caption = e.getAttribute("data-media-caption"), A.push(n), e.setAttribute("data-id", n.id), e.addEventListener("click", i, !1)
        })
    }

    function w() {
        if (!O) return !1;
        if (O.length < 2 && (b = !1), z || r(), document.addEventListener("modal:updateState", function() {
                var e = "data-modal";
                c() ? L.setAttribute(e, "") : L.removeAttribute(e)
            }), I.addEventListener("click", p, !1), b && (B.addEventListener("click", m, !1), j.addEventListener("click", g, !1)), y(), o(), window.location.hash) {
            var e = document.querySelector("[href='" + window.location.hash + "']");
            e && e.click()
        }
    }
    var _ = "modalWork",
        A = [],
        x = 0,
        b = !e.getAttribute("data-modal-noslider"),
        T = "ui-modal--active",
        S = "js--hidden",
        E = null,
        L = document.documentElement,
        C = document.getElementById("template__" + _),
        k = document.getElementById("template__modal--mediaItem"),
        P = document.getElementById("template__modal--mediaImage"),
        H = document.getElementById("template__modal--mediaVideo"),
        z = document.getElementById(_),
        O = document.querySelectorAll("[data-media]"),
        M = document.querySelector("[data-modal-container]"),
        D = e.getAttribute("data-modal-title") ? e.getAttribute("data-modal-title") : " ",
        F = null,
        I = null,
        B = null,
        j = null,
        q = null,
        R = null,
        N = -1,
        U = {
            cellAlign: "left",
            prevNextButtons: !1,
            pageDots: !1,
            contain: !0,
            wrapAround: !1,
            lazyLoad: 2,
            setGallerySize: !1,
            initialIndex: 0,
            resize: !0
        };
    this.destroy = function() {
        p(), E && (E.destroy(), E = null), x = 0, N = -1, A = [], D = " ", I.removeEventListener("click", p), b && (B.removeEventListener("click", m), j.removeEventListener("click", g)), M.innerHTML = "", A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        w()
    }
}, A17.Behaviors.homeSlider = function(e) {
    function t() {
        T = window.pageYOffset, S || window.requestAnimationFrame(function() {
            r(T), S = !1
        }), S = !0
    }

    function i() {
        b = window.innerHeight, T = window.pageYOffset, r(T)
    }

    function n(t) {
        var i = Math.min(0, -(t / 2));
        TweenLite.set(e, {
            y: i
        })
    }

    function r(e) {
        n(e), e < b ? y.style.opacity = e / b / 1.5 : A || (A17.Helpers.triggerCustomEvent(document, "analytics:homepagescrolled"), A = !0), e < b / 3 ? x || s() : x && o()
    }

    function s() {
        e.classList.remove(C), w.play(), x = !0
    }

    function o() {
        e.classList.add(C), w.pause(), x = !1
    }

    function a() {
        document.hidden ? w.pause() : w.play()
    }

    function l() {
        f(), window.scrollTo(0, 0), w.pause()
    }

    function c() {
        w.play(), h()
    }

    function u() {
        w.pause(), m.classList.remove(E), m.classList.remove(L)
    }

    function d(e) {
        u()
    }

    function h() {
        window.addEventListener("scroll", t), document.addEventListener("resized", i), i()
    }

    function f() {
        window.removeEventListener("scroll", t), document.removeEventListener("resized", i)
    }

    function p() {
        var t = A17.Functions.homeSliderNoTouch,
            i = A17.Functions.homeSliderTouch;
        w = A17.touch ? new i(e) : new t(e), w.init(_), m.classList.add(E), A17.Helpers.forEach(v, function(e, t) {
            e.addEventListener("click", d, !1)
        }), h(), document.addEventListener("search:opening", l), document.addEventListener("search:closing", c), document.addEventListener("visibilitychange", a, !1)
    }
    var m = document.documentElement,
        g = e.querySelector("[data-home-slider]"),
        v = g.querySelectorAll("a"),
        y = e.querySelector("[data-home-overlay]"),
        w = null,
        _ = 4500,
        A = !1,
        x = !0,
        b = window.innerHeight,
        T = 0,
        S = !1,
        E = "page-home",
        L = "page-home--light",
        C = "js--scrolled";
    this.destroy = function() {
        A17.Helpers.forEach(v, function(e, t) {
            e.removeEventListener("click", d, !1)
        }), f(), u(), w.destroy(), document.removeEventListener("search:opening", l), document.removeEventListener("search:closing", c), document.removeEventListener("visibilitychange", a), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        p()
    }
}, A17.Behaviors.hoverSlideshow = function(e) {
    function t() {
        d++, d >= h && (d = 0), A17.Helpers.forEach(l, function(e, t) {
            t === d ? e.style.visibility = "visible" : e.style.visibility = "hidden"
        })
    }

    function i(e) {
        h > 0 && null === c && (c = setInterval(t, s))
    }

    function n(e) {
        c && (clearInterval(c), c = null)
    }

    function r() {
        if (A17.Helpers.shuffleSectors(e), l = e.querySelectorAll("picture"), h = l.length, A17.touch) {
            "xsmall" === A17.currentMediaQuery && (a = 3);
            var r = e.getAttribute("data-sector-index") * o;
            setTimeout(function() {
                t(), null === u && (u = setInterval(t, o * a))
            }, r)
        } else e.addEventListener("mouseenter", i, !1), e.addEventListener("mouseleave", n, !1);
        var s = e.querySelectorAll(".js--lazyloaded > video");
        A17.Helpers.forEach(s, function(e, t) {
            A17.Functions.homeSliderVideoLoad(e)
        }), A17.Helpers.lazyload(e)
    }
    var s = 200,
        o = 400,
        a = 6,
        l = [],
        c = null,
        u = null,
        d = 0,
        h = 0;
    this.destroy = function() {
        A17.touch || (e.removeEventListener("mouseenter", i), e.removeEventListener("mouseleave", n)), c && (clearInterval(c), c = null), u && (clearInterval(u), u = null), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        r()
    }
}, A17.Behaviors.lazyloadImg = function(e) {
    function t() {
        A17.Helpers.lazyload(e)
    }

    function i() {
        t(), document.addEventListener("content:populated", t)
    }
    this.destroy = function() {
        document.removeEventListener("content:populated", t), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        i()
    }
}, A17.Behaviors.loadMore = function(e) {
    function t(e) {
        store.clearAll();
        var t = (new Date).getTime() + 36e5;
        A17.Helpers.triggerCustomEvent(document, "content:saved"), store.set(e, {
            page: E,
            markup: y.innerHTML,
            scroll: x
        }, t)
    }

    function i(e) {
        return store.get(e)
    }

    function n() {
        x = window.pageYOffset, S || window.requestAnimationFrame(function() {
            s(x), S = !1
        }), S = !0
    }

    function r() {
        x = window.pageYOffset, s(x)
    }

    function s(e) {
        b = y.getBoundingClientRect().top + y.offsetHeight + e;
        var t = {
            page: E
        };
        e + window.innerHeight + T >= b && o(t)
    }

    function o(e) {
        return !y.classList.contains(m) && (!(E > _) && (y.classList.remove(g), y.classList.add(m), void A17.Helpers.ajaxRequest({
            url: w,
            type: "GET",
            data: e,
            requestHeaders: [{
                header: "Content-Type",
                value: "application/x-www-form-urlencoded; charset=UTF-8"
            }],
            onSuccess: function(t) {
                c(t, e), u()
            },
            onError: function(e) {
                u()
            }
        })))
    }

    function a() {
        var e = window.location.href.split("?");
        if (e.length > 1) {
            var t = e[0] + "?",
                i = e[1];
            i = i.split("&");
            for (var n = 0; n < i.length; n++) {
                var r = i[n].split("=");
                "page" != r[0] && (t += i[n] + "&")
            }
            return t = t.replace(/&$/, ""), t = t.replace(/\?$/, "")
        }
        return window.location.href
    }

    function l(e) {
        history.replaceState && history.replaceState(null, null, e)
    }

    function c(e, i) {
        y.insertAdjacentHTML("beforeend", e);
        var n = a(),
            r = n.split("?").length > 1 ? "&" : "?",
            s = A17.Helpers.jsonToQueryString(i, r),
            o = n + s;
        l(o), t(n), A17.Helpers.triggerCustomEvent(document, "content:populated"), A17.Helpers.triggerCustomEvent(document, "analytics:loadmore"), E++, E > _ && d()
    }

    function u() {
        y.classList.remove(m), y.classList.add(g)
    }

    function d() {
        L && (window.removeEventListener("scroll", n), document.removeEventListener("resized", r), f(), L = !1)
    }

    function h(t) {
        return !L && (L = !0, e.disabled = !0, E++, A.classList.add(v), window.addEventListener("scroll", n), document.addEventListener("resized", r), void(t && r()))
    }

    function f() {
        e.style.height = "1px", A.classList.remove(v)
    }

    function p() {
        if (window.location.search) {
            var t = A17.Helpers.queryStringToObject(window.location.search),
                n = a();
            if (t.page && (E = t.page), t.page) {
                var r = i(n);
                r || (r = {
                    page: 0,
                    markup: "",
                    scroll: 0
                }), parseInt(r.page) === parseInt(t.page) && (E = r.page, "" != r.markup && (y.innerHTML = r.markup, A17.Helpers.triggerCustomEvent(document, "content:populated"), null === A17.latestClickElement && window.scrollTo(0, r.scroll), h(), E >= _ && d()))
            }
        }
        e.addEventListener("click", h)
    }
    var m = "js--loading",
        g = "js--loaded",
        v = "footer--hidden",
        y = e.previousElementSibling,
        w = e.getAttribute("data-load-url"),
        _ = e.getAttribute("data-load-pages"),
        A = document.querySelector("[data-footer]"),
        x = 0,
        b = 0,
        T = 300,
        S = !1,
        E = 1,
        L = !1;
    this.destroy = function() {
        d(), e.removeEventListener("click", h), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        p()
    }
}, A17.Behaviors.loadVimeoPlayers = function(e) {
    function t(e) {
        if (l.length)
            for (var t = 0; t < l.length; t++) l[t].pause()
    }

    function i() {
        if (l.length)
            for (var e = 0; e < l.length; e++) l[e].play()
    }

    function n() {
        function e(e) {
            if (e && window.Vimeo) {
                var t = new Vimeo.Player(e);
                t.ready().then(function() {
                    t.element.parentElement.classList.add("s--ready")
                }), l.push(t)
            }
        }

        function t() {
            r = !0, A17.Helpers.forEach(a, function(t) {
                e(t)
            }), A17.Helpers.forEach(o, function(t) {
                t.firstElementChild.innerHTML += t.getAttribute("data-media-autoplayvideo") + s;
                var i = t.querySelector("iframe");
                e(i)
            })
        }

        function i() {
            if (r) return !1;
            var e;
            e = u.readyState, "complete" === e && t()
        }

        function n() {}
        var r = !!window.Vimeo,
            c = "https://player.vimeo.com/api/player.js";
        if (r) t();
        else {
            var u = document.createElement("script"),
                d = document.getElementsByTagName("head")[0] || document.body;
            u.src = c, u.onload = t, u.onreadystatechange = i, u.onerror = n, d.appendChild(u)
        }
    }

    function r() {
        return o.length + a.length !== 0 && (!A17.touch && (n(), document.addEventListener("modal:show", t), void document.addEventListener("modal:hide", i)))
    }
    var s = document.getElementById("template__modal--enlargeButton") ? document.getElementById("template__modal--enlargeButton").innerHTML : "",
        o = document.querySelectorAll("[data-media-autoplayvideo]"),
        a = document.querySelectorAll("iframe[src*='player.vimeo.com']"),
        l = [];
    this.destroy = function() {
        return !!a.length && (!A17.touch && (document.removeEventListener("modal:show", t), void document.removeEventListener("modal:hide", i)))
    }, this.init = function() {
        r()
    }
}, A17.Behaviors.masonry = function(e) {
    function t() {
        p = A17.currentMediaQuery.indexOf("xsmall") !== -1 ? 1 : 2, v = "small" === A17.currentMediaQuery ? 15 : 20, m = Math.floor(parseInt(window.getComputedStyle(c[0], null).getPropertyValue("width"))),
            g = Math.floor(parseInt(window.getComputedStyle(c[0], null).getPropertyValue("margin-left"))), y = [], e.className += " " + h;
        for (var t = 0; t < p; t++) y.push(0)
    }

    function i(e) {
        return Math.min.apply(Math, e)
    }

    function n(e) {
        return Math.max.apply(Math, e)
    }

    function r() {
        A17.Helpers.forEach(c, function(e) {
            if (!e.classList.contains(f)) {
                e.style.height = "auto";
                var t = i(y),
                    n = y.indexOf(t),
                    r = n * (m + g) + v,
                    s = e.offsetHeight;
                e.style.left = r + "px", e.style.top = t + "px", p > 1 ? (e.style.height = s + "px", e.style.width = m + "px") : (e.style.height = "", e.style.width = ""), e.classList.add(f), y[n] = t + s + g
            }
        }), p > 1 ? e.style.height = n(y) + "px" : e.style.height = ""
    }

    function s() {
        a(), c = e.querySelectorAll("." + u), d = window.innerWidth, t(), r()
    }

    function o() {
        var e = window.pageYOffset;
        s(), window.scrollTo(0, e)
    }

    function a() {
        A17.Helpers.forEach(c, function(e) {
            e.classList.contains(f) && (e.classList.remove(f), e.removeAttribute("style"))
        }), e.classList.remove(h), e.style.height = "auto"
    }

    function l() {
        e.getAttribute("data-masonry-blocks") && (u = e.getAttribute("data-masonry-blocks")), c = e.querySelectorAll("." + u), t(), r(), document.addEventListener("resized", s), document.addEventListener("content:saved", a), document.addEventListener("content:populated", o), document.addEventListener("search:closing", o)
    }
    var c = null,
        u = "masonry--cells",
        d = window.innerWidth,
        h = "js--positioning",
        f = "js--positioned",
        p = 0,
        m = 0,
        g = 0,
        v = 20,
        y = [];
    this.destroy = function() {
        document.removeEventListener("resized", s), document.removeEventListener("content:saved", a), document.removeEventListener("content:populated", o), document.removeEventListener("search:closing", o), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        l()
    }
}, A17.Behaviors.moveWorkMeta = function(e) {
    function t() {
        i(), document.addEventListener("mediaQueryUpdated", i)
    }

    function i() {
        var t = n;
        "xsmall" != A17.currentMediaQuery && "small" != A17.currentMediaQuery || (t = r), t.appendChild(e)
    }
    var n = document.querySelector(".workContent__entry"),
        r = document.querySelector(".workContent__assets");
    this.destroy = function() {
        A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        t()
    }
}, A17.Behaviors.navToggle = function(e) {
    function t() {
        "xsmall" !== A17.currentMediaQuery && n()
    }

    function i() {
        return !s && (!o && (s = !0, u = window.pageYOffset, a.classList.add(d), c.style.top = "-" + u + "px", document.addEventListener("keydown", r, !1), A17.Helpers.triggerCustomEvent(document, "top:deactivate"), o = !0, void(s = !1)))
    }

    function n() {
        return !s && (!!o && (s = !0, A17.Helpers.triggerCustomEvent(document, "top:activate"), a.classList.remove(d), c.style.top = "", document.removeEventListener("keydown", r, !1), u > A17.headerHeight && (window.scrollTo(0, u), u = 0), o = !1, void(s = !1)))
    }

    function r(e) {
        27 === e.keyCode && o && n()
    }
    var s = !1,
        o = !1,
        a = document.documentElement,
        l = (document.querySelector("[data-header]"), document.querySelectorAll("[data-ham-btn]")),
        c = document.querySelector(".wrapper"),
        u = 0,
        d = (document.getElementById("template__headerMobile"), "js--nav");
    l.length && A17.Helpers.forEach(l, function(e) {
        e.addEventListener("click", function(t) {
            o ? n() : i(), e.blur()
        })
    }), document.addEventListener("resized", t), document.addEventListener("nav:close", n), document.addEventListener("page:leaving", n)
}, A17.Behaviors.newsFilter = function(e) {
    function t(e) {
        e.preventDefault();
        var t = e.target;
        return t.blur(), !t.classList.contains(o) && (A17.Helpers.triggerCustomEvent(document, "news:close"), i(t), Barba.Dispatcher.trigger("linkClicked", t, e), void Barba.Pjax.goTo(t.getAttribute("data-url"), {
            type: "pjaxNews"
        }))
    }

    function i(e) {
        A17.Helpers.forEach(a, function(e) {
            e.classList.remove(o)
        }), e.classList.add(o)
    }

    function n() {
        var t = A17.Functions.getCurrentPage();
        l = !!t && e.querySelector("[" + s + '="' + t + '"]'), l && i(l)
    }

    function r() {
        a && (A17.Helpers.forEach(a, function(e) {
            e.addEventListener("click", t, !1)
        }), document.addEventListener("page:changed", n), n())
    }
    var s = "data-news-filter",
        o = "js--active",
        a = e.querySelectorAll("[" + s + "]"),
        l = !1;
    this.destroy = function() {
        A17.Helpers.forEach(a, function(e) {
            e.removeEventListener("click", t)
        }), document.removeEventListener("page:changed", n), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        r()
    }
}, A17.Behaviors.newsToggle = function(e) {
    function t() {
        r.classList.add(s), o = !0
    }

    function i() {
        r.classList.remove(s), o = !1
    }

    function n() {
        o = r.classList.contains(s), e.addEventListener("click", function(n) {
            o ? i() : t(), e.blur()
        }), document.addEventListener("news:close", i)
    }
    var r = document.querySelector("[data-news-categories]"),
        s = "js--active",
        o = !1;
    this.destroy = function() {
        document.removeEventListener("news:close", i), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        n()
    }
}, A17.Behaviors.newsletter = function(e) {
    function t() {
        var e = ("" === l.value, l.checkValidity());
        e ? c.disabled = !1 : c.disabled = !0
    }

    function i() {
        e.classList.remove(s), e.classList.remove(o), e.classList.remove(a)
    }

    function n(t) {
        t = JSON.parse(t), "success" == t.type ? (e.classList.add(s), l.value = "", "undefined" != typeof ga && ga("send", "event", "Email", "success email", "Email success")) : "info" == t.type ? (l.value = "", e.classList.add(o)) : (e.classList.add(a), "undefined" != typeof ga && ga("send", "event", "Email", "error email", "Email error")), e.classList.remove(r), c.textContent = c.getAttribute("data-default"), setTimeout(i, u)
    }
    var r = "js--loading",
        s = "js--success",
        o = "js--info",
        a = "js--error",
        l = e.querySelector("input[type='email']"),
        c = e.querySelector("button[type='submit']"),
        u = 4e3;
    l.addEventListener("blur", t), l.addEventListener("keyup", t), t(), e.addEventListener("submit", function(t) {
        if (t.preventDefault(), e.classList.contains(r)) return !1;
        e.classList.add(r), c.textContent = c.getAttribute("data-loading");
        var i = A17.Helpers.formToJson(e),
            s = e.action;
        A17.Helpers.ajaxRequest({
            url: s,
            type: "POST",
            data: i,
            requestHeaders: [{
                header: "Content-Type",
                value: "application/x-www-form-urlencoded; charset=UTF-8"
            }],
            onSuccess: function(e) {
                n(e)
            },
            onError: function(e) {
                n(e)
            }
        })
    })
}, A17.Behaviors.newsletterToggle = function(e) {
    function t() {
        return Math.max(d.scrollHeight, d.offsetHeight, h.clientHeight, h.scrollHeight, h.offsetHeight)
    }

    function i() {
        return !o && (s = !0, o = !0, a.classList.add(u), void TweenLite.to(window, .5, {
            scrollTo: {
                y: t() - window.innerHeight,
                autoKill: !1
            },
            ease: new Ease(A17.bezier),
            onComplete: function() {
                c.disabled = !1, c.focus(), o = !1
            }
        }))
    }

    function n() {
        if (o) return !1;
        s = !1, o = !0;
        var e = l.getBoundingClientRect().top + window.pageYOffset - window.innerHeight;
        TweenLite.to(window, .5, {
            scrollTo: {
                y: e,
                autoKill: !1
            },
            ease: new Ease(A17.bezier),
            onComplete: r
        })
    }

    function r() {
        a.classList.remove(u), c.value = "", c.disabled = !0, c.blur(), s = !1, o = !1
    }
    var s = !1,
        o = !1,
        a = document.querySelector(".content"),
        l = document.querySelector("[data-newsletter]"),
        c = l.querySelector("input"),
        u = "js--newsletter",
        d = document.body,
        h = document.documentElement;
    e.addEventListener("click", function(e) {
        e.preventDefault(), s ? n() : i()
    }), document.addEventListener("page:changed", function() {
        s && r()
    })
}, A17.Behaviors.newsletterTrigger = function(e) {
    e.addEventListener("click", function(e) {
        A17.Helpers.triggerCustomEvent(document, "nav:close"), document.querySelector("[data-behavior*='newsletterToggle']").click()
    })
}, A17.Behaviors.numCaptions = function(e) {
    function t(e) {
        A17.Helpers.forEach(e, function(e, t) {
            e.textContent = t + 1
        })
    }

    function i() {
        var i = e.querySelectorAll("[data-caption-image]"),
            n = e.querySelectorAll("[data-caption-text]");
        i.length && t(i), n.length && t(n)
    }
    this.destroy = function() {
        A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        i()
    }
}, A17.Behaviors.prefetchFilters = function(e) {
    function t() {
        i && A17.Helpers.forEach(i, function(e) {
            if (!e.classList.contains(n)) {
                var t = e.href,
                    i = Barba.Utils.xhr(t);
                Barba.Pjax.Cache.set(t, i)
            }
        })
    }
    var i = e.querySelectorAll("[data-work-filter]"),
        n = "workFilter__btn--active";
    this.destroy = function() {
        A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        t()
    }
}, A17.Behaviors.prevNextFromContext = function(e) {
    function t() {
        if (store.get("listing")) {
            var t = e.querySelector("a[data-prev-detail]"),
                i = e.querySelector("a[data-next-detail]"),
                n = e.getAttribute("data-previous-url"),
                r = e.getAttribute("data-work-id"),
                s = store.get("listing").url;
            A17.Helpers.ajaxRequest({
                url: n,
                type: "GET",
                data: {
                    id: r,
                    url: s
                },
                requestHeaders: [{
                    header: "Content-Type",
                    value: "application/x-www-form-urlencoded; charset=UTF-8"
                }],
                onSuccess: function(e) {
                    e.prev && (t.href = e.prev), e.next && (i.href = e.next)
                },
                onError: function(e) {}
            })
        }
    }
    this.destroy = function() {
        A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        t()
    }
}, A17.Behaviors.prevNextKeyboard = function(e) {
    function t() {
        return a.hasAttribute("data-modal")
    }

    function i(e) {
        t() === !1 && (37 === e.keyCode && r(), 39 === e.keyCode && n())
    }

    function n() {
        var e = document.querySelector("[data-next-detail]");
        e && e.click()
    }

    function r() {
        var e = document.querySelector("[data-prev-detail]");
        e && e.click()
    }

    function s(e) {
        document.removeEventListener("keydown", i)
    }

    function o(e) {
        document.addEventListener("keydown", i, !1)
    }
    var a = document.documentElement;
    this.destroy = function() {
        document.removeEventListener("modal:show", s), document.removeEventListener("modal:hide", o), document.removeEventListener("search:opening", s), document.removeEventListener("search:closing", o), s(), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        document.addEventListener("modal:show", s), document.addEventListener("modal:hide", o), document.addEventListener("search:opening", s), document.addEventListener("search:closing", o), o()
    }
}, A17.Behaviors.scrollToFilter = function(e) {
    function t(t) {
        a > t + window.innerHeight ? l || (e.classList.remove(o), l = !0) : l && (e.classList.add(o), l = !1)
    }

    function i() {
        TweenLite.to(window, .5, {
            scrollTo: {
                y: a,
                autoKill: !1
            },
            ease: new Ease(A17.bezier)
        }), e.classList.add(o), l = !1
    }

    function n() {
        c = window.pageYOffset, a = s.getBoundingClientRect().top + c, u || window.requestAnimationFrame(function() {
            t(c), prevScrollPos = c, u = !1
        }), u = !0
    }

    function r() {
        c = window.pageYOffset, window.addEventListener("scroll", n), e.addEventListener("click", i, !1), t(c)
    }
    var s = document.querySelector("[data-work-filters]"),
        o = "js--hidden",
        a = 0,
        l = !0,
        c = 0,
        u = !1;
    this.destroy = function() {
        window.removeEventListener("scroll", n), e.removeEventListener("click", i), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        r()
    }
}, A17.Behaviors.scrollVideoPlayer = function(e) {
    function t() {
        return Math.max(document.body.scrollHeight, document.body.offsetHeight)
    }

    function i(t) {
        if (w.height < 200) return !1;
        y = a.offsetHeight;
        var i = w.offset + w.height - f - y;
        "top" !== v && t < h && (e.classList.remove(m), e.classList.remove(g), e.style.top = "", v = "top"), "scrolling" !== v && t >= h && t < i && (e.classList.add(m), e.classList.remove(g), e.style.top = "", v = "scrolling"), "bottom" !== v && t >= i && (e.classList.remove(m), e.classList.add(g), e.style.top = t - d + "px", v = "bottom")
    }

    function n(e) {
        c = window.pageYOffset, workContentHeight = l.offsetHeight, u || window.requestAnimationFrame(function() {
            i(c), u = !1
        }), u = !0
    }

    function r() {
        c = window.pageYOffset, p = t(), d = o.getBoundingClientRect().top + c - f, w.offset = l.getBoundingClientRect().top + c, h = w.offset, w.height = l.offsetHeight, y = a.offsetHeight, i(c)
    }

    function s() {
        window.addEventListener("scroll", n), document.addEventListener("resized", r), r(), document.addEventListener("content:populated", r)
    }
    var o = document.querySelector("[data-video-hero]"),
        a = document.querySelector("[data-video-item]"),
        l = (document.querySelector("[data-video-sizer]"), document.querySelector("[data-work-content]")),
        c = 0,
        u = !1,
        d = 0,
        h = 0,
        f = A17.headerHeight,
        p = 0,
        m = "js--scrolled",
        g = "js--abs",
        v = "top",
        y = a.offsetHeight,
        w = {};
    w.height = l.offsetHeight, w.offset = 0, this.destroy = function() {
        window.removeEventListener("scroll", n), document.removeEventListener("resized", r), document.removeEventListener("content:populated", r), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        s()
    }
}, A17.Behaviors.searchFilter = function(e) {
    function t(t) {
        t.preventDefault();
        var i = t.currentTarget;
        n(i), r(), A17.Helpers.triggerCustomEvent(e, "search:submit"), A17.currentMediaQuery.indexOf("small") !== -1 && (h(), a())
    }

    function i(e) {
        var t = e.currentTarget,
            i = t.classList.contains(_);
        i && t.blur()
    }

    function n(e) {
        var t = e.classList.contains(_),
            i = null;
        A17.Helpers.forEach(v, function(e) {
            e.classList.contains(_) && (i = e)
        }), i ? f(i) : f(), t || (e.classList.add(_), e.focus())
    }

    function r() {
        A17.Helpers.forEach(v, function(t) {
            var i = e.querySelector("input[name='" + t.getAttribute("data-search-filter") + "']"),
                n = t.querySelectorAll("." + _),
                r = [];
            n && A17.Helpers.forEach(n, function(e) {
                r.push(e.getAttribute("data-value"))
            }), i && (i.value = r.join(","))
        })
    }

    function s() {
        A17.Helpers.forEach(v, function(t) {
            var i = e.querySelector("input[name='" + t.getAttribute("data-search-filter") + "']");
            if (i.value) {
                var n = t.querySelectorAll("[data-value]"),
                    r = i.value.split(",");
                r.length && A17.Helpers.forEach(n, function(e) {
                    r.indexOf(e.getAttribute("data-value")) > -1 && e.classList.add(_)
                })
            }
        })
    }

    function o(t) {
        var i = t.currentTarget;
        i.blur();
        var n = e.querySelector("[data-search-filter='" + i.getAttribute("data-search-trigger") + "']"),
            r = g.classList.contains(_),
            s = n.classList.contains(_);
        h(), r ? s ? a() : (u(n), TweenLite.to(v, .3, {
            opacity: 0,
            ease: new Ease(A17.bezier),
            onComplete: function() {
                TweenLite.set(v, {
                    height: 0
                }), TweenLite.set(n, {
                    height: w + "px"
                }), TweenLite.to(n, .3, {
                    opacity: 1,
                    ease: new Ease(A17.bezier),
                    onComplete: function() {
                        TweenLite.set(g, {
                            height: "auto"
                        })
                    }
                }), l(n, i), n.clientHeight > g.clientHeight && TweenLite.set(g, {
                    height: n.clientHeight
                })
            }
        })) : (s || (c(n), l(n, i)), g.classList.add(_), TweenLite.set(g, {
            height: n.clientHeight
        }))
    }

    function a() {
        TweenLite.set(g, {
            height: "auto"
        }), g.classList.remove(_)
    }

    function l(e, t) {
        e.classList.add(_), t.classList.add(_)
    }

    function c(e) {
        TweenLite.set(v, {
            opacity: 0,
            height: 0
        }), TweenLite.set(e, {
            height: w + "px",
            opacity: 1
        })
    }

    function u(e) {
        TweenLite.set(v, {
            opacity: 1,
            height: w + "px"
        }), TweenLite.set(e, {
            opacity: 0,
            height: 0
        })
    }

    function d() {
        var e = 0;
        A17.Helpers.forEach(v, function(t) {
            var i = t.style.height;
            t.style.height = "auto", t.offsetHeight > e && (e = t.offsetHeight), t.style.height = i
        }), e != w && (A17.Helpers.forEach(v, function(t) {
            t.offsetHeight === w && (t.style.height = e + "px")
        }), g.offsetHeight === w && (g.style.height = e + "px"), w = e)
    }

    function h() {
        A17.Helpers.forEach(v, function(e) {
            e.classList.remove(_)
        }), A17.Helpers.forEach(m, function(e) {
            e.classList.remove(_)
        })
    }

    function f(e) {
        if (e) var t = e.querySelectorAll("[data-value]");
        else var t = y;
        A17.Helpers.forEach(t, function(e) {
            e.classList.remove(_)
        })
    }

    function p() {
        m && A17.Helpers.forEach(m, function(e) {
            e.addEventListener("click", o, !1)
        }), y && A17.Helpers.forEach(y, function(e) {
            e.addEventListener("click", t, !1), e.addEventListener("mouseleave", i, !1)
        }), e.addEventListener("search:reset_filter", function() {
            g.classList.remove(_), h(), f(), r()
        }), e.addEventListener("search:update_filter", function() {
            s()
        }), d(), document.addEventListener("mediaQueryUpdated", d)
    }
    var m = e.querySelectorAll("[data-search-trigger]"),
        g = e.querySelector("[data-search-filter-container]"),
        v = e.querySelectorAll("[data-search-filter]"),
        y = e.querySelectorAll("[data-value]"),
        w = 0,
        _ = "js--active";
    p()
}, A17.Behaviors.searchPlaceholder = function(e) {
    function t() {
        var t = A17.currentMediaQuery.indexOf("small") !== -1 ? 0 : 1;
        e.placeholder != i[t] && (e.placeholder = i[t])
    }
    if (!e.placeholder) return !1;
    var i = [e.getAttribute("data-small-placeholder"), e.getAttribute("data-default-placeholder")];
    document.addEventListener("mediaQueryUpdated", t), t()
}, A17.Behaviors.searchQuery = function(e) {
    function t() {
        i();
        var e = A17.Helpers.formToJson(h);
        r(e)
    }

    function i() {
        p.value = 1
    }

    function n() {
        e.value.length <= x ? h.classList.remove(A) : h.classList.add(A)
    }

    function r(e) {
        n();
        var t = h.querySelector("button");
        t && t.blur(), d.classList.remove(_), d.classList.add(w);
        var i = document.querySelector("[data-search-loading]");
        if (i) {
            var r = i.getAttribute("data-search-loading");
            i.textContent = r
        }
        A17.Helpers.triggerCustomEvent(d, "search:loading"), A17.Helpers.ajaxRequest({
            url: m,
            type: "GET",
            data: e,
            requestHeaders: [{
                header: "Content-Type",
                value: "application/x-www-form-urlencoded; charset=UTF-8"
            }],
            onSuccess: function(t) {
                s() ? a(t, e) : o()
            },
            onError: function(e) {
                o()
            }
        })
    }

    function s() {
        return A17.Helpers.triggerCustomEvent(d, "search:isopened"), d._isActive
    }

    function o() {
        d.classList.remove(w), A17.Helpers.triggerCustomEvent(d, "search:loaded")
    }

    function a(e, t) {
        u.classList.contains(y) ? l(e, t) : (u.classList.add(y), setTimeout(function() {
            l(e, t)
        }, T))
    }

    function l(e, t) {
        f.innerHTML = e, d.classList.add(_);
        var i = A17.Helpers.jsonToQueryString(t);
        history.replaceState && history.replaceState(null, null, g + "/" + i), ga("set", "page", location.pathname), ga("send", "pageview"), o()
    }
    var c, u = document.documentElement,
        d = document.querySelector("[data-search]"),
        h = d.querySelector("form"),
        f = document.querySelector("[data-search-results]"),
        p = document.querySelector("[data-search-page]"),
        m = h.action,
        g = h.getAttribute("data-url"),
        v = "",
        y = "js--searchExpanded",
        w = "js--loading",
        _ = "js--loaded",
        A = "js--fieldReady",
        x = 2,
        b = 300,
        T = 500;
    h.addEventListener("search:submit", function() {
        t()
    }), h.addEventListener("submit", function(e) {
        e.preventDefault(), t()
    }), h.addEventListener("search:populate", function() {
        var e = A17.Helpers.queryStringToObject(window.location.search);
        A17.Helpers.jsonToForm(e, h)
    }), e.addEventListener("keyup", function(i) {
        return n(), !(e.value.length <= x || 27 == i.keyCode) && (e.value !== v && (v = e.value, A17.Helpers.triggerCustomEvent(d, "search:loading"), c && clearTimeout(c), void(c = setTimeout(function() {
            t()
        }, b))))
    })
}, A17.Behaviors.searchScroll = function(e) {
    function t(t) {
        if (t + window.innerHeight >= d.clientHeight && (g = document.querySelector("[data-search-list]"))) {
            v = parseInt(g.getAttribute("data-search-pages"));
            var n = parseInt(u.value);
            if (n < v && !f) {
                u.value = n + 1;
                var r = A17.Helpers.formToJson(e);
                i(r)
            }
        }
    }

    function i(e) {
        f = !0, A17.Helpers.triggerCustomEvent(c, "search:loading"), c.classList.remove(A), c.classList.add(_), A17.Helpers.ajaxRequest({
            url: y,
            type: "GET",
            data: e,
            requestHeaders: [{
                header: "Content-Type",
                value: "application/x-www-form-urlencoded; charset=UTF-8"
            }],
            onSuccess: function(t) {
                n() ? s(t, e) : r()
            },
            onError: function(e) {
                r()
            }
        })
    }

    function n() {
        return A17.Helpers.triggerCustomEvent(c, "search:isopened"), c._isActive
    }

    function r() {
        f = !1, c.classList.remove(_), A17.Helpers.triggerCustomEvent(c, "search:loaded")
    }

    function s(e, t) {
        g && g.insertAdjacentHTML("beforeend", e), c.classList.add(A);
        var i = A17.Helpers.jsonToQueryString(t);
        history.replaceState && history.replaceState(null, null, w + "/" + i), r()
    }

    function o() {
        p = window.pageYOffset, m || window.requestAnimationFrame(function() {
            t(p), m = !1
        }), m = !0
    }

    function a() {
        p = window.pageYOffset, window.addEventListener("scroll", o), o()
    }

    function l() {
        p = 0, h = !1, window.removeEventListener("scroll", o)
    }
    var c = document.querySelector("[data-search]"),
        u = document.querySelector("[data-search-page]"),
        d = e.parentElement,
        h = !1,
        f = !1,
        p = 0,
        m = !1,
        g = null,
        v = 0,
        y = e.action,
        w = e.getAttribute("data-url"),
        _ = "js--loading",
        A = "js--loaded";
    c.addEventListener("search:loaded", function() {
        h || (h = !0, a())
    }), document.addEventListener("search:closing", function() {
        h && l()
    })
}, A17.Behaviors.searchToggle = function(e) {
    function t() {
        return !C && (L = !0, C = !0, A17.Helpers.triggerCustomEvent(document, "top:deactivate"), void Promise.all([s()]).then(function() {
            u.classList.add(w), f.disabled = !1, A17.Helpers.forEach(p, function(e) {
                e.disabled = !1
            }), f.focus(), setTimeout(function() {
                A17.Helpers.triggerCustomEvent(document, "search:opening"), d.classList.add(_), u.classList.add(A), C = !1, document.addEventListener("keydown", r, !1), A17.Helpers.forEach(y, l, !1)
            }, P)
        }))
    }

    function i() {
        return !!L && (T ? (history.replaceState && history.replaceState(null, null, T), n()) : Barba.Pjax.goTo(S), void(E = !1))
    }

    function n() {
        return !!L && (!C && (!k && (C = !0, A17.Helpers.triggerCustomEvent(document, "searchSticky:deactivate"), document.removeEventListener("keydown", r, !1), void Promise.all([s(), a(), o()]).then(function() {
            l(), L = !1, C = !1
        }))))
    }

    function r(e) {
        return !!L && (!k && void(27 === e.keyCode && (E ? i() : n())))
    }

    function s() {
        var e = Barba.Utils.deferred(),
            t = Math.min(.8, window.pageYOffset / 1e3);
        return t > 0 ? TweenLite.to(window, t, {
            scrollTo: {
                y: 0,
                autoKill: !1
            },
            ease: new Ease(A17.bezier),
            onComplete: function() {
                e.resolve()
            }
        }) : e.resolve(), e.promise
    }

    function o() {
        var e = Barba.Utils.deferred();
        return d.classList.remove(b), u.classList.contains(x) && u.classList.remove(x), e.resolve(), e.promise
    }

    function a() {
        var e = Barba.Utils.deferred(),
            t = d.querySelectorAll("[data-search-trigger]"),
            i = !1;
        A17.Helpers.forEach(t, function(e) {
            e.classList.contains(_) && (e.click(), i = !0)
        });
        var n = i ? 500 : 10;
        return setTimeout(function() {
            e.resolve()
        }, n), e.promise
    }

    function l() {
        function t() {
            A17.Helpers.triggerCustomEvent(document, "search:closing"), g.innerHTML = "", A17.Helpers.triggerCustomEvent(h, "search:reset_filter"), d.classList.remove(_), u.classList.remove(A), u.classList.remove(w), A17.Helpers.triggerCustomEvent(document, "top:activate"), i.resolve()
        }
        var i = Barba.Utils.deferred();
        return f.blur(), e.blur(), f.value = "", f.disabled = !0, A17.Helpers.forEach(p, function(e) {
            e.disabled = !0
        }), v.offsetHeight > 100 ? TweenLite.to([v, m], .5, {
            opacity: 0,
            ease: new Ease(A17.bezier),
            clearProps: "opacity",
            onComplete: function() {
                t()
            }
        }) : t(), i.promise
    }

    function c() {
        C = !1, k = !1, "search" === A17.Functions.getCurrentPage() ? (T = !1, t(), A17.Helpers.triggerCustomEvent(h, "search:populate"), A17.Helpers.triggerCustomEvent(h, "search:update_filter"), A17.Helpers.triggerCustomEvent(h, "search:submit")) : (T = window.location.href, n()), u.classList.add("search--ready")
    }
    var u = document.documentElement,
        d = document.querySelector("[data-search]"),
        h = d.querySelector("form"),
        f = d.querySelector("[data-search-field]"),
        p = d.querySelectorAll("input, button"),
        m = document.querySelector("[data-search-mask]"),
        g = document.querySelector("[data-search-results]"),
        v = document.querySelector("[data-search-wrapper]"),
        y = document.querySelector(".icon--logo"),
        w = "js-search",
        _ = "js--active",
        A = "js-searchOpened",
        x = "js--searchExpanded",
        b = "js--loaded",
        T = window.location.href,
        S = h.getAttribute("data-fallback-url"),
        E = !1,
        L = !1,
        C = !1,
        k = !1,
        P = 600;
    e.addEventListener("click", function(e) {
        return !k && (!C && void(L ? E ? i() : n() : t()))
    }), d.addEventListener("search:loaded", function() {
        k = !1, E = !0
    }), d.addEventListener("search:loading", function() {
        k = !0
    }), d.addEventListener("search:isopened", function() {
        this._isActive = L
    }), m.addEventListener("click", function() {
        E ? i() : n()
    }), document.addEventListener("search:close", function() {
        T = window.location.href, n()
    }), document.addEventListener("page:loaded", c)
}, A17.Behaviors.searchTrigger = function(e) {
    e.addEventListener("click", function(e) {
        e.currentTarget.blur(), A17.Helpers.triggerCustomEvent(document, "nav:close"), document.querySelector("[data-behavior*='searchToggle']").click()
    })
}, A17.Behaviors.showCaseStudyDetail = function(e) {
    function t(t) {
        if ("previewEnabled" in e.dataset) return void(document.location = e.getAttribute("href"));
        t.preventDefault();
        var i = t.currentTarget;
        Barba.Dispatcher.trigger("linkClicked", i, t), Barba.Pjax.goTo(i.href, {
            type: "pjaxCaseStudy"
        })
    }

    function i() {
        e.addEventListener("click", t, !1)
    }
    this.destroy = function() {
        e.removeEventListener("click", t), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        i()
    }
}, A17.Behaviors.showFilter = function(e) {
    function t(e) {
        e.preventDefault();
        var t = e.currentTarget;
        Barba.Dispatcher.trigger("linkClicked", t, e), Barba.Pjax.goTo(t.href, {
            type: "pjaxSearch"
        })
    }

    function i() {
        e.addEventListener("click", t, !1)
    }
    this.destroy = function() {
        e.removeEventListener("click", t), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        i()
    }
}, A17.Behaviors.showFilterDetail = function(e) {
    function t(e) {
        e.preventDefault();
        var t = e.currentTarget;
        Barba.Dispatcher.trigger("linkClicked", t, e), Barba.Pjax.goTo(t.href, {
            type: "pjaxSearch"
        })
    }

    function i() {
        e.addEventListener("click", t, !1)
    }
    this.destroy = function() {
        e.removeEventListener("click", t), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        i()
    }
}, A17.Behaviors.slideshow = function(e) {
    function t(e) {
        u && u.next()
    }

    function i(e) {
        u && u.previous()
    }

    function n(e) {
        g.length && A17.Helpers.forEach(g, function(t, i) {
            i === e ? t.classList.add("js--active") : t.classList.remove("js--active")
        })
    }

    function r() {
        if (g.length) {
            var e = 0,
                t = null;
            A17.Helpers.forEach(g, function(i, n) {
                var r = i.textContent || i.innerText,
                    s = r.trim().length;
                e < s && (e = s, t = i)
            }), t && (v.textContent = t.textContent.trim())
        }
    }

    function s(e) {
        p && (e <= 0 ? p.classList.add(w) : p.classList.remove(w)), f && (e + 1 >= u.cells.length ? f.classList.add(w) : f.classList.remove(w))
    }

    function o() {
        if (y.length) {
            var e = u.selectedElement.querySelector("video");
            A17.Helpers.forEach(y, function(t, i) {
                t === e ? A17.Functions.homeSliderVideoLoad(e) : Number.isNaN(Number(t.duration)) || t.pause()
            })
        }
    }

    function a() {
        A17.Helpers.forEach(h, function(e) {
            e.classList.remove("is--blocked")
        })
    }

    function l() {
        A17.Helpers.forEach(h, function(e) {
            e.classList.add("is--blocked")
        })
    }

    function c() {
        u = new Flickity(d, {
            cellAlign: "left",
            prevNextButtons: !1,
            pageDots: !1,
            contain: !0,
            wrapAround: !0,
            setGallerySize: !1,
            lazyLoad: 2
        }), u.on("lazyLoad", function(e, t) {
            A17.Helpers.lazyloadPicture(e.target)
        }), u.on("select", function() {
            m.textContent = u ? u.selectedIndex + 1 : 1, u && (s(u.selectedIndex), n(u.selectedIndex), o())
        }), u.on("staticClick", function(e, t, i, n) {
            a();
            var r = i.querySelector("a");
            r && r.click()
        }), f.addEventListener("click", t), p.addEventListener("click", i), r(), o(), l(), document.addEventListener("modal:hide", l)
    }
    var u = null,
        d = e.querySelector(".workSlideshow__slider"),
        h = d.querySelectorAll("a"),
        f = e.querySelector("[data-next]"),
        p = e.querySelector("[data-previous]"),
        m = e.querySelector("[data-current]"),
        g = e.querySelectorAll("[data-caption]"),
        v = e.querySelector("[data-caption-placeholder]"),
        y = e.querySelectorAll("video"),
        w = "js--hidden";
    this.destroy = function() {
        u && (u.destroy(), f.removeEventListener("click", t), p.removeEventListener("click", i), u = null), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        c()
    }
}, A17.Behaviors.slideshowOffice = function(e) {
    function t(e) {
        e.currentTarget.blur();
        var t = parseInt(e.currentTarget.getAttribute("data-index"));
        l && (clearInterval(l), l = null), s[t].next(), l = setInterval(n, u)
    }

    function i() {
        A17.touch && (d.draggable = !0), A17.Helpers.forEach(o, function(e, i) {
            e.setAttribute("data-index", i);
            var n = e.querySelectorAll(".office__slide");
            if (n.length < 2) return A17.Helpers.forEach(n, function(e) {
                e.classList.add("is-selected")
            }), !1;
            var r = new Flickity(e, d);
            r.pausePlayer(), r.on("lazyLoad", function(e, t) {
                A17.Helpers.lazyloadPicture(e.target)
            }), r.on("select", function() {
                a[i] && (a[i].textContent = r ? r.selectedIndex + 1 : 1)
            }), s.push(r), A17.touch || e.addEventListener("click", t)
        }), l = setInterval(n, u)
    }

    function n() {
        for (var e = 0; e < s.length; e++) r(e)
    }

    function r(e) {
        var t = e % 2 === 0 ? 0 : 1,
            i = c * (t + 1) - c;
        setTimeout(function() {
            s[e].next()
        }, i)
    }
    var s = [],
        o = e.querySelectorAll("[data-office-slideshow]"),
        a = e.querySelectorAll("[data-current]"),
        l = null,
        c = 4e3,
        u = 2 * c,
        d = {
            cellAlign: "left",
            prevNextButtons: !1,
            pageDots: !1,
            contain: !0,
            wrapAround: !0,
            setGallerySize: !1,
            draggable: !1,
            lazyLoad: 2,
            dragThreshold: 15
        };
    this.destroy = function() {
        s.length && (slider.destroy(), s = [], A17.touch || A17.Helpers.forEach(o, function(e, i) {
            o.removeEventListener("click", t)
        })), l && (clearInterval(l), l = null), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        i()
    }
}, A17.Behaviors.stickyNavigation = function(e) {
    function t(e) {
        return !!p && e <= p
    }

    function i(e) {
        return e > h
    }

    function n(e) {
        return !!m && e + window.innerHeight >= m
    }

    function r(t) {
        t ? e.classList.add(v) : e.classList.remove(v)
    }

    function s(e) {
        var s = !1;
        p && m ? s = !(!t(e) && !n(e)) : p ? (s = t(e), r(s)) : m && (s = n(e), r(s)), i(e) || (s = !0), r(s)
    }

    function o(e) {
        d = window.pageYOffset, f || window.requestAnimationFrame(function() {
            Math.abs(d - h) > 30 && (s(d), h = d), f = !1
        }), f = !0
    }

    function a(e) {
        d = window.pageYOffset, l(), s(d)
    }

    function l() {
        e.getAttribute("data-sticky-top") && (p = c(e.getAttribute("data-sticky-top"), "top")), e.getAttribute("data-sticky-bottom") && (m = c(e.getAttribute("data-sticky-bottom"), "bottom"))
    }

    function c(e, t) {
        function i(e) {
            return !isNaN(e - 0) && null !== e && "" !== e && e !== !1
        }
        if (i(e)) return parseInt(e);
        var n = document.querySelector(e);
        return n ? n.getBoundingClientRect().top + d : null
    }

    function u() {
        e.classList.add(g), d = window.pageYOffset, window.addEventListener("scroll", o), document.addEventListener("resized", a), document.addEventListener("content:populated", a), document.addEventListener("page:changed", a), a()
    }
    var d = 0,
        h = -1,
        f = !1,
        p = null,
        m = null,
        g = "js--loaded",
        v = "js--scrolled";
    this.destroy = function() {
        e.classList.remove(g), window.removeEventListener("scroll", o), document.removeEventListener("resized", a), document.removeEventListener("content:populated", a), document.removeEventListener("page:changed", a), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        u()
    }
}, A17.Behaviors.stickySearch = function(e) {
    function t() {
        p = window.pageYOffset, y = A17.Helpers.getElementTopOffset(b) + v
    }

    function i(e) {
        t(), g || window.requestAnimationFrame(function() {
            s(p), m = p, g = !1
        }), g = !0
    }

    function n(e) {
        t(), s(p)
    }

    function r(e) {
        return e < m
    }

    function s(e) {
        r(e) && e >= y - 1 ? o() : a(), e > A17.headerHeight ? c() : l()
    }

    function o() {
        e.classList.add(_)
    }

    function a() {
        e.classList.remove(_)
    }

    function l() {
        e.classList.add(A)
    }

    function c() {
        e.classList.remove(A)
    }

    function u() {
        return !!w && (window.removeEventListener("scroll", i), document.removeEventListener("resized", n), a(), void(w = !1))
    }

    function d() {
        return !w && (window.addEventListener("scroll", i), document.addEventListener("resized", n), t(), s(p), void(w = !0))
    }

    function h() {
        var e = document.querySelector("[data-search-loading]");
        e && x ? x.innerHTML = e.innerHTML : x.textContent = ""
    }

    function f() {
        document.addEventListener("searchSticky:activate", d), document.addEventListener("searchSticky:deactivate", u), document.addEventListener("search:loading", h), document.addEventListener("search:loaded", function() {
            d(), h()
        }), document.addEventListener("search:closing", function() {
            u(), x.textContent = ""
        })
    }
    var p = 0,
        m = 0,
        g = !1,
        v = 100,
        y = A17.headerHeight + v,
        w = !1,
        _ = "js--active",
        A = "js--top",
        x = e.querySelector("[data-search-stickytitle]"),
        b = document.querySelector("[data-search-results]");
    f()
}, A17.Behaviors.stickyText = function(e) {
    function t(e) {
        return e > d
    }

    function i(i) {
        if (A17.currentMediaQuery.indexOf("small") !== -1) return !1;
        var r = a.offsetHeight,
            s = e.offsetHeight;
        if (w = r + _ < window.innerHeight ? 0 : 1, l) var o = l.getBoundingClientRect().top;
        else var o = e.getBoundingClientRect().top;
        if (o = o - _ + Math.max(0, r + _ - window.innerHeight) + i, l) var c = o + s - r - Math.max(0, l.getBoundingClientRect().top - e.getBoundingClientRect().top);
        else var c = o + s - r;
        a.offsetHeight < s - 100 && ("top" !== v && i < o && (n(a), v = "top"), "scrolling" !== v && i >= o && i < c && (n(a), a.classList.add(f + y[w]), v = "scrolling"), "bottom" !== v && i >= c && (n(a), a.classList.add(p), v = "bottom"), i + window.innerHeight >= e.getBoundingClientRect().top + i + s ? a.classList.add(g) : a.classList.remove(g)), t(i) ? a.classList.remove(m) : a.classList.add(m)
    }

    function n(e) {
        for (var t = 0; t < y.length; t++) e.classList.remove(f + y[t]);
        e.classList.remove(p)
    }

    function r(e) {
        u = window.pageYOffset, c || window.requestAnimationFrame(function() {
            i(u), d = u, c = !1
        }), c = !0
    }

    function s() {
        u = window.pageYOffset, v = "", i(u)
    }

    function o() {
        u = window.pageYOffset, window.addEventListener("scroll", r), document.addEventListener("resized", s), document.addEventListener("content:populated", s), e.classList.add(h), s()
    }
    var a = document.querySelector("[data-sticky-target]"),
        l = document.querySelector("[data-sticky-toptarget]"),
        c = !1,
        u = 0,
        d = -1,
        h = "js--sticky",
        f = "js--fixed",
        p = "js--abs",
        m = "js--scrollUp",
        g = "js--scrolled",
        v = "top",
        y = ["Top", "Bottom"],
        w = 0,
        _ = 30;
    this.destroy = function() {
        window.removeEventListener("scroll", r), document.removeEventListener("resized", s), document.removeEventListener("content:populated", s), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        o()
    }
}, A17.Behaviors.stickyTop = function(e) {
    function t(e) {
        f = window.pageYOffset, m || window.requestAnimationFrame(function() {
            r(f), p = f, m = !1
        }), m = !0
    }

    function i(e) {
        f = window.pageYOffset, c(), r(f)
    }

    function n(e) {
        return e < p
    }

    function r(e) {
        n(e) && e >= v - 1 ? s() : o(), e > A17.headerHeight ? l() : a()
    }

    function s() {
        e.classList.add(w)
    }

    function o() {
        e.classList.remove(w)
    }

    function a() {
        e.classList.add(_)
    }

    function l() {
        e.classList.remove(_)
    }

    function c() {
        var e = A17.headerHeight;
        if (A17.Functions.isHomepage()) {
            var t = document.querySelector("[data-home-pusher]");
            t && (e = t ? t.offsetHeight : window.innerHeight)
        }
        v = e + g
    }

    function u() {
        return !!y && (window.removeEventListener("scroll", t), document.removeEventListener("resized", i), o(), void(y = !1))
    }

    function d() {
        return !y && (window.addEventListener("scroll", t), document.addEventListener("resized", i), f = p = window.pageYOffset, c(), r(f), void(y = !0))
    }

    function h() {
        d(), document.addEventListener("top:activate", d), document.addEventListener("top:deactivate", u), document.addEventListener("page:changed", c)
    }
    var f = 0,
        p = 0,
        m = !1,
        g = 200,
        v = A17.headerHeight + g,
        y = !1,
        w = "js--active",
        _ = "js--top";
    h()
}, A17.Behaviors.trackContact = function(e) {
    function t(e) {
        "undefined" != typeof ga && ga("send", "event", "Contact", "click", "Contact link clicked " + e.currentTarget.textContent)
    }

    function i() {
        e.addEventListener("click", t)
    }
    this.destroy = function() {
        e.removeEventListener("click", t), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        i()
    }
}, A17.Behaviors.workFilter = function(e) {
    function t(e) {
        e.preventDefault();
        var t = e.target;
        if (t.blur(), t.classList.contains("workFilter__btn--active")) {
            var i = A17.Helpers.getWorkSectionTopOffset();
            TweenLite.to(window, .3, {
                scrollTo: {
                    y: i,
                    autoKill: !1
                },
                ease: new Ease(A17.bezier)
            })
        }
        return !document.querySelector(".pjaxSearch__container--sliding") && (Barba.Dispatcher.trigger("linkClicked", t, e),
            void Barba.Pjax.goTo(t.href, {
                type: "pjaxSearch"
            }))
    }

    function i() {
        setTimeout(function() {
            h || r()
        }, 1e3)
    }

    function n() {
        var t = A17.Functions.getCurrentPage();
        l = !!t && e.querySelector('[data-work-filter*="' + t + '"]'), s()
    }

    function r() {
        e.classList.add(c), s(), h = !0
    }

    function s() {
        if (l) {
            var e = l.offsetWidth,
                t = l.offsetLeft;
            e == u && t == d || (A17.Functions.moveWorkFilter(l, a), u = e, d = t)
        }
    }

    function o() {
        a && (A17.Helpers.forEach(a, function(e) {
            e.addEventListener("click", t, !1)
        }), n(), document.addEventListener("font:loaded", s), document.addEventListener("resized", s), document.addEventListener("page:changed", n), window.addEventListener("load", r), "complete" === document.readyState && r(), h || i())
    }
    var a = e.querySelectorAll("[data-work-filter]"),
        l = !1,
        c = "js--ready",
        u = 0,
        d = 0,
        h = !1;
    this.destroy = function() {
        A17.Helpers.forEach(a, function(e) {
            e.removeEventListener("click", t)
        }), document.removeEventListener("font:loaded", s), document.removeEventListener("resized", s), document.removeEventListener("page:changed", n), window.removeEventListener("load", r), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        o()
    }
}, A17.Behaviors.workFilterSticky = function(e) {
    function t(e) {
        function t() {
            return window.addEventListener("scroll", i), !document.querySelector(".pjaxSearch__container--sliding") && (Barba.Dispatcher.trigger("linkClicked", n, e), void Barba.Pjax.goTo(n.href, {
                type: "pjaxSearch"
            }))
        }
        e.preventDefault();
        var n = e.target;
        n.blur();
        var r = A17.Helpers.getWorkSectionTopOffset();
        window.removeEventListener("scroll", i), l(), TweenLite.to(window, .3, {
            scrollTo: {
                y: r,
                autoKill: !1
            },
            ease: new Ease(A17.bezier),
            onComplete: t
        })
    }

    function i(e) {
        m = window.pageYOffset, v || window.requestAnimationFrame(function() {
            o(m), g = m, v = !1
        }), v = !0
    }

    function n(e) {
        y = s(), m = window.pageYOffset, o(m)
    }

    function r(e) {
        return e < g
    }

    function s() {
        return A17.Helpers.getWorkSectionTopOffset() + f.offsetHeight + 100
    }

    function o(e) {
        r(e) && e >= y - 1 ? a() : l()
    }

    function a() {
        p.classList.add(_)
    }

    function l() {
        p.classList.remove(_)
    }

    function c() {
        return !!w && (window.removeEventListener("scroll", i), document.removeEventListener("resized", n), l(), void(w = !1))
    }

    function u() {
        return !w && (window.addEventListener("scroll", i), document.addEventListener("resized", n), m = g = window.pageYOffset, o(m), void(w = !0))
    }

    function d() {
        h && A17.Helpers.forEach(h, function(e) {
            e.addEventListener("click", t, !1)
        }), y = s(), u(), document.addEventListener("workFilterSticky:activate", u), document.addEventListener("workFilterSticky:deactivate", c)
    }
    var h = e.querySelectorAll("[data-work-filter]"),
        f = document.querySelector("[data-work-filters]"),
        p = document.querySelector("[data-work-filters-sticky]"),
        m = 0,
        g = 0,
        v = !1,
        y = A17.headerHeight,
        w = !1,
        _ = "js--active";
    this.destroy = function() {
        A17.Helpers.forEach(h, function(e) {
            e.removeEventListener("click", t)
        }), c(), document.removeEventListener("workFilterSticky:activate", u), document.removeEventListener("workFilterSticky:deactivate", c), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        d()
    }
}, A17.Behaviors.workOrder = function(e) {
    function t(e) {
        var t = e.target;
        t.blur(), i(t), Barba.Dispatcher.trigger("linkClicked", t, e), Barba.Pjax.goTo(t.getAttribute("data-url"), {
            type: "pjaxWorks"
        })
    }

    function i(e) {
        A17.Helpers.forEach(r, function(e) {
            e.classList.remove(s)
        }), e.classList.add(s)
    }

    function n() {
        r && A17.Helpers.forEach(r, function(e) {
            e.addEventListener("click", t, !1)
        })
    }
    var r = e.querySelectorAll("[data-work-order]"),
        s = "js--active";
    this.destroy = function() {
        r && A17.Helpers.forEach(r, function(e) {
            e.removeEventListener("click", t)
        }), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        n()
    }
}, A17.Behaviors.wrapSmallFeatures = function(e) {
    function t() {
        A17.Functions.manipulateFeaturedDOM(e)
    }

    function i() {
        document.addEventListener("resized", t), t()
    }
    this.destroy = function() {
        document.removeEventListener("resized", t), A17.Helpers.purgeProperties(this)
    }, this.init = function() {
        i()
    }
}, A17.Transitions.HideShow = Barba.BaseTransition.extend({
    start: function() {
        Promise.all([this.newContainerLoading, this.showLoader()]).then(this.finish.bind(this))
    },
    showLoader: function() {
        var e = Barba.Utils.deferred();
        return A17.Helpers.showProgressBar(), A17.Helpers.triggerCustomEvent(document, "top:deactivate"), e.resolve(), e.promise
    },
    finish: function() {
        function e(e, t) {
            TweenLite.to(e, h, {
                opacity: 0,
                ease: new Ease(A17.bezier),
                onComplete: function() {
                    t.call()
                }
            })
        }

        function t(e) {
            TweenLite.to(l, h, {
                backgroundColor: e,
                ease: new Ease(A17.bezier),
                onComplete: function() {
                    i(), l.style.backgroundColor = "", TweenLite.to([s, c], h, {
                        opacity: 1,
                        ease: new Ease(A17.bezier),
                        clearProps: "opacity"
                    })
                }
            })
        }

        function i() {
            A17.latestClickElement && window.scrollTo(0, 0), n()
        }

        function n() {
            r.done(), A17.Helpers.triggerCustomEvent(document, "top:activate")
        }
        var r = this,
            s = document.getElementById("pjax");
        A17.Helpers.hideProgressBar();
        var o = Barba.HistoryManager.prevStatus(),
            a = Barba.HistoryManager.currentStatus(),
            l = document.documentElement,
            c = document.querySelectorAll(".header__nav"),
            u = !1,
            d = !1,
            h = .3,
            f = !1,
            p = document.querySelector("[data-search]"),
            m = !1;
        p && (A17.Helpers.triggerCustomEvent(p, "search:isopened"), m = p._isActive), m ? n() : (o && (u = !(A17.Functions.isPage(o, "partner") || !A17.Functions.isPage(a, "partner")), d = !(!A17.Functions.isPage(o, "partner") || A17.Functions.isPage(a, "partner"))), f = !(!u && !d), f ? e([s, c], function() {
            u ? t("black") : d && t("white")
        }) : e(s, function() {
            i(), TweenLite.to(s, h, {
                opacity: 1,
                ease: new Ease(A17.bezier),
                clearProps: "opacity"
            })
        }))
    }
}), A17.Transitions.ReorderWorks = Barba.BaseTransition.extend({
    valid: function() {
        var e = Barba.HistoryManager.prevStatus();
        return !(!A17.latestClickElement || !e.namespace) && (A17.Functions.isPage(e, "work") && A17.latestClickElement.hasAttribute("data-work-order"))
    },
    start: function() {
        Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.finish.bind(this))
    },
    fadeOut: function(e) {
        function t() {
            TweenLite.to(n, .3, {
                opacity: 0,
                ease: new Ease(A17.bezier),
                onComplete: function() {
                    i.resolve()
                }
            })
        }
        var i = Barba.Utils.deferred(),
            n = document.querySelectorAll(".workArchive__title, .workArchive__list");
        if ("abc" === A17.latestClickElement.getAttribute("data-work-order")) {
            A17.Helpers.triggerCustomEvent(document, "workFilterSticky:deactivate");
            var r = document.querySelector(".workArchive__header").getBoundingClientRect().top + window.pageYOffset - 30;
            r < window.pageYOffset ? TweenLite.to(window, .3, {
                scrollTo: {
                    y: r,
                    autoKill: !1
                },
                ease: new Ease(A17.bezier),
                onComplete: t
            }) : t()
        } else t();
        return i.promise
    },
    finish: function() {
        var e = this;
        e.done();
        var t = document.querySelectorAll(".workArchive__title, .workArchive__list");
        TweenLite.set(t, {
            opacity: 0
        }), TweenLite.to(t, .3, {
            opacity: 1,
            ease: new Ease(A17.bezier)
        }), A17.Helpers.triggerCustomEvent(document, "workFilterSticky:activate")
    }
}), A17.Transitions.RevealHome = Barba.BaseTransition.extend({
    valid: function() {
        return !!A17.latestClickElement && A17.latestClickElement.hasAttribute("data-logo-btn")
    },
    start: function() {
        Promise.all([this.newContainerLoading, this.showLoader()]).then(this.finish.bind(this))
    },
    showLoader: function() {
        var e = Barba.Utils.deferred();
        return A17.Helpers.showProgressBar(), e.resolve(), e.promise
    },
    finish: function() {
        var e = this;
        A17.Helpers.hideProgressBar();
        var t = document.getElementById("pjax"),
            i = "pjax--animating",
            n = "pjax__container--animatingBottom",
            r = "pjax__container--animatingTop",
            s = "page-home",
            o = t.firstElementChild,
            a = t.lastElementChild,
            l = window.innerHeight,
            c = .66;
        return a && o ? (TweenLite.set(o, {
            y: 0,
            x: 0
        }), TweenLite.set(a, {
            y: -l / 5,
            x: 0
        }), document.documentElement.classList.add(s), t.classList.add(i), o.classList.add(r), a.classList.add(n), TweenLite.to(a, c, {
            y: 0,
            ease: new Ease(A17.bezier),
            clearProps: "y"
        }), void TweenLite.to(o, c, {
            y: l + A17.headerHeight,
            ease: new Ease(A17.bezier),
            onComplete: function() {
                e.done(), t.classList.remove(i), a.classList.remove(n)
            }
        })) : (e.done(), !1)
    }
}), A17.Transitions.ShowCaseStudy = Barba.BaseTransition.extend({
    valid: function() {
        var e = Barba.HistoryManager.prevStatus();
        return !(!A17.latestClickElement || !e.namespace) && (A17.Functions.isPage(e, "casestudy") && A17.latestClickElement.hasAttribute("data-show-casestudy"))
    },
    start: function() {
        Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.finish.bind(this))
    },
    fadeOut: function(e) {
        var t = Barba.Utils.deferred(),
            i = document.getElementById("pjaxCaseStudy");
        return A17.Helpers.triggerCustomEvent(document, "top:deactivate"), TweenLite.to(i, .5, {
            opacity: 0,
            onComplete: function() {
                t.resolve()
            }
        }), t.promise
    },
    finish: function() {
        var e = this,
            t = document.getElementById("pjaxCaseStudy"),
            i = A17.headerHeight,
            n = t.getBoundingClientRect().top + window.pageYOffset - i;
        TweenLite.to(window, .5, {
            scrollTo: {
                y: n,
                autoKill: !1
            },
            ease: new Ease(A17.bezier),
            onComplete: function() {
                e.done(), window.scrollTo(0, n), A17.Helpers.triggerCustomEvent(document, "top:activate"), TweenLite.to(t, .5, {
                    opacity: 1,
                    clearProps: "opacity"
                })
            }
        })
    }
}), A17.Transitions.ShowDiscipline = Barba.BaseTransition.extend({
    valid: function() {
        var e = Barba.HistoryManager.prevStatus();
        return !(!A17.latestClickElement || !e.namespace) && (A17.Functions.isPage(e, "work") && A17.latestClickElement.hasAttribute("data-discipline-details"))
    },
    start: function() {
        Promise.all([this.newContainerLoading, this.showLoader()]).then(this.finish.bind(this))
    },
    showLoader: function() {
        var e = Barba.Utils.deferred();
        return A17.Helpers.showProgressBar(), A17.Helpers.triggerCustomEvent(document, "workFilterSticky:deactivate"), e.resolve(), e.promise
    },
    finish: function() {
        function e() {
            var e = document.getElementById("pjaxSearch");
            TweenLite.to(e, .4, {
                opacity: 0,
                onComplete: function() {
                    i(), window.scrollTo(0, 0), TweenLite.to(e, .4, {
                        opacity: 1
                    })
                }
            })
        }

        function t() {
            function e() {
                var e = .6;
                TweenLite.to(window, e, {
                    scrollTo: {
                        y: u,
                        autoKill: !1
                    },
                    ease: new Ease(A17.bezier)
                }), d && TweenLite.to(s, .4, {
                    delay: e,
                    opacity: 1,
                    clearProps: "opacity"
                }), 0 == r ? i() : TweenLite.to(o, e, {
                    y: c,
                    ease: new Ease(A17.bezier),
                    onComplete: function() {
                        i()
                    }
                })
            }
            var t = document.querySelectorAll("[data-discipline-row]"),
                n = document.querySelectorAll("[data-carousel]"),
                s = document.querySelectorAll("[data-header], [data-work-filters]");
            A17.Helpers.triggerCustomEvent(n[r], "carousel:start"), A17.Helpers.forEach(n, function(e) {
                e.style.overflow = "hidden"
            });
            var o = t[r],
                a = o.getBoundingClientRect().top,
                l = t[0].getBoundingClientRect().top,
                c = l - a,
                u = A17.Helpers.getWorkSectionTopOffset(),
                d = u < window.pageYOffset - 130;
            s.length || (d = !1), t = Array.prototype.slice.call(t), t.splice(r, 1), d && TweenLite.set(s, {
                opacity: 0
            }), TweenLite.to(A17.latestClickElement, .3, {
                opacity: 0
            }), TweenLite.to(t, .5, {
                opacity: 0,
                ease: new Ease(A17.bezier),
                onComplete: e
            })
        }

        function i() {
            n.done();
            var e = document.querySelectorAll("[data-work-appear]"),
                t = document.querySelector("[data-work]");
            TweenLite.set([e, t], {
                opacity: 0
            }), TweenLite.to([e, t], .5, {
                opacity: 1,
                clearProps: "opacity"
            }), A17.Helpers.triggerCustomEvent(document, "workFilterSticky:activate")
        }
        var n = this;
        A17.Helpers.hideProgressBar();
        var r = A17.latestClickElement.getAttribute("data-discipline-details");
        r || i(), A17.currentMediaQuery.indexOf("small") !== -1 ? e() : t()
    }
}), A17.Transitions.ShowFilterDetails = Barba.BaseTransition.extend({
    valid: function() {
        var e = Barba.HistoryManager.prevStatus();
        return !(!A17.latestClickElement || !e.namespace) && (A17.Functions.isPage(e, "work") && A17.latestClickElement.hasAttribute("data-work-details"))
    },
    start: function() {
        Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.finish.bind(this))
    },
    fadeOut: function(e) {
        var t = Barba.Utils.deferred(),
            i = document.getElementById("pjaxSearch");
        return TweenLite.to(i, .3, {
            opacity: 0,
            onComplete: function() {
                t.resolve()
            }
        }), t.promise
    },
    finish: function() {
        var e = this,
            t = document.getElementById("pjaxSearch");
        e.done(), TweenLite.to(t, .3, {
            opacity: 1
        })
    }
}), A17.Transitions.ShowNews = Barba.BaseTransition.extend({
    valid: function() {
        var e = Barba.HistoryManager.prevStatus();
        return !(!A17.latestClickElement || !e.namespace) && (A17.Functions.isPage(e, "news") && A17.latestClickElement.hasAttribute("data-news-filter"))
    },
    start: function() {
        Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.finish.bind(this))
    },
    fadeOut: function(e) {
        var t = Barba.Utils.deferred(),
            i = document.getElementById("pjaxNews");
        return TweenLite.to(i, .3, {
            opacity: 0,
            ease: new Ease(A17.bezier),
            onComplete: function() {
                t.resolve()
            }
        }), t.promise
    },
    finish: function() {
        var e = this,
            t = document.getElementById("pjaxNews");
        e.done(), TweenLite.to(t, .3, {
            opacity: 1,
            ease: new Ease(A17.bezier)
        })
    }
}), A17.Transitions.ShowNextCaseStudy = Barba.BaseTransition.extend({
    valid: function() {
        var e = Barba.HistoryManager.prevStatus();
        return !(!A17.latestClickElement || !e.namespace) && (A17.Functions.isPage(e, "casestudy") && A17.latestClickElement.hasAttribute("data-next-casestudy"))
    },
    start: function() {
        Promise.all([this.newContainerLoading, this.slideUp()]).then(this.finish.bind(this))
    },
    slideUp: function() {
        function e() {
            TweenLite.to(r, 1, {
                delay: p,
                y: -f.top - u + a,
                ease: new Ease(A17.bezier),
                onComplete: t
            })
        }

        function t() {
            TweenLite.to(n, .6, {
                opacity: 1
            }), i.resolve()
        }
        var i = Barba.Utils.deferred(),
            n = document.querySelector("[data-header]"),
            r = document.querySelector("[data-next-casestudy]"),
            s = document.querySelector("[data-work-content]"),
            o = document.querySelectorAll("[data-work-delimiter]");
        A17.Helpers.triggerCustomEvent(document, "top:deactivate");
        var a = A17.headerHeight,
            l = 50,
            c = 90,
            u = A17.currentMediaQuery.indexOf("xsmall") !== -1 ? c : l,
            d = A17.currentMediaQuery.indexOf("xsmall") !== -1,
            h = "workNext--animating",
            f = r.getBoundingClientRect(),
            p = 0;
        if (A17.Functions.showHeader(), r)
            if (s && o) {
                if (d) {
                    var m = r.querySelector(".workMedia__picture--hero");
                    p = .5, m && TweenLite.to(m, .4, {
                        opacity: 0,
                        onComplete: function() {
                            TweenLite.to(m, .4, {
                                opacity: 1
                            }), r.parentElement.classList.add(h)
                        }
                    })
                } else r.parentElement.classList.add(h);
                TweenLite.to([s, o, n], .4, {
                    opacity: 0,
                    onComplete: e
                })
            } else r.parentElement.classList.add(h), e();
        else t();
        return i.promise
    },
    finish: function() {
        var e = this;
        e.newContainer.style.visibility = "visible", setTimeout(function() {
            window.scrollTo(0, 0), e.oldContainer.parentNode.removeChild(e.oldContainer), A17.Helpers.triggerCustomEvent(document, "top:activate"), e.deferred.resolve()
        }, 20)
    }
}), A17.Transitions.ShowPrevNextDetail = Barba.BaseTransition.extend({
    valid: function() {
        var e = Barba.HistoryManager.prevStatus();
        return !(!A17.latestClickElement || !e.namespace) && (A17.latestClickElement.hasAttribute("data-next-detail") || A17.latestClickElement.hasAttribute("data-prev-detail"))
    },
    start: function() {
        Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.finish.bind(this))
    },
    fadeOut: function(e) {
        var t = Barba.Utils.deferred(),
            i = document.getElementById("pjax");
        return TweenLite.to(i, .3, {
            opacity: 0,
            ease: new Ease(A17.bezier),
            onComplete: function() {
                t.resolve()
            }
        }), t.promise
    },
    finish: function() {
        var e = this,
            t = document.getElementById("pjax");
        window.scrollTo(0, 0), e.done(), TweenLite.to(t, .3, {
            opacity: 1,
            ease: new Ease(A17.bezier)
        })
    }
}), A17.Transitions.ShowFilterDetails = Barba.BaseTransition.extend({
    valid: function() {
        var e = Barba.HistoryManager.prevStatus();
        return !(!A17.latestClickElement || !e.namespace) && (A17.Functions.isPage(e, "work") && A17.latestClickElement.hasAttribute("data-work-sliding"))
    },
    start: function() {
        Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.finish.bind(this))
    },
    fadeOut: function(e) {
        var t = Barba.Utils.deferred(),
            i = document.getElementById("pjaxSearch"),
            n = A17.latestClickElement.getAttribute("data-work-sliding") || "front",
            r = "front" === n ? 0 : 40,
            s = A17.Helpers.getWorkSectionTopOffset();
        return A17.Helpers.triggerCustomEvent(document, "workFilterSticky:deactivate"), TweenLite.to(window, .3, {
            scrollTo: {
                y: s,
                autoKill: !1
            },
            ease: new Ease(A17.bezier)
        }), TweenLite.to(i, .4, {
            opacity: 0,
            y: r,
            ease: new Ease(A17.bezier),
            onComplete: function() {
                t.resolve()
            }
        }), t.promise
    },
    finish: function() {
        var e = this,
            t = document.getElementById("pjaxSearch"),
            i = A17.latestClickElement.getAttribute("data-work-sliding") || "front",
            n = "front" === i ? 40 : 0;
        TweenLite.set(t, {
            y: n,
            opacity: 0
        }), e.done(), TweenLite.to(t, .4, {
            opacity: 1,
            y: 0,
            ease: new Ease(A17.bezier)
        }), A17.Helpers.triggerCustomEvent(document, "workFilterSticky:activate")
    }
}), A17.Transitions.SlideFilterResults = Barba.BaseTransition.extend({
    valid: function() {
        var e = Barba.HistoryManager.prevStatus();
        return !(!A17.latestClickElement || !e.namespace) && (A17.Functions.isPage(e, "work") && A17.latestClickElement.hasAttribute("data-work-filter"))
    },
    start: function() {
        Promise.all([this.newContainerLoading, this.showLoader()]).then(this.finish.bind(this))
    },
    showLoader: function() {
        var e = Barba.Utils.deferred();
        A17.Helpers.showProgressBar();
        var t = document.getElementById("pjaxSearch"),
            i = t.querySelectorAll("video");
        return i.forEach(function(e, t) {
            Number.isNaN(Number(e.duration)) || e.pause()
        }), e.resolve(), e.promise
    },
    finish: function() {
        function e(e) {
            var t = 0,
                i = A17.Functions.getCurrentPage(e);
            return i && a.forEach(function(e, n) {
                i === e && (t = n)
            }), t
        }

        function t() {
            var e = r.lastElementChild,
                t = "pjaxSearch__container--sliding",
                i = window.innerWidth,
                s = l > c ? -i : i;
            if (e.classList.add(t), TweenLite.set(e, {
                    x: s
                }), 0 === c) {
                var o = e.querySelectorAll("[data-behavior*='hoverSlideshow']");
                o.length && A17.Helpers.forEach(o, function(e) {
                    A17.Helpers.shuffleSectors(e)
                })
            }
            TweenLite.to(r, .8, {
                x: -s,
                ease: new Ease(A17.bezier),
                clearProps: "x",
                onComplete: function() {
                    n.done(), e.classList.remove(t), TweenLite.set(e, {
                        x: 0
                    }), e.style.transform = ""
                }
            })
        }

        function i(e) {
            function t() {
                n.done(), TweenLite.to(r, i, {
                    opacity: 1
                })
            }
            var i = (A17.Helpers.getWorkSectionTopOffset(), .4);
            e > 0 ? (TweenLite.set(r, {
                y: 0
            }), TweenLite.to(r, i, {
                opacity: 0,
                y: e,
                clearProps: "y",
                onComplete: t
            })) : TweenLite.to(r, i, {
                opacity: 0,
                onComplete: t
            })
        }
        var n = this;
        A17.Helpers.hideProgressBar();
        var r = document.getElementById("pjaxSearch"),
            s = Barba.HistoryManager.prevStatus(),
            o = Barba.HistoryManager.currentStatus(),
            a = ["sectors", "disciplines", "all", "abc"],
            l = s.namespace ? e(s.namespace) : 0,
            c = o.namespace ? e(o.namespace) : 0,
            u = document.querySelectorAll("[data-work-filter]");
        u[c] && A17.Functions.moveWorkFilter(u[c], u), A17.currentMediaQuery.indexOf("small") !== -1 ? i(0) : l != c ? t() : i(40)
    }
});
