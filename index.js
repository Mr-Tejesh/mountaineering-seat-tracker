import { checkSeats } from './utils/apiClient.js';
import { getRandomMessage } from './utils/messageGenerator.js';
import { pushNotification } from './utils/notificationSender.js';

/**
 * Main function to check seats and send notification
 */
async function main() {
  console.log("🚀 Starting BMC seat availability check...\n");
  
  try {
    // Step 1: Check available seats
    const availableSeats = await checkSeats();
    
    if (availableSeats === null || availableSeats === undefined) {
      console.log("❌ Could not retrieve seat information");
      process.exit(1);
    }

    // Step 2: Generate appropriate message
    const message = getRandomMessage(availableSeats);
    
    // Step 3: Send notification
    const success = await pushNotification(message);
    
    if (success) {
      console.log("\n✨ Process completed successfully!");
      process.exit(0);
    } else {
      console.log("\n⚠️ Process completed with warnings");
      process.exit(1);
    }
    
  } catch (error) {
    console.error("❌ Unexpected error in main:", error.message);
    process.exit(1);
  }
}

// Run the application
main();