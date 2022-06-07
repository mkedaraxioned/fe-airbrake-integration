import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  ModalCloseButton,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {AiOutlineCalendar} from 'react-icons/ai';

const NewProjectForm = () => {
  const [formData,setFormData] = useState({
    clientName:'',
    projectName:'',
    projectType:'fixed',
    startDate:'',
    endDate:'',
    billable:'nonBillable'
  })
  const changeInputType = (e: React.FocusEvent<HTMLInputElement, Element>, type: string) => {
    e.target.type = type;
  };
  const selectHandler =(e:React.ChangeEvent<HTMLSelectElement>)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const inputHandler =(e:React.ChangeEvent<HTMLInputElement>)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  
  const checkboxHandler =(e:React.ChangeEvent<HTMLInputElement>)=>{
    e.target.checked?
    setFormData({...formData,billable:'billable'}):
    setFormData({...formData,billable:'nonBillable'})
  }
  const radioHandler = (val:string)=>{
    setFormData({...formData,projectType:val})
  }
  console.log(formData,'formData')

  return (
    <Box w='full' p='18% 63px 63px' pos='absolute' top={0} right={0} bg='white' fontFamily='Source Sans Pro' color='textLightMid'>
      <Heading fontWeight='600' fontSize='22px' lineHeight='27.65px'>Add a new project</Heading>
      <ModalCloseButton />
      <Box>
        <form>
          <FormControl p='25px 0 10px'>
            <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600' >Select Client</FormLabel>
            <Select placeholder='Select option' name='clientName' fontSize='14px' lineHeight='17.6px' onChange={selectHandler} value={formData.clientName}>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
          </FormControl>
          <FormControl p='8px 0'>
            <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600' >Project Name</FormLabel>
            <Input type='text' name='projectName' placeholder='Please enter project name' fontSize='14px' lineHeight='17.6px' onChange={inputHandler} value={formData.projectName} />
          </FormControl>
          <FormControl p='8px 0'>
            <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600' >Select project Type</FormLabel>
            <RadioGroup onChange={radioHandler} value={formData.projectType}>
              <Stack direction='row' alignItems='center'>
                <Radio value='fixed' colorScheme='orange'><Text fontSize='14px' lineHeight='17.6px'>Fixed</Text></Radio>
                <Radio value='retainer' colorScheme='orange'><Text fontSize='14px' lineHeight='17.6px'>Retainer</Text></Radio>
                <Radio value='retainer granular' colorScheme='orange'><Text fontSize='14px' lineHeight='17.6px'>Retainer (Granular)</Text></Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <Flex justifyContent='space-between' alignItems='flex-end'>
            <FormControl p='8px 0' flexBasis='48%'>
              <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600'  htmlFor='add_time'>Select date</FormLabel>
              <Flex alignItems='center' border='1px' borderColor='borderColor' rounded='md'>
                <Stack w='30%' alignItems='center' p='10px 0' bg='grayColor' color='textLightMid' fontFamily='Source Sans Pro' fontWeight='400'>
                  <AiOutlineCalendar fontSize='20px'/>
                </Stack>
              <Input
                  type='text'
                  placeholder='Select start date'
                  onFocus={e => changeInputType(e, 'date')}
                  onBlur={e => changeInputType(e, 'text')}
                  border='none'
                  name='startDate'
                  value={formData.startDate}
                  onChange={inputHandler}
                />
              </Flex>
            </FormControl>
            <FormControl p='8px 0' flexBasis='48%'>
              {
                formData.projectType==='fixed'?<Flex alignItems='center' border='1px' borderColor='borderColor' rounded='md'>
                <Stack w='30%' alignItems='center' p='10px 0' bg='grayColor' color='textLightMid' fontFamily='Source Sans Pro' fontWeight='400'>
                  <AiOutlineCalendar fontSize='20px'/>
                </Stack>
                <Input
                  type='text'
                  placeholder='Select end date'
                  onFocus={e => changeInputType(e, 'date')}
                  onBlur={e => changeInputType(e, 'text')}
                  border='none'
                  name='endDate'
                  value={formData.endDate}
                  onChange={inputHandler}
                />
              </Flex>:
              <>
                <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600'  htmlFor='add_time'>Month cycle (in days)</FormLabel>
                <Text p='8px 14px' bg='grayMid' fontSize='14px' lineHeight='24px' color='textLightMid' rounded='md'>Starts every 25th of the month</Text>
              </>
              }
            </FormControl>
          </Flex>
          <FormControl>
            <Checkbox onChange={checkboxHandler}>Billable</Checkbox>
          </FormControl>
          <FormControl p='20px 0 34px'>
            <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600'  htmlFor='add_time'>Add project members</FormLabel>
            <Select placeholder='Select option' name='clientName' fontSize='14px' lineHeight='17.6px' onChange={selectHandler} value={formData.clientName}>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
            <AvatarGroup size='md' mt='15px' flexWrap='wrap' w='60%'>
              <Avatar name='Segun Adebayo' cursor='pointer' />
              <Avatar name='Kent Dodds' cursor='pointer' />
              <Avatar name='Prosper Otemuyiwa' cursor='pointer' />
              <Avatar name='Christian Nwamba' cursor='pointer' />
            </AvatarGroup>
          </FormControl>
          <Box>
            <Button w='137px' type='submit' variant='primary' mr='22px'>Save</Button>
            <Button w='105px' variant='secondary'>Cancel</Button>
        </Box>
        </form>
      </Box>
    </Box>
  );
};

export default NewProjectForm;
