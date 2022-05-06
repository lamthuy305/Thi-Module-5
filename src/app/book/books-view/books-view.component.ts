import {Component, OnInit} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../service/book/book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';
import {FormControl, FormGroup} from '@angular/forms';

declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-books-view',
  templateUrl: './books-view.component.html',
  styleUrls: ['./books-view.component.css']
})
export class BooksViewComponent implements OnInit {

  book: Book = {};

  constructor(private bookService: BookService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService) {
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

  private getBookById(id) {
    this.bookService.getBookById(id).subscribe(bookBE => {
      this.book = bookBE;
      this.idControl.setValue(this.book.id);
      this.titleControl.setValue(this.book.title);
      this.authorControl.setValue(this.book.author);
      this.descriptionControl.setValue(this.book.description);
    });
  }

  delete(id) {
    Swal.fire({
      title: 'Bạn có muốn xóa?',
      text: 'You wont be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
          this.bookService.deleteBook(id).subscribe(() => {
              this.router.navigateByUrl('/books');
              this.notificationService.showMessage('success', 'Delete!', 'Xóa thành công');
            }, error =>
              this.notificationService.showMessage('erros', 'Delete!', 'Xóa lỗi')
          );
        }
      }
    );
  }

}
