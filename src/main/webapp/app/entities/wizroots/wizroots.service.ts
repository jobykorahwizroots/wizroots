import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWizroots } from 'app/shared/model/wizroots.model';

type EntityResponseType = HttpResponse<IWizroots>;
type EntityArrayResponseType = HttpResponse<IWizroots[]>;

@Injectable({ providedIn: 'root' })
export class WizrootsService {
    private resourceUrl = SERVER_API_URL + 'api/wizroots';

    constructor(private http: HttpClient) {}

    create(wizroots: IWizroots): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(wizroots);
        return this.http
            .post<IWizroots>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(wizroots: IWizroots): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(wizroots);
        return this.http
            .put<IWizroots>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IWizroots>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IWizroots[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(wizroots: IWizroots): IWizroots {
        const copy: IWizroots = Object.assign({}, wizroots, {
            dob: wizroots.dob != null && wizroots.dob.isValid() ? wizroots.dob.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dob = res.body.dob != null ? moment(res.body.dob) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((wizroots: IWizroots) => {
            wizroots.dob = wizroots.dob != null ? moment(wizroots.dob) : null;
        });
        return res;
    }
}
