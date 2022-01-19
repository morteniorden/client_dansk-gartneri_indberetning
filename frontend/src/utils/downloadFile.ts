function base64ToArrayBuffer(base64: string) {
  const binaryString = window.atob(base64);
  const binaryLen = binaryString.length;
  const bytes = new Uint8Array(binaryLen);
  for (let i = 0; i < binaryLen; i++) {
    const ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
}

export const downloadFile = (blob: Blob, fileName: string): void => {
  const file = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = file;
  a.download = fileName;
  document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
  a.click();
  a.remove(); //afterwards we remove the element again
};

export const downloadStringDataFile = (data: string, fileName: string): void => {
  downloadFile(new Blob([base64ToArrayBuffer(data)]), fileName);
};
