import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {AiOutlineCalendar} from 'react-icons/ai';
import { NewProjectFormData, NewProjectFormErr } from '../../interfaces/newProjectForm';

const NewProjectForm = () => {
  const [formData,setFormData] = useState<NewProjectFormData>({
    clientName:'',
    projectName:'',
    projectType:'fixed',
    startDate:'',
    endDate:'',
    billable:'nonBillable',
    teamMembers:[]
  })

  const [errMsg,setErrMsg]= useState<NewProjectFormErr>();
  const [member,setMember] = useState('')

  useEffect(()=>{
    setTeamMembers()
  },[member])

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
  const radioHandler = (val:'fixed'|'retainer'|'retainer-granular')=>{
    setFormData({...formData,projectType:val})
  }
  const selectMember =(e:React.ChangeEvent<HTMLSelectElement>)=>{
    setMember(e.target.value)
  }

  const setTeamMembers = ()=>{
    if(!member) return null;
    if(!formData.teamMembers.includes(member)){
      setFormData({...formData,teamMembers:[...formData.teamMembers,member]})
      setErrMsg({...errMsg,teamMembers:''})
      setMember('')
    } else{
      setErrMsg({...errMsg,teamMembers:'Team member already added'})
    }
  }
  const fieldValidation = () => {
    const errors: NewProjectFormErr = {};
    const { clientName,projectName, startDate, endDate,projectType,teamMembers } = formData;

    if (!clientName) {
      errors.clientName = 'Please select client.';
    }
    if (!projectName) {
      errors.projectName = 'Please enter project name. ';
    }

    if (!startDate) {
      errors.startDate = 'Please enter start date';
    }

    if (projectType==='fixed'&& !endDate) {
      errors.endDate = 'Please enter end date';
    }

    if(teamMembers.length<=0){
      errors.teamMembers = 'Please select team members'
    }
    return errors;
  };

  const unselectMember = (id:number)=>{
    const myArr = formData.teamMembers.filter((_,index)=>index!==id)
    setFormData({...formData,teamMembers:myArr});
    setMember('')
  }

  const reset =()=>{
    setFormData({
      clientName:'',
      projectName:'',
      projectType:'fixed',
      startDate:'',
      endDate:'',
      billable:'nonBillable',
      teamMembers:[]
    })
    setMember('')
  }

  const formHandler = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    setErrMsg(fieldValidation());
    const notValid = fieldValidation();
    if (Object.values(notValid).length <= 0){
      alert('Success');
      reset()
    }
  }

  return (
    <Box w='full' p='18% 60px 60px' pos='absolute' top={0} right={0} fontFamily='Source Sans Pro' color='textLightMid'>
      <Heading fontFamily='Source Sans Pro' fontWeight='600' fontSize='22px' lineHeight='27.65px'>Add a new project</Heading>
      <Box>
        <form onSubmit={formHandler}>
          <FormControl p='25px 0 10px' isInvalid={errMsg?.clientName?true:false}>
            <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600' >Select Client</FormLabel>
            <Select placeholder='Select option' name='clientName' fontSize='14px' lineHeight='17.6px' onChange={selectHandler} value={formData.clientName}>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
            <FormErrorMessage>{errMsg?.clientName}</FormErrorMessage>
          </FormControl>
          <FormControl p='8px 0' isInvalid={errMsg?.projectName?true:false}>
            <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600' >Project Name</FormLabel>
            <Input type='text' name='projectName' placeholder='Please enter project name' fontSize='14px' lineHeight='17.6px' onChange={inputHandler} value={formData.projectName} />
            <FormErrorMessage>{errMsg?.projectName}</FormErrorMessage>
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
          <Flex justifyContent='space-between'>
            <FormControl p='8px 0' flexBasis='48%' isInvalid={errMsg?.startDate?true:false}>
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
              <FormErrorMessage>{errMsg?.startDate}</FormErrorMessage>
            </FormControl>
            <FormControl p='8px 0' flexBasis='48%' isInvalid={errMsg?.endDate?true:false}>
              <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600'  htmlFor='add_time'>{formData.projectType==='fixed'?<Text visibility='hidden'>Select date</Text>:'Month cycle (in days)'}</FormLabel>
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
                <Text p='8px 14px' bg='grayMid' fontSize='14px' lineHeight='24px' color='textLightMid' rounded='md'>Starts every 25th of the month</Text>
              }
              <FormErrorMessage>{errMsg?.endDate}</FormErrorMessage>
            </FormControl>
          </Flex>
          <FormControl>
            <Checkbox onChange={checkboxHandler}>Billable</Checkbox>
          </FormControl>
          <FormControl p='20px 0 34px' isInvalid={errMsg?.teamMembers?true:false}>
            <FormLabel fontSize='14px' lineHeight='17.6px' fontWeight='600'  htmlFor='add_time'>Add project members</FormLabel>
            <Select placeholder='Select option' name='clientName' fontSize='14px' lineHeight='17.6px' onChange={selectMember} value={member}>
              <option value='kedar m'>Kedar M</option>
              <option value='kedar w'>Kedar W</option>
              <option value='dnyaneshwar'>Dnyaneshwar</option>
            </Select>
            <AvatarGroup size='md' mt='15px' flexWrap='wrap' w='60%'>
              {
                formData.teamMembers.length>0&&formData.teamMembers.map((memberData,index)=>(<Avatar  key={index} onClick={()=>unselectMember(index)} name={memberData} cursor='pointer' />))
              }
            </AvatarGroup>
            <FormErrorMessage>{errMsg?.teamMembers}</FormErrorMessage>
          </FormControl>
          <Box>
            <Button w='137px' type='submit' variant='primary' mr='22px'>Save</Button>
            <Button w='105px' variant='secondary' onClick={reset}>Cancel</Button>
        </Box>
        </form>
      </Box>
    </Box>
  );
};

export default NewProjectForm;
