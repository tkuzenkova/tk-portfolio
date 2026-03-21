# Telegram Notifications for Claude Code

This guide describes how Claude Code is configured to send Telegram notifications when it needs your attention.

## How It Works

Three events trigger a Telegram message:

| Event | When it fires | Message |
|-------|--------------|---------|
| **Stop** | Claude finishes a task | "Claude finished. Your action is needed." |
| **Notification** | Claude sends any in-app notification | The notification text |
| **PermissionRequest** | Claude needs permission for an action | "Claude needs permission: `<tool>`. Please approve in VSCode." |

Approve or deny permission requests directly in the VSCode Claude Code dialog — Telegram is notification-only.

---

## Setup

### Step 1: Create a Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot` and follow the prompts
3. Copy the bot token (format: `1234567890:AAE...`)

### Step 2: Get Your Chat ID

1. Send any message to your bot
2. Open in browser:
   ```
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
3. Find `result[0].message.chat.id` — that is your Chat ID

### Step 3: Configure Claude Code

Add to `~/.claude/settings.json`:

```json
{
  "env": {
    "TELEGRAM_BOT_TOKEN": "<your-bot-token>",
    "TELEGRAM_CHAT_ID": "<your-chat-id>"
  },
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "curl -s -X POST \"https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage\" -H \"Content-Type: application/json\" -d \"{\\\"chat_id\\\":\\\"${TELEGRAM_CHAT_ID}\\\",\\\"text\\\":\\\"Claude finished. Your action is needed.\\\"}\" > /dev/null 2>&1 || true"
          }
        ]
      }
    ],
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.message // \"Claude needs your attention\"' | { read -r msg; curl -s -X POST \"https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage\" -H \"Content-Type: application/json\" -d \"{\\\"chat_id\\\":\\\"${TELEGRAM_CHAT_ID}\\\",\\\"text\\\":\\\"$msg\\\"}\" > /dev/null 2>&1; } || true",
            "async": true
          }
        ]
      }
    ],
    "PermissionRequest": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "TOOL=$(jq -r '.tool_name // \"action\"'); curl -s -X POST \"https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage\" -H \"Content-Type: application/json\" -d \"{\\\"chat_id\\\":\\\"${TELEGRAM_CHAT_ID}\\\",\\\"text\\\":\\\"Claude needs permission: $TOOL. Please approve in VSCode.\\\"}\" > /dev/null 2>&1 || true",
            "async": true
          }
        ]
      }
    ]
  }
}
```

### Step 4: Reload hooks

Open `/hooks` in Claude Code to reload the configuration.

---

## Troubleshooting

### No messages arriving

Test the curl command manually:

```bash
curl -s -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id":"<CHAT_ID>","text":"test"}'
```

Expected response: `{"ok":true,...}`. If `ok` is `false`, the token or chat ID is wrong.

### `Bad Request: strings must be encoded in UTF-8`

Use JSON body (`-H "Content-Type: application/json"`) instead of form-encoded `-d "text=..."`. The config above already does this.

### `getUpdates` returns empty result

You haven't sent any message to the bot yet. Open the bot in Telegram, press **Start**, then retry `getUpdates`.
