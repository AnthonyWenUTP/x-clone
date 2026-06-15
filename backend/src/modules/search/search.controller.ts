import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('users')
  searchUsers(
    @Query('q')
    q: string,
  ) {
    return this.searchService.searchUsers(q);
  }

  @Get('posts')
  searchPosts(
    @Query('q')
    q: string,
  ) {
    return this.searchService.searchPosts(q);
  }
}
