export class Slider{
    private _id!: string;
    private _Carouselimg!: any;

    constructor(id: string, Carouselimg: any){
        this._id = id;
        this._Carouselimg = Carouselimg;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    get Carouselimg(): any {
        return this._Carouselimg;
    }

    set Carouselimg(Carouselimg: any) {
        this._Carouselimg = Carouselimg;
    }


}