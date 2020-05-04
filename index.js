
function formatQueryParams(params){
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');

}



function displayResults(responseJson,searchNum){
    console.log(responseJson);
    $('#result-list').empty();

    for(let i = 0; i<responseJson.data.length & i<searchNum; i++){
        $('#result-list').append(
            `<li><h2>${responseJson.data[i].name}</h2>
            <a href ="${responseJson.data[i].url}">Link to Website
            </a><br>
            <p>${responseJson.data[i].description}</p>
            </li>`);
    
    }

}


function getPark(baseUrl,searchTerm,searchNum,apiKey){

    const params ={
        stateCode: searchTerm,
        limit: searchNum
    }

    const queryString = formatQueryParams(params);
    const url = baseUrl + '?' + queryString + '&api_key=' + apiKey;

    fetch(url)
    .then(response => {if(response.ok){
        return response.json();
    } throw new Error(response.statusText);
})
    .then(responseJson => displayResults(responseJson,searchNum))
    .catch(error => alert('Try Again'));
    
};



function submit(){
    $('form').submit( event => {
        event.preventDefault();
        const baseUrl = 'https://developer.nps.gov/api/v1/parks'
        const searchTerm = $('#js-parks').val().split(",");
        const searchNum = $('#quantity').val();
        const apiKey = 'aBZbhtdhn97CEObCBWlJVvbavQsQlbY7xYcPFVcr'
        getPark(baseUrl,searchTerm,searchNum,apiKey);
    });
}


$(function(){
    console.log('App is working');
    submit();

});