/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { WizrootsTestModule } from '../../../test.module';
import { WizrootsUpdateComponent } from 'app/entities/wizroots/wizroots-update.component';
import { WizrootsService } from 'app/entities/wizroots/wizroots.service';
import { Wizroots } from 'app/shared/model/wizroots.model';

describe('Component Tests', () => {
    describe('Wizroots Management Update Component', () => {
        let comp: WizrootsUpdateComponent;
        let fixture: ComponentFixture<WizrootsUpdateComponent>;
        let service: WizrootsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WizrootsTestModule],
                declarations: [WizrootsUpdateComponent]
            })
                .overrideTemplate(WizrootsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WizrootsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WizrootsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Wizroots(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.wizroots = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Wizroots();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.wizroots = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
