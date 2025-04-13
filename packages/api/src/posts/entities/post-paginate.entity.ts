import { Pagination } from 'nestjs-typeorm-paginate';
import { Post } from './post.entity';

export class PostPaginate extends Pagination<Post> {}
