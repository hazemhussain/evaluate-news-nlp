function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)
    const text = formText;

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/sentiment',{
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            },
            body:JSON.stringify({text})
            
    })
    .then(res => res.json())
    .then(function(res) {
        console.log(res)
        document.getElementById('agreement').innerHTML = `Agreement: ${res.agreement}`;
        document.getElementById('confidence').innerHTML = `Confidence: ${res.confidence}`;
        document.getElementById('subjectivity').innerHTML = `Subjectivity ${res.subjectivity}`;
        document.getElementById('irony').innerHTML = `Irony: ${res.irony}`;
        document.getElementById('scoretag').innerHTML = `Score: ${res.score_tag}`;
        
    })

}

export { handleSubmit }