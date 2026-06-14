'use client';

import type { UserProfile } from './types';
import { useFollowUser, useUnfollowUser } from './use-user';

export function FollowButton({
    user,
}: {
    user: UserProfile;
}) {
    const follow = useFollowUser();
    const unfollow = useUnfollowUser();

    if (user.isFollowing) {
        return (
            <button onClick={() => unfollow.mutate(user.id)}>
                Following
            </button>
        );
    }

    return (
        <button onClick={() => follow.mutate(user.id)}>
            Follow
        </button>
    );
}