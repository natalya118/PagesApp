export interface IPage {
    id: number;
    urlName: string;
    title: string;
    description: string;
    content: string;
    addedDate: Date;
}

  export interface IPageDetails {
    id: number;
    urlName: string;
    title: string;
    description: string;
    content: string;
    addedDate: Date;
}

export interface Pagination {
    CurrentPage : number;
    ItemsPerPage : number;
    TotalItems : number;
    TotalPages: number;
}
 
export class PaginatedResult<T> {
    result :  T;
    pagination : Pagination;
}
 
export interface Predicate<T> {
    (item: T): boolean
}