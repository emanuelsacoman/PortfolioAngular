export class Projeto{
    private _id!: string;
    private _titleProjeto!: string;

    constructor(id: string, titleProjeto: string){
        this._titleProjeto = titleProjeto;
        this._id = id;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get titleProjeto(): string {
        return this._titleProjeto;
    }

    public set titleProjeto(value: string) {
        this._titleProjeto = value;
    }

}