import { Text } from '@chakra-ui/layout';
import React, { FC, useContext, useEffect, useState } from 'react';
import { ChecklistItem } from './ChecklistItem';
import { AddItem } from './AddItem';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react';
import { ChecklistContext } from '../lib/context';
import { FormInput } from './FormInput';
import { supabase } from '../lib/supabaseClient';
import { TODOS_QUERY } from '../lib/constants';

interface Todo {
  id: string;
  title?: string;
  description?: string;
  isComplete?: boolean;
  todos?: Todo[];
}

export const Checklist: FC = () => {
  const context = useContext(ChecklistContext);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, [])

  const getItems = async () => {
    try {
      let { data, error } = await supabase
        .from('todos')
        .select(TODOS_QUERY)
        .is('parent_id', null);
      if (error) throw error;
      if (data) setTodos(data);
    } catch (error) {
      console.error(error);
    }
  }

  const addItem = async () => {
    const session = await supabase.auth.getSession();
    try {
      const { error } = await supabase
        .from('todos')
        .insert([{
          title: title,
          description: description,
          user_id: session.data.session?.user.id
        }]);
      if (error) throw error;
      getItems();
    } catch (error) {
      console.error(error);
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
          <ChecklistItem key={item.id} title={item.title} description={item.description} />
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