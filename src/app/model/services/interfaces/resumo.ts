export class Resumo{
    private _id!: string;
    private _titleArea!: string;
    private _lsub!: string;
    private _rsub!: string;
    private _chart!: string;
    private _chip!: string;

    constructor(id: string, titleArea: string, lsub: string, rsub: string, chart: string, chip: string){
        this._titleArea = titleArea;
        this._lsub = lsub;
        this._rsub = rsub;
        this._id = id;
        this._chart = chart;
        this._chip = chip;
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
    
    public get chart(): string {
        return this._chart;
    }

    public set chart(value: string) {
        this._chart = value;
    }

    public get chip(): string {
        return this._chip;
    }

    public set chip(value: string) {
        this._chip = value;
    }

}