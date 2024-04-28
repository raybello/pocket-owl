import { clerkClient } from "@clerk/nextjs/server";
import { deleteTask, getTask } from "~/server/queries";
import { Button } from "../ui/button";

export default async function FullTaskPage(props: { id: number }) {
  const idAsNumber = Number(props.id);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid Image ID");

  const task = await getTask(idAsNumber);

  const uploaderInfo = await clerkClient.users.getUser(task.userId);


  return (
    <div className="bg-black-500 flex w-full min-w-0 flex-col p-4 text-white">
      <h2 className="mb-4 text-lg font-bold">{task.name}</h2>
      <div className="mb-2 ">
        <span className="font-semibold">Task ID:</span> {task.id}
      </div>
      <div className="mb-2 ">
        <span className="font-semibold">User ID:</span> {task.userId}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Subtasks:</span> {task.subTasks}
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
        <span className="">{new Date(task.startDate).toLocaleString()}</span>{" "}
      </div>
      <div className="mb-2">
        <span className="font-semibold">End Date:</span>{" "}
        <span className="">{new Date(task.endDate).toLocaleString()}</span> {}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Created On:</span>{" "}
        <span className="">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>{" "}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Created By:</span>{" "}
        <span className="">{uploaderInfo.fullName}</span>{" "}
        <span className="text-gray-400">({uploaderInfo.username})</span>{" "}
      </div>
      <img
        src={task.taskImageUrl ? task.taskImageUrl : ""}
        className="w-64 object-contain"
        alt={task.name}
      />
      <div className="p-2">
        <form
          action={async () => {
            "use server";
            await deleteTask(idAsNumber);
          }}
        >
          <Button type="submit" variant="destructive" >
            Delete Task
          </Button>
        </form>
      </div>
    </div>
  );
}
