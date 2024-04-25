export class Profile {
    private _id!: string;
    private _instagram!: string;
    private _facebook!: string;
    private _linkedin!: string;
    private _github!: string;
    private _phoneImg!: any;
    private _emailImg!: any;
    private _localImg!: any;
    private _birthImg!: any;
    private _phoneTXT!: string;
    private _emailTXT!: string;
    private _localTXT!: string;
    private _birthTXT!: string;
    private _phone!: string;
    private _email!: string;
    private _local!: string;
    private _birth!: string;

    constructor(
        id: string,
        instagram: string,
        facebook: string,
        linkedin: string,
        github: string,
        phoneImg: any,
        emailImg: any,
        localImg: any,
        birthImg: any,
        phoneTXT: string,
        emailTXT: string,
        localTXT: string,
        birthTXT: string,
        phone: string,
        email: string,
        local: string,
        birth: string
    ) {
        this._id = id;
        this._instagram = instagram;
        this._facebook = facebook;
        this._linkedin = linkedin;
        this._github = github;
        this._phoneImg = phoneImg;
        this._emailImg = emailImg;
        this._localImg = localImg;
        this._birthImg = birthImg;
        this._phoneTXT = phoneTXT;
        this._emailTXT = emailTXT;
        this._localTXT = localTXT;
        this._birthTXT = birthTXT;
        this._phone = phone;
        this._email = email;
        this._local = local;
        this._birth = birth;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }

    // Instagram
    public get instagram(): string {
        return this._instagram;
    }

    public set instagram(value: string) {
        this._instagram = value;
    }

    // Facebook
    public get facebook(): string {
        return this._facebook;
    }

    public set facebook(value: string) {
        this._facebook = value;
    }

    // LinkedIn
    public get linkedin(): string {
        return this._linkedin;
    }

    public set linkedin(value: string) {
        this._linkedin = value;
    }

    // GitHub
    public get github(): string {
        return this._github;
    }

    public set github(value: string) {
        this._github = value;
    }

    // Phone Image
    public get phoneImg(): any {
        return this._phoneImg;
    }

    public set phoneImg(value: any) {
        this._phoneImg = value;
    }

    // Email Image
    public get emailImg(): any {
        return this._emailImg;
    }

    public set emailImg(value: any) {
        this._emailImg = value;
    }

    // Local Image
    public get localImg(): any {
        return this._localImg;
    }

    public set localImg(value: any) {
        this._localImg = value;
    }

    // Birth Image
    public get birthImg(): any {
        return this._birthImg;
    }

    public set birthImg(value: any) {
        this._birthImg = value;
    }

    // Phone Text
    public get phoneTXT(): string {
        return this._phoneTXT;
    }

    public set phoneTXT(value: string) {
        this._phoneTXT = value;
    }

    // Email Text
    public get emailTXT(): string {
        return this._emailTXT;
    }

    public set emailTXT(value: string) {
        this._emailTXT = value;
    }

    // Local Text
    public get localTXT(): string {
        return this._localTXT;
    }

    public set localTXT(value: string) {
        this._localTXT = value;
    }

    // Birth Text
    public get birthTXT(): string {
        return this._birthTXT;
    }

    public set birthTXT(value: string) {
        this._birthTXT = value;
    }

    // Phone
    public get phone(): string {
        return this._phone;
    }

    public set phone(value: string) {
        this._phone = value;
    }

    // Email
    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }

    // Local
    public get local(): string {
        return this._local;
    }

    public set local(value: string) {
        this._local = value;
    }

    // Birth
    public get birth(): string {
        return this._birth;
    }

    public set birth(value: string) {
        this._birth = value;
    }
}
