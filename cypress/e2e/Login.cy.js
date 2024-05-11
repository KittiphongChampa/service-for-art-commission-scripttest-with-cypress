const url_login = `http://localhost:3000/login`

describe('Login Test Pass', () => {
  it('TC1', () => {
    cy.visit(url_login)
    cy.get('#login_email').type('yun12321kittipong@gmail.com')
    cy.get('#login_password').type('11111111')
    cy.get('.ant-btn').click()
  })
})

// อีเมลถูก รหัสผ่านผิด
describe('Login Test Fail', () => {
  it('TC2', () => {
    cy.visit(url_login)
    cy.get('#login_email').type('yun12321kittipong@gmail.com')
    cy.get('#login_password').type('11111112')
    cy.get('.ant-btn').click()
    cy.get('.swal2-title').should('be.visible')
    cy.get('.swal2-title').should('contain', 'อีเมลหรือรหัสผ่านไม่ถูกต้อง')
  })
})

// ไม่กรอกรหัสผ่าน
describe('Login Test Fail', () => {
  it('TC3', () => {
    cy.visit(url_login)
    cy.get('#login_email').type('yun12321kittipong@gmail.com')
    cy.get('.ant-btn').click()
    cy.get('.ant-form-item-explain-error').should('contain', 'กรุณากรอกรหัสผ่าน')
  })
})

// อีเมลไม่กรอก @
describe('Login Test Fail', () => {
  it('TC4', () => {
    cy.visit(url_login)
    cy.get('#login_email').type('yun12321kittiponggmail.com')
    cy.get('#login_password').type('11111111')
    cy.get('.ant-btn').click()
    cy.get('.ant-form-item-explain-error').should('contain', "'email' is not a valid email")
  })
})

// อีเมลไม่กรอก .
describe('Login Test Fail', () => {
  it('TC5', () => {
    cy.visit(url_login)
    cy.get('#login_email').type('yun12321kittipong@gmailcom')
    cy.get('#login_password').type('11111111')
    cy.get('.ant-btn').click()
    cy.get('.ant-form-item-explain-error').should('contain', "'email' is not a valid email")
  })
})