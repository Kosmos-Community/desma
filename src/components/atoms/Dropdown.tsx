import React from 'react';
import { Container, Spacer, Text } from '@nextui-org/react';

interface IDropdown {
  options: string[];
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (e: any) => void;
}

const Dropdown = ({ options, label, placeholder, value, onChange }: IDropdown) => {
  return (
    <Container css={{ m: 0, p: 0, position: 'relative', width: 'fit-content' }}>
      <Text as="label" size={'0.875rem'} css={{ marginBottom: '0.375rem' }}>
        {label}
      </Text>
      <Container
        css={{
          m: 0,
          p: 0,
          position: 'relative',
          width: 'fit-content',
          '&:after': {
            content: '',
            position: 'absolute',
            top: '50%',
            right: '8px',
            width: 0,
            height: 0,
            marginTop: '-2px',
            borderTop: '5px solid #aaa',
            borderRight: '5px solid transparent',
            borderLeft: '5px solid transparent',
          },
        }}
      >
        <select placeholder={placeholder} name="" id="" value={value} onChange={onChange}>
          <option value="" disabled selected>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Container>
    </Container>
  );
};

export default Dropdown;
