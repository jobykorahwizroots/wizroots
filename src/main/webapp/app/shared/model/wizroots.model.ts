import { Moment } from 'moment';
import { IDesignation } from 'app/shared/model//designation.model';

export interface IWizroots {
    id?: number;
    name?: string;
    dob?: Moment;
    place?: string;
    address?: any;
    designation?: IDesignation;
}

export class Wizroots implements IWizroots {
    constructor(
        public id?: number,
        public name?: string,
        public dob?: Moment,
        public place?: string,
        public address?: any,
        public designation?: IDesignation
    ) {}
}
