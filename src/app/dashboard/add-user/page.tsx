"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser, User } from "../../lib/Api";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AddUserForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  const mutation = useMutation({
    mutationFn: (newUser: User) => addUser(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setFormData({ name: "", email: "", role: "", status: "" });
      router.push("/dashboard/users");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-lg mx-auto p-6"
    >
      <h2 className="text-2xl font-semibold mb-6 text-white text-center">
        Add New User
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-[#0B1535] border border-[#1B2B4D]/40 shadow-md 
                   rounded-2xl p-6 space-y-5 text-white"
      >
        {/* Name */}
        <div>
          <label className="block font-semibold mb-2 text-gray-300">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
            className="w-full bg-[#0F1C3F] border border-[#1B2B4D]/40 px-3 py-3 
                       rounded-md focus:outline-none focus:border-[#0C6DC6] 
                       transition duration-300"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-2 text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
            className="w-full bg-[#0F1C3F] border border-[#1B2B4D]/40 px-3 py-3 
                       rounded-md focus:outline-none focus:border-[#0C6DC6] 
                       transition duration-300"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block font-semibold mb-2 text-gray-300">Role</label>
          <input
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Enter role"
            required
            className="w-full bg-[#0F1C3F] border border-[#1B2B4D]/40 px-3 py-3 
                       rounded-md focus:outline-none focus:border-[#0C6DC6] 
                       transition duration-300"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-semibold mb-2 text-gray-300">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full bg-[#0F1C3F] border border-[#1B2B4D]/40 px-3 py-3 
                       rounded-md focus:outline-none focus:border-[#0C6DC6] 
                       transition duration-300"
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full px-4 py-3 rounded-md text-white font-medium
              bg-[linear-gradient(to_right,rgba(9,24,62,1)_0%,rgba(12,109,198,1)_100%)]
              hover:opacity-90 hover:shadow-[0_0_12px_rgba(12,109,198,0.4)]
              transition duration-300 disabled:opacity-70"
          >
            {mutation.isPending ? "Adding..." : "Add User"}
          </button>

          {mutation.isError && (
            <p className="text-red-400 text-sm mt-3 text-center">
              Error adding user. Please try again.
            </p>
          )}
        </div>
      </form>
    </motion.div>
  );
}
