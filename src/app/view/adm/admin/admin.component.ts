import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { Chip } from 'src/app/model/services/interfaces/chip';
import { Contato } from 'src/app/model/services/interfaces/contato';
import { Profile, ProfileSocialLink } from 'src/app/model/services/interfaces/profile';
import { ProfileVisitStat } from 'src/app/model/services/interfaces/profile-visit-stat';
import { Projeto } from 'src/app/model/services/interfaces/projeto';
import { Projetos } from 'src/app/model/services/interfaces/projetos';
import { Resumo } from 'src/app/model/services/interfaces/resumo';
import { ResumoL } from 'src/app/model/services/interfaces/resumoL';
import { ResumoR } from 'src/app/model/services/interfaces/resumoR';
import { SiteTheme } from 'src/app/model/services/interfaces/site-theme';
import { Slider } from 'src/app/model/services/interfaces/slider';
import { Sobre } from 'src/app/model/services/interfaces/sobre';
import { Sobrearea } from 'src/app/model/services/interfaces/sobrearea';
import { MaterialIconsLoaderService } from 'src/app/model/shared/material-icons-loader.service';
import { resolveTechnologyIcon } from 'src/app/model/shared/technology-catalog';
import { ThemeService } from 'src/app/model/services/theme.service';
import Swal from 'sweetalert2';

interface SocialNetworkOption {
  value: string;
  label: string;
  icon: string;
  placeholder: string;
  hint: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {
  selectedOption: string = 'dashboard';

  // SOBRE
  sobreEdit!: FormGroup;
  sobre!: Sobre;
  title!: string;
  txt1!: string;
  txt2!: string;
  subtitle!: string;

  // SOBRE AREA
  sobreAreaEdit!: FormGroup;
  sobrearea!: Sobrearea;
  public sobreareaArray: Sobrearea[] = [];
  ctitle!: string;
  cdesc!: string;
  imagem: any;
  
  // RESUMO
  resumoEdit!: FormGroup;
  imagemResumo: any;
  resumo!: Resumo;
  titleArea!: string;
  lsub!: string;
  rsub!: string;
  chart!: string;
  chip!: string;
  
  // RESUMOL
  public resumol: ResumoL[] = [];
  titlel!: string;
  descl!: string;
  locationl!: string;
  
  // RESUMOR
  public resumor: ResumoR[] = [];
  titler!: string;
  descr!: string;
  locationr!: string;
  
  // PROJETOS
  public projetos: Projetos[] = [];
  
  //PROJETO
  projetoEdit!: FormGroup;
  projeto!: Projeto;
  titleProjeto!: string;

  //CONTATO
  contatoEdit!: FormGroup;
  contato!: Contato;
  titleContato!: string;
  descContato!: string;

  //EMAIL
  items: Observable<any[]>;

  //PROFILE
  profileEdit!: FormGroup;
  profile!: Profile;
  instagram!: string;
  facebook!: string;
  linkedin!: string;
  github!: string;
  phoneImg!: any;
  emailImg!: any;
  localImg!: any;
  birthImg!: any;
  phoneTXT!: string;
  emailTXT!: string;
  localTXT!: string;
  birthTXT!: string;
  phone!: string;
  email!: string;
  local!: string;
  birth!: string;
  cv!: string;
  text!: string;

  imagem1: any;
  imagem2: any;
  imagem3: any;
  imagem4: any;

  //SLIDER
  public slider: Slider[] = [];
  Carouselimg!: any;
  carouselCriar!: FormGroup;
  carousel!: Slider;
  imagemCarousel: any;

  //CHIP
  chipCreate!: FormGroup;
  chipClass!: Chip;
  chipname!: string;

  public chipArray: Chip[] = [];
  themeEdit!: FormGroup;
  siteTheme!: SiteTheme;
  readonly themeSections = [
    {
      title: 'Base do site',
      fields: [
        { key: 'pageBackgroundStart', label: 'Fundo inicial' },
        { key: 'pageBackgroundMiddle', label: 'Fundo central' },
        { key: 'pageBackgroundEnd', label: 'Fundo final' },
        { key: 'surface', label: 'Superficie' },
        { key: 'surfaceSoft', label: 'Superficie suave' },
        { key: 'border', label: 'Bordas' },
      ],
    },
    {
      title: 'Texto e identidade',
      fields: [
        { key: 'text', label: 'Texto principal' },
        { key: 'textSoft', label: 'Texto secundario' },
        { key: 'muted', label: 'Texto discreto' },
        { key: 'projectTitle', label: 'Titulo de projetos' },
      ],
    },
    {
      title: 'Acoes e estados',
      fields: [
        { key: 'primary', label: 'Primaria' },
        { key: 'primaryStrong', label: 'Primaria forte' },
        { key: 'secondary', label: 'Secundaria' },
        { key: 'success', label: 'Sucesso' },
        { key: 'warning', label: 'Aviso' },
        { key: 'danger', label: 'Perigo' },
      ],
    },
    {
      title: 'Admin',
      fields: [
        { key: 'adminBackground', label: 'Fundo admin' },
        { key: 'sidebarBackground', label: 'Sidebar' },
        { key: 'sidebarText', label: 'Texto sidebar' },
      ],
    },
  ];
  readonly socialNetworkOptions: SocialNetworkOption[] = [
    {
      value: 'instagram',
      label: 'Instagram',
      icon: 'alternate_email',
      placeholder: '@usuario ou https://instagram.com/usuario',
      hint: 'Aceita usuario ou URL completa.',
    },
    {
      value: 'facebook',
      label: 'Facebook',
      icon: 'thumb_up',
      placeholder: 'usuario ou https://facebook.com/usuario',
      hint: 'Aceita usuario, pagina ou URL completa.',
    },
    {
      value: 'linkedin',
      label: 'LinkedIn',
      icon: 'business_center',
      placeholder: 'usuario ou https://linkedin.com/in/usuario',
      hint: 'Use o identificador do perfil ou a URL.',
    },
    {
      value: 'github',
      label: 'GitHub',
      icon: 'code',
      placeholder: 'usuario ou https://github.com/usuario',
      hint: 'Aceita usuario ou URL completa.',
    },
    {
      value: 'buymeacoffee',
      label: 'Buy Me a Coffee',
      icon: 'local_cafe',
      placeholder: 'usuario ou https://www.buymeacoffee.com/usuario',
      hint: 'Use o nome do perfil no Buy Me a Coffee.',
    },
    {
      value: 'youtube',
      label: 'YouTube',
      icon: 'smart_display',
      placeholder: '@canal ou https://youtube.com/@canal',
      hint: 'Aceita canal, arroba ou URL completa.',
    },
    {
      value: 'x',
      label: 'X / Twitter',
      icon: 'tag',
      placeholder: '@usuario ou https://x.com/usuario',
      hint: 'Aceita usuario ou URL completa.',
    },
    {
      value: 'site',
      label: 'Site',
      icon: 'language',
      placeholder: 'https://seudominio.com',
      hint: 'Use a URL completa quando possivel.',
    },
    {
      value: 'email',
      label: 'E-mail',
      icon: 'mail',
      placeholder: 'nome@email.com',
      hint: 'Sera aberto como link de e-mail.',
    },
    {
      value: 'whatsapp',
      label: 'WhatsApp',
      icon: 'call',
      placeholder: '5511999999999',
      hint: 'Informe DDI, DDD e numero.',
    },
  ];
  public profileVisitStats: ProfileVisitStat[] = [];
  public visitChartData: any;
  public visitChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  };
  
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private toast: NgToastService,
    private materialIcons: MaterialIconsLoaderService,
    private themeService: ThemeService) {
      this.materialIcons.load();

      this.items = this.firestore.collection('mensagens').valueChanges();
      this.loadAdminCoreFallbacks();

      this.firebase.obterTodosSobreArea().subscribe((res) => {
        this.sobreareaArray = res
          .map((sobre) => {
            return {
              id: sobre.payload.doc.id,
              ...(sobre.payload.doc.data() as any),
            } as Sobrearea;
          })
          .sort((a, b) => this.compareSobreArea(a, b));
      });

      this.firebase.obterTodosResumoL().subscribe((res) => {
        this.resumol = res
          .map((resumol) => {
            return {
              id: resumol.payload.doc.id,
              ...(resumol.payload.doc.data() as any),
            } as ResumoL;
          })
          .sort((a, b) => this.compareResumoL(a, b));
      });

      this.firebase.obterTodosResumoR().subscribe((res) => {
        this.resumor = res
          .map((resumor) => {
            return {
              id: resumor.payload.doc.id,
              ...(resumor.payload.doc.data() as any),
            } as ResumoR;
          })
          .sort((a, b) => this.compareResumoR(a, b));
      });

      this.firebase.obterTodosProjetos().subscribe((res) => {
        this.projetos = res
          .map((projeto) => {
            return {
              id: projeto.payload.doc.id,
              ...(projeto.payload.doc.data() as any),
            } as Projetos;
          })
          .sort((a, b) => this.compareProjetos(a, b));
      });      

      this.firebase.obterTodosSlider().subscribe((res) => {
        this.slider = res
          .map((slider) => {
            return {
              id: slider.payload.doc.id,
              ...(slider.payload.doc.data() as any),
            } as Slider;
          })
          .sort((a, b) => this.compareSlider(a, b));
      });

      this.firebase.obterTodosChip().subscribe((res) => {
        this.chipArray = res
          .map((chip) => {
            return {
              id: chip.payload.doc.id,
              ...(chip.payload.doc.data() as any),
            } as Chip;
          })
          .sort((a, b) => this.compareChip(a, b));
      });

      this.firebase.obterVisitasPerfil().subscribe((res) => {
        this.profileVisitStats = res
          .map((visit) => ({
            id: visit.payload.doc.id,
            ...(visit.payload.doc.data() as ProfileVisitStat),
          }))
          .sort((a, b) => (a.date ?? '').localeCompare(b.date ?? ''));
        this.updateVisitChart();
      });

      this.firebase.obterTemaSite().subscribe((theme) => {
        this.applyThemeData(this.themeService.mergeWithDefault(theme));
      });
  }

  private loadAdminCoreFallbacks(): void {
    this.firebase.obterTodosSobre().subscribe((res) => {
      if (this.sobre?.id) {
        return;
      }

      const item = res.map((doc) => ({
        id: doc.payload.doc.id,
        ...(doc.payload.doc.data() as any),
      } as Sobre))[0];

      if (item) {
        this.applySobreData(item);
      }
    });

    this.firebase.obterTodosResumo().subscribe((res) => {
      if (this.resumo?.id) {
        return;
      }

      const item = res.map((doc) => ({
        id: doc.payload.doc.id,
        ...(doc.payload.doc.data() as any),
      } as Resumo))[0];

      if (item) {
        this.applyResumoData(item);
      }
    });

    this.firebase.obterTodosProjeto().subscribe((res) => {
      if (this.projeto?.id) {
        return;
      }

      const item = res.map((doc) => ({
        id: doc.payload.doc.id,
        ...(doc.payload.doc.data() as any),
      } as Projeto))[0];

      if (item) {
        this.applyProjetoData(item);
      }
    });

    this.firebase.obterTodosContato().subscribe((res) => {
      if (this.contato?.id) {
        return;
      }

      const item = res.map((doc) => ({
        id: doc.payload.doc.id,
        ...(doc.payload.doc.data() as any),
      } as Contato))[0];

      if (item) {
        this.applyContatoData(item);
      }
    });

    this.firebase.obterTodosProfile().subscribe((res) => {
      if (this.profile?.id) {
        return;
      }

      const item = res.map((doc) => ({
        id: doc.payload.doc.id,
        ...(doc.payload.doc.data() as any),
      } as Profile))[0];

      if (item) {
        this.applyProfileData(item);
      }
    });
  }

  logout(): void {
    Swal.fire({
        title: 'Tem certeza de que deseja deslogar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deslogar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            this.authService.deslogar()
                .then(() => {
                    this.router.navigate(['']);
                    this.toast.success({
                        detail: "Sucesso!",
                        summary: "Desconectado com sucesso",
                        duration: 5000
                    });
                })
                .catch((error) => {
                    console.error('Error logging out:', error);
                    this.toast.error({
                        detail: "Erro",
                        summary: "Falha ao desconectar.",
                        duration: 5000
                    });
                });
        }
    });
}

  ngOnInit(){
    this.initSobre();
    this.initResumo();
    this.initProjeto();
    this.initContato();
    this.initProfile();
    this.initChip();
    this.initSlider();
    this.initTheme();
  }

  initTheme(): void {
    this.applyThemeData(this.themeService.mergeWithDefault(this.siteTheme));
  }

  editTheme(): void {
    if (!this.themeEdit.valid) {
      this.themeEdit.markAllAsTouched();
      this.toast.error({
        detail: 'Erro!',
        summary: 'Revise as cores do tema.',
        duration: 5000
      });
      return;
    }

    const theme = this.themeService.mergeWithDefault(this.themeEdit.value);

    this.firebase.salvarTemaSite(theme)
      .then(() => {
        this.applyThemeData(theme);
        this.toast.success({
          detail: 'Sucesso!',
          summary: 'Tema salvo com sucesso',
          duration: 5000
        });
      })
      .catch((error) => {
        console.error('Erro ao salvar tema:', error);
        this.toast.error({
          detail: 'Erro!',
          summary: 'Falha ao salvar tema. Tente novamente mais tarde.',
          duration: 5000
        });
      });
  }

  resetTheme(): void {
    this.applyThemeData(this.themeService.defaultTheme);
  }

  previewTheme(): void {
    if (!this.themeEdit) {
      return;
    }

    this.themeService.applyTheme(this.themeService.mergeWithDefault(this.themeEdit.value));
  }

  private applyThemeData(theme: SiteTheme): void {
    this.siteTheme = theme;
    this.themeService.applyTheme(theme);
    this.themeEdit = this.formBuilder.group(this.createThemeControls(theme));
  }

  private createThemeControls(theme: SiteTheme): Record<string, any[]> {
    return Object.entries(theme).reduce((controls, [key, value]) => {
      if (key !== 'id') {
        controls[key] = key === 'name'
          ? [value, Validators.required]
          : [value, [Validators.required, Validators.pattern(/^#([0-9A-Fa-f]{6})$/)]];
      }

      return controls;
    }, {} as Record<string, any[]>);
  }

  initSlider(){
    this.carouselCriar = this.formBuilder.group({
      Carouselimg: ['', Validators.required] 
    });
  }

  initChip(){
    this.chipCreate = this.formBuilder.group({
      chipname: ['', Validators.required] 
    });
  }

  editContato() {
    if (this.contatoEdit.valid) {
        const paragraphs = this.getFormArrayValues(this.contatoParagraphs);
        const new_part: Contato = {
          ...this.contatoEdit.value,
          id: this.contato.id,
          descContato: paragraphs[0] ?? '',
          paragrafosContato: paragraphs
        };

        this.firebase.editarContato(new_part, this.contato.id)
            .then(() => {
                console.log('Contato atualizado com sucesso');
                this.router.navigate(['/']);
                this.toast.success({
                    detail: "Sucesso!",
                    summary: "Contato atualizado com sucesso",
                    duration: 5000
                });
            })
            .catch((error) => {
                console.error('Erro ao atualizar Contato:', error);
                this.toast.error({
                    detail: "Erro!",
                    summary: "Falha ao atualizar Contato. Tente novamente mais tarde.",
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

  initContato(){
    this.contato = history.state.contato || this.contato;
    console.log('Informações de contato:', this.contato);
    this.titleContato = this.contato?.titleContato;
    this.descContato = this.contato?.descContato;

    this.contatoEdit = this.formBuilder.group({
      titleContato: [this.titleContato, [Validators.required]],
      paragrafosContato: this.createParagraphArray(this.getContatoParagraphs(this.contato)),

    });
  }

  editProjeto() {
    if (this.projetoEdit.valid) {
        const new_part: Projeto = {...this.projetoEdit.value, id: this.projeto.id};

        this.firebase.editarProjeto(new_part, this.projeto.id)
            .then(() => {
                console.log('Projeto atualizado com sucesso');
                this.router.navigate(['/']);
                this.toast.success({
                    detail: "Sucesso!",
                    summary: "Projeto atualizado com sucesso",
                    duration: 5000
                });
            })
            .catch((error) => {
                console.error('Erro ao atualizar Projeto:', error);
                this.toast.error({
                    detail: "Erro!",
                    summary: "Falha ao atualizar Projeto. Tente novamente mais tarde.",
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

  
  initProjeto(){
    this.projeto = history.state.projeto || this.projeto;
    console.log('Informações de projeto:', this.projeto);
    this.titleProjeto = this.projeto?.titleProjeto;

    this.projetoEdit = this.formBuilder.group({
      titleProjeto: [this.titleProjeto, [Validators.required]],

    });
  }

  initSobre(){
    this.sobre = history.state.sobre || this.sobre;
    console.log('Informações da sobre:', this.sobre);
    this.title = this.sobre?.title;
    this.txt1 = this.sobre?.txt1;
    this.txt2 = this.sobre?.txt2;
    this.subtitle = this.sobre?.subtitle;

    this.sobreEdit = this.formBuilder.group({
      title: [this.title, [Validators.required]],
      subtitle: [this.subtitle, [Validators.required]],
      paragrafos: this.createParagraphArray(this.getSobreParagraphs(this.sobre)),
    });
  }

  editSobre() {
    if (this.sobreEdit.valid) {
        const paragraphs = this.getFormArrayValues(this.sobreParagraphs);
        const new_part: Sobre = {
          ...this.sobreEdit.value,
          id: this.sobre.id,
          txt1: paragraphs[0] ?? '',
          txt2: paragraphs[1] ?? '',
          paragrafos: paragraphs
        };

        this.firebase.editarSobre(new_part, this.sobre.id)
            .then(() => {
                console.log('Sobre atualizado com sucesso');
                this.router.navigate(['/']);
                this.toast.success({
                    detail: "Sucesso!",
                    summary: "Sobre atualizado com sucesso",
                    duration: 5000
                });
            })
            .catch((error) => {
                console.error('Erro ao atualizar Sobre:', error);
                this.toast.error({
                    detail: "Erro!",
                    summary: "Falha ao atualizar Sobre. Tente novamente mais tarde.",
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


  editar(sobrearea: Sobrearea){
    console.log('Item clicado:', sobrearea);
    
    this.router.navigateByUrl("/itemedit", {state: { sobrearea: sobrearea } });
  }

  //RESUMO
  initResumo(){
    this.resumo = history.state.resumo || this.resumo;
    console.log('Informações da resumo:', this.resumo);
    this.titleArea = this.resumo?.titleArea;
    this.lsub = this.resumo?.lsub;
    this.rsub = this.resumo?.rsub;
    this.chart = this.resumo?.chart;
    this.chip = this.resumo?.chip;

    this.resumoEdit = this.formBuilder.group({
      titleArea: [this.titleArea, [Validators.required]],
      lsub: [this.lsub, [Validators.required]],
      rsub: [this.rsub, [Validators.required]],
      chart: [this.chart, [Validators.required]],
      chip: [this.chip, [Validators.required]],
      rImg: [null],
      lImg: [null],
    });
  }

  editResumo() {
    if (this.resumoEdit.valid) {
        const new_part: Resumo = {...this.resumoEdit.value, id: this.resumo.id};

        this.firebase.editarResumo(new_part, this.resumo.id)
            .then(() => {
                console.log('Resumo atualizado com sucesso');
                this.router.navigate(['/']);
                this.toast.success({
                    detail: "Sucesso!",
                    summary: "Resumo atualizado com sucesso",
                    duration: 5000
                });
            })
            .catch((error) => {
                console.error('Erro ao atualizar Resumo:', error);
                this.toast.error({
                    detail: "Erro!",
                    summary: "Falha ao atualizar Resumo. Tente novamente mais tarde.",
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

  addresumol(){
    const create: ResumoL = new ResumoL("","","","");
    create.orderl = this.resumol.length + 1;
    this.firebase.cadastrarResumoL(create);
  }

  editarl(resumol: ResumoL){
    console.log('Item clicado:', resumol);
    
    this.router.navigateByUrl("/resumoledit", {state: { resumol: resumol } });
  }

  addresumor(){
    const create: ResumoR = new ResumoR("","","","");
    create.orderr = this.resumor.length + 1;
    this.firebase.cadastrarResumoR(create);
  }

  editarr(resumor: ResumoR){
    console.log('Item clicado:', resumor);
    
    this.router.navigateByUrl("/resumoredit", {state: { resumor: resumor } });
  }

  goBack(){
    this.router.navigateByUrl('/');
  }

  cadastrar(){
    const create: Sobrearea = new Sobrearea("","","", null);
    create.ordem = this.sobreareaArray.length + 1;
    this.firebase.cadastrarSobreArea(create);
  }

  get sobreParagraphs(): FormArray<FormControl<string>> {
    return this.sobreEdit.get('paragrafos') as FormArray<FormControl<string>>;
  }

  get contatoParagraphs(): FormArray<FormControl<string>> {
    return this.contatoEdit.get('paragrafosContato') as FormArray<FormControl<string>>;
  }

  addSobreParagraph(): void {
    this.sobreParagraphs.push(this.createParagraphControl());
  }

  removeSobreParagraph(index: number): void {
    this.removeParagraph(this.sobreParagraphs, index);
  }

  addContatoParagraph(): void {
    this.contatoParagraphs.push(this.createParagraphControl());
  }

  removeContatoParagraph(index: number): void {
    this.removeParagraph(this.contatoParagraphs, index);
  }

  private createParagraphArray(values: string[]): FormArray<FormControl<string>> {
    const paragraphs = values.length ? values : [''];
    return this.formBuilder.array(paragraphs.map((value) => this.createParagraphControl(value)));
  }

  private createParagraphControl(value = ''): FormControl<string> {
    return this.formBuilder.control(value, {
      nonNullable: true,
      validators: [Validators.required]
    });
  }

  private removeParagraph(formArray: FormArray<FormControl<string>>, index: number): void {
    if (formArray.length <= 1) {
      formArray.at(0).setValue('');
      return;
    }

    formArray.removeAt(index);
  }

  private getFormArrayValues(formArray: FormArray<FormControl<string>>): string[] {
    return formArray.controls
      .map((control) => control.value.trim())
      .filter(Boolean);
  }

  private getSobreParagraphs(sobre?: Sobre): string[] {
    if (sobre?.paragrafos?.length) {
      return sobre.paragrafos;
    }

    return [sobre?.txt1, sobre?.txt2]
      .map((paragraph) => paragraph?.trim() ?? '')
      .filter(Boolean);
  }

  private getContatoParagraphs(contato?: Contato): string[] {
    if (contato?.paragrafosContato?.length) {
      return contato.paragrafosContato;
    }

    return [contato?.descContato]
      .map((paragraph) => paragraph?.trim() ?? '')
      .filter(Boolean);
  }

  cadastrarProjeto(){
    const create: Projetos = new Projetos("","","","","", false, false);
    create.ordem = this.projetos.length + 1;
    this.firebase.cadastrarProjetos(create);
  }

  editarProjeto(projeto: Projetos){
    console.log('Item clicado:', projeto);
    
    this.router.navigateByUrl("/projetoedit", {state: { projeto: projeto } });
  }
  
  uploadFile(event: any){
    this.imagem = event.target.files;
  }

  uploadFileL(event: any){
    this.imagem = event.target.files;
  }
  uploadFileR(event: any){
    this.imagem = event.target.files;
  }
  
  selectOption(option: string) {
    this.selectedOption = option;
    console.log('Opção selecionada:', option);
  }
  
  isSelected(option: string) {
    return this.selectedOption === option;
  }

  get profileDataTitle(): string {
    return this.profile?.text || this.profile?.github || 'Portfolio';
  }

  get publishedProjectsCount(): number {
    return this.projetos.filter((item) => item.inProgress).length;
  }

  get draftProjectsCount(): number {
    return this.projetos.filter((item) => !item.inProgress).length;
  }

  get featuredProjectsCount(): number {
    return this.projetos.filter((item) => item.star).length;
  }

  get totalProjectClicks(): number {
    return this.projetos.reduce((total, item) => total + this.getProjectClickCount(item), 0);
  }

  getProjectClickCount(project: Projetos): number {
    return Number(project.clickCount) || 0;
  }

  getProjectTechnologyIcon(project: Projetos): string {
    return resolveTechnologyIcon(project.technologyIconId, project.badge);
  }

  get homeBlocksCount(): number {
    return this.sobreareaArray.length + this.slider.length;
  }

  get sobreParagraphCount(): number {
    return this.getSobreParagraphs(this.sobre).length;
  }

  get contactParagraphCount(): number {
    return this.getContatoParagraphs(this.contato).length;
  }

  get contentHealthScore(): number {
    const checks = [
      this.projetos.length > 0,
      this.featuredProjectsCount > 0,
      this.sobreareaArray.length > 0,
      this.sobreParagraphCount > 0,
      this.contactParagraphCount > 0,
      this.chipArray.length >= 4,
      Boolean(this.profile?.github),
      Boolean(this.profile?.cv),
    ];
    const completed = checks.filter(Boolean).length;

    return Math.round((completed / checks.length) * 100);
  }

  get priorityProjects(): Projetos[] {
    return [...this.projetos]
      .sort((a, b) => {
        if (a.star !== b.star) {
          return a.star ? -1 : 1;
        }

        if (a.inProgress !== b.inProgress) {
          return a.inProgress ? -1 : 1;
        }

        return this.compareProjetos(a, b);
      })
      .slice(0, 5);
  }

  get totalProfileVisitors(): number {
    return this.profileVisitStats.reduce((total, item) => total + (Number(item.uniqueVisitors) || 0), 0);
  }

  get todayProfileVisitors(): number {
    const today = this.getLocalDateKey();
    return Number(this.profileVisitStats.find((item) => item.date === today)?.uniqueVisitors) || 0;
  }

  unreadMessagesCount(messages: any[]): number {
    return messages.filter((item) => !item.visualizado).length;
  }

  recentMessages(messages: any[]): any[] {
    return [...messages]
      .sort((a, b) => this.messageTime(b) - this.messageTime(a))
      .slice(0, 4);
  }

  convertTimestampToDate(timestamp: any): Date {
    if (!timestamp?.seconds) {
      return new Date();
    }

    return new Date(timestamp.seconds * 1000); 
  }

  private messageTime(item: any): number {
    return Number(item?.timestamp?.seconds ?? 0);
  }

  private updateVisitChart(): void {
    this.visitChartData = {
      labels: this.profileVisitStats.map((item) => this.formatVisitDate(item.date)),
      datasets: [
        {
          label: 'Visitantes',
          data: this.profileVisitStats.map((item) => Number(item.uniqueVisitors) || 0),
          borderColor: '#2e86dd',
          backgroundColor: 'rgba(46, 134, 221, 0.14)',
          pointBackgroundColor: '#2e86dd',
          pointBorderColor: '#fff',
          pointRadius: 4,
          fill: true,
          tension: 0.35,
        },
      ],
    };
  }

  private formatVisitDate(date: string): string {
    const [, month, day] = date.split('-');
    return `${day}/${month}`;
  }

  private getLocalDateKey(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private applySobreData(sobre: Sobre): void {
    this.sobre = sobre;
    this.title = sobre?.title;
    this.txt1 = sobre?.txt1;
    this.txt2 = sobre?.txt2;
    this.subtitle = sobre?.subtitle;

    if (this.sobreEdit) {
      this.sobreEdit = this.formBuilder.group({
        title: [this.title, [Validators.required]],
        subtitle: [this.subtitle, [Validators.required]],
        paragrafos: this.createParagraphArray(this.getSobreParagraphs(this.sobre)),
      });
    }
  }

  private applyResumoData(resumo: Resumo): void {
    this.resumo = resumo;
    this.titleArea = resumo?.titleArea;
    this.lsub = resumo?.lsub;
    this.rsub = resumo?.rsub;
    this.chart = resumo?.chart;
    this.chip = resumo?.chip;

    if (this.resumoEdit) {
      this.resumoEdit.patchValue({
        titleArea: this.titleArea,
        lsub: this.lsub,
        rsub: this.rsub,
        chart: this.chart,
        chip: this.chip,
      });
    }
  }

  private applyProjetoData(projeto: Projeto): void {
    this.projeto = projeto;
    this.titleProjeto = projeto?.titleProjeto;

    if (this.projetoEdit) {
      this.projetoEdit.patchValue({
        titleProjeto: this.titleProjeto,
      });
    }
  }

  private applyContatoData(contato: Contato): void {
    this.contato = contato;
    this.titleContato = contato?.titleContato;
    this.descContato = contato?.descContato;

    if (this.contatoEdit) {
      this.contatoEdit = this.formBuilder.group({
        titleContato: [this.titleContato, [Validators.required]],
        paragrafosContato: this.createParagraphArray(this.getContatoParagraphs(this.contato)),
      });
    }
  }

  private applyProfileData(profile: Profile): void {
    this.profile = profile;
    this.instagram = profile?.instagram;
    this.facebook = profile?.facebook;
    this.linkedin = profile?.linkedin;
    this.github = profile?.github;
    this.phone = profile?.phone;
    this.email = profile?.email;
    this.local = profile?.local;
    this.birth = profile?.birth;
    this.phoneTXT = profile?.phoneTXT;
    this.emailTXT = profile?.emailTXT;
    this.localTXT = profile?.localTXT;
    this.birthTXT = profile?.birthTXT;
    this.cv = profile?.cv;
    this.text = profile?.text;

    if (this.profileEdit) {
      this.profileEdit = this.formBuilder.group({
        socialLinks: this.createSocialLinksArray(this.getProfileSocialLinks(this.profile)),
        phone: [this.phone, Validators.required],
        email: [this.email, Validators.required],
        local: [this.local, Validators.required],
        birth: [this.birth, Validators.required],
        phoneTXT: [this.phoneTXT, Validators.required],
        emailTXT: [this.emailTXT, Validators.required],
        localTXT: [this.localTXT, Validators.required],
        birthTXT: [this.birthTXT, Validators.required],
        cv: [this.cv, Validators.required],
        text: [this.text, Validators.required],
        imagem1: [null],
        imagem2: [null],
        imagem3: [null],
        imagem4: [null]
      });
    }
  }

  showDescription(item: any): void {
    item.showDescription = !item.showDescription; 
    this.updateShowDescription(item);
  }

  updateShowDescription(item: any): void {
      this.firestore.collection('mensagens', ref => ref.where('mensagem', '==', item.mensagem))
          .get()
          .subscribe(querySnapshot => {
              const batch = this.firestore.firestore.batch();
              querySnapshot.forEach(doc => {
                  batch.update(doc.ref, { 
                      showDescription: item.showDescription, 
                      visualizado: true 
                  });
              });

              batch.commit().catch(error => {
                  console.error('Erro ao atualizar showDescription:', error);
              });
          }, error => {
              console.error('Erro ao buscar email:', error);
          });
  } 

  deleteEmail(mensagem: string) {
    Swal.fire({
        title: 'Tem certeza de que deseja excluir este email?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            this.firestore.collection('mensagens', ref => ref.where('mensagem', '==', mensagem))
                .get()
                .subscribe(querySnapshot => {
                    const batch = this.firestore.firestore.batch();
                    querySnapshot.forEach(doc => {
                        batch.delete(doc.ref);
                    });

                    batch.commit()
                        .then(() => {
                            this.toast.success({
                                detail: "Sucesso!",
                                summary: "Email excluído com sucesso",
                                duration: 5000
                            });
                        })
                        .catch(error => {
                            console.error('Erro ao excluir email:', error);
                            this.toast.error({
                                detail: "Erro!",
                                summary: "Falha ao excluir email. Tente novamente mais tarde.",
                                duration: 5000
                            });
                        });
                }, error => {
                    console.error('Erro ao buscar email:', error);
                    this.toast.error({
                        detail: "Erro!",
                        summary: "Falha ao buscar email. Tente novamente mais tarde.",
                        duration: 5000
                    });
                });
        }
    });
  }

  //PROFILE
  initProfile(){
    this.profile = history.state.profile || this.profile;
    console.log('Informações da profile:', this.profile);
    this.instagram = this.profile?.instagram;
    this.facebook = this.profile?.facebook;
    this.linkedin = this.profile?.linkedin;
    this.github = this.profile?.github;
    this.phone = this.profile?.phone;
    this.email = this.profile?.email;
    this.local = this.profile?.local;
    this.birth = this.profile?.birth;
    this.phoneTXT = this.profile?.phoneTXT;
    this.emailTXT = this.profile?.emailTXT;
    this.localTXT = this.profile?.localTXT;
    this.birthTXT = this.profile?.birthTXT;
    this.cv = this.profile?.cv;
    this.text = this.profile?.text;

    this.profileEdit = this.formBuilder.group({
      socialLinks: this.createSocialLinksArray(this.getProfileSocialLinks(this.profile)),
      phone: [this.phone, Validators.required],
      email: [this.email, Validators.required],
      local: [this.local, Validators.required],
      birth: [this.birth, Validators.required],
      phoneTXT: [this.phoneTXT, Validators.required],
      emailTXT: [this.emailTXT, Validators.required],
      localTXT: [this.localTXT, Validators.required],
      birthTXT: [this.birthTXT, Validators.required],
      cv: [this.cv, Validators.required],
      text: [this.text, Validators.required],
      imagem1: [null],
      imagem2: [null],
      imagem3: [null],
      imagem4: [null]
    });
  }

  editProfile() {
    if (this.profileEdit.valid) {
      const socialLinks = this.getSocialLinksValues();
      const new_part: Profile = {
        ...this.profileEdit.value,
        id: this.profile.id,
        socialLinks,
        instagram: this.getLegacySocialValue(socialLinks, 'instagram'),
        facebook: this.getLegacySocialValue(socialLinks, 'facebook'),
        linkedin: this.getLegacySocialValue(socialLinks, 'linkedin'),
        github: this.getLegacySocialValue(socialLinks, 'github'),
        phoneImg: this.profile.phoneImg,
        emailImg: this.profile.emailImg,
        localImg: this.profile.localImg,
        birthImg: this.profile.birthImg
      };
  
      // Verifica se imagem1 foi carregada
      if (this.imagem1) {
        this.firebase.uploadImageProfilePhone(this.imagem1, new_part)?.then(() => {
          this.updateProfile(new_part);
        }).catch((error) => {
          console.log('Erro ao fazer upload da imagem de telefone:', error);
        });
      } else if (this.imagem2) { // Se imagem1 não foi carregada, verifica se imagem2 foi carregada
        this.firebase.uploadImageProfileEmail(this.imagem2, new_part)?.then(() => {
          this.updateProfile(new_part);
        }).catch((error) => {
          console.log('Erro ao fazer upload da imagem de e-mail:', error);
        });
      } else if (this.imagem3) { // Se imagem1 e imagem2 não foram carregadas, verifica se imagem3 foi carregada
        this.firebase.uploadImageProfileLocal(this.imagem3, new_part)?.then(() => {
          this.updateProfile(new_part);
        }).catch((error) => {
          console.log('Erro ao fazer upload da imagem de localização:', error);
        });
      } else if (this.imagem4) { // Se imagem1, imagem2 e imagem3 não foram carregadas, verifica se imagem4 foi carregada
        this.firebase.uploadImageProfileBirth(this.imagem4, new_part)?.then(() => {
          this.updateProfile(new_part);
        }).catch((error) => {
          console.log('Erro ao fazer upload da imagem de nascimento:', error);
        });
      } else {
        // Se nenhuma imagem foi carregada, atualiza o perfil com as imagens existentes
        this.updateProfile(new_part);
      }
    } else {
      window.alert('Campos obrigatórios!');
    }
  }

  get socialLinks(): FormArray<FormGroup> {
    return this.profileEdit.get('socialLinks') as FormArray<FormGroup>;
  }

  addSocialLink(network = this.getNextSocialNetwork()): void {
    this.socialLinks.push(this.createSocialLinkGroup({ network }));
  }

  addBuyMeACoffeeLink(): void {
    this.addSocialLink('buymeacoffee');
  }

  removeSocialLink(index: number): void {
    this.socialLinks.removeAt(index);
    this.socialLinks.markAsDirty();
    this.socialLinks.updateValueAndValidity();
  }

  dropSocialLink(event: CdkDragDrop<FormGroup[]>): void {
    if (event.previousIndex === event.currentIndex) {
      return;
    }

    const movedControl = this.socialLinks.at(event.previousIndex);
    this.socialLinks.removeAt(event.previousIndex);
    this.socialLinks.insert(event.currentIndex, movedControl);
    this.socialLinks.markAsDirty();
    this.socialLinks.updateValueAndValidity();
  }

  onSocialNetworkChange(index: number): void {
    const group = this.socialLinks.at(index);
    const network = group.get('network')?.value;
    const option = this.socialNetworkOptions.find((item) => item.value === network);
    const currentLabel = String(group.get('label')?.value || '').trim();
    const isDefaultLabel = this.socialNetworkOptions.some((item) => item.label === currentLabel);

    if (option && (!currentLabel || isDefaultLabel)) {
      group.patchValue({ label: option.label });
    }
  }

  getSocialNetworkOption(index: number): SocialNetworkOption {
    const network = String(this.socialLinks.at(index).get('network')?.value || '');
    return this.getSocialOption(network);
  }

  getSocialValuePlaceholder(index: number): string {
    return this.getSocialNetworkOption(index).placeholder;
  }

  getSocialValueHint(index: number): string {
    return this.getSocialNetworkOption(index).hint;
  }

  getSocialPreviewUrl(index: number): string {
    const group = this.socialLinks.at(index);
    const network = String(group.get('network')?.value || '').trim();
    const value = String(group.get('value')?.value || '').trim();

    if (!value) {
      return '';
    }

    if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('mailto:')) {
      return value;
    }

    const username = value.replace(/^@/, '');

    switch (network) {
      case 'instagram':
        return `https://instagram.com/${username}`;
      case 'facebook':
        return `https://facebook.com/${username}`;
      case 'linkedin':
        return `https://www.linkedin.com/in/${username}`;
      case 'github':
        return `https://github.com/${username}`;
      case 'buymeacoffee':
        return `https://www.buymeacoffee.com/${username}`;
      case 'youtube':
        return `https://youtube.com/${value}`;
      case 'x':
        return `https://x.com/${username}`;
      case 'email':
        return `mailto:${value}`;
      case 'whatsapp':
        return `https://wa.me/${value.replace(/\D/g, '')}`;
      default:
        return value.startsWith('www.') ? `https://${value}` : value;
    }
  }

  private createSocialLinksArray(values: ProfileSocialLink[]): FormArray<FormGroup> {
    const links = values.length ? values : [{ network: 'instagram', label: 'Instagram', value: '' }];
    return this.formBuilder.array(links.map((link) => this.createSocialLinkGroup(link)));
  }

  private createSocialLinkGroup(link: Partial<ProfileSocialLink> = {}): FormGroup {
    const option = this.getSocialOption(link.network || 'instagram');

    return this.formBuilder.group({
      network: [link.network || option.value, Validators.required],
      label: [link.label || option.label, Validators.required],
      value: [link.value || '', Validators.required],
    });
  }

  private getSocialLinksValues(): ProfileSocialLink[] {
    return this.socialLinks.controls
      .map((control) => ({
        network: String(control.get('network')?.value || '').trim(),
        label: String(control.get('label')?.value || '').trim(),
        value: String(control.get('value')?.value || '').trim(),
      }))
      .filter((link) => Boolean(link.network && link.label && link.value));
  }

  private getProfileSocialLinks(profile?: Profile): ProfileSocialLink[] {
    if (profile?.socialLinks?.length) {
      return profile.socialLinks;
    }

    return [
      { network: 'instagram', label: 'Instagram', value: profile?.instagram ?? '' },
      { network: 'facebook', label: 'Facebook', value: profile?.facebook ?? '' },
      { network: 'linkedin', label: 'LinkedIn', value: profile?.linkedin ?? '' },
      { network: 'github', label: 'GitHub', value: profile?.github ?? '' },
    ].filter((link) => Boolean(link.value?.trim()));
  }

  private getLegacySocialValue(links: ProfileSocialLink[], network: string): string {
    return links.find((link) => link.network === network)?.value ?? '';
  }

  private getSocialOption(network: string): SocialNetworkOption {
    return this.socialNetworkOptions.find((item) => item.value === network) ?? this.socialNetworkOptions[0];
  }

  private getNextSocialNetwork(): string {
    const usedNetworks = new Set(this.socialLinks.controls.map((control) => String(control.get('network')?.value || '')));
    return this.socialNetworkOptions.find((option) => !usedNetworks.has(option.value))?.value ?? 'site';
  }
  
  // Função para atualizar o perfil após o upload de todas as imagens
  updateProfile(new_part: Profile) {
    this.firebase.editarProfile(new_part, this.profile.id)
        .then(() => {
            console.log('Profile atualizado com sucesso');
            this.router.navigate(['']);
            this.toast.success({
                detail: "Sucesso!",
                summary: "Perfil atualizado com sucesso",
                duration: 5000
            });
        })
        .catch((error) => {
            console.error('Erro ao atualizar Profile:', error);
            this.toast.error({
                detail: "Erro!",
                summary: "Falha ao atualizar Perfil. Tente novamente mais tarde.",
                duration: 5000
            });
        });
  }

  
  handlePhoneImageUpload(event: any){
    this.imagem1 = event.target.files;
  }

  handleEmailImageUpload(event: any){
    this.imagem2 = event.target.files;
  }

  handleLocalImageUpload(event: any){
    this.imagem3 = event.target.files;
  }

  handleBirthImageUpload(event: any){
    this.imagem4 = event.target.files;
  }

  chipCreateForm() {
    const chipValue = this.chipCreate.get('chipname')?.value;
    const create: Chip = new Chip("", chipValue);
    create.ordem = this.chipArray.length + 1;
  
    this.firebase.cadastrarChip(create);
    this.chipCreate.reset();
  }

  deleteChip(id: any) {
    Swal.fire({
      title: 'Tem certeza de que deseja excluir este chip?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.firebase.excluirChip(id)
          .then(() => {
            this.toast.success({
              detail: "Sucesso!",
              summary: "Chip excluído com sucesso",
              duration: 5000
            });
          })
          .catch((error) => {
            console.error('Erro ao excluir chip:', error);
            this.toast.error({
              detail: "Erro!",
              summary: "Falha ao excluir chip. Tente novamente mais tarde.",
              duration: 5000
            });
          });
      }
    });
  }

  editSliderImg(slider: Slider){
    console.log('Item clicado:', slider);
    
    this.router.navigateByUrl("/slideredit", {state: { slider: slider } });
  }

  cadastrarSlider(){
    if(this.carouselCriar.valid){
      const create: Slider = new Slider("", null);
      create.ordem = this.slider.length + 1;
      this.firebase.uploadImageSlider(this.imagemCarousel, create);
        this.carouselCriar.reset();
      }
    }
  
  uploadFileCarousel(event: any){
    this.imagemCarousel = event.target.files;
  }
  
  deletarCarousel(slider: Slider) {
    Swal.fire({
      title: 'Tem certeza de que deseja excluir este slider?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.firebase.excluirSlider(slider.id)
          .then(() => {
            this.toast.success({
              detail: "Sucesso!",
              summary: "Slider excluído com sucesso",
              duration: 5000
            });
          })
          .catch((error) => {
            console.error('Erro ao excluir slider:', error);
            this.toast.error({
              detail: "Erro!",
              summary: "Falha ao excluir slider. Tente novamente mais tarde.",
              duration: 5000
            });
          });
      }
    });
  }

  dropSobreArea(event: CdkDragDrop<Sobrearea[]>): void {
    this.reorderItems(event, this.sobreareaArray, (items) => this.firebase.reordenarSobreArea(items), 'Areas reordenadas com sucesso');
  }

  dropResumoL(event: CdkDragDrop<ResumoL[]>): void {
    this.reorderItems(event, this.resumol, (items) => this.firebase.reordenarResumoL(items), 'Formacao reordenada com sucesso');
  }

  dropResumoR(event: CdkDragDrop<ResumoR[]>): void {
    this.reorderItems(event, this.resumor, (items) => this.firebase.reordenarResumoR(items), 'Experiencia reordenada com sucesso');
  }

  dropProjetos(event: CdkDragDrop<Projetos[]>): void {
    this.reorderItems(event, this.projetos, (items) => this.firebase.reordenarProjetos(items), 'Projetos reordenados com sucesso');
  }

  dropSlider(event: CdkDragDrop<Slider[]>): void {
    this.reorderItems(event, this.slider, (items) => this.firebase.reordenarSlider(items), 'Carrossel reordenado com sucesso');
  }

  dropChip(event: CdkDragDrop<Chip[]>): void {
    this.reorderItems(event, this.chipArray, (items) => this.firebase.reordenarChip(items), 'Conhecimentos reordenados com sucesso');
  }

  private reorderItems<T extends { id: string }>(
    event: CdkDragDrop<T[]>,
    items: T[],
    persist: (items: T[]) => Promise<void>,
    successMessage: string,
  ): void {
    if (event.previousIndex === event.currentIndex) {
      return;
    }

    moveItemInArray(items, event.previousIndex, event.currentIndex);

    persist(items)
      .then(() => {
        this.toast.success({
          detail: 'Sucesso!',
          summary: successMessage,
          duration: 2500
        });
      })
      .catch((error) => {
        moveItemInArray(items, event.currentIndex, event.previousIndex);
        console.error('Erro ao reordenar itens:', error);
        this.toast.error({
          detail: 'Erro!',
          summary: 'Falha ao salvar a nova ordem. Tente novamente mais tarde.',
          duration: 5000
        });
      });
  }

  private compareSobreArea(a: Sobrearea, b: Sobrearea): number {
    return this.compareByOrder(a.ordem, b.ordem) ||
      (a.ctitle ?? '').toLowerCase().localeCompare((b.ctitle ?? '').toLowerCase());
  }

  private compareResumoL(a: ResumoL, b: ResumoL): number {
    return this.compareByOrder(a.orderl, b.orderl) ||
      (a.titlel ?? '').toLowerCase().localeCompare((b.titlel ?? '').toLowerCase());
  }

  private compareResumoR(a: ResumoR, b: ResumoR): number {
    return this.compareByOrder(a.orderr, b.orderr) ||
      (a.titler ?? '').toLowerCase().localeCompare((b.titler ?? '').toLowerCase());
  }

  private compareProjetos(a: Projetos, b: Projetos): number {
    const orderComparison = this.compareByOrder(a.ordem, b.ordem);

    if (orderComparison !== 0) {
      return orderComparison;
    }

    if (a.star !== b.star) {
      return a.star ? -1 : 1;
    }

    return (a.titulo ?? '').toLowerCase().localeCompare((b.titulo ?? '').toLowerCase());
  }

  private compareSlider(a: Slider, b: Slider): number {
    return this.compareByOrder(a.ordem, b.ordem);
  }

  private compareChip(a: Chip, b: Chip): number {
    return this.compareByOrder(a.ordem, b.ordem) ||
      (a.chipname ?? '').toLowerCase().localeCompare((b.chipname ?? '').toLowerCase());
  }

  private compareByOrder(a?: number, b?: number): number {
    const left = Number(a) || 0;
    const right = Number(b) || 0;

    if (left === 0 && right === 0) {
      return 0;
    }

    if (left === 0) {
      return 1;
    }

    if (right === 0) {
      return -1;
    }

    return left - right;
  }
}
