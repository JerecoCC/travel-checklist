import { Text } from '@chakra-ui/layout';
import React, { FC, useContext, useEffect, useState } from 'react';
import { ChecklistItem } from './ChecklistItem';
import { AddItem } from './AddItem';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react';
import { ChecklistContext } from '../lib/context';
import { FormInput } from './FormInput';
import { supabase } from '../lib/supabaseClient';
import { TODOS_QUERY } from '../lib/constants';
import Todo from '../lib/types/Todo';

export const Checklist: FC = () => {
  const context = useContext(ChecklistContext);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  
  supabase
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'todos'
      },
      () => getItems()
    )
    .subscribe();

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, [context.user]);

  const getItems = async () => {
    if (context.user.id) {
      try {
        let { data, error } = await supabase
          .from('todos')
          .select(TODOS_QUERY)
          .is('parent_id', null)
          .eq('user_id', context.user.id);
        if (error) throw error;
        if (data) setTodos(data);
      } catch (error) {
        console.error(error);
      }
    }
  }

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
    } finally {
      getItems();
    }
    context.setIsModalOpen(false);
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
        {todos.map((item) => (
          <ChecklistItem key={item.id} data={item} />
        ))}
        <AddItem />
      </section>

      <Modal isOpen={context.isModalOpen} onClose={() => context.setIsModalOpen(false)}>
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
              onClick={() => context.setIsModalOpen(false)}
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