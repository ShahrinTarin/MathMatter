import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import Loader from '../Component/Loader';
import EmptyPage from './EmptyPage';
import useAxiosSecure from '../hooks/useAxiosSecure';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { motion } from 'framer-motion';

const Wishlist = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [loadingWishlist, setLoadingWishlist] = useState(true);
  const [wishlists, setWishlists] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [deletingItemId, setDeletingItemId] = useState(null);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        Swal.fire({
          title: 'Please Login first',
          icon: 'warning',
          timer: 1500,
        });
        setLoadingWishlist(false);
        return;
      }

      setLoadingWishlist(true);
      axiosSecure(`/wishlist/${user?.email}`)
        .then((data) => {
          setWishlists(data?.data);
          setLoadingWishlist(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingWishlist(false);
        });
    }
  }, [user, loading, axiosSecure]);

  const handleDelete = useCallback((_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setDeletingItemId(_id);
        axiosSecure
          .delete(`/wishlist/${_id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setWishlists((prev) => prev.filter((item) => item._id !== _id));
              Swal.fire(
                'Deleted!',
                'Blog removed from wishlist.',
                'success'
              );
            }
          })
          .catch((err) => {
            console.error('Delete failed:', err.response?.data || err.message);
            Swal.fire('Error', 'Failed to delete item.', 'error');
          })
          .finally(() => setDeletingItemId(null));
      }
    });
  }, [axiosSecure]);

  const filteredWishlists = useMemo(() => {
    if (!searchTitle) return wishlists;
    return wishlists.filter((item) =>
      item.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
  }, [wishlists, searchTitle]);

  const columns = useMemo(
    () => [
      {
        header: 'Image',
        accessorKey: 'image',
        cell: ({ row }) => (
          <div className="w-32 h-20 rounded overflow-hidden">
            <img
              src={row.original.image}
              alt=""
              className="w-full h-full object-cover rounded"
            />
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
        header: 'Actions',
        cell: ({ row }) => (
          <button
            onClick={() => handleDelete(row.original._id)}
            disabled={deletingItemId === row.original._id}
            className="px-3 py-1 rounded bg-[#1b9c8540] text-gray-700 hover:bg-[#1b9c85] hover:text-white transition"
          >
            {deletingItemId === row.original._id ? 'Deleting...' : 'Delete'}
          </button>
        ),
      },
    ],
    [handleDelete, deletingItemId]
  );

  const table = useReactTable({
    data: filteredWishlists,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loadingWishlist || loading) return <Loader />;

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

      {/* Heading */}
      <div className="pt-12 lg:w-9/12 w-11/12 mx-auto">
        <h1 className="text-3xl lg:text-5xl font-semibold text-gray-700">
          Your <span className="text-[#1b9c85]">Wishlist</span>
        </h1>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto mt-10 lg:w-9/12 w-11/12 mx-auto">
        {filteredWishlists.length === 0 ? (
          <EmptyPage />
        ) : (
          <table className="min-w-full border border-gray-200 text-left">
            <thead className="bg-[#EDF6EE] text-gray-700">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-3 px-4"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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
        )}
      </div>
    </div>
  );
};

export default Wishlist;
