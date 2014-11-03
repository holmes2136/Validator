(function ($) {
    'use strict';


    $.fn.getMcuText = function () {
        var $mcu = this,
            mcutype = $mcu.data('mcutype'),
            keyinField = $mcu.data('keyinField'),
            value = $mcu.find(':text,input[type=number],input[type=email]').val() || $mcu.find('textarea').val() || '';
        if (mcutype === 'select2') {
            value = $mcu.find('select').find("option:selected").text() || '';
        } else if (mcutype === 'checkgroup') {
            value = [];
            //value = "";
            $mcu.find(':checkbox:checked,:radio:checked').each(function (i, ele) {
                //value[i] = ele.parentElement.textContent;
                //value = value + ele.parentElement.innerText + ",";
                value[i] = ele.parentElement.textContent;

                if (value[i] == undefined)
                {
                value[i]=ele.parentElement.innerText;
                }
            });
        } else if (mcutype === 'flexigrid') {
            var $grid = $mcu.find('.grid');
            if (!!!$grid.length) {
                $grid = $mcu.find('table');
            }
            var $gridTrs = $grid.find('tbody tr');
            value = [];
            $gridTrs.each(function (i, ele) {
                var $td = $(ele).find('td');
                var tmp = [];
                $td.each(function (j, td) {
                    tmp[j] = $.trim($(td).text());
                });
                value[i] = {
                    cell: tmp
                };
            });
        } else if (mcutype === 'address') {
            value = [];
            $mcu.find(':input:not(.select2-input)').each(function (i, ele) {
                value[i] = $(ele).val();
            });
        } else if (mcutype === 'date') {
            value = value.replace(/\//ig, '');
        } else if (mcutype === 'label') {
            value = $mcu.text();
        } else if (mcutype === 'hiddenbox') {
            value = $mcu.children('.span').text();
        }


        /*Upldate 20140918
        if (!!keyinField && !!value && !$.isArray(value)) {
        // 轉大寫 TransCase
        value = value.toUpperCase();
        }*/
        var keyinField = $mcu.data('keyinField');
        if (!!keyinField && !!keyinField.TransCase && keyinField.TransCase == '大寫' && !!value && !$.isArray(value)) {
            value = value.toUpperCase();
        }

        return value;
    };


    $.fn.getMcuText2 = function () {
        var $mcu = this,
            mcutype = $mcu.data('mcutype'),
            keyinField = $mcu.data('keyinField'),
            value = $mcu.find(':text,input[type=number],input[type=email]').val() || $mcu.find('textarea').val() || '';
        if (mcutype === 'select2') {
            value = $mcu.find('select').find("option:selected").text() || '';
        } else if (mcutype === 'checkgroup') {
            //value = [];
            value = "";
            $mcu.find(':checkbox:checked,:radio:checked').each(function (i, ele) {
                //value[i] = ele.parentElement.innerText;
                if (value == "") { value = ele.parentElement.textContent.replace("1.", "").replace("2.", "").replace("3.", "").replace("4.", "").replace("5.", ""); }
                else { value = value + "," + ele.parentElement.textContent.replace("1.", "").replace("2.", "").replace("3.", "").replace("4.", "").replace("5.", ""); }

            });
        } else if (mcutype === 'flexigrid') {
            var $grid = $mcu.find('.grid');
            if (!!!$grid.length) {
                $grid = $mcu.find('table');
            }
            var $gridTrs = $grid.find('tbody tr');
            value = [];
            $gridTrs.each(function (i, ele) {
                var $td = $(ele).find('td');
                var tmp = [];
                $td.each(function (j, td) {
                    tmp[j] = $.trim($(td).text());
                });
                value[i] = {
                    cell: tmp
                };
            });
        } else if (mcutype === 'address') {
            value = [];
            $mcu.find(':input:not(.select2-input)').each(function (i, ele) {
                value[i] = $(ele).val();
            });
        } else if (mcutype === 'date') {
            value = value.replace(/\//ig, '');
        } else if (mcutype === 'label') {
            value = $mcu.text();
        } else if (mcutype === 'hiddenbox') {
            value = $mcu.children('.span').text();
        }

        /*Upldate 20140918
        if (!!keyinField && !!value && !$.isArray(value)) {
            // 轉大寫 TransCase
            value = value.toUpperCase();
        }*/
        var keyinField = $mcu.data('keyinField');
        if (!!keyinField && !!keyinField.TransCase && keyinField.TransCase == '大寫' && !!value && !$.isArray(value)) {
            value = value.toUpperCase();
        }

        return value;
    };

    $.fn.getMcuVal = function () {
        var $mcu = this,
            mcutype = $mcu.data('mcutype'),
            keyinField = $mcu.data('keyinField'),
            value = $mcu.find(':text,input[type=number],input[type=email]').val() || $mcu.find('textarea').val() || '';

        if (mcutype === 'select2') {
            value = $mcu.find('select').val() || '';
        } else if (mcutype === 'checkgroup') {
            value = [];
            $mcu.find(':checkbox:checked,:radio:checked').each(function (i, ele) {
                value[i] = ele.value;
            });
        } else if (mcutype === 'flexigrid') {
            var $grid = $mcu.find('.grid');
            if (!!!$grid.length) {
                $grid = $mcu.find('table');
            }
            var $gridTrs = $grid.find('tbody tr');
            value = [];
            $gridTrs.each(function (i, ele) {
                var $td = $(ele).find('td');
                var tmp = [];
                var coltype = '';

                $td.each(function (j, td) {

                    //Holmes update START
                    //coltype = $('#' + $(td).find('.to-select2:last').attr('id')).data('mcutype');
                    coltype = $(td).find("[data-mcutype='select']").data('mcutype');

                    if (coltype == 'textbox') {
                        if ($(td).find('input').length != 0) { tmp[j] = $(td).find('input').val(); }
                    } else if (coltype === "select") {
                        if ($(td).find('select').length != 0) { tmp[j] = $(td).find('select option:selected').val(); }
                    }
                    else if (coltype == 'select2') {
                        if ($(td).find('select').length != 0) { tmp[j] = $(td).find('select').select2('val'); }
                    }
                    else {
                        tmp[j] = $.trim($(td).text());
                    }

                    //tmp[j] = $.trim($(td).text());
                    //Holmes update END

                });
                value[i] = {
                    cell: tmp
                };
            });
        } else if (mcutype === 'address') {
            value = [];
            $mcu.find(':input:not(.select2-input)').each(function (i, ele) {
                value[i] = $(ele).val().toUpperCase();
            });
        } else if (mcutype === 'date') {
            value = value.replace(/\//ig, '');
        } else if (mcutype === 'label') {
            value = $mcu.text();
        }


        /*Upldate 20140918
        if (!!keyinField && !!value && !$.isArray(value)) {
        // 轉大寫 TransCase
        value = value.toUpperCase();
        }*/
        var keyinField = $mcu.data('keyinField');
        if (!!keyinField && !!keyinField.TransCase && keyinField.TransCase == '大寫' && !!value && !$.isArray(value)) {
            value = value.toUpperCase();
        }

        return value;
    };


    $.fn.setMcuVal = function (val) {
        var $mcu = this,
            mcutype = $mcu.data('mcutype');

        val = val === undefined ? '' : val;

        if (mcutype === 'select2') {
            $mcu.find('select').select2('val', val);
        } else if (mcutype === 'select'){
            $mcu.find('select').val(val);
        }
        else if (mcutype === 'checkgroup') {
            $mcu.find(':checkbox,:radio').prop('checked', 0);
            if ($.isArray(val)) {
                $.each(val, function (i, v) {
                    $mcu.find(':checkbox[value="'  + v  + '"],:radio[value="' + v + '"]').prop('checked', 1);
                });
            } else {
                val = val.indexOf('.') === val.length - 1 ? val.substring(0, val.length - 1) : val;
                if (!!val && val != "") {
                    $mcu.find(':checkbox[value="' + val + '"],:radio[value="' + val + '"]').prop('checked', 1);
                }
            }
        } else if (mcutype === 'flexigrid') {
            var $grid = $mcu.find('.grid'),
                colModel = $mcu.data('colModel');
            $grid.empty();
            if (val == '') val = [];
            if (!$.isArray(val)) {
                var tmpArr = val.split(',');
                val = [];
                var _arr = [];
                for (var k = 0; k < colModel.length; k++) {
                    _arr[k] = k < tmpArr.length ? tmpArr[k] : '';
                }
                val[0] = { cell: _arr };
            }
            if (!!!$grid.length && !!val.length) {
                var $table = $mcu.find('table'),
                    _html = '<tbody>';
                for (var i = 0; i < val.length; i++) {
                    var cell = val[i].cell,
                        tmp = '';

                    for (var j = 0; j < cell.length; j++) {
                        //yinghsin start
                        //tmp += '<td width="' + colModel[j].width  + '">' + cell[j] + '</td>';

                        //Holmes start
                        if (colModel[j].linkto == "Y") {
                            //.find('.controls')
                            var tempId = '';
                            var type = $('#' + colModel[j].name).data('mcutype');
                            var $con;


                            if (type == 'select2') {
                                var $temp = $('#' + colModel[j].name).find("select").select2('destroy');
                                var $con = $('#' + colModel[j].name).clone();
                                $con.css("vertical-align", "top");
                                $con.find('label').text('').css('width', '0px');
                                $con.find('div').css('margin-left', '0px');
                                //$temp.select2();
                                $con.attr('id', 'c' + i + '_' + $con.attr('id'));
                                $con.data('mcutype', 'select');
                                $con.attr('data-mcutype', 'select');
                                $con.find('select').attr('id', 'c' + i + '_' + $con.find('select').attr('id'));
                                $con.setMcuVal(cell[j]);
                            }
                            else if (type == 'textbox') {
                                $con = $('#' + colModel[j].name).clone();
                                $con.find('input').attr('id', 'c' + i + '_' + $con.find('input').attr('id')).prop('disabled', false);
                                $con.find('input').attr('value', cell[j]);
                            }
                            else if (type == 'checkgroup') {

                                $con = $('#' + colModel[j].name).clone();
                                var $input = $con.find("input");
                                $con.attr('id', 'c' + i + '_' + $con.attr('id'));
                                var parentname = colModel[j].name;
                                $input.attr('onchange', "BindCheckGroup('" + this[0].id + "', '" + parentname + "', '" + i + "');");

                                $con.find("label.control-label").css('width', '0');
                                $con.find("div").css('margin-left', '-10px');
                                $con.find("div label").css('margin-top', '20px');
                                $con.css('width', '30x');
                                $con.css('margin-bottom', '0px');
                            }
                            else if (type == 'button') {
                                var $con = $('#' + colModel[j].name).clone();
                                $con.attr('id', 'c' + i + '_' + $con.attr('id'));
                                var $a = $con.find("a");
                                $a.attr('id', 'ca' + i + '_' + $a.attr('id'));
                                var parentname = colModel[j].name;
                                //$a.click(function () { bindDeleteButton(this, parentname, i); });
                                //$a.attr('onclick', "bindDeleteButton('" + parentname + "', '" + $mcu[0].id + "');");
                                $a.attr('onclick', "bindDeleteButton('" + parentname + "', '" + $mcu[0].id + "', '" + i + "');");
                                $con.css('margin-top', '0px');
                            }

                            $con.css('top', '');
                            $con.css('left', '');
                            $con.css('position', 'relative');
                            $con.css('display', 'block');
                            tmp += '<td width="' + colModel[j].width + '">' + $('<div>').append($con).remove().html() + '</td>';

                        }
                        else {
                            if (colModel[j].hide != true)
                            { tmp += '<td width="' + colModel[j].width + '">' + (!!!cell[j] ? '' : cell[j]) + '</td>'; }
                            else
                            { tmp += '<td hidden style="display:none">' + cell[j] + '</td>'; }


                        }



                        //yinghsin end
                    }
                    _html += '<tr>' + tmp + '</tr>';
                }
                $table.html(_html + '</tbody>');
            } else {
                $mcu.find('.grid').flexAddData({
                    page: 1,
                    total: val.length,
                    rows: val
                });
            }
        } else if (mcutype === 'address') {
            val = $.isArray(val) ? val : val.split(',');
            $mcu.find(':input:not(.select2-input)').each(function (i, ele) {
                if (i <= 2) {
                    $(ele).select2('val', val[i]);
                } else {
                    $(ele).val(val[i]); //.trigger('change');
                }
            });
            if (!!val[0]) {
                $mcu.find('select.to-select2:eq(0)').val(val[0]).trigger('change', [true]);
            }
            //$mcu.find('select.to-select2:eq(0)').val(val[0]).trigger('change');

            var val12 = $mcu.find('select.to-select2:eq(1)').val() + $mcu.find('select.to-select2:eq(2)').val();
            var $addrText = $mcu.find(':text:not(.select2-input):eq(0)'),
                    valAddr = $addrText.val();
            if (valAddr.indexOf(val12) === 0) {
                $addrText.val(valAddr.substring(val12.length));
            }
        } else if (mcutype === 'date') {
            $mcu.find(':text').val(val.length === 8 ? val.substring(0, 4) + '/' + val.substring(4, 6) + '/' + val.substring(6, 8) : val);
        } else if (mcutype === 'label') {
            $mcu.text(val);
        } else {
            $mcu.find(':text,input[type=number],input[type=email], textarea').val(val);
        }

        return this;
    };

    $.fn.setMcuText = function (val) {
        var $mcu = this,
            mcutype = $mcu.data('mcutype');

        val = val === undefined ? '' : val;

        if (mcutype === 'select2') {
            //$mcu.find('select').select2('val', val);
        } else if (mcutype === 'checkgroup') {
            /*
            $mcu.find(':checkbox,:radio').prop('checked', 0);
            if ($.isArray(val)) {
            $.each(val, function (i, v) {
            $mcu.find(':checkbox[value=' + v + '],:radio[value=' + v + ']').prop('checked', 1);
            });
            } else {
            val = val.indexOf('.') === val.length - 1 ? val.substring(0, val.length - 1) : val;
            $mcu.find(':checkbox[value=' + val + '],:radio[value=' + val + ']').prop('checked', 1);
            }
            */
        } else if (mcutype === 'flexigrid') {
            var $grid = $mcu.find('.grid'),
                colModel = $mcu.data('colModel');
            $grid.empty();
            if (val == '') val = [];
            if (!$.isArray(val)) {
                var tmpArr = val.split(',');
                val = [];
                var _arr = [];
                for (var k = 0; k < colModel.length; k++) {
                    _arr[k] = k < tmpArr.length ? tmpArr[k] : '';
                }
                val[0] = { cell: _arr };
            }
            if (!!!$grid.length && !!val.length) {
                var $table = $mcu.find('table'),
                    _html = '<tbody>';
                for (var i = 0; i < val.length; i++) {
                    var cell = val[i].cell,
                        tmp = '';

                    for (var j = 0; j < cell.length; j++) {
                        tmp += '<td width="' + colModel[j].width + '">' + cell[j] + '</td>';
                    }
                    _html += '<tr>' + tmp + '</tr>';
                }
                $table.html(_html + '</tbody>');
            } else {
                $mcu.find('.grid').flexAddData({
                    page: 1,
                    total: val.length,
                    rows: val
                });
            }
        } else if (mcutype === 'address') {
            val = $.isArray(val) ? val : val.split(',');
            $mcu.find(':input:not(.select2-input)').each(function (i, ele) {
                if (i <= 2) {
                    $(ele).select2('val', val[i]);
                } else {
                    $(ele).val(val[i]); //.trigger('change');
                }
            });
            if (!!val[0]) {
                $mcu.find('select.to-select2:eq(0)').val(val[0]).trigger('change', [true]);
            }
            //$mcu.find('select.to-select2:eq(0)').val(val[0]).trigger('change');

            var val12 = $mcu.find('select.to-select2:eq(1)').val() + $mcu.find('select.to-select2:eq(2)').val();
            var $addrText = $mcu.find(':text:not(.select2-input):eq(0)'),
                    valAddr = $addrText.val();
            if (valAddr.indexOf(val12) === 0) {
                $addrText.val(valAddr.substring(val12.length));
            }
        } else if (mcutype === 'date') {
            $mcu.find(':text').val(val.length === 8 ? val.substring(0, 4) + '/' + val.substring(4, 6) + '/' + val.substring(6, 8) : val);
        } else if (mcutype === 'label') {
            $mcu.text(val);
        } else {
            $mcu.find(':text,input[type=number],input[type=email], textarea').val(val);
        }

        return this;
    };
    $.fn.removeNonBig5 = function () {
        return this.each(function () {
            var $this = $(this),
                mcutype = $this.data('mcutype');

            if (mcutype != 'address' && mcutype != 'textbox') return true;
            var val = $this.getMcuVal();
            if (mcutype == 'address') {
                val[val.length - 1] = removeNonBig5(val[val.length - 1]);
            } else if (mcutype == 'textbox') {
                val = removeNonBig5(val);
            }

            $this.setMcuVal(val);
        });
    };
    $.fn.enableMcu = function (clearVal) {
        return this.find(':input').enable(1).ifElse(clearVal, function () {
            this.value = clearVal;
        }).end().find('select.to-select2').select2('enable').ifElse(clearVal, function () {
            this.value = clearVal;
        }).end();
    };

    $.fn.disableMcu = function (clearVal) {
        return this.find(':input').enable(0).ifElse(clearVal, function () {
            this.value = clearVal;
        }).end().find('select.to-select2').select2('disable').ifElse(clearVal, function () {
            this.value = clearVal;
        }).trigger('change').end();
    };



})(jQuery);