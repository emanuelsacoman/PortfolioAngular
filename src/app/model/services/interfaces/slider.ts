export class Slider{
    private _id!: string;
    private _Carouselimg!: any;
    private _ordem!: number;

    constructor(id: string, Carouselimg: any, ordem = 0){
        this._id = id;
        this._Carouselimg = Carouselimg;
        this._ordem = ordem;
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

    get ordem(): number {
        return this._ordem;
    }

    set ordem(ordem: number) {
        this._ordem = ordem;
    }

}
