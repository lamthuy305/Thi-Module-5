import { Component, OnInit } from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../service/book/book.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-books-create',
  templateUrl: './books-create.component.html',
  styleUrls: ['./books-create.component.css']
})
export class BooksCreateComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService,
              private router: Router,
              private notification: NotificationService) {
  }


  bookForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
  });


  ngOnInit() {
  }

  submitCreate() {
    this.bookService.createBook(this.bookForm.value).subscribe(() => {
      this.router.navigateByUrl('/books');
      this.notification.showMessage('success', 'Create!', 'Tạo mới thành công');
    }, error => this.notification.showMessage('error', 'Create!', 'Tạo mới lỗi'));
  }

}
