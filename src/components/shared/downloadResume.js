export async function downloadFile(url, filename) {
    const resp = await fetch(url, { credentials: "same-origin" });
    if (!resp.ok) throw new Error(`Failed to fetch file: ${resp.status}`);
    
    const blob = await resp.blob();
    const blobURL = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = blobURL;
    a.download = filename || "file.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blobURL);
  }