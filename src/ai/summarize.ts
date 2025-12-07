import { generateText } from "ai";

function isTestEnv() {
  return (
    process.env.NODE_ENV === "test" ||
    process.env.VITEST ||
    process.env.PLAYWRIGHT
  );
}

export async function summarizeArticle(
  title: string,
  article: string,
): Promise<string> {
  if (isTestEnv()) {
    return "This is a test summary.";
  }
  if (!article || !article.trim()) {
    throw new Error("Article content is required to generate a summary.");
  }
  const prompt = `Summarize the following wiki article in 1-2 concise sentences. Focus on the main idea and the most important details a reader should remember. Do not add opinions or unrelated information. Your goal is inform users of what the gist of a wiki article is so they can decide if they want to read more or not.\n\n<title>\n${title}</title>\n\n<wiki_content>\n${article}</wiki_content>`;
  const { text } = await generateText({
    model: "openai/gpt-5-nano",
    system: "You are an assistant that writes concise factual summaries.",
    prompt,
  });
  return (text ?? "").trim();
}

export default summarizeArticle;
