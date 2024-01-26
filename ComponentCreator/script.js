function runCode() {
    var htmlCode = document.getElementById("htmlEditor").value;
    var cssCode = "<style>" + document.getElementById("cssEditor").value + "</style>";
    var jsCode = "<script>" + document.getElementById("jsEditor").value + "</script>";
    var frame = document.getElementById("output").contentWindow.document;
    frame.open();
    frame.write(htmlCode + cssCode + jsCode);
    frame.close();
}