import { Product } from '../Entitys/Product';
import { FilterDTO } from './FilterDTO';
import { PagingDTO } from './PagingDTO';
import { SortDTO } from './SortDTO';

export interface ListProductDTO {
    data: Product[];
    paging: PagingDTO;
    filter: FilterDTO[];
    sort_options: SortDTO[];
}
