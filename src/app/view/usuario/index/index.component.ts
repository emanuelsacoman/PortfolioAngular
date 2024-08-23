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

  title = 'Emanuel Vinícius Sacoman';
  description = 'Página principal do desenvolvedor Emanuel Vinícius Sacoman.';
  
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
        this.projetos = res.map((projetos) => {
          return {
            id: projetos.payload.doc.id,
            ...(projetos.payload.doc.data() as any),
          } as Projetos;
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
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
        },
        {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
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

}
