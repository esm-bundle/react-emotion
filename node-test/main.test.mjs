describe("@esm-bundle/react-emotion", () => {
  it("can load the esm bundle without dying", () => import("../esm/index.js"));
  it("can create styled components", async () => {
    const { default: styled } = await import("../esm/index.js");
    expect(styled).not.to.equal(undefined);
    const Button = styled("button")`
      color: turquoise;
    `;
    expect(Button).not.to.equal(undefined);
  });
});
