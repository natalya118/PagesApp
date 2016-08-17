import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';
import { NotificationService } from '../shared/utils/notification.service';
import { ConfigService } from '../shared/utils/config.service';
import { MappingService } from '../shared/utils/mapping.service';
import { IPage, IPageDetails} from '../shared/interfaces';
import { DateFormatPipe } from '../shared/pipes/date-format.pipe';

import {SlimLoadingBarService} from '../../node_modules/ng2-slim-loading-bar/ng2-slim-loading-bar';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';

@Component({
    moduleId: module.id,
    selector: 'app-page-edit',
    templateUrl: 'page-edit.component.html',
    directives: [NKDatetime],
    providers: [MappingService],
    pipes: [DateFormatPipe]
})
export class PageEditComponent implements OnInit {
    apiHost: string;
    id: number;
    page: IPageDetails;
    pageLoaded: boolean = false;
    statuses: string[];
    types: string[];
    private sub: any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationService,
        private configService: ConfigService,
        private mappingService: MappingService,
        private slimLoader: SlimLoadingBarService) { }

    ngOnInit() {
        // (+) converts string 'id' to a number
	    this.id = +this.route.snapshot.params['id'];
        this.apiHost = this.configService.getApiHost();
        this.loadPageDetails();
    }

    loadPageDetails() {
        this.slimLoader.start();
        this.dataService.getPageDetails(this.id)
            .subscribe((page: IPageDetails) => {
                this.page = this.itemsService.getSerialized<IPageDetails>(page);
                this.pageLoaded = true;
                // Convert date times to readable format
                this.page.addedDate = new Date(this.page.addedDate.toString()); // new DateFormatPipe().transform(page.addedDate, ['local']);

                this.slimLoader.complete();
            },
            error => {
                this.slimLoader.complete();
                this.notificationService.printErrorMessage('Failed to load page. ' + error);
            });
    }

    updatePage(editPageForm: NgForm) {
        console.log(editPageForm.value);

        var pageMapped = this.mappingService.mapPageDetailsToPage(this.page);

        this.slimLoader.start();
        this.dataService.updatePage(pageMapped)
            .subscribe(() => {
                this.notificationService.printSuccessMessage('Page has been updated');
                this.slimLoader.complete();
            },
            error => {
                this.slimLoader.complete();
                this.notificationService.printErrorMessage('Failed to update page. ' + error);
            });
    }



    back() {
        this.router.navigate(['/pages']);
    }

}

