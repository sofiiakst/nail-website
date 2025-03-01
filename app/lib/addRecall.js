"use server";
import { addRecallSchema } from "../config/zodSchema";
async function addRecall(prevState, formData) {
  const recallData = {
    name: formData.get("name"),
    phone: formData.get("phone"),
  };
  const result = addRecallSchema.safeParse(recallData);
  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    console.log("name", recallData.name);
    console.log(" phone", recallData.phone);
    return { errors: result.error.flatten().fieldErrors };
  }
  return { success: true };
}
export default addRecall;
