import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWizroots } from 'app/shared/model/wizroots.model';
import { WizrootsService } from './wizroots.service';

@Component({
    selector: 'jhi-wizroots-delete-dialog',
    templateUrl: './wizroots-delete-dialog.component.html'
})
export class WizrootsDeleteDialogComponent {
    wizroots: IWizroots;

    constructor(private wizrootsService: WizrootsService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.wizrootsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'wizrootsListModification',
                content: 'Deleted an wizroots'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-wizroots-delete-popup',
    template: ''
})
export class WizrootsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ wizroots }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(WizrootsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.wizroots = wizroots;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
