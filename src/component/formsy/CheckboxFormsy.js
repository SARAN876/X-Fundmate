import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { withFormsy } from 'formsy-react';
import React from 'react';
import _ from '../../configurations/@lodash';

function CheckboxFormsy(props) {
  const importedProps = _.pick(props, [
    'checkedIcon',
    'classes',
    'color',
    'disabled',
    'disableRipple',
    'icon',
    'id',
    'indeterminate',
    'indeterminateIcon',
    'inputProps',
    'inputRef',
    'onChange',
    'variant'
  ]);

  // An error message is returned only if the component is invalid
  const { errorMessage, value, setValue, onChange } = props;

  function changeValue(event) {
    setValue(event.target.checked);
    if (onChange) {
      onChange(event);
    }
  }

  const { isPristine, showRequired, className, label } = props;

  return (
    <FormControl
      error={Boolean((!isPristine && showRequired) || errorMessage)}
      className={className}>
      <FormControlLabel
        control={
          <Checkbox {...importedProps} type="checkbox" checked={value} onChange={changeValue} />
        }
        label={label}
      />
      {Boolean(errorMessage) && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
}

export default React.memo(withFormsy(CheckboxFormsy));
