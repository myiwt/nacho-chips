const Cite = require('citation-js');
require('@citation-js/plugin-bibtex')

export async function parseBibTex(bibtex, callback){

    var reader = new FileReader();    

    reader.onload = async function(){
        const result = new Cite(reader.result);

        if(result != null && result.get().length > 0)
        {
            return result;
        }
    };

    try {
        reader.readAsText(bibtex);
    }
    catch (error)
    {
        return null;
    }
}
