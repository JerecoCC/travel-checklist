import React, { FC, useContext, useEffect, useState } from 'react';
import { ChecklistContext } from '../lib/context';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react';
import { FormInput } from './FormInput';
import { supabase } from '../lib/supabaseClient';
import { TODOS_QUERY } from '../lib/constants';

export const AddEditModal: FC = () => {
  const context = useContext(ChecklistContext);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const getItem = async (id: string) => {
      try {
        const { data, error } = await supabase
          .from('todos')
          .select(TODOS_QUERY)
          .eq('user_id', context.user.id)
          .eq('id', id);
        if (error) throw error;
        if (data) {
          setTitle(data[0].title);
          setDescription(data[0].description);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (context.isModalOpen) {
      if (context.itemId !== "") {
        getItem(context.itemId);
      }
    } else {
      setTitle("");
      setDescription("");
    }
    // eslint-disable-next-line
  }, [context.isModalOpen]);

  const addItem = async () => {
    try {
      const { error } = await supabase
        .from('todos')
        .insert([{
          title: title,
          description: description,
          user_id: context.user.id,
          parent_id: context.parentId === "" ? null : context.parentId
        }]);
      if (error) throw error;

      context.refreshList();
    } catch (error) {
      console.error(error);
    }
    context.setModalOpen(false);
  }

  const updateItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({
          title: title,
          description: description,
        })
        .eq('id', id);
      if (error) throw error;

      context.refreshList();
      context.setModalOpen(false);
      context.setItemId("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal isOpen={context.isModalOpen} onClose={() => context.setModalOpen(false)} isCentered>
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
            onClick={() => {
              context.setItemId("");
              context.setModalOpen(false);
            }}
          >
            Close
          </Button>
          <Button
            colorScheme='teal'
            onClick={() => {
              if (context.itemId === "") {
                addItem();
              } else {
                updateItem(context.itemId);
              }
            }}
          >
            {context.itemId === "" ? "Add" : "Save"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}