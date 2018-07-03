import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WizrootsSharedModule } from 'app/shared';
import {
    WizrootsComponent,
    WizrootsDetailComponent,
    WizrootsUpdateComponent,
    WizrootsDeletePopupComponent,
    WizrootsDeleteDialogComponent,
    wizrootsRoute,
    wizrootsPopupRoute
} from './';

const ENTITY_STATES = [...wizrootsRoute, ...wizrootsPopupRoute];

@NgModule({
    imports: [WizrootsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        WizrootsComponent,
        WizrootsDetailComponent,
        WizrootsUpdateComponent,
        WizrootsDeleteDialogComponent,
        WizrootsDeletePopupComponent
    ],
    entryComponents: [WizrootsComponent, WizrootsUpdateComponent, WizrootsDeleteDialogComponent, WizrootsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WizrootsWizrootsModule {}
