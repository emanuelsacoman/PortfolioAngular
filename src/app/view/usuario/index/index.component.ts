import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Sobre } from 'src/app/model/services/interfaces/sobre';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  profileData: any;
  profileImageUrl!: string;

  //DB
  public sobre: Sobre[] = [];
  public sobreLoaded = false;
  //DB
  
  constructor(private http: HttpClient,
    private route: Router,
    private firebaseService: FirebaseService) {
      this.firebaseService.obterTodosSobre().subscribe((res) => {
        this.sobre = res.map((sobre) => {
          return {
            id: sobre.payload.doc.id,
            ...(sobre.payload.doc.data() as any),
          } as Sobre;
        });
        this.sobreLoaded = true;
      });
    }

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
