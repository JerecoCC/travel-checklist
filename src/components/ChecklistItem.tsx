import { IconButton } from '@chakra-ui/button';
import { Collapse } from '@chakra-ui/transition';
import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Text } from '@chakra-ui/layout';
import { Checkbox } from '@chakra-ui/checkbox';
import { AddItem } from './AddItem';
import Todo from '../lib/types/Todo';
import { supabase } from '../lib/supabaseClient';

interface ChecklistItemProps {
  data: Todo;
}

export const ChecklistItem: FC<ChecklistItemProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleItem = async (id: string, isCompleted: boolean) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ is_completed: isCompleted })
        .eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="px-8 border-b flex justify-between py-2">
        <div className="group/item flex items-center gap-4 w-full">
          <Checkbox
            size="lg"
            colorScheme='teal'
            isChecked={data.is_completed}
            onChange={(e) => {
              toggleItem(data.id, e.target.checked);
            }}
          />
          <div className="flex gap-2">
            <Text
              fontSize="lg"
              fontWeight="medium"
              className="m-0"
              as={data.is_completed ? "del" : "p"}
            >
              {data.title}
            </Text>
            {data.todos && data.todos.length > 0 && (
              <Text
                fontSize="lg"
                fontWeight="medium"
                className="m-0"
                color="gray.500"
              >
                ({data.todos.reduce((total, item) => total + (item.is_completed ? 1 : 0), 0)}/{data.todos.length})
              </Text>
            )}
            <div className="invisible group-hover/item:visible">
              <IconButton
                onClick={() => setIsOpen((prev) => !prev)}
                variant='ghost'
                colorScheme='teal'
                aria-label="Toggle child items"
                size="xs"
                icon={<FontAwesomeIcon icon={faPencil} />}
              />
              <IconButton
                onClick={() => setIsOpen((prev) => !prev)}
                variant='ghost'
                colorScheme='teal'
                aria-label="Toggle child items"
                size="xs"
                icon={<FontAwesomeIcon icon={faTrash} />}
              />
            </div>
          </div>
        </div>
        <IconButton
          onClick={() => setIsOpen((prev) => !prev)}
          variant='ghost'
          colorScheme='teal'
          aria-label="Toggle child items"
          fontSize='20px'
          icon={<FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />}
          isRound
        />
      </div>
      <Collapse in={isOpen} className="pl-20 -ml-3 py-2 border-b" animateOpacity>
        {data.description}
        <AddItem />
      </Collapse>
    </div>
  );
}