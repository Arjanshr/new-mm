import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import RelatedBlogs from "@/components/relatedblogs";
import { TBlog } from "@/schemas/blog.schema";
import {
  API_BASE_URL,
  SITE_NAME,
  SITE_URL,
  WEBSITE_BASE_URL,
} from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import { title } from "node:process";

interface BlogDetailsProps {
  blogDetails: TBlog;
  blog: TBlog[];
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ blogDetails, blog }) => {
  if (!blogDetails)
    return <div className="text-center text-lg mt-10">Blog not found!</div>;

  const shareUrl = `${SITE_URL}/blogs/${blogDetails.slug}`;

  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col justify-center items-center py-10 bg-background">
          <div className="large:w-content w-full medium:px-[2.5rem] large:px-0 px-[1.5rem] text-webblack medium:flex items-start  gap-10">
            <div className="pr-4 flex flex-col gap-4 border-primary medium:border-r-4 medium:w-[70%]">
              <h1 className="text-xl font-bold">{blogDetails.title}</h1>
              <div className="flex items-center text-gray-600">
                <i className="far fa-calendar-alt mr-2"></i>
                <span>Published on {blogDetails.date_readable}</span>
              </div>
              <div className=" rounded-lg flex gap-2 items-center">
                <h3 className="text-xl  flex items-center">
                  <i className="fas fa-share-alt mr-2 text-primary"></i>
                  Share
                </h3>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#3b5998] text-white p-0 rounded-full  flex items-center justify-center w-10 h-10"
                    aria-label="Share on Facebook"
                  >
                    <i className="fa-brands fa-facebook fa-xl"></i>
                  </Link>
                  <Link
                    href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
                      blogDetails.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1da1f2] text-white p-0 rounded-full  flex items-center justify-center w-10 h-10"
                    aria-label="Share on Twitter"
                  >
                    <i className="fa-brands fa-twitter fa-xl"></i>
                  </Link>
                  <Link
                    href={`https://t.me/share/url?url=${shareUrl}&text=${encodeURIComponent(
                      blogDetails.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0088cc] text-white p-0 rounded-full  flex items-center justify-center w-10 h-10"
                    aria-label="Share on Telegram"
                  >
                    <i className="fa-brands fa-telegram fa-xl"></i>
                  </Link>
                  <Link
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      blogDetails.title + " " + shareUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25d366] text-white p-0 rounded-full  flex items-center justify-center w-10 h-10"
                    aria-label="Share on WhatsApp"
                  >
                    <i className="fa-brands fa-whatsapp fa-xl"></i>
                  </Link>
                </div>
              </div>
              <div className="h-auto">
                <Image
                  className="w-full h-full object-contain rounded-lg mb-6"
                  src={blogDetails?.imageLink}
                  alt={blogDetails.title}
                  height={1000}
                  width={1000}
                />
              </div>
              <div
                className="text-base text-webblack"
                dangerouslySetInnerHTML={{ __html: blogDetails.content }}
              />
            </div>

            <div className="medium:w-[30%] max-medium:pt-8">
              <div className="text-xl bg-primary text-center py-2 text-white font-medium mb-4">
                Related Blogs
              </div>
              <RelatedBlogs
                blog={blog?.filter((value) => value.slug !== blogDetails.slug)}
                // blog={blog}
              />
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default BlogDetails;

// Fetching blog details on server-side
export async function getServerSideProps(context: any) {
  try {
    const { slug } = context.query;
    const blogDetailsRes = await axios.get(`${API_BASE_URL}/blogs/${slug}`);
    const blogsRes = await axios.get(`${API_BASE_URL}/blogs`);

    return {
      props: {
        blogDetails: blogDetailsRes.data.data || null,
        blog: blogsRes.data.data || [],
        title: `${blogDetailsRes.data.data?.title} | ${SITE_NAME}`,
        url: `${SITE_URL}/blogs/${blogDetailsRes.data.data?.slug}`,
        image: `${WEBSITE_BASE_URL}/${blogDetailsRes.data.data?.imageLink}`,
      },
    };
  } catch (error) {
    return {
      props: {
        blogDetails: null,
        blog: [],
        title: `Blogs | ${SITE_NAME}`,
        url: `${SITE_URL}/blogs`,
      },
    };
  }
}
