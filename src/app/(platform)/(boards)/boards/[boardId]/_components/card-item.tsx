"use client";

import { Button } from "~/components/ui/button";
import type { Card } from "~/server/db/schema";
import { CardTaskName } from "./card-task-name";

import {
  CalendarDays,
  CircleCheck,
  Paperclip,
  Thermometer,
} from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";

interface CardItemProps {
  index: number;
  card: Card;
}

export const CardItem = ({ index, card }: CardItemProps) => {
  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className="mt-2 flex w-full flex-col space-y-2 ">
          <div className="flex flex-col rounded-sm bg-white p-3 shadow-md">
            <div className="flex flex-row space-x-1.5 pb-2">
              <div className="flex">
                <Button className="h-5 bg-cyan-200 px-2 text-cyan-700 hover:bg-cyan-100">
                  Development
                </Button>
              </div>
              <div className="flex">
                <Button className="h-5 bg-red-200 px-2 text-red-700 hover:bg-red-100">
                  Feature
                </Button>
              </div>
            </div>
            <CardTaskName taskId={card.id} taskName={card.name} />
            {/* <div className="space-y-1 pb-3">
                  <CardTaskChecklist taskId={1} taskName="Connect to uvm_env" />
                  <CardTaskChecklist
                    taskId={2}
                    taskName="Add config for core config"
                  />
                  <CardTaskChecklist
                    taskId={3}
                    taskName="Implement core config"
                  />
                  <CardTaskChecklist
                    taskId={4}
                    taskName="Add RDFE test-case to regression"
                  />
                </div> */}
            <div className=" flex flex-row items-center space-x-4 pb-2  text-xs text-slate-600">
              <div className="flex">
                <Thermometer className="flex h-4 w-4 fill-[#e24b4b]" />
              </div>
              <div className="flex flex-row items-center space-x-1.5">
                <Paperclip className="flex h-3 w-3 " />
                <span className="flex"> 2 </span>
              </div>
              <div className="flex flex-row items-center space-x-1.5">
                <CircleCheck className="flex h-3 w-3 stroke-slate-600" />
                <span className="flex"> 5 / 10 </span>
              </div>
            </div>
            <hr className="my-1" />
            <button className="flex w-16 items-center space-x-1.5 px-0 pt-2 hover:opacity-75">
              <CalendarDays className="flex h-3.5 w-3.5 stroke-green-500" />
              <span className="flex text-xs text-slate-600"> 06/02 </span>
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};
