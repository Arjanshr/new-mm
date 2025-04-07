import BlogCard from "@/components/blog-card";
import Footer from "@/components/footer";
import Landing from "@/components/landing";
import Navbar from "@/components/navbar";
import { LANDING } from "@/constants/images";
import { API_BASE_URL, SITE_NAME, SITE_URL } from "@/lib/config";
import { TBlog } from "@/schemas/blog.schema";
import axios from "axios";
import React from "react";
import BlogListSection from "./list";

interface BlogsProps {
  blog: TBlog[];
}

const Blogs: React.FC<BlogsProps> = ({ blog }) => {
  return (
    <>
      <Navbar />
      <main>
        <Landing title="Blogs" image={LANDING} />
        <BlogListSection blogList={blog} />

        <Footer />
      </main>
    </>
  );
};

export default Blogs;

export async function getServerSideProps() {
  try {
    const blogs = await axios.get(`${API_BASE_URL}/blogs`);
    return {
      props: {
        blog: blogs?.data?.data || [],
        title: `Blogs | ${SITE_NAME}`,
        url: `${SITE_URL}/blogs`,
      },
    };
  } catch (error) {
    return {
      props: {
        blog: [],
        title: `Blogs | ${SITE_NAME}`,
        url: `${SITE_URL}/blogs`,
      },
    };
  }
}
