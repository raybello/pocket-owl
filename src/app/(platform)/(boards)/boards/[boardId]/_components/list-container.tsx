"use client";

import type { ListWithCards } from "types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";

import { DragDropContext, type DropResult, Droppable } from "@hello-pangea/dnd";

import { useAction } from "hooks/use-actions";
import { updateListOrder } from "~/server/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "~/server/actions/update-card-order";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  if (removed !== undefined) {
    result.splice(endIndex, 0, removed);
  }
  return result;
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {

  const [orderedData, setOrderedData] = useState(data);
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  })
  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });


  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // if dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // User moves a list
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index }),
      );

      setOrderedData(items);

      await executeUpdateListOrder({
        items: items.map((item) => ({ id: item.id, name: item.name, order: item.order })),
        boardId: boardId,
      })
    
    }
    // User moves a card
    if (type === "card") {
      const newOrderedData = [...orderedData];

      // Source and destination lists
      const sourceList = newOrderedData.find(
        (list) => list.id.toString() === source.droppableId,
      );
      const destList = newOrderedData.find(
        (list) => list.id.toString() === destination.droppableId,
      );

      if (!sourceList || !destList) {
        return;
      }

      // Check if card exists on source list
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Check if card exists on destination list
      if (!destList.cards) {
        destList.cards = [];
      }

      // Moving in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index,
        );

        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });

        sourceList.cards = reorderedCards;

        console.log("After reordering: ", reorderedCards);

        setOrderedData(newOrderedData);

        // Todo: update database with new order
        await executeUpdateCardOrder({
          items: sourceList.cards.map((item) => ({
            id: item.id,
            order: item.order,
          })),
          boardId: boardId,
          listId: sourceList.id,
        });

      } else {
        //   User moves card to another list

        //   Remove card from source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        if (movedCard) {
          // Assign new list Id to moved card
          movedCard.listId = Number(destination.droppableId);

          // Add card to destination list
          destList.cards.splice(destination.index, 0, movedCard);

          sourceList.cards.forEach((card, idx) => {
            card.order = idx;
          });

          // Update order for each card in the destination list
          destList.cards.forEach((card, idx) => {
            card.order = idx;
          });

          setOrderedData(newOrderedData);

          // Todo: update database with new order
        }
      }

      // Todo: update database with new order
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full gap-x-3"
          >
            {orderedData.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="w-1 flex-shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
