
window.onload = function()
{
    fetchHTML();
}

async function fetchHTML()
{
    const word = "discover";

    const parser = new DOMParser();
    const response = await fetch(`https://www.google.com/search?as_q=define+${word}&expnd=1&sa`);
    const text = await response.text();
    const doc = parser.parseFromString(text, 'text/html');

    constructData(doc);
}


function constructData(doc)
{
    let r5Nvmf = doc.querySelectorAll("[jsname='r5Nvmf']");
    const wordData = [];

    
    for (var i = 0; i < r5Nvmf.length; i++)
    {
        let partOfSpeech = r5Nvmf[i].querySelector("span.YrbPuc")?.textContent;

        let gskXhf = r5Nvmf[i].querySelectorAll("[jsname='gskXhf']");
        let r5Nvmf_object = [partOfSpeech];

        

        for (var j = 0; j < gskXhf.length; j++)
        {
            let definition = gskXhf[j].querySelector("div[data-dobid='dfn']").textContent;
            let example = gskXhf[j].querySelector(".ubHt5c")?.textContent || "";
            let synonyms = [];

            let similar = gskXhf[j].querySelector("div[jsname='deRYT']")?.querySelectorAll("[data-mh='-1']") || "";
            for (var l = 0; l < similar.length; l++)
            {
                synonyms.push(similar[l].textContent);
            }

            let gskXhf_object = 
            {
                definition: definition,
                example: example,
                synonyms: synonyms
            };

            r5Nvmf_object.push(gskXhf_object);
        }

        
        wordData.push(r5Nvmf_object);
    }

    console.log(wordData);
}
