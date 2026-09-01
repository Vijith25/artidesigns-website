
export async function onRequestGet(context) {

  const username = "arti.de_signs";

  try {

    const instagramUrl =
      `https://www.instagram.com/${username}/`;

    const response = await fetch(instagramUrl, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36",

        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",

        "Accept-Language":
          "en-US,en;q=0.9"
      }
    });

    const html = await response.text();

    /*
      We do NOT return the complete Instagram page.
      We only inspect whether useful public profile data
      is present in the response.
    */

    const checks = {
      username:
        html.includes(username),

      following:
        html.toLowerCase().includes("following"),

      followers:
        html.toLowerCase().includes("followers"),

      profilePicture:
        html.includes("profile_pic") ||
        html.includes("profile_pic_url"),

      graphql:
        html.includes("graphql"),

      requireLogin:
        html.toLowerCase().includes("log in") ||
        html.toLowerCase().includes("login")
    };

    /*
      Look for possible Instagram profile-image URLs.
    */

    const imageMatches =
      html.match(
        /https?:\\\/\\\/[^"' ]+(?:profile_pic|profile_picture)[^"' ]*/gi
      ) || [];

    const profileImages =
      imageMatches
        .slice(0, 5)
        .map(url =>
          url
            .replace(/\\u0026/g, "&")
            .replace(/\\\//g, "/")
        );

    return new Response(
      JSON.stringify(
        {
          success: response.ok,

          username,

          instagram_status:
            response.status,

          content_type:
            response.headers.get("content-type"),

          response_size:
            html.length,

          checks,

          profile_images_found:
            profileImages.length,

          profile_images:
            profileImages,

          message:
            response.ok
              ? "Instagram public profile response received."
              : "Instagram did not return a normal public profile response."
        },
        null,
        2
      ),
      {
        status: 200,

        headers: {
          "Content-Type":
            "application/json",

          "Cache-Control":
            "no-store"
        }
      }
    );

  } catch (error) {

    return new Response(
      JSON.stringify(
        {
          success: false,

          error:
            "Unable to retrieve Instagram public profile.",

          details:
            error.message
        },
        null,
        2
      ),
      {
        status: 500,

        headers: {
          "Content-Type":
            "application/json"
        }
      }
    );
  }
}
