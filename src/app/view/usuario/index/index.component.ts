import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  profileData: any;
  profileImageUrl!: string;

  constructor(private http: HttpClient,
    private route: Router,) { }

  ngOnInit() {
    this.getGitHubProfile();
  }

  getGitHubProfile() {
    this.http.get('https://api.github.com/users/emanuelsacoman').subscribe((data: any) => {
      this.profileData = data;
      this.profileImageUrl = data.avatar_url;
    });
  }

  selectedOption: string = 'sobre';

  selectOption(option: string) {
    this.selectedOption = option;
    console.log('Opção selecionada:', option);
  }

  isSelected(option: string) {
    return this.selectedOption === option;
  }
}
