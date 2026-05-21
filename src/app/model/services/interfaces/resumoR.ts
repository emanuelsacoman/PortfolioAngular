export class ResumoR{
    private _id!: string;
    private _titler!: string;
    private _descr!: string;
    private _locationr!: string;
    private _companyr!: string;
    private _roler!: string;
    private _linkr!: string;
    private _tagsr!: string[];
    private _detailr!: string;
    private _orderr!: number;
    private _highlightr!: boolean;
    
    constructor(
        id: string,
        titler: string,
        descr: string,
        locationr: string,
        companyr = '',
        roler = '',
        linkr = '',
        tagsr: string[] = [],
        detailr = '',
        orderr = 0,
        highlightr = false
    ){
        this._titler = titler;
        this._descr = descr;
        this._locationr = locationr;
        this._id = id;
        this._companyr = companyr;
        this._roler = roler;
        this._linkr = linkr;
        this._tagsr = tagsr;
        this._detailr = detailr;
        this._orderr = orderr;
        this._highlightr = highlightr;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get titler(): string {
        return this._titler;
    }

    public set titler(value: string) {
        this._titler = value;
    }

    public get descr(): string {
        return this._descr;
    }

    public set descr(value: string) {
        this._descr = value;
    }

    public get locationr(): string {
        return this._locationr;
    }

    public set locationr(value: string) {
        this._locationr = value;
    }

    public get companyr(): string {
        return this._companyr;
    }

    public set companyr(value: string) {
        this._companyr = value;
    }

    public get roler(): string {
        return this._roler;
    }

    public set roler(value: string) {
        this._roler = value;
    }

    public get linkr(): string {
        return this._linkr;
    }

    public set linkr(value: string) {
        this._linkr = value;
    }

    public get tagsr(): string[] {
        return this._tagsr;
    }

    public set tagsr(value: string[]) {
        this._tagsr = value;
    }

    public get detailr(): string {
        return this._detailr;
    }

    public set detailr(value: string) {
        this._detailr = value;
    }

    public get orderr(): number {
        return this._orderr;
    }

    public set orderr(value: number) {
        this._orderr = value;
    }

    public get highlightr(): boolean {
        return this._highlightr;
    }

    public set highlightr(value: boolean) {
        this._highlightr = value;
    }
}
