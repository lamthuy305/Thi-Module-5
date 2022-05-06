import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BooksCreateComponent} from './book/books-create/books-create.component';
import {BooksListComponent} from './book/books-list/books-list.component';
import {BooksEditComponent} from './book/books-edit/books-edit.component';
import {BooksViewComponent} from './book/books-view/books-view.component';


const routes: Routes = [
  {
    path: 'books/create',
    component: BooksCreateComponent
  },
  {
    path: 'books',
    component: BooksListComponent
  },
  {
    path: 'books/edit/:id',
    component: BooksEditComponent
  },
  {
    path: 'books/:id',
    component: BooksViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
