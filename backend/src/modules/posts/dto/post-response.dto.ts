export class PostResponseDto {
  id!: string;
  content!: string;
  createdAt!: Date;
  
  author!: {
    id: string;
    username: string;
    avatarUrl: string | null;
  };

  stats!: {
    likes: number;
    replies: number;
  };

  replyToId!: string | null;
}