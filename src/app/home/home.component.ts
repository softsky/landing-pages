import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { QueueService } from '../common/queue.service';
import { Logger } from '@app/core';

const log =  new Logger('HomeComponent');
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  subscribed: boolean = false;
  email: string;
  quote: string;
  emailForm: FormGroup;
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private translate: TranslateService,
    private queueService: QueueService,
  ) {
    this.route.fragment.subscribe((fragment: string) => {
      log.debug('Subscribing email', fragment);
      this.email = fragment;
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.emailForm = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]]
    });
  }

  ngAfterViewInit() {
  };

  subscribe(){
    log.debug(`Email ${this.email} subscribed`);
    // TODO send subscribe event
    this.subscribed = true;
  }

  notify(){
    log.debug(`Others are notified`);
    this.queueService
      .queuePop({
        queue: 'BreachedAccounts'
      })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((msg: any) => {
        if (msg.ReceiveMessageResponse && msg.ReceiveMessageResponse.ReceiveMessageResult) {
          const a = document.createElement('a');

          this.translate.get('Click to send the email').subscribe(clickHereText => {
            a.appendChild(document.createTextNode(clickHereText));
            a.href = msg.ReceiveMessageResponse.ReceiveMessageResult.messages[0].Body;
            a.target = '_new';
            a.click();
          });
        } else {
          this.translate.get('Lookes like all emails are sent').subscribe((res: string) => {
            window.alert(res);
          });
        }
      });

  }

}
