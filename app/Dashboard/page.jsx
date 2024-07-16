import React from "react";

const Dashboard = () => {
  return (
    <>
      <div role="tablist" className="tabs tabs-bordered">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Tab 1"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-gray-700 rounded-box rounded-tl-none p-6"
        >
          Tab content 1
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Tab 2"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-gray-700 rounded-box rounded-tl-none p-6"
        >
          Tab content 2
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Tab 3"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-gray-700 rounded-box rounded-tl-none p-6"
        >
          Tab content 3
        </div>
      </div>
    </>
  );
};

export default Dashboard;
