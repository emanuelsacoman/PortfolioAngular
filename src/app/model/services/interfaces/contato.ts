export class Contato{
    private _id!: string;
    private _titleContato!: string;
    private _descContato!: string;

    constructor(id: string, titleContato: string, descContato: string){
        this._titleContato = titleContato;
        this._descContato = descContato;
        this._id = id;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get titleContato(): string {
        return this._titleContato;
    }

    public set titleContato(value: string) {
        this._titleContato = value;
    }

    public get descContato(): string {
        return this._descContato;
    }

    public set descContato(value: string) {
        this._descContato = value;
    }

}