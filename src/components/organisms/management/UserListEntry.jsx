import Avatar from "../../atoms/Avatar";
import Link from "../../atoms/Link";

export default function UserListEntry({ user }) {
  return (
    <div className="w-full rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-4 flex items-center space-x-4">
      <div className="bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-white p-1 rounded-lg">
        <div className="h-12 aspect-square">
          <Avatar value={user.email} />
        </div>
      </div>
      <div className="flex flex-col space-y-2 overflow-hidden">
        <div className="truncate overflow-hidden">
          <Link
            className="text-md font-semibold !text-gray-800 dark:!text-white"
            to={`/users/${user.id}`}
          >
            {user.email}
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-ellipsis">
            {user.id}
          </p>
        </div>
      </div>
    </div>
  );
}

export function UserSkeletonListEntry({ error }) {
  return (
    <div className={`w-full ${!error && "animate-pulse"}`}>
      <div className="w-full rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white p-4 flex items-center space-x-4">
        <div
          className={`h-12 aspect-square rounded-lg ${
            error
              ? "bg-red-200 dark:bg-red-400"
              : "bg-gray-200 dark:bg-gray-800"
          }`}
        />
        <div className="space-y-2 w-full">
          <div
            className={`w-2/3 h-4 rounded-lg ${
              error
                ? "bg-red-200 dark:bg-red-400"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          />
          <div
            className={`w-1/3 h-3 rounded-lg ${
              error
                ? "bg-red-200 dark:bg-red-400"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
