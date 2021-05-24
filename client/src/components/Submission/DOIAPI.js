import * as React from 'react';
const Cite = require('citation-js');

function parseDOI(doi){

    const example = new Cite(doi);
    
    // Change default output options
    example.options({
        type: 'string',
        style: 'bibtex'
    });
    
    return example.get();
}

function getAuthors(json)
{
    let authors = "";

    for (var i = 0; i < json.author.length; ++i)
    {
        let author = json.author[i].given + " " + json.author[i].family + " ";
        console.log(author);
        authors += author;
    }

    console.log(json);
    console.log(authors);

    return authors;
}

export default function DOIAPI(props) {
  return (
    <div>
      {getAuthors(parseDOI('10.1145/2893185')[0])}
    </div>
  );
}