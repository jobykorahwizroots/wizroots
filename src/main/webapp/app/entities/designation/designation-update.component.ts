import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDesignation } from 'app/shared/model/designation.model';
import { DesignationService } from './designation.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-designation-update',
    templateUrl: './designation-update.component.html'
})
export class DesignationUpdateComponent implements OnInit {
    private _designation: IDesignation;
    isSaving: boolean;

    users: IUser[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private designationService: DesignationService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ designation }) => {
            this.designation = designation;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.designation.id !== undefined) {
            this.subscribeToSaveResponse(this.designationService.update(this.designation));
        } else {
            this.subscribeToSaveResponse(this.designationService.create(this.designation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDesignation>>) {
        result.subscribe((res: HttpResponse<IDesignation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
    get designation() {
        return this._designation;
    }

    set designation(designation: IDesignation) {
        this._designation = designation;
    }
}
