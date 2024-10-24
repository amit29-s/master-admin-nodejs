import {
    Body,
    Delete,
    Get,
    JsonController,
    Param,
    Post,
    Res,
  } from 'routing-controllers';
  import { OrganizationService } from '../../services/organization/organization.service';
  import { Response } from 'express';
  import { ResponseHandler } from '../../services/response-handler/ResponseHandler.service';
import { iCreatOrg } from 'src/types/organization.type';
  
  @JsonController('/organization')
  export class OrganisationController {
    constructor(
      private OrganizationService: OrganizationService,
      private responseService: ResponseHandler,
    ) {}
  
    @Post('/createOrganization')
    async createOrganization(@Body() organization: iCreatOrg, @Res() res: Response) {
      const data = await this.OrganizationService.createOrganization(organization);
      return this.responseService.apiResponseHandler(res, data);
    }

    @Get('/getOrganization')
    async getOrganizations(@Res() res: Response) {
        const data = await this.OrganizationService.getOrganizations();
        return this.responseService.apiResponseHandler(res, data);
    }

    @Post('/getOrganizationByNameOrBaseUrl')
    async getOrganizationByNameOrBaseUrl(@Body() orgData : any,@Res() res: Response) {
      const {orgName,base_url} = orgData;
      const data = await this.OrganizationService.getOrganizationByNameOrBaseUrl(orgName,base_url);
      return this.responseService.apiResponseHandler(res, data);
  }

    @Delete('/deleteOrganization/:id')
    async deleteStore(@Param('id') id: string, @Res() res: Response) {
      console.log(id,'lkjasdflkjsadfkljsadflksjadflksdjfkl')
      const data = await this.OrganizationService.deleteOrganizationById(id);
      return this.responseService.apiResponseHandler(res, data);
    }
  
    @Delete('/deleteOrganizations')
    async deleteStores(@Body() ids: { ids: string[] }, @Res() res: Response) {
      const data = await this.OrganizationService.deleteOrganizationsByIds(ids.ids);
      return this.responseService.apiResponseHandler(res, data);
    }
  
  }
  