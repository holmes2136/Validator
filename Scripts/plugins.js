/**
* Cookie plugin
*
* Copyright (c) 2006 Klaus Hartl (stilbuero.de)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/
/**
* Create a cookie with the given name and value and other optional parameters.
*
* @example $.cookie('the_cookie', 'the_value');
* @desc Set the value of a cookie.
* @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
* @desc Create a cookie with all available options.
* @example $.cookie('the_cookie', 'the_value');
* @desc Create a session cookie.
* @example $.cookie('the_cookie', null);
* @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
*       used when the cookie was set.
*
* @param String name The name of the cookie.
* @param String value The value of the cookie.
* @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
* @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
*                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
*                             If set to null or omitted, the cookie will be a session cookie and will not be retained
*                             when the the browser exits.
* @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
* @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
* @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
*                        require a secure protocol (like HTTPS).
* @type undefined
*
* @name $.cookie
* @cat Plugins/Cookie
* @author Klaus Hartl/klaus.hartl@stilbuero.de
*/
/**
* Get the value of a cookie with the given name.
*
* @example $.cookie('the_cookie');
* @desc Get the value of a cookie.
*
* @param String name The name of the cookie.
* @return The value of the cookie.
* @type String
*
* @name $.cookie
* @cat Plugins/Cookie
* @author Klaus Hartl/klaus.hartl@stilbuero.de
*/
jQuery.cookie = function (a, b, c) {
    if (typeof b == "undefined") {
        var i = null;
        if (document.cookie && document.cookie != "") {
            var j = document.cookie.split(";");
            for (var k = 0; k < j.length; k++) {
                var l = jQuery.trim(j[k]);
                if (l.substring(0, a.length + 1) == a + "=") {
                    i = decodeURIComponent(l.substring(a.length + 1));
                    break
                }
            }
        }
        return i
    }
    c = c || {}, b === null && (b = "", c = $.extend({}, c), c.expires = -1);
    var d = "";
    if (c.expires && (typeof c.expires == "number" || c.expires.toUTCString)) {
        var e;
        typeof c.expires == "number" ? (e = new Date, e.setTime(e.getTime() + c.expires * 24 * 60 * 60 * 1e3)) : e = c.expires, d = "; expires=" + e.toUTCString()
    }
    var f = c.path ? "; path=" + c.path : "", g = c.domain ? "; domain=" + c.domain : "", h = c.secure ? "; secure" : "";
    document.cookie = [a, "=", encodeURIComponent(b), d, f, g, h].join("")
}, !function (a) {
    var b = function (b, d) {
        this.element = a(b), this.opts = d, this.format = c.parseFormat(d.format || this.element.data("date-format") || "mm/dd/yyyy"), this.picker = a(c.template).appendTo("body").on({ click: a.proxy(this.click, this), mousedown: a.proxy(this.mousedown, this) }), this.isInput = this.element.is("input"), this.component = this.element.is(".date") ? this.element.find(".add-on") : !1, this.isInput ? this.element.on({ focus: a.proxy(this.show, this), blur: a.proxy(this.hide, this), keyup: a.proxy(this.update, this) }) : this.component ? this.component.on("click", a.proxy(this.show, this)) : this.element.on("click", a.proxy(this.show, this)), this.minViewMode = d.minViewMode || this.element.data("date-minviewmode") || 0;
        if (typeof this.minViewMode == "string")
            switch (this.minViewMode) {
            case "months":
                this.minViewMode = 1;
                break;
            case "years":
                this.minViewMode = 2;
                break;
            default:
                this.minViewMode = 0
        }
        this.viewMode = d.viewMode || this.element.data("date-viewmode") || 0;
        if (typeof this.viewMode == "string")
            switch (this.viewMode) {
            case "months":
                this.viewMode = 1;
                break;
            case "years":
                this.viewMode = 2;
                break;
            default:
                this.viewMode = 0
        }
        this.startViewMode = this.viewMode, this.weekStart = d.weekStart || this.element.data("date-weekstart") || 0, this.weekEnd = this.weekStart === 0 ? 6 : this.weekStart - 1, this.fillDow(), this.fillMonths(), this.update(), this.showMode()
    };
    b.prototype = { constructor: b, show: function (b) {
        if (this.component && this.element.find(":text").prop("disabled"))
            return !1;
        this.picker.show(), this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(), this.place(), a(window).on("resize", a.proxy(this.place, this)), b && (b.stopPropagation(), b.preventDefault()), this.isInput || a(document).on("mousedown", a.proxy(this.hide, this)), this.element.trigger({ type: "show", date: this.date })
    }, hide: function () {
        this.picker.hide(), a(window).off("resize", this.place), this.viewMode = this.startViewMode, this.showMode(), this.isInput || a(document).off("mousedown", this.hide), this.opts.notAutoSet || this.set(), this.isInput ? this.element.trigger("blur") : this.component && this.element.find("input").trigger("blur").trigger("keyup"), this.element.trigger({ type: "hide", date: this.date })
    }, set: function () {
        var a = c.formatDate(this.date, this.format);
        this.isInput ? this.element.prop("value", a) : (this.component && this.element.find("input").prop("value", a), this.element.data("date", a))
    }, setValue: function (a) {
        typeof a == "string" ? this.date = c.parseDate(a, this.format) : this.date = new Date(a), this.set(), this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0), this.fill()
    }, place: function () {
        var a = this.component ? this.component.offset() : this.element.offset();
        this.picker.css({ top: a.top + this.height, left: a.left })
    }, update: function (a) {
        this.date = c.parseDate(typeof a == "string" ? a : this.isInput ? this.element.prop("value") : this.element.data("date"), this.format), this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0), this.fill()
    }, fillDow: function () {
        var a = this.weekStart, b = "<tr>";
        while (a < this.weekStart + 7)
            b += '<th class="dow">' + c.dates.daysMin[a++ % 7] + "</th>";
        b += "</tr>", this.picker.find(".datepicker-days thead").append(b)
    }, fillMonths: function () {
        var a = "", b = 0;
        while (b < 12)
            a += '<span class="month">' + c.dates.monthsShort[b++] + "</span>";
        this.picker.find(".datepicker-months td").append(a)
    }, fill: function () {
        var a = new Date(this.viewDate), b = a.getFullYear(), d = a.getMonth(), e = this.date.valueOf();
        b = b < 1911 ? b + 1911 : b, this.picker.find(".datepicker-days th:eq(1)").text("民國" + (b - 1911) + "年" + c.dates.months[d] + "月");
        var f = new Date(b, d - 1, 28, 0, 0, 0, 0), g = c.getDaysInMonth(f.getFullYear(), f.getMonth());
        f.setDate(g), f.setDate(g - (f.getDay() - this.weekStart + 7) % 7);
        var h = new Date(f);
        h.setDate(h.getDate() + 42), h = h.valueOf(), html = [];
        var i;
        while (f.valueOf() < h)
            f.getDay() === this.weekStart && html.push("<tr>"), i = "", f.getMonth() < d ? i += " old" : f.getMonth() > d && (i += " new"), f.valueOf() === e && (i += " active"), html.push('<td class="day' + i + '">' + f.getDate() + "</td>"), f.getDay() === this.weekEnd && html.push("</tr>"), f.setDate(f.getDate() + 1);
        this.picker.find(".datepicker-days tbody").empty().append(html.join(""));
        var j = this.date.getFullYear(), k = this.picker.find(".datepicker-months").find("th:eq(1)").text("民國" + (b - 1911) + "年").end().find("span").removeClass("active");
        j === b && k.eq(this.date.getMonth()).addClass("active"), html = "", b = parseInt(b / 10, 10) * 10;
        var l = this.picker.find(".datepicker-years").find("th:eq(1)").text(b - 1911 + "-" + (b - 1911 + 9)).end().find("td");
        b -= 1;
        for (var m = -1; m < 11; m++)
            html += '<span class="year' + (m === -1 || m === 10 ? " old" : "") + (j === b ? " active" : "") + '">' + (b - 1911) + "</span>", b += 1;
        l.html(html)
    }, click: function (b) {
        b.stopPropagation(), b.preventDefault();
        var d = a(b.target).closest("span, td, th");
        if (d.length === 1)
            switch (d[0].nodeName.toLowerCase()) {
            case "th":
                switch (d[0].className) {
                    case "switch":
                        this.showMode(1);
                        break;
                    case "prev":
                    case "next":
                        this.viewDate["set" + c.modes[this.viewMode].navFnc].call(this.viewDate, this.viewDate["get" + c.modes[this.viewMode].navFnc].call(this.viewDate) + c.modes[this.viewMode].navStep * (d[0].className === "prev" ? -1 : 1)), this.fill(), this.set()
                }
                break;
            case "span":
                if (d.is(".month")) {
                    var e = d.parent().find("span").index(d);
                    this.viewDate.setMonth(e)
                } else {
                    var f = parseInt(d.text(), 10) || 0;
                    f = (f + "").length <= 3 && f < 1911 ? f + 1911 : f, this.viewDate.setFullYear(f)
                }
                this.viewMode !== 0 && (this.date = new Date(this.viewDate), this.element.trigger({ type: "changeDate", date: this.date, viewMode: c.modes[this.viewMode].clsName })), this.showMode(-1), this.fill(), this.set();
                break;
            case "td":
                if (d.is(".day")) {
                    var g = parseInt(d.text(), 10) || 1, e = this.viewDate.getMonth();
                    d.is(".old") ? e -= 1 : d.is(".new") && (e += 1);
                    var f = this.viewDate.getFullYear();
                    this.date = new Date(f, e, g, 0, 0, 0, 0), this.viewDate = new Date(f, e, Math.min(28, g), 0, 0, 0, 0), this.fill(), this.set(), this.element.trigger({ type: "changeDate", date: this.date, viewMode: c.modes[this.viewMode].clsName })
                }
        }
    }, mousedown: function (a) {
        a.stopPropagation(), a.preventDefault()
    }, showMode: function (a) {
        a && (this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + a))), this.picker.find(">div").hide().filter(".datepicker-" + c.modes[this.viewMode].clsName).show()
    } 
    }, a.fn.datepicker = function (c, d) {
        return this.each(function () {
            var e = a(this), f = e.data("datepicker"), g = typeof c == "object" && c;
            f || e.data("datepicker", f = new b(this, a.extend({}, a.fn.datepicker.defaults, g))), typeof c == "string" && f[c](d)
        })
    }, a.fn.datepicker.defaults = {}, a.fn.datepicker.Constructor = b;
    var c = { modes: [{ clsName: "days", navFnc: "Month", navStep: 1 }, { clsName: "months", navFnc: "FullYear", navStep: 1 }, { clsName: "years", navFnc: "FullYear", navStep: 10}], dates: { days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"], daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"], daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"], months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"] }, isLeapYear: function (a) {
        return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
    }, getDaysInMonth: function (a, b) {
        return [31, c.isLeapYear(a) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][b]
    }, parseFormat: function (a) {
        var b = a.match(/[.\/\-\s].*?/), c = a.split(/\W+/);
        if (!b || !c || c.length === 0) {
            if (a == "yyymmdd")
                return { separator: "", parts: ["yyy", "mm", "dd"] };
            throw new Error("Invalid date format.")
        }
        return { separator: b, parts: c }
    }, parseDate: function (a, b) {
        if (b.separator != "") {
            var c = a.split(b.separator), a = new Date, d;
            a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0);
            if (c.length === b.parts.length)
                for (var e = 0, f = b.parts.length; e < f; e++) {
                    d = parseInt(c[e], 10) || 1;
                    switch (b.parts[e]) {
                        case "dd":
                        case "d":
                            a.setDate(d);
                            break;
                        case "mm":
                        case "m":
                            a.setMonth(d - 1);
                            break;
                        case "yy":
                            a.setFullYear(2e3 + d);
                            break;
                        case "yyyy":
                            a.setFullYear(d)
                    }
                }
            return a
        }
        if (!!a) {
            a += "";
            var c = [a.substring(0, 4), a.substring(4, 6), a.substring(6, 8)];
            a.length == 7 ? c = [a.substring(0, 3), a.substring(3, 5), a.substring(5, 7)] : a.length == 6 && (c = [a.substring(0, 2), a.substring(2, 4), a.substring(4, 6)]);
            var a = new Date, d;
            a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0);
            if (c.length === b.parts.length)
                for (var e = 0, f = b.parts.length; e < f; e++) {
                    d = parseInt(c[e], 10) || 1;
                    switch (b.parts[e]) {
                        case "dd":
                        case "d":
                            a.setDate(d);
                            break;
                        case "mm":
                        case "m":
                            a.setMonth(d - 1);
                            break;
                        case "yy":
                            a.setFullYear(2e3 + d);
                            break;
                        case "yyy":
                            a.setFullYear(1911 + d);
                            break;
                        case "yyyy":
                            a.setFullYear(d)
                    }
                }
            return a
        }
    }, formatDate: function (a, b) {
        var c = { d: a.getDate(), m: a.getMonth() + 1, yy: a.getFullYear().toString().substring(2), yyyy: a.getFullYear(), yyy: a.getFullYear() - 1911 };
        c.dd = (c.d < 10 ? "0" : "") + c.d, c.mm = (c.m < 10 ? "0" : "") + c.m;
        var a = [];
        for (var d = 0, e = b.parts.length; d < e; d++)
            a.push(c[b.parts[d]]);
        return a.join(b.separator)
    }, headTemplate: '<thead><tr><th class="prev">&lsaquo;</th><th colspan="5" class="switch"></th><th class="next">&rsaquo;</th></tr></thead>', contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'
    };
    c.template = '<div class="datepicker dropdown-menu"><div class="datepicker-days"><table class=" table-condensed">' + c.headTemplate + "<tbody></tbody>" + "</table>" + "</div>" + '<div class="datepicker-months">' + '<table class="table-condensed">' + c.headTemplate + c.contTemplate + "</table>" + "</div>" + '<div class="datepicker-years">' + '<table class="table-condensed">' + c.headTemplate + c.contTemplate + "</table>" + "</div>" + "</div>"
} (window.jQuery);
var bootbox = window.bootbox || function (a, b) {
    function c(a, b) {
        null == b && (b = d);
        return "string" == typeof k[b][a] ? k[b][a] : b != e ? c(a, e) : a
    }
    var d = "en", e = "en", f = !0, g = "static", h = "", i = {}, j = { setLocale: function (a) {
        for (var b in k)
            if (b == a) {
                d = a;
                return
            }
        throw Error("Invalid locale: " + a)
    }, addLocale: function (a, b) {
        "undefined" == typeof k[a] && (k[a] = {});
        for (var c in b)
            k[a][c] = b[c]
    }, setIcons: function (a) {
        i = a;
        if ("object" != typeof i || null == i)
            i = {}
    }, alert: function () {
        var a = "", b = c("OK"), d = null;
        switch (arguments.length) {
            case 1:
                a = arguments[0];
                break;
            case 2:
                a = arguments[0], "function" == typeof arguments[1] ? d = arguments[1] : b = arguments[1];
                break;
            case 3:
                a = arguments[0], b = arguments[1], d = arguments[2];
                break;
            default:
                throw Error("Incorrect number of arguments: expected 1-3")
        }
        return j.dialog(a, { label: b, icon: i.OK, callback: d }, { onEscape: d || !0 })
    }, confirm: function () {
        var a = "", b = c("CANCEL"), d = c("CONFIRM"), e = null;
        switch (arguments.length) {
            case 1:
                a = arguments[0];
                break;
            case 2:
                a = arguments[0], "function" == typeof arguments[1] ? e = arguments[1] : b = arguments[1];
                break;
            case 3:
                a = arguments[0], b = arguments[1], "function" == typeof arguments[2] ? e = arguments[2] : d = arguments[2];
                break;
            case 4:
                a = arguments[0], b = arguments[1], d = arguments[2], e = arguments[3];
                break;
            default:
                throw Error("Incorrect number of arguments: expected 1-4")
        }
        var f = function () {
            "function" == typeof e && e(!1)
        };
        return j.dialog(a, [{ label: b, icon: i.CANCEL, callback: f }, { label: d, icon: i.CONFIRM, callback: function () {
            "function" == typeof e && e(!0)
        } 
        }], { onEscape: f })
    }, prompt: function () {
        var a = "", d = c("CANCEL"), e = c("CONFIRM"), f = null, g = "";
        switch (arguments.length) {
            case 1:
                a = arguments[0];
                break;
            case 2:
                a = arguments[0], "function" == typeof arguments[1] ? f = arguments[1] : d = arguments[1];
                break;
            case 3:
                a = arguments[0], d = arguments[1], "function" == typeof arguments[2] ? f = arguments[2] : e = arguments[2];
                break;
            case 4:
                a = arguments[0], d = arguments[1], e = arguments[2], f = arguments[3];
                break;
            case 5:
                a = arguments[0], d = arguments[1], e = arguments[2], f = arguments[3], g = arguments[4];
                break;
            default:
                throw Error("Incorrect number of arguments: expected 1-5")
        }
        var h = b("<form></form>");
        h.append("<input autocomplete=off type=text value='" + g + "' />");
        var g = function () {
            "function" == typeof f && f(null)
        }, k = j.dialog(h, [{ label: d, icon: i.CANCEL, callback: g }, { label: e, icon: i.CONFIRM, callback: function () {
            "function" == typeof f && f(h.find("input[type=text]").val())
        } 
        }], { header: a, show: !1, onEscape: g });
        k.on("shown", function () {
            h.find("input[type=text]").focus(), h.on("submit", function (a) {
                a.preventDefault(), k.find(".btn-primary").click()
            })
        }), k.modal("show");
        return k
    }, dialog: function (c, d, e) {
        var i = "", j = [];
        e = e || {}, null == d ? d = [] : "undefined" == typeof d.length && (d = [d]);
        for (var k = d.length; k--; ) {
            var l = null, m = null, o = null, p = "", r = null;
            if ("undefined" == typeof d[k].label && "undefined" == typeof d[k]["class"] && "undefined" == typeof d[k].callback) {
                var l = 0, m = null, s;
                for (s in d[k])
                    if (m = s, 1 < ++l)
                        break;
                1 == l && "function" == typeof d[k][s] && (d[k].label = m, d[k].callback = d[k][s])
            }
            "function" == typeof d[k].callback && (r = d[k].callback), d[k]["class"] ? o = d[k]["class"] : k == d.length - 1 && 2 >= d.length && (o = "btn-primary"), l = d[k].label ? d[k].label : "Option " + (k + 1), d[k].icon && (p = "<i class='" + d[k].icon + "'></i> "), m = d[k].href ? d[k].href : "javascript:;", i = "<a data-handler='" + k + "' class='btn " + o + "' href='" + m + "'>" + p + "" + l + "</a>" + i, j[k] = r
        }
        k = ["<div class='bootbox modal' tabindex='-1' style='overflow:hidden;'>"];
        if (e.header) {
            o = "";
            if ("undefined" == typeof e.headerCloseButton || e.headerCloseButton)
                o = "<a href='javascript:;' class='close'>&times;</a>";
            k.push("<div class='modal-header'>" + o + "<h3>" + e.header + "</h3></div>")
        }
        k.push("<div class='modal-body'></div>"), i && k.push("<div class='modal-footer'>" + i + "</div>"), k.push("</div>");
        var w = b(k.join("\n"));
        ("undefined" == typeof e.animate ? f : e.animate) && w.addClass("fade"), (i = "undefined" == typeof e.classes ? h : e.classes) && w.addClass(i), w.find(".modal-body").html(c), w.on("hidden", function () {
            w.remove()
        }), w.on("keyup.dismiss.modal", function (a) {
            27 == a.which && e.onEscape && ("function" == typeof e.onEscape && e.onEscape(), w.modal("hide"))
        }), w.on("shown", function () {
            w.find("a.btn-primary:first").focus()
        }), w.on("click", ".modal-footer a, a.close", function (a) {
            var c = b(this).data("handler"), e = j[c], f = null;
            "undefined" != typeof c && "undefined" != typeof d[c].href || (a.preventDefault(), "function" == typeof e && (f = e()), !1 !== f && w.modal("hide"))
        }), b("body").append(w), w.modal({ backdrop: "undefined" == typeof e.backdrop ? g : e.backdrop, keyboard: !1, show: !1 }), w.on("show", function () {
            b(a).off("focusin.modal")
        }), ("undefined" == typeof e.show || !0 === e.show) && w.modal("show");
        return w
    }, modal: function () {
        var a, c, d, e = { onEscape: null, keyboard: !0, backdrop: g };
        switch (arguments.length) {
            case 1:
                a = arguments[0];
                break;
            case 2:
                a = arguments[0], "object" == typeof arguments[1] ? d = arguments[1] : c = arguments[1];
                break;
            case 3:
                a = arguments[0], c = arguments[1], d = arguments[2];
                break;
            default:
                throw Error("Incorrect number of arguments: expected 1-3")
        }
        e.header = c, d = "object" == typeof d ? b.extend(e, d) : e;
        return j.dialog(a, [], d)
    }, hideAll: function () {
        b(".bootbox").modal("hide")
    }, animate: function (a) {
        f = a
    }, backdrop: function (a) {
        g = a
    }, classes: function (a) {
        h = a
    } 
    }, k = { en: { OK: "OK", CANCEL: "Cancel", CONFIRM: "OK" }, fr: { OK: "OK", CANCEL: "Annuler", CONFIRM: "D'accord" }, de: { OK: "OK", CANCEL: "Abbrechen", CONFIRM: "Akzeptieren" }, es: { OK: "OK", CANCEL: "Cancelar", CONFIRM: "Aceptar" }, br: { OK: "OK", CANCEL: "Cancelar", CONFIRM: "Sim" }, nl: { OK: "OK", CANCEL: "Annuleren", CONFIRM: "Accepteren" }, ru: { OK: "OK", CANCEL: "Отмена", CONFIRM: "Применить" }, it: { OK: "OK", CANCEL: "Annulla", CONFIRM: "Conferma"} };
    return j
} (document, window.jQuery);
window.bootbox = bootbox, !function (a) {
    "use strict";
    var b = function (b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.timepicker.defaults, c, this.$element.data()), this.minuteStep = this.options.minuteStep || this.minuteStep, this.secondStep = this.options.secondStep || this.secondStep, this.showMeridian = this.options.showMeridian || this.showMeridian, this.showSeconds = this.options.showSeconds || this.showSeconds, this.showInputs = this.options.showInputs || this.showInputs, this.disableFocus = this.options.disableFocus || this.disableFocus, this.template = this.options.template || this.template, this.modalBackdrop = this.options.modalBackdrop || this.modalBackdrop, this.defaultTime = this.options.defaultTime || this.defaultTime, this.open = !1, this.init()
    };
    b.prototype = { constructor: b, init: function () {
        this.$element.parent().hasClass("input-append") ? (this.$element.parent(".input-append").find(".add-on").on("click", a.proxy(this.showWidget, this)), this.$element.on({ focus: a.proxy(this.highlightUnit, this), click: a.proxy(this.highlightUnit, this), keypress: a.proxy(this.elementKeypress, this), blur: a.proxy(this.blurElement, this) })) : this.template ? this.$element.on({ focus: a.proxy(this.showWidget, this), click: a.proxy(this.showWidget, this), blur: a.proxy(this.blurElement, this) }) : this.$element.on({ focus: a.proxy(this.highlightUnit, this), click: a.proxy(this.highlightUnit, this), keypress: a.proxy(this.elementKeypress, this), blur: a.proxy(this.blurElement, this) }), this.$widget = a(this.getTemplate()).appendTo("body"), this.$widget.on("click", a.proxy(this.widgetClick, this)), this.showInputs && this.$widget.find("input").on({ click: function () {
            this.select()
        }, keypress: a.proxy(this.widgetKeypress, this), change: a.proxy(this.updateFromWidgetInputs, this)
        }), this.setDefaultTime(this.defaultTime)
    }, showWidget: function (b) {
        b.stopPropagation(), b.preventDefault();
        if (!this.open) {
            this.$element.trigger("show"), this.disableFocus && this.$element.blur();
            var c = a.extend({}, this.$element.offset(), { height: this.$element[0].offsetHeight });
            this.updateFromElementVal(), a("html").trigger("click.timepicker.data-api").one("click.timepicker.data-api", a.proxy(this.hideWidget, this)), this.template === "modal" ? this.$widget.modal("show").on("hidden", a.proxy(this.hideWidget, this)) : (this.$widget.css({ top: c.top + c.height, left: c.left }), this.open || this.$widget.addClass("open")), this.open = !0, this.$element.trigger("shown")
        }
    }, hideWidget: function () {
        this.$element.trigger("hide"), this.template === "modal" ? this.$widget.modal("hide") : this.$widget.removeClass("open"), this.open = !1, this.$element.trigger("hidden")
    }, widgetClick: function (b) {
        b.stopPropagation(), b.preventDefault();
        var c = a(b.target).closest("a").data("action");
        c && (this[c](), this.update())
    }, widgetKeypress: function (b) {
        var c = a(b.target).closest("input").attr("name");
        switch (b.keyCode) {
            case 9:
                this.showMeridian ? c == "meridian" && this.hideWidget() : this.showSeconds ? c == "second" && this.hideWidget() : c == "minute" && this.hideWidget();
                break;
            case 27:
                this.hideWidget();
                break;
            case 38:
                switch (c) {
                    case "hour":
                        this.incrementHour();
                        break;
                    case "minute":
                        this.incrementMinute();
                        break;
                    case "second":
                        this.incrementSecond();
                        break;
                    case "meridian":
                        this.toggleMeridian()
                }
                this.update();
                break;
            case 40:
                switch (c) {
                    case "hour":
                        this.decrementHour();
                        break;
                    case "minute":
                        this.decrementMinute();
                        break;
                    case "second":
                        this.decrementSecond();
                        break;
                    case "meridian":
                        this.toggleMeridian()
                }
                this.update()
        }
    }, elementKeypress: function (a) {
        var b = this.$element.get(0);
        switch (a.keyCode) {
            case 0:
                break;
            case 9:
                this.updateFromElementVal(), this.showMeridian ? this.highlightedUnit != "meridian" && (a.preventDefault(), this.highlightNextUnit()) : this.showSeconds ? this.highlightedUnit != "second" && (a.preventDefault(), this.highlightNextUnit()) : this.highlightedUnit != "minute" && (a.preventDefault(), this.highlightNextUnit());
                break;
            case 27:
                this.updateFromElementVal();
                break;
            case 37:
                this.updateFromElementVal(), this.highlightPrevUnit();
                break;
            case 38:
                switch (this.highlightedUnit) {
                    case "hour":
                        this.incrementHour();
                        break;
                    case "minute":
                        this.incrementMinute();
                        break;
                    case "second":
                        this.incrementSecond();
                        break;
                    case "meridian":
                        this.toggleMeridian()
                }
                this.updateElement();
                break;
            case 39:
                this.updateFromElementVal(), this.highlightNextUnit();
                break;
            case 40:
                switch (this.highlightedUnit) {
                    case "hour":
                        this.decrementHour();
                        break;
                    case "minute":
                        this.decrementMinute();
                        break;
                    case "second":
                        this.decrementSecond();
                        break;
                    case "meridian":
                        this.toggleMeridian()
                }
                this.updateElement()
        }
        a.keyCode !== 0 && a.keyCode !== 8 && a.keyCode !== 9 && a.keyCode !== 46 && a.preventDefault()
    }, setValues: function (a) {
        if (this.showMeridian) {
            var b = a.split(" "), c = b[0].split(":");
            this.meridian = b[1]
        } else
            var c = a.split(":");
        this.hour = parseInt(c[0], 10), this.minute = parseInt(c[1], 10), this.second = parseInt(c[2], 10), isNaN(this.hour) && (this.hour = 0), isNaN(this.minute) && (this.minute = 0);
        if (this.showMeridian) {
            this.hour > 12 ? this.hour = 12 : this.hour < 1 && (this.hour = 1);
            if (this.meridian == "am" || this.meridian == "a")
                this.meridian = "AM";
            else if (this.meridian == "pm" || this.meridian == "p")
                this.meridian = "PM";
            this.meridian != "AM" && this.meridian != "PM" && (this.meridian = "AM")
        } else
            this.hour >= 24 ? this.hour = 23 : this.hour < 0 && (this.hour = 0);
        this.minute < 0 ? this.minute = 0 : this.minute >= 60 && (this.minute = 59), this.showSeconds && (isNaN(this.second) ? this.second = 0 : this.second < 0 ? this.second = 0 : this.second >= 60 && (this.second = 59)), this.updateElement(), this.updateWidget()
    }, setMeridian: function (a) {
        a == "a" || a == "am" || a == "AM" ? this.meridian = "AM" : a == "p" || a == "pm" || a == "PM" ? this.meridian = "PM" : this.updateWidget(), this.updateElement()
    }, setDefaultTime: function (a) {
        if (a) {
            if (a === "current") {
                var b = new Date, c = b.getHours(), d = Math.floor(b.getMinutes() / this.minuteStep) * this.minuteStep, e = Math.floor(b.getSeconds() / this.secondStep) * this.secondStep, f = "AM";
                this.showMeridian && (c === 0 ? c = 12 : c >= 12 ? (c > 12 && (c = c - 12), f = "PM") : f = "AM"), this.hour = c, this.minute = d, this.second = e, this.meridian = f
            } else
                a === "value" ? this.setValues(this.$element.val()) : this.setValues(a);
            this.update()
        } else
            this.hour = 0, this.minute = 0, this.second = 0
    }, formatTime: function (a, b, c, d) {
        a = a < 10 ? "0" + a : a, b = b < 10 ? "0" + b : b, c = c < 10 ? "0" + c : c;
        return a + ":" + b + (this.showSeconds ? ":" + c : "") + (this.showMeridian ? " " + d : "")
    }, getTime: function () {
        return this.formatTime(this.hour, this.minute, this.second, this.meridian)
    }, setTime: function (a) {
        this.setValues(a), this.update()
    }, update: function () {
        this.updateElement(), this.updateWidget()
    }, blurElement: function () {
        this.highlightedUnit = undefined, this.updateFromElementVal()
    }, updateElement: function () {
        var a = this.getTime();
        this.$element.val(a).change();
        switch (this.highlightedUnit) {
            case "hour":
                this.highlightHour();
                break;
            case "minute":
                this.highlightMinute();
                break;
            case "second":
                this.highlightSecond();
                break;
            case "meridian":
                this.highlightMeridian()
        }
    }, updateWidget: function () {
        this.showInputs ? (this.$widget.find("input.bootstrap-timepicker-hour").val(this.hour < 10 ? "0" + this.hour : this.hour), this.$widget.find("input.bootstrap-timepicker-minute").val(this.minute < 10 ? "0" + this.minute : this.minute), this.showSeconds && this.$widget.find("input.bootstrap-timepicker-second").val(this.second < 10 ? "0" + this.second : this.second), this.showMeridian && this.$widget.find("input.bootstrap-timepicker-meridian").val(this.meridian)) : (this.$widget.find("span.bootstrap-timepicker-hour").text(this.hour), this.$widget.find("span.bootstrap-timepicker-minute").text(this.minute < 10 ? "0" + this.minute : this.minute), this.showSeconds && this.$widget.find("span.bootstrap-timepicker-second").text(this.second < 10 ? "0" + this.second : this.second), this.showMeridian && this.$widget.find("span.bootstrap-timepicker-meridian").text(this.meridian))
    }, updateFromElementVal: function (a) {
        var b = this.$element.val();
        b && (this.setValues(b), this.updateWidget())
    }, updateFromWidgetInputs: function () {
        var b = a("input.bootstrap-timepicker-hour", this.$widget).val() + ":" + a("input.bootstrap-timepicker-minute", this.$widget).val() + (this.showSeconds ? ":" + a("input.bootstrap-timepicker-second", this.$widget).val() : "") + (this.showMeridian ? " " + a("input.bootstrap-timepicker-meridian", this.$widget).val() : "");
        this.setValues(b)
    }, getCursorPosition: function () {
        var a = this.$element.get(0);
        if ("selectionStart" in a)
            return a.selectionStart;
        if (document.selection) {
            a.focus();
            var b = document.selection.createRange(), c = document.selection.createRange().text.length;
            b.moveStart("character", -a.value.length);
            return b.text.length - c
        }
    }, highlightUnit: function () {
        var a = this.$element.get(0);
        this.position = this.getCursorPosition(), this.position >= 0 && this.position <= 2 ? this.highlightHour() : this.position >= 3 && this.position <= 5 ? this.highlightMinute() : this.position >= 6 && this.position <= 8 ? this.showSeconds ? this.highlightSecond() : this.highlightMeridian() : this.position >= 9 && this.position <= 11 && this.highlightMeridian()
    }, highlightNextUnit: function () {
        switch (this.highlightedUnit) {
            case "hour":
                this.highlightMinute();
                break;
            case "minute":
                this.showSeconds ? this.highlightSecond() : this.highlightMeridian();
                break;
            case "second":
                this.highlightMeridian();
                break;
            case "meridian":
                this.highlightHour()
        }
    }, highlightPrevUnit: function () {
        switch (this.highlightedUnit) {
            case "hour":
                this.highlightMeridian();
                break;
            case "minute":
                this.highlightHour();
                break;
            case "second":
                this.highlightMinute();
                break;
            case "meridian":
                this.showSeconds ? this.highlightSecond() : this.highlightMinute()
        }
    }, highlightHour: function () {
        this.highlightedUnit = "hour", this.$element.get(0).setSelectionRange(0, 2)
    }, highlightMinute: function () {
        this.highlightedUnit = "minute", this.$element.get(0).setSelectionRange(3, 5)
    }, highlightSecond: function () {
        this.highlightedUnit = "second", this.$element.get(0).setSelectionRange(6, 8)
    }, highlightMeridian: function () {
        this.highlightedUnit = "meridian", this.showSeconds ? this.$element.get(0).setSelectionRange(9, 11) : this.$element.get(0).setSelectionRange(6, 8)
    }, incrementHour: function () {
        if (this.showMeridian)
            if (this.hour === 11)
                this.toggleMeridian();
            else if (this.hour === 12)
                return this.hour = 1;
        if (this.hour === 23)
            return this.hour = 0;
        this.hour = this.hour + 1
    }, decrementHour: function () {
        if (this.showMeridian) {
            if (this.hour === 1)
                return this.hour = 12;
            this.hour === 12 && this.toggleMeridian()
        }
        if (this.hour === 0)
            return this.hour = 23;
        this.hour = this.hour - 1
    }, incrementMinute: function () {
        var a = this.minute + this.minuteStep - this.minute % this.minuteStep;
        a > 59 ? (this.incrementHour(), this.minute = a - 60) : this.minute = a
    }, decrementMinute: function () {
        var a = this.minute - this.minuteStep;
        a < 0 ? (this.decrementHour(), this.minute = a + 60) : this.minute = a
    }, incrementSecond: function () {
        var a = this.second + this.secondStep - this.second % this.secondStep;
        a > 59 ? (this.incrementMinute(), this.second = a - 60) : this.second = a
    }, decrementSecond: function () {
        var a = this.second - this.secondStep;
        a < 0 ? (this.decrementMinute(), this.second = a + 60) : this.second = a
    }, toggleMeridian: function () {
        this.meridian = this.meridian === "AM" ? "PM" : "AM", this.update()
    }, getTemplate: function () {
        if (this.options.templates[this.options.template])
            return this.options.templates[this.options.template];
        if (this.showInputs)
            var a = '<input type="text" name="hour" class="bootstrap-timepicker-hour" maxlength="2"/>', b = '<input type="text" name="minute" class="bootstrap-timepicker-minute" maxlength="2"/>', c = '<input type="text" name="second" class="bootstrap-timepicker-second" maxlength="2"/>', d = '<input type="text" name="meridian" class="bootstrap-timepicker-meridian" maxlength="2"/>';
        else
            var a = '<span class="bootstrap-timepicker-hour"></span>', b = '<span class="bootstrap-timepicker-minute"></span>', c = '<span class="bootstrap-timepicker-second"></span>', d = '<span class="bootstrap-timepicker-meridian"></span>';
        var e = '<table class="' + (this.showSeconds ? "show-seconds" : "") + " " + (this.showMeridian ? "show-meridian" : "") + '">' + "<tr>" + '<td><a href="#" data-action="incrementHour"><i class="icon-chevron-up"></i></a></td>' + '<td class="separator">&nbsp;</td>' + '<td><a href="#" data-action="incrementMinute"><i class="icon-chevron-up"></i></a></td>' + (this.showSeconds ? '<td class="separator">&nbsp;</td><td><a href="#" data-action="incrementSecond"><i class="icon-chevron-up"></i></a></td>' : "") + (this.showMeridian ? '<td class="separator">&nbsp;</td><td class="meridian-column"><a href="#" data-action="toggleMeridian"><i class="icon-chevron-up"></i></a></td>' : "") + "</tr>" + "<tr>" + "<td>" + a + "</td> " + '<td class="separator">:</td>' + "<td>" + b + "</td> " + (this.showSeconds ? '<td class="separator">:</td><td>' + c + "</td>" : "") + (this.showMeridian ? '<td class="separator">&nbsp;</td><td>' + d + "</td>" : "") + "</tr>" + "<tr>" + '<td><a href="#" data-action="decrementHour"><i class="icon-chevron-down"></i></a></td>' + '<td class="separator"></td>' + '<td><a href="#" data-action="decrementMinute"><i class="icon-chevron-down"></i></a></td>' + (this.showSeconds ? '<td class="separator">&nbsp;</td><td><a href="#" data-action="decrementSecond"><i class="icon-chevron-down"></i></a></td>' : "") + (this.showMeridian ? '<td class="separator">&nbsp;</td><td><a href="#" data-action="toggleMeridian"><i class="icon-chevron-down"></i></a></td>' : "") + "</tr>" + "</table>", f;
        switch (this.options.template) {
            case "modal":
                f = '<div class="bootstrap-timepicker modal hide fade in" style="top: 30%; margin-top: 0; width: 200px; margin-left: -100px;" data-backdrop="' + (this.modalBackdrop ? "true" : "false") + '">' + '<div class="modal-header">' + '<a href="#" class="close" data-dismiss="modal">×</a>' + "<h3>Pick a Time</h3>" + "</div>" + '<div class="modal-content">' + e + "</div>" + '<div class="modal-footer">' + '<a href="#" class="btn btn-primary" data-dismiss="modal">Ok</a>' + "</div>" + "</div>";
                break;
            case "dropdown":
                f = '<div class="bootstrap-timepicker dropdown-menu">' + e + "</div>"
        }
        return f
    }
    }, a.fn.timepicker = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("timepicker"), f = typeof c == "object" && c;
            e || d.data("timepicker", e = new b(this, f)), typeof c == "string" && e[c]()
        })
    }, a.fn.timepicker.defaults = { minuteStep: 15, secondStep: 15, disableFocus: !1, defaultTime: "current", showSeconds: !1, showInputs: !0, showMeridian: !0, template: "dropdown", modalBackdrop: !1, templates: {} }, a.fn.timepicker.Constructor = b
} (window.jQuery), function (a, b) {
    var c = ".inputEvent ", d = "bound.inputEvent", e = "value.inputEvent", f = "delegated.inputEvent", g = ["input", "textInput", "propertychange", "paste", "cut", "keydown", "drop", ""].join(c), h = ["focusin", "mouseover", "dragstart", ""].join(c), i = { TEXTAREA: b, INPUT: b }, j = { paste: b, cut: b, keydown: b, drop: b, textInput: b };
    a.event.special.txtinput = { setup: function (b, c, k) {
        function k(b) {
            var c = b.target;
            if (typeof d != "undefined")
                window.clearTimeout(d), d = null;
            else
                var d = !1;
            q || (b.type in j && !d ? d = window.setTimeout(function () {
                c.value !== a.data(c, e) && (a(c).trigger("txtinput"), a.data(c, e, c.value))
            }, 0) : b.type == "propertychange" ? b.originalEvent.propertyName == "value" && (a(c).trigger("txtinput"), a.data(c, e, c.value), q = !0, window.setTimeout(function () {
                q = !1
            }, 0)) : (a(c).trigger("txtinput"), a.data(c, e, c.value), q = !0, window.setTimeout(function () {
                q = !1
            }, 0)))
        }
        var l, m, n, o = this, p = a(this), q = !1;
        o.tagName in i ? (m = a.data(o, d) || 0, m || p.on(g, k), a.data(o, d, ++m), a.data(o, e, o.value)) : p.on(h, function (b) {
            var c = b.target;
            c.tagName in i && !a.data(o, f) && (m = a.data(c, d) || 0, m || a(c).on(g, k), a.data(o, f, !0), a.data(c, d, ++m), a.data(c, e, c.value))
        })
    }, teardown: function () {
        var b = a(this);
        b.off(h), b.find("input, textarea").add(b).each(function () {
            bndCount = a.data(this, d, (a.data(this, d) || 1) - 1), bndCount || b.off(g)
        })
    }
    }, a.fn.input = function (a) {
        return a ? this.on("txtinput", a) : this.trigger("txtinput")
    }
} (jQuery), function () {
    var a;
    a = function () {
        function a() {
            this.options_index = 0, this.parsed = []
        }
        a.prototype.add_node = function (a) {
            return a.nodeName.toUpperCase() === "OPTGROUP" ? this.add_group(a) : this.add_option(a)
        }, a.prototype.add_group = function (a) {
            var b, c, d, e, f, g;
            b = this.parsed.length, this.parsed.push({ array_index: b, group: !0, label: a.label, children: 0, disabled: a.disabled }), f = a.childNodes, g = [];
            for (d = 0, e = f.length; d < e; d++)
                c = f[d], g.push(this.add_option
                (c, b, a.disabled));
            return g
        }, a.prototype.add_option = function (a, b, c) {
            if (a.nodeName.toUpperCase() === "OPTION") {
                a.text !== "" ? (b != null && (this.parsed[b].children += 1), this.parsed.push({ array_index: this.parsed.length, options_index: this.options_index, value: a.value, text: a.text, html: a.innerHTML, selected: a.selected, disabled: c === !0 ? c : a.disabled, group_array_index: b, classes: a.className, style: a.style.cssText })) : this.parsed.push({ array_index: this.parsed.length, options_index: this.options_index, empty: !0 });
                return this.options_index += 1
            }
        };
        return a
    } (), a.select_to_array = function (b) {
        var c, d, e, f, g;
        d = new a, g = b.childNodes;
        for (e = 0, f = g.length; e < f; e++)
            c = g[e], d.add_node(c);
        return d.parsed
    }, this.SelectParser = a
} .call(this), function () {
    var a, b;
    b = this, a = function () {
        function a(a, b) {
            this.form_field = a, this.options = b != null ? b : {}, this.set_default_values(), this.is_multiple = this.form_field.multiple, this.set_default_text(), this.setup(), this.set_up_html(), this.register_observers(), this.finish_setup()
        }
        a.prototype.set_default_values = function () {
            var a = this;
            this.click_test_action = function (b) {
                return a.test_active_click(b)
            }, this.activate_action = function (b) {
                return a.activate_field(b)
            }, this.active_field = !1, this.mouse_on_container = !1, this.results_showing = !1, this.result_highlighted = null, this.result_single_selected = null, this.allow_single_deselect = this.options.allow_single_deselect != null && this.form_field.options[0] != null && this.form_field.options[0].text === "" ? this.options.allow_single_deselect : !1, this.disable_search_threshold = this.options.disable_search_threshold || 0, this.disable_search = this.options.disable_search || !1, this.search_contains = this.options.search_contains || !1, this.choices = 0, this.single_backstroke_delete = this.options.single_backstroke_delete || !1;
            return this.max_selected_options = this.options.max_selected_options || Infinity
        }, a.prototype.set_default_text = function () {
            this.form_field.getAttribute("data-placeholder") ? this.default_text = this.form_field.getAttribute("data-placeholder") : this.is_multiple ? this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || "Select Some Options" : this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || "Select an Option";
            return this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || "No results match"
        }, a.prototype.mouse_enter = function () {
            return this.mouse_on_container = !0
        }, a.prototype.mouse_leave = function () {
            return this.mouse_on_container = !1
        }, a.prototype.input_focus = function (a) {
            var b = this;
            if (!this.active_field)
                return setTimeout(function () {
                    return b.container_mousedown()
                }, 50)
        }, a.prototype.input_blur = function (a) {
            var b = this;
            if (!this.mouse_on_container) {
                this.active_field = !1;
                return setTimeout(function () {
                    return b.blur_test()
                }, 100)
            }
        }, a.prototype.result_add_option = function (a) {
            var b, c;
            if (!a.disabled) {
                a.dom_id = this.container_id + "_o_" + a.array_index, b = a.selected && this.is_multiple ? [] : ["active-result"], a.selected && b.push("result-selected"), a.group_array_index != null && b.push("group-option"), a.classes !== "" && b.push(a.classes), c = a.style.cssText !== "" ? ' style="' + a.style + '"' : "";
                return '<li id="' + a.dom_id + '" class="' + b.join(" ") + '"' + c + ">" + a.html + "</li>"
            }
            return ""
        }, a.prototype.results_update_field = function () {
            this.is_multiple || this.results_reset_cleanup(), this.result_clear_highlight(), this.result_single_selected = null;
            return this.results_build()
        }, a.prototype.results_toggle = function () {
            return this.results_showing ? this.results_hide() : this.results_show()
        }, a.prototype.results_search = function (a) {
            return this.results_showing ? this.winnow_results() : this.results_show()
        }, a.prototype.keyup_checker = function (a) {
            var b, c;
            b = (c = a.which) != null ? c : a.keyCode, this.search_field_scale();
            switch (b) {
                case 8:
                    if (this.is_multiple && this.backstroke_length < 1 && this.choices > 0)
                        return this.keydown_backstroke();
                    if (!this.pending_backstroke) {
                        this.result_clear_highlight();
                        return this.results_search()
                    }
                    break;
                case 13:
                    a.preventDefault();
                    if (this.results_showing)
                        return this.result_select(a);
                    break;
                case 27:
                    this.results_showing && this.results_hide();
                    return !0;
                case 9:
                case 38:
                case 40:
                case 16:
                case 91:
                case 17:
                    break;
                default:
                    return this.results_search()
            }
        }, a.prototype.generate_field_id = function () {
            var a;
            a = this.generate_random_id(), this.form_field.id = a;
            return a
        }, a.prototype.generate_random_char = function () {
            var a, b, c;
            a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", c = Math.floor(Math.random() * a.length);
            return b = a.substring(c, c + 1)
        };
        return a
    } (), b.AbstractChosen = a
} .call(this), function (a) {
    typeof a.fn.each2 == "undefined" && a.fn.extend({ each2: function (b) {
        var c = a([0]), d = -1, e = this.length;
        while (++d < e && (c.context = c[0] = this[d]) && b.call(c[0], d, c) !== !1)
            ;
        return this
    }
    })
} (jQuery), function (a, b) {
    function E(b, c) {
        var d = function () {
        };
        d.prototype = new b, d.prototype.constructor = d, d.prototype.parent = b.prototype, d.prototype = a.extend(d.prototype, c);
        return d
    }
    function D(a, c, d, e) {
        var f = a, g = !1, h, i, j, k, m;
        if (!e.createSearchChoice || !e.tokenSeparators || e.tokenSeparators.length < 1)
            return b;
        for (; ; ) {
            i = -1;
            for (j = 0, k = e.tokenSeparators.length; j < k; j++) {
                m = e.tokenSeparators[j], i = a.indexOf(m);
                if (i >= 0)
                    break
            }
            if (i < 0)
                break;
            h = a.substring(0, i), a = a.substring(i + m.length);
            if (h.length > 0) {
                h = e.createSearchChoice(h, c);
                if (h !== b && h !== null && e.id(h) !== b && e.id(h) !== null) {
                    g = !1;
                    for (j = 0, k = c.length; j < k; j++)
                        if (l(e.id(h), e.id(c[j]))) {
                            g = !0;
                            break
                        }
                    g || d(h)
                }
            }
        }
        if (f.localeCompare(a) != 0)
            return a
    }
    function C(b) {
        var c = 0;
        a.each(b, function (a, b) {
            b.children ? c += C(b.children) : c++
        });
        return c
    }
    function B(b) {
        return a.isFunction(b) ? b() : b
    }
    function A(b, c) {
        if (a.isFunction(b))
            return !0;
        if (!b)
            return !1;
        throw new Error("formatterName must be a function or a falsy value")
    }
    function z(c) {
        if (a.isFunction(c))
            return c;
        return function (d) {
            var e = d.term, f = { results: [] };
            a(c).each(function () {
                var a = this.text !== b, c = a ? this.text : this;
                (e === "" || d.matcher(e, c)) && f.results.push(a ? this : { id: this, text: this })
            }), d.callback(f)
        }
    }
    function y(b) {
        var c = b, d, e = function (a) {
            return "" + a.text
        };
        a.isArray(c) || (e = c.text, a.isFunction(e) || (d = c.text, e = function (a) {
            return a[d]
        }), c = c.results);
        return function (b) {
            var d = b.term, f = { results: [] }, g;
            d === "" ? b.callback({ results: c }) : (g = function (c, f) {
                var h, i;
                c = c[0];
                if (c.children) {
                    h = {};
                    for (i in c)
                        c.hasOwnProperty(i) && (h[i] = c[i]);
                    h.children = [], a(c.children).each2(function (a, b) {
                        g(b, h.children)
                    }), h.children.length && f.push(h)
                } else
                    b.matcher(d, e(c)) && f.push(c)
            }, a(c).each2(function (a, b) {
                g(b, f.results)
            }), b.callback(f))
        }
    }
    function x(b) {
        var c, d = 0, e = null, f = b.quietMillis || 100;
        return function (g) {
            window.clearTimeout(c), c = window.setTimeout(function () {
                d += 1;
                var c = d, f = b.data, h = b.transport || a.ajax, i = b.traditional || !1, j = b.type || "GET";
                f = f.call(this, g.term, g.page, g.context), null !== e && e.abort(), e = h.call(null, { url: b.url, dataType: b.dataType, data: f, type: j, traditional: i, success: function (a) {
                    if (!(c < d)) {
                        var e = b.results(a, g.page);
                        g.callback(e)
                    }
                }
                })
            }, f)
        }
    }
    function w(a, b, c) {
        var d = a.toUpperCase().indexOf(b.toUpperCase()), e = b.length;
        d < 0 ? c.push(a) : (c.push(a.substring(0, d)), c.push("<span class='select2-match'>"), c.push(a.substring(d, d + e)), c.push("</span>"), c.push(a.substring(d + e, a.length)))
    }
    function v(b) {
        if (!h) {
            var c = b[0].currentStyle || window.getComputedStyle(b[0], null);
            h = a("<div></div>").css({ position: "absolute", left: "-10000px", top: "-10000px", display: "none", fontSize: c.fontSize, fontFamily: c.fontFamily, fontStyle: c.fontStyle, fontWeight: c.fontWeight, letterSpacing: c.letterSpacing, textTransform: c.textTransform, whiteSpace: "nowrap" }), a("body").append(h)
        }
        h.text(b.val());
        return h.width()
    }
    function u(a) {
        a.preventDefault(), a.stopImmediatePropagation()
    }
    function t(a) {
        a.preventDefault(), a.stopPropagation()
    }
    function s(a, b) {
        var c = q(a, function (a) {
            b.trigger("scroll-debounced", a)
        });
        b.bind("scroll", function (a) {
            k(a.target, b.get()) >= 0 && c(a)
        })
    }
    function r(a) {
        var b = !1, c;
        return function () {
            b === !1 && (c = a(), b = !0);
            return c
        }
    }
    function q(a, c, d) {
        d = d || b;
        var e;
        return function () {
            var b = arguments;
            window.clearTimeout(e), e = window.setTimeout(function () {
                c.apply(d, b)
            }, a)
        }
    }
    function p(c) {
        c.bind("mousemove", function (c) {
            var d = i;
            (d === b || d.x !== c.pageX || d.y !== c.pageY) && a(c.target).trigger("mousemove-filtered", c)
        })
    }
    function o(c) {
        var d = "keyup-change-value";
        c.bind("keydown input txtinput propertychange", function () {
            a.data(c, d) === b && a.data(c, d, c.val())
        }), c.bind("keyup input txtinput propertychange", function () {
            var e = a.data(c, d);
            e !== b && c.val() !== e && (a.removeData(c, d), c.trigger("keyup-change"))
        })
    }
    function n(a) {
        return a.outerWidth(!1) - a.width()
    }
    function m(b, c) {
        var d, e, f;
        if (b === null || b.length < 1)
            return [];
        d = b.split(c);
        for (e = 0, f = d.length; e < f; e = e + 1)
            d[e] = a.trim(d[e]);
        return d
    }
    function l(a, c) {
        if (a === c)
            return !0;
        if (a === b || c === b)
            return !1;
        if (a === null || c === null)
            return !1;
        if (a.constructor === String)
            return a.localeCompare(c) === 0;
        if (c.constructor === String)
            return c.localeCompare(a) === 0;
        return !1
    }
    function k(a, b) {
        var c = 0, d = b.length, e;
        if (typeof a == "undefined")
            return -1;
        if (a.constructor === String) {
            for (; c < d; c = c + 1)
                if (a.localeCompare(b[c]) === 0)
                    return c
            } else
                for (; c < d; c = c + 1) {
                    e = b[c];
                    if (e.constructor === String) {
                        if (e.localeCompare(a) === 0)
                            return c
                    } else if (e === a)
                        return c
                }
            return -1
        }
        "use strict";
        if (window.Select2 === b) {
            var c, d, e, f, g, h, i, j;
            c = { TAB: 9, ENTER: 13, ESC: 27, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, SHIFT: 16, CTRL: 17, ALT: 18, PAGE_UP: 33, PAGE_DOWN: 34, HOME: 36, END: 35, BACKSPACE: 8, DELETE: 46, isArrow: function (a) {
                a = a.which ? a.which : a;
                switch (a) {
                    case c.LEFT:
                    case c.RIGHT:
                    case c.UP:
                    case c.DOWN:
                        return !0
                }
                return !1
            }, isControl: function (a) {
                var b = a.which;
                switch (b) {
                    case c.SHIFT:
                    case c.CTRL:
                    case c.ALT:
                        return !0
                }
                if (a.metaKey)
                    return !0;
                return !1
            }, isFunctionKey: function (a) {
                a = a.which ? a.which : a;
                return a >= 112 && a <= 123
            }
            }, j = a(document), g = function () {
                var a = 1;
                return function () {
                    return a++
                }
            } (), j.bind("mousemove", function (a) {
                i = { x: a.pageX, y: a.pageY }
            }), j.ready(function () {
                j.bind("mousedown touchend", function (c) {
                    var d = a(c.target).closest("div.select2-container").get(0), e;
                    d ? j.find("div.select2-container-active").each(function () {
                        this !== d && a(this).data("select2").blur()
                    }) : (d = a(c.target).closest("div.select2-drop").get(0), j.find("div.select2-drop-active").each(function () {
                        this !== d && a(this).data("select2").blur()
                    })), d = a(c.target), e = d.attr("for"), "LABEL" === c.target.tagName && e && e.length > 0 && (e = e.replace(/([\[\].])/g, "\\$1"), d = a("#" + e), d = d.data("select2"), d !== b && (d.focus(), c.preventDefault()))
                })
            }), d = E(Object, { bind: function (a) {
                var b = this;
                return function () {
                    a.apply(b, arguments)
                }
            }, init: function (c) {
                var d, e, f = ".select2-results";
                this.opts = c = this.prepareOpts(c),
                this.id = c.id,
                c.element.data("select2") !== b && c.element.data("select2") !== null && this.destroy(),
                this.enabled = !0,
                this.container = this.createContainer(),
                this.containerId = "s2id_" + (c.element.attr("id") || "autogen" + g()),
                this.containerSelector = "#" + this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1"),
                this.container.attr("id", this.containerId), this.body = r(function () { return c.element.closest("body") }),
                c.element.attr("class") !== b && this.container.addClass(c.element.attr("class").replace(/validate\[[\S ]+] ?/, "")),
                this.container.css(B(c.containerCss)),
                this.container.addClass(B(c.containerCssClass)),
                this.opts.element.data("select2", this).hide().before(this.container),
                this.container.data("select2", this),
                this.dropdown = this.container.find(".select2-drop"),
                this.dropdown.addClass(B(c.dropdownCssClass)),
                this.dropdown.data("select2", this),
                this.results = d = this.container.find(f),
                this.search = e = this.container.find("input.select2-input"),
                e.attr("tabIndex", this.opts.element.attr("tabIndex")),
                this.resultsPage = 0,
                this.context = null,
                this.initContainer(), this.initContainerWidth(), p(this.results), this.dropdown.delegate(f, "mousemove-filtered", this.bind(this.highlightUnderEvent)), s(80, this.results), this.dropdown.delegate(f, "scroll-debounced", this.bind(this.loadMoreIfNeeded)), a.fn.mousewheel && d.mousewheel(function (a, b, c, e) {
                    var f = d.scrollTop(), g;
                    e > 0 && f - e <= 0 ? (d.scrollTop(0), t(a)) : e < 0 && d.get(0).scrollHeight - d.scrollTop() + e <= d.height() && (d.scrollTop(d.get(0).scrollHeight - d.height()), t(a))
                }), o(e), e.bind("keyup-change", this.bind(this.updateResults)), e.bind("focus", function () {
                    e.addClass("select2-focused"), e.val() === " " && e.val("")
                }), e.bind("blur", function () {
                    e.removeClass("select2-focused")
                }), this.dropdown.delegate(f, "mouseup", this.bind(function (b) {
                    a(b.target).closest(".select2-result-selectable:not(.select2-disabled)").length > 0 ? (this.highlightUnderEvent(b), this.selectHighlighted(b)) : this.focusSearch(), t(b)
                })), this.dropdown.bind("click mouseup mousedown", function (a) {
                    a.stopPropagation()
                }), a.isFunction(this.opts.initSelection) && (this.initSelection(), this.monitorSource()), (c.element.is(":disabled") || c.element.is("[readonly='readonly']")) && this.disable()
            }, destroy: function () {
                var a = this.opts.element.data("select2");
                a !== b && (a.container.remove(), a.dropdown.remove(), a.opts.element.removeData("select2").unbind(".select2").show())
            }, prepareOpts: function (c) {
                var d, e, f, g;
                d = c.element, d.get(0).tagName.toLowerCase() === "select" && (this.select = e = c.element), e && a.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function () {
                    if (this in c)
                        throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.")
                }), c = a.extend({}, { populateResults: function (d, e, f) {
                    var g, h, i, j, k = this.opts.id, l = this;
                    g = function (d, e, h) {
                        var i, j, m, n, o, p, q, r, s;
                        for (i = 0, j = d.length; i < j; i = i + 1)
                            m = d[i], n = k(m) !== b, o = m.children && m.children.length > 0, p = a("<li></li>"), p.addClass("select2-results-dept-" + h), p.addClass("select2-result"), p.addClass(n ? "select2-result-selectable" : "select2-result-unselectable"), o && p.addClass("select2-result-with-children"), p.addClass(l.opts.formatResultCssClass(m)), q = a("<div></div>"), q.addClass("select2-result-label"), s = c.formatResult(m, q, f), s !== b && q.html(l.opts.escapeMarkup(s)), p.append(q), o && (r = a("<ul></ul>"), r.addClass("select2-result-sub"), g(m.children, r, h + 1), p.append(r)), p.data("select2-data", m), e.append(p)
                    }, g(e, d, 0)
                }
                }, a.fn.select2.defaults, c), typeof c.id != "function" && (f = c.id, c.id = function (a) {
                    return a[f]
                }), e ? (c.query = this.bind(function (c) {
                    var e = { results: [], more: !1 }, f = c.term, g, h, i;
                    i = function (a, b) {
                        var d;
                        a.is("option") ? c.matcher(f, a.text(), a) && b.push({ id: a.attr("value"), text: a.text(), element: a.get(), css: a.attr("class") }) : a.is("optgroup") && (d = { text: a.attr("label"), children: [], element: a.get(), css: a.attr("class") }, a.children().each2(function (a, b) {
                            i(b, d.children)
                        }), d.children.length > 0 && b.push(d))
                    }, g = d.children(), this.getPlaceholder() !== b && g.length > 0 && (h = g[0], a(h).text() === "" && (g = g.not(h))), g.each2(function (a, b) {
                        i(b, e.results)
                    }), c.callback(e)
                }), c.id = function (a) {
                    return a.id
                }, c.formatResultCssClass = function (a) {
                    return a.css
                }) : "query" in c || ("ajax" in c ? (g = c.element.data("ajax-url"), g && g.length > 0 && (c.ajax.url = g), c.query = x(c.ajax)) : "data" in c ? c.query = y(c.data) : "tags" in c && (c.query = z(c.tags), c.createSearchChoice = function (a) {
                    return { id: a, text: a }
                }, c.initSelection = function (b, d) {
                    var e = [];
                    a(m(b.val(), c.separator)).each(function () {
                        var b = this, d = this, f = c.tags;
                        a.isFunction(f) && (f = f()), a(f).each(function () {
                            if (l(this.id, b)) {
                                d = this.text;
                                return !1
                            }
                        }), e.push({ id: b, text: d })
                    }), d(e)
                }));
                if (typeof c.query != "function")
                    throw "query function not defined for Select2 " + c.element.attr("id");
                return c
            }, monitorSource: function () {
                this.opts.element.bind("change.select2", this.bind(function (a) {
                    this.opts.element.data("select2-change-triggered") !== !0 && this.initSelection()
                }))
            }, triggerChange: function (b) {
                b = b || {}, b = a.extend({}, b, { type: "change", val: this.val() }), this.opts.element.data("select2-change-triggered", !0), this.opts.element.trigger(b), this.opts.element.data("select2-change-triggered", !1), this.opts.element.click(), this.opts.blurOnChange && this.opts.element.blur()
            }, enable: function () {
                this.enabled || (this.enabled = !0, this.container.removeClass("select2-container-disabled"), this.opts.element.removeAttr("disabled"))
            }, disable: function () {
                !this.enabled || (this.close(), this.enabled = !1, this.container.addClass("select2-container-disabled"), this.opts.element.attr("disabled", "disabled"))
            }, opened: function () {
                return this.container.hasClass("select2-dropdown-open")
            }, positionDropdown: function () {
                var b = this.container.offset(), c = this.container.outerHeight(!0), d = this.container.outerWidth(!0), e = this.dropdown.outerHeight(!0), f = a(window).scrollTop() + document.documentElement.clientHeight, g = b.top + c, h = b.left, i = g + e <= f, j = b.top - e >= this.body().scrollTop(), k = this.dropdown.hasClass("select2-drop-above"), l, m, n;
                this.body().css("position") !== "static" && (l = this.body().offset(), g -= l.top, h -= l.left), k ? (m = !0, !j && i && (m = !1)) : (m = !1, !i && j && (m = !0)), m ? (g = b.top - e, this.container.addClass("select2-drop-above"), this.dropdown.addClass("select2-drop-above")) : (this.container.removeClass("select2-drop-above"), this.dropdown.removeClass("select2-drop-above")), n = a.extend({ top: g, left: h, width: d }, B(this.opts.dropdownCss)), this.dropdown.css(n)
            }, shouldOpen: function () {
                var b;
                if (this.opened())
                    return !1;
                b = a.Event("open"), this.opts.element.trigger(b);
                return !b.isDefaultPrevented()
            }, clearDropdownAlignmentPreference: function () {
                this.container.removeClass("select2-drop-above"), this.dropdown.removeClass("select2-drop-above")
            }, open: function () {
                if (!this.shouldOpen())
                    return !1;
                window.setTimeout(this.bind(this.opening), 1);
                return !0
            }, opening: function () {
                var b = this.containerId, c = this.containerSelector, d = "scroll." + b, e = "resize." + b;
                this.container.parents().each(function () {
                    a(this).bind(d, function () {
                        var b = a(c);
                        b.length == 0 && a(this).unbind(d), b.select2("close")
                    })
                }), !a.browser.msie || window.setTimeout(function () {
                    a(window).bind(e, function () {
                        var b = a(c);
                        b.length == 0 && a(window).unbind(e), b.select2("close")
                    })
                }, 10), this.clearDropdownAlignmentPreference(), this.search.val() === " " && this.search.val(""), this.container.addClass("select2-dropdown-open").addClass("select2-container-active"), this.updateResults(!0), this.dropdown[0] !== this.body().children().last()[0] && this.dropdown.detach().appendTo(this.body()), this.dropdown.show(), this.positionDropdown(), this.dropdown.addClass("select2-drop-active"), this.ensureHighlightVisible(), this.focusSearch()
            }, close: function () {
                if (!!this.opened()) {
                    var b = this;
                    this.container.parents().each(function () {
                        a(this).unbind("scroll." + b.containerId)
                    }), a(window).unbind("resize." + this.containerId), this.clearDropdownAlignmentPreference(), this.dropdown.hide(), this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"), this.results.empty(), this.clearSearch(), this.opts.element.trigger(a.Event("close"))
                }
            }, clearSearch: function () {
            }, ensureHighlightVisible: function () {
                var b = this.results, c, d, e, f, g, h, i;
                d = this.highlight();
                if (!(d < 0)) {
                    if (d == 0) {
                        b.scrollTop(0);
                        return
                    }
                    c = b.find(".select2-result-selectable"), e = a(c[d]), f = e.offset().top + e.outerHeight(!0), d === c.length - 1 && (i = b.find("li.select2-more-results"), i.length > 0 && (f = i.offset().top + i.outerHeight(!0))), g = b.offset().top + b.outerHeight(!0), f > g && b.scrollTop(b.scrollTop() + (f - g)), h = e.offset().top - b.offset().top, h < 0 && b.scrollTop(b.scrollTop() + h)
                }
            }, moveHighlight: function (b) {
                var c = this.results.find(".select2-result-selectable"), d = this.highlight();
                while (d > -1 && d < c.length) {
                    d += b;
                    var e = a(c[d]);
                    if (e.hasClass("select2-result-selectable") && !e.hasClass("select2-disabled")) {
                        this.highlight(d);
                        break
                    }
                }
            }, highlight: function (b) {
                var c = this.results.find(".select2-result-selectable").not(".select2-disabled");
                if (arguments.length === 0)
                    return k(c.filter(".select2-highlighted")[0], c.get());
                b >= c.length && (b = c.length - 1), b < 0 && (b = 0), c.removeClass("select2-highlighted"), a(c[b]).addClass("select2-highlighted"), this.ensureHighlightVisible()
            }, countSelectableResults: function () {
                return this.results.find(".select2-result-selectable").not(".select2-disabled").length
            }, highlightUnderEvent: function (b) {
                var c = a(b.target).closest(".select2-result-selectable");
                if (c.length > 0 && !c.is(".select2-highlighted")) {
                    var d = this.results.find(".select2-result-selectable");
                    this.highlight(d.index(c))
                } else
                    c.length == 0 && this.results.find(".select2-highlighted").removeClass("select2-highlighted")
            }, loadMoreIfNeeded: function () {
                var a = this.results, b = a.find("li.select2-more-results"), c, d = -1, e = this.resultsPage + 1, f = this, g = this.search.val(), h = this.context;
                b.length !== 0 && (c = b.offset().top - a.offset().top - a.height(), c <= 0 && (b.addClass("select2-active"), this.opts.query({ term: g, page: e, context: h, matcher: this.opts.matcher, callback: this.bind(function (c) {
                    !f.opened() || (f.opts.populateResults.call(this, a, c.results, { term: g, page: e, context: h }), c.more === !0 ? (b.detach().appendTo(a).text(f.opts.formatLoadMore(e + 1)), window.setTimeout(function () {
                        f.loadMoreIfNeeded()
                    }, 10)) : b.remove(), f.positionDropdown(), f.resultsPage = e)
                })
                })))
            }, tokenize: function () {
            }, updateResults: function (c) {
                function k(a) {
                    e.html(h.opts.escapeMarkup(a)), j()
                }
                function j() {
                    e.scrollTop(0), d.removeClass("select2-active"), h.positionDropdown()
                }
                var d = this.search, e = this.results, f = this.opts, g, h = this, i;
                if (c === !0 || this.showSearchInput !== !1 && !!this.opened()) {
                    d.addClass("select2-active");
                    if (f.maximumSelectionSize >= 1) {
                        g = this.data();
                        if (a.isArray(g) && g.length >= f.maximumSelectionSize && A(f.formatSelectionTooBig, "formatSelectionTooBig")) {
                            k("<li class='select2-selection-limit'>" + f.formatSelectionTooBig(f.maximumSelectionSize) + "</li>");
                            return
                        }
                    }
                    if (d.val().length < f.minimumInputLength) {
                        A(f.formatInputTooShort, "formatInputTooShort") ? k("<li class='select2-no-results'>" + f.formatInputTooShort(d.val(), f.minimumInputLength) + "</li>") : k("");
                        return
                    }
                    f.formatSearching() && k("<li class='select2-searching'>" + f.formatSearching() + "</li>"), i = this.tokenize(), i != b && i != null && d.val(i), this.resultsPage = 1, f.query({ term: d.val(), page: this.resultsPage, context: null, matcher: f.matcher, callback: this.bind(function (g) {
                        var i;
                        if (!!this.opened()) {
                            this.context = g.context === b ? null : g.context, this.opts.createSearchChoice && d.val() !== "" && (i = this.opts.createSearchChoice.call(null, d.val(), g.results), i !== b && i !== null && h.id(i) !== b && h.id(i) !== null && a(g.results).filter(function () {
                                return l(h.id(this), h.id(i))
                            }).length === 0 && g.results.unshift(i));
                            if (g.results.length === 0 && A(f.formatNoMatches, "formatNoMatches")) {
                                k("<li class='select2-no-results'>" + f.formatNoMatches(d.val()) + "</li>");
                                return
                            }
                            e.empty(), h.opts.populateResults.call(this, e, g.results, { term: d.val(), page: this.resultsPage, context: null }), g.more === !0 && A(f.formatLoadMore, "formatLoadMore") && (e.append("<li class='select2-more-results'>" + h.opts.escapeMarkup(f.formatLoadMore(this.resultsPage)) + "</li>"), window.setTimeout(function () {
                                h.loadMoreIfNeeded()
                            }, 10)), this.postprocessResults(g, c), j()
                        }
                    })
                    })
                }
            }, cancel: function () {
                this.close()
            }, blur: function () {
                this.close(), this.container.removeClass("select2-container-active"), this.dropdown.removeClass("select2-drop-active"), this.search[0] === document.activeElement && this.search.blur(), this.clearSearch(), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"), this.opts.element.triggerHandler("blur")
            }, focusSearch: function () {
                this.search.show(), this.search.focus(), window.setTimeout(this.bind(function () {
                    this.search.show(), this.search.focus(), this.search.val(this.search.val())
                }), 10)
            }, selectHighlighted: function () {
                var a = this.highlight(), b = this.results.find(".select2-highlighted").not(".select2-disabled"), c = b.closest(".select2-result-selectable").data("select2-data");
                c && (b.addClass("select2-disabled"), this.highlight(a), this.onSelect(c))
            }, getPlaceholder: function () {
                return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder
            }, initContainerWidth: function () {
                function c() {
                    var c, d, e, f, g;
                    if (this.opts.width === "off")
                        return null;
                    if (this.opts.width === "element")
                        return this.opts.element.outerWidth(!1) === 0 ? "auto" : this.opts.element.outerWidth(!1) + "px";
                    if (this.opts.width === "copy" || this.opts.width === "resolve") {
                        c = this.opts.element.attr("style");
                        if (c !== b) {
                            d = c.split(";");
                            for (f = 0, g = d.length; f < g; f = f + 1) {
                                e = d[f].replace(/\s/g, "").match(/width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/);
                                if (e !== null && e.length >= 1)
                                    return e[1]
                            }
                        }
                        if (this.opts.width === "resolve") {
                            c = this.opts.element.css("width");
                            if (c.indexOf("%") > 0)
                                return c;
                            return this.opts.element.outerWidth(!1) === 0 ? "auto" : this.opts.element.outerWidth(!1) + "px"
                        }
                        return null
                    }
                    return a.isFunction(this.opts.width) ? this.opts.width() : this.opts.width
                }
                var d = c.call(this);
                d !== null && this.container.attr("style", "width: " + d)
            }
            }), e = E(d, { createContainer: function () {
                var b = a("<div></div>", { "class": "select2-container" }).html(["    <a href='#' onclick='return false;' class='select2-choice'>", "   <span></span><abbr class='select2-search-choice-close' style='display:none;'></abbr>", "   <div><b></b></div>", "</a>", "    <div class='select2-drop select2-offscreen'>", "   <div class='select2-search'>", "       <input type='text' autocomplete='off' class='select2-input'/>", "   </div>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return b
            }, opening: function () {
                this.search.show(), this.parent.opening.apply(this, arguments), this.dropdown.removeClass("select2-offscreen")
            }, close: function () {
                !this.opened() || (this.parent.close.apply(this, arguments), this.dropdown.removeAttr("style").addClass("select2-offscreen").insertAfter(this.selection).show())
            }, focus: function () {
                this.close(), this.selection.focus()
            }, isFocused: function () {
                return this.selection[0] === document.activeElement
            }, cancel: function () {
                this.parent.cancel.apply(this, arguments), this.selection.focus()
            }, initContainer: function () {
                var a, b = this.container, d = this.dropdown, e = !1;
                this.selection = a = b.find(".select2-choice"), this.search.bind("keydown", this.bind(function (a) {
                    if (!!this.enabled) {
                        if (a.which === c.PAGE_UP || a.which === c.PAGE_DOWN) {
                            t(a);
                            return
                        }
                        if (this.opened())
                            switch (a.which) {
                            case c.UP:
                            case c.DOWN:
                                this.moveHighlight(a.which === c.UP ? -1 : 1), t(a);
                                return;
                            case c.TAB:
                            case c.ENTER:
                                this.selectHighlighted(), t(a);
                                return;
                            case c.ESC:
                                this.cancel(a), t(a);
                                return
                        }
                        else {
                            if (a.which === c.TAB || c.isControl(a) || c.isFunctionKey(a) || a.which === c.ESC)
                                return;
                            if (this.opts.openOnEnter === !1 && a.which === c.ENTER)
                                return;
                            this.open();
                            if (a.which === c.ENTER)
                                return
                        }
                    }
                })), this.search.bind("focus", this.bind(function () {
                    this.selection.attr("tabIndex", "-1")
                })), this.search.bind("blur", this.bind(function () {
                    this.opened() || this.container.removeClass("select2-container-active"), window.setTimeout(this.bind(function () {
                        var a = this.opts.element.attr("tabIndex");
                        a ? this.selection.attr("tabIndex", a) : this.selection.removeAttr("tabIndex")
                    }), 10)
                })), a.delegate("abbr", "mousedown", this.bind(function (a) {
                    !this.enabled || (this.clear(), u(a), this.close(), this.triggerChange(), this.selection.focus())
                })), a.bind("mousedown", this.bind(function (a) {
                    e = !0, this.opened() ? (this.close(), this.selection.focus()) : this.enabled && this.open(), e = !1
                })), d.bind("mousedown", this.bind(function () {
                    this.search.focus()
                })), a.bind("focus", this.bind(function () {
                    this.container.addClass("select2-container-active"), this.search.attr("tabIndex", "-1")
                })), a.bind("blur", this.bind(function () {
                    this.opened() || this.container.removeClass("select2-container-active"), window.setTimeout(this.bind(function () {
                        this.search.attr("tabIndex", this.opts.element.attr("tabIndex"))
                    }), 10)
                })), a.bind("keydown", this.bind(function (a) {
                    if (!!this.enabled) {
                        if (a.which == c.DOWN || a.which == c.UP || a.which == c.ENTER && this.opts.openOnEnter) {
                            this.open(), t(a);
                            return
                        }
                        if (a.which == c.DELETE || a.which == c.BACKSPACE) {
                            this.opts.allowClear && this.clear(), t(a);
                            return
                        }
                    }
                })), a.bind("keypress", this.bind(function (a) {
                    var b = String.fromCharCode(a.which);
                    this.search.val(b), this.open()
                })), this.setPlaceholder(), this.search.bind("focus", this.bind(function () {
                    this.container.addClass("select2-container-active")
                }))
            }, clear: function () {
                this.opts.element.val(""), this.selection.find("span").empty(), this.selection.removeData("select2-data"), this.setPlaceholder()
            }, initSelection: function () {
                var a;
                if (this.opts.element.val() === "" && this.opts.element.text() === "")
                    this.close(), this.setPlaceholder();
                else {
                    var c = this;
                    this.opts.initSelection.call(null, this.opts.element, function (a) {
                        a !== b && a !== null && (c.updateSelection(a), c.close(), c.setPlaceholder())
                    })
                }
            }, prepareOpts: function () {
                var b = this.parent.prepareOpts.apply(this, arguments);
                b.element.get(0).tagName.toLowerCase() === "select" && (b.initSelection = function (b, c) {
                    var d = b.find(":selected");
                    a.isFunction(c) && c({ id: d.attr("value"), text: d.text(), element: d })
                });
                return b
            }, setPlaceholder: function () {
                var a = this.getPlaceholder();
                if (this.opts.element.val() === "" && a !== b) {
                    if (this.select && this.select.find("option:first").text() !== "")
                        return;
                    this.selection.find("span").html(this.opts.escapeMarkup(a)), this.selection.addClass("select2-default"), this.selection.find("abbr").hide()
                }
            }, postprocessResults: function (b, c) {
                var d = 0, e = this, f = !0;
                this.results.find(".select2-result-selectable").each2(function (a, b) {
                    if (l(e.id(b.data("select2-data")), e.opts.element.val())) {
                        d = a;
                        return !1
                    }
                }), this.highlight(d), c === !0 && (f = this.showSearchInput = C(b.results) >= this.opts.minimumResultsForSearch, this.dropdown.find(".select2-search")[f ? "removeClass" : "addClass"]("select2-search-hidden"), a(this.dropdown, this.container)[f ? "addClass" : "removeClass"]("select2-with-searchbox"))
            }, onSelect: function (a) {
                var b = this.opts.element.val();
                this.opts.element.val(this.id(a)), this.updateSelection(a), this.close(), this.selection.focus(), l(b, this.id(a)) || this.triggerChange()
            }, updateSelection: function (a) {
                var c = this.selection.find("span"), d;
                this.selection.data("select2-data", a), c.empty(), d = this.opts.formatSelection(a, c), d !== b && c.append(this.opts.escapeMarkup(d)), this.selection.removeClass("select2-default"), this.opts.allowClear && this.getPlaceholder() !== b && this.selection.find("abbr").show()
            }, val: function () {
                var a, c = null, d = this;
                if (arguments.length === 0)
                    return this.opts.element.val();
                a = arguments[0];
                if (this.select)
                    this.select.val(a).find(":selected").each2(function (a, b) {
                        c = { id: b.attr("value"), text: b.text() };
                        return !1
                    }), this.updateSelection(c), this.setPlaceholder();
                else {
                    if (this.opts.initSelection === b)
                        throw new Error("cannot call val() if initSelection() is not defined");
                    if (!a) {
                        this.clear();
                        return
                    }
                    this.opts.element.val(a), this.opts.initSelection(this.opts.element, function (a) {
                        d.opts.element.val(a ? d.id(a) : ""), d.updateSelection(a), d.setPlaceholder()
                    })
                }
            }, clearSearch: function () {
                this.search.val("")
            }, data: function (a) {
                var c;
                if (arguments.length === 0) {
                    c = this.selection.data("select2-data"), c == b && (c = null);
                    return c
                }
                !a || a === "" ? this.clear() : (this.opts.element.val(a ? this.id(a) : ""), this.updateSelection(a))
            }
            }), f = E(d, { createContainer: function () {
                var b = a("<div></div>", { "class": "select2-container select2-container-multi" }).html(["    <ul class='select2-choices'>", "  <li class='select2-search-field'>", "    <input type='text' autocomplete='off' class='select2-input'>", "  </li>", "</ul>", "<div class='select2-drop select2-drop-multi' style='display:none;'>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return b
            }, prepareOpts: function () {
                var b = this.parent.prepareOpts.apply(this, arguments);
                b.element.get(0).tagName.toLowerCase() === "select" && (b.initSelection = function (b, c) {
                    var d = [];
                    b.find(":selected").each2(function (a, b) {
                        d.push({ id: b.attr("value"), text: b.text(), element: b })
                    }), a.isFunction(c) && c(d)
                });
                return b
            }, initContainer: function () {
                var b = ".select2-choices", d;
                this.searchContainer = this.container.find(".select2-search-field"), this.selection = d = this.container.find(b), this.search.bind("keydown", this.bind(function (a) {
                    if (!!this.enabled) {
                        if (a.which === c.BACKSPACE && this.search.val() === "") {
                            this.close();
                            var b, e = d.find(".select2-search-choice-focus");
                            if (e.length > 0) {
                                this.unselect(e.first()), this.search.width(10), t(a);
                                return
                            }
                            b = d.find(".select2-search-choice"), b.length > 0 && b.last().addClass("select2-search-choice-focus")
                        } else
                            d.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
                        if (this.opened())
                            switch (a.which) {
                            case c.UP:
                            case c.DOWN:
                                this.moveHighlight(a.which === c.UP ? -1 : 1), t(a);
                                return;
                            case c.ENTER:
                            case c.TAB:
                                this.selectHighlighted(), t(a);
                                return;
                            case c.ESC:
                                this.cancel(a), t(a);
                                return
                        }
                        if (a.which === c.TAB || c.isControl(a) || c.isFunctionKey(a) || a.which === c.BACKSPACE || a.which === c.ESC)
                            return;
                        if (this.opts.openOnEnter === !1 && a.which === c.ENTER)
                            return;
                        this.open(), (a.which === c.PAGE_UP || a.which === c.PAGE_DOWN) && t(a)
                    }
                })), this.search.bind("keyup input txtinput propertychange", this.bind(this.resizeSearch)), this.search.bind("blur", this.bind(function (a) {
                    this.container.removeClass("select2-container-active"), this.search.removeClass("select2-focused"), this.clearSearch(), a.stopImmediatePropagation()
                })), this.container.delegate(b, "mousedown", this.bind(function (b) {
                    if (!!this.enabled) {
                        if (a(b.target).closest(".select2-search-choice").length > 0)
                            return;
                        this.clearPlaceholder(), this.open(), this.focusSearch(), b.preventDefault()
                    }
                })), this.container.delegate(b, "focus", this.bind(function () {
                    !this.enabled || (this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"), this.clearPlaceholder())
                })), this.clearSearch()
            }, enable: function () {
                this.enabled || (this.parent.enable.apply(this, arguments), this.search.removeAttr("disabled"))
            }, disable: function () {
                !this.enabled || (this.parent.disable.apply(this, arguments), this.search.attr("disabled", !0))
            }, initSelection: function () {
                var a;
                this.opts.element.val() === "" && this.opts.element.text() === "" && (this.updateSelection([]), this.close(), this.clearSearch());
                if (this.select || this.opts.element.val() !== "") {
                    var c = this;
                    this.opts.initSelection.call(null, this.opts.element, function (a) {
                        a !== b && a !== null &&
                        (c.updateSelection(a), c.close(), c.clearSearch())
                    })
                }
            }, clearSearch: function () {
                var a = this.getPlaceholder();
                a !== b && this.getVal().length === 0 && this.search.hasClass("select2-focused") === !1 ? (this.search.val(a).addClass("select2-default"), this.resizeSearch()) : this.search.val(" ").width(10)
            }, clearPlaceholder: function () {
                this.search.hasClass("select2-default") ? this.search.val("").removeClass("select2-default") : this.search.val() === " " && this.search.val("")
            }, opening: function () {
                this.parent.opening.apply(this, arguments), this.clearPlaceholder(), this.resizeSearch(), this.focusSearch()
            }, close: function () {
                !this.opened() || this.parent.close.apply(this, arguments)
            }, focus: function () {
                this.close(), this.search.focus()
            }, isFocused: function () {
                return this.search.hasClass("select2-focused")
            }, updateSelection: function (b) {
                var c = [], d = [], e = this;
                a(b).each(function () {
                    k(e.id(this), c) < 0 && (c.push(e.id(this)), d.push(this))
                }), b = d, this.selection.find(".select2-search-choice").remove(), a(b).each(function () {
                    e.addSelectedChoice(this)
                }), e.postprocessResults()
            }, tokenize: function () {
                var a = this.search.val();
                a = this.opts.tokenizer(a, this.data(), this.bind(this.onSelect), this.opts), a != null && a != b && (this.search.val(a), a.length > 0 && this.open())
            }, onSelect: function (a) {
                this.addSelectedChoice(a), (this.select || !this.opts.closeOnSelect) && this.postprocessResults(), this.opts.closeOnSelect ? (this.close(), this.search.width(10)) : this.countSelectableResults() > 0 ? (this.search.width(10), this.resizeSearch(), this.positionDropdown()) : this.close(), this.triggerChange({ added: a }), this.focusSearch()
            }, cancel: function () {
                this.close(), this.focusSearch()
            }, addSelectedChoice: function (c) {
                var d = a("<li class='select2-search-choice'>    <div></div>    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a></li>"), e = this.id(c), f = this.getVal(), g;
                g = this.opts.formatSelection(c, d.find("div")), g != b && d.find("div").replaceWith("<div>" + this.opts.escapeMarkup(g) + "</div>"), d.find(".select2-search-choice-close").bind("mousedown", t).bind("click dblclick", this.bind(function (b) {
                    !this.enabled || (a(b.target).closest(".select2-search-choice").fadeOut("fast", this.bind(function () {
                        this.unselect(a(b.target)), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"), this.close(), this.focusSearch()
                    })).dequeue(), t(b))
                })).bind("focus", this.bind(function () {
                    !this.enabled || (this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"))
                })), d.data("select2-data", c), d.insertBefore(this.searchContainer), f.push(e), this.setVal(f)
            }, unselect: function (a) {
                var b = this.getVal(), c, d;
                a = a.closest(".select2-search-choice");
                if (a.length === 0)
                    throw "Invalid argument: " + a + ". Must be .select2-search-choice";
                c = a.data("select2-data"), d = k(this.id(c), b), d >= 0 && (b.splice(d, 1), this.setVal(b), this.select && this.postprocessResults()), a.remove(), this.triggerChange({ removed: c })
            }, postprocessResults: function () {
                var a = this.getVal(), b = this.results.find(".select2-result-selectable"), c = this.results.find(".select2-result-with-children"), d = this;
                b.each2(function (b, c) {
                    var e = d.id(c.data("select2-data"));
                    k(e, a) >= 0 ? c.addClass("select2-disabled").removeClass("select2-result-selectable") : c.removeClass("select2-disabled").addClass("select2-result-selectable")
                }), c.each2(function (a, b) {
                    b.find(".select2-result-selectable").length == 0 ? b.addClass("select2-disabled") : b.removeClass("select2-disabled")
                }), b.each2(function (a, b) {
                    if (!b.hasClass("select2-disabled") && b.hasClass("select2-result-selectable")) {
                        d.highlight(0);
                        return !1
                    }
                })
            }, resizeSearch: function () {
                var a, b, c, d, e, f = n(this.search);
                a = v(this.search) + 10, b = this.search.offset().left, c = this.selection.width(), d = this.selection.offset().left, e = c - (b - d) - f, e < a && (e = c - f), e < 40 && (e = c - f), this.search.width(e)
            }, getVal: function () {
                var a;
                if (this.select) {
                    a = this.select.val();
                    return a === null ? [] : a
                }
                a = this.opts.element.val();
                return m(a, this.opts.separator)
            }, setVal: function (b) {
                var c;
                this.select ? this.select.val(b) : (c = [], a(b).each(function () {
                    k(this, c) < 0 && c.push(this)
                }), this.opts.element.val(c.length === 0 ? "" : c.join(this.opts.separator)))
            }, val: function () {
                var c, d = [], e = this;
                if (arguments.length === 0)
                    return this.getVal();
                c = arguments[0];
                if (!c)
                    this.opts.element.val(""), this.updateSelection([]), this.clearSearch();
                else {
                    this.setVal(c);
                    if (this.select)
                        this.select.find(":selected").each(function () {
                            d.push({ id: a(this).attr("value"), text: a(this).text() })
                        }), this.updateSelection(d);
                    else {
                        if (this.opts.initSelection === b)
                            throw new Error("val() cannot be called if initSelection() is not defined");
                        this.opts.initSelection(this.opts.element, function (b) {
                            var c = a(b).map(e.id);
                            e.setVal(c), e.updateSelection(b), e.clearSearch()
                        })
                    }
                    this.clearSearch()
                }
            }, onSortStart: function () {
                if (this.select)
                    throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
                this.search.width(0), this.searchContainer.hide()
            }, onSortEnd: function () {
                var b = [], c = this;
                this.searchContainer.show(), this.searchContainer.appendTo(this.searchContainer.parent()), this.resizeSearch(), this.selection.find(".select2-search-choice").each(function () {
                    b.push(c.opts.id(a(this).data("select2-data")))
                }), this.setVal(b), this.triggerChange()
            }, data: function (b) {
                var c = this, d;
                if (arguments.length === 0)
                    return this.selection.find(".select2-search-choice").map(function () {
                        return a(this).data("select2-data")
                    }).get();
                b || (b = []), d = a.map(b, function (a) {
                    return c.opts.id(a)
                }), this.setVal(d), this.updateSelection(b), this.clearSearch()
            }
            }), a.fn.select2 = function () {
                var c = Array.prototype.slice.call(arguments, 0), d, g, h, i, j = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "onSortStart", "onSortEnd", "enable", "disable", "positionDropdown", "data"];
                this.each(function () {
                    if (c.length === 0 || typeof c[0] == "object")
                        d = c.length === 0 ? {} : a.extend({}, c[0]), d.element = a(this), d.element.get(0).tagName.toLowerCase() === "select" ? i = d.element.attr("multiple") : (i = d.multiple || !1, "tags" in d && (d.multiple = i = !0)), g = i ? new f : new e, g.init(d);
                    else {
                        if (typeof c[0] != "string")
                            throw "Invalid arguments to select2 plugin: " + c;
                        if (k(c[0], j) < 0)
                            throw "Unknown method: " + c[0];
                        h = b, g = a(this).data("select2");
                        if (g === b)
                            return;
                        c[0] === "container" ? h = g.container : h = g[c[0]].apply(g, c.slice(1));
                        if (h !== b)
                            return !1
                    }
                });
                return h === b ? this : h
            }, a.fn.select2.defaults = { width: "copy", closeOnSelect: !0, openOnEnter: !0, containerCss: {}, dropdownCss: {}, containerCssClass: "", dropdownCssClass: "", formatResult: function (a, b, c) {
                var d = [];
                w(a.text, c.term, d);
                return d.join("")
            }, formatSelection: function (a, c) {
                return a ? a.text : b
            }, formatResultCssClass: function (a) {
                return b
            }, formatNoMatches: function () {
                return "沒有符合的結果"
            }, formatInputTooShort: function (a, b) {
                return "請再輸入 " + (b - a.length) + " 個字"
            }, formatSelectionTooBig: function (a) {
                return "您只能選擇 " + a + " 個選項"
            }, formatLoadMore: function (a) {
                return "載入更多的資料..."
            }, formatSearching: function () {
                return "搜尋中..."
            }, minimumResultsForSearch: 0, minimumInputLength: 0, maximumSelectionSize: 0, id: function (a) {
                return a.id
            }, matcher: function (a, b) {
                return b.toUpperCase().indexOf(a.toUpperCase()) >= 0
            }, separator: ",", tokenSeparators: [], tokenizer: D, escapeMarkup: function (a) {
                if (a && typeof a == "string")
                    return a.replace(/&/g, "&amp;");
                return a
            }, blurOnChange: !1
            }, window.Select2 = { query: { ajax: x, local: y, tags: z }, util: { debounce: q, markMatch: w }, "class": { "abstract": d, single: e, multi: f} }
        }
    } (jQuery), !function (a) {
        var b = function (a) {
            this.value = { h: 1, s: 1, b: 1, a: 1 }, this.setColor(a)
        };
        b.prototype = { constructor: b, setColor: function (b) {
            b = b.toLowerCase();
            var c = this;
            a.each(d.stringParsers, function (a, e) {
                var f = e.re.exec(b), g = f && e.parse(f), h = e.space || "rgba";
                if (g) {
                    h == "hsla" ? c.value = d.RGBtoHSB.apply(null, d.HSLtoRGB.apply(null, g)) : c.value = d.RGBtoHSB.apply(null, g);
                    return !1
                }
            })
        }, setHue: function (a) {
            this.value.h = 1 - a
        }, setSaturation: function (a) {
            this.value.s = a
        }, setLightness: function (a) {
            this.value.b = 1 - a
        }, setAlpha: function (a) {
            this.value.a = parseInt((1 - a) * 100, 10) / 100
        }, toRGB: function (a, b, c, d) {
            a || (a = this.value.h, b = this.value.s, c = this.value.b), a *= 360;
            var e, f, g, h, i;
            a = a % 360 / 60, i = c * b, h = i * (1 - Math.abs(a % 2 - 1)), e = f = g = c - i, a = ~ ~a, e += [i, h, 0, 0, h, i][a], f += [h, i, i, h, 0, 0][a], g += [0, 0, h, i, i, h][a];
            return { r: Math.round(e * 255), g: Math.round(f * 255), b: Math.round(g * 255), a: d || this.value.a }
        }, toHex: function (a, b, c, d) {
            var e = this.toRGB(a, b, c, d);
            return "#" + (1 << 24 | parseInt(e.r) << 16 | parseInt(e.g) << 8 | parseInt(e.b)).toString(16).substr(1)
        }, toHSL: function (a, b, c, d) {
            a || (a = this.value.h, b = this.value.s, c = this.value.b);
            var e = a, f = (2 - b) * c, g = b * c;
            f > 0 && f <= 1 ? g /= f : g /= 2 - f, f /= 2, g > 1 && (g = 1);
            return { h: e, s: g, l: f, a: d || this.value.a }
        }
        };
        var c = function (b, c) {
            this.element = a(b);
            var e = c.format || this.element.data("color-format") || "hex";
            this.format = d.translateFormats[e], this.isInput = this.element.is("input"), this.component = this.element.is(".color") ? this.element.find(".add-on") : !1, this.picker = a(d.template).appendTo("body").on("mousedown", a.proxy(this.mousedown, this)), this.isInput ? this.element.on({ focus: a.proxy(this.show, this), keyup: a.proxy(this.update, this) }) : this.component ? this.component.on({ click: a.proxy(this.show, this) }) : this.element.on({ click: a.proxy(this.show, this) });
            if (e == "rgba" || e == "hsla")
                this.picker.addClass("alpha"), this.alpha = this.picker.find(".colorpicker-alpha")[0].style;
            this.component ? (this.picker.find(".colorpicker-color").hide(), this.preview = this.element.find("i")[0].style) : this.preview = this.picker.find("div:last")[0].style, this.base = this.picker.find("div:first")[0].style, this.update()
        };
        c.prototype = { constructor: c, show: function (b) {
            this.picker.show(), this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(), this.place(), a(window).on("resize", a.proxy(this.place, this)), this.isInput || b && (b.stopPropagation(), b.preventDefault()), a(document).on({ mousedown: a.proxy(this.hide, this) }), this.element.trigger({ type: "show", color: this.color })
        }, update: function () {
            this.color = new b(this.isInput ? this.element.prop("value") : this.element.data("color")), this.picker.find("i").eq(0).css({ left: this.color.value.s * 100, top: 100 - this.color.value.b * 100 }).end().eq(1).css("top", 100 * (1 - this.color.value.h)).end().eq(2).css("top", 100 * (1 - this.color.value.a)), this.previewColor()
        }, hide: function () {
            this.picker.hide(), a(window).off("resize", this.place), this.isInput ? this.element.prop("value", this.format.call(this)) : (a(document).off({ mousedown: this.hide }), this.component && this.element.find("input").prop("value", this.format.call(this)), this.element.data("color", this.format.call(this))), this.element.trigger({ type: "hide", color: this.color })
        }, place: function () {
            var a = this.component ? this.component.offset() : this.element.offset();
            this.picker.css({ top: a.top + this.height, left: a.left })
        }, previewColor: function () {
            this.preview.backgroundColor = this.format.call(this), this.base.backgroundColor = this.color.toHex(this.color.value.h, 1, 1, 1), this.alpha && (this.alpha.backgroundColor = this.color.toHex())
        }, pointer: null, slider: null, mousedown: function (b) {
            b.stopPropagation(), b.preventDefault();
            var c = a(b.target), e = c.closest("div");
            if (!e.is(".colorpicker")) {
                e.is(".colorpicker-saturation") ? this.slider = a.extend({}, d.sliders.saturation) : e.is(".colorpicker-hue") ? this.slider = a.extend({}, d.sliders.hue) : e.is(".colorpicker-alpha") && (this.slider = a.extend({}, d.sliders.alpha));
                var f = e.offset();
                this.slider.knob = e.find("i")[0].style, this.slider.left = b.pageX - f.left, this.slider.top = b.pageY - f.top, this.pointer = { left: b.pageX, top: b.pageY }, a(document).on({ mousemove: a.proxy(this.mousemove, this), mouseup: a.proxy(this.mouseup, this) }).trigger("mousemove")
            }
            return !1
        }, mousemove: function (a) {
            a.stopPropagation(), a.preventDefault();
            var b = Math.max(0, Math.min(this.slider.maxLeft, this.slider.left + ((a.pageX || this.pointer.left) - this.pointer.left))), c = Math.max(0, Math.min(this.slider.maxTop, this.slider.top + ((a.pageY || this.pointer.top) - this.pointer.top)));
            this.slider.knob.left = b + "px", this.slider.knob.top = c + "px", this.slider.callLeft && this.color[this.slider.callLeft].call(this.color, b / 100), this.slider.callTop && this.color[this.slider.callTop].call(this.color, c / 100), this.previewColor(), this.element.trigger({ type: "changeColor", color: this.color });
            return !1
        }, mouseup: function (b) {
            b.stopPropagation(), b.preventDefault(), a(document).off({ mousemove: this.mousemove, mouseup: this.mouseup });
            return !1
        }
        }, a.fn.colorpicker = function (b) {
            return this.each(function () {
                var d = a(this), e = d.data("colorpicker"), f = typeof b == "object" && b;
                e || d.data("colorpicker", e = new c(this, a.extend({}, a.fn.colorpicker.defaults, f))), typeof b == "string" && e[b]()
            })
        }, a.fn.colorpicker.defaults = {}, a.fn.colorpicker.Constructor = c;
        var d = { translateFormats: { rgb: function () {
            var a = this.color.toRGB();
            return "rgb(" + a.r + "," + a.g + "," + a.b + ")"
        }, rgba: function () {
            var a = this.color.toRGB();
            return "rgba(" + a.r + "," + a.g + "," + a.b + "," + a.a + ")"
        }, hsl: function () {
            var a = this.color.toHSL();
            return "hsl(" + Math.round(a.h * 360) + "," + Math.round(a.s * 100) + "%," + Math.round(a.l * 100) + "%)"
        }, hsla: function () {
            var a = this.color.toHSL();
            return "hsla(" + Math.round(a.h * 360) + "," + Math.round(a.s * 100) + "%," + Math.round(a.l * 100) + "%," + a.a + ")"
        }, hex: function () {
            return this.color.toHex()
        }
        }, sliders: { saturation: { maxLeft: 100, maxTop: 100, callLeft: "setSaturation", callTop: "setLightness" }, hue: { maxLeft: 0, maxTop: 100, callLeft: !1, callTop: "setHue" }, alpha: { maxLeft: 0, maxTop: 100, callLeft: !1, callTop: "setAlpha"} }, RGBtoHSB: function (a, b, c, d) {
            a /= 255, b /= 255, c /= 255;
            var e, f, g, h;
            g = Math.max(a, b, c), h = g - Math.min(a, b, c), e = h == 0 ? null : g == a ? (b - c) / h : g == b ? (c - a) / h + 2 : (a - b) / h + 4, e = (e + 360) % 6 * 60 / 360, f = h == 0 ? 0 : h / g;
            return { h: e || 1, s: f, b: g, a: d || 1 }
        }, HueToRGB: function (a, b, c) {
            c < 0 ? c += 1 : c > 1 && (c -= 1);
            return c * 6 < 1 ? a + (b - a) * c * 6 : c * 2 < 1 ? b : c * 3 < 2 ? a + (b - a) * (2 / 3 - c) * 6 : a
        }, HSLtoRGB: function (a, b, c, e) {
            b < 0 && (b = 0);
            if (c <= .5)
                var f = c * (1 + b);
            else
                var f = c + b - c * b;
            var g = 2 * c - f, h = a + 1 / 3, i = a, j = a - 1 / 3, k = Math.round(d.HueToRGB(g, f, h) * 255), l = Math.round(d.HueToRGB(g, f, i) * 255), m = Math.round(d.HueToRGB(g, f, j) * 255);
            return [k, l, m, e || 1]
        }, stringParsers: [{ re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/, parse: function (a) {
            return [a[1], a[2], a[3], a[4]]
        }
        }, { re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/, parse: function (a) {
            return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]]
        }
        }, { re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/, parse: function (a) {
            return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
        }
        }, { re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/, parse: function (a) {
            return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
        }
        }, { re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/, space: "hsla", parse: function (a) {
            return [a[1] / 360, a[2] / 100, a[3] / 100, a[4]]
        }
        }], template: '<div class="colorpicker dropdown-menu"><div class="colorpicker-saturation"><i><b></b></i></div><div class="colorpicker-hue"><i></i></div><div class="colorpicker-alpha"><i></i></div><div class="colorpicker-color"><div /></div></div>'
        }
    } (window.jQuery), function ($) {
        $.addFlex = function (t, p) {
            if (t.grid)
                return !1;
            p = $.extend({ height: 200, width: "auto", striped: !0, novstripe: !1, minwidth: 30, minheight: 80, resizable: !0, url: !1, method: "POST", dataType: "xml", errormsg: "Connection Error", usepager: !1, nowrap: !0, page: 1, total: 1, useRp: !0, rp: 15, rpOptions: [10, 15, 20, 30, 50], title: !1, idProperty: "id", pagestat: "Displaying {from} to {to} of {total} items", pagetext: "Page", outof: "of", findtext: "Find", params: [], procmsg: "Processing, please wait ...", query: "", qtype: "", nomsg: "No items", minColToggle: 1, showToggleBtn: !0, hideOnSubmit: !0, autoload: !0, blockOpacity: .5, preProcess: !1, addTitleToCell: !1, dblClickResize: !1, onDragCol: !1, onToggleCol: !1, onChangeSort: !1, onDoubleClick: !1, onSuccess: !1, onError: !1, onSubmit: !1 }, p), $(t).show().attr({ cellPadding: 0, cellSpacing: 0, border: 0 }).removeAttr("width");
            var g = { hset: {}, rePosDrag: function () {
                var a = 0 - this.hDiv.scrollLeft;
                this.hDiv.scrollLeft > 0 && (a -= Math.floor(p.cgwidth / 2)), $(g.cDrag).css({ top: g.hDiv.offsetTop + 1 });
                var b = this.cdpad;
                //yinghsin start
                /*$("div", g.cDrag).hide(), $("thead tr:first th:visible", this.hDiv).each(function () {
                var c = $("thead tr:first th:visible", g.hDiv).index(this), d = parseInt($("div", this).width());
                a == 0 && (a -= Math.floor(p.cgwidth / 2)), d = d + a + b, isNaN(d) && (d = 0), $("div:eq(" + c + ")", g.cDrag).css({ left: d + "px" }).show(), a = d
                })*/
                $("div", g.cDrag).hide(), $("thead tr:last th:visible", this.hDiv).each(function () {
                    var c = $("thead tr:last th:visible", g.hDiv).index(this), d = parseInt($("div", this).width());
                    a == 0 && (a -= Math.floor(p.cgwidth / 2)), d = d + a + b, isNaN(d) && (d = 0), $("div:eq(" + c + ")", g.cDrag).css({ left: d + "px" }).show(), a = d
                })
                //ying end
            }, fixHeight: function (a) {
                a = !1, a || (a = $(g.bDiv).height());
                var b = $(this.hDiv).height();
                $("div", this.cDrag).each(function () {
                    $(this).height(a + b)
                });
                var c = parseInt($(g.nDiv).height());
                c > a ? $(g.nDiv).height(a).width(200) : $(g.nDiv).height("auto").width("auto"), $(g.block).css({ height: a, marginBottom: a * -1 });
                var d = g.bDiv.offsetTop + a;
                p.height != "auto" && p.resizable && (d = g.vDiv.offsetTop), $(g.rDiv).css({ height: d })
            }, dragStart: function (a, b, c) {
                if (a == "colresize") {
                    $(g.nDiv).hide(), $(g.nBtn).hide();
                    var d = $("div", this.cDrag).index(c), e = $("th:visible div:eq(" + d + ")", this.hDiv).width();
                    $(c).addClass("dragging").siblings().hide(), $(c).prev().addClass("dragging").show(), this.colresize = { startX: b.pageX, ol: parseInt(c.style.left), ow: e, n: d }, $("body").css("cursor", "col-resize")
                } else if (a == "vresize") {
                    var f = !1;
                    $("body").css("cursor", "row-resize"), c && (f = !0, $("body").css("cursor", "col-resize")), this.vresize = { h: p.height, sy: b.pageY, w: p.width, sx: b.pageX, hgo: f }
                } else
                    //a == "colMove" && ($(g.nDiv).hide(), $(g.nBtn).hide(), this.hset = $(this.hDiv).offset(), this.hset.right = this.hset.left + $("table", this.hDiv).width(), this.hset.bottom = this.hset.top + $("table", this.hDiv).height(), this.dcol = c, this.dcoln = $("th", this.hDiv).index(c), this.colCopy = document.createElement("div"), this.colCopy.className = "colCopy", this.colCopy.innerHTML = c.innerHTML, $.browser.msie && (this.colCopy.className = "colCopy ie"), $(this.colCopy).css({ position: "absolute", "float": "left", display: "none", textAlign: c.align }), $("body").append(this.colCopy), $(this.cDrag).hide());
                $("body").noSelect()
            }, dragMove: function (a) {
                if (this.colresize) {
                    var b = this.colresize.n, c = a.pageX - this.colresize.startX, d = this.colresize.ol + c, e = this.colresize.ow + c;
                    e > p.minwidth && ($("div:eq(" + b + ")", this.cDrag).css("left", d), this.colresize.nw = e)
                } else if (this.vresize) {
                    var f = this.vresize, g = a.pageY, c = g - f.sy;
                    p.defwidth || (p.defwidth = p.width);
                    if (p.width != "auto" && !p.nohresize && f.hgo) {
                        var h = a.pageX, i = h - f.sx, j = f.w + i;
                        j > p.defwidth && (this.gDiv.style.width = j + "px", p.width = j)
                    }
                    var k = f.h + c;
                    (k > p.minheight || p.height < p.minheight) && !f.hgo && (this.bDiv.style.height = k + "px", p.height = k, this.fixHeight(k)), f = null
                } else
                    this.colCopy && ($(this.dcol).addClass("thMove").removeClass("thOver"), a.pageX > this.hset.right || a.pageX < this.hset.left || a.pageY > this.hset.bottom || a.pageY < this.hset.top ? $("body").css("cursor", "move") : $("body").css("cursor", "pointer"), $(this.colCopy).css({ top: a.pageY + 10, left: a.pageX + 20, display: "block" }))
            }, dragEnd: function () {
                if (this.colresize) {
                    var a = this.colresize.n, b = this.colresize.nw;
                    $("th:visible div:eq(" + a + ")", this.hDiv).css("width", b), $("tr", this.bDiv).each(function () {
                        var c = $("td:visible div:eq(" + a + ")", this);
                        c.css("width", b), g.addTitleToCell(c)
                    }), this.hDiv.scrollLeft = this.bDiv.scrollLeft, $("div:eq(" + a + ")", this.cDrag).siblings().show(), $(".dragging", this.cDrag).removeClass("dragging"), this.rePosDrag(), this.fixHeight(), this.colresize = !1;
                    if ($.cookies) {
                        var c = p.colModel[a].name;
                        $.cookie("flexiwidths/" + c, b)
                    }
                } else
                    this.vresize ? this.vresize = !1 : this.colCopy && ($(this.colCopy).remove(), this.dcolt != null && (this.dcoln > this.dcolt ? $("th:eq(" + this.dcolt + ")", this.hDiv).before(this.dcol) : $("th:eq(" + this.dcolt + ")", this.hDiv).after(this.dcol), this.switchCol(this.dcoln, this.dcolt), $(this.cdropleft).remove(), $(this.cdropright).remove(), this.rePosDrag(), p.onDragCol && p.onDragCol(this.dcoln, this.dcolt)), this.dcol = null, this.hset = null, this.dcoln = null, this.dcolt = null, this.colCopy = null, $(".thMove", this.hDiv).removeClass("thMove"), $(this.cDrag).show());
                $("body").css("cursor", "default"), $("body").noSelect(!1)
            }, toggleCol: function (a, b) {
                var c = $("th[axis='col" + a + "']", this.hDiv)[0], d = $("thead th", g.hDiv).index(c), e = $("input[value=" + a + "]", g.nDiv)[0];
                b == null && (b = c.hidden);
                if ($("input:checked", g.nDiv).length < p.minColToggle && !b)
                    return !1;
                b ? (c.hidden = !1, $(c).show(), e.checked = !0) : (c.hidden = !0, $(c).hide(), e.checked = !1), $("tbody tr", t).each(function () {
                    b ? $("td:eq(" + d + ")", this).show() : $("td:eq(" + d + ")", this).hide()
                }), this.rePosDrag(), p.onToggleCol && p.onToggleCol(a, b);
                return b
            }, switchCol: function (a, b) {
                $("tbody tr", t).each(function () {
                    a > b ? $("td:eq(" + b + ")", this).before($("td:eq(" + a + ")", this)) : $("td:eq(" + b + ")", this).after($("td:eq(" + a + ")", this))
                }), a > b ? $("tr:eq(" + b + ")", this.nDiv).before($("tr:eq(" + a + ")", this.nDiv)) : $("tr:eq(" + b + ")", this.nDiv).after($("tr:eq(" + a + ")", this.nDiv)), $.browser.msie && $.browser.version < 7 && ($("tr:eq(" + b + ") input", this.nDiv)[0].checked = !0), this.hDiv.scrollLeft = this.bDiv.scrollLeft
            }, scroll: function () {
                this.hDiv.scrollLeft = this.bDiv.scrollLeft, this.rePosDrag()
            }, addData: function (a) {
                p.dataType == "json" && (a = $.extend({ rows: [], page: 0, total: 0 }, a)), p.preProcess && (a = p.preProcess(a)), $(".pReload", this.pDiv).removeClass("loading"), this.loading = !1;
                if (!a) {
                    $(".pPageStat", this.pDiv).html(p.errormsg);
                    return !1
                }
                p.dataType == "xml" ? p.total = +$("rows total", a).text() : p.total = a.total;
                if (p.total == 0) {
                    $("tr, a, td, div", t).unbind(), $(t).empty(), p.pages = 1, p.page = 1, this.buildpager(), $(".pPageStat", this.pDiv).html(p.nomsg);
                    return !1
                }
                p.pages = Math.ceil(p.total / p.rp), p.dataType == "xml" ? p.page = +$("rows page", a).text() : p.page = a.page, this.buildpager();
                var b = document.createElement("tbody");
                if (p.dataType == "json")
                    $.each(a.rows, function (a, c) {
                        //每次對ROW做INSERT/UPDATE/DELTE都會TRIGGER此處
                        var d = document.createElement("tr");
                        //yinghsin start
                        var rowint = a;
                        //c.name && (d.name = c.name), c.color ? $(d).css("background", c.color) : a % 2 && p.striped && (d.className = "erow"), c[p.idProperty] && (d.id = "row" + c[p.idProperty]), $("thead tr:first th", g.hDiv).each(function () {
                        c.name && (d.name = c.name), c.color ? $(d).css("background", c.color) : a % 2 && p.striped && (d.className = "erow"), c[p.idProperty] && (d.id = "row" + c[p.idProperty]), $("thead tr:last th", g.hDiv).each(function () {
                            //yinghsin end
                            var a = document.createElement("td"), b = $(this).attr("axis").substr(3);

                            //yinghsin start
                            //a.align = this.align, typeof c.cell == "undefined" ? a.innerHTML = c[p.colModel[b].name] : typeof c.cell[b] != "undefined" ? a.innerHTML = c.cell[b] != null ? c.cell[b] : "" : a.innerHTML = c.cell[p.colModel[b].name];
                            a.align = this.align;
                            $(a).css('vertical-align', 'middle');

                            if (typeof c.cell == "undefined") { a.innerHTML = c[p.colModel[b].name]; }
                            else if (p.colModel[b].linkto == "Y") {

                                var colModel = p.colModel;
                                var i = rowint;
                                var j = b;
                                var $orgin = $('#' + p.colModel[b].name);
                                var $con;


                                if ($orgin.attr('data-mcutype') == 'select2') {

                                    //$con = $orgin.find("select").select2('destroy').clone();
                                    $orgin.find("select").select2('destroy');
                                    $con = $orgin.clone();
                                    //設定mcutype
                                    $con.data('mcutype', 'select');
                                    $con.attr('data-mcutype', 'select');
                                    $con.find('select').attr('id', 'c' + i + '_' + $con.find('select').attr('id'));

                                    //設定data,以供規則R01137設定選定的值
                                    $con.data('selectedval', c.cell[j]);
                                    $con.attr('data-selectedval', c.cell[j]);

                                    //$con.select2('val',c.cell[j]);
                                    //$con.setMcuVal(c.cell[j]);
                                    $con.css("vertical-align", "top");
                                    $con.find('label').text('').css('width', '0px');
                                    $con.find('div').css('margin-left', '0px');
                                    $con.attr('id', 'c' + i + '_' + $con.attr('id'));
                                }
                                else if ($orgin.attr('data-mcutype') == 'textbox') {
                                    $con = $orgin.clone();
                                    $con.find('input').attr('id', 'c' + i + '_' + $con.find('input').attr('id')).prop('disabled', false);
                                    $con.find('input').attr('value', cell[j]);

                                    $con.css("vertical-align", "top");
                                    $con.find('label').text('').css('width', '0px');
                                    $con.find('div').css('margin-left', '0px');
                                    $con.attr('id', 'c' + i + '_' + $con.attr('id'));
                                }
                                else if ($orgin.attr('data-mcutype') == 'checkgroup') {
                                    $con = $orgin.clone();
                                    $con.attr('id', 'c' + i + '_' + $con.attr('id'));
                                    var $input = $con.find("input");
                                    var parentname = colModel[j].name;
                                    $input.attr('onchange', "BindCheckGroup('" + $(this).find('[type="checkbox"]')[0].id + "', '" + parentname + "', '" + i + "');");

                                    $con.find("label.control-label").css('width', '0');
                                    $con.find("div").css('margin-left', '-10px');
                                    $con.find("div label").css('margin-top', '20px');
                                    $con.css('width', '30x');
                                    $con.css('margin-bottom', '0px');
                                } else if ($orgin.attr('data-mcutype') == 'button') {
                                    var $con = $orgin.clone();
                                    $con.attr('id', 'c' + i + '_' + $con.attr('id'));
                                    var $a = $con.find("a");
                                    $a.attr('id', 'ca' + i + '_' + $a.attr('id'));
                                    var parentname = colModel[j].name;
                                    //$a.attr('onclick', "bindDeleteButton('" + parentname + "', '" + $('[data-mcutype="flexigrid"]')[0].id + "');");
                                    $a.attr('onclick', "bindDeleteButton('" + parentname + "', '" + $('[data-mcutype="flexigrid"]')[0].id + "', '" + i + "');");
                                    $con.css('margin-top', '0px');
                                }

                                $con.css('top', '');
                                $con.css('left', '');
                                $con.css('position', 'relative');
                                $con.css('display', 'block');

                                a.innerHTML = '<td width="' + p.colModel[b].width + '">' + $('<div>').append($con).remove().html() + $('<div>').html() + '</td>';

                            }
                            else if (typeof c.cell[b] != "undefined") {
                                if (c.cell[b] != null) {
                                    a.innerHTML = c.cell[b];
                                }
                                else {
                                    a.innerHTML = "";
                                }
                            }
                            else { a.innerHTML = c.cell[p.colModel[b].name]; };


                            if (p.colModel[b].hide == true) { $(a).css('display', 'none'); }




                            //yinghsin end
                            var e = a.innerHTML.indexOf("<BGCOLOR=");
                            e > 0 && $(a).css("background", text.substr(e + 7, 7)), $(a).attr("abbr", $(this).attr("abbr")), $(d).append(a), a = null
                        });

                        if ($("thead", this.gDiv).length < 1)
                            for (idx = 0; idx < cell.length; idx++) {
                                var e = document.createElement("td");
                                typeof c.cell[idx] != "undefined" ? e.innerHTML = c.cell[idx] != null ? c.cell[idx] : "" : e.innerHTML = c.cell[p.colModel[idx].name], $(d).append(e), e = null
                            }
                        $(b).append(d), d = null
                    });
                else if (p.dataType == "xml") {
                    var c = 1;
                    $("rows row", a).each(function () {
                        c++;
                        var a = document.createElement("tr");
                        $(this).attr("name") && (a.name = $(this).attr("name")), $(this).attr("color") ? $(a).css("background", $(this).attr("id")) : c % 2 && p.striped && (a.className = "erow");
                        var d = $(this).attr("id");
                        d && (a.id = "row" + d), d = null;
                        var e = this;
                        //yinghsin start
                        //$("thead tr:first th", g.hDiv).each(function () {
                        $("thead tr:last th", g.hDiv).each(function () {
                            //yinghsin end
                            var b = document.createElement("td"), c = $(this).attr("axis").substr(3);
                            b.align = this.align;
                            var d = $("cell:eq(" + c + ")", e).text(), f = d.indexOf("<BGCOLOR=");
                            f > 0 && $(b).css("background", d.substr(f + 7, 7)), b.innerHTML = d, $(b).attr("abbr", $(this).attr("abbr")), $(a).append(b), b = null
                        }), $("thead", this.gDiv).length < 1 && $("cell", this).each(function () {
                            var b = document.createElement("td");
                            b.innerHTML = $(this).text(), $(a).append(b), b = null
                        }), $(b).append(a), a = null, e = null
                    })
                }
                $("tr", t).unbind(), $(t).empty(), $(t).append(b), this.addCellProp(), this.addRowProp(), this.rePosDrag(), b = null, a = null, c = null, p.onSuccess && p.onSuccess(this), p.hideOnSubmit && $(g.block).remove(), this.hDiv.scrollLeft = this.bDiv.scrollLeft, $.browser.opera && $(t).css("visibility", "visible");
                $("tr", t).find("td").find("select").each(function () {

                    //$(this).data('placeholder', '請選擇').select2({
                    //    formatNoMatches: function (term) {
                    //        return '沒有符合 "' + term + '" 的項目';
                    //    },
                    //    allowClear: true
                    //});
                    //$(this).select2('val', $(this).data('selectedval'));
                     //$(this).val($(this).data('selectedval'));        
                      $(this).val($(this).parent().parent().data('selectedval'));
                });


            }, changeSort: function (a) {
                if (this.loading)
                    return !0;
                $(g.nDiv).hide(), $(g.nBtn).hide(), p.sortname == $(a).attr("abbr") && (p.sortorder == "asc" ? p.sortorder = "desc" : p.sortorder = "asc"), $(a).addClass("sorted").siblings().removeClass("sorted"), $(".sdesc", this.hDiv).removeClass("sdesc"), $(".sasc", this.hDiv).removeClass("sasc"), $("div", a).addClass("s" + p.sortorder), p.sortname = $(a).attr("abbr"), p.onChangeSort ? p.onChangeSort(p.sortname, p.sortorder) : this.populate()
            }, buildpager: function () {
                $(".pcontrol input", this.pDiv).val(p.page), $(".pcontrol span", this.pDiv).html(p.pages);
                var a = (p.page - 1) * p.rp + 1, b = a + p.rp - 1;
                p.total < b && (b = p.total);
                var c = p.pagestat;
                c = c.replace(/{from}/, a), c = c.replace(/{to}/, b), c = c.replace(/{total}/, p.total), $(".pPageStat", this.pDiv).html(c)
            }, populate: function () {
                if (this.loading)
                    return !0;
                if (p.onSubmit) {
                    var a = p.onSubmit();
                    if (!a)
                        return !1
                }
                this.loading = !0;
                if (!p.url)
                    return !1;
                $(".pPageStat", this.pDiv).html(p.procmsg), $(".pReload", this.pDiv).addClass("loading"), $(g.block).css({ top: g.bDiv.offsetTop }), p.hideOnSubmit && $(this.gDiv).prepend(g.block), $.browser.opera && $(t).css("visibility", "hidden"), p.newp || (p.newp = 1), p.page > p.pages && (p.page = p.pages);
                var b = [{ name: "page", value: p.newp }, { name: "rp", value: p.rp }, { name: "sortname", value: p.sortname }, { name: "sortorder", value: p.sortorder }, { name: "query", value: p.query }, { name: "qtype", value: p.qtype}];
                if (p.params.length)
                    for (var c = 0; c < p.params.length; c++)
                        b[b.length] = p.params[c];
                $.ajax({ type: p.method, url: p.url, data: b, dataType: p.dataType, success: function (a) {
                    g.addData(a)
                }, error: function (a, b, c) {
                    try {
                        p.onError && p.onError(a, b, c)
                    } catch (d) {
                    }
                }
                })
            }, doSearch: function () {
                p.query = $("input[name=q]", g.sDiv).val(), p.qtype = $("select[name=qtype]", g.sDiv).val(), p.newp = 1, this.populate()
            }, changePage: function (a) {
                if (this.loading)
                    return !0;
                switch (a) {
                    case "first":
                        p.newp = 1;
                        break;
                    case "prev":
                        p.page > 1 && (p.newp = parseInt(p.page) - 1);
                        break;
                    case "next":
                        p.page < p.pages && (p.newp = parseInt(p.page) + 1);
                        break;
                    case "last":
                        p.newp = p.pages;
                        break;
                    case "input":
                        var b = parseInt($(".pcontrol input", this.pDiv).val());
                        isNaN(b) && (b = 1), b < 1 ? b = 1 : b > p.pages && (b = p.pages), $(".pcontrol input", this.pDiv).val(b), p.newp = b
                }
                if (p.newp == p.page)
                    return !1;
                p.onChangePage ? p.onChangePage(p.newp) : this.populate()
            }, addCellProp: function () {
                var hasLinkTo = false;
                for (var i = 0; i < p.colModel.length; i++) {

                    if (p.colModel[i].linkto != null && p.colModel[i].linkto != undefined && p.colModel[i].linkto == "Y") {
                        hasLinkTo = true;
                        break;
                    }
                }


                $("tbody tr td", g.bDiv).each(function () {
                    //yinghsin start
                    //var a = document.createElement("div"), b = $("td", $(this).parent()).index(this), c = $("th:eq(" + b + ")", g.hDiv).get(0);
                    //a是div,b是tdIndex,c是td
                    var a = document.createElement("div"), b = $("td", $(this).parent()).index(this), c = $("th:eq(" + b + ")", $("tr:last", g.hDiv));
                    //yinghsin end

                    //c != null && (p.sortname == $(c).attr("abbr") && p.sortname && (this.className = "sorted"), $(a).css({ textAlign: c.align, width: $("div:first", c)[0].style.width }), c.hidden && $(this).css("display", "none")), p.nowrap == !1 && $(a).css("white-space", "normal"), this.innerHTML == "" && (this.innerHTML = "&nbsp;"), a.innerHTML = this.innerHTML;
                    //yinghsin start
                    //幫a(div)設testalign,width
                    c != null && (p.sortname == $(c).attr("abbr") && p.sortname && (this.className = "sorted"), $(a).css({ textAlign: c.align, width: $("div:last", c)[0].style.width }), c.hidden && $(this).css("display", "none"));
                    //$(a).css("height", "0px");
                    p.nowrap == !1 && $(a).css("white-space", "normal");
                    this.innerHTML == "" && (this.innerHTML = "&nbsp;");
                    if ($(this).find('>*').length == 0)
                    { a.innerHTML = this.innerHTML; }

                    //yinghsin end
                    var d = $(this).parent()[0], e = !1;
                    //d.id && (e = d.id.substr(3)), c != null && c.process && c.process(a, e), $(this).empty().append(a).removeAttr("width"), g.addTitleToCell(a)
                    d.id && (e = d.id.substr(3));
                    c != null && c.process && c.process(a, e);
                    //$(this).empty().append(a).removeAttr("width"); 
                    if (hasLinkTo == false) {
                        $(this).empty().append(a).removeAttr("width");
                        //$(a).css({ "top": "auto", "margin-top": "0px" });
                    }
                    else if ($(this).find('>*').length == 0) {
                        $(a).css({ "top": "50%", "margin-top": "10px" });
                        //砍了這行下拉就能動了...
                        $(this).empty().append(a).removeAttr("width");
                    }
                    else {

                        if ($($(this).children()[0]).attr("data-mcutype") == "checkgroup") {
                            $($(this).children()[0]).css({ "top": "50%", "margin-top": "-25px" });
                        }
                        else {
                            $($(this).children()[0]).css({ "top": "50%", "margin-top": "-5px" });
                        }
                        //補一個div
                        $(this).append(a).removeAttr("width");
                    }


                    g.addTitleToCell(a);
                })
            }, getCellDim: function (a) {
                var b = parseInt($(a).height()), c = parseInt($(a).parent().height()), d = parseInt(a.style.width), e = parseInt($(a).parent().width()), f = a.offsetParent.offsetTop, g = a.offsetParent.offsetLeft, h = parseInt($(a).css("paddingLeft")), i = parseInt($(a).css("paddingTop"));
                return { ht: b, wt: d, top: f, left: g, pdl: h, pdt: i, pht: c, pwt: e }
            }, addRowProp: function () {
                $("tbody tr", g.bDiv).on("click", function (a) {
                    var b = a.target || a.srcElement;
                    if (b.href || b.type)
                        return !0;
                    !a.ctrlKey && !a.metaKey && ($(this).toggleClass("trSelected"), p.singleSelect && !g.multisel && $(this).siblings().removeClass("trSelected"), p.onClick && p.onClick(this, g, p))
                }).on("mousedown", function (a) {
                    a.shiftKey && ($(this).toggleClass("trSelected"), g.multisel = !0, this.focus(), $(g.gDiv).noSelect());
                    if (a.ctrlKey || a.metaKey)
                        $(this).toggleClass("trSelected"), g.multisel = !0, this.focus()
                }).on("mouseup", function (a) {
                    g.multisel && !a.ctrlKey && !a.metaKey && (g.multisel = !1, $(g.gDiv).noSelect(!1))
                }).on("dblclick", function () {
                    p.onDoubleClick && p.onDoubleClick(this, g, p)
                }).hover(function (a) {
                    g.multisel && a.shiftKey && $(this).toggleClass("trSelected")
                }, function () {
                }), $.browser.msie && $.browser.version < 7 && $(this).hover(function () {
                    $(this).addClass("trOver")
                }, function () {
                    $(this).removeClass("trOver")
                })
            }, combo_flag: !0, combo_resetIndex: function (a) {
                this.combo_flag && (a.selectedIndex = 0), this.combo_flag = !0
            }, combo_doSelectAction: function (selObj) {
                eval(selObj.options[selObj.selectedIndex].value), selObj.selectedIndex = 0, this.combo_flag = !1
            }, addTitleToCell: function (a) {
                if (p.addTitleToCell) {
                    var b = $("<span />").css("display", "none"), c = a instanceof jQuery ? a : $(a), d = c.outerWidth(), e = 0;
                    $("body").children(":first").before(b), b.html(c.html()), b.css("font-size", "" + c.css("font-size")), b.css("padding-left", "" + c.css("padding-left")), e = b.innerWidth(), b.remove(), e > d ? c.attr("title", c.text()) : c.removeAttr("title")
                }
            }, autoResizeColumn: function (a) {
                if (!!p.dblClickResize) {
                    var b = $("div", this.cDrag).index(a), c = $("th:visible div:eq(" + b + ")", this.hDiv), d = parseInt(a.style.left), e = c.width(), f = 0, h = 0, i = $("<span />");
                    $("body").children(":first").before(i), i.html(c.html()), i.css("font-size", "" + c.css("font-size")), i.css("padding-left", "" + c.css("padding-left")), i.css("padding-right", "" + c.css("padding-right")), f = i.width(), $("tr", this.bDiv).each(function () {
                        var a = $("td:visible div:eq(" + b + ")", this), c = 0;
                        i.html(a.html()), i.css("font-size", "" + a.css("font-size")), i.css("padding-left", "" + a.css("padding-left")), i.css("padding-right", "" + a.css("padding-right")), c = i.width(), f = c > f ? c : f
                    }), i.remove(), f = p.minWidth > f ? p.minWidth : f, h = d + (f - e), $("div:eq(" + b + ")", this.cDrag).css("left", h), this.colresize = { nw: f, n: b }, g.dragEnd()
                }
            }, pager: 0
            };
            if (p.colModel) {
                thead = document.createElement("thead");
                //Yinghsin Start
                var x = 0;
                for (var i = 0; i < p.colModel.length; i++) {
                    var cm = p.colModel[i];
                    if ($(cm).attr("hide") == false) { x++; };
                }
                var collength = x;
                var colspan0 = (x - 1) % 2;
                var colspan1 = 1;
                var colspan2 = (x - colspan1 - colspan0) / 2;
                var colspan3 = colspan2;
                var colspan4 = colspan0;

                var ff = $('#' + t.parentElement.id).attr('data-colspan-thead');
                var state = $('#' + t.parentElement.id).attr('data-allow-state');
                var ff2 = $('#' + t.parentElement.id).attr('data-colspan-thead2');
                //                if (t.parentElement.id == 'mcu-1695') {
                //                    console.info('this');
                //                }

                /*
                if (ff != null && ff != "") {
                if ($.getQueryString('hasright') == "N") {
                var fg = ff.split(',');

                for (var i = fg[0] + 1; i < fg[1]; i++) {
                if (i < p.colModel.length) {
                p.colModel[i].hide = true;
                }
                else
                { break; }




                }

                }

                }
                */

                if (ff != null && ff != "" && $('#content_hasright').val() != "N") {
                    //var trarr = fg;
                    //var trarr = [{ "colname": "", "colspan": colspan1 }, { "colname": "變更前", "colspan": colspan2 }, { "colname": "變更後", "colspan": colspan3 }, { "colname": "", "colspan": colspan4}]
                    var fg = ff.split(',');
                    var trarr = [{ "colname": "", "colspan": fg[0] }, { "colname": "變更前", "colspan": fg[1] }, { "colname": "變更後", "colspan": fg[2] }, { "colname": "", "colspan": fg[3]}];
                    var tr0 = document.createElement("tr");

                    for (i = 0; i < trarr.length; i++) {
                        if (trarr[i]['colspan'] != 0) {
                            var th = document.createElement("th");
                            $(th).attr({ "colspan": trarr[i]['colspan'], 'axis': 'xxx' + i });
                            $(th).css("text-align", "center"); //.css('background-color', 'red');
                            th.innerHTML = trarr[i]['colname'];

                            $(tr0).append(th);
                        }
                    }
                    /**/
                    $(thead).prepend(tr0);


                }
                else if (ff != null && ff != "" && $('#content_hasright').val() == "N") {
                    if (state != null && state != "") {
                        var fg = ff2.split(',');
                        var trarr = [{ "colname": "", "colspan": fg[0] }, { "colname": "變更前", "colspan": fg[1] }, { "colname": "變更後", "colspan": fg[2] }, { "colname": "", "colspan": fg[3]}];
                        var tr0 = document.createElement("tr");
                        for (i = 0; i < trarr.length; i++) {
                            if (trarr[i]['colspan'] != 0) {
                                var th = document.createElement("th");
                                $(th).attr({ "colspan": trarr[i]['colspan'], 'axis': 'xxx' + i });
                                $(th).css("text-align", "center"); //.css('background-color', 'red');
                                th.innerHTML = trarr[i]['colname'];
                                $(tr0).append(th);
                            }
                        }
                        /**/
                        $(thead).prepend(tr0);

                    }
                }






                //Yinghsin ENd
                var tr = document.createElement("tr");
                for (var i = 0; i < p.colModel.length; i++) {
                    var cm = p.colModel[i], th = document.createElement("th");
                    $(th).attr("axis", "col" + i);
                    //$(th).css("vertical-align", "middle");
                    if (cm) {
                        if ($.cookies) {
                            var cookie_width = "flexiwidths/" + cm.name;
                            $.cookie(cookie_width) != undefined && (cm.width = $.cookie(cookie_width))
                        }
                        //yinghsin start
                        if (cm.linkto == "Y" && $("#" + cm.name).attr("data-mcutype") == "checkgroup") {
                            var $cb = $("<input type='checkbox' onClick=BindCheckGroup(this,'" + cm.name + "',-1); />");
                            //var $selectAll =  $("<span><br/>全選</span>");
                            $cb.attr("id", "checkall");
                            //                            $cb.bind('change', function () {
                            //                                if ($(this).is(':checked')) {
                            //                                    alert('aaa');
                            //                                    BindCheckGroup(cm.name, 0);
                            //                                }
                            //                            });
                            $(th).append($cb);
                            //$(th).append($selectAll);
                            $(th).attr("align", "center");

                        }
                        else {
                            cm.display != undefined && (th.innerHTML = cm.display);
                        }
                        //yinghsin end

                        cm.name && cm.sortable && $(th).attr("abbr", cm.name), cm.align && (th.align = cm.align), cm.width && $(th).attr("width", cm.width), $(cm).attr("hide") && (th.hidden = !0), cm.process && (th.process = cm.process)
                    } else {
                        th.innerHTML = "", $(th).attr("width", 30);

                    }
                    $(tr).append(th)
                }
                $(thead).append(tr), $(t).prepend(thead)
            }
            g.gDiv = document.createElement("div"), g.mDiv = document.createElement("div"), g.hDiv = document.createElement("div"), g.bDiv = document.createElement("div"), g.vDiv = document.createElement("div"), g.rDiv = document.createElement("div"), g.cDrag = document.createElement("div"), g.block = document.createElement("div"), g.nDiv = document.createElement("div"), g.nBtn = document.createElement("div"), g.iDiv = document.createElement("div"), g.tDiv = document.createElement("div"), g.sDiv = document.createElement("div"), g.pDiv = document.createElement("div"), p.usepager || (g.pDiv.style.display = "none"), g.hTable = document.createElement("table"), g.gDiv.className = "flexigrid", p.width != "auto" && (g.gDiv.style.width = p.width + "px"), $.browser.msie && $(g.gDiv).addClass("ie"), p.novstripe && $(g.gDiv).addClass("novstripe"), $(t).before(g.gDiv), $(g.gDiv).append(t);
            if (p.buttons) {
                g.tDiv.className = "tDiv";
                var tDiv2 = document.createElement("div");
                tDiv2.className = "tDiv2";
                //yinghsin start
                var btn_allow_insert = $('#' + t.parentElement.parentElement.id).attr('data-flexigrid-allow-add');
                var btn_allow_update = $('#' + t.parentElement.parentElement.id).attr('data-flexigrid-allow-update');
                var btn_allow_delete = $('#' + t.parentElement.parentElement.id).attr('data-flexigrid-allow-delete');
                var btn_allow_add01 = $('#' + t.parentElement.parentElement.id).attr('data-flexigrid-allow-add01');
                var btn_allow_add02 = $('#' + t.parentElement.parentElement.id).attr('data-flexigrid-allow-add02');
                var btn_allow_edit01 = $('#' + t.parentElement.parentElement.id).attr('data-flexigrid-allow-edit01');
                var btn_allow_edit02 = $('#' + t.parentElement.parentElement.id).attr('data-flexigrid-allow-edit02');
                var btn_allow_edit03 = $('#' + t.parentElement.parentElement.id).attr('data-flexigrid-allow-edit03');
                var btn_allow_edit04 = $('#' + t.parentElement.parentElement.id).attr('data-flexigrid-allow-edit04');
                //var btn_allow_cancel = $('#' + t.parentElement.parentElement.id).attr('data-flexigrid-allow-cancel');
                //yinghsin end


                for (var i = 0; i < p.buttons.length; i++) {
                    var btn = p.buttons[i];



                    if (!btn.separator) {
                        var btnDiv = document.createElement("div");

                        btnDiv.className = "fbutton", btnDiv.innerHTML = "<div><span>" + (btn.hidename ? "&nbsp;" : btn.name) + "</span></div>", btn.bclass && $("span", btnDiv).addClass(btn.bclass).css({ paddingLeft: 20 }), btn.bimage && $("span", btnDiv).css("background", "url(" + btn.bimage + ") no-repeat center left"), $("span", btnDiv).css("paddingLeft", 20), btn.tooltip && ($("span", btnDiv)[0].title = btn.tooltip), btnDiv.onpress = btn.onpress, btnDiv.name = btn.name, btn.id && (btnDiv.id = btn.id), btn.onpress && $(btnDiv).click(function () {
                            this.onpress(this.id || this.name, g.gDiv)
                        }), $(tDiv2).append(btnDiv), $.browser.msie && $.browser.version < 7 && $(btnDiv).hover(function () {
                            $(this).addClass("fbOver")
                        }, function () {
                            $(this).removeClass("fbOver")
                        });


                        (btn_allow_insert != null && btn_allow_insert == 'N' && i == 0) && $(btnDiv).css('display', 'none');
                        (btn_allow_update != null && btn_allow_update == 'N' && i == 1) && $(btnDiv).css('display', 'none');
                        (btn_allow_delete != null && btn_allow_delete == 'N' && i == 2) && $(btnDiv).css('display', 'none');
                        (btn_allow_add01 != null && btn_allow_add01 == 'N' && i == 3) && $(btnDiv).css('display', 'none');
                        (btn_allow_add02 != null && btn_allow_add02 == 'N' && i == 4) && $(btnDiv).css('display', 'none');
                        (btn_allow_edit01 != null && btn_allow_edit01 == 'N' && i == 5) && $(btnDiv).css('display', 'none');
                        (btn_allow_edit02 != null && btn_allow_edit02 == 'N' && i == 6) && $(btnDiv).css('display', 'none');
                        (btn_allow_edit03 != null && btn_allow_edit03 == 'N' && i == 7) && $(btnDiv).css('display', 'none');
                        (btn_allow_edit04 != null && btn_allow_edit04 == 'N' && i == 8) && $(btnDiv).css('display', 'none');



                        //yinghsin start
                        //                        if (p.buttons[0].name == '新增' && btn_allow_insert != null && btn_allow_insert == 'N') {
                        //                            $(btnDiv).css('display', 'none');
                        //                        } else if (p.buttons[0].name == '新增') {
                        //                            $(btnDiv).css('display', 'inline');
                        //                        }
                        //                        if (p.buttons[1].name == '修改' && btn_allow_update != null && btn_allow_update == 'N') {
                        //                            $(btnDiv).css('display', 'none');
                        //                        } else if (p.buttons[1].name == '修改') {
                        //                            $(btnDiv).css('display', 'inline');
                        //                        }
                        //                        if (p.buttons[2].name == '刪除' && btn_allow_delete != null && btn_allow_delete == 'N') {
                        //                            $(btnDiv).css('display', 'none');
                        //                        } else if (p.buttons[2].name == '刪除') {
                        //                            $(btnDiv).css('display', 'inline');
                        //                        }
                        //                        if (p.buttons[3].name == '新增' && btn_allow_add01 != null && btn_allow_add01 == 'N') {
                        //                            $(btnDiv).css('display', 'none');
                        //                        } else if (p.buttons[3].name == '新增') {
                        //                            $(btnDiv).css('display', 'inline');
                        //                        }

                        //yinghsin end



                    } else
                        $(tDiv2).append("<div class='btnseparator'></div>")
                }
                $(g.tDiv).append(tDiv2), $(g.tDiv).append("<div style='clear:both'></div>"), $(g.gDiv).prepend(g.tDiv)
            }
            g.hDiv.className = "hDiv";
            if (p.combobuttons && $(g.tDiv2)) {
                var btnDiv = document.createElement("div");
                btnDiv.className = "fbutton";
                var tSelect = document.createElement("select");
                $(tSelect).change(function () {
                    g.combo_doSelectAction(tSelect)
                }), $(tSelect).click(function () {
                    g.combo_resetIndex(tSelect)
                }), tSelect.className = "cselect", $(btnDiv).append(tSelect);
                for (i = 0; i < p.combobuttons.length; i++) {
                    var btn = p.combobuttons[i];
                    if (!btn.separator) {
                        var btnOpt = document.createElement("option");
                        btnOpt.innerHTML = btn.name, btn.bclass && $(btnOpt).addClass(btn.bclass).css({ paddingLeft: 20 }), btn.bimage && $(btnOpt).css("background", "url(" + btn.bimage + ") no-repeat center left"), $(btnOpt).css("paddingLeft", 20), btn.tooltip && ($(btnOpt)[0].title = btn.tooltip), btn.onpress && (btnOpt.value = btn.onpress), $(tSelect).append(btnOpt)
                    }
                }
                $(".tDiv2").append(btnDiv)
            }
            $(t).before(g.hDiv), g.hTable.cellPadding = 0, g.hTable.cellSpacing = 0, $(g.hDiv).append('<div class="hDivBox"></div>'), $("div", g.hDiv).append(g.hTable);
            //YingHsin Start
            //var thead = $("thead:first", t).get(0);
            var thead = $("thead:last", t).get(0);
            //YingHsin ENd
            thead && $(g.hTable).append(thead), thead = null;
            if (!p.colmodel)
                var ci = 0;
            //YingHsin Start
            //$("thead tr:first th", g.hDiv).each(function () {
            $("thead tr:last th", g.hDiv).each(function () {
                //YingHsin ENd
                var a = document.createElement("div");

                $(this).attr("abbr") && ($(this).click(function (a) {
                    if (!$(this).hasClass("thOver"))
                        return !1;
                    var b = a.target || a.srcElement;
                    if (b.href || b.type)
                        return !0;
                    g.changeSort(this)
                }), $(this).attr("abbr") == p.sortname && (this.className = "sorted", a.className = "s" + p.sortorder)),
                    this.hidden && $(this).hide(),
                    p.colmodel || $(this).attr("axis", "col" + ci++),
                    $(a).css({ textAlign: this.align, width: this.width + "px" });
                a.innerHTML = this.innerHTML,
                    $(this).empty().append(a).removeAttr("width").mousedown(function (a) {
                        g.dragStart("colMove", a, this)
                    }).hover(function () {
                        !g.colresize && !$(this).hasClass("thMove") && !g.colCopy && $(this).addClass("thOver");
                        if ($(this).attr("abbr") != p.sortname && !g.colCopy && !g.
                colresize && $(this).attr("abbr"))
                            $("div", this).addClass("s" + p.sortorder);
                        else if ($(this).attr("abbr") == p.sortname && !g.colCopy && !g.colresize && $(this).attr("abbr")) {
                            var a = p.sortorder == "asc" ? "desc" : "asc";
                            $("div", this).removeClass("s" + p.sortorder).addClass("s" + a)
                        }
                        if (g.colCopy) {
                            var b = $("th", g.hDiv).index(this);
                            if (b == g.dcoln)
                                return !1;
                            b < g.dcoln ? $(this).append(g.cdropleft) : $(this).append(g.cdropright), g.dcolt = b
                        } else if (!g.colresize) {
                            var c = $("th:visible", g.hDiv).index(this), d = parseInt($("div:eq(" + c + ")", g.cDrag).css("left")), e = jQuery(g.nBtn).outerWidth(), f = d - e + Math.floor(p.cgwidth / 2);
                            $(g.nDiv).hide(), $(g.nBtn).hide(), $(g.nBtn).css({ left: f, top: g.hDiv.offsetTop }).show();
                            var h = parseInt($(g.nDiv).width());
                            $(g.nDiv).css({ top: g.bDiv.offsetTop }), f + h > $(g.gDiv).width() ? $(g.nDiv).css("left", d - h + 1) : $(g.nDiv).css("left", f), $(this).hasClass("sorted") ? $(g.nBtn).addClass("srtd") : $(g.nBtn).removeClass("srtd")
                        }
                    }, function () {
                        $(this).removeClass("thOver");
                        if ($(this).attr("abbr") != p.sortname)
                            $("div", this).removeClass("s" + p.sortorder);
                        else if ($(this).attr("abbr") == p.sortname) {
                            var a = p.sortorder == "asc" ? "desc" : "asc";
                            $("div", this).addClass("s" + p.sortorder).removeClass("s" + a)
                        }
                        g.colCopy && ($(g.cdropleft).remove(), $(g.cdropright).remove(), g.dcolt = null)
                    })
            }), g.bDiv.className = "bDiv", $(t).before(g.bDiv), $(g.bDiv).css({ height: p.height == "auto" ? "auto" : p.height + "px" }).scroll(function (a) {
                g.scroll()
            }).append(t), p.height == "auto" && $("table", g.bDiv).addClass("autoht"), g.addCellProp(), g.addRowProp();
            //YingHsin Start
            //var cdcol = $("thead tr:first th:first", g.hDiv).get(0);
            var cdcol = $("thead tr:last th:first", g.hDiv).get(0);
            //YingHsin End
            if (cdcol != null) {
                g.cDrag.className = "cDrag", g.cdpad = 0, g.cdpad += isNaN(parseInt($("div", cdcol).css("borderLeftWidth"))) ? 0 : parseInt($("div", cdcol).css("borderLeftWidth")), g.cdpad += isNaN(parseInt($("div", cdcol).css("borderRightWidth"))) ? 0 : parseInt($("div", cdcol).css("borderRightWidth")), g.cdpad += isNaN(parseInt($("div", cdcol).css("paddingLeft"))) ? 0 : parseInt($("div", cdcol).css("paddingLeft")), g.cdpad += isNaN(parseInt($("div", cdcol).css("paddingRight"))) ? 0 : parseInt($("div", cdcol).css("paddingRight")), g.cdpad += isNaN(parseInt($(cdcol).css("borderLeftWidth"))) ? 0 : parseInt($(cdcol).css("borderLeftWidth")), g.cdpad += isNaN(parseInt($(cdcol).css("borderRightWidth"))) ? 0 : parseInt($(cdcol).css("borderRightWidth")), g.cdpad += isNaN(parseInt($(cdcol).css("paddingLeft"))) ? 0 : parseInt($(cdcol).css("paddingLeft")), g.cdpad += isNaN(parseInt($(cdcol).css("paddingRight"))) ? 0 : parseInt($(cdcol).css("paddingRight")), $(g.bDiv).before(g.cDrag);
                var cdheight = $(g.bDiv).height(), hdheight = $(g.hDiv).height();
                //YingHsin Start
                //$(g.cDrag).css({ top: -hdheight + "px" }), $("thead tr:first th", g.hDiv).each(function () {
                $(g.cDrag).css({ top: -hdheight + "px" }), $("thead tr:last th", g.hDiv).each(function () {
                    //YingHsin End
                    var a = document.createElement("div");
                    $(g.cDrag).append(a);
                    p.cgwidth || (p.cgwidth = $(a).width());
                    $(a).css({ height: cdheight + hdheight }).mousedown(function (a) {
                        g.dragStart("colresize", a, this)
                    }).dblclick(function (a) {
                        g.autoResizeColumn(this)
                    }), $.browser.msie && $.browser.version < 7 && (g.fixHeight($(g.gDiv).height()), $(a).hover(function () {
                        g.fixHeight(), $(this).addClass("dragging")
                    }, function () {
                        g.colresize || $(this).removeClass("dragging")
                    }))
                })
            }
            p.striped && $("tbody tr:odd", g.bDiv).addClass("erow"), p.resizable && p.height != "auto" && (g.vDiv.className = "vGrip", $(g.vDiv).mousedown(function (a) {
                g.dragStart("vresize", a)
            }).html("<span></span>"), $(g.bDiv).after(g.vDiv)), p.resizable && p.width != "auto" && !p.nohresize && (g.rDiv.className = "hGrip", $(g.rDiv).mousedown(function (a) {
                g.dragStart("vresize", a, !0)
            }).html("<span></span>").css("height", $(g.gDiv).height()), $.browser.msie && $.browser.version < 7 && $(g.rDiv).hover(function () {
                $(this).addClass("hgOver")
            }, function () {
                $(this).removeClass("hgOver")
            }), $(g.gDiv).append(g.rDiv));
            if (p.usepager) {
                g.pDiv.className = "pDiv", g.pDiv.innerHTML = '<div class="pDiv2"></div>', $(g.bDiv).after(g.pDiv);
                var html = ' <div class="pGroup"> <div class="pFirst pButton"><span></span></div><div class="pPrev pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"><span class="pcontrol">' + p.pagetext + ' <input type="text" size="4" value="1" /> ' + p.outof + ' <span> 1 </span></span></div> <div class="btnseparator"></div> <div class="pGroup"> <div class="pNext pButton"><span></span></div><div class="pLast pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"> <div class="pReload pButton"><span></span></div> </div> <div class="btnseparator"></div> <div class="pGroup"><span class="pPageStat"></span></div>';
                $("div", g.pDiv).html(html), $(".pReload", g.pDiv).click(function () {
                    g.populate()
                }), $(".pFirst", g.pDiv).click(function () {
                    g.changePage("first")
                }), $(".pPrev", g.pDiv).click(function () {
                    g.changePage("prev")
                }), $(".pNext", g.pDiv).click(function () {
                    g.changePage("next")
                }), $(".pLast", g.pDiv).click(function () {
                    g.changePage("last")
                }), $(".pcontrol input", g.pDiv).keydown(function (a) {
                    a.keyCode == 13 && g.changePage("input")
                }), $.browser.msie && $.browser.version < 7 && $(".pButton", g.pDiv).hover(function () {
                    $(this).addClass("pBtnOver")
                }, function () {
                    $(this).removeClass("pBtnOver")
                });
                if (p.useRp) {
                    var opt = "", sel = "";
                    for (var nx = 0; nx < p.rpOptions.length; nx++)
                        p.rp == p.rpOptions[nx] ? sel = 'selected="selected"' : sel = "", opt += "<option value='" + p.rpOptions[nx] + "' " + sel + " >" + p.rpOptions[nx] + "&nbsp;&nbsp;</option>";
                    $(".pDiv2", g.pDiv).prepend("<div class='pGroup'><select name='rp'>" + opt + "</select></div> <div class='btnseparator'></div>"), $("select", g.pDiv).change(function () {
                        p.onRpChange ? p.onRpChange(+this.value) : (p.newp = 1, p.rp = +this.value, g.populate())
                    })
                }
                if (p.searchitems) {
                    $(".pDiv2", g.pDiv).prepend("<div class='pGroup'> <div class='pSearch pButton'><span></span></div> </div>  <div class='btnseparator'></div>"), $(".pSearch", g.pDiv).click(function () {
                        $(g.sDiv).slideToggle("fast", function () {
                            $(".sDiv:visible input:first", g.gDiv).trigger("focus")
                        })
                    }), g.sDiv.className = "sDiv";
                    var sitems = p.searchitems, sopt = "", sel = "";
                    for (var s = 0; s < sitems.length; s++)
                        p.qtype == "" && sitems[s].isdefault == !0 ? (p.qtype = sitems[s].name, sel = 'selected="selected"') : sel = "", sopt += "<option value='" + sitems[s].name + "' " + sel + " >" + sitems[s].display + "&nbsp;&nbsp;</option>";
                    p.qtype == "" && (p.qtype = sitems[0].name), $(g.sDiv).append("<div class='sDiv2'>" + p.findtext + " <input type='text' value='" + p.query + "' size='30' name='q' class='qsbox' /> " + " <select name='qtype'>" + sopt + "</select></div>"), $("input[name=q]", g.sDiv).keydown(function (a) {
                        a.keyCode == 13 && g.doSearch()
                    }), $("select[name=qtype]", g.sDiv).keydown(function (a) {
                        a.keyCode == 13 && g.doSearch()
                    }), $("input[value=Clear]", g.sDiv).click(function () {
                        $("input[name=q]", g.sDiv).val(""), p.query = "", g.doSearch()
                    }), $(g.bDiv).after(g.sDiv)
                }
            }
            $(g.pDiv, g.sDiv).append("<div style='clear:both'></div>"), p.title && (g.mDiv.className = "mDiv", g.mDiv.innerHTML = '<div class="ftitle">' + p.title + "</div>", $(g.gDiv).prepend(g.mDiv), p.showTableToggleBtn && ($(g.mDiv).append('<div class="ptogtitle" title="Minimize/Maximize Table"><span></span></div>'), $("div.ptogtitle", g.mDiv).click(function () {
                $(g.gDiv).toggleClass("hideBody"), $(this).toggleClass("vsble")
            }))), g.cdropleft = document.createElement("span"), g.cdropleft.className = "cdropleft", g.cdropright = document.createElement("span"), g.cdropright.className = "cdropright", g.block.className = "gBlock";
            var gh = $(g.bDiv).height(), gtop = g.bDiv.offsetTop;
            $(g.block).css({ width: g.bDiv.style.width, height: gh, background: "white", position: "relative", marginBottom: gh * -1, zIndex: 1, top: gtop, left: "0px" }), $(g.block).fadeTo(0, p.blockOpacity);
            if ($("th", g.hDiv).length) {
                g.nDiv.className = "nDiv", g.nDiv.innerHTML = "<table cellpadding='0' cellspacing='0'><tbody></tbody></table>", $(g.nDiv).css({ marginBottom: gh * -1, display: "none", top: gtop }).noSelect();
                var cn = 0;
                $("th div", g.hDiv).each(function () {
                    var a = $("th[axis='col" + cn + "']", g.hDiv)[0], b = 'checked="checked"';
                    a.style.display == "none" && (b = ""), $("tbody", g.nDiv).append('<tr><td class="ndcol1"><input type="checkbox" ' + b + ' class="togCol" value="' + cn + '" /></td><td class="ndcol2">' + this.innerHTML + "</td></tr>"), cn++
                }), $.browser.msie && $.browser.version < 7 && $("tr", g.nDiv).hover(function () {
                    $(this).addClass("ndcolover")
                }, function () {
                    $(this).removeClass("ndcolover")
                }), $("td.ndcol2", g.nDiv).click(function () {
                    if ($("input:checked", g.nDiv).length <= p.minColToggle && $(this).prev().find("input")[0].checked)
                        return !1;
                    return g.toggleCol($(this).prev().find("input").val())
                }), $("input.togCol", g.nDiv).click(function () {
                    if ($("input:checked", g.nDiv).length < p.minColToggle && this.checked == !1)
                        return !1;
                    $(this).parent().next().trigger("click")
                }), $(g.gDiv).prepend(g.nDiv), $(g.nBtn).addClass("nBtn").html("<div></div>").attr("title", "Hide/Show Columns").click(function () {
                    $(g.nDiv).toggle();
                    return !0
                }), p.showToggleBtn && $(g.gDiv).prepend(g.nBtn)
            }
            $(g.iDiv).addClass("iDiv").css({ display: "none" }), $(g.bDiv).append(g.iDiv), $(g.bDiv).hover(function () {
                $(g.nDiv).hide(), $(g.nBtn).hide()
            }, function () {
                g.multisel && (g.multisel = !1)
            }), $(g.gDiv).hover(function () {
            }, function () {
                $(g.nDiv).hide(), $(g.nBtn).hide()
            }), $(document).mousemove(function (a) {
                g.dragMove(a)
            }).mouseup(function (a) {
                g.dragEnd()
            }).hover(function () {
            }, function () {
                g.dragEnd()
            }), $.browser.msie && $.browser.version < 7 && ($(".hDiv,.bDiv,.mDiv,.pDiv,.vGrip,.tDiv, .sDiv", g.gDiv).css({ width: "100%" }), $(g.gDiv).addClass("ie6"), p.width != "auto" && $(g.gDiv).addClass("ie6fullwidthbug")), g.rePosDrag(), g.fixHeight(), t.p = p, t.grid = g, p.url && p.autoload && g.populate();
            return t
        };
        var docloaded = !1;
        $(document).ready(function () {
            docloaded = !0
        }), $.fn.flexigrid = function (a) {
            return this.each(function () {
                if (!docloaded) {
                    $(this).hide();
                    var b = this;
                    $(document).ready(function () {
                        $.addFlex(b, a)
                    })
                } else
                    $.addFlex(this, a)
            })
        }, $.fn.flexReload = function (a) {
            return this.each(function () {
                this.grid && this.p.url && this.grid.populate()
            })
        }, $.fn.flexOptions = function (a) {
            return this.each(function () {
                this.grid && $.extend(this.p, a)
            })
        }, $.fn.flexToggleCol = function (a, b) {
            return this.each(function () {
                this.grid && this.grid.toggleCol(a, b)
            })
        }, $.fn.flexAddData = function (a) {
            return this.each(function () {
                this.grid && this.grid.addData(a)
            })
        }, $.fn.noSelect = function (a) {
            var b = a == null ? !0 : a;
            return b ? this.each(function () {
                $.browser.msie || $.browser.safari ? $(this).bind("selectstart", function () {
                    return !1
                }) : $.browser.mozilla ? ($(this).css("MozUserSelect", "none"), $("body").trigger("focus")) : $.browser.opera ? $(this).bind("mousedown", function () {
                    return !1
                }) : $(this).attr("unselectable", "on")
            }) : this.each(function () {
                $.browser.msie || $.browser.safari ? $(this).unbind("selectstart") : $.browser.mozilla ? $(this).css("MozUserSelect", "inherit") : $.browser.opera ? $(this).unbind("mousedown") : $(this).removeAttr("unselectable", "on")
            })
        }, $.fn.flexSearch = function (a) {
            return this.each(function () {
                this.grid && this.p.searchitems && this.grid.doSearch()
            })
        }, $.fn.bandwidth = function (a) {
            var b = { uploadSize: 307200, speedUnit: "KB", minSpeed: 5 };
            a = $.extend(b, a);
            var c = 0, d = 0, e = 0, f = 0, g = 0, h = function (a) {
                var b = [];
                for (var c = 1; c < a; c++)
                    b.push("");
                return b.join()
            }, i = function () {
                return (new Date).getTime()
            }, j = function (a) {
                return (i() - a) / 1e3
            }, k = function (b) {
                switch (a.speedUnit) {
                    case "b":
                        return Math.round(100 * b * 8) / 100;
                    case "B":
                        return Math.round(100 * b) / 100;
                    case "Kb":
                        return Math.round(100 * b * 8 / 1024) / 100;
                    case "KB":
                        return Math.round(100 * b / 1024) / 100;
                    case "Mb":
                        return Math.round(100 * b * 8 / 1024 / 1024) / 100;
                    case "MB":
                        return Math.round(100 * b / 1024 / 1024) / 100;
                    case "Gb":
                        return Math.round(100 * b * 8 / 1024 / 1024 / 1024) / 100;
                    case "GB":
                        return Math.round(100 * b / 1024 / 1024 / 1024) / 100;
                    default:
                        return Math.round(100 * b) / 100
                }
            };
            return this.each(function () {
                var b = $(this), l = function () {
                    var a = h(32), b = i();
                    $.ajax({ type: "post", url: appPath + "ajax/MAPPU00005.ashx?id=" + b, data: a, success: function () {
                        c = j(b)
                    }, complete: function (a) {
                        m(), a = null
                    }
                    })
                }, m = function () {
                    var a = i();
                    $.ajax({ type: "get", url: appPath + "img/abgne.tw?id=" + a, success: function (b) {
                        e = j(a), d = b.length / e, d > g && (g = d)
                    }, complete: function (a) {
                        n(), a = null
                    }
                    })
                }, n = function () {
                    var b = h(a.uploadSize), k = i();
                    $.ajax({ type: "post", url: appPath + "ajax/MAPPU00005.ashx?id=" + k, data: b, success: function (a) {
                        f = b.length / j(k), f > g && (g = f)
                    }, complete: function (a) {
                        $.cookie("bandwidth", MPS.getNowDate()), $.cookie("bandwidth-ping", c), $.cookie("bandwidth-download", d), $.cookie("bandwidth-download-time", e), $.cookie("bandwidth-upload", f), $.cookie("bandwidth-alert", 0), p(), a = null
                    }
                    })
                }, p = function () {
                    var g = $("#bandwidth-modal"), h = g.find(".modal-body"), i = k(d), j = k(f), l = c > a.minSpeed;
                    e > a.minSpeed && $.cookie("bandwidth-alert") != 1 && ($.alert("您當下的網路跟主機間的連線速度較差，請至網路訊號較好的地方再進行使用！"), $.cookie("bandwidth-alert", 1)), h.html('<h5 class="hide">回應速度: <span' + (l ? ' class="to-slow"' : "") + ">" + c + "秒</span></h5><h5>下載速度: <span>" + i + a.speedUnit + "</span></h5><h5>上傳速度: <span>" + j + a.speedUnit + "</span></h5><br><p>如果回應速度大於 " + a.minSpeed + " 秒以上時，則表示您當下的網路跟主機間的連線速度較差，請至網路訊號較好的地方再進行使用！</p>"), b.find("img").hide().next().show()[l ? "addClass" : "removeClass"]("to-slow")
                };
                $.cookie("bandwidth") ? (c = $.cookie("bandwidth-ping"), d = $.cookie("bandwidth-download"), f = $.cookie("bandwidth-upload"), e = $.cookie("bandwidth-download-time"), p()) : l()
            })
        }
    } (jQuery)
