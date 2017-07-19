import { AppFichasAngularPage } from './app.po';

describe('app-fichas-angular App', () => {
  let page: AppFichasAngularPage;

  beforeEach(() => {
    page = new AppFichasAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
