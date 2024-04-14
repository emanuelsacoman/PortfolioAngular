export class Resumo{
    private _id!: string;
    private _titleArea!: string;
    private _lsub!: string;
    private _rsub!: string;


    constructor(id: string, titleArea: string, lsub: string, rsub: string){
        this._titleArea = titleArea;
        this._lsub = lsub;
        this._rsub = rsub;
        this._id = id;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get titleArea(): string {
        return this._titleArea;
    }

    public set titleArea(value: string) {
        this._titleArea = value;
    }

    public get lsub(): string {
        return this._lsub;
    }

    public set lsub(value: string) {
        this._lsub = value;
    }

    public get rsub(): string {
        return this._rsub;
    }

    public set rsub(value: string) {
        this._rsub = value;
    }    

}