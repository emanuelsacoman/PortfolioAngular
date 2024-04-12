export class Sobre{
    private _id!: string;
    private _title!: string;
    private _txt1!: string;
    private _txt2!: string;
    private _subtitle!: string;

    constructor(id: string, title: string, txt1: string, txt2: string, subtitle: string){
        this._title = title;
        this._txt1 = txt1;
        this._txt2 = txt2;
        this._subtitle = subtitle;
        this._id = id;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get title(): string {
        return this._title;
    }

    public set title(value: string) {
        this._title = value;
    }

    public get txt1(): string {
        return this._txt1;
    }

    public set txt1(value: string) {
        this._txt1 = value;
    }

    public get txt2(): string {
        return this._txt2;
    }

    public set txt2(value: string) {
        this._txt2 = value;
    }

    public get subtitle(): string {
        return this._subtitle;
    }

    public set subtitle(value: string) {
        this._subtitle = value;
    }

}