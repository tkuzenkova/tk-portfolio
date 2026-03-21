# MCP Setup Guide: Figma, Jira & GitHub for Claude Code

This guide describes how to connect Figma, Jira and GitHub to Claude Code via MCP (Model Context Protocol), so Claude can read your Figma designs, Jira tickets and GitHub repositories directly.

## Prerequisites

- [Claude Code](https://claude.ai/download) installed and working 
- `uvx` installed (for Jira). If not installed, run: `pip install uv`
- `gh` CLI installed (for GitHub). Install from: [https://cli.github.com/](https://cli.github.com/)

---

## 1. Figma MCP Setup

We use [figma-developer-mcp](https://www.npmjs.com/package/figma-developer-mcp) with a Personal Access Token. This approach is stable and doesn't require re-authentication.

### Step 1: Generate Figma Personal Access Token

1. Open Figma (web or desktop)
2. Click your **profile avatar** in the top-left corner
3. Select **Settings**
4. In the Settings modal, go to the **Security** tab
5. Scroll down to **Personal access tokens**
6. Click **Generate new token**
7. Give it a name (e.g. `claude-code`) and click **Generate**
8. **Copy the token immediately** — you won't be able to see it again

Direct link (if you're already logged in): [https://www.figma.com/settings](https://www.figma.com/settings) — then navigate to the **Security** tab.

### Step 2: Add Figma MCP to Claude Code

Run in terminal:

```bash
claude mcp add figma --scope user -e FIGMA_API_KEY=YOUR_TOKEN -- npx -y figma-developer-mcp --stdio
```

Replace `YOUR_TOKEN` with the token you copied in Step 1.

The `--scope user` flag makes this available across all your projects (not just the current one).

### Step 3: Verify

1. Restart Claude Code
2. Type `/mcp` and press Enter
3. `figma` should show **connected**

### Usage

Share a Figma link with Claude, and it will be able to read the design data:

```
Look at this Figma page and describe the layout:
https://www.figma.com/design/FILE_KEY/File-Name?node-id=123-456
```

---

## 2. Jira MCP Setup

We use [mcp-atlassian](https://github.com/sooperset/mcp-atlassian) with a Jira API Token. This is more reliable than the official Atlassian MCP, which requires frequent re-authentication (every 10-60 minutes).

### Step 1: Generate Jira API Token

1. Go to: [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Click **Create API token**
3. Enter a label (e.g. `claude-code`) and click **Create**
4. **Copy the token** — you won't be able to see it again

### Step 2: Add Jira MCP to Claude Code

Run in terminal:

```bash
claude mcp add jira --scope user \
  -e JIRA_URL=https://wrangler-ai.atlassian.net \
  -e JIRA_USERNAME=YOUR_EMAIL \
  -e JIRA_API_TOKEN=YOUR_TOKEN \
  -- uvx mcp-atlassian \
  --jira-url https://wrangler-ai.atlassian.net \
  --jira-username YOUR_EMAIL \
  --jira-token YOUR_TOKEN
```

Replace:

- `YOUR_EMAIL` — your Atlassian account email (e.g. `john@company.com`)
- `YOUR_TOKEN` — the API token you copied in Step 1

> **Note:** The CLI argument is `--jira-token` (not `--jira-api-token`).

### Step 3: Verify

1. Restart Claude Code
2. Type `/mcp` and press Enter
3. `jira` should show **connected**

### Usage

Ask Claude to read any Jira ticket:

```
Read the Jira ticket WEBAPP-43 and summarize the requirements.
```

Or provide a link:

```
What's the status of https://wrangler-ai.atlassian.net/browse/WEBAPP-43?
```

---

## 3. GitHub MCP Setup

We use the [GitHub Copilot MCP endpoint](https://api.githubcopilot.com/mcp/) with a Personal Access Token. The built-in `plugin:github:github` has a known authentication bug ([issue #283](https://github.com/anthropics/claude-plugins-official/issues/283)), so we configure GitHub MCP manually.

### Step 1: Generate GitHub Personal Access Token

1. Go to: [https://github.com/settings/tokens/new](https://github.com/settings/tokens/new)
2. Enter a note (e.g. `claude-code`)
3. Select scope: **repo** (minimum)
4. Click **Generate token**
5. **Copy the token** (`ghp_...`) — you won't be able to see it again

> **Important:** You need a classic PAT (`ghp_...`). Tokens from `gh auth token` (`gho_...`) may not work with this endpoint.

### Step 2: Add GitHub MCP to Claude Code

Run in terminal:

```bash
claude mcp add-json github --scope user "{\"type\":\"http\",\"url\":\"https://api.githubcopilot.com/mcp/\",\"headers\":{\"Authorization\":\"Bearer YOUR_GITHUB_PAT\"}}"
```

Replace `YOUR_GITHUB_PAT` with the token you copied in Step 1.

### Step 3: Verify

1. Restart Claude Code
2. Type `/mcp` and press Enter
3. `github` should show **connected**

### Usage

Claude can now interact with GitHub repositories, pull requests, issues, etc. directly through MCP tools.

### Note on built-in plugin

You may see `plugin:github:github` with `failed` status in `/mcp`. This is the broken built-in plugin — ignore it. The manually configured `github` server replaces its functionality.

---

## 4. Swagger (OpenAPI) MCP Setup

We use [@ivotoby/openapi-mcp-server](https://www.npmjs.com/package/@ivotoby/openapi-mcp-server) to expose the backend API spec as MCP tools. This lets Claude read API endpoints, parameters, and schemas directly from the running backend.

### Prerequisites

- The backend must be running on `http://localhost:3002/` with Swagger JSON available at `/swagger.json`.

### Configuration

The server is already configured in `.mcp.json` (project-scoped):

```json
"swagger": {
  "type": "stdio",
  "command": "npx",
  "args": [
    "-y",
    "@ivotoby/openapi-mcp-server",
    "--openapi-spec",
    "http://localhost:3002/swagger.json",
    "--api-base-url",
    "http://localhost:3002"
  ]
}
```

### Verify

1. Start the backend (`http://localhost:3002/`)
2. Restart Claude Code
3. Type `/mcp` and press Enter
4. `swagger` should show **connected**

### Usage

Claude can now read the API schema and call endpoints directly:

```
What endpoints are available for customers?
```

---

## Troubleshooting

### MCP shows `failed`

Check that the tool runner is available:

```bash
# For Figma (uses npx)
npx --version

# For Jira (uses uvx)
uvx --version
```

If `uvx` is missing: `pip install uv`

### MCP shows `needs-auth`

This usually means the token is invalid or expired. Remove and re-add the MCP:

```bash
claude mcp remove <name>
# Then run the add command again with a fresh token
```

### Figma returns 404

- Make sure your Figma account has access to the file you're trying to read.
- Verify the token hasn't been revoked in Figma Settings > Security > Personal access tokens.

### Jira returns 401 / 403

- Confirm your email and API token are correct.
- Check that your Atlassian account has access to the project.

---

### GitHub returns 401

- Make sure you're using a classic PAT (`ghp_...`), not a `gho_` token from `gh` CLI.
- Verify the token hasn't expired at [https://github.com/settings/tokens](https://github.com/settings/tokens).

---

## Removing an MCP

```bash
claude mcp remove figma
claude mcp remove jira
claude mcp remove github
```

Add `--scope user` if the server was added with `--scope user`.
