import Image from "next/image";
import Link from "next/link";
import { TBlog } from "@/schemas/blog.schema";

interface BlogCardProps {
  data: TBlog;
}

const BlogCard: React.FC<BlogCardProps> = ({ data }) => {
  const { title, slug, content, imageLink, date_readable } = data;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-lg">
      <div className="relative w-full h-56">
        <Image
          src={imageLink}
          alt={title}
          layout="fill"
          objectFit="contain"
          className="rounded-t-2xl"
          priority
        />
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-500">{date_readable}</p>
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-3 mt-1">
          {title}
        </h2>

        <div className="mt-4">
          <Link href={`/blogs/${slug}`} passHref>
            <span className="text-primary font-medium hover:underline">
              Read More →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
