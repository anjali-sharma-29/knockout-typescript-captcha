import * as ko from 'knockout';
import { BindingHandler, ObservableArray } from 'knockout';
import Captcha from '../../external/jquery-captcha';

const captchaBinding = {
    init: (elm: any, va: () => any, all: () => any, vm: any) => {

        const cmp: any = va();
        const cp = new Captcha(elm, {
            width: 100,
            height: 40,
            font: 'bold 23px Arial',
            resourceType: 'aA0',
            resourceExtra: [],            
            caseSensitive: true,
            autoRefresh: false,
            clickRefresh: false
        });
       
        cmp.isCaptchaValid = () => {            
            const isValid = cp.valid(cmp.captchaInput());
            // Refresh captcha if its not valid
            if (!isValid) {
                cp.refresh();
                cmp.captchaInput('');
            }
            return isValid;            
        }

        cmp.refreshCaptcha = () => {           
            cp.refresh();
            cmp.captchaInput('');
            cmp.clearError();
        }
    }
   
}as BindingHandler; 

export default captchaBinding;
