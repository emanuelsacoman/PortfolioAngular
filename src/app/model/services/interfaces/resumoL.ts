export class ResumoL {
    private _id!: string;
    private _titlel!: string;
    private _descl!: string;
    private _locationl!: string;

    constructor(id: string, titlel: string, descl: string, locationl: string) {
        this._titlel = titlel;
        this._descl = descl;
        this._locationl = locationl;
        this._id = id;
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
}