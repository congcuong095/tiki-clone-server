export interface SortDTO {
    display_value: string;
    query_value: string;
    selected: boolean;
}

export const SortDTO = [
    {
        display_value: 'Phổ biến',
        query_value: 'default',
        selected: true,
    },
    {
        display_value: 'Bán chạy',
        query_value: 'top_seller',
        selected: false,
    },
    {
        display_value: 'Hàng mới',
        query_value: 'newest',
        selected: false,
    },
    {
        display_value: 'Giá thấp đến cao',
        query_value: 'price,asc',
        selected: false,
    },
    {
        display_value: 'Giá cao đến thấp',
        query_value: 'price,desc',
        selected: false,
    },
];
