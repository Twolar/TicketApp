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
          title="Blogs"
          subtitle="A list of current Blogs"
          titleSize="4xl"
          subtitleSize="lg"
        />
        <div>
          <Link
            href={PageRoutesDashboard.BlogsCreate}
            className="btn btn-primary"
          >
            create
          </Link>
        </div>
      </div>

      {/* Row for the table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border-2 border-gray-700">
          {/* Table head */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Tags</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <th>{blog.id}</th>
                <td>{blog.title}</td>
                <td>{blog.description}</td>
                <td>
                  {blog.blogTags.map((blogTag, index) => (
                    <div key={index} className="badge badge-neutral m-1">
                      {blogTag.tag.title}
                    </div>
                  ))}
                </td>
                <td>{blog.user.name}</td>
                <td>
                  <Link
                    href={`${PageRoutesDashboard.Blogs}/${blog.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    manage
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
