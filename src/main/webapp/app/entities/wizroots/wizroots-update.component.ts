import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IWizroots } from 'app/shared/model/wizroots.model';
import { WizrootsService } from './wizroots.service';
import { IDesignation } from 'app/shared/model/designation.model';
import { DesignationService } from 'app/entities/designation';

@Component({
    selector: 'jhi-wizroots-update',
    templateUrl: './wizroots-update.component.html'
})
export class WizrootsUpdateComponent implements OnInit {
    private _wizroots: IWizroots;
    isSaving: boolean;

    designations: IDesignation[];
    dobDp: any;

    constructor(
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private wizrootsService: WizrootsService,
        private designationService: DesignationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ wizroots }) => {
            this.wizroots = wizroots;
        });
        this.designationService.query().subscribe(
            (res: HttpResponse<IDesignation[]>) => {
                this.designations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.wizroots.id !== undefined) {
            this.subscribeToSaveResponse(this.wizrootsService.update(this.wizroots));
        } else {
            this.subscribeToSaveResponse(this.wizrootsService.create(this.wizroots));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWizroots>>) {
        result.subscribe((res: HttpResponse<IWizroots>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDesignationById(index: number, item: IDesignation) {
        return item.id;
    }
    get wizroots() {
        return this._wizroots;
    }

    set wizroots(wizroots: IWizroots) {
        this._wizroots = wizroots;
    }
}
