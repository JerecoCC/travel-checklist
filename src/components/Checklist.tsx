import { Text } from '@chakra-ui/layout';
import React, { FC } from 'react';
import { ChecklistItem } from './ChecklistItem';
import { AddItem } from './AddItem';

export const Checklist: FC = () => {
  return (
    <section className="w-2/4 bg-white rounded-xl overflow-hidden">
      <Text
        fontSize="xl"
        fontWeight="bold"
        className="px-8 py-4 border-b m-0"
      >
        Checklist
      </Text>
      <ChecklistItem />
      <AddItem />
    </section>
  )
}