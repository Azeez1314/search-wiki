import { eq } from "drizzle-orm";
import { usersSync } from "drizzle-orm/neon";
import db from "@/db";
import { articles } from "@/db/schema";
import resend from "@/email";
import CelebrationTemplate from "./templates/celebration-template";

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default async function sendCelebrationEmail(
  articleId: number,
  pageviews: number,
) {
  const response = await db
    .select({
      email: usersSync.email,
      id: usersSync.id,
      title: articles.title,
      name: usersSync.name,
    })
    .from(articles)
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id))
    .where(eq(articles.id, articleId));

  const { email, id, title, name } = response[0];
  if (!email) {
    console.log(
      `❌ skipping sending a celebration for getting ${pageviews} on article ${articleId}, could not find email`,
    );
    return;
  }

  const emailRes = await resend.emails.send({
    from: "Wikimasters <noreply@mail.holt.courses>", // replace with your domain when ready
    to: email,
    subject: `✨ Your article got ${pageviews} views! ✨`,
    react: (
      <CelebrationTemplate
        articleTitle={title}
        articleUrl={`${BASE_URL}/wiki/${articleId}`}
        name={name ?? "Friend"}
        pageviews={pageviews}
      />
    ),
  });

  if (!emailRes.error) {
    console.log(
      `📧 sent ${id} a celebration for getting ${pageviews} on article ${articleId}`,
    );
  } else {
    console.log(
      `❌ error sending ${id} a celebration for getting ${pageviews} on article ${articleId}`,
      emailRes.error,
    );
  }
}
