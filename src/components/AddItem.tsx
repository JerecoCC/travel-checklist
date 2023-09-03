import React, { FC, useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ChecklistContext } from '../lib/context';
import { MODAL_TITLES } from '../lib/constants';

interface AddItemProps {
  id?: string
}

export const AddItem: FC<AddItemProps> = ({ id = "" }) => {
  const context = useContext(ChecklistContext);

  const showAddModal = () => {
    context.setParentId(id);
    context.setModalTitle(MODAL_TITLES.ADD);
    context.setModalOpen(true);
  }

  return (
    <div className="flex items-center gap-4 py-2">
      <Button
        leftIcon={<FontAwesomeIcon icon={faPlus} />}
        colorScheme="teal"
        variant="ghost"
        onClick={showAddModal}
      >
        Add Item
      </Button>
    </div>
  );
}
