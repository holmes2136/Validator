/// <reference path="jquery-1.9.0.min.js" />
var forms = [],
    fieldRuleList = [];

forms['tab-32-mcu-0'] = { "mcu-954": { "mcuId" : "mcu-954","mcutype": "text", "fieldName": "IDENTITY"}};
fieldRuleList['mcu-954'] = { "McuId": "mcu-954", "Rules": [{ "RuleName": "A001", "RuleParam1": "test","RunType":"0"}] };


$(document).ready(function () {

    //$("#mcu-954").keyup(function (e) {
    //    var result = DocKeyinValidators['CheckId'].apply(this, [$(this), { "param1": "test1", "param2": "test2"}]);
    //    console.log(result);
    //});

    $("#mcu-3965").click(function (e) {

        e.preventDefault();

        var result = checkFieldByTab('tab-32-mcu-0');

        if (!!result.success) {
            return;
            //return $.alert("There are errors!");
        }
    });

});

var ResultObject = function () {
    this.success = 1;
    this.msg = '';
    this.data = arguments[0] || '';
    this.showAlert = 0;
    this.msgType = 0;
    this.msgContent = '';
    return this;
};

ResultObject.prototype.setSccess = function (msg) {
    this.success = 1;
    this.msg = msg || '';
    return this;
};
ResultObject.prototype.setFailure = function (msg) {
    this.success = 0;
    this.msg = msg || '';
    return this;
};
ResultObject.prototype.setShowAlert = function (show) {
    this.showAlert = show;
    return this;
};


var DocKeyinValidators = {
    //身份證字號/居留證檢核
    'A001': function (field, params) {
        var $this = $(this),
            value = $this.getMcuVal(),
            result = new ResultObject(value);


        if (!!value && !CheckID(value)) {
            result.setFailure('身份證輸入格式錯誤');
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
            //var tmpField = tmpFormTab[_mcuId],
            var tmpField = $("#" + _mcuId),
                    tmpRuleObj = fieldRuleList[_mcuId];

            if (tmpField.mcutype == 'label') continue;

            var result = $.validateOnNextPage(tmpField, tmpRuleObj, { NotToShow: 1 });
            if (!result.success) {
                if (result.msgType == 1) { msgType = 1; msgContent = result.msg }
                else if (!!!result.showAlert) {
                    tmpField.addClass('error').tooltip('destroy').tooltip({
                        title: result.msg + '<span class="hide">' + tmpField.mcuId + '</span>',
                        placement: 'right',
                        trigger: 'hover'
                    });
                } else {
                    showAlert = 1;
                }
               
            } else {
                tmpField.removeClass('error');
            }
        }
    }

    return {
        //success: hasTab ? noError : noError || !!$(nowTabId + ' .error').length,
        success: noError > 0 ?false:true,
        showAlert: showAlert, msgType: msgType, msgContent: msgContent
    };
}
