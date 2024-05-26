// Initialize CodeMirror on the textarea
const editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    lineNumbers: true,
    mode: 'python',
    theme: 'monokai',
    matchBrackets: true
});

function runCode() {
    const code = editor.getValue(); // Use CodeMirror's getValue method to get the code

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
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('output').innerText = 'An error occurred: ' + error;
    });
}
