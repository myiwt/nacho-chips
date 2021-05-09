import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    }
}));

function SearchFunctions(props) {
  const classes = useStyles();
  const [claim_strength, setStrength ] = React.useState('');

  const handleChange = (event) => {
    setStrength(event.target.value);
    props.searchBtnClick(event);
  };

  return (
    <div>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Claim Strength</InputLabel>
        <Select
        native
        value={claim_strength}
        onChange={handleChange}
        label="Claim Strength"
        inputProps={{
            claim_strength: 'claim_strength',
            id: 'outlined-age-native-simple',
        }}
        >
            <option aria-label="None" value="" />
            <option value={'stronglyAgainst'}>Strongly Against</option>
            <option value={'mostlyAgainst'}>Mostly Against</option>
            <option value={'stronglyAgree'}>Strongly Agree</option>
            <option value={'mostlyAgree'}>Mostly Agree</option>
            <option value={'mixed'}>Mixed</option>
        </Select>
        </FormControl>
    </div>
  );
}

export default SearchFunctions;