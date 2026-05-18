export class UserProfileDto {
  id!: string;
  username!: string;
  bio!: string | null;
  avatarUrl!: string | null;
  followerCount!: number;
  followingCount!: number;
  isFollowing!: boolean;
}