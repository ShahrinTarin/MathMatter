import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Loader from '../Component/Loader';
import axios from 'axios';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { NavLink } from 'react-router'; // ✅ Correct import!
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const AllBlogs = () => {
  const { loading, user } = useContext(AuthContext);

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // ✅ Unified fetch: sort & filter
  useEffect(() => {
    axios
      .get(`https://assignment-11-server-two-drab.vercel.app/blogs`, {
        params: {
          category: search,
          title: searchTitle,
          sortBy,
          sortOrder,
        },
      })
      .then((res) => {
        setBlogs(Array.isArray(res.data) ? res.data : []); // Defensive check
      })
      .catch((err) => console.error(err));
  }, [search, searchTitle, sortBy, sortOrder]);

  // ✅ Sorting handler
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // ✅ Wishlist handler wrapped in useCallback
  const handleWishlist = useCallback(
    async (blog) => {
      if (!user) {
        Swal.fire({
          title: 'Please login first',
          icon: 'warning',
          timer: 1500,
        });
        return;
      }

      const wishlist = {
        blogId: blog._id,
        userEmail: user.email,
      };

      try {
        const res = await axios.post(
          `https://assignment-11-server-two-drab.vercel.app/wishlist/${blog._id}`,
          wishlist
        );

        if (res.data.insertedId) {
          Swal.fire({
            title: 'Added to Wishlist!',
            icon: 'success',
            timer: 1500,
          });
        }
      } catch (err) {
        if (err.response && err.response.status === 409) {
          Swal.fire({
            title: 'Already in your wishlist!',
            icon: 'info',
            timer: 1500,
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: err.message,
            icon: 'error',
          });
        }
      }
    },
    [user]
  );

  // ✅ Table columns
  const columns = useMemo(
    () => [
      {
        header: 'Image',
        accessorKey: 'image',
        cell: ({ row }) => (
          <div className="relative w-32 h-20 rounded overflow-hidden">
            <img
              src={row.original.image}
              alt=""
              className="w-full h-full object-cover rounded"
            />
            <span className="absolute top-1 left-1 bg-[#EDF6EE] px-2 py-0.5 text-xs rounded text-[#1b9c85]">
              {row.original.category}
            </span>
          </div>
        ),
      },
      {
        header: 'Title',
        accessorKey: 'title',
        cell: ({ row }) => (
          <span className="text-[#1b9c85] font-medium">
            {row.original.title}
          </span>
        ),
      },
      {
        header: 'Category',
        accessorKey: 'category',
      },
      {
        header: 'Description',
        accessorKey: 'short_description',
        cell: ({ row }) => (
          <p className="line-clamp-2 max-w-xs">
            {row.original.short_description}
          </p>
        ),
      },
      {
        header: 'Author',
        accessorKey: 'email',
      },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex flex-col gap-2">
            <NavLink
              to={`/blogdetails/${row.original._id}`}
              className="px-3 py-1 rounded bg-[#1b9c852a] text-gray-700 hover:bg-[#1b9c85] hover:text-white transition"
            >
              Details
            </NavLink>
            <button
              onClick={() => handleWishlist(row.original)}
              className="px-3 py-1 rounded bg-[#1b9c8540] text-gray-700 hover:bg-[#1b9c85] hover:text-white transition"
            >
              Add Wishlist
            </button>
          </div>
        ),
      },
    ],
    [handleWishlist]
  );

  const table = useReactTable({
    data: blogs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <Loader />;

  return (
    <div className="min-h-[calc(100vh-64px)] pb-16">
      {/* Search input */}
      <div className="lg:w-9/12 pt-12 w-11/12 px-10 mx-auto space-y-4">
        <label className="input w-full flex items-center gap-2">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearchTitle(e.target.value)}
            type="search"
            className="grow"
            placeholder="Search by Title"
          />
        </label>
      </div>

      {/* Filter & heading */}
      <div className="pt-12 md:flex justify-between lg:w-9/12 w-11/12 mx-auto space-y-4">
        <h1 className="text-3xl lg:text-5xl font-semibold text-gray-700">
          All <span className="text-[#1b9c85]">Blogs</span>
        </h1>
        <div>
          <select
            name="category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#EDF6EE] p-2.5 px-5 rounded input text-gray-800"
          >
            <option value="">All</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Astronomy">Astronomy</option>
            <option value="Statistics">Statistics</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto mt-10 lg:w-9/12 w-11/12 mx-auto">
        <table className="min-w-full border border-gray-200 text-left">
          <thead className="bg-[#EDF6EE] text-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-3 px-4 cursor-pointer select-none"
                    onClick={() => {
                      if (header.column.columnDef.accessorKey) {
                        handleSort(header.column.columnDef.accessorKey);
                      }
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.columnDef.accessorKey === sortBy && (
                      <span className="ml-2">
                        {sortOrder === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <motion.tr
                key={row.id}
                className="border-b hover:bg-[#f1f7f2]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.01 }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 px-4 align-top">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBlogs;
