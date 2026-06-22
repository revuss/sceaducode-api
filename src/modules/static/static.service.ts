import { Injectable } from '@nestjs/common';
import { landingPageData } from './data/landing-page.data';

@Injectable()
export class StaticService {
  getLandingPage() {
    return landingPageData;
  }

  getAbout() {
    return {
      company: 'My Backend',
      version: '1.0.0',
    };
  }
}
