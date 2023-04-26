import 'dotenv/config';

export class Config {
  public get PORT(): number {
    return parseInt(process.env.PORT || '8000');
  }

  public get PAYPAL(): { clientID: string; clientSecret: string } {
    return {
      clientID: process.env.PAYPAL_CLIENT_ID || '',
      clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
    };
  }
}
