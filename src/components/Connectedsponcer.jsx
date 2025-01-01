import React from 'react';

const ConnectedSponsor = () => {
  return (
    <div>
      <section className="py-6 bg-gray-50 sm:py-16 lg:py-12">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl sm:leading-tight">
              Trusted by Leading Companies and Teams Worldwide
            </h2>
            <p className="mt-4 text-gray-600">
              Collaborating with world-class companies to build the future of design and innovation.
            </p>
          </div>

          <div className="grid items-center max-w-4xl grid-cols-2 mx-auto mt-12 md:mt-20 md:grid-cols-4 gap-x-10 gap-y-16">
            {[
              "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-1.png",
              "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-2.png",
              "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-3.png",
              "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-4.png",
              "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-5.png",
              "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-6.png",
              "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-7.png",
              "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-8.png",
              "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-9.png",
              "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-10.png",
              "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-11.png",
              "https://cdn.rareblocks.xyz/collection/celebration/images/logos/3/logo-12.png",
            ].map((src, index) => (
              <div
                key={index}
                className={`$ {
                  index >= 4 ? "hidden md:block" : ""
                }`}
              >
                <img
                  className="object-contain w-full h-8 mx-auto"
                  src={src}
                  alt={`Sponsor logo ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center mt-10 space-x-3 md:hidden">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full block ${
                  index === 0 ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>

          <p className="mt-10 text-base text-center text-gray-500 md:mt-20">
            and 1,000+ more companies
          </p>
        </div>
      </section>
    </div>
  );
};

export default ConnectedSponsor;
