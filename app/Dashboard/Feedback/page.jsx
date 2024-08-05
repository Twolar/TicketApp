import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { PageRoutesDashboard } from "@/app/(misc)/PageRoutes";
import PageTitle from "@/app/(components)/PageTitle";

// Function to fetch feedback records ordered by createdAt
const fetchFeedback = async () => {
  const feedback = await prisma.feedback.findMany({
    include: {
      user: true, // Include the user who provided the feedback
    },
    orderBy: {
      createdAt: "desc", // Order by createdAt field in descending order
    },
  });
  return feedback;
};

// Component to display feedback records
const Feedback = async () => {
  const feedback = await fetchFeedback();

  return (
    <>
      <div className="flex flex-col space-y-4">
        {/* Row for header and button */}
        <div className="flex justify-between items-center">
          <PageTitle
            headingLevel="h2"
            title="Feedback"
            subtitle="A list of feedback from users"
          />
          <div>
            <Link
              href={PageRoutesDashboard.FeedbackCreate}
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
                <th>Suggestion</th>
                <th>User</th>
                <th>Created At</th>
                <th>IsRead</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((item) => (
                <tr key={item.id}>
                  <td>{item.suggestion}</td>
                  <td>{item.user?.name || "Unknown User"}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>{item.isRead ? "✅" : "🗞"}</td>
                  <td className="text-right">
                    <Link
                      href={`${PageRoutesDashboard.Feedback}/Edit/${item.id}`}
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
    </>
  );
};

export default Feedback;
