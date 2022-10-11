import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

export const DialogLeavingPage = ({
  showDialog,
  setShowDialog,
  cancelNavigation,
  confirmNavigation,
}: any) => {
  const cancelRef = useRef<any>();
  const handleDialogClose = () => {
    setShowDialog(false);
  };

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={showDialog}
      onClose={handleDialogClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Navigate page?
          </AlertDialogHeader>

          <AlertDialogBody>
            Changes that you made may not be saved.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              w='60px'
              variant='secondary'
              fontSize='14px'
              ref={cancelRef}
              onClick={cancelNavigation}
            >
              Cancel
            </Button>
            <Button
              w='60px'
              variant='primary'
              fontSize='14px'
              onClick={confirmNavigation}
              ml={3}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
