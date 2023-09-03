import { Text } from '@chakra-ui/layout';
import React, { FC, useContext, useState } from 'react';
import { ChecklistItem } from './ChecklistItem';
import { AddItem } from './AddItem';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react';
import { ChecklistContext } from '../lib/context';
import { FormInput } from './FormInput';
import { supabase } from '../lib/supabaseClient';
import Todo from '../lib/types/Todo';
import { DeleteAlert } from './DeleteAlert';

interface ChecklistProps {
  data: Todo[]
}

export const Checklist: FC<ChecklistProps> = ({ data }) => {
  const context = useContext(ChecklistContext);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const addItem = async () => {
    try {
      const { error } = await supabase
        .from('todos')
        .insert([{
          title: title,
          description: description,
          user_id: context.user.id
        }]);
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
    context.setModalOpen(false);
  }

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
      <Modal isOpen={context.isModalOpen} onClose={() => context.setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{context.modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormInput
              placeholder="Item Title"
              onChange={(value: string) => setTitle(value)}
              value={title}
            />
            <Textarea
              placeholder='Item Description'
              resize="vertical"
              colorScheme="teal"
              focusBorderColor="teal.400"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='teal'
              variant='ghost'
              mr={3}
              onClick={() => context.setModalOpen(false)}
            >
              Close
            </Button>
            <Button colorScheme='teal' onClick={addItem}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}