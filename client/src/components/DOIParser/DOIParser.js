const Cite = require('citation-js');
require('@citation-js/plugin-bibtex')



function getAuthors(json)
{
    let authors = "";

    for (var i = 0; i < json.length; ++i)
    {
        let author = json[i].given + " " + json[i].family;
        if((json.length - 1) !== i){
            author += " ";
        }
        authors += author;
    }

    return authors;
}

export async function parseDOI(doi, callback){

    const options = {
        type: 'string',
        style: 'bibtex'
    };

    try {
        const example = await Cite.async(doi,options);
        return example;
    }
    catch (error)
    {
        return null;
    }
}

export const buildEvidenceFromDOI = (result) => {
    const evidence = {};

    evidence.title = result[0].title;
    evidence.author = getAuthors(result[0].author);
    evidence.year = result[0].issued['date-parts'][0][0];
    evidence.journal = result[0]['container-title'];
    evidence.volume = result[0].volume;
    evidence.url = decodeURIComponent(result[0].URL).replace(/[^a-zA-Z0-9-_/:.-]/g, '');
    evidence.doi = result[0].DOI;

    return evidence;
};
