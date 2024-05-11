const url_login = `http://localhost:3000/login`
const url_insertArtwork = `http://localhost:3000/manage-artwork`


Cypress.Commands.add('customLogin', () => {
    // เก็บค่าการล็อกอินไว้ที่ local storage โดยไม่ต้องเข้าสู่ระบบจริง
    cy.window().then((win) => {
      win.localStorage.setItem('type', 'user');
      win.localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpdHRpcGhvbmcuY0Bra3VtYWlsLmNvbSIsInVzZXJJZCI6NjcsInJvbGUiOjEsImlhdCI6MTcxNTQ0MDE1MiwiZXhwIjoxNzE1NDUwOTUyfQ.oLZIlfqlyV7abE62RC2zLSdGWiA-zAVbdihX1S5SOGs');
    });
});

Cypress.Commands.add('customLogout', () => {
    // ลบค่าการล็อกอินที่เก็บไว้ที่ local storage
    cy.window().then((win) => {
        win.localStorage.removeItem('loggedIn');
    });
});

Cypress.Commands.add('attachFileWithTimeout', (selector, filePath, options = {}) => {
    cy.get(selector, { timeout: 10000 }).attachFile(filePath, options);
});


describe('Insert Artwork Test Pass', () => {
    beforeEach(() => {
        cy.customLogin();
    });
  
    it('TC1', () => {
        cy.visit(url_insertArtwork)
        cy.url().should('include', url_insertArtwork);
        cy.get('.ant-upload-select > .ant-upload').contains('Upload').click()
        // cy.contains('อัปโหลดรูปภาพจากเครื่อง').should('be.visible').click();

        // cy.contains('อัปโหลดรูปภาพจากเครื่อง')
        cy.get('.ant-upload > .ant-btn').click()

        const filePath = '../fixtures/img1.jpg';
        // const filePath = './cypress/fixtures/img1.jpg';
        
        // cy.get('[type="file"]').eq(0).selectFile({
        //     contents: filePath,
        //     fileName: 'img1.jpg',
        // })
        

        cy.fixture(filePath).then(fileContent => {
            cy.get('input[type="file"]').attachFile({ fileContent, fileName: 'img1.jpg' });
            // cy.get('input[type=file]').eq(0).selectFile(filePath);
        });

        // cy.get('img[alt="img1.jpg"]').should('be.visible');

        // cy.get('input[type="file"]', { timeout: 10000 }) // Increased timeout for element visibility
        // .should('be.visible') // Assert element is visible before attaching the file
        // .then(() => {
        //     const filePath = '../fixtures/img1.jpg';
        //         cy.fixture(filePath).then(fileContent => {
        //         cy.get('input[type="file"]').attachFile({ fileContent, fileName: 'img1.jpg' });
        //     });
        // });

        // ตรวจสอบผลลัพธ์ (ตัวอย่าง)
        // cy.get('img[alt="img1.jpg"]').should('be.visible');

        // โหลดไฟล์ภาพจากเครื่องและอัปโหลดไปยัง input element
        // cy.fixture('img1.jpg').then(fileContent => {
        //     cy.get('input[type="file"]').attachFile({
        //         fileContent: fileContent,
        //         fileName: 'img1.jpg',
        //         mimeType: 'image/jpg'
        //     });
        // });

        // cy.fixture('img1.jpg').then(fileContent => {
        //     cy.attachFile('input[type="file"]', 'img1.jpg', {
        //       fileContent: fileContent,
        //       mimeType: 'image/jpg' // Adjust as needed based on your file type
        //     });
        // });

        // cy.fixture('img1.jpg').then(fileContent => {
        //     cy.attachFile('input[type="file"]', 'img1.jpg', {
        //       fileContent: fileContent,
        //       mimeType: 'image/jpg' // Adjust as needed
        //     });
          
        //     // Wait for some time (adjust as needed based on your application)
        //     cy.wait(2000);
          
        //     // Assert the uploaded file (assuming the filename is displayed)
        //     cy.get('input[type="file"]').should('have.value', 'img1.jpg');
        // });
    });
});
  