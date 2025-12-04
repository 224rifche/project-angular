import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceID = 'service_3efcgi5';
  private templateID = 'template_qidhsln';
  private userID = 'ogSUIiLR5jDIxWBx0';

  constructor() {
    emailjs.init(this.userID);
  }

  sendEmail(templateParams: any): Promise<any> {
    return emailjs.send(
      this.serviceID,
      this.templateID,
      templateParams,
      this.userID
    );
  }
}
