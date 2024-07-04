"use client";

import type { ListWithCards } from "types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";

import { DragDropContext, type DropResult, Droppable } from "@hello-pangea/dnd";

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

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd = (result: DropResult) => {
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

      // Todo: update database with new order
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

        setOrderedData(newOrderedData);

        // Todo: update database with new order
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
