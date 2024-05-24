import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  imports: [
    RouterOutlet
  ],
  standalone: true
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
