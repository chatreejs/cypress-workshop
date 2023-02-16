declare namespace Cypress {
  interface Chainable {
    /**
     * Create several Todo items via UI
     * @example
     * cy.createDefaultTodos()
     */
    createDefaultTodos(): Chainable<any>;

    /**
     * Create a Todo item via UI
     * @example
     * cy.createTodo('new todo')
     */
    createTodo(title: string): Chainable<any>;
  }
}
