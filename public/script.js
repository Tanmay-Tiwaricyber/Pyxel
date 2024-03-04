function runCode() {
    const code = document.getElementById('code').value;
    // const input = document.getElementById('input').value;

    fetch('/runcode', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: code
    })
    .then(response => response.text())
    .then(result => {
        document.getElementById('output').innerText = result;
    });
}
