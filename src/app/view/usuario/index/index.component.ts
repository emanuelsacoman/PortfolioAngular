import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { catchError, distinctUntilChanged, filter, map, Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Chip } from 'src/app/model/services/interfaces/chip';
import { Contato } from 'src/app/model/services/interfaces/contato';
import { Mensagem } from 'src/app/model/services/interfaces/mensagem';
import { Profile } from 'src/app/model/services/interfaces/profile';
import { Projeto } from 'src/app/model/services/interfaces/projeto';
import { Projetos } from 'src/app/model/services/interfaces/projetos';
import { Resumo } from 'src/app/model/services/interfaces/resumo';
import { ResumoL } from 'src/app/model/services/interfaces/resumoL';
import { ResumoR } from 'src/app/model/services/interfaces/resumoR';
import { Slider } from 'src/app/model/services/interfaces/slider';
import { Sobre } from 'src/app/model/services/interfaces/sobre';
import { Sobrearea } from 'src/app/model/services/interfaces/sobrearea';
import { AuthService } from 'src/app/model/services/auth.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { AdminNavigationData, GitHubProfile, HolidayFlags, PortfolioSection, SkillBar } from './models/portfolio.models';

const DEFAULT_GITHUB_PROFILE: GitHubProfile = {
  name: 'Emanuel Vinicius Sacoman',
  avatar_url: '',
};

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class IndexComponent implements OnInit, OnDestroy {
  readonly title = 'Emanuel Vin\u00edcius Sacoman';
  readonly description = 'Portf\u00f3lio do desenvolvedor Emanuel Vin\u00edcius Sacoman.';

  profileData: GitHubProfile = DEFAULT_GITHUB_PROFILE;
  profileImageUrl = '';
  selectedOption: PortfolioSection = 'sobre';

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

  public chipArray: Chip[] = [];
  public chipLoaded = false;

  contactForm = new FormGroup({
    nome: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(50)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    titulo: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(50)] }),
    mensagem: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });
  mensagemEnviada = false;

  skillBars: SkillBar[] = [
    { label: 'Front-end', value: 88 },
    { label: 'Web design', value: 73 },
    { label: 'Back-end', value: 58 },
    { label: 'Game dev', value: 55 },
  ];

  holidayFlags: HolidayFlags = {
    christmas: false,
    halloween: false,
    newYear: false,
    easter: false,
    birthday: false,
  };

  yearNow = new Date().getFullYear();

  private readonly destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private titleService: Title,
    private metaService: Meta,
    private toast: NgToastService,
  ) {}

  ngOnInit(): void {
    this.setPageMetadata();
    this.applyHolidayFlags();
    this.loadPortfolioData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get isLoading(): boolean {
    return !(
      this.sobreLoaded &&
      this.sobreAreaLoaded &&
      this.resumoLoaded &&
      this.resumolLoaded &&
      this.resumorLoaded &&
      this.projetoLoaded &&
      this.projetosLoaded &&
      this.contatoLoaded &&
      this.profileLoaded &&
      this.sliderLoaded &&
      this.chipLoaded
    );
  }

  get adminData(): AdminNavigationData | null {
    const [sobre] = this.sobre;
    const [resumo] = this.resumo;
    const [projeto] = this.projeto;
    const [contato] = this.contato;
    const [profile] = this.profile;

    if (!sobre || !resumo || !projeto || !contato || !profile) {
      return null;
    }

    return { sobre, resumo, projeto, contato, profile };
  }

  selectOption(option: PortfolioSection): void {
    this.selectedOption = option;
  }

  isSelected(option: PortfolioSection): boolean {
    return this.selectedOption === option;
  }

  goToAdmin(data: AdminNavigationData): void {
    this.router.navigateByUrl('/admin', { state: data });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  submit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.toast.error({
        detail: 'Erro!',
        summary: 'Preencha todos os campos obrigatorios',
        duration: 5000,
      });
      return;
    }

    const formValues = this.contactForm.getRawValue();
    const novaMensagem = new Mensagem(
      '',
      formValues.mensagem,
      false,
      new Date(),
      formValues.nome,
      formValues.titulo,
      formValues.email,
    );

    this.firebaseService.cadastrarMensagem(novaMensagem)
      .then(() => {
        this.contactForm.reset();
        this.mensagemEnviada = true;
        this.toast.success({
          detail: 'Sucesso!',
          summary: 'Mensagem enviada com sucesso',
          duration: 5000,
        });
      })
      .catch((error) => {
        console.error('Erro ao enviar mensagem:', error);
        this.toast.error({
          detail: 'Erro!',
          summary: 'Falha ao enviar mensagem. Tente novamente mais tarde.',
          duration: 5000,
        });
      });
  }

  goToZap(numero: string): void {
    const numeroLimpo = numero.replace(/\D/g, '');
    const codigoPais = '55';
    const numeroFormatado = numeroLimpo.startsWith(codigoPais) ? numeroLimpo : `${codigoPais}${numeroLimpo}`;
    const mensagem = encodeURIComponent('Ol\u00e1! Vim do seu Portf\u00f3lio.');

    window.open(`https://wa.me/${numeroFormatado}?text=${mensagem}`, '_blank', 'noopener,noreferrer');
  }

  goToEmail(email: string): void {
    window.open(`mailto:${email}`, '_blank', 'noopener,noreferrer');
  }

  goToLocal(local: string): void {
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(local)}`, '_blank', 'noopener,noreferrer');
  }

  private loadPortfolioData(): void {
    this.loadCollection(this.firebaseService.obterTodosSobre(), (items: Sobre[]) => this.sobre = items, () => this.sobreLoaded = true);
    this.loadCollection(this.firebaseService.obterTodosSobreArea(), (items: Sobrearea[]) => this.sobrearea = items, () => this.sobreAreaLoaded = true);
    this.loadCollection(this.firebaseService.obterTodosResumo(), (items: Resumo[]) => this.resumo = items, () => this.resumoLoaded = true);
    this.loadCollection(this.firebaseService.obterTodosResumoL(), (items: ResumoL[]) => this.resumol = items, () => this.resumolLoaded = true);
    this.loadCollection(this.firebaseService.obterTodosResumoR(), (items: ResumoR[]) => this.resumor = items, () => this.resumorLoaded = true);
    this.loadCollection(this.firebaseService.obterTodosProjeto(), (items: Projeto[]) => this.projeto = items, () => this.projetoLoaded = true);
    this.loadCollection(this.firebaseService.obterTodosContato(), (items: Contato[]) => this.contato = items, () => this.contatoLoaded = true);
    this.loadCollection(this.firebaseService.obterTodosChip(), (items: Chip[]) => this.chipArray = items, () => this.chipLoaded = true);
    this.loadCollection(
      this.firebaseService.obterTodosProjetos(),
      (items: Projetos[]) => this.projetos = this.sortProjects(items),
      () => this.projetosLoaded = true,
    );
    this.loadCollection(
      this.firebaseService.obterTodosSlider(),
      (items: Slider[]) => this.slider = this.shuffle(items),
      () => this.sliderLoaded = true,
    );
    this.loadProfileCollection();
  }

  private loadCollection<T>(
    source$: Observable<DocumentChangeAction<unknown>[]>,
    assign: (items: T[]) => void,
    markLoaded: () => void,
  ): void {
    source$
      .pipe(
        map((changes) => this.mapSnapshot<T>(changes)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (items) => {
          assign(items);
          markLoaded();
        },
        error: (error) => {
          console.error('Erro ao carregar dados do portfolio:', error);
          markLoaded();
        },
      });
  }

  private loadProfileCollection(): void {
    this.firebaseService.obterTodosProfile()
      .pipe(
        map((changes) => this.mapSnapshot<Profile>(changes)),
        tap((profiles) => {
          this.profile = profiles;
          this.profileLoaded = true;
          this.updateBirthdayFlag(profiles[0]?.birth);
        }),
        map((profiles) => profiles[0]?.github?.trim()),
        distinctUntilChanged(),
        filter((github): github is string => Boolean(github)),
        switchMap((github) => this.http.get<GitHubProfile>(`https://api.github.com/users/${github}`).pipe(
          catchError((error) => {
            console.error('Erro ao carregar perfil do GitHub:', error);
            return of(DEFAULT_GITHUB_PROFILE);
          }),
        )),
        takeUntil(this.destroy$),
      )
      .subscribe((githubProfile) => {
        this.profileData = githubProfile;
        this.profileImageUrl = githubProfile.avatar_url;
      });
  }

  private mapSnapshot<T>(changes: DocumentChangeAction<unknown>[]): T[] {
    return changes.map((item) => ({
      id: item.payload.doc.id,
      ...(item.payload.doc.data() as object),
    } as T));
  }

  private sortProjects(projects: Projetos[]): Projetos[] {
    return [...projects].sort((a, b) => {
      if (a.star !== b.star) {
        return a.star ? -1 : 1;
      }

      return (a.titulo ?? '').toLowerCase().localeCompare((b.titulo ?? '').toLowerCase());
    });
  }

  private shuffle<T>(items: T[]): T[] {
    const shuffled = [...items];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  private setPageMetadata(): void {
    this.titleService.setTitle(this.title);
    this.metaService.updateTag({ name: 'description', content: this.description });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
  }

  private applyHolidayFlags(): void {
    const today = new Date();
    const year = today.getFullYear();

    this.holidayFlags = {
      ...this.holidayFlags,
      christmas: this.isSameDay(today, new Date(year, 11, 25)),
      halloween: this.isSameDay(today, new Date(year, 9, 31)),
      newYear: this.isSameDay(today, new Date(year, 0, 1)),
      easter: this.isSameDay(today, this.calculateEasterDate(year)),
    };
  }

  private updateBirthdayFlag(birthDate?: string): void {
    if (!birthDate) {
      return;
    }

    const [day, month] = birthDate.split('/').map(Number);
    const today = new Date();

    this.holidayFlags = {
      ...this.holidayFlags,
      birthday: day === today.getDate() && month === today.getMonth() + 1,
    };
  }

  private calculateEasterDate(year: number): Date {
    const f = Math.floor;
    const G = year % 19;
    const C = f(year / 100);
    const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
    const I = H - f(H / 28) * (1 - f(H / 28) * f(29 / (H + 1)) * f((21 - G) / 11));
    const J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7;
    const L = I - J;
    const month = 3 + f((L + 40) / 44);
    const day = L + 28 - 31 * f(month / 4);

    return new Date(year, month - 1, day);
  }

  private isSameDay(left: Date, right: Date): boolean {
    return (
      left.getDate() === right.getDate() &&
      left.getMonth() === right.getMonth() &&
      left.getFullYear() === right.getFullYear()
    );
  }
}
