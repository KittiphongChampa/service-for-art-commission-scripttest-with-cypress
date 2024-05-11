const url_chat = `http://localhost:3000/chatbox`

Cypress.Commands.add('customLogin', () => {
    // เก็บค่าการล็อกอินไว้ที่ local storage โดยไม่ต้องเข้าสู่ระบบจริง
    cy.window().then((win) => {
      win.localStorage.setItem('type', 'user');
      win.localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpdHRpcGhvbmcuY0Bra3VtYWlsLmNvbSIsInVzZXJJZCI6NjcsInJvbGUiOjEsImlhdCI6MTcxNTQ0MDE1MiwiZXhwIjoxNzE1NDUwOTUyfQ.oLZIlfqlyV7abE62RC2zLSdGWiA-zAVbdihX1S5SOGs');
    });
});

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Insert Chat Test', () => {
    beforeEach(() => {
        cy.customLogin();
    });
    // การส่งข้อความที่สำเร็จ
    it('TC1', () => {
        cy.visit(url_chat)
        cy.url().should('include', url_chat);
        cy.get('.chat-item').click()
        cy.get('.ant-input').click().type('สวัสดีครับ{enter}')
        cy.get('.my-message > div > .message').should('contain', 'สวัสดีครับ')
    })

    // การส่งข้อความแบบไม่สำเร็จ
    it('TC2', () => {
        cy.visit(url_chat)
        cy.url().should('include', url_chat);
        cy.get('.chat-item').click()
        cy.get('.ant-input').click().type('{enter}')
        cy.get('.ant-input').should('contain', 'กรุณาพิมพ์ข้อความอย่างน้อย 1 ตัวอักษร')
    })

    // การส่งรูปภาพแบบ pass
    it('TC3', () => {
        cy.visit(url_chat)
        cy.url().should('include', url_chat);
        cy.get('.chat-item').click()
        cy.get('.ant-btn-primary').click()
        cy.get('.add-item').click()

        const filePath = 'cypress/fixtures/img1.jpg';
        cy.get('#sendImage').selectFile(filePath,{
            action: 'drag-drop'
        })
        cy.get('.ant-flex-justify-center > .ant-btn').click()
        cy.get('.att-image > img').should('be.visible')
    })
});