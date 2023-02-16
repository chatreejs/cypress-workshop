describe("Todo App", () => {
  // setup these constants to match what TodoMVC does
  let TODO_ITEM_ONE = "buy some cheese";
  let TODO_ITEM_TWO = "feed the cat";
  let TODO_ITEM_THREE = "book a doctors appointment";

  beforeEach(() => {
    cy.visit("/");
  });

  context("No todos", () => {
    it("todo list should be empty", () => {
      cy.get(".todo-list li").should("not.exist");
      cy.get(".main").should("not.exist");
      cy.get(".footer").should("not.exist");
    });
  });

  context("New todo", () => {
    it("should allow me to add todo items", () => {
      // create 1st todo
      cy.get(".new-todo").type(TODO_ITEM_ONE).type("{enter}");

      // make sure the 1st label contains the 1st todo text
      cy.get(".todo-list li")
        .eq(0)
        .find("label")
        .should("contain", TODO_ITEM_ONE);

      // create 2nd todo
      cy.get(".new-todo").type(TODO_ITEM_TWO).type("{enter}");

      // make sure the 2nd label contains the 2nd todo text
      cy.get(".todo-list li")
        .eq(1)
        .find("label")
        .should("contain", TODO_ITEM_TWO);
    });

    it("add items", () => {
      cy.get(".new-todo")
        .type("todo 1{enter}")
        .type("todo 2{enter}")
        .type("todo 3{enter}")
        .type("todo 4{enter}");

      cy.get(".todo-list li").should("have.length", 4);
    });

    it("should clear text input field when an item is added", () => {
      cy.get(".new-todo").type(TODO_ITEM_ONE).type("{enter}");

      cy.get(".new-todo").should("have.text", "");
    });

    it("should append new items to the bottom of the list", () => {
      cy.createDefaultTodos().as("todos");

      cy.get(".todo-count").contains("3 items left");
      cy.get("@todos").eq(0).find("label").should("contain", TODO_ITEM_ONE);
      cy.get("@todos").eq(1).find("label").should("contain", TODO_ITEM_TWO);
      cy.get("@todos").eq(2).find("label").should("contain", TODO_ITEM_THREE);
    });

    it("should show #main and #footer when items added", () => {
      cy.createTodo("Write a Cypress test");

      cy.get(".main").should("be.visible");
      cy.get(".footer").should("be.visible");
    });
  });

  context("Item", () => {
    it("should allow me to mark items as complete", () => {
      cy.createTodo(TODO_ITEM_ONE).as("firstTodo");
      cy.createTodo(TODO_ITEM_TWO).as("secondTodo");

      cy.get("@firstTodo").find(".toggle").check();
      cy.get("@firstTodo").should("have.class", "completed");

      cy.get("@secondTodo").should("not.have.class", "completed");
      cy.get("@secondTodo").find(".toggle").check();
      cy.get("@secondTodo").should("have.class", "completed");
    });
  });
});
