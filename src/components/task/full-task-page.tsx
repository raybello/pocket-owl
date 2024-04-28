import { getTask } from "~/server/queries";

export default async function FullTaskPage(props: { id: number }) {
  const idAsNumber = Number(props.id);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid Image ID");

  const task = await getTask(idAsNumber);

  return (
      <div className="rounded-lg bg-green-500 p-4 text-black">
        <h2 className="mb-4 text-lg font-bold">{task.name}</h2>
        <div className="mb-2">
          <span className="font-semibold">Task ID:</span> {task.id}
        </div>
        <div className="mb-2">
          <span className="font-semibold">User ID:</span> {task.userId}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Task Status:</span> {task.taskStatus}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Tags:</span>{" "}
          {/* {task.tags ? task.tags.join(", ") : "None"} */}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Start Date:</span>{" "}
          {task.startDate.toDateString()}
        </div>
        <div className="mb-2">
          <span className="font-semibold">End Date:</span>{" "}
          {task.endDate.toDateString()}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Created At:</span>{" "}
          {task.createdAt.toDateString()}
        </div>
        <img src={task.taskImageUrl} className="w-96" />
      </div>
  );
}
