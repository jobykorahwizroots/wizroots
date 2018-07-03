import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDesignation } from 'app/shared/model/designation.model';
import { Principal } from 'app/core';
import { DesignationService } from './designation.service';

@Component({
    selector: 'jhi-designation',
    templateUrl: './designation.component.html'
})
export class DesignationComponent implements OnInit, OnDestroy {
    designations: IDesignation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private designationService: DesignationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.designationService.query().subscribe(
            (res: HttpResponse<IDesignation[]>) => {
                this.designations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDesignations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDesignation) {
        return item.id;
    }

    registerChangeInDesignations() {
        this.eventSubscriber = this.eventManager.subscribe('designationListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
