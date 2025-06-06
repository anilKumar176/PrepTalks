import React from 'react';
import { Link } from 'react-router';
import { UserIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query'; // Assuming you're using React Query
import { getUserFriends } from '../lib/api'; // Replace with actual path
import FriendCard from '../components/FriendCard'; // Replace with actual path
import NoFriendsFound from '../components/NoFriendsFound'; // Replace with actual path

const FriendPage = () => {
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ['friends'],
    queryFn: getUserFriends,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
        <Link to="/notifications" className="btn btn-outline btn-sm">
          Friend Requests
        </Link>
      </div>

      {loadingFriends ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : friends.length === 0 ? (
        <NoFriendsFound />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendPage;
