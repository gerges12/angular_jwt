import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Auth/services/token-storage.service';
import { User } from 'src/app/model/user.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: User;
  userid!: number;

  constructor(
    private profileService: ProfileService,
    private token: TokenStorageService
  ) {
    this.userid = this.token.getUserid();
    this.loadUserProfile();
  }

  ngOnInit(): void {}

  editUserView(User: User) {}

  loadUserProfile() {
    // console.log('fg', this.token.getUserid());
    this.profileService.getProfileInformation(this.userid).subscribe(
      (data) => {
        this.user = data;
        console.log('user inf is', this.user);
      },
      (error) => {}
    );
  }
}
