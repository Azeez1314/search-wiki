"use server";

import redis from "@/cache";
import sendCelebrationEmail from "@/email/celebration-email";

const keyFor = (id: number | string) => `pageviews:article:${id}`;

const milestones = [10, 50, 100, 1000, 10000];

export async function incrementPageview(articleId: number) {
  const articleKey = keyFor(articleId);
  const newVal = await redis.incr(articleKey);

  if (milestones.includes(newVal)) {
    sendCelebrationEmail(articleId, +newVal); // don't await, just send it
  }

  return +newVal;
}
