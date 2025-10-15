import { Controller, Get, Render, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  
  @Get()
  @Render('home')
  home() {
    return { layout: '_layouts/main', title: 'Главная страница'};
  }

  @Get('/about')
  @Render('about')
  about() {
    return {layout: '_layouts/main', title: 'О проекте' };
  }

  @Get('/contacts')
  @Render('contacts')
  contacts() {
    return {layout: '_layouts/main', title: 'Контакты' };
  }


  @Get('/forms')
  @Render('forms')
  forms() {
    return { layout: '_layouts/main', title: 'Пример использования форм' };
  }


  @Post('/forms')
  formsHandler(@Body() body: { name: string, email: string }) {
    
    return {
      message: 'Данные успешно отправлены',
      errCode: 0,
      title: 'Формы',
      name: body.name,
      email: body.email,
    };
  }


  @Post('/uploadFileHandler')
  @UseInterceptors(FileInterceptor('uploadedFile', {
    storage: diskStorage({
      destination: './uploads', //папка для загрузки
      filename: (req, file, callback) => {
        const uniqueSuffix = Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, file.fieldname + '-' + uniqueSuffix + ext);
      },
    })
  }))
  uploadFileHandler(@UploadedFile() file) {

    return {
      message: 'Данные успешно отправлены',
      errCode: 0,
      data: file,
    };
  }





  @Get('*')
  @Render('page404')
  page404() {
    return {layout: '_layouts/second', title: 'Страница 404' };
  }


}
