import { Controller, Get } from '@nestjs/common';
import { StaticService } from './static.service';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';

@Controller('static')
export class StaticController {
  constructor(private readonly staticService: StaticService) {}

  @Get('home')
  getHome() {
    return this.staticService.getLandingPage();
  }

  @Get('about')
  @ResponseMessage('About information retrieved successfully')
  getAbout() {
    return this.staticService.getAbout();
  }
}
