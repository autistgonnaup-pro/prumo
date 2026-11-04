{
  "cwd": "C:\\Users\\xAgron\\Documents\\prumo",
  "command": "Get-ChildItem -Recurse -Force | Where-Object { $_.FullName -notlike '*\\node_modules\\*' -and $_.FullName -notlike '*\\node_modules' }",
  "project": {
    "name": "prumo",
    "root": "C:\\Users\\xAgron\\Documents\\prumo",
    "type": "Vite + React (JSX)",
    "git": {
      "branch": "main",
      "remotes": ["origin/main"],
      "headFile": ".git/HEAD",
      "lastCommitFile": ".git/COMMIT_EDITMSG"
    }
  },
  "rootFiles": [
    { "name": ".env.local", "length": 136, "lastWriteTime": "02/11/2026 23:37", "type": "file" },
    { "name": ".gitignore", "length": 277, "lastWriteTime": "02/11/2026 23:32", "type": "file" },
    { "name": "eslint.config.js", "length": 589, "lastWriteTime": "02/11/2026 23:32", "type": "file" },
    { "name": "index.html", "length": 370, "lastWriteTime": "02/11/2026 23:32", "type": "file" },
    { "name": "package-lock.json", "length": 91238, "lastWriteTime": "02/11/2026 23:36", "type": "file" },
    { "name": "package.json", "length": 671, "lastWriteTime": "02/11/2026 23:36", "type": "file" },
    { "name": "README.md", "length": 4001, "lastWriteTime": "02/11/2026 23:32", "type": "file" },
    { "name": "vite.config.js", "length": 185, "lastWriteTime": "02/11/2026 23:35", "type": "file" }
  ],
  "directories": {
    ".git": {
      "type": "dir",
      "hidden": true,
      "children": [
        "hooks", "info", "logs", "objects", "refs",
        "COMMIT_EDITMSG", "config", "description", "FETCH_HEAD", "HEAD", "index", "ORIG_HEAD"
      ]
    },
    ".github": {
      "type": "dir",
      "children": {
        "workflows": {
          "type": "dir",
          "files": [
            { "name": "deploy.yml", "length": 1139, "lastWriteTime": "02/11/2026 23:43" }
          ]
        }
      }
    },
    "dist": {
      "type": "dir",
      "children": {
        "assets": {
          "type": "dir",
          "files": [
            { "name": "index-B4Xyj1TO.js", "length": 434561, "lastWriteTime": "02/11/2026 23:43" },
            { "name": "index-nqMpL4T3.css", "length": 1788, "lastWriteTime": "02/11/2026 23:43" }
          ]
        },
        "files": [
          { "name": "favicon.svg", "length": 9522, "lastWriteTime": "02/11/2026 23:32" },
          { "name": "icons.svg", "length": 5055, "lastWriteTime": "02/11/2026 23:32" },
          { "name": "index.html", "length": 486, "lastWriteTime": "02/11/2026 23:43" }
        ]
      }
    },
    "public": {
      "type": "dir",
      "files": [
        { "name": "favicon.svg", "length": 9522, "lastWriteTime": "02/11/2026 23:32" },
        { "name": "icons.svg", "length": 5055, "lastWriteTime": "02/11/2026 23:32" }
      ]
    },
    "src": {
      "type": "dir",
      "children": {
        "assets": {
          "type": "dir",
          "files": [
            { "name": "hero.png", "length": 13057, "lastWriteTime": "02/11/2026 23:32" },
            { "name": "react.svg", "length": 4126, "lastWriteTime": "02/11/2026 23:32" },
            { "name": "vite.svg", "length": 8710, "lastWriteTime": "02/11/2026 23:32" }
          ]
        },
        "lib": {
          "type": "dir",
          "files": [
            { "name": "supabase.js", "length": 430, "lastWriteTime": "02/11/2026 23:38" }
          ]
        }
      },
      "files": [
        { "name": "App.css", "length": 3075, "lastWriteTime": "02/11/2026 23:32" },
        { "name": "App.jsx", "length": 368, "lastWriteTime": "02/11/2026 23:39" },
        { "name": "index.css", "length": 2280, "lastWriteTime": "02/11/2026 23:32" },
        { "name": "main.jsx", "length": 239, "lastWriteTime": "02/11/2026 23:32" }
      ]
    }
  },
  "summary": {
    "totalRootFiles": 8,
    "totalTrackedTopLevelDirs": [".git", ".github", "dist", "public", "src"],
    "buildOutput": {
      "dir": "dist",
      "jsBundle": "assets/index-B4Xyj1TO.js",
      "cssBundle": "assets/index-nqMpL4T3.css"
    },
    "notes": [
      "node_modules foi explicitamente excluído do listamento",
      "Projeto usa Supabase (src/lib/supabase.js)",
      "Deploy via GitHub Actions (.github/workflows/deploy.yml)"
    ]
  }
}