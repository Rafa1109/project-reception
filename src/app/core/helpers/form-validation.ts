import { UntypedFormGroup } from '@angular/forms';

export class FormValidatorHelper {
    constructor(private validationMessages: ValidationMessages) { }

    processar(container: UntypedFormGroup): { [key: string]: string } {
        let messages: any = {};
        
        for (let controlKey in container.controls) {
            if (container.controls.hasOwnProperty(controlKey)) {
                let c = container.controls[controlKey];

                if (c instanceof UntypedFormGroup) {
                    let childMessages = this.processar(c);
                    Object.assign(messages, childMessages);
                } else {
                    if (this.validationMessages[controlKey]) {
                        messages[controlKey] = '';
                        if ((c.dirty || c.touched) && c.errors) {
                            Object.keys(c.errors).map(messageKey => {
                                if (this.validationMessages[controlKey][messageKey]) {
                                    messages[controlKey] += this.validationMessages[controlKey][messageKey] + '<br />';
                                }
                            });
                        }
                    }
                }
            }
        }
        return messages;
    }
}

export interface DisplayMessage {
    [key: string]: string
}
export interface ValidationMessages {
    [key: string]: { [key: string]: string } 
}
