/**
 * Main execution function for the Lit Action
 * Sends a prompt to an Gaia's API running Llama 3.1 8B model and processes the response
 */
const go = async () => {
  try {
    // Prepare message structure for Gaia's API running Llama 3.1 8B model
    const messages = [
      {
        role: "system",
        content:
          "You are an AI assistant that helps people make informed blockchain trading decisions. Only answer with a single sentence. Ensure to give them a response but remind them to act with caution.",
      },
      {
        role: "user",
        content: prompt,
      },
    ];

    // Make API request to Gaia's API running Llama 3.1 8B model
    const response = await fetch(
      "https://llama3b.gaia.domains/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3b",
          messages,
        }),
      },
    );

    // Process the response
    const result = await response.json();
    const answer = result.choices[0].message.content;
    const cleanAnswer = answer.replace(/\n/g, " ").replace(/\*\*/g, "").trim();

    // Send response back through Lit Protocol
    LitActions.setResponse({
      response: {
        message: cleanAnswer,
      },
    });
  } catch (error) {
    console.error("Error in Lit Action:", error);
    LitActions.setResponse({
      response: {
        error: error.message,
      },
    });
  }
};

go();
