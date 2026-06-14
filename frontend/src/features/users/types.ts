export interface UserProfile {
  id: string;
  username: string;
  bio: string | null;
  avatarUrl: string | null;
  followers: number;
  following: number;
  isFollowing: boolean;
}