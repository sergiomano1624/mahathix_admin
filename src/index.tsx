import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import App from "@/app/App";
import { routes } from "@/app/routes";
import "@/styles/tokens.css";

const root = document.getElementById("app");
if (!root) throw new Error("#app root element not found");

render(() => <Router root={App}>{routes}</Router>, root);
