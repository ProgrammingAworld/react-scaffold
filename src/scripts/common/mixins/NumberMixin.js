/**
 * Created by anchao on 2016/7/11.
 */
export const NumberMixin = {
    onKeyDown:function (e) {
        let nKeyCode = e.which;
        if ((nKeyCode == 13) || (nKeyCode == 8) || (nKeyCode == 46) || (nKeyCode >= 37 && nKeyCode <= 40) || (nKeyCode >= 48 && nKeyCode <= 57) || (nKeyCode >= 96 && nKeyCode<= 105)) {
        }else {
            e.preventDefault();
        }
    }
};