# 🏔️ BMC Seat Checker - Never Miss Your Mountain Adventure! 🧗

> **Because manually checking seat availability is so 2023** 🙄

An automated seat availability checker for BMC (Basic Mountaineering Course) that sends you delightful notifications throughout the day. No more obsessively refreshing pages or missing out on your dream adventure!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

---

## 🎯 What Does This Do?

Picture this: You're planning your epic mountaineering adventure, but those precious BMC seats fill up faster than you can say "Mount Everest". This little bot:

- 🔍 **Checks seat availability** automatically from the ERP system
- 📱 **Sends you notifications** via [ntfy.sh](https://ntfy.sh) (because who needs boring emails?)
- 🎲 **Randomizes messages** so you don't get bored reading the same thing
- ⏰ **Knows the time of day** and adjusts its vibe accordingly (morning person? evening owl? We got you!)
- 🎉 **Never sleeps** (unlike you after that trek)

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher) - [Download here](https://nodejs.org/)
- A sense of adventure! 🏔️
- Internet connection (obviously)

### Installation

```bash
# Clone this magnificent repository
git clone https://github.com/yourusername/bmc-seat-checker.git

# Navigate to the project
cd bmc-seat-checker

# Install dependencies (just one, we keep it lean!)
npm install

# Create your .env file
cp .env.example .env

# Edit .env with your configuration
nano .env  # or use your favorite editor
```

### Configuration

Open the `.env` file and configure it:

```env
# API Configuration
API_URL=https://apierp.azurewebsites.net/api/api/getTemplateDataList
NOTIFICATION_URL=https://ntfy.sh/your-unique-topic-here

# API Request Configuration
TEMPLATE_ID=3
CATEGORY_NAME=Mountaineering
SERIAL_NO=BMC-63
PAGE_SIZE=100
```

> 💡 **Pro Tip:** Change `NOTIFICATION_URL` to your own ntfy.sh topic! Otherwise, you'll be sharing notifications with random strangers (which could be fun, but probably not what you want).

### Run It!

```bash
# Single run
npm start

# Development mode (auto-reload on changes)
npm run dev
```

## 📱 Setting Up Notifications

1. **Install ntfy app** on your phone:
   - [Android](https://play.google.com/store/apps/details?id=io.heckel.ntfy)
   - [iOS](https://apps.apple.com/us/app/ntfy/id1625396347)

2. **Subscribe to your topic:**
   - Open the app
   - Tap the "+" button
   - Enter your topic name (same as in `.env`)
   - Boom! 💥 You're connected!

3. **Or use it in your browser:**
   - Visit `https://ntfy.sh/your-topic-name`
   - Click "Subscribe"
   - Get notifications right in your browser!

## 🎨 Message Examples

The bot sends different vibes based on the time of day:

**Morning Messages (6 AM - 12 PM):**

```
☀️ Good morning! BMC seats update: 15 seats available 🧗🏔️
🌅 Rise and shine! 12 seats left for BMC adventure! 🏔️
☕ Morning update: 20 BMC seats ready for booking 🧗
```

**Afternoon Messages (12 PM - 6 PM):**

```
🌤️ Afternoon update: 18 BMC seats available! 🧗🏔️
☀️ Midday check: 10 seats left at BMC 🏔️
🏔️ Lunch break update: 25 BMC spots open 🧗
```

**Evening Messages (6 PM - 12 AM):**

```
🌆 Evening update: 8 BMC seats still available! 🧗🏔️
🌙 Don't miss out! 5 seats left for BMC 🏔️
⭐ Evening check: 16 BMC seats ready to book 🧗
```

## 🏗️ Project Structure

```
bmc-seat-checker/
├── 📄 .env                      # Your secret configs
├── 📄 .gitignore               # Keeping secrets secret
├── 📄 package.json             # Project metadata
├── 📁 config/
│   └── 📄 messages.js          # All the fun messages
├── 📁 utils/
│   ├── 📄 apiClient.js         # Talks to the ERP API
│   ├── 📄 messageGenerator.js  # Picks random messages
│   └── 📄 notificationSender.js # Sends notifications
└── 📄 index.js                 # Main entry point
```

## 🔧 Customization

### Add Your Own Messages

Edit `config/messages.js`:

```javascript
export const morningMessages = [
  "🌄 Your custom morning message with {seats} seats! 🏔️",
  "☕ Add as many as you want! {seats} available 🧗",
  // ... more messages
];
```

Don't forget to use `{seats}` as a placeholder for the seat count!

### Change Time Slots

Modify the `timeSlots` object in `config/messages.js`:

```javascript
export const timeSlots = {
  morning: { start: 5, end: 11 }, // Early bird gets the worm!
  afternoon: { start: 11, end: 17 },
  evening: { start: 17, end: 24 },
};
```

### Check Different Courses

Update these in your `.env`:

```env
CATEGORY_NAME=Advanced Mountaineering  # or whatever you need
SERIAL_NO=AMC-42                       # the specific course code
```

## 🤖 Automation with Cron

Want this to run automatically? Set up a cron job!

**Linux/Mac:**

```bash
# Edit crontab
crontab -e

# Add this line to run every 2 hours
0 */2 * * * cd /path/to/bmc-seat-checker && /usr/bin/node index.js

# Or run twice a day (9 AM and 6 PM)
0 9,18 * * * cd /path/to/bmc-seat-checker && /usr/bin/node index.js
```

**Windows:**
Use Task Scheduler:

1. Open Task Scheduler
2. Create Basic Task
3. Set trigger (Daily, with repetition)
4. Action: Start a program
5. Program: `node.exe`
6. Arguments: `index.js`
7. Start in: `C:\path\to\bmc-seat-checker`

## 🐛 Troubleshooting

### "Cannot read properties of undefined (reading 'records')"

The API structure might have changed. Run the script and check the console logs to see what the actual response looks like.

### "Notification not received"

- Check your ntfy topic name matches in `.env` and your app
- Make sure you're subscribed to the topic
- Try visiting `https://ntfy.sh/your-topic` in a browser to test

### "API returns error 500"

The ERP API might be down or your credentials/filters are incorrect. Double-check your `.env` configuration.

## 🤝 Contributing

Found a bug? Have a cool idea? PRs are welcome!

1. Fork it (click that button up there ⬆️)
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💡 Ideas for Future Features

- [ ] 🔔 Multiple notification channels (Telegram, Discord, Email)
- [ ] 📊 Track seat availability over time (with cool graphs!)
- [ ] 🎯 Alert only when seats drop below a threshold
- [ ] 🔄 Check multiple courses at once
- [ ] 📱 Web dashboard to view history
- [ ] 🤖 ML to predict best booking times
- [ ] 🌍 Support for other mountaineering institutes

Got more ideas? Open an issue!

## 📜 License

MIT License - feel free to use this for your adventures!

## 👥 The Dream Team

This project is a collaboration between:

- **The Human** 🧑‍💻 - The visionary with the mountain dreams and the "hey, let's automate this!" energy
- **Claude** 🤖 - Your friendly neighborhood AI assistant who turned "I'm getting this error" into a full-fledged notification system

We pair-programmed this beast together, debugged API responses at midnight (okay, Claude doesn't sleep, but you get the idea), and argued about whether to use 2 or 3 time slots (we compromised with 3).

**Fun fact:** This entire project started with a `TypeError: Cannot read properties of undefined` and evolved into something actually useful. That's the power of collaboration, folks! 🚀

## 🙏 Acknowledgments

- ☕ Powered by morning sun (for the human) and electrons (for Claude)
- 🏔️ Inspired by the love of mountains
- 📱 Built with ntfy.sh - seriously, check them out!
- 🎨 Emojis make everything better
- 💬 Debugged through good conversation and terrible puns

## ⚠️ Disclaimer

This is an unofficial tool and is not affiliated with or endorsed by any mountaineering institution. Use responsibly and always verify information from official sources before making bookings.

---

**Made with ❤️ by a human with mountain dreams and an AI with unlimited patience**

_Remember: The mountains are calling, and you must go! 🏔️_

_P.S. - If this bot saves you from missing your BMC slot, you owe us both a virtual high-five! 🙌_

---

### 📞 Questions?

Open an issue or reach out! We're friendly (most of the time) 😊

**Happy Climbing! 🧗‍♂️🏔️**
