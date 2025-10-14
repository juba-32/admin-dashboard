"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, deleteUser, User } from "../../lib/Api";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Users() {
  const queryClient = useQueryClient();

  // Fetch users
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Delete user mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="text-center py-10">Checking authentication...</div>;
  }

  if (isLoading) return <p className="p-4 text-gray-400">Loading users...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load users.</p>;

  return (
    <div className="p-6 text-white">
      {/* Header */}
      <p>Welcome, {session?.user?.name || "user"}!</p>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Users List</h2>
        <Link
          href="/dashboard/add-user"
          className="px-5 py-2.5 rounded-md text-white font-medium
          bg-[linear-gradient(to_right,rgba(9,24,62,1)_0%,rgba(12,109,198,1)_100%)]
          hover:opacity-90 shadow-md transition duration-300"
        >
          + Add User
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-[#1B2B4D]/40 shadow-lg bg-[#0B1535]">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-[linear-gradient(to_right,rgba(9,24,62,1)_0%,rgba(12,109,198,1)_100%)] text-white uppercase">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="border-t border-[#1B2B4D]/40 hover:bg-[#121C3D] transition"
              >
                <td className="px-4 py-4">{user.id}</td>
                <td className="px-4 py-4">{user.name}</td>
                <td className="px-4 py-4">{user.email}</td>
                <td className="px-4 py-4">{user.role}</td>
                <td className="px-4 py-4">{user.status}</td>
                <td className="px-4 py-4 text-center">
                  <button
                    onClick={() => deleteMutation.mutate(user.id!)}
                    className="px-4 py-2 text-sm rounded-md text-white font-medium
                      bg-[linear-gradient(to_right,rgba(198,12,12,1)_0%,rgba(255,40,80,1)_100%)]
                      hover:shadow-[0_0_10px_rgba(255,40,80,0.5)]
                      transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="block md:hidden mt-6 space-y-4">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="p-5 rounded-xl bg-[#0B1535] border border-[#1B2B4D]/40
                       shadow-md hover:shadow-[0_0_15px_rgba(12,109,198,0.4)]
                       transition-all duration-300"
          >
            <p className="text-sm">
              <span className="font-semibold text-gray-300">ID:</span> {user.id}
            </p>
            <p>
              <span className="font-semibold text-gray-300">Name:</span>{" "}
              {user.name}
            </p>
            <p>
              <span className="font-semibold text-gray-300">Email:</span>{" "}
              {user.email}
            </p>
            <p>
              <span className="font-semibold text-gray-300">Role:</span>{" "}
              {user.role}
            </p>
            <p>
              <span className="font-semibold text-gray-300">Status:</span>{" "}
              {user.status}
            </p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => deleteMutation.mutate(user.id!)}
                className="px-4 py-2 text-sm rounded-md text-white font-medium
                  bg-[linear-gradient(to_right,rgba(198,12,12,1)_0%,rgba(255,40,80,1)_100%)]
                  hover:shadow-[0_0_10px_rgba(255,40,80,0.5)]
                  transition duration-300"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
