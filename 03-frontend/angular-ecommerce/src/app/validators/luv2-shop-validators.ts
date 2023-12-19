import { FormControl, ValidationErrors } from "@angular/forms";

export class Luv2ShopValidators{

    static notOnlyWhiteSpace(control: FormControl) : null | ValidationErrors{

        if(control.value != null && control.value.trim().length === 0){
            return {'notOnlyWhitespace': true };
        }
        return null;
    }

}
