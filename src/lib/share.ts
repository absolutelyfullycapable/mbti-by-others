/** 네이티브 공유 시트(카톡·문자 등). 미지원·실패 시 URL 복사로 대체. */
export async function shareOrCopy(opts: {
  title: string;
  text?: string;
  url: string;
}): Promise<"shared" | "copied" | "aborted"> {
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({
        title: opts.title,
        text: opts.text,
        url: opts.url,
      });
      return "shared";
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return "aborted";
      }
      // fall through
    }
  }

  await navigator.clipboard.writeText(opts.url);
  return "copied";
}
