import vodafone from "../../assets/vodafone.png";
import intel from "../../assets/intel.png";
import tesla from "../../assets/tesla.png";
import amd from "../../assets/amd.png";
import talkit from "../../assets/talkit.png";

// Map your logo assets here — update paths to match wherever you saved the logo images
const companies = [
  { name: "Vodafone", logo: vodafone },
  { name: "Intel",    logo: intel    },
  { name: "TESLA",    logo: tesla    },
  { name: "AMD",      logo: amd      },
  { name: "Talkit",   logo: talkit   },
];

const Companies = () => {
  return (
    <section className="bg-white px-6 md:px-16 py-10">
      <p className="text-sm text-gray-400 mb-8">Companies we helped grow</p>

      <div className="max-w-5xl flex flex-wrap items-center gap-12 md:gap-20">
        {companies.map((company) => (
          <img
            key={company.name}
            src={company.logo}
            alt={company.name}
            className="h-7 object-contain opacity-50 hover:opacity-80 transition-opacity grayscale"
          />
        ))}
      </div>
    </section>
  );
};

export default Companies;
