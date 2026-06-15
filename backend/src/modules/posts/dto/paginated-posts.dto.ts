import { PostResponseDto } from './post-response.dto';

export class PaginatedPostsDto {
  data!: PostResponseDto[];
  nextCursor!: string | null;
}
