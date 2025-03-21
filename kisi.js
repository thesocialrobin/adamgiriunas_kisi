import wixData from 'wix-data';
import { logToDevLog } from 'backend/devLogger';

export async function queryNonResidentSubmissions(email) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  try {
    const result = await wixData.query("WixForms/133fd1f7-9b72-4607-995c-ac4f21e4ca29")
      .eq("email", email)
      .ge("createdDate", today)
      .lt("createdDate", tomorrow)
      .find();

    if (result.items.length > 0) {
      for (let item of result.items) {
        await exportZapier(item);
      }
    } else {

        logToDevLog("No entries found", { email });
    }
  } catch (error) {

        logToDevLog("Error searching non-resident submissions", { error });
  }
}

export async function exportZapier(payload) {
  const zapierHook = "https://hooks.zapier.com/hooks/catch/18750904/2ed64pd/";

  try {
    const response = await fetch(zapierHook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {

        logToDevLog(`Zapier payload failed", ${response.statusText}`);
    }

    const result = await response.json();
    logToDevLog("Zapier Response:", { result });

  } catch (err) {
    logToDevLog("Error sending to Zapier:", { err });
  }
}

