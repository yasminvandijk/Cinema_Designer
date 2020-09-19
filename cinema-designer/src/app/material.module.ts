import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule } from '@angular/material';

@NgModule({
    exports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule
    ]
})
export class MaterialModule { }