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
<<<<<<< dad5ccdde3eac28a206931f4d565427791d1d1a5
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
        <Link to="/notifications" className="btn btn-outline btn-sm">
          Friend Requests
        </Link>
      </div>

      {loadingFriends ? (
        <div className="flex justify-center py-12">
=======
    <div className="container mx-auto space-y-10 min-h-screen w-full bg-base-100">
    <div className="space-y-20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight p-4">Your Friends</h2>
        <Link to="/notifications" className="btn btn-outline btn-sm ">
          Friend Requests
        </Link>
      </div>
</div>
      {loadingFriends ? (
        <div className="flex justify-center py-12  mx-auto max-w-4xl space-y-8 ">
>>>>>>> Added comment for new feature
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : friends.length === 0 ? (
        <NoFriendsFound />
      ) : (
<<<<<<< dad5ccdde3eac28a206931f4d565427791d1d1a5
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
=======
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 m-10 ">
>>>>>>> Added comment for new feature
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendPage;
