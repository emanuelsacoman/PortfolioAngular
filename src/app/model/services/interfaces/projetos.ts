export class Projetos {
    private _id!: string;
    private _titulo!: string;
    private _projectImg!: any;
    private _badge!: any;
    private _link!: string;
    private _inProgress!: boolean;
    private _star!: boolean;
    private _subtitulo!: string;
    private _descricao!: string;
    private _tecnologias!: string[];
    private _galeria!: string[];
    private _repositorio!: string;
    private _caseStudy!: string;
    private _periodo!: string;
    private _tipo!: string;
    private _funcao!: string;
    private _cliente!: string;
    private _destaques!: string[];
    private _ordem!: number;
    private _ctaLabel!: string;

    constructor(
        id: string,
        titulo: string,
        projectImg: any,
        badge: any,
        link: string,
        inProgress: boolean,
        star: boolean,
        subtitulo = '',
        descricao = '',
        tecnologias: string[] = [],
        galeria: string[] = [],
        repositorio = '',
        caseStudy = '',
        periodo = '',
        tipo = '',
        funcao = '',
        cliente = '',
        destaques: string[] = [],
        ordem = 0,
        ctaLabel = ''
    ) {
        this._id = id;
        this._titulo = titulo;
        this._projectImg = projectImg;
        this._badge = badge;
        this._link = link;
        this._inProgress = inProgress;
        this._star = star;
        this._subtitulo = subtitulo;
        this._descricao = descricao;
        this._tecnologias = tecnologias;
        this._galeria = galeria;
        this._repositorio = repositorio;
        this._caseStudy = caseStudy;
        this._periodo = periodo;
        this._tipo = tipo;
        this._funcao = funcao;
        this._cliente = cliente;
        this._destaques = destaques;
        this._ordem = ordem;
        this._ctaLabel = ctaLabel;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get titulo(): string {
        return this._titulo;
    }

    public set titulo(value: string) {
        this._titulo = value;
    }

    public get projectImg(): any {
        return this._projectImg;
    }

    public set projectImg(value: any) {
        this._projectImg = value;
    }

    public get badge(): any {
        return this._badge;
    }

    public set badge(value: any) {
        this._badge = value;
    }

    public get link(): any {
        return this._link;
    }

    public set link(value: any) {
        this._link = value;
    }

    public get inProgress(): boolean {
        return this._inProgress;
    }

    public set inProgress(value: boolean) {
        this._inProgress = value;
    }

    public get star(): boolean {
        return this._star;
    }

    public set star(value: boolean) {
        this._star = value;
    }

    public get subtitulo(): string {
        return this._subtitulo;
    }

    public set subtitulo(value: string) {
        this._subtitulo = value;
    }

    public get descricao(): string {
        return this._descricao;
    }

    public set descricao(value: string) {
        this._descricao = value;
    }

    public get tecnologias(): string[] {
        return this._tecnologias;
    }

    public set tecnologias(value: string[]) {
        this._tecnologias = value;
    }

    public get galeria(): string[] {
        return this._galeria;
    }

    public set galeria(value: string[]) {
        this._galeria = value;
    }

    public get repositorio(): string {
        return this._repositorio;
    }

    public set repositorio(value: string) {
        this._repositorio = value;
    }

    public get caseStudy(): string {
        return this._caseStudy;
    }

    public set caseStudy(value: string) {
        this._caseStudy = value;
    }

    public get periodo(): string {
        return this._periodo;
    }

    public set periodo(value: string) {
        this._periodo = value;
    }

    public get tipo(): string {
        return this._tipo;
    }

    public set tipo(value: string) {
        this._tipo = value;
    }

    public get funcao(): string {
        return this._funcao;
    }

    public set funcao(value: string) {
        this._funcao = value;
    }

    public get cliente(): string {
        return this._cliente;
    }

    public set cliente(value: string) {
        this._cliente = value;
    }

    public get destaques(): string[] {
        return this._destaques;
    }

    public set destaques(value: string[]) {
        this._destaques = value;
    }

    public get ordem(): number {
        return this._ordem;
    }

    public set ordem(value: number) {
        this._ordem = value;
    }

    public get ctaLabel(): string {
        return this._ctaLabel;
    }

    public set ctaLabel(value: string) {
        this._ctaLabel = value;
    }
}
