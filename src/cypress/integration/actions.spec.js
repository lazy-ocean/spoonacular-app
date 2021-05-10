/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("working search and recent adding", () => {
    cy.get("[data-cy=search-form]").find("[data-cy=input]").type("apple");
    cy.get("[data-cy=search-form]").submit();
    cy.wait(2000);
    cy.get("[data-cy=recently-searched]").should("contain", "apple");
  });

  it("correct order of recent items", () => {
    cy.get("[data-cy=search-form]").find("[data-cy=input]").type("apple");
    cy.get("[data-cy=search-form]").submit();
    cy.wait(2000);
    cy.get("[data-cy=search-form]").clear();
    cy.get("[data-cy=search-form]").find("[data-cy=input]").type("banana");
    cy.get("[data-cy=search-form]").submit();
    cy.wait(2000);
    cy.get("[data-cy=recently-searched-item]").first().should("contain", "banana");
  });

  it("ingredients list is correct", () => {
    cy.get("[data-cy=search-form]").find("[data-cy=input]").type("apple");
    cy.get("[data-cy=search-form]").submit();
    cy.wait(2000);
    cy.get("[data-cy=ingredient]").each(($item) => expect($item).to.contain("apple"));
  });

  it("recipes are correct", () => {
    cy.get("[data-cy=ingredient]").first().click();
    cy.wait(2000);
    cy.get("[data-cy=recipe]").each(($item) => expect($item).to.contain("Banana"));
  });
});
