import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

async function Tasks() {
  const tasks = await db.query.tasks.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  return (
    <div className="flex flex-wrap space-x-4">
      {[...tasks, ...tasks].map((task, index) => (
        <div key={task.id + "-" + index} className="mb-4 rounded border p-4 ">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-bold"> {task.name} </h2>
            <button className="text-sm text-red-500 hover:text-red-700">
              <p> Delete </p>
            </button>
          </div>

          <div className="mb-4">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between space-x-2 text-gray-600">
                <p>Subitem1</p>
                <button className="text-red-500 hover:text-red-700">
                  <p> X </p>
                </button>
              </div>
              <div className="flex justify-between space-x-2 text-gray-600">
                <p>Subitem2</p>
                <button className="text-red-500 hover:text-red-700">
                  <p> X </p>
                </button>
              </div>
              <div className="flex justify-between space-x-2 text-gray-600">
                <p>Subitem3</p>
                <button className="text-red-500 hover:text-red-700">
                  <p> X </p>
                </button>
              </div>
              <button className="rounded bg-blue-500 px-2 text-white hover:bg-blue-700 ">
                + Add Subitem
              </button>
            </div>
            <hr className="my-2"></hr>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between space-x-2 text-gray-600">
                <p>Link 1</p>
                <button className="text-red-500 hover:text-red-700">
                  <p> X </p>
                </button>
              </div>
              <button className="rounded bg-blue-500 px-2 text-white hover:bg-blue-700 ">
                + Add Link
              </button>
            </div>
          </div>
          {task.taskImageUrl ? (
            <Image
              src={task.taskImageUrl}
              alt={`Item ${task.id}`}
              className="mb-4 w-full rounded-lg"
              width={50}
              height={50}
            />
          ) : null}
          <div className="flex flex-col py-2">
            <div className="text-gray-500">
              Start date: {task.startDate.toDateString()}
            </div>
            <div className="text-gray-500">
              End date: {task.endDate.toDateString()}
            </div>
          </div>
          <div className="flex flex-col space-y-2 py-2">
            <div className="text-gray-500">Status: {task.taskStatus}</div>
            <div className="text-gray-500">Tags: {task.tags}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full p-4 text-center text-2xl">
          Please sign in to view
        </div>
      </SignedOut>
      <SignedIn>
        <Tasks />
      </SignedIn>
    </main>
  );
}