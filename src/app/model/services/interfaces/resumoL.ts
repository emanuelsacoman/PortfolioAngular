export class ResumoL {
    private _id!: string;
    private _titlel!: string;
    private _descl!: string;
    private _locationl!: string;
    private _organizationl!: string;
    private _levell!: string;
    private _linkl!: string;
    private _tagsl!: string[];
    private _detaill!: string;
    private _orderl!: number;
    private _highlightl!: boolean;

    constructor(
        id: string,
        titlel: string,
        descl: string,
        locationl: string,
        organizationl = '',
        levell = '',
        linkl = '',
        tagsl: string[] = [],
        detaill = '',
        orderl = 0,
        highlightl = false
    ) {
        this._titlel = titlel;
        this._descl = descl;
        this._locationl = locationl;
        this._id = id;
        this._organizationl = organizationl;
        this._levell = levell;
        this._linkl = linkl;
        this._tagsl = tagsl;
        this._detaill = detaill;
        this._orderl = orderl;
        this._highlightl = highlightl;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get titlel(): string {
        return this._titlel;
    }

    public set titlel(value: string) {
        this._titlel = value;
    }

    public get descl(): string {
        return this._descl;
    }

    public set descl(value: string) {
        this._descl = value;
    }

    public get locationl(): string {
        return this._locationl;
    }

    public set locationl(value: string) {
        this._locationl = value;
    }

    public get organizationl(): string {
        return this._organizationl;
    }

    public set organizationl(value: string) {
        this._organizationl = value;
    }

    public get levell(): string {
        return this._levell;
    }

    public set levell(value: string) {
        this._levell = value;
    }

    public get linkl(): string {
        return this._linkl;
    }

    public set linkl(value: string) {
        this._linkl = value;
    }

    public get tagsl(): string[] {
        return this._tagsl;
    }

    public set tagsl(value: string[]) {
        this._tagsl = value;
    }

    public get detaill(): string {
        return this._detaill;
    }

    public set detaill(value: string) {
        this._detaill = value;
    }

    public get orderl(): number {
        return this._orderl;
    }

    public set orderl(value: number) {
        this._orderl = value;
    }

    public get highlightl(): boolean {
        return this._highlightl;
    }

    public set highlightl(value: boolean) {
        this._highlightl = value;
    }
}
