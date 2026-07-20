import { readdir, stat } from "fs/promises";
import path from "path";
import { siteUrl } from "./site-config";

const APP_DIR = path.join(process.cwd(), "app");
const CMS_API_BASE_URL =
  process.env.NEXT_PUBLIC_OWNHOLIDAYCLUB_BACKEND_URL || "http://localhost:8081";
const PAGE_FILE_NAMES = new Set([
  "page.js",
  "page.jsx",
  "page.ts",
  "page.tsx",
]);
const EXCLUDED_ROUTES = new Set(["/profile"]);
const DYNAMIC_SEGMENT_PATTERN = /^\[.*\]$/;
const ROUTE_GROUP_PATTERN = /^\(.*\)$/;
const CMS_ROUTE_DEFINITIONS = [
  {
    key: "blogposts",
    routePrefix: "/blog",
    resolveSlug: (item) => slugifyValue(item?.id || item?.title),
  },
  {
    key: "destinations",
    routePrefix: "/destinations",
    resolveSlug: (item) => slugifyValue(item?.id || item?.name),
  },
  {
    key: "services",
    routePrefix: "/services",
    resolveSlug: (item) => slugifyValue(item?.id || item?.title),
  },
];

function slugifyValue(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function joinRoute(segments) {
  return segments.length === 0 ? "/" : `/${segments.join("/")}`;
}

function formatLabelSegment(segment) {
  if (segment === "terms&conditions") {
    return "Terms & Conditions";
  }

  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildRouteLabel(route) {
  if (route === "/") {
    return "Home";
  }

  return route
    .split("/")
    .filter(Boolean)
    .map(formatLabelSegment)
    .join(" / ");
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function normalizeDate(value, fallback = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date;
}

function getRouteChangeFrequency() {
  return "weekly";
}

function getRoutePriority(route) {
  if (route === "/") {
    return 1;
  }

  if (route.startsWith("/blog/")) {
    return 0.7;
  }

  return 0.8;
}

async function getFileTimestamp(filePath) {
  const fileStats = await stat(filePath);
  return fileStats.mtime;
}

async function fetchHomepageEntries() {
  try {
    const response = await fetch(
      `${CMS_API_BASE_URL}/api/cms/entries?collection=homepage`,
      {
        next: { revalidate: 3600 },
      },
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data?.message || `Failed to fetch homepage entries (${response.status}).`,
      );
    }

    return Array.isArray(data?.entries) ? data.entries : [];
  } catch (error) {
    console.error("Failed to build dynamic sitemap routes:", error);
    return [];
  }
}

async function collectStaticRoutes(dirPath, urlSegments = [], hasDynamic = false) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const routes = [];
  const pageEntry = entries.find(
    (entry) => entry.isFile() && PAGE_FILE_NAMES.has(entry.name),
  );

  if (pageEntry && !hasDynamic) {
    const route = joinRoute(urlSegments);

    if (!EXCLUDED_ROUTES.has(route)) {
      routes.push({
        route,
        label: buildRouteLabel(route),
        lastModified: await getFileTimestamp(path.join(dirPath, pageEntry.name)),
        changeFrequency: getRouteChangeFrequency(route),
        priority: getRoutePriority(route),
      });
    }
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    if (entry.name === "api" || entry.name.startsWith("@")) {
      continue;
    }

    const isRouteGroup = ROUTE_GROUP_PATTERN.test(entry.name);
    const isDynamicSegment = DYNAMIC_SEGMENT_PATTERN.test(entry.name);
    const nextUrlSegments = isRouteGroup
      ? urlSegments
      : [...urlSegments, entry.name];

    routes.push(
      ...(await collectStaticRoutes(
        path.join(dirPath, entry.name),
        nextUrlSegments,
        hasDynamic || isDynamicSegment,
      )),
    );
  }

  return routes;
}

async function collectDynamicRoutes() {
  const homepageEntries = await fetchHomepageEntries();
  const entriesByKey = new Map(
    homepageEntries.map((entry) => [entry?.key, entry]),
  );
  const routes = [];

  for (const definition of CMS_ROUTE_DEFINITIONS) {
    const entry = entriesByKey.get(definition.key);
    const items = Array.isArray(entry?.data) ? entry.data : [];
    const lastModified = normalizeDate(entry?.updatedAt);

    for (const item of items) {
      const slug = definition.resolveSlug(item);

      if (!slug) {
        continue;
      }

      const route = `${definition.routePrefix}/${slug}`;

      if (EXCLUDED_ROUTES.has(route)) {
        continue;
      }

      routes.push({
        route,
        label: buildRouteLabel(route),
        lastModified,
        changeFrequency: getRouteChangeFrequency(route),
        priority: getRoutePriority(route),
      });
    }
  }

  return routes;
}

export async function getSitemapRoutes() {
  const [staticRoutes, dynamicRoutes] = await Promise.all([
    collectStaticRoutes(APP_DIR),
    collectDynamicRoutes(),
  ]);
  const routeMap = new Map();

  for (const entry of [...staticRoutes, ...dynamicRoutes]) {
    if (!routeMap.has(entry.route)) {
      routeMap.set(entry.route, entry);
    }
  }

  return [...routeMap.values()].sort((left, right) =>
    left.route.localeCompare(right.route),
  );
}

export async function getXmlSitemapEntries() {
  const routes = await getSitemapRoutes();

  return routes.map((entry) => ({
    url: escapeXml(`${siteUrl}${entry.route}`),
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
