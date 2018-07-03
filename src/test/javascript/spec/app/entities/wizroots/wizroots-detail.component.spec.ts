/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WizrootsTestModule } from '../../../test.module';
import { WizrootsDetailComponent } from 'app/entities/wizroots/wizroots-detail.component';
import { Wizroots } from 'app/shared/model/wizroots.model';

describe('Component Tests', () => {
    describe('Wizroots Management Detail Component', () => {
        let comp: WizrootsDetailComponent;
        let fixture: ComponentFixture<WizrootsDetailComponent>;
        const route = ({ data: of({ wizroots: new Wizroots(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [WizrootsTestModule],
                declarations: [WizrootsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(WizrootsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WizrootsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.wizroots).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
