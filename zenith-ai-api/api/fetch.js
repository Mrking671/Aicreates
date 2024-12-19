export default async function (request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const userMessage = url.searchParams.get("question");

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Content-Type': 'application/json',
  };

  if (request.method === "OPTIONS") {
    response.writeHead(204, corsHeaders);
    response.end();
    return;
  }

  if (!userMessage) {
    response.writeHead(400, corsHeaders);
    response.end(JSON.stringify({ error: "Missing 'question' query parameter" }));
    return;
  }

  try {
    const payload = {
      model: "gpt-4o",
      messages: [
        {
          role: 'system',
          content: 'Zenith AI: The Limitless Frontier of Intelligence...',
        },
        {
          role: 'assistant',
          content: 'instructions applied and understood',
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
    };

    const apiResponse = await fetch("https://api-ru0x.onrender.com/v1/chat/api", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!apiResponse.ok) {
      response.writeHead(502, corsHeaders);
      response.end(JSON.stringify({
        Join: "https://t.me/Ashlynn_Repository",
        successful: "failure",
        status: apiResponse.status,
        response: "Error processing your request. Please try again later.",
      }));
      return;
    }

    const data = await apiResponse.json();
    response.writeHead(200, corsHeaders);
    response.end(JSON.stringify({
      Join: "https://t.me/Ashlynn_Repository",
      successful: "success",
      status: 200,
      response: data.response || "No response from AI",
    }));
  } catch (error) {
    response.writeHead(500, corsHeaders);
    response.end(JSON.stringify({
      Join: "https://t.me/Ashlynn_Repository",
      successful: "failure",
      status: 500,
      response: "An unexpected error occurred. Please try again later.",
    }));
  }
}

