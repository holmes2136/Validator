/// <reference path="jquery-1.9.0.min.js" />
var forms = [],
    fieldRuleList = [];

forms['tab-32-mcu-0'] = { "mcu-954": {"mcutype":"text"} };
fieldRuleList['mcu-954'] = { "McuId": "mcu-954", "Rules": [{ "RuleName": "A001", "RuleParam1": "test"}] };


$(document).ready(function () {

    //$("#mcu-954").keyup(function (e) {
    //    var result = DocKeyinValidators['CheckId'].apply(this, [$(this), { "param1": "test1", "param2": "test2"}]);
    //    console.log(result);
    //});

    $("#mcu-3965").click(function (e) {

        var result = checkFieldByTab('tab-32-mcu-0');

        if (!!checkResult.success) {
            return;
            //return $.alert("There are errors!");
        }
    });

});


var DocKeyinValidators = {
    //身份證字號/居留證檢核
    'A001': function (field,params) {
        var $this = $(this),
            value = $this.getMcuVal(),
            result = true;


        if (!!value && !CheckID(value)) {
            result = false;
        }

        return result;
    }
};


/**
* 驗證身份證字號、統編
* @sid {string} 要驗證的身份證字號
* @return {boolean} true-驗證結果正確, false-驗證結果錯誤
*/
function CheckID(sid) {
    var myid = sid.toUpperCase(),
        result = false;

    if (myid.match(/^[A-Z][1-2][0-9]{8}$/)) {
        result = true;
    } 

    return result;
}

// 目前頁籤中的欄位檢核
function checkFieldByTab(tab) {
    var noError = 0, showAlert = 0, msgType = 0, msgContent = '';
    var tmpFormTab = forms[tab];
    if (!!tmpFormTab) {
        for (var _mcuId in tmpFormTab) {
            var tmpField = tmpFormTab[_mcuId],
                    tmpRuleObj = fieldRuleList[_mcuId];

            if (tmpField.mcutype == 'label') continue;

            var result = $.validateOnNextPage(tmpField, tmpRuleObj, { NotToShow: 1 });
            if (!result.success) {
                if (result.msgType == 1) { msgType = 1; msgContent = result.msgContent }
                else if (!!!result.showAlert) {
                    tmpField.$mcu.addClass('error gotonext').tooltip('destroy').tooltip({
                        title: result.msg + '<span class="hide">' + tmpField.mcuId + '</span>',
                        placement: 'right',
                        trigger: 'hover'
                        //trigger: tmpField.mcutype == 'flexigrid' || tmpField.mcutype == 'checkgroup' ? 'hover' : 'hover'
                    });
                } else {
                    showAlert = 1;
                }
                //if(result.isNotCount === false){
                noError++;
                //}
            } else {
                tmpField.$mcu.removeClass('gotonext');
            }

            if (result.success) {
                result = $.validateOnBlur(tmpField, tmpRuleObj, { NotToShow: 1 });
                if (!result.success) {
                    tmpField.$mcu.addClass('error focusout').tooltip('destroy').tooltip({
                        title: result.msg + '<span class="hide">' + tmpField.mcuId + '</span>',
                        placement: 'right',
                        trigger: 'hover'
                        //trigger: (tmpField.mcutype == 'flexigrid' || tmpField.mcutype == 'checkgroup') ? 'hover' : 'focus'
                    });

                    noError++;
                } else {
                    tmpField.$mcu.removeClass('focusout');
                }
            }

            if (result.success) {
                result = $.validateOnBlur(tmpField, tmpRuleObj, { NotToShow: 1 });
                if (!result.success) {
                    tmpField.$mcu.addClass('error focusout').tooltip('destroy').tooltip({
                        title: result.msg + '<span class="hide">' + tmpField.mcuId + '</span>',
                        placement: 'right',
                        trigger: 'hover'
                        //trigger: tmpField.mcutype == 'flexigrid' ? 'hover' : 'focus'
                    });

                    noError++;
                } else {
                    tmpField.$mcu.removeClass('focusout');
                }
            }

            if (result.success && device == 'app' && tmpField.mcutype != 'label' && tmpField.mcutype != 'checkgroup' && !tmpField.$mcu.hasClass("mcu-hidden")) {
                result = f2dKeyinValidators['checkBig5'].apply(tmpField.$mcu, [tmpField.$mcu, tmpRuleObj, fieldName2McuMap, fieldRuleList, { NotToShow: 1}]);
                if (!result.success) {
                    return tmpField.$mcu.addClass('error big5').tooltip('destroy').tooltip({
                        title: result.msg + '<span class="hide">' + tmpField.mcuId + '</span>',
                        placement: 'right',
                        trigger: 'focus'
                    });
                } else {
                    tmpField.$mcu.removeClass('big5');
                }
            }



            if (!tmpField.$mcu.hasClass('focusout') && !tmpField.$mcu.hasClass('keyup') && !tmpField.$mcu.hasClass('change') && !tmpField.$mcu.hasClass('gotonext')) {
                tmpField.$mcu.removeClass('error').tooltip('destroy');
            }
        }
        var _errorCount = hasTab ? noError : noError || $(nowTabId + ' .error').length;
        if (!!_errorCount) {
            if ($errorBadge.length) {
                $errorBadge.text(_errorCount).show();
            } else {
                $tabLink.append(' <span class="badge badge-important error-badge">' + _errorCount + '</span>');
            }
        } else {
            if ($errorBadge.length) {
                $errorBadge.text('0').hide();
            }
        }
    }

    return {
        success: hasTab ? noError : noError || !!$(nowTabId + ' .error').length,
        showAlert: showAlert, msgType: msgType, msgContent: msgContent
    };
}
