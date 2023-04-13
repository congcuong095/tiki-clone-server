export interface FilterDTO {
    collapsed?: number;
    display_name?: string;
    icon?: string;
    max?: number;
    min?: number;
    multi_select?: boolean;
    query_name?: string;
    type?: string;
    values?: {
        display_value?: string;
        query_value?: string;
        url_key?: string;
        url_path?: string;
        selected?: boolean;
    }[];
}

export const CategoryFilter: FilterDTO = {
    collapsed: 7,
    display_name: 'Danh Mục Sản Phẩm',
    multi_select: false,
    query_name: 'category',
    values: [],
};

export const NowFilter: FilterDTO = {
    collapsed: 5,
    display_name: 'Giao siêu tốc 2H',
    icon: 'https://salt.tikicdn.com/ts/upload/b3/21/cf/c6525bcd44b3bb1b793277cc98487799.png',
    multi_select: false,
    query_name: 'support_p2h_delivery',
    type: 'service',
    values: [],
};

export const AstraFilter: FilterDTO = {
    collapsed: 5,
    display_name: 'Thưởng thêm Astra',
    icon: 'https://salt.tikicdn.com/ts/upload/e9/14/26/52318ad1543ad9d3ee5b633b3df0750d.png',
    multi_select: false,
    query_name: 'seller_asa_cashback',
    type: 'service',
    values: [],
};

export const InstallmentFilter: FilterDTO = {
    collapsed: 5,
    display_name: 'Trả góp 0%',
    multi_select: false,
    query_name: 'support_installment',
    type: 'service',
    values: [],
};

export const RatingFilter: FilterDTO = {
    collapsed: 5,
    display_name: 'Đánh giá',
    multi_select: false,
    query_name: 'rating',
    values: [
        {
            display_value: 'từ 5 sao',
            query_value: '5',
        },
        {
            display_value: 'từ 4 sao',
            query_value: '4',
        },
        {
            display_value: 'từ 3 sao',
            query_value: '3',
        },
    ],
};

export const PriceFilter: FilterDTO = {
    collapsed: 5,
    display_name: 'Giá',
    max: 10000000000,
    min: 0,
    multi_select: false,
    query_name: 'price',
    values: [],
};

export const SelectionFilter: FilterDTO = {
    collapsed: 5,
    display_name: 'Thương hiệu',
    multi_select: true,
    query_name: 'brand',
    values: [],
};

export const CrossBorderFilter: FilterDTO = {
    collapsed: 5,
    display_name: 'Giao Hàng',
    multi_select: false,
    query_name: 'is_cross_border',
    values: [
        {
            display_value: 'Hàng nội địa',
            query_value: '0',
        },
        {
            display_value: 'Hàng quốc tế',
            query_value: '1',
        },
    ],
};
