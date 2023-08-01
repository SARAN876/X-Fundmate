import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import { withFormsy } from 'formsy-react';
import React from 'react';
import _ from '../../configurations/@lodash';

function RadioGroupFormsy(props) {
  const importedProps = _.pick(props, [
    'row',
    'children',
    'name',
    'onBlur',
    'onChange',
    'onKeyDown',
    'variant',
    'size'
  ]);

  // An error message is returned only if the component is invalid
  const { errorMessage, value, setValue, onChange } = props;

  const changeValue = (event, val) => {
    setValue(val);
    if (onChange) {
      onChange(event);
    }
  };

  const { isPristine, showRequired, className, label, required, size } = props;

  return (
    <FormControl
      error={Boolean((!isPristine && showRequired) || errorMessage)}
      className={className}>
      <FormControl component="fieldset" required={required} error={Boolean(errorMessage)}>
        {label && (
          <FormLabel sx={{ fontSize: size == 'small' ? 13 : 15 }} component="legend">
            {label}
          </FormLabel>
        )}
        <RadioGroup {...importedProps} value={value || null} onChange={changeValue} />
        {Boolean(errorMessage) && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </FormControl>
  );
}

export default React.memo(withFormsy(RadioGroupFormsy));
