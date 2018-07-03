import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WizrootsWizrootsModule } from './wizroots/wizroots.module';
import { WizrootsDesignationModule } from './designation/designation.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        WizrootsWizrootsModule,
        WizrootsDesignationModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WizrootsEntityModule {}
