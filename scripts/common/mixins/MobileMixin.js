/**
 * Created by anchao on 2016/7/14.
 */
export const MobileMixin = {
    onlyNumber: function (e) {
        let nKeyCode = e.which;
        let target = e.currentTarget;
        let sPhone = target.value;
        if ((nKeyCode == 13) || (nKeyCode == 8) || (nKeyCode == 46) || (nKeyCode >= 37 && nKeyCode <= 40) || (nKeyCode >= 48 && nKeyCode <= 57) || (nKeyCode >= 96 && nKeyCode <= 105)) {
        } else {
            e.preventDefault();
        }

        //11位后数字不能输入数字,当未选中时禁止输入
        if (sPhone.length > 10 && (target.selectionStart==target.selectionEnd ) && ((nKeyCode >= 48 && nKeyCode <= 57) || (nKeyCode >= 96 && nKeyCode <= 105))) {
            e.preventDefault();
        }
    },
    validatePhone: function (sPhone) {
        let nLen = sPhone.length;

        if (nLen != 11 || nLen == 11 && !/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(sPhone)) {
            return false;
        } else {
            return true;
        }
    }
}