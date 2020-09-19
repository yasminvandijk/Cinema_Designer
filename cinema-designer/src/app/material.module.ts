import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule } from '@angular/material';

@NgModule({
    exports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatRadioModule,
        MatSidenavModule,
        MatToolbarModule
    ]
})
export class MaterialModule { }