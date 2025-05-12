interface FeaturedContentProps {
  title?: string;
  alignment: "left" | "right";
  backgroundColor: string;
  heading: string;
  content: string[];
  imageSrc: string;
  imageAlt: string;
  imageCaption?: string;
}

export default function FeaturedContent({
  title,
  alignment,
  backgroundColor,
  heading,
  content,
  imageSrc,
  imageAlt,
  imageCaption,
}: FeaturedContentProps) {
  return (
    <article className="py-12">
      {title && (
        <div className="container mx-auto mb-8 px-4">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            {title}
          </h2>
        </div>
      )}

      <div className={`${backgroundColor} py-12`}>
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Content */}
            <div className={alignment === "left" ? "md:order-2" : "md:order-1"}>
              <div className="p-6">
                <h2 className="mb-4 text-2xl font-bold">{heading}</h2>
                <ul className="space-y-2">
                  {content.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1 text-blue-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Image */}
            <div className={alignment === "left" ? "md:order-1" : "md:order-2"}>
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={imageSrc || "/placeholder.svg"}
                  alt={imageAlt}
                  className="h-auto w-full"
                />
                {imageCaption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-sm text-white">
                    {imageCaption}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
