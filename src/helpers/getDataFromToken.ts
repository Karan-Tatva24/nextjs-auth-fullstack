import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value || "";
  const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRETE!);

  return decodedToken.id;
};
