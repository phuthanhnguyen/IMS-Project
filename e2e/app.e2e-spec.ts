import { IMSProjectPage } from './app.po';

describe('ims-project App', function() {
  let page: IMSProjectPage;

  beforeEach(() => {
    page = new IMSProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
