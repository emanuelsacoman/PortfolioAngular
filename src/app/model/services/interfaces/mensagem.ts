export class Mensagem {
    private _id!: string;
    private _mensagem!: string;
    private _visualizado!: boolean;
    private _timestamp!: any;
    private _nome!: string;
    private _titulo!: string;
    private _email!: string;

    constructor(
        id: string,
        mensagem: string,
        visualizado: boolean,
        timestamp: any,
        nome: string,
        titulo: string,
        email: string
    ) {
        this._id = id;
        this._mensagem = mensagem;
        this._visualizado = visualizado;
        this._timestamp = timestamp;
        this._nome = nome;
        this._titulo = titulo;
        this._email = email;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get mensagem(): string {
        return this._mensagem;
    }

    public set mensagem(value: string) {
        this._mensagem = value;
    }

    public get visualizado(): boolean {
        return this._visualizado;
    }

    public set visualizado(value: boolean) {
        this._visualizado = value;
    }

    public get timestamp(): any {
        return this._timestamp;
    }

    public set timestamp(value: any) {
        this._timestamp = value;
    }

    public get nome(): string {
        return this._nome;
    }

    public set nome(value: string) {
        this._nome = value;
    }

    public get titulo(): string {
        return this._titulo;
    }

    public set titulo(value: string) {
        this._titulo = value;
    }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }
}
