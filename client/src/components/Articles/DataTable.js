import * as React from 'react';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';

function translateClaimStrength(strength)
{
    switch(strength)
    {
        case 'stronglyAgainst':
            {
                return 'Strongly Against';
            }
        case 'mostlyAgainst':
            {
                return 'Mostly Against';
            }
        case 'stronglyAgree':
            {
                return 'Strongly Agree';
            }
        case 'mostlyAgree':
            {
                return 'Mostly Agree';
            }
        case 'mixed':
            {
                return 'Mixed';
            }
        default:
            {
                return strength;
            }
    }
}

function translateClaim(claim)
{
    switch(claim)
    {
        case 'teamConfidence':
            {
                return 'Team Confidence';
            }
        case 'codeQuality':
            {
                return 'Code Quality';
            }
        case 'productQuality':
            {
                return 'Product Quality';
            }
        default:
            {
                return claim;
            }
    }
}

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  { field: 'title', headerName: 'Title', width: 700, headerClassName: 'table-header-seeds', headerAlign: 'center', cellClassName: 'table-cell-seeds', align: 'left' }, //flex 0.5
  { field: 'author', headerName: 'Author', width: 300, headerClassName: 'table-header-seeds', headerAlign: 'center', cellClassName: 'table-cell-seeds', align: 'left' }, //flex 0.1
  { field: 'year', headerName: 'Year', width: 100, headerClassName: 'table-header-seeds', headerAlign: 'center', cellClassName: 'table-cell-seeds', align: 'left' }, //flex 0.1
  { field: 'software_dev_practice', headerName: 'Practice', width: 110, headerClassName: 'table-header-seeds', headerAlign: 'center', cellClassName: 'table-cell-seeds', align: 'left' }, //flex 0.075
  { field: 'claim', headerName: 'Claim', width: 150, headerClassName: 'table-header-seeds', headerAlign: 'center', cellClassName: 'table-cell-seeds', align: 'left' }, //flex 0.1
  { field: 'claim_strength', headerName: 'Claim Strength', width: 150, headerClassName: 'table-header-seeds', headerAlign: 'center', cellClassName: 'table-cell-seeds', align: 'left' }, //flex 0.1
  //{ field: 'updated_date', headerName: 'Updated Date', width: 150, headerClassName: 'table-header-seeds', headerAlign: 'center', cellClassName: 'table-cell-seeds', align: 'left' }, //flex 0.1
  {
    field: 'url',
    headerName: 'View',
    width: 100,
    align: 'center',
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <strong>        
        <Button
          variant="contained"
          size="small"
          href={params.value}
          target="_blank"
        >
          Open
        </Button>
      </strong>
    ),
    headerClassName: 'table-header-seeds', headerAlign: 'center', cellClassName: 'table-cell-seeds',
  },
];

export default function DataTable(props) {

    //console.log("got from table: "+props.search);
    const articles = props.articles.map(item => {
        return { 
            id: item._id, 
            title: item.title, 
            author: item.author,
            software_dev_practice: item.software_dev_practice, 
            claim: translateClaim(item.claim),
            claim_strength: translateClaimStrength(item.claim_strength),
            //updated_date: item.updated_date,
            year: item.year,
            url: item.url
         };
      });

  return (
    <div style={{ width: '75%', maxWidth: '1662px' }}>
      <DataGrid autoHeight rows={articles} columns={columns} pageSize={6} disableSelectionOnClick={true} exportButton={true} />
    </div>
  );
}