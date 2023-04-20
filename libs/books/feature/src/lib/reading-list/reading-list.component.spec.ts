import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';

import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';

describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('When: I add/remove books', () => {
    beforeEach(() => {
      cy.startAt('/');
    });

    it('Then: I should be able to undo', () => {
      cy.get('[data-testing="toggle-reading-list"]').click();
      cy.get('body').then((body) => {
        if (body.find('[data-testing="remove-book-button"]').length > 0) {
          cy.get('[data-testing="remove-book-button"]').each(button => {
            cy.wrap(button)
              .click();
          });
        }
      });

      cy.get('[data-testing="close-reading-list"]').click();
      cy.get('input[type="search"]').type('javascript');

      cy.get('form').submit();

      cy.get('[data-testing="read-button"]').first().click();
      cy.get('[data-testing="read-button"]').should('be.disabled')
      cy.wait(1500);
      cy.get('.mat-simple-snackbar-action').click();
      cy.get('[data-testing="read-button"]').should('not.be.disabled')
    });
  });

  describe('When: I add/remove books', () => {
    beforeEach(() => {
      cy.startAt('/');
    });

    it('Then: I should be able to mark that as finished', () => {
      cy.get('[data-testing="toggle-reading-list"]').click();
      cy.get('body').then((body) => {
        if (body.find('[data-testing="remove-book-button"]').length > 0) {
          cy.get('[data-testing="remove-book-button"]').each(button => {
            cy.wrap(button)
              .click();
          });
        }
      });

      cy.get('[data-testing="close-reading-list"]').click();
      cy.get('input[type="search"]').type('javascript');

      cy.get('form').submit();

      cy.get('[data-testing="read-button"]').first().click();
      cy.get('[data-testing="toggle-reading-list"]').click();
      cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
      cy.get('[data-testing="finish-book-button"]').first().click();
      cy.get('[data-testing="finish-book-text"]').should(
        'contain.text',
        'Finished on'
      );
    });
  });
});
