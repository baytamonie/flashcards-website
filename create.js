const answerContainer = document.getElementById('answer');
const answerTextarea = document.getElementById('answerTextarea');
const typeSelect = document.getElementById('type');

const codeMirror = CodeMirror(answerContainer, {
    lineNumbers: true,
    mode: 'text',
});

codeMirror.on('change', () => {
    answerTextarea.value = codeMirror.getValue();
});

typeSelect.addEventListener('change', (e) => {
    const selectedType = e.target.value;
    if (selectedType === 'code') {
        codeMirror.setOption('mode', 'javascript');
    } else {
        codeMirror.setOption('mode', 'text');
    }
});
