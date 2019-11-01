import { AppSettings } from './app-settings';

describe("app settings initialized", () => {
	it("builds", () => {
		expect(new AppSettings()).toBeTruthy();
	});
});