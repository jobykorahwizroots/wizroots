import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Wizroots } from 'app/shared/model/wizroots.model';
import { WizrootsService } from './wizroots.service';
import { WizrootsComponent } from './wizroots.component';
import { WizrootsDetailComponent } from './wizroots-detail.component';
import { WizrootsUpdateComponent } from './wizroots-update.component';
import { WizrootsDeletePopupComponent } from './wizroots-delete-dialog.component';
import { IWizroots } from 'app/shared/model/wizroots.model';

@Injectable({ providedIn: 'root' })
export class WizrootsResolve implements Resolve<IWizroots> {
    constructor(private service: WizrootsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((wizroots: HttpResponse<Wizroots>) => wizroots.body);
        }
        return Observable.of(new Wizroots());
    }
}

export const wizrootsRoute: Routes = [
    {
        path: 'wizroots',
        component: WizrootsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wizrootsApp.wizroots.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'wizroots/:id/view',
        component: WizrootsDetailComponent,
        resolve: {
            wizroots: WizrootsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wizrootsApp.wizroots.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'wizroots/new',
        component: WizrootsUpdateComponent,
        resolve: {
            wizroots: WizrootsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wizrootsApp.wizroots.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'wizroots/:id/edit',
        component: WizrootsUpdateComponent,
        resolve: {
            wizroots: WizrootsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wizrootsApp.wizroots.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const wizrootsPopupRoute: Routes = [
    {
        path: 'wizroots/:id/delete',
        component: WizrootsDeletePopupComponent,
        resolve: {
            wizroots: WizrootsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wizrootsApp.wizroots.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
