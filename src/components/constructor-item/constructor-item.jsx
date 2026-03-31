// в этом компоненте я попытался вывести логику перетаскивания ингредиентов между собой

import {
  ConstructorElement,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

import { removeFilling, moveFilling } from '@/services/constructor/constructorSlice';

import styles from '../burger-constructor/burger-constructor.module.css';

export const ConstructorItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'constructor-item',
    hover(draggedItem) {
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
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} className={styles.item} style={{ opacity: isDragging ? 0 : 1 }}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => dispatch(removeFilling(index))}
      />
    </div>
  );
};
