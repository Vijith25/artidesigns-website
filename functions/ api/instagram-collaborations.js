export async function onRequestGet(context) {
  const token = context.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Instagram access token is not configured."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  const API_VERSION = "v25.0";
  const API_BASE = `https://graph.instagram.com/${API_VERSION}`;

  try {

    const meUrl = new URL(`${API_BASE}/me`);
    meUrl.searchParams.set("fields", "id,username");
    meUrl.searchParams.set("access_token", token);

    const meResponse = await fetch(meUrl);
    const meData = await meResponse.json();

    if (!meResponse.ok || !meData.id) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Unable to identify the Instagram account.",
          details: meData
        }),
        {
          status: meResponse.status || 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const ownId = String(meData.id);

    const conversationsUrl =
      new URL(`${API_BASE}/me/conversations`);

    conversationsUrl.searchParams.set(
      "fields",
      "messages{from,to,created_time}"
    );

    conversationsUrl.searchParams.set("limit", "30");
    conversationsUrl.searchParams.set("access_token", token);

    const conversationsResponse =
      await fetch(conversationsUrl);

    const conversationsData =
      await conversationsResponse.json();

    if (!conversationsResponse.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Unable to retrieve Instagram interactions.",
          details: conversationsData
        }),
        {
          status: conversationsResponse.status,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const people = new Map();

    for (const conversation of conversationsData.data || []) {

      for (const message of
        conversation.messages?.data || []) {

        const candidates = [];

        if (message.from) {
          candidates.push(message.from);
        }

        if (Array.isArray(message.to?.data)) {
          candidates.push(...message.to.data);
        }

        for (const person of candidates) {

          if (!person?.id) continue;

          const id = String(person.id);

          if (id === ownId) continue;

          if (!people.has(id)) {
            people.set(id, {
              id,
              username: person.username || "",
              lastInteraction:
                message.created_time || ""
            });
          } else if (
            message.created_time &&
            message.created_time >
              people.get(id).lastInteraction
          ) {
            people.get(id).lastInteraction =
              message.created_time;
          }
        }
      }
    }

    const collaborators = [];

    for (const person of people.values()) {

      try {

        const profileUrl =
          new URL(`${API_BASE}/${person.id}`);

        profileUrl.searchParams.set(
          "fields",
          "name,username,profile_pic,follower_count,is_user_follow_business,is_business_follow_user"
        );

        profileUrl.searchParams.set(
          "access_token",
          token
        );

        const profileResponse =
          await fetch(profileUrl);

        const profileData =
          await profileResponse.json();

        if (!profileResponse.ok) continue;

        if (!profileData.username &&
            !person.username) {
          continue;
        }

        collaborators.push({
          id: person.id,

          username:
            profileData.username ||
            person.username ||
            "",

          name:
            profileData.name ||
            profileData.username ||
            person.username ||
            "Instagram User",

          profile_pic:
            profileData.profile_pic || "",

          follower_count:
            profileData.follower_count ?? null,

          is_user_follow_business:
            profileData.is_user_follow_business ?? null,

          is_business_follow_user:
            profileData.is_business_follow_user ?? null,

          last_interaction:
            person.lastInteraction
        });

      } catch {
        /* Skip profiles that cannot be resolved. */
      }
    }

    collaborators.sort(
      (a, b) =>
        String(b.last_interaction || "")
          .localeCompare(
            String(a.last_interaction || "")
          )
    );

    return new Response(
      JSON.stringify({
        success: true,
        username: meData.username || "arti.de_signs",
        count: collaborators.length,
        collaborators
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control":
            "public, max-age=300"
        }
      }
    );

  } catch (error) {

    return new Response(
      JSON.stringify({
        success: false,
        error:
          "Unable to load Instagram collaborations.",
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
