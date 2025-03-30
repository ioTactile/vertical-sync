import parse from "html-react-parser";
import DOMPurify from "dompurify";

export const sanitizeHtml = (data: string) => {
  if (typeof window === "undefined") {
    return parse(data);
  }

  return parse(DOMPurify.sanitize(data));
};
