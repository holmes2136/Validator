(function ($) {
    'use strict';
    $.validate = function (field, rules, eventType, eventData) {
        if (!!!field) {
            return {
                success: false,
                msg: '不正確的欄位物件資訊'
            };
        }

        var $mcu = field,
            fieldName = field.fieldName;

        eventType = eventType || '12';
        if (eventType == '0' && !!$mcu.ignore) {
            if (!!eventData && !!!eventData.grid) {
                $mcu.removeClass('error').setMcuVal('');
                return {
                    success: true
                };
            }
        }

        var result;
        if (!!rules) {
            var validateRules = rules.Rules,
            validateRuleLength = validateRules.length;
            console.info($.format('[Field Validate Start:{0}]', fieldName || field.mcuId));
            for (var i = 0; i < validateRuleLength; i++) {
                var rule = validateRules[i],
                ruleName = rule.RuleName,
                runType = rule.RunType,
                ruleFunc = DocKeyinValidators[ruleName];

                if (/*eventType != '0' && */ /*runType != eventType*/eventType.indexOf(runType) == -1) continue;
                if (!!!ruleName || !!!ruleFunc) {
                    continue;
                    /*
                    return {
                    success: false,
                    msg: $.format('在{0}檢核規則中找不到代碼為{1}的規則', ruleType == '2' ? 'MAPP' : 'F2D', ruleName)
                    };*/
                }
                console.time('[' + eventType + ']' + ruleName);
                result = ruleFunc.apply($mcu, [field, rule, eventData]);
                console.timeEnd('[' + eventType + ']' + ruleName);
                if (result != null) {
                    console.info(field);
                    console.info(result);
                    console.info($.format('[Field Validate End:{0}]', fieldName || field.mcuId));
                    return result;
                }
            }
            console.info($.format('[Field Validate End:{0}]', fieldName || field.mcuId));
        }

        if (!!!$mcu) return {
            success: true
        };
        if (field.parentTabId == "tab-66-mcu-0") {
            return {
                success: true
            };
        }
        //if (/*(eventType == '0' || eventType == '1') && */!!groupNo && !!fieldName && !!formId) {
        var keyinField = $mcu.data('keyinField'); //keyinFieldInf[groupNo][formId + '-' + fieldName];
        if (!!keyinField) {
            // 欄位長度
            if (field.mcutype != 'select2') {
                var val = $mcu.getMcuVal();
                if (!!val && !$.isArray(val) && !!keyinField.ColLen) {
                    var colLenArr = keyinField.ColLen.split(','),
                        colLen = parseInt(colLenArr[0], 10),
                        floatLen = colLenArr.length >= 2 ? parseInt(colLenArr[1], 10) : 0;
                    if (!!keyinField.ChiKeyin && keyinField.ChiKeyin == 'Y') {
                        colLen = (colLen - 2) / 2;
                    }
                    if (val.length > colLen + (!!floatLen ? 1 : 0)) {
                        $mcu.addClass("overlen");
                        return {
                            success: false,
                            msg: $.format('長度最多只允許{0}個字', colLen)
                        };
                    }
                    else {
                        if ($mcu.hasClass("overlen")) { $mcu.removeClass('error keyup overlen').tooltip('destroy'); }

                    }

                }
            }
        }


//        var compareStr = CompareBeforeAndAfter2(field);
//        if (compareStr != "") {
//            return {
//                success: false,
//                msg: compareStr
//            };
//        }
//        else {
//            return {
//                success: true,
//                msg: ''
//            };

//        }

        //}


    };

    $.validateOnNextPage = function (field, rules, eventData) {
        return $.validate(field, rules, '0', eventData || {});
    };

    $.validateOnKeyup = function (field, rules, eventData) {
        return $.validate(field, rules, '1', eventData || {});
    };

    $.validateOnBlur = function (field, rules, eventData) {
        return $.validate(field, rules, '2', eventData || {});
    };

    $.validateOnShow = function (field, rules, eventData) {
        return $.validate(field, rules, '3', eventData || {});
    };

})(jQuery);