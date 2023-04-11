import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3001, () => {
        const d = new Date();
        console.log('app start');
        console.log(d);
    });
}
bootstrap();
