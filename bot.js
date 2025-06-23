const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} = require("@whiskeysockets/baileys");
const fs = require("fs");
const P = require("pino");

const thumb = fs.readFileSync("./thumbnail.mp4");
const dbPath = "./usermode.json";
let userModes = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath)) : {};

function saveModes() {
  fs.writeFileSync(dbPath, JSON.stringify(userModes, null, 2));
}
    const from = msg.key.remoteJid;
    const isChannel = from.endsWith("@broadcast");
    const sender = msg.key.participant || from;

    const type = Object.keys(msg.message)[0];
    const body =
      msg.message.conversation ||
      msg.message[type]?.text ||
      msg.message[type]?.caption ||
      "";

    const command = body.toLowerCase().trim();

    if (!userModes[sender]) userModes[sender] = "combo";

    switch (command) {
      case "setmode":
        await conn.sendMessage(from, {
          text: "*Pilih Mode Tampilan Button:*",
          footer: "VonzieBot Button Mode",
          templateButtons: [
            { index: 1, quickReplyButton: { displayText: "🧩 Combo Button", id: "mode_combo" } },
            { index: 2, quickReplyButton: { displayText: "📋 Slide Only", id: "mode_slide" } },
            { index: 3, quickReplyButton: { displayText: "🌫️ Melayang Only", id: "mode_melayang" } },
            { index: 4, quickReplyButton: { displayText: "🚫 No Button", id: "mode_nobutton" } },
          ],
          jpegThumbnail: thumb,
        }, { quoted: msg });
        break;

      case "mode_combo":
      case "mode_slide":
      case "mode_melayang":
      case "mode_nobutton":
        const mode = command.split("_")[1];
        userModes[sender] = mode;
        saveModes();
        await conn.sendMessage(from, {
          text: `✅ Mode tombol diubah ke *${mode.toUpperCase()}*`,
          jpegThumbnail: thumb,
        }, { quoted: msg });
        break;

      case "menu":
        const modeSet = userModes[sender];

        if (isChannel || modeSet === "melayang") {
          await conn.sendMessage(from, {
            text: "*Menu Mode: MELAYANG*",
            footer: "VonzieBot",
            templateButtons: [
              { index: 1, urlButton: { displayText: "🌐 Website", url: "https://vonziebot.net" } },
              { index: 2, quickReplyButton: { displayText: "📄 Info", id: "info" } },
            ],
            jpegThumbnail: thumb,
          }, { quoted: msg });

        } else if (modeSet === "slide") {
          await conn.sendMessage(from, {
            text: "📑 Ini menu dengan *Slide Button*",
            footer: "VonzieBot",
            title: "Slide Pilihan",
            buttonText: "📂 Pilih Menu",
            sections: [
              {
                title: "Menu Slide",
                rows: [
                  { title: "📄 Info", rowId: "info" },
                  { title: "👤 Owner", rowId: "owner" },
                ],
              },
            ],
            jpegThumbnail: thumb,
          }, { quoted: msg });

        } else if (modeSet === "combo") {
          await conn.sendMessage(from, {
            text: "*Combo Button (Select + Slide + Melayang)*",
            footer: "VonzieBot",
            buttons: [
              { buttonId: "info", buttonText: { displayText: "📄 Info" }, type: 1 },
              { buttonId: "owner", buttonText: { displayText: "👤 Owner" }, type: 1 },
            ],
            headerType: 1,
            jpegThumbnail: thumb,
          }, { quoted: msg });
        } else {
          await conn.sendMessage(from, {
            text: "📦 Ini mode tanpa tombol.\n\nKetik `setmode` untuk ubah mode tombol.",
            jpegThumbnail: thumb,
          }, { quoted: msg });
        }
        break;

      case "info":
        await conn.sendMessage(from, {
          text: `ℹ️ *VonzieBot*\n\n✅ WhatsApp Business\n✅ WhatsApp Channel\n\nMode aktif: *${userModes[sender].toUpperCase()}*`,
          jpegThumbnail: thumb,
        }, { quoted: msg });
        break;

      case "owner":
        await conn.sendMessage(from, {
          contacts: {
            displayName: "Vonzie",
            contacts: [{
              displayName: "Vonzie Dev",
              vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Vonzie\nTEL;waid=628xxx:628xxx\nEND:VCARD`,
            }]
          }
        }, { quoted: msg });
        break;
    }
  });

default:
if (budy.startsWith('>')) {
if (!isOwner) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
await m.reply(evaled);
} catch (err) {
m.reply(String(err));
}
}

if (budy.startsWith('<')) {
if (!isOwner) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await m.reply(require('util').format(teks))
}
}

}
} catch (err) {
console.log(require("util").format(err));
}
};

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file);
console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
delete require.cache[file];
require(file);
});