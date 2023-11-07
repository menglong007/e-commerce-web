import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class LoadingService {
  private _loading: boolean = false;

  public get loading(): boolean {
    return this._loading;
  }

  public show() {
    this._loading = true;
  }

  public hide() {
    this._loading = false;
  }
}
