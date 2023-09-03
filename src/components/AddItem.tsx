import React, { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const AddItem: FC = () => {
  return (
    <div className="px-8 border-b flex items-center gap-4 py-2 bg-teal-100/30 cursor-pointer hover:bg-teal-600/30">
      <FontAwesomeIcon icon={faPlus} className="text-teal-700"/>
      <Text
        fontSize="lg"
        fontWeight="medium"
        className="m-0"
        color="teal"
      >
        Add Item
      </Text>
    </div>
  );
}
