import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QueueService } from '../common/queue.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule, ReactiveFormsModule,
    CoreModule,
    SharedModule,
    Angulartics2Module,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    QueueService
  ]
})
export class HomeModule { }
