export class Sobrearea{
    private _id!: string;
    private _ctitle!: string;
    private _cdesc!: string;

    constructor(id: string, ctitle: string, cdesc: string){
        this._ctitle = ctitle;
        this._cdesc = cdesc;
        this._id = id;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get ctitle(): string {
        return this._ctitle;
    }

    public set ctitle(value: string) {
        this._ctitle = value;
    }

    public get cdesc(): string {
        return this._cdesc;
    }

    public set cdesc(value: string) {
        this._cdesc = value;
    }

}