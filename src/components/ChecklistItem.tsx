import { IconButton } from '@chakra-ui/button';
import { Collapse } from '@chakra-ui/transition';
import React, { FC, useContext, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Text } from '@chakra-ui/layout';
import { Checkbox } from '@chakra-ui/checkbox';
import { AddItem } from './AddItem';
import Todo from '../lib/types/Todo';
import { supabase } from '../lib/supabaseClient';
import { Tooltip } from '@chakra-ui/react';
import { ChecklistContext } from '../lib/context';
import { MODAL_TITLES } from '../lib/constants';

interface ChecklistItemProps {
  data: Todo;
  isParent?: boolean;
}

export const ChecklistItem: FC<ChecklistItemProps> = ({ data, isParent = false }) => {
  const context = useContext(ChecklistContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleItem = async (id: string, isCompleted: boolean) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ is_completed: isCompleted })
        .eq('id', id);
      if (error) throw error;

      context.refreshList();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className={`px-8 border-b flex justify-between py-2 min-h-[57px] ${isParent ? "" : "pl-20 -ml-3"}`}>
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
              <Tooltip label="Edit Item" aria-label="Edit item tooltip">
                <IconButton
                  onClick={() => {
                    context.setModalTitle(MODAL_TITLES.EDIT);
                    context.setModalOpen(true);
                    context.setItemId(data.id);
                  }}
                  variant='ghost'
                  colorScheme='teal'
                  aria-label="Edit item"
                  size="xs"
                  icon={<FontAwesomeIcon icon={faPencil} />}
                />
              </Tooltip>
              <Tooltip label="Delete Item" aria-label="Delete item tooltip">
                <IconButton
                  onClick={() => {
                    context.setAlertOpen(true);
                    context.setItemId(data.id);
                  }}
                  variant='ghost'
                  colorScheme='teal'
                  aria-label="Delete item"
                  size="xs"
                  icon={<FontAwesomeIcon icon={faTrash} />}
                />
              </Tooltip>
            </div>
          </div>
        </div>
        {(isParent || data.description !== "") && (
          <IconButton
            onClick={() => setIsOpen((prev) => !prev)}
            variant='ghost'
            colorScheme='teal'
            aria-label="Toggle child items"
            fontSize='20px'
            icon={<FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />}
            isRound
          />
        )}
      </div>
      <Collapse in={isOpen} className="border-b" animateOpacity>
        {data.description && (
          <div className={`pl-20 -ml-3 py-2 ${isParent ? "border-b" : ""}`}>
            <Text className="m-0">{data.description}</Text>
          </div>
        )}
        {isParent && (
          <>
            <div className="">
              {data.todos?.map((item) => (
                <ChecklistItem key={item.id} data={item} />
              ))}
            </div>
            <div className="pl-20 -ml-6">
              <AddItem id={data.id} />
            </div>
          </>
        )}
      </Collapse>
    </div>
  );
}