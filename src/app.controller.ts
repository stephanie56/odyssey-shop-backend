import { Controller, Get } from '@nestjs/common';

@Controller('/api/config')
export class AppController {
  @Get('image-upload')
  async getImageUploadCredential(): Promise<any> {
    const imageUploaderCredential = {
      user: process.env.CLOUDINARY_USER,
      preset: process.env.CLOUDINARY_PRESET,
    };
    return imageUploaderCredential;
  }
}
