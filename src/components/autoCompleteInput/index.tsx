import { Input, ListItem, UnorderedList } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { MemberObj } from '../../interfaces/newProjectForm';

interface Props {
  users: MemberObj[];
  placeholder: string;
  setMember: (member: MemberObj) => void;
}

const AutoCompleteInput = ({ users, placeholder, setMember }: Props) => {
  const [display, setDisplay] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [suggestion, setSuggestion] = useState<MemberObj[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);

  useEffect(() => {
    const sug = users.filter((user) =>
      user.name.toLocaleLowerCase().includes(inputVal.toLocaleLowerCase()),
    );
    setSuggestion(sug);
  }, [inputVal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplay(true);
    setInputVal(e.currentTarget.value);
  };

  const handleSelect = (val: MemberObj) => {
    setMember(val);
    setDisplay(false);
    setInputVal('');
  };

  const handleFocus = () => {
    setDisplay(true);
    setSuggestion(users);
  };

  const handleKeyDown = (e: any) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex === suggestion.length - 1) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setMember(suggestion[suggestionIndex]);
      setSuggestionIndex(0);
      setDisplay(false);
      setInputVal('');
    }
  };

  return (
    <>
      <Input
        variant='outline'
        value={inputVal}
        onChange={(e) => handleChange(e)}
        onFocus={handleFocus}
        onBlur={() => setDisplay(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        position='relative'
        fontFamily='Source Sans Pro'
        fontSize='14px'
      ></Input>
      <UnorderedList
        w='100%'
        border='1px solid #E2E8F0'
        borderRadius='5px'
        display={display ? 'block' : 'none'}
        position='absolute'
        mt='2px'
        left='-14px'
        color='extraLightBlack'
        fontFamily='Source Sans Pro'
        fontSize='14px'
        zIndex='10'
      >
        {suggestion &&
          suggestion.map((sug, index) => (
            <ListItem
              p='5px 15px'
              borderBottom='1px solid #E2E8F0'
              bg={index === suggestionIndex ? '#eeeeee' : 'white'}
              onMouseDown={() => handleSelect(sug)}
              listStyleType={'none'}
              key={index}
              cursor='default'
              _hover={{ bg: '#eeeeee' }}
            >
              {sug.name}
            </ListItem>
          ))}
      </UnorderedList>
    </>
  );
};

export default AutoCompleteInput;
