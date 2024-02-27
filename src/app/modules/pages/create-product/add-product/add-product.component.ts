import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
})
export class AddProductComponent {

  form = new FormGroup({

  })

  handleFileInput(target: any) {
    const file = target.files[0];
    if (file != null) {
      // this.form.get('photo')?.setValue(file);
    }
  }

}
