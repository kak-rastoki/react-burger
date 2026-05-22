import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { type ReactElement, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { removeFilling, moveFilling } from '@/services/constructor/constructorSlice';
import { useAppDispatch } from '@/services/store';

import type { TIngredient } from '@/utils/baseTypes';

import styles from '../burger-constructor/burger-constructor.module.css';

type TConstructorItemProps = {
  item: TIngredient;
  index: number;
};

type TDraggedItem = {
  index: number;
};

export const ConstructorItem = ({
  item,
  index,
}: TConstructorItemProps): ReactElement => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<TDraggedItem, void, unknown>({
    accept: 'constructor-item',
    hover(draggedItem: TDraggedItem): void {
      if (!ref.current) return;
      const dragIndex = draggedItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      dispatch(moveFilling({ fromId: dragIndex, toId: hoverIndex }));
      draggedItem.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'constructor-item',
    item: (): TDraggedItem => ({ index }),
    collect: (monitor): { isDragging: boolean } => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleClose = (): void => {
    dispatch(removeFilling(index));
  };

  return (
    <div
      ref={(node: HTMLDivElement | null): void => {
        ref.current = node;
        drag(drop(node));
      }}
      className={styles.item}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={handleClose}
      />
    </div>
  );
};
