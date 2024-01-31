function runCode() {
    const htmlCode = document.getElementById("htmlEditor").value;
    const cssCode = "<style>" + document.getElementById("cssEditor").value + "</style>";
    const jsCode = "<script>" + document.getElementById("jsEditor").value + "</script>";
    const frame = document.getElementById("output").contentWindow.document;
    frame.open();
    frame.write(htmlCode + cssCode + jsCode);
    frame.close();

    console.log(inlineCode())
}

document.querySelectorAll('textarea').forEach((el) => {
    el.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;

            // set textarea value to: text before caret + tab + text after caret
            this.value = this.value.substring(0, start) +
                "    " + this.value.substring(end);

            // put caret at right position again
            this.selectionStart =
                this.selectionEnd = start + 4;
        }
    });

    /*el.addEventListener('input', function(e) {
        const cursorPosition = el.selectionStart;
        const textBeforeCursor = el.value.substr(0, cursorPosition);
        const textAfterCursor = el.value.substr(cursorPosition);

        // Check if user types `${}`
        if (textBeforeCursor.endsWith("${") && textAfterCursor.startsWith("}")) {
            // Remove `${}` from textarea
            el.value = textBeforeCursor.slice(0, -2) + textAfterCursor.substring(1);

            // Create a new div
            const specialDiv = document.createElement('div');
            specialDiv.contentEditable = true; // Make it editable
            specialDiv.style.backgroundColor = 'blue';
            specialDiv.style.borderRadius = '3px';
            specialDiv.style.padding = '5px';
            specialDiv.style.display = 'inline-block'; // Inline display
            specialDiv.style.margin = '0 5px'; // Margin for spacing

            // Insert text inside the div
            specialDiv.textContent = 'Editable Text';

            // Add functionality to delete the div
            specialDiv.addEventListener('keydown', function(event) {
                if (event.key === 'Backspace' && specialDiv.textContent === '') {
                    specialDiv.remove();
                }
            });

            // Insert the div at cursor position
            insertAtCursor(el, specialDiv.outerHTML);
        }
    });*/
});

function inlineCode() {
    const htmlCode = document.getElementById("htmlEditor").value;
    const cssCode = document.getElementById("cssEditor").value;
    const jsCode = document.getElementById("jsEditor").value;

    // Creating a new DOM parser and parsing the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');

    // Creating a style element and setting its content
    const styleEl = document.createElement('style');
    styleEl.innerHTML = cssCode;

    // Appending the style to the head of the parsed document
    doc.head.appendChild(styleEl);

    // Creating a script element and setting its content
    const scriptEl = document.createElement('script');
    scriptEl.innerHTML = jsCode;

    // Appending the script to the body of the parsed document
    doc.body.appendChild(scriptEl);

    // Serializing the document back to HTML
    const serializer = new XMLSerializer();
    return serializer.serializeToString(doc);
}

function insertAtCursor(editor, html) {
    editor.focus();
    if (!editor.setRangeText) {
        // Fallback for browsers not supporting setRangeText
        editor.value += html;
        return;
    }
    const startPos = editor.selectionStart;
    const endPos = editor.selectionEnd;

    editor.setRangeText(html);
    editor.selectionStart = editor.selectionEnd = startPos + html.length;
}