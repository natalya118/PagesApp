import { Component, OnInit, ViewChild, Input, Output,
    trigger,
    state,
    style,
    animate,
    transition } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import {PAGINATION_DIRECTIVES, PaginationComponent } from 'ng2-bootstrap';

import { DataService } from '../shared/services/data.service';
import { ItemsService } from '../shared/utils/items.service';
import { NotificationService } from '../shared/utils/notification.service';
import { ConfigService } from '../shared/utils/config.service';
import { IPage, IPageDetails, Pagination, PaginatedResult } from '../shared/interfaces';
import { DateFormatPipe } from '../shared/pipes/date-format.pipe';

@Component({
    moduleId: module.id,
    selector: 'app-pages',
    templateUrl: 'page-list.component.html',
    directives: [ROUTER_DIRECTIVES, MODAL_DIRECTIVES, PAGINATION_DIRECTIVES],
    pipes: [DateFormatPipe],
    animations: [
        trigger('flyInOut', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.5s ease-in')
            ]),
            transition('* => void', [
                animate('0.2s 10 ease-out', style({
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ])
        ])
    ]
})
export class PageListComponent implements OnInit {

    pages: IPage[];
    apiHost: string;

    public itemsPerPage: number = 2;
    public totalItems: number = 0;
    public currentPage: number = 1;

    // Modal properties
    @ViewChild('modal')
    modal: ModalComponent;
    items: string[] = ['item1', 'item2', 'item3'];
    selected: string;
    output: string;
    selectedPageId: number;
    pageDetails: IPageDetails;
    selectedPageLoaded: boolean = false;
    index: number = 0;
    backdropOptions = [true, false, 'static'];
    animation: boolean = true;
    keyboard: boolean = true;
    backdrop: string | boolean = true;

    constructor(private slimLoader: SlimLoadingBarService,
        private dataService: DataService,
        private itemsService: ItemsService,
        private notificationService: NotificationService,
        private configService: ConfigService) { }

    ngOnInit() {
        this.apiHost = this.configService.getApiHost();
        this.loadPages();
    }

    loadPages() {
        this.slimLoader.start();

        this.dataService.getPages(this.currentPage, this.itemsPerPage)
            .subscribe((res: PaginatedResult<IPage[]>) => {
                this.pages = res.result;// pages;
                this.totalItems = res.pagination.TotalItems;
                this.slimLoader.complete();
            },
            error => {
                this.slimLoader.complete();
                this.notificationService.printErrorMessage('Failed to load pages. ' + error);
            });
    }

    pageChanged(event: any): void {
        this.currentPage = event.page;
        this.loadPages();
        //console.log('Page changed to: ' + event.page);
        //console.log('Number items per page: ' + event.itemsPerPage);
    };

    removePage(page: IPage) {
        this.notificationService.openConfirmationDialog('Are you sure you want to delete this page?',
            () => {
                this.slimLoader.start();
                this.dataService.deletePage(page.id)
                    .subscribe(() => {
                        this.itemsService.removeItemFromArray<IPage>(this.pages, page);
                        this.notificationService.printSuccessMessage(page.title + ' has been deleted.');
                        this.slimLoader.complete();
                    },
                    error => {
                        this.slimLoader.complete();
                        this.notificationService.printErrorMessage('Failed to delete ' + page.title + ' ' + error);
                    });
            });
    }

    viewPageDetails(id: number) {
        this.selectedPageId = id;
        this.modal.open('lg');
        console.log('test');
    }

    closed() {
        this.output = '(closed) ' + this.selected;
    }

    dismissed() {
        this.output = '(dismissed)';
    }

    opened() {
        this.slimLoader.start();
        this.dataService.getPageDetails(this.selectedPageId)
            .subscribe((page: IPageDetails) => {
                this.pageDetails = this.itemsService.getSerialized<IPageDetails>(page);
                // Convert date times to readable format
                this.pageDetails.addedDate = new DateFormatPipe().transform(page.addedDate, ['local']);
                
                this.slimLoader.complete();
                this.selectedPageLoaded = true;
            },
            error => {
                this.slimLoader.complete();
                this.notificationService.printErrorMessage('Failed to load page. ' + error);
            });

        this.output = '(opened)';
    }
}