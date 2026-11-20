import { onMount, type JSX } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { Button } from "@/shared/components";
import { revealOnMount } from "@/shared/lib/motion";
import { ProductForm } from "../components/ProductForm";
import "../ProductPages.css";

const backIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>`;

export default function AddProduct(): JSX.Element {
  const navigate = useNavigate();
  let rootRef: HTMLDivElement | undefined;

  onMount(() => {
    if (rootRef) revealOnMount(rootRef, 20);
  });

  return (
    <div class="product-page" ref={rootRef}>
      <header class="product-page__header" data-reveal>
        <div>
          <a class="product-page__breadcrumb" href="/catalog">
            <span innerHTML={backIcon} />
            <span>Back to Catalog</span>
          </a>
          <h1>Add Product</h1>
          <p>Draft a new drop and schedule it when you're ready — save the draft at any point.</p>
        </div>
        <Button
          variant="ghost"
          onClick={() => navigate("/catalog")}
        >
          Discard
        </Button>
      </header>

      <ProductForm mode="create" />
    </div>
  );
}
