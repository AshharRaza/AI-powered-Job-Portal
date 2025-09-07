import React from "react";

const companies = [
  {
    id: 1,
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    description: "Innovating the future with cutting-edge AI and cloud solutions.",
    jobs: 45,
  },
  {
    id: 2,
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    description: "Empowering every person and every organization on the planet.",
    jobs: 32,
  },
  {
    id: 3,
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    description: "Driving global innovation in e-commerce and cloud technology.",
    jobs: 28,
  },
];

export const Companies = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Top Companies</h1>
        <p className="text-gray-600 mt-3">
          Explore leading companies hiring right now.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {companies.map((company) => (
          <div
            key={company.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6"
          >
            <img src={company.logo} alt={company.name} className="h-16 mb-6" />
            <h3 className="text-xl font-semibold text-gray-800">
              {company.name}
            </h3>
            <p className="text-gray-600 text-sm mt-2">{company.description}</p>
            <div className="flex justify-between items-center mt-6">
              <span className="text-blue-600 font-medium">
                {company.jobs} Jobs
              </span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                View Jobs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
