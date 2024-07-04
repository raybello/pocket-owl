"use client";

import type { ListWithCards } from "types";
import { ListHeader } from "./list-header";

import {
  CalendarDays,
  CircleCheck,
  Paperclip,
  Thermometer,
} from "lucide-react";
import { type ElementRef, useRef, useState } from "react";

import { Button } from "~/components/ui/button";
import { CardTaskChecklist } from "./card-task-checklist";
import { CardTaskName } from "./card-task-name";
import { CardForm } from "./card-form";

import { Draggable, Droppable } from "@hello-pangea/dnd";
import { CardItem } from "./card-item";

interface ListItemProps {
  index: number;
  data: ListWithCards;
}

export const ListItem = ({ index, data }: ListItemProps) => {
  const textAreaRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  return (
    <Draggable draggableId={data.id.toString()} index={index}>
      {(provided) => (
        <li{...provided.draggableProps} ref={provided.innerRef}  className="h-full w-[350px] shrink-0 select-none">
          <div {...provided.dragHandleProps} className="w-full space-y-2 rounded-md bg-white/70 px-2 pb-2 shadow-md">
            <ListHeader data={data} onAddCard={enableEditing} />
            <CardForm
              listId={data.id}
              ref={textAreaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
            <Droppable droppableId={data.id.toString()} type="card">
              {(provided) => (
              <ol ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col">
                  {data.cards.map((card, index) => (
                  <CardItem key={card.id} index={index} card={card} />
                ))}
                {provided.placeholder}
              </ol>
              )}
            </Droppable>
          </div>
        </li>
      )}
    </Draggable>
  );
};
