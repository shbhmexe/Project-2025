import Image from "next/image";

interface PortfolioCardProps {
  title: string;
  description: string;
  subject: string;
  author: string;
  image: string;
}

export function PortfolioCard({ title, description, subject, author, image }: PortfolioCardProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 p-4 border rounded-lg bg-white shadow-md">
      {/* Image Section */}
      <div className="w-full md:w-48 h-32 relative rounded-lg overflow-hidden">
        <Image 
          src={image || "/placeholder.svg"} 
          alt={title} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        </div>

        {/* Subject + Author + Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-gray-800">{subject}</p>
            <p className="text-sm text-gray-500">{author}</p>
          </div>
          <button className="bg-[#F5A623] text-white px-4 py-2 rounded-lg w-full md:w-auto hover:bg-[#e6951c] transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
