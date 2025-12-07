import WikiEditor from "@/components/wiki-editor";
import { stackServerApp } from "@/stack/server";

export default async function NewArticlePage() {
  await stackServerApp.getUser({ or: "redirect" });
  return <WikiEditor isEditing={false} />;
}
