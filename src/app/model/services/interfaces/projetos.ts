export class Projetos {
    private _id!: string;
    private _titulo!: string;
    private _projectImg!: any;
    private _badge!: any;

    constructor(id: string, titulo: string, projectImg: any, badge: any) {
        this._id = id;
        this._titulo = titulo;
        this._projectImg = projectImg;
        this._badge = badge;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get titulo(): string {
        return this._titulo;
    }

    public set titulo(value: string) {
        this._titulo = value;
    }

    public get projectImg(): any {
        return this._projectImg;
    }

    public set projectImg(value: any) {
        this._projectImg = value;
    }

    public get badge(): any {
        return this._badge;
    }

    public set badge(value: any) {
        this._badge = value;
    }
}