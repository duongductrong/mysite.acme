import { Controller, Get } from '@nestjs/common';

@Controller({
  path: 'health',
})
export class HealthController {
  @Get('')
  health() {
    return {
      message: 'ok',
    };
  }
}
