import * as allure from 'allure-js-commons';
import { ContentType } from 'allure-js-commons';
import { Page } from '@playwright/test';

export type TestMetadataOptions = {
    displayName?: string;
    owner?: string;
    tags?: string[];
    severity?: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';
    epic?: string;
    feature?: string;
    story?: string;
    parentSuite?: string;
    suite?: string;
    subSuite?: string;
};

class AllureHelper {

    async applyTestMetadata(options: TestMetadataOptions) {
        if (options.displayName) {
            await allure.displayName(options.displayName);
        }
        if (options.owner) {
            await allure.owner(options.owner);  
        }
        if (options.tags?.length) {
            await allure.tags(...options.tags); 
        }
        if (options.severity) {
            await allure.severity(options.severity); 
        }
        if (options.epic) {
            await allure.epic(options.epic); 
        }
        if (options.feature) {
            await allure.feature(options.feature); 
        }
        if (options.story) {
            await allure.story(options.story); 
        }
        if (options.parentSuite) {
            await allure.parentSuite(options.parentSuite); 
        }
        if (options.suite) {
            await allure.suite(options.suite); 
        }
        if (options.subSuite) {
            await allure.subSuite(options.subSuite); 
        }
    }

    async attachScreenshoot(page: Page, name: string) {
        // Tomamos la captura
        const screenshot = await page.screenshot({ fullPage: true });
        // La adjuntamos directamente a Allure
        await allure.attachment(name, screenshot, { contentType: ContentType.PNG });
        

    }

}

export default new AllureHelper();
    