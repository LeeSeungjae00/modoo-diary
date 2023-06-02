export default function dataURItoBlob(dataURI: string) {
  let byteString = Buffer.from(dataURI.split(",")[1], "base64").toString(
    "binary"
  );
  let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  let bb = new Blob([ab], { type: mimeString });
  return bb;
}
