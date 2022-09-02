import { Observable } from "knockout";
import * as ko from 'knockout';
require('knockout.validation');
class CaptchaComponent  {
        captchaInput: Observable<string>;
        disableFields: Observable<boolean>;  
        showSuccessMsg: Observable<boolean>;      
        isCaptchaValid: (() => boolean) | undefined;
        refreshCaptcha!: () => void;

        constructor(params: any) {            
            this.disableFields = params.disable;  
            this.showSuccessMsg = ko.observable(false);          
            this.captchaInput = ko.observable('').extend({
                validation: {
                    validator: () => {
                        if (this.isCaptchaValid) {
                            const isValid=this.isCaptchaValid();
                            this.showSuccessMsg(isValid);
                            return isValid;
                        }
                        return false;
                    },
                    message: "Please Enter Valid Captcha",                    
                }
            });
        }

        refresh() {
            if (this.refreshCaptcha) {
                this.refreshCaptcha();
            }
        }
    }

    export default {
    viewModel: CaptchaComponent,
    template: `
      <div class="form-group" style="background-color: floralwhite">
         <canvas id="canvas" data-bind="captcha: $data" ></canvas>
     </div>       
     <div class="form-group">
        <div class="input-group" data-bind="validationOptions:{ insertMessages: false }">         
          <input data-bind="value: captchaInput,disable: disableFields" class="form-control" style="color: black" placeholder="Enter Above Text Here And Press Enter" />
          <div class="input-group-append">
              <button class="btn btn-primary" 
                     data-bind="click: refresh, disable: disableFields" data-toggle="tooltip" data-placement="top" title="Refresh Captcha">
                  <span>Refresh</span></button> 
          </div>
        </div>
        <span class="text-danger" data-bind="validationMessage: captchaInput"></span>
        <span class="text-success" data-bind="visible: showSuccessMsg">Hurray!! Valid Captcha</span>
    </div>
`};