export class Chip{
    private _id!: string;
    private _chipname!: string;
    private _ordem!: number;

    constructor(id: string, chipname: string, ordem = 0){
        this._chipname = chipname;
        this._id = id;
        this._ordem = ordem;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    public get chipname(): string {
        return this._chipname;
    }

    public set chipname(value: string) {
        this._chipname = value;
    }

    public get ordem(): number {
        return this._ordem;
    }

    public set ordem(value: number) {
        this._ordem = value;
    }

}
