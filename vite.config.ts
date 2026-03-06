import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-react-components/vite";
import AntdResolver from "unplugin-auto-import-antd";

export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      resolvers: [
        AntdResolver({
          prefix: "A",
        }),
      ],
      dts: "src/auto-imports.d.ts", // 指定生成 TS 声明
      dirs: ["src/hooks"],
      imports: ["react", "react-router-dom"],
    }),
    Components({
      rootDir: "src/components", // 替代 dirs
      dts: true, // 或者 { path: "..." }，但必须符合类型
      local: true, // 可选
      include: ["**/*.tsx", "**/*.ts"], // 匹配文件
      exclude: ["**/*.test.tsx"], // 排除文件
      resolvers: [], // 如果有自定义解析器
    }),
  ],

  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@mocks": path.resolve(__dirname, "./src/mocks"),
    },
  },

  server: {
    port: 5173,
    open: true,
    cors: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          redux: ["@reduxjs/toolkit", "react-redux"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
