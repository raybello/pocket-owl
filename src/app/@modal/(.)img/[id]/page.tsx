import { getImage } from "~/server/queries";

export default async function ImageModal({
  params: { id: imageId },
}: {
  params: { id: string };
  }) {
  
  const idAsNumber = Number(imageId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid Image ID");

  const image = await getImage(idAsNumber);

  return (
    <div>
      <img src={image.url} className="w-96" />
    </div>
  );
}
