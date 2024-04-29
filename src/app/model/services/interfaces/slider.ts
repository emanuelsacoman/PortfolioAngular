export class Slider{
    private _id!: string;
    private _Img!: any;

    constructor(id: string, Img: any){
        this._id = id;
        this._Img = Img;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    get Img(): any {
        return this._Img;
    }

    set Img(Img: any) {
        this._Img = Img;
    }

}