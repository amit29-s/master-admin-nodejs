import {
    Body,
    Delete,
    Get,
    JsonController,
    Param,
    Post,
    Put,
    Res,
  } from 'routing-controllers';
  import { Response } from 'express';
  import { ResponseHandler } from '../../services/response-handler/ResponseHandler.service';
  import { VendorFeatureService } from '../../services/organization/vendorFeatureService';
  import { iVendorCreateFeature } from '../../types/vendorFeature.type';
  
  @JsonController('/vendorFeature')
  export class VendorFeatureController {
    constructor(
      private VendorFeatureService: VendorFeatureService,
      private responseService: ResponseHandler,
    ) {}
    @Post('/createVendorFeature')
    async createVendorFeature(@Body() feature: iVendorCreateFeature, @Res() res: Response) {
      const data = await this.VendorFeatureService.createFuture(feature);
      return this.responseService.apiResponseHandler(res, data);
    }

    @Post('/createManyVendorFeature')
    async createManyVendorFeature(@Body() features: iVendorCreateFeature[], @Res() res: Response) {
        const data = await this.VendorFeatureService.createManyFeature(features);
      return this.responseService.apiResponseHandler(res, data);
    }
  
    @Get('/getAllVendorFeatures')
    async getAllVendorFeatures(@Res() res: Response) {
      const data = await this.VendorFeatureService.getAllFeatures();
      return this.responseService.apiResponseHandler(res, data);
    }
  
    @Delete('/deleteVendorFeature/:id')
    async deleteVendorFeature(@Param('id') id: string, @Res() res: Response) {
      const data = await this.VendorFeatureService.deleteFeatureById(id);
      return this.responseService.apiResponseHandler(res, data);
    }
  
    @Put('/updateVendorFeature/:id')
    async updateVendorFeature(
      @Param('id') id: string,
      @Body() updateData: any,
      @Res() res: Response,
    ) {
      const data = await this.VendorFeatureService.updateFeatureById(id, updateData);
      return this.responseService.apiResponseHandler(res, data);
    }
  }
  