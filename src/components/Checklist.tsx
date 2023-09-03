import { Text } from '@chakra-ui/layout';
import React, { FC, useContext } from 'react';
import { ChecklistItem } from './ChecklistItem';
import { AddItem } from './AddItem';
import { ChecklistContext } from '../lib/context';
import { supabase } from '../lib/supabaseClient';
import Todo from '../lib/types/Todo';
import { DeleteAlert } from './DeleteAlert';
import { AddEditModal } from './AddEditModal';

interface ChecklistProps {
  data: Todo[]
}

export const Checklist: FC<ChecklistProps> = ({ data }) => {
  const context = useContext(ChecklistContext);

  const deleteItem = async () => {
    if (context.itemId) {
      try {
        const { error } = await supabase
          .from('todos')
          .delete()
          .match({ id: context.itemId });
        if (error) throw error;
        context.setAlertOpen(false);
        context.setItemId("");
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <section className="w-2/4 bg-white rounded-xl overflow-hidden">
        <Text
          fontSize="xl"
          fontWeight="bold"
          className="px-8 py-4 border-b m-0"
        >
          Checklist
        </Text>
        {data.length > 0 ? data.map((item) => (
          <ChecklistItem key={item.id} data={item} />
        )) : (
          <Text
            className="px-8 py-4 border-b m-0"
            fontStyle="italic"
          >
            No items added.
          </Text>
        )}
        <div className="pl-5">
          <AddItem />
        </div>
      </section>
      <DeleteAlert onConfirm={deleteItem} />
      <AddEditModal />
    </>
  )
}