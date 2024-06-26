import {
  CalendarDays,
  CircleCheck,
  CircleGauge,
  Hourglass,
  Paperclip,
} from "lucide-react";

import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";

import { Button } from "~/components/ui/button";
import { CardTaskChecklist } from "./_components/card-task-checklist";
import { CardTaskName } from "./_components/card-task-name";
import { eq } from "lodash";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

export default async function BoardIdPage({ params }: BoardIdPageProps) {
  const { userId } = auth();
  if (!userId) return null;

  const lists = await db.query.lists.findMany({
    where: (model, { eq }) => eq(model.boardId, Number(params.boardId)),
    orderBy: (model, { asc }) => [asc(model.order)],
    with: {
      cards: {
        orderBy: (card, { asc }) => [asc(card.order)],
      },
    },
  });

  console.log(lists)

  return (
    // MS Planner Card
    // <div className="mx-2 mt-3 flex w-[500px] flex-col space-y-2">
    //   <div className="flex flex-col rounded-md bg-background p-3">
    //     <div className="flex flex-row space-x-1.5 pb-2">
    //       <div className="flex">
    //         <Button className="h-5 bg-cyan-200 px-2 text-cyan-700 hover:bg-cyan-100">
    //           Development
    //         </Button>
    //       </div>
    //       <div className="flex">
    //         <Button className="h-5 bg-red-200 px-2 text-red-700 hover:bg-red-100">
    //           Feature
    //         </Button>
    //       </div>
    //     </div>
    //     <CardTaskName taskId={0} taskName="Add Decision Feedback Equalizer" />
    //     <div className="space-y-1 pb-3">
    //       <CardTaskChecklist taskId={1} taskName="Connect to uvm_env" />
    //       <CardTaskChecklist taskId={2} taskName="Add config for core config" />
    //       <CardTaskChecklist taskId={3} taskName="Implement core config" />
    //       <CardTaskChecklist
    //         taskId={4}
    //         taskName="Add RDFE test-case to regression"
    //       />
    //     </div>
    //     <div className=" flex flex-row items-center space-x-4 pb-2 text-xs text-slate-600">
    //       <div className="flex">
    //         <CircleGauge className="flex h-3 w-3 stroke-blue-600" />
    //       </div>
    //       <div className="flex flex-row items-center space-x-1.5">
    //         <Paperclip className="flex h-3 w-3 " />
    //         <span className="flex"> 2 </span>
    //       </div>
    //       <div className="flex flex-row items-center space-x-1.5">
    //         <CircleCheck className="flex h-3 w-3 stroke-slate-600" />
    //         <span className="flex"> 5 / 10 </span>
    //       </div>
    //     </div>
    //     <hr className="my-1" />
    //     <button className="flex w-16 items-center space-x-1.5 px-0 pt-2 hover:opacity-75">
    //       <CalendarDays className="flex h-3.5 w-3.5 stroke-green-600" />
    //       <span className="flex text-xs text-slate-600"> 06/02 </span>
    //     </button>
    //   </div>
    // </div>
    <div className="p-4 h-full overflow-x-auto bg-white">
      BoardId
      {/* <ListContainer
        boardId={params.boardId}
        data={lists}
      /> */}
    </div>
  );
}
