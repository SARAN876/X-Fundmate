import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { withFormsy } from 'formsy-react';
import React from 'react';
import _ from '../../configurations/@lodash';

function SelectFormsy(props) {
  const importedProps = _.pick(props, [
    'autoWidth',
    'children',
    'classes',
    'displayEmpty',
    'input',
    'inputProps',
    'MenuProps',
    'multiple',
    'native',
    'onChange',
    'onClose',
    'onOpen',
    'open',
    'renderValue',
    'SelectDisplayProps',
    'value',
    'variant'
  ]);

  // An error message is returned only if the component is invalid
  const { errorMessage, value, label, name, setValue, onChange } = props;

  function input() {
    switch (importedProps.variant) {
      case 'outlined':
        return <OutlinedInput labelWidth={label.length * 8} id={name} />;
      case 'filled':
        return <FilledInput id={name} />;
      default:
        return <Input id={name} />;
    }
  }

  const changeValue = (event) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const { isPristine, showRequired, className } = props;

  return (
    <FormControl
      error={Boolean((!isPristine && showRequired) || errorMessage)}
      className={className}
      variant={importedProps.variant}>
      {label && <InputLabel htmlFor={name}>{label}</InputLabel>}
      <Select {...importedProps} value={value} onChange={changeValue} input={input()} />
      {Boolean(errorMessage) && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}

export default React.memo(withFormsy(SelectFormsy));
