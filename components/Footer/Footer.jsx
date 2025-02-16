"use client";
import { Typography } from "antd";
import { ThemeSwitcher } from "@/components/theme-switcher";

function Footer() {
  return (
    <footer className="AppFooter">
                <p>
                  Powered by{" "}
                  <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    Supabase
                  </a>
                </p>
                <ThemeSwitcher />
              </footer>
  );
}
export default Footer;
