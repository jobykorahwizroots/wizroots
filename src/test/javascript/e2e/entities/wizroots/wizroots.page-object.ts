import { element, by, promise, ElementFinder } from 'protractor';

export class WizrootsComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-wizroots div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class WizrootsUpdatePage {
    pageTitle = element(by.id('jhi-wizroots-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    dobInput = element(by.id('field_dob'));
    placeInput = element(by.id('field_place'));
    addressInput = element(by.id('field_address'));
    designationSelect = element(by.id('field_designation'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    setDobInput(dob): promise.Promise<void> {
        return this.dobInput.sendKeys(dob);
    }

    getDobInput() {
        return this.dobInput.getAttribute('value');
    }

    setPlaceInput(place): promise.Promise<void> {
        return this.placeInput.sendKeys(place);
    }

    getPlaceInput() {
        return this.placeInput.getAttribute('value');
    }

    setAddressInput(address): promise.Promise<void> {
        return this.addressInput.sendKeys(address);
    }

    getAddressInput() {
        return this.addressInput.getAttribute('value');
    }

    designationSelectLastOption(): promise.Promise<void> {
        return this.designationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    designationSelectOption(option): promise.Promise<void> {
        return this.designationSelect.sendKeys(option);
    }

    getDesignationSelect(): ElementFinder {
        return this.designationSelect;
    }

    getDesignationSelectedOption() {
        return this.designationSelect.element(by.css('option:checked')).getText();
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
