"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, File as FileIcon, Folder, FolderOpen } from "lucide-react";
import { INITIAL_TREE, N, fileColor, type TreeNode } from "./demo-data";

function cloneTree(nodes: TreeNode[]): TreeNode[] {
  return nodes.map((n) => ({
    ...n,
    children: n.children ? cloneTree(n.children) : undefined,
  }));
}

export function FileTree({
  onOpenFile,
  activePath,
}: {
  onOpenFile: (node: TreeNode) => void;
  activePath: string | null;
}) {
  const [tree, setTree] = useState<TreeNode[]>(() => cloneTree(INITIAL_TREE));

  function toggleDir(path: string) {
    setTree((prev) => {
      const next = cloneTree(prev);
      const walk = (nodes: TreeNode[]): boolean => {
        for (const n of nodes) {
          if (n.path === path) {
            n.open = !n.open;
            return true;
          }
          if (n.children && walk(n.children)) return true;
        }
        return false;
      };
      walk(next);
      return next;
    });
  }

  const render = (nodes: TreeNode[], depth: number): React.ReactNode =>
    nodes.map((node) => {
      const isActive = node.type === "file" && node.path === activePath;
      return (
        <div key={node.path}>
          <button
            onClick={() =>
              node.type === "dir" ? toggleDir(node.path) : onOpenFile(node)
            }
            className="group flex w-full items-center gap-1.5 py-1 pr-2 text-left text-[13px] transition-colors"
            style={{
              paddingLeft: 8 + depth * 14,
              color: isActive ? N.fg : N.mutedFg,
              background: isActive ? N.hover : "transparent",
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.background = "transparent";
            }}
          >
            {node.type === "dir" ? (
              <>
                {node.open ? (
                  <ChevronDown className="size-3.5 shrink-0 opacity-70" />
                ) : (
                  <ChevronRight className="size-3.5 shrink-0 opacity-70" />
                )}
                {node.open ? (
                  <FolderOpen className="size-4 shrink-0" style={{ color: N.blue }} />
                ) : (
                  <Folder className="size-4 shrink-0" style={{ color: N.blue }} />
                )}
              </>
            ) : (
              <>
                <span className="w-3.5 shrink-0" />
                <FileIcon className="size-4 shrink-0" style={{ color: fileColor(node.name) }} />
              </>
            )}
            <span className="truncate">{node.name}</span>
            {node.modified && (
              <span
                className="ml-auto shrink-0 font-mono text-[10px]"
                style={{ color: N.yellow }}
                title="Modified"
              >
                M
              </span>
            )}
          </button>
          {node.type === "dir" && node.open && node.children && node.children.length > 0 && (
            <div>{render(node.children, depth + 1)}</div>
          )}
        </div>
      );
    });

  return <div className="py-1.5">{render(tree, 0)}</div>;
}
