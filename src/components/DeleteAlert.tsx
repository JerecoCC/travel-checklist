import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react';
import React, { FC, useContext } from 'react';
import { ChecklistContext } from '../lib/context';

interface DeleteAlertProps {
  onConfirm: () => void;
}

export const DeleteAlert: FC<DeleteAlertProps> = ({ onConfirm }) => {
  const context = useContext(ChecklistContext);
  const cancelRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <AlertDialog
      isOpen={context.isAlertOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => context.setAlertOpen(false)}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete Item
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button variant="ghost" onClick={() => context.setAlertOpen(false)}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={onConfirm} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}