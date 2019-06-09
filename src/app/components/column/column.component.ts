import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Column} from '../../models';
import {ColumnService} from '../../services/column.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styles: []
})
export class ColumnComponent {

  @Input() column: Column;
  @Output() updated: EventEmitter<Column> = new EventEmitter();
  enableEditions = false;

  constructor(private columnService: ColumnService) {
  }

  remove() {
    Swal.fire({
      title: `Eliminar columna ${this.column.name}`,
      text: `Está seguro que desea eliminar la columna?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.columnService.remove(this.column).subscribe(response => {
          Swal.fire(
            'Eliminado!',
            'La columna ha sido eliminada.',
            'success'
          );
          this.updated.emit(this.column);
        });
      }
    });
  }

  save(newColumnName: string) {
    this.column.name = newColumnName;
    this.columnService.save(this.column).subscribe(response => {
      this.enableEditions = false;
    });

  }
}
