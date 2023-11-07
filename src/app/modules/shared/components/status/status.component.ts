import {Component, Input} from '@angular/core';
import {EStatus} from "src/app/core/models/status.model";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
})
export class StatusComponent {
 @Input() status: EStatus = EStatus.active
  protected readonly EStatus = EStatus;
}
