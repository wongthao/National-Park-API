
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




function getPark(searchTerm,searchNum){
    let parkUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${searchTerm}&limit=${searchNum}&API_KEY=aBZbhtdhn97CEObCBWlJVvbavQsQlbY7xYcPFVcr`;

    fetch(parkUrl)
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
        let searchTerm = $('#js-parks').val();
        let searchNum = $('#quantity').val();
        getPark(searchTerm,searchNum);
    });
}


$(function(){
    console.log('App is working');
    submit();

});