

import FullTaskPage from "~/components/task/full-task-page";

export default function TaskPage({
  params: { id: taskId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(taskId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid Image ID");

  return (
    <FullTaskPage id={idAsNumber} />
  );
}
