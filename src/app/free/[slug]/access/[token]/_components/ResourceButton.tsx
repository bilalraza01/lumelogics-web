import { Download, ExternalLink } from "lucide-react";

interface Props {
  /** From the API: true → force download, false → open in a new tab. */
  download: boolean;
  url: string;
  label?: string;
}

export function ResourceButton({
  download,
  url,
  label = "Get Your FREE Resource",
}: Props) {
  // PDF / Other file → the backend download endpoint streams the file with
  // Content-Disposition: attachment, so a plain navigation triggers the
  // download (works cross-origin, unlike the <a download> hint).
  // Google Doc / Sheet / external link → open in a new tab.
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md bg-brand-500 px-7 py-4 text-[17px] font-semibold text-white shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_8px_24px_-12px_rgba(124,58,237,0.6)] transition-colors hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  if (download) {
    return (
      <a href={url} className={base}>
        <Download size={18} />
        {label}
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={base}
    >
      <ExternalLink size={18} />
      {label}
    </a>
  );
}
