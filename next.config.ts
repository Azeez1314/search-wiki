import assert from "node:assert";
import { dirname } from "node:path";
import type { NextConfig } from "next";

assert(process.env.BLOB_BASE_URL, "you must have defined BLOB_BASE_URL");

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${process.env.BLOB_BASE_URL}/**`)],
  },
  turbopack: {
    root: dirname(__filename),
  },
};

export default nextConfig;
