import { Component } from '@angular/core';
import { GroupAmount } from './Models/groupAmount';
import { ProblemType } from './Models/problemType';
import { Row } from './Models/row';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private nrRows: number = 0;
  private nrCols: number = 0;

  private groupAmounts: GroupAmount[] = [];
  private problemType: ProblemType = ProblemType.Offline;
  private filename: string = '';

  private layout: Row[] = [];
  
  setNrRows(value: number) {
    this.nrRows = value;
  }

  setNrCols(value: number) {
    this.nrCols = value;
  }

  setGroupAmounts(value: GroupAmount[]) {
    this.groupAmounts = value;
  }

  setProblemType(value: ProblemType) {
    this.problemType = value;
  }

  setFilename(value: string) {
    this.filename = value;
  }

  setLayout(value: Row[]) {
    this.layout = value;
  }

  download() {
    let fileContents: string = this.getFileContents(this.nrRows, this.nrCols, this.layout, this.groupAmounts);
    
    this.downloadTextFile(this.filename, fileContents);
  }

  private getFileContents(nrRows: number, nrCols: number, layout: Row[], groupAmounts: GroupAmount[]): string {
    let dimStr: string = `${nrRows}\r\n${nrCols}`;

    let layoutStr: string = this.getLayoutText(layout);

    // get group text for offline or online problem
    let groupStr: string = '';
    if (this.problemType == ProblemType.Offline) {
      groupStr = this.getOfflineGroupText(groupAmounts);
    }
    else if (this.problemType == ProblemType.Online) {
      groupStr = this.getOnlineGroupText(groupAmounts);
    }

    return [dimStr, layoutStr, groupStr].join('\r\n');
  }

  private getLayoutText(layout: Row[]): string {
    return layout.map(row => row.seats.map(x => x.seat ? '1' : '0').join('')).join('\r\n');
  }

  private getOfflineGroupText(groupAmounts: GroupAmount[]): string {
    return groupAmounts.map(x => x.amount).join(' ');
  }

  private shuffleList(items: number[]): number[] {
    let result = [];

    while (items.length > 0) {
      let randomIndex = Math.floor(Math.random() * (items.length - 1));

      result.push(items[randomIndex]);
      items.splice(randomIndex, 1);
    }

    return result;
  }

  private getOnlineGroupText(groupAmounts: GroupAmount[]): string {
    let remainingGroups: number[] = [];
    
    groupAmounts.forEach(groupAmount => {
      for (let i = 0; i < groupAmount.amount; i++) {
        remainingGroups.push(groupAmount.groupSize);
      }
    });
    
    remainingGroups = this.shuffleList(remainingGroups);
    remainingGroups.push(0);

    return remainingGroups.join(' ');
  }

  private downloadTextFile(fileName: string, fileContents: string) {
    var dynamicDownload = document.createElement('a');
    const element = dynamicDownload;
    const fileType = 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(fileContents)}`);
    element.setAttribute('download', fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }
}
