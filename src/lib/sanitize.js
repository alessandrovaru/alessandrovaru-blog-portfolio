import sanitizeHtml from "sanitize-html";

// El contenido de mandalas y mixtapes se guarda como texto con <br />.
// Solo se permiten etiquetas de formato en línea (se renderiza dentro de un
// <p>, así que no se aceptan bloques); todo lo demás se elimina.
const options = {
  allowedTags: ["br", "b", "strong", "i", "em", "u", "a", "span"],
  allowedAttributes: { a: ["href", "target", "rel"] },
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }),
  },
};

export function sanitizeContent(html = "") {
  return sanitizeHtml(html, options);
}

// Texto plano para meta descriptions.
export function toPlainText(html = "", maxLength = 160) {
  const text = sanitizeHtml(html.replace(/<br\s*\/?>/gi, " "), { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLength ? `${text.slice(0, maxLength - 1).trimEnd()}…` : text;
}
