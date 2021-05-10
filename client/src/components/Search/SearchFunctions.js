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
  const [searchColumn, setSearchCriteria ] = React.useState('');

  const handleChange = (event) => {
    setSearchCriteria(event.target.value);
    props.searchBtnClick(event);
  };

  return (
    <div>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Claim Strength</InputLabel>
        <Select
        native
        value={searchColumn}
        onChange={handleChange}
        label="Claim Strength"
        inputProps={{
            searchColumn: 'claim_strength',
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

        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Claim</InputLabel>
        <Select
        native
        value={searchColumn}
        onChange={handleChange}
        label="Claim"
        inputProps={{
            searchColumn: 'claim',
            id: 'outlined-age-native-simple',
        }}
        >
            <option aria-label="None" value="" />
            <option value={'productQuality'}>Improves product quality</option>
            <option value={'codeQuality'}>Improves code quality</option>
            <option value={'teamConfidence'}>Improves team confidence</option>
        </Select>
        </FormControl>
    </div>
  );
}

export default SearchFunctions;