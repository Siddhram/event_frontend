import React, { useState } from "react";
import ForCharity from "../pagesnav/ForCharity";
import ForFriends from "../pagesnav/ForFriends";
import ForEducation from "../pagesnav/ForEducation";
import ForChildevent from "../pagesnav/ForChildevent";

const Sortpage = () => {
  const [activeTab, setActiveTab] = useState("education");

  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 bg-gray-50">
          <div className="flex items-center justify-center h-16 bg-black">
            <span className="text-white font-bold uppercase">Sidebar</span>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-2 py-4 bg-gray-200">
              {/* Dashboard Link */}
              <button
                onClick={() => setActiveTab("education")}
                className={`flex items-center rounded-lg px-4 py-2 text-black hover:bg-gray-500 ${
                  activeTab === "education" ? "bg-gray-500" : ""
                }`}
              >
               
                Education
              </button>

              {/* Messages Link */}
              <button
                onClick={() => setActiveTab("children")}
                className={`flex items-center px-4 py-2 mt-2 rounded-lg text-black hover:bg-gray-500 ${
                  activeTab === "children" ? "bg-gray-500" : ""
                }`}
              >
                
                Children
              </button>
               <button
                onClick={() => setActiveTab("friends")}
                className={`flex items-center px-4 py-2 rounded-lg mt-2 text-black hover:bg-gray-500 ${
                  activeTab === "friends" ? "bg-gray-500" : ""
                }`}
              >
                
                Friends
              </button> <button
                onClick={() => setActiveTab("charity")}
                className={`flex items-center px-4 py-2 rounded-lg mt-2 text-black hover:bg-gray-500 ${
                  activeTab === "charity" ? "bg-gray-500" : ""
                }`}
              >
                
                Charity
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          

          {/* Dynamic Content */}
          <div className="">
            {activeTab === "children" && (
              <div>
             
                <ForChildevent></ForChildevent>
              </div>
            )}
            {activeTab === "education" && (
              <div>
                
                <ForEducation></ForEducation>
              </div>
            )}
            {activeTab === "friends" && (
              <div>
                
                <ForFriends></ForFriends>
              </div>
            )}{activeTab === "charity" && (
              <div>
                
                <ForCharity></ForCharity>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sortpage;
