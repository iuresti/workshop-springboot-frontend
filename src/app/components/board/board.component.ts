import {Component} from '@angular/core';
import {Board, Column} from '../../models';
import {BoardService} from '../../services/board.service';
import {ColumnService} from '../../services/column.service';
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  board: Board = null;
  columns: Column[] = [];
  idBoard: number;

  constructor(private activatedRoute: ActivatedRoute,
              private boardService: BoardService,
              private columnService: ColumnService) {


    this.activatedRoute.params.subscribe(params => {
      this.idBoard = +(params.id);
      this.refresh();
    });

  }

  async createColumn() {
    const {value: columnName} = await Swal.fire({
      title: `Introduzca nombre para la columna`,
      input: 'text',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Es necesario escribir un valor!';
        }
      }
    });

    if (columnName) {
      const column = new Column();
      column.name = columnName;
      column.board = this.board.id;

      this.columnService.save(column).subscribe(response => this.refresh());
    }
  }

  private refresh() {
    this.boardService.get(this.idBoard).subscribe(board => {
      this.board = board;
      this.columnService.getByBoard(this.idBoard).subscribe(response => {
        this.columns = response;
      });
    });
  }
}
