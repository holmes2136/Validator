/// <reference path="jquery-1.9.0.min.js" />

$(document).ready(function () {

    $("#mcu-954").keyup(function (e) {
        var result = DocKeyinValidators['CheckId'].apply(this, [$(this),{"param1":"test1","param2":"test2"}]);
        console.log(result);
    });


});


var DocKeyinValidators = {
    //身份證字號/居留證檢核
    'CheckId': function (field,params) {
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