import { Component, Output, EventEmitter } from '@angular/core'
import { GroupAmount } from 'src/app/Models/groupAmount';
import { ProblemType } from 'src/app/Models/problemType';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

    @Output('nrRows') nrRowsEmitter: EventEmitter<number> = new EventEmitter<number>();
    @Output('nrCols') nrColsEmitter: EventEmitter<number> = new EventEmitter<number>();
    @Output('groupAmounts') groupAmountsEmitter: EventEmitter<GroupAmount[]> = new EventEmitter<GroupAmount[]>();
    @Output('problemType') problemTypeEmitter: EventEmitter<ProblemType> = new EventEmitter<ProblemType>();
    @Output('filename') filenameEmitter: EventEmitter<string> = new EventEmitter<string>();
    @Output('download') downloadEmitter: EventEmitter<null> = new EventEmitter<null>();

    nrRows: number = 10;
    nrCols: number = 10;
    
    groupAmounts: GroupAmount[] = [];
    totalVisitors: number = 0;

    selectedProblemType: ProblemType = ProblemType.Offline;
    problemTypes: {value: ProblemType, name: string}[] = [
        {value: ProblemType.Offline, name: "offline problem"},
        {value: ProblemType.Online, name: "online problem"}
    ]

    filename: string = 'layout';

    ngOnInit() {
        for (let i = 1; i < 9; i++) {
            this.groupAmounts.push({
                groupSize: i,
                amount: 0
            });
        }
        
        this.nrRowsEmitter.emit(this.nrRows);
        this.nrColsEmitter.emit(this.nrCols);
        this.groupAmountsEmitter.emit(this.groupAmounts);
        this.problemTypeEmitter.emit(this.selectedProblemType);
        this.filenameEmitter.emit(this.filename);
    }

    setNrRows(value: number) {
        this.nrRows = value;
    }

    setNrCols(value: number) {
        this.nrCols = value;
    }

    updateLayout() {
        this.nrRowsEmitter.emit(this.nrRows);
        this.nrColsEmitter.emit(this.nrCols);
    }

    setGroupAmount(groupSize: number, amount: number) {
        this.groupAmounts[groupSize - 1].amount = amount;
        this.groupAmountsEmitter.emit(this.groupAmounts);
        this.updateNrVisitors();
    }

    updateNrVisitors() {
        this.totalVisitors = this.groupAmounts.map(x => x.amount * x.groupSize).reduce((sum, value) => sum + value);
    }

    problemTypeChanged() {
        this.problemTypeEmitter.emit(this.selectedProblemType);
    }

    setFilename(value: string) {
        this.filename = value;
        this.filenameEmitter.emit(this.filename);
    }

    download() {
        this.downloadEmitter.emit();
    }
}

