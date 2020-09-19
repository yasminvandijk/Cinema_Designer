import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Row } from 'src/app/Models/row';
import { Seat } from 'src/app/Models/seat';

@Component({
    selector: 'app-layout-designer',
    templateUrl: './layout-designer.component.html',
    styleUrls: ['./layout-designer.component.scss']
})
export class LayoutDesignerComponent {

    @Input('nrRows')
    set nrRows(value: number) {
        this._nrRows = value;
        this.updateLayout()
    }

    @Input('nrCols')
    set nrCols(value: number) {
        this._nrCols = value;
        this.updateLayout();
    }

    @Output('layout') layoutEmitter: EventEmitter<Row[]> = new EventEmitter<Row[]>()

    _nrRows: number = 0;
    _nrCols: number = 0;

    _seats: Row[] = [];

    ngOnInit() {
        this.updateLayout();
    }

    updateLayout() {
        this._seats = [];

        for (let y = 0; y < this._nrRows; y++) {
            let row: Seat[] = [];
            
            for (let x = 0; x < this._nrCols; x++) {
                row.push({ index: x, seat: true });
            }

            this._seats.push({ index: y, seats: row });
        }

        this.layoutEmitter.emit(this._seats);
    }

    getSeat(row: number, column: number): boolean {
        return this._seats[row].seats[column].seat;
    }

    setSeat(row: number, column: number) {
        this._seats[row].seats[column].seat = !this._seats[row].seats[column].seat;
        this.layoutEmitter.emit(this._seats);
    }
}