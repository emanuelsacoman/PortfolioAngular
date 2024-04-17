export class ResumoR{
    private _id!: string;
    private _titler!: string;
    private _descr!: string;
    private _locationr!: string;
    
    constructor(id: string, titler: string, descr: string, locationr: string){
        this._titler = titler;
        this._descr = descr;
        this._locationr = locationr;
        this._id = id;
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
}