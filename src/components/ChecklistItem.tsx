import { IconButton } from '@chakra-ui/button';
import { Collapse } from '@chakra-ui/transition';
import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { Text } from '@chakra-ui/layout';
import { Checkbox } from '@chakra-ui/checkbox';
import { AddItem } from './AddItem';

interface ChecklistItemProps {
  title?: string;
  description?: string;
}

export const ChecklistItem: FC<ChecklistItemProps> = ({title, description}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <div className="px-8 border-b flex justify-between py-2">
        <div className="flex items-center gap-4">
          <Checkbox size="lg" colorScheme='teal' />
          <Text
            fontSize="lg"
            fontWeight="medium"
            className="m-0"
          >
            {title}
          </Text>
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
        {description}
        <AddItem />
      </Collapse> 
    </div>
  );
}