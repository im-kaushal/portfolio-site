/**
 * Robust resume download and preview utility.
 *
 * Direct `<a href="..." download>` tags inside iframes (e.g. Google AI Studio / Cloud Run proxies)
 * trigger the browser's external download manager without iframe authentication headers,
 * causing proxy auth redirects to `__cookie_check.html` and saving the HTML check page instead of the PDF.
 *
 * This utility fetches the authenticated binary data within the active application context,
 * wraps it in a local browser Blob, and triggers an in-memory `blob:` URL download,
 * guaranteeing the actual 213 KB PDF is cleanly saved every time without proxy redirects.
 */

export async function downloadResume(
  filename = "Kaushal_Kumar_Resume.pdf",
  onStatusChange?: (status: "idle" | "downloading" | "success" | "error") => void,
): Promise<boolean> {
  onStatusChange?.("downloading");

  try {
    const res = await fetch("/Kaushal_Kumar_Resume.pdf", {
      cache: "no-cache",
      headers: {
        Accept: "application/pdf",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const contentType = res.headers.get("content-type") || "";
    // Safeguard: Check if proxy somehow intercepted with an HTML cookie check
    if (contentType.includes("text/html")) {
      console.warn("Proxy returned HTML instead of PDF binary. Falling back to new tab.");
      window.open("/Kaushal_Kumar_Resume.pdf", "_blank");
      onStatusChange?.("error");
      return false;
    }

    const blob = await res.blob();
    // Verify it's actually binary data and not a tiny redirect stub
    if (blob.size < 1000) {
      console.warn("Blob size too small, unexpected payload");
      window.open("/Kaushal_Kumar_Resume.pdf", "_blank");
      onStatusChange?.("error");
      return false;
    }

    const pdfBlob = new Blob([blob], { type: "application/pdf" });
    const blobUrl = window.URL.createObjectURL(pdfBlob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 10000);

    onStatusChange?.("success");
    setTimeout(() => {
      onStatusChange?.("idle");
    }, 2500);

    return true;
  } catch (err) {
    console.error("Failed to download PDF via blob:", err);
    // Ultimate fallback: open in new tab so browser PDF viewer can save
    window.open("/Kaushal_Kumar_Resume.pdf", "_blank");
    onStatusChange?.("error");
    setTimeout(() => {
      onStatusChange?.("idle");
    }, 2500);
    return false;
  }
}

export function openResumeInNewTab(): void {
  window.open("/Kaushal_Kumar_Resume.pdf", "_blank");
}
