# 🤖 GitHub Actions Setup Guide

This guide will help you set up automated seat checking using GitHub Actions.

## ⏰ Schedule

The workflow runs automatically at:
- **4:00 AM IST** - Morning check
- **2:00 PM IST** - Afternoon check  
- **8:30 PM IST** - Evening check

> **Note:** GitHub Actions uses UTC time, but the workflow is already configured with the correct UTC times for IST.

## 🔐 Setting Up Secrets

GitHub Actions needs your environment variables to be stored as "secrets" for security.

### Step 1: Go to Repository Settings

1. Go to your GitHub repository
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**

### Step 2: Add Each Secret

Add the following secrets one by one:

| Secret Name | Value | Example |
|-------------|-------|---------|
| `API_URL` | Your API endpoint | `https://apierp.azurewebsites.net/api/api/getTemplateDataList` |
| `NOTIFICATION_URL` | Your ntfy.sh topic URL | `https://ntfy.sh/your-unique-topic` |
| `TEMPLATE_ID` | Template ID | `3` |
| `CATEGORY_NAME` | Category name | `Mountaineering` |
| `SERIAL_NO` | Serial number | `BMC-63` |
| `PAGE_SIZE` | Page size | `100` |

**To add each secret:**
1. Click **New repository secret**
2. Enter the **Name** (e.g., `API_URL`)
3. Enter the **Value** (e.g., `https://apierp.azurewebsites.net/...`)
4. Click **Add secret**
5. Repeat for all secrets

### Screenshot Guide:

```
Repository → Settings → Secrets and variables → Actions → New repository secret
```

## ✅ Verify Setup

Once you've added all secrets:

1. Go to the **Actions** tab in your repository
2. You should see "BMC Seat Checker" workflow listed
3. Click on it
4. Click **Run workflow** (top right) → **Run workflow** button
5. This will trigger a manual run to test if everything works

## 📊 Monitoring Runs

### View Workflow Runs:
1. Go to **Actions** tab
2. Click on any run to see details
3. Click on the job name to see logs
4. Check if notifications were sent successfully

### What You'll See:
- ✅ Green checkmark = Success
- ❌ Red X = Failed (check logs for errors)
- 🟡 Yellow dot = Running

## 🔧 Troubleshooting

### Workflow doesn't run at scheduled times

**Possible causes:**
- GitHub Actions can be delayed by up to 15 minutes during high load
- Repository might be inactive (push a commit to wake it up)
- Workflow file might have syntax errors

**Solution:**
- Check the Actions tab for any errors
- Try running manually first to verify it works
- Make sure the workflow file is in `.github/workflows/` directory

### "Secret not found" error

**Solution:**
- Double-check secret names match exactly (case-sensitive!)
- Verify all 6 secrets are added
- Secret names in workflow should match what you created

### Notification not received

**Solution:**
- Test your ntfy.sh topic manually: `curl -d "test" https://ntfy.sh/your-topic`
- Make sure you're subscribed to the topic in the ntfy app
- Check workflow logs to see if notification was sent

### API returns error

**Solution:**
- Verify your API credentials/secrets are correct
- Check if NIMAS API is accessible
- Look at the workflow logs for specific error messages

## 🎯 Manual Triggers

You can manually trigger the workflow anytime:

1. Go to **Actions** tab
2. Click **BMC Seat Checker**
3. Click **Run workflow** button (top right)
4. Select branch (usually `main`)
5. Click **Run workflow**

This is useful for:
- Testing after making changes
- Checking seats outside scheduled times
- Verifying everything works after setup

## 🔄 Updating the Schedule

To change when the workflow runs, edit `.github/workflows/seat-checker.yml`:

```yaml
schedule:
  - cron: '30 22 * * *'  # 4:00 AM IST
  - cron: '30 8 * * *'   # 2:00 PM IST
  - cron: '0 15 * * *'   # 8:30 PM IST
```

**Cron format:** `minute hour day month weekday`

**Examples:**
```yaml
- cron: '0 0 * * *'    # Every day at 5:30 AM IST (midnight UTC)
- cron: '30 6 * * *'   # Every day at 12:00 PM IST (6:30 AM UTC)
- cron: '0 */4 * * *'  # Every 4 hours
```

**IST to UTC conversion:**
IST is UTC +5:30, so:
- Subtract 5 hours 30 minutes from IST to get UTC
- Example: 2:00 PM IST = 8:30 AM UTC

**Helpful tool:** [crontab.guru](https://crontab.guru/) for testing cron expressions

## 💡 Pro Tips

1. **Keep repo active:** GitHub may disable scheduled workflows on inactive repos after 60 days. Just push a small commit to keep it active.

2. **Check logs regularly:** Even if notifications work, check the Actions logs occasionally to catch any API changes.

3. **Workflow notifications:** You can enable email notifications for failed workflows in your GitHub notification settings.

4. **Rate limits:** GitHub Actions has usage limits on free accounts:
   - 2,000 minutes/month for free accounts
   - This workflow uses ~1 minute per run
   - 3 runs/day × 30 days = ~90 minutes/month (well within limits!)

5. **Backup notification method:** Consider adding email or another notification channel in case ntfy.sh is down.

## 📱 Getting Notifications

Don't forget to:
1. Install ntfy.sh app on your phone
2. Subscribe to your topic
3. Keep the app running in background
4. Enable notification permissions

## 🎉 You're All Set!

Once configured:
- ✅ Workflow runs automatically 3 times a day
- ✅ You get notifications on your phone
- ✅ No need to keep your laptop on
- ✅ Works even when you're sleeping or traveling

Happy climbing! 🏔️
