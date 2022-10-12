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
            Save changes?
          </AlertDialogHeader>

          <AlertDialogBody>
            Your unsaved changes will be lost. Save changes before closing?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              w='60px'
              variant='secondary'
              fontSize='14px'
              ref={cancelRef}
              onClick={cancelNavigation}
            >
              Stay
            </Button>
            <Button
              w='60px'
              variant='primary'
              fontSize='14px'
              onClick={confirmNavigation}
              ml={3}
            >
              Leave
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
