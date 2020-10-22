/* eslint-disable */

context("User role", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Should see a list of 9 users", () => {
    cy.get("li").should("have.length", 9);
  });

  it("Should see one Admin user in the list", () => {
    cy.get("select").select("Admin");
    cy.get("li").should("have.length", 1);
  });
});
