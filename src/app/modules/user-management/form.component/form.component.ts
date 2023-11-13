import {Component} from "@angular/core";
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'form-component',
  templateUrl: 'form.component.html'
})
export class FormComponent{

  form : FormGroup = new FormGroup({
    firstname : new FormControl<string | null>({
      value : null , disabled: false
    },[Validators.required]),
    lastname : new FormControl<string | null>({
      value : null , disabled: false
    },[Validators.required]),
    phone : new FormControl<string | null>({
      value : null , disabled: false
    },[Validators.required]),
    position : new FormControl<string | null>({
      value : null , disabled: false
    },[Validators.required]),
    organization : new FormControl<string | null>({
      value : null , disabled: false
    },[Validators.required]),
    address : new FormControl<string | null>({
      value : null , disabled: false
    },[Validators.required]),
    photo : new  FormControl<File | string | null>({
      value : null, disabled: false
    },[Validators.required])
  })

  constructor(private _ref : MatDialogRef<FormComponent>) {
  }

  handleFileInput(target: any) {
    const file = target.files[0];
    if (file != null) {
      this.form.get('photo')?.setValue(file);
    }
  }

  onSave(){
    if (this.form.invalid){
      this.form.markAllAsTouched()
      return
    }

  }

  onClose (){
    this._ref.close(false);
  }
}
