export interface PaginateOptions {
    page: number,
    limit: number,
    sort?: {
        [key: string]: number
    }
}