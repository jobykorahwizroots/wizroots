import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IWizroots } from 'app/shared/model/wizroots.model';

@Component({
    selector: 'jhi-wizroots-detail',
    templateUrl: './wizroots-detail.component.html'
})
export class WizrootsDetailComponent implements OnInit {
    wizroots: IWizroots;

    constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ wizroots }) => {
            this.wizroots = wizroots;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
