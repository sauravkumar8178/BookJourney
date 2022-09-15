async function button() {
    let [fileHandle] = await window.showOpenFilePicker();
    let fileData = await fileHandle.getFile();
}