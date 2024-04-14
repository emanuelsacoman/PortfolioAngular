import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Sobre } from 'src/app/model/services/interfaces/sobre';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { AuthService } from 'src/app/model/services/auth.service';
import { Sobrearea } from 'src/app/model/services/interfaces/sobrearea';
import { Resumo } from 'src/app/model/services/interfaces/resumo';

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
  public resumo: Resumo[] = [];

  public sobrearea: Sobrearea[] = [];
  //DB
  
  constructor(private http: HttpClient,
    private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthService) {
      this.firebaseService.obterTodosSobre().subscribe((res) => {
        this.sobre = res.map((sobre) => {
          return {
            id: sobre.payload.doc.id,
            ...(sobre.payload.doc.data() as any),
          } as Sobre;
        });
        this.sobreLoaded = true;
      });

      this.firebaseService.obterTodosSobreArea().subscribe((res) => {
        this.sobrearea = res.map((sobre) => {
          return {
            id: sobre.payload.doc.id,
            ...(sobre.payload.doc.data() as any),
          } as Sobrearea;
        });
      });

      this.firebaseService.obterTodosResumo().subscribe((res) => {
        this.resumo = res.map((resumo) => {
          return {
            id: resumo.payload.doc.id,
            ...(resumo.payload.doc.data() as any),
          } as Resumo;
        });
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

  goToAdmin(data: {sobre: Sobre, resumo: Resumo}) {
    this.router.navigateByUrl('/admin', { state: data });
}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
}
