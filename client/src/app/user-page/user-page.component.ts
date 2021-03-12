import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../shared/services/profile.service'

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
  }

}
