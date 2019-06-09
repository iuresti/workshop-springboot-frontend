import {Component} from '@angular/core';
import {Board} from '../../models';
import {BoardService} from '../../services/board.service';
import Swal from 'sweetalert2';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {

  public boards: Board[] = [];

  constructor(private boardService: BoardService,
              private authService: AuthService) {

    this.refresh();
  }

  refresh() {
    this.boardService.getAll().subscribe(response => this.boards = response);
  }

  async createBoard() {
    const {value: boardName} = await Swal.fire({
      title: `Introduzca nuevo nombre para el Tablero`,
      input: 'text',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Es necesario escribir un valor!';
        }
      }
    });

    if (boardName) {
      const board = new Board();
      board.name = boardName;
      board.userId = this.authService.user.id;

      this.boardService.save(board).subscribe(response => this.refresh());
    }
  }
}
