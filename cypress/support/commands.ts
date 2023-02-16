// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("createDefaultTodos", () => {
  let TODO_ITEM_ONE = "buy some cheese";
  let TODO_ITEM_TWO = "feed the cat";
  let TODO_ITEM_THREE = "book a doctors appointment";

  Cypress.log({
    name: "create default todos",
    message: [],
    consoleProps: () => {
      return {
        "Inserted Todos": [TODO_ITEM_ONE, TODO_ITEM_TWO, TODO_ITEM_THREE],
      };
    },
  });

  cy.get(".new-todo", { log: false })
    .type(`${TODO_ITEM_ONE}{enter}`, { log: false })
    .type(`${TODO_ITEM_TWO}{enter}`, { log: false })
    .type(`${TODO_ITEM_THREE}{enter}`, { log: false });

  return cy.get(".todo-list li", { log: false });
});

Cypress.Commands.add("createTodo", (title) => {
  Cypress.log({
    name: "create todo",
    message: title,
    consoleProps: () => {
      return {
        "Inserted Todo": title,
      };
    },
  });

  cy.get(".new-todo", { log: false }).type(`${title}{enter}`, { log: false });

  return cy
    .get(".todo-list li", { log: false })
    .contains("li", title.trim(), { log: false });
});
