import React, { useState, useMemo } from "react";
import folderData from "../../static/folder_structure.json";

function escapeRegExp(string) {
    // Escape all regex-special characters (Or else the page will crash on special chars)
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text, query) {
    if (!query) return text;

    const safeQuery = escapeRegExp(query);
    const regex = new RegExp(`(${safeQuery})`, "gi");

    const parts = text.split(regex);
    return parts.map((part, i) =>
        regex.test(part) ? <mark key={i}>{part}</mark> : part
    );
}

/**
 * Compare two names ignoring case and punctuation.
 */
function normalizeName(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/gi, "");
}

/**
 * Find a node based on a query like "rpgcreator.ui/assets"
 * Works for flattened prefixes (e.g., "RPGCreator.UI") + real subfolders.
 */
function findNodeBySmartPath(node, path) {
    if (!path) return node;
    const segments = path
        .split(/[\\/]+/) // only split on / or \
        .map((s) => s.trim())
        .filter(Boolean);

    if (segments.length === 0) return node;

    let current = node;
    for (let i = 0; i < segments.length; i++) {
        const segment = normalizeName(segments[i]);
        if (!current.children) return null;

        // Find child whose normalized name includes the segment (handles dots and casing)
        const found = current.children.find(
            (child) => normalizeName(child.name).includes(segment)
        );

        if (!found) return null;
        current = found;
    }
    return current;
}

/**
 * Fallback simple keyword search (keeps children).
 */
function filterTree(node, query) {
    if (!query) return node;

    const normalizedQuery = normalizeName(query);

    const matches = (text) =>
        text && normalizeName(text).includes(normalizedQuery);

    const selfMatch =
        matches(node.name) || (node.description && matches(node.description));

    if (selfMatch) return node;

    if (!node.children || node.children.length === 0) return null;

    const filteredChildren = node.children
        .map((child) => filterTree(child, query))
        .filter(Boolean);

    if (filteredChildren.length > 0) return { ...node, children: filteredChildren };

    return null;
}

function TreeNode({ node, query }) {
    const [open, setOpen] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <li>
            <div
                className="tree-item"
                onClick={() => hasChildren && setOpen(!open)}
                style={{
                    cursor: hasChildren ? "pointer" : "default",
                    userSelect: "none",
                }}
            >
                {hasChildren && (
                    <span
                        style={{
                            display: "inline-block",
                            width: "1em",
                            textAlign: "center",
                            marginRight: "0.3em",
                            fontWeight: "bold",
                        }}
                    >
            {open ? "▼" : "▶"}
          </span>
                )}
                <b>/{highlightText(node.name, query)}</b>
                {node.description && (
                    <span> — {highlightText(node.description, query)}</span>
                )}
            </div>

            {hasChildren && open && (
                <ul>
                    {node.children.map((child, i) => (
                        <TreeNode key={i} node={child} query={query} />
                    ))}
                </ul>
            )}
        </li>
    );
}

export default function FolderHierarchy() {
    const [query, setQuery] = useState("");

    const filteredData = useMemo(() => {
        if (!query) return folderData;

        // Try to resolve the path
        const node = findNodeBySmartPath(folderData, query);
        if (node) return node;

        // Otherwise fallback to normal search
        const result = filterTree(folderData, query);
        return result || null;
    }, [query]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search folder or path (e.g. rpgcreator.ui/assets)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                    marginBottom: "0.8em",
                    padding: "6px 10px",
                    width: "100%",
                    maxWidth: "400px",
                    border: "1px solid var(--ifm-color-emphasis-300)",
                    borderRadius: "6px",
                    background: "var(--ifm-background-surface-color)",
                    color: "var(--ifm-font-color-base)",
                }}
            />

            {filteredData ? (
                <div className="tree">
                    <ul>
                        <TreeNode node={filteredData} query={query} />
                    </ul>
                </div>
            ) : (
                <p>No results found for "{query}".</p>
            )}
        </div>
    );
}
