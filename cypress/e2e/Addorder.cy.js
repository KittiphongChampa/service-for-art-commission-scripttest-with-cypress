const url = `http://localhost:3000/`
Cypress.Commands.add('customLogin', () => {
    // เก็บค่าการล็อกอินไว้ที่ local storage โดยไม่ต้องเข้าสู่ระบบจริง
    cy.window().then((win) => {
      win.localStorage.setItem('type', 'user');
      win.localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpdHRpcGhvbmcuY0Bra3VtYWlsLmNvbSIsInVzZXJJZCI6NjcsInJvbGUiOjEsImlhdCI6MTcxNTQ0MDE1MiwiZXhwIjoxNzE1NDUwOTUyfQ.oLZIlfqlyV7abE62RC2zLSdGWiA-zAVbdihX1S5SOGs');
    });
});

describe('Add Order Test', () => {
    beforeEach(() => {
        cy.customLogin();
    });
    it('TC1', () => {
        cy.visit(url)
        cy.url().should('include', url);
        cy.get('.swiper-slide-active > a > .cms-card > .cms-card-grid > .cms-card-img').click()
        cy.url().should('include', 'http://localhost:3000/cmsdetail');
        cy.get('.select-package-item').click()
        cy.get('#purpose').type('purpose test')
        cy.get('#detail').type('detail test')
        cy.get('.ant-form > .ant-flex > .ant-btn').click()
    })
}); 