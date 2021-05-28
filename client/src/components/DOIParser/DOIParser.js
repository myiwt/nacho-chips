const Cite = require('citation-js');
require('@citation-js/plugin-bibtex')

async function parseDOI(doi, callback){

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

module.exports = {
  parseDOI
};