describe("@esm-bundle/react-emotion", () => {
  it("can load the ESM bundle", () => {
    return import("/base/esm/index.resolved.js");
  });

  it("can load the System.register bundle", () => {
    return System.import("/base/system/index.js");
  });

  it("System.register development bundle can be used", () => {
    return System.import("/base/system/index.js").then((module) => {
      const { default: styled } = module;
      expect(styled).toBeDefined();
      // Default export
      expect(typeof styled).toBe("function");
      // Works without error
      const Button = styled("button")`
        color: turquoise;
      `;
      expect(Button).toBeDefined();
    });
  });

  it("System.register production bundle can be used", () => {
    return System.import("/base/system/index.min.js").then((module) => {
      const { default: styled } = module;
      expect(styled).toBeDefined();
      // Default export
      expect(typeof styled).toBe("function");
      // Works without error
      const Button = styled("button")`
        color: turquoise;
      `;
      expect(Button).toBeDefined();
    });
  });
});
