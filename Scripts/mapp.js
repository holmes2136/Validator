var gotoSorryTimeoutInterval = 1000 * 60 * parseInt(typeof(timeoutInterval) == "undefined" ? 15 : timeoutInterval, 10) || 15,
    gotoSorryTimer, keepWorkTimer, keepWorkSec = 10, 
    appPath = location.protocol + '//' + location.host + '/' + location.pathname.split('/')[1] + '/', 
    sorry = appPath + 'sorry.aspx';
    //appPath = location.pathname.indexOf('/FBMAPP/') > -1 ? '/FBMAPP/' : '/FBMAPP2/';

function gotoSorry(){
    if(!!keepWorkTimer){
        clearInterval(keepWorkTimer);
    }
    $('.bootbox, .modal').removeClass('fade').modal('hide');
    keepWorkSec = 10;
    bootbox.dialog('您在此頁面的時間已超過逾時時間，是否要繼續目前的作業呢？', [{
            label: '繼續(' + keepWorkSec + ')',
            'class': 'btn-primary keep-work-btn',
            callback: function(){
                gotoSorryTimer = setTimeout(gotoSorry, gotoSorryTimeoutInterval);
            }
        }, {
            label: '離開',
            'class': 'btn-danger goto-sorry',
            callback: function(){
                location.href = sorry + '?msg=1';
            }
        }]);

    keepWorkTimer = setInterval(function(){
        $('.keep-work-btn').html('繼續(' + (keepWorkSec--) + ')');
        if(keepWorkSec < 0){
            clearInterval(keepWorkTimer);
            $('.goto-sorry').trigger('click');
        }
    }, 1000);
}

(function ($) {
    if (!!!window.console) {
        window.console = {
            dir: $.noop,
            info: $.noop,
            debug: $.noop,
            error: $.noop,
            warn: $.noop, 
            time: $.noop,
            timeEnd: $.noop, 
            group: $.noop, 
            groupCollapsed: $.noop, 
            groupEnd: $.noop
        };
    }else{
        if(window.console && (typeof(window.console.time) == 'undefined') || window.console.time == undefined) {
            console.time = function(name, reset){
                if(!name) { return; }
                var time = new Date().getTime();
                if(!console.timeCounters) { console.timeCounters = {} };
                var key = "KEY" + name.toString();
                if(!reset && console.timeCounters[key]) { return; }
                    console.timeCounters[key] = time;
                };

            console.timeEnd = function(name){
                var time = new Date().getTime();
                if(!console.timeCounters) { return -1; }
                var key = "KEY" + name.toString(), 
                    timeCounter = console.timeCounters[key], 
                    diff = -1;
                if(timeCounter) {
                    diff = time - timeCounter;
                    var label = name + ": " + diff + "ms";
                    console.info(label);
                    delete console.timeCounters[key];
                }
                return diff;
            };
        }
    }
    
    if($.browser.msie){
        console._info_ = console.info;
        console.info = function(args){
            if(typeof (args) == 'string'){
                console._info_(args);
            }else console._info_(JSON.stringify(args));
        };
        
    }
    if (!!!window.MPS) {
        window.MPS = {};
    }

    /**
    * 取得本機端現在的日期
    * @format {string} 要顯示的時間格式, 若設成 yyy 則會自動減去 1911
    * @return {string} 自訂格式的日期字串
    */
    MPS.getNowDate = function (o) {
        o = $.extend({
            format: 'yyyymmdd'
        }, o);
        var now = new Date();
        var y = now.getFullYear() + '';
        var m = (now.getMonth() + 1) + '';
        var d = now.getDate() + '';
        m = m.length < 2 ? '0' + m : m;
        d = d.length < 2 ? '0' + d : d;

        o.format = o.format.replace('yyyy', y);
        o.format = o.format.replace('yyy', y - 1911);
        o.format = o.format.replace('mm', m);
        o.format = o.format.replace('dd', d);

        return o.format;
    };

    /**
    * 取得本機端現在的時間
    * @format {string} 要顯示的時間格式
    * @return {string} 自訂格式的時間字串
    */
    MPS.getNowTime = function (o) {
        o = $.extend({
            format: 'hhmmss'
        }, o);
        var now = new Date();
        var hh = now.getHours() + '';
        var mm = now.getMinutes() + '';
        var ss = now.getSeconds() + '';
        hh = (hh.length < 2) ? '0' + hh : hh;
        mm = (mm.length < 2) ? '0' + mm : mm;
        ss = (ss.length < 2) ? '0' + ss : ss;

        o.format = o.format.replace('hh', hh);
        o.format = o.format.replace('mm', mm);
        o.format = o.format.replace('ss', ss);

        return o.format;
    };

    MPS.parseDateToTaiwan = function(d, o){
        o = $.extend({
            format: 'yyymmdd'
        }, o);
        if(typeof(d) =='string') d = Date.parseExact(d, 'yyyyMd');
        var y = d.getFullYear() + '';
        var m = (d.getMonth() + 1) + '';
        var d = d.getDate() + '';
        m = m.length < 2 ? '0' + m : m;
        d = d.length < 2 ? '0' + d : d;

        o.format = o.format.replace('yyyy', y);
        o.format = o.format.replace('yyy', y - 1911);
        o.format = o.format.replace('mm', m);
        o.format = o.format.replace('dd', d);

        return o.format;
    };
    
    MPS.parseTaiwanDateToDate = function(d){
        var d = (parseInt(d, 10) + 19110000) + '';
        return new Date(d.substring(0, 4), parseInt(d.substring(4,6), 10) - 1, d.substring(6, 8));
    };
    //MPS.parseTaiwanDateToDate('1010912').compareTo(Date.today().addMonths(-3).clearTime());
})(jQuery);

(function($){
    
    $.fn.enable = function(b) {
	    if (!!b) b = true;
	    return this.each(function() {
		    this.disabled = !b;
	    });
    };

    $.fn.clear = function(){
        return this.each(function(){
            var $this = $(this);
            
            if($this.is(':text')){
                $this.val('');
            }
        });
    };
    
    $.fn.bootpag = function (o) {
        o = $.extend({
            max: 10,
            total: 1,
            page: 1
        }, o || {});
        return this.each(function () {
            var $this = $(this),
                mid = Math.ceil(o.max / 2),
                p = Math.floor(o.page / o.max) + 1,
                i = 1, show = o.total;

            if (o.page <= mid) {
                show = p * o.max;
                i = (p - 1) * o.max + 1;
            } else {
                i = o.page - mid + 1;
                show = i + o.max - 1;
            }
            show = show < o.total ? show : o.total;
            i = show != i && show - i < o.max - 1 ? show - o.max + 1 : i;
            i = i < 1 ? 1 : i;
            var _html = '<ul><li' + (o.page == 1 ? ' class="disabled"' : '') + '><a href="#" rel="tooltip" title="瀏覽第一頁" data-page="1">«</a></li>';
            for (i; i <= show; i++) {
                _html += '<li' + (o.page == i ? ' class="active"' : '') + '><a href="#" data-page="' + i + '">' + i + '</a></li>';
            }
            _html += '<li' + (o.page == o.total ? ' class="disabled"' : '') + '><a href="#" rel="tooltip" title="瀏覽最後一頁" data-page="' + o.total + '">»</a></li></ul>';
            $this.html(_html);
        });
    };

    $.fn.showAlert = function(o){
        if($.type(o)=='string'){
            var tmp = o;
            o = {msg: tmp};
        }
        o = $.extend({}, {msg:'', cls: 'error'}, o);
        return this.each(function(){
            $(this).prev().remove().end().before('<div class="alert alert-' + o.cls + '"><button type="button" class="close" data-dismiss="alert">×</button><strong>錯誤!</strong> ' + o.msg + '</div>');
        });
    };    
    
    $.fn.ifElse = function(condition, ifCb, elseCb){
        if(condition == undefined) return this;
        return this.each(condition == '' || !!condition ? $.isFunction(ifCb) ? ifCb : $.noop: $.isFunction(elseCb) ? elseCb : $.noop);
    };

    $.alert = function(msg, o){
        o = $.extend({}, {label:'確定'}, o);
        $('.bootbox, .modal').removeClass('fade').modal('hide');
        bootbox.dialog(msg, o);
    };

    $.format = function(){
        if (!!!arguments.length) {
            return '';
        }
        var a = arguments;
        if (typeof arguments[0] == 'object') {
            a = arguments[0];
        }

        for (var c = a[0], b = 1; b < a.length; b++) {
            c = c.replace(new RegExp('\\{' + (b - 1) + '\\}', 'gm'), a[b]);
        }
        return c;
    };

    $.isNullOrEmptyStringArray = function(array){
        if(array.length == 0) return 1;
        for(var i=0;i<array.length;i++){
            if($.type(array[i])=='string' && !!$.trim(array[i])) return 0;
        }
        return 1;
    };

    $.mappAjax = function(o){
        o = $.extend({
            type: 'post',
            dataType: 'json',
            error: function () {
                $.alert('載入資料時發生不明錯誤');
            },
            complete: function (jqXHR) {
                jqXHR = null;
            }
        }, o || {});
        
        $.ajax(o);
    };
    
    $.objectInArray = function(value, array){
        if(array.length == 0) return -1;
        for(var i=0;i<array.length;i++){
            if($.type(array[i])=='object' && !!$.trim(array[i])) return 0;
        }
        return 1;
    };
    
	var ua = navigator.userAgent || navigator.vendor || window.opera;
	var isMobile = {
		Android: function() {
			return ua.match(/Android/i);
		},
		BlackBerry: function() {
			return ua.match(/BlackBerry/i);
		},
		iOS: function() {
			return ua.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return ua.match(/Opera Mini/i);
		},
		Windows: function() {
			return ua.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
    $.browser.ios = isMobile.iOS();
    $.browser.mobile = isMobile.any();
    
    $.getQueryString = function(){
        var a={}, 
            c=window.location.href.replace(/^[^\?]+\??/,"").split(/[;&]/);
        try{
            for(var b=0;b<c.length;b++){
                var d=c[b].split('=');
                if(!(!d||d.length!=2)){
                    var f=unescape(d[0]).toLowerCase(),
                        e=unescape(d[1]);
                    e=e.replace(/\+/g,' ');
                    if(!!arguments.length && arguments[0]==f)return e;
                    a[f] = e;
                }
            }
            return !!arguments.length ? '' : a;
        }catch(g){
            return '';
        }
    };

    $(function(){
        // 依頁面上的 #menu-class 來決定讓指定的選單加上 .active
//        var $menuClass = $('#menu-class');
//        if($menuClass.length){
//            var $menu = $('.' + $menuClass.val());
//            $menu.addClass('active').parentsUntil('.nav').filter('li').addClass('active');
//        }

        // 讓有 rel="tooltip" 的超連結及 .btn 有 data-rel="tooltip" 的元素產生 tooltip 效果
        $('[rel=tooltip], .btn[data-rel=tooltip]').tooltip();

        //Ralph 20140605
        var path = location.pathname.split("/");
        var pathName = path[2];
        var file;
        var fileName;

        if (path.length > 3){
            file = path[3].split(".");
            fileName = file[0];
        } else {
            fileName = pathName;
            pathName = "";
        }

        var aaa = false;
           if ((pathName == "POS01" && fileName == "POSAction01" && $("#content_uc_queryTemplate011_txt_Y_ITEM_NO1").length == 0)
            || (pathName == "POS01" && fileName == "POSAction02" && $("#content_uc_query21_txt_A_ID").length == 0)
            || (pathName == "POS01" && fileName == "POSAction03" && $("#content_uc_queryTemplate011_txt_Y_ITEM_NO1").length == 0)
            || (pathName == "POS01" && fileName == "POSAction04" && $("#content_uc_queryTemplate011_txt_Y_ITEM_NO1").length == 0)
            || (pathName == "POS01" && fileName == "POSAction04" && $("#content_uc_queryTemplate011_txt_Y_ITEM_NO1").length == 0)
            || (pathName == "POS01" && fileName == "default") || (pathName == "POS01" && fileName == "default2") 
            || (pathName == "POS01" && fileName == "default3") || (pathName == "POS01" && fileName == "default4"))
        {
            //回首頁
            aaa = true;
        }



        // 前端頁面登出用-關閉視窗(不支援 Firefox)
        $('#close-logout').on('click', function (event){
		    var logoutmsg = "請問是否確定登出？</br>登出後視窗將會關閉"; 
            if (aaa==true){logoutmsg = "放棄填寫將不儲存已填寫內容，請確認!";}
			bootbox.confirm(logoutmsg, "確定","取消", function (confirmed) {
				if (!confirmed) {
					$.mappAjax({
						url: appPath + 'ajax/MAPPU00002.ashx',
						success: function () {
							event.preventDefault();
							window.opener = null;
							window.open('', '_self');
							window.close();
              window.location = appPath + "sorry.aspx?msg=4";
						},
						error: function () {
							event.preventDefault();
							window.opener = null;
							window.open('', '_self');
							window.close();
						}
					});
				}else{return;}
			});
        });

        if (aaa==true  
            ){
                $(".alerta").on('click', function (event){
                    event.preventDefault();

                    bootbox.confirm("放棄填寫將不儲存已填寫內容，請確認!", "取消", "確定", function (result) {
                        if (result) {
                            url = $(event.delegateTarget).find("a").attr("href");
                            if (!!url ){
                            location.href = url;
                            }
                        }
                    });
            });
        }

        //20140324 寶義 start
        $(".del_click").on('click', function (event){
            event.preventDefault();
            var _id = $(this).attr('id').split('_');
            var id_no = parseInt(_id[_id.length - 1], 10) + 2;
            if (id_no < 10) { id_no = "0" + id_no; }
            bootbox.confirm("請確認是否刪除該筆保單？", "取消", "確定", function (result) {
                if (result) {
                    __doPostBack("ctl00$content$gv_final$ctl" + id_no + "$del", "");
                }
            });
        });
        //20140324 寶義 end
        
         


        var $body = $(document.body);
        if(($body.hasClass('isapp') || $body.hasClass('isweb')) && !!!$('#sorry').length){
            gotoSorryTimer = setTimeout(gotoSorry, gotoSorryTimeoutInterval);
        }        
        
        var $statistics = $('#statistics');
        if(!!$statistics.length && !$body.hasClass('isapp')){
            var $bandwidthModal = $('#bandwidth-modal'),
                $content = $bandwidthModal.find('.modal-body');
            $statistics.find('img').tooltip({
                placement: 'bottom',
                title: '網路速度檢測中...'
            }).end().find('i').on('click', function() {
                $bandwidthModal.modal();
            });
            
            $statistics.bandwidth();
            $bandwidthModal.find('.btn-danger').on('click', function() {
                $.cookie('bandwidth', '');
                $content.find('span').replaceWith('<img src="'+appPath+'img/ajax-loader.gif">');
                $statistics.find('i').hide().prev().show().parents('li').bandwidth();
            });
        }
    });
    
    function logError(details) {
        $.ajax({
            url: appPath + 'ajax/MAPPU00003.ashx',
            type: 'post',
            data: {devices: encodeURIComponent(JSON.stringify(navigator.userAgent)), details: encodeURIComponent(JSON.stringify(details)) }
        }); 
    }
    
    window.onerror = function(message, file, line) {
        logError(file + ':' + line + '\r\n' + message);
    };
    
//    $(document).ajaxError(function(e, xhr, settings) {
//      logError(settings.url + ':' + xhr.status + '\r\n' + xhr.responseText);
//    });
})(jQuery);