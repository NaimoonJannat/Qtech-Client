const companies = [
  { name: "Vodafone", logo: null },
  { name: "Intel", logo: null },
  { name: "TESLA", logo: null },
  { name: "AMD", logo: null },
  { name: "Talkit", logo: null },
];

const Companies = () => {
  return (
    <section className="px-6 md:px-16 py-10 bg-white border-t border-b border-gray-100">
      <p className="text-sm text-gray-400 text-center mb-6">
        Companies we helped grow
      </p>
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-16">
        {companies.map((company) => (
          <span
            key={company.name}
            className="text-gray-400 font-bold text-lg md:text-xl tracking-wider hover:text-gray-600 transition-colors cursor-default"
          >
            {company.name}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Companies;
