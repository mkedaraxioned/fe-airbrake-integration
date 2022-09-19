import React from 'react';
import { Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { HiDotsHorizontal } from 'react-icons/hi';
interface DropDownProp {
  handlePrint?: any;
}

const ExportMilestone = ({ handlePrint }: DropDownProp) => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton isActive={isOpen} as={Text} cursor='pointer' pl='43px'>
            <HiDotsHorizontal />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Text
                w={'100%'}
                color='primary'
                textStyle='sourceSansProRegular'
                fontSize='18px'
                lineHeight='22px'
                onClick={() => handlePrint()}
              >
                Print view
              </Text>
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default ExportMilestone;
