import { IUser } from 'app/core/user/user.model';

export interface IDesignation {
    id?: number;
    name?: string;
    user?: IUser;
}

export class Designation implements IDesignation {
    constructor(public id?: number, public name?: string, public user?: IUser) {}
}
