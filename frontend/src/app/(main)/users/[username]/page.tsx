'use client';


import { useParams } from 'next/navigation';
import { useUserProfile } from '@/features/users/use-user';
import { FollowButton } from '@/features/users/FollowButton';
import { UserTimeline } from '@/features/users/UserTimeline';

export default function UserProfilePage() {
    const params = useParams();
    const username = params.username as string;
    const { data: user, isLoading } = useUserProfile(username);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div> User not found </div>;
    }

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">
                @{user.username}
            </h1>

            <p>
                {user.bio}
            </p>

            <div className="flex gap-4">
                <span>
                    Followers {user.followers}
                </span>
                <span>
                    Following {user.following}
                </span>
            </div>

            <FollowButton user={user} />
            <UserTimeline username={username} />
        </main>
    );
}