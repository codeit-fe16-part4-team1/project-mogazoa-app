import React from 'react';

export default {
  title: 'Design/Color Palette',
};

const colors = {
  white: '#ffffff',
  black: '#000000',

  'primary-orange': {
    100: '#fffcf2',
    200: '#ffe59e',
    300: '#ffcb7b',
    400: '#ffb84d',
    500: '#ff9a00',
    600: '#fd7e35',
    700: '#e56611',
    800: '#bf550e',
    900: '#873c0a',
  },
  gray: {
    100: '#f9fafb',
    200: '#eff0f3',
    300: '#dbdce1',
    400: '#c4c6cc',
    500: '#a8abb3',
    600: '#8c8f98',
    700: '#6e727c',
    800: '#4b4f58',
    900: '#2f323a',
  },
  'state-error': '#ff0000',
};

interface ColorBoxProps {
  name: string;
  hex: string;
}

const ColorBox: React.FC<ColorBoxProps> = ({ name, hex }) => (
  <div className='flex flex-col items-center m-2 p-2'>
    <div
      className='w-24 h-24 rounded-lg shadow-md border border-gray-200'
      style={{ backgroundColor: hex }}
    />
    <p className='mt-2 text-sm font-semibold'>{name}</p>
    <p className='text-xs text-gray-500'>{hex}</p>
  </div>
);

export const ColorPalette = () => (
  <div className='p-8'>
    <h1 className='text-3xl font-bold mb-6'>Color Palette</h1>

    <h2 className='text-xl font-bold mt-4 mb-2'>Primary Orange</h2>
    <div className='flex flex-wrap'>
      {Object.entries(colors['primary-orange']).map(([name, hex]) => (
        <ColorBox key={name} name={name} hex={hex} />
      ))}
    </div>

    <h2 className='text-xl font-bold mt-4 mb-2'>Grayscale</h2>
    <div className='flex flex-wrap'>
      {Object.entries(colors.gray).map(([name, hex]) => (
        <ColorBox key={name} name={name} hex={hex} />
      ))}
    </div>

    <h2 className='text-xl font-bold mt-4 mb-2'>Utilities</h2>
    <div className='flex flex-wrap'>
      <ColorBox name='State Error' hex={colors['state-error']} />
    </div>
  </div>
);
