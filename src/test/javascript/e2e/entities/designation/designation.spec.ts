import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { DesignationComponentsPage, DesignationUpdatePage } from './designation.page-object';

describe('Designation e2e test', () => {
    let navBarPage: NavBarPage;
    let designationUpdatePage: DesignationUpdatePage;
    let designationComponentsPage: DesignationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Designations', () => {
        navBarPage.goToEntity('designation');
        designationComponentsPage = new DesignationComponentsPage();
        expect(designationComponentsPage.getTitle()).toMatch(/wizrootsApp.designation.home.title/);
    });

    it('should load create Designation page', () => {
        designationComponentsPage.clickOnCreateButton();
        designationUpdatePage = new DesignationUpdatePage();
        expect(designationUpdatePage.getPageTitle()).toMatch(/wizrootsApp.designation.home.createOrEditLabel/);
        designationUpdatePage.cancel();
    });

    it('should create and save Designations', () => {
        designationComponentsPage.clickOnCreateButton();
        designationUpdatePage.setNameInput('name');
        expect(designationUpdatePage.getNameInput()).toMatch('name');
        designationUpdatePage.userSelectLastOption();
        designationUpdatePage.save();
        expect(designationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
