"use server";
import { revalidatePath } from "next/cache";
export async function revalidateAppPaths() {
  revalidatePath("/");
  return true;
}
