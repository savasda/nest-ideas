import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IdeaModule } from './idea/idea.module'
import { HttpExceptionFilter } from './shared/http-errors.filter'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { LoggingInterceptor } from './shared/logging.interceptor'
import { UserModule } from './user/user.module'
import { CommentModule } from './comment/comment.module'

@Module({
  imports: [TypeOrmModule.forRoot(), IdeaModule, UserModule, CommentModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
