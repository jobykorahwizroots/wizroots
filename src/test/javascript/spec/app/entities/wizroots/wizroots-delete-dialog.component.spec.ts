/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { WizrootsTestModule } from '../../../test.module';
import { WizrootsDeleteDialogComponent } from 'app/entities/wizroots/wizroots-delete-dialog.component';
import { WizrootsService } from 'app/entities/wizroots/wizroots.service';

describe('Component Tests', () => {
    describe('Wizroots Management Delete Component', () => {
        let comp: WizrootsDeleteDialogComponent;
        let fixture: ComponentFixture<WizrootsDeleteDialogComponent>;
        let service: WizrootsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WizrootsTestModule],
                declarations: [WizrootsDeleteDialogComponent]
            })
                .overrideTemplate(WizrootsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WizrootsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WizrootsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
