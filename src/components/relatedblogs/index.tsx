import { TBlog } from "@/schemas/blog.schema";
import BlogCard from "../blog-card";

interface RelatedBlogsProps {
  blog: TBlog[];
}

const RelatedBlogs: React.FC<RelatedBlogsProps> = ({ blog }) => {
  if (!blog || blog.length === 0) {
    return <div className="text-webblack italic">No Related blogs found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {blog.map((value, i) => (
        <BlogCard data={value} key={i} />
      ))}
    </div>
  );
};

export default RelatedBlogs;
