import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColumnEditableModel} from "./column-editable.model";
import {FormControl, FormGroup} from "@angular/forms";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-column-editable',
  templateUrl: './column-editable.component.html',
  styleUrls : ['./column-editable.component.css']
})

export class ColumnEditableComponent implements OnInit {

  @Input() public columns: ColumnEditableModel[] = [];
  @Output() public onSave = new EventEmitter<ColumnEditableModel[]>();
  @Output() public onCancel = new EventEmitter<void>();
  allChecked: boolean = true;
  formGroup = new FormGroup<any>({});

  ngOnInit() {
    for (const col of this.columns) {
      this.formGroup.registerControl(`${col.value}-show`, new FormControl(col.show),)
      this.formGroup.registerControl(`${col.value}-width`, new FormControl(col.width),)
    }
  }

  private _reset() {
    for (const col of this.columns) {
      this.formGroup.get(`${col.value}-width`)?.setValue(col.width);
      this.formGroup.get(`${col.value}-show`)?.setValue(col.show);
    }
  }

  onSubmit() {
    for (const col of this.columns) {
      col.show = this.formGroup.get(`${col.value}-show`)?.value;
      const newWidth = this.formGroup.get(`${col.value}-width`)?.value;
      col.width = newWidth < 1 ? null : newWidth;
      this.formGroup.get(`${col.value}-width`)?.setValue(col.width);
      console.log(col.width);
    }
    this.onSave.emit(this.columns);
    console.log(this.columns)
  }

  updateAllCheck() {
    this.allChecked = true;
    for (const col of this.columns) {
      if (this.formGroup.get(`${col.value}-show`)?.value == false) {
        this.allChecked = false;
        break;
      }
    }
  }

  onChange(checked: boolean): void {
    this.allChecked = checked;
    for (const col of this.columns) {
      this.formGroup.get(`${col.value}-show`)?.setValue(checked);
    }
  }

  isIndeterminate(): boolean {
    let show = false;
    for (const col of this.columns) {
      if (this.formGroup.get(`${col.value}-show`)?.value) {
        show = true;
        break;
      }
    }
    return show && !this.allChecked;
  }

  onCancelled() {
    this._reset();
    this.onCancel.emit()
  }

  onReset() {
    for (const col of this.columns) {
      this.formGroup.get(`${col.value}-width`)?.setValue(col.width == null);
      this.formGroup.get(`${col.value}-show`)?.setValue(col.show = true);
    }
    this.allChecked = true;
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

}
