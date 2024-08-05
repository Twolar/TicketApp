import prisma from "@/lib/prisma";
import Link from "next/link";
import { PageRoutesDashboard } from "@/app/(misc)/PageRoutes";
import PageTitle from "@/app/(components)/PageTitle";

const BlogsPage = async () => {
  const blogs = await prisma.blog.findMany({
    include: {
      user: true,
      blogTags: {
        include: {
          tag: true, // Include the actual tag information
        },
      },
    },
  });

  return (
    <div className="flex flex-col space-y-4">
      {/* Row for header and button */}
      <div className="flex justify-between items-center">
        <PageTitle
          headingLevel="h2"
          title="My Blogs"
          subtitle="Manage your blogs"
        />
        <div>
          <Link
            href={PageRoutesDashboard.BlogsCreate}
            className="btn btn-primary btn-sm"
          >
            new
          </Link>
        </div>
      </div>

      {/* Row for the table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border-2 border-gray-700">
          {/* Table head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Tags</th>
              <th>Author</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.title}</td>
                <td>
                  {blog.blogTags.map((blogTag, index) => (
                    <div key={index} className="badge badge-neutral m-1">
                      {blogTag.tag.title}
                    </div>
                  ))}
                </td>
                <td>{blog.user.name}</td>
                <td className="text-right">
                  <Link
                    href={`${PageRoutesDashboard.Blogs}/${blog.id}`}
                    className="btn btn-primary btn-xs"
                  >
                    edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogsPage;
