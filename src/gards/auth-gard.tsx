import { AuthContext } from "@/context/auth";
import { ReactNode, useContext } from "react";

export default function AuthGard({ children }: { children: ReactNode }) {
  const { isAuthorized } = useContext(AuthContext);
  if (!isAuthorized) {
    return <></>;
  }
  return { children };
}
