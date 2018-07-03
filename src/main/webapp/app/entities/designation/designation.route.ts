import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Designation } from 'app/shared/model/designation.model';
import { DesignationService } from './designation.service';
import { DesignationComponent } from './designation.component';
import { DesignationDetailComponent } from './designation-detail.component';
import { DesignationUpdateComponent } from './designation-update.component';
import { DesignationDeletePopupComponent } from './designation-delete-dialog.component';
import { IDesignation } from 'app/shared/model/designation.model';

@Injectable({ providedIn: 'root' })
export class DesignationResolve implements Resolve<IDesignation> {
    constructor(private service: DesignationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((designation: HttpResponse<Designation>) => designation.body);
        }
        return Observable.of(new Designation());
    }
}

export const designationRoute: Routes = [
    {
        path: 'designation',
        component: DesignationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wizrootsApp.designation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'designation/:id/view',
        component: DesignationDetailComponent,
        resolve: {
            designation: DesignationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wizrootsApp.designation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'designation/new',
        component: DesignationUpdateComponent,
        resolve: {
            designation: DesignationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wizrootsApp.designation.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'designation/:id/edit',
        component: DesignationUpdateComponent,
        resolve: {
            designation: DesignationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wizrootsApp.designation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const designationPopupRoute: Routes = [
    {
        path: 'designation/:id/delete',
        component: DesignationDeletePopupComponent,
        resolve: {
            designation: DesignationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'wizrootsApp.designation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
