import { SignedIn, SignedOut } from "@clerk/nextjs";
import { UploadImageButton } from "../../../_components/upload-image-button";

export const dynamic = "force-dynamic";

// async function TaskBoardView() {
//   const tasks = await getMyTasks();
//   const images = await getMyImages();

//   function TaskCard({ task }: { task: { id: number; name: string } }) {
//     return (
//       <div className="flex rounded-md bg-slate-700 p-2">
//         <h1>{task.name}</h1>
//         <h2>{task.id}</h2>
//       </div>
//     );
//   }

//   function ColumnContainer({ title }: { title: string }) {
//     return (
//       <div className="flex flex-col space-y-4">
//         <h1 className="text-xl font-bold">{title}</h1>
//         {tasks.map((task) => (
//           <TaskCard key={task.id} task={task} />
//         ))}
//       </div>
//     );
//   }
//   return (
//     <>
//       <BoardContainer />
//     </>
//   );
// }

{
  /* <ColumnContainer title="Not Started" />
<ColumnContainer title="Completed" /> */
}


export default async function TasksPage() {
  return (
    <>
      <SignedOut>
        <div className="h-full w-full p-4 text-center text-2xl">
          Please sign in to view
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-x-2 pb-2 pt-2">
            <div className="flex-1 rounded-xl bg-primary pl-2 hover:bg-secondary">
              <h1>Search</h1>
            </div>
            <div className="flex-2 rounded-full bg-primary hover:bg-secondary">
              <UploadImageButton />
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  );
}
