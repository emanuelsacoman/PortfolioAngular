export class Projetos {
    private _id!: string;
    private _titulo!: string;
    private _projectImg!: any;
    private _badge!: any;
    private _link!: string;
    private _inProgress!: boolean;
    private _star!: boolean;

    constructor(id: string, titulo: string, projectImg: any, badge: any, link: string, inProgress: boolean, star: boolean) {
        this._id = id;
        this._titulo = titulo;
        this._projectImg = projectImg;
        this._badge = badge;
        this._link = link;
        this._inProgress = inProgress;
        this._star = star;
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

    public get link(): any {
        return this._link;
    }

    public set link(value: any) {
        this._link = value;
    }

    public get inProgress(): boolean {
        return this._inProgress;
    }

    public set inProgress(value: boolean) {
        this._inProgress = value;
    }

    public get star(): boolean {
        return this._star;
    }

    public set star(value: boolean) {
        this._star = value;
    }
}