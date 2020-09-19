import { Seat } from './seat';

export interface Row {
    index: number;
    seats: Seat[];
}