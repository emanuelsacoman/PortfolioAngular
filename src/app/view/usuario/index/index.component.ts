import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Sobre } from 'src/app/model/services/interfaces/sobre';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { AuthService } from 'src/app/model/services/auth.service';
import { Sobrearea } from 'src/app/model/services/interfaces/sobrearea';
import { Resumo } from 'src/app/model/services/interfaces/resumo';
import { ResumoL } from 'src/app/model/services/interfaces/resumoL';
import { ResumoR } from 'src/app/model/services/interfaces/resumoR';
import { Projeto } from 'src/app/model/services/interfaces/projeto';
import { Projetos } from 'src/app/model/services/interfaces/projetos';
import { Contato } from 'src/app/model/services/interfaces/contato';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Profile } from 'src/app/model/services/interfaces/profile';
import { Observable } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, transition, style, animate } from '@angular/animations';
import { Slider } from 'src/app/model/services/interfaces/slider';
import { Meta, Title } from '@angular/platform-browser';
import { NgToastService } from 'ng-angular-popup';
import { Chip } from 'src/app/model/services/interfaces/chip';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class IndexComponent implements OnInit {
  profileData: any;
  profileImageUrl!: string;
  selectedOption: string = 'sobre';
  
  //DB
  public sobre: Sobre[] = [];
  public sobreLoaded = false;

  public resumo: Resumo[] = [];
  public resumoLoaded = false;

  public sobrearea: Sobrearea[] = [];
  public sobreAreaLoaded = false;

  public resumol: ResumoL[] = [];
  public resumolLoaded = false;

  public resumor: ResumoR[] = [];
  public resumorLoaded = false;

  public projeto: Projeto[] = [];
  public projetoLoaded = false;

  public projetos: Projetos[] = [];
  public projetosLoaded = false;

  public contato: Contato[] = [];
  public contatoLoaded = false;

  public profile: Profile[] = [];
  public profileLoaded = false;

  public slider: Slider[] = [];
  public sliderLoaded = false;

  perfil: Observable<any[]>;
  //DB

  //Form
  contactForm!: FormGroup;
  mensagemEnviada: boolean = false;
  //Form

  //Chart
  data: any;
  options: any;
  //Chart

  //Chip
  chipCreate!: FormGroup;
  chipClass!: Chip;
  chipname!: string;
  public chipArray: Chip[] = [];

  //Carousel
  languages!: any[];
  responsiveOptions!: any[];
  imagemCarousel: any;

  //Dates
  public christmas: boolean = false;
  public halloween: boolean = false;
  public newYear: boolean = false;
  public valentinesDay: boolean = false;
  public easter: boolean = false;
  public birthday: boolean = false;

  title = 'Emanuel Vinícius Sacoman';
  description = 'Página principal do desenvolvedor Emanuel Vinícius Sacoman.';

  public yearNow: any;
  
  constructor(private http: HttpClient,
    private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private titleService: Title,
    private metaService: Meta,
    private toast: NgToastService) {
      this.perfil = this.firestore.collection('profile').valueChanges();

      this.perfil.subscribe(perfis => {
        perfis.forEach(perfil => {
          const numero = perfil.numero;
        })
      })

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
        this.sobreAreaLoaded = true;
      });

      this.firebaseService.obterTodosResumo().subscribe((res) => {
        this.resumo = res.map((resumo) => {
          return {
            id: resumo.payload.doc.id,
            ...(resumo.payload.doc.data() as any),
          } as Resumo;
        });
        this.resumoLoaded = true;
      });

      this.firebaseService.obterTodosResumoL().subscribe((res) => {
        this.resumol = res.map((resumol) => {
          return {
            id: resumol.payload.doc.id,
            ...(resumol.payload.doc.data() as any),
          } as ResumoL;
        });
        this.resumolLoaded = true;
      });

      this.firebaseService.obterTodosResumoR().subscribe((res) => {
        this.resumor = res.map((resumor) => {
          return {
            id: resumor.payload.doc.id,
            ...(resumor.payload.doc.data() as any),
          } as ResumoR;
        });
        this.resumorLoaded = true;
      });

      this.firebaseService.obterTodosProjeto().subscribe((res) => {
        this.projeto = res.map((projeto) => {
          return {
            id: projeto.payload.doc.id,
            ...(projeto.payload.doc.data() as any),
          } as Projeto;
        });
        this.projetoLoaded = true;
      });

      this.firebaseService.obterTodosProjetos().subscribe((res) => {
        this.projetos = res
          .map((projetos) => {
            return {
              id: projetos.payload.doc.id,
              ...(projetos.payload.doc.data() as any),
            } as Projetos;
          })
          .sort((a, b) => {
            if (a.star === b.star) {
              if (!a.titulo || !b.titulo) return 0;
              return a.titulo.toLowerCase().localeCompare(b.titulo.toLowerCase());
            }
            return a.star ? -1 : 1;
          });
        this.projetosLoaded = true;
      });      

      this.firebaseService.obterTodosContato().subscribe((res) => {
        this.contato = res.map((contato) => {
          return {
            id: contato.payload.doc.id,
            ...(contato.payload.doc.data() as any),
          } as Contato;
        });
        this.contatoLoaded = true;
      });

      this.firebaseService.obterTodosProfile().subscribe((res) => {
        this.profile = res.map((profile) => {
          return {
            id: profile.payload.doc.id,
            ...(profile.payload.doc.data() as any),
          } as Profile;
        });
        this.profileLoaded = true;
      });

      this.firebaseService.obterTodosSlider().subscribe((res) => {
        this.slider = res.map((slider) => {
          return {
            id: slider.payload.doc.id,
            ...(slider.payload.doc.data() as any),
          } as Slider;
        });
        this.shuffleSlider();
        this.sliderLoaded = true;
      });

      this.firebaseService.obterTodosChip().subscribe((res) => {
        this.chipArray = res.map((chip) => {
          return {
            id: chip.payload.doc.id,
            ...(chip.payload.doc.data() as any),
          } as Chip;
        });
      });

      this.setDocTitle(this.title);
      this.setMetaDescription(this.description);

      //Carousel
  
      this.responsiveOptions = [
        {
          breakpoint: '1224px',
          numVisible: 4,
          numScroll: 1
        },
        {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 1
        },
        {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 1
        },
        {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
        }
      ];
    }


  ngOnInit() {
    this.getGitHubProfile();
    this.initForm();
    this.chart();
    this.getDates();
    this.getYearNow();
  }

  shuffleSlider(){
    for (let i = this.slider.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.slider[i], this.slider[j]] = [this.slider[j], this.slider[i]];
    }
  }

  setDocTitle(title: string) {
    console.log('current title:::::' + this.titleService.getTitle());
    this.titleService.setTitle(title);
  }

  setMetaDescription(description: string) {
    console.log('Updating meta description:::::', description);
    this.metaService.updateTag({ name: 'description', content: description });
  }

  initForm() {
    this.contactForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      mensagem: new FormControl('', [Validators.required]),
      titulo: new FormControl('', [Validators.required])
    });
  }

  getGitHubProfile() {
    this.perfil.subscribe((data: any[]) => {
      const githubUsername = data[0].github;
      const githubApiUrl = `https://api.github.com/users/${githubUsername}`;
      this.http.get(githubApiUrl).subscribe((githubData: any) => {
        this.profileData = githubData;
        this.profileImageUrl = githubData.avatar_url;
      });
    });
  }

  selectOption(option: string) {
    this.selectedOption = option;
    console.log('Opção selecionada:', option);
  }

  isSelected(option: string) {
    return this.selectedOption === option;
  }

  goToAdmin(data: {sobre: Sobre, resumo: Resumo, projeto: Projeto, contato: Contato, profile: Profile}) {
    this.router.navigateByUrl('/admin', { state: data });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  submit() {
    if (this.contactForm.valid) {
        const dados = {
            ...this.contactForm.value,
            timestamp: new Date(),
            visualizado: false,
            showDescription: false
        };

        this.firestore.collection('mensagens').add(dados)
            .then(() => {
                console.log('Mensagem enviada com sucesso!');
                this.contactForm.reset();
                this.mensagemEnviada = true;
                this.toast.success({
                    detail: "Sucesso!",
                    summary: "Mensagem enviada com sucesso",
                    duration: 5000
                });
            })
            .catch((error) => {
                console.error('Erro ao enviar mensagem:', error);
                this.toast.error({
                    detail: "Erro!",
                    summary: "Falha ao enviar mensagem. Tente novamente mais tarde.",
                    duration: 5000
                });
            });
    } else {
        this.toast.error({
            detail: "Erro!",
            summary: "Preencha todos os campos obrigatórios",
            duration: 5000
        });
    }
  }


  isInvalidControl(controlName: string) {
    const control = this.contactForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  goToZap(numero: string) {
    const numeroLimpo = numero.replace(/\D/g, '');
    const codigoPais = '55';
    const numeroFormatado = numeroLimpo.startsWith(codigoPais) ? numeroLimpo : codigoPais + numeroLimpo;

    window.open(`https://wa.me/${numeroFormatado}?text=Olá! Vim do seu Portfólio.`, '_blank');
  }

  goToEmail(email: string){
    window.open(`mailto:${email}`, '_blank');
  } 
  
  goToLocal(local: string){
    window.open(`https://www.google.com/maps/search/${local}`, '_blank');
  }

  chart() {
    this.data = {
      labels: ['Front-end', 'Web design', 'Back-end', 'Game dev'],
      datasets: [
        {
          label: 'Competências',
          data: [88, 73, 58, 55],
          backgroundColor: ['#2e86dd'],
          borderColor: ['#1b4f72'],                          
          borderWidth: 2,                                    
          borderRadius: 5,                                   
          barThickness: 20,                                  
          borderSkipped: 'left',                        
          hoverBackgroundColor: '#1b4f72', 
        },
      ],
    };
  
    this.options = {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
        y: {
          ticks: {
            align: 'start',
            display: true, 
          }
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
        datalabels: {
          anchor: 'end',
          align: 'top',
          color: '#fff', 
          font: {
            weight: 'bold',
          },
          padding: {
            top: 5, 
          },
          formatter: (value: number) => `${value}%`,
        },
      },
    };
  }  

  getBirth(){
    console.log('getBirth');
    this.perfil.subscribe((data: any[]) => {
      const dataNascimento = data[0].birth;
      const [day, month, year] = dataNascimento.split('/');
      const dataNascimentoFormatada = new Date(`${year}-${month}-${day}`);
      const dataAtual = new Date();
      const dataNascimentoMes = dataNascimentoFormatada.getMonth() + 1;
      const dataNascimentoDia = dataNascimentoFormatada.getDate() + 1;
      const dataAtualMes = dataAtual.getMonth() + 1;
      const dataAtualDia = dataAtual.getDate();
      console.log('dataNascimento:', dataNascimento);
      console.log('dataNascimentoFormatada:', dataNascimentoFormatada);
      console.log('dataAtual:', dataAtual);
      console.log('dataNascimentoMes:', dataNascimentoMes);
      console.log('dataNascimentoDia:', dataNascimentoDia);
      console.log('dataAtualMes:', dataAtualMes);
      console.log('dataAtualDia:', dataAtualDia);
      if(dataNascimentoMes === dataAtualMes && dataNascimentoDia === dataAtualDia){
        console.log('É aniversário!');
        this.birthday = true;
      };
    });
  }

  getDates() {
    const today = new Date();
    const year = today.getFullYear();

    const holidays = [
      { name: 'christmas', date: new Date(year, 11, 25) },
      { name: 'halloween', date: new Date(year, 9, 31) },
      { name: 'newYear', date: new Date(year, 0, 1) },
      { name: 'easter', date: this.calculateEasterDate(year) },
      
    ];

    holidays.forEach(holiday => {
      const timeDiff = holiday.date.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      if (daysDiff === 0) {
        (this as any)[holiday.name] = true; 
      }
      this.getBirth();
    });
    this.printHolidaysStatus();
  }

  calculateEasterDate(year: number): Date {
    const f = Math.floor,
      G = year % 19,
      C = f(year / 100),
      H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
      I = H - f(H / 28) * (1 - f(H / 28) * f(29 / (H + 1)) * f((21 - G) / 11)),
      J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
      L = I - J,
      month = 3 + f((L + 40) / 44),
      day = L + 28 - 31 * f(month / 4);
    return new Date(year, month - 1, day);
  }

  printHolidaysStatus() {
    console.log("Holidays Status:");
    console.log(`Christmas: ${this.christmas}`);
    console.log(`Halloween: ${this.halloween}`);
    console.log(`New Year: ${this.newYear}`);
    console.log(`Easter: ${this.easter}`);
    console.log(`Birthday: ${this.birthday}`);
  }

  getYearNow(){
    const today = new Date();
    this.yearNow = today.getFullYear();
  }
  

}
