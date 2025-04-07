import React, { useState, useMemo, useEffect } from "react";
import BlogCard from "@/components/blog-card";
import { TBlog } from "@/schemas/blog.schema";
import UIInput from "@/components/ui/uiinput";
import UISelect, { UISelectOptionEvent } from "@/components/ui/uiselect";

interface BlogProps {
  blogList: TBlog[];
}

const BlogListSection: React.FC<BlogProps> = ({ blogList }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setLoading(false);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSortChange = (event: UISelectOptionEvent) => {
    setSortOrder(event.target.value);
  };

  const filteredBlogs = useMemo(() => {
    let filtered = blogList.filter((blog) =>
      blog.title.toLowerCase().includes(debouncedSearch)
    );

    if (sortOrder === "latest") {
      return filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sortOrder === "oldest") {
      return filtered.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }

    return filtered;
  }, [blogList, debouncedSearch, sortOrder]);

  return (
    <div className="flex flex-col justify-center items-center py-10 bg-background">
      <div className="large:w-content w-full medium:px-[2.5rem] large:px-0 px-[1.5rem] text-webblack flex flex-col gap-10">
        <div className="small:flex max-small:space-y-2  justify-between medium:gap-96 gap-8 bg-white p-4 shadow-xl rounded-lg">
          <UIInput
            placeholder="Search here..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <UISelect
            placeholder="Sort by time"
            options={[
              { value: "latest", displayValue: "Latest" },
              { value: "oldest", displayValue: "Oldest" },
            ]}
            defaultValue={sortOrder}
            onChange={handleSortChange}
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center h-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {!loading && (
          <div className="grid large:grid-cols-4 medium:grid-cols-3 min-[500px]:grid-cols-2 grid-cols-1 gap-6">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog, i) => <BlogCard key={i} data={blog} />)
            ) : (
              <p className="text-gray-500 text-center col-span-full">
                No blogs found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListSection;
