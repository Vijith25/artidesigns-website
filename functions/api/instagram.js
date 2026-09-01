export async function onRequestGet(context) {
  const token = context.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return new Response(
      JSON.stringify({
        error: "Instagram access token is not configured."
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  try {
    const url = new URL(
      "https://graph.instagram.com/v25.0/me/media"
    );

    url.searchParams.set(
      "fields",
      "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp"
    );

    url.searchParams.set("limit", "50");
    url.searchParams.set("access_token", token);

    const response = await fetch(url.toString());

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: "Instagram API request failed.",
          details: data
        }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    const media = (data.data || []).map(item => ({
      id: item.id,
      caption: item.caption || "",
      media_type: item.media_type,
      media_url: item.media_url || "",
      thumbnail_url: item.thumbnail_url || "",
      permalink: item.permalink || "",
      timestamp: item.timestamp || ""
    }));

    return new Response(
      JSON.stringify({
        success: true,
        username: "arti.de_signs",
        count: media.length,
        media
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300"
        }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Unable to connect to Instagram.",
        details: error.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}
