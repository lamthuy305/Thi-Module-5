import {Component, OnInit} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../service/book/book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-books-edit',
  templateUrl: './books-edit.component.html',
  styleUrls: ['./books-edit.component.css']
})
export class BooksEditComponent implements OnInit {
  book: Book = {};

  constructor(private bookService: BookService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private notification: NotificationService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = +paramMap.get('id');
      this.getBookById(id);
    });
  }


  bookForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
  });

  get idControl() {
    return this.bookForm.get('id');
  }

  get titleControl() {
    return this.bookForm.get('title');
  }

  get authorControl() {
    return this.bookForm.get('author');
  }

  get descriptionControl() {
    return this.bookForm.get('description');
  }

  ngOnInit() {
  }

  submitEdit() {
    this.bookService.editBook(this.book.id, this.bookForm.value).subscribe(() => {
      this.router.navigateByUrl('/books');
      this.notification.showMessage('success', 'Edit!', 'Chỉnh sửa thành công');
    }, error => this.notification.showMessage('error', 'Edit!', 'Chỉnh sửa lỗi'));
  }

  private getBookById(id) {
    this.bookService.getBookById(id).subscribe(bookBE => {
      this.book = bookBE;
      this.idControl.setValue(this.book.id);
      this.titleControl.setValue(this.book.title);
      this.authorControl.setValue(this.book.author);
      this.descriptionControl.setValue(this.book.description);
    });
  }
}
