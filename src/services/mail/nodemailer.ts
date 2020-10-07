import nodemailer from 'nodemailer';
import {
  host, port, user, pass,
} from '../../config/nodemailerConfig.json';

export default class Mail {
  private _transporter: nodemailer.Transporter; 
  constructor() { 
    this._transporter = nodemailer.createTransport( 
    { host,
      port,
      auth: {
        user, 
        pass
      }}
    ); 
  } 
  
  sendMail(to: string, subject: string, message: string) {
    
    let mailOptions = {
      from: 'from_test@gmail.com', 
      to: to, 
      subject: subject, 
      html: message 
    };

    return new Promise<void> ( 
      (resolve: (msg: any) => void,  
        reject: (err: Error) => void) => { 
          this._transporter.sendMail(  
            mailOptions, (error, info) => { 
              if (error) { 
                console.log(`error: ${error}`); 
                reject(error); 
              } else { 
                console.log(`Message Sent 
                  ${info.response}`); 
                resolve(`Message Sent  
                  ${info.response}`); 
              } 
          }) 
        } 
    ); 
  };
}
