export class Resumo{
    private _id!: string;
    private _titleArea!: string;
    private _lsub!: string;
    private _rsub!: string;


    constructor(id: string, titleArea: string){
        this._titleArea = titleArea;
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

    

}