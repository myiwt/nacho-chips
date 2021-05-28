import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, FormControl, Select, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import { parseDOI, buildEvidenceFromDOI } from '../DOIParser/DOIParser';
import { parseBibTex } from '../BibTexParser/BibTexParser';

const submissionFormats = [
    {
      value: 0,
      label: 'DOI Resolution',
    },
    {
      value: 1,
      label: 'BibTeX',
    },
    {
      value: 2,
      label: 'Form',
    }
  ];

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  submitBtn: {
      border: 'solid 1px #ffffff',
      color: '#ffffff',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

export default function SubmissionForm(props) {  

    const uploadInputRef = useRef(null);

    const classes = useStyles();

    const runDOICheck = (ev) => {
        parseDOI(ev.target.value)
            .catch(() =>{
                console.log('Error getting details from the repository!')
            })
            .then(result => {
                if(result != null && result.get().length > 0)
                {
                    props.handler(buildEvidenceFromDOI(result.get()));
                }
        });
    };

    const doiForm = () => {
        return(
            <div>
                <TextField id="doi" label="DOI" variant="outlined" onChange={runDOICheck} />
            </div>
        );
    };

    const [formatColumn, setFormat ] = React.useState('');
    const [formState, setFormState] = React.useState(doiForm);

    const submitTextForm = () => {
        const evidence = {};
    
        evidence.title = document.getElementById('title').value;
        evidence.author = document.getElementById('authors').value;
        evidence.year = document.getElementById('year').value;
        evidence.journal = document.getElementById('journal').value;
        evidence.volume = document.getElementById('volume').value;
        evidence.url = document.getElementById('url').value;
        evidence.doi = document.getElementById('doi').value;
        evidence.software_dev_practice = document.getElementById('practice').value;
        evidence.claim = document.getElementById('claim').value;
        evidence.claim_strength = document.getElementById('claim_strength').value;

        props.handler(evidence);
    };  

    const bibTexForm = () => {
        return(
            <div>
                <input
                ref={uploadInputRef}
                type="file"
                accept="*"
                style={{ display: "none" }}
                onChange={handleUpload}
                />
                <Button
                onClick={() => uploadInputRef.current && uploadInputRef.current.click()}
                variant="contained"
                >
                Upload
                </Button>
            </div>
        );
    };

    const handleFormatChange = (event) => {
        setFormat(event.target.value);

        if(event.target.value === '0')
        {
            setFormState(doiForm);
        }
        if(event.target.value === '1')
        {
            setFormState(bibTexForm);
        }
        if(event.target.value === '2')
        {
            setFormState(textForm);
        }
    };  

    const handleUpload = (event) => {
        var fileName = event.target.files[0].name.toLowerCase();
        var re = /(\.txt|\.bib)$/i;
        if (!re.exec(fileName)) {
            alert("File extension not supported!");
            return;
        }

        const parsedBibTeX = parseBibTex(event.target.files[0]);
        if(parsedBibTeX != null)
        {
            props.handler(buildEvidenceFromDOI(parsedBibTeX.get()));
        }

        event.target.value = null;
    };

    const textForm = () => {
        return(
            <div>
                <TextField id="title" label="Title" variant="outlined" />
                <TextField id="authors" label="Author(s)" variant="outlined" />
                <TextField id="year" label="Year" type="number" variant="outlined" />
                <TextField id="journal" label="Journal" variant="outlined" />
                <TextField id="volume" label="Volume" variant="outlined" />
                <TextField id="url" label="URL" variant="outlined" />
                <TextField id="doi" label="DOI" variant="outlined" />
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Practice</InputLabel>
                    <Select native id="practice" label="Practice" inputProps={{
                        searchcolumn: 'software_dev_practice',
                        id: 'practice',
                    }}
                    >
                        <option aria-label="None" value="" />
                        <option value={'TDD'}>TDD</option>
                        <option value={'BDD'}>BDD</option>
                        <option value={'ATDD'}>ATDD</option>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Claim</InputLabel>
                    <Select native label="Claim" inputProps={{
                        searchcolumn: 'claim',
                        id: 'claim',
                    }}
                    >
                        <option aria-label="None" value="" />
                        <option value={'productQuality'}>Improves product quality</option>
                        <option value={'codeQuality'}>Improves code quality</option>
                        <option value={'teamConfidence'}>Improves team confidence</option>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Claim Strength</InputLabel>
                    <Select native id="claim_strength" label="Claim Strength" inputProps={{
                        searchcolumn: 'claim_strength',
                        id: 'claim_strength',
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
                <Button className={classes.submitBtn} onClick={submitTextForm} variant="outlined">
                    Submit
                </Button>
            </div>
        );
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
            id="outlined-select-currency-native"
            select
            label="Submission Format"
            value={formatColumn}
            onChange={handleFormatChange}
            SelectProps={{
                native: true,
            }}
            variant="outlined"
            >
            {submissionFormats.map((option) => (
                <option key={option.value} value={option.value}>
                {option.label}
                </option>
            ))}
            </TextField>
            {formState}
        </form>
    );
};
