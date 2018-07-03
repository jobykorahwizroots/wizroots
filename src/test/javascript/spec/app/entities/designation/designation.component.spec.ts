/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WizrootsTestModule } from '../../../test.module';
import { DesignationComponent } from 'app/entities/designation/designation.component';
import { DesignationService } from 'app/entities/designation/designation.service';
import { Designation } from 'app/shared/model/designation.model';

describe('Component Tests', () => {
    describe('Designation Management Component', () => {
        let comp: DesignationComponent;
        let fixture: ComponentFixture<DesignationComponent>;
        let service: DesignationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WizrootsTestModule],
                declarations: [DesignationComponent],
                providers: []
            })
                .overrideTemplate(DesignationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DesignationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DesignationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Designation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.designations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
