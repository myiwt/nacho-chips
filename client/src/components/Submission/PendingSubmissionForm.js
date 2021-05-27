import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, FormControl, Select, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  declineBtn: {
      background: '#f44336',
      color: '#ffffff',
  },
  approveBtn: {
      background: '#4caf50',
      color: '#ffffff'  
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function PendingSubmissionForm(props) {  
    const classes = useStyles();

    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [year, setYear] = React.useState('');
    const [journal, setJournal] = React.useState('');
    const [volume, setVolume] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [doi, setDoi] = React.useState('');
    const [software_dev_practice, setPractice] = React.useState('');
    const [claim, setClaim] = React.useState('');
    const [claim_strength, setClaimStrength] = React.useState('');
    const [comment, setComment] = React.useState('');

    useEffect(() => {
        if(props.evidence.title != null)
            setTitle(props.evidence.title)
        if(props.evidence.author != null)
            setAuthor(props.evidence.author)
        if(props.evidence.year != null)
            setYear(props.evidence.year)
        if(props.evidence.journal != null)
            setJournal(props.evidence.journal)
        if(props.evidence.volume != null)
            setVolume(props.evidence.volume)
        if(props.evidence.url != null)
            setUrl(props.evidence.url)
        if(props.evidence.doi != null)
            setDoi(props.evidence.doi)
        if(props.evidence.software_dev_practice != null)
            setPractice(props.evidence.software_dev_practice)
        if(props.evidence.claim != null)
            setClaim(props.evidence.claim)
        if(props.evidence.claim_strength != null)
            setClaimStrength(props.evidence.claim_strength)

    }, [props.evidence]);

    const [evidenceStatus, setEvidenceStatus] = React.useState('');

    const buildEvidence = () => {
        const evidence = {};
    
        evidence.title = document.getElementById('title').value;
        evidence.author = document.getElementById('author').value;
        evidence.year = document.getElementById('year').value;
        evidence.journal = document.getElementById('journal').value;
        evidence.volume = document.getElementById('volume').value;
        evidence.url = document.getElementById('url').value;
        evidence.doi = document.getElementById('doi').value;
        evidence.software_dev_practice = document.getElementById('practice').value;
        evidence.claim = document.getElementById('claim').value;
        evidence.claim_strength = document.getElementById('claim_strength').value;
        evidence.comment = document.getElementById('comment').value;

        return evidence;
    };  

    const handleApproveClick = () => {
        setEvidenceStatus('Approved');
        props.approve( buildEvidence() );
    };

    const handleDeclineClick = () => {
        setEvidenceStatus('Declined');
        props.decline( buildEvidence() );
    };

    const onTitleChange = event => setTitle(event.target.value);
    const onAuthorChange = event => setAuthor(event.target.value);
    const onYearChange = event => setYear(event.target.value);
    const onJournalChange = event => setJournal(event.target.value);
    const onVolumneChange = event => setVolume(event.target.value);
    const onUrlChange = event => setUrl(event.target.value);
    const onDoiChange = event => setDoi(event.target.value);
    const onPracticeChange = event => setPractice(event.target.value);
    const onClaimChange = event => setClaim(event.target.value);
    const onClaimStrengthChange = event => setClaimStrength(event.target.value);
    const onCommentChange = event => setComment(event.target.value);

    return (
        <div>
        <form className={classes.root} noValidate autoComplete="off">
            <TextField value={title} onChange={onTitleChange} id="title" label="Title" variant="outlined" />
            <TextField value={author} onChange={onAuthorChange} id="author" label="Author(s)" variant="outlined" />
            <TextField value={year} onChange={onYearChange} id="year" label="Year" type="number" variant="outlined" />
            <TextField value={journal} onChange={onJournalChange} id="journal" label="Journal" variant="outlined" />
            <TextField value={volume} onChange={onVolumneChange} id="volume" label="Volume" variant="outlined" />
            <TextField value={url} onChange={onUrlChange} id="url" label="URL" variant="outlined" />
            <TextField value={doi} onChange={onDoiChange} id="doi" label="DOI" variant="outlined" />
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Practice</InputLabel>
                <Select value={software_dev_practice} onChange={onPracticeChange} native id="practice" label="Practice" inputProps={{
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
                <Select value={claim} onChange={onClaimChange} native label="Claim" inputProps={{
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
                <Select value={claim_strength} onChange={onClaimStrengthChange} native id="claim_strength" label="Claim Strength" inputProps={{
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

            <TextField value={comment} onChange={onCommentChange} id="comment" label="Comment" variant="outlined" />

            <Button className={classes.declineBtn} onClick={handleDeclineClick} variant="outlined">
                Decline
            </Button>
            <Button className={classes.approveBtn} onClick={handleApproveClick} variant="outlined">
                Approve
            </Button>
        </form>
        <span>{evidenceStatus}</span>
        </div>
    );
};

/*

<TextField value={evidence.author} id="author" label="Author(s)" variant="outlined" />
            <TextField value={evidence.year} id="year" label="Year" type="number" variant="outlined" />
            <TextField value={evidence.journal} id="journal" label="Journal" variant="outlined" />
            <TextField value={evidence.volume} id="volume" label="Volume" variant="outlined" />
            <TextField value={evidence.url} id="url" label="URL" variant="outlined" />
            <TextField value={evidence.doi} id="doi" label="DOI" variant="outlined" />
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Practice</InputLabel>
                <Select value={evidence.software_dev_practice} native id="practice" label="Practice" inputProps={{
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
                <Select value={evidence.claim} native label="Claim" inputProps={{
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
                <Select value={evidence.claim_strength} native id="claim_strength" label="Claim Strength" inputProps={{
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

            <TextField id="comment" label="Comment" variant="outlined" />

*/