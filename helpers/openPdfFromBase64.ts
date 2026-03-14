export function openPdfFromBase64(base64: string, fileName = "document.pdf") {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: "application/pdf" });
  const blobUrl = URL.createObjectURL(blob);

  // создаём ссылку для скачивания
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = fileName;

  // эмулируем клик — браузер начнёт скачивание
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // очищаем память
  URL.revokeObjectURL(blobUrl);
}
