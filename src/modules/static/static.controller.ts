import { Controller, Get } from '@nestjs/common';
import { StaticService } from './static.service';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { Public } from '../auth/decorators/public.decorator';

@Controller('static')
export class StaticController {
  constructor(private readonly staticService: StaticService) {}

  @Get('home')
  @Public()
  getHome() {
    return this.staticService.getLandingPage();
  }

  @Get('about')
  @ResponseMessage('About information retrieved successfully')
  getAbout() {
    return this.staticService.getAbout();
  }
}
