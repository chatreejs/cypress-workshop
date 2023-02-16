describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");

    cy.contains("type").click();

    cy.url().should("include", "/commands/actions");

    cy.get(".action-email").as("email-input").type("fake@email.com");

    cy.get("@email-input").should("have.value", "fake@email.com");
  });
});
