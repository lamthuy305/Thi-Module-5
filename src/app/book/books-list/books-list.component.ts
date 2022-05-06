import {Component, OnInit} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../service/book/book.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';


declare var $: any;
declare var Swal: any;

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService,
              private router: Router,
              private notificationService: NotificationService) {
  }

  getAllBook() {
    this.bookService.getAll().subscribe((booksBE) => {
      this.books = booksBE;
      $(function() {
        $('#books-list').DataTable({
          'paging': true,
          'lengthChange': false,
          'searching': false,
          'ordering': true,
          'info': true,
          'autoWidth': false,
        });
      });
    });
  }


  ngOnInit() {
    this.getAllBook();
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
              this.getAllBook();
              this.notificationService.showMessage('success', 'Delete!', 'Xóa thành công');
            }, error =>
              this.notificationService.showMessage('erros', 'Delete!', 'Xóa lỗi')
          );
        }
      }
    );
  }
}
