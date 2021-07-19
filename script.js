// const url="https://type.fit/api/quotes";
const url="https://api.quotable.io/random";
let apiQuotes=[];

const loader=document.getElementById("loader");
const quoteContainer=document.getElementById("quote-container");
function loading()
{
    loader.hidden=false;
    quoteContainer.hidden=true;
}

function complete()
{
    loader.hidden=true;
    quoteContainer.hidden=false;
}

function showQuote()
{
    if(!apiQuotes.author)
    {
        document.getElementById("author").textContent="Unknown";
    }
    else
    {
        document.getElementById("author").textContent=apiQuotes.author;
    }
    if(apiQuotes.content.length>100)
    {
        document.getElementById("quote").classList.add("long-quote");
    }
    else
    {
        document.getElementById("quote").classList.remove("long-quote");
    }
    document.getElementById("quote").textContent=apiQuotes.content;
    
    complete();
}

function tweetQuote()
{
    const twitterUrl=`https://twitter.com/intent/tweet?text=${apiQuotes.content} - ${apiQuotes.author}`;
    window.open(twitterUrl,"_blank");
}

async function getQuotes()
{
    loading();
    try
    {
        let response=await fetch(url);
        apiQuotes=await response.json();
        showQuote();
    }
    catch(err)
    {
        console.log(err);
    }
}

document.getElementById("new-quote").addEventListener("click",function()
{
    getQuotes();
});

document.getElementById("twitter").addEventListener("click",function()
{
    tweetQuote();
});

getQuotes();
