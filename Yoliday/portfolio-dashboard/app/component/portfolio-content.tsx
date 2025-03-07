import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PortfolioCard } from "@/app/component/portfolio-card";

const portfolioItems = [
  {
    id: 1,
    title: "Kemampuan Merangkum Tulisan",
    description:
      "Lorem Ipsum Dolor Sit Amet Consectetur. Nulla Risus Malesuada Ac Turpis Tempus.Lorem Ipsum Dolor Sit Amet Consectetur...",
    subject: "BAHASA SUNDA",
    author: "Oleh Al-Baiq Samsain",
    image: "/image.png",
  },
  {
    id: 2,
    title: "Menyusun Karya Ilmiah",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas...",
    subject: "BAHASA INDONESIA",
    author: "Oleh Rahmat Fadilah",
    image: "/image.png",
  },
  {
    id: 3,
    title: "Teknik Menulis Berita",
    description:
      "Suspendisse potenti. Ut interdum libero ut est dapibus, ut venenatis est tincidunt...",
    subject: "JURNALISTIK",
    author: "Oleh Annisa Putri",
    image: "/image.png",
  },
  {
    id: 4,
    title: "Pemrograman Berbasis Objek",
    description:
      "Phasellus vel augue aliquet, condimentum eros non, fermentum ligula...",
    subject: "INFORMATIKA",
    author: "Oleh Arif Setiawan",
    image: "/image.png",
  },
];

export function PortfolioContent() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-0">
      <h1 className="text-2xl font-bold mb-6">Portfolio</h1>

      {/* Navigation Tabs */}
      <div className="border-b mb-6">
        <nav className="flex gap-8 overflow-x-auto">
          <button className="text-[#E84A27] font-medium pb-2 border-b-2 border-[#E84A27]">
            Project
          </button>
          <button className="text-gray-500 pb-2">Saved</button>
          <button className="text-gray-500 pb-2">Shared</button>
          <button className="text-gray-500 pb-2">Achievement</button>
        </nav>
      </div>

      {/* Filter & Search Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 w-full md:w-auto">
          <FunnelIcon className="w-4 h-4" />
          Filter
        </button>
        <div className="relative w-full md:w-80">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search a project"
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {/* Portfolio Cards */}
      <div className="grid gap-4">
        {portfolioItems.map((item) => (
          <PortfolioCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
