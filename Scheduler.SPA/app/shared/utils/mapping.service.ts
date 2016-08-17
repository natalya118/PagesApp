import { Injectable } from '@angular/core';

import { IPage, IPageDetails} from '../interfaces';
import  { ItemsService } from './items.service'

@Injectable()
export class MappingService {

    constructor(private itemsService : ItemsService) { }

    mapPageDetailsToPage(pageDetails: IPageDetails): IPage {
        var page: IPage = {
            id: pageDetails.id,
            title: pageDetails.title,
            description: pageDetails.description,
            urlName: pageDetails.urlName,
            content: pageDetails.content,
            addedDate: pageDetails.addedDate
        }

        return page;
    }

}