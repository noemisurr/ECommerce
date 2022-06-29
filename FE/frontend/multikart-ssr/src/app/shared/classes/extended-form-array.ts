import { FormArray, FormGroup } from "@angular/forms";

export class ExFormArray extends FormArray {
    constructor(private formGroupBuilder: () => FormGroup) {
        super([]);
    }

    setValues(values: any[]) {
        values.forEach(value => {
            const fg = this.formGroupBuilder();
            fg.setValue(value);
            this.push(fg);
        })
    }
}