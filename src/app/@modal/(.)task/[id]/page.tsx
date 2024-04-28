import { TaskModal } from "./task-modal";
import FullTaskPage from "~/components/task/full-task-page";

export default function TaskModalView({
  params: { id: taskId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(taskId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid Image ID");


  return (
    <TaskModal>
      <FullTaskPage id={idAsNumber} />
    </TaskModal>
  );
}
