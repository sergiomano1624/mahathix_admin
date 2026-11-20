import { createMemo, onMount, Show, type JSX } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import { Button } from "@/shared/components";
import { revealOnMount } from "@/shared/lib/motion";
import { ProductForm, findProductById, productToFormData } from "../components/ProductForm";
import "../ProductPages.css";

const backIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>`;
const eyeIcon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.6 12s3.4-6.6 9.4-6.6S21.4 12 21.4 12 18 18.6 12 18.6 2.6 12 2.6 12Z"/><circle cx="12" cy="12" r="3"/></svg>`;

export default function EditProduct(): JSX.Element {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  let rootRef: HTMLDivElement | undefined;

  const product = createMemo(() => findProductById(params.id));

  onMount(() => {
    if (rootRef) revealOnMount(rootRef, 20);
  });

  return (
    <div class="product-page" ref={rootRef}>
      <Show
        when={product()}
        fallback={
          <div class="product-page__missing panel" data-reveal>
            <strong>Product not found.</strong>
            <p>The product id “{params.id}” doesn't match any entry in the catalog.</p>
            <Button variant="primary" onClick={() => navigate("/catalog")}>
              Back to Catalog
            </Button>
          </div>
        }
      >
        <header class="product-page__header" data-reveal>
          <div>
            <a class="product-page__breadcrumb" href="/catalog">
              <span innerHTML={backIcon} />
              <span>Back to Catalog</span>
            </a>
            <h1>Edit {product()!.name}</h1>
            <p>Update variants, pricing, inventory and status. Changes save instantly in the real app.</p>
          </div>
          <Button
            variant="secondary"
            icon={eyeIcon}
            onClick={() => navigate(`/catalog/${product()!.id}`)}
          >
            View product
          </Button>
        </header>

        <ProductForm
          mode="edit"
          productId={product()!.id}
          initial={productToFormData(product()!)}
        />
      </Show>
    </div>
  );
}
