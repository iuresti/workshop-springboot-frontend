import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Board} from '../../models';
import {BoardService} from '../../services/board.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-board-block',
  templateUrl: './board-block.component.html'
})
export class BoardBlockComponent implements OnInit {

  @Input() board: Board;
  @Output() updated: EventEmitter<Board> = new EventEmitter();
  enableEditions = false;

  constructor(private boardService: BoardService,
              private router: Router) {
  }

  ngOnInit() {
  }

  remove() {
    Swal.fire({
      title: `Eliminar board ${this.board.name}`,
      text: `Está seguro que desea eliminar el board?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.boardService.remove(this.board).subscribe(response => {
          Swal.fire(
            'Eliminado!',
            'El board ha sido eliminado.',
            'success'
          );
          this.updated.emit(this.board);
        });
      }
    });
  }

  save(newName: string) {
    this.board.name = newName;
    this.boardService.save(this.board).subscribe(response => this.updated.emit(this.board));
  }

  open() {
    this.router.navigate(['board', this.board.id]);
  }
}
