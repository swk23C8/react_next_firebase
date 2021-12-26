import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "@lib/context";

export default function AuthCheck(props) {
  const { username } = useContext(UserContext);
  const router = useRouter();
  return username
    ? props.children
    : props.fallback || <div>Please Sign In to Continue...</div>;
}
