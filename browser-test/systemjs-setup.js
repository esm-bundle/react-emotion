const importMap = {
  imports: {
    react:
      "//unpkg.com/@esm-bundle/react@16.13.1/system/react.production.min.js",
    emotion: `//cdn.jsdelivr.net/npm/@esm-bundle/emotion@9.2.12/system/emotion.min.js`,
  },
};

document.head.appendChild(
  Object.assign(document.createElement("script"), {
    type: "systemjs-importmap",
    textContent: JSON.stringify(importMap),
  })
);
