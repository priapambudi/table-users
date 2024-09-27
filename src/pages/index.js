import { useEffect, useState } from "react";

export default function Home() {
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("normal");
  const limit = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`
      );
      const users = await response.json();
      setData(users);
      setLoading(false);

      setTotalPages(Math.ceil(10 / limit));
    };

    fetchData();
  }, [page]);

  const handleSort = () => {
    setSort((prevSort) => {
      if (prevSort === "asc") return "desc";
      if (prevSort === "desc") return "normal";
      return "asc";
    });
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const sortedData = [...datas].sort((a, b) => {
    if (sort === "asc") {
      return a.name.localeCompare(b.name);
    } else if (sort === "desc") {
      return b.name.localeCompare(a.name);
    } else {
      return 0;
    }
  });

  return (
    <div className="h-screen p-5 bg-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h1 className="mb-2 text-3xl">List Users</h1>
        <input
          type="text"
          placeholder="Search name or username"
          className="p-2 border border-gray-500 rounded-md w-fit md:min-w-[300px] focus:outline-none focus:ring-2"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full">
          <thead className="border-b-2 border-gray-200 bg-gray-50 ">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                ID
              </th>
              <th className="flex items-center justify-between p-3 text-sm font-semibold tracking-wide text-left">
                Name
                <svg
                  onClick={handleSort}
                  className="cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M8 16H4l6 6V2H8zm6-11v17h2V8h4l-6-6z"
                  />
                </svg>
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Username
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Email
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Website
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading &&
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td className="p-3 text-sm whitespace-nowrap">
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                  <td className="p-3 text-sm whitespace-nowrap">
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                  <td className="p-3 text-sm whitespace-nowrap">
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                  <td className="p-3 text-sm whitespace-nowrap">
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                  <td className="p-3 text-sm whitespace-nowrap">
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                </tr>
              ))}

            {!loading &&
              sortedData
                .filter((item) => {
                  if (search === "") {
                    return item;
                  } else {
                    return (
                      item.name.toLowerCase().includes(search.toLowerCase()) ||
                      item.username.toLowerCase().includes(search.toLowerCase())
                    );
                  }
                })
                .map((user) => (
                  <tr
                    key={user.id}
                    className={`${user.id % 2 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.id}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.name}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.username}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.website}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-5 mt-3">
        <button
          className="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg"
          onClick={handlePrev}
          disabled={page === 1}
        >
          Prev
        </button>
        <p>
          Page {page} of {totalPages}
        </p>
        <button
          className="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg"
          onClick={handleNext}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
