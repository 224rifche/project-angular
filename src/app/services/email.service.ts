import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceID = 'votre_service_id';
  private templateID = 'votre_template_id';
  private userID = 'votre_user_id';

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
