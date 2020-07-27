import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";

const REACT_VERSION = `16.13.1`;

function createConfig(format, options = {}) {
  const dir = format === "module" ? "esm" : format;
  const { resolved = false, min = false } = options;
  return {
    input: require.resolve("react-emotion/dist/index.esm"),
    output: {
      file: `${dir}/index${resolved ? ".resolved" : ""}${min ? ".min" : ""}.js`,
      sourcemap: true,
      format,
      paths: {
        react: resolved
          ? `//cdn.jsdelivr.net/npm/@esm-bundle/react@${REACT_VERSION}/esm/react.production.min.js`
          : "react",
        emotion: resolved
          ? `//cdn.jsdelivr.net/npm/@esm-bundle/emotion@9.2.12/esm/emotion.min.js`
          : "emotion",
      },
      exports: "named",
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      replace({
        values: {
          "process.env.NODE_ENV": JSON.stringify(
            min || resolved ? "production" : "development"
          ),
        },
      }),
      min && terser(),
    ],
    external: ["react", "emotion"],
  };
}

export default [
  createConfig("module"),
  createConfig("module", { min: true }),
  createConfig("module", { resolved: true }),
  createConfig("system"),
  createConfig("system", { min: true }),
];
