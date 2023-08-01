import TextField from '@mui/material/TextField';
import { withFormsy } from 'formsy-react';
import React from 'react';
import _ from '../../configurations/@lodash';

function TextFieldFormsy(props) {
  const importedProps = _.pick(props, [
    'autoComplete',
    'autoFocus',
    'children',
    'className',
    'defaultValue',
    'disabled',
    'FormHelperTextProps',
    'fullWidth',
    'id',
    'InputLabelProps',
    'inputProps',
    'InputProps',
    'inputRef',
    'label',
    'multiline',
    'name',
    'onBlur',
    'onChange',
    'onFocus',
    'placeholder',
    'required',
    'rows',
    'rowsMax',
    'select',
    'SelectProps',
    'type',
    'variant',
    'size',
    'focused',
    'maxRows'
  ]);

  const { errorMessage, isPristine, showRequired, value, setValue, onChange, helperText } = props;
  const targetValue = value || '';

  const changeValue = (event) => {
    setValue(event.target.value);
    // currentTarget
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <TextField
      {...importedProps}
      onChange={changeValue}
      value={targetValue}
      error={Boolean((!isPristine && showRequired) || errorMessage)}
      helperText={errorMessage || helperText}
    />
  );
}

export default React.memo(withFormsy(TextFieldFormsy));
