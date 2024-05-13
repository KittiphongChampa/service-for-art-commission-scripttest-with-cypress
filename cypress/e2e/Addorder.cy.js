const url = `http://localhost:3000/`
const url_after_order = `http://localhost:3000/chatbox`
Cypress.Commands.add('customLogin', () => {
    // เก็บค่าการล็อกอินไว้ที่ local storage โดยไม่ต้องเข้าสู่ระบบจริง
    cy.window().then((win) => {
      win.localStorage.setItem('type', 'user');
      win.localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpdHRpcGhvbmcuY0Bra3VtYWlsLmNvbSIsInVzZXJJZCI6NjcsInJvbGUiOjEsImlhdCI6MTcxNTU4MDg5OCwiZXhwIjoxNzE1NTkxNjk4fQ.NnPY39bwfI83pwxLnqlskqlXBfn1h0N-gXsv-h5el5A');
    });
});

describe('Add Order Test', () => {
    beforeEach(() => {
        cy.customLogin();
    });
    // กรอกข้อมูลที่ถูกต้องแล้วกดส่งคำขอจ้าง
    it('TC1', () => {
        cy.visit(url)
        cy.url().should('include', url);
        cy.get('.swiper-slide-active > a > .cms-card > .cms-card-grid > .cms-card-img').click()
        cy.url().should('include', 'http://localhost:3000/cmsdetail');
        cy.get('.select-package-item').click()
        cy.get('#purpose').type('purpose test')
        cy.get('#detail').type('detail test')
        cy.get('.ant-form > .ant-flex > .ant-btn').click()
        cy.get('.swal2-title').should('be.visible')
        cy.get('.swal2-title').should('contain', 'ส่งคำขอจ้างสำเร็จ')
        cy.wait(3000)
        cy.url().should('include', url_after_order);
    })

    // ไม่กรอกข้อมูลอะไรและทำการกดส่งคำขอจ้าง
    it('TC2', () => {
        cy.visit(url)
        cy.url().should('include', url);
        cy.get('.swiper-slide-active > a > .cms-card > .cms-card-grid > .cms-card-img').click()
        cy.url().should('include', 'http://localhost:3000/cmsdetail');
        cy.get('.select-package-item').click()
        cy.get('.ant-form > .ant-flex > .ant-btn').click()
        cy.get('.ant-form-item-explain-error').should('be.visible')
        cy.get('.ant-form-item-explain-error').should('contain', "กรุณาใส่จุดประสงค์การใช้งาน")
        cy.get('.ant-form-item-explain-error').should('contain', "กรุณาใส่รายละเอียด")
    })
}); 