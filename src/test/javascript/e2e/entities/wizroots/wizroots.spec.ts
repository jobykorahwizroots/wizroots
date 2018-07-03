import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { WizrootsComponentsPage, WizrootsUpdatePage } from './wizroots.page-object';

describe('Wizroots e2e test', () => {
    let navBarPage: NavBarPage;
    let wizrootsUpdatePage: WizrootsUpdatePage;
    let wizrootsComponentsPage: WizrootsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Wizroots', () => {
        navBarPage.goToEntity('wizroots');
        wizrootsComponentsPage = new WizrootsComponentsPage();
        expect(wizrootsComponentsPage.getTitle()).toMatch(/wizrootsApp.wizroots.home.title/);
    });

    it('should load create Wizroots page', () => {
        wizrootsComponentsPage.clickOnCreateButton();
        wizrootsUpdatePage = new WizrootsUpdatePage();
        expect(wizrootsUpdatePage.getPageTitle()).toMatch(/wizrootsApp.wizroots.home.createOrEditLabel/);
        wizrootsUpdatePage.cancel();
    });

    it('should create and save Wizroots', () => {
        wizrootsComponentsPage.clickOnCreateButton();
        wizrootsUpdatePage.setNameInput('name');
        expect(wizrootsUpdatePage.getNameInput()).toMatch('name');
        wizrootsUpdatePage.setDobInput('2000-12-31');
        expect(wizrootsUpdatePage.getDobInput()).toMatch('2000-12-31');
        wizrootsUpdatePage.setPlaceInput('place');
        expect(wizrootsUpdatePage.getPlaceInput()).toMatch('place');
        wizrootsUpdatePage.setAddressInput('address');
        expect(wizrootsUpdatePage.getAddressInput()).toMatch('address');
        wizrootsUpdatePage.designationSelectLastOption();
        wizrootsUpdatePage.save();
        expect(wizrootsUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
